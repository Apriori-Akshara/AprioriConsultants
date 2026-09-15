/**
 * Batch M — read-only production impact audit.
 *
 * Inspects the frozen SAT1–SAT10 and PSAT1–PSAT10 production records only.
 * It never mutates production records and never makes a release decision.
 * The output is intentionally question-ID based; it does not print full item text.
 */

import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';

const TARGET_KEYS = [
  ...Array.from({ length: 10 }, (_, index) => `SAT${index + 1}`),
  ...Array.from({ length: 10 }, (_, index) => `PSAT${index + 1}`),
];

const IMPACT_FLAGS = new Set([
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

function collectQuestions(mock) {
  return [
    ...(Array.isArray(mock?.readingWriting) ? mock.readingWriting : []),
    ...(Array.isArray(mock?.math) ? mock.math : []),
  ];
}

function flagCategory(flag) {
  if (flag.startsWith('rw-')) return 'R&W construction/content';
  if (flag.includes('difficulty') || flag.includes('multi-step') || flag === 'medium-item-too-thin') {
    return 'Difficulty/reasoning demand';
  }
  if (flag.startsWith('math-')) return 'Math construction/content';
  return 'Other';
}

function auditMock(mock, index) {
  const testKey = TARGET_KEYS[index] || String(mock?.testId || 'UNKNOWN');
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

function main() {
  if (!Array.isArray(BATCH_M_ACCEPTED_PRODUCTION_CORPUS)) {
    throw new Error('Production impact audit: frozen production corpus is not an array.');
  }

  if (BATCH_M_ACCEPTED_PRODUCTION_CORPUS.length !== 30) {
    throw new Error(`Production impact audit: expected frozen corpus length 30, found ${BATCH_M_ACCEPTED_PRODUCTION_CORPUS.length}.`);
  }

  const targetMocks = BATCH_M_ACCEPTED_PRODUCTION_CORPUS.slice(0, 20);
  const targetKeys = targetMocks.map((_, index) => TARGET_KEYS[index]);

  if (JSON.stringify(targetKeys) !== JSON.stringify(TARGET_KEYS)) {
    throw new Error('Production impact audit: target mapping is not SAT1–SAT10 + PSAT1–PSAT10.');
  }

  const mockReports = targetMocks.map(auditMock);
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

  const summary = {
    auditType: 'read-only-production-impact-audit',
    auditedMocks: targetMocks.length,
    auditedMockKeys: targetKeys,
    auditedQuestions: mockReports.reduce((sum, report) => sum + report.questionCount, 0),
    affectedUniqueQuestionCount: uniqueQuestions.size,
    findingCount: findings.length,
    flagCounts,
    productionMutation: false,
    releaseEligible: false,
    status: 'IMPACT_IDENTIFICATION_COMPLETE',
  };

  console.log('Batch M production impact audit complete.');
  console.log(`Audited mocks: ${summary.auditedMocks}`);
  console.log(`Audited questions: ${summary.auditedQuestions}`);
  console.log(`Affected unique questions: ${summary.affectedUniqueQuestionCount}`);
  console.log(`Total findings: ${summary.findingCount}`);
  console.log(`productionMutation: ${summary.productionMutation}`);
  console.log(`releaseEligible: ${summary.releaseEligible}`);
  console.log('');
  console.log('Finding counts:');

  const flags = Object.keys(flagCounts).sort();
  if (!flags.length) {
    console.log('  none');
  } else {
    flags.forEach((flag) => console.log(`  ${flag}: ${flagCounts[flag]}`));
  }

  console.log('');
  console.log('Affected question IDs:');
  if (!affectedQuestionFindings.length) {
    console.log('  none');
  } else {
    affectedQuestionFindings.forEach((finding) => {
      console.log(`  ${finding.testKey} ${finding.questionId}: ${finding.flags.join(', ')}`);
    });
  }

  console.log('');
  console.log('Mock SPR distribution:');
  mockReports.forEach((report) => {
    console.log(`  ${report.testKey}: ${report.sprPercent}% (${report.sprCount}/${report.mathCount})`);
  });

  console.log('');
  console.log(JSON.stringify(summary));
}

main();
