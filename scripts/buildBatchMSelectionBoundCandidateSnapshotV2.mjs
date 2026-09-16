import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const selectionPath = path.join(root, 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json');
const outputPath = path.join(root, '.batch-m-selection-bound-candidates-v2.json');

const sourceRoot = String(process.env.BATCH_M_SELECTION_SOURCE_DIR || '').trim();
const generationCommit = String(process.env.BATCH_M_SELECTION_GENERATION_COMMIT || '').trim();
const maxAttempts = Number.parseInt(process.env.BATCH_M_CANDIDATE_RESOLUTION_ATTEMPTS || '32', 10);
if (!sourceRoot) throw new Error('Batch M candidate snapshot v2: BATCH_M_SELECTION_SOURCE_DIR is required.');
if (!/^[0-9a-f]{40}$/i.test(generationCommit)) throw new Error('Batch M candidate snapshot v2: invalid generation commit.');
if (!Number.isInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 128) throw new Error('Batch M candidate snapshot v2: resolution attempts must be 1-128.');

const selection = JSON.parse(fs.readFileSync(selectionPath, 'utf8'));
const records = Array.isArray(selection.records) ? selection.records : [];
const selectedRecords = records.filter((record) => record.selectionDisposition === 'REPLACEMENT_CANDIDATE_SELECTED_FOR_DOWNSTREAM_APPROVAL');
if (selectedRecords.length !== selection.summary?.selected) {
  throw new Error(`Batch M candidate snapshot v2: expected ${selection.summary?.selected} selected records, found ${selectedRecords.length}.`);
}

const factoryPath = path.join(sourceRoot, 'src/data/sat/mockContent/batchMRemediationCandidateFactory.js');
const loaderPath = path.join(sourceRoot, 'scripts/batchMExtensionlessModuleLoader.mjs');
if (!fs.existsSync(factoryPath)) throw new Error(`Batch M candidate snapshot v2: historical factory not found at ${factoryPath}.`);
if (!fs.existsSync(loaderPath)) throw new Error(`Batch M candidate snapshot v2: historical module loader not found at ${loaderPath}.`);

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

function parseCandidateKey(value) {
  const parts = String(value || '').split(':');
  return { product: parts[0] || '', fingerprint: parts.at(-1) || '' };
}

function buildPool(product) {
  return buildRepresentativeBatchMRemediationCandidates({
    rwCount: 5000,
    mathCount: 8000,
    testId: product === 'sat' ? 'SAT1' : 'PSAT1',
    variant: product === 'sat' ? 'sat-series-a' : 'psat-nmsqt',
  }).candidates;
}

const selectedFingerprintsByProduct = { sat: new Set(), psat: new Set() };
const targets = selectedRecords.map((record) => {
  const product = String(record.testKey || '').startsWith('PSAT') ? 'psat' : 'sat';
  const selectedKey = String(record.selectedCandidateKey || '');
  const selected = parseCandidateKey(selectedKey);
  if (!/^[0-9a-f]{16}$/i.test(selected.fingerprint)) {
    throw new Error(`Batch M candidate snapshot v2: invalid selected candidate fingerprint for ${record.testKey}/${record.questionId}.`);
  }
  selectedFingerprintsByProduct[product].add(selected.fingerprint);

  const options = Array.isArray(record.options)
    ? record.options
      .filter((option) => option?.verdict === 'eligible' && /^[0-9a-f]{16}$/i.test(String(option.fingerprint || '')))
      .map((option, index) => ({
        rank: index + 1,
        candidateKey: String(option.candidateKey || ''),
        poolIndex: Number.isInteger(option.poolIndex) ? option.poolIndex : null,
        fingerprint: String(option.fingerprint),
      }))
    : [];

  const ordered = [
    { rank: 0, candidateKey: selectedKey, poolIndex: null, fingerprint: selected.fingerprint },
    ...options.filter((option) => option.fingerprint !== selected.fingerprint),
  ];

  return { record, product, selectedKey, options: ordered };
});

const resolvedByTarget = new Map();
const usedResolvedFingerprints = { sat: new Set(), psat: new Set() };

for (let attempt = 1; attempt <= maxAttempts && resolvedByTarget.size < targets.length; attempt += 1) {
  const pools = { sat: buildPool('sat'), psat: buildPool('psat') };
  const indexes = {};

  for (const [product, pool] of Object.entries(pools)) {
    const byFingerprint = new Map();
    pool.forEach((candidate, index) => {
      const fingerprint = selectorFingerprint(candidate);
      if (!byFingerprint.has(fingerprint)) byFingerprint.set(fingerprint, { candidate, index });
    });
    indexes[product] = byFingerprint;
  }

  for (const target of targets) {
    const targetKey = `${target.record.testKey}::${target.record.questionId}`;
    if (resolvedByTarget.has(targetKey)) continue;

    for (const option of target.options) {
      const hit = indexes[target.product].get(option.fingerprint);
      if (!hit) continue;

      const isOriginalSelected = option.fingerprint === parseCandidateKey(target.selectedKey).fingerprint;
      const reservedByOtherSelectedTarget = selectedFingerprintsByProduct[target.product].has(option.fingerprint) && !isOriginalSelected;
      if (reservedByOtherSelectedTarget) continue;
      if (usedResolvedFingerprints[target.product].has(option.fingerprint)) continue;

      const verifiedFingerprint = selectorFingerprint(hit.candidate);
      if (verifiedFingerprint !== option.fingerprint) {
        throw new Error(`Batch M candidate snapshot v2: fingerprint verification failed for ${targetKey}.`);
      }

      resolvedByTarget.set(targetKey, {
        testKey: target.record.testKey,
        questionId: target.record.questionId,
        selectedCandidateKey: target.selectedKey,
        selectedPoolIndex: target.options[0].poolIndex,
        resolvedCandidateKey: `${target.product}:${hit.index}:${verifiedFingerprint}`,
        resolvedPoolIndex: hit.index,
        resolvedFingerprint: verifiedFingerprint,
        resolvedAttempt: attempt,
        resolvedOptionRank: option.rank,
        fallbackUsed: option.fingerprint !== parseCandidateKey(target.selectedKey).fingerprint,
        candidate: hit.candidate,
      });
      usedResolvedFingerprints[target.product].add(option.fingerprint);
      break;
    }
  }

  console.log(`Batch M candidate recovery v2 attempt ${attempt}/${maxAttempts}: resolved ${resolvedByTarget.size}/${targets.length}.`);
}

if (resolvedByTarget.size !== targets.length) {
  const unresolved = targets
    .filter((target) => !resolvedByTarget.has(`${target.record.testKey}::${target.record.questionId}`))
    .slice(0, 25)
    .map((target) => `${target.record.testKey}::${target.record.questionId}=${target.selectedKey}`);
  throw new Error(`Batch M candidate snapshot v2: ${resolvedByTarget.size}/${targets.length} targets resolved. Unresolved examples: ${unresolved.join(', ')}`);
}

const snapshotRecords = targets.map((target) => resolvedByTarget.get(`${target.record.testKey}::${target.record.questionId}`));
const snapshot = {
  reportType: 'batch-m-selection-bound-candidate-snapshot',
  reportVersion: '2026-09-16.eligible-option-recovery.v2',
  generationCommit,
  selectionReport: 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json',
  resolutionMode: 'authorized-selected-candidate-first-recorded-eligible-option-fallback',
  resolutionAttempts: maxAttempts,
  selectedCount: snapshotRecords.length,
  fallbackCount: snapshotRecords.filter((record) => record.fallbackUsed).length,
  fingerprintAlgorithm: 'sha256(stable(section,prompt,choices,answer,figure,domain,skill,difficulty))[0:16]',
  records: snapshotRecords,
};

fs.writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ snapshotPath: '.batch-m-selection-bound-candidates-v2.json', selectedCount: snapshot.selectedCount, fallbackCount: snapshot.fallbackCount, maxAttempts }, null, 2));
