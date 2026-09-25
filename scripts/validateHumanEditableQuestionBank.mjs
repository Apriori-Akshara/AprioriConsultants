import fs from 'node:fs';
import path from 'node:path';
import { validateSatQuestion } from '../src/data/sat/questionSchema.js';

const inputPath = process.argv[2];
const approvedOnly = process.argv.includes('--approved-only');
if (!inputPath) throw new Error('Usage: node validateHumanEditableQuestionBank.mjs <mock.md> [--approved-only]');

const absolute = path.resolve(process.cwd(), inputPath);
const source = fs.readFileSync(absolute, 'utf8');
const top = Object.fromEntries([...source.matchAll(/^([A-Z][A-Z ]+):[ \t]*(.*)$/gm)].map((m) => [m[1].trim(), m[2].trim()]));
const questionMatches = [...source.matchAll(/^### Question: ([^\n]+)\n([\s\S]*?)(?=^### Question: |$)/gm)];
if (!questionMatches.length) throw new Error('No question blocks found in ' + inputPath);

function field(block, label) {
  const match = block.split('\n').find((line) => line.startsWith(label + ':'));
  return match ? match.slice(label.length + 1).trim() : '';
}
function multiline(block, label, nextLabels) {
  const start = block.indexOf(label + ':');
  if (start < 0) return '';
  const after = block.slice(start + label.length + 1).replace(/^\r?\n/, '');
  const stops = nextLabels.map((x) => after.indexOf('\n' + x + ':')).filter((x) => x >= 0);
  return after.slice(0, stops.length ? Math.min(...stops) : after.length).trim();
}
function parseChoices(block) {
  const value = multiline(block, 'CHOICES', ['ANSWER', 'EXPLANATION', 'SYSTEM METADATA (DO NOT EDIT DIRECTLY)']);
  try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed : null; } catch { return null; }
}
function parseMetadata(block) {
  const match = block.match(/SYSTEM METADATA \(DO NOT EDIT DIRECTLY\):\s*\n```json\n([\s\S]*?)\n```/);
  if (!match) return null;
  try { return JSON.parse(match[1]); } catch { return null; }
}

const errors = [];
const seen = new Set();
const questions = [];
for (const match of questionMatches) {
  const block = match[2];
  const questionId = match[1].trim();
  if (seen.has(questionId)) errors.push('Duplicate questionId: ' + questionId);
  seen.add(questionId);
  const metadata = parseMetadata(block);
  if (!metadata) { errors.push(questionId + ': missing or invalid system metadata'); continue; }
  const status = field(block, 'STATUS');
  if (approvedOnly && status !== 'APPROVED') errors.push(questionId + ': status must be APPROVED for canonical promotion');
  const canonical = {
    ...metadata,
    questionId,
    prompt: multiline(block, 'PROMPT', ['CHOICES', 'ANSWER', 'EXPLANATION', 'SYSTEM METADATA (DO NOT EDIT DIRECTLY)']),
    choices: parseChoices(block),
    answer: field(block, 'ANSWER'),
    explanation: multiline(block, 'EXPLANATION', ['SYSTEM METADATA (DO NOT EDIT DIRECTLY)']),
  };
  const validation = validateSatQuestion(canonical);
  if (!validation.valid) for (const error of validation.errors) errors.push(questionId + ': ' + error);
  if (metadata.questionId && metadata.questionId !== questionId) errors.push(questionId + ': heading does not match system-managed questionId');
  questions.push({ status, questionId, canonical });
}
const result = {
  status: errors.length ? 'FAIL' : 'PASS',
  mode: approvedOnly ? 'approved-only' : 'document-structure',
  file: inputPath,
  testKey: top['TEST KEY'] || null,
  declaredQuestionCount: Number(top['QUESTION COUNT'] || 0),
  parsedQuestionCount: questions.length,
  errors,
  questions,
};
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;
