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

function collectCandidates() {
  const pool = [];
  for (const target of BATCH_M_PRODUCTION_SEQUENCE) {
    const generated = generateRemediatedRWCandidates({
      count: 80,
      testId: target.testKey,
      variant: target.variant,
      module: 'reading-writing-module-1',
    });
    generated.candidates.forEach((candidate, index) => pool.push({ candidate, quality: generated.quality[index] }));
  }
  return pool.filter(pass).map(({ candidate }) => candidate);
}

function selectDistinct(candidates, sourceDomain, count) {
  const selected = [];
  const seen = new Set();
  const ordered = candidates
    .filter((candidate) => candidate.domain !== TARGET_DOMAIN)
    .sort((a, b) => String(a.questionId).localeCompare(String(b.questionId)));

  for (const candidate of ordered) {
    const fingerprint = String(candidate.originalityFingerprint || candidate.questionId);
    if (seen.has(fingerprint)) continue;
    selected.push({ candidate, replacementSourceDomain: sourceDomain });
    seen.add(fingerprint);
    if (selected.length === count) break;
  }
  if (selected.length !== count) fail(`only ${selected.length}/${count} distinct candidates available for ${sourceDomain}`);
  return selected;
}

function chooseTarget(records, candidate, usedQuestionIds, sourceDomain) {
  const eligible = records.filter((record) =>
    !usedQuestionIds.has(record.questionId) &&
    canonical(record.domain) === canonical(sourceDomain),
  );
  const exactDifficulty = eligible.find((record) => record.difficulty === candidate.difficulty);
  if (exactDifficulty) return exactDifficulty;
  const sameDomain = eligible[0];
  if (sameDomain) return sameDomain;
  return null;
}

function main() {
  const baselineCorpus = clone(BATCH_M_ACCEPTED_PRODUCTION_CORPUS);
  const baselineCalibration = runBatchMCrossCorpusCalibrationCanonical(baselineCorpus);
  const baselineRW = stats(baselineCorpus);
  const baselineFailureKeys = [
    ...(baselineCalibration.calibration?.failures || []),
    ...baselineRW.failures.map((item) => `rw-domain:${item.domain}`),
  ];

  if (baselineRW.findings.find((item) => item.domain === TARGET_DOMAIN)?.withinTarget !== true) {
    // Candidate planning may proceed only because this is the documented unresolved calibration deviation.
  }

  const pool = collectCandidates();
  const craft = selectDistinct(pool, 'craft-and-structure', SOURCE_COUNTS['craft-and-structure']);
  const info = selectDistinct(pool.filter(({ candidate }) => !craft.some((item) => item.candidate.originalityFingerprint === candidate.originalityFingerprint)), 'information-and-ideas', SOURCE_COUNTS['information-and-ideas']);
  const selections = [...craft, ...info];

  const candidateRecords = selections.map(({ candidate, replacementSourceDomain }, index) => ({
    id: `BATCH-M-CAL-REC-${String(index + 1).padStart(3, '0')}`,
    sourceCandidateQuestionId: candidate.questionId,
    testKey: candidate.testId,
    assessmentVariant: candidate.assessmentVariant,
    difficulty: candidate.difficulty,
    sourceDomain: replacementSourceDomain,
    targetDomain: TARGET_DOMAIN,
    skill: candidate.skill,
    prompt: candidate.prompt,
    choices: candidate.choices,
    answer: candidate.answer,
    explanation: candidate.explanation,
    originalityFingerprint: candidate.originalityFingerprint,
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
  }));

  const hypotheticalCorpus = clone(baselineCorpus);
  const usedTargets = new Set();
  const assignments = [];
  const exactPromptSet = new Set();

  for (const item of candidateRecords) {
    const mock = hypotheticalCorpus.find((entry) => entry?.testKey === item.testKey || entry?.assessmentNumber === item.testKey);
    if (!mock) continue;
    const target = chooseTarget(mock.readingWriting || [], item, usedTargets, item.sourceDomain);
    if (!target) continue;
    if (exactPromptSet.has(normalizePrompt(item.prompt))) continue;
    const index = mock.readingWriting.findIndex((record) => record.questionId === target.questionId);
    if (index < 0) continue;

    hypotheticalCorpus[hypotheticalCorpus.indexOf(mock)].readingWriting[index] = {
      ...clone(target),
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
      testKey: mock.testKey,
      questionId: target.questionId,
      sourceDomain: item.sourceDomain,
      targetDomain: TARGET_DOMAIN,
      difficultyPreserved: target.difficulty === item.difficulty,
    });
  }

  if (assignments.length !== EXPECTED_TOTAL) {
    fail(`only ${assignments.length}/${EXPECTED_TOTAL} deterministic hypothetical assignments could be resolved without violating the target-domain boundary`);
  }

  const contentQuality = evaluateContentQualityBatch(candidateRecords);
  if (!contentQuality.passed || contentQuality.passedCount !== EXPECTED_TOTAL) {
    fail(`candidate quality gate failed: ${contentQuality.failedCount} failures across ${EXPECTED_TOTAL} candidates`);
  }

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
    decision: 'CALIBRATION_RECONCILIATION_CANDIDATES_VALIDATED_PENDING_EXPLICIT_PRODUCTION_AUTHORIZATION',
    nextStep: 'Run independent candidate review, then resolve exact production targets and obtain fresh explicit authorization before any production mutation.',
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
    `- Hypothetical R&W SEC proportion: **${(postRW.findings.find((item) => item.domain === TARGET_DOMAIN)?.actual * 100).toFixed(2)}%**.`,
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
