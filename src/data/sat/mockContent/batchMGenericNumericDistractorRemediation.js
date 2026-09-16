/**
 * Batch M targeted remediation for five production Math items flagged by the
 * content-quality gate for overly generic numeric distractors.
 *
 * This keeps the question stem, correct answer, answer key, and underlying
 * skill intact. It replaces only distractors that are trivial +1/-1 or 2x
 * variants of the correct numeric answer.
 */

const TARGET_QUESTION_IDS = new Set([
  'psat-mock-04-math-math-module-2-standard-55',
  'psat-mock-05-math-math-module-2-standard-54',
  'psat-mock-07-math-math-module-1-m1-08',
  'psat-mock-07-math-math-module-2-low-80',
  'psat-mock-10-math-math-module-2-low-77',
]);

const CANDIDATE_OFFSETS = [3, -3, 5, -5, 7, -7, 11, -11, 13, -13];

function normalizeNumberText(value) {
  const numeric = Number(String(value ?? '').trim());
  return Number.isFinite(numeric) ? numeric : null;
}

function replacementCandidates(correct) {
  return CANDIDATE_OFFSETS
    .map((offset) => correct + offset)
    .filter((value) => Number.isFinite(value));
}

function repairQuestion(question) {
  const questionId = String(question?.questionId || question?.contentId || '');
  if (!TARGET_QUESTION_IDS.has(questionId)) return { question, applied: false };
  if (question?.section !== 'math' || question?.questionType !== 'multiple-choice') {
    throw new Error(`Batch M numeric distractor remediation: unexpected question shape for ${questionId}.`);
  }
  if (!Array.isArray(question.choices) || question.choices.length !== 4) {
    throw new Error(`Batch M numeric distractor remediation: expected four choices for ${questionId}.`);
  }

  const answerIndex = String(question.answer || '').charCodeAt(0) - 65;
  if (answerIndex < 0 || answerIndex > 3) {
    throw new Error(`Batch M numeric distractor remediation: invalid answer key for ${questionId}.`);
  }

  const correct = normalizeNumberText(question.choices[answerIndex]);
  if (correct === null) {
    throw new Error(`Batch M numeric distractor remediation: correct answer is not numeric for ${questionId}.`);
  }

  const choices = [...question.choices];
  const used = new Set(
    choices
      .map(normalizeNumberText)
      .filter((value) => value !== null)
      .map((value) => String(value)),
  );

  const genericIndexes = choices
    .map((choice, index) => ({ choice, index, value: normalizeNumberText(choice) }))
    .filter(({ index, value }) => index !== answerIndex && value !== null)
    .filter(({ value }) => [correct + 1, correct - 1, correct * 2].includes(value))
    .map(({ index }) => index);

  if (!genericIndexes.length) return { question, applied: false };

  const candidates = replacementCandidates(correct);
  let candidateCursor = 0;
  for (const index of genericIndexes) {
    while (candidateCursor < candidates.length && used.has(String(candidates[candidateCursor]))) candidateCursor += 1;
    if (candidateCursor >= candidates.length) {
      throw new Error(`Batch M numeric distractor remediation: no unique replacement distractor available for ${questionId}.`);
    }
    const replacement = candidates[candidateCursor];
    choices[index] = String(replacement);
    used.add(String(replacement));
    candidateCursor += 1;
  }

  return {
    question: {
      ...question,
      choices,
      metadata: {
        ...(question.metadata || {}),
        numericDistractorRepair: 'batch-m-targeted-gate-v1',
      },
    },
    applied: true,
  };
}

export function applyBatchMGenericNumericDistractorRemediation(corpus) {
  if (!Array.isArray(corpus)) throw new Error('Batch M numeric distractor remediation: corpus must be an array.');
  let changed = 0;
  const changedQuestionIds = [];
  const repairedCorpus = corpus.map((mock) => {
    const repair = (question) => {
      const result = repairQuestion(question);
      if (result.applied) {
        changed += 1;
        changedQuestionIds.push(String(question.questionId || question.contentId || ''));
      }
      return result.question;
    };
    return {
      ...mock,
      readingWriting: (mock.readingWriting || []).map(repair),
      math: (mock.math || []).map(repair),
    };
  });

  return {
    corpus: repairedCorpus,
    changed,
    changedQuestionIds,
  };
}

export default applyBatchMGenericNumericDistractorRemediation;
