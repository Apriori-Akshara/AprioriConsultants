import { buildReadingWriting } from './surgicalMockContent';
import { buildMathBank } from './mathBankFactoryV2';
import { validateMockContent, validateMockSeries } from './mockContentQualityGate';
import { validateMockFigureQuality } from './figureQualityGate';

const CONTEXTS = ['river restoration surveys','community health mapping','historic archive indexing','solar-heating experiments','urban noise measurements','school garden trials','coastal habitat surveys','public library usage studies','road-safety observations','crop yield comparisons','lake algae monitoring','energy-use audits','wildlife acoustic surveys','museum lighting trials','rainfall pattern studies','pedestrian flow measurements','soil nutrient sampling','local air-quality comparisons'];
const LENSES = ['seasonal comparisons','matched-site analysis','repeated measurements','before-and-after observations','controlled comparisons','regional sampling'];

function buildMock({ testId, variant, assessmentNumber, seed }) {
  const readingWriting = buildReadingWriting({ testId, variant, assessmentNumber, version: 9, contextPrefix: 'For the original Apriori study on', contexts: CONTEXTS.map((topic) => ({ topic, lenses: LENSES })) }).map((question) => ({
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

export const PSAT_MOCK_07_CONTENT = buildMock({ testId: 'psat-mock-07', variant: 'psat-nmsqt', assessmentNumber: 7, seed: 12 });
export const SAT_MOCK_07_CONTENT = buildMock({ testId: 'sat-mock-07', variant: 'sat', assessmentNumber: 7, seed: 13 });
validateMockFigureQuality(PSAT_MOCK_07_CONTENT, SAT_MOCK_07_CONTENT);
validateMockSeries(PSAT_MOCK_07_CONTENT, SAT_MOCK_07_CONTENT);
