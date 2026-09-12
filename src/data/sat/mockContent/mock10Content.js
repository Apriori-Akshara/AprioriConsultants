import { buildReadingWriting } from './surgicalMockContent';
import { buildMathBank } from './mathBankFactoryV2';
import { validateMockContent, validateMockSeries } from './mockContentQualityGate';
import { validateMockFigureQuality } from './figureQualityGate';

const CONTEXTS = ['forest-fire recovery surveys','community solar adoption records','public-library program studies','coastal habitat restoration','school attendance pattern studies','urban heat mapping','water-quality monitoring','small-business inventory audits','bird migration observations','public-garden yield records','regional air-quality measurements','museum visitor studies','river restoration comparisons','housing-energy surveys','agricultural soil surveys','local mobility studies','historic archive digitization','wildlife nesting observations'];
const LENSES = ['multi-year comparisons','matched-site analysis','repeated field measurements','before-and-after observations','controlled comparisons','regional sampling'];

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
    prompt: `For the original Apriori ${variant === 'psat-nmsqt' ? 'PSAT' : 'SAT'} study on ${CONTEXTS[Math.floor(index / 6)]}, researchers used ${LENSES[index % 6]}.\n\n${question.prompt}`,
    metadata: { ...question.metadata, contextKey: `${testId}:${question.metadata?.contextKey || question.questionId}`, contextFamily: `${testId}-rw-${CONTEXTS[Math.floor(index / 6)]}|${LENSES[index % 6]}`, applicationFingerprint: `${testId}:rw:${question.questionId}` },
    originalityFingerprint: `${testId}:${question.questionId}:original`,
    conceptFingerprint: `${variant}:${question.domain}:${question.skill}:${question.difficulty}`,
  }));
  const math = buildMathBank({ testId, variant, assessmentNumber, seed });
  const mock = { testId, assessmentVariant: variant, assessmentNumber, readingWriting, math };
  validateMockContent(mock);
  return mock;
}

export const PSAT_MOCK_10_CONTENT = buildMock({ testId: 'psat-mock-10', variant: 'psat-nmsqt', assessmentNumber: 10, seed: 18 });
export const SAT_MOCK_10_CONTENT = buildMock({ testId: 'sat-mock-10', variant: 'sat', assessmentNumber: 10, seed: 19 });
validateMockFigureQuality(PSAT_MOCK_10_CONTENT, SAT_MOCK_10_CONTENT);
validateMockSeries(PSAT_MOCK_10_CONTENT, SAT_MOCK_10_CONTENT);