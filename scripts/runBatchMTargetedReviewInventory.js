/**
 * Batch M — read-only targeted review inventory.
 *
 * Converts the frozen first-20 impact classification into a deterministic
 * review inventory. It records exact mock/question IDs, flags, classification
 * overlap, mock/section distribution, and review-bucket membership.
 *
 * This script never changes production content and never approves replacements.
 */

import fs from 'node:fs';
import path from 'node:path';
import { runImpactClassification } from './runBatchMImpactClassification.js';

const REPORT_PATH = path.resolve(
  process.cwd(),
  'docs/BATCH-M-TARGETED-REVIEW-INVENTORY-2026-09-15.json'
);

function increment(map, key) {
  map[key] = (map[key] || 0) + 1;
}

function bucketFor(classifications) {
  const high = classifications.includes('HIGH_CONFIDENCE_CONTENT_REVIEW');
  const difficulty = classifications.includes('DIFFICULTY_CALIBRATION_REVIEW');
  const structural = classifications.includes('STRUCTURAL_REVIEW');

  if (high && difficulty) return 'HIGH_CONFIDENCE_PLUS_DIFFICULTY';
  if (high) return 'HIGH_CONFIDENCE_CONTENT_REVIEW';
  if (difficulty) return 'DIFFICULTY_CALIBRATION_REVIEW';
  if (structural) return 'STRUCTURAL_REVIEW';
  return 'OTHER_REVIEW';
}

export function buildTargetedReviewInventory() {
  const classification = runImpactClassification();
  const questions = classification.questionClassifications.map((item) => ({
    testKey: item.testKey,
    questionId: item.questionId,
    section: item.section,
    skill: item.skill,
    domain: item.domain,
    difficulty: item.difficulty,
    flags: item.flags,
    classifications: item.classifications,
    reviewBucket: bucketFor(item.classifications),
  }));

  const bucketCounts = {};
  const classCounts = {};
  const flagCounts = {};
  const mockCounts = {};
  const sectionCounts = {};

  questions.forEach((question) => {
    increment(bucketCounts, question.reviewBucket);

    question.classifications.forEach((classificationName) => {
      increment(classCounts, classificationName);
    });

    question.flags.forEach((flag) => {
      increment(flagCounts, flag);
    });

    const mock = mockCounts[question.testKey] || {
      totalAffected: 0,
      highConfidence: 0,
      difficultyCalibration: 0,
      highConfidencePlusDifficulty: 0,
      structural: 0,
      other: 0,
    };
    mock.totalAffected += 1;
    if (question.reviewBucket === 'HIGH_CONFIDENCE_CONTENT_REVIEW') mock.highConfidence += 1;
    if (question.reviewBucket === 'DIFFICULTY_CALIBRATION_REVIEW') mock.difficultyCalibration += 1;
    if (question.reviewBucket === 'HIGH_CONFIDENCE_PLUS_DIFFICULTY') mock.highConfidencePlusDifficulty += 1;
    if (question.reviewBucket === 'STRUCTURAL_REVIEW') mock.structural += 1;
    if (question.reviewBucket === 'OTHER_REVIEW') mock.other += 1;
    mockCounts[question.testKey] = mock;

    const sectionKey = `${question.testKey}:${question.section}`;
    const section = sectionCounts[sectionKey] || {
      testKey: question.testKey,
      section: question.section,
      affected: 0,
    };
    section.affected += 1;
    sectionCounts[sectionKey] = section;
  });

  return {
    inventoryType: 'read-only-targeted-review-inventory',
    generatedFrom: 'first-20-production-impact-classification',
    auditedMocks: classification.auditedMocks,
    auditedQuestions: classification.auditedQuestions,
    affectedUniqueQuestionCount: questions.length,
    classCounts,
    bucketCounts,
    flagCounts,
    mockCounts,
    sectionCounts: Object.values(sectionCounts).sort((a, b) => `${a.testKey}:${a.section}`.localeCompare(`${b.testKey}:${b.section}`)),
    questions,
    mockSprFindings: classification.mockSprFindings,
    productionMutation: false,
    releaseEligible: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    status: 'TARGETED_REVIEW_INVENTORY_READY',
  };
}

function printSummary(inventory) {
  console.log('Batch M targeted review inventory complete.');
  console.log(`Audited mocks: ${inventory.auditedMocks}`);
  console.log(`Audited questions: ${inventory.auditedQuestions}`);
  console.log(`Affected unique questions inventoried: ${inventory.affectedUniqueQuestionCount}`);
  console.log(`productionMutation: ${inventory.productionMutation}`);
  console.log(`releaseEligible: ${inventory.releaseEligible}`);
  console.log(`replacementAuthorization: ${inventory.replacementAuthorization}`);
  console.log('');
  console.log('Review buckets:');
  Object.keys(inventory.bucketCounts).sort().forEach((bucket) => {
    console.log(`  ${bucket}: ${inventory.bucketCounts[bucket]}`);
  });
  console.log('');
  console.log('Finding flags:');
  Object.keys(inventory.flagCounts).sort().forEach((flag) => {
    console.log(`  ${flag}: ${inventory.flagCounts[flag]}`);
  });
  console.log('');
  console.log('The generated JSON report contains the exact mock/question IDs and review reasons.');
  console.log(`Report path: ${path.relative(process.cwd(), REPORT_PATH)}`);
  console.log('');
  console.log(JSON.stringify({
    inventoryType: inventory.inventoryType,
    auditedMocks: inventory.auditedMocks,
    auditedQuestions: inventory.auditedQuestions,
    affectedUniqueQuestionCount: inventory.affectedUniqueQuestionCount,
    classCounts: inventory.classCounts,
    bucketCounts: inventory.bucketCounts,
    flagCounts: inventory.flagCounts,
    productionMutation: inventory.productionMutation,
    releaseEligible: inventory.releaseEligible,
    replacementAuthorization: inventory.replacementAuthorization,
    status: inventory.status,
  }));
}

function main() {
  const inventory = buildTargetedReviewInventory();
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(inventory, null, 2)}\n`, 'utf8');
  printSummary(inventory);
}

const isDirectExecution = import.meta.url === new URL(`file://${process.argv[1].replaceAll('\\', '/')}`).href;
if (isDirectExecution) main();
