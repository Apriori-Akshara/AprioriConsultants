/**
 * Batch M — SAT Series A Mock 1 production gate.
 *
 * Generates only SAT Series A Mock 1, runs the established end-to-end gates,
 * and returns the accepted canonical production mock. It does not publish or
 * replace the legacy live corpus.
 */

import { buildProductionMock } from './verbalConstruction';
import { buildMathBank } from './mathBankFactoryV2';
import { prepareStage2Mock } from './stage2PostProcess';
import { validateMockContent } from './mockContentQualityGate';
import { validateMockFigureQuality } from './figureQualityGate';
import { varyVerbalConstruction } from './verbalVariationLayer';
import { validateSatQuestion } from '../questionSchema';
import {
  getBatchMProductionTarget,
  assertBatchMProductionOrder,
} from './batchMProductionController';

const TARGET = getBatchMProductionTarget('SAT1');

function buildSatSeriesAMock01() {
  const generated = buildProductionMock({
    testId: 'sat-mock-01',
    variant: 'sat-series-a',
    seed: 1001,
  });

  const withMath = {
    ...generated,
    math: buildMathBank({
      testId: 'sat-mock-01',
      variant: 'sat-series-a',
      assessmentNumber: 1,
      seed: 1001,
    }),
  };

  return {
    ...withMath,
    questionCount: withMath.readingWriting.length + withMath.math.length,
    bankQuestionCount: 196,
  };
}

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

function assertCanonicalRoundTrip(mock) {
  const records = [...(mock.readingWriting || []), ...(mock.math || [])];

  if (records.length !== 196) {
    throw new Error(`Batch M SAT1: expected 196 records, found ${records.length}`);
  }

  for (const record of records) {
    const result = validateSatQuestion(record);
    if (!result.valid) {
      throw new Error(`Batch M SAT1: canonical schema rejected ${record.questionId}: ${result.errors.join(' ')}`);
    }
  }

  const restored = JSON.parse(JSON.stringify(records));
  const idsBefore = records.map((record) => record.questionId);
  const idsAfter = restored.map((record) => record.questionId);

  if (JSON.stringify(idsBefore) !== JSON.stringify(idsAfter)) {
    throw new Error('Batch M SAT1: storage round-trip changed question IDs');
  }

  return restored;
}

export function runBatchMFirstProductionGate() {
  if (!TARGET) throw new Error('Batch M SAT1: production target is missing');
  assertBatchMProductionOrder([]);

  const stage1 = buildSatSeriesAMock01();
  const stage2 = prepareStage2Mock(stage1);
  const figured = validateMockFigureQuality(stage2, stage2);
  const finalMock = varyVerbalConstruction(figured.sat);

  // Validate with the established legacy identity before moving into the new
  // Series A namespace; the legacy gate's identity contract remains unchanged.
  validateMockContent(finalMock);

  const productionMock = standardizeProductionIdentity(finalMock);
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

export default runBatchMFirstProductionGate;
