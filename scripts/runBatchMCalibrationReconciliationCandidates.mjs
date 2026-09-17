import fs from 'node:fs';
import { generateRemediatedRWCandidates } from '../src/data/sat/mockContent/verbalConstructionRemediated';
import { evaluateContentQualityBatch } from '../src/data/sat/mockContent/batchMContentQualityGate';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore';
import { runBatchMFinalCorpusGate } from '../src/data/sat/mockContent/batchMFinalCorpusGate';
import { runBatchMCrossCorpusCalibrationCanonical } from '../src/data/sat/mockContent/batchMCrossCorpusCalibrationCanonical';
import { BATCH_M_PRODUCTION_SEQUENCE } from '../src/data/sat/mockContent/batchMProductionController';

const OUTPUT_DIR = process.env.BATCH_M_OUTPUT_DIR || 'artifacts/batch-m-calibration-reconciliation-candidates';
const OUTPUT_JSON = `${OUTPUT_DIR}/BATCH-M-CALIBRATION-RECONCILIATION-CANDIDATES-2026-09-17.json`;
const OUTPUT_MD = `${OUTPUT_DIR}/BATCH-M-CALIBRATION-RECONCILIATION-CANDIDATES-2026-09-17.md`;

const EXPECTED_TOTAL = 195;
const SOURCE_COUNTS = { 'craft-and-structure': 65, 'information-and-ideas': 130 };
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
const pass = (item) => item?.quality?.verdict === 'pass';
const fail = (message) => { throw new Error(`Batch M calibration reconciliation candidates: ${message}`); };

function stats(corpus) {
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
    return { domain, target, actual, delta, withinTarget: Math.abs(delta) <= HARD_LIMIT };
  });
  return { total, counts, findings, failures: findings.filter((item) => !item.withinTarget) };
}

function interleaveByTest(candidates) {
  const buckets = new Map();
  for (const candidate of candidates) {
    if (!buckets.has(candidate.testId)) buckets.set(candidate.testId, []);
    buckets.get(candidate.testId).push(candidate);
  }
  const output = [];
  let remaining = true;
  while (remaining) {
    remaining = false;
    for (const bucket of buckets.values()) {
      if (bucket.length) {
        output.push(bucket.shift());
        remaining = true;
      }
    }
  }
  return output;
}

function collectCandidates() {
  const pool = [];
  for (const target of BATCH_M_PRODUCTION_SEQUENCE) {
    const generated = generateRemediatedRWCandidates({
      count: 125,
      testId: target.testKey,
      variant: target.variant,
      module: 'reading-writing-module-1',
    });
    generated.candidates.forEach((candidate, index) => pool.push({ candidate, quality: generated.quality[index] }));
  }
  return interleaveByTest(pool.filter(pass).map(({ candidate }) => candidate).filter((candidate) => canonical(candidate.domain) === TARGET_DOMAIN));
}

function selectDistinct(candidates, sourceDomain, count, excludedFingerprints = new Set()) {
  const selected = [];
  const seen = new Set(excludedFingerprints);
  for (const candidate of candidates) {
    const fingerprint = String(candidate.originalityFingerprint || candidate.questionId);
    if (seen.has(fingerprint)) continue;
    selected.push({ candidate, replacementSourceDomain: sourceDomain });
    seen.add(fingerprint);
    if (selected.length === count) break;
  }
  if (selected.length !== count) fail(`only ${selected.length}/${count} distinct SEC candidates available for ${sourceDomain}`);
  return selected;
}

function chooseTarget(records, candidate, usedQuestionIds, sourceDomain) {
  return records.find((record) =>
    !usedQuestionIds.has(record.questionId) &&
    canonical(record.domain) === canonical(sourceDomain) &&
    record.difficulty === candidate.difficulty,
  ) || null;
}

function getProductionTestId(testKey) {
  const target = BATCH_M_PRODUCTION_SEQUENCE.find((item) => item.testKey === testKey);
  if (!target) fail(`unknown Batch M testKey ${testKey}`);
  return target.testId;
}

function main() {
  const baselineCorpus = clone(BATCH_M_ACCEPTED_PRODUCTION_CORPUS);
  const baselineCalibration = runBatchMCrossCorpusCalibrationCanonical(baselineCorpus);
  const baselineRW = stats(baselineCorpus);
  const baselineFailureKeys = [
    ...(baselineCalibration.calibration?.failures || []),
    ...baselineRW.failures.map((item) => `rw-domain:${item.domain}`),
  ];

  const pool = collectCandidates();
  const craft = selectDistinct(pool, 'craft-and-structure', SOURCE_COUNTS['craft-and-structure']);
  const usedFingerprints = new Set(craft.map((item) => String(item.candidate.originalityFingerprint || item.candidate.questionId)));
  const info = selectDistinct(pool, 'information-and-ideas', SOURCE_COUNTS['information-and-ideas'], usedFingerprints);
  const selections = [...craft, ...info];
  const selectedCandidates = selections.map(({ candidate }) => candidate);

  const contentQuality = evaluateContentQualityBatch(selectedCandidates);
  if (!contentQuality.passed || contentQuality.passedCount !== EXPECTED_TOTAL) {
    fail(`candidate quality gate failed: ${contentQuality.failedCount} failures across ${EXPECTED_TOTAL} candidates`);
  }

  const candidateRecords = selections.map(({ candidate, replacementSourceDomain }, index) => ({
    id: `BATCH-M-CAL-REC-${String(index + 1).padStart(3, '0')}`,
    sourceCandidateQuestionId: candidate.questionId,
    testKey: candidate.testId,
    productionTestId: getProductionTestId(candidate.testId),
    assessmentVariant: candidate.assessmentVariant,
    section: 'reading-writing',
    module: candidate.module || 'reading-writing-module-1',
    domain: TARGET_DOMAIN,
    skill: candidate.skill,
    difficulty: candidate.difficulty,
    questionType: candidate.questionType,
    stimulusType: candidate.stimulusType,
    sourceType: candidate.sourceType,
    sourceDomain: replacementSourceDomain,
    targetDomain: TARGET_DOMAIN,
    prompt: candidate.prompt,
    choices: candidate.choices,
    answer: candidate.answer,
    explanation: candidate.explanation,
    originalityFingerprint: candidate.originalityFingerprint,
    metadata: candidate.metadata,
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
  }));

  const hypotheticalCorpus = clone(baselineCorpus);
  const usedTargets = new Set();
  const assignments = [];
  const exactPromptSet = new Set();

  for (const item of candidateRecords) {
    const mock = hypotheticalCorpus.find((entry) => entry?.testId === item.productionTestId);
    if (!mock) fail(`no canonical production mock found for ${item.testKey}/${item.productionTestId}`);
    const target = chooseTarget(mock.readingWriting || [], item, usedTargets, item.sourceDomain);
    if (!target) fail(`no same-difficulty ${item.sourceDomain} target available in ${item.testKey}`);
    if (exactPromptSet.has(normalizePrompt(item.prompt))) fail(`duplicate candidate prompt selected: ${item.sourceCandidateQuestionId}`);

    const index = mock.readingWriting.findIndex((record) => record.questionId === target.questionId);
    if (index < 0) fail(`resolved target ${target.questionId} disappeared from ${item.testKey}`);

    mock.readingWriting[index] = {
      ...clone(target),
      domain: TARGET_DOMAIN,
      prompt: item.prompt,
      choices: clone(item.choices),
      answer: item.answer,
      explanation: item.explanation,
      originalityFingerprint: item.originalityFingerprint || target.originalityFingerprint,
    };
    usedTargets.add(target.questionId);
    exactPromptSet.add(normalizePrompt(item.prompt));
    assignments.push({
      candidateId: item.id,
      sourceCandidateQuestionId: item.sourceCandidateQuestionId,
      testKey: item.testKey,
      productionTestId: mock.testId,
      questionId: target.questionId,
      sourceDomain: item.sourceDomain,
      targetDomain: TARGET_DOMAIN,
      candidateDifficulty: item.difficulty,
      productionTargetDifficulty: target.difficulty,
      difficultyPreserved: target.difficulty === item.difficulty,
    });
  }

  if (assignments.length !== EXPECTED_TOTAL) fail(`only ${assignments.length}/${EXPECTED_TOTAL} deterministic hypothetical assignments resolved`);
  if (assignments.some((item) => !item.difficultyPreserved)) fail('difficulty preservation failed for one or more hypothetical assignments');

  const postCalibration = runBatchMCrossCorpusCalibrationCanonical(hypotheticalCorpus);
  const postRW = stats(hypotheticalCorpus);
  const postFailureKeys = [
    ...(postCalibration.calibration?.failures || []),
    ...postRW.failures.map((item) => `rw-domain:${item.domain}`),
  ];
  const newFailures = postFailureKeys.filter((key) => !baselineFailureKeys.includes(key));

  const finalCorpusGate = runBatchMFinalCorpusGate(hypotheticalCorpus);
  if (!finalCorpusGate.passed) fail('hypothetical calibration reconciliation failed the final 30-mock corpus gate');
  if (newFailures.length) fail(`hypothetical reconciliation introduced new calibration failures: ${JSON.stringify(newFailures)}`);

  const result = {
    reportType: 'batch-m-calibration-reconciliation-candidates',
    date: '2026-09-17',
    baseline: {
      rw: baselineRW,
      crossCorpusCalibrationPassed: baselineCalibration.passed,
      failures: baselineFailureKeys,
    },
    candidatePlan: {
      totalCandidates: EXPECTED_TOTAL,
      targetDomain: TARGET_DOMAIN,
      sourceCounts: SOURCE_COUNTS,
      contentQualityPassed: contentQuality.passed,
      assignmentsResolved: assignments.length,
      difficultyPreservationFailures: assignments.filter((item) => !item.difficultyPreserved).length,
    },
    hypotheticalPostState: {
      rw: postRW,
      crossCorpusCalibrationPassed: postCalibration.passed,
      failures: postFailureKeys,
      newFailuresIntroduced: newFailures,
      finalCorpusGatePassed: finalCorpusGate.passed,
      mockCount: finalCorpusGate.mockCount,
      totalRecords: finalCorpusGate.totalRecords,
    },
    assignments,
    candidates: candidateRecords,
    productionMutation: false,
    releaseEligible: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    sat21Created: false,
    decision: 'CALIBRATION_RECONCILIATION_CANDIDATES_VALIDATED_PENDING_INDEPENDENT_REVIEW_AND_EXPLICIT_PRODUCTION_AUTHORIZATION',
    nextStep: 'Run independent review on these 195 SEC candidates, then resolve exact targets and obtain fresh explicit authorization before production mutation.',
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2));
  fs.writeFileSync(OUTPUT_MD, [
    '# Batch M calibration reconciliation candidates — 2026-09-17',
    '',
    '- Candidate-only calibration reconciliation; **production is unchanged**.',
    `- Proposed SEC increase: **${EXPECTED_TOTAL}** R&W replacements.`,
    `- Source redistribution: **${SOURCE_COUNTS['craft-and-structure']} Craft and Structure + ${SOURCE_COUNTS['information-and-ideas']} Information and Ideas → Standard English Conventions**.`,
    `- Candidate quality gate: **${contentQuality.passed ? 'PASS' : 'FAIL'}**.`,
    `- Hypothetical assignments resolved: **${assignments.length}/${EXPECTED_TOTAL}**.`,
    `- Hypothetical final 30-mock corpus gate: **${finalCorpusGate.passed ? 'PASS' : 'FAIL'}**.`,
    `- New calibration failures introduced: **${newFailures.length}**.`,
    `- Hypothetical R&W SEC proportion: **${((postRW.findings.find((item) => item.domain === TARGET_DOMAIN)?.actual || 0) * 100).toFixed(2)}%**.`,
    '- Production mutation: **false**.',
    '- Replacement authorization: **NOT_AUTHORIZED**.',
    '- SAT21 created: **false**.',
    '',
    'This artifact is a candidate-only reconciliation plan. It does not authorize or perform the proposed production replacements.',
  ].join('\n') + '\n');

  console.log(JSON.stringify({
    decision: result.decision,
    totalCandidates: EXPECTED_TOTAL,
    assignmentsResolved: assignments.length,
    contentQualityPassed: contentQuality.passed,
    finalCorpusGatePassed: finalCorpusGate.passed,
    newCalibrationFailures: newFailures.length,
    hypotheticalRwSECProportion: postRW.findings.find((item) => item.domain === TARGET_DOMAIN)?.actual ?? null,
    productionMutation: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    sat21Created: false,
  }, null, 2));
}

main();
