/**
 * Batch M — exact target lock after target-specific candidate independent review.
 *
 * This stage is candidate-only. It binds each reviewed candidate to its exact
 * frozen production target and emits a deterministic lock artifact. It never
 * mutates production, grants release eligibility, or creates SAT21.
 */
import fs from 'node:fs';
import path from 'node:path';

const CANDIDATE_INPUT =
  process.env.BATCH_M_TARGET_CANDIDATE_INPUT ||
  'artifacts/batch-m-deep-content-quality-target-candidates/BATCH-M-DEEP-CONTENT-QUALITY-TARGET-CANDIDATES-2026-09-21.json';
const REVIEW_INPUT =
  process.env.BATCH_M_TARGET_REVIEW_INPUT ||
  'artifacts/batch-m-deep-content-quality-independent-review/BATCH-M-DEEP-CONTENT-QUALITY-INDEPENDENT-REVIEW-2026-09-17.json';

const OUTPUT_DIR = 'artifacts/batch-m-deep-content-quality-target-lock';
const OUTPUT_JSON = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-TARGET-LOCK-2026-09-21.json`;
const OUTPUT_MD = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-TARGET-LOCK-2026-09-21.md`;

function readJson(file) {
  if (!fs.existsSync(file)) throw new Error(`Required artifact not found: ${file}`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function targetKey(candidate) {
  const testKey = candidate?.metadata?.targetTestKey;
  const questionId = candidate?.metadata?.targetQuestionId;
  if (!testKey || !questionId) throw new Error(`Missing exact target identity for candidate ${candidate?.id || 'unknown'}`);
  return `${testKey}::${questionId}`;
}

function main() {
  const candidateSource = readJson(CANDIDATE_INPUT);
  const reviewSource = readJson(REVIEW_INPUT);
  const candidates = Array.isArray(candidateSource.candidates) ? candidateSource.candidates : [];
  const reviews = Array.isArray(reviewSource.review) ? reviewSource.review : [];

  if (!candidates.length) throw new Error('Target candidate set is empty.');
  if (candidateSource.productionMutation !== false || candidateSource.releaseEligible !== false || candidateSource.sat21Created !== false) {
    throw new Error('Candidate artifact violates the production safety boundary.');
  }
  if (reviewSource.productionMutation !== false || reviewSource.releaseEligible !== false || reviewSource.sat21Created !== false) {
    throw new Error('Independent-review artifact violates the production safety boundary.');
  }

  const reviewById = new Map();
  for (const review of reviews) {
    const id = String(review.id || '');
    if (!id || reviewById.has(id)) throw new Error(`Duplicate or missing review identity: ${id || 'unknown'}`);
    reviewById.set(id, review);
  }

  const seenTargets = new Set();
  const seenFingerprints = new Set();
  const locked = [];

  for (const candidate of candidates) {
    const id = String(candidate.id || '');
    const review = reviewById.get(id);
    if (!review) throw new Error(`No independent review found for candidate ${id}`);
    if (review.status !== 'PASS' || Number(review.failureCount || 0) !== 0 || Number(review.expertReviewCount || 0) !== 0) {
      throw new Error(`Candidate ${id} is not independently review-passed.`);
    }

    const key = targetKey(candidate);
    const fingerprint = String(candidate.originalityFingerprint || '');
    if (!fingerprint) throw new Error(`Missing originality fingerprint for candidate ${id}`);
    if (seenTargets.has(key)) throw new Error(`Duplicate exact target: ${key}`);
    if (seenFingerprints.has(fingerprint)) throw new Error(`Duplicate candidate originality fingerprint: ${fingerprint}`);

    if (candidate.releaseEligibility === true || candidate.isOperational === true || candidate.status === 'operational') {
      throw new Error(`Candidate ${id} crosses the production boundary.`);
    }

    seenTargets.add(key);
    seenFingerprints.add(fingerprint);
    locked.push({
      candidateId: id,
      targetTestKey: candidate.metadata.targetTestKey,
      targetQuestionId: candidate.metadata.targetQuestionId,
      testId: candidate.testId,
      section: candidate.section,
      domain: candidate.domain,
      skill: candidate.skill,
      difficulty: candidate.difficulty,
      assessmentFamily: candidate.assessmentFamily,
      assessmentVariant: candidate.assessmentVariant,
      targetClasses: candidate.metadata.targetClasses || candidate.metadata.remediationPool?.targetClasses || [],
      originalityFingerprint: fingerprint,
      independentReview: {
        status: review.status,
        failureCount: review.failureCount,
        expertReviewCount: review.expertReviewCount
      },
      candidateOnly: true,
      productionMutation: false,
      releaseEligible: false,
      sat21Created: false
    });
  }

  if (locked.length !== candidates.length || locked.length !== reviews.length) {
    throw new Error(`Coverage mismatch: candidates=${candidates.length}, reviews=${reviews.length}, locked=${locked.length}`);
  }

  locked.sort((a, b) =>
    String(a.targetTestKey).localeCompare(String(b.targetTestKey)) ||
    String(a.targetQuestionId).localeCompare(String(b.targetQuestionId))
  );

  const result = {
    reportType: 'batch-m-deep-content-quality-target-lock',
    date: '2026-09-21',
    sourceCandidateArtifact: path.basename(CANDIDATE_INPUT),
    sourceReviewArtifact: path.basename(REVIEW_INPUT),
    candidateCount: candidates.length,
    independentlyPassedCount: locked.length,
    exactTargetCoverage: locked.length,
    duplicateTargetCount: 0,
    duplicateFingerprintCount: 0,
    lockedCandidates: locked,
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
    authorizationRequired: true,
    acceptanceDecision: 'EXACT_TARGET_LOCK_COMPLETE_CANDIDATE_ONLY',
    nextStep: 'Run the documented controlled replacement validation and obtain explicit production replacement authorization. This lock does not mutate production.'
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2));
  fs.writeFileSync(
    OUTPUT_MD,
    `# Batch M exact target lock — 2026-09-21\n\n- Candidates independently passed: **${locked.length} / ${candidates.length}**.\n- Exact target coverage: **${locked.length}**.\n- Duplicate exact targets: **0**.\n- Duplicate originality fingerprints: **0**.\n- Production mutation: **false**.\n- Release eligible: **false**.\n- SAT21 created: **false**.\n- Production authorization: **required and not granted by this artifact**.\n\nThis lock binds each independently reviewed candidate to one exact frozen production \`testKey + questionId\`. It is candidate-only and does not replace, modify, delete, reorder, or release production content.\n`
  );

  console.log(JSON.stringify({
    status: result.acceptanceDecision,
    candidateCount: result.candidateCount,
    independentlyPassedCount: result.independentlyPassedCount,
    exactTargetCoverage: result.exactTargetCoverage,
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false
  }, null, 2));
}

main();
