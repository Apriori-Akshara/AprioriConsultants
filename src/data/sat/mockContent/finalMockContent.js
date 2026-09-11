import { buildMock as buildBaseMock } from './surgicalMockContent';

const letterIndex = (letter) => String(letter || 'A').charCodeAt(0) - 65;

const balancedRhetoricalChoices = [
  'Approach B used 18% less energy than Approach A and met the target performance.',
  'The study compared three approaches and recorded the energy use for each one tested.',
  'Approach B was one of the three approaches evaluated in the reported efficiency comparison.',
  'The researchers measured and reported energy use and performance for all three approach types.'
];

const balancedCrossTextChoices = [
  'can help while still requiring attention to local conditions.',
  'can help across settings despite differences in local conditions.',
  'cannot help unless every site follows the same procedures.',
  'has limited value when local conditions change the outcome.'
];

const balancedSeasonalInferenceChoices = [
  'The seasonal shift may matter, but other changing conditions remain possible explanations.',
  'The seasonal shift caused the pattern because it happened before the change.',
  'Temperature and moisture can be ignored because they changed gradually during observation.',
  'The pattern occurs only when the seasonal shift has the same form.'
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
  } else if (question.skill === 'Inferences' && question.prompt.includes('seasonal shift')) {
    choices = balancedSeasonalInferenceChoices;
  }

  return {
    ...question,
    choices,
    answer: String.fromCharCode(65 + position),
  };
}

function shouldConvertToSpr(question, localIndex) {
  if (question.section !== 'math' || question.questionType !== 'multiple-choice') return false;

  if (question.module === 'math-module-1') {
    return localIndex === 20;
  }

  if (question.module === 'math-module-2') {
    return localIndex === 3 || localIndex === 24 || localIndex === 45;
  }

  return false;
}

function convertSelectedMathItems(question, localIndex) {
  if (!shouldConvertToSpr(question, localIndex)) return question;

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
