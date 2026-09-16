import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const selectionPath = path.join(root, 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json');
const outputPath = path.join(root, '.batch-m-selection-bound-candidates.json');

const sourceRoot = String(process.env.BATCH_M_SELECTION_SOURCE_DIR || '').trim();
const generationCommit = String(process.env.BATCH_M_SELECTION_GENERATION_COMMIT || '').trim();
if (!sourceRoot) throw new Error('Batch M candidate snapshot: BATCH_M_SELECTION_SOURCE_DIR is required.');
if (!/^[0-9a-f]{40}$/i.test(generationCommit)) throw new Error('Batch M candidate snapshot: BATCH_M_SELECTION_GENERATION_COMMIT must be a 40-character commit SHA.');

const selection = JSON.parse(fs.readFileSync(selectionPath, 'utf8'));
const records = Array.isArray(selection.records) ? selection.records : [];
const selectedRecords = records.filter((record) => record.selectionDisposition === 'REPLACEMENT_CANDIDATE_SELECTED_FOR_DOWNSTREAM_APPROVAL');
if (selectedRecords.length !== selection.summary?.selected) {
  throw new Error(`Batch M candidate snapshot: expected ${selection.summary?.selected} selected records, found ${selectedRecords.length}.`);
}

const factoryPath = path.join(sourceRoot, 'src/data/sat/mockContent/batchMRemediationCandidateFactory.js');
const loaderPath = path.join(sourceRoot, 'scripts/batchMExtensionlessModuleLoader.mjs');
if (!fs.existsSync(factoryPath)) throw new Error(`Batch M candidate snapshot: historical factory not found at ${factoryPath}.`);
if (!fs.existsSync(loaderPath)) throw new Error(`Batch M candidate snapshot: historical module loader not found at ${loaderPath}.`);

const { buildRepresentativeBatchMRemediationCandidates } = await import(pathToFileURL(factoryPath).href);

function buildPool(product) {
  return buildRepresentativeBatchMRemediationCandidates({
    rwCount: 5000,
    mathCount: 8000,
    testId: product === 'sat' ? 'SAT1' : 'PSAT1',
    variant: product === 'sat' ? 'sat-series-a' : 'psat-nmsqt',
  }).candidates;
}

const pools = {
  sat: buildPool('sat'),
  psat: buildPool('psat'),
};

const byProduct = {
  sat: new Map(pools.sat.map((candidate, index) => [String(candidate.originalityFingerprint || ''), { candidate, index }])),
  psat: new Map(pools.psat.map((candidate, index) => [String(candidate.originalityFingerprint || ''), { candidate, index }])),
};

const snapshotRecords = [];
for (const record of selectedRecords) {
  const product = String(record.testKey || '').startsWith('SAT') ? 'sat' : 'psat';
  const key = String(record.selectedCandidateKey || '');
  const selectedOption = Array.isArray(record.options)
    ? record.options.find((option) => String(option.candidateKey || '') === key && option.verdict === 'eligible')
    : null;
  const expectedFingerprint = String(selectedOption?.fingerprint || '');
  const expectedPoolIndex = Number.isInteger(selectedOption?.poolIndex) ? selectedOption.poolIndex : null;
  if (!expectedFingerprint) throw new Error(`Batch M candidate snapshot: ${record.testKey}/${record.questionId} has no eligible fingerprint for ${key}.`);

  const pool = pools[product];
  let resolved = expectedPoolIndex !== null ? pool[expectedPoolIndex] : null;
  if (resolved && String(resolved.originalityFingerprint || '') !== expectedFingerprint) resolved = null;
  if (!resolved) resolved = byProduct[product].get(expectedFingerprint)?.candidate || null;
  if (!resolved) {
    throw new Error(`Batch M candidate snapshot: authorized candidate ${key} with fingerprint ${expectedFingerprint} cannot be resolved from historical generation commit ${generationCommit}.`);
  }

  snapshotRecords.push({
    testKey: record.testKey,
    questionId: record.questionId,
    selectedCandidateKey: key,
    expectedFingerprint,
    selectedPoolIndex: expectedPoolIndex,
    resolvedCandidateKey: String(resolved.candidateKey || ''),
    candidate: resolved,
  });
}

const snapshot = {
  reportType: 'batch-m-selection-bound-candidate-snapshot',
  reportVersion: '2026-09-16.selection-bound.v1',
  generationCommit,
  selectionReport: 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json',
  selectedCount: snapshotRecords.length,
  candidatePoolCounts: {
    sat: { rw: 5000, math: 8000, total: pools.sat.length },
    psat: { rw: 5000, math: 8000, total: pools.psat.length },
  },
  records: snapshotRecords,
};

fs.writeFileSync(outputPath, `${JSON.stringify(snapshot)}\n`, 'utf8');
console.log(JSON.stringify({
  snapshotPath: '.batch-m-selection-bound-candidates.json',
  generationCommit,
  selectedCount: snapshotRecords.length,
  satPoolCount: pools.sat.length,
  psatPoolCount: pools.psat.length,
}, null, 2));
