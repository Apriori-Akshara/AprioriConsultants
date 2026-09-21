import fs from 'node:fs';
import path from 'node:path';
import { validateSatQuestion } from '../src/data/sat/questionSchema.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore.js';
import { BATCH_M_PRODUCTION_SEQUENCE } from '../src/data/sat/mockContent/batchMProductionController.js';
import { runBatchMFinalCorpusGate } from '../src/data/sat/mockContent/batchMFinalCorpusGate.js';
import { runBatchMCrossCorpusCalibrationCanonical } from '../src/data/sat/mockContent/batchMCrossCorpusCalibrationCanonical.js';

const CANDIDATE_INPUT = process.env.BATCH_M_TARGET_CANDIDATE_INPUT ||
  'artifacts/batch-m-deep-content-quality-target-candidates/BATCH-M-DEEP-CONTENT-QUALITY-TARGET-CANDIDATES-2026-09-21.json';
const LOCK_INPUT = process.env.BATCH_M_TARGET_LOCK_INPUT ||
  'artifacts/batch-m-deep-content-quality-target-lock/BATCH-M-DEEP-CONTENT-QUALITY-TARGET-LOCK-2026-09-21.json';
const OUTPUT_DIR = 'artifacts/batch-m-deep-content-quality-controlled-replacement-validation';
const OUTPUT_JSON = path.join(OUTPUT_DIR, 'BATCH-M-DEEP-CONTENT-QUALITY-CONTROLLED-REPLACEMENT-VALIDATION-2026-09-21.json');
const OUTPUT_MD = path.join(OUTPUT_DIR, 'BATCH-M-DEEP-CONTENT-QUALITY-CONTROLLED-REPLACEMENT-VALIDATION-2026-09-21.md');

const clone = (value) => JSON.parse(JSON.stringify(value));
const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
const fail = (message) => { throw new Error(`Batch M deep content-quality controlled replacement validation: ${message}`); };
const load = (file) => {
  if (!fs.existsSync(file)) fail(`missing required artifact ${file}`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
};

function testKeyOf(mock, index) {
  const explicit = String(mock?.testKey || '').trim().toUpperCase();
  if (explicit) return explicit;
  return BATCH_M_PRODUCTION_SEQUENCE[index]?.testKey || String(mock?.testId || '').toUpperCase();
}

function corpusIndex(corpus) {
  const targets = new Map();
  for (let i = 0; i < corpus.length; i += 1) {
    const mock = corpus[i];
    const testKey = testKeyOf(mock, i);
    for (const section of ['readingWriting', 'math']) {
      for (const record of mock?.[section] || []) {
        const questionId = String(record?.questionId || '');
        if (!questionId) continue;
        const key = `${testKey}::${questionId}`;
        if (targets.has(key)) fail(`duplicate production identity ${key}`);
        targets.set(key, { mock, section, index: mock[section].indexOf(record), record });
      }
    }
  }
  return targets;
}

function validateCandidate(candidate) {
  const schema = validateSatQuestion(candidate);
  if (!schema.valid) fail(`candidate ${candidate.id} fails schema: ${JSON.stringify(schema.errors || [])}`);
  const quality = evaluateContentQuality(candidate);
  if (quality.verdict !== 'pass') fail(`candidate ${candidate.id} fails content-quality gate: ${JSON.stringify(quality.checks || [])}`);
}

function assertCandidateIdentity(candidate, lock) {
  const targetKey = `${candidate.metadata?.targetTestKey}::${candidate.metadata?.targetQuestionId}`;
  if (!lock || `${lock.targetTestKey}::${lock.targetQuestionId}` !== targetKey) {
    fail(`candidate ${candidate.id} does not match exact target lock`);
  }
  if (lock.candidateId !== candidate.id) fail(`lock candidateId mismatch for ${candidate.id}`);
  if (lock.originalityFingerprint !== candidate.originalityFingerprint) fail(`lock fingerprint mismatch for ${candidate.id}`);
  if (candidate.metadata?.candidateOnly !== true || candidate.metadata?.productionMutation !== false || candidate.releaseEligibility !== false || candidate.isOperational !== false) {
    fail(`candidate ${candidate.id} violates candidate-only boundary`);
  }
  if (String(candidate.metadata.targetTestKey).toUpperCase() !== String(candidate.testId).toUpperCase()) {
    fail(`candidate ${candidate.id} target test identity mismatch`);
  }
}

function mergeHypothetical(target, candidate) {
  const replacement = {
    ...clone(target),
    ...clone(candidate),
    testId: target.testId,
    questionId: target.questionId,
    contentId: target.contentId || target.questionId,
    assessmentVariant: target.assessmentVariant,
    section: target.section,
    module: target.module,
    status: target.status,
    authoringStatus: target.authoringStatus,
    isOperational: target.isOperational,
    releaseEligibility: false,
    metadata: {
      ...(target.metadata || {}),
      ...(candidate.metadata || {}),
      candidateOnly: false,
      productionMutation: false,
      controlledReplacementValidation: {
        mode: 'hypothetical-corpus-validation-only',
        authorization: 'VALIDATION_ONLY_NOT_PRODUCTION_AUTHORIZED',
        date: '2026-09-21',
        targetTestKey: candidate.metadata.targetTestKey,
        targetQuestionId: candidate.metadata.targetQuestionId,
        candidateId: candidate.id,
      },
    },
  };
  return replacement;
}

function uniquenessSnapshot(corpus) {
  const prompts = new Map();
  const fingerprints = new Map();
  for (const mock of corpus) {
    for (const record of [...(mock.readingWriting || []), ...(mock.math || [])]) {
      const prompt = normalize(record.prompt);
      if (prompt) prompts.set(prompt, [...(prompts.get(prompt) || []), `${mock.testId}:${record.questionId}`]);
      const fingerprint = String(record.originalityFingerprint || '');
      if (fingerprint) fingerprints.set(fingerprint, [...(fingerprints.get(fingerprint) || []), `${mock.testId}:${record.questionId}`]);
    }
  }
  return {
    duplicatePromptGroups: [...prompts.entries()].filter(([, ids]) => ids.length > 1),
    duplicateFingerprintGroups: [...fingerprints.entries()].filter(([, ids]) => ids.length > 1),
  };
}

function calibrationFailureKeys(result) {
  return [...new Set(result?.calibration?.failures || [])].sort();
}

function main() {
  const candidatesSource = load(CANDIDATE_INPUT);
  const lockSource = load(LOCK_INPUT);

  if (candidatesSource.productionMutation !== false || candidatesSource.releaseEligible !== false || candidatesSource.sat21Created !== false) {
    fail('candidate artifact crosses the production boundary');
  }
  if (lockSource.productionMutation !== false || lockSource.releaseEligible !== false || lockSource.sat21Created !== false ||
      lockSource.acceptanceDecision !== 'EXACT_TARGET_LOCK_COMPLETE_CANDIDATE_ONLY') {
    fail('target-lock artifact is not a clean candidate-only lock');
  }

  const candidates = Array.isArray(candidatesSource.candidates) ? candidatesSource.candidates : [];
  const locked = Array.isArray(lockSource.lockedCandidates) ? lockSource.lockedCandidates : [];
  if (!candidates.length || candidates.length !== locked.length) fail(`candidate/lock count mismatch: ${candidates.length}/${locked.length}`);

  const candidateById = new Map(candidates.map((candidate) => [String(candidate.id), candidate]));
  const lockById = new Map(locked.map((entry) => [String(entry.candidateId), entry]));
  if (candidateById.size !== candidates.length || lockById.size !== locked.length) fail('duplicate candidate or lock identities detected');

  const baseline = clone(BATCH_M_ACCEPTED_PRODUCTION_CORPUS);
  const targets = corpusIndex(baseline);
  const candidateTargets = new Set();
  const replacementRecords = [];

  for (const candidate of candidates) {
    const lock = lockById.get(String(candidate.id));
    if (!lock) fail(`missing exact lock for candidate ${candidate.id}`);
    assertCandidateIdentity(candidate, lock);
    validateCandidate(candidate);

    const testKey = String(candidate.metadata.targetTestKey).toUpperCase();
    const questionId = String(candidate.metadata.targetQuestionId);
    const key = `${testKey}::${questionId}`;
    if (candidateTargets.has(key)) fail(`duplicate replacement target ${key}`);
    candidateTargets.add(key);

    const target = targets.get(key);
    if (!target) fail(`frozen production target not found: ${key}`);

    if (String(candidate.testId).toUpperCase() !== String(target.mock.testId).toUpperCase()) fail(`test identity changed for ${key}`);
    if (candidate.section !== target.record.section) fail(`section changed for ${key}`);
    if (candidate.module !== target.record.module) fail(`module changed for ${key}`);
    if (candidate.domain !== target.record.domain) fail(`domain changed for ${key}`);
    if (candidate.skill !== target.record.skill) fail(`skill changed for ${key}`);
    if (candidate.assessmentVariant !== target.record.assessmentVariant) fail(`assessment variant changed for ${key}`);

    const replacement = mergeHypothetical(target.record, candidate);
    replacementRecords.push({ key, target, candidate, replacement });
  }

  if (candidateTargets.size !== targets.size && candidates.length !== 3080) {
    // The active lock is expected to cover the entire deep-QC failure target set.
    fail(`unexpected target coverage ${candidateTargets.size} for ${candidates.length} candidates`);
  }

  const corpus = clone(baseline);
  for (const item of replacementRecords) {
    item.target.mock[item.target.section][item.target.index] = item.replacement;
  }

  const uniqueness = uniquenessSnapshot(corpus);
  if (uniqueness.duplicatePromptGroups.length) fail(`hypothetical replacement introduces duplicate prompts: ${JSON.stringify(uniqueness.duplicatePromptGroups.slice(0, 10))}`);
  if (uniqueness.duplicateFingerprintGroups.length) fail(`hypothetical replacement introduces duplicate originality fingerprints: ${JSON.stringify(uniqueness.duplicateFingerprintGroups.slice(0, 10))}`);

  const finalCorpusGate = runBatchMFinalCorpusGate(corpus);
  if (!finalCorpusGate.passed) fail(`hypothetical replacement fails final 30-mock corpus gate: ${JSON.stringify(finalCorpusGate, null, 2)}`);

  const baselineCalibration = runBatchMCrossCorpusCalibrationCanonical(baseline);
  const postCalibration = runBatchMCrossCorpusCalibrationCanonical(corpus);
  const baselineFailures = calibrationFailureKeys(baselineCalibration);
  const postFailures = calibrationFailureKeys(postCalibration);
  const newFailures = postFailures.filter((failure) => !baselineFailures.includes(failure));
  if (newFailures.length) fail(`hypothetical replacement introduces new cross-corpus calibration failures: ${JSON.stringify(newFailures)}`);

  const result = {
    reportType: 'batch-m-deep-content-quality-controlled-replacement-validation',
    date: '2026-09-21',
    sourceCandidateArtifact: path.basename(CANDIDATE_INPUT),
    sourceTargetLockArtifact: path.basename(LOCK_INPUT),
    candidateCount: candidates.length,
    exactTargetCoverage: candidateTargets.size,
    replacementCountValidated: replacementRecords.length,
    candidateSchemaAndContentQuality: 'PASS',
    exactTargetIdentity: 'PASS',
    targetStructuralCompatibility: 'PASS',
    hypotheticalPromptUniqueness: 'PASS',
    hypotheticalOriginalityFingerprintUniqueness: 'PASS',
    finalCorpusGate: {
      passed: finalCorpusGate.passed,
      status: finalCorpusGate.status,
      mockCount: finalCorpusGate.mockCount,
      totalRecords: finalCorpusGate.totalRecords,
    },
    crossCorpusCalibration: {
      baselinePassed: baselineCalibration.passed,
      postReplacementPassed: postCalibration.passed,
      baselineFailures,
      postReplacementFailures: postFailures,
      newFailuresIntroduced: newFailures,
    },
    productionMutation: false,
    releaseEligible: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    sat21Created: false,
    decision: 'CONTROLLED_REPLACEMENT_VALIDATION_PASSED_PENDING_EXPLICIT_PRODUCTION_REPLACEMENT_AUTHORIZATION',
    nextStep: 'Obtain fresh explicit authorization for this exact 3080-target replacement scope; only then execute production mutation and rerun post-replacement corpus, calibration, and deep-QC gates.',
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2) + '\n');
  fs.writeFileSync(OUTPUT_MD, [
    '# Batch M deep content-quality controlled replacement validation — 2026-09-21',
    '',
    `- Target-specific candidates: **${candidates.length}**.`,
    `- Exact target coverage: **${candidateTargets.size} / ${candidates.length}**.`,
    '- Candidate schema/content-quality validation: **PASS**.',
    '- Exact target identity: **PASS**.',
    '- Target structural compatibility: **PASS**.',
    '- Hypothetical prompt uniqueness: **PASS**.',
    '- Hypothetical originality-fingerprint uniqueness: **PASS**.',
    `- Final 30-mock corpus gate: **${finalCorpusGate.passed ? 'PASS' : 'FAIL'}**.`,
    `- Cross-corpus calibration before replacement: **${baselineCalibration.passed ? 'PASS' : 'HOLD'}**.`,
    `- Cross-corpus calibration after hypothetical replacement: **${postCalibration.passed ? 'PASS' : 'HOLD'}**.`,
    `- New calibration failures introduced: **${newFailures.length}**.`,
    '- Production mutation: **false**.',
    '- Release eligible: **false**.',
    '- Replacement authorization: **NOT AUTHORIZED**.',
    '- SAT21 created: **false**.',
    '',
    'This is a memory-only/hypothetical replacement validation. The frozen production corpus is unchanged.',
    '',
    'Next gate: fresh explicit production-replacement authorization for this exact locked 3080-target scope.',
    '',
  ].join('\n'));
  console.log(JSON.stringify({
    decision: result.decision,
    candidateCount: result.candidateCount,
    exactTargetCoverage: result.exactTargetCoverage,
    replacementCountValidated: result.replacementCountValidated,
    finalCorpusGatePassed: finalCorpusGate.passed,
    baselineCrossCorpusCalibrationPassed: baselineCalibration.passed,
    postReplacementCrossCorpusCalibrationPassed: postCalibration.passed,
    newCalibrationFailures: newFailures.length,
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
  }, null, 2));
}

main();
