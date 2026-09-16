import fs from 'node:fs';
import { BATCH_M_20_TEST_ACCEPTED_PRODUCTION_CORPUS, BATCH_M_20_TEST_POST_QC_REMEDIATION_SUMMARY } from '../src/data/sat/mockContent/batchM20TestProductionStore.js';
import { BATCH_M_TARGET_TEST_KEYS, canonicalBatchMTestKey } from '../src/data/sat/mockContent/batchMCanonicalTestKey.js';
import { validateSatQuestion } from '../src/data/sat/questionSchema.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { getFigureDataFingerprint } from '../src/data/sat/mockContent/figureOriginalityQC.js';

const targetKeys = new Set(BATCH_M_TARGET_TEST_KEYS);
const mocks = BATCH_M_20_TEST_ACCEPTED_PRODUCTION_CORPUS.filter((mock) => targetKeys.has(canonicalBatchMTestKey(mock)));
const recordsOf = (mock) => [...(mock?.readingWriting || []), ...(mock?.math || [])];
const id = (q) => String(q?.questionId || q?.contentId || '');
const report = {
  targetMockCount: mocks.length,
  runtimeQuestions: mocks.reduce((n, mock) => n + recordsOf(mock).length, 0),
  remediationSummary: BATCH_M_20_TEST_POST_QC_REMEDIATION_SUMMARY,
  schemaFailureCount: 0,
  contentQualityFailureCount: 0,
  duplicateQuestionIds: [],
  figureDuplicateCount: 0,
  figureDuplicatePairs: [],
};
const figureMap = new Map();
for (const mock of mocks) {
  const key = canonicalBatchMTestKey(mock);
  const seen = new Set();
  for (const question of recordsOf(mock)) {
    const questionId = id(question);
    if (seen.has(questionId)) report.duplicateQuestionIds.push(`${key}::${questionId}`);
    seen.add(questionId);
    const schema = validateSatQuestion(question);
    if (!schema.valid) report.schemaFailureCount += 1;
    const quality = evaluateContentQuality(question);
    if (quality.verdict !== 'pass') report.contentQualityFailureCount += 1;
    if (question?.figure && question.section === 'math') {
      const fingerprint = getFigureDataFingerprint(question);
      const prior = figureMap.get(fingerprint);
      if (prior && prior.testKey !== key) {
        report.figureDuplicatePairs.push(`${prior.testKey}::${prior.questionId} => ${key}::${questionId}`);
      } else if (!prior) {
        figureMap.set(fingerprint, { testKey: key, questionId });
      }
    }
  }
}
report.figureDuplicateCount = report.figureDuplicatePairs.length;
fs.writeFileSync('docs/BATCH-M-PRODUCTION-INTEGRATED-20-TEST-QC-DIAGNOSTIC-2026-09-16.json', `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));