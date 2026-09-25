import fs from 'node:fs';
import path from 'node:path';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore.js';

const MOCK_KEYS = [
  ...Array.from({ length: 10 }, (_, i) => 'SAT' + (i + 1)),
  ...Array.from({ length: 10 }, (_, i) => 'PSAT' + (i + 1)),
  ...Array.from({ length: 10 }, (_, i) => 'SAT' + (i + 11)),
];

const outputRoot = path.resolve(process.cwd(), 'question-banks/legacy-30-mock-corpus');
const corpus = Array.isArray(BATCH_M_ACCEPTED_PRODUCTION_CORPUS) ? BATCH_M_ACCEPTED_PRODUCTION_CORPUS : [];

function normalizeKey(mock) {
  const testId = String(mock?.testId || '').trim();
  const testKey = String(mock?.testKey || '').trim();
  if (/^sat-series-b-mock-/i.test(testId)) return testId.replace(/^sat-series-b-mock-/i, 'SAT');
  if (testKey) return testKey.toUpperCase();
  const satA = testId.match(/^sat-series-a-mock-(\d+)$/i);
  if (satA) return 'SAT' + Number(satA[1]);
  const psat = testId.match(/^psat-mock-(\d+)$/i);
  if (psat) return 'PSAT' + Number(psat[1]);
  return testId;
}

function questionToMarkdown(question) {
  const safe = question && typeof question === 'object' ? question : {};
  const choices = safe.choices ?? safe.options ?? [];
  const answer = safe.answer ?? safe.correctAnswer ?? '';
  const system = { ...safe };
  delete system.prompt; delete system.choices; delete system.options; delete system.answer; delete system.correctAnswer; delete system.explanation;
  return [
    '### Question: ' + (safe.questionId || 'MISSING-QUESTION-ID'), '',
    'STATUS: LEGACY',
    'TEST KEY: ' + (safe.testKey || safe.testId || ''),
    'TEST ID: ' + (safe.testId || ''),
    'SECTION: ' + (safe.section || ''),
    'MODULE: ' + (safe.module || ''),
    'DOMAIN: ' + (safe.domain || ''),
    'SKILL: ' + (safe.skill || ''),
    'DIFFICULTY: ' + (safe.difficulty || safe.difficultyBand || ''),
    'QUESTION TYPE: ' + (safe.questionType || safe.type || ''), '',
    'PROMPT:', String(safe.prompt ?? ''), '',
    'CHOICES:', JSON.stringify(choices, null, 2), '',
    'ANSWER:', String(answer), '',
    'EXPLANATION:', String(safe.explanation ?? ''), '',
    'SYSTEM METADATA (DO NOT EDIT DIRECTLY):', '```json', JSON.stringify(system, null, 2), '```', ''
  ].join('\n');
}

const byKey = new Map(corpus.map((mock) => [normalizeKey(mock), mock]));
const missing = MOCK_KEYS.filter((key) => !byKey.has(key));
if (missing.length) throw new Error('Legacy corpus export missing frozen mock(s): ' + missing.join(', '));
fs.mkdirSync(outputRoot, { recursive: true });

for (const key of MOCK_KEYS) {
  const mock = byKey.get(key);
  const records = [...(Array.isArray(mock?.readingWriting) ? mock.readingWriting : []), ...(Array.isArray(mock?.math) ? mock.math : [])];
  if (records.length !== 196) throw new Error('Legacy corpus export expected 196 records for ' + key + ', found ' + records.length);
  const sections = [
    '# ' + key + ' — Legacy Human-Editable Export', '',
    'STATUS: LEGACY', 'APPROVAL: NOT APPROVED',
    'TEST KEY: ' + key, 'TEST ID: ' + (mock?.testId || ''),
    'ASSESSMENT VARIANT: ' + (mock?.assessmentVariant || mock?.variant || ''),
    'QUESTION COUNT: ' + records.length, '',
    '> This file is a working copy of the frozen 30-mock production corpus. It is not launch-approved content.',
    '> Changes here do not mutate canonical production content. Promote only explicitly approved questions through the controlled workflow.', '',
    ...records.map(questionToMarkdown)
  ];
  fs.writeFileSync(path.join(outputRoot, key + '.md'), sections.join('\n'), 'utf8');
}

console.log(JSON.stringify({ status: 'LEGACY_EXPORT_COMPLETE', outputRoot, mockCount: MOCK_KEYS.length, mocks: MOCK_KEYS, questions: MOCK_KEYS.length * 196, approvedMutation: false, sat21Created: false }, null, 2));