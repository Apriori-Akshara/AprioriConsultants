import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS, BATCH_M_FINAL_CORPUS_VERIFICATION, BATCH_M_POST_QC_REMEDIATION_SUMMARY } from '../src/data/sat/mockContent/batchMProductionStore.js';
import { BATCH_M_TARGET_TEST_KEYS, canonicalBatchMTestKey } from '../src/data/sat/mockContent/batchMCanonicalTestKey.js';
import { validateSatQuestion } from '../src/data/sat/questionSchema.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { validateFigureOriginalitySeries } from '../src/data/sat/mockContent/figureOriginalityQC.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(root, 'docs/BATCH-M-PRODUCTION-INTEGRATED-20-TEST-QC-2026-09-16.json');
const targetKeys = new Set(BATCH_M_TARGET_TEST_KEYS);
const targetMocks = BATCH_M_ACCEPTED_PRODUCTION_CORPUS.filter((mock) => targetKeys.has(canonicalBatchMTestKey(mock)));
const allMocks = BATCH_M_ACCEPTED_PRODUCTION_CORPUS;
const recordsOf = (mock) => [...(mock?.readingWriting || []), ...(mock?.math || [])];
const failures = [];
let schemaFailures = 0;
let qualityFailures = 0;
let figureOriginalityFailure = null;
let runtimeQuestions = 0;

for (const mock of targetMocks) {
  const testKey = canonicalBatchMTestKey(mock);
  const records = recordsOf(mock);
  if (records.length !== 196) failures.push({ check: 'record-count', detail: `${testKey}:${records.length}` });
  runtimeQuestions += records.length;
  const ids = new Set();
  for (const question of records) {
    const questionId = String(question?.questionId || question?.contentId || '');
    if (ids.has(questionId)) failures.push({ check: 'duplicate-question-id', detail: `${testKey}:${questionId}` });
    ids.add(questionId);
    const schema = validateSatQuestion(question);
    if (!schema.valid) { schemaFailures += 1; failures.push({ check: 'schema', detail: { testKey, questionId, errors: schema.errors } }); }
    const quality = evaluateContentQuality(question);
    if (quality.verdict !== 'pass') { qualityFailures += 1; failures.push({ check: 'content-quality', detail: { testKey, questionId, checks: quality.checks } }); }
  }
}

if (targetMocks.length !== 20) failures.push({ check: 'affected-mock-count', detail: targetMocks.length });
if (runtimeQuestions !== 3920) failures.push({ check: 'runtime-question-count', detail: runtimeQuestions });
if (!BATCH_M_FINAL_CORPUS_VERIFICATION?.passed) failures.push({ check: 'final-30-mock-corpus-gate', detail: BATCH_M_FINAL_CORPUS_VERIFICATION });
try { validateFigureOriginalitySeries(targetMocks); } catch (error) { figureOriginalityFailure = String(error?.message || error); failures.push({ check: 'figure-originality', detail: figureOriginalityFailure }); }

const summary = {
  difficultyCalibrations: BATCH_M_POST_QC_REMEDIATION_SUMMARY.difficultyCalibrations,
  rwStimulusRepairs: BATCH_M_POST_QC_REMEDIATION_SUMMARY.rwStimulusRepairs,
  figureRepairs: BATCH_M_POST_QC_REMEDIATION_SUMMARY.figureRepairs,
  uniqueChangedTargets: BATCH_M_POST_QC_REMEDIATION_SUMMARY.targetsChanged,
};
if (summary.difficultyCalibrations !== 550) failures.push({ check: 'difficulty-remediation-count', detail: summary.difficultyCalibrations });
if (summary.rwStimulusRepairs !== 206) failures.push({ check: 'rw-remediation-count', detail: summary.rwStimulusRepairs });
if (summary.figureRepairs !== 1) failures.push({ check: 'figure-remediation-count', detail: summary.figureRepairs });
if (summary.uniqueChangedTargets !== 673) failures.push({ check: 'unique-remediated-target-count', detail: summary.uniqueChangedTargets });

const report = {
  reportType: 'batch-m-production-integrated-20-test-qc',
  reportVersion: '2026-09-16.production-integrated-20-test-qc.v1',
  scope: 'SAT1-SAT10 and PSAT1-PSAT10 only',
  productionMutation: true,
  releaseEligible: false,
  sat21Created: false,
  remediationSummary: summary,
  observed: { affectedMocks: targetMocks.length, runtimeQuestions, schemaFailures, contentQualityFailures: qualityFailures, figureOriginalityFailure, totalProductionMocks: allMocks.length },
  final30MockCorpusGate: BATCH_M_FINAL_CORPUS_VERIFICATION,
  failures,
};
report.passed = failures.length === 0;
report.status = report.passed ? 'PASS' : 'QUALITY_HOLD';
fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
