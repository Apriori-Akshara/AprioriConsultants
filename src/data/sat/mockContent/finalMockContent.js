import { buildMock as buildBaseMock } from './surgicalMockContent';

const letterIndex = (letter) => String(letter || 'A').charCodeAt(0) - 65;

const balancedRhetoricalChoices = [
  'Approach B used 18% less energy than Approach A and stayed within the target.',
  'The study compared three approaches while recording energy use for each one.',
  'Approach B was one of the three approaches included in the comparison.',
  'The researchers measured and reported energy use and performance for all approaches.'
];

const balancedCrossTextChoices = [
  'can help while still requiring attention to local conditions.',
  'can help across settings despite differences in local conditions.',
  'cannot help unless every site follows the same procedures.',
  'has limited value when local conditions change the outcome.'
];

function normalizeChoices(question) {
  if (question.section !== 'reading-writing' || question.questionType !== 'multiple-choice') {
    return question;
  }

  const position = letterIndex(question.answer);
  let choices = question.choices;

  if (question.skill === 'Rhetorical Synthesis') {
    choices = balancedRhetoricalChoices;
  } else if (question.skill === 'Cross-Text Connections') {
    choices = balancedCrossTextChoices;
  }

  return {
    ...question,
    choices,
    answer: String.fromCharCode(65 + position),
  };
}

function convertSelectedMathItems(question, localIndex) {
  if (
    question.section !== 'math' ||
    question.questionType !== 'multiple-choice' ||
    localIndex % 22 !== 21
  ) {
    return question;
  }

  const position = letterIndex(question.answer);
  const numericAnswer = question.choices?.[position] ?? '';

  return {
    ...question,
    questionType: 'student-produced-response',
    interactionType: 'student-produced-response',
    choices: [],
    answer: String(numericAnswer).trim(),
    metadata: {
      ...question.metadata,
      answerFormat: 'numeric',
    },
  };
}

export function finalizeMockQuestions(records) {
  return records.map((question, index) => {
    const verbal = normalizeChoices(question);
    return convertSelectedMathItems(verbal, index);
  });
}

export function buildMock({ testId, variant, section, module }) {
  return finalizeMockQuestions(buildBaseMock({ testId, variant, section, module }));
}

export function buildReadingWriting(args) {
  return finalizeMockQuestions(buildBaseMock({ ...args, section: 'reading-writing' }));
}

export function buildMath(args) {
  return finalizeMockQuestions(buildBaseMock({ ...args, section: 'math' }));
}

export default { buildMock, buildReadingWriting, buildMath, finalizeMockQuestions };
