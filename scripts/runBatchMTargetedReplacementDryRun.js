/**
 * Batch M — targeted replacement dry run.
 * Candidate-only: never imports or mutates the frozen production store.
 */
import { generateRemediatedRWCandidates } from '../src/data/sat/mockContent/verbalConstructionRemediated.js';
import { generateRemediatedMathCandidates } from '../src/data/sat/mockContent/mathBankFactoryRemediated.js';
import { evaluateContentQualityBatch } from '../src/data/sat/mockContent/batchMContentQualityGate.js';

const REQUIREMENTS = {
  sat: {
    rw: {
      'relationship-first cross-text': 108,
      'notes → communication goal → synthesis': 108,
      'contextual lexical inference': 108,
      'reasoning-demand-driven R&W construction': 42,
    },
    math: { strategic: 168, figure: 103 },
  },
  psat: {
    rw: {
      'relationship-first cross-text': 108,
      'notes → communication goal → synthesis': 108,
      'contextual lexical inference': 108,
      'reasoning-demand-driven R&W construction': 42,
    },
    math: { strategic: 173, figure: 88 },
  },
};

const normalize = (value) => String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');

function rwBucket(q) {
  if (q.skill === 'Cross-Text Connections') return 'relationship-first cross-text';
  if (q.skill === 'Rhetorical Synthesis') return 'notes → communication goal → synthesis';
  if (q.skill === 'Words in Context') return 'contextual lexical inference';
  return 'reasoning-demand-driven R&W construction';
}

function mathBucket(q) {
  return q.figure ? 'figure' : 'strategic';
}

function assertUnique(items, label) {
  const prompts = items.map((item) => normalize(item.prompt));
  const unique = new Set(prompts);
  if (unique.size !== prompts.length) throw new Error(`${label}: duplicate normalized prompts (${prompts.length - unique.size})`);
}

function runVariant(product) {
  const variant = product === 'psat' ? 'psat-nmsqt' : 'sat';
  const rwPool = generateRemediatedRWCandidates({ count: 1080, testId: product.toUpperCase(), variant });
  const rwQuality = evaluateContentQualityBatch(rwPool.candidates);
  if (!rwQuality.passed) throw new Error(`${product} R&W pool QC failed: ${rwQuality.failedCount}`);

  const rwGroups = Object.fromEntries(Object.keys(REQUIREMENTS[product].rw).map((bucket) => [bucket, rwPool.candidates.filter((q) => rwBucket(q) === bucket)]));
  for (const [bucket, required] of Object.entries(REQUIREMENTS[product].rw)) {
    if (rwGroups[bucket].length < required) throw new Error(`${product} R&W ${bucket}: need ${required}, have ${rwGroups[bucket].length}`);
    assertUnique(rwGroups[bucket].slice(0, required), `${product} R&W ${bucket}`);
  }

  const mathPool = generateRemediatedMathCandidates({ count: 1100, testId: product.toUpperCase(), variant, assessmentNumber: 1 });
  const mathQuality = evaluateContentQualityBatch(mathPool.candidates);
  if (!mathQuality.passed) throw new Error(`${product} Math pool QC failed: ${mathQuality.failedCount}`);

  const mathGroups = {
    strategic: mathPool.candidates.filter((q) => mathBucket(q) === 'strategic'),
    figure: mathPool.candidates.filter((q) => mathBucket(q) === 'figure'),
  };
  for (const [bucket, required] of Object.entries(REQUIREMENTS[product].math)) {
    if (mathGroups[bucket].length < required) throw new Error(`${product} Math ${bucket}: need ${required}, have ${mathGroups[bucket].length}`);
    assertUnique(mathGroups[bucket].slice(0, required), `${product} Math ${bucket}`);
  }

  const sprPct = Number(mathPool.studentProducedResponsePercent || 0);
  if (sprPct < 25 || sprPct > 30) throw new Error(`${product} Math SPR outside target: ${sprPct}%`);

  return {
    rwPool: rwPool.candidates.length,
    rwUnique: Object.fromEntries(Object.entries(rwGroups).map(([k, v]) => [k, new Set(v.map((q) => normalize(q.prompt))).size])),
    rwQuality,
    mathPool: mathPool.candidates.length,
    mathUnique: Object.fromEntries(Object.entries(mathGroups).map(([k, v]) => [k, new Set(v.map((q) => normalize(q.prompt))).size])),
    mathQuality,
    sprPct,
  };
}

const result = { sat: runVariant('sat'), psat: runVariant('psat'), productionMutation: false, releaseEligible: false };
console.log(JSON.stringify(result, null, 2));
console.log('Batch M targeted replacement dry run PASSED.');
