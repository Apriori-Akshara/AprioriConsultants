/**
 * Batch M — final validation of the canonical-normalized 25-candidate replacement package.
 * Candidate-only. No production mutation or authorization occurs here.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore.js';
import { BATCH_M_PRODUCTION_SEQUENCE } from '../src/data/sat/mockContent/batchMProductionController.js';
import { runBatchMFinalCorpusGate } from '../src/data/sat/mockContent/batchMFinalCorpusGate.js';
import { runBatchMCrossCorpusCalibrationCanonical } from '../src/data/sat/mockContent/batchMCrossCorpusCalibrationCanonical.js';
import { validateSatQuestion } from '../src/data/sat/questionSchema.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';

const NORMALIZED_INPUT = process.env.BATCH_M_FINAL_PACKAGE_NORMALIZED_INPUT ||
  'artifacts/batch-m-deep-content-quality-canonical-normalization/BATCH-M-DEEP-CONTENT-QUALITY-CANONICAL-NORMALIZED-CANDIDATES-2026-09-22.json';
const REVIEW_INPUT = process.env.BATCH_M_FINAL_PACKAGE_REVIEW_INPUT ||
  'artifacts/batch-m-deep-content-quality-independent-review/BATCH-M-DEEP-CONTENT-QUALITY-INDEPENDENT-REVIEW-post-normalization-2026-09-22.json';
const OUTPUT_DIR = 'artifacts/batch-m-deep-content-quality-final-replacement-package';
const OUTPUT_JSON = path.join(OUTPUT_DIR, 'BATCH-M-DEEP-CONTENT-QUALITY-FINAL-REPLACEMENT-PACKAGE-2026-09-22.json');
const OUTPUT_MD = path.join(OUTPUT_DIR, 'BATCH-M-DEEP-CONTENT-QUALITY-FINAL-REPLACEMENT-PACKAGE-2026-09-22.md');

const clone = (v) => JSON.parse(JSON.stringify(v));
const norm = (v) => String(v ?? '').trim().toLowerCase().replace(/\s+/g, ' ');

function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
}

function sha256(value) {
  return crypto.createHash('sha256').update(stableStringify(value)).digest('hex');
}

function sameValue(a, b) {
  return stableStringify(a) === stableStringify(b);
}

function figureSignature(question) {
  const figure = question?.figure;
  if (!figure) return null;
  return {
    type: norm(figure.type),
    shape: norm(figure.shape),
  };
}

const PROTECTED_METADATA_KEYS = [
  'assessmentFamily', 'assessmentVariant', 'assessmentNumber', 'section',
  'module', 'domain', 'skill', 'subskill', 'conceptId', 'difficulty',
  'difficultyBand', 'cognitiveDemand', 'questionType', 'stimulusType',
  'interactionType', 'timingMode', 'estimatedTimeSeconds',
  'calculatorEligibility', 'calculatorMode', 'calculatorRequired',
  'referenceSheetRelevant', 'adaptiveRoute', 'isOperational',
  'releaseEligibility', 'status', 'authoringStatus', 'candidateOnly',
  'productionMutation'
];

function load(file) {
  if (!fs.existsSync(file)) throw new Error(`Required artifact not found: ${file}`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function testKeyOf(mock) {
  const explicit = String(mock?.testKey || '').trim().toUpperCase();
  if (explicit) return explicit;
  const testId = String(mock?.testId || '').trim().toUpperCase();
  return BATCH_M_PRODUCTION_SEQUENCE.find((entry) =>
    String(entry.testId).toUpperCase() === testId
  )?.testKey || testId;
}

function buildIndex() {
  const map = new Map();
  for (const mock of BATCH_M_ACCEPTED_PRODUCTION_CORPUS) {
    const testKey = testKeyOf(mock);
    for (const section of ['readingWriting', 'math']) {
      for (const record of Array.isArray(mock?.[section]) ? mock[section] : []) {
        const key = `${testKey}::${record.questionId}`;
        if (map.has(key)) throw new Error(`Duplicate production target: ${key}`);
        map.set(key, { mock, section, record });
      }
    }
  }
  return map;
}

function reviewMap(source) {
  const map = new Map();
  for (const review of source.review || []) {
    const id = String(review?.id || '');
    if (!id || map.has(id)) throw new Error(`Duplicate review identity: ${id || 'unknown'}`);
    map.set(id, review);
  }
  return map;
}

function hypotheticalCorpus(baseline, replacements) {
  const corpus = clone(baseline);
  for (const item of replacements) {
    const mock = corpus.find((m) => testKeyOf(m) === item.targetTestKey);
    if (!mock) throw new Error(`Target mock missing in hypothetical corpus: ${item.targetTestKey}`);
    const list = mock[item.section];
    const index = list.findIndex((q) => String(q.questionId) === item.targetQuestionId);
    if (index < 0) throw new Error(`Target question missing in hypothetical corpus: ${item.targetTestKey}::${item.targetQuestionId}`);

    const replacement = {
      ...clone(list[index]),
      ...clone(item.candidate),
      testId: list[index].testId,
      questionId: list[index].questionId,
      contentId: list[index].contentId || list[index].questionId,
      releaseEligibility: false,
      isOperational: list[index].isOperational,
      status: list[index].status,
      authoringStatus: list[index].authoringStatus,
      metadata: {
        ...(list[index].metadata || {}),
        ...(item.candidate.metadata || {}),
        candidateOnly: false,
        productionMutation: false,
        finalReplacementPackage: true,
      },
    };
    list[index] = replacement;
  }
  return corpus;
}

function uniqueness(corpus) {
  const prompts = new Map();
  const fingerprints = new Map();
  for (const mock of corpus) {
    for (const q of [...(mock.readingWriting || []), ...(mock.math || [])]) {
      const p = norm(q.prompt);
      if (p) prompts.set(p, [...(prompts.get(p) || []), `${testKeyOf(mock)}::${q.questionId}`]);
      const f = String(q.originalityFingerprint || '');
      if (f) fingerprints.set(f, [...(fingerprints.get(f) || []), `${testKeyOf(mock)}::${q.questionId}`]);
    }
  }
  return {
    duplicatePromptGroups: [...prompts.values()].filter((ids) => ids.length > 1),
    duplicateFingerprintGroups: [...fingerprints.values()].filter((ids) => ids.length > 1),
  };
}

function main() {
  const source = load(NORMALIZED_INPUT);
  const reviewSource = load(REVIEW_INPUT);
  const candidates = Array.isArray(source.candidates) ? source.candidates : [];
  if (candidates.length !== 25) throw new Error(`Expected 25 normalized candidates, found ${candidates.length}`);
  if (source.productionMutation !== false || source.releaseEligible !== false || source.sat21Created !== false) {
    throw new Error('Normalized candidate artifact crosses the production boundary.');
  }

  const reviews = reviewMap(reviewSource);
  const production = buildIndex();
  const seenTargets = new Set();
  const seenCandidateIds = new Set();
  const replacements = [];
  const mappings = new Map((Array.isArray(source.mappings) ? source.mappings : []).map((m) => [String(m?.candidateId || ''), m]));
  if (mappings.size !== candidates.length) throw new Error(`Normalized package mapping count mismatch: expected ${candidates.length}, found ${mappings.size}`);

  if (reviewSource.sourceArtifact !== path.basename(NORMALIZED_INPUT)) {
    throw new Error(`Fresh review source mismatch: expected ${path.basename(NORMALIZED_INPUT)}, found ${reviewSource.sourceArtifact || 'missing'}`);
  }
  const expectedReviewDate = path.basename(NORMALIZED_INPUT).match(/20\d{2}-\d{2}-\d{2}/)?.[0];
  if (!expectedReviewDate || reviewSource.date !== expectedReviewDate) {
    throw new Error(`Fresh review date mismatch: expected ${expectedReviewDate || 'normalized-input date'}, found ${reviewSource.date || 'missing'}`);
  }
  if (Number(reviewSource?.counts?.pass || 0) !== candidates.length || Number(reviewSource?.counts?.fail || 0) !== 0 || Number(reviewSource?.counts?.expertReview || 0) !== 0) {
    throw new Error(`Fresh review aggregate is not a clean ${candidates.length}/${candidates.length} PASS.`);
  }

  for (const candidate of candidates) {
    const id = String(candidate.id || '');
    if (!id || seenCandidateIds.has(id)) throw new Error(`Duplicate/missing normalized candidate identity: ${id || 'unknown'}`);
    seenCandidateIds.add(id);
    const review = reviews.get(id);
    if (!review || review.status !== 'PASS' || Number(review.failureCount || 0) !== 0 || Number(review.expertReviewCount || 0) !== 0) {
      throw new Error(`Normalized candidate ${id} lacks a fresh PASS review.`);
    }
    if (String(review.testId || '') !== String(candidate.testId || '') ||
        String(review.section || '') !== String(candidate.section || '') ||
        String(review.skill || '') !== String(candidate.skill || '') ||
        String(review.difficulty || '') !== String(candidate.difficulty || '')) {
      throw new Error(`Fresh review identity/structure mismatch for ${id}.`);
    }

    const targetTestKey = String(candidate.metadata?.canonicalNormalization?.targetTestKey || '').toUpperCase();
    const targetQuestionId = String(candidate.metadata?.canonicalNormalization?.targetQuestionId || '');
    const targetKey = `${targetTestKey}::${targetQuestionId}`;
    if (!targetTestKey || !targetQuestionId) throw new Error(`Normalized candidate ${id} has incomplete canonical target identity.`);
    if (seenTargets.has(targetKey)) throw new Error(`Duplicate replacement target: ${targetKey}`);
    seenTargets.add(targetKey);

    const target = production.get(targetKey);
    if (!target) throw new Error(`Frozen production target missing: ${targetKey}`);

    const exactFields = [
      'testId','assessmentFamily','assessmentVariant','assessmentNumber','section',
      'module','domain','skill','subskill','conceptId','difficulty','difficultyBand',
      'cognitiveDemand','questionType','stimulusType','interactionType','timingMode',
      'estimatedTimeSeconds','calculatorEligibility','calculatorMode','calculatorRequired',
      'referenceSheetRelevant','adaptiveRoute'
    ];
    for (const field of exactFields) {
      if (!sameValue(candidate[field], target.record[field])) {
        throw new Error(`Canonical compatibility mismatch for ${id}: ${field}`);
      }
    }

    const normalization = candidate.metadata?.canonicalNormalization;
    if (!normalization || !['batch-m-canonical-normalization-v3', 'batch-m-canonical-normalization-v2'].includes(normalization.version)) {
      throw new Error(`Canonical normalization metadata missing or outdated for ${id}.`);
    }
    if (!['explicit-target-key-v1', 'deterministic-pool-offset-v1'].includes(normalization.resolutionMethod)) {
      throw new Error(`Unexpected target-resolution method for ${id}.`);
    }
    const explicitTargetTestKey = String(candidate.metadata?.targetTestKey || '').trim().toUpperCase();
    const explicitTargetQuestionId = String(candidate.metadata?.targetQuestionId || '').trim();
    if (explicitTargetTestKey || explicitTargetQuestionId) {
      if (explicitTargetTestKey !== targetTestKey || explicitTargetQuestionId !== targetQuestionId) {
        throw new Error(`Explicit target inventory mapping mismatch for ${id}.`);
      }
      if (normalization.version !== 'batch-m-canonical-normalization-v3' ||
          normalization.resolutionMethod !== 'explicit-target-key-v1') {
        throw new Error(`Explicit target candidate did not use the exact-target canonical normalization path for ${id}.`);
      }
    }
    if (normalization.sourceCandidateId !== id || normalization.targetTestKey !== targetTestKey || String(normalization.targetQuestionId) !== targetQuestionId) {
      throw new Error(`Canonical target audit trail mismatch for ${id}.`);
    }
    const sourceIndex = Number(candidate.metadata?.remediationPool?.sourceIndex);
    if (!Number.isInteger(normalization.selectionSourceIndex) || normalization.selectionSourceIndex !== Math.abs(sourceIndex || 0)) {
      throw new Error(`Canonical target selection source-index mismatch for ${id}.`);
    }
    const expectedMetadataHash = sha256(clone(target.record.metadata || {}));
    if (normalization.canonicalTargetMetadataHash !== expectedMetadataHash) {
      throw new Error(`Canonical target metadata integrity mismatch for ${id}.`);
    }
    if (!Array.isArray(normalization.protectedMetadataConflicts) || normalization.protectedMetadataConflicts.length !== 0) {
      throw new Error(`Protected metadata conflicts are present for ${id}.`);
    }
    for (const key of PROTECTED_METADATA_KEYS) {
      if (Object.prototype.hasOwnProperty.call(target.record.metadata || {}, key) &&
          !sameValue(candidate.metadata?.[key], target.record.metadata[key]) &&
          !(key === 'candidateOnly' && candidate.metadata?.[key] === true) &&
          !(key === 'productionMutation' && candidate.metadata?.[key] === false)) {
        throw new Error(`Protected metadata mismatch for ${id}: metadata.${key}`);
      }
    }
    if (candidate.metadata?.candidateOnly !== true || candidate.metadata?.productionMutation !== false) {
      throw new Error(`Candidate-only metadata flags are invalid for ${id}.`);
    }
    if (!sameValue(figureSignature(candidate), figureSignature(target.record))) {
      throw new Error(`Figure compatibility mismatch for ${id}.`);
    }

    const mapping = mappings.get(id);
    const hasExplicitTarget = Boolean(String(candidate.metadata?.targetTestKey || '').trim() && String(candidate.metadata?.targetQuestionId || '').trim());
    const expectedResolutionMethod = hasExplicitTarget ? 'explicit-target-key-v1' : 'deterministic-pool-offset-v1';
    if (!mapping || mapping.targetTestKey !== targetTestKey || String(mapping.targetQuestionId) !== targetQuestionId || mapping.targetResolutionMethod !== expectedResolutionMethod) {
      throw new Error(`Replacement mapping artifact mismatch for ${id}.`);
    }

    const schema = validateSatQuestion(candidate);
    if (!schema.valid) throw new Error(`Schema failure for ${id}: ${JSON.stringify(schema.errors || [])}`);
    const quality = evaluateContentQuality(candidate);
    if (quality.verdict !== 'pass') throw new Error(`Content-quality failure for ${id}`);
    if (candidate.metadata?.productionMutation !== false || candidate.releaseEligibility !== false || candidate.isOperational !== false) {
      throw new Error(`Candidate ${id} violates candidate-only state`);
    }

    replacements.push({ candidateId: id, targetTestKey, targetQuestionId, section: target.section, candidate: clone(candidate) });
  }

  if (seenTargets.size !== 25) throw new Error(`Expected 25 unique targets, found ${seenTargets.size}`);

  const baseline = clone(BATCH_M_ACCEPTED_PRODUCTION_CORPUS);
  const hypothetical = hypotheticalCorpus(baseline, replacements);
  const unique = uniqueness(hypothetical);
  if (unique.duplicatePromptGroups.length) throw new Error(`Hypothetical replacement introduces duplicate prompts: ${JSON.stringify(unique.duplicatePromptGroups.slice(0, 5))}`);
  if (unique.duplicateFingerprintGroups.length) throw new Error(`Hypothetical replacement introduces duplicate fingerprints: ${JSON.stringify(unique.duplicateFingerprintGroups.slice(0, 5))}`);

  const finalGate = runBatchMFinalCorpusGate(hypothetical);
  if (!finalGate.passed) throw new Error(`Hypothetical replacement fails final corpus gate: ${JSON.stringify(finalGate)}`);

  const baselineCalibration = runBatchMCrossCorpusCalibrationCanonical(baseline);
  const hypotheticalCalibration = runBatchMCrossCorpusCalibrationCanonical(hypothetical);
  const baselineFailures = new Set(baselineCalibration.calibration?.failures || []);
  const newFailures = [...new Set(hypotheticalCalibration.calibration?.failures || [])].filter((f) => !baselineFailures.has(f));
  if (newFailures.length) throw new Error(`Hypothetical replacement introduces new calibration failures: ${JSON.stringify(newFailures)}`);

  const result = {
    reportType: 'batch-m-deep-content-quality-final-replacement-package',
    date: '2026-09-22',
    normalizedCandidateCount: candidates.length,
    exactTargetCoverage: seenTargets.size,
    uniqueTargets: true,
    candidateIdentityIntegrity: 'PASS',
    freshReviewArtifactIntegrity: 'PASS',
    candidateSchemaCompatibility: 'PASS',
    candidateContentQuality: 'PASS',
    freshIndependentReview: 'PASS',
    canonicalStructuralCompatibility: 'PASS',
    canonicalOperationalMetadataIntegrity: 'PASS',
    figureCompatibility: 'PASS',
    targetResolutionIntegrity: 'PASS',
    hypotheticalPromptUniqueness: 'PASS',
    hypotheticalFingerprintUniqueness: 'PASS',
    final30MockCorpusGate: 'PASS',
    crossCorpusCalibrationNoNewFailures: 'PASS',
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    decision: 'REPLACEMENT_PACKAGE_VALIDATED_PENDING_EXPLICIT_PRODUCTION_AUTHORIZATION',
    replacements,
    nextStep: 'Obtain explicit authorization for this exact 25-target one-for-one replacement package. Only after authorization may production mutation be executed and post-replacement gates rerun.',
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2) + '\n');
  fs.writeFileSync(OUTPUT_MD, [
    '# Batch M final replacement package — 2026-09-22',
    '',
    '- Canonical-normalized candidates: **25**.',
    '- Exact unique production targets: **25**.',
    '- Candidate schema/content-quality: **PASS**.',
    '- Fresh independent review: **PASS**.',
    '- Canonical structural compatibility: **PASS**.',
    '- Canonical operational-metadata integrity: **PASS**.',
    '- Figure/shape compatibility: **PASS**.',
    '- Target-resolution audit integrity: **PASS**.',
    '- Hypothetical prompt uniqueness: **PASS**.',
    '- Hypothetical originality uniqueness: **PASS**.',
    '- Hypothetical final 30-mock corpus gate: **PASS**.',
    '- Hypothetical cross-corpus calibration: **PASS with no new failures**.',
    '- Production mutation: **false**.',
    '- Release eligible: **false**.',
    '- Replacement authorization: **NOT AUTHORIZED**.',
    '',
    'This is the exact candidate-to-production replacement package. It is not a production mutation and requires a separate explicit authorization checkpoint.',
    '',
  ].join('\n'));

  console.log(JSON.stringify({
    decision: result.decision,
    candidateCount: result.normalizedCandidateCount,
    exactTargetCoverage: result.exactTargetCoverage,
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
  }, null, 2));
}

main();
