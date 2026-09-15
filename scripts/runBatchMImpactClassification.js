/**
 * Batch M — read-only classification of production impact findings.
 *
 * Reuses the frozen first-20 impact audit. No production record is changed,
 * replaced, deleted, reordered, or marked release-eligible by this script.
 */

import { runImpactAudit } from './runBatchMProductionImpactAudit.js';

const QUESTION_LEVEL_CLASSES = {
  HIGH_CONFIDENCE_CONTENT_REVIEW: new Set([
    'rw-fixed-wic-target',
    'rw-template-density',
    'math-generic-numeric-distractor',
  ]),
  DIFFICULTY_CALIBRATION_REVIEW: new Set([
    'hard-label-without-demand-feature',
    'medium-item-too-thin',
    'easy-label-conflicts-with-multi-step',
    'math-hard-without-reasoning-feature',
    'math-hard-not-multi-step',
  ]),
  STRUCTURAL_REVIEW: new Set([
    'rw-cross-text-structure-missing',
    'rw-synthesis-goal-missing',
    'rw-blueprint-metadata-incomplete',
    'math-template-density',
    'math-figure-not-essential',
    'rw-choice-near-duplicate',
  ]),
};

function classifyFinding(finding) {
  if (!finding.questionId) {
    return 'MOCK_LEVEL_DISTRIBUTION_REVIEW';
  }

  const flags = new Set(finding.flags || []);
  const classes = [];

  Object.entries(QUESTION_LEVEL_CLASSES).forEach(([name, classFlags]) => {
    if ([...flags].some((flag) => classFlags.has(flag))) classes.push(name);
  });

  return classes.length ? classes : ['UNCLASSIFIED_REVIEW'];
}

function buildQuestionClassification(findings) {
  const byQuestion = new Map();

  findings.filter((finding) => finding.questionId).forEach((finding) => {
    const key = `${finding.testKey}::${finding.questionId}`;
    const existing = byQuestion.get(key) || {
      testKey: finding.testKey,
      questionId: finding.questionId,
      section: finding.section,
      skill: finding.skill,
      domain: finding.domain,
      difficulty: finding.difficulty,
      flags: new Set(),
      classifications: new Set(),
    };

    finding.flags.forEach((flag) => existing.flags.add(flag));
    classifyFinding(finding).forEach((classification) => existing.classifications.add(classification));
    byQuestion.set(key, existing);
  });

  return [...byQuestion.values()].map((item) => ({
    ...item,
    flags: [...item.flags].sort(),
    classifications: [...item.classifications].sort(),
  }));
}

function main() {
  const audit = runImpactAudit();
  const questionClassifications = buildQuestionClassification(audit.findings);

  const classCounts = {};
  questionClassifications.forEach((item) => {
    item.classifications.forEach((classification) => {
      classCounts[classification] = (classCounts[classification] || 0) + 1;
    });
  });

  const mockSprFindings = audit.findings.filter((finding) => !finding.questionId);

  const summary = {
    classificationType: 'read-only-production-impact-classification',
    auditedMocks: audit.auditedMocks,
    auditedQuestions: audit.auditedQuestions,
    affectedUniqueQuestionCount: questionClassifications.length,
    mockLevelDistributionFindingCount: mockSprFindings.length,
    classificationCounts: classCounts,
    productionMutation: false,
    releaseEligible: false,
    status: 'IMPACT_CLASSIFICATION_COMPLETE',
  };

  console.log('Batch M production impact classification complete.');
  console.log(`Audited mocks: ${summary.auditedMocks}`);
  console.log(`Audited questions: ${summary.auditedQuestions}`);
  console.log(`Affected unique questions classified: ${summary.affectedUniqueQuestionCount}`);
  console.log(`Mock-level distribution findings: ${summary.mockLevelDistributionFindingCount}`);
  console.log(`productionMutation: ${summary.productionMutation}`);
  console.log(`releaseEligible: ${summary.releaseEligible}`);
  console.log('');
  console.log('Classification counts (unique question records; overlapping classes may count the same question more than once):');
  Object.keys(classCounts).sort().forEach((classification) => {
    console.log(`  ${classification}: ${classCounts[classification]}`);
  });

  console.log('');
  console.log('Mock-level SPR review:');
  mockSprFindings.forEach((finding) => {
    console.log(`  ${finding.testKey}: ${finding.flags.join(', ')}`);
  });

  console.log('');
  console.log('Top-level decision:');
  console.log('  No question is automatically approved for replacement.');
  console.log('  The classification identifies review groups only.');
  console.log('');
  console.log(JSON.stringify(summary));
}

main();
