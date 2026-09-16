// Batch M selected-candidate individual quality gate v1
/**
 * Batch M — downstream individual quality validation for selected replacement candidates.
 *
 * Read-only. Rebuilds the deterministic SAT/PSAT candidate pools, resolves each
 * selected candidate by its product/poolIndex/fingerprint key, and validates it
 * against the same compatibility rules used by candidate selection plus the
 * strengthened Batch M content-quality gate. It never mutates production.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { buildRepresentativeBatchMRemediationCandidates } from '../src/data/sat/mockContent/batchMRemediationCandidateFactory.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { BATCH_M_TARGETED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMTargetedProductionCorpus.js';

const SELECTION_REPORT = path.resolve(process.cwd(), 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json');
const OUT = path.resolve(process.cwd(), 'docs/BATCH-M-SELECTED-CANDIDATE-QUALITY-2026-09-15.json');
const REPORT_VERSION = '2026-09-15.selected-candidate-quality.v1';
const EXPECTED_AFFECTED = 2144;
const EXPECTED_SELECTED = 1594;
const EXPECTED_CALIBRATION_ONLY = 550;

const POOL_COUNTS = {
  sat: { rw: 5000, math: 8000 },
  psat: { rw: 5000, math: 8000 },
};

const TARGET_KEYS = new Set([
  'SAT1', 'SAT2', 'SAT3', 'SAT4', 'SAT5', 'SAT6', 'SAT7', 'SAT8', 'SAT9', 'SAT10',
  'PSAT1', 'PSAT2', 'PSAT3', 'PSAT4', 'PSAT5', 'PSAT6', 'PSAT7', 'PSAT8', 'PSAT9', 'PSAT10',
]);

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

function normalize(value) {
  return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function stable(value) {
  return JSON.stringify(value, Object.keys(value || {}).sort());
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

  if (
    normalize(meta.assessmentVariant) === 'psat-nmsqt'
    && normalize(meta.difficulty) === 'hard'
    && normalize(candidate.difficulty) === 'medium'
    && (
      normalize(meta.domain) === 'geometry and trigonometry'
      || normalize(meta.domain) === 'advanced math'
    )
  ) return true;

  return false;
}

function parseCandidateKey(value) {
  const match = String(value || '').match(/^(sat|psat):(\d+):([a-f0-9]{16})$/i);
  if (!match) return null;
  return {
    product: match[1].toLowerCase(),
    poolIndex: Number(match[2]),
    fingerprint: match[3].toLowerCase(),
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

function validateSelectedCandidate({ record, candidate, meta, productionFingerprints }) {
  const checks = [];
  const candidateFingerprint = fingerprint(candidate);

  if (candidateFingerprint !== parseCandidateKey(record.selectedCandidateKey)?.fingerprint) {
    checks.push('candidate-fingerprint-mismatch');
  }

  const quality = evaluateContentQuality(candidate);
  if (quality.verdict !== 'pass') {
    checks.push('content-quality-failure');
    checks.push(...quality.checks);
  }
  if (quality.severity === 'serious') checks.push('serious-content-quality-failure');

  if (candidate.section !== meta.section) checks.push('section-mismatch');
  if (!skillMatches(candidate.skill, meta.skill)) checks.push('skill-mismatch');
  if (!domainMatches(candidate, meta)) checks.push('domain-mismatch');
  if (!difficultyMatches(candidate, meta)) checks.push('difficulty-mismatch');
  if (Boolean(candidate.figure) !== meta.figureRequired) {
    checks.push(meta.figureRequired ? 'figure-required' : 'unexpected-figure');
  }
  if (meta.figureType && candidate.figure?.type && candidate.figure.type !== meta.figureType) {
    checks.push('figure-type-mismatch');
  }
  if (meta.questionType && candidate.questionType !== meta.questionType) checks.push('question-type-mismatch');
  if (candidate.assessmentFamily !== meta.assessmentFamily) checks.push('assessment-family-mismatch');
  if (candidate.assessmentVariant !== meta.assessmentVariant) checks.push('assessment-variant-mismatch');
  if (productionFingerprints.has(candidateFingerprint)) checks.push('production-content-duplicate');

  return {
    verdict: checks.length ? 'fail' : 'pass',
    severity: quality.severity,
    checks: [...new Set(checks)],
    candidateFingerprint,
    qualityScore: quality.score,
  };
}

function main() {
  if (!fs.existsSync(SELECTION_REPORT)) throw new Error(`Missing selection report: ${SELECTION_REPORT}`);
  const selection = JSON.parse(fs.readFileSync(SELECTION_REPORT, 'utf8'));

  if (selection.affectedUniqueQuestionCount !== EXPECTED_AFFECTED) {
    throw new Error(`Expected ${EXPECTED_AFFECTED} affected records; found ${selection.affectedUniqueQuestionCount}`);
  }
  if (!Array.isArray(selection.records) || selection.records.length !== EXPECTED_AFFECTED) {
    throw new Error(`Expected ${EXPECTED_AFFECTED} selection records`);
  }
  if (selection.summary?.selected !== EXPECTED_SELECTED) {
    throw new Error(`Expected ${EXPECTED_SELECTED} selected candidates; found ${selection.summary?.selected}`);
  }
  if (selection.summary?.noEligibleCandidate !== 0) {
    throw new Error(`Expected zero no-eligible-candidate records; found ${selection.summary?.noEligibleCandidate}`);
  }

  const productionIndex = buildProductionQuestionIndex();
  const productionFingerprints = new Set();
  productionIndex.forEach((question) => productionFingerprints.add(fingerprint(question)));

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
    if (!result?.candidates?.length) throw new Error(`${product}: deterministic candidate pool is empty`);
    pools[product] = result.candidates;
  }

  const selectedByProduct = { sat: new Set(), psat: new Set() };
  const records = [];
  let selectedCount = 0;
  let calibrationOnlyCount = 0;
  let validatedCount = 0;
  let failedCount = 0;
  let seriousFailureCount = 0;

  for (const record of selection.records) {
    const expectedCalibrationOnly = record.remediationType === 'DIFFICULTY_CALIBRATION_AND_POSSIBLE_REPLACEMENT';

    if (expectedCalibrationOnly) {
      calibrationOnlyCount += 1;
      const checks = [];
      if (record.selectedCandidateKey !== null) checks.push('unexpected-selected-candidate');
      if (record.selectionDisposition !== 'CALIBRATION_FIRST_NO_REPLACEMENT_SELECTED') {
        checks.push('unexpected-calibration-disposition');
      }
      records.push({
        testKey: record.testKey,
        questionId: record.questionId,
        remediationType: record.remediationType,
        candidateKey: null,
        verdict: checks.length ? 'fail' : 'pass',
        severity: checks.length ? 'serious' : 'review',
        checks,
      });
      if (checks.length) {
        failedCount += 1;
        seriousFailureCount += 1;
      }
      continue;
    }

    selectedCount += 1;
    const parsed = parseCandidateKey(record.selectedCandidateKey);
    const checks = [];

    if (!parsed) {
      failedCount += 1;
      seriousFailureCount += 1;
      records.push({
        testKey: record.testKey,
        questionId: record.questionId,
        remediationType: record.remediationType,
        candidateKey: record.selectedCandidateKey,
        verdict: 'fail',
        severity: 'serious',
        checks: ['invalid-selected-candidate-key'],
      });
      continue;
    }

    const expectedProduct = record.testKey.startsWith('PSAT') ? 'psat' : 'sat';
    if (parsed.product !== expectedProduct) checks.push('candidate-product-mismatch');

    const candidate = pools[parsed.product]?.[parsed.poolIndex];
    if (!candidate) {
      checks.push('candidate-pool-index-missing');
      failedCount += 1;
      seriousFailureCount += 1;
      records.push({
        testKey: record.testKey,
        questionId: record.questionId,
        remediationType: record.remediationType,
        candidateKey: record.selectedCandidateKey,
        verdict: 'fail',
        severity: 'serious',
        checks: [...new Set(checks)],
      });
      continue;
    }

    const meta = targetMetadata(record, productionIndex);
    const result = validateSelectedCandidate({ record, candidate, meta, productionFingerprints });
    checks.push(...result.checks);

    if (selectedByProduct[parsed.product].has(result.candidateFingerprint)) checks.push('duplicate-selected-candidate-within-product');
    else selectedByProduct[parsed.product].add(result.candidateFingerprint);

    const verdict = checks.length ? 'fail' : 'pass';
    if (verdict === 'pass') validatedCount += 1;
    else {
      failedCount += 1;
      if (result.severity === 'serious' || checks.includes('candidate-product-mismatch') || checks.includes('invalid-selected-candidate-key')) {
        seriousFailureCount += 1;
      }
    }

    records.push({
      testKey: record.testKey,
      questionId: record.questionId,
      remediationType: record.remediationType,
      candidateKey: record.selectedCandidateKey,
      candidateIndex: parsed.poolIndex,
      candidateFingerprint: result.candidateFingerprint,
      verdict,
      severity: checks.length ? (result.severity === 'serious' ? 'serious' : 'review') : 'pass',
      checks: [...new Set(checks)],
      qualityScore: result.qualityScore,
    });
  }

  const report = {
    reportType: 'batch-m-selected-candidate-individual-quality-gate',
    reportVersion: REPORT_VERSION,
    sourceSelectionReport: 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json',
    affectedUniqueQuestionCount: EXPECTED_AFFECTED,
    selectedCount,
    validatedCount,
    calibrationOnlyCount,
    failedCount,
    seriousFailureCount,
    poolCounts: POOL_COUNTS,
    gateStatus: validatedCount === EXPECTED_SELECTED
      && selectedCount === EXPECTED_SELECTED
      && calibrationOnlyCount === EXPECTED_CALIBRATION_ONLY
      && failedCount === 0
      && seriousFailureCount === 0
        ? 'PASS'
        : 'FAIL',
    productionMutation: false,
    releaseEligible: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    sat21Created: false,
    records,
  };

  fs.writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  if (report.gateStatus !== 'PASS') {
    throw new Error(`Selected-candidate quality gate failed: ${failedCount} failed, ${seriousFailureCount} serious failures`);
  }

  console.log(JSON.stringify({
    reportType: report.reportType,
    affectedUniqueQuestionCount: report.affectedUniqueQuestionCount,
    selectedCount: report.selectedCount,
    validatedCount: report.validatedCount,
    calibrationOnlyCount: report.calibrationOnlyCount,
    failedCount: report.failedCount,
    seriousFailureCount: report.seriousFailureCount,
    gateStatus: report.gateStatus,
    productionMutation: report.productionMutation,
    releaseEligible: report.releaseEligible,
    replacementAuthorization: report.replacementAuthorization,
    sat21Created: report.sat21Created,
    reportPath: path.relative(process.cwd(), OUT),
  }, null, 2));
}

main();
