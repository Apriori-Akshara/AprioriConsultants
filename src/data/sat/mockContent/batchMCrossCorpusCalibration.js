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

const DOMAIN_TARGETS = {
  'reading-writing': {
    'Craft and Structure': 0.28,
    'Information and Ideas': 0.26,
    'Standard English Conventions': 0.26,
    'Expression of Ideas': 0.20,
  },
  math: {
    Algebra: 0.35,
    'Advanced Math': 0.35,
    'Problem-Solving and Data Analysis': 0.15,
    'Geometry and Trigonometry': 0.15,
  },
};

function collectRecords(mock) {
  return [...(mock?.readingWriting || []), ...(mock?.math || [])];
}

function normalize(value) {
  return String(value ?? '').trim();
}

function increment(map, key) {
  const normalized = normalize(key) || '(missing)';
  map[normalized] = (map[normalized] || 0) + 1;
}

function distribution(counts, total) {
  return Object.fromEntries(
    Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([key, count]) => [key, { count, proportion: total ? Number((count / total).toFixed(4)) : 0 }]),
  );
}

function groupName(mock) {
  if (mock?.assessmentVariant === 'psat') return 'PSAT';
  if (mock?.assessmentVariant === 'sat-series-b') return 'SAT-Series-B';
  return 'SAT-Series-A';
}

function collectStats(corpus) {
  const overall = {
    section: {},
    domain: { 'reading-writing': {}, math: {} },
    skill: { 'reading-writing': {}, math: {} },
    difficulty: {},
    questionType: {},
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
    const group = groupName(mock);
    const records = collectRecords(mock);
    const mockStats = {
      testKey,
      group,
      recordCount: records.length,
      difficulty: {},
      domain: { 'reading-writing': {}, math: {} },
      skill: { 'reading-writing': {}, math: {} },
      metadataPresence: { sourceFamily: 0, rhetoricalStructure: 0, cognitiveOperation: 0, applicationFingerprint: 0 },
      psatSatOnlyCount: 0,
    };

    for (const record of records) {
      increment(overall.section, record.section);
      increment(overall.difficulty, record.difficulty);
      increment(overall.questionType, record.questionType || record.question_type);
      increment(overall.figureType, record?.stimulus?.figure?.figure_type || record?.stimulus?.figure?.type || record?.figure?.figure_type || record?.figure?.type);
      increment(overall.sourceFamily, record?.metadata?.sourceFamily);
      increment(overall.rhetoricalStructure, record?.metadata?.rhetoricalStructure);
      increment(overall.cognitiveOperation, record?.metadata?.cognitiveOperation);
      increment(overall.applicationFingerprint, record?.metadata?.applicationFingerprint);

      if (overall.domain[record.section]) increment(overall.domain[record.section], record.domain);
      if (overall.skill[record.section]) increment(overall.skill[record.section], record.skill);
      if (mockStats.domain[record.section]) increment(mockStats.domain[record.section], record.domain);
      if (mockStats.skill[record.section]) increment(mockStats.skill[record.section], record.skill);
      increment(mockStats.difficulty, record.difficulty);

      if (record?.metadata?.sourceFamily) mockStats.metadataPresence.sourceFamily += 1;
      if (record?.metadata?.rhetoricalStructure) mockStats.metadataPresence.rhetoricalStructure += 1;
      if (record?.metadata?.cognitiveOperation) mockStats.metadataPresence.cognitiveOperation += 1;
      if (record?.metadata?.applicationFingerprint) mockStats.metadataPresence.applicationFingerprint += 1;

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

export function buildBatchMCrossCorpusCalibration(corpus) {
  const stats = collectStats(corpus);
  const totalRecords = stats.mocks.reduce((sum, mock) => sum + mock.recordCount, 0);
  const rwTarget = evaluateDomainTargets(stats.overall.domain['reading-writing'], 'reading-writing');
  const mathTarget = evaluateDomainTargets(stats.overall.domain.math, 'math');
  const groupRW = compareGroupDomains(stats.groups, 'reading-writing');
  const groupMath = compareGroupDomains(stats.groups, 'math');
  const difficultyConsistency = compareDifficultyConsistency(stats.mocks);

  const metadata = {
    sourceFamilyCoverage: coverage(nonMissingCount(stats.overall.sourceFamily), totalRecords),
    rhetoricalStructureCoverage: coverage(nonMissingCount(stats.overall.rhetoricalStructure), totalRecords),
    cognitiveOperationCoverage: coverage(nonMissingCount(stats.overall.cognitiveOperation), totalRecords),
    mathApplicationFingerprintCoverage: coverage(nonMissingCount(stats.overall.applicationFingerprint), totalRecords),
  };

  const satMocks = stats.mocks.filter((mock) => mock.group !== 'PSAT');
  const psatMocks = stats.mocks.filter((mock) => mock.group === 'PSAT');
  const satDifficulty = difficultyDistribution(satMocks);
  const psatDifficulty = difficultyDistribution(psatMocks);
  const psatHardRateDelta = Number(((psatDifficulty.hard || 0) - (satDifficulty.hard || 0)).toFixed(4));

  const failures = [];
  const reviews = [];
  if (!rwTarget.findings.every((item) => item.withinTarget) || !mathTarget.findings.every((item) => item.withinTarget)) failures.push('domain-target-deviation-exceeds-5pp');
  if (!groupRW.concat(groupMath).every((item) => item.withinTarget)) failures.push('assessment-group-domain-deviation-exceeds-8pp');
  if (difficultyConsistency.outliers.length) failures.push('per-mock-difficulty-deviation-exceeds-8pp');
  for (const [name, value] of Object.entries(metadata)) if (value < METADATA_COVERAGE_HARD_LIMIT) failures.push(`${name}-below-95-percent`);
  if (psatHardRateDelta > PSAT_HARD_RATE_MAX_DELTA) failures.push('psat-hard-rate-exceeds-sat-by-more-than-2pp');
  else if (psatHardRateDelta > 0) reviews.push('psat-hard-rate-slightly-above-sat-hard-rate');

  const sourceFamilies = Object.keys(stats.overall.sourceFamily).filter((key) => key !== '(missing)');
  const rhetoricalStructures = Object.keys(stats.overall.rhetoricalStructure).filter((key) => key !== '(missing)');
  const cognitiveOperations = Object.keys(stats.overall.cognitiveOperation).filter((key) => key !== '(missing)');
  if (sourceFamilies.length < 4) failures.push('insufficient-rw-source-family-diversity');
  if (rhetoricalStructures.length < 4) reviews.push('limited-rw-rhetorical-structure-diversity');
  if (cognitiveOperations.length < 4) reviews.push('limited-rw-cognitive-operation-diversity');

  const findings = [
    { check: 'rw-domain-targets', pass: rwTarget.findings.every((item) => item.withinTarget), detail: rwTarget },
    { check: 'math-domain-targets', pass: mathTarget.findings.every((item) => item.withinTarget), detail: mathTarget },
    { check: 'assessment-group-domain-targets', pass: groupRW.concat(groupMath).every((item) => item.withinTarget), detail: { readingWriting: groupRW, math: groupMath } },
    { check: 'difficulty-consistency', pass: difficultyConsistency.outliers.length === 0, detail: difficultyConsistency },
    { check: 'metadata-coverage', pass: Object.values(metadata).every((value) => value >= METADATA_COVERAGE_HARD_LIMIT), detail: metadata },
    { check: 'sat-psat-difficulty-calibration', pass: psatHardRateDelta <= PSAT_HARD_RATE_MAX_DELTA, detail: { satDifficulty, psatDifficulty, psatHardRateDelta, maxAllowedDelta: PSAT_HARD_RATE_MAX_DELTA } },
    { check: 'rw-construction-diversity', pass: sourceFamilies.length >= 4, detail: { sourceFamilies, rhetoricalStructures, cognitiveOperations } },
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
        'reading-writing': distribution(stats.overall.domain['reading-writing'], Object.values(stats.overall.domain['reading-writing']).reduce((sum, count) => sum + count, 0)),
        math: distribution(stats.overall.domain.math, Object.values(stats.overall.domain.math).reduce((sum, count) => sum + count, 0)),
      },
      skill: {
        'reading-writing': distribution(stats.overall.skill['reading-writing'], Object.values(stats.overall.skill['reading-writing']).reduce((sum, count) => sum + count, 0)),
        math: distribution(stats.overall.skill.math, Object.values(stats.overall.skill.math).reduce((sum, count) => sum + count, 0)),
      },
      difficulty: distribution(stats.overall.difficulty, totalRecords),
      questionType: distribution(stats.overall.questionType, totalRecords),
      figureType: distribution(stats.overall.figureType, totalRecords),
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
  const result = buildBatchMCrossCorpusCalibration(corpus);
  return Object.freeze({ prerequisiteFinalCorpusGate: gate.status, ...result });
}

export default runBatchMCrossCorpusCalibration;
