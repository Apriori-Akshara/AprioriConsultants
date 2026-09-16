import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BATCH_M_TARGETED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMTargetedProductionCorpus.js';
import { applyBatchMControlledReplacements } from '../src/data/sat/mockContent/batchMControlledReplacementMapAdapter.js';
import { canonicalBatchMTestKey, BATCH_M_TARGET_TEST_KEYS } from '../src/data/sat/mockContent/batchMCanonicalTestKey.js';
import { applyBatchMPostQCTargetedRemediations } from '../src/data/sat/mockContent/batchMPostQCTargetedRemediation.js';
import { validateSatQuestion } from '../src/data/sat/questionSchema.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { validateFigureOriginalitySeries } from '../src/data/sat/mockContent/figureOriginalityQC.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(root, 'docs/BATCH-M-POST-QC-TARGETED-REMEDIATION-2026-09-16.json');
const pre = applyBatchMControlledReplacements(BATCH_M_TARGETED_PRODUCTION_CORPUS);
const result = applyBatchMPostQCTargetedRemediations(pre);
const records = (mock) => [...(mock?.readingWriting || []), ...(mock?.math || [])];
const id = (q) => String(q?.questionId || q?.contentId || '');
const before = new Map();
const after = new Map();
for (const mock of pre) {
  const key = canonicalBatchMTestKey(mock);
  for (const q of records(mock)) before.set(`${key}::${id(q)}`, q);
}
for (const mock of result.corpus) {
  const key = canonicalBatchMTestKey(mock);
  for (const q of records(mock)) after.set(`${key}::${id(q)}`, q);
}
const changedTargets = [];
const changedOperationCounts = { difficultyCalibration: 0, rwStimulusRepair: 0, figureRepair: 0 };
for (const [key, beforeQ] of before) {
  const afterQ = after.get(key);
  if (!afterQ) continue;
  const beforeCore = JSON.stringify({ difficulty: beforeQ.difficulty, prompt: beforeQ.prompt, choices: beforeQ.choices, answer: beforeQ.answer, figure: beforeQ.figure });
  const afterCore = JSON.stringify({ difficulty: afterQ.difficulty, prompt: afterQ.prompt, choices: afterQ.choices, answer: afterQ.answer, figure: afterQ.figure });
  if (beforeCore !== afterCore) {
    const operations = [];
    if (beforeQ.difficulty !== afterQ.difficulty) { operations.push('difficultyCalibration'); changedOperationCounts.difficultyCalibration += 1; }
    if (beforeQ.prompt !== afterQ.prompt) { operations.push('rwStimulusRepair'); changedOperationCounts.rwStimulusRepair += 1; }
    if (JSON.stringify(beforeQ.figure) !== JSON.stringify(afterQ.figure)) { operations.push('figureRepair'); changedOperationCounts.figureRepair += 1; }
    changedTargets.push({ testKey: key.split('::')[0], questionId: key.split('::')[1], operations });
  }
}
const schemaFailures = [];
const qualityFailures = [];
for (const mock of result.corpus) {
  const testKey = canonicalBatchMTestKey(mock);
  if (!BATCH_M_TARGET_TEST_KEYS.has(testKey)) continue;
  for (const q of records(mock)) {
    const schema = validateSatQuestion(q);
    if (!schema.valid) schemaFailures.push({ testKey, questionId: id(q), errors: schema.errors });
    const quality = evaluateContentQuality(q);
    if (quality.verdict !== 'pass') qualityFailures.push({ testKey, questionId: id(q), checks: quality.checks });
  }
}
let figureOriginalityFailure = null;
try { validateFigureOriginalitySeries(result.corpus); } catch (error) { figureOriginalityFailure = String(error?.message || error); }
const report = {
  reportType: 'batch-m-post-qc-targeted-remediation',
  reportVersion: '2026-09-16.post-qc-targeted-remediation.v1',
  scope: 'SAT1-SAT10 and PSAT1-PSAT10 only',
  productionMutation: true,
  releaseEligible: false,
  sat21Created: false,
  remediationSummary: { ...result.summary, uniqueChangedTargets: changedTargets.length },
  changedOperationCounts,
  changedTargets,
  verification: {
    schemaFailures: schemaFailures.length,
    contentQualityFailures: qualityFailures.length,
    figureOriginalityFailure,
    runtimeMocks: result.corpus.length,
    runtimeQuestions: result.corpus.reduce((n, mock) => n + records(mock).length, 0),
  },
};
report.passed = schemaFailures.length === 0 && qualityFailures.length === 0 && !figureOriginalityFailure;
report.status = report.passed ? 'PASS' : 'QUALITY_HOLD';
fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
