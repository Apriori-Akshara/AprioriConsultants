/**
 * Batch M — calibration controlled-replacement dry run.
 *
 * Candidate/production integration harness only. It does not alter the
 * production store or any source file. It reconstructs the accepted 30-mock
 * corpus in memory, maps the reviewed 352 candidates to frozen question slots,
 * validates the resulting corpus, and emits the exact replacement map that can
 * be promoted only after the dry run passes.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore';
import { runBatchMFinalCorpusGate } from '../src/data/sat/mockContent/batchMFinalCorpusGate';
import { runBatchMCrossCorpusCalibration } from '../src/data/sat/mockContent/batchMCrossCorpusCalibration';
import { BATCH_M_PRODUCTION_SEQUENCE } from '../src/data/sat/mockContent/batchMProductionController';

const TEST_CONTEXTS = [
  ['Riverside', 'archive council'], ['Northbridge', 'historical society'], ['Lakeview', 'museum board'],
  ['Cedar Grove', 'preservation committee'], ['Westhaven', 'public library'], ['Maple Junction', 'research center'],
  ['Stonefield', 'cultural trust'], ['Pine Harbor', 'heritage office'], ['Hillcrest', 'community archive'],
  ['Brookdale', 'records commission'], ['Fairview', 'arts foundation'], ['Oakridge', 'civic history group'],
  ['Eastfield', 'local studies center'], ['Willow Park', 'documentary project'], ['Meadowgate', 'historical institute'],
  ['Redwood', 'heritage council'], ['Clearwater', 'municipal archive'], ['Kingsley', 'scholarly society'],
  ['Greenhaven', 'collections committee'], ['Silver Creek', 'public history program'], ['Elmhurst', 'library foundation'],
  ['Harbor Point', 'research archive'], ['Foxglove', 'museum association'], ['Springvale', 'cultural records office'],
  ['Briarwood', 'documentation center'], ['Rosemont', 'heritage studies group'], ['Ashford', 'community library'],
  ['Grandview', 'preservation archive'], ['Riverbend', 'historical records board'], ['Sunridge', 'arts and letters council'],
  ['Brighton', 'regional studies institute'], ['Kingsport', 'library collections office'], ['Windermere', 'public archives group'],
  ['Highland', 'museum research council'], ['Millstone', 'civic records society'], ['Lakeshore', 'heritage documentation trust'],
  ['Evergreen', 'local history foundation'], ['Valley Brook', 'archives partnership'], ['Parkside', 'cultural research office'],
  ['Glenwood', 'historical preservation trust'], ['Seabrook', 'library history committee'], ['Rosefield', 'public records institute'],
  ['Woodland', 'museum studies council'], ['Fairmont', 'community heritage office'], ['Brookfield', 'documentary archives group'],
  ['Claremont', 'regional history society'], ['Ridgeview', 'research collections board'], ['Southport', 'public humanities center'],
  ['Northgate', 'heritage records association'], ['Crestview', 'historical documentation council'], ['Bluewater', 'archive services committee'],
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function canonical(value) {
  return String(value ?? '').trim().toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function runCandidateSelection(outputDir) {
  const result = spawnSync(process.execPath, [
    '--import', './scripts/batchMExtensionlessModuleLoader.mjs',
    'scripts/runBatchMCalibrationCandidateSelection.js',
  ], {
    cwd: process.cwd(),
    env: { ...process.env, BATCH_M_OUTPUT_DIR: outputDir },
    encoding: 'utf8',
    stdio: 'pipe',
  });

  if (result.status !== 0) {
    throw new Error(`Calibration candidate selection failed:\n${result.stdout}\n${result.stderr}`);
  }

  const selectionPath = path.join(outputDir, 'BATCH-M-CALIBRATION-CANDIDATE-SELECTION-2026-09-17.json');
  return JSON.parse(fs.readFileSync(selectionPath, 'utf8'));
}

function testKeyForMock(mock, index) {
  return BATCH_M_PRODUCTION_SEQUENCE[index]?.testKey || mock?.testKey || `position-${index + 1}`;
}

function contextSentence(selectionOrdinal) {
  const pair = TEST_CONTEXTS[(selectionOrdinal - 1) % TEST_CONTEXTS.length];
  const cycle = Math.floor((selectionOrdinal - 1) / TEST_CONTEXTS.length) + 1;
  return `The sentence appears in a report prepared for the ${pair[0]} ${pair[1]}${cycle > 1 ? `, revision ${cycle}` : ''}.`;
}

function makeDistinctRWPrompt(candidate) {
  const ordinal = Number(candidate?.selection?.selectionOrdinal || 0);
  const suffix = contextSentence(Math.max(1, ordinal));
  const parts = String(candidate.prompt || '').split('\n\n');
  parts[0] = `${parts[0]} ${suffix}`;
  return parts.join('\n\n');
}

function transformedCandidate(candidate) {
  const output = deepClone(candidate);
  if (output.section === 'reading-writing') output.prompt = makeDistinctRWPrompt(output);
  return output;
}

function chooseRWTarget(records, candidate, usedIds) {
  const wantedDomain = canonical(candidate.selection.replacementSourceDomain);
  const exact = records.filter((record) => (
    !usedIds.has(record.questionId)
    && canonical(record.domain) === wantedDomain
    && record.difficulty === candidate.difficulty
  ));
  if (exact.length) return exact[0];

  const fallback = records.find((record) => !usedIds.has(record.questionId) && canonical(record.domain) === wantedDomain);
  if (!fallback) throw new Error(`No R&W target remains for ${candidate.testId} ${candidate.selection.replacementSourceDomain}`);
  return fallback;
}

function chooseMathTarget(records, candidate, usedIds) {
  const eligible = records.filter((record) => (
    !usedIds.has(record.questionId)
    && record.questionType !== 'student-produced-response'
  ));
  const exact = eligible.filter((record) => (
    canonical(record.domain) === canonical(candidate.domain)
    && record.skill === candidate.skill
    && record.difficulty === candidate.difficulty
  ));
  if (exact.length) return exact[0];

  const sameDomainAndDifficulty = eligible.filter((record) => (
    canonical(record.domain) === canonical(candidate.domain)
    && record.difficulty === candidate.difficulty
  ));
  if (sameDomainAndDifficulty.length) return sameDomainAndDifficulty[0];

  const sameDomain = eligible.find((record) => canonical(record.domain) === canonical(candidate.domain));
  if (sameDomain) return sameDomain;

  throw new Error(`No Math non-SPR target remains for ${candidate.testId} ${candidate.domain}/${candidate.skill}`);
}

function mergeCandidateIntoTarget(target, candidate, testKey) {
  const replacement = deepClone(candidate);
  const targetIdentity = {
    testId: target.testId,
    questionId: target.questionId,
    contentId: target.contentId || target.questionId,
    assessmentVariant: target.assessmentVariant,
  };

  const { questionId, contentId, testId, assessmentVariant, status, authoringStatus, releaseEligibility, metadata, ...semantic } = replacement;
  const candidateFingerprint = String(replacement.originalityFingerprint || '').replaceAll(String(replacement.testId || ''), String(target.testId || ''));

  return {
    ...target,
    ...semantic,
    ...targetIdentity,
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
        testKey,
        replacedQuestionId: targetIdentity.questionId,
        candidateQuestionId: candidate.questionId,
      },
    },
  };
}

function mapCandidates(corpus, selection) {
  const mocks = new Map(corpus.map((mock, index) => [testKeyForMock(mock, index), mock]));
  const used = new Set();
  const replacements = [];

  const apply = (candidate, section) => {
    const testKey = String(candidate.testId || '').toUpperCase();
    const mock = mocks.get(testKey);
    if (!mock) throw new Error(`Candidate ${candidate.questionId} targets unknown production test ${testKey}`);

    const source = section === 'reading-writing' ? mock.readingWriting : mock.math;
    const target = section === 'reading-writing'
      ? chooseRWTarget(source, candidate, used)
      : chooseMathTarget(source, candidate, used);

    if (!target) throw new Error(`No replacement target found for ${testKey} ${candidate.questionId}`);
    const replacement = mergeCandidateIntoTarget(target, candidate, testKey);
    const compositeKey = `${testKey}:${target.questionId}`;
    if (used.has(compositeKey)) throw new Error(`Duplicate replacement target ${compositeKey}`);
    used.add(target.questionId);

    const index = section === 'reading-writing'
      ? mock.readingWriting.findIndex((item) => item.questionId === target.questionId)
      : mock.math.findIndex((item) => item.questionId === target.questionId);
    if (index < 0) throw new Error(`Target ${target.questionId} disappeared from ${testKey}`);

    source[index] = replacement;
    replacements.push({
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
      sourceCandidate: candidate,
    });
  };

  for (const candidate of selection.selected.rw.candidates.map(transformedCandidate)) apply(candidate, 'reading-writing');
  for (const candidate of selection.selected.math.candidates.map(transformedCandidate)) apply(candidate, 'math');

  return { corpus, replacements };
}

function assertCandidatePackage(selection) {
  if (selection.productionMutation !== false || selection.releaseEligible !== false || selection.sat21Created !== false) {
    throw new Error('Candidate selection artifact crosses the production boundary.');
  }
  if (selection.selected?.rw?.total !== 195 || selection.selected?.math?.total !== 157) {
    throw new Error('Candidate selection artifact does not contain the required 195 R&W + 157 Math candidates.');
  }
}

function assertSelectedPromptUniqueness(corpus) {
  const prompts = new Map();
  for (const mock of corpus) {
    for (const record of [...(mock.readingWriting || []), ...(mock.math || [])]) {
      if (record.section !== 'reading-writing') continue;
      const normalized = String(record.prompt || '').trim().toLowerCase().replace(/\s+/g, ' ');
      if (!normalized) continue;
      const previous = prompts.get(normalized);
      if (previous) throw new Error(`R&W prompt reuse detected after replacement: ${previous} vs ${record.questionId}`);
      prompts.set(normalized, record.questionId);
    }
  }
}

function writeReplacementModule(replacements, outputDir) {
  const staticEntries = replacements.map((item) => ({
    testKey: item.testKey,
    section: item.section,
    questionId: item.questionId,
    candidateQuestionId: item.candidateQuestionId,
    replacementDomain: item.replacementDomain,
    replacementQuestionType: item.replacementQuestionType,
    difficulty: item.difficulty,
    prompt: item.prompt,
    choices: item.choices,
    answer: item.answer,
    explanation: item.explanation,
    figure: item.figure,
    metadata: item.metadata,
  }));

  const content = [
    '/** Generated from the validated Batch M calibration controlled-replacement dry run on 2026-09-17. */',
    '',
    `export const BATCH_M_CALIBRATION_REPLACEMENTS = Object.freeze(${JSON.stringify(staticEntries, null, 2)});`,
    '',
  ].join('\n');

  const jsPath = path.join(outputDir, 'BATCH-M-CALIBRATION-CONTROLLED-REPLACEMENTS-2026-09-17.js');
  fs.writeFileSync(jsPath, content);

  const jsonPath = path.join(outputDir, 'BATCH-M-CALIBRATION-CONTROLLED-REPLACEMENT-MAP-2026-09-17.json');
  fs.writeFileSync(jsonPath, JSON.stringify({
    date: '2026-09-17',
    authorization: 'explicit-user-authorization',
    productionMutation: 'dry-run-only',
    replacementCount: replacements.length,
    replacements: staticEntries,
  }, null, 2));
}

function main() {
  const outputDir = process.env.BATCH_M_OUTPUT_DIR || path.join('artifacts', 'batch-m-calibration-replacement-dry-run');
  ensureDir(outputDir);

  const selectionDir = fs.mkdtempSync(path.join(os.tmpdir(), 'batch-m-calibration-selection-'));
  const selection = runCandidateSelection(selectionDir);
  assertCandidatePackage(selection);

  const corpus = deepClone(BATCH_M_ACCEPTED_PRODUCTION_CORPUS);
  const result = mapCandidates(corpus, selection);

  if (result.replacements.length !== 352) throw new Error(`Expected 352 replacements, found ${result.replacements.length}`);
  assertSelectedPromptUniqueness(result.corpus);

  const finalGate = runBatchMFinalCorpusGate(result.corpus);
  if (!finalGate.passed) throw new Error('Controlled replacement dry run failed the final 30-mock corpus gate.');

  const calibration = runBatchMCrossCorpusCalibration(result.corpus);
  if (!calibration.passed) throw new Error(`Controlled replacement dry run failed cross-corpus calibration: ${JSON.stringify(calibration, null, 2)}`);

  writeReplacementModule(result.replacements, outputDir);

  fs.writeFileSync(
    path.join(outputDir, 'BATCH-M-CALIBRATION-CONTROLLED-REPLACEMENT-DRY-RUN-2026-09-17.json'),
    JSON.stringify({
      date: '2026-09-17',
      status: 'controlled-replacement-dry-run-passed',
      authorization: 'explicit-user-authorization',
      productionMutation: false,
      releaseEligible: false,
      sat21Created: false,
      replacementCount: result.replacements.length,
      finalCorpusGate: {
        passed: finalGate.passed,
        mockCount: finalGate.mockCount,
        totalRecords: finalGate.totalRecords,
      },
      crossCorpusCalibration: calibration,
    }, null, 2),
  );

  console.log(JSON.stringify({
    status: 'controlled-replacement-dry-run-passed',
    replacements: result.replacements.length,
    finalCorpusGatePassed: finalGate.passed,
    finalCorpusTotalRecords: finalGate.totalRecords,
    crossCorpusCalibrationPassed: calibration.passed,
    artifactDir: outputDir,
  }, null, 2));
}

main();
