/**
 * Batch L — controlled end-to-end generation/QC/storage/adapter gate.
 *
 * This is deliberately a small deterministic integration test, not a
 * production-generation job. It exercises the current pipeline with one
 * controlled SAT/PSAT pair and verifies that generated records survive the
 * canonical storage representation and schema adapter without changing the
 * live question corpus.
 */

import { buildProductionMock } from './verbalConstruction';
import { buildMathBank } from './mathBankFactoryV2';
import { prepareStage2Mock } from './stage2PostProcess';
import { validateMockContent, validateMockSeries } from './mockContentQualityGate';
import { validateMockFigureQuality } from './figureQualityGate';
import { varyVerbalConstruction } from './verbalVariationLayer';
import { validateSatQuestion } from '../questionSchema';

function buildStage1Mock({ testId, variant, seed, assessmentNumber }) {
  const verbal = buildProductionMock({ testId, variant, seed });
  const math = buildMathBank({ testId, variant, assessmentNumber, seed });
  return {
    ...verbal,
    math,
    questionCount: verbal.readingWriting.length + math.length,
    bankQuestionCount: 196,
  };
}

function assertQuestionSchema(mock, label) {
  const records = [...(mock.readingWriting || []), ...(mock.math || [])];
  if (records.length !== 196) {
    throw new Error(`Batch L ${label}: expected 196 generated records, found ${records.length}`);
  }

  for (const record of records) {
    const result = validateSatQuestion(record);
    if (!result.valid) {
      throw new Error(
        `Batch L ${label}: canonical question adapter rejected ${record.questionId}: ${result.errors.join(' ')}`
      );
    }
  }

  return records;
}

function roundTripStorage(records, label) {
  const stored = JSON.stringify(records);
  const restored = JSON.parse(stored);

  if (!Array.isArray(restored) || restored.length !== records.length) {
    throw new Error(`Batch L ${label}: canonical storage round-trip changed record count`);
  }

  const originalIds = records.map((record) => record.questionId);
  const restoredIds = restored.map((record) => record.questionId);
  if (JSON.stringify(originalIds) !== JSON.stringify(restoredIds)) {
    throw new Error(`Batch L ${label}: canonical storage round-trip changed question IDs`);
  }

  for (const record of restored) {
    const result = validateSatQuestion(record);
    if (!result.valid) {
      throw new Error(
        `Batch L ${label}: restored canonical record rejected ${record.questionId}: ${result.errors.join(' ')}`
      );
    }
  }

  return restored;
}

function runControlledMock({ testId, variant, seed, assessmentNumber, label }) {
  // Stage 1: blueprint/construction output.
  const stage1 = buildStage1Mock({ testId, variant, seed, assessmentNumber });

  // Stage 2: deterministic draft/post-processing layer already used by the
  // current production assembly path.
  const stage2 = prepareStage2Mock(stage1);

  // Figure validation + independent Math mathematical QC.
  // The caller supplies both assessment variants so the shared figure gate is
  // exercised exactly as it is in the production assembly path.
  return { stage2, label };
}

export function runBatchLIntegrationGate() {
  const psat = runControlledMock({
    testId: 'batch-l-psat-control',
    variant: 'psat-nmsqt',
    seed: 137,
    assessmentNumber: 1,
    label: 'PSAT',
  }).stage2;
  const sat = runControlledMock({
    testId: 'batch-l-sat-control',
    variant: 'sat-series-a',
    seed: 241,
    assessmentNumber: 1,
    label: 'SAT',
  }).stage2;

  const figured = validateMockFigureQuality(psat, sat);
  const finalPsat = varyVerbalConstruction(figured.psat);
  const finalSat = varyVerbalConstruction(figured.sat);

  // Stage 3 independent R&W QC is executed by varyVerbalConstruction; the
  // function throws if any R&W item fails the live-delivery gate.
  const psatRecords = assertQuestionSchema(finalPsat, 'PSAT');
  const satRecords = assertQuestionSchema(finalSat, 'SAT');

  // Full mock-level QC and cross-mock uniqueness are the final content gates.
  validateMockContent(finalPsat);
  validateMockContent(finalSat);
  validateMockSeries(finalPsat, finalSat);

  // Canonical storage adapter simulation: serialize, restore, and validate.
  roundTripStorage(psatRecords, 'PSAT');
  roundTripStorage(satRecords, 'SAT');

  return {
    passed: true,
    mocks: 2,
    records: psatRecords.length + satRecords.length,
    stages: ['Stage 1 Blueprint', 'Stage 2 Draft', 'Stage 3 Independent QC', 'Canonical Storage', 'SAT Adapter'],
  };
}

export default runBatchLIntegrationGate;
