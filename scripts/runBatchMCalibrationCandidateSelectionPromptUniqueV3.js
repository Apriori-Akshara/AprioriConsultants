/**
 * Batch M — calibration candidate generation + selection with strict R&W
 * normalized-prompt uniqueness. Candidate-only; never mutates production.
 */

import fs from 'node:fs';
import { generateRemediatedRWCandidates } from '../src/data/sat/mockContent/verbalConstructionRemediated';
import { generateRemediatedMathCandidates } from '../src/data/sat/mockContent/mathBankFactoryRemediated';

const RW_TARGET = 195;
const MATH_SPR_TARGET = 157;
const TESTS = [
  ...Array.from({ length: 10 }, (_, i) => ({ testId: `SAT${i + 1}`, variant: 'sat-series-a', assessmentNumber: i + 1 })),
  ...Array.from({ length: 10 }, (_, i) => ({ testId: `PSAT${i + 1}`, variant: 'psat-nmsqt', assessmentNumber: i + 1 })),
  ...Array.from({ length: 10 }, (_, i) => ({ testId: `SAT${i + 11}`, variant: 'sat-series-b', assessmentNumber: i + 11 })),
];

function normalizePrompt(prompt) { return String(prompt || '').trim().toLowerCase().replace(/\s+/g, ' '); }
function pass(item) { return item?.quality?.verdict === 'pass'; }
function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }

function interleaveByTest(candidates) {
  const buckets = new Map();
  for (const candidate of candidates) {
    if (!buckets.has(candidate.testId)) buckets.set(candidate.testId, []);
    buckets.get(candidate.testId).push(candidate);
  }
  const output = [];
  let remaining = true;
  while (remaining) {
    remaining = false;
    for (const bucket of buckets.values()) {
      if (bucket.length) { output.push(bucket.shift()); remaining = true; }
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

function strip(candidate, selection) {
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
    const rw = generateRemediatedRWCandidates({ count: 125, testId: test.testId, variant: test.variant, module: 'reading-writing-module-1' });
    rw.candidates.forEach((candidate, index) => rwPool.push({ candidate, quality: rw.quality[index] }));

    const math = generateRemediatedMathCandidates({ count: 50, testId: test.testId, variant: test.variant, assessmentNumber: test.assessmentNumber, module: 'math-module-1', route: 'standard' });
    math.candidates.forEach((candidate, index) => mathPool.push({ candidate, quality: math.quality[index] }));
  }

  const rwEligible = interleaveByTest(
    rwPool.filter(pass).filter(({ candidate }) => candidate.domain === 'standard-english-conventions').map(({ candidate }) => candidate),
  );
  const rwSelected = selectFirstDistinct(rwEligible, RW_TARGET, (candidate) => normalizePrompt(candidate.prompt));
  if (rwSelected.length !== RW_TARGET) throw new Error(`Only ${rwSelected.length}/${RW_TARGET} unique normalized R&W prompts are available.`);

  const rwSelections = rwSelected.map((candidate, index) => strip(candidate, {
    replacementTargetDomain: 'standard-english-conventions',
    replacementSourceDomain: index < 65 ? 'craft-and-structure' : 'information-and-ideas',
    selectionOrdinal: index + 1,
  }));

  const mathEligible = interleaveByTest(
    mathPool.filter(pass).filter(({ candidate }) => candidate.questionType === 'student-produced-response').map(({ candidate }) => candidate),
  );
  const mathSelected = selectFirstDistinct(mathEligible, MATH_SPR_TARGET, (candidate) => candidate.originalityFingerprint);
  if (mathSelected.length !== MATH_SPR_TARGET) throw new Error(`Only ${mathSelected.length}/${MATH_SPR_TARGET} unique Math SPR candidates are available.`);
  const mathSelections = mathSelected.map((candidate, index) => strip(candidate, { replacementTarget: 'student-produced-response', selectionOrdinal: index + 1 }));

  const all = [...rwSelections, ...mathSelections];
  const fingerprints = all.map((item) => item.originalityFingerprint);
  if (fingerprints.some((value) => !value) || new Set(fingerprints).size !== fingerprints.length) throw new Error('Selected package contains missing or duplicate originality fingerprints.');

  const output = {
    date: '2026-09-17',
    status: 'candidate-generation-and-controlled-selection-complete',
    selectionVersion: 'batch-m-calibration-prompt-unique-v3',
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
    generation: {
      testCount: TESTS.length,
      rwCandidatesGenerated: rwPool.length,
      rwQualityPasses: rwPool.filter(pass).length,
      rwEligibleTargetDomain: rwEligible.length,
      rwSelectedUniquePrompts: new Set(rwSelections.map((item) => normalizePrompt(item.prompt))).size,
      mathCandidatesGenerated: mathPool.length,
      mathQualityPasses: mathPool.filter(pass).length,
      mathEligibleSPR: mathEligible.length,
    },
    selected: {
      rw: {
        total: rwSelections.length,
        allocations: { 'craft-and-structure': 65, 'information-and-ideas': 130 },
        targetDomain: 'standard-english-conventions',
        candidates: rwSelections,
      },
      math: {
        total: mathSelections.length,
        studentProducedResponse: mathSelections.length,
        candidates: mathSelections,
      },
    },
    nextBoundary: 'candidate-review-and-controlled-replacement-authorization-required-before-production-mutation',
  };

  if (output.generation.rwSelectedUniquePrompts !== RW_TARGET) throw new Error('R&W normalized prompt uniqueness assertion failed.');
  const outputDir = process.env.BATCH_M_OUTPUT_DIR || 'artifacts/batch-m-calibration-candidate-selection';
  ensureDir(outputDir);
  fs.writeFileSync(`${outputDir}/BATCH-M-CALIBRATION-CANDIDATE-SELECTION-2026-09-17.json`, JSON.stringify(output, null, 2));
  fs.writeFileSync(`${outputDir}/BATCH-M-CALIBRATION-CANDIDATE-SELECTION-2026-09-17.md`, [
    '# Batch M calibration candidate selection — 2026-09-17', '',
    '- Selection version: **prompt-unique v3**.',
    '- Production mutation: **false**.',
    '- Release eligible: **false**.',
    '- SAT21 created: **false**.',
    '- R&W: **195** selected with **195 unique normalized prompts** (65 Craft & Structure → SEC; 130 Information & Ideas → SEC).',
    '- Math: **157** selected SPR candidates.',
    '- Combined scope: **352**.',
    '',
    'No production question was replaced by this stage.',
  ].join('\n') + '\n');

  console.log(JSON.stringify({
    status: output.status,
    selectionVersion: output.selectionVersion,
    productionMutation: false,
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
