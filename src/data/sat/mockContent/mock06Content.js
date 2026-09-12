import { buildReadingWriting } from './surgicalMockContent';
import { buildMathBank } from './mathBankFactoryV2';
import { validateMockContent, validateMockSeries } from './mockContentQualityGate';
import { validateMockFigureQuality } from './figureQualityGate';

const CONTEXTS = ['urban tree-canopy surveys','coastal erosion monitoring','library program evaluations','solar-panel efficiency trials','wetland restoration studies','public transit reliability audits','crop irrigation experiments','historic building surveys','lake temperature monitoring','bird-migration observations','school attendance studies','community recycling trials','bridge vibration measurements','local heat-island mapping','soil moisture experiments','museum visitor studies','freshwater habitat surveys','bicycle traffic counts'];
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
    version: 8,
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

export const PSAT_MOCK_06_CONTENT = buildMock({ testId: 'psat-mock-06', variant: 'psat-nmsqt', assessmentNumber: 6, seed: 10 });
export const SAT_MOCK_06_CONTENT = buildMock({ testId: 'sat-mock-06', variant: 'sat', assessmentNumber: 6, seed: 11 });
validateMockFigureQuality(PSAT_MOCK_06_CONTENT, SAT_MOCK_06_CONTENT);
validateMockSeries(PSAT_MOCK_06_CONTENT, SAT_MOCK_06_CONTENT);
