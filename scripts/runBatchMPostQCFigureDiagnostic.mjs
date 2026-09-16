import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BATCH_M_TARGETED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMTargetedProductionCorpus.js';
import { applyBatchMControlledReplacements } from '../src/data/sat/mockContent/batchMControlledReplacementMapAdapter.js';
import { canonicalBatchMTestKey } from '../src/data/sat/mockContent/batchMCanonicalTestKey.js';
import { getFigureDataFingerprint } from '../src/data/sat/mockContent/figureOriginalityQC.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(root, 'docs/BATCH-M-POST-QC-FIGURE-DIAGNOSTIC-2026-09-16.json');
const corpus = applyBatchMControlledReplacements(BATCH_M_TARGETED_PRODUCTION_CORPUS);
const targets = new Map();
for (const mock of corpus) {
  const testKey = canonicalBatchMTestKey(mock);
  for (const question of [...(mock?.math || [])]) {
    if (testKey === 'SAT1' && question.questionId === 'sat-series-a-mock-01-math-math-module-1-m1-14') targets.set('SAT1', question);
    if (testKey === 'PSAT1' && question.questionId === 'psat-mock-01-math-math-module-1-m1-14') targets.set('PSAT1', question);
  }
}
const report = {
  reportType: 'batch-m-post-qc-figure-diagnostic',
  scope: 'SAT1/PSAT1 duplicate pair only',
  productionMutation: false,
  releaseEligible: false,
  sat21Created: false,
  targets: Object.fromEntries([...targets.entries()].map(([key, question]) => [key, {
    questionId: question.questionId,
    domain: question.domain,
    skill: question.skill,
    questionType: question.questionType,
    prompt: question.prompt,
    answer: question.answer,
    choices: question.choices,
    figure: question.figure,
    fingerprint: getFigureDataFingerprint(question),
  }])),
};
fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
