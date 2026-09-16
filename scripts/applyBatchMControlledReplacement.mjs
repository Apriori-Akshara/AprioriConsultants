import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateContentQualityBatch } from '../src/data/sat/mockContent/batchMContentQualityGate.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const selectionPath = path.join(root, 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json');
const authorizationPath = path.join(root, 'docs/BATCH-M-REPLACEMENT-AUTHORIZATION-2026-09-16.md');
const snapshotManifestPath = path.join(root, 'docs/BATCH-M-SELECTION-SNAPSHOT-MANIFEST-2026-09-16.json');
const snapshotPath = path.join(root, '.batch-m-selection-bound-candidates.json');
const mapPath = path.join(root, 'src/data/sat/mockContent/batchMControlledReplacementMap.js');
const reportPath = path.join(root, 'docs/BATCH-M-CONTROLLED-REPLACEMENT-2026-09-16.json');

const selection = JSON.parse(fs.readFileSync(selectionPath, 'utf8'));
const authorization = fs.readFileSync(authorizationPath, 'utf8');
const manifest = JSON.parse(fs.readFileSync(snapshotManifestPath, 'utf8'));
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));

if (!authorization.includes('**Authorization state:** `AUTHORIZED`')) {
  throw new Error('Batch M controlled replacement: explicit AUTHORIZED state is missing.');
}
if (selection.summary?.noEligibleCandidate !== 0) {
  throw new Error('Batch M controlled replacement: candidate coverage is not resolved.');
}
if (manifest.selectionReport !== 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json') {
  throw new Error('Batch M controlled replacement: snapshot manifest is bound to an unexpected selection report.');
}
if (snapshot.generationCommit !== manifest.selectionGenerationCommit) {
  throw new Error('Batch M controlled replacement: selection-bound snapshot generation commit does not match its manifest.');
}
if (snapshot.selectedCount !== selection.summary?.selected) {
  throw new Error(`Batch M controlled replacement: snapshot selected count ${snapshot.selectedCount} does not match selection count ${selection.summary?.selected}.`);
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

const snapshotByTarget = new Map(
  (Array.isArray(snapshot.records) ? snapshot.records : []).map((record) => [`${record.testKey}::${record.questionId}`, record])
);
if (snapshotByTarget.size !== selectedRecords.length) {
  throw new Error(`Batch M controlled replacement: snapshot contains ${snapshotByTarget.size} unique targets; expected ${selectedRecords.length}.`);
}

const replacements = [];
const selectedCandidates = [];

for (const record of selectedRecords) {
  const targetKey = `${record.testKey}::${record.questionId}`;
  const bound = snapshotByTarget.get(targetKey);
  if (!bound) {
    throw new Error(`Batch M controlled replacement: selection-bound candidate snapshot is missing ${targetKey}.`);
  }

  const expectedKey = String(record.selectedCandidateKey || '');
  const expectedFingerprint = String(bound.expectedFingerprint || '');
  if (String(bound.selectedCandidateKey || '') !== expectedKey) {
    throw new Error(`Batch M controlled replacement: snapshot selection key mismatch for ${targetKey}.`);
  }

  const candidate = bound.candidate;
  if (!candidate || typeof candidate !== 'object') {
    throw new Error(`Batch M controlled replacement: snapshot candidate is missing for ${targetKey}.`);
  }
  if (String(candidate.originalityFingerprint || '') !== expectedFingerprint) {
    throw new Error(`Batch M controlled replacement: snapshot fingerprint mismatch for ${targetKey}.`);
  }

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
    selectedCandidateKey: expectedKey,
    resolvedCandidateKey: String(bound.resolvedCandidateKey || candidate.candidateKey || ''),
    selectedPoolIndex: Number.isInteger(bound.selectedPoolIndex) ? bound.selectedPoolIndex : null,
    candidateFingerprint: expectedFingerprint,
    selectionGenerationCommit: snapshot.generationCommit,
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
  reportVersion: '2026-09-16.controlled-replacement.v2',
  authorization: 'AUTHORIZED',
  scope: 'SAT1-SAT10 and PSAT1-PSAT10 affected records only',
  selectionGenerationCommit: snapshot.generationCommit,
  selectionBoundSnapshot: true,
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
console.log(`Selection-bound candidate generation commit: ${snapshot.generationCommit}`);
console.log('Selected replacement quality gate: PASS');
console.log('Production replacement scope: SAT1-SAT10 + PSAT1-PSAT10 only');
console.log('SAT21: false');
