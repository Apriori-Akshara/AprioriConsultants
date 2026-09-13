/**
 * Batch M — canonical runtime store for accepted production mocks.
 *
 * This store is intentionally separate from the legacy public corpus. A mock
 * is exposed here only after the production gate has generated it and all
 * established QC plus canonical serialization checks have passed.
 */

import { runBatchMFirstProductionGate } from './batchMFirstProductionGate';

const FIRST_PRODUCTION_RESULT = runBatchMFirstProductionGate();

if (!FIRST_PRODUCTION_RESULT?.passed || !FIRST_PRODUCTION_RESULT?.productionMock) {
  throw new Error('Batch M SAT1: accepted production mock was not returned by the production gate');
}

export const SAT_SERIES_A_MOCK_01_PRODUCTION = FIRST_PRODUCTION_RESULT.productionMock;

export const BATCH_M_ACCEPTED_PRODUCTION_CHECKPOINT = Object.freeze({
  testKey: FIRST_PRODUCTION_RESULT.testKey,
  testId: FIRST_PRODUCTION_RESULT.testId,
  questionCount: FIRST_PRODUCTION_RESULT.questionCount,
  status: FIRST_PRODUCTION_RESULT.status,
  storageMode: 'canonical-runtime-records',
});

export default SAT_SERIES_A_MOCK_01_PRODUCTION;
