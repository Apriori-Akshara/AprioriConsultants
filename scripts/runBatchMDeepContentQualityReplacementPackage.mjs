/**
 * Batch M — controlled replacement-package preparation for the 25 candidates
 * that passed the current independent substantive review.
 *
 * Candidate-only. This stage proposes deterministic existing production targets,
 * validates the package boundary, and records canonical metadata mismatches.
 * It NEVER mutates production, authorizes replacement, or creates SAT21.
 */
import fs from 'node:fs';
import path from 'node:path';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore.js';
import { BATCH_M_PRODUCTION_SEQUENCE } from '../src/data/sat/mockContent/batchMProductionController.js';
import { validateSatQuestion } from '../src/data/sat/questionSchema.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';

const CANDIDATE_INPUT = process.env.BATCH_M_REPLACEMENT_PACKAGE_CANDIDATE_INPUT ||
  'artifacts/batch-m-current-deep-content-quality-candidate-selection/BATCH-M-DEEP-CONTENT-QUALITY-CANDIDATE-SELECTION-2026-09-17.json';
const REVIEW_INPUT = process.env.BATCH_M_REPLACEMENT_PACKAGE_REVIEW_INPUT ||
  'artifacts/batch-m-deep-content-quality-independent-review/BATCH-M-DEEP-CONTENT-QUALITY-INDEPENDENT-REVIEW-2026-09-17.json';
const OUTPUT_DIR = process.env.BATCH_M_REPLACEMENT_PACKAGE_OUTPUT_DIR ||
  'artifacts/batch-m-deep-content-quality-replacement-package';
const OUTPUT_JSON = path.join(
  OUTPUT_DIR,
  'BATCH-M-DEEP-CONTENT-QUALITY-REPLACEMENT-PACKAGE-2026-09-22.json'
);
const OUTPUT_MD = path.join(
  OUTPUT_DIR,
  'BATCH-M-DEEP-CONTENT-QUALITY-REPLACEMENT-PACKAGE-2026-09-22.md'
);

const clone = (value) => JSON.parse(JSON.stringify(value));
const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/\\s+/g, ' ');

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

function testKeyOfMock(mock) {
  const explicit = String(mock?.testKey || '').trim().toUpperCase();
  if (explicit) return explicit;
  return testKeyForTestId(mock?.testId);
}

function figureSignature(question) {
  const figure = question?.figure;
  if (!figure) return null;
  return {
    type: normalize(figure.type),
    shape: normalize(figure.shape),
  };
}

function skillFamily(candidate) {
  const skill = normalize(candidate?.skill);
  if (skill === 'scatterplot interpretation') {
    return {
      family: 'data-models',
      domain: 'problem-solving and data analysis',
      skills: new Set(['data models']),
      figure: { type: 'scatter', shape: '' },
    };
  }
  if (skill === 'equivalent exponential representations') {
    return {
      family: 'exponential-equations',
      domain: 'advanced math',
      skills: new Set(['exponential equations']),
      figure: null,
    };
  }
  if (skill === 'right-triangle relationships') {
    return {
      family: 'right-triangles',
      domain: 'geometry and trigonometry',
      skills: new Set(['right triangles']),
      figure: { type: 'geometry', shape: 'right-triangle' },
    };
  }
  if (skill === 'linear relationships') {
    return {
      family: 'linear-algebra',
      domain: 'algebra',
      skills: new Set([
        'linear functions',
        'linear equations',
        'linear representations',
        'linear functions and representations',
      ]),
      figure: null,
    };
  }
  return {
    family: 'exact-skill',
    domain: normalize(candidate?.domain),
    skills: new Set([skill]),
    figure: figureSignature(candidate),
  };
}

function recordsForMock(mock, section) {
  return Array.isArray(mock?.[section]) ? mock[section] : [];
}

function buildProductionIndex() {
  const index = new Map();
  for (const mock of BATCH_M_ACCEPTED_PRODUCTION_CORPUS) {
    const testKey = testKeyOfMock(mock);
    for (const section of ['readingWriting', 'math']) {
      for (const record of recordsForMock(mock, section)) {
        const questionId = String(record?.questionId || '');
        if (!questionId) continue;
        const key = `${testKey}::${questionId}`;
        if (index.has(key)) throw new Error(`Duplicate production identity: ${key}`);
        index.set(key, {
          testKey,
          mock,
          section,
          record,
        });
      }
    }
  }
  return index;
}

function targetPool(candidate, index) {
  const testKey = testKeyForTestId(candidate?.testId);
  const family = skillFamily(candidate);
  const candidateSection = normalize(candidate?.section);
  const candidateModule = normalize(candidate?.module);
  const candidateDifficulty = normalize(candidate?.difficulty);
  const candidateQuestionType = normalize(candidate?.questionType);

  const pool = [];
  for (const entry of index.values()) {
    if (entry.testKey !== testKey) continue;
    if (normalize(entry.section) !== candidateSection) continue;
    if (normalize(entry.record.module) !== candidateModule) continue;
    if (normalize(entry.record.difficulty) !== candidateDifficulty) continue;
    if (normalize(entry.record.questionType) !== candidateQuestionType) continue;
    if (normalize(entry.record.domain) !== family.domain) continue;
    if (!family.skills.has(normalize(entry.record.skill))) continue;

    const expectedFigure = family.figure;
    const actualFigure = figureSignature(entry.record);
    if (expectedFigure) {
      if (!actualFigure || actualFigure.type !== expectedFigure.type || actualFigure.shape !== expectedFigure.shape) continue;
    } else if (actualFigure) {
      continue;
    }

    pool.push(entry);
  }

  pool.sort((a, b) => String(a.record.questionId).localeCompare(String(b.record.questionId)));
  return pool;
}

function chooseDeterministicTarget(pool, sourceIndex, usedKeys) {
  if (!pool.length) return null;
  const start = Math.abs(Number(sourceIndex || 0)) % pool.length;
  for (let offset = 0; offset < pool.length; offset += 1) {
    const candidate = pool[(start + offset) % pool.length];
    const key = `${candidate.testKey}::${candidate.record.questionId}`;
    if (!usedKeys.has(key)) return candidate;
  }
  return null;
}

function collectBlockers(candidate, target) {
  const blockers = [];
  if (!target) {
    blockers.push('no-semantically-compatible-existing-production-target');
    return blockers;
  }

  const exactFields = [
    ['section', candidate?.section, target.record?.section],
    ['module', candidate?.module, target.record?.module],
    ['domain', candidate?.domain, target.record?.domain],
    ['difficulty', candidate?.difficulty, target.record?.difficulty],
    ['questionType', candidate?.questionType, target.record?.questionType],
    ['assessmentFamily', candidate?.assessmentFamily, target.record?.assessmentFamily],
    ['assessmentVariant', candidate?.assessmentVariant, target.record?.assessmentVariant],
  ];

  for (const [field, source, actual] of exactFields) {
    if (normalize(source) !== normalize(actual)) blockers.push(`${field}-mismatch`);
  }

  if (normalize(candidate?.skill) !== normalize(target.record?.skill)) {
    blockers.push('canonical-skill-mismatch');
  }

  const candidateFigure = figureSignature(candidate);
  const targetFigure = figureSignature(target.record);
  if (JSON.stringify(candidateFigure) !== JSON.stringify(targetFigure)) {
    blockers.push('figure-signature-mismatch');
  }

  return blockers;
}

function candidateValidation(candidate) {
  const schema = validateSatQuestion(candidate);
  const quality = evaluateContentQuality(candidate);
  return {
    schemaPass: schema.valid,
    contentQualityPass: quality.verdict === 'pass',
    schemaErrors: schema.valid ? [] : (schema.errors || []),
    contentQualityChecks: quality.verdict === 'pass' ? [] : (quality.checks || []),
  };
}

function reviewValidation(candidateIds, reviewSource) {
  const reviews = Array.isArray(reviewSource?.review) ? reviewSource.review : [];
  const reviewById = new Map();

  for (const review of reviews) {
    const id = String(review?.id || '');
    if (!id || reviewById.has(id)) throw new Error(`Duplicate or missing review identity: ${id || 'unknown'}`);
    reviewById.set(id, review);
  }

  const missing = [];
  const failed = [];
  for (const id of candidateIds) {
    const review = reviewById.get(id);
    if (!review) {
      missing.push(id);
      continue;
    }
    if (review.status !== 'PASS' || Number(review.failureCount || 0) !== 0 || Number(review.expertReviewCount || 0) !== 0) {
      failed.push({ id, status: review.status, failureCount: review.failureCount, expertReviewCount: review.expertReviewCount });
    }
  }

  return {
    reviewCount: reviews.length,
    passedCount: candidateIds.length - missing.length - failed.length,
    missing,
    failed,
  };
}

function main() {
  const candidateSource = loadJson(CANDIDATE_INPUT);
  const reviewSource = loadJson(REVIEW_INPUT);

  if (candidateSource.productionMutation !== false ||
      candidateSource.releaseEligible !== false ||
      candidateSource.sat21Created !== false) {
    throw new Error('Candidate source crosses the production safety boundary.');
  }
  if (reviewSource.productionMutation !== false ||
      reviewSource.releaseEligible !== false ||
      reviewSource.sat21Created !== false) {
    throw new Error('Review source crosses the production safety boundary.');
  }

  const candidates = Array.isArray(candidateSource.candidates) ? candidateSource.candidates : [];
  if (!candidates.length) throw new Error('Candidate source is empty.');

  const candidateIds = candidates.map((candidate) => String(candidate?.id || ''));
  if (candidateIds.some((id) => !id) || new Set(candidateIds).size !== candidateIds.length) {
    throw new Error('Candidate identity set is not unique and complete.');
  }

  const review = reviewValidation(candidateIds, reviewSource);
  if (review.missing.length || review.failed.length) {
    throw new Error(
      `Current candidate set is not fully independently passed: missing=${review.missing.length}, failed=${review.failed.length}`
    );
  }

  const productionIndex = buildProductionIndex();
  const usedTargets = new Set();
  const entries = [];
  const unresolved = [];

  for (const candidate of candidates) {
    const sourceIndex = Number(candidate?.metadata?.remediationPool?.sourceIndex || 0);
    const pool = targetPool(candidate, productionIndex);
    const target = chooseDeterministicTarget(pool, sourceIndex, usedTargets);

    if (!target) {
      unresolved.push(candidate.id);
    } else {
      usedTargets.add(`${target.testKey}::${target.record.questionId}`);
    }

    const validation = candidateValidation(candidate);
    if (!validation.schemaPass || !validation.contentQualityPass) {
      throw new Error(`Candidate ${candidate.id} no longer passes schema/content-quality self-validation.`);
    }

    const blockers = collectBlockers(candidate, target);
    const targetSnapshot = target ? {
      testKey: target.testKey,
      testId: target.record.testId,
      questionId: target.record.questionId,
      section: target.record.section,
      module: target.record.module,
      domain: target.record.domain,
      skill: target.record.skill,
      difficulty: target.record.difficulty,
      questionType: target.record.questionType,
      assessmentFamily: target.record.assessmentFamily,
      assessmentVariant: target.record.assessmentVariant,
      figure: clone(target.record.figure || null),
      prompt: target.record.prompt,
      answer: target.record.answer,
      explanation: target.record.explanation,
    } : null;

    entries.push({
      candidateId: candidate.id,
      sourceIndex,
      candidate: clone(candidate),
      proposedTarget: targetSnapshot,
      targetResolution: target ? 'DETERMINISTIC_EXISTING_TARGET_PROPOSED' : 'UNRESOLVED',
      canonicalCompatibility: blockers.length ? 'BLOCKED' : 'PASS',
      blockers,
      productionMutation: false,
      releaseEligible: false,
      sat21Created: false,
      authorization: 'NOT_AUTHORIZED',
    });
  }

  const duplicateTargetCount = entries
    .filter((entry) => entry.proposedTarget)
    .length - usedTargets.size;

  const blockedCount = entries.filter((entry) => entry.blockers.length).length;
  const proposedTargetCount = entries.filter((entry) => entry.proposedTarget).length;

  const result = {
    reportType: 'batch-m-deep-content-quality-replacement-package',
    date: '2026-09-22',
    sourceCandidateArtifact: path.basename(CANDIDATE_INPUT),
    sourceReviewArtifact: path.basename(REVIEW_INPUT),
    candidateCount: candidates.length,
    independentlyPassedCount: review.passedCount,
    proposedTargetCount,
    exactUniqueTargetCount: usedTargets.size,
    unresolvedCount: unresolved.length,
    duplicateTargetCount,
    blockedCount,
    entries,
    globalSafety: {
      frozenProductionScope: 'SAT1-SAT10, PSAT1-PSAT10, SAT11-SAT20',
      sat21Created: false,
      productionMutation: false,
      releaseEligible: false,
      automaticReplacement: false,
      explicitAuthorizationRequired: true,
    },
    decision: blockedCount || unresolved.length
      ? 'REPLACEMENT_PACKAGE_PREPARED_BUT_BLOCKED_BY_CANONICAL_COMPATIBILITY'
      : 'REPLACEMENT_PACKAGE_VALIDATED_PENDING_EXPLICIT_PRODUCTION_AUTHORIZATION',
    nextStep: blockedCount || unresolved.length
      ? 'Resolve the recorded canonical compatibility blockers without mutating production; regenerate or normalize the candidate package, then rerun this package validation before authorization.'
      : 'Obtain explicit authorization for this exact one-for-one replacement package; do not mutate production before authorization.',
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2) + '\n', 'utf8');

  const blockerCounts = {};
  for (const entry of entries) {
    for (const blocker of entry.blockers) blockerCounts[blocker] = (blockerCounts[blocker] || 0) + 1;
  }

  const md = [
    '# Batch M controlled replacement package — 2026-09-22',
    '',
    `- Independently passed candidates: **${review.passedCount} / ${candidates.length}**.`,
    `- Deterministic existing targets proposed: **${proposedTargetCount}**.`,
    `- Unique target identities: **${usedTargets.size}**.`,
    `- Unresolved candidates: **${unresolved.length}**.`,
    `- Candidates blocked by canonical compatibility: **${blockedCount}**.`,
    `- Production mutation: **false**.`,
    `- Release eligible: **false**.`,
    `- SAT21 created: **false**.`,
    '',
    `## Decision`,
    '',
    `**${result.decision}**`,
    '',
    'This package is candidate-only. It proposes targets in the frozen 30-mock corpus and does not modify production.',
    '',
    '## Blocker counts',
    '',
    ...Object.entries(blockerCounts).sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => `- ${key}: **${value}**`),
    '',
    '## Authorization boundary',
    '',
    'No replacement is authorized by this package. Any production mutation requires a separate explicit authorization checkpoint after all canonical compatibility blockers are resolved.',
    '',
  ].join('\n');
  fs.writeFileSync(OUTPUT_MD, md, 'utf8');

  console.log(JSON.stringify({
    decision: result.decision,
    candidateCount: result.candidateCount,
    independentlyPassedCount: result.independentlyPassedCount,
    proposedTargetCount: result.proposedTargetCount,
    exactUniqueTargetCount: result.exactUniqueTargetCount,
    unresolvedCount: result.unresolvedCount,
    duplicateTargetCount: result.duplicateTargetCount,
    blockedCount: result.blockedCount,
    blockerCounts,
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
  }, null, 2));
}

main();
