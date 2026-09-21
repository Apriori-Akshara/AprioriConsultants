/**
 * Batch M — canonical normalization of the 25 independently reviewed candidates.
 *
 * Candidate-only. Resolves each candidate to one deterministic, existing target
 * in the frozen production corpus, then copies only canonical structural metadata
 * needed for compatibility. Candidate content/identity remains distinct.
 * No production mutation or authorization occurs here.
 */
import fs from 'node:fs';
import path from 'node:path';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore.js';
import { BATCH_M_PRODUCTION_SEQUENCE } from '../src/data/sat/mockContent/batchMProductionController.js';
import { validateSatQuestion } from '../src/data/sat/questionSchema.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';

const CANDIDATE_INPUT = process.env.BATCH_M_CANONICAL_NORMALIZATION_CANDIDATE_INPUT ||
  'artifacts/batch-m-current-deep-content-quality-candidate-selection/BATCH-M-DEEP-CONTENT-QUALITY-CANDIDATE-SELECTION-2026-09-17.json';
const REVIEW_INPUT = process.env.BATCH_M_CANONICAL_NORMALIZATION_REVIEW_INPUT ||
  'artifacts/batch-m-deep-content-quality-independent-review/BATCH-M-DEEP-CONTENT-QUALITY-INDEPENDENT-REVIEW-2026-09-17.json';
const OUTPUT_DIR = 'artifacts/batch-m-deep-content-quality-canonical-normalization';
const OUTPUT_JSON = path.join(OUTPUT_DIR, 'BATCH-M-DEEP-CONTENT-QUALITY-CANONICAL-NORMALIZED-CANDIDATES-2026-09-22.json');
const OUTPUT_MD = path.join(OUTPUT_DIR, 'BATCH-M-DEEP-CONTENT-QUALITY-CANONICAL-NORMALIZED-CANDIDATES-2026-09-22.md');

const clone = (value) => JSON.parse(JSON.stringify(value));
const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');

function loadJson(file) {
  if (!fs.existsSync(file)) throw new Error(`Required artifact not found: ${file}`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function testKeyForTestId(testId) {
  const normalized = String(testId || '').trim().toUpperCase();
  return BATCH_M_PRODUCTION_SEQUENCE.find((entry) =>
    String(entry.testKey).toUpperCase() === normalized ||
    String(entry.testId).toUpperCase() === normalized
  )?.testKey || normalized;
}

function figureSignature(question) {
  const figure = question?.figure;
  if (!figure) return null;
  return { type: normalize(figure.type), shape: normalize(figure.shape) };
}

function skillFamily(candidate) {
  const skill = normalize(candidate?.skill);
  if (skill === 'scatterplot interpretation') {
    return {
      name: 'scatter',
      canonicalSkills: new Set(['data models']),
      figure: { type: 'scatter', shape: '' },
      mappingRule: 'scatterplot interpretation → Data models',
    };
  }
  if (skill === 'equivalent exponential representations') {
    return {
      name: 'exponential',
      canonicalSkills: new Set(['exponential equations']),
      figure: null,
      mappingRule: 'equivalent exponential representations → Exponential equations',
    };
  }
  if (skill === 'right-triangle relationships') {
    return {
      name: 'right-triangle',
      canonicalSkills: new Set(['right triangles']),
      figure: { type: 'geometry', shape: 'right-triangle' },
      mappingRule: 'right-triangle relationships → Right triangles',
    };
  }
  if (skill === 'linear relationships') {
    return {
      name: 'linear',
      canonicalSkills: new Set(['linear functions']),
      figure: null,
      mappingRule: 'linear relationships → Linear functions',
    };
  }
  return {
    name: 'exact',
    canonicalSkills: new Set([skill]),
    figure: figureSignature(candidate),
    mappingRule: 'exact canonical skill match',
  };
}

function recordsForMock(mock) {
  return [
    ...(Array.isArray(mock?.readingWriting) ? mock.readingWriting : []),
    ...(Array.isArray(mock?.math) ? mock.math : []),
  ];
}

function buildProductionIndex() {
  const byKey = new Map();
  for (const mock of BATCH_M_ACCEPTED_PRODUCTION_CORPUS) {
    const testKey = String(mock?.testKey || testKeyForTestId(mock?.testId)).toUpperCase();
    for (const section of ['readingWriting', 'math']) {
      for (const record of Array.isArray(mock?.[section]) ? mock[section] : []) {
        const questionId = String(record?.questionId || '');
        if (!questionId) continue;
        const key = `${testKey}::${questionId}`;
        if (byKey.has(key)) throw new Error(`Duplicate production identity: ${key}`);
        byKey.set(key, { testKey, mock, section, record });
      }
    }
  }
  return byKey;
}

function targetPool(candidate, productionIndex) {
  const testKey = testKeyForTestId(candidate?.testId);
  const family = skillFamily(candidate);
  const section = normalize(candidate?.section);
  const module = normalize(candidate?.module);
  const difficulty = normalize(candidate?.difficulty);
  const questionType = normalize(candidate?.questionType);
  const domain = normalize(candidate?.domain);

  return [...productionIndex.values()]
    .filter((entry) => entry.testKey === testKey)
    .filter((entry) => normalize(entry.section) === section)
    .filter((entry) => normalize(entry.record.module) === module)
    .filter((entry) => normalize(entry.record.difficulty) === difficulty)
    .filter((entry) => normalize(entry.record.questionType) === questionType)
    .filter((entry) => normalize(entry.record.domain) === domain)
    .filter((entry) => family.canonicalSkills.has(normalize(entry.record.skill)))
    .filter((entry) => {
      const expected = family.figure;
      const actual = figureSignature(entry.record);
      if (!expected) return actual === null;
      return actual && actual.type === expected.type && actual.shape === expected.shape;
    })
    .sort((a, b) => String(a.record.questionId).localeCompare(String(b.record.questionId)));
}

function reviewMap(reviewSource) {
  const reviews = Array.isArray(reviewSource?.review) ? reviewSource.review : [];
  const map = new Map();
  for (const review of reviews) {
    const id = String(review?.id || '');
    if (!id || map.has(id)) throw new Error(`Duplicate/missing review identity: ${id || 'unknown'}`);
    map.set(id, review);
  }
  return map;
}

function normalizeCandidate(candidate, target) {
  const preserved = clone(candidate);
  const canonicalFields = [
    'testId', 'assessmentFamily', 'assessmentVariant', 'assessmentNumber',
    'section', 'module', 'domain', 'skill', 'subskill', 'conceptId',
    'difficulty', 'difficultyBand', 'cognitiveDemand', 'questionType',
    'stimulusType', 'interactionType', 'timingMode', 'estimatedTimeSeconds',
    'calculatorEligibility', 'calculatorMode', 'calculatorRequired',
    'referenceSheetRelevant', 'adaptiveRoute'
  ];

  const out = clone(candidate);
  for (const field of canonicalFields) {
    if (target.record[field] !== undefined) out[field] = clone(target.record[field]);
  }

  out.metadata = {
    ...(target.record.metadata || {}),
    ...(candidate.metadata || {}),
    candidateOnly: true,
    productionMutation: false,
    canonicalNormalization: {
      version: 'batch-m-canonical-normalization-v1',
      targetTestKey: target.testKey,
      targetQuestionId: target.record.questionId,
      sourceCandidateId: candidate.id,
      sourceAssessmentFamily: preserved.assessmentFamily,
      sourceAssessmentVariant: preserved.assessmentVariant,
      sourceSkill: preserved.skill,
      sourceDifficultyBand: preserved.difficultyBand,
      normalizedAssessmentFamily: out.assessmentFamily,
      normalizedAssessmentVariant: out.assessmentVariant,
      normalizedSkill: out.skill,
      normalizedDifficultyBand: out.difficultyBand,
    },
  };
  out.releaseEligibility = false;
  out.isOperational = false;
  out.status = 'draft';
  out.authoringStatus = 'candidate';
  return out;
}

function main() {
  const source = loadJson(CANDIDATE_INPUT);
  const reviewSource = loadJson(REVIEW_INPUT);

  if (source.productionMutation !== false || source.releaseEligible !== false || source.sat21Created !== false) {
    throw new Error('Candidate source crosses the candidate-only boundary.');
  }
  if (reviewSource.productionMutation !== false || reviewSource.releaseEligible !== false || reviewSource.sat21Created !== false) {
    throw new Error('Review source crosses the candidate-only boundary.');
  }

  const candidates = Array.isArray(source.candidates) ? source.candidates : [];
  if (candidates.length !== 25) throw new Error(`Expected exactly 25 reviewed candidates, found ${candidates.length}`);

  const reviews = reviewMap(reviewSource);
  const productionIndex = buildProductionIndex();
  const usedTargets = new Set();
  const normalizedCandidates = [];
  const mappings = [];

  for (const candidate of candidates) {
    const id = String(candidate?.id || '');
    const review = reviews.get(id);
    if (!review || review.status !== 'PASS' || Number(review.failureCount || 0) !== 0 || Number(review.expertReviewCount || 0) !== 0) {
      throw new Error(`Candidate ${id} is not currently independently passed.`);
    }

    const pool = targetPool(candidate, productionIndex);
    const sourceIndex = Math.abs(Number(candidate?.metadata?.remediationPool?.sourceIndex || 0));
    let target = null;
    if (pool.length) {
      const start = sourceIndex % pool.length;
      for (let i = 0; i < pool.length; i += 1) {
        const probe = pool[(start + i) % pool.length];
        const key = `${probe.testKey}::${probe.record.questionId}`;
        if (!usedTargets.has(key)) {
          target = probe;
          break;
        }
      }
    }
    if (!target) throw new Error(`No deterministic canonical target available for ${id}`);

    const normalized = normalizeCandidate(candidate, target);
    const schema = validateSatQuestion(normalized);
    if (!schema.valid) throw new Error(`Normalized candidate ${id} fails schema: ${JSON.stringify(schema.errors || [])}`);
    const quality = evaluateContentQuality(normalized);
    if (quality.verdict !== 'pass') throw new Error(`Normalized candidate ${id} fails content-quality gate: ${JSON.stringify(quality.checks || [])}`);

    const targetKey = `${target.testKey}::${target.record.questionId}`;
    usedTargets.add(targetKey);
    normalizedCandidates.push(normalized);
    mappings.push({
      candidateId: id,
      targetTestKey: target.testKey,
      targetQuestionId: target.record.questionId,
      targetSection: target.record.section,
      targetModule: target.record.module,
      targetDomain: target.record.domain,
      targetSkill: target.record.skill,
      targetDifficulty: target.record.difficulty,
      targetQuestionType: target.record.questionType,
      targetAssessmentFamily: target.record.assessmentFamily,
      targetAssessmentVariant: target.record.assessmentVariant,
      targetDifficultyBand: target.record.difficultyBand,
      canonicalTargetSkill: target.record.skill,
      semanticSkillMapping: skillFamily(candidate).mappingRule,
      canonicalNormalizationApplied: true,
      productionMutation: false,
      releaseEligible: false,
      sat21Created: false,
    });
  }

  const result = {
    reportType: 'batch-m-deep-content-quality-canonical-normalized-candidates',
    date: '2026-09-22',
    sourceCandidateArtifact: path.basename(CANDIDATE_INPUT),
    sourceReviewArtifact: path.basename(REVIEW_INPUT),
    sourceCandidateCount: candidates.length,
    normalizedCandidateCount: normalizedCandidates.length,
    exactUniqueTargetCount: usedTargets.size,
    mappings,
    candidates: normalizedCandidates,
    candidateOnly: true,
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
    independentReviewRequiredAfterNormalization: true,
    authorization: 'NOT_AUTHORIZED',
    decision: normalizedCandidates.length === 25 && usedTargets.size === 25
      ? 'CANONICAL_NORMALIZATION_COMPLETE_PENDING_FRESH_INDEPENDENT_REVIEW'
      : 'CANONICAL_NORMALIZATION_INCOMPLETE',
    nextStep: 'Run a fresh independent substantive review on the canonical-normalized candidates; only a fresh 25/25 PASS may advance the package to final authorization readiness.',
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2) + '\n');
  fs.writeFileSync(OUTPUT_MD, [
    '# Batch M canonical-normalized candidates — 2026-09-22',
    '',
    `- Source candidates: **${candidates.length}**.`,
    `- Canonical-normalized candidates: **${normalizedCandidates.length}**.`,
    `- Unique deterministic production targets: **${usedTargets.size}**.`,
    '- Production mutation: **false**.',
    '- Release eligible: **false**.',
    '- SAT21 created: **false**.',
    '',
    'Canonical assessment metadata, skill labels, difficulty metadata, and other structural fields are normalized from an exact existing production target.',
    'Candidate content and candidate identity remain distinct from the production target.',
    'A fresh independent substantive review is required after normalization.',
    '',
  ].join('\n'));
  console.log(JSON.stringify({
    decision: result.decision,
    sourceCandidateCount: candidates.length,
    normalizedCandidateCount: normalizedCandidates.length,
    exactUniqueTargetCount: usedTargets.size,
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
  }, null, 2));
}

main();
