/**
 * Batch M — read-only cross-corpus calibration remediation scope.
 *
 * Produces the minimum candidate-only replacement scope needed to bring the
 * frozen corpus back inside the approved SAT/PSAT construction ranges.
 * It never selects, replaces, regenerates, or publishes production questions.
 */

import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore';
import { BATCH_M_PRODUCTION_SEQUENCE } from '../src/data/sat/mockContent/batchMProductionController';
import { runBatchMFinalCorpusGate } from '../src/data/sat/mockContent/batchMFinalCorpusGate';

const RW_TARGETS = {
  'craft-and-structure': 0.28,
  'information-and-ideas': 0.26,
  'standard-english-conventions': 0.26,
  'expression-of-ideas': 0.20,
};

const MATH_SPR_MIN = 0.25;

function records(mock) {
  return [...(mock?.readingWriting || []), ...(mock?.math || [])];
}

function canonical(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function groupFor(testKey) {
  if (String(testKey).startsWith('PSAT')) return 'PSAT';
  if (/^SAT(?:1[1-9]|20)$/.test(String(testKey))) return 'SAT-Series-B';
  return 'SAT-Series-A';
}

function integerTargets(total, ratios) {
  const raw = Object.fromEntries(Object.entries(ratios).map(([key, ratio]) => [key, total * ratio]));
  const result = Object.fromEntries(Object.entries(raw).map(([key, value]) => [key, Math.floor(value)]));
  let remainder = total - Object.values(result).reduce((sum, value) => sum + value, 0);
  const order = Object.entries(raw)
    .map(([key, value]) => ({ key, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction || a.key.localeCompare(b.key));
  for (const item of order) {
    if (remainder <= 0) break;
    result[item.key] += 1;
    remainder -= 1;
  }
  return result;
}

function scopeForBucket(domainCounts, total) {
  const targets = integerTargets(total, RW_TARGETS);
  const reductions = [];
  const additions = [];
  for (const [domain, target] of Object.entries(targets)) {
    const current = Number(domainCounts[domain] || 0);
    if (current > target) reductions.push({ domain, count: current - target });
    if (current < target) additions.push({ domain, count: target - current });
  }

  let remaining = reductions.map((item) => ({ ...item }));
  const allocations = [];
  for (const addition of additions) {
    let need = addition.count;
    for (const reduction of remaining) {
      if (need <= 0) break;
      const moved = Math.min(need, reduction.count);
      if (moved > 0) {
        allocations.push({ fromDomain: reduction.domain, toDomain: addition.domain, count: moved });
        reduction.count -= moved;
        need -= moved;
      }
    }
  }

  return { current: domainCounts, target: targets, reductions, additions, allocations };
}

function run() {
  if (!Array.isArray(BATCH_M_ACCEPTED_PRODUCTION_CORPUS) || BATCH_M_ACCEPTED_PRODUCTION_CORPUS.length !== 30) {
    throw new Error('Expected exactly 30 frozen production mocks.');
  }

  const gate = runBatchMFinalCorpusGate(BATCH_M_ACCEPTED_PRODUCTION_CORPUS);
  if (!gate.passed) throw new Error('Prerequisite final 30-mock corpus gate failed.');

  const groups = {
    'SAT-Series-A': { rw: {}, mathTotal: 0, mathSpr: 0, mathDomain: {} },
    PSAT: { rw: {}, mathTotal: 0, mathSpr: 0, mathDomain: {} },
    'SAT-Series-B': { rw: {}, mathTotal: 0, mathSpr: 0, mathDomain: {} },
  };
  const overall = { rw: {}, mathTotal: 0, mathSpr: 0, mathDomain: {} };

  for (let index = 0; index < BATCH_M_ACCEPTED_PRODUCTION_CORPUS.length; index += 1) {
    const target = BATCH_M_PRODUCTION_SEQUENCE[index];
    const group = groupFor(target?.testKey);
    for (const record of records(BATCH_M_ACCEPTED_PRODUCTION_CORPUS[index])) {
      const section = String(record.section || '').toLowerCase();
      if (section === 'reading-writing') {
        const domain = canonical(record.domain);
        groups[group].rw[domain] = (groups[group].rw[domain] || 0) + 1;
        overall.rw[domain] = (overall.rw[domain] || 0) + 1;
      } else if (section === 'math') {
        const domain = canonical(record.domain);
        groups[group].mathTotal += 1;
        overall.mathTotal += 1;
        groups[group].mathDomain[domain] = (groups[group].mathDomain[domain] || 0) + 1;
        overall.mathDomain[domain] = (overall.mathDomain[domain] || 0) + 1;
        const type = String(record.questionType || record.question_type || '').toLowerCase();
        if (type === 'student-produced-response') {
          groups[group].mathSpr += 1;
          overall.mathSpr += 1;
        }
      }
    }
  }

  const rwOverall = scopeForBucket(overall.rw, Object.values(overall.rw).reduce((sum, count) => sum + count, 0));
  const groupPlans = Object.fromEntries(
    Object.entries(groups).map(([group, bucket]) => [
      group,
      {
        readingWriting: scopeForBucket(bucket.rw, Object.values(bucket.rw).reduce((sum, count) => sum + count, 0)),
        math: {
          total: bucket.mathTotal,
          currentSpr: bucket.mathSpr,
          currentSprRate: Number((bucket.mathSpr / bucket.mathTotal).toFixed(4)),
          minimumSprTarget: Math.ceil(bucket.mathTotal * MATH_SPR_MIN),
          minimumAdditionalSprCandidates: Math.max(0, Math.ceil(bucket.mathTotal * MATH_SPR_MIN) - bucket.mathSpr),
          domainCounts: bucket.mathDomain,
        },
      },
    ]),
  );

  return {
    prerequisiteFinalCorpusGate: gate.status,
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
    mockCount: 30,
    totalRecords: gate.totalRecords,
    readingWriting: {
      current: rwOverall.current,
      target: rwOverall.target,
      allocations: rwOverall.allocations,
      minimumCandidateReplacements: rwOverall.allocations.reduce((sum, item) => sum + item.count, 0),
    },
    math: {
      total: overall.mathTotal,
      currentSpr: overall.mathSpr,
      currentSprRate: Number((overall.mathSpr / overall.mathTotal).toFixed(4)),
      minimumSprTarget: Math.ceil(overall.mathTotal * MATH_SPR_MIN),
      minimumAdditionalSprCandidates: Math.max(0, Math.ceil(overall.mathTotal * MATH_SPR_MIN) - overall.mathSpr),
      domainCounts: overall.mathDomain,
    },
    groupPlans,
    totalMinimumCandidateReplacementScope:
      rwOverall.allocations.reduce((sum, item) => sum + item.count, 0)
      + Math.max(0, Math.ceil(overall.mathTotal * MATH_SPR_MIN) - overall.mathSpr),
    nextBoundary: 'candidate-generation-and-controlled-selection-required-before-any-production-mutation',
  };
}

console.log(JSON.stringify(run(), null, 2));
