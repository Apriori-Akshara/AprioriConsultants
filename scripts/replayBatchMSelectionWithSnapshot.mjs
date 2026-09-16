import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const sourceRoot = String(process.env.BATCH_M_SELECTION_SOURCE_DIR || '').trim();
const snapshotOut = String(process.env.BATCH_M_SELECTION_SNAPSHOT_OUT || '').trim();
const expectedReportPath = path.join(root, 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json');

if (!sourceRoot) throw new Error('Batch M selection replay: BATCH_M_SELECTION_SOURCE_DIR is required.');
if (!snapshotOut) throw new Error('Batch M selection replay: BATCH_M_SELECTION_SNAPSHOT_OUT is required.');

const selectorPath = path.join(sourceRoot, 'scripts/runBatchMTargetedCandidateSelection.js');
const loaderPath = path.join(sourceRoot, 'scripts/batchMExtensionlessModuleLoader.mjs');
const freshReportPath = path.join(sourceRoot, 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json');
const instrumentedSelectorPath = path.join(sourceRoot, 'scripts/runBatchMTargetedCandidateSelectionSnapshot.mjs');

if (!fs.existsSync(selectorPath)) throw new Error(`Batch M selection replay: selector not found at ${selectorPath}.`);
if (!fs.existsSync(loaderPath)) throw new Error(`Batch M selection replay: historical module loader not found at ${loaderPath}.`);

const originalSelector = fs.readFileSync(selectorPath, 'utf8');
let selector = originalSelector;
const marker = `const OUT = path.resolve(process.cwd(), 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json');`;
const reportWrite = "  fs.writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\\n`, 'utf8');";
const selectedCaptureBlock = [
  '    if (!calibrationOnly && eligibleItems[0]) {',
  '      selectedCandidateSnapshots.push({',
  '        testKey: target.testKey,',
  '        questionId: target.questionId,',
  "        selectedCandidateKey: eligibleItems[0].product + ':' + eligibleItems[0].poolIndex + ':' + eligibleItems[0].fingerprint,",
  '        selectedPoolIndex: eligibleItems[0].poolIndex,',
  '        fingerprint: eligibleItems[0].fingerprint,',
  '        candidate: eligibleItems[0].candidate,',
  '      });',
  '    }',
  '',
  '    records.push({',
].join('\n');
const snapshotWriteBlock = [
  '  if (BATCH_M_REPLAY_SNAPSHOT_OUT) {',
  '    const snapshot = {',
  "      reportType: 'batch-m-selection-bound-candidate-snapshot',",
  "      reportVersion: '2026-09-16.selection-replay.v1',",
  "      generationSource: 'exact-selector-replay',",
  '      generationCommit: process.env.BATCH_M_SELECTION_GENERATION_COMMIT || null,',
  "      selectionReport: 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json',",
  '      selectedCount: selectedCandidateSnapshots.length,',
  '      records: selectedCandidateSnapshots,',
  '    };',
  "    fs.writeFileSync(BATCH_M_REPLAY_SNAPSHOT_OUT, JSON.stringify(snapshot) + '\\n', 'utf8');",
  '  }',
].join('\n');

if (!selector.includes(marker)) throw new Error('Batch M selection replay: selector output marker not found.');
if (!selector.includes('const records = [];')) throw new Error('Batch M selection replay: selector records marker not found.');
if (!selector.includes('    records.push({')) throw new Error('Batch M selection replay: selector record-write marker not found.');
if (!selector.includes(reportWrite)) throw new Error('Batch M selection replay: selector report-write marker not found.');

selector = selector.replace(
  marker,
  `${marker}\nconst BATCH_M_REPLAY_SNAPSHOT_OUT = process.env.BATCH_M_SELECTION_SNAPSHOT_OUT || '';`
);
selector = selector.replace(
  '  const records = [];',
  '  const records = [];\n  const selectedCandidateSnapshots = [];'
);
selector = selector.replace('    records.push({', selectedCaptureBlock);
selector = selector.replace(reportWrite, reportWrite + '\n\n' + snapshotWriteBlock);

if (selector === originalSelector) {
  throw new Error('Batch M selection replay: instrumentation did not modify selector source.');
}

fs.writeFileSync(instrumentedSelectorPath, selector, 'utf8');

const { spawn } = await import('node:child_process');
await new Promise((resolve, reject) => {
  const child = spawn(process.execPath, ['--import', loaderPath, instrumentedSelectorPath], {
    cwd: sourceRoot,
    env: { ...process.env, BATCH_M_SELECTION_SNAPSHOT_OUT: snapshotOut },
    stdio: 'inherit',
  });
  child.once('error', reject);
  child.once('exit', (code, signal) => {
    if (code === 0) resolve();
    else reject(new Error(`Batch M selection replay failed with ${signal || `exit code ${code}`}.`));
  });
});

if (!fs.existsSync(freshReportPath)) throw new Error('Batch M selection replay: fresh selector report was not produced.');
if (!fs.existsSync(snapshotOut)) throw new Error('Batch M selection replay: candidate snapshot was not produced.');

const expected = JSON.parse(fs.readFileSync(expectedReportPath, 'utf8'));
const fresh = JSON.parse(fs.readFileSync(freshReportPath, 'utf8'));
const snapshot = JSON.parse(fs.readFileSync(snapshotOut, 'utf8'));

function selectionIdentity(record) {
  return {
    testKey: record.testKey,
    questionId: record.questionId,
    remediationType: record.remediationType,
    selectionDisposition: record.selectionDisposition,
    selectedCandidateKey: record.selectedCandidateKey,
    options: Array.isArray(record.options) ? record.options : [],
  };
}

const expectedSelected = expected.records
  .filter((record) => record.selectionDisposition === 'REPLACEMENT_CANDIDATE_SELECTED_FOR_DOWNSTREAM_APPROVAL')
  .map(selectionIdentity);
const freshSelected = fresh.records
  .filter((record) => record.selectionDisposition === 'REPLACEMENT_CANDIDATE_SELECTED_FOR_DOWNSTREAM_APPROVAL')
  .map(selectionIdentity);

if (expected.summary?.total !== fresh.summary?.total
  || expected.summary?.selected !== fresh.summary?.selected
  || expected.summary?.noEligibleCandidate !== fresh.summary?.noEligibleCandidate) {
  throw new Error(
    `Batch M selection replay: historical selector summary does not match authorized selection summary `
    + `(expected total=${expected.summary?.total}, selected=${expected.summary?.selected}, noEligible=${expected.summary?.noEligibleCandidate}; `
    + `fresh total=${fresh.summary?.total}, selected=${fresh.summary?.selected}, noEligible=${fresh.summary?.noEligibleCandidate}).`
  );
}

if (JSON.stringify(expectedSelected) !== JSON.stringify(freshSelected)) {
  const firstMismatch = expectedSelected.findIndex((record, index) => JSON.stringify(record) !== JSON.stringify(freshSelected[index]));
  throw new Error(
    `Batch M selection replay: selected-candidate identity differs at index ${firstMismatch >= 0 ? firstMismatch : 'length/end'}. `
    + 'Replacement is blocked safely.'
  );
}

if (snapshot.selectedCount !== expected.summary?.selected) {
  throw new Error(`Batch M selection replay: snapshot selected count ${snapshot.selectedCount} does not match authorized selection count ${expected.summary?.selected}.`);
}
if (!Array.isArray(snapshot.records) || snapshot.records.length !== expected.summary?.selected) {
  throw new Error(`Batch M selection replay: snapshot record count ${snapshot.records?.length ?? 'invalid'} does not match authorized selection count ${expected.summary?.selected}.`);
}

const snapshotByTarget = new Map(snapshot.records.map((record) => [`${record.testKey}::${record.questionId}`, record]));
for (const record of expected.records.filter((item) => item.selectionDisposition === 'REPLACEMENT_CANDIDATE_SELECTED_FOR_DOWNSTREAM_APPROVAL')) {
  const bound = snapshotByTarget.get(`${record.testKey}::${record.questionId}`);
  if (!bound) throw new Error(`Batch M selection replay: missing selected candidate for ${record.testKey}::${record.questionId}.`);
  if (bound.selectedCandidateKey !== record.selectedCandidateKey) {
    throw new Error(`Batch M selection replay: selected candidate mismatch for ${record.testKey}::${record.questionId}.`);
  }
  if (bound.fingerprint !== String(record.selectedCandidateKey).split(':').at(-1)) {
    throw new Error(`Batch M selection replay: bound fingerprint mismatch for ${record.testKey}::${record.questionId}.`);
  }
  if (!bound.candidate || typeof bound.candidate !== 'object') {
    throw new Error(`Batch M selection replay: bound candidate payload is missing for ${record.testKey}::${record.questionId}.`);
  }
}

console.log(JSON.stringify({
  replayed: true,
  generationCommit: snapshot.generationCommit,
  selectedCount: snapshot.selectedCount,
  authorizedSelectionMatched: true,
  candidatePayloadSnapshot: snapshotOut,
}, null, 2));
