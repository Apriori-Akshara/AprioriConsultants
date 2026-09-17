/**
 * Batch M — candidate-only substantive remediation pool.
 *
 * Generates a large, independently screened candidate pool for the failure
 * classes identified by the deep SAT/PSAT content-quality QC. This script
 * never mutates the frozen production corpus and never authorizes release.
 * Workflow trigger revision: v1.
 */

import fs from 'node:fs';
import { buildRepresentativeBatchMRemediationCandidates } from '../src/data/sat/mockContent/batchMRemediationCandidateFactory.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';

const OUTPUT_DIR = 'artifacts/batch-m-deep-content-quality-remediation-candidates';
const OUTPUT_JSON = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-REMEDIATION-CANDIDATES-2026-09-17.json`;
const OUTPUT_MD = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-REMEDIATION-CANDIDATES-2026-09-17.md`;
const RW_COUNT = 1000;
const MATH_COUNT = 1000;
const TESTS = ['SAT1', 'SAT2', 'SAT3', 'SAT4', 'SAT5', 'SAT6', 'SAT7', 'SAT8', 'SAT9', 'SAT10', 'PSAT1', 'PSAT2', 'PSAT3', 'PSAT4', 'PSAT5', 'PSAT6', 'PSAT7', 'PSAT8', 'PSAT9', 'PSAT10', 'SAT11', 'SAT12', 'SAT13', 'SAT14', 'SAT15', 'SAT16', 'SAT17', 'SAT18', 'SAT19', 'SAT20'];

function ensureDir(path) { fs.mkdirSync(path, { recursive: true }); }
function normalize(value) { return String(value || '').trim().toLowerCase().replace(/\s+/g, ' '); }
function words(value) { return normalize(value).split(/\s+/).filter(Boolean); }
function ngrams(value, size = 5) {
  const tokens = words(value);
  const result = [];
  for (let i = 0; i <= tokens.length - size; i += 1) result.push(tokens.slice(i, i + size).join(' '));
  return result;
}
function ngramOverlap(a, b) {
  const left = new Set(ngrams(a));
  const right = new Set(ngrams(b));
  if (!left.size || !right.size) return 0;
  let common = 0;
  for (const item of left) if (right.has(item)) common += 1;
  return common / Math.min(left.size, right.size);
}
function targetClasses(question) {
  const targets = [];
  if (question.section === 'math') {
    if (question.questionType === 'multiple-choice') targets.push('math-distractor-construction');
    if (question.difficulty === 'hard') targets.push('hard-reasoning-demand');
    if (String(question.prompt || '').length > 0) targets.push('math-template-diversity');
  } else if (question.section === 'reading-writing') {
    if (['Transitions', 'Boundaries', 'Form, Structure, and Sense'].includes(question.skill)) targets.push('rw-stimulus-length');
    if (question.skill === 'Words in Context') targets.push('rw-wic-target-diversity');
    targets.push('rw-template-diversity');
    if (question.skill === 'Cross-Text Connections') targets.push('rw-prompt-diversity');
  }
  return targets;
}

function candidateAccepts(question) {
  const quality = evaluateContentQuality(question);
  if (quality.verdict !== 'pass') return { accepted: false, quality };
  const prompt = String(question.prompt || '');
  if (question.section === 'reading-writing' && question.skill === 'Words in Context' && /qualify/i.test(prompt)) {
    return { accepted: false, quality: { ...quality, checks: [...quality.checks, 'fixed-wic-target'] } };
  }
  return { accepted: true, quality };
}

function buildPool() {
  const generated = buildRepresentativeBatchMRemediationCandidates({ rwCount: RW_COUNT, mathCount: MATH_COUNT, testId: 'SAT1', variant: 'sat' });
  const candidates = [];
  const rejected = [];
  const promptKeys = new Set();
  const idKeys = new Set();
  for (let index = 0; index < generated.candidates.length; index += 1) {
    const original = generated.candidates[index];
    const testId = TESTS[index % TESTS.length];
    const candidate = { ...original, id: `${testId}-BATCHM-DQ-${String(index + 1).padStart(4, '0')}`, testId, metadata: { ...(original.metadata || {}), remediationPool: { version: 'batch-m-deep-content-quality-remediation-v1', sourceIndex: index, targetClasses: targetClasses(original), productionMutation: false } } };
    const promptKey = normalize(candidate.prompt);
    const duplicatePrompt = promptKeys.has(promptKey);
    const duplicateId = idKeys.has(candidate.id);
    const screening = candidateAccepts(candidate);
    if (!screening.accepted || duplicatePrompt || duplicateId) {
      rejected.push({ id: candidate.id, reasons: [...(screening.quality.checks || []), ...(duplicatePrompt ? ['duplicate-normalized-prompt'] : []), ...(duplicateId ? ['duplicate-id'] : [])] });
      continue;
    }
    promptKeys.add(promptKey);
    idKeys.add(candidate.id);
    candidates.push(candidate);
  }
  const diversityAccepted = [];
  const diversityRejected = [];
  for (const candidate of candidates) {
    let tooClose = false;
    for (const existing of diversityAccepted.slice(-250)) {
      if (ngramOverlap(candidate.prompt, existing.prompt) >= 0.60) { tooClose = true; break; }
    }
    if (tooClose) diversityRejected.push({ id: candidate.id, reason: 'high-5gram-overlap-with-candidate-pool' });
    else diversityAccepted.push(candidate);
  }
  const coverage = {};
  for (const candidate of diversityAccepted) for (const target of targetClasses(candidate)) coverage[target] = (coverage[target] || 0) + 1;
  return { candidates: diversityAccepted, generatedCount: generated.candidates.length, rejectedCount: rejected.length + diversityRejected.length, qualityRejectedCount: rejected.length, diversityRejectedCount: diversityRejected.length, coverage, productionMutation: false, releaseEligible: false, sat21Created: false, source: 'batchMRemediationCandidateFactory' };
}

function main() {
  const result = buildPool();
  if (!result.candidates.length) throw new Error('Deep content-quality remediation candidate pool is empty.');
  ensureDir(OUTPUT_DIR);
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2));
  fs.writeFileSync(OUTPUT_MD, `# Batch M deep content-quality remediation candidate pool — 2026-09-17\n\n- Generated candidates: **${result.generatedCount}**.\n- Accepted candidate pool: **${result.candidates.length}**.\n- Quality-screen rejects: **${result.qualityRejectedCount}**.\n- Diversity rejects: **${result.diversityRejectedCount}**.\n- Production mutation: **false**.\n- Release eligible: **false**.\n- SAT21 created: **false**.\n\n## Target-class coverage\n\n${Object.entries(result.coverage).map(([key, value]) => `- ${key}: **${value}** candidates`).join('\n')}\n\nThe pool is candidate-only. No production question has been replaced, modified, deleted, or released. Controlled selection must occur before any production mutation can be considered.\n`);
  console.log(JSON.stringify({ status: 'candidate-pool-generated', generatedCount: result.generatedCount, acceptedCount: result.candidates.length, qualityRejectedCount: result.qualityRejectedCount, diversityRejectedCount: result.diversityRejectedCount, coverage: result.coverage, productionMutation: false, releaseEligible: false, sat21Created: false }, null, 2));
}
main();
