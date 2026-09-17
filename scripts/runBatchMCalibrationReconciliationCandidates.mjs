import fs from 'node:fs';
import { generateRemediatedRWCandidates } from '../src/data/sat/mockContent/verbalConstructionRemediated';
import { evaluateContentQualityBatch } from '../src/data/sat/mockContent/batchMContentQualityGate';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore';
import { runBatchMFinalCorpusGate } from '../src/data/sat/mockContent/batchMFinalCorpusGate';
import { runBatchMCrossCorpusCalibrationCanonical } from '../src/data/sat/mockContent/batchMCrossCorpusCalibrationCanonical';
import { BATCH_M_PRODUCTION_SEQUENCE } from '../src/data/sat/mockContent/batchMProductionController';

const OUTPUT_DIR = process.env.BATCH_M_OUTPUT_DIR || 'artifacts/batch-m-calibration-reconciliation-candidates';
const OUTPUT_JSON = `${OUTPUT_DIR}/BATCH-M-CALIBRATION-RECONCILIATION-CANDIDATES-2026-09-17.json`;
const OUTPUT_MD = `${OUTPUT_DIR}/BATCH-M-CALIBRATION-RECONCILIATION-CANDIDATES-2026-09-17.md`;
const EXPECTED_TOTAL = 195;
const SOURCE_COUNTS = { 'craft-and-structure': 65, 'information-and-ideas': 130 };
const TARGET_DOMAIN = 'standard-english-conventions';
const RW_TARGETS = {
  'craft-and-structure': 0.28,
  'information-and-ideas': 0.26,
  'standard-english-conventions': 0.26,
  'expression-of-ideas': 0.20,
};
const HARD_LIMIT = 0.05;

const clone = (value) => JSON.parse(JSON.stringify(value));
const canonical = (value) => String(value ?? '').trim().toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const normalizePrompt = (value) => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
const fail = (message) => { throw new Error(`Batch M calibration reconciliation candidates: ${message}`); };

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

function rotateChoices(choices, correctIndex, position) {
  const out = [...choices];
  const correct = out[correctIndex];
  out.splice(correctIndex, 1);
  const target = position % 4;
  out.splice(target, 0, correct);
  return { choices: out, answer: String.fromCharCode(65 + target) };
}

function stats(corpus) {
  const counts = {};
  let total = 0;
  for (const mock of corpus) for (const record of mock?.readingWriting || []) {
    const domain = canonical(record.domain) || '(missing)';
    counts[domain] = (counts[domain] || 0) + 1;
    total += 1;
  }
  const findings = Object.entries(RW_TARGETS).map(([domain, target]) => {
    const actual = total ? Number(((counts[domain] || 0) / total).toFixed(4)) : 0;
    const delta = Number((actual - target).toFixed(4));
    return { domain, target, actual, delta, withinTarget: Math.abs(delta) <= HARD_LIMIT };
  });
  return { total, counts, findings, failures: findings.filter((item) => !item.withinTarget) };
}

function interleaveTargets(sourceDomain, count, corpus) {
  const buckets = corpus.map((mock) => {
    const productionTarget = BATCH_M_PRODUCTION_SEQUENCE.find((item) => item.testId === mock.testId);
    if (!productionTarget) fail(`production corpus mock ${mock.testId} is missing from BATCH_M_PRODUCTION_SEQUENCE`);
    return {
      productionTarget,
      testKey: productionTarget.testKey,
      testId: mock.testId,
      records: [...(mock.readingWriting || [])]
        .filter((record) => canonical(record.domain) === canonical(sourceDomain))
        .sort((a, b) => String(a.questionId).localeCompare(String(b.questionId))),
    };
  });
  const selected = [];
  while (selected.length < count) {
    let progressed = false;
    for (const bucket of buckets) {
      if (bucket.records.length && selected.length < count) {
        selected.push({ sourceDomain, testKey: bucket.testKey, productionTestId: bucket.testId, productionTarget: bucket.productionTarget, target: bucket.records.shift() });
        progressed = true;
      }
    }
    if (!progressed) fail(`only ${selected.length}/${count} targets available for ${sourceDomain}`);
  }
  return selected;
}

function getSecPrototypes() {
  const generated = generateRemediatedRWCandidates({ count: 140, testId: 'CALIBRATION-PROTOTYPE', variant: 'sat-series-a', module: 'reading-writing-module-1' });
  const pass = generated.candidates
    .map((candidate, index) => ({ candidate, quality: generated.quality[index] }))
    .filter((item) => item.quality?.verdict === 'pass' && canonical(item.candidate.domain) === TARGET_DOMAIN);
  const prototypes = {};
  for (const item of pass) {
    const key = `${item.candidate.skill}|${item.candidate.difficulty}`;
    if (!prototypes[key]) prototypes[key] = item.candidate;
  }
  for (const skill of ['Boundaries', 'Form, Structure, and Sense']) for (const difficulty of ['easy', 'medium', 'hard']) if (!prototypes[`${skill}|${difficulty}`]) fail(`no passing SEC prototype available for ${skill}/${difficulty}`);
  return prototypes;
}

function buildSECContent(index, skill) {
  const patternIndex = index % 10;
  const contextIndex = Math.floor(index / 10) % SEC_CONTEXTS.length;
  const [prompt, choices, correctIndex, explanation] = (skill === 'Boundaries' ? BOUNDARY_PATTERNS : FORM_PATTERNS)[patternIndex](SEC_CONTEXTS[contextIndex]);
  const rotated = rotateChoices(choices, correctIndex, index + 1);
  return { prompt, choices: rotated.choices, answer: rotated.answer, explanation };
}

function buildCandidate(index, target, prototype, skill) {
  const content = buildSECContent(index, skill);
  const id = `BATCH-M-CAL-SEC-${String(index + 1).padStart(3, '0')}`;
  const fingerprint = `batch-m-calibration-sec-v2-${String(index + 1).padStart(3, '0')}-${skill.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${target.target.difficulty}`;
  const productionTarget = target.productionTarget;
  return { ...clone(prototype), contentId: id, questionId: id, testId: target.testKey, assessmentFamily: productionTarget.assessment, assessmentVariant: productionTarget.variant, assessmentNumber: productionTarget.assessmentNumber, section: 'reading-writing', module: target.target.module || prototype.module || 'reading-writing-module-1', domain: TARGET_DOMAIN, skill, difficulty: target.target.difficulty, difficultyBand: `${productionTarget.variant}-${target.target.difficulty}`, cognitiveDemand: 'evaluate', questionType: 'multiple-choice', stimulusType: 'short-passage', prompt: content.prompt, choices: content.choices, answer: content.answer, explanation: content.explanation, passageId: null, estimatedTimeSeconds: target.target.difficulty === 'hard' ? 82 : target.target.difficulty === 'medium' ? 70 : 55, originalityFingerprint: fingerprint, conceptFingerprint: `standard-english-conventions-${skill}-${target.target.difficulty}-${index}`, metadata: { ...clone(prototype.metadata || {}), sourceFamily: prototype.metadata?.sourceFamily || 'science', rhetoricalStructure: prototype.metadata?.rhetoricalStructure || 'grammar-constraint', evidenceRelationship: 'direct-support', cognitiveOperation: 'evaluate', targetWord: null, crossTextRelationship: null, difficultyFeatures: target.target.difficulty === 'hard' ? ['multi-step', 'strategic-choice'] : target.target.difficulty === 'medium' ? ['careful-interpretation'] : [], candidateConstructionIndex: index, candidateOnly: true, productionMutation: false, calibrationReconciliation: true, assessmentFamily: productionTarget.assessment, assessmentVariant: productionTarget.variant, assessmentNumber: productionTarget.assessmentNumber, productionTestId: target.productionTestId, productionTestKey: productionTarget.testKey }, tags: ['sat', 'batch-m-calibration-reconciliation', 'apriori-original', 'standard-english-conventions'], sourceType: 'apriori-original', authoringStatus: 'candidate', status: 'candidate', releaseEligibility: false, productionMutation: false, releaseEligible: false, sat21Created: false };
}

function main() {
  const baselineCorpus = clone(BATCH_M_ACCEPTED_PRODUCTION_CORPUS);
  const baselineCalibration = runBatchMCrossCorpusCalibrationCanonical(baselineCorpus);
  const baselineRW = stats(baselineCorpus);
  const baselineFailureKeys = [...(baselineCalibration.calibration?.failures || []), ...baselineRW.failures.map((item) => `rw-domain:${item.domain}`)];
  const targets = [...interleaveTargets('craft-and-structure', SOURCE_COUNTS['craft-and-structure'], baselineCorpus), ...interleaveTargets('information-and-ideas', SOURCE_COUNTS['information-and-ideas'], baselineCorpus)];
  if (targets.length !== EXPECTED_TOTAL) fail(`expected ${EXPECTED_TOTAL} targets, found ${targets.length}`);

  const prototypes = getSecPrototypes();
  const selected = targets.map((target, index) => {
    const skill = index % 2 === 0 ? 'Boundaries' : 'Form, Structure, and Sense';
    return { candidate: buildCandidate(index, target, prototypes[`${skill}|${target.target.difficulty}`], skill), replacementSourceDomain: target.sourceDomain, target };
  });

  const promptSet = new Set();
  const existingPrompts = new Set();
  for (const mock of baselineCorpus) for (const record of mock?.readingWriting || []) existingPrompts.add(normalizePrompt(record.prompt));
  for (const item of selected) {
    const key = normalizePrompt(item.candidate.prompt);
    if (!key) fail(`candidate ${item.candidate.questionId} has empty prompt`);
    if (promptSet.has(key)) fail(`duplicate generated SEC prompt: ${item.candidate.questionId}`);
    if (existingPrompts.has(key)) fail(`generated SEC prompt already exists in production corpus: ${item.candidate.questionId}`);
    promptSet.add(key);
  }

  const candidates = selected.map((item) => ({ ...item.candidate, sourceDomain: item.replacementSourceDomain, targetDomain: TARGET_DOMAIN, productionTestId: item.target.productionTestId, productionMutation: false, releaseEligible: false, sat21Created: false }));
  const contentQuality = evaluateContentQualityBatch(candidates);
  if (!contentQuality.passed || contentQuality.passedCount !== EXPECTED_TOTAL) fail(`candidate quality gate failed: ${contentQuality.failedCount} failures across ${EXPECTED_TOTAL} candidates`);

  const hypotheticalCorpus = clone(baselineCorpus);
  const assignments = [];
  for (let index = 0; index < selected.length; index += 1) {
    const item = selected[index];
    const candidate = candidates[index];
    const mock = hypotheticalCorpus.find((entry) => entry.testId === item.target.productionTestId);
    if (!mock) fail(`missing production mock ${item.target.productionTestId}`);
    const targetIndex = mock.readingWriting.findIndex((record) => record.questionId === item.target.target.questionId);
    if (targetIndex < 0) fail(`target ${item.target.target.questionId} not found in ${item.target.productionTestId}`);
    const targetRecord = mock.readingWriting[targetIndex];
    if (canonical(targetRecord.domain) !== canonical(item.replacementSourceDomain)) fail(`target domain mismatch for ${candidate.questionId}`);
    if (targetRecord.difficulty !== candidate.difficulty) fail(`difficulty mismatch for ${candidate.questionId}`);
    mock.readingWriting[targetIndex] = { ...clone(targetRecord), domain: TARGET_DOMAIN, skill: candidate.skill, prompt: candidate.prompt, choices: clone(candidate.choices), answer: candidate.answer, explanation: candidate.explanation, originalityFingerprint: candidate.originalityFingerprint, metadata: clone(candidate.metadata) };
    assignments.push({ candidateId: candidate.questionId, sourceCandidateQuestionId: candidate.questionId, testKey: item.target.testKey, productionTestId: item.target.productionTestId, questionId: item.target.target.questionId, sourceDomain: item.replacementSourceDomain, targetDomain: TARGET_DOMAIN, candidateDifficulty: candidate.difficulty, productionTargetDifficulty: targetRecord.difficulty, difficultyPreserved: true });
  }
  if (assignments.length !== EXPECTED_TOTAL) fail(`only ${assignments.length}/${EXPECTED_TOTAL} assignments resolved`);

  const postCalibration = runBatchMCrossCorpusCalibrationCanonical(hypotheticalCorpus);
  const postRW = stats(hypotheticalCorpus);
  const postFailureKeys = [...(postCalibration.calibration?.failures || []), ...postRW.failures.map((item) => `rw-domain:${item.domain}`)];
  const newFailures = postFailureKeys.filter((key) => !baselineFailureKeys.includes(key));
  const finalCorpusGate = runBatchMFinalCorpusGate(hypotheticalCorpus);
  if (!finalCorpusGate.passed) fail('hypothetical reconciliation failed the final 30-mock corpus gate');
  if (newFailures.length) fail(`hypothetical reconciliation introduced new calibration failures: ${JSON.stringify(newFailures)}`);

  const result = {
    reportType: 'batch-m-calibration-reconciliation-candidates', date: '2026-09-17',
    baseline: { rw: baselineRW, crossCorpusCalibrationPassed: baselineCalibration.passed, failures: baselineFailureKeys },
    candidatePlan: { totalCandidates: EXPECTED_TOTAL, targetDomain: TARGET_DOMAIN, sourceCounts: SOURCE_COUNTS, uniqueCandidatePrompts: promptSet.size, contentQualityPassed: contentQuality.passed, assignmentsResolved: assignments.length, difficultyPreservationFailures: 0, productionTargetsResolvedDirectly: true, assessmentVariantMappingSource: 'BATCH_M_PRODUCTION_SEQUENCE' },
    hypotheticalPostState: { rw: postRW, crossCorpusCalibrationPassed: postCalibration.passed, failures: postFailureKeys, newFailuresIntroduced: newFailures, finalCorpusGatePassed: finalCorpusGate.passed, mockCount: finalCorpusGate.mockCount, totalRecords: finalCorpusGate.totalRecords },
    assignments, candidates, productionMutation: false, releaseEligible: false, replacementAuthorization: 'NOT_AUTHORIZED', sat21Created: false,
    decision: 'CALIBRATION_RECONCILIATION_CANDIDATES_VALIDATED_PENDING_INDEPENDENT_REVIEW_AND_EXPLICIT_PRODUCTION_AUTHORIZATION',
    nextStep: 'Run independent review on these 195 SEC candidates, then finalize target lock and obtain fresh explicit production authorization before mutation.',
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2));
  fs.writeFileSync(OUTPUT_MD, [
    '# Batch M calibration reconciliation candidates — 2026-09-17', '',
    '- Candidate-only calibration reconciliation; **production is unchanged**.',
    `- Proposed SEC increase: **${EXPECTED_TOTAL}** R&W replacements.`,
    `- Unique candidate prompts: **${promptSet.size}/${EXPECTED_TOTAL}** and none are already present in production.`,
    `- Candidate quality gate: **${contentQuality.passed ? 'PASS' : 'FAIL'}**.`,
    `- Hypothetical assignments resolved: **${assignments.length}/${EXPECTED_TOTAL}**.`,
    `- Hypothetical final 30-mock corpus gate: **${finalCorpusGate.passed ? 'PASS' : 'FAIL'}**.`,
    `- New calibration failures introduced: **${newFailures.length}**.`,
    `- Hypothetical R&W SEC proportion: **${((postRW.findings.find((item) => item.domain === TARGET_DOMAIN)?.actual || 0) * 100).toFixed(2)}%**.`,
    '- Assessment-variant mapping source: **BATCH_M_PRODUCTION_SEQUENCE**.',
    '- Production mutation: **false**.', '- Replacement authorization: **NOT_AUTHORIZED**.', '- SAT21 created: **false**.',
  ].join('\n') + '\n');

  console.log(JSON.stringify({ decision: result.decision, totalCandidates: EXPECTED_TOTAL, assignmentsResolved: assignments.length, uniqueCandidatePrompts: promptSet.size, contentQualityPassed: contentQuality.passed, finalCorpusGatePassed: finalCorpusGate.passed, newCalibrationFailures: newFailures.length, hypotheticalRwSECProportion: postRW.findings.find((item) => item.domain === TARGET_DOMAIN)?.actual ?? null, assessmentVariantMappingSource: 'BATCH_M_PRODUCTION_SEQUENCE', productionMutation: false, replacementAuthorization: 'NOT_AUTHORIZED', sat21Created: false }, null, 2));
}

main();
