import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore.js';
import { runBatchMFinalCorpusGate } from '../src/data/sat/mockContent/batchMFinalCorpusGate.js';
import { runBatchMCrossCorpusCalibrationCanonical } from '../src/data/sat/mockContent/batchMCrossCorpusCalibrationCanonical.js';

const corpus = BATCH_M_ACCEPTED_PRODUCTION_CORPUS;
if (!Array.isArray(corpus) || corpus.length !== 30) throw new Error(`Expected frozen 30-mock corpus, found ${corpus?.length}`);

let mutated = 0;
const targets = new Set();
for (const mock of corpus) {
  for (const q of [...(mock.readingWriting || []), ...(mock.math || [])]) {
    if (q?.metadata?.controlledReplacement?.authorization === 'explicit-user-authorization-2026-09-22') {
      mutated += 1;
      const key = `${mock.testKey || mock.testId}::${q.questionId}`;
      if (targets.has(key)) throw new Error(`Duplicate authorized replacement target: ${key}`);
      targets.add(key);
      if (q.metadata?.productionMutation !== true || q.metadata?.candidateOnly !== false) {
        throw new Error(`Invalid production flags for ${key}`);
      }
    }
  }
}
if (mutated !== 25) throw new Error(`Expected exactly 25 authorized production replacements, found ${mutated}`);

const gate = runBatchMFinalCorpusGate(corpus);
if (!gate?.passed) throw new Error(`Final 30-mock corpus gate failed after authorized replacement: ${JSON.stringify(gate)}`);
const calibration = runBatchMCrossCorpusCalibrationCanonical(corpus);
const failures = calibration?.calibration?.failures || [];
if (failures.length) throw new Error(`Cross-corpus calibration failures after authorized replacement: ${JSON.stringify(failures)}`);

console.log(JSON.stringify({
  status: 'AUTHORIZED_PRODUCTION_REPLACEMENT_POST_GATES_PASS',
  mockCount: corpus.length,
  replacementCount: mutated,
  final30MockCorpusGate: 'PASS',
  crossCorpusCalibration: 'PASS',
  releaseEligible: false,
  sat21Created: false
}, null, 2));
