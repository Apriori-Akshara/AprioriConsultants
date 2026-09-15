/**
 * Batch M — read-only production impact audit.
 *
 * Inspects only the frozen SAT1–SAT10 and PSAT1–PSAT10 production records.
 * It intentionally does NOT import batchMProductionStore.js because that module
 * eagerly executes SAT11–SAT20 as part of its module initialization.
 * It never mutates production records and never makes a release decision.
 */

import { runBatchMFirstProductionGate } from '../src/data/sat/mockContent/batchMFirstProductionGate.js';
import { runBatchMSecondProductionGate } from '../src/data/sat/mockContent/batchMSecondProductionGate.js';
import { runBatchMThirdProductionGate } from '../src/data/sat/mockContent/batchMThirdProductionGate.js';
import { runBatchMFourthProductionGate } from '../src/data/sat/mockContent/batchMFourthProductionGate.js';
import { runBatchMFifthProductionGate } from '../src/data/sat/mockContent/batchMFifthProductionGate.js';
import { runBatchMSixthProductionGate } from '../src/data/sat/mockContent/batchMSixthProductionGate.js';
import { runBatchMSeventhProductionGate } from '../src/data/sat/mockContent/batchMSeventhProductionGate.js';
import { runBatchMEighthProductionGate } from '../src/data/sat/mockContent/batchMEighthProductionGate.js';
import { runBatchMNinthProductionGate } from '../src/data/sat/mockContent/batchMNinthProductionGate.js';
import { runBatchMTenthProductionGate } from '../src/data/sat/mockContent/batchMTenthProductionGate.js';
import { runBatchMPSATFirstProductionGate } from '../src/data/sat/mockContent/batchMPSATFirstProductionGate.js';
import { runBatchMPSATSecondProductionGate } from '../src/data/sat/mockContent/batchMPSATSecondProductionGate.js';
import { runBatchMPSATThirdProductionGate } from '../src/data/sat/mockContent/batchMPSATThirdProductionGate.js';
import { runBatchMPSATFourthProductionGate } from '../src/data/sat/mockContent/batchMPSATFourthProductionGate.js';
import { runBatchMPSATFifthProductionGate } from '../src/data/sat/mockContent/batchMPSATFifthProductionGate.js';
import { runBatchMPSATSixthProductionGate } from '../src/data/sat/mockContent/batchMPSATSixthProductionGate.js';
import { runBatchMPSATSeventhProductionGate } from '../src/data/sat/mockContent/batchMPSATSeventhProductionGate.js';
import { runBatchMPSATEighthProductionGate } from '../src/data/sat/mockContent/batchMPSATEighthProductionGate.js';
import { runBatchMPSATNinthProductionGate } from '../src/data/sat/mockContent/batchMPSATNinthProductionGate.js';
import { runBatchMPSATTenthProductionGate } from '../src/data/sat/mockContent/batchMPSATTenthProductionGate.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';

export const TARGET_KEYS = [
  ...Array.from({ length: 10 }, (_, index) => `SAT${index + 1}`),
  ...Array.from({ length: 10 }, (_, index) => `PSAT${index + 1}`),
];

export const IMPACT_FLAGS = new Set([
  'rw-template-density',
  'rw-choice-near-duplicate',
  'rw-fixed-wic-target',
  'rw-cross-text-structure-missing',
  'rw-synthesis-goal-missing',
  'rw-blueprint-metadata-incomplete',
  'medium-item-too-thin',
  'hard-label-without-demand-feature',
  'easy-label-conflicts-with-multi-step',
  'math-template-density',
  'math-hard-without-reasoning-feature',
  'math-hard-not-multi-step',
  'math-generic-numeric-distractor',
  'math-figure-not-essential',
]);

export function flagCategory(flag) {
  if (flag.startsWith('rw-')) return 'R&W construction/content';
  if (flag.includes('difficulty') || flag.includes('multi-step') || flag === 'medium-item-too-thin') {
    return 'Difficulty/reasoning demand';
  }
  if (flag.startsWith('math-')) return 'Math construction/content';
  return 'Other';
}

function collectQuestions(mock) {
  return [
    ...(Array.isArray(mock?.readingWriting) ? mock.readingWriting : []),
    ...(Array.isArray(mock?.math) ? mock.math : []),
  ];
}

export function auditMock(mock, testKey) {
  const questions = collectQuestions(mock);
  const findings = [];

  questions.forEach((question) => {
    const result = evaluateContentQuality(question);
    if (result.productionMutation !== false) {
      throw new Error(`Production impact audit: production mutation safeguard failed for ${question?.questionId || 'unknown question'}`);
    }

    const checks = Array.isArray(result.checks) ? result.checks : [];
    const impactChecks = checks.filter((check) => IMPACT_FLAGS.has(check));

    if (impactChecks.length) {
      findings.push({
        testKey,
        questionId: String(question?.questionId || question?.contentId || 'UNKNOWN'),
        section: String(question?.section || 'unknown'),
        skill: String(question?.skill || ''),
        domain: String(question?.domain || ''),
        difficulty: String(question?.difficulty || ''),
        flags: impactChecks,
        categories: [...new Set(impactChecks.map(flagCategory))],
      });
    }
  });

  const math = Array.isArray(mock?.math) ? mock.math : [];
  const sprCount = math.filter((question) => question?.questionType === 'student-produced-response').length;
  const sprPercent = math.length ? Number(((sprCount / math.length) * 100).toFixed(2)) : 0;
  const sprOutsideTarget = math.length > 0 && (sprPercent < 25 || sprPercent > 30);

  if (sprOutsideTarget) {
    findings.push({
      testKey,
      questionId: null,
      section: 'math',
      skill: '',
      domain: '',
      difficulty: '',
      flags: ['math-spr-distribution-outside-25-30-percent'],
      categories: ['Math SPR distribution'],
    });
  }

  return {
    testKey,
    testId: String(mock?.testId || ''),
    questionCount: questions.length,
    rwCount: Array.isArray(mock?.readingWriting) ? mock.readingWriting.length : 0,
    mathCount: math.length,
    sprCount,
    sprPercent,
    findings,
  };
}

export function buildFirstTwentyProductionMocks() {
  const satResults = [];
  const sat1 = runBatchMFirstProductionGate().productionMock;
  satResults.push(sat1);
  satResults.push(runBatchMSecondProductionGate(sat1).productionMock);
  satResults.push(runBatchMThirdProductionGate(satResults).productionMock);
  satResults.push(runBatchMFourthProductionGate(satResults).productionMock);
  satResults.push(runBatchMFifthProductionGate(satResults).productionMock);
  satResults.push(runBatchMSixthProductionGate(satResults).productionMock);
  satResults.push(runBatchMSeventhProductionGate(satResults).productionMock);
  satResults.push(runBatchMEighthProductionGate(satResults).productionMock);
  satResults.push(runBatchMNinthProductionGate(satResults).productionMock);
  satResults.push(runBatchMTenthProductionGate(satResults).productionMock);

  const allPrior = [...satResults];
  const psatResults = [];
  psatResults.push(runBatchMPSATFirstProductionGate(allPrior).productionMock);
  allPrior.push(psatResults[0]);
  psatResults.push(runBatchMPSATSecondProductionGate(allPrior).productionMock);
  allPrior.push(psatResults[1]);
  psatResults.push(runBatchMPSATThirdProductionGate(allPrior).productionMock);
  allPrior.push(psatResults[2]);
  psatResults.push(runBatchMPSATFourthProductionGate(allPrior).productionMock);
  allPrior.push(psatResults[3]);
  psatResults.push(runBatchMPSATFifthProductionGate(allPrior).productionMock);
  allPrior.push(psatResults[4]);
  psatResults.push(runBatchMPSATSixthProductionGate(allPrior).productionMock);
  allPrior.push(psatResults[5]);
  psatResults.push(runBatchMPSATSeventhProductionGate(allPrior).productionMock);
  allPrior.push(psatResults[6]);
  psatResults.push(runBatchMPSATEighthProductionGate(allPrior).productionMock);
  allPrior.push(psatResults[7]);
  psatResults.push(runBatchMPSATNinthProductionGate(allPrior).productionMock);
  allPrior.push(psatResults[8]);
  psatResults.push(runBatchMPSATTenthProductionGate(allPrior).productionMock);

  return [...satResults, ...psatResults];
}

export function runImpactAudit() {
  const targetMocks = buildFirstTwentyProductionMocks();

  if (targetMocks.length !== 20) {
    throw new Error(`Production impact audit: expected 20 targeted mocks, found ${targetMocks.length}.`);
  }

  const mockReports = targetMocks.map((mock, index) => auditMock(mock, TARGET_KEYS[index]));
  const findings = mockReports.flatMap((report) => report.findings);
  const affectedQuestionFindings = findings.filter((finding) => finding.questionId);

  const uniqueQuestions = new Set(
    affectedQuestionFindings.map((finding) => `${finding.testKey}::${finding.questionId}`)
  );

  const flagCounts = {};
  findings.forEach((finding) => {
    finding.flags.forEach((flag) => {
      flagCounts[flag] = (flagCounts[flag] || 0) + 1;
    });
  });

  return {
    auditType: 'read-only-production-impact-audit',
    auditedMocks: targetMocks.length,
    auditedMockKeys: TARGET_KEYS,
    auditedQuestions: mockReports.reduce((sum, report) => sum + report.questionCount, 0),
    affectedUniqueQuestionCount: uniqueQuestions.size,
    findingCount: findings.length,
    flagCounts,
    productionMutation: false,
    releaseEligible: false,
    status: 'IMPACT_IDENTIFICATION_COMPLETE',
    mockReports,
    findings,
  };
}

function main() {
  const summary = runImpactAudit();

  console.log('Batch M production impact audit complete.');
  console.log(`Audited mocks: ${summary.auditedMocks}`);
  console.log(`Audited questions: ${summary.auditedQuestions}`);
  console.log(`Affected unique questions: ${summary.affectedUniqueQuestionCount}`);
  console.log(`Total findings: ${summary.findingCount}`);
  console.log(`productionMutation: ${summary.productionMutation}`);
  console.log(`releaseEligible: ${summary.releaseEligible}`);
  console.log('');
  console.log('Finding counts:');

  const flags = Object.keys(summary.flagCounts).sort();
  if (!flags.length) {
    console.log('  none');
  } else {
    flags.forEach((flag) => console.log(`  ${flag}: ${summary.flagCounts[flag]}`));
  }

  console.log('');
  console.log('Affected question IDs:');
  const affectedQuestionFindings = summary.findings.filter((finding) => finding.questionId);
  if (!affectedQuestionFindings.length) {
    console.log('  none');
  } else {
    affectedQuestionFindings.forEach((finding) => {
      console.log(`  ${finding.testKey} ${finding.questionId}: ${finding.flags.join(', ')}`);
    });
  }

  console.log('');
  console.log('Mock SPR distribution:');
  summary.mockReports.forEach((report) => {
    console.log(`  ${report.testKey}: ${report.sprPercent}% (${report.sprCount}/${report.mathCount})`);
  });

  console.log('');
  console.log(JSON.stringify({
    auditType: summary.auditType,
    auditedMocks: summary.auditedMocks,
    auditedMockKeys: summary.auditedMockKeys,
    auditedQuestions: summary.auditedQuestions,
    affectedUniqueQuestionCount: summary.affectedUniqueQuestionCount,
    findingCount: summary.findingCount,
    flagCounts: summary.flagCounts,
    productionMutation: summary.productionMutation,
    releaseEligible: summary.releaseEligible,
    status: summary.status,
  }));
}

const isDirectExecution = import.meta.url === new URL(`file://${process.argv[1].replaceAll('\\', '/')}`).href;
if (isDirectExecution) main();
