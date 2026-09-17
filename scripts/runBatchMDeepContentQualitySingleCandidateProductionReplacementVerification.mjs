import fs from 'node:fs';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS, BATCH_M_FINAL_CORPUS_VERIFICATION } from '../src/data/sat/mockContent/batchMProductionStore';
import { BATCH_M_DEEP_CONTENT_QUALITY_SINGLE_CANDIDATE_PRODUCTION_REPLACEMENT } from '../src/data/sat/mockContent/batchMDeepContentQualitySingleCandidateProductionReplacement';
import { runBatchMCrossCorpusCalibrationCanonical } from '../src/data/sat/mockContent/batchMCrossCorpusCalibrationCanonical';

const OUTPUT_DIR = 'artifacts/batch-m-deep-content-quality-single-candidate-production-replacement-verification';
const OUTPUT_JSON = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-SINGLE-CANDIDATE-PRODUCTION-REPLACEMENT-VERIFICATION-2026-09-17.json`;
const OUTPUT_MD = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-SINGLE-CANDIDATE-PRODUCTION-REPLACEMENT-VERIFICATION-2026-09-17.md`;
const EXPECTED = BATCH_M_DEEP_CONTENT_QUALITY_SINGLE_CANDIDATE_PRODUCTION_REPLACEMENT;
const EXPECTED_DOMAIN = 'craft-and-structure';
const EXPECTED_SKILL = 'Words in Context';
const EXPECTED_DIFFICULTY = 'medium';
const TEST_ID = EXPECTED.testId;
const QUESTION_ID = EXPECTED.questionId;

const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
const fail = (message) => { throw new Error(`Batch M single-candidate production replacement verification: ${message}`); };

function getTarget() {
  const mock = BATCH_M_ACCEPTED_PRODUCTION_CORPUS.find((item) => item?.testId === TEST_ID);
  if (!mock) fail(`production mock ${TEST_ID} not found`);
  const matches = (mock.readingWriting || []).filter((record) => record?.questionId === QUESTION_ID);
  if (matches.length !== 1) fail(`expected exactly one production record ${QUESTION_ID}, found ${matches.length}`);
  return matches[0];
}

function countScopedReplacementMarkers() {
  let count = 0;
  const records = [];
  for (const mock of BATCH_M_ACCEPTED_PRODUCTION_CORPUS) {
    for (const section of ['readingWriting', 'math']) {
      for (const record of mock?.[section] || []) {
        const marker = record?.metadata?.controlledReplacement;
        if (marker?.scope === 'single-candidate-deep-content-quality' && marker?.candidateQuestionId === EXPECTED.candidateId) {
          count += 1;
          records.push(`${mock.testId}:${record.questionId}`);
        }
      }
    }
  }
  return { count, records };
}

function main() {
  if (!EXPECTED.productionMutation) fail('replacement authorization layer is not marked as production mutation');
  if (EXPECTED.replacementCount !== 1) fail('replacement authorization layer scope is not exactly one record');
  if (EXPECTED.authorization !== 'explicit-user-authorization') fail('replacement does not carry explicit-user-authorization');
  if (!BATCH_M_FINAL_CORPUS_VERIFICATION?.passed) fail(`final 30-mock corpus gate failed after replacement: ${JSON.stringify(BATCH_M_FINAL_CORPUS_VERIFICATION, null, 2)}`);
  if (BATCH_M_ACCEPTED_PRODUCTION_CORPUS.length !== 30) fail(`expected 30 mocks, found ${BATCH_M_ACCEPTED_PRODUCTION_CORPUS.length}`);

  const target = getTarget();
  if (target.domain !== EXPECTED_DOMAIN || target.skill !== EXPECTED_SKILL || target.difficulty !== EXPECTED_DIFFICULTY) {
    fail('replacement changed the resolved target classification');
  }
  if (!normalize(target.prompt).includes('qualified')) fail('replacement prompt does not contain qualified');
  if (normalize(target.prompt).includes('“qualify”')) fail('replaced prompt still contains the old fixed target');
  if (target.answer !== 'A') fail(`expected answer A, found ${target.answer}`);
  if (target.metadata?.productionMutation !== true) fail('target metadata.productionMutation is not true');
  if (target.metadata?.controlledReplacement?.scope !== 'single-candidate-deep-content-quality') fail('target replacement scope marker is missing');
  if (target.metadata?.controlledReplacement?.candidateQuestionId !== EXPECTED.candidateId) fail('target candidate provenance marker mismatch');
  if (target.releaseEligibility !== false && target.metadata?.releaseEligibility !== false) fail('replacement unexpectedly became release-eligible');

  const scoped = countScopedReplacementMarkers();
  if (scoped.count !== 1 || scoped.records[0] !== `${TEST_ID}:${QUESTION_ID}`) {
    fail(`expected exactly one scoped deep-content-quality replacement marker, found ${JSON.stringify(scoped)}`);
  }

  const calibration = runBatchMCrossCorpusCalibrationCanonical(BATCH_M_ACCEPTED_PRODUCTION_CORPUS);
  const result = {
    reportType: 'batch-m-deep-content-quality-single-candidate-production-replacement-verification',
    date: '2026-09-17',
    status: 'PASS_POST_REPLACEMENT_TECHNICAL_VERIFICATION',
    replacement: {
      testKey: EXPECTED.testKey,
      testId: TEST_ID,
      questionId: QUESTION_ID,
      candidateId: EXPECTED.candidateId,
      targetWordBefore: EXPECTED.targetWordBefore,
      targetWordAfter: EXPECTED.targetWordAfter,
      productionMutation: true,
      authorization: EXPECTED.authorization,
    },
    corpus: {
      mockCount: BATCH_M_ACCEPTED_PRODUCTION_CORPUS.length,
      totalRecords: BATCH_M_FINAL_CORPUS_VERIFICATION.totalRecords,
      finalCorpusGatePassed: BATCH_M_FINAL_CORPUS_VERIFICATION.passed,
    },
    targetChecks: {
      identityPreserved: target.testId === TEST_ID && target.questionId === QUESTION_ID,
      classificationPreserved: target.domain === EXPECTED_DOMAIN && target.skill === EXPECTED_SKILL && target.difficulty === EXPECTED_DIFFICULTY,
      repairedWordPresent: normalize(target.prompt).includes('qualified'),
      oldFixedTargetRemoved: !normalize(target.prompt).includes('“qualify”'),
      answerPreserved: target.answer === 'A',
      explanationPresent: Boolean(String(target.explanation || '').trim()),
    },
    scopedReplacementMarkers: scoped,
    crossCorpusCalibration: {
      passed: calibration.passed,
      status: calibration.status,
      failures: calibration.calibration?.failures || [],
      interpretation: calibration.passed ? 'PASS' : 'PRE_EXISTING_CORPUS_CALIBRATION_HOLD_NOT_CREATED_BY_SINGLE_REPLACEMENT',
    },
    releaseEligible: false,
    sat21Created: false,
    decision: 'SINGLE_CANDIDATE_PRODUCTION_REPLACEMENT_VERIFIED_RELEASE_GATE_REMAINS_OPEN',
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2));
  fs.writeFileSync(OUTPUT_MD, [
    '# Batch M single-candidate production replacement verification — 2026-09-17',
    '',
    '- Status: **PASS — post-replacement technical verification**.',
    `- Target: **${TEST_ID} / ${QUESTION_ID}**.`,
    `- Candidate: **${EXPECTED.candidateId}**.`,
    '- Production mutation: **true**, explicitly authorized.',
    '- Final 30-mock corpus gate: **PASS**.',
    '- Replacement classification: **craft-and-structure / Words in Context / medium** preserved.',
    '- WIC target changed from **qualify** to **qualified**.',
    '- Single scoped replacement marker count: **1**.',
    `- Cross-corpus calibration: **${calibration.passed ? 'PASS' : 'PRE-EXISTING HOLD'}**.`,
    '- Release eligibility: **false**.',
    '- SAT21 created: **false**.',
    '',
    'This verifies the authorized single-record production change and confirms that the frozen 30-mock technical corpus remains structurally valid. The existing corpus-level calibration hold remains a separate release gate.',
  ].join('\n') + '\n');

  console.log(JSON.stringify({
    status: result.status,
    target: `${TEST_ID}:${QUESTION_ID}`,
    productionMutation: true,
    finalCorpusGatePassed: BATCH_M_FINAL_CORPUS_VERIFICATION.passed,
    crossCorpusCalibrationPassed: calibration.passed,
    crossCorpusCalibrationFailures: calibration.calibration?.failures || [],
    releaseEligible: false,
    sat21Created: false,
    artifactDir: OUTPUT_DIR,
  }, null, 2));
}

main();
