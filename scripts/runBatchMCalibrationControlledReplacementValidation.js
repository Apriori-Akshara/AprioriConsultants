/**
 * Batch M — end-to-end controlled replacement validation.
 *
 * Reads the strict prompt-unique, independently reviewed candidate package;
 * reconstructs the proposed 352 replacements in memory; preserves production
 * structural identity; and requires both the final corpus gate and canonical
 * cross-corpus calibration to pass. No production mutation occurs here.
 */

import fs from 'node:fs';
import path from 'node:path';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore';
import { BATCH_M_PRODUCTION_SEQUENCE } from '../src/data/sat/mockContent/batchMProductionController';
import { runBatchMFinalCorpusGate } from '../src/data/sat/mockContent/batchMFinalCorpusGate';
import { runBatchMCrossCorpusCalibrationCanonical } from '../src/data/sat/mockContent/batchMCrossCorpusCalibrationCanonical';

const SELECTION_INPUT = process.env.BATCH_M_CANDIDATE_INPUT ||
  'artifacts/batch-m-calibration-candidate-selection/BATCH-M-CALIBRATION-CANDIDATE-SELECTION-2026-09-17.json';
const REVIEW_INPUT = process.env.BATCH_M_CANDIDATE_REVIEW_INPUT ||
  'artifacts/batch-m-calibration-candidate-review/BATCH-M-CALIBRATION-CANDIDATE-REVIEW-2026-09-17.json';
const OUTPUT_DIR = process.env.BATCH_M_OUTPUT_DIR || 'artifacts/batch-m-calibration-controlled-replacement-validation';

const MATH_TARGET_DOMAIN = (value) => String(value ?? '').trim().toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function fail(message) { throw new Error(`Batch M controlled replacement validation: ${message}`); }
function clone(value) { return JSON.parse(JSON.stringify(value)); }
function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function testKey(mock, index) { return BATCH_M_PRODUCTION_SEQUENCE[index]?.testKey || mock?.testKey || `position-${index + 1}`; }

function chooseRWTarget(records, candidate, used) {
  const wanted = MATH_TARGET_DOMAIN(candidate.selection?.replacementSourceDomain);
  const exact = records.filter((record) => !used.has(record.questionId) && MATH_TARGET_DOMAIN(record.domain) === wanted && record.difficulty === candidate.difficulty);
  if (exact.length) return exact[0];
  const fallback = records.find((record) => !used.has(record.questionId) && MATH_TARGET_DOMAIN(record.domain) === wanted);
  if (!fallback) fail(`no R&W source-domain target remains for ${candidate.testId}/${candidate.selection?.replacementSourceDomain}`);
  return fallback;
}

function chooseMathTarget(records, candidate, used) {
  const eligible = records.filter((record) => !used.has(record.questionId) && record.questionType !== 'student-produced-response');
  const exact = eligible.filter((record) => MATH_TARGET_DOMAIN(record.domain) === MATH_TARGET_DOMAIN(candidate.domain) && record.skill === candidate.skill && record.difficulty === candidate.difficulty);
  if (exact.length) return exact[0];
  const sameDomainDifficulty = eligible.filter((record) => MATH_TARGET_DOMAIN(record.domain) === MATH_TARGET_DOMAIN(candidate.domain) && record.difficulty === candidate.difficulty);
  if (sameDomainDifficulty.length) return sameDomainDifficulty[0];
  const sameDomain = eligible.find((record) => MATH_TARGET_DOMAIN(record.domain) === MATH_TARGET_DOMAIN(candidate.domain));
  if (sameDomain) return sameDomain;
  fail(`no Math non-SPR target remains for ${candidate.testId}/${candidate.domain}/${candidate.skill}`);
}

function mergeCandidateIntoTarget(target, candidate, testKeyValue) {
  const replacement = clone(candidate);
  const {
    questionId,
    contentId,
    testId,
    assessmentVariant,
    section,
    module,
    status,
    authoringStatus,
    releaseEligibility,
    metadata,
    ...semantic
  } = replacement;

  const candidateFingerprint = String(replacement.originalityFingerprint || '').replaceAll(String(replacement.testId || ''), String(target.testId || ''));

  return {
    ...target,
    ...semantic,
    testId: target.testId,
    questionId: target.questionId,
    contentId: target.contentId || target.questionId,
    assessmentVariant: target.assessmentVariant,
    section: target.section,
    module: target.module,
    originalityFingerprint: candidateFingerprint || target.originalityFingerprint,
    status: target.status ?? status,
    authoringStatus: target.authoringStatus ?? authoringStatus,
    releaseEligibility: target.releaseEligibility ?? releaseEligibility,
    metadata: {
      ...(target.metadata || {}),
      ...(metadata || {}),
      candidateOnly: false,
      productionMutation: true,
      controlledReplacement: {
        date: '2026-09-17',
        authorization: 'explicit-user-authorization',
        testKey: testKeyValue,
        replacedQuestionId: target.questionId,
        candidateQuestionId: candidate.questionId,
      },
    },
  };
}

function loadJSON(file) {
  if (!fs.existsSync(file)) fail(`required artifact not found: ${file}`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function assertInputs(selection, review) {
  if (selection.productionMutation !== false || selection.releaseEligible !== false || selection.sat21Created !== false) fail('selection artifact crosses the production boundary');
  if (selection.selectionVersion !== 'batch-m-calibration-prompt-unique-v3') fail(`unexpected selection version: ${selection.selectionVersion}`);
  if (selection.selected?.rw?.total !== 195 || selection.selected?.math?.total !== 157) fail('selection counts are not exactly 195 R&W + 157 Math');
  if (review.status !== 'candidate-review-complete') fail('candidate review artifact is not complete');
  if (review.contentQuality?.passed !== true) fail('candidate review content-quality gate did not pass');
  if (review.candidateCounts?.total !== 352) fail('candidate review does not cover 352 candidates');

  const rw = selection.selected.rw.candidates;
  const math = selection.selected.math.candidates;
  const prompts = rw.map((item) => String(item.prompt || '').trim().toLowerCase().replace(/\s+/g, ' '));
  if (prompts.some((prompt) => !prompt) || new Set(prompts).size !== prompts.length) fail('selected R&W candidates do not have 195 unique normalized prompts');
  if (rw.filter((item) => item.selection?.replacementSourceDomain === 'craft-and-structure').length !== 65) fail('R&W Craft & Structure allocation is not 65');
  if (rw.filter((item) => item.selection?.replacementSourceDomain === 'information-and-ideas').length !== 130) fail('R&W Information & Ideas allocation is not 130');
  if (rw.some((item) => item.domain !== 'standard-english-conventions')) fail('R&W candidate package contains a non-SEC candidate');
  if (math.some((item) => item.questionType !== 'student-produced-response')) fail('Math candidate package contains a non-SPR candidate');
}

function applyReplacements(corpus, selection) {
  const mocks = new Map(corpus.map((mock, index) => [testKey(mock, index), mock]));
  const usedTargets = new Set();
  const replacements = [];

  const apply = (candidate, section) => {
    const key = String(candidate.testId || '').toUpperCase();
    const mock = mocks.get(key);
    if (!mock) fail(`candidate targets unknown production test ${key}`);

    const records = section === 'reading-writing' ? mock.readingWriting : mock.math;
    const target = section === 'reading-writing'
      ? chooseRWTarget(records, candidate, usedTargets)
      : chooseMathTarget(records, candidate, usedTargets);

    const targetKey = `${key}:${target.questionId}`;
    if (usedTargets.has(targetKey)) fail(`duplicate replacement target ${targetKey}`);
    usedTargets.add(targetKey);

    const index = records.findIndex((record) => record.questionId === target.questionId);
    if (index < 0) fail(`target question ${target.questionId} is not present in ${key}`);

    const replacement = mergeCandidateIntoTarget(target, candidate, key);
    records[index] = replacement;

    replacements.push({
      testKey: key,
      section,
      questionId: target.questionId,
      candidateQuestionId: candidate.questionId,
      previousDomain: target.domain,
      replacementDomain: replacement.domain,
      previousQuestionType: target.questionType,
      replacementQuestionType: replacement.questionType,
      difficulty: replacement.difficulty,
      prompt: replacement.prompt,
      choices: replacement.choices,
      answer: replacement.answer,
      explanation: replacement.explanation,
      figure: replacement.figure || null,
      metadata: replacement.metadata,
    });
  };

  for (const candidate of selection.selected.rw.candidates) apply(candidate, 'reading-writing');
  for (const candidate of selection.selected.math.candidates) apply(candidate, 'math');

  if (replacements.length !== 352) fail(`expected 352 replacements, found ${replacements.length}`);
  return replacements;
}

function writeArtifacts(replacements, gate, calibration) {
  ensureDir(OUTPUT_DIR);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'BATCH-M-CALIBRATION-CONTROLLED-REPLACEMENT-MAP-2026-09-17.json'), JSON.stringify({
    date: '2026-09-17',
    status: 'controlled-replacement-validation-passed',
    authorization: 'explicit-user-authorization',
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
    replacementCount: replacements.length,
    finalCorpusGate: { passed: gate.passed, status: gate.status, mockCount: gate.mockCount, totalRecords: gate.totalRecords },
    crossCorpusCalibration: calibration,
    replacements,
  }, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'BATCH-M-CALIBRATION-CONTROLLED-REPLACEMENT-VALIDATION-2026-09-17.md'), [
    '# Batch M controlled replacement validation — 2026-09-17', '',
    '- Validation status: **PASS**.',
    '- Candidate/review package: **352/352 reviewed and content-quality passed**.',
    '- R&W: **195** replacements (65 Craft & Structure → SEC; 130 Information & Ideas → SEC).',
    '- Math: **157** SPR replacements.',
    '- Production mutation during validation: **false**.',
    `- Final 30-mock corpus gate: **${gate.passed ? 'PASS' : 'FAIL'}** (${gate.mockCount} mocks / ${gate.totalRecords} records).`,
    `- Cross-corpus calibration: **${calibration.passed ? 'PASS' : 'FAIL'}**.`,
    '- SAT21 created: **false**.',
    '',
    'This artifact is the promotion package for the separately authorized production replacement step.',
  ].join('\n') + '\n');
}

function main() {
  const selection = loadJSON(SELECTION_INPUT);
  const review = loadJSON(REVIEW_INPUT);
  assertInputs(selection, review);

  const corpus = clone(BATCH_M_ACCEPTED_PRODUCTION_CORPUS);
  const replacements = applyReplacements(corpus, selection);

  const finalGate = runBatchMFinalCorpusGate(corpus);
  if (!finalGate.passed) fail('proposed replacement corpus failed the final 30-mock corpus gate');

  const calibration = runBatchMCrossCorpusCalibrationCanonical(corpus);
  if (!calibration.passed) fail(`proposed replacement corpus failed cross-corpus calibration: ${JSON.stringify(calibration, null, 2)}`);

  writeArtifacts(replacements, finalGate, calibration);
  console.log(JSON.stringify({
    status: 'controlled-replacement-validation-passed',
    productionMutation: false,
    replacementCount: replacements.length,
    finalCorpusGatePassed: finalGate.passed,
    totalRecords: finalGate.totalRecords,
    crossCorpusCalibrationPassed: calibration.passed,
    rwTargetDomainRate: calibration.overall.domain['reading-writing']['standard-english-conventions']?.proportion ?? null,
    mathSprRate: calibration.overall.questionType.math['student-produced-response']?.proportion ?? null,
    artifactDir: OUTPUT_DIR,
  }, null, 2));
}

main();
