import { BATCH_M_CONTROLLED_REPLACEMENT_MAP } from './batchMControlledReplacementMap';
import { canonicalBatchMTestKey, BATCH_M_TARGET_TEST_KEYS } from './batchMCanonicalTestKey';

function replaceQuestion(testKey, question) {
  const questionId = String(question?.questionId || question?.contentId || '');
  const replacement = BATCH_M_CONTROLLED_REPLACEMENT_MAP[`${testKey}::${questionId}`];
  if (!replacement) return question;

  return {
    ...replacement,
    testId: question.testId,
    questionId: question.questionId || question.contentId,
    contentId: question.contentId || question.questionId,
  };
}

export function applyBatchMControlledReplacements(corpus) {
  if (!Array.isArray(corpus)) {
    throw new Error('Batch M controlled replacement: corpus must be an array.');
  }

  return corpus.map((mock) => {
    const testKey = canonicalBatchMTestKey(mock);
    if (!BATCH_M_TARGET_TEST_KEYS.has(testKey)) return mock;

    return {
      ...mock,
      readingWriting: (mock.readingWriting || []).map((question) => replaceQuestion(testKey, question)),
      math: (mock.math || []).map((question) => replaceQuestion(testKey, question)),
    };
  });
}

export default applyBatchMControlledReplacements;
