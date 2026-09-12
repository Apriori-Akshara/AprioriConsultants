import { buildReadingWriting } from './surgicalMockContent';
import { buildMathBank } from './mathBankFactoryV2';
import { validateMockContent, validateMockSeries } from './mockContentQualityGate';
import { validateMockFigureQuality } from './figureQualityGate';

const CONTEXTS = ['urban tree-canopy surveys','coastal erosion monitoring','library program evaluations','solar-panel efficiency trials','wetland restoration studies','public transit reliability audits','crop irrigation experiments','historic building surveys','lake temperature monitoring','bird-migration observations','school attendance studies','community recycling trials','bridge vibration measurements','local heat-island mapping','soil moisture experiments','museum visitor studies','freshwater habitat surveys','bicycle traffic counts'];
const LENSES = ['seasonal comparisons','matched-site analysis','repeated measurements','before-and-after observations','controlled comparisons','regional sampling'];

function buildMock({ testId, variant, assessmentNumber, seed }) {
  const readingWriting = buildReadingWriting({ testId, variant, assessmentNumber, version: 8, contextPrefix: 'For the original Apriori study on', contexts: CONTEXTS.map((topic) => ({ topic, lenses: LENSES })) }).map((question) => ({
    ...question,
    metadata: { ...question.metadata, contextKey: `${testId}:${question.metadata?.contextKey || question.questionId}`, contextFamily: `mock-${assessmentNumber}-rw`, applicationFingerprint: `${testId}:rw:${question.questionId}` },
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
