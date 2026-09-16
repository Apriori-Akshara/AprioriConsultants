/**
 * Batch M — exact replacement-candidate generation and controlled selection.
 *
 * Candidate-only. Maps the prepared 2,144 frozen production records to
 * deterministic remediation-generator candidates without mutating production.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { buildTargetedReplacementPreparation } from './runBatchMTargetedReplacementPreparation.js';
import { buildRepresentativeBatchMRemediationCandidates } from '../src/data/sat/mockContent/batchMRemediationCandidateFactory.js';
import { evaluateContentQualityBatch } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { BATCH_M_TARGETED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMTargetedProductionCorpus.js';

const OUT = path.resolve(process.cwd(), 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json');
const REPORT_VERSION = '2026-09-15.targeted-candidate-selection.v1';
const TARGET_KEYS = new Set([
  'SAT1', 'SAT2', 'SAT3', 'SAT4', 'SAT5', 'SAT6', 'SAT7', 'SAT8', 'SAT9', 'SAT10',
  'PSAT1', 'PSAT2', 'PSAT3', 'PSAT4', 'PSAT5', 'PSAT6', 'PSAT7', 'PSAT8', 'PSAT9', 'PSAT10',
]);

const POOL_COUNTS = {
  sat: { rw: 5000, math: 8000 },
  psat: { rw: 5000, math: 8000 },
};

const SKILL_ALIASES = {
  'Linear relationships': ['Linear functions'],
  'Systems of linear equations': ['Linear equations'],
  'Equivalent linear representations': ['Linear representations', 'Linear functions and representations'],
  'Quadratic parameter reasoning': ['Quadratic parameter reasoning'],
  'Equivalent exponential representations': ['Exponential equations'],
  'Quadratic functions': ['Quadratic functions and representations'],
  'Quadratic discriminant': ['Quadratic equations'],
  'Multi-stage percentages': ['Percentages'],
  'Weighted means': ['Weighted means'],
  'Scatterplot interpretation': ['Data models'],
  'Statistical transformations': ['Measures of spread'],
  'Composite area': ['Geometry and measurement'],
  'Similarity and area': ['Similarity and scaling'],
  'Circle relationships': ['Circle relationships'],
  'Right-triangle relationships': ['Right triangles'],
};

function stable(value) {
  return JSON.stringify(value, Object.keys(value || {}).sort());
}

function normalize(value) {
  return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function hash(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex').slice(0, 16);
}

function fingerprint(question) {
  return hash(stable({
    section: question.section,
    prompt: normalize(question.prompt),
    choices: (question.choices || []).map(normalize),
    answer: normalize(question.answer),
    figure: question.figure || null,
    domain: question.domain,
    skill: question.skill,
    difficulty: question.difficulty,
  }));
}

function questionId(question) {
  return question?.questionId || question?.id || question?.contentId || null;
}

function isQuestion(value) {
  return value && typeof value === 'object'
    && typeof value.prompt === 'string'
    && typeof value.section === 'string'
    && Boolean(questionId(value));
}

function deriveTestKey(mock) {
  if (mock?.testKey) return mock.testKey;
  const match = String(mock?.testId || '').match(/(?:mock-)?(\d+)$/i);
  if (!match) return null;
  const prefix = String(mock.testId).toLowerCase().startsWith('psat') ? 'PSAT' : 'SAT';
  return `${prefix}${Number(match[1])}`;
}

function collectQuestions(value, testKey, out = [], seen = new Set()) {
  if (!value || typeof value !== 'object' || seen.has(value)) return out;
  seen.add(value);

  if (Array.isArray(value)) {
    value.forEach((item) => collectQuestions(item, testKey, out, seen));
    return out;
  }

  if (isQuestion(value)) out.push({ ...value, __testKey: testKey });

  Object.entries(value).forEach(([key, child]) => {
    if (key === 'figure' || key === 'metadata' || key === 'choices') return;
    collectQuestions(child, testKey, out, seen);
  });

  return out;
}

function buildProductionQuestionIndex() {
  const index = new Map();

  BATCH_M_TARGETED_PRODUCTION_CORPUS.forEach((mock) => {
    const testKey = deriveTestKey(mock);
    if (!testKey || !TARGET_KEYS.has(testKey)) return;

    collectQuestions(mock, testKey).forEach((question) => {
      index.set(`${testKey}:${questionId(question)}`, question);
    });
  });

  return index;
}

function candidateShape(candidate, poolIndex, product) {
  return {
    candidate,
    poolIndex,
    product,
    fingerprint: fingerprint(candidate),
  };
}

function targetMetadata(target, productionIndex) {
  const production = productionIndex.get(`${target.testKey}:${target.questionId}`);
  if (!production) {
    throw new Error(`Missing frozen production question for ${target.testKey}:${target.questionId}`);
  }

  return {
    section: target.section,
    skill: target.skill,
    domain: target.domain,
    difficulty: target.difficulty,
    assessmentFamily: production.assessmentFamily,
    assessmentVariant: production.assessmentVariant,
    figureRequired: Boolean(production.figure),
    figureType: production.figure?.type || null,
    module: production.module || null,
    questionType: production.questionType || null,
  };
}

function skillMatches(candidateSkill, targetSkill) {
  if (candidateSkill === targetSkill) return true;
  return (SKILL_ALIASES[String(candidateSkill)] || []).includes(targetSkill);
}

function domainMatches(candidate, meta) {
  if (candidate.domain === meta.domain) return true;
  return candidate.section === 'math' && skillMatches(candidate.skill, meta.skill);
}

function difficultyMatches(candidate, meta) {
  if (normalize(candidate.difficulty) === normalize(meta.difficulty)) return true;

  // Batch M PSAT ceiling exception: the remediation blueprint explicitly trims
  // the hard tail from Geometry and Trigonometry. When the frozen PSAT target is
  // hard in that domain, a medium candidate is the ceiling-compatible replacement.
  if (normalize(meta.assessmentVariant) === 'psat-nmsqt'
    && normalize(meta.difficulty) === 'hard'
    && normalize(candidate.difficulty) === 'medium'
    && normalize(meta.domain) === 'geometry and trigonometry') {
    return true;
  }

  return false;
}

function reasonList(item, meta, used, productionFingerprints) {
  const { candidate, fingerprint: fp } = item;
  const reasons = [];

  if (candidate.section !== meta.section) reasons.push('section-mismatch');
  if (!skillMatches(candidate.skill, meta.skill)) reasons.push('skill-mismatch');
  if (!domainMatches(candidate, meta)) reasons.push('domain-mismatch');
  if (!difficultyMatches(candidate, meta)) reasons.push('difficulty-mismatch');
  if (Boolean(candidate.figure) !== meta.figureRequired) {
    reasons.push(meta.figureRequired ? 'figure-required' : 'unexpected-figure');
  }
  if (meta.figureType && candidate.figure?.type && candidate.figure.type !== meta.figureType) {
    reasons.push('figure-type-mismatch');
  }
  if (meta.questionType && candidate.questionType !== meta.questionType) reasons.push('question-type-mismatch');
  if (candidate.assessmentFamily !== meta.assessmentFamily) reasons.push('assessment-family-mismatch');
  if (candidate.assessmentVariant !== meta.assessmentVariant) reasons.push('assessment-variant-mismatch');

  if (productionFingerprints.has(fp)) reasons.push('production-content-duplicate');
  if (used.has(fp)) reasons.push('candidate-reuse');

  return reasons;
}

function compact(item, reasons) {
  return {
    candidateKey: `${item.product}:${item.poolIndex}:${item.fingerprint}`,
    poolIndex: item.poolIndex,
    fingerprint: item.fingerprint,
    verdict: reasons.length ? 'rejected' : 'eligible',
    reasons: reasons.length
      ? reasons
      : [
          'section-match',
          'skill-match',
          'domain-match',
          'difficulty-match',
          'assessment-match',
          'originality-match',
          'not-reused',
        ],
  };
}

function buildPools() {
  const pools = {};

  for (const product of ['sat', 'psat']) {
    const variant = product === 'sat' ? 'sat-series-a' : 'psat-nmsqt';
    const testId = product === 'sat' ? 'SAT1' : 'PSAT1';
    const result = buildRepresentativeBatchMRemediationCandidates({
      rwCount: POOL_COUNTS[product].rw,
      mathCount: POOL_COUNTS[product].math,
      testId,
      variant,
    });

    if (!result?.candidates?.length) throw new Error(`${product}: remediation candidate pool is empty`);

    const quality = evaluateContentQualityBatch(result.candidates);
    if (!quality?.passed) {
      throw new Error(`${product}: targeted candidate pool failed strengthened content-quality gate`);
    }

    pools[product] = {
      candidates: result.candidates.map((candidate, index) => candidateShape(candidate, index, product)),
      quality,
    };
  }

  return pools;
}

function buildCompatibilityIndex(candidates) {
  const index = new Map();

  for (const item of candidates) {
    const key = `${item.candidate.section}\u0000${item.candidate.skill}`;
    const bucket = index.get(key);
    if (bucket) bucket.push(item);
    else index.set(key, [item]);
  }

  return index;
}

function compatibleCandidates(index, section, targetSkill) {
  const cacheKey = `${section}\u0000${targetSkill}`;
  if (index.compatibilityCache.has(cacheKey)) return index.compatibilityCache.get(cacheKey);

  const skillKeys = new Set([targetSkill]);
  Object.entries(SKILL_ALIASES).forEach(([candidateSkill, targetSkills]) => {
    if (targetSkills.includes(targetSkill)) skillKeys.add(candidateSkill);
  });

  const matches = [];
  for (const skill of skillKeys) {
    const bucket = index.buckets.get(`${section}\u0000${skill}`);
    if (bucket) matches.push(...bucket);
  }

  matches.sort((a, b) => a.poolIndex - b.poolIndex);
  index.compatibilityCache.set(cacheKey, matches);
  return matches;
}

function buildCandidateIndex(pool) {
  return {
    buckets: buildCompatibilityIndex(pool.candidates),
    compatibilityCache: new Map(),
  };
}

function buildProductionFingerprintSet(targets, productionIndex) {
  const fingerprints = new Set();
  for (const target of targets) {
    const production = productionIndex.get(`${target.testKey}:${target.questionId}`);
    if (production) fingerprints.add(fingerprint(production));
  }
  return fingerprints;
}

function targetRecords(preparation) {
  return preparation.records || preparation.targets || preparation;
}

function selectCandidateForTarget(target, pool, poolIndex, used, productionFingerprints, productionIndex) {
  const meta = targetMetadata(target, productionIndex);
  const candidates = compatibleCandidates(poolIndex, meta.section, meta.skill);
  const compatible = [];

  for (const item of candidates) {
    const reasons = reasonList(item, meta, used, productionFingerprints);
    if (!reasons.length) compatible.push(item);
    if (compatible.length >= 3) break;
  }

  return { meta, candidates, compatible };
}

function selectTargets(targets, pools, productionIndex) {
  const used = { sat: new Set(), psat: new Set() };
  const results = [];
  const productionFingerprints = buildProductionFingerprintSet(targets, productionIndex);
  const indexes = { sat: buildCandidateIndex(pools.sat), psat: buildCandidateIndex(pools.psat) };

  for (const target of targets) {
    const product = target.testKey.startsWith('PSAT') ? 'psat' : 'sat';
    const selection = selectCandidateForTarget(
      target,
      pools[product],
      indexes[product],
      used[product],
      productionFingerprints,
      productionIndex,
    );
    const chosen = selection.compatible[0] || null;

    if (chosen) used[product].add(chosen.fingerprint);

    results.push({
      target,
      meta: selection.meta,
      chosen,
      alternatives: selection.compatible.slice(1, 3),
      candidateCompatibilitySample: selection.candidates.slice(0, 20).map((item) => ({
        candidateKey: `${item.product}:${item.poolIndex}:${item.fingerprint}`,
        reasons: reasonList(item, selection.meta, used[product], productionFingerprints),
      })),
    });
  }

  return results;
}

function summarize(results) {
  const summary = {
    total: results.length,
    contentReplacement: 0,
    contentPlusDifficulty: 0,
    difficultyCalibration: 0,
    selected: 0,
    noEligibleCandidate: 0,
    sat: 0,
    psat: 0,
  };

  for (const item of results) {
    const product = item.target.testKey.startsWith('PSAT') ? 'psat' : 'sat';
    summary[product] += 1;
    if (item.chosen) summary.selected += 1;
    else summary.noEligibleCandidate += 1;

    const needsDifficulty = normalize(item.target.difficulty) !== normalize(item.chosen?.candidate?.difficulty);
    if (needsDifficulty) summary.difficultyCalibration += 1;
    else summary.contentReplacement += 1;
  }

  return summary;
}

const productionIndex = buildProductionQuestionIndex();
const preparation = buildTargetedReplacementPreparation(productionIndex);
const targets = targetRecords(preparation).filter((target) => target?.testKey && TARGET_KEYS.has(target.testKey));
if (targets.length !== 2144) throw new Error(`Expected 2144 prepared targets, got ${targets.length}`);

const pools = buildPools();
const results = selectTargets(targets, pools, productionIndex);
const summary = summarize(results);

const report = {
  reportType: 'batch-m-targeted-replacement-candidate-selection',
  reportVersion: REPORT_VERSION,
  generatedAt: new Date().toISOString(),
  affectedUniqueQuestionCount: results.length,
  summary,
  records: results,
  productionMutation: false,
  releaseEligible: false,
  replacementAuthorization: 'NOT_AUTHORIZED',
  sat21Created: false,
  reportPath: 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json',
};

fs.writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({
  reportType: report.reportType,
  affectedUniqueQuestionCount: report.affectedUniqueQuestionCount,
  summary: report.summary,
  productionMutation: report.productionMutation,
  releaseEligible: report.releaseEligible,
  replacementAuthorization: report.replacementAuthorization,
  reportPath: report.reportPath,
}, null, 2));
