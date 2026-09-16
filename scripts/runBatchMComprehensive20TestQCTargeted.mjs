import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateSatQuestion } from '../src/data/sat/questionSchema.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { BATCH_M_TARGETED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMTargetedProductionCorpus.js';
import { applyBatchMControlledReplacements } from '../src/data/sat/mockContent/batchMControlledReplacementMapAdapter.js';
import { BATCH_M_CONTROLLED_REPLACEMENT_MAP } from '../src/data/sat/mockContent/batchMControlledReplacementMap.js';
import { canonicalBatchMTestKey, BATCH_M_TARGET_TEST_KEYS } from '../src/data/sat/mockContent/batchMCanonicalTestKey.js';
import { getFigureDataFingerprint, validateFigureOriginalitySeries } from '../src/data/sat/mockContent/figureOriginalityQC.js';
import { applyBatchMPostQCTargetedRemediations } from '../src/data/sat/mockContent/batchMPostQCTargetedRemediation.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const reportPath = path.join(root, 'docs/BATCH-M-COMPREHENSIVE-20-TEST-QC-2026-09-16.json');
const replacementReport = JSON.parse(fs.readFileSync(path.join(root, 'docs/BATCH-M-CONTROLLED-REPLACEMENT-2026-09-16.json'), 'utf8'));
const EXPECTED_MOCKS = 20;
const EXPECTED_RECORDS_PER_MOCK = 196;
const EXPECTED_RUNTIME_QUESTIONS = 3920;
const EXPECTED_REPLACEMENTS = 1594;
const EXPECTED_AFFECTED = 2144;
const recordsOf = (mock) => [...(mock?.readingWriting || []), ...(mock?.math || [])];
const idOf = (question) => String(question?.questionId || question?.contentId || '');
const keyOf = (testKey, question) => `${testKey}::${idOf(question)}`;
const testKeys = new Set([...Array.from({ length: 10 }, (_, i) => `SAT${i + 1}`), ...Array.from({ length: 10 }, (_, i) => `PSAT${i + 1}`)]);

const failures = [];
const addFailure = (check, detail) => failures.push({ check, detail });
const collect = (corpus) => {
  const map = new Map();
  for (const mock of corpus) {
    const testKey = canonicalBatchMTestKey(mock);
    for (const question of recordsOf(mock)) {
      const key = keyOf(testKey, question);
      if (map.has(key)) addFailure('duplicate-runtime-question', key);
      map.set(key, question);
    }
  }
  return map;
};

const preReplacementCorpus = BATCH_M_TARGETED_PRODUCTION_CORPUS;
const controlledCorpus = applyBatchMControlledReplacements(preReplacementCorpus);
const preQuestions = collect(preReplacementCorpus);
const controlledQuestions = collect(controlledCorpus);

if (preQuestions.size !== EXPECTED_RUNTIME_QUESTIONS) addFailure('pre-runtime-count', preQuestions.size);
if (controlledQuestions.size !== EXPECTED_RUNTIME_QUESTIONS) addFailure('controlled-runtime-count', controlledQuestions.size);
if (replacementReport.authorization !== 'AUTHORIZED') addFailure('authorization', replacementReport.authorization);
if (replacementReport.releaseEligible !== false) addFailure('release-boundary', replacementReport.releaseEligible);
if (replacementReport.sat21Created !== false) addFailure('sat21-safeguard', replacementReport.sat21Created);
if (replacementReport.appliedCount !== EXPECTED_REPLACEMENTS) addFailure('replacement-count', replacementReport.appliedCount);
if (Object.keys(BATCH_M_CONTROLLED_REPLACEMENT_MAP).length !== EXPECTED_REPLACEMENTS) addFailure('replacement-map-count', Object.keys(BATCH_M_CONTROLLED_REPLACEMENT_MAP).length);

let verifiedReplacementTargets = 0;
for (const [key, replacement] of Object.entries(BATCH_M_CONTROLLED_REPLACEMENT_MAP)) {
  const before = preQuestions.get(key);
  const after = controlledQuestions.get(key);
  if (!before || !after) { addFailure('replacement-target-missing', key); continue; }
  if (idOf(before) !== idOf(after)) addFailure('question-id-changed-before-post-qc', key);
  if (String(after.prompt || '') !== String(replacement.prompt || '')) addFailure('replacement-prompt-mismatch-before-post-qc', key);
  if (JSON.stringify(after.choices || []) !== JSON.stringify(replacement.choices || [])) addFailure('replacement-choices-mismatch-before-post-qc', key);
  if (String(after.answer || '') !== String(replacement.answer || '')) addFailure('replacement-answer-mismatch-before-post-qc', key);
  verifiedReplacementTargets += 1;
}

const remediation = applyBatchMPostQCTargetedRemediations(controlledCorpus);
const postCorpus = remediation.corpus;
const postQuestions = collect(postCorpus);

if (postQuestions.size !== EXPECTED_RUNTIME_QUESTIONS) addFailure('post-runtime-count', postQuestions.size);
if (remediation.summary.difficultyCalibrations !== 550) addFailure('difficulty-remediation-count', remediation.summary.difficultyCalibrations);
if (remediation.summary.rwStimulusRepairs !== 206) addFailure('rw-remediation-count', remediation.summary.rwStimulusRepairs);
if (remediation.summary.figureRepairs !== 1) addFailure('figure-remediation-count', remediation.summary.figureRepairs);
if (remediation.summary.targetsChanged !== 757) addFailure('post-qc-target-count', remediation.summary.targetsChanged);

let schemaFailures = 0;
let qualityFailures = 0;
const failureReasons = new Map();
const replacementChangedSet = new Set();
const qualityByMock = {};

for (const [key, question] of postQuestions) {
  const testKey = key.split('::')[0];
  if (!testKeys.has(testKey) || !BATCH_M_TARGET_TEST_KEYS.has(testKey)) addFailure('scope', key);
  const schema = validateSatQuestion(question);
  if (!schema.valid) { schemaFailures += 1; addFailure('schema', { key, errors: schema.errors }); }
  const quality = evaluateContentQuality(question);
  const summary = qualityByMock[testKey] || { total: 0, passed: 0, failed: 0, scoreSum: 0 };
  summary.total += 1;
  summary.scoreSum += quality.score;
  if (quality.verdict === 'pass') summary.passed += 1;
  else {
    summary.failed += 1;
    qualityFailures += 1;
    for (const reason of quality.checks) failureReasons.set(reason, (failureReasons.get(reason) || 0) + 1);
  }
  qualityByMock[testKey] = summary;
}

for (const [testKey, summary] of Object.entries(qualityByMock)) {
  if (summary.total !== EXPECTED_RECORDS_PER_MOCK) addFailure('records-per-mock', `${testKey}:${summary.total}`);
  summary.averageScore = Number((summary.scoreSum / summary.total).toFixed(2));
}

try { validateFigureOriginalitySeries(postCorpus); } catch (error) { addFailure('figure-originality', String(error?.message || error)); }

for (const mock of preReplacementCorpus) {
  const testKey = canonicalBatchMTestKey(mock);
  if (!BATCH_M_TARGET_TEST_KEYS.has(testKey)) {
    const postMock = postCorpus.find((candidate) => canonicalBatchMTestKey(candidate) === testKey);
    if (JSON.stringify(mock) !== JSON.stringify(postMock)) addFailure('out-of-scope-changed', testKey);
  }
}

for (const key of Object.keys(BATCH_M_CONTROLLED_REPLACEMENT_MAP)) replacementChangedSet.add(key);

const report = {
  reportType: 'batch-m-comprehensive-20-test-qc',
  reportVersion: '2026-09-16.comprehensive-20-test-qc.targeted-v2',
  scope: 'SAT1-SAT10 and PSAT1-PSAT10 only',
  sourceCorpus: 'BATCH_M_TARGETED_PRODUCTION_CORPUS',
  productionMutation: false,
  releaseEligible: false,
  sat21Created: false,
  expected: { affectedRecords: EXPECTED_AFFECTED, mocks: EXPECTED_MOCKS, recordsPerMock: EXPECTED_RECORDS_PER_MOCK, runtimeQuestions: EXPECTED_RUNTIME_QUESTIONS, replacements: EXPECTED_REPLACEMENTS },
  observed: {
    preReplacementRuntimeQuestions: preQuestions.size,
    controlledReplacementRuntimeQuestions: controlledQuestions.size,
    postQCRuntimeQuestions: postQuestions.size,
    verifiedReplacementTargets,
    uniqueReplacementTargets: replacementChangedSet.size,
    schemaFailures,
    contentQualityFailures: qualityFailures,
    figureQuestionsWithDeterministicFingerprint: postCorpus.reduce((sum, mock) => sum + recordsOf(mock).filter((q) => q.section === 'math' && getFigureDataFingerprint(q)).length, 0),
  },
  postQCTargetedRemediation: remediation.summary,
  gates: {
    scopeAndIdentity: failures.some((item) => ['scope', 'duplicate-runtime-question', 'out-of-scope-changed', 'records-per-mock'].includes(item.check)) ? 'FAIL' : 'PASS',
    schema: schemaFailures === 0 ? 'PASS' : 'FAIL',
    replacementIntegrityBeforePostQC: verifiedReplacementTargets === EXPECTED_REPLACEMENTS && replacementChangedSet.size === EXPECTED_REPLACEMENTS ? 'PASS' : 'FAIL',
    contentQuality: qualityFailures === 0 ? 'PASS' : 'FAIL',
    figureOriginality: failures.some((item) => item.check === 'figure-originality') ? 'FAIL' : 'PASS',
  },
  perMock: qualityByMock,
  failureReasonCounts: Object.fromEntries([...failureReasons.entries()].sort(([, a], [, b]) => b - a)),
  failures,
};
report.passed = failures.length === 0;
report.status = report.passed ? 'PASS' : 'QUALITY_HOLD';
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
