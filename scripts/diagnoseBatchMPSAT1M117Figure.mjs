import { BATCH_M_TARGETED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMTargetedProductionCorpus.js';
import { applyBatchMControlledReplacements } from '../src/data/sat/mockContent/batchMControlledReplacementMapAdapter.js';
import { canonicalBatchMTestKey } from '../src/data/sat/mockContent/batchMCanonicalTestKey.js';

const corpus = applyBatchMControlledReplacements(BATCH_M_TARGETED_PRODUCTION_CORPUS);
const targetQuestionId = 'psat-mock-01-math-math-module-1-m1-17';
const satCounterpartId = 'sat-mock-01-math-math-module-1-m1-17';

for (const mock of corpus) {
  for (const question of [...(mock.readingWriting || []), ...(mock.math || [])]) {
    if (question.questionId === targetQuestionId || question.questionId === satCounterpartId) {
      console.log(`FIGURE-DIAGNOSTIC ${canonicalBatchMTestKey(mock)} ${question.questionId}`);
      console.log(JSON.stringify({
        prompt: question.prompt,
        choices: question.choices,
        answer: question.answer,
        skill: question.skill,
        subskill: question.subskill,
        figure: question.figure,
        metadata: question.metadata,
      }, null, 2));
    }
  }
}