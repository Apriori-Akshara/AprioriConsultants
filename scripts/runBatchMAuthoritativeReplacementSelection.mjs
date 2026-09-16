import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const factoryDir = path.join(root, 'src/data/sat/mockContent');
const factoryPath = path.join(factoryDir, 'batchMRemediationCandidateFactory.js');
const backupPath = path.join(factoryDir, 'batchMRemediationCandidateFactory.authoritative-original.js');
const wrapperPath = path.join(factoryDir, 'batchMRemediationCandidateFactory.authoritative-wrapper.js');
const capturePath = path.join(root, '.batch-m-authoritative-selected-pools.json');
const sourceReportPath = path.join(root, 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json');
const authoritativePath = path.join(root, 'docs/BATCH-M-AUTHORITATIVE-CANDIDATE-SELECTION-2026-09-16.json');
const loaderPath = path.join(root, 'scripts/batchMExtensionlessModuleLoader.mjs');
const selectorPath = path.join(root, 'scripts/runBatchMTargetedCandidateSelection.js');

const originalSource = fs.readFileSync(factoryPath, 'utf8');
const wrapperSource = `
import fs from 'node:fs';
import crypto from 'node:crypto';
import { buildRepresentativeBatchMRemediationCandidates as originalBuild } from './batchMRemediationCandidateFactory.authoritative-original.js';

const capturePath = process.env.BATCH_M_AUTHORITATIVE_CAPTURE_PATH;
const captured = { sat: null, psat: null };

function normalize(value) {
  return String(value ?? '').trim().toLowerCase().replace(/\\s+/g, ' ');
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

export function buildRepresentativeBatchMRemediationCandidates(options) {
  const result = originalBuild(options);
  const product = String(options?.testId || '').startsWith('PSAT') ? 'psat' : 'sat';
  captured[product] = result.candidates.map((candidate, index) => ({
    poolIndex: index,
    fingerprint: selectorFingerprint(candidate),
    candidate,
  }));
  return result;
}

process.on('exit', () => {
  if (!capturePath) return;
  fs.writeFileSync(capturePath, JSON.stringify(captured), 'utf8');
});
`;

function cleanup() {
  if (fs.existsSync(factoryPath) && fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, factoryPath);
  }
  for (const file of [backupPath, wrapperPath, capturePath]) {
    if (fs.existsSync(file)) fs.rmSync(file, { force: true });
  }
}

try {
  fs.copyFileSync(factoryPath, backupPath);
  fs.writeFileSync(wrapperPath, wrapperSource, 'utf8');
  fs.writeFileSync(factoryPath, `${wrapperSource}\n`, 'utf8');

  const env = {
    ...process.env,
    BATCH_M_AUTHORITATIVE_CAPTURE_PATH: capturePath,
  };
  const result = spawnSync(process.execPath, ['--import', loaderPath, selectorPath], {
    cwd: root,
    env,
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    throw new Error(`Authoritative Batch M selection: selector exited with status ${result.status}.`);
  }
  if (!fs.existsSync(sourceReportPath)) {
    throw new Error('Authoritative Batch M selection: selector did not produce the expected selection report.');
  }
  if (!fs.existsSync(capturePath)) {
    throw new Error('Authoritative Batch M selection: exact candidate-pool capture was not produced.');
  }

  const sourceReport = JSON.parse(fs.readFileSync(sourceReportPath, 'utf8'));
  const captured = JSON.parse(fs.readFileSync(capturePath, 'utf8'));
  const records = Array.isArray(sourceReport.records) ? sourceReport.records : [];
  const selectedRecords = records.filter((record) => record.selectionDisposition === 'REPLACEMENT_CANDIDATE_SELECTED_FOR_DOWNSTREAM_APPROVAL');
  if (selectedRecords.length !== sourceReport.summary?.selected) {
    throw new Error(`Authoritative Batch M selection: selected-record count ${selectedRecords.length} does not match summary ${sourceReport.summary?.selected}.`);
  }
  if (selectedRecords.length !== 1594 || sourceReport.summary?.noEligibleCandidate !== 0 || records.length !== 2144) {
    throw new Error(`Authoritative Batch M selection: expected 2144 records, 1594 selected and 0 no-eligible; found ${records.length}, ${selectedRecords.length}, ${sourceReport.summary?.noEligibleCandidate}.`);
  }

  const pools = { sat: captured.sat || [], psat: captured.psat || [] };
  const used = { sat: new Set(), psat: new Set() };
  const authoritativeRecords = records.map((record) => {
    if (record.selectionDisposition !== 'REPLACEMENT_CANDIDATE_SELECTED_FOR_DOWNSTREAM_APPROVAL') return record;
    const product = String(record.testKey || '').startsWith('PSAT') ? 'psat' : 'sat';
    const keyParts = String(record.selectedCandidateKey || '').split(':');
    const expectedProduct = keyParts[0];
    const poolIndex = Number.parseInt(keyParts[1], 10);
    const expectedFingerprint = keyParts.at(-1);
    if (expectedProduct !== product || !Number.isInteger(poolIndex) || !/^[0-9a-f]{16}$/i.test(expectedFingerprint)) {
      throw new Error(`Authoritative Batch M selection: malformed selected candidate key for ${record.testKey}::${record.questionId}.`);
    }
    const capturedItem = pools[product][poolIndex];
    if (!capturedItem) {
      throw new Error(`Authoritative Batch M selection: captured pool item ${product}:${poolIndex} is missing for ${record.testKey}::${record.questionId}.`);
    }
    if (String(capturedItem.fingerprint) !== expectedFingerprint) {
      throw new Error(`Authoritative Batch M selection: selected fingerprint mismatch for ${record.testKey}::${record.questionId}; report ${expectedFingerprint}, captured ${capturedItem.fingerprint}.`);
    }
    if (used[product].has(expectedFingerprint)) {
      throw new Error(`Authoritative Batch M selection: selected fingerprint reused within ${product}: ${expectedFingerprint}.`);
    }
    used[product].add(expectedFingerprint);

    return {
      ...record,
      selectedCandidateFingerprint: expectedFingerprint,
      selectedCandidatePoolIndex: poolIndex,
      selectedCandidate: capturedItem.candidate,
      selectedCandidateCapture: 'exact-in-process-selector-pool',
    };
  });

  const authoritative = {
    ...sourceReport,
    reportType: 'batch-m-authoritative-replacement-candidate-selection',
    reportVersion: '2026-09-16.authoritative-full-payload.v1',
    sourceSelectionReport: 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json',
    selectionCreatedBy: 'batch-m-fresh-authoritative-selection-v1',
    selectionSource: 'same-process-selector-pool-capture',
    supersedesReason: 'The prior selection report retained candidate keys/fingerprints but not the exact candidate payloads; 97 previously selected PSAT candidates were not reproducible from the generator after the selection run. This report persists the exact payload used by the selector for every selected record.',
    authorizationDocument: 'docs/BATCH-M-REPLACEMENT-AUTHORIZATION-GATE-2026-09-16.md',
    replacementAuthorization: 'AUTHORIZED',
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
    records: authoritativeRecords,
  };

  fs.writeFileSync(authoritativePath, `${JSON.stringify(authoritative, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({
    reportPath: 'docs/BATCH-M-AUTHORITATIVE-CANDIDATE-SELECTION-2026-09-16.json',
    affectedUniqueQuestionCount: authoritative.affectedUniqueQuestionCount,
    selectedCount: authoritative.summary.selected,
    noEligibleCandidate: authoritative.summary.noEligibleCandidate,
    sat: authoritative.summary.sat,
    psat: authoritative.summary.psat,
    productionMutation: false,
    releaseEligible: false,
    replacementAuthorization: 'AUTHORIZED',
    persistedFullSelectedPayloads: authoritative.summary.selected,
    sat21Created: false,
  }, null, 2));
} finally {
  cleanup();
}
