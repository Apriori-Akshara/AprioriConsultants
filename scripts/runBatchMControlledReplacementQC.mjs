import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateSatQuestion } from '../src/data/sat/questionSchema.js';
import { BATCH_M_TARGETED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMTargetedProductionCorpus.js';
import { evaluateContentQualityBatch } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { BATCH_M_CONTROLLED_REPLACEMENT_MAP } from '../src/data/sat/mockContent/batchMControlledReplacementMap.js';
import { applyBatchMControlledReplacements } from '../src/data/sat/mockContent/batchMControlledReplacementMapAdapter.js';
import { canonicalBatchMTestKey, BATCH_M_TARGET_TEST_KEYS } from '../src/data/sat/mockContent/batchMCanonicalTestKey.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = JSON.parse(fs.readFileSync(path.join(root, 'docs/BATCH-M-CONTROLLED-REPLACEMENT-2026-09-16.json'), 'utf8'));
const authoritative = JSON.parse(fs.readFileSync(path.join(root, 'docs/BATCH-M-AUTHORITATIVE-CANDIDATE-SELECTION-2026-09-16.json'), 'utf8'));

const EXPECTED_SELECTED = 1594;
const EXPECTED_AFFECTED = 2144;
const EXPECTED_MOCKS = 20;
const EXPECTED_RECORDS_PER_MOCK = 196;

function collectQuestions(value, out = [], seen = new Set()) {
  if (!value || typeof value !== 'object' || seen.has(value)) return out;
  seen.add(value);
  if (Array.isArray(value)) {
    value.forEach((item) => collectQuestions(item, out, seen));
    return out;
  }

  if ((typeof value.questionId === 'string' && value.questionId) || (typeof value.contentId === 'string' && value.contentId)) {
    out.push(value);
    return out;
  }

  for (const [key, child] of Object.entries(value)) {
    if (key === 'figure' || key === 'metadata') continue;
    collectQuestions(child, out, seen);
  }
  return out;
}

function questionContentFingerprint(question) {
  return JSON.stringify({
    prompt: question?.prompt ?? null,
    choices: question?.choices ?? null,
    answer: question?.answer ?? null,
    rationale: question?.rationale ?? null,
    explanation: question?.explanation ?? null,
    figure: question?.figure ?? null,
    section: question?.section ?? null,
    domain: question?.domain ?? null,
    skill: question?.skill ?? null,
    difficulty: question?.difficulty ?? null,
    questionType: question?.questionType ?? null,
  });
}

if (report.authorization !== 'AUTHORIZED') throw new Error('Controlled replacement QC: authorization is not AUTHORIZED.');
if (report.sat21Created !== false) throw new Error('Controlled replacement QC: SAT21 flag is not false.');
if (report.productionMutation !== true) throw new Error('Controlled replacement QC: productionMutation must be true in the controlled-replacement artifact.');
if (report.releaseEligible !== false) throw new Error('Controlled replacement QC: releaseEligible must remain false.');
if (report.appliedCount !== EXPECTED_SELECTED) throw new Error(`Controlled replacement QC: expected ${EXPECTED_SELECTED} applied records, found ${report.appliedCount}.`);
if (authoritative.summary?.selected !== EXPECTED_SELECTED) throw new Error(`Controlled replacement QC: authoritative selection expected ${EXPECTED_SELECTED} selected records, found ${authoritative.summary?.selected}.`);
if (authoritative.summary?.total !== EXPECTED_AFFECTED) throw new Error(`Controlled replacement QC: authoritative selection expected ${EXPECTED_AFFECTED} affected records, found ${authoritative.summary?.total}.`);
if (authoritative.summary?.noEligibleCandidate !== 0) throw new Error('Controlled replacement QC: authoritative selection has unresolved no-eligible candidates.');

const mapEntries = Object.entries(BATCH_M_CONTROLLED_REPLACEMENT_MAP);
if (mapEntries.length !== EXPECTED_SELECTED) throw new Error(`Controlled replacement QC: expected ${EXPECTED_SELECTED} replacement-map entries, found ${mapEntries.length}.`);
if (new Set(mapEntries.map(([key]) => key)).size !== EXPECTED_SELECTED) throw new Error('Controlled replacement QC: duplicate replacement-map target keys found.');

const selectedRecords = Array.isArray(authoritative.records)
  ? authoritative.records.filter((record) => record.selectionDisposition === 'REPLACEMENT_CANDIDATE_SELECTED_FOR_DOWNSTREAM_APPROVAL')
  : [];
if (selectedRecords.length !== EXPECTED_SELECTED) throw new Error(`Controlled replacement QC: expected ${EXPECTED_SELECTED} authoritative selected records, found ${selectedRecords.length}.`);

const selectedKeySet = new Set(selectedRecords.map((record) => `${record.testKey}::${record.questionId}`));
for (const key of selectedKeySet) {
  if (!BATCH_M_CONTROLLED_REPLACEMENT_MAP[key]) throw new Error(`Controlled replacement QC: selected target missing from replacement map: ${key}.`);
  const [testKey] = key.split('::');
  if (!BATCH_M_TARGET_TEST_KEYS.has(testKey)) throw new Error(`Controlled replacement QC: out-of-scope replacement target: ${key}.`);
}
for (const key of mapEntries.map(([entryKey]) => entryKey)) {
  if (!selectedKeySet.has(key)) throw new Error(`Controlled replacement QC: replacement-map target was not authorized by authoritative selection: ${key}.`);
}

const replacementCandidates = mapEntries.map(([, replacement]) => replacement);
const quality = evaluateContentQualityBatch(replacementCandidates);
if (!quality?.passed) throw new Error(`Controlled replacement QC: replacement quality gate failed (${quality?.failedCount ?? 'unknown'} failures).`);

const preCorpus = BATCH_M_TARGETED_PRODUCTION_CORPUS;
const canonicalMocks = preCorpus.map((mock) => ({ mock, testKey: canonicalBatchMTestKey(mock) }));
const canonicalKeys = canonicalMocks.map(({ testKey }) => testKey).filter(Boolean);
const affectedMocks = canonicalMocks.filter(({ testKey }) => BATCH_M_TARGET_TEST_KEYS.has(testKey));
if (affectedMocks.length !== EXPECTED_MOCKS) throw new Error(`Controlled replacement QC: expected ${EXPECTED_MOCKS} affected mocks, found ${affectedMocks.length}.`);
if (new Set(affectedMocks.map(({ testKey }) => testKey)).size !== EXPECTED_MOCKS) throw new Error('Controlled replacement QC: duplicate canonical affected mock keys found.');

const outsideBatchM = canonicalMocks.filter(({ testKey }) => testKey && !BATCH_M_TARGET_TEST_KEYS.has(testKey));
const appliedCorpus = applyBatchMControlledReplacements(preCorpus);
if (!Array.isArray(appliedCorpus) || appliedCorpus.length !== preCorpus.length) throw new Error('Controlled replacement QC: runtime adapter changed corpus length.');

const preQuestions = new Map();
for (const { mock, testKey } of canonicalMocks) {
  for (const question of collectQuestions(mock)) {
    const questionId = String(question?.questionId || question?.contentId || '');
    if (!testKey || !questionId) continue;
    const key = `${testKey}::${questionId}`;
    if (preQuestions.has(key)) throw new Error(`Controlled replacement QC: duplicate pre-replacement target question: ${key}.`);
    preQuestions.set(key, question);
  }
}

const postQuestions = new Map();
for (const mock of appliedCorpus) {
  const testKey = canonicalBatchMTestKey(mock);
  if (!testKey) continue;
  for (const question of collectQuestions(mock)) {
    const questionId = String(question?.questionId || question?.contentId || '');
    if (!questionId) continue;
    const key = `${testKey}::${questionId}`;
    if (postQuestions.has(key)) throw new Error(`Controlled replacement QC: duplicate post-replacement question: ${key}.`);
    postQuestions.set(key, question);
  }
}

if (preQuestions.size !== EXPECTED_AFFECTED) throw new Error(`Controlled replacement QC: expected ${EXPECTED_AFFECTED} canonical questions before replacement, found ${preQuestions.size}.`);
if (postQuestions.size !== preQuestions.size) throw new Error(`Controlled replacement QC: canonical question count changed from ${preQuestions.size} to ${postQuestions.size}.`);

let actualApplied = 0;
const changedTargets = new Set();
for (const key of selectedKeySet) {
  const before = preQuestions.get(key);
  const after = postQuestions.get(key);
  if (!before || !after) throw new Error(`Controlled replacement QC: selected target missing from runtime corpus: ${key}.`);

  const replacement = BATCH_M_CONTROLLED_REPLACEMENT_MAP[key];
  if (String(after.questionId || after.contentId || '') !== String(before.questionId || before.contentId || '')) {
    throw new Error(`Controlled replacement QC: question identity changed for ${key}.`);
  }
  if (String(after.testId || '') !== String(before.testId || '')) {
    throw new Error(`Controlled replacement QC: production testId changed for ${key}.`);
  }
  if (questionContentFingerprint(before) === questionContentFingerprint(after)) {
    throw new Error(`Controlled replacement QC: runtime adapter did not change the selected question content for ${key}.`);
  }
  if (String(after.prompt || '') !== String(replacement.prompt || '')) {
    throw new Error(`Controlled replacement QC: runtime prompt does not match replacement map for ${key}.`);
  }
  if (JSON.stringify(after.choices || []) !== JSON.stringify(replacement.choices || [])) {
    throw new Error(`Controlled replacement QC: runtime choices do not match replacement map for ${key}.`);
  }
  if (String(after.answer || '') !== String(replacement.answer || '')) {
    throw new Error(`Controlled replacement QC: runtime answer does not match replacement map for ${key}.`);
  }

  const schema = validateSatQuestion(after);
  if (!schema.valid) throw new Error(`Controlled replacement QC: schema failure after replacement in ${key}: ${schema.errors.join(' ')}`);

  changedTargets.add(key);
  actualApplied += 1;
}

if (actualApplied !== EXPECTED_SELECTED || changedTargets.size !== EXPECTED_SELECTED) {
  throw new Error(`Controlled replacement QC: expected ${EXPECTED_SELECTED} runtime replacements, found ${actualApplied}.`);
}

for (const { mock: preMock, testKey } of outsideBatchM) {
  const postMock = appliedCorpus.find((candidate) => canonicalBatchMTestKey(candidate) === testKey);
  if (!postMock) continue;
  if (JSON.stringify(preMock) !== JSON.stringify(postMock)) {
    throw new Error(`Controlled replacement QC: out-of-scope mock changed unexpectedly: ${testKey}.`);
  }
}

const mockSummaries = affectedMocks
  .map(({ testKey }) => {
    const replacementCount = selectedRecords.filter((record) => record.testKey === testKey).length;
    const questionCount = [...postQuestions.keys()].filter((key) => key.startsWith(`${testKey}::`)).length;
    if (questionCount !== EXPECTED_RECORDS_PER_MOCK) {
      throw new Error(`Controlled replacement QC: ${testKey} expected ${EXPECTED_RECORDS_PER_MOCK} questions, found ${questionCount}.`);
    }
    return { testKey, questionCount, replacementCount };
  })
  .sort((a, b) => a.testKey.localeCompare(b.testKey));

console.log(JSON.stringify({
  passed: true,
  authoritativeSelection: {
    affectedCount: EXPECTED_AFFECTED,
    selectedCount: EXPECTED_SELECTED,
    noEligibleCandidate: 0,
  },
  replacementQualityGate: 'PASS',
  runtimeAdapterGate: 'PASS',
  runtimeReplacementCount: actualApplied,
  affectedMockGate: 'PASS',
  affectedMockCount: affectedMocks.length,
  affectedQuestionCount: preQuestions.size,
  outOfScopeMocksChecked: outsideBatchM.length,
  releaseEligible: false,
  final30MockCorpusGate: 'PENDING_DOWNSTREAM',
  sat21Created: false,
  mockSummaries,
}, null, 2));
