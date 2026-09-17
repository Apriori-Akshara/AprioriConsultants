/**
 * Batch M — read-only 30-mock cross-corpus calibration.
 *
 * This stage measures the frozen production corpus against the approved SAT/PSAT
 * construction targets. It never mutates, regenerates, or publishes questions.
 */

import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from './batchMProductionStore';
import { BATCH_M_PRODUCTION_SEQUENCE } from './batchMProductionController';
import { runBatchMFinalCorpusGate } from './batchMFinalCorpusGate';

const EXPECTED_MOCK_COUNT = 30;
const EXPECTED_RECORDS_PER_MOCK = 196;
const DOMAIN_HARD_LIMIT = 0.05;
const GROUP_DOMAIN_HARD_LIMIT = 0.08;
const DIFFICULTY_MOCK_HARD_LIMIT = 0.08;
const METADATA_COVERAGE_HARD_LIMIT = 0.95;
const PSAT_HARD_RATE_MAX_DELTA = 0.02;
const MATH_SPR_REVIEW_MIN = 0.20;
const MATH_SPR_REVIEW_MAX = 0.35;

const DOMAIN_TARGETS = {
  'reading-writing': {
    'craft-and-structure': 0.28,
    'information-and-ideas': 0.26,
    'standard-english-conventions': 0.26,
    'expression-of-ideas': 0.20,
  },
  math: {
    algebra: 0.35,
    'advanced-math': 0.35,
    'problem-solving-and-data-analysis': 0.15,
    'geometry-and-trigonometry': 0.15,
  },
};

function collectRecords(mock) {
  return [...(mock?.readingWriting || []), ...(mock?.math || [])];
}

function normalize(value) {
  return String(value ?? '').trim();
}

function canonicalDomain(value) {
  return normalize(value)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function increment(map, key) {
  const normalized = normalize(key) || '(missing)';
  map[normalized] = (map[normalized] || 0) + 1;
}

function incrementCanonical(map, key) {
  const normalized = canonicalDomain(key) || '(missing)';
  map[normalized] = (map[normalized] || 0) + 1;
}

function distribution(counts, total) {
  return Object.fromEntries(
    Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([key, count]) => [key, { count, proportion: total ? Number((count / total).toFixed(4)) : 0 }]),
  );
}

function groupName(target) {
  const testKey = String(target?.testKey || '');
  if (testKey.startsWith('PSAT')) return 'PSAT';
  if (/^SAT(?:1[1-9]|20)$/.test(testKey)) return 'SAT-Series-B';
  return 'SAT-Series-A';
}

function collectStats(corpus) {
  const overall = {
    section: {},
    domain: { 'reading-writing': {}, math: {} },
    skill: { 'reading-writing': {}, math: {} },
    difficulty: {},
    questionType: { 'reading-writing': {}, math: {} },
    figureType: {},
    sourceFamily: {},
    rhetoricalStructure: {},
    cognitiveOperation: {},
    applicationFingerprint: {},
  };
  const groups = { 'SAT-Series-A': [], PSAT: [], 'SAT-Series-B': [] };
  const mocks = [];

  for (let index = 0; index < corpus.length; index += 1) {
    const mock = corpus[index];
    const target = BATCH_M_PRODUCTION_SEQUENCE[index];
    const testKey = target?.testKey || mock?.testKey || `position-${index + 1}`;
    const group = groupName(target);
    const records = collectRecords(mock);
    const mockStats = {
      testKey,
      group,
      recordCount: records.length,
      difficulty: {},
      domain: { 'reading-writing': {}, math: {} },
      skill: { 'reading-writing': {}, math: {} },
      questionType: { 'reading-writing': {}, math: {} },
      metadataPresence: {
        sourceFamily: 0,
        rhetoricalStructure: 0,
        cognitiveOperation: 0,
        applicationFingerprint: 0,
      },
      mathFigureTypes: {},
      psatSatOnlyCount: 0,
    };

    for (const record of records) {
      const section = record.section;
      increment(overall.section, section);
      increment(overall.difficulty, record.difficulty);
      increment(overall.questionType[section] || {}, record.questionType || record.question_type);
      increment(overall.figureType, record?.stimulus?.figure?.figure_type || record?.stimulus?.figure?.type || record?.figure?.figure_type || record?.figure?.type);

      if (overall.domain[section]) incrementCanonical(overall.domain[section], record.domain);
      if (overall.skill[section]) increment(overall.skill[section], record.skill);
      if (mockStats.domain[section]) incrementCanonical(mockStats.domain[section], record.domain);
      if (mockStats.skill[section]) increment(mockStats.skill[section], record.skill);
      if (mockStats.questionType[section]) increment(mockStats.questionType[section], record.questionType || record.question_type);
      increment(mockStats.difficulty, record.difficulty);

      if (section === 'reading-writing') {
        increment(overall.sourceFamily, record?.metadata?.sourceFamily);
        increment(overall.rhetoricalStructure, record?.metadata?.rhetoricalStructure);
        increment(overall.cognitiveOperation, record?.metadata?.cognitiveOperation);
        if (record?.metadata?.sourceFamily) mockStats.metadataPresence.sourceFamily += 1;
        if (record?.metadata?.rhetoricalStructure) mockStats.metadataPresence.rhetoricalStructure += 1;
        if (record?.metadata?.cognitiveOperation) mockStats.metadataPresence.cognitiveOperation += 1;
      }

      if (section === 'math') {
        increment(overall.applicationFingerprint, record?.metadata?.applicationFingerprint);
        if (record?.metadata?.applicationFingerprint) mockStats.metadataPresence.applicationFingerprint += 1;
        const figureType = record?.stimulus?.figure?.figure_type || record?.stimulus?.figure?.type || record?.figure?.figure_type || record?.figure?.type;
        if (figureType) increment(mockStats.mathFigureTypes, figureType);
      }

      const applicable = Array.isArray(record?.applicable_to)
        ? record.applicable_to
        : Array.isArray(record?.applicableTo)
          ? record.applicableTo
          : [];
      if (group === 'PSAT' && applicable.length === 1 && applicable[0] === 'SAT') {
        mockStats.psatSatOnlyCount += 1;
      }
    }

    groups[group].push(mockStats);
    mocks.push(mockStats);
  }

  return { overall, groups, mocks };
}

function evaluateDomainTargets(domainCounts, section) {
  const total = Object.values(domainCounts).reduce((sum, count) => sum + Number(count || 0), 0);
  const targets = DOMAIN_TARGETS[section];
  if (!total || !targets) return { total, findings: [] };

  const findings = Object.entries(targets).map(([domain, target]) => {
    const actual = Number(domainCounts[domain] || 0) / total;
    const delta = actual - target;
    return {
      domain,
      target,
      actual: Number(actual.toFixed(4)),
      delta: Number(delta.toFixed(4)),
      withinTarget: Math.abs(delta) <= DOMAIN_HARD_LIMIT,
    };
  });
  return { total, findings };
}

function compareGroupDomains(groups, section) {
  const results = [];
  for (const [group, mocks] of Object.entries(groups)) {
    const counts = {};
    for (const mock of mocks) {
      for (const [domain, count] of Object.entries(mock.domain[section] || {})) {
        counts[domain] = (counts[domain] || 0) + count;
      }
    }
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    if (!total) continue;
    for (const [domain, target] of Object.entries(DOMAIN_TARGETS[section])) {
      const actual = (counts[domain] || 0) / total;
      results.push({
        group,
        domain,
        target,
        actual: Number(actual.toFixed(4)),
        delta: Number((actual - target).toFixed(4)),
        withinTarget: Math.abs(actual - target) <= GROUP_DOMAIN_HARD_LIMIT,
      });
    }
  }
  return results;
}

function compareDifficultyConsistency(mocks) {
  const corpusTotal = mocks.reduce((sum, mock) => sum + mock.recordCount, 0);
  const corpusCounts = {};
  for (const mock of mocks) {
    for (const [difficulty, count] of Object.entries(mock.difficulty)) {
      corpusCounts[difficulty] = (corpusCounts[difficulty] || 0) + count;
    }
  }

  const corpusDistribution = Object.fromEntries(
    Object.entries(corpusCounts).map(([difficulty, count]) => [difficulty, count / corpusTotal]),
  );
  const outliers = [];
  for (const mock of mocks) {
    const mockTotal = mock.recordCount || 1;
    for (const difficulty of ['easy', 'medium', 'hard']) {
      const actual = (mock.difficulty[difficulty] || 0) / mockTotal;
      const reference = corpusDistribution[difficulty] || 0;
      if (Math.abs(actual - reference) > DIFFICULTY_MOCK_HARD_LIMIT) {
        outliers.push({
          testKey: mock.testKey,
          difficulty,
          actual: Number(actual.toFixed(4)),
          corpus: Number(reference.toFixed(4)),
          delta: Number((actual - reference).toFixed(4)),
        });
      }
    }
  }
  return {
    corpusDistribution: Object.fromEntries(
      Object.entries(corpusDistribution).map(([key, value]) => [key, Number(value.toFixed(4))]),
    ),
    outliers,
  };
}

function nonMissingCount(map) {
  return Object.entries(map)
    .filter(([key]) => key !== '(missing)')
    .reduce((sum, [, count]) => sum + count, 0);
}

function sectionCount(map) {
  return Object.values(map).reduce((sum, count) => sum + count, 0);
}

function coverage(count, total) {
  return total ? Number((count / total).toFixed(4)) : 0;
}

function difficultyDistribution(mocks) {
  const counts = {};
  let total = 0;
  for (const mock of mocks) {
    total += mock.recordCount;
    for (const [difficulty, count] of Object.entries(mock.difficulty)) counts[difficulty] = (counts[difficulty] || 0) + count;
  }
  return Object.fromEntries(Object.entries(counts).map(([key, value]) => [key, Number((value / total).toFixed(4))]));
}

export function buildBatchMCrossCorpusCalibration(corpus, prerequisiteGate = null) {
  const stats = collectStats(corpus);
  const totalRecords = stats.mocks.reduce((sum, mock) => sum + mock.recordCount, 0);
  const rwTotal = sectionCount(stats.overall.domain['reading-writing']);
  const mathTotal = sectionCount(stats.overall.domain.math);
  const rwTarget = evaluateDomainTargets(stats.overall.domain['reading-writing'], 'reading-writing');
  const mathTarget = evaluateDomainTargets(stats.overall.domain.math, 'math');
  const groupRW = compareGroupDomains(stats.groups, 'reading-writing');
  const groupMath = compareGroupDomains(stats.groups, 'math');
  const difficultyConsistency = compareDifficultyConsistency(stats.mocks);

  const metadata = {
    sourceFamilyCoverage: coverage(nonMissingCount(stats.overall.sourceFamily), rwTotal),
    rhetoricalStructureCoverage: coverage(nonMissingCount(stats.overall.rhetoricalStructure), rwTotal),
    cognitiveOperationCoverage: coverage(nonMissingCount(stats.overall.cognitiveOperation), rwTotal),
    mathApplicationFingerprintCoverage: coverage(nonMissingCount(stats.overall.applicationFingerprint), mathTotal),
  };

  const satMocks = stats.mocks.filter((mock) => mock.group !== 'PSAT');
  const psatMocks = stats.mocks.filter((mock) => mock.group === 'PSAT');
  const satDifficulty = difficultyDistribution(satMocks);
  const psatDifficulty = difficultyDistribution(psatMocks);
  const psatHardRateDelta = psatMocks.length
    ? Number(((psatDifficulty.hard || 0) - (satDifficulty.hard || 0)).toFixed(4))
    : null;

  const mathQuestionTypes = distribution(stats.overall.questionType.math, mathTotal);
  const mathSprRate = mathTotal
    ? Number(((stats.overall.questionType.math['student-produced-response'] || 0) / mathTotal).toFixed(4))
    : 0;

  const mathFigureTypes = Object.fromEntries(
    Object.entries(stats.overall.figureType)
      .filter(([key]) => key !== '(missing)')
      .sort((a, b) => b[1] - a[1])
      .map(([key, count]) => [key, { count, proportion: mathTotal ? Number((count / mathTotal).toFixed(4)) : 0 }]),
  );

  const failures = [];
  const reviews = [];
  if (!rwTarget.findings.every((item) => item.withinTarget) || !mathTarget.findings.every((item) => item.withinTarget)) failures.push('domain-target-deviation-exceeds-5pp');
  if (!groupRW.concat(groupMath).every((item) => item.withinTarget)) failures.push('assessment-group-domain-deviation-exceeds-8pp');
  if (difficultyConsistency.outliers.length) failures.push('per-mock-difficulty-deviation-exceeds-8pp');
  for (const [name, value] of Object.entries(metadata)) if (value < METADATA_COVERAGE_HARD_LIMIT) failures.push(`${name}-below-95-percent`);
  if (!psatMocks.length) failures.push('psat-series-not-identifiable');
  else if (psatHardRateDelta > PSAT_HARD_RATE_MAX_DELTA) failures.push('psat-hard-rate-exceeds-sat-by-more-than-2pp');
  if (mathSprRate < MATH_SPR_REVIEW_MIN || mathSprRate > MATH_SPR_REVIEW_MAX) reviews.push('math-student-produced-response-rate-needs-review-against-25-to-30-percent-target');

  const sourceFamilies = Object.keys(stats.overall.sourceFamily).filter((key) => key !== '(missing)');
  const rhetoricalStructures = Object.keys(stats.overall.rhetoricalStructure).filter((key) => key !== '(missing)');
  const cognitiveOperations = Object.keys(stats.overall.cognitiveOperation).filter((key) => key !== '(missing)');
  if (sourceFamilies.length < 4) failures.push('insufficient-rw-source-family-diversity');
  if (rhetoricalStructures.length < 4) reviews.push('limited-rw-rhetorical-structure-diversity');
  if (cognitiveOperations.length < 4) reviews.push('limited-rw-cognitive-operation-diversity');

  for (const mock of stats.mocks) {
    if (mock.recordCount !== EXPECTED_RECORDS_PER_MOCK) failures.push(`${mock.testKey}-record-count-mismatch`);
  }

  const findings = [
    { check: 'rw-domain-targets', pass: rwTarget.findings.every((item) => item.withinTarget), detail: rwTarget },
    { check: 'math-domain-targets', pass: mathTarget.findings.every((item) => item.withinTarget), detail: mathTarget },
    { check: 'assessment-group-domain-targets', pass: groupRW.concat(groupMath).every((item) => item.withinTarget), detail: { readingWriting: groupRW, math: groupMath } },
    { check: 'difficulty-consistency', pass: difficultyConsistency.outliers.length === 0, detail: difficultyConsistency },
    { check: 'metadata-coverage-by-section', pass: Object.values(metadata).every((value) => value >= METADATA_COVERAGE_HARD_LIMIT), detail: metadata },
    { check: 'sat-psat-difficulty-calibration', pass: psatMocks.length > 0 && psatHardRateDelta <= PSAT_HARD_RATE_MAX_DELTA, detail: { satDifficulty, psatDifficulty, psatHardRateDelta, maxAllowedDelta: PSAT_HARD_RATE_MAX_DELTA } },
    { check: 'math-question-type-calibration', pass: true, detail: { mathQuestionTypes, mathSprRate, statedSpecTarget: 'roughly 25-30 percent SPR' } },
    { check: 'rw-construction-diversity', pass: sourceFamilies.length >= 4, detail: { sourceFamilies, rhetoricalStructures, cognitiveOperations } },
    { check: 'repetition-and-originality', pass: Boolean(prerequisiteGate?.global?.uniqueQuestionIds === totalRecords && prerequisiteGate?.global?.uniqueRWContexts === rwTotal && prerequisiteGate?.global?.uniqueRWPrompts === rwTotal && prerequisiteGate?.global?.uniqueMathApplications === mathTotal), detail: prerequisiteGate?.global || null },
  ];

  return {
    passed: failures.length === 0,
    status: failures.length ? 'cross-corpus-calibration-failed' : 'cross-corpus-calibration-passed',
    mockCount: corpus.length,
    totalRecords,
    groupCounts: Object.fromEntries(Object.entries(stats.groups).map(([group, mocks]) => [group, mocks.length])),
    overall: {
      section: distribution(stats.overall.section, totalRecords),
      domain: {
        'reading-writing': distribution(stats.overall.domain['reading-writing'], rwTotal),
        math: distribution(stats.overall.domain.math, mathTotal),
      },
      skill: {
        'reading-writing': distribution(stats.overall.skill['reading-writing'], rwTotal),
        math: distribution(stats.overall.skill.math, mathTotal),
      },
      difficulty: distribution(stats.overall.difficulty, totalRecords),
      questionType: {
        'reading-writing': distribution(stats.overall.questionType['reading-writing'], rwTotal),
        math: mathQuestionTypes,
      },
      figureType: mathFigureTypes,
    },
    calibration: { findings, failures, reviews },
    satPsat: {
      satDifficulty,
      psatDifficulty,
      psatHardRateDelta,
      psatSatOnlyRecords: psatMocks.reduce((sum, mock) => sum + mock.psatSatOnlyCount, 0),
    },
    releaseBoundary: 'read-only-analysis-production-remains-frozen',
  };
}

export function runBatchMCrossCorpusCalibration(corpus = BATCH_M_ACCEPTED_PRODUCTION_CORPUS) {
  if (!Array.isArray(corpus) || corpus.length !== EXPECTED_MOCK_COUNT) {
    throw new Error(`Batch M cross-corpus calibration: exactly ${EXPECTED_MOCK_COUNT} production mocks are required`);
  }
  const gate = runBatchMFinalCorpusGate(corpus);
  if (!gate.passed) throw new Error('Batch M cross-corpus calibration: prerequisite final 30-mock corpus gate failed');
  const result = buildBatchMCrossCorpusCalibration(corpus, gate);
  return Object.freeze({ prerequisiteFinalCorpusGate: gate.status, ...result });
}

export default runBatchMCrossCorpusCalibration;
