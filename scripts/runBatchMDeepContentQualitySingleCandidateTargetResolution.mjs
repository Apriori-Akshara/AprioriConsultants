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
const EXPECTED_SECTION = 'reading-writing';
const EXPECTED_SKILL = 'Words in Context';
const ORIGINAL_TARGET_WORD = 'clarify';

const clone = (value) => JSON.parse(JSON.stringify(value));

function getCandidate() {
  const report = JSON.parse(fs.readFileSync(CANDIDATE_INPUT, 'utf8'));
  const candidate = (report.candidates || []).find((item) => String(item.id) === EXPECTED_CANDIDATE_ID);
  if (!candidate) throw new Error(`Candidate ${EXPECTED_CANDIDATE_ID} was not found in ${CANDIDATE_INPUT}.`);
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

function productionMatches() {
  const sat4 = BATCH_M_ACCEPTED_PRODUCTION_CORPUS.find((mock) => mock?.testId === 'sat-series-a-mock-04');
  if (!sat4) throw new Error('Canonical SAT4 production mock was not found.');

  const matches = [];
  for (const record of sat4.readingWriting || []) {
    const prompt = String(record.prompt || '');
    const targetWord = String(record.metadata?.targetWord || '').trim();
    const wordMatch = targetWord.toLowerCase() === ORIGINAL_TARGET_WORD || new RegExp(`\\b${ORIGINAL_TARGET_WORD}\\b`, 'i').test(prompt);
    if (
      String(record.section || '') === EXPECTED_SECTION &&
      String(record.skill || '') === EXPECTED_SKILL &&
      wordMatch
    ) {
      matches.push({
        testKey: EXPECTED_TEST_KEY,
        testId: record.testId,
        questionId: record.questionId,
        contentId: record.contentId,
        domain: record.domain,
        difficulty: record.difficulty,
        skill: record.skill,
        metadataTargetWord: targetWord || null,
        prompt,
      });
    }
  }
  return matches;
}

function main() {
  const candidate = getCandidate();
  const review = verifyIndependentReview();
  const matches = productionMatches();

  if (matches.length !== 1) {
    const reason = matches.length === 0 ? 'NO_EXACT_PRODUCTION_TARGET' : 'MULTIPLE_EXACT_PRODUCTION_TARGETS';
    throw new Error(`Target-resolution gate ${reason}: expected exactly 1 SAT4 R&W Words-in-Context record for original target word “${ORIGINAL_TARGET_WORD}”, found ${matches.length}.`);
  }

  const target = matches[0];
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
      section: EXPECTED_SECTION,
      skill: EXPECTED_SKILL,
      originalTargetWord: ORIGINAL_TARGET_WORD,
      matchRule: 'exact test + section + skill + original target word in production metadata or prompt',
    },
    exactProductionTargetCount: matches.length,
    target,
    proposedReplacement: {
      candidateId: candidate.id,
      candidateQuestionId: candidate.questionId,
      candidateTestId: candidate.testId,
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
    `- Exact production targets found: **${matches.length}**`,
    `- Resolved target: **${target.testKey} / ${target.questionId}**`,
    `- Original target word: **${ORIGINAL_TARGET_WORD}**`,
    '- Production mutation: **false**',
    '- Release eligible: **false**',
    '- Replacement authorization: **NOT_AUTHORIZED**',
    '- SAT21 created: **false**',
    '',
    'This artifact resolves the exact production target but does not authorize or perform replacement.',
  ].join('\n') + '\n');

  console.log(JSON.stringify({
    decision: result.decision,
    candidateId: EXPECTED_CANDIDATE_ID,
    exactProductionTargetCount: matches.length,
    testKey: target.testKey,
    questionId: target.questionId,
    productionMutation: false,
    releaseEligible: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    sat21Created: false,
  }, null, 2));
}

main();
