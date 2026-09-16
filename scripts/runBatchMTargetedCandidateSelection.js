// Batch M selector restoration, product-scoped reuse, and PSAT ceiling compatibility v10
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

function reasonList(item, meta, used, productionFingerprints) {
  const { candidate, fingerprint: fp } = item;
  const reasons = [];

  if (candidate.section !== meta.section) reasons.push('section-mismatch');
  if (!skillMatches(candidate.skill, meta.skill)) reasons.push('skill-mismatch');
  if (!domainMatches(candidate, meta)) reasons.push('domain-mismatch');
  function difficultyMatches(candidate, meta) {
    if (normalize(candidate.difficulty) === normalize(meta.difficulty)) return true;

    if (
      normalize(meta.assessmentVariant) === 'psat-nmsqt'
      && normalize(meta.difficulty) === 'hard'
      && normalize(candidate.difficulty) === 'medium'
      && normalize(meta.domain) === 'geometry and trigonometry'
    ) return true;

    return false;
  }

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

function finalizeCompatibilityIndex(buckets) {
  return {
    buckets,
    compatibilityCache: new Map(),
  };
}

function main() {
  const preparation = buildTargetedReplacementPreparation();
  if (preparation.affectedUniqueQuestionCount !== 2144) {
    throw new Error(`Expected 2144 affected records; found ${preparation.affectedUniqueQuestionCount}`);
  }

  const productionIndex = buildProductionQuestionIndex();
  const productionFingerprints = new Set();
  productionIndex.forEach((question) => productionFingerprints.add(fingerprint(question)));

  const pools = buildPools();
  const compatibilityIndexes = {
    sat: finalizeCompatibilityIndex(buildCompatibilityIndex(pools.sat.candidates)),
    psat: finalizeCompatibilityIndex(buildCompatibilityIndex(pools.psat.candidates)),
  };
  const targets = preparation.questions.filter((question) => TARGET_KEYS.has(question.testKey));
  const used = { sat: new Set(), psat: new Set() };
  const records = [];
  const summary = {
    total: targets.length,
    contentReplacement: 0,
    contentPlusDifficulty: 0,
    difficultyCalibration: 0,
    selected: 0,
    noEligibleCandidate: 0,
    sat: 0,
    psat: 0,
  };

  for (const target of targets) {
    const product = target.testKey.startsWith('PSAT') ? 'psat' : 'sat';
    summary[product] += 1;
    if (target.remediationType === 'CONTENT_REPLACEMENT') summary.contentReplacement += 1;
    if (target.remediationType === 'CONTENT_REPLACEMENT_PLUS_DIFFICULTY_CALIBRATION') summary.contentPlusDifficulty += 1;
    if (target.remediationType === 'DIFFICULTY_CALIBRATION_AND_POSSIBLE_REPLACEMENT') summary.difficultyCalibration += 1;

    const meta = targetMetadata(target, productionIndex);
    const calibrationOnly = target.remediationType === 'DIFFICULTY_CALIBRATION_AND_POSSIBLE_REPLACEMENT';
    const compatible = compatibleCandidates(compatibilityIndexes[product], meta.section, meta.skill);
    const eligibleItems = [];
    const eligibleFingerprints = new Set();
    const considered = [];

    for (const item of compatible) {
      const reasons = reasonList(item, meta, used[product], productionFingerprints);

      if (!reasons.length && !calibrationOnly && eligibleItems.length < 2 && !eligibleFingerprints.has(item.fingerprint)) {
        eligibleItems.push(item);
        eligibleFingerprints.add(item.fingerprint);
      }

      if (considered.length < 4 && (reasons.length || !eligibleFingerprints.has(item.fingerprint))) {
        considered.push(compact(item, reasons));
      }

      if (eligibleItems.length >= 2 && considered.length >= 4) break;
    }

    if (!eligibleItems.length && !calibrationOnly) summary.noEligibleCandidate += 1;
    else if (!calibrationOnly) {
      summary.selected += 1;
      used[product].add(eligibleItems[0].fingerprint);
    }

    records.push({
      testKey: target.testKey,
      questionId: target.questionId,
      section: target.section,
      skill: target.skill,
      remediationType: target.remediationType,
      candidateSelection: target.candidateSelection,
      targetMetadata: meta,
      options: [
        ...eligibleItems.map((item) => compact(item, [])),
        ...considered.filter((item) => !eligibleItems.some((entry) => entry.fingerprint === item.fingerprint)),
      ].slice(0, 4),
      selectionDisposition: calibrationOnly
        ? 'CALIBRATION_FIRST_NO_REPLACEMENT_SELECTED'
        : 'REPLACEMENT_CANDIDATE_SELECTED_FOR_DOWNSTREAM_APPROVAL',
      selectedCandidateKey: eligibleItems[0]
        ? `${eligibleItems[0].product}:${eligibleItems[0].poolIndex}:${eligibleItems[0].fingerprint}`
        : null,
    });
  }

  const report = {
    reportType: 'batch-m-targeted-replacement-candidate-selection',
    reportVersion: REPORT_VERSION,
    generatedFrom: 'targeted-replacement-preparation',
    affectedUniqueQuestionCount: targets.length,
    poolCounts: POOL_COUNTS,
    summary,
    records,
    productionMutation: false,
    releaseEligible: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    sat21Created: false,
    selectionDeterminism: 'stable-order-plus-first-unused-selected-candidate-with-skill-aliases',
    note: 'Candidate options are references into deterministic remediation-generator pools. Only the selected candidate fingerprint is reserved globally; unselected options remain available for later targets. No production question was mutated. Skill aliases are selection-only compatibility mappings; candidate content and labels remain unchanged.',
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  console.log(JSON.stringify({
    reportType: report.reportType,
    affectedUniqueQuestionCount: report.affectedUniqueQuestionCount,
    summary: report.summary,
    productionMutation: false,
    releaseEligible: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    reportPath: path.relative(process.cwd(), OUT),
  }, null, 2));
}

main();
