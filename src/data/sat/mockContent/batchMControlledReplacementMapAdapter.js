import { BATCH_M_CONTROLLED_REPLACEMENT_MAP } from './batchMControlledReplacementMap';

const TARGET_TESTS = new Set([
  'SAT1', 'SAT2', 'SAT3', 'SAT4', 'SAT5', 'SAT6', 'SAT7', 'SAT8', 'SAT9', 'SAT10',
  'PSAT1', 'PSAT2', 'PSAT3', 'PSAT4', 'PSAT5', 'PSAT6', 'PSAT7', 'PSAT8', 'PSAT9', 'PSAT10',
]);

function replaceQuestion(testKey, question) {
  const key = `${testKey}::${String(question?.questionId || question?.contentId || '')}`;
  const replacement = BATCH_M_CONTROLLED_REPLACEMENT_MAP[key];
  if (!replacement) return question;
  return {
    ...replacement,
    testId: question.testId,
    questionId: question.questionId || question.contentId,
    contentId: question.contentId || question.questionId,
  };
}

export function applyBatchMControlledReplacements(corpus) {
  if (!Array.isArray(corpus)) throw new Error('Batch M controlled replacement: corpus must be an array.');

  return corpus.map((mock) => {
    const testKey = String(mock?.testKey || '').toUpperCase();
    if (!TARGET_TESTS.has(testKey)) return mock;

    return {
      ...mock,
      readingWriting: (mock.readingWriting || []).map((question) => replaceQuestion(testKey, question)),
      math: (mock.math || []).map((question) => replaceQuestion(testKey, question)),
    };
  });
}

export default applyBatchMControlledReplacements;
