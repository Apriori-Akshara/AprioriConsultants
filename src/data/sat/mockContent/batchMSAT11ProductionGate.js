import { buildProductionMock } from './verbalConstruction';
import { buildMathBank } from './mathBankFactoryV2';
import { prepareStage2Mock } from './stage2PostProcess';
import { validateMockContent } from './mockContentQualityGate';
import { validateMockFigureQuality } from './figureQualityGate';
import { validateFigureOriginalitySeries, getFigureDataFingerprint } from './figureOriginalityQC';
import { varyVerbalConstruction } from './verbalVariationLayer';
import { validateSatQuestion } from '../questionSchema';
import { getBatchMProductionTarget, assertBatchMProductionOrder } from './batchMProductionController';

const TARGET = getBatchMProductionTarget('SAT11');
const PRIOR_KEYS = ['SAT1','SAT2','SAT3','SAT4','SAT5','SAT6','SAT7','SAT8','SAT9','SAT10','PSAT1','PSAT2','PSAT3','PSAT4','PSAT5','PSAT6','PSAT7','PSAT8','PSAT9','PSAT10'];
const PRIOR_IDS = ['sat-series-a-mock-01','sat-series-a-mock-02','sat-series-a-mock-03','sat-series-a-mock-04','sat-series-a-mock-05','sat-series-a-mock-06','sat-series-a-mock-07','sat-series-a-mock-08','sat-series-a-mock-09','sat-series-a-mock-10','psat-mock-01','psat-mock-02','psat-mock-03','psat-mock-04','psat-mock-05','psat-mock-06','psat-mock-07','psat-mock-08','psat-mock-09','psat-mock-10'];

function standardizeProductionIdentity(mock) {
  const sourceId = String(mock.testId || '');
  const productionId = TARGET.testId;
  const rewrite = (question) => {
    const currentId = String(question.questionId || question.contentId || '');
    const questionId = currentId.startsWith(sourceId) ? `${productionId}${currentId.slice(sourceId.length)}` : currentId;
    return { ...question, testId: productionId, questionId, contentId: questionId, originalityFingerprint: String(question.originalityFingerprint || '').replaceAll(sourceId, productionId) };
  };
  return { ...mock, testId: productionId, readingWriting: (mock.readingWriting || []).map(rewrite), math: (mock.math || []).map(rewrite) };
}

function assertCrossMockUniqueness(previousMocks, nextMock) {
  const previousRWContexts = new Set();
  const previousRWPrompts = new Set();
  const previousApplications = new Set();
  const previousFigureData = new Set();
  for (const previousMock of previousMocks) {
    for (const question of previousMock.readingWriting || []) {
      const context = String(question.metadata?.contextKey || '').trim().toLowerCase();
      const prompt = String(question.prompt || '').trim().toLowerCase().replace(/\s+/g, ' ');
      if (context) previousRWContexts.add(context);
      if (prompt) previousRWPrompts.add(prompt);
    }
    for (const question of previousMock.math || []) {
      const application = String(question.metadata?.applicationFingerprint || '').trim().toLowerCase();
      if (application) previousApplications.add(application);
      const figureData = getFigureDataFingerprint(question);
      if (figureData) previousFigureData.add(figureData);
    }
  }
  for (const question of nextMock.readingWriting || []) {
    const context = String(question.metadata?.contextKey || '').trim().toLowerCase();
    const prompt = String(question.prompt || '').trim().toLowerCase().replace(/\s+/g, ' ');
    if (context && previousRWContexts.has(context)) throw new Error(`Batch M SAT11: R&W context reused: ${question.questionId}`);
    if (prompt && previousRWPrompts.has(prompt)) throw new Error(`Batch M SAT11: R&W prompt reused: ${question.questionId}`);
  }
  for (const question of nextMock.math || []) {
    const application = String(question.metadata?.applicationFingerprint || '').trim().toLowerCase();
    if (application && previousApplications.has(application)) throw new Error(`Batch M SAT11: Math application reused: ${question.questionId}`);
    const figureData = getFigureDataFingerprint(question);
    if (figureData && previousFigureData.has(figureData)) throw new Error(`Batch M SAT11: figure data reused: ${question.questionId}`);
  }
  validateFigureOriginalitySeries([...previousMocks, nextMock]);
}

function assertCanonicalRoundTrip(mock) {
  const records = [...(mock.readingWriting || []), ...(mock.math || [])];
  if (records.length !== 196) throw new Error(`Batch M SAT11: expected 196 records, found ${records.length}`);
  for (const record of records) {
    const result = validateSatQuestion(record);
    if (!result.valid) throw new Error(`Batch M SAT11: canonical schema rejected ${record.questionId}: ${result.errors.join(' ')}`);
  }
  const restored = JSON.parse(JSON.stringify(records));
  if (JSON.stringify(records.map((record) => record.questionId)) !== JSON.stringify(restored.map((record) => record.questionId))) throw new Error('Batch M SAT11: storage round-trip changed question IDs');
  return restored;
}

export function runBatchMSAT11ProductionGate(previousMocks) {
  if (!TARGET) throw new Error('Batch M SAT11: production target is missing');
  assertBatchMProductionOrder(PRIOR_KEYS);
  if (!Array.isArray(previousMocks) || previousMocks.length !== 20) throw new Error('Batch M SAT11: accepted SAT Series A Mock 1 through Mock 10 and PSAT Mock 1 through Mock 10 baselines are required');
  if (previousMocks.some((mock, index) => mock?.testId !== PRIOR_IDS[index])) throw new Error('Batch M SAT11: accepted production baselines are out of order');

  const stage1 = buildProductionMock({ testId: 'sat-mock-11', variant: 'sat-series-b', seed: 1011 });
  const withMath = { ...stage1, math: buildMathBank({ testId: 'sat-mock-11', variant: 'sat-series-b', assessmentNumber: 11, seed: 1011 }) };
  withMath.questionCount = withMath.readingWriting.length + withMath.math.length;
  withMath.bankQuestionCount = 196;
  const stage2 = prepareStage2Mock(withMath);
  const figured = validateMockFigureQuality(stage2, stage2);
  const finalMock = varyVerbalConstruction(figured.sat);
  validateMockContent(finalMock);
  const productionMock = standardizeProductionIdentity(finalMock);
  assertCrossMockUniqueness(previousMocks, productionMock);
  const restoredRecords = assertCanonicalRoundTrip(productionMock);

  return { passed: true, testKey: TARGET.testKey, testId: productionMock.testId, assessment: productionMock.assessmentVariant, questionCount: productionMock.readingWriting.length + productionMock.math.length, status: 'generated-and-qc-passed-accepted', productionMock: { ...productionMock, storageRecords: restoredRecords } };
}

export default runBatchMSAT11ProductionGate;
