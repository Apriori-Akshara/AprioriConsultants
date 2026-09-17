import { runBatchMCrossCorpusCalibration } from '../src/data/sat/mockContent/batchMCrossCorpusCalibration';

try {
  const result = runBatchMCrossCorpusCalibration();
  console.log(JSON.stringify(result, null, 2));
  if (!result.passed) {
    console.error('Batch M 30-mock cross-corpus calibration FAILED.');
    process.exitCode = 1;
  } else {
    console.log('Batch M 30-mock cross-corpus calibration PASSED.');
  }
} catch (error) {
  console.error('Batch M 30-mock cross-corpus calibration FAILED.');
  console.error(error?.stack || error?.message || error);
  process.exitCode = 1;
}
