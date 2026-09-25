/**
 * Human question-bank content adapter.
 *
 * The editable bank should receive the explicit canonical answer when present.
 * Some older/remediated records also retain the same answer in controlled
 * machine-readable metadata or in an explicit "Choice X is correct" statement.
 * This adapter resolves only those documented redundant representations; it
 * never infers an answer from the position of an option alone.
 */

const NON_EMPTY = (value) => value !== null && value !== undefined && String(value).trim() !== '';

function collectExplicitAnswers(question) {
  const values = [];
  const add = (value, source) => {
    if (NON_EMPTY(value)) values.push({ value: String(value).trim(), source });
  };

  add(question?.answer, 'question.answer');
  add(question?.correctAnswer, 'question.correctAnswer');
  add(question?.correctOption, 'question.correctOption');
  add(question?.correctChoice, 'question.correctChoice');
  add(question?.correctChoiceLabel, 'question.correctChoiceLabel');
  add(question?.answerLabel, 'question.answerLabel');

  const metadata = question?.metadata && typeof question.metadata === 'object' ? question.metadata : {};
  add(metadata.answer, 'metadata.answer');
  add(metadata.correctAnswer, 'metadata.correctAnswer');
  add(metadata.correctOption, 'metadata.correctOption');
  add(metadata.correctChoice, 'metadata.correctChoice');
  add(metadata.correctChoiceLabel, 'metadata.correctChoiceLabel');
  add(metadata.answerLabel, 'metadata.answerLabel');

  return { values, metadata };
}

export function resolveQuestionChoices(question) {
  if (!question || typeof question !== 'object') return [];
  const choices = question.choices ?? question.options ?? [];
  return Array.isArray(choices) ? choices : [];
}

export function resolveQuestionAnswer(question) {
  if (!question || typeof question !== 'object') return '';

  const { values, metadata } = collectExplicitAnswers(question);
  const normalized = [...new Set(values.map((item) => item.value.toUpperCase()))];
  if (normalized.length > 1) {
    throw new Error(
      'Conflicting explicit answer values for ' +
      (question.questionId || question.contentId || 'unknown question') +
      ': ' +
      values.map((item) => item.source + '=' + item.value).join(', '),
    );
  }
  if (normalized.length === 1) return normalized[0];

  if (question.questionType === 'multiple-choice') {
    const profiles = metadata.distractor_architecture?.profiles;
    if (profiles && typeof profiles === 'object') {
      const correctKeys = Object.entries(profiles)
        .filter(([, profile]) => profile && String(profile.role || '').trim().toLowerCase() === 'correct')
        .map(([key]) => key.trim().toUpperCase())
        .filter((key) => /^[A-D]$/.test(key));

      if (correctKeys.length === 1) return correctKeys[0];
      if (correctKeys.length > 1) {
        throw new Error(
          'Ambiguous correct-answer metadata for ' +
          (question.questionId || question.contentId || 'unknown question'),
        );
      }
    }

    const explanation = NON_EMPTY(question.explanation) ? String(question.explanation) : '';
    const explicitChoice = explanation.match(/\b(?:Choice|Option)\s+([ABCD])\s+is\s+correct\b/i);
    if (explicitChoice) return explicitChoice[1].toUpperCase();

    const explicitAnswer = explanation.match(/\b(?:correct\s+answer|answer)\s*(?:is|:)\s*([ABCD])\b/i);
    if (explicitAnswer) return explicitAnswer[1].toUpperCase();
  }

  return '';
}

export function requireResolvedMultipleChoiceAnswer(question) {
  const answer = resolveQuestionAnswer(question).toUpperCase();
  if (question?.questionType === 'multiple-choice' && !/^[A-D]$/.test(answer)) {
    throw new Error(
      'No explicit/resolvable A-D answer found for ' +
      (question?.questionId || question?.contentId || 'unknown question'),
    );
  }
  return answer || resolveQuestionAnswer(question);
}

export default {
  resolveQuestionChoices,
  resolveQuestionAnswer,
  requireResolvedMultipleChoiceAnswer,
};
