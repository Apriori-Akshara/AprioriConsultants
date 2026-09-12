import { buildReadingWriting } from './surgicalMockContent';
import { buildMathBank } from './mathBankFactoryV2';
import { validateMockContent, validateMockSeries } from './mockContentQualityGate';
import { validateMockFigureQuality } from './figureQualityGate';

const CONTEXTS = [
  'urban shade mapping','wetland bird surveys','museum archive access','battery recycling trials','river restoration planning','community transit studies',
  'coastal soil sampling','public library digitization','solar storage testing','crop pollination trials','bridge vibration monitoring','language-change surveys',
  'dune vegetation recovery','water-demand forecasting','historic theater preservation','microplastic sampling','school commute research','renewable-grid planning'
];
const LENSES = ['a comparison of two sites','a repeated measurement study','a survey across several regions','a long-term observational record','a model checked against field observations','a controlled experiment with repeated measurements'];

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

function makeReadingWriting(testId, variant) {
  const module1 = buildReadingWriting({ testId, variant, module: 'rw-module-1' });
  const module2 = buildReadingWriting({ testId, variant, module: 'rw-module-2' });
  const programFrame = variant === 'psat-nmsqt'
    ? 'For the original Apriori PSAT study'
    : 'For the original Apriori SAT study';
  return normalizeVerbalChoices([...module1, ...module2]).map((question, index) => {
    const topic = CONTEXTS[Math.floor(index / 6)];
    const lens = LENSES[index % 6];
    const prefix = `${programFrame} on ${topic}, researchers used ${lens}.`;
    return {
      ...question,
      version: 6,
      assessmentNumber: 3,
      prompt: `${prefix}\n\n${question.prompt}`,
      originalityFingerprint: `${testId}-rw-${index + 1}`,
      conceptFingerprint: `${question.conceptFingerprint}-${testId}-${index + 1}`,
      metadata: {
        ...question.metadata,
        contextKey: `${variant}-${testId}-rw-context-${index + 1}`,
        contextFamily: `${topic}|${lens}`,
        applicationFingerprint: `${variant}-${testId}-rw-${index + 1}`
      }
    };
  });
}

function makeMock(testId, variant, seed) {
  return {
    testId,
    version: '3.0.0',
    title: variant === 'psat-nmsqt' ? 'PSAT Mock 3' : 'SAT Mock 3',
    assessmentFamily: variant === 'psat-nmsqt' ? 'psat' : 'sat',
    assessmentVariant: variant,
    assessmentNumber: 3,
    readingWriting: makeReadingWriting(testId, variant),
    math: buildMathBank({ testId, variant, assessmentNumber: 3, seed })
  };
}

const figurePair = validateMockFigureQuality(
  makeMock('psat-mock-03', 'psat-nmsqt', 4),
  makeMock('sat-mock-03', 'sat', 5)
);
export const PSAT_MOCK_03_CONTENT = figurePair.psat;
export const SAT_MOCK_03_CONTENT = figurePair.sat;
validateMockContent(PSAT_MOCK_03_CONTENT);
validateMockContent(SAT_MOCK_03_CONTENT);
validateMockSeries(PSAT_MOCK_03_CONTENT, SAT_MOCK_03_CONTENT);
export default { PSAT_MOCK_03_CONTENT, SAT_MOCK_03_CONTENT };
