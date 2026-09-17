import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore';
import { runBatchMFinalCorpusGate } from '../src/data/sat/mockContent/batchMFinalCorpusGate';

try {
  const result = runBatchMFinalCorpusGate(BATCH_M_ACCEPTED_PRODUCTION_CORPUS);

  console.log(JSON.stringify({
    passed: result.passed,
    status: result.status,
    mockCount: result.mockCount,
    totalRecords: result.totalRecords,
    global: result.global,
    releaseBoundary: result.releaseBoundary,
    perMock: result.summaries.map((summary) => ({
      testKey: summary.testKey,
      testId: summary.testId,
      recordCount: summary.recordCount,
      answerCounts: summary.answerCounts,
      difficultyCounts: summary.difficultyCounts,
      moduleCounts: summary.moduleCounts,
    })),
  }, null, 2));

  if (!result.passed) {
    console.error('Batch M final 30-mock corpus gate FAILED.');
    process.exitCode = 1;
  } else {
    console.log('Batch M final 30-mock corpus gate PASSED.');
  }
} catch (error) {
  console.error('Batch M final 30-mock corpus gate FAILED.');
  console.error(error?.stack || error?.message || error);
  process.exitCode = 1;
}
