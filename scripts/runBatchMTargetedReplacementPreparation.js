/**
 * Batch M — read-only targeted replacement preparation.
 *
 * Converts the frozen targeted-review inventory into an explicit remediation
 * plan for each affected production question. This is preparation only:
 * it does not generate, select, write, replace, delete, reorder, or release
 * any production question.
 */

import fs from 'node:fs';
import path from 'node:path';
import { buildTargetedReviewInventory } from './runBatchMTargetedReviewInventory.js';

const REPORT_PATH = path.resolve(
  process.cwd(),
  'docs/BATCH-M-TARGETED-REPLACEMENT-PREPARATION-2026-09-15.json'
);

const FLAG_ACTIONS = {
  'math-generic-numeric-distractor': {
    action: 'CONTENT_REPLACEMENT',
    priority: 'HIGH',
    track: 'MATH_DISTRACTOR_REMEDIATION',
    instruction: 'Replace with a mathematically valid item whose distractors represent meaningful misconception or reasoning paths, not generic numeric variants.'
  },
  'rw-fixed-wic-target': {
    action: 'CONTENT_REPLACEMENT',
    priority: 'HIGH',
    track: 'RW_WIC_REMEDIATION',
    instruction: 'Replace with a genuine Words in Context item whose tested word is determined by the stimulus and question context rather than a fixed repeated target.'
  },
  'rw-template-density': {
    action: 'CONTENT_REPLACEMENT',
    priority: 'HIGH',
    track: 'RW_CONSTRUCTION_REMEDIATION',
    instruction: 'Replace with a more varied R&W construction that preserves the intended skill and difficulty while removing template-density weakness.'
  },
  'hard-label-without-demand-feature': {
    action: 'DIFFICULTY_REVIEW_AND_REPLACEMENT',
    priority: 'HIGH',
    track: 'DIFFICULTY_CALIBRATION',
    instruction: 'Review the item against the intended hard-level reasoning demand; replace when the existing item cannot be corrected without changing its substantive construction.'
  },
};

function unique(values) {
  return [...new Set(values)];
}

function buildPlanForQuestion(question) {
  const actions = [];
  const priorities = [];
  const tracks = [];
  const instructions = [];

  question.flags.forEach((flag) => {
    const rule = FLAG_ACTIONS[flag];
    if (!rule) return;
    actions.push(rule.action);
    priorities.push(rule.priority);
    tracks.push(rule.track);
    instructions.push(rule.instruction);
  });

  if (actions.includes('CONTENT_REPLACEMENT') && actions.includes('DIFFICULTY_REVIEW_AND_REPLACEMENT')) {
    return {
      ...question,
      remediationType: 'CONTENT_REPLACEMENT_PLUS_DIFFICULTY_CALIBRATION',
      priority: 'HIGH',
      tracks: unique(tracks),
      instructions: unique(instructions),
      candidateSelection: 'TARGETED_CANDIDATE_POOL_REQUIRED',
      productionMutation: false,
      replacementAuthorized: false,
    };
  }

  if (actions.includes('CONTENT_REPLACEMENT')) {
    return {
      ...question,
      remediationType: 'CONTENT_REPLACEMENT',
      priority: priorities.includes('HIGH') ? 'HIGH' : 'NORMAL',
      tracks: unique(tracks),
      instructions: unique(instructions),
      candidateSelection: 'TARGETED_CANDIDATE_POOL_REQUIRED',
      productionMutation: false,
      replacementAuthorized: false,
    };
  }

  if (actions.includes('DIFFICULTY_REVIEW_AND_REPLACEMENT')) {
    return {
      ...question,
      remediationType: 'DIFFICULTY_CALIBRATION_AND_POSSIBLE_REPLACEMENT',
      priority: 'HIGH',
      tracks: unique(tracks),
      instructions: unique(instructions),
      candidateSelection: 'DIFFICULTY_REVIEW_REQUIRED',
      productionMutation: false,
      replacementAuthorized: false,
    };
  }

  return {
    ...question,
    remediationType: 'MANUAL_REVIEW_REQUIRED',
    priority: 'NORMAL',
    tracks: unique(tracks),
    instructions: unique(instructions),
    candidateSelection: 'MANUAL_REVIEW_REQUIRED',
    productionMutation: false,
    replacementAuthorized: false,
  };
}

export function buildTargetedReplacementPreparation() {
  const inventory = buildTargetedReviewInventory();
  const questions = inventory.questions.map(buildPlanForQuestion);

  const remediationCounts = {};
  const trackCounts = {};
  const mockCounts = {};
  const sectionCounts = {};

  questions.forEach((question) => {
    remediationCounts[question.remediationType] =
      (remediationCounts[question.remediationType] || 0) + 1;

    question.tracks.forEach((track) => {
      trackCounts[track] = (trackCounts[track] || 0) + 1;
    });

    const mock = mockCounts[question.testKey] || {
      total: 0,
      contentReplacement: 0,
      contentPlusDifficulty: 0,
      difficultyReview: 0,
    };
    mock.total += 1;
    if (question.remediationType === 'CONTENT_REPLACEMENT') mock.contentReplacement += 1;
    if (question.remediationType === 'CONTENT_REPLACEMENT_PLUS_DIFFICULTY_CALIBRATION') mock.contentPlusDifficulty += 1;
    if (question.remediationType === 'DIFFICULTY_CALIBRATION_AND_POSSIBLE_REPLACEMENT') mock.difficultyReview += 1;
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
    preparationType: 'read-only-targeted-replacement-preparation',
    generatedFrom: 'frozen-targeted-review-inventory',
    auditedMocks: inventory.auditedMocks,
    auditedQuestions: inventory.auditedQuestions,
    affectedUniqueQuestionCount: questions.length,
    remediationCounts,
    trackCounts,
    mockCounts,
    sectionCounts: Object.values(sectionCounts).sort((a, b) => `${a.testKey}:${a.section}`.localeCompare(`${b.testKey}:${b.section}`)),
    questions,
    mockSprFindings: inventory.mockSprFindings,
    productionMutation: false,
    releaseEligible: false,
    replacementAuthorization: 'NOT_AUTHORIZED',
    status: 'TARGETED_REPLACEMENT_PREPARATION_READY',
  };
}

function printSummary(preparation) {
  console.log('Batch M targeted replacement preparation complete.');
  console.log(`Audited mocks: ${preparation.auditedMocks}`);
  console.log(`Audited questions: ${preparation.auditedQuestions}`);
  console.log(`Affected unique questions prepared: ${preparation.affectedUniqueQuestionCount}`);
  console.log(`productionMutation: ${preparation.productionMutation}`);
  console.log(`releaseEligible: ${preparation.releaseEligible}`);
  console.log(`replacementAuthorization: ${preparation.replacementAuthorization}`);
  console.log('');
  console.log('Remediation types:');
  Object.keys(preparation.remediationCounts).sort().forEach((type) => {
    console.log(`  ${type}: ${preparation.remediationCounts[type]}`);
  });
  console.log('');
  console.log('Remediation tracks:');
  Object.keys(preparation.trackCounts).sort().forEach((track) => {
    console.log(`  ${track}: ${preparation.trackCounts[track]}`);
  });
  console.log('');
  console.log('The generated JSON report contains the exact question IDs and remediation instructions.');
  console.log(`Report path: ${path.relative(process.cwd(), REPORT_PATH)}`);
  console.log('');
  console.log(JSON.stringify({
    preparationType: preparation.preparationType,
    auditedMocks: preparation.auditedMocks,
    auditedQuestions: preparation.auditedQuestions,
    affectedUniqueQuestionCount: preparation.affectedUniqueQuestionCount,
    remediationCounts: preparation.remediationCounts,
    trackCounts: preparation.trackCounts,
    productionMutation: preparation.productionMutation,
    releaseEligible: preparation.releaseEligible,
    replacementAuthorization: preparation.replacementAuthorization,
    status: preparation.status,
  }));
}

function main() {
  const preparation = buildTargetedReplacementPreparation();
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(preparation, null, 2)}\n`, 'utf8');
  printSummary(preparation);
}

const isDirectExecution = import.meta.url === new URL(`file://${process.argv[1].replaceAll('\\', '/')}`).href;
if (isDirectExecution) main();
