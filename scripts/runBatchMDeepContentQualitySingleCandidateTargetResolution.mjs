import fs from 'node:fs';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore';

const CANDIDATE_INPUT = process.env.BATCH_M_SINGLE_CANDIDATE_REMEDIATION_INPUT ||
  'artifacts/batch-m-deep-content-quality-single-candidate-remediation/BATCH-M-DEEP-CONTENT-QUALITY-SINGLE-CANDIDATE-REMEDIATION-2026-09-17.json';
const REVIEW_INPUT = process.env.BATCH_M_SINGLE_CANDIDATE_REVIEW_INPUT ||
  'artifacts/batch-m-deep-content-quality-single-candidate-remediation-review/BATCH-M-DEEP-CONTENT-QUALITY-INDEPENDENT-REVIEW-2026-09-17.json';
const OUTPUT_DIR = 'artifacts/batch-m-deep-content-quality-single-candidate-target-resolution';
const OUTPUT_JSON = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-SINGLE-CANDIDATE-TARGET-RESOLUTION-2026-09-17.json`;
const OUTPUT_MD = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-SINGLE-CANDIDATE-TARGET-RESOLUTION-2026-09-17.md`;

const EXPECTED_CANDIDATE_ID = 'SAT4-BATCHM-DQ-0004';
const EXPECTED_TEST_KEY = 'SAT4';
const EXPECTED_SKILL = 'Words in Context';
const TARGET_DOMAIN = 'craft-and-structure';
const FIXED_WIC_TARGET = 'qualify';
const TARGET_CLASS = 'rw-wic-target-diversity';

const clone = (value) => JSON.parse(JSON.stringify(value));
const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');

function getCandidate() {
  const report = JSON.parse(fs.readFileSync(CANDIDATE_INPUT, 'utf8'));
  const candidate = (report.candidates || []).find((item) => String(item.id) === EXPECTED_CANDIDATE_ID);
  if (!candidate) throw new Error(`Candidate ${EXPECTED_CANDIDATE_ID} was not found in ${CANDIDATE_INPUT}.`);
  const targets = candidate.metadata?.remediationPool?.targetClasses || [];
  if (!targets.includes(TARGET_CLASS)) throw new Error(`Candidate ${EXPECTED_CANDIDATE_ID} is not marked for ${TARGET_CLASS}.`);
  if (String(candidate.testId).toUpperCase() !== EXPECTED_TEST_KEY) throw new Error(`Expected candidate testId ${EXPECTED_TEST_KEY}, found ${candidate.testId}.`);
  if (String(candidate.skill || '') !== EXPECTED_SKILL) throw new Error(`Expected candidate skill ${EXPECTED_SKILL}, found ${candidate.skill}.`);
  if (String(candidate.domain || '') !== TARGET_DOMAIN) throw new Error(`Expected candidate domain ${TARGET_DOMAIN}, found ${candidate.domain}.`);
  if (!['easy', 'medium', 'hard'].includes(String(candidate.difficulty))) throw new Error(`Candidate difficulty is missing or invalid: ${candidate.difficulty}`);
  if (candidate.metadata?.productionMutation === true || candidate.releaseEligibility === true || candidate.status === 'operational') {
    throw new Error('Candidate violates the candidate-only production boundary.');
  }
  return candidate;
}

function verifyIndependentReview() {
  const report = JSON.parse(fs.readFileSync(REVIEW_INPUT, 'utf8'));
  if (report.sourceSelectedCount !== 1 || report.counts?.pass !== 1 || report.counts?.fail !== 0 || report.counts?.expertReview !== 0) {
    throw new Error(`Single-candidate review gate is not PASS: ${JSON.stringify({ sourceSelectedCount: report.sourceSelectedCount, counts: report.counts }, null, 2)}`);
  }
  const reviewItem = (report.review || []).find((item) => String(item.id) === EXPECTED_CANDIDATE_ID);
  if (!reviewItem || reviewItem.status !== 'PASS') throw new Error('The repaired candidate does not have an individual PASS review record.');
  return report;
}

function buildEligibleTargetPool(candidate) {
  const mock = BATCH_M_ACCEPTED_PRODUCTION_CORPUS.find((item) => item?.testId === 'sat-series-a-mock-04');
  if (!mock) throw new Error('Canonical SAT4 production mock was not found.');

  return (mock.readingWriting || [])
    .filter((record) => {
      if (String(record.skill || '') !== EXPECTED_SKILL) return false;
      if (String(record.domain || '') !== TARGET_DOMAIN) return false;
      if (String(record.difficulty || '') !== String(candidate.difficulty)) return false;
      if (record.metadata?.controlledReplacement) return false;
      const prompt = normalize(record.prompt);
      return prompt.includes(FIXED_WIC_TARGET);
    })
    .map((record) => ({
      testKey: EXPECTED_TEST_KEY,
      testId: record.testId,
      questionId: record.questionId,
      contentId: record.contentId,
      section: record.section,
      domain: record.domain,
      difficulty: record.difficulty,
      skill: record.skill,
      targetWord: FIXED_WIC_TARGET,
      prompt: record.prompt,
    }))
    .sort((a, b) => String(a.questionId).localeCompare(String(b.questionId)));
}

function main() {
  const candidate = getCandidate();
  const review = verifyIndependentReview();
  const eligibleTargets = buildEligibleTargetPool(candidate);
  if (!eligibleTargets.length) throw new Error(`No eligible SAT4 fixed-WIC production targets matched candidate domain=${TARGET_DOMAIN}, skill=${EXPECTED_SKILL}, difficulty=${candidate.difficulty}.`);

  const sourceIndex = Number(candidate.metadata?.remediationPool?.sourceIndex);
  if (!Number.isInteger(sourceIndex) || sourceIndex < 0) throw new Error('Candidate sourceIndex is missing or invalid.');

  const targetOrdinal = sourceIndex % eligibleTargets.length;
  const target = eligibleTargets[targetOrdinal];

  const result = {
    reportType: 'batch-m-deep-content-quality-single-candidate-target-resolution',
    date: '2026-09-17',
    candidateId: EXPECTED_CANDIDATE_ID,
    candidateReview: {
      workflowRunId: 35200787784,
      status: 'PASS',
      sourceSelectedCount: review.sourceSelectedCount,
      counts: review.counts,
    },
    targetResolutionBasis: {
      testKey: EXPECTED_TEST_KEY,
      targetClass: TARGET_CLASS,
      domain: TARGET_DOMAIN,
      skill: EXPECTED_SKILL,
      difficulty: candidate.difficulty,
      existingFixedTarget: FIXED_WIC_TARGET,
      selectionRule: 'deterministic target-class assignment within the same mock after enforcing domain + skill + difficulty compatibility: sort eligible fixed-WIC targets by questionId and select sourceIndex modulo pool size',
      sourceIndex,
      targetOrdinal,
    },
    eligibleProductionTargetCount: eligibleTargets.length,
    target,
    proposedReplacement: {
      candidateId: candidate.id,
      candidateQuestionId: candidate.questionId,
      candidateTestId: candidate.testId,
      candidateDomain: candidate.domain,
      candidateDifficulty: candidate.difficulty,
      candidatePrompt: candidate.prompt,
      productionQuestionId: target.questionId,
      testKey: target.testKey,
    },
    productionMutation: false,
    releaseEligible: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    sat21Created: false,
    decision: 'TARGET_RESOLVED_PENDING_FRESH_EXPLICIT_PRODUCTION_REPLACEMENT_AUTHORIZATION',
    nextStep: 'Do not mutate production from this artifact alone. A separate controlled replacement stage must consume this exact testKey + questionId mapping under a fresh explicit authorization state.',
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(clone(result), null, 2));
  fs.writeFileSync(OUTPUT_MD, [
    '# Batch M single-candidate production target resolution — 2026-09-17',
    '',
    `- Candidate: **${EXPECTED_CANDIDATE_ID}**`,
    '- Independent review: **PASS**',
    `- Target class: **${TARGET_CLASS}**`,
    `- Candidate domain/difficulty: **${TARGET_DOMAIN} / ${candidate.difficulty}**`,
    `- Eligible SAT4 fixed-WIC targets after compatibility filtering: **${eligibleTargets.length}**`,
    `- Resolved target: **${target.testKey} / ${target.questionId}**`,
    `- Existing production WIC target: **${FIXED_WIC_TARGET}**`,
    '- Production mutation: **false**',
    '- Release eligible: **false**',
    '- Replacement authorization: **NOT_AUTHORIZED**',
    '- SAT21 created: **false**',
    '',
    'This artifact performs candidate-only deterministic target assignment with domain, skill, and difficulty compatibility. It does not authorize or perform production replacement.',
  ].join('\n') + '\n');

  console.log(JSON.stringify({
    decision: result.decision,
    candidateId: EXPECTED_CANDIDATE_ID,
    eligibleProductionTargetCount: eligibleTargets.length,
    testKey: target.testKey,
    questionId: target.questionId,
    difficulty: target.difficulty,
    productionMutation: false,
    releaseEligible: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    sat21Created: false,
  }, null, 2));
}

main();
