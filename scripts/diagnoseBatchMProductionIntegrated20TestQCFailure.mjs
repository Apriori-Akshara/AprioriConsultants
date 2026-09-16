import fs from 'node:fs';
import { BATCH_M_20_TEST_ACCEPTED_PRODUCTION_CORPUS, BATCH_M_20_TEST_POST_QC_REMEDIATION_SUMMARY } from '../src/data/sat/mockContent/batchM20TestProductionStore.js';
import { BATCH_M_TARGET_TEST_KEYS, canonicalBatchMTestKey } from '../src/data/sat/mockContent/batchMCanonicalTestKey.js';
import { validateSatQuestion } from '../src/data/sat/questionSchema.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { validateFigureOriginalitySeries } from '../src/data/sat/mockContent/figureOriginalityQC.js';

const targetKeys = new Set(BATCH_M_TARGET_TEST_KEYS);
const mocks = BATCH_M_20_TEST_ACCEPTED_PRODUCTION_CORPUS.filter((mock) => targetKeys.has(canonicalBatchMTestKey(mock)));
const recordsOf = (mock) => [...(mock?.readingWriting || []), ...(mock?.math || [])];
const id = (q) => String(q?.questionId || q?.contentId || '');
const report = {
  targetMockCount: mocks.length,
  runtimeQuestions: mocks.reduce((n, mock) => n + recordsOf(mock).length, 0),
  remediationSummary: BATCH_M_20_TEST_POST_QC_REMEDIATION_SUMMARY,
  schemaFailures: [],
  contentQualityFailures: [],
  duplicateQuestionIds: [],
  figureOriginalityFailure: null,
};

for (const mock of mocks) {
  const key = canonicalBatchMTestKey(mock);
  const seen = new Set();
  for (const question of recordsOf(mock)) {
    const questionId = id(question);
    if (seen.has(questionId)) report.duplicateQuestionIds.push({ testKey: key, questionId });
    seen.add(questionId);
    const schema = validateSatQuestion(question);
    if (!schema.valid) report.schemaFailures.push({ testKey: key, questionId, errors: schema.errors });
    const quality = evaluateContentQuality(question);
    if (quality.verdict !== 'pass') report.contentQualityFailures.push({ testKey: key, questionId, checks: quality.checks });
  }
}
try {
  validateFigureOriginalitySeries(mocks);
} catch (error) {
  report.figureOriginalityFailure = String(error?.message || error);
}

fs.writeFileSync('docs/BATCH-M-PRODUCTION-INTEGRATED-20-TEST-QC-DIAGNOSTIC-2026-09-16.json', `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));