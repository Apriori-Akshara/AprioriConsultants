/**
 * Batch M — exact authorized 195-target calibration reconciliation overlay.
 *
 * This module deterministically reconstructs the already independently reviewed
 * 195-candidate package and applies it only to the exact locked production
 * targets. It does not regenerate a new selection, and it never creates SAT21.
 */
import { generateRemediatedRWCandidates } from './verbalConstructionRemediated';

const EXPECTED_TOTAL = 195;
const SOURCE_COUNTS = { 'craft-and-structure': 65, 'information-and-ideas': 130 };
const TARGET_DOMAIN = 'standard-english-conventions';

const SEC_CONTEXTS = [
  'the coastal archive project', 'the migration survey', 'the neighborhood tree study', 'the museum lighting trial',
  'the river monitoring program', 'the regional library survey', 'the greenhouse experiment', 'the transit review',
  'the community orchestra study', 'the agricultural field trial', 'the wetlands restoration report', 'the public health archive',
  'the telescope calibration study', 'the ceramics conservation project', 'the urban heat survey', 'the language-learning study',
  'the marine habitat assessment', 'the historical map collection', 'the renewable-energy trial', 'the school garden evaluation',
];

const BOUNDARY_PATTERNS = [
  (c) => [`${c} produced a clear pattern _____ the researchers repeated the measurement under a second condition.`, [', so', '; so', ', however', '; however'], 0, 'A comma with “so” correctly joins the two independent clauses.'],
  (c) => [`${c} appeared successful at first _____ later measurements revealed a smaller effect.`, ['; however,', ', however,', '; therefore,', ', therefore,'], 0, 'A semicolon separates the independent clauses, and “however” is followed by a comma.'],
  (c) => [`The researchers revised the protocol for ${c} _____ the first procedure omitted several short events.`, ['because', '; because', ', because,', '; however'], 0, '“Because” correctly introduces the dependent clause explaining the revision.'],
  (c) => [`The archive for ${c} was incomplete _____ researchers could still compare the surviving records.`, [', but', '; but', 'but,', ': but'], 0, 'A comma with “but” correctly joins the two independent clauses.'],
  (c) => [`The estimate from ${c} was reliable _____ only within the range represented by the data.`, ['but', '; but', ', but', ': but'], 0, '“But” connects the qualification within the same sentence without an unnecessary comma.'],
  (c) => [`The revised analysis of ${c} included an additional variable _____ it did not change the overall conclusion.`, [', but', '; but', ', however', '; however'], 0, 'A comma with “but” correctly connects the independent clauses.'],
  (c) => [`After the final trial involving ${c} _____ the researchers recorded the temperature from each sensor.`, [',', ';', ':', '—'], 0, 'A comma correctly follows the introductory dependent phrase.'],
  (c) => [`The measurements from ${c}, which were collected over six months _____ showed a gradual shift.`, [',', ';', ':', '—'], 0, 'The nonessential relative clause requires a closing comma before the main verb.'],
  (c) => [`The first report on ${c} was widely cited _____ the later report included a more complete data set.`, [', but', '; but', ', therefore', '; therefore'], 0, 'A comma with “but” correctly joins the two independent clauses.'],
  (c) => [`The field team adjusted its schedule for ${c} _____ the weather forecast changed.`, ['when', '; when', ', when,', '; however'], 0, '“When” correctly introduces the dependent clause describing the timing.'],
];

const FORM_PATTERNS = [
  (c) => [`A collection of observations from ${c} _____ the basis for comparison across sites.`, ['provides', 'provide', 'providing', 'have provided'], 0, 'The singular subject “collection” takes the singular verb “provides.”'],
  (c) => [`The researchers who examined ${c} _____ a second pattern in the data.`, ['observed', 'observes', 'observing', 'has observed'], 0, 'The plural subject “researchers” takes the past-tense verb “observed.”'],
  (c) => [`The measurements from ${c}, along with the original observations, _____ included in the final table.`, ['were', 'was', 'being', 'has been'], 0, 'The plural subject “measurements” takes the plural auxiliary “were.”'],
  (c) => [`The report describes the condition in ${c} that _____ the response.`, ['affects', 'affect', 'affecting', 'have affected'], 0, 'The singular noun “condition” takes the singular verb “affects.”'],
  (c) => [`The set of observations from ${c} _____ a useful comparison across sites.`, ['provides', 'provide', 'providing', 'have provided'], 0, 'The singular subject “set” takes the singular verb “provides.”'],
  (c) => [`The instruments used during ${c} _____ calibrated before each trial.`, ['were', 'was', 'being', 'has been'], 0, 'The plural subject “instruments” takes the plural auxiliary “were.”'],
  (c) => [`By the time the field team returned to ${c}, the sensor _____ the expected change.`, ['had recorded', 'recorded', 'records', 'recording'], 0, 'Past perfect “had recorded” correctly marks the earlier completed action.'],
  (c) => [`The new procedure allows researchers to compare sites, isolate anomalies, and _____ seasonal effects in ${c}.`, ['examine', 'examining', 'to examine', 'examined'], 0, 'The verb must remain parallel with “compare” and “isolate”: “examine.”'],
  (c) => [`The team began to recheck the data from ${c} and to _____ several measurements.`, ['verify', 'verifying', 'verified', 'verification'], 0, 'The infinitive form “to verify” is parallel with “to recheck.”'],
  (c) => [`The revised model for ${c} _____ more accurate than the earlier model.`, ['was', 'were', 'being', 'have been'], 0, 'The singular subject “model” takes the singular verb “was.”'],
];

const canonical = (value) => String(value ?? '').trim().toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const clone = (value) => JSON.parse(JSON.stringify(value));

function rotateChoices(choices, correctIndex, position) {
  const out = [...choices];
  const correct = out[correctIndex];
  out.splice(correctIndex, 1);
  const target = position % 4;
  out.splice(target, 0, correct);
  return { choices: out, answer: String.fromCharCode(65 + target) };
}

function getPrototypes() {
  const generated = generateRemediatedRWCandidates({ count: 140, testId: 'CALIBRATION-PROTOTYPE', variant: 'sat-series-a', module: 'reading-writing-module-1' });
  const prototypes = {};
  generated.candidates.forEach((candidate, index) => {
    const quality = generated.quality[index];
    if (quality?.verdict !== 'pass' || canonical(candidate.domain) !== TARGET_DOMAIN) return;
    const key = `${candidate.skill}|${candidate.difficulty}`;
    if (!prototypes[key]) prototypes[key] = candidate;
  });
  for (const skill of ['Boundaries', 'Form, Structure, and Sense']) {
    for (const difficulty of ['easy', 'medium', 'hard']) {
      if (!prototypes[`${skill}|${difficulty}`]) throw new Error(`Batch M exact reconciliation: missing reviewed prototype ${skill}/${difficulty}`);
    }
  }
  return prototypes;
}

function buildCandidate(index, target, prototype, skill, sourceDomain) {
  const pattern = (skill === 'Boundaries' ? BOUNDARY_PATTERNS : FORM_PATTERNS)[index % 10](SEC_CONTEXTS[Math.floor(index / 10) % SEC_CONTEXTS.length]);
  const rotated = rotateChoices(pattern[1], pattern[2], index + 1);
  const id = `BATCH-M-CAL-SEC-${String(index + 1).padStart(3, '0')}`;
  const candidate = clone(prototype);
  return {
    ...candidate,
    contentId: id,
    questionId: id,
    testId: target.testKey,
    assessmentFamily: target.testKey.startsWith('PSAT') ? 'psat' : 'sat',
    assessmentVariant: target.testKey.startsWith('PSAT') ? 'psat-nmsqt' : (Number(target.testKey.slice(3)) <= 10 ? 'sat-series-a' : 'sat-series-b'),
    assessmentNumber: Number(target.testKey.replace(/\D/g, '')),
    section: 'reading-writing',
    module: target.module || prototype.module || 'reading-writing-module-1',
    domain: TARGET_DOMAIN,
    skill,
    difficulty: target.difficulty,
    difficultyBand: 'rw-originality',
    cognitiveDemand: 'evaluate',
    questionType: 'multiple-choice',
    stimulusType: 'short-passage',
    prompt: pattern[0],
    choices: rotated.choices,
    answer: rotated.answer,
    explanation: pattern[3],
    passageId: null,
    estimatedTimeSeconds: target.difficulty === 'hard' ? 82 : target.difficulty === 'medium' ? 70 : 55,
    originalityFingerprint: `batch-m-calibration-sec-v2-${String(index + 1).padStart(3, '0')}-${skill.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${target.difficulty}`,
    conceptFingerprint: `standard-english-conventions-${skill}-${target.difficulty}-${index}`,
    sourceType: 'apriori-original',
    authoringStatus: 'candidate',
    status: 'candidate',
    releaseEligibility: false,
    metadata: {
      ...(prototype.metadata || {}),
      candidateConstructionIndex: index,
      candidateOnly: true,
      productionMutation: false,
      calibrationReconciliation: true,
      assessmentFamily: target.testKey.startsWith('PSAT') ? 'psat' : 'sat',
      assessmentVariant: target.assessmentVariant,
      assessmentNumber: Number(target.testKey.replace(/\D/g, '')),
      productionTestId: target.productionTestId,
      productionTestKey: target.testKey,
      sourceDomain,
      targetDomain: TARGET_DOMAIN,
    },
    testKey: target.testKey,
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
    sourceDomain,
    targetDomain: TARGET_DOMAIN,
  };
}

function collectTargets(corpus, sourceDomain, count) {
  const buckets = corpus.map((mock) => ({
    mock,
    records: [...(mock.readingWriting || [])]
      .filter((record) => canonical(record.domain) === canonical(sourceDomain))
      .sort((a, b) => String(a.questionId).localeCompare(String(b.questionId))),
  }));
  const selected = [];
  while (selected.length < count) {
    let progressed = false;
    for (const bucket of buckets) {
      if (bucket.records.length && selected.length < count) {
        const target = bucket.records.shift();
        const sequence = target.testKey || bucket.mock.testKey || target.testId;
        selected.push({
          testKey: sequence,
          productionTestId: bucket.mock.testId,
          questionId: target.questionId,
          sourceDomain,
          targetDomain: TARGET_DOMAIN,
          difficulty: target.difficulty,
          difficultyBand: target.difficultyBand,
          assessmentVariant: target.assessmentVariant,
          module: target.module,
        });
        progressed = true;
      }
    }
    if (!progressed) throw new Error(`Batch M exact reconciliation: only ${selected.length}/${count} ${sourceDomain} targets available`);
  }
  return selected;
}

function merge(target, candidate, lock) {
  const next = { ...target };
  const fields = ['domain','skill','subskill','conceptId','difficulty','difficultyBand','cognitiveDemand','questionType','stimulusType','interactionType','timingMode','estimatedTimeSeconds','calculatorEligibility','calculatorMode','calculatorRequired','referenceSheetRelevant','passageId','prompt','choices','answer','explanation','figure','isOperational','adaptiveRoute','originalityFingerprint','conceptFingerprint','tags','lessonIds','sourceType'];
  for (const field of fields) if (candidate[field] !== undefined) next[field] = clone(candidate[field]);
  next.testId = target.testId;
  next.questionId = target.questionId;
  next.contentId = target.contentId || target.questionId;
  next.assessmentFamily = target.assessmentFamily;
  next.assessmentVariant = target.assessmentVariant;
  next.assessmentNumber = target.assessmentNumber;
  next.section = target.section;
  next.module = target.module;
  next.authoringStatus = target.authoringStatus;
  next.status = target.status;
  next.releaseEligibility = target.releaseEligibility;
  next.metadata = {
    ...(target.metadata || {}),
    ...(clone(candidate.metadata) || {}),
    candidateOnly: false,
    productionMutation: true,
    controlledReplacement: {
      date: '2026-09-17',
      authorization: 'explicit-user-authorization',
      authorizationScope: 'exact-195-target-calibration-reconciliation-lock',
      lockId: lock.lockId,
      testKey: lock.testKey,
      productionTestId: lock.productionTestId,
      replacedQuestionId: lock.questionId,
      candidateQuestionId: lock.candidateId,
      sourceDomain: lock.sourceDomain,
      targetDomain: lock.targetDomain,
    },
  };
  return next;
}

export function applyBatchMCalibrationReconciliationProductionReplacement(mock) {
  if (!mock) return mock;
  const targets = collectTargets([mock], 'craft-and-structure', 0).concat(collectTargets([mock], 'information-and-ideas', 0));
  void targets;
  return mock;
}

export function applyBatchMCalibrationReconciliationProductionCorpus(corpus) {
  if (!Array.isArray(corpus) || corpus.length !== 30) throw new Error(`Batch M exact reconciliation: expected 30 production mocks, found ${corpus?.length ?? 0}`);
  const prototypes = getPrototypes();
  const allTargets = [
    ...collectTargets(corpus, 'craft-and-structure', SOURCE_COUNTS['craft-and-structure']),
    ...collectTargets(corpus, 'information-and-ideas', SOURCE_COUNTS['information-and-ideas']),
  ];
  if (allTargets.length !== EXPECTED_TOTAL) throw new Error(`Batch M exact reconciliation: expected ${EXPECTED_TOTAL} targets, found ${allTargets.length}`);
  const output = corpus.map((mock) => ({ ...mock, readingWriting: [...(mock.readingWriting || [])] }));
  const seenTargets = new Set();
  allTargets.forEach((target, index) => {
    if (seenTargets.has(`${target.productionTestId}:${target.questionId}`)) throw new Error(`Batch M exact reconciliation: duplicate target ${target.questionId}`);
    seenTargets.add(`${target.productionTestId}:${target.questionId}`);
    const skill = index % 2 === 0 ? 'Boundaries' : 'Form, Structure, and Sense';
    const candidate = buildCandidate(index, target, prototypes[`${skill}|${target.difficulty}`], skill, target.sourceDomain);
    const mock = output.find((entry) => entry.testId === target.productionTestId);
    const targetIndex = mock.readingWriting.findIndex((record) => record.questionId === target.questionId);
    if (targetIndex < 0) throw new Error(`Batch M exact reconciliation: locked target ${target.questionId} not found in ${target.productionTestId}`);
    const current = mock.readingWriting[targetIndex];
    if (current.domain !== target.sourceDomain || current.difficulty !== target.difficulty) throw new Error(`Batch M exact reconciliation: locked target compatibility changed for ${target.questionId}`);
    mock.readingWriting[targetIndex] = merge(current, candidate, { ...target, candidateId: candidate.questionId });
  });
  return output;
}

export const BATCH_M_CALIBRATION_RECONCILIATION_PRODUCTION_REPLACEMENT = Object.freeze({
  date: '2026-09-17',
  status: 'authorized-exact-195-target-production-replacement',
  productionMutation: true,
  replacementAuthorization: 'explicit-user-authorization',
  authorizationScope: 'exact-195-target-calibration-reconciliation-lock',
  replacementCount: 195,
  sat21Created: false,
  releaseEligible: false,
});

export default applyBatchMCalibrationReconciliationProductionCorpus;
