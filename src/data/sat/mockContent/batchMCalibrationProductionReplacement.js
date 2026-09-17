/**
 * Batch M — authorized calibration replacement layer.
 *
 * This is the production replacement boundary for the 2026-09-17 calibration
 * remediation. It deterministically regenerates the already reviewed 352
 * candidates, applies the approved R&W context transformation, and merges only
 * the approved semantic fields into the frozen production records.
 */

import { generateRemediatedRWCandidates } from './verbalConstructionRemediated';
import { generateRemediatedMathCandidates } from './mathBankFactoryRemediated';
import { evaluateContentQualityBatch } from './batchMContentQualityGate';

const SCOPE = {
  rw: { craftAndStructure: 65, informationAndIdeas: 130, targetDomain: 'standard-english-conventions' },
  math: { studentProducedResponse: 157 },
};

const TESTS = [
  ...Array.from({ length: 10 }, (_, i) => ({ testId: `SAT${i + 1}`, variant: 'sat-series-a', assessmentNumber: i + 1 })),
  ...Array.from({ length: 10 }, (_, i) => ({ testId: `PSAT${i + 1}`, variant: 'psat-nmsqt', assessmentNumber: i + 1 })),
  ...Array.from({ length: 10 }, (_, i) => ({ testId: `SAT${i + 11}`, variant: 'sat-series-b', assessmentNumber: i + 11 })),
];

const CONTEXTS = [
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

const canonical = (value) => String(value ?? '').trim().toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const clone = (value) => JSON.parse(JSON.stringify(value));
const pass = (item) => item?.quality?.verdict === 'pass';

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

function buildApprovedCandidates() {
  const rwPool = [];
  const mathPool = [];
  for (const test of TESTS) {
    const rw = generateRemediatedRWCandidates({ count: 125, testId: test.testId, variant: test.variant, module: 'reading-writing-module-1' });
    rw.candidates.forEach((candidate, index) => rwPool.push({ candidate, quality: rw.quality[index] }));
    const math = generateRemediatedMathCandidates({ count: 50, testId: test.testId, variant: test.variant, assessmentNumber: test.assessmentNumber, module: 'math-module-1', route: 'standard' });
    math.candidates.forEach((candidate, index) => mathPool.push({ candidate, quality: math.quality[index] }));
  }

  const rwEligible = interleaveByTest(rwPool.filter(pass).filter(({ candidate }) => candidate.domain === SCOPE.rw.targetDomain).map(({ candidate }) => candidate));
  const rwSelected = selectFirstDistinct(rwEligible, 195, (candidate) => candidate.originalityFingerprint);
  if (rwSelected.length !== 195) throw new Error(`Batch M authorized replacement: only ${rwSelected.length}/195 R&W candidates available`);
  const rw = rwSelected.map((candidate, index) => {
    const item = stripCandidate(candidate, { replacementTargetDomain: SCOPE.rw.targetDomain, replacementSourceDomain: index < 65 ? 'craft-and-structure' : 'information-and-ideas', selectionOrdinal: index + 1 });
    const pair = CONTEXTS[index % CONTEXTS.length];
    const cycle = Math.floor(index / CONTEXTS.length) + 1;
    item.prompt = `This sentence appears in a report prepared for the ${pair[0]} ${pair[1]}${cycle > 1 ? `, revision ${cycle}` : ''}. ${item.prompt}`;
    item.metadata = { ...(item.metadata || {}), controlledPromptContext: { version: 'batch-m-calibration-context-v1', ordinal: index + 1, sourceLabel: pair.join(' — ') } };
    return item;
  });

  const mathEligible = interleaveByTest(mathPool.filter(pass).filter(({ candidate }) => candidate.questionType === 'student-produced-response').map(({ candidate }) => candidate));
  const mathSelected = selectFirstDistinct(mathEligible, 157, (candidate) => candidate.originalityFingerprint);
  if (mathSelected.length !== 157) throw new Error(`Batch M authorized replacement: only ${mathSelected.length}/157 Math SPR candidates available`);
  const math = mathSelected.map((candidate, index) => stripCandidate(candidate, { replacementTarget: 'student-produced-response', selectionOrdinal: index + 1 }));

  const quality = evaluateContentQualityBatch([...rw, ...math]);
  if (!quality.passed || quality.passedCount !== 352) throw new Error(`Batch M authorized replacement: quality gate failed ${quality.failedCount} of 352 candidates`);
  if (new Set(rw.map((item) => canonical(item.prompt))).size !== 195) throw new Error('Batch M authorized replacement: R&W prompt uniqueness failed');
  return { rw, math };
}

let approvedCache = null;
function getApprovedCandidates() {
  if (!approvedCache) approvedCache = buildApprovedCandidates();
  return approvedCache;
}

function chooseRW(records, candidate, used) {
  const wanted = canonical(candidate.selection?.replacementSourceDomain);
  const exact = records.find((record) => !used.has(record.questionId) && canonical(record.domain) === wanted && record.difficulty === candidate.difficulty);
  if (exact) return exact;
  const fallback = records.find((record) => !used.has(record.questionId) && canonical(record.domain) === wanted);
  if (!fallback) throw new Error(`Batch M authorized replacement: no R&W target for ${candidate.testId}/${wanted}`);
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
  throw new Error(`Batch M authorized replacement: no Math target for ${candidate.testId}/${candidate.domain}/${candidate.skill}`);
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

export function applyBatchMCalibrationProductionReplacement(mock, testKey) {
  if (!mock) return mock;
  const key = String(testKey || mock.testKey || '').trim().toUpperCase();
  const { rw, math } = getApprovedCandidates();
  const rwCandidates = rw.filter((candidate) => candidate.testId === key);
  const mathCandidates = math.filter((candidate) => candidate.testId === key);
  if (!rwCandidates.length && !mathCandidates.length) return mock;

  const output = clone(mock);
  const used = new Set();
  for (const candidate of rwCandidates) {
    const target = chooseRW(output.readingWriting || [], candidate, used);
    used.add(target.questionId);
    const index = output.readingWriting.findIndex((record) => record.questionId === target.questionId);
    output.readingWriting[index] = merge(target, candidate, key);
  }
  for (const candidate of mathCandidates) {
    const target = chooseMath(output.math || [], candidate, used);
    used.add(target.questionId);
    const index = output.math.findIndex((record) => record.questionId === target.questionId);
    output.math[index] = merge(target, candidate, key);
  }
  return output;
}

export const BATCH_M_CALIBRATION_PRODUCTION_REPLACEMENT = Object.freeze({
  date: '2026-09-17',
  status: 'authorized-production-replacement-layer-active',
  productionMutation: true,
  releaseEligible: false,
  sat21Created: false,
  replacementCount: 352,
  rw: { total: 195, craftAndStructureToSEC: 65, informationAndIdeasToSEC: 130 },
  math: { studentProducedResponse: 157 },
});

export default applyBatchMCalibrationProductionReplacement;
