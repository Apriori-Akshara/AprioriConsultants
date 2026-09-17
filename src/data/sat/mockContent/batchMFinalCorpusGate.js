/**
 * Batch M — final collective verification for the frozen 30-mock corpus.
 *
 * This gate does not generate, mutate, or publish questions. It validates the
 * already-accepted production records as one corpus before public-corpus release.
 */
import { validateSatQuestion } from '../questionSchema';
import { validateFigureOriginalitySeries, getFigureDataFingerprint } from './figureOriginalityQC';
import { BATCH_M_PRODUCTION_SEQUENCE, assertBatchMProductionOrder } from './batchMProductionController';

const EXPECTED_MOCK_COUNT = 30;
const EXPECTED_RECORDS_PER_MOCK = 196;
const VALID_ANSWER_LABELS = new Set(['A', 'B', 'C', 'D']);

function normalize(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function collectRecords(mock) {
  return [...(mock?.readingWriting || []), ...(mock?.math || [])];
}

function resolveTestKey(mock) {
  const explicitKey = String(mock?.testKey || '').trim().toUpperCase();
  if (explicitKey) return explicitKey;

  const testId = String(mock?.testId || '').trim();
  const target = BATCH_M_PRODUCTION_SEQUENCE.find((item) => item.testId === testId);
  return target?.testKey || '';
}

function assertIdentity(mock, target, index) {
  if (!mock || typeof mock !== 'object') throw new Error(`Batch M final corpus: missing mock at position ${index + 1}`);
  if (mock.testId !== target.testId) throw new Error(`Batch M final corpus: ${target.testKey} has testId ${mock.testId || 'missing'}, expected ${target.testId}`);
  if (mock.assessmentVariant !== target.variant) throw new Error(`Batch M final corpus: ${target.testKey} has incorrect assessment variant`);
  if (mock.assessmentNumber !== undefined && mock.assessmentNumber !== null && mock.assessmentNumber !== target.assessmentNumber) {
    throw new Error(`Batch M final corpus: ${target.testKey} has incorrect assessment number`);
  }
}

function assertMockRecords(mock, target) {
  const records = collectRecords(mock);
  if (records.length !== EXPECTED_RECORDS_PER_MOCK) {
    throw new Error(`Batch M final corpus: ${target.testKey} expected ${EXPECTED_RECORDS_PER_MOCK} records, found ${records.length}`);
  }

  const ids = new Set();
  const answerCounts = { A: 0, B: 0, C: 0, D: 0 };
  const difficultyCounts = { easy: 0, medium: 0, hard: 0 };
  const moduleCounts = {};

  for (const record of records) {
    const result = validateSatQuestion(record);
    if (!result.valid) throw new Error(`Batch M final corpus: schema failure for ${record?.questionId || 'unknown'}: ${result.errors.join(' ')}`);
    if (record.testId !== target.testId) throw new Error(`Batch M final corpus: ${target.testKey} contains a record with the wrong testId`);

    const id = String(record.questionId || record.contentId || '');
    if (ids.has(id)) throw new Error(`Batch M final corpus: duplicate question ID inside ${target.testKey}: ${id}`);
    ids.add(id);

    const answer = String(record.answer || '').trim().toUpperCase();
    if (!VALID_ANSWER_LABELS.has(answer) && record.questionType === 'multiple-choice') {
      throw new Error(`Batch M final corpus: invalid multiple-choice answer label in ${target.testKey}: ${id}`);
    }
    if (VALID_ANSWER_LABELS.has(answer)) answerCounts[answer] += 1;
    if (difficultyCounts[record.difficulty] !== undefined) difficultyCounts[record.difficulty] += 1;
    moduleCounts[record.module] = (moduleCounts[record.module] || 0) + 1;

    const restored = JSON.parse(JSON.stringify(record));
    if (JSON.stringify(restored) !== JSON.stringify(record)) throw new Error(`Batch M final corpus: storage round-trip changed ${id}`);
  }

  return { recordCount: records.length, answerCounts, difficultyCounts, moduleCounts };
}

function assertGlobalUniqueness(corpus) {
  const rwContexts = new Map();
  const rwPrompts = new Map();
  const mathApplications = new Map();
  const figureData = new Map();
  const questionIds = new Set();

  for (const mock of corpus) {
    const testId = String(mock?.testId || '').trim();
    for (const record of collectRecords(mock)) {
      const id = String(record.questionId || record.contentId || '');
      if (questionIds.has(id)) throw new Error(`Batch M final corpus: duplicate question ID across mocks: ${id}`);
      questionIds.add(id);

      if (record.section === 'reading-writing') {
        const context = normalize(record.metadata?.contextKey);
        const prompt = normalize(record.prompt);
        if (context) {
          if (rwContexts.has(context)) throw new Error(`Batch M final corpus: R&W context reused by ${rwContexts.get(context)} and ${id}`);
          rwContexts.set(context, id);
        }
        if (prompt) {
          if (rwPrompts.has(prompt)) throw new Error(`Batch M final corpus: R&W prompt reused by ${rwPrompts.get(prompt)} and ${id}`);
          rwPrompts.set(prompt, id);
        }
      }

      if (record.section === 'math') {
        const application = normalize(record.metadata?.applicationFingerprint);
        if (application) {
          if (mathApplications.has(application)) throw new Error(`Batch M final corpus: Math application reused by ${mathApplications.get(application)} and ${id}`);
          mathApplications.set(application, id);
        }
        const fingerprint = getFigureDataFingerprint(record);
        if (fingerprint) {
          const previous = figureData.get(fingerprint);
          if (previous && previous.testId !== testId) {
            throw new Error(`Batch M final corpus: figure data reused by ${previous.questionId} and ${id}`);
          }
          if (!previous) figureData.set(fingerprint, { testId, questionId: id });
        }
      }
    }
  }

  validateFigureOriginalitySeries(corpus);
  return { uniqueQuestionIds: questionIds.size, uniqueRWContexts: rwContexts.size, uniqueRWPrompts: rwPrompts.size, uniqueMathApplications: mathApplications.size, uniqueFigureDataAcrossMocks: figureData.size };
}

export function runBatchMFinalCorpusGate(corpus) {
  if (!Array.isArray(corpus) || corpus.length !== EXPECTED_MOCK_COUNT) {
    throw new Error(`Batch M final corpus: exactly ${EXPECTED_MOCK_COUNT} production mocks are required`);
  }

  const keys = corpus.map(resolveTestKey);
  assertBatchMProductionOrder(keys);

  const summaries = corpus.map((mock, index) => {
    const target = BATCH_M_PRODUCTION_SEQUENCE[index];
    assertIdentity(mock, target, index);
    return { testKey: target.testKey, testId: target.testId, ...assertMockRecords(mock, target) };
  });

  const global = assertGlobalUniqueness(corpus);
  const totalRecords = summaries.reduce((sum, item) => sum + item.recordCount, 0);
  if (totalRecords !== EXPECTED_MOCK_COUNT * EXPECTED_RECORDS_PER_MOCK) {
    throw new Error(`Batch M final corpus: expected ${EXPECTED_MOCK_COUNT * EXPECTED_RECORDS_PER_MOCK} total records, found ${totalRecords}`);
  }

  return Object.freeze({
    passed: true,
    status: 'final-30-mock-corpus-qc-passed',
    mockCount: EXPECTED_MOCK_COUNT,
    totalRecords,
    summaries,
    global,
    releaseBoundary: 'legacy-public-corpus-remains-separate-until-explicit-release',
  });
}

export default runBatchMFinalCorpusGate;
