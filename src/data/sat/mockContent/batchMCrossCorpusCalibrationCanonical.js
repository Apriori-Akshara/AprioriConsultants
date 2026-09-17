/**
 * Batch M — calibration wrapper with canonical Math-domain target matching.
 *
 * The legacy calibration module stores domain counts canonically (lowercase,
 * hyphenated) while its Math target labels are display-case strings. This
 * wrapper preserves all existing checks and corrects only that key matching.
 */

import { runBatchMCrossCorpusCalibration as runLegacyCalibration } from './batchMCrossCorpusCalibration';
import { BATCH_M_PRODUCTION_SEQUENCE } from './batchMProductionController';

const DOMAIN_HARD_LIMIT = 0.05;
const GROUP_DOMAIN_HARD_LIMIT = 0.08;
const MATH_TARGETS = {
  algebra: { label: 'Algebra', target: 0.35 },
  'advanced-math': { label: 'Advanced Math', target: 0.35 },
  'problem-solving-and-data-analysis': { label: 'Problem-Solving and Data Analysis', target: 0.15 },
  'geometry-and-trigonometry': { label: 'Geometry and Trigonometry', target: 0.15 },
};

function canonicalDomain(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function groupName(target) {
  if (String(target?.testKey || '').startsWith('PSAT')) return 'PSAT';
  if (String(target?.testKey || '').startsWith('SAT') && Number(target?.assessmentNumber || 0) >= 11) return 'SAT-Series-B';
  return 'SAT-Series-A';
}

function getOverallMathFindings(overallDomain) {
  const total = Object.values(overallDomain || {}).reduce((sum, item) => sum + Number(item?.count || 0), 0);
  return Object.entries(MATH_TARGETS).map(([key, config]) => {
    const actual = total ? Number((Number(overallDomain?.[key]?.count || 0) / total).toFixed(4)) : 0;
    const delta = Number((actual - config.target).toFixed(4));
    return {
      domain: config.label,
      target: config.target,
      actual,
      delta,
      withinTarget: Math.abs(delta) <= DOMAIN_HARD_LIMIT,
    };
  });
}

function getGroupMathFindings(corpus) {
  const countsByGroup = {};
  for (let index = 0; index < corpus.length; index += 1) {
    const target = BATCH_M_PRODUCTION_SEQUENCE[index];
    const group = groupName(target);
    if (!countsByGroup[group]) countsByGroup[group] = {};
    for (const record of [...(corpus[index]?.math || [])]) {
      const domain = canonicalDomain(record?.domain) || '(missing)';
      countsByGroup[group][domain] = (countsByGroup[group][domain] || 0) + 1;
    }
  }

  const findings = [];
  for (const [group, counts] of Object.entries(countsByGroup)) {
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    for (const [key, config] of Object.entries(MATH_TARGETS)) {
      const actual = total ? Number((Number(counts[key] || 0) / total).toFixed(4)) : 0;
      const delta = Number((actual - config.target).toFixed(4));
      findings.push({
        group,
        domain: config.label,
        target: config.target,
        actual,
        delta,
        withinTarget: Math.abs(delta) <= GROUP_DOMAIN_HARD_LIMIT,
      });
    }
  }
  return findings;
}

export function runBatchMCrossCorpusCalibrationCanonical(corpus) {
  const legacy = runLegacyCalibration(corpus);
  const correctedOverall = getOverallMathFindings(legacy.overall?.domain?.math || {});
  const correctedGroupMath = getGroupMathFindings(corpus);
  const correctedFindings = (legacy.calibration?.findings || []).map((finding) => {
    if (finding.check === 'math-domain-targets') {
      return {
        ...finding,
        pass: correctedOverall.every((item) => item.withinTarget),
        detail: {
          total: Object.values(legacy.overall?.domain?.math || {}).reduce((sum, item) => sum + Number(item?.count || 0), 0),
          findings: correctedOverall,
        },
      };
    }
    if (finding.check === 'assessment-group-domain-targets') {
      const readingWriting = finding.detail?.readingWriting || [];
      const readingWritingPass = readingWriting.every((item) => item.withinTarget);
      return {
        ...finding,
        pass: readingWritingPass && correctedGroupMath.every((item) => item.withinTarget),
        detail: { readingWriting, math: correctedGroupMath },
      };
    }
    return finding;
  });

  const correctedFailures = (legacy.calibration?.failures || []).filter(
    (failure) => failure !== 'domain-target-deviation-exceeds-5pp' && failure !== 'assessment-group-domain-deviation-exceeds-8pp',
  );
  if (!correctedOverall.every((item) => item.withinTarget)) correctedFailures.push('domain-target-deviation-exceeds-5pp');
  const rwFinding = correctedFindings.find((finding) => finding.check === 'assessment-group-domain-targets');
  if (rwFinding && !rwFinding.pass) correctedFailures.push('assessment-group-domain-deviation-exceeds-8pp');

  return Object.freeze({
    ...legacy,
    passed: correctedFailures.length === 0,
    status: correctedFailures.length ? 'cross-corpus-calibration-failed' : 'cross-corpus-calibration-passed',
    calibration: {
      ...legacy.calibration,
      findings: correctedFindings,
      failures: correctedFailures,
    },
  });
}

export default runBatchMCrossCorpusCalibrationCanonical;
