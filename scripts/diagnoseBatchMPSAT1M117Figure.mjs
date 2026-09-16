import fs from 'node:fs';
import { BATCH_M_TARGETED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMTargetedProductionCorpus.js';
import { applyBatchMControlledReplacements } from '../src/data/sat/mockContent/batchMControlledReplacementMapAdapter.js';
import { canonicalBatchMTestKey } from '../src/data/sat/mockContent/batchMCanonicalTestKey.js';

const corpus = applyBatchMControlledReplacements(BATCH_M_TARGETED_PRODUCTION_CORPUS);
const targetQuestionId = 'psat-mock-01-math-math-module-1-m1-17';
const satCounterpartId = 'sat-mock-01-math-math-module-1-m1-17';
const matches = [];
for (const mock of corpus) {
  for (const question of [...(mock.readingWriting || []), ...(mock.math || [])]) {
    if (question.questionId === targetQuestionId || question.questionId === satCounterpartId) {
      matches.push({
        testKey: canonicalBatchMTestKey(mock),
        questionId: question.questionId,
        prompt: question.prompt,
        choices: question.choices,
        answer: question.answer,
        skill: question.skill,
        subskill: question.subskill,
        figure: question.figure,
        metadata: question.metadata,
      });
    }
  }
}
fs.writeFileSync('docs/BATCH-M-PSAT1-M117-FIGURE-DIAGNOSTIC-2026-09-16.json', `${JSON.stringify(matches, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(matches, null, 2));