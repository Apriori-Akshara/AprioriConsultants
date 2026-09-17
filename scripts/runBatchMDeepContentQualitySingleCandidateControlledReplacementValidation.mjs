import fs from 'node:fs';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore';
import { runBatchMFinalCorpusGate } from '../src/data/sat/mockContent/batchMFinalCorpusGate';
import { runBatchMCrossCorpusCalibrationCanonical } from '../src/data/sat/mockContent/batchMCrossCorpusCalibrationCanonical';

const RESOLUTION_INPUT = process.env.BATCH_M_SINGLE_CANDIDATE_TARGET_RESOLUTION_INPUT ||
  'artifacts/batch-m-deep-content-quality-single-candidate-compatibility-target-resolution/BATCH-M-DEEP-CONTENT-QUALITY-SINGLE-CANDIDATE-TARGET-RESOLUTION-2026-09-17.json';
const CANDIDATE_INPUT = process.env.BATCH_M_SINGLE_CANDIDATE_COMPATIBILITY_INPUT ||
  'artifacts/batch-m-deep-content-quality-single-candidate-compatibility-remediation/BATCH-M-DEEP-CONTENT-QUALITY-SINGLE-CANDIDATE-COMPATIBILITY-REMEDIATION-2026-09-17.json';
const REVIEW_INPUT = process.env.BATCH_M_SINGLE_CANDIDATE_COMPATIBILITY_REVIEW_INPUT ||
  'artifacts/batch-m-deep-content-quality-single-candidate-compatibility-review/BATCH-M-DEEP-CONTENT-QUALITY-INDEPENDENT-REVIEW-2026-09-17.json';
const OUTPUT_DIR = 'artifacts/batch-m-deep-content-quality-single-candidate-controlled-replacement-validation';
const OUTPUT_JSON = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-SINGLE-CANDIDATE-CONTROLLED-REPLACEMENT-VALIDATION-2026-09-17.json`;
const OUTPUT_MD = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-SINGLE-CANDIDATE-CONTROLLED-REPLACEMENT-VALIDATION-2026-09-17.md`;

const EXPECTED_CANDIDATE_ID = 'SAT4-BATCHM-DQ-0004';
const EXPECTED_TEST_KEY = 'SAT4';
const EXPECTED_TEST_ID = 'sat-series-a-mock-04';
const EXPECTED_QUESTION_ID = 'sat-series-a-mock-04-rw-038';
const EXPECTED_DOMAIN = 'craft-and-structure';
const EXPECTED_SKILL = 'Words in Context';
const EXPECTED_DIFFICULTY = 'medium';
const EXPECTED_OLD_TARGET = 'qualify';

const clone = (value) => JSON.parse(JSON.stringify(value));
const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
const fail = (message) => { throw new Error(`Batch M single-candidate controlled replacement validation: ${message}`); };
const load = (file) => {
  if (!fs.existsSync(file)) fail(`missing required artifact ${file}`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
};

function assertCandidateOnly(candidate) {
  if (candidate.id !== EXPECTED_CANDIDATE_ID) fail(`unexpected candidate id ${candidate.id}`);
  if (String(candidate.testId).toUpperCase() !== EXPECTED_TEST_KEY) fail(`candidate testId must be ${EXPECTED_TEST_KEY}`);
  if (candidate.domain !== EXPECTED_DOMAIN) fail(`candidate domain must be ${EXPECTED_DOMAIN}`);
  if (candidate.skill !== EXPECTED_SKILL) fail(`candidate skill must be ${EXPECTED_SKILL}`);
  if (candidate.difficulty !== EXPECTED_DIFFICULTY) fail(`candidate difficulty must be ${EXPECTED_DIFFICULTY}`);
  if (candidate.metadata?.candidateOnly !== true) fail('candidateOnly must be true before validation');
  if (candidate.metadata?.productionMutation !== false) fail('candidate productionMutation must be false');
  if (candidate.releaseEligibility !== false) fail('candidate releaseEligibility must be false');
  if (candidate.status === 'operational') fail('candidate cannot be operational');
}

function verifyCandidateAndReview() {
  const remediation = load(CANDIDATE_INPUT);
  const candidate = (remediation.candidates || []).find((item) => item.id === EXPECTED_CANDIDATE_ID);
  if (!candidate) fail(`candidate ${EXPECTED_CANDIDATE_ID} not found`);
  assertCandidateOnly(candidate);

  const review = load(REVIEW_INPUT);
  if (review.sourceSelectedCount !== 1 || review.counts?.pass !== 1 || review.counts?.fail !== 0 || review.counts?.expertReview !== 0) {
    fail(`compatibility review is not a clean PASS: ${JSON.stringify({ sourceSelectedCount: review.sourceSelectedCount, counts: review.counts })}`);
  }
  const item = (review.review || []).find((entry) => entry.id === EXPECTED_CANDIDATE_ID);
  if (!item || item.status !== 'PASS') fail('compatibility candidate does not have an individual PASS review record');
  return { candidate, review };
}

function verifyTargetResolution() {
  const resolution = load(RESOLUTION_INPUT);
  if (resolution.candidateId !== EXPECTED_CANDIDATE_ID) fail('target-resolution candidateId mismatch');
  if (resolution.candidateReview?.status !== 'PASS') fail('target-resolution review status is not PASS');
  if (resolution.productionMutation !== false || resolution.releaseEligible !== false || resolution.sat21Created !== false) {
    fail('target-resolution artifact crosses the production boundary');
  }
  if (resolution.replacementAuthorization !== 'NOT_AUTHORIZED') fail('target-resolution artifact unexpectedly grants replacement authorization');
  if (resolution.decision !== 'TARGET_RESOLVED_PENDING_FRESH_EXPLICIT_PRODUCTION_REPLACEMENT_AUTHORIZATION') {
    fail('target-resolution artifact is not in the expected pending-authorization state');
  }

  const target = resolution.target || {};
  if (target.testKey !== EXPECTED_TEST_KEY) fail(`resolved target testKey must be ${EXPECTED_TEST_KEY}`);
  if (target.testId !== EXPECTED_TEST_ID) fail(`resolved target testId must be ${EXPECTED_TEST_ID}`);
  if (target.questionId !== EXPECTED_QUESTION_ID) fail(`resolved target questionId must be ${EXPECTED_QUESTION_ID}`);
  if (target.domain !== EXPECTED_DOMAIN) fail(`resolved target domain must be ${EXPECTED_DOMAIN}`);
  if (target.skill !== EXPECTED_SKILL) fail(`resolved target skill must be ${EXPECTED_SKILL}`);
  if (target.difficulty !== EXPECTED_DIFFICULTY) fail(`resolved target difficulty must be ${EXPECTED_DIFFICULTY}`);
  if (target.targetWord !== EXPECTED_OLD_TARGET) fail(`resolved production target word must be ${EXPECTED_OLD_TARGET}`);
  return resolution;
}

function assertPreReplacementPromptUniqueness(corpus, candidatePrompt) {
  const wanted = normalize(candidatePrompt);
  const matches = [];
  for (const mock of corpus) {
    for (const record of [...(mock.readingWriting || []), ...(mock.math || [])]) {
      if (normalize(record.prompt) === wanted) matches.push(`${mock.testId}:${record.questionId}`);
    }
  }
  if (matches.length) fail(`candidate prompt already exists in canonical corpus: ${matches.join(', ')}`);
}

function mergeForValidation(target, candidate, resolution) {
  const requiredSemanticFields = ['prompt', 'choices', 'answer', 'explanation'];
  for (const field of requiredSemanticFields) {
    if (!(field in candidate)) fail(`compatibility candidate is missing required semantic field ${field}`);
  }

  return {
    ...clone(target),
    prompt: candidate.prompt,
    choices: clone(candidate.choices),
    answer: candidate.answer,
    explanation: candidate.explanation,
    originalityFingerprint: candidate.originalityFingerprint || target.originalityFingerprint,
    metadata: {
      ...(target.metadata || {}),
      controlledReplacementValidation: {
        mode: 'hypothetical-corpus-validation-only',
        authorization: 'VALIDATION_ONLY_NOT_PRODUCTION_AUTHORIZED',
        date: '2026-09-17',
        testKey: resolution.targetResolutionBasis?.testKey,
        validatedQuestionId: target.questionId,
        candidateQuestionId: candidate.questionId,
      },
    },
  };
}

function applyHypotheticalReplacement(corpus, candidate, resolution) {
  const mock = corpus.find((item) => item?.testId === EXPECTED_TEST_ID);
  if (!mock) fail(`canonical production mock ${EXPECTED_TEST_ID} not found`);
  const index = (mock.readingWriting || []).findIndex((record) => record?.questionId === EXPECTED_QUESTION_ID);
  if (index < 0) fail(`canonical production target ${EXPECTED_QUESTION_ID} not found`);

  const target = mock.readingWriting[index];
  if (target.domain !== EXPECTED_DOMAIN || target.skill !== EXPECTED_SKILL || target.difficulty !== EXPECTED_DIFFICULTY) {
    fail('canonical target identity fields do not match the resolved target contract');
  }
  if (!normalize(target.prompt).includes(EXPECTED_OLD_TARGET)) fail(`canonical target does not contain the expected fixed word ${EXPECTED_OLD_TARGET}`);

  const beforePrompt = target.prompt;
  const replacement = mergeForValidation(target, candidate, resolution);

  if (replacement.testId !== target.testId || replacement.questionId !== target.questionId) fail('replacement changed production identity fields');
  if (replacement.domain !== target.domain || replacement.skill !== target.skill || replacement.difficulty !== target.difficulty) fail('replacement changed domain, skill, or difficulty');
  if (replacement.section !== target.section || replacement.module !== target.module) fail('replacement changed section or module identity');
  if (replacement.prompt === beforePrompt) fail('hypothetical replacement did not change the production prompt');
  if (!normalize(replacement.prompt).includes('qualified')) fail('replacement prompt does not contain the repaired target word qualified');
  if (normalize(replacement.prompt).includes(`“${EXPECTED_OLD_TARGET}”`)) fail('replacement prompt still tests the old fixed target word');
  if (replacement.answer !== 'A') fail('replacement keyed answer must remain A');
  if (replacement.explanation !== candidate.explanation) fail('replacement explanation differs from the independently reviewed candidate explanation');

  mock.readingWriting[index] = replacement;
  return { target, replacement };
}

function assertPostReplacementDiversity(corpus, target, replacement) {
  const prompt = normalize(replacement.prompt);
  const fixedOldTargetRecordIds = [];
  let exactPromptCount = 0;

  for (const mock of corpus) {
    for (const record of [...(mock.readingWriting || []), ...(mock.math || [])]) {
      if (normalize(record.prompt) === prompt) exactPromptCount += 1;
      if (record.section === 'reading-writing' && record.skill === EXPECTED_SKILL && normalize(record.prompt).includes(EXPECTED_OLD_TARGET)) {
        fixedOldTargetRecordIds.push(`${mock.testId}:${record.questionId}`);
      }
    }
  }

  if (exactPromptCount !== 1) fail(`post-replacement exact prompt count must be 1, found ${exactPromptCount}`);
  if (fixedOldTargetRecordIds.includes(`${target.testId}:${target.questionId}`)) fail('replaced target still appears as an old fixed-target item');

  return { exactPromptCount, fixedOldTargetRecordIds };
}

function main() {
  const { candidate, review } = verifyCandidateAndReview();
  const resolution = verifyTargetResolution();
  const corpus = clone(BATCH_M_ACCEPTED_PRODUCTION_CORPUS);

  assertPreReplacementPromptUniqueness(corpus, candidate.prompt);
  const { target, replacement } = applyHypotheticalReplacement(corpus, candidate, resolution);
  const diversity = assertPostReplacementDiversity(corpus, target, replacement);

  const finalCorpusGate = runBatchMFinalCorpusGate(corpus);
  if (!finalCorpusGate.passed) fail('hypothetical replacement failed the final 30-mock corpus gate');

  const crossCorpusCalibration = runBatchMCrossCorpusCalibrationCanonical(corpus);
  if (!crossCorpusCalibration.passed) {
    fail(`hypothetical replacement failed cross-corpus calibration: ${JSON.stringify(crossCorpusCalibration, null, 2)}`);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const result = {
    reportType: 'batch-m-deep-content-quality-single-candidate-controlled-replacement-validation',
    date: '2026-09-17',
    candidateId: EXPECTED_CANDIDATE_ID,
    resolution: {
      testKey: EXPECTED_TEST_KEY,
      testId: EXPECTED_TEST_ID,
      questionId: EXPECTED_QUESTION_ID,
      targetWordBefore: EXPECTED_OLD_TARGET,
      targetDifficulty: EXPECTED_DIFFICULTY,
    },
    candidateReview: {
      sourceSelectedCount: review.sourceSelectedCount,
      counts: review.counts,
      status: 'PASS',
    },
    hypotheticalReplacement: {
      productionQuestionId: target.questionId,
      candidateQuestionId: candidate.questionId,
      questionIdPreserved: replacement.questionId === target.questionId,
      testIdPreserved: replacement.testId === target.testId,
      domainPreserved: replacement.domain === target.domain,
      skillPreserved: replacement.skill === target.skill,
      difficultyPreserved: replacement.difficulty === target.difficulty,
      beforePrompt: target.prompt,
      afterPrompt: replacement.prompt,
      answer: replacement.answer,
      explanation: replacement.explanation,
    },
    diversityChecks: diversity,
    finalCorpusGate: {
      passed: finalCorpusGate.passed,
      status: finalCorpusGate.status,
      mockCount: finalCorpusGate.mockCount,
      totalRecords: finalCorpusGate.totalRecords,
      global: finalCorpusGate.global,
    },
    crossCorpusCalibration: {
      passed: crossCorpusCalibration.passed,
      status: crossCorpusCalibration.status,
      calibration: crossCorpusCalibration.calibration,
    },
    productionMutation: false,
    releaseEligible: false,
    replacementAuthorization: 'VALIDATION_ONLY_NOT_PRODUCTION_AUTHORIZED',
    sat21Created: false,
    decision: 'CONTROLLED_REPLACEMENT_VALIDATION_PASSED_PENDING_FRESH_EXPLICIT_PRODUCTION_AUTHORIZATION',
  };

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2));
  fs.writeFileSync(OUTPUT_MD, [
    '# Batch M single-candidate controlled replacement validation — 2026-09-17',
    '',
    `- Candidate: **${EXPECTED_CANDIDATE_ID}**`,
    `- Target: **${EXPECTED_TEST_KEY} / ${EXPECTED_QUESTION_ID}**`,
    '- Compatibility review: **PASS**.',
    '- Exact target identity preserved: **yes**.',
    '- Domain / skill / difficulty preserved: **craft-and-structure / Words in Context / medium**.',
    '- Candidate prompt uniqueness: **PASS**.',
    '- Repaired WIC target: **qualified**; prior fixed target: **qualify**.',
    `- Final 30-mock corpus gate: **${finalCorpusGate.passed ? 'PASS' : 'FAIL'}** (30 mocks / ${finalCorpusGate.totalRecords} records).`,
    `- Cross-corpus calibration: **${crossCorpusCalibration.passed ? 'PASS' : 'FAIL'}**.`,
    '- Production mutation during validation: **false**.',
    '- Release eligible: **false**.',
    '- SAT21 created: **false**.',
    '',
    'This is a hypothetical replacement validation against a cloned canonical production corpus. It does not modify production and does not authorize release.',
    '',
    'Next gate: fresh explicit production-replacement authorization, followed by the actual single-record replacement and post-replacement 30-mock/cross-corpus QC.',
  ].join('\n') + '\n');

  console.log(JSON.stringify({
    decision: result.decision,
    candidateId: EXPECTED_CANDIDATE_ID,
    testKey: EXPECTED_TEST_KEY,
    questionId: EXPECTED_QUESTION_ID,
    finalCorpusGatePassed: finalCorpusGate.passed,
    crossCorpusCalibrationPassed: crossCorpusCalibration.passed,
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
    artifactDir: OUTPUT_DIR,
  }, null, 2));
}

main();
