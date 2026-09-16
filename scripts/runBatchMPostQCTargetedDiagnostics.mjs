import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BATCH_M_TARGETED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMTargetedProductionCorpus.js';
import { applyBatchMControlledReplacements } from '../src/data/sat/mockContent/batchMControlledReplacementMapAdapter.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { canonicalBatchMTestKey, BATCH_M_TARGET_TEST_KEYS } from '../src/data/sat/mockContent/batchMCanonicalTestKey.js';
import { getFigureDataFingerprint } from '../src/data/sat/mockContent/figureOriginalityQC.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(root, 'docs/BATCH-M-POST-QC-TARGETED-DIAGNOSTICS-2026-09-16.json');
const corpus = applyBatchMControlledReplacements(BATCH_M_TARGETED_PRODUCTION_CORPUS);
const recordsOf = (mock) => [...(mock?.readingWriting || []), ...(mock?.math || [])];
const idOf = (question) => String(question?.questionId || question?.contentId || '');
const wordCount = (value) => String(value || '').trim().split(/\s+/).filter(Boolean).length;
const hardDemandFeatures = new Set(['multi-step', 'strategic-choice', 'constraint-inference', 'representation-shift', 'evidence-synthesis', 'parameter-reasoning']);

const difficultyFailures = [];
const stimulusFailures = [];
const figureFingerprints = new Map();

for (const mock of corpus) {
  const testKey = canonicalBatchMTestKey(mock);
  if (!BATCH_M_TARGET_TEST_KEYS.has(testKey)) continue;
  for (const question of recordsOf(mock)) {
    const questionId = idOf(question);
    const quality = evaluateContentQuality(question);
    if (quality.checks.includes('hard-label-without-demand-feature')) {
      difficultyFailures.push({
        testKey,
        questionId,
        section: question.section,
        skill: question.skill,
        domain: question.domain,
        difficulty: question.difficulty,
        difficultyFeatures: question.metadata?.difficultyFeatures || [],
        proposedDifficulty: 'medium',
      });
    }
    if (quality.checks.includes('rw-stimulus-length')) {
      stimulusFailures.push({
        testKey,
        questionId,
        skill: question.skill,
        wordCount: wordCount(question.prompt),
        prompt: question.prompt,
      });
    }
    const fingerprint = question.section === 'math' ? getFigureDataFingerprint(question) : '';
    if (fingerprint) {
      const prior = figureFingerprints.get(fingerprint);
      if (prior) {
        if ((testKey === 'PSAT1' && questionId === 'psat-mock-01-math-math-module-1-m1-14') || (prior.testKey === 'PSAT1' && prior.questionId === 'psat-mock-01-math-math-module-1-m1-14')) {
          console.log(JSON.stringify({ duplicateFigure: { current: { testKey, questionId, figure: question.figure, fingerprint }, prior }, }, null, 2));
        }
      } else {
        figureFingerprints.set(fingerprint, { testKey, questionId, figure: question.figure });
      }
    }
  }
}

const report = {
  reportType: 'batch-m-post-qc-targeted-diagnostics',
  reportVersion: '2026-09-16.post-qc-targeted-diagnostics.v1',
  scope: 'SAT1-SAT10 and PSAT1-PSAT10 only',
  productionMutation: false,
  releaseEligible: false,
  sat21Created: false,
  difficultyCalibrationFailures: difficultyFailures,
  rwStimulusLengthFailures: stimulusFailures,
  summary: {
    difficultyCalibrationCount: difficultyFailures.length,
    rwStimulusLengthCount: stimulusFailures.length,
    uniqueFigureFingerprints: figureFingerprints.size,
  },
};

fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report.summary, null, 2));
