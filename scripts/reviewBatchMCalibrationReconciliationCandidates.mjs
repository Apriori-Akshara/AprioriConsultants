/**
 * Batch M — independent review of the SEC calibration-reconciliation candidate package.
 *
 * Review-only. This script rebuilds the hypothetical replacement set from the
 * frozen production corpus, validates the 195 candidate/target assignments,
 * reruns substantive quality and corpus gates, and confirms that the proposed
 * reconciliation introduces no new calibration failures.
 *
 * It never mutates the production store and never authorizes release.
 */

import fs from 'node:fs';
import { evaluateContentQualityBatch } from '../src/data/sat/mockContent/batchMContentQualityGate';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore';
import { runBatchMFinalCorpusGate } from '../src/data/sat/mockContent/batchMFinalCorpusGate';
import { runBatchMCrossCorpusCalibrationCanonical } from '../src/data/sat/mockContent/batchMCrossCorpusCalibrationCanonical';
import { BATCH_M_PRODUCTION_SEQUENCE } from '../src/data/sat/mockContent/batchMProductionController';

const INPUT = process.env.BATCH_M_RECONCILIATION_INPUT ||
  'artifacts/batch-m-calibration-reconciliation-candidates/BATCH-M-CALIBRATION-RECONCILIATION-CANDIDATES-2026-09-17.json';
const OUTPUT_DIR = process.env.BATCH_M_RECONCILIATION_REVIEW_OUTPUT_DIR ||
  'artifacts/batch-m-calibration-reconciliation-candidate-review';

const EXPECTED_TOTAL = 195;
const EXPECTED_SOURCE_COUNTS = {
  'craft-and-structure': 65,
  'information-and-ideas': 130,
};
const TARGET_DOMAIN = 'standard-english-conventions';
const RW_TARGETS = {
  'craft-and-structure': 0.28,
  'information-and-ideas': 0.26,
  'standard-english-conventions': 0.26,
  'expression-of-ideas': 0.20,
};
const HARD_LIMIT = 0.05;

const clone = (value) => JSON.parse(JSON.stringify(value));
const canonical = (value) => String(value ?? '').trim().toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const normalizePrompt = (value) => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
const fail = (message) => { throw new Error(`Batch M calibration reconciliation review: ${message}`); };

function rwStats(corpus) {
  const counts = {};
  let total = 0;
  for (const mock of corpus) {
    for (const record of mock?.readingWriting || []) {
      const domain = canonical(record.domain) || '(missing)';
      counts[domain] = (counts[domain] || 0) + 1;
      total += 1;
    }
  }

  const findings = Object.entries(RW_TARGETS).map(([domain, target]) => {
    const actual = total ? Number(((counts[domain] || 0) / total).toFixed(4)) : 0;
    const delta = Number((actual - target).toFixed(4));
    return {
      domain,
      target,
      actual,
      delta,
      withinTarget: Math.abs(delta) <= HARD_LIMIT,
    };
  });

  return {
    total,
    counts,
    findings,
    failures: findings.filter((item) => !item.withinTarget),
  };
}

function failureKeys(calibration, rw) {
  return [
    ...(calibration?.calibration?.failures || []),
    ...rw.failures.map((item) => `rw-domain:${item.domain}`),
  ];
}

function productionTarget(testId) {
  return BATCH_M_PRODUCTION_SEQUENCE.find((item) => item.testId === testId) || null;
}

function reviewPackage(packageData) {
  if (packageData?.productionMutation !== false) fail('candidate package is not explicitly production-mutation false');
  if (packageData?.releaseEligible !== false) fail('candidate package is not explicitly release-ineligible');
  if (packageData?.replacementAuthorization !== 'NOT_AUTHORIZED') fail('candidate package is not explicitly unauthorized for production mutation');
  if (packageData?.sat21Created !== false) fail('candidate package is not explicitly SAT21-free');
  if (packageData?.candidatePlan?.totalCandidates !== EXPECTED_TOTAL) fail(`expected ${EXPECTED_TOTAL} planned candidates`);
  if (packageData?.candidatePlan?.assignmentsResolved !== EXPECTED_TOTAL) fail('candidate package did not resolve all 195 hypothetical assignments');

  const candidates = Array.isArray(packageData.candidates) ? packageData.candidates : [];
  const assignments = Array.isArray(packageData.assignments) ? packageData.assignments : [];
  if (candidates.length !== EXPECTED_TOTAL) fail(`expected ${EXPECTED_TOTAL} candidate records, found ${candidates.length}`);
  if (assignments.length !== EXPECTED_TOTAL) fail(`expected ${EXPECTED_TOTAL} assignments, found ${assignments.length}`);

  const sourceCounts = {};
  const candidateIds = new Set();
  const sourceQuestionIds = new Set();
  const fingerprints = new Set();
  const assignmentIds = new Set();
  const targetQuestionIds = new Set();
  const candidateByQuestionId = new Map();

  for (const candidate of candidates) {
    if (candidate.domain !== TARGET_DOMAIN) fail(`candidate ${candidate.id} is not SEC`);
    if (!candidate.id) fail('candidate is missing id');
    if (candidateIds.has(candidate.id)) fail(`duplicate candidate id: ${candidate.id}`);
    candidateIds.add(candidate.id);

    if (!candidate.sourceCandidateQuestionId) fail(`candidate ${candidate.id} is missing sourceCandidateQuestionId`);
    if (sourceQuestionIds.has(candidate.sourceCandidateQuestionId)) fail(`duplicate source candidate question ID: ${candidate.sourceCandidateQuestionId}`);
    sourceQuestionIds.add(candidate.sourceCandidateQuestionId);
    candidateByQuestionId.set(candidate.sourceCandidateQuestionId, candidate);

    if (!candidate.originalityFingerprint) fail(`candidate ${candidate.id} is missing originalityFingerprint`);
    if (fingerprints.has(candidate.originalityFingerprint)) fail(`duplicate candidate originality fingerprint: ${candidate.originalityFingerprint}`);
    fingerprints.add(candidate.originalityFingerprint);

    if (!candidate.productionTestId) fail(`candidate ${candidate.id} is missing productionTestId`);
    if (!productionTarget(candidate.productionTestId)) fail(`candidate ${candidate.id} points to unknown production test ${candidate.productionTestId}`);
    if (candidate.targetDomain !== TARGET_DOMAIN) fail(`candidate ${candidate.id} has incorrect targetDomain`);
    if (candidate.section !== 'reading-writing') fail(`candidate ${candidate.id} is not reading-writing`);
    if (candidate.questionType !== 'multiple-choice') fail(`candidate ${candidate.id} is not multiple-choice`);
    if (candidate.assessmentVariant !== productionTarget(candidate.productionTestId).variant) {
      fail(`candidate ${candidate.id} assessment variant does not match its production test`);
    }

    const sourceDomain = canonical(candidate.sourceDomain);
    if (!EXPECTED_SOURCE_COUNTS[sourceDomain]) fail(`candidate ${candidate.id} has unsupported sourceDomain ${candidate.sourceDomain}`);
    sourceCounts[sourceDomain] = (sourceCounts[sourceDomain] || 0) + 1;
    if (!candidate.prompt || !Array.isArray(candidate.choices) || !candidate.answer || !candidate.explanation) {
      fail(`candidate ${candidate.id} is missing one or more substantive content fields`);
    }
  }

  for (const [sourceDomain, expected] of Object.entries(EXPECTED_SOURCE_COUNTS)) {
    if ((sourceCounts[sourceDomain] || 0) !== expected) {
      fail(`expected ${expected} ${sourceDomain} allocations, found ${sourceCounts[sourceDomain] || 0}`);
    }
  }

  const candidatePromptSet = new Set(candidates.map((item) => normalizePrompt(item.prompt)));
  if (candidatePromptSet.size !== EXPECTED_TOTAL) fail('duplicate candidate prompts detected');

  const corpus = clone(BATCH_M_ACCEPTED_PRODUCTION_CORPUS);
  const baselineCalibration = runBatchMCrossCorpusCalibrationCanonical(corpus);
  const baselineRW = rwStats(corpus);
  const baselineFailures = failureKeys(baselineCalibration, baselineRW);

  for (const assignment of assignments) {
    if (!assignment.candidateId) fail('assignment is missing candidateId');
    if (assignmentIds.has(assignment.candidateId)) fail(`duplicate assignment for ${assignment.candidateId}`);
    assignmentIds.add(assignment.candidateId);
    if (targetQuestionIds.has(assignment.questionId)) fail(`duplicate production target assignment: ${assignment.questionId}`);
    targetQuestionIds.add(assignment.questionId);

    const candidate = candidates.find((item) => item.id === assignment.candidateId);
    if (!candidate) fail(`assignment ${assignment.candidateId} has no matching candidate`);
    if (assignment.sourceCandidateQuestionId !== candidate.sourceCandidateQuestionId) fail(`assignment ${assignment.candidateId} source candidate mismatch`);
    if (assignment.testKey !== candidate.testKey) fail(`assignment ${assignment.candidateId} testKey mismatch`);
    if (assignment.productionTestId !== candidate.productionTestId) fail(`assignment ${assignment.candidateId} production test mismatch`);
    if (assignment.targetDomain !== TARGET_DOMAIN) fail(`assignment ${assignment.candidateId} has incorrect targetDomain`);
    if (assignment.sourceDomain !== candidate.sourceDomain) fail(`assignment ${assignment.candidateId} sourceDomain mismatch`);
    if (assignment.candidateDifficulty !== candidate.difficulty) fail(`assignment ${assignment.candidateId} candidate difficulty mismatch`);

    const mock = corpus.find((item) => item.testId === assignment.productionTestId);
    if (!mock) fail(`assignment ${assignment.candidateId} points to missing mock ${assignment.productionTestId}`);
    const targetIndex = (mock.readingWriting || []).findIndex((record) => record.questionId === assignment.questionId);
    if (targetIndex < 0) fail(`assignment ${assignment.candidateId} target ${assignment.questionId} not found in ${assignment.productionTestId}`);

    const target = mock.readingWriting[targetIndex];
    if (canonical(target.domain) !== canonical(candidate.sourceDomain)) {
      fail(`assignment ${assignment.candidateId} target domain does not match sourceDomain`);
    }
    if (target.difficulty !== candidate.difficulty) {
      fail(`assignment ${assignment.candidateId} target difficulty ${target.difficulty} does not match candidate ${candidate.difficulty}`);
    }
    if (target.questionId === candidate.sourceCandidateQuestionId) {
      fail(`assignment ${assignment.candidateId} points back to its candidate question identity`);
    }
    if (normalizePrompt(target.prompt) === normalizePrompt(candidate.prompt)) {
      fail(`assignment ${assignment.candidateId} does not introduce a new prompt`);
    }
    if (target.originalityFingerprint && target.originalityFingerprint === candidate.originalityFingerprint) {
      fail(`assignment ${assignment.candidateId} does not introduce a new originality fingerprint`);
    }
    if (candidate.domain !== TARGET_DOMAIN || candidate.targetDomain !== TARGET_DOMAIN) {
      fail(`assignment ${assignment.candidateId} candidate is not SEC`);
    }
  }

  if (assignmentIds.size !== EXPECTED_TOTAL) fail(`only ${assignmentIds.size}/${EXPECTED_TOTAL} unique candidate assignments reviewed`);
  if (targetQuestionIds.size !== EXPECTED_TOTAL) fail(`only ${targetQuestionIds.size}/${EXPECTED_TOTAL} unique production targets reviewed`);

  // Rebuild the hypothetical post-state independently from the planner's embedded result.
  const hypotheticalCorpus = clone(BATCH_M_ACCEPTED_PRODUCTION_CORPUS);
  for (const assignment of assignments) {
    const candidate = candidates.find((item) => item.id === assignment.candidateId);
    const mock = hypotheticalCorpus.find((item) => item.testId === assignment.productionTestId);
    const targetIndex = mock.readingWriting.findIndex((record) => record.questionId === assignment.questionId);
    const target = mock.readingWriting[targetIndex];
    mock.readingWriting[targetIndex] = {
      ...clone(target),
      domain: TARGET_DOMAIN,
      prompt: candidate.prompt,
      choices: clone(candidate.choices),
      answer: candidate.answer,
      explanation: candidate.explanation,
      originalityFingerprint: candidate.originalityFingerprint,
    };
  }

  const contentQuality = evaluateContentQualityBatch(candidates);
  if (!contentQuality.passed || contentQuality.passedCount !== EXPECTED_TOTAL) {
    fail(`substantive quality review rejected ${contentQuality.failedCount} of ${EXPECTED_TOTAL} candidates`);
  }

  const postCalibration = runBatchMCrossCorpusCalibrationCanonical(hypotheticalCorpus);
  const postRW = rwStats(hypotheticalCorpus);
  const postFailures = failureKeys(postCalibration, postRW);
  const newFailures = postFailures.filter((key) => !baselineFailures.includes(key));
  if (newFailures.length) fail(`reconciliation introduced new calibration failures: ${JSON.stringify(newFailures)}`);

  const finalCorpusGate = runBatchMFinalCorpusGate(hypotheticalCorpus);
  if (!finalCorpusGate.passed) fail('hypothetical post-reconciliation corpus failed the final 30-mock corpus gate');

  const plannerPostState = packageData.hypotheticalPostState || {};
  if (plannerPostState.totalRecords !== finalCorpusGate.totalRecords) fail('planner and independent final corpus totals disagree');
  if (plannerPostState.mockCount !== finalCorpusGate.mockCount) fail('planner and independent mock counts disagree');
  if ((plannerPostState.newFailuresIntroduced || []).length !== newFailures.length) fail('planner and independent new-failure counts disagree');

  const secFinding = postRW.findings.find((item) => item.domain === TARGET_DOMAIN);
  if (!secFinding) fail('post-reconciliation SEC finding is missing');

  return {
    reviewVersion: 'batch-m-calibration-reconciliation-review-v1',
    date: '2026-09-17',
    status: 'PASS',
    scope: '195 SEC calibration-reconciliation candidates and their deterministic production target assignments',
    candidateCounts: {
      total: candidates.length,
      uniqueCandidateIds: candidateIds.size,
      uniqueSourceQuestionIds: sourceQuestionIds.size,
      uniqueOriginalityFingerprints: fingerprints.size,
      uniqueCandidatePrompts: candidatePromptSet.size,
    },
    allocation: {
      craftAndStructureToSEC: sourceCounts['craft-and-structure'] || 0,
      informationAndIdeasToSEC: sourceCounts['information-and-ideas'] || 0,
      targetDomain: TARGET_DOMAIN,
    },
    targetCoverage: {
      uniqueProductionTargets: targetQuestionIds.size,
      assignmentCount: assignments.length,
      productionMocksRepresented: new Set(assignments.map((item) => item.productionTestId)).size,
    },
    contentQuality: {
      passed: contentQuality.passed,
      passedCount: contentQuality.passedCount,
      failedCount: contentQuality.failedCount,
      averageScore: contentQuality.averageScore,
    },
    calibration: {
      baselineFailures,
      postFailures,
      newFailuresIntroduced: newFailures,
      baselineRWShares: baselineRW.findings,
      postRWShares: postRW.findings,
      postSECProportion: secFinding.actual,
      finalCorpusGatePassed: finalCorpusGate.passed,
    },
    productionBoundary: {
      productionMutation: false,
      releaseEligible: false,
      replacementAuthorization: 'NOT_AUTHORIZED',
      sat21Created: false,
    },
    decision: 'CALIBRATION_RECONCILIATION_INDEPENDENT_REVIEW_PASSED_PENDING_EXPLICIT_PRODUCTION_AUTHORIZATION',
    nextStep: 'Resolve/lock the reviewed targets for production and obtain a fresh explicit authorization before any production mutation.',
  };
}

function writeResult(result) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(
    `${OUTPUT_DIR}/BATCH-M-CALIBRATION-RECONCILIATION-CANDIDATE-REVIEW-2026-09-17.json`,
    JSON.stringify(result, null, 2),
  );
  fs.writeFileSync(
    `${OUTPUT_DIR}/BATCH-M-CALIBRATION-RECONCILIATION-CANDIDATE-REVIEW-2026-09-17.md`,
    [
      '# Batch M calibration reconciliation candidate review — 2026-09-17',
      '',
      '- Review status: **PASS**.',
      '- Candidates independently reviewed: **195**.',
      '- Allocation: **65 Craft & Structure → SEC + 130 Information & Ideas → SEC**.',
      '- Candidate IDs, source question IDs, prompts, and originality fingerprints: **all unique**.',
      `- Unique production targets independently checked: **${result.targetCoverage.uniqueProductionTargets}**.`,
      `- Substantive candidate-quality review: **${result.contentQuality.passedCount}/${result.candidateCounts.total} passed**.`,
      `- Hypothetical post-reconciliation final 30-mock corpus gate: **${result.calibration.finalCorpusGatePassed ? 'PASS' : 'FAIL'}**.`,
      `- New calibration failures introduced: **${result.calibration.newFailuresIntroduced.length}**.`,
      `- Hypothetical R&W SEC share: **${(result.calibration.postSECProportion * 100).toFixed(2)}%**.`,
      '',
      '## Production boundary',
      '',
      '- Production mutation: **false**.',
      '- Release eligibility: **false**.',
      '- Replacement authorization: **NOT_AUTHORIZED**.',
      '- SAT21 created: **false**.',
      '',
      'This review independently validates the candidate package and its hypothetical corpus effect. It does not perform or authorize production replacement.',
      '',
      'Next: exact target lock/resolution and a fresh explicit production authorization before mutation.',
    ].join('\n') + '\n',
  );
}

if (!fs.existsSync(INPUT)) fail(`candidate package not found: ${INPUT}`);
const packageData = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
const result = reviewPackage(packageData);
writeResult(result);
console.log(JSON.stringify(result, null, 2));
