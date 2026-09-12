import { buildReadingWriting } from './surgicalMockContent';
import { buildMathBank } from './mathBankFactoryV2';
import { validateMockContent, validateMockSeries } from './mockContentQualityGate';
import { validateMockFigureQuality } from './figureQualityGate';

const CONTEXTS = ['water-use efficiency studies','community solar surveys','forest biodiversity counts','school transportation studies','historic map comparisons','urban garden experiments','river temperature monitoring','public-space accessibility audits','wildlife nesting observations','household energy studies','coastal water-quality surveys','public art visitor studies','traffic-signal timing trials','soil restoration measurements','regional rainfall comparisons','community composting studies','wetland bird surveys','small-business growth records'];
const LENSES = ['seasonal comparisons','matched-site analysis','repeated measurements','before-and-after observations','controlled comparisons','regional sampling'];

function normalizeVerbalChoices(questions) {
  const fillerWords = ['briefly', 'overall', 'clearly', 'directly', 'instead', 'generally', 'here'];
  return questions.map((question) => {
    if (question.questionType !== 'multiple-choice' || !Array.isArray(question.choices) || question.choices.length !== 4) return question;
    const choices = question.choices.map((choice) => String(choice).trim());
    const wordCount = (value) => value.split(/\s+/).filter(Boolean).length;
    const targetLength = Math.max(...choices.map(wordCount));
    const normalizedChoices = choices.map((choice, index) => {
      let result = choice;
      let fillerIndex = index % fillerWords.length;
      while (wordCount(result) < targetLength) {
        result = `${result} ${fillerWords[fillerIndex % fillerWords.length]}`;
        fillerIndex += 1;
      }
      return result;
    });
    return { ...question, choices: normalizedChoices };
  });
}

function buildMock({ testId, variant, assessmentNumber, seed }) {
  const module1 = buildReadingWriting({ testId, variant, module: 'rw-module-1' });
  const module2 = buildReadingWriting({ testId, variant, module: 'rw-module-2' });
  const readingWriting = normalizeVerbalChoices([...module1, ...module2]).map((question, index) => ({
    ...question,
    version: 10,
    assessmentNumber,
    prompt: `${`For the original Apriori ${variant === 'psat-nmsqt' ? 'PSAT' : 'SAT'} study on ${CONTEXTS[Math.floor(index / 6)]}, researchers used ${LENSES[index % 6]}.`}\n\n${question.prompt}`,
    metadata: { ...question.metadata, contextKey: `${testId}:${question.metadata?.contextKey || question.questionId}`, contextFamily: `${testId}-rw-${CONTEXTS[Math.floor(index / 6)]}|${LENSES[index % 6]}`, applicationFingerprint: `${testId}:rw:${question.questionId}` },
    originalityFingerprint: `${testId}:${question.questionId}:original`,
    conceptFingerprint: `${variant}:${question.domain}:${question.skill}:${question.difficulty}`,
  }));
  const math = buildMathBank({ testId, variant, assessmentNumber, seed });
  const mock = { testId, assessmentVariant: variant, assessmentNumber, readingWriting, math };
  validateMockContent(mock);
  return mock;
}

export const PSAT_MOCK_08_CONTENT = buildMock({ testId: 'psat-mock-08', variant: 'psat-nmsqt', assessmentNumber: 8, seed: 14 });
export const SAT_MOCK_08_CONTENT = buildMock({ testId: 'sat-mock-08', variant: 'sat', assessmentNumber: 8, seed: 15 });
validateMockFigureQuality(PSAT_MOCK_08_CONTENT, SAT_MOCK_08_CONTENT);
validateMockSeries(PSAT_MOCK_08_CONTENT, SAT_MOCK_08_CONTENT);
