import fs from 'node:fs';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore';
import { BATCH_M_PRODUCTION_SEQUENCE } from '../src/data/sat/mockContent/batchMProductionController';

const REVIEW_INPUT = process.env.BATCH_M_RECONCILIATION_REVIEW_INPUT ||
  'artifacts/batch-m-calibration-reconciliation-candidate-review/BATCH-M-CALIBRATION-RECONCILIATION-CANDIDATE-REVIEW-2026-09-17.json';
const CANDIDATE_INPUT = process.env.BATCH_M_RECONCILIATION_CANDIDATE_INPUT ||
  'artifacts/batch-m-calibration-reconciliation-candidates/BATCH-M-CALIBRATION-RECONCILIATION-CANDIDATES-2026-09-17.json';
const OUTPUT_DIR = process.env.BATCH_M_RECONCILIATION_TARGET_LOCK_OUTPUT_DIR ||
  'artifacts/batch-m-calibration-reconciliation-target-lock';
const OUTPUT_JSON = `${OUTPUT_DIR}/BATCH-M-CALIBRATION-RECONCILIATION-TARGET-LOCK-2026-09-17.json`;
const OUTPUT_MD = `${OUTPUT_DIR}/BATCH-M-CALIBRATION-RECONCILIATION-TARGET-LOCK-2026-09-17.md`;

const EXPECTED_TOTAL = 195;
const EXPECTED_SOURCE_COUNTS = {
  'craft-and-structure': 65,
  'information-and-ideas': 130,
};
const TARGET_DOMAIN = 'standard-english-conventions';

const fail = (message) => { throw new Error(`Batch M calibration reconciliation target lock: ${message}`); };
const clone = (value) => JSON.parse(JSON.stringify(value));
const canonical = (value) => String(value ?? '').trim().toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function readJson(path) {
  if (!fs.existsSync(path)) fail(`required artifact not found: ${path}`);
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

function productionSequenceEntry(testId) {
  return BATCH_M_PRODUCTION_SEQUENCE.find((entry) => entry.testId === testId) || null;
}

function main() {
  const review = readJson(REVIEW_INPUT);
  const candidatePackage = readJson(CANDIDATE_INPUT);

  if (review.status !== 'PASS') fail(`independent review status is ${review.status || '(missing)'}`);
  if (review.productionBoundary?.productionMutation !== false) fail('review does not confirm productionMutation=false');
  if (review.productionBoundary?.releaseEligible !== false) fail('review does not confirm releaseEligible=false');
  if (review.productionBoundary?.replacementAuthorization !== 'NOT_AUTHORIZED') fail('review does not confirm replacement authorization is NOT_AUTHORIZED');
  if (review.productionBoundary?.sat21Created !== false) fail('review does not confirm SAT21=false');

  if (candidatePackage?.productionMutation !== false) fail('candidate package is not production-frozen');
  if (candidatePackage?.releaseEligible !== false) fail('candidate package is not release-ineligible');
  if (candidatePackage?.replacementAuthorization !== 'NOT_AUTHORIZED') fail('candidate package is not explicitly unauthorized');
  if (candidatePackage?.sat21Created !== false) fail('candidate package is not SAT21-free');

  const candidates = Array.isArray(candidatePackage.candidates) ? candidatePackage.candidates : [];
  const assignments = Array.isArray(candidatePackage.assignments) ? candidatePackage.assignments : [];
  if (candidates.length !== EXPECTED_TOTAL) fail(`expected ${EXPECTED_TOTAL} candidates, found ${candidates.length}`);
  if (assignments.length !== EXPECTED_TOTAL) fail(`expected ${EXPECTED_TOTAL} assignments, found ${assignments.length}`);
  if (review.candidateCounts?.total !== EXPECTED_TOTAL) fail('review does not report 195 candidates');
  if (review.targetCoverage?.assignmentCount !== EXPECTED_TOTAL) fail('review does not report 195 assignments');
  if (review.targetCoverage?.uniqueProductionTargets !== EXPECTED_TOTAL) fail('review does not report 195 unique production targets');

  const candidateById = new Map(candidates.map((candidate) => [candidate.id || candidate.questionId, candidate]));
  const productionTargetIds = new Set();
  const lockedTargets = [];
  const sourceCounts = {};

  for (const assignment of assignments) {
    const candidate = candidateById.get(assignment.candidateId);
    if (!candidate) fail(`assignment ${assignment.candidateId} has no candidate record`);
    if (productionTargetIds.has(assignment.questionId)) fail(`duplicate production target: ${assignment.questionId}`);
    productionTargetIds.add(assignment.questionId);

    if (assignment.targetDomain !== TARGET_DOMAIN) fail(`target ${assignment.questionId} is not SEC`);
    if (candidate.targetDomain !== TARGET_DOMAIN) fail(`candidate ${candidate.questionId} is not SEC`);
    if (canonical(assignment.sourceDomain) !== canonical(candidate.sourceDomain)) fail(`source domain mismatch for ${candidate.questionId}`);
    if (assignment.candidateDifficulty !== candidate.difficulty) fail(`candidate difficulty mismatch for ${candidate.questionId}`);
    if (assignment.productionTargetDifficulty !== candidate.difficulty) fail(`production target difficulty mismatch for ${candidate.questionId}`);
    if (assignment.difficultyPreserved !== true) fail(`difficulty preservation not confirmed for ${candidate.questionId}`);

    const productionMock = BATCH_M_ACCEPTED_PRODUCTION_CORPUS.find((mock) => mock.testId === assignment.productionTestId);
    if (!productionMock) fail(`production mock not found: ${assignment.productionTestId}`);

    const sequenceEntry = productionSequenceEntry(assignment.productionTestId);
    if (!sequenceEntry) fail(`production sequence does not contain ${assignment.productionTestId}`);
    if (sequenceEntry.testKey !== assignment.testKey) fail(`test key mismatch for ${assignment.productionTestId}`);

    const targetRecord = (productionMock.readingWriting || []).find((record) => record.questionId === assignment.questionId);
    if (!targetRecord) fail(`target question ${assignment.questionId} not found in ${assignment.productionTestId}`);
    if (canonical(targetRecord.domain) !== canonical(assignment.sourceDomain)) fail(`target domain mismatch for ${assignment.questionId}`);
    if (targetRecord.difficulty !== assignment.candidateDifficulty) fail(`target difficulty mismatch for ${assignment.questionId}`);

    const sourceDomain = canonical(assignment.sourceDomain);
    if (!EXPECTED_SOURCE_COUNTS[sourceDomain]) fail(`unsupported source domain ${assignment.sourceDomain}`);
    sourceCounts[sourceDomain] = (sourceCounts[sourceDomain] || 0) + 1;

    lockedTargets.push({
      lockId: `BATCH-M-CAL-LOCK-${String(lockedTargets.length + 1).padStart(3, '0')}`,
      candidateId: assignment.candidateId,
      sourceCandidateQuestionId: assignment.sourceCandidateQuestionId,
      testKey: assignment.testKey,
      productionTestId: assignment.productionTestId,
      questionId: assignment.questionId,
      targetDomain: TARGET_DOMAIN,
      sourceDomain: assignment.sourceDomain,
      difficulty: candidate.difficulty,
      currentProductionPromptFingerprint: targetRecord.originalityFingerprint || null,
      candidatePromptFingerprint: candidate.originalityFingerprint || null,
      targetIdentityPreserved: true,
      candidateOnly: true,
      productionMutation: false,
      releaseEligible: false,
      replacementAuthorization: 'NOT_AUTHORIZED',
      sat21Created: false,
    });
  }

  if (productionTargetIds.size !== EXPECTED_TOTAL) fail(`only ${productionTargetIds.size}/${EXPECTED_TOTAL} unique production targets locked`);
  for (const [domain, expected] of Object.entries(EXPECTED_SOURCE_COUNTS)) {
    if ((sourceCounts[domain] || 0) !== expected) fail(`expected ${expected} ${domain} targets, found ${sourceCounts[domain] || 0}`);
  }

  const mockCount = new Set(lockedTargets.map((item) => item.productionTestId)).size;
  if (mockCount !== BATCH_M_PRODUCTION_SEQUENCE.length) fail(`target lock covers ${mockCount} mocks, expected ${BATCH_M_PRODUCTION_SEQUENCE.length}`);

  const result = {
    reportType: 'batch-m-calibration-reconciliation-target-lock',
    date: '2026-09-17',
    reviewStatus: 'PASS',
    candidateCount: EXPECTED_TOTAL,
    targetCount: lockedTargets.length,
    uniqueProductionTargets: productionTargetIds.size,
    sourceCounts,
    productionMocksRepresented: mockCount,
    targetDomain: TARGET_DOMAIN,
    targets: lockedTargets,
    productionBoundary: {
      productionMutation: false,
      releaseEligible: false,
      replacementAuthorization: 'NOT_AUTHORIZED',
      sat21Created: false,
    },
    decision: 'CALIBRATION_RECONCILIATION_TARGETS_LOCKED_PENDING_FRESH_EXPLICIT_PRODUCTION_AUTHORIZATION',
    nextStep: 'Obtain fresh explicit production authorization for this exact 195-target lock, then run the separately controlled production replacement stage.',
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2));
  fs.writeFileSync(OUTPUT_MD, [
    '# Batch M calibration reconciliation target lock — 2026-09-17',
    '',
    '- Independent candidate review prerequisite: **PASS**.',
    `- Exact production targets locked: **${lockedTargets.length}/${EXPECTED_TOTAL}**.`,
    `- Allocation: **${sourceCounts['craft-and-structure']} Craft & Structure → SEC + ${sourceCounts['information-and-ideas']} Information & Ideas → SEC**.`,
    `- Production mocks represented: **${mockCount}**.`,
    '- Target identity and difficulty compatibility: **PASS**.',
    '- Production mutation: **false**.',
    '- Replacement authorization: **NOT_AUTHORIZED**.',
    '- SAT21 created: **false**.',
    '',
    'This is an exact target-lock artifact only. It authorizes no production mutation.',
  ].join('\n') + '\n');

  console.log(JSON.stringify({
    decision: result.decision,
    candidateCount: EXPECTED_TOTAL,
    targetCount: lockedTargets.length,
    uniqueProductionTargets: productionTargetIds.size,
    sourceCounts,
    productionMocksRepresented: mockCount,
    productionMutation: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    sat21Created: false,
  }, null, 2));
}

main();
