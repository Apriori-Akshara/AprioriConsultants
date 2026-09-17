/**
 * Batch M — independent review of the selected calibration candidate package.
 *
 * Review-only. This script never imports or mutates the production store.
 * It validates the selected candidate package against structural, allocation,
 * originality, and content-quality requirements before human authorization.
 */

import fs from 'node:fs';
import { evaluateContentQualityBatch } from '../src/data/sat/mockContent/batchMContentQualityGate.js';

const INPUT = process.env.BATCH_M_CANDIDATE_INPUT ||
  'artifacts/batch-m-calibration-candidate-selection/BATCH-M-CALIBRATION-CANDIDATE-SELECTION-2026-09-17.json';
const OUTPUT_DIR = process.env.BATCH_M_REVIEW_OUTPUT_DIR ||
  'artifacts/batch-m-calibration-candidate-review';

function fail(message) {
  throw new Error(`Calibration candidate review: ${message}`);
}

function allUnique(items) {
  return new Set(items).size === items.length;
}

function review() {
  if (!fs.existsSync(INPUT)) fail(`candidate package not found: ${INPUT}`);
  const packageData = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
  const rw = packageData?.selected?.rw?.candidates || [];
  const math = packageData?.selected?.math?.candidates || [];
  const all = [...rw, ...math];

  if (packageData.productionMutation !== false) fail('candidate package is not explicitly production-mutation false');
  if (packageData.releaseEligible !== false) fail('candidate package is not explicitly release-ineligible');
  if (packageData.sat21Created !== false) fail('candidate package is not explicitly SAT21-free');
  if (rw.length !== 195) fail(`expected 195 R&W candidates, found ${rw.length}`);
  if (math.length !== 157) fail(`expected 157 Math candidates, found ${math.length}`);

  const rwCS = rw.filter((item) => item.selection?.replacementSourceDomain === 'craft-and-structure');
  const rwII = rw.filter((item) => item.selection?.replacementSourceDomain === 'information-and-ideas');
  if (rwCS.length !== 65) fail(`expected 65 Craft & Structure allocations, found ${rwCS.length}`);
  if (rwII.length !== 130) fail(`expected 130 Information & Ideas allocations, found ${rwII.length}`);
  if (rw.some((item) => item.domain !== 'standard-english-conventions')) fail('R&W selection contains a non-SEC domain');
  if (math.some((item) => item.questionType !== 'student-produced-response')) fail('Math selection contains a non-SPR item');

  const fingerprints = all.map((item) => item.originalityFingerprint).filter(Boolean);
  if (fingerprints.length !== all.length) fail('one or more candidates is missing an originality fingerprint');
  if (!allUnique(fingerprints)) fail('duplicate originality fingerprints detected in selected package');

  const quality = evaluateContentQualityBatch(all);
  if (!quality.passed) fail(`review gate rejected ${quality.failedCount} candidate(s); serious failures: ${quality.seriousFailureCount}`);

  const testIds = [...new Set(all.map((item) => item.testId))];
  const result = {
    date: '2026-09-17',
    status: 'candidate-review-complete',
    reviewVersion: 'batch-m-calibration-review-v1',
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
    candidateCounts: { rw: rw.length, math: math.length, total: all.length },
    allocations: { craftAndStructureToSEC: rwCS.length, informationAndIdeasToSEC: rwII.length, mathSPR: math.length },
    coverage: { distinctTestIds: testIds.length, testIds },
    originality: { checked: fingerprints.length, unique: true },
    contentQuality: { passed: quality.passed, passedCount: quality.passedCount, failedCount: quality.failedCount, averageScore: quality.averageScore },
    authorization: {
      required: true,
      authorized: false,
      productionMutationPermitted: false,
      note: 'Automated review does not authorize production replacement. Explicit authorization is required as a separate step.'
    },
    nextBoundary: 'explicit-controlled-replacement-authorization-required-before-production-mutation'
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(`${OUTPUT_DIR}/BATCH-M-CALIBRATION-CANDIDATE-REVIEW-2026-09-17.json`, JSON.stringify(result, null, 2));
  fs.writeFileSync(`${OUTPUT_DIR}/BATCH-M-CALIBRATION-CANDIDATE-REVIEW-2026-09-17.md`, [
    '# Batch M calibration candidate review — 2026-09-17',
    '',
    '- Review status: **PASS**.',
    '- Candidates reviewed: **352**.',
    '- R&W: **195** (65 Craft & Structure → SEC; 130 Information & Ideas → SEC).',
    '- Math: **157** student-produced-response candidates.',
    `- Distinct test identities represented: **${testIds.length}**.`,
    '- Originality fingerprints: **352 checked / 352 unique**.',
    `- Content-quality gate: **${quality.passedCount}/${quality.itemCount} passed**; average score **${quality.averageScore}**.`,
    '',
    '## Production boundary',
    '',
    '- Production mutation: **false**.',
    '- Release eligibility: **false**.',
    '- SAT21 created: **false**.',
    '- Explicit controlled-replacement authorization: **NOT GRANTED** by automated review.',
    '',
    'The reviewed candidate package is ready for explicit human authorization. No production replacement is performed by this review step.',
    '',
    'Next: explicit controlled-replacement authorization, followed by a separately executed production replacement and rerun of the 30-mock corpus gate and cross-corpus calibration.',
  ].join('\n') + '\n');

  console.log(JSON.stringify(result, null, 2));
}

review();
