/**
 * Batch M — controlled replacement validation v4.
 *
 * Accepts the original reviewed 352-candidate scope after the controlled,
 * quality-reviewed R&W prompt-context transformation. No production mutation.
 */

import fs from 'node:fs';
import path from 'node:path';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore';
import { BATCH_M_PRODUCTION_SEQUENCE } from '../src/data/sat/mockContent/batchMProductionController';
import { runBatchMFinalCorpusGate } from '../src/data/sat/mockContent/batchMFinalCorpusGate';
import { runBatchMCrossCorpusCalibrationCanonical } from '../src/data/sat/mockContent/batchMCrossCorpusCalibrationCanonical';

const INPUT = process.env.BATCH_M_CANDIDATE_INPUT || 'artifacts/batch-m-calibration-candidate-selection/BATCH-M-CALIBRATION-CANDIDATE-SELECTION-2026-09-17.json';
const REVIEW = process.env.BATCH_M_CANDIDATE_REVIEW_INPUT || 'artifacts/batch-m-calibration-candidate-review/BATCH-M-CALIBRATION-CANDIDATE-REVIEW-2026-09-17.json';
const OUTPUT = process.env.BATCH_M_OUTPUT_DIR || 'artifacts/batch-m-calibration-controlled-replacement-validation';

const canonical = (value) => String(value ?? '').trim().toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const clone = (value) => JSON.parse(JSON.stringify(value));
const fail = (message) => { throw new Error(`Batch M controlled replacement v4: ${message}`); };
const load = (file) => { if (!fs.existsSync(file)) fail(`missing artifact ${file}`); return JSON.parse(fs.readFileSync(file, 'utf8')); };
const keyForMock = (mock, index) => BATCH_M_PRODUCTION_SEQUENCE[index]?.testKey || mock?.testKey || `position-${index + 1}`;

function chooseRW(records, candidate, used) {
  const wanted = canonical(candidate.selection?.replacementSourceDomain);
  const exact = records.find((record) => !used.has(record.questionId) && canonical(record.domain) === wanted && record.difficulty === candidate.difficulty);
  if (exact) return exact;
  const fallback = records.find((record) => !used.has(record.questionId) && canonical(record.domain) === wanted);
  if (!fallback) fail(`no R&W target for ${candidate.testId}/${wanted}`);
  return fallback;
}

function chooseMath(records, candidate, used) {
  const eligible = records.filter((record) => !used.has(record.questionId) && record.questionType !== 'student-produced-response');
  const exact = eligible.find((record) => canonical(record.domain) === canonical(candidate.domain) && record.skill === candidate.skill && record.difficulty === candidate.difficulty);
  if (exact) return exact;
  const sameDomainDifficulty = eligible.find((record) => canonical(record.domain) === canonical(candidate.domain) && record.difficulty === candidate.difficulty);
  if (sameDomainDifficulty) return sameDomainDifficulty;
  const sameDomain = eligible.find((record) => canonical(record.domain) === canonical(candidate.domain));
  if (sameDomain) return sameDomain;
  fail(`no Math target for ${candidate.testId}/${candidate.domain}/${candidate.skill}`);
}

function merge(target, candidate, testKey) {
  const replacement = clone(candidate);
  const { questionId, contentId, testId, assessmentVariant, section, module, status, authoringStatus, releaseEligibility, metadata, ...semantic } = replacement;
  const fingerprint = String(replacement.originalityFingerprint || '').replaceAll(String(replacement.testId || ''), String(target.testId || ''));
  return {
    ...target,
    ...semantic,
    testId: target.testId,
    questionId: target.questionId,
    contentId: target.contentId || target.questionId,
    assessmentVariant: target.assessmentVariant,
    section: target.section,
    module: target.module,
    originalityFingerprint: fingerprint || target.originalityFingerprint,
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
        testKey,
        replacedQuestionId: target.questionId,
        candidateQuestionId: candidate.questionId,
      },
    },
  };
}

function validateInput(selection, review) {
  if (selection.productionMutation !== false || selection.releaseEligible !== false || selection.sat21Created !== false) fail('candidate package crosses the production boundary');
  if (selection.selected?.rw?.total !== 195 || selection.selected?.math?.total !== 157) fail('candidate package is not exactly 195 R&W + 157 Math');
  if (selection.transformation?.productionMutation !== false) fail('prompt transformation was not explicitly read-only');
  if (selection.transformation?.uniqueNormalizedRWPrompts !== 195) fail('prompt transformation did not produce 195 unique normalized R&W prompts');
  if (selection.transformedContentQuality?.passed !== true || selection.transformedContentQuality?.passedCount !== 352) fail('post-transformation quality gate did not pass all 352 candidates');
  if (review.status !== 'candidate-review-complete' || review.contentQuality?.passed !== true) fail('independent review artifact is not a PASS');

  const rw = selection.selected.rw.candidates;
  const math = selection.selected.math.candidates;
  const prompts = rw.map((item) => canonical(item.prompt).replace(/-/g, ' '));
  if (new Set(prompts).size !== 195) fail('final candidate package still contains duplicate normalized R&W prompts');
  if (rw.filter((item) => item.selection?.replacementSourceDomain === 'craft-and-structure').length !== 65) fail('C&S allocation is not 65');
  if (rw.filter((item) => item.selection?.replacementSourceDomain === 'information-and-ideas').length !== 130) fail('I&I allocation is not 130');
  if (rw.some((item) => item.domain !== 'standard-english-conventions')) fail('R&W package contains a non-SEC candidate');
  if (math.some((item) => item.questionType !== 'student-produced-response')) fail('Math package contains a non-SPR candidate');
}

function apply(corpus, selection) {
  const mocks = new Map(corpus.map((mock, index) => [keyForMock(mock, index), mock]));
  const used = new Set();
  const changes = [];

  const replace = (candidate, section) => {
    const testKey = String(candidate.testId || '').toUpperCase();
    const mock = mocks.get(testKey);
    if (!mock) fail(`unknown production test ${testKey}`);
    const records = section === 'reading-writing' ? mock.readingWriting : mock.math;
    const target = section === 'reading-writing' ? chooseRW(records, candidate, used) : chooseMath(records, candidate, used);
    const targetKey = `${testKey}:${target.questionId}`;
    if (used.has(targetKey)) fail(`duplicate replacement target ${targetKey}`);
    used.add(targetKey);
    const index = records.findIndex((record) => record.questionId === target.questionId);
    if (index < 0) fail(`missing target ${target.questionId}`);
    const replacement = merge(target, candidate, testKey);
    records[index] = replacement;
    changes.push({
      testKey,
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

  selection.selected.rw.candidates.forEach((candidate) => replace(candidate, 'reading-writing'));
  selection.selected.math.candidates.forEach((candidate) => replace(candidate, 'math'));
  if (changes.length !== 352) fail(`expected 352 replacements, got ${changes.length}`);
  return changes;
}

function main() {
  const selection = load(INPUT);
  const review = load(REVIEW);
  validateInput(selection, review);

  const corpus = clone(BATCH_M_ACCEPTED_PRODUCTION_CORPUS);
  const changes = apply(corpus, selection);
  const gate = runBatchMFinalCorpusGate(corpus);
  if (!gate.passed) fail('proposed replacement corpus failed the final 30-mock corpus gate');
  const calibration = runBatchMCrossCorpusCalibrationCanonical(corpus);
  if (!calibration.passed) fail(`proposed replacement corpus failed cross-corpus calibration: ${JSON.stringify(calibration, null, 2)}`);

  fs.mkdirSync(OUTPUT, { recursive: true });
  fs.writeFileSync(path.join(OUTPUT, 'BATCH-M-CALIBRATION-CONTROLLED-REPLACEMENT-MAP-2026-09-17.json'), JSON.stringify({
    date: '2026-09-17',
    status: 'controlled-replacement-validation-passed',
    authorization: 'explicit-user-authorization',
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
    replacementCount: changes.length,
    finalCorpusGate: { passed: gate.passed, status: gate.status, mockCount: gate.mockCount, totalRecords: gate.totalRecords },
    crossCorpusCalibration: calibration,
    replacements: changes,
  }, null, 2));
  fs.writeFileSync(path.join(OUTPUT, 'BATCH-M-CALIBRATION-CONTROLLED-REPLACEMENT-VALIDATION-2026-09-17.md'), [
    '# Batch M controlled replacement validation — 2026-09-17', '',
    '- Validation: **PASS**.',
    '- Scope: **352** reviewed candidates.',
    '- R&W: **195** (65 Craft & Structure → SEC; 130 Information & Ideas → SEC).',
    '- Math: **157** SPR.',
    '- R&W prompts after controlled transformation: **195 unique**.',
    '- Post-transformation content-quality: **352/352 passed**.',
    '- Final 30-mock corpus gate: **PASS** (30 mocks / 5,880 records).',
    '- Cross-corpus calibration: **PASS**.',
    '- Production mutation during validation: **false**.',
    '- SAT21 created: **false**.',
    '',
    'The validated replacement map is ready for the separately authorized production mutation step.',
  ].join('\n') + '\n');

  console.log(JSON.stringify({
    status: 'controlled-replacement-validation-passed',
    productionMutation: false,
    replacementCount: changes.length,
    finalCorpusGatePassed: gate.passed,
    crossCorpusCalibrationPassed: calibration.passed,
    rwSECProportion: calibration.overall.domain['reading-writing']['standard-english-conventions']?.proportion ?? null,
    mathSPRProportion: calibration.overall.questionType.math['student-produced-response']?.proportion ?? null,
    artifactDir: OUTPUT,
  }, null, 2));
}

main();
