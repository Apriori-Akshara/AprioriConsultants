import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { evaluateContentQualityBatch } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { BATCH_M_TARGETED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMTargetedProductionCorpus.js';
import { canonicalBatchMTestKey } from '../src/data/sat/mockContent/batchMCanonicalTestKey.js';
import { SAT_DIFFICULTIES } from '../src/data/sat/questionSchema.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const selectionPath = path.join(root, 'docs/BATCH-M-AUTHORITATIVE-CANDIDATE-SELECTION-2026-09-16.json');
const authorizationPath = path.join(root, 'docs/BATCH-M-REPLACEMENT-AUTHORIZATION-GATE-2026-09-16.md');
const mapPath = path.join(root, 'src/data/sat/mockContent/batchMControlledReplacementMap.js');
const reportPath = path.join(root, 'docs/BATCH-M-CONTROLLED-REPLACEMENT-2026-09-16.json');
const storePath = path.join(root, 'src/data/sat/mockContent/batchMProductionStore.js');

const selection = JSON.parse(fs.readFileSync(selectionPath, 'utf8'));
const authorization = fs.readFileSync(authorizationPath, 'utf8');
if (!authorization.includes('**Authorization state:** `AUTHORIZED`')) throw new Error('Batch M controlled replacement: explicit AUTHORIZED state is missing.');
if (selection.reportType !== 'batch-m-authoritative-replacement-candidate-selection') throw new Error('Batch M controlled replacement: authoritative selection report is required.');
if (selection.productionMutation !== false) throw new Error('Batch M controlled replacement: authoritative selection must remain candidate-only.');
if (selection.releaseEligible !== false) throw new Error('Batch M controlled replacement: authoritative selection must remain release-ineligible.');
if (selection.summary?.noEligibleCandidate !== 0) throw new Error('Batch M controlled replacement: candidate coverage is not resolved.');

const records = Array.isArray(selection.records) ? selection.records : [];
const selectedRecords = records.filter((record) => record.selectionDisposition === 'REPLACEMENT_CANDIDATE_SELECTED_FOR_DOWNSTREAM_APPROVAL');
if (selectedRecords.length !== selection.summary?.selected || selectedRecords.length !== 1594) throw new Error(`Batch M controlled replacement: expected 1594 selected records, found ${selectedRecords.length}.`);
if (records.length !== 2144) throw new Error(`Batch M controlled replacement: expected 2144 total records, found ${records.length}.`);
if (selection.summary?.sat !== 1071 || selection.summary?.psat !== 1073) throw new Error('Batch M controlled replacement: selected SAT/PSAT counts do not match the authorized scope.');

function normalize(value) { return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' '); }
function stable(value) { return JSON.stringify(value, Object.keys(value || {}).sort()); }
function selectorFingerprint(question) {
  return crypto.createHash('sha256').update(String(stable({
    section: question.section,
    prompt: normalize(question.prompt),
    choices: (question.choices || []).map(normalize),
    answer: normalize(question.answer),
    figure: question.figure || null,
    domain: question.domain,
    skill: question.skill,
    difficulty: question.difficulty,
  }))).digest('hex').slice(0, 16);
}

const productionQuestionMap = new Map();
for (const mock of BATCH_M_TARGETED_PRODUCTION_CORPUS) {
  const testKey = canonicalBatchMTestKey(mock);
  for (const question of [...(mock.readingWriting || []), ...(mock.math || [])]) {
    const questionId = String(question?.questionId || question?.contentId || '');
    if (!testKey || !questionId) continue;
    const key = `${testKey}::${questionId}`;
    if (productionQuestionMap.has(key)) throw new Error(`Batch M controlled replacement: duplicate production target encountered: ${key}.`);
    productionQuestionMap.set(key, question);
  }
}

const selectedCandidates = [];
const replacements = [];
const used = { sat: new Set(), psat: new Set() };

for (const record of selectedRecords) {
  if (!/^(SAT|PSAT)(?:[1-9]|10)$/.test(String(record.testKey || ''))) throw new Error(`Batch M controlled replacement: out-of-scope target ${record.testKey}.`);
  const targetKey = `${record.testKey}::${record.questionId}`;
  const baseQuestion = productionQuestionMap.get(targetKey);
  if (!baseQuestion) throw new Error(`Batch M controlled replacement: production target missing from frozen corpus: ${targetKey}.`);

  const candidate = record.selectedCandidate;
  if (!candidate || typeof candidate !== 'object') throw new Error(`Batch M controlled replacement: exact selected candidate payload missing for ${targetKey}.`);
  const expectedFingerprint = String(record.selectedCandidateFingerprint || '');
  const keyFingerprint = String(record.selectedCandidateKey || '').split(':').at(-1);
  const resolvedFingerprint = selectorFingerprint(candidate);
  const product = String(record.testKey || '').startsWith('PSAT') ? 'psat' : 'sat';
  if (!/^[0-9a-f]{16}$/i.test(expectedFingerprint) || expectedFingerprint !== keyFingerprint || resolvedFingerprint !== expectedFingerprint) {
    throw new Error(`Batch M controlled replacement: exact selected candidate fingerprint failed for ${targetKey}.`);
  }
  if (used[product].has(resolvedFingerprint)) throw new Error(`Batch M controlled replacement: candidate fingerprint reused within ${product}: ${resolvedFingerprint}.`);
  used[product].add(resolvedFingerprint);

  selectedCandidates.push(candidate);

  const replacement = {
    ...baseQuestion,
    prompt: candidate.prompt,
    choices: candidate.choices,
    answer: candidate.answer,
    explanation: candidate.explanation,
    rationale: candidate.rationale,
    figure: candidate.figure ?? null,
    metadata: candidate.metadata ?? baseQuestion.metadata,
    originalityFingerprint: String(candidate.originalityFingerprint || baseQuestion.originalityFingerprint || '').replaceAll(String(candidate.testId || ''), record.testKey),
  };

  if (/DIFFICULTY/i.test(String(record.remediationType || '')) && SAT_DIFFICULTIES.includes(candidate.difficulty)) {
    replacement.difficulty = candidate.difficulty;
  }

  replacements.push({
    testKey: record.testKey,
    questionId: record.questionId,
    remediationType: record.remediationType,
    selectionDisposition: record.selectionDisposition,
    selectedCandidateKey: record.selectedCandidateKey,
    selectedCandidatePoolIndex: record.selectedCandidatePoolIndex,
    candidateFingerprint: expectedFingerprint,
    selectionGenerationSource: selection.selectionSource,
    selectionReport: 'docs/BATCH-M-AUTHORITATIVE-CANDIDATE-SELECTION-2026-09-16.json',
    replacement,
  });
}

const selectedReplacementQuestions = replacements.map((item) => item.replacement);
const quality = evaluateContentQualityBatch(selectedReplacementQuestions);
if (!quality?.passed) throw new Error(`Batch M controlled replacement: selected replacement quality gate failed (${quality?.failedCount ?? 'unknown'} failures).`);

let store = fs.readFileSync(storePath, 'utf8');
if (store.includes('const BATCH_M_PRE_REPLACEMENT_CORPUS = Object.freeze([')) throw new Error('Batch M controlled replacement: production store already contains a controlled-replacement transformation; refusing to reapply.');
const importLine = "import { applyBatchMControlledReplacements } from './batchMControlledReplacementMapAdapter';";
if (!store.includes(importLine)) {
  const anchor = "import { runBatchMFinalCorpusGate } from './batchMFinalCorpusGate';";
  const anchorIndex = store.indexOf(anchor);
  if (anchorIndex === -1) throw new Error('Batch M controlled replacement: production-store import anchor not found.');
  store = store.slice(0, anchorIndex + anchor.length) + `\n${importLine}` + store.slice(anchorIndex + anchor.length);
}
const marker = 'export const BATCH_M_ACCEPTED_PRODUCTION_CORPUS = Object.freeze([';
const start = store.indexOf(marker);
if (start === -1) throw new Error('Batch M controlled replacement: production-store corpus marker not found.');
const end = store.indexOf('\n]);', start);
if (end === -1) throw new Error('Batch M controlled replacement: production-store corpus terminator not found.');
const block = store.slice(start, end + 4);
const replacementBlock = block
  .replace('export const BATCH_M_ACCEPTED_PRODUCTION_CORPUS', 'const BATCH_M_PRE_REPLACEMENT_CORPUS')
  .concat('\n\nexport const BATCH_M_ACCEPTED_PRODUCTION_CORPUS = Object.freeze(applyBatchMControlledReplacements(BATCH_M_PRE_REPLACEMENT_CORPUS));');
store = store.slice(0, start) + replacementBlock + store.slice(end + 4);

const map = {};
for (const item of replacements) map[`${item.testKey}::${item.questionId}`] = item.replacement;
fs.writeFileSync(mapPath, `/** Generated deterministic Batch M controlled replacement map. */\nexport const BATCH_M_CONTROLLED_REPLACEMENT_MAP = Object.freeze(${JSON.stringify(map, null, 2)});\n`, 'utf8');
fs.writeFileSync(storePath, store, 'utf8');

const report = {
  reportType: 'batch-m-controlled-replacement',
  reportVersion: '2026-09-16.controlled-replacement.authoritative-v2',
  authorization: 'AUTHORIZED',
  scope: 'SAT1-SAT10 and PSAT1-PSAT10 affected records only',
  sourceSelectionReport: 'docs/BATCH-M-AUTHORITATIVE-CANDIDATE-SELECTION-2026-09-16.json',
  selectionGenerationSource: selection.selectionSource,
  fingerprintAlgorithm: 'sha256(stable(section,prompt,choices,answer,figure,domain,skill,difficulty))[0:16]',
  replacementConstruction: 'candidate content merged onto the canonical production target question; production-only schema metadata is preserved; difficulty changes are applied only for difficulty-bearing remediation records',
  sat21Created: false,
  selectedCount: selectedRecords.length,
  appliedCount: replacements.length,
  qualityGatePassed: true,
  productionMutation: true,
  releaseEligible: false,
  records: replacements.map(({ replacement, ...item }) => ({ ...item, applied: true, replacementQuestionId: replacement.questionId })),
};
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ selectedCount: selectedRecords.length, appliedCount: replacements.length, qualityGatePassed: true, productionMutation: true, releaseEligible: false, sat21Created: false }, null, 2));
