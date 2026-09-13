/**
 * Batch M — SAT Series A Mock 2 production gate.
 *
 * Mock 2 is accepted only after Mock 1 has already passed the production gate.
 * It is never allowed to replace the legacy public corpus during production.
 */

import { buildProductionMock } from './verbalConstruction';
import { buildMathBank } from './mathBankFactoryV2';
import { prepareStage2Mock } from './stage2PostProcess';
import { validateMockContent } from './mockContentQualityGate';
import { validateMockFigureQuality } from './figureQualityGate';
import { validateFigureOriginalitySeries, getFigureDataFingerprint } from './figureOriginalityQC';
import { varyVerbalConstruction } from './verbalVariationLayer';
import { validateSatQuestion } from '../questionSchema';
import {
  getBatchMProductionTarget,
  assertBatchMProductionOrder,
} from './batchMProductionController';
import { SAT_SERIES_A_MOCK_01_PRODUCTION } from './batchMProductionStore';

const TARGET = getBatchMProductionTarget('SAT2');

function standardizeProductionIdentity(mock) {
  const sourceId = String(mock.testId || '');
  const productionId = TARGET.testId;

  const rewrite = (question) => {
    const currentId = String(question.questionId || question.contentId || '');
    const questionId = currentId.startsWith(sourceId)
      ? `${productionId}${currentId.slice(sourceId.length)}`
      : currentId;

    return {
      ...question,
      testId: productionId,
      questionId,
      contentId: questionId,
      originalityFingerprint: String(question.originalityFingerprint || '').replaceAll(sourceId, productionId),
    };
  };

  return {
    ...mock,
    testId: productionId,
    readingWriting: (mock.readingWriting || []).map(rewrite),
    math: (mock.math || []).map(rewrite),
  };
}

function assertCrossMockUniqueness(previousMock, nextMock) {
  const previousRWContexts = new Set(
    (previousMock.readingWriting || [])
      .map((question) => String(question.metadata?.contextKey || '').trim().toLowerCase())
      .filter(Boolean)
  );
  const previousRWPrompts = new Set(
    (previousMock.readingWriting || [])
      .map((question) => String(question.prompt || '').trim().toLowerCase().replace(/\s+/g, ' '))
      .filter(Boolean)
  );
  const previousApplications = new Set(
    (previousMock.math || [])
      .map((question) => String(question.metadata?.applicationFingerprint || '').trim().toLowerCase())
      .filter(Boolean)
  );

  for (const question of nextMock.readingWriting || []) {
    const context = String(question.metadata?.contextKey || '').trim().toLowerCase();
    const prompt = String(question.prompt || '').trim().toLowerCase().replace(/\s+/g, ' ');
    if (context && previousRWContexts.has(context)) {
      throw new Error(`Batch M SAT2: R&W context reused from SAT Series A Mock 1: ${question.questionId}`);
    }
    if (prompt && previousRWPrompts.has(prompt)) {
      throw new Error(`Batch M SAT2: R&W prompt reused from SAT Series A Mock 1: ${question.questionId}`);
    }
  }

  for (const question of nextMock.math || []) {
    const application = String(question.metadata?.applicationFingerprint || '').trim().toLowerCase();
    if (application && previousApplications.has(application)) {
      throw new Error(`Batch M SAT2: Math application reused from SAT Series A Mock 1: ${question.questionId}`);
    }
  }

  validateFigureOriginalitySeries([previousMock, nextMock]);

  const previousFigureData = new Set(
    (previousMock.math || [])
      .map(getFigureDataFingerprint)
      .filter(Boolean)
  );
  for (const question of nextMock.math || []) {
    const fingerprint = getFigureDataFingerprint(question);
    if (fingerprint && previousFigureData.has(fingerprint)) {
      throw new Error(`Batch M SAT2: figure data reused from SAT Series A Mock 1: ${question.questionId}`);
    }
  }
}

function assertCanonicalRoundTrip(mock) {
  const records = [...(mock.readingWriting || []), ...(mock.math || [])];
  if (records.length !== 196) {
    throw new Error(`Batch M SAT2: expected 196 records, found ${records.length}`);
  }

  for (const record of records) {
    const result = validateSatQuestion(record);
    if (!result.valid) {
      throw new Error(`Batch M SAT2: canonical schema rejected ${record.questionId}: ${result.errors.join(' ')}`);
    }
  }

  const restored = JSON.parse(JSON.stringify(records));
  if (JSON.stringify(records.map((record) => record.questionId)) !== JSON.stringify(restored.map((record) => record.questionId))) {
    throw new Error('Batch M SAT2: storage round-trip changed question IDs');
  }

  return restored;
}

export function runBatchMSecondProductionGate() {
  if (!TARGET) throw new Error('Batch M SAT2: production target is missing');
  assertBatchMProductionOrder(['SAT1']);

  const stage1 = buildProductionMock({
    testId: 'sat-mock-02',
    variant: 'sat-series-a',
    seed: 1002,
  });

  const withMath = {
    ...stage1,
    math: buildMathBank({
      testId: 'sat-mock-02',
      variant: 'sat-series-a',
      assessmentNumber: 2,
      seed: 1002,
    }),
  };
  withMath.questionCount = withMath.readingWriting.length + withMath.math.length;
  withMath.bankQuestionCount = 196;

  const stage2 = prepareStage2Mock(withMath);
  const figured = validateMockFigureQuality(stage2, stage2);
  const finalMock = varyVerbalConstruction(figured.sat);

  validateMockContent(finalMock);
  const productionMock = standardizeProductionIdentity(finalMock);
  assertCrossMockUniqueness(SAT_SERIES_A_MOCK_01_PRODUCTION, productionMock);
  const restoredRecords = assertCanonicalRoundTrip(productionMock);

  return {
    passed: true,
    testKey: TARGET.testKey,
    testId: productionMock.testId,
    assessment: productionMock.assessmentVariant,
    questionCount: productionMock.readingWriting.length + productionMock.math.length,
    status: 'generated-and-qc-passed-accepted',
    productionMock: {
      ...productionMock,
      storageRecords: restoredRecords,
    },
  };
}

export default runBatchMSecondProductionGate;
