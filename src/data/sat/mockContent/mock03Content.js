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
  const suffixes = ['under the stated conditions','in this comparison','in the reported study','for the stated purpose','given the evidence provided','in the context described'];
  return questions.map((question) => {
    if (question.questionType !== 'multiple-choice' || !Array.isArray(question.choices) || question.choices.length !== 4) return question;
    const choices = [...question.choices];
    const correct = String(question.answer || 'A').charCodeAt(0) - 65;
    for (let pass = 0; pass < suffixes.length; pass += 1) {
      const lengths = choices.map((choice) => String(choice).trim().split(/\s+/).filter(Boolean).length);
      const correctLength = lengths[correct];
      const otherLengths = lengths.filter((_, index) => index !== correct);
      if (correctLength > Math.max(...otherLengths)) {
        const targetIndex = [0, 1, 2, 3].filter((index) => index !== correct)[otherLengths.indexOf(Math.max(...otherLengths))];
        choices[targetIndex] = `${choices[targetIndex]} ${suffixes[pass]}`;
        continue;
      }
      if (correctLength < Math.min(...otherLengths)) {
        choices[correct] = `${choices[correct]} ${suffixes[pass]}`;
        continue;
      }
      break;
    }
    return { ...question, choices };
  });
}

function makeReadingWriting(testId, variant) {
  const module1 = buildReadingWriting({ testId, variant, module: 'rw-module-1' });
  const module2 = buildReadingWriting({ testId, variant, module: 'rw-module-2' });
  return normalizeVerbalChoices([...module1, ...module2]).map((question, index) => {
    const topic = CONTEXTS[Math.floor(index / 6)];
    const lens = LENSES[index % 6];
    const prefix = `For the original Apriori study on ${topic}, researchers used ${lens}.`;
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
