/**
 * Batch M — authorized single-candidate deep content-quality replacement.
 *
 * Scope is intentionally limited to SAT4 / sat-series-a-mock-04-rw-038.
 * The replacement was independently reviewed, compatibility-adjusted to the
 * production target's medium difficulty, and passed a cloned 30-mock
 * controlled-replacement validation with no new calibration regression.
 */

const EXPECTED_TEST_KEY = 'SAT4';
const EXPECTED_TEST_ID = 'sat-series-a-mock-04';
const EXPECTED_QUESTION_ID = 'sat-series-a-mock-04-rw-038';
const EXPECTED_DOMAIN = 'craft-and-structure';
const EXPECTED_SKILL = 'Words in Context';
const EXPECTED_DIFFICULTY = 'medium';
const EXPECTED_OLD_TARGET = 'qualify';
const REPLACEMENT_CANDIDATE_ID = 'SAT4-BATCHM-DQ-0004';
const REPLACEMENT_DATE = '2026-09-17';

const REPLACEMENT = Object.freeze({
  prompt: 'The research report initially described a new irrigation method as increasing crop yields in every trial. A later analysis qualified that broad claim by showing that the increase occurred only under cooler conditions. The added condition did not erase the original finding; it narrowed the circumstances in which the finding applied.\n\nIn this context, the word “qualified” most nearly means which of the following?',
  choices: [
    'limited the claim by adding a condition',
    'confirmed the claim under every condition',
    'removed the evidence supporting the claim',
    'translated the claim into numerical terms',
  ],
  answer: 'A',
  explanation: 'The report first makes a broad claim that the method increased yields in every trial, then adds the condition that the increase occurred only under cooler conditions. Because that later detail narrows the original claim, “qualified” means limited the claim by adding a condition.',
  originalityFingerprint: 'batch-m-deep-single-candidate-v4-SAT4-qualified-irrigation-condition-medium-compatibility',
});

const clone = (value) => JSON.parse(JSON.stringify(value));
const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');

export function applyBatchMDeepContentQualitySingleCandidateProductionReplacement(mock, testKey = EXPECTED_TEST_KEY) {
  if (!mock) return mock;
  const key = String(testKey || mock.testId || '').trim().toUpperCase();
  if (key !== EXPECTED_TEST_KEY && mock.testId !== EXPECTED_TEST_ID) return mock;
  if (mock.testId !== EXPECTED_TEST_ID) {
    throw new Error(`Batch M deep single-candidate replacement: expected ${EXPECTED_TEST_ID}, found ${mock.testId}`);
  }

  const output = clone(mock);
  const records = output.readingWriting || [];
  const index = records.findIndex((record) => record?.questionId === EXPECTED_QUESTION_ID);
  if (index < 0) throw new Error(`Batch M deep single-candidate replacement: target ${EXPECTED_QUESTION_ID} not found`);

  const target = records[index];
  if (target.domain !== EXPECTED_DOMAIN) throw new Error(`Batch M deep single-candidate replacement: target domain mismatch (${target.domain})`);
  if (target.skill !== EXPECTED_SKILL) throw new Error(`Batch M deep single-candidate replacement: target skill mismatch (${target.skill})`);
  if (target.difficulty !== EXPECTED_DIFFICULTY) throw new Error(`Batch M deep single-candidate replacement: target difficulty mismatch (${target.difficulty})`);
  if (!normalize(target.prompt).includes(EXPECTED_OLD_TARGET)) throw new Error('Batch M deep single-candidate replacement: target no longer contains the expected fixed WIC target');

  const replacement = {
    ...target,
    prompt: REPLACEMENT.prompt,
    choices: clone(REPLACEMENT.choices),
    answer: REPLACEMENT.answer,
    explanation: REPLACEMENT.explanation,
    originalityFingerprint: REPLACEMENT.originalityFingerprint,
    metadata: {
      ...(target.metadata || {}),
      candidateOnly: false,
      productionMutation: true,
      releaseEligibility: false,
      controlledReplacement: {
        ...(target.metadata?.controlledReplacement || {}),
        date: REPLACEMENT_DATE,
        authorization: 'explicit-user-authorization',
        scope: 'single-candidate-deep-content-quality',
        testKey: EXPECTED_TEST_KEY,
        replacedQuestionId: EXPECTED_QUESTION_ID,
        candidateQuestionId: REPLACEMENT_CANDIDATE_ID,
        targetWordBefore: EXPECTED_OLD_TARGET,
        targetWordAfter: 'qualified',
      },
      deepContentQualityReplacement: {
        stage: 'batch-m-deep-content-quality-single-candidate',
        reviewStatus: 'PASS',
        compatibilityDifficulty: EXPECTED_DIFFICULTY,
        validationStatus: 'PASS_NO_NEW_CALIBRATION_REGRESSION',
      },
    },
  };

  if (replacement.testId !== EXPECTED_TEST_ID || replacement.questionId !== EXPECTED_QUESTION_ID) {
    throw new Error('Batch M deep single-candidate replacement: production identity changed');
  }
  if (replacement.domain !== EXPECTED_DOMAIN || replacement.skill !== EXPECTED_SKILL || replacement.difficulty !== EXPECTED_DIFFICULTY) {
    throw new Error('Batch M deep single-candidate replacement: production classification changed');
  }
  if (normalize(replacement.prompt).includes(`“${EXPECTED_OLD_TARGET}”`)) {
    throw new Error('Batch M deep single-candidate replacement: old fixed WIC target remains in prompt');
  }
  if (!normalize(replacement.prompt).includes('qualified')) {
    throw new Error('Batch M deep single-candidate replacement: repaired WIC target is missing');
  }
  if (replacement.answer !== 'A') throw new Error('Batch M deep single-candidate replacement: keyed answer changed');

  output.readingWriting[index] = replacement;
  return output;
}

export const BATCH_M_DEEP_CONTENT_QUALITY_SINGLE_CANDIDATE_PRODUCTION_REPLACEMENT = Object.freeze({
  date: REPLACEMENT_DATE,
  status: 'authorized-production-replacement-active',
  productionMutation: true,
  releaseEligible: false,
  sat21Created: false,
  replacementCount: 1,
  testKey: EXPECTED_TEST_KEY,
  testId: EXPECTED_TEST_ID,
  questionId: EXPECTED_QUESTION_ID,
  candidateId: REPLACEMENT_CANDIDATE_ID,
  targetWordBefore: EXPECTED_OLD_TARGET,
  targetWordAfter: 'qualified',
  authorization: 'explicit-user-authorization',
});

export default applyBatchMDeepContentQualitySingleCandidateProductionReplacement;
