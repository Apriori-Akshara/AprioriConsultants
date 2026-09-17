/**
 * Batch M — calibration candidate generation + selection with prompt uniqueness.
 *
 * Candidate-only. This script never imports or mutates the production store.
 * It preserves the existing 352-record remediation scope but requires both
 * originality-fingerprint uniqueness and normalized prompt uniqueness for R&W.
 */

import fs from 'node:fs';
import { generateRemediatedRWCandidates } from '../src/data/sat/mockContent/verbalConstructionRemediated';
import { generateRemediatedMathCandidates } from '../src/data/sat/mockContent/mathBankFactoryRemediated';

const SCOPE = {
  rw: {
    'craft-and-structure': 65,
    'information-and-ideas': 130,
    targetDomain: 'standard-english-conventions',
  },
  math: { studentProducedResponse: 157 },
};

const TESTS = [
  ...Array.from({ length: 10 }, (_, i) => ({ testId: `SAT${i + 1}`, variant: 'sat-series-a', assessmentNumber: i + 1 })),
  ...Array.from({ length: 10 }, (_, i) => ({ testId: `PSAT${i + 1}`, variant: 'psat-nmsqt', assessmentNumber: i + 1 })),
  ...Array.from({ length: 10 }, (_, i) => ({ testId: `SAT${i + 11}`, variant: 'sat-series-b', assessmentNumber: i + 11 })),
];

const RW_PER_TEST = 125;
const MATH_PER_TEST = 50;

function ensureDir(path) { fs.mkdirSync(path, { recursive: true }); }
function pass(item) { return item?.quality?.verdict === 'pass'; }
function normalizePrompt(prompt) { return String(prompt || '').trim().toLowerCase().replace(/\s+/g, ' '); }

function interleaveByTest(candidates) {
  const buckets = new Map();
  for (const candidate of candidates) {
    const key = candidate.testId;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(candidate);
  }
  const output = [];
  let remaining = true;
  while (remaining) {
    remaining = false;
    for (const bucket of buckets.values()) {
      if (bucket.length) {
        output.push(bucket.shift());
        remaining = true;
      }
    }
  }
  return output;
}

function selectFirstDistinct(candidates, count, keyFn) {
  const seen = new Set();
  const selected = [];
  for (const candidate of candidates) {
    const key = keyFn(candidate);
    if (seen.has(key)) continue;
    seen.add(key);
    selected.push(candidate);
    if (selected.length === count) break;
  }
  return selected;
}

function stripCandidate(candidate, selection) {
  return {
    contentId: candidate.contentId,
    questionId: candidate.questionId,
    testId: candidate.testId,
    assessmentVariant: candidate.assessmentVariant,
    section: candidate.section,
    module: candidate.module,
    domain: candidate.domain,
    skill: candidate.skill,
    difficulty: candidate.difficulty,
    questionType: candidate.questionType,
    stimulusType: candidate.stimulusType,
    sourceType: candidate.sourceType,
    authoringStatus: candidate.authoringStatus,
    status: candidate.status,
    releaseEligibility: candidate.releaseEligibility,
    originalityFingerprint: candidate.originalityFingerprint,
    prompt: candidate.prompt,
    choices: candidate.choices,
    answer: candidate.answer,
    explanation: candidate.explanation,
    figure: candidate.figure,
    metadata: candidate.metadata,
    selection,
  };
}

function main() {
  const rwPool = [];
  const mathPool = [];

  for (const test of TESTS) {
    const rw = generateRemediatedRWCandidates({ count: RW_PER_TEST, testId: test.testId, variant: test.variant, module: 'reading-writing-module-1' });
    rw.candidates.forEach((candidate, index) => rwPool.push({ candidate, quality: rw.quality[index] }));

    const math = generateRemediatedMathCandidates({ count: MATH_PER_TEST, testId: test.testId, variant: test.variant, assessmentNumber: test.assessmentNumber, module: 'math-module-1', route: 'standard' });
    math.candidates.forEach((candidate, index) => mathPool.push({ candidate, quality: math.quality[index] }));
  }

  const rwEligible = interleaveByTest(
    rwPool
      .filter(pass)
      .filter(({ candidate }) => candidate.domain === SCOPE.rw.targetDomain)
      .map(({ candidate }) => candidate),
  );

  const rwSelected = selectFirstDistinct(
    rwEligible,
    195,
    (candidate) => `${candidate.originalityFingerprint}::${normalizePrompt(candidate.prompt)}`,
  );

  if (rwSelected.length !== 195) {
    throw new Error(`Calibration prompt-unique selection: only ${rwSelected.length}/195 eligible R&W SEC candidates available with unique prompts.`);
  }

  const rwPrompts = rwSelected.map((candidate) => normalizePrompt(candidate.prompt));
  if (new Set(rwPrompts).size !== rwPrompts.length) throw new Error('Calibration prompt-unique selection produced duplicate normalized R&W prompts.');

  const rwSelections = rwSelected.map((candidate, index) => stripCandidate(candidate, {
    replacementTargetDomain: SCOPE.rw.targetDomain,
    replacementSourceDomain: index < 65 ? 'craft-and-structure' : 'information-and-ideas',
    selectionOrdinal: index + 1,
  }));

  const mathEligible = interleaveByTest(
    mathPool
      .filter(pass)
      .filter(({ candidate }) => candidate.questionType === 'student-produced-response')
      .map(({ candidate }) => candidate),
  );

  const mathSelected = selectFirstDistinct(mathEligible, 157, (candidate) => candidate.originalityFingerprint);
  if (mathSelected.length !== 157) throw new Error(`Calibration candidate selection: only ${mathSelected.length}/157 eligible Math SPR candidates available.`);

  const mathSelections = mathSelected.map((candidate, index) => stripCandidate(candidate, {
    replacementTarget: 'student-produced-response',
    selectionOrdinal: index + 1,
  }));

  const fingerprints = [...rwSelections, ...mathSelections].map((item) => item.originalityFingerprint);
  if (new Set(fingerprints).size !== fingerprints.length) throw new Error('Calibration selection produced duplicate originality fingerprints.');

  const output = {
    date: '2026-09-17',
    status: 'candidate-generation-and-controlled-selection-complete',
    selectionVersion: 'batch-m-calibration-prompt-unique-v2',
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
    sourceScope: {
      rwMinimumCandidates: 195,
      mathMinimumSPRCandidates: 157,
      combinedMinimumCandidates: 352,
    },
    generation: {
      testCount: TESTS.length,
      rwCandidatesGenerated: rwPool.length,
      rwQualityPasses: rwPool.filter(pass).length,
      rwEligibleTargetDomain: rwEligible.length,
      rwSelectedUniquePrompts: new Set(rwPrompts).size,
      mathCandidatesGenerated: mathPool.length,
      mathQualityPasses: mathPool.filter(pass).length,
      mathEligibleSPR: mathEligible.length,
    },
    selected: {
      rw: {
        total: rwSelections.length,
        allocations: {
          'craft-and-structure': 65,
          'information-and-ideas': 130,
        },
        targetDomain: SCOPE.rw.targetDomain,
        candidates: rwSelections,
      },
      math: {
        total: mathSelections.length,
        studentProducedResponse: 157,
        candidates: mathSelections,
      },
    },
    nextBoundary: 'candidate-review-and-controlled-replacement-authorization-required-before-production-mutation',
  };

  const outputDir = process.env.BATCH_M_OUTPUT_DIR || 'artifacts/batch-m-calibration-candidate-selection';
  ensureDir(outputDir);
  fs.writeFileSync(`${outputDir}/BATCH-M-CALIBRATION-CANDIDATE-SELECTION-2026-09-17.json`, JSON.stringify(output, null, 2));
  fs.writeFileSync(`${outputDir}/BATCH-M-CALIBRATION-CANDIDATE-SELECTION-2026-09-17.md`, [
    '# Batch M calibration candidate selection — 2026-09-17',
    '',
    '- Status: candidate generation and controlled selection complete.',
    '- Selection version: **prompt-unique v2**.',
    '- Production mutation: **false**.',
    '- Release eligible: **false**.',
    '- SAT21 created: **false**.',
    '- R&W selected: **195** (65 Craft & Structure → SEC; 130 Information & Ideas → SEC).',
    '- R&W normalized prompts: **195 unique**.',
    '- Math selected: **157** student-produced-response candidates.',
    '- Combined selected scope: **352**.',
    '',
    '## Boundary',
    '',
    'Candidate records only. No production question was replaced and no public-site release was authorized.',
  ].join('\n') + '\n');

  console.log(JSON.stringify({
    status: output.status,
    selectionVersion: output.selectionVersion,
    productionMutation: output.productionMutation,
    rwGenerated: output.generation.rwCandidatesGenerated,
    rwQualityPasses: output.generation.rwQualityPasses,
    rwEligible: output.generation.rwEligibleTargetDomain,
    rwSelected: output.selected.rw.total,
    rwUniquePrompts: output.generation.rwSelectedUniquePrompts,
    mathGenerated: output.generation.mathCandidatesGenerated,
    mathQualityPasses: output.generation.mathQualityPasses,
    mathEligibleSPR: output.generation.mathEligibleSPR,
    mathSelected: output.selected.math.total,
    artifactDir: outputDir,
  }, null, 2));
}

main();
