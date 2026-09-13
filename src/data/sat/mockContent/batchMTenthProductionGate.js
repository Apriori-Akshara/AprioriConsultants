import { buildProductionMock } from './verbalConstruction';
import { buildMathBank } from './mathBankFactoryV2';
import { prepareStage2Mock } from './stage2PostProcess';
import { validateMockContent } from './mockContentQualityGate';
import { validateMockFigureQuality } from './figureQualityGate';
import { validateFigureOriginalitySeries, getFigureDataFingerprint } from './figureOriginalityQC';
import { varyVerbalConstruction } from './verbalVariationLayer';
import { validateSatQuestion } from '../questionSchema';
import { getBatchMProductionTarget, assertBatchMProductionOrder } from './batchMProductionController';

const TARGET = getBatchMProductionTarget('SAT10');
function standardizeProductionIdentity(mock) {
  const sourceId = String(mock.testId || ''); const productionId = TARGET.testId;
  const rewrite = (question) => { const currentId = String(question.questionId || question.contentId || ''); const questionId = currentId.startsWith(sourceId) ? `${productionId}${currentId.slice(sourceId.length)}` : currentId; return { ...question, testId: productionId, questionId, contentId: questionId, originalityFingerprint: String(question.originalityFingerprint || '').replaceAll(sourceId, productionId) }; };
  return { ...mock, testId: productionId, readingWriting: (mock.readingWriting || []).map(rewrite), math: (mock.math || []).map(rewrite) };
}
function assertCrossMockUniqueness(previousMocks, nextMock) {
  const baselines = Array.isArray(previousMocks) ? previousMocks : []; const previousRWContexts = new Set(); const previousRWPrompts = new Set(); const previousApplications = new Set(); const previousFigureData = new Set();
  for (const previousMock of baselines) { for (const question of previousMock.readingWriting || []) { const context = String(question.metadata?.contextKey || '').trim().toLowerCase(); const prompt = String(question.prompt || '').trim().toLowerCase().replace(/\s+/g, ' '); if (context) previousRWContexts.add(context); if (prompt) previousRWPrompts.add(prompt); } for (const question of previousMock.math || []) { const application = String(question.metadata?.applicationFingerprint || '').trim().toLowerCase(); if (application) previousApplications.add(application); const figureData = getFigureDataFingerprint(question); if (figureData) previousFigureData.add(figureData); } }
  for (const question of nextMock.readingWriting || []) { const context = String(question.metadata?.contextKey || '').trim().toLowerCase(); const prompt = String(question.prompt || '').trim().toLowerCase().replace(/\s+/g, ' '); if (context && previousRWContexts.has(context)) throw new Error(`Batch M SAT10: R&W context reused: ${question.questionId}`); if (prompt && previousRWPrompts.has(prompt)) throw new Error(`Batch M SAT10: R&W prompt reused: ${question.questionId}`); }
  for (const question of nextMock.math || []) { const application = String(question.metadata?.applicationFingerprint || '').trim().toLowerCase(); if (application && previousApplications.has(application)) throw new Error(`Batch M SAT10: Math application reused: ${question.questionId}`); const figureData = getFigureDataFingerprint(question); if (figureData && previousFigureData.has(figureData)) throw new Error(`Batch M SAT10: figure data reused: ${question.questionId}`); }
  validateFigureOriginalitySeries([...baselines, nextMock]);
}
function assertCanonicalRoundTrip(mock) { const records = [...(mock.readingWriting || []), ...(mock.math || [])]; if (records.length !== 196) throw new Error(`Batch M SAT10: expected 196 records, found ${records.length}`); for (const record of records) { const result = validateSatQuestion(record); if (!result.valid) throw new Error(`Batch M SAT10: canonical schema rejected ${record.questionId}: ${result.errors.join(' ')}`); } const restored = JSON.parse(JSON.stringify(records)); if (JSON.stringify(records.map((record) => record.questionId)) !== JSON.stringify(restored.map((record) => record.questionId))) throw new Error('Batch M SAT10: storage round-trip changed question IDs'); return restored; }
export function runBatchMTenthProductionGate(previousMocks) {
  if (!TARGET) throw new Error('Batch M SAT10: production target is missing'); assertBatchMProductionOrder(['SAT1','SAT2','SAT3','SAT4','SAT5','SAT6','SAT7','SAT8','SAT9']); if (!Array.isArray(previousMocks) || previousMocks.length !== 9) throw new Error('Batch M SAT10: accepted Mock 1 through Mock 9 baselines are required');
  const expectedIds = ['sat-series-a-mock-01','sat-series-a-mock-02','sat-series-a-mock-03','sat-series-a-mock-04','sat-series-a-mock-05','sat-series-a-mock-06','sat-series-a-mock-07','sat-series-a-mock-08','sat-series-a-mock-09']; if (previousMocks.some((mock,index) => mock?.testId !== expectedIds[index])) throw new Error('Batch M SAT10: accepted Series A baselines are out of order');
  const stage1 = buildProductionMock({ testId: 'sat-mock-10', variant: 'sat-series-a', seed: 1010 }); const withMath = { ...stage1, math: buildMathBank({ testId: 'sat-mock-10', variant: 'sat-series-a', assessmentNumber: 10, seed: 1010 }) }; withMath.questionCount = withMath.readingWriting.length + withMath.math.length; withMath.bankQuestionCount = 196;
  const stage2 = prepareStage2Mock(withMath); const figured = validateMockFigureQuality(stage2, stage2); const finalMock = varyVerbalConstruction(figured.sat); validateMockContent(finalMock); const productionMock = standardizeProductionIdentity(finalMock); assertCrossMockUniqueness(previousMocks, productionMock); const restoredRecords = assertCanonicalRoundTrip(productionMock);
  return { passed: true, testKey: TARGET.testKey, testId: productionMock.testId, assessment: productionMock.assessmentVariant, questionCount: productionMock.readingWriting.length + productionMock.math.length, status: 'generated-and-qc-passed-accepted', productionMock: { ...productionMock, storageRecords: restoredRecords } };
}
export default runBatchMTenthProductionGate;
