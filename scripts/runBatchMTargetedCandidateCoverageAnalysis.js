/**
 * Batch M — targeted candidate-coverage analysis.
 *
 * Read-only analysis of the runtime candidate-selection report. Identifies
 * exact section/skill combinations with no eligible candidate so the next
 * remediation-generator expansion can be targeted rather than speculative.
 *
 * This script never changes production content and never grants replacement
 * authorization.
 */

import fs from 'node:fs';
import path from 'node:path';

const INPUT = path.resolve(process.cwd(), 'docs/BATCH-M-TARGETED-CANDIDATE-SELECTION-2026-09-15.json');
const OUTPUT = path.resolve(process.cwd(), 'docs/BATCH-M-TARGETED-CANDIDATE-COVERAGE-2026-09-15.json');

function increment(map, key) {
  map[key] = (map[key] || 0) + 1;
}

function sortEntries(map) {
  return Object.entries(map)
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
}

function incrementNested(map, groupKey, reason) {
  if (!map[groupKey]) map[groupKey] = {};
  increment(map[groupKey], reason);
}

function main() {
  if (!fs.existsSync(INPUT)) throw new Error(`Missing candidate-selection report: ${INPUT}`);

  const report = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
  if (report.affectedUniqueQuestionCount !== 2144) {
    throw new Error(`Expected 2144 affected records; found ${report.affectedUniqueQuestionCount}`);
  }
  if (!Array.isArray(report.records) || report.records.length !== 2144) {
    throw new Error(`Expected 2144 report records; found ${report.records?.length ?? 'missing'}`);
  }

  const targetCounts = {};
  const selectedCounts = {};
  const noCandidateCounts = {};
  const noCandidateBySection = {};
  const noCandidateByTest = {};
  const remediationCounts = {};
  const rejectionReasons = {};
  const rejectionReasonsBySkill = {};

  report.records.forEach((record) => {
    const key = `${record.section}:${record.skill}`;
    increment(targetCounts, key);
    increment(remediationCounts, record.remediationType);

    if (record.selectedCandidateKey) {
      increment(selectedCounts, key);
    } else if (record.remediationType !== 'DIFFICULTY_CALIBRATION_AND_POSSIBLE_REPLACEMENT') {
      increment(noCandidateCounts, key);
      increment(noCandidateBySection, record.section);
      increment(noCandidateByTest, record.testKey);

      (record.options || []).forEach((option) => {
        (option.reasons || []).forEach((reason) => {
          increment(rejectionReasons, reason);
          incrementNested(rejectionReasonsBySkill, key, reason);
        });
      });
    }
  });

  const missingSkillCoverage = sortEntries(noCandidateCounts).map(({ key, count }) => {
    const [section, ...skillParts] = key.split(':');
    const skill = skillParts.join(':');
    return {
      section,
      skill,
      noEligibleCandidateCount: count,
      targetCount: targetCounts[key] || 0,
      selectedCount: selectedCounts[key] || 0,
      coveragePercent: targetCounts[key]
        ? Number(((selectedCounts[key] || 0) / targetCounts[key] * 100).toFixed(2))
        : 0,
      topRejectionReasons: sortEntries(rejectionReasonsBySkill[key] || {}).slice(0, 6),
    };
  });

  const rejectionReasonsByMissingSkill = Object.entries(rejectionReasonsBySkill)
    .map(([key, reasons]) => ({ key, reasons: sortEntries(reasons).slice(0, 10) }))
    .sort((a, b) => a.key.localeCompare(b.key));

  const reportOut = {
    reportType: 'batch-m-targeted-candidate-coverage-analysis',
    reportVersion: '2026-09-15.targeted-candidate-coverage.v2',
    sourceReport: path.relative(process.cwd(), INPUT),
    affectedUniqueQuestionCount: report.affectedUniqueQuestionCount,
    selectionSummary: report.summary,
    remediationCounts,
    targetSkillCounts: sortEntries(targetCounts),
    selectedSkillCounts: sortEntries(selectedCounts),
    noEligibleCandidateSkillCounts: missingSkillCoverage,
    noEligibleCandidateBySection: sortEntries(noCandidateBySection),
    noEligibleCandidateByTest: sortEntries(noCandidateByTest),
    rejectionReasonCounts: sortEntries(rejectionReasons),
    rejectionReasonsByMissingSkill,
    productionMutation: false,
    releaseEligible: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    sat21Created: false,
    status: 'CANDIDATE_COVERAGE_GAP_IDENTIFIED',
    nextAction: 'Use rejection-reason evidence to expand or refine remediation candidate generation only for the actual blocking filters; do not authorize production replacement yet.',
  };

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, `${JSON.stringify(reportOut, null, 2)}\n`, 'utf8');

  console.log(JSON.stringify({
    affectedUniqueQuestionCount: reportOut.affectedUniqueQuestionCount,
    selectedCount: report.summary.selected,
    noEligibleCandidateCount: report.summary.noEligibleCandidate,
    topMissingSkillGroups: missingSkillCoverage.slice(0, 20),
    rejectionReasonCounts: reportOut.rejectionReasonCounts,
    productionMutation: false,
    releaseEligible: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    reportPath: path.relative(process.cwd(), OUTPUT),
  }, null, 2));
}

main();
