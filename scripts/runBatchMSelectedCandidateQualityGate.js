// Batch M selected-candidate individual quality gate v3
/**
 * Batch M — downstream individual quality validation for selected replacement candidates.
 *
 * The selector is responsible for compatibility. This gate verifies selected-candidate
 * identity, deterministic pool resolution, existing content-quality status, uniqueness,
 * and calibration-only handling. It is read-only and never authorizes release.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { buildRepresentativeBatchMRemediationCandidates } from '../src/data/sat/mockContent/batchMRemediationCandidateFactory.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';

const SELECTION_REPORT = path.resolve(process.cwd(), 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json');
const OUT = path.resolve(process.cwd(), 'docs/BATCH-M-SELECTED-CANDIDATE-QUALITY-2026-09-15.json');
const REPORT_VERSION = '2026-09-15.selected-candidate-quality.v3';
const EXPECTED_AFFECTED = 2144;
const EXPECTED_SELECTED = 1594;
const EXPECTED_CALIBRATION_ONLY = 550;

const POOL_COUNTS = {
  sat: { rw: 5000, math: 8000 },
  psat: { rw: 5000, math: 8000 },
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

function parseCandidateKey(value) {
  const match = String(value || '').match(/^(sat|psat):(\d+):([a-f0-9]{16})$/i);
  if (!match) return null;
  return {
    product: match[1].toLowerCase(),
    poolIndex: Number(match[2]),
    fingerprint: match[3].toLowerCase(),
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
    if (!result?.candidates?.length) throw new Error(`${product}: deterministic candidate pool is empty`);
    pools[product] = result.candidates;
  }
  return pools;
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

  const pools = buildPools();
  const used = { sat: new Set(), psat: new Set() };
  const records = [];
  const failureReasonCounts = {};
  let selectedCount = 0;
  let calibrationOnlyCount = 0;
  let failedCount = 0;
  let seriousFailureCount = 0;

  for (const record of selection.records) {
    const calibrationOnly = record.remediationType === 'DIFFICULTY_CALIBRATION_AND_POSSIBLE_REPLACEMENT';

    if (calibrationOnly) {
      calibrationOnlyCount += 1;
      const checks = [];
      if (record.selectedCandidateKey !== null) checks.push('unexpected-selected-candidate');
      if (record.selectionDisposition !== 'CALIBRATION_FIRST_NO_REPLACEMENT_SELECTED') {
        checks.push('unexpected-calibration-disposition');
      }

      const verdict = checks.length ? 'fail' : 'pass';
      if (verdict === 'pass') continue;
      failedCount += 1;
      seriousFailureCount += 1;
      checks.forEach((check) => { failureReasonCounts[check] = (failureReasonCounts[check] || 0) + 1; });
      records.push({
        testKey: record.testKey,
        questionId: record.questionId,
        remediationType: record.remediationType,
        candidateKey: null,
        verdict,
        severity: 'serious',
        checks,
      });
      continue;
    }

    selectedCount += 1;
    const parsed = parseCandidateKey(record.selectedCandidateKey);
    const checks = [];
    if (!parsed) checks.push('invalid-selected-candidate-key');

    const expectedProduct = record.testKey.startsWith('PSAT') ? 'psat' : 'sat';
    if (parsed && parsed.product !== expectedProduct) checks.push('candidate-product-mismatch');

    const candidate = parsed ? pools[parsed.product]?.[parsed.poolIndex] : null;
    if (!candidate) checks.push('candidate-pool-index-missing');

    let candidateFingerprint = null;
    let quality = null;
    if (candidate) {
      candidateFingerprint = fingerprint(candidate);
      if (candidateFingerprint !== parsed.fingerprint) checks.push('candidate-fingerprint-mismatch');
      if (used[parsed.product].has(candidateFingerprint)) checks.push('duplicate-selected-candidate-within-product');
      quality = evaluateContentQuality(candidate);
      if (quality.verdict !== 'pass') checks.push(...quality.checks);
    }

    const uniqueChecks = [...new Set(checks)];
    const verdict = uniqueChecks.length ? 'fail' : 'pass';
    const severity = verdict === 'pass'
      ? 'pass'
      : quality?.severity === 'serious' || uniqueChecks.some((check) => [
          'invalid-selected-candidate-key',
          'candidate-product-mismatch',
          'candidate-pool-index-missing',
          'candidate-fingerprint-mismatch',
        ].includes(check))
        ? 'serious'
        : 'review';

    uniqueChecks.forEach((check) => { failureReasonCounts[check] = (failureReasonCounts[check] || 0) + 1; });
    if (verdict === 'pass') {
      used[parsed.product].add(candidateFingerprint);
    } else {
      failedCount += 1;
      if (severity === 'serious') seriousFailureCount += 1;
    }

    records.push({
      testKey: record.testKey,
      questionId: record.questionId,
      remediationType: record.remediationType,
      candidateKey: record.selectedCandidateKey,
      candidateIndex: parsed?.poolIndex ?? null,
      candidateFingerprint,
      verdict,
      severity,
      checks: uniqueChecks,
      qualityScore: quality?.score ?? null,
    });
  }

  const validatedCount = selectedCount - records.filter((record) => record.verdict !== 'pass' && record.candidateKey).length;
  const validatedAffectedCount = EXPECTED_AFFECTED - failedCount;

  const gateStatus = selectedCount === EXPECTED_SELECTED
    && calibrationOnlyCount === EXPECTED_CALIBRATION_ONLY
    && validatedCount === EXPECTED_SELECTED
    && validatedAffectedCount === EXPECTED_AFFECTED
    && failedCount === 0
    && seriousFailureCount === 0
      ? 'PASS'
      : 'FAIL';

  const report = {
    reportType: 'batch-m-selected-candidate-individual-quality-gate',
    reportVersion: REPORT_VERSION,
    sourceSelectionReport: 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json',
    affectedUniqueQuestionCount: EXPECTED_AFFECTED,
    selectedCount,
    validatedCount,
    validatedAffectedCount,
    calibrationOnlyCount,
    failedCount,
    seriousFailureCount,
    failureReasonCounts,
    poolCounts: POOL_COUNTS,
    gateStatus,
    productionMutation: false,
    releaseEligible: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    sat21Created: false,
    records,
  };

  fs.writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  console.log(JSON.stringify({
    reportType: report.reportType,
    affectedUniqueQuestionCount: report.affectedUniqueQuestionCount,
    selectedCount: report.selectedCount,
    validatedCount: report.validatedCount,
    validatedAffectedCount: report.validatedAffectedCount,
    calibrationOnlyCount: report.calibrationOnlyCount,
    failedCount: report.failedCount,
    seriousFailureCount: report.seriousFailureCount,
    failureReasonCounts: report.failureReasonCounts,
    gateStatus: report.gateStatus,
    productionMutation: report.productionMutation,
    releaseEligible: report.releaseEligible,
    replacementAuthorization: report.replacementAuthorization,
    sat21Created: report.sat21Created,
    reportPath: path.relative(process.cwd(), OUT),
  }, null, 2));

  if (gateStatus !== 'PASS') {
    throw new Error(`Selected-candidate quality gate failed: ${failedCount} failed, ${seriousFailureCount} serious failures`);
  }
}

main();
