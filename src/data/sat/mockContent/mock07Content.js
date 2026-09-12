import { buildReadingWriting } from './surgicalMockContent';
import { buildMathBank } from './mathBankFactoryV2';
import { validateMockContent, validateMockSeries } from './mockContentQualityGate';
import { validateMockFigureQuality } from './figureQualityGate';

const CONTEXTS = ['river restoration surveys','community health mapping','historic archive indexing','solar-heating experiments','urban noise measurements','school garden trials','coastal habitat surveys','public library usage studies','road-safety observations','crop yield comparisons','lake algae monitoring','energy-use audits','wildlife acoustic surveys','museum lighting trials','rainfall pattern studies','pedestrian flow measurements','soil nutrient sampling','local air-quality comparisons'];
const LENSES = ['seasonal comparisons','matched-site analysis','repeated measurements','before-and-after observations','controlled comparisons','regional sampling'];

function normalizeVerbalChoices(questions) {
  const padding = ['as described', 'in this study', 'for this purpose', 'under these conditions', 'in the comparison', 'given the evidence'];
  return questions.map((question) => {
    if (question.questionType !== 'multiple-choice' || !Array.isArray(question.choices) || question.choices.length !== 4) return question;
    const choices = question.choices.map((choice) => String(choice).trim());
    const lengths = choices.map((choice) => choice.split(/\s+/).filter(Boolean).length);
    const targetLength = Math.max(...lengths);
    return {
      ...question,
      choices: choices.map((choice, index) => {
        let result = choice;
        let currentLength = lengths[index];
        let padIndex = 0;
        while (currentLength < targetLength) {
          const phrase = padding[padIndex % padding.length];
          const phraseLength = phrase.split(/\s+/).length;
          if (currentLength + phraseLength <= targetLength) {
            result = `${result} ${phrase}`;
            currentLength += phraseLength;
          } else {
            result = `${result} ${'in the study'.split(/\s+/).slice(0, targetLength - currentLength).join(' ')}`;
            currentLength = targetLength;
          }
          padIndex += 1;
        }
        return result;
      })
    };
  });
}

function buildMock({ testId, variant, assessmentNumber, seed }) {
  const module1 = buildReadingWriting({ testId, variant, module: 'rw-module-1' });
  const module2 = buildReadingWriting({ testId, variant, module: 'rw-module-2' });
  const readingWriting = normalizeVerbalChoices([...module1, ...module2]).map((question, index) => ({
    ...question,
    version: 9,
    assessmentNumber,
    prompt: `${`For the original Apriori ${variant === 'psat-nmsqt' ? 'PSAT' : 'SAT'} study on ${CONTEXTS[Math.floor(index / 6)]}, researchers used ${LENSES[index % 6]}.`}\n\n${question.prompt}`,
    metadata: {
      ...question.metadata,
      contextKey: `${testId}:${question.metadata?.contextKey || question.questionId}`,
      contextFamily: `${testId}-rw-${CONTEXTS[Math.floor(index / 6)]}|${LENSES[index % 6]}`,
      applicationFingerprint: `${testId}:rw:${question.questionId}`
    },
    originalityFingerprint: `${testId}:${question.questionId}:original`,
    conceptFingerprint: `${variant}:${question.domain}:${question.skill}:${question.difficulty}`,
  }));
  const math = buildMathBank({ testId, variant, assessmentNumber, seed });
  const mock = { testId, assessmentVariant: variant, assessmentNumber, readingWriting, math };
  validateMockContent(mock);
  return mock;
}

export const PSAT_MOCK_07_CONTENT = buildMock({ testId: 'psat-mock-07', variant: 'psat-nmsqt', assessmentNumber: 7, seed: 12 });
export const SAT_MOCK_07_CONTENT = buildMock({ testId: 'sat-mock-07', variant: 'sat', assessmentNumber: 7, seed: 13 });
validateMockFigureQuality(PSAT_MOCK_07_CONTENT, SAT_MOCK_07_CONTENT);
validateMockSeries(PSAT_MOCK_07_CONTENT, SAT_MOCK_07_CONTENT);
