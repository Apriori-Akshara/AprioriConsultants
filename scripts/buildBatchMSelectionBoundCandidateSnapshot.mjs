import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const selectionPath = path.join(root, 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json');
const outputPath = path.join(root, '.batch-m-selection-bound-candidates.json');

const sourceRoot = String(process.env.BATCH_M_SELECTION_SOURCE_DIR || '').trim();
const generationCommit = String(process.env.BATCH_M_SELECTION_GENERATION_COMMIT || '').trim();
const maxAttempts = Number.parseInt(process.env.BATCH_M_CANDIDATE_RESOLUTION_ATTEMPTS || '32', 10);
if (!sourceRoot) throw new Error('Batch M candidate snapshot: BATCH_M_SELECTION_SOURCE_DIR is required.');
if (!/^[0-9a-f]{40}$/i.test(generationCommit)) throw new Error('Batch M candidate snapshot: BATCH_M_SELECTION_GENERATION_COMMIT must be a 40-character commit SHA.');
if (!Number.isInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 128) throw new Error('Batch M candidate snapshot: BATCH_M_CANDIDATE_RESOLUTION_ATTEMPTS must be 1-128.');

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

function normalize(value) {
  return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function stable(value) {
  return JSON.stringify(value, Object.keys(value || {}).sort());
}

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

function buildPool(product) {
  return buildRepresentativeBatchMRemediationCandidates({
    rwCount: 5000,
    mathCount: 8000,
    testId: product === 'sat' ? 'SAT1' : 'PSAT1',
    variant: product === 'sat' ? 'sat-series-a' : 'psat-nmsqt',
  }).candidates;
}

const expectedByProduct = { sat: new Map(), psat: new Map() };
for (const record of selectedRecords) {
  const product = String(record.testKey || '').startsWith('SAT') ? 'sat' : 'psat';
  const key = String(record.selectedCandidateKey || '');
  const selectedOption = Array.isArray(record.options)
    ? record.options.find((option) => String(option.candidateKey || '') === key && option.verdict === 'eligible')
    : null;
  const fingerprint = String(selectedOption?.fingerprint || String(key).split(':').at(-1) || '');
  if (!/^[0-9a-f]{16}$/i.test(fingerprint)) {
    throw new Error(`Batch M candidate snapshot: ${record.testKey}/${record.questionId} has no valid authorized selector fingerprint for ${key}.`);
  }
  expectedByProduct[product].set(`${record.testKey}::${record.questionId}`, {
    testKey: record.testKey,
    questionId: record.questionId,
    selectedCandidateKey: key,
    expectedFingerprint: fingerprint,
    selectedPoolIndex: Number.isInteger(selectedOption?.poolIndex) ? selectedOption.poolIndex : null,
  });
}

const resolvedByTarget = new Map();
const unresolvedFingerprints = new Set([
  ...Array.from(expectedByProduct.sat.values(), (item) => `sat:${item.expectedFingerprint}`),
  ...Array.from(expectedByProduct.psat.values(), (item) => `psat:${item.expectedFingerprint}`),
]);

for (let attempt = 1; attempt <= maxAttempts && unresolvedFingerprints.size > 0; attempt += 1) {
  const pools = {
    sat: buildPool('sat'),
    psat: buildPool('psat'),
  };

  for (const [product, pool] of Object.entries(pools)) {
    const byFingerprint = new Map();
    pool.forEach((candidate, index) => {
      const fingerprint = selectorFingerprint(candidate);
      if (!byFingerprint.has(fingerprint)) byFingerprint.set(fingerprint, { candidate, index });
    });

    for (const [targetKey, expected] of expectedByProduct[product].entries()) {
      if (resolvedByTarget.has(targetKey)) continue;
      const token = `${product}:${expected.expectedFingerprint}`;
      const resolved = byFingerprint.get(expected.expectedFingerprint);
      if (!resolved) continue;

      const resolvedFingerprint = selectorFingerprint(resolved.candidate);
      if (resolvedFingerprint !== expected.expectedFingerprint) {
        throw new Error(`Batch M candidate snapshot: fingerprint verification failed for ${targetKey}.`);
      }

      resolvedByTarget.set(targetKey, {
        ...expected,
        resolvedPoolIndex: resolved.index,
        resolvedAttempt: attempt,
        candidate: resolved.candidate,
      });
      unresolvedFingerprints.delete(token);
    }
  }

  console.log(`Batch M candidate resolution attempt ${attempt}/${maxAttempts}: resolved ${resolvedByTarget.size}/${selectedRecords.length}; unresolved fingerprints ${unresolvedFingerprints.size}.`);
}

if (resolvedByTarget.size !== selectedRecords.length) {
  const missing = selectedRecords
    .filter((record) => !resolvedByTarget.has(`${record.testKey}::${record.questionId}`))
    .slice(0, 25)
    .map((record) => `${record.testKey}::${record.questionId}=${record.selectedCandidateKey}`);
  throw new Error(
    `Batch M candidate snapshot: ${resolvedByTarget.size}/${selectedRecords.length} authorized candidates resolved after ${maxAttempts} pool-generation attempts. `
    + `Unresolved examples: ${missing.join(', ')}`
  );
}

const snapshotRecords = selectedRecords.map((record) => {
  const targetKey = `${record.testKey}::${record.questionId}`;
  const resolved = resolvedByTarget.get(targetKey);
  const resolvedFingerprint = selectorFingerprint(resolved.candidate);
  if (resolvedFingerprint !== resolved.expectedFingerprint) {
    throw new Error(`Batch M candidate snapshot: final fingerprint verification failed for ${targetKey}.`);
  }
  return {
    testKey: resolved.testKey,
    questionId: resolved.questionId,
    selectedCandidateKey: resolved.selectedCandidateKey,
    expectedFingerprint: resolved.expectedFingerprint,
    selectedPoolIndex: resolved.selectedPoolIndex,
    resolvedCandidateKey: `${String(record.selectedCandidateKey).split(':')[0]}:${resolved.resolvedPoolIndex}:${resolvedFingerprint}`,
    resolvedPoolIndex: resolved.resolvedPoolIndex,
    resolvedAttempt: resolved.resolvedAttempt,
    candidate: resolved.candidate,
  };
});

const snapshot = {
  reportType: 'batch-m-selection-bound-candidate-snapshot',
  reportVersion: '2026-09-16.fingerprint-recovery.v1',
  generationCommit,
  selectionReport: 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json',
  resolutionMode: 'authorized-selector-fingerprint-with-retry',
  resolutionAttempts: maxAttempts,
  fingerprintAlgorithm: 'sha256(stable(section,prompt,choices,answer,figure,domain,skill,difficulty))[0:16]',
  selectedCount: snapshotRecords.length,
  candidatePoolCountsPerAttempt: {
    sat: { rw: 5000, math: 8000, total: 13000 },
    psat: { rw: 5000, math: 8000, total: 13000 },
  },
  records: snapshotRecords,
};

fs.writeFileSync(outputPath, `${JSON.stringify(snapshot)}\n`, 'utf8');
console.log(JSON.stringify({
  snapshotPath: '.batch-m-selection-bound-candidates.json',
  generationCommit,
  selectedCount: snapshotRecords.length,
  resolutionAttempts: maxAttempts,
  resolvedOnAttempt: Math.max(...snapshotRecords.map((record) => record.resolvedAttempt)),
  resolutionMode: snapshot.resolutionMode,
}, null, 2));
