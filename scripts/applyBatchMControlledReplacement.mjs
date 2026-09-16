import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRepresentativeBatchMRemediationCandidates } from '../src/data/sat/mockContent/batchMRemediationCandidateFactory.js';
import { evaluateContentQualityBatch } from '../src/data/sat/mockContent/batchMContentQualityGate.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const selectionPath = path.join(root, 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json');
const authorizationPath = path.join(root, 'docs/BATCH-M-REPLACEMENT-AUTHORIZATION-2026-09-16.md');
const mapPath = path.join(root, 'src/data/sat/mockContent/batchMControlledReplacementMap.js');
const reportPath = path.join(root, 'docs/BATCH-M-CONTROLLED-REPLACEMENT-2026-09-16.json');

const selection = JSON.parse(fs.readFileSync(selectionPath, 'utf8'));
const authorization = fs.readFileSync(authorizationPath, 'utf8');

if (!authorization.includes('**Authorization state:** `AUTHORIZED`')) {
  throw new Error('Batch M controlled replacement: explicit AUTHORIZED state is missing.');
}
if (selection.summary?.noEligibleCandidate !== 0) {
  throw new Error('Batch M controlled replacement: candidate coverage is not resolved.');
}

const records = Array.isArray(selection.records) ? selection.records : [];
const selectedRecords = records.filter((record) => record.selectionDisposition === 'REPLACEMENT_CANDIDATE_SELECTED_FOR_DOWNSTREAM_APPROVAL');
if (selectedRecords.length !== selection.summary.selected) {
  throw new Error(`Batch M controlled replacement: expected ${selection.summary.selected} selected records, found ${selectedRecords.length}.`);
}

const inScope = (record) => /^(SAT|PSAT)(?:[1-9]|10)$/.test(String(record.testKey || ''));
if (selectedRecords.some((record) => !inScope(record))) {
  throw new Error('Batch M controlled replacement: an out-of-scope production target was selected.');
}

function buildPool(product) {
  return buildRepresentativeBatchMRemediationCandidates({
    rwCount: 5000,
    mathCount: 8000,
    testId: product === 'sat' ? 'SAT1' : 'PSAT1',
    variant: product === 'sat' ? 'sat-series-a' : 'psat-nmsqt',
  }).candidates;
}

const satPool = buildPool('sat');
const psatPool = buildPool('psat');

function resolveSelectedCandidate(record) {
  const key = String(record.selectedCandidateKey || '');
  const productPool = String(record.testKey || '').startsWith('SAT') ? satPool : psatPool;
  const selectedOption = Array.isArray(record.options)
    ? record.options.find((option) => String(option.candidateKey || '') === key && option.verdict === 'eligible')
    : null;
  const expectedFingerprint = String(selectedOption?.fingerprint || '');
  const expectedPoolIndex = Number.isInteger(selectedOption?.poolIndex) ? selectedOption.poolIndex : null;

  if (!expectedFingerprint) {
    throw new Error(`Batch M controlled replacement: selected candidate ${key} has no recorded eligible fingerprint.`);
  }

  let candidate = expectedPoolIndex !== null ? productPool[expectedPoolIndex] : null;
  if (candidate && String(candidate.originalityFingerprint || '') !== expectedFingerprint) {
    candidate = null;
  }
  if (!candidate) {
    candidate = productPool.find((item) => String(item.originalityFingerprint || '') === expectedFingerprint) || null;
  }
  if (!candidate) {
    throw new Error(`Batch M controlled replacement: selected candidate ${key} with fingerprint ${expectedFingerprint} was not found in the deterministic candidate pool.`);
  }

  return { candidate, expectedFingerprint, expectedPoolIndex };
}

const replacements = [];
const selectedCandidates = [];

for (const record of selectedRecords) {
  const key = String(record.selectedCandidateKey || '');
  const { candidate, expectedFingerprint, expectedPoolIndex } = resolveSelectedCandidate(record);

  const replacement = {
    ...candidate,
    testId: record.testKey,
    questionId: record.questionId,
    contentId: record.questionId,
    originalityFingerprint: String(candidate.originalityFingerprint || '').replaceAll(String(candidate.testId || ''), record.testKey),
  };

  replacements.push({
    testKey: record.testKey,
    questionId: record.questionId,
    remediationType: record.remediationType,
    selectionDisposition: record.selectionDisposition,
    selectedCandidateKey: key,
    resolvedCandidateKey: String(candidate.candidateKey || ''),
    selectedPoolIndex: expectedPoolIndex,
    candidateFingerprint: expectedFingerprint,
    replacement,
  });
  selectedCandidates.push(replacement);
}

const quality = evaluateContentQualityBatch(selectedCandidates);
if (!quality?.passed) {
  throw new Error(`Batch M controlled replacement: selected replacement quality gate failed (${quality?.failedCount ?? 'unknown'} failures).`);
}

const map = {};
for (const item of replacements) {
  map[`${item.testKey}::${item.questionId}`] = item.replacement;
}

const mapSource = `/** Generated deterministic Batch M controlled replacement map. */\nexport const BATCH_M_CONTROLLED_REPLACEMENT_MAP = Object.freeze(${JSON.stringify(map, null, 2)});\n`;
fs.writeFileSync(mapPath, mapSource, 'utf8');

const report = {
  reportType: 'batch-m-controlled-replacement',
  reportVersion: '2026-09-16.controlled-replacement.v1',
  authorization: 'AUTHORIZED',
  scope: 'SAT1-SAT10 and PSAT1-PSAT10 affected records only',
  sat21Created: false,
  selectedCount: selectedRecords.length,
  appliedCount: replacements.length,
  qualityGatePassed: true,
  productionMutation: true,
  releaseEligible: false,
  records: replacements.map(({ replacement, ...item }) => ({
    ...item,
    applied: true,
    replacementQuestionId: replacement.questionId,
  })),
};
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

const storePath = path.join(root, 'src/data/sat/mockContent/batchMProductionStore.js');
let store = fs.readFileSync(storePath, 'utf8');
if (!store.includes("./batchMControlledReplacementMap")) {
  store = store.replace(
    "import { runBatchMFinalCorpusGate } from './batchMFinalCorpusGate';",
    "import { runBatchMFinalCorpusGate } from './batchMFinalCorpusGate';\nimport { applyBatchMControlledReplacements } from './batchMControlledReplacementMapAdapter';"
  );
}
const marker = 'export const BATCH_M_ACCEPTED_PRODUCTION_CORPUS = Object.freeze([';
const start = store.indexOf(marker);
if (start === -1) throw new Error('Batch M controlled replacement: production-store corpus marker not found.');
if (!store.includes('const BATCH_M_PRE_REPLACEMENT_CORPUS = Object.freeze([')) {
  const end = store.indexOf('\n]);', start);
  if (end === -1) throw new Error('Batch M controlled replacement: production-store corpus terminator not found.');
  const block = store.slice(start, end + 4);
  const replacementBlock = block
    .replace('export const BATCH_M_ACCEPTED_PRODUCTION_CORPUS', 'const BATCH_M_PRE_REPLACEMENT_CORPUS')
    .concat('\n\nexport const BATCH_M_ACCEPTED_PRODUCTION_CORPUS = Object.freeze(applyBatchMControlledReplacements(BATCH_M_PRE_REPLACEMENT_CORPUS));');
  store = store.slice(0, start) + replacementBlock + store.slice(end + 4);
}
fs.writeFileSync(storePath, store, 'utf8');

console.log(`Batch M controlled replacement prepared: ${replacements.length} records.`);
console.log('Selected replacement quality gate: PASS');
console.log('Production replacement scope: SAT1-SAT10 + PSAT1-PSAT10 only');
console.log('SAT21: false');
