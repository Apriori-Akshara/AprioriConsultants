import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore.js';
import { runBatchMFinalCorpusGate } from '../src/data/sat/mockContent/batchMFinalCorpusGate.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(root, 'docs/BATCH-M-FINAL-30-MOCK-CORPUS-GATE-2026-09-16.json');
const gate = runBatchMFinalCorpusGate(BATCH_M_ACCEPTED_PRODUCTION_CORPUS);
const report = {
  reportType: 'batch-m-final-30-mock-corpus-gate',
  reportVersion: '2026-09-16.final-30-mock-corpus-gate.v1',
  scope: 'SAT1-SAT10, PSAT1-PSAT10, SAT11-SAT20',
  productionMutation: false,
  releaseEligible: false,
  sat21Created: false,
  gate,
  passed: gate.passed === true,
  status: gate.passed === true ? 'PASS' : 'QUALITY_HOLD',
};
fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
