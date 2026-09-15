/**
 * Batch M targeted replacement dry run.
 *
 * Candidate-only: never imports or mutates the frozen production store.
 * This runner validates that the remediation generators can produce
 * sufficiently large, diverse, QC-clean candidate pools before any
 * production replacement is considered.
 */

import { generateRemediatedRWCandidates } from '../src/data/sat/mockContent/verbalConstructionRemediated.js';
import { generateRemediatedMathCandidates } from '../src/data/sat/mockContent/mathBankFactoryRemediated.js';
import { evaluateContentQualityBatch } from '../src/data/sat/mockContent/batchMContentQualityGate.js';

const REQUIREMENTS = {
  sat: { rw: { 'relationship-first cross-text': 108, 'notes -> communication goal -> synthesis': 108, 'contextual lexical inference': 108, 'reasoning-demand-driven R&W construction': 42 }, math: { strategic: 168, figure: 103 } },
  psat: { rw: { 'relationship-first cross-text': 108, 'notes -> communication goal -> synthesis': 108, 'contextual lexical inference': 108, 'reasoning-demand-driven R&W construction': 42 }, math: { strategic: 173, figure: 88 } }
};

function normalize(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function rwBucket(question) {
  if (question.skill === 'Cross-Text Connections') return 'relationship-first cross-text';
  if (question.skill === 'Rhetorical Synthesis') return 'notes -> communication goal -> synthesis';
  if (question.skill === 'Words in Context') return 'contextual lexical inference';
  return 'reasoning-demand-driven R&W construction';
}

function mathBucket(question) {
  return question.figure ? 'figure' : 'strategic';
}

function assertUnique(items, label) {
  const prompts = items.map(function (item) { return normalize(item.prompt); });
  const unique = new Set(prompts);
  if (unique.size !== prompts.length) {
    throw new Error(label + ': duplicate normalized prompts (' + (prompts.length - unique.size) + ')');
  }
}

function assertCandidateOnly(pool, label) {
  if (!pool || !Array.isArray(pool.candidates)) throw new Error(label + ': generator did not return a candidates array.');
  if (pool.productionMutation !== false) throw new Error(label + ': productionMutation must be false.');
  if (pool.releaseEligible !== false) throw new Error(label + ': releaseEligible must be false.');
}

function assertPoolSize(pool, minimum, label) {
  if (pool.candidates.length < minimum) {
    throw new Error(label + ': need at least ' + minimum + ' candidates, have ' + pool.candidates.length);
  }
}

function runVariant(product) {
  const variant = product === 'psat' ? 'psat-nmsqt' : 'sat';
  const testId = product.toUpperCase();

  console.log('');
  console.log('=== ' + product.toUpperCase() + ' TARGETED REPLACEMENT DRY RUN ===');
  console.log('Generating R&W candidate pool...');

  const rwPool = generateRemediatedRWCandidates({ count: 1080, testId: testId, variant: variant });
  assertCandidateOnly(rwPool, product + ' R&W');
  assertPoolSize(rwPool, 1080, product + ' R&W pool');
  console.log('R&W candidate pool: ' + rwPool.candidates.length);

  const rwQuality = evaluateContentQualityBatch(rwPool.candidates);
  if (!rwQuality.passed) throw new Error(product + ' R&W pool QC failed: ' + rwQuality.failedCount + ' failed candidates.');
  console.log('R&W content-quality gate: PASSED (' + rwQuality.passedCount + '/' + rwQuality.total + ')');

  const rwGroups = {};
  Object.keys(REQUIREMENTS[product].rw).forEach(function (bucket) {
    rwGroups[bucket] = rwPool.candidates.filter(function (question) { return rwBucket(question) === bucket; });
  });

  Object.keys(REQUIREMENTS[product].rw).forEach(function (bucket) {
    const required = REQUIREMENTS[product].rw[bucket];
    const group = rwGroups[bucket];
    console.log('R&W bucket "' + bucket + '": ' + group.length + ' available; ' + required + ' required');
    if (group.length < required) throw new Error(product + ' R&W ' + bucket + ': need ' + required + ', have ' + group.length);
    assertUnique(group.slice(0, required), product + ' R&W ' + bucket);
  });

  console.log('Generating Math candidate pool...');
  const mathPool = generateRemediatedMathCandidates({ count: 1100, testId: testId, variant: variant, assessmentNumber: 1 });
  assertCandidateOnly(mathPool, product + ' Math');
  assertPoolSize(mathPool, 1100, product + ' Math pool');
  console.log('Math candidate pool: ' + mathPool.candidates.length);

  const mathQuality = evaluateContentQualityBatch(mathPool.candidates);
  if (!mathQuality.passed) throw new Error(product + ' Math pool QC failed: ' + mathQuality.failedCount + ' failed candidates.');
  console.log('Math content-quality gate: PASSED (' + mathQuality.passedCount + '/' + mathQuality.total + ')');

  const mathGroups = {
    strategic: mathPool.candidates.filter(function (question) { return mathBucket(question) === 'strategic'; }),
    figure: mathPool.candidates.filter(function (question) { return mathBucket(question) === 'figure'; })
  };

  Object.keys(REQUIREMENTS[product].math).forEach(function (bucket) {
    const required = REQUIREMENTS[product].math[bucket];
    const group = mathGroups[bucket];
    console.log('Math bucket "' + bucket + '": ' + group.length + ' available; ' + required + ' required');
    if (group.length < required) throw new Error(product + ' Math ' + bucket + ': need ' + required + ', have ' + group.length);
    assertUnique(group.slice(0, required), product + ' Math ' + bucket);
  });

  const sprPct = Number(mathPool.studentProducedResponsePercent || 0);
  console.log('Math SPR percentage: ' + sprPct + '%');
  if (sprPct < 25 || sprPct > 30) throw new Error(product + ' Math SPR outside target: ' + sprPct + '%. Expected 25%-30%.');

  return {
    rwPool: rwPool.candidates.length,
    rwQuality: rwQuality,
    rwBuckets: {
      'relationship-first cross-text': rwGroups['relationship-first cross-text'].length,
      'notes -> communication goal -> synthesis': rwGroups['notes -> communication goal -> synthesis'].length,
      'contextual lexical inference': rwGroups['contextual lexical inference'].length,
      'reasoning-demand-driven R&W construction': rwGroups['reasoning-demand-driven R&W construction'].length
    },
    mathPool: mathPool.candidates.length,
    mathQuality: mathQuality,
    mathBuckets: { strategic: mathGroups.strategic.length, figure: mathGroups.figure.length },
    sprPct: sprPct,
    productionMutation: false,
    releaseEligible: false
  };
}

function main() {
  const result = { sat: runVariant('sat'), psat: runVariant('psat'), productionMutation: false, releaseEligible: false };
  console.log('');
  console.log('=== FINAL DRY-RUN RESULT ===');
  console.log(JSON.stringify(result, null, 2));
  console.log('');
  console.log('Batch M targeted replacement dry run PASSED.');
}

try {
  main();
} catch (error) {
  console.error('');
  console.error('Batch M targeted replacement dry run FAILED.');
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
