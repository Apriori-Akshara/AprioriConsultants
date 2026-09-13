/**
 * Batch M — canonical runtime store for accepted production mocks.
 *
 * This store is intentionally separate from the legacy public corpus. A mock
 * is exposed here only after the production gate has generated it and all
 * established QC plus canonical serialization checks have passed.
 */

import { runBatchMFirstProductionGate } from './batchMFirstProductionGate';
import { runBatchMSecondProductionGate } from './batchMSecondProductionGate';
import { runBatchMThirdProductionGate } from './batchMThirdProductionGate';

const FIRST_PRODUCTION_RESULT = runBatchMFirstProductionGate();

if (!FIRST_PRODUCTION_RESULT?.passed || !FIRST_PRODUCTION_RESULT?.productionMock) {
  throw new Error('Batch M SAT1: accepted production mock was not returned by the production gate');
}

export const SAT_SERIES_A_MOCK_01_PRODUCTION = FIRST_PRODUCTION_RESULT.productionMock;

const SECOND_PRODUCTION_RESULT = runBatchMSecondProductionGate(SAT_SERIES_A_MOCK_01_PRODUCTION);

if (!SECOND_PRODUCTION_RESULT?.passed || !SECOND_PRODUCTION_RESULT?.productionMock) {
  throw new Error('Batch M SAT2: accepted production mock was not returned by the production gate');
}

export const SAT_SERIES_A_MOCK_02_PRODUCTION = SECOND_PRODUCTION_RESULT.productionMock;

const THIRD_PRODUCTION_RESULT = runBatchMThirdProductionGate([
  SAT_SERIES_A_MOCK_01_PRODUCTION,
  SAT_SERIES_A_MOCK_02_PRODUCTION,
]);

if (!THIRD_PRODUCTION_RESULT?.passed || !THIRD_PRODUCTION_RESULT?.productionMock) {
  throw new Error('Batch M SAT3: accepted production mock was not returned by the production gate');
}

export const SAT_SERIES_A_MOCK_03_PRODUCTION = THIRD_PRODUCTION_RESULT.productionMock;

export const BATCH_M_ACCEPTED_PRODUCTION_CHECKPOINT = Object.freeze({
  acceptedTestKeys: [
    FIRST_PRODUCTION_RESULT.testKey,
    SECOND_PRODUCTION_RESULT.testKey,
    THIRD_PRODUCTION_RESULT.testKey,
  ],
  acceptedTestIds: [
    FIRST_PRODUCTION_RESULT.testId,
    SECOND_PRODUCTION_RESULT.testId,
    THIRD_PRODUCTION_RESULT.testId,
  ],
  questionCounts: [
    FIRST_PRODUCTION_RESULT.questionCount,
    SECOND_PRODUCTION_RESULT.questionCount,
    THIRD_PRODUCTION_RESULT.questionCount,
  ],
  status: THIRD_PRODUCTION_RESULT.status,
  storageMode: 'canonical-runtime-records',
  nextTestKey: 'SAT4',
});

export default SAT_SERIES_A_MOCK_03_PRODUCTION;
