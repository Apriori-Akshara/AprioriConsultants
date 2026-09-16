import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateSatQuestion } from '../src/data/sat/questionSchema.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { BATCH_M_TARGETED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMTargetedProductionCorpus.js';
import { applyBatchMControlledReplacements } from '../src/data/sat/mockContent/batchMControlledReplacementMapAdapter.js';
import { BATCH_M_CONTROLLED_REPLACEMENT_MAP } from '../src/data/sat/mockContent/batchMControlledReplacementMap.js';
import { canonicalBatchMTestKey } from '../src/data/sat/mockContent/batchMCanonicalTestKey.js';
import { getFigureDataFingerprint, validateFigureOriginalitySeries } from '../src/data/sat/mockContent/figureOriginalityQC.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const reportPath = path.join(root, 'docs/BATCH-M-COMPREHENSIVE-20-TEST-QC-2026-09-16.json');
const replacementReport = JSON.parse(fs.readFileSync(path.join(root, 'docs/BATCH-M-CONTROLLED-REPLACEMENT-2026-09-16.json'), 'utf8'));

const EXPECTED_MOCKS = 20;
const EXPECTED_RECORDS_PER_MOCK = 196;
const EXPECTED_RUNTIME_QUESTIONS = EXPECTED_MOCKS * EXPECTED_RECORDS_PER_MOCK;
const EXPECTED_REPLACEMENTS = 1594;
const EXPECTED_AFFECTED = 2144;
const EXPECTED_KEYS = new Set([...Array.from({ length: 10 }, (_, i) => `SAT${i + 1}`), ...Array.from({ length: 10 }, (_, i) => `PSAT${i + 1}`)]);

const recordsOf = (mock) => [...(mock?.readingWriting || []), ...(mock?.math || [])];
const idOf = (question) => String(question?.questionId || question?.contentId || '');
const keyOf = (testKey, question) => `${testKey}::${idOf(question)}`;
const addCount = (map, key, amount = 1) => map.set(key, (map.get(key) || 0) + amount);
const failures = [];

function fail(check, detail) { failures.push({ check, detail }); }

function verifyMockShape(corpus, label) {
  if (!Array.isArray(corpus) || corpus.length !== EXPECTED_MOCKS) {
    fail(`${label}:mock-count`, `expected ${EXPECTED_MOCKS}, found ${Array.isArray(corpus) ? corpus.length : 'non-array'}`);
    return;
  }
  const seenTestKeys = new Set();
  for (const mock of corpus) {
    const testKey = canonicalBatchMTestKey(mock);
    if (!EXPECTED_KEYS.has(testKey)) fail(`${label}:scope`, `unexpected test key ${testKey || 'missing'}`);
    if (seenTestKeys.has(testKey)) fail(`${label}:duplicate-mock`, testKey);
    seenTestKeys.add(testKey);
    const records = recordsOf(mock);
    if (records.length !== EXPECTED_RECORDS_PER_MOCK) fail(`${label}:record-count`, `${testKey} has ${records.length}; expected ${EXPECTED_RECORDS_PER_MOCK}`);
  }
  if (seenTestKeys.size !== EXPECTED_MOCKS) fail(`${label}:unique-mocks`, `expected ${EXPECTED_MOCKS}, found ${seenTestKeys.size}`);
}

function collectQuestions(corpus) {
  const map = new Map();
  for (const mock of corpus) {
    const testKey = canonicalBatchMTestKey(mock);
    for (const question of recordsOf(mock)) {
      const key = keyOf(testKey, question);
      if (!testKey || !idOf(question)) fail('runtime-question-identity', `${testKey || 'missing'} contains a question without a stable ID`);
      if (map.has(key)) fail('runtime-duplicate-question', key);
      map.set(key, question);
    }
  }
  return map;
}

verifyMockShape(BATCH_M_TARGETED_PRODUCTION_CORPUS, 'pre-replacement');
const preQuestions = collectQuestions(BATCH_M_TARGETED_PRODUCTION_CORPUS);
const appliedCorpus = applyBatchMControlledReplacements(BATCH_M_TARGETED_PRODUCTION_CORPUS);
verifyMockShape(appliedCorpus, 'post-replacement');
const postQuestions = collectQuestions(appliedCorpus);

if (preQuestions.size !== EXPECTED_RUNTIME_QUESTIONS) fail('runtime-question-count-before', `expected ${EXPECTED_RUNTIME_QUESTIONS}, found ${preQuestions.size}`);
if (postQuestions.size !== EXPECTED_RUNTIME_QUESTIONS) fail('runtime-question-count-after', `expected ${EXPECTED_RUNTIME_QUESTIONS}, found ${postQuestions.size}`);
if (replacementReport.authorization !== 'AUTHORIZED') fail('replacement-authorization', `expected AUTHORIZED, found ${replacementReport.authorization}`);
if (replacementReport.releaseEligible !== false) fail('release-boundary', `releaseEligible must remain false; found ${replacementReport.releaseEligible}`);
if (replacementReport.sat21Created !== false) fail('sat21-safeguard', `sat21Created must remain false; found ${replacementReport.sat21Created}`);
if (replacementReport.appliedCount !== EXPECTED_REPLACEMENTS) fail('replacement-count-record', `expected ${EXPECTED_REPLACEMENTS}, found ${replacementReport.appliedCount}`);
if (Object.keys(BATCH_M_CONTROLLED_REPLACEMENT_MAP).length !== EXPECTED_REPLACEMENTS) fail('replacement-map-count', `expected ${EXPECTED_REPLACEMENTS}, found ${Object.keys(BATCH_M_CONTROLLED_REPLACEMENT_MAP).length}`);

let changedCount = 0;
const changedByMock = new Map();
const changedKeys = new Set();
for (const [key, replacement] of Object.entries(BATCH_M_CONTROLLED_REPLACEMENT_MAP)) {
  const before = preQuestions.get(key);
  const after = postQuestions.get(key);
  if (!before) { fail('replacement-target-missing-before', key); continue; }
  if (!after) { fail('replacement-target-missing-after', key); continue; }
  const beforeContent = JSON.stringify({ prompt: before.prompt, choices: before.choices, answer: before.answer, figure: before.figure, difficulty: before.difficulty, skill: before.skill, domain: before.domain });
  const afterContent = JSON.stringify({ prompt: after.prompt, choices: after.choices, answer: after.answer, figure: after.figure, difficulty: after.difficulty, skill: after.skill, domain: after.domain });
  if (beforeContent === afterContent) fail('replacement-not-observed', key);
  if (after.prompt !== replacement.prompt) fail('replacement-prompt-mismatch', key);
  if (JSON.stringify(after.choices || []) !== JSON.stringify(replacement.choices || [])) fail('replacement-choices-mismatch', key);
  if (after.answer !== replacement.answer) fail('replacement-answer-mismatch', key);
  if (idOf(after) !== idOf(before)) fail('question-id-changed', key);
  changedCount += 1;
  changedKeys.add(key);
  addCount(changedByMock, key.split('::')[0]);
}
if (changedCount !== EXPECTED_REPLACEMENTS) fail('runtime-replacement-count', `expected ${EXPECTED_REPLACEMENTS}, observed ${changedCount}`);
for (const key of postQuestions.keys()) if (!EXPECTED_KEYS.has(key.split('::')[0])) fail('out-of-scope-runtime-key', key);

const qualityByMock = new Map();
const qualityBySection = new Map();
const qualityByDifficulty = new Map();
const failureReasonCounts = new Map();
const sprByMock = new Map();
let schemaFailures = 0;
let qualityFailures = 0;
let figureFingerprintCount = 0;

for (const [key, question] of postQuestions) {
  const testKey = key.split('::')[0];
  const schema = validateSatQuestion(question);
  if (!schema.valid) { schemaFailures += 1; fail('schema', { key, errors: schema.errors }); }
  const quality = evaluateContentQuality(question);
  if (quality.verdict !== 'pass') { qualityFailures += 1; for (const reason of quality.checks) addCount(failureReasonCounts, reason); }
  const summary = qualityByMock.get(testKey) || { total: 0, passed: 0, failed: 0, scoreSum: 0 };
  summary.total += 1;
  summary.scoreSum += quality.score;
  if (quality.verdict === 'pass') summary.passed += 1; else summary.failed += 1;
  qualityByMock.set(testKey, summary);
  addCount(qualityBySection, question.section || 'missing');
  addCount(qualityByDifficulty, question.difficulty || 'missing');
  if (question.questionType === 'student-produced-response') addCount(sprByMock, testKey);
  if (question.figure && getFigureDataFingerprint(question)) figureFingerprintCount += 1;
}

for (const [testKey, summary] of qualityByMock) if (summary.failed > 0) fail('content-quality', `${testKey}: ${summary.failed}/${summary.total} questions failed; average score ${(summary.scoreSum / summary.total).toFixed(2)}`);
try { validateFigureOriginalitySeries(appliedCorpus); } catch (error) { fail('figure-originality', String(error?.message || error)); }
if (changedKeys.size !== EXPECTED_REPLACEMENTS) fail('replacement-key-uniqueness', `expected ${EXPECTED_REPLACEMENTS} unique changed targets, found ${changedKeys.size}`);
if (postQuestions.size !== EXPECTED_RUNTIME_QUESTIONS) fail('complete-runtime-corpus', `expected ${EXPECTED_RUNTIME_QUESTIONS}, found ${postQuestions.size}`);

const report = {
  reportType: 'batch-m-comprehensive-20-test-qc',
  reportVersion: '2026-09-16.comprehensive-20-test-qc.v1',
  scope: 'SAT1-SAT10 and PSAT1-PSAT10 only',
  sourceCorpus: 'BATCH_M_TARGETED_PRODUCTION_CORPUS',
  replacementArtifact: 'docs/BATCH-M-CONTROLLED-REPLACEMENT-2026-09-16.json',
  productionMutation: false,
  releaseEligible: false,
  sat21Created: false,
  expected: { affectedRecords: EXPECTED_AFFECTED, mocks: EXPECTED_MOCKS, recordsPerMock: EXPECTED_RECORDS_PER_MOCK, runtimeQuestions: EXPECTED_RUNTIME_QUESTIONS, replacements: EXPECTED_REPLACEMENTS },
  observed: { preReplacementRuntimeQuestions: preQuestions.size, postReplacementRuntimeQuestions: postQuestions.size, mocks: appliedCorpus.length, replacementMapEntries: Object.keys(BATCH_M_CONTROLLED_REPLACEMENT_MAP).length, changedReplacementTargets: changedCount, schemaFailures, contentQualityFailures: qualityFailures, figureQuestionsWithDeterministicFingerprint: figureFingerprintCount },
  gates: {
    scopeAndIdentity: failures.some((item) => ['pre-replacement:mock-count', 'pre-replacement:record-count', 'post-replacement:mock-count', 'post-replacement:record-count', 'runtime-question-identity', 'runtime-duplicate-question', 'out-of-scope-runtime-key'].includes(item.check)) ? 'FAIL' : 'PASS',
    schema: schemaFailures === 0 ? 'PASS' : 'FAIL',
    replacementIntegrity: changedCount === EXPECTED_REPLACEMENTS && changedKeys.size === EXPECTED_REPLACEMENTS ? 'PASS' : 'FAIL',
    contentQuality: qualityFailures === 0 ? 'PASS' : 'FAIL',
    figureOriginality: failures.some((item) => item.check === 'figure-originality') ? 'FAIL' : 'PASS',
  },
  perMock: Object.fromEntries([...qualityByMock.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([testKey, summary]) => [testKey, { ...summary, averageScore: Number((summary.scoreSum / summary.total).toFixed(2)), sprCount: sprByMock.get(testKey) || 0, sprPercentOfMock: Number((((sprByMock.get(testKey) || 0) / summary.total) * 100).toFixed(2)) }])),
  sectionCounts: Object.fromEntries(qualityBySection),
  difficultyCounts: Object.fromEntries(qualityByDifficulty),
  failureReasonCounts: Object.fromEntries([...failureReasonCounts.entries()].sort(([, a], [, b]) => b - a)),
  replacementCountsByMock: Object.fromEntries([...changedByMock.entries()].sort(([a], [b]) => a.localeCompare(b))),
  failures,
};
report.passed = failures.length === 0;
report.status = report.passed ? 'PASS' : 'QUALITY_HOLD';
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
if (!report.passed) { console.error(`Batch M comprehensive 20-test QC FAILED with ${failures.length} gate failures.`); process.exitCode = 1; }
else console.log('Batch M comprehensive 20-test QC PASSED.');
