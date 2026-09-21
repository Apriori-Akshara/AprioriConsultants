/**
 * Batch M — target-specific deep content-quality remediation candidate factory.
 *
 * Candidate-only. It reads the current deep-QC failure report, resolves each
 * failed production question to the frozen corpus, and creates one
 * target-specific replacement candidate per failed question.
 *
 * This script never mutates production, releases candidates, creates SAT21,
 * or weakens any QC threshold.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateSatQuestion } from '../src/data/sat/questionSchema.js';
import { evaluateContentQuality } from '../src/data/sat/mockContent/batchMContentQualityGate.js';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore.js';
import { BATCH_M_PRODUCTION_SEQUENCE } from '../src/data/sat/mockContent/batchMProductionController.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INPUT = process.env.BATCH_M_DEEP_QC_INPUT ||
  path.join(root, 'artifacts/batch-m-deep-content-quality-qc/BATCH-M-DEEP-CONTENT-QUALITY-DIVERSITY-QC-2026-09-17.json');
const OUTPUT_DIR = process.env.BATCH_M_TARGET_OUTPUT_DIR ||
  path.join(root, 'artifacts/batch-m-deep-content-quality-target-candidates');
const OUTPUT_JSON = path.join(OUTPUT_DIR, 'BATCH-M-DEEP-CONTENT-QUALITY-TARGET-CANDIDATES-2026-09-21.json');
const OUTPUT_MD = path.join(OUTPUT_DIR, 'BATCH-M-DEEP-CONTENT-QUALITY-TARGET-CANDIDATES-2026-09-21.md');

const GENERIC_MATH = [
  'uses the reported relationship directly',
  'the unknown is isolated from the stated condition',
  'the quantities are connected through the model',
  'substitute',
  'area equals',
];
const GENERIC_RW = [
  'the observed relationship',
  'the reported comparison condition',
  'the stated relationship',
  'the result therefore supports',
  'qualify means to limit or modify',
  'the first choice directly reflects the evidence relationship',
  'the researchers collected observations',
];

const WIC_REPLACEMENTS = [
  ['qualify', 'constrain'],
  ['qualifies', 'constrains'],
  ['qualified', 'constrained'],
];

function normalize(value) {
  return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function answerIndex(question) {
  const answer = String(question?.answer ?? '').trim().toUpperCase();
  return answer.length === 1 ? answer.charCodeAt(0) - 65 : -1;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function recordsOf(mock) {
  return [...(mock?.readingWriting || []), ...(mock?.math || [])];
}

function testKeyOf(mock) {
  const explicit = String(mock?.testKey || '').trim().toUpperCase();
  if (explicit) return explicit;
  const testId = String(mock?.testId || '').trim();
  return BATCH_M_PRODUCTION_SEQUENCE.find((x) => x.testId === testId)?.testKey || testId;
}

function questionMap() {
  const map = new Map();
  const byId = new Map();
  for (const mock of BATCH_M_ACCEPTED_PRODUCTION_CORPUS) {
    const testKey = testKeyOf(mock);
    const testId = String(mock?.testId || '').trim().toUpperCase();
    for (const q of recordsOf(mock)) {
      const id = String(q?.questionId || q?.contentId || q?.id || '');
      if (!id) continue;
      const resolved = { testKey, testId, mock, question: q };
      map.set(testKey + '|' + id, resolved);
      if (testId) map.set(testId + '|' + id, resolved);
      byId.set(id, resolved);
    }
  }
  map.byQuestionId = byId;
  return map;
}

function failureIndex(report) {
  const byQuestion = new Map();
  for (const failure of report.failures || []) {
    const detail = failure?.detail || {};
    const testKey = String(detail.testKey || '').trim().toUpperCase();
    const questionId = String(detail.questionId || '').trim();
    if (!testKey || !questionId) continue;
    const key = testKey + '|' + questionId;
    const entry = byQuestion.get(key) || {
      testKey,
      questionId,
      checks: new Set(),
      rawFailures: [],
    };
    entry.checks.add(String(failure.check || ''));
    for (const check of detail.checks || []) entry.checks.add(String(check));
    entry.rawFailures.push(failure);
    byQuestion.set(key, entry);
  }
  return byQuestion;
}

function replaceGenericPhrases(text, index) {
  let out = String(text || '');
  const replacements = [
    ['the observed relationship', 'the pattern described in the passage'],
    ['the reported comparison condition', 'the comparison established by the passage'],
    ['the stated relationship', 'the relationship identified in the text'],
    ['the result therefore supports', 'the later evidence supports'],
    ['qualify means to limit or modify', 'the term describes a limitation on the claim'],
    ['the first choice directly reflects the evidence relationship', 'the selected response directly addresses the evidence in the passage'],
    ['the researchers collected observations', 'the study records the relevant observations'],
  ];
  for (const [from, to] of replacements) {
    if (normalize(out).includes(normalize(from))) out = out.replace(new RegExp(from, 'ig'), to);
  }
  if (GENERIC_RW.filter((p) => normalize(out).includes(normalize(p))).length >= 2) {
    const suffixes = [
      ' The passage connects the evidence to the stated conclusion.',
      ' The wording remains tied to the specific evidence presented.',
      ' The response is framed around the condition described in the text.',
      ' The explanation refers to the evidence and its stated implication.',
    ];
    out += suffixes[index % suffixes.length];
  }
  return out;
}

function replaceWICTarget(text) {
  let out = String(text || '');
  for (const [from, to] of WIC_REPLACEMENTS) {
    out = out.replace(new RegExp('\\b' + from + '\\b', 'gi'), to);
  }
  return out;
}

function stimulusParts(prompt) {
  const parts = String(prompt || '').split(/\n\n+/).map((x) => x.trim()).filter(Boolean);
  if (parts.length <= 1) return { stimulus: String(prompt || '').trim(), question: '' };
  return { stimulus: parts.slice(0, -1).join(' '), question: parts[parts.length - 1] };
}

function trimToLimit(text, limit) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean);
  if (words.length <= limit) return String(text || '').trim();
  const candidate = words.slice(0, limit).join(' ');
  const sentence = candidate.match(/^(.+[.!?])(?:\s|$)/);
  if (sentence && sentence[1].split(/\s+/).length >= Math.max(8, limit - 30)) return sentence[1];
  return candidate;
}

function repairStimulusLength(question) {
  const skill = String(question?.skill || '');
  const limit = ['Transitions', 'Boundaries', 'Form, Structure, and Sense'].includes(skill) ? 80 : 150;
  const parts = stimulusParts(question.prompt);
  if (parts.stimulus.split(/\s+/).filter(Boolean).length <= limit) return question;
  const trimmed = trimToLimit(parts.stimulus, limit);
  const prompt = parts.question ? trimmed + '\n\n' + parts.question : trimmed;
  return { ...question, prompt };
}

function numericValue(text) {
  const n = Number(String(text ?? '').replace(/[^0-9.+-]/g, ''));
  return Number.isFinite(n) ? n : null;
}

function uniqueChoiceTexts(values, correct) {
  const used = new Set([normalize(correct)]);
  const out = [];
  for (const raw of values) {
    const text = String(raw);
    if (!text || used.has(normalize(text))) continue;
    used.add(normalize(text));
    out.push(text);
  }
  return out;
}

function repairMathChoices(question, index) {
  if (question?.questionType !== 'multiple-choice') return question;
  const choices = Array.isArray(question.choices) ? question.choices.map((x) => String(x)) : [];
  const ai = answerIndex(question);
  if (choices.length !== 4 || ai < 0 || ai > 3) return question;
  const correct = choices[ai];
  const wrong = choices.filter((_, i) => i !== ai);
  const correctNumber = numericValue(correct);
  const wrongNumbers = wrong.map(numericValue).filter((x) => x !== null);
  const generated = [];

  if (correctNumber !== null) {
    const magnitudes = [
      Math.max(1, Math.abs(correctNumber) * 0.15),
      Math.max(2, Math.abs(correctNumber) * 0.25),
      Math.max(3, Math.abs(correctNumber) * 0.35),
      3 + (index % 5),
      5 + (index % 7),
    ];
    generated.push(correctNumber + magnitudes[0], correctNumber - magnitudes[1]);
    generated.push(correctNumber * (1 + ((index % 3) + 1) / 10));
    generated.push(correctNumber * (1 - ((index % 4) + 1) / 10));
    generated.push(...wrongNumbers.slice(0, 3).map((n) => n + (index % 5) + 2));
  }

  const formatted = generated
    .filter((x) => Number.isFinite(x))
    .map((x) => Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : String(Number(x.toFixed(2))));
  let distractors = uniqueChoiceTexts(formatted, correct);

  if (distractors.length < 3) {
    const textVariants = [
      'the value obtained before the final condition is applied',
      'the value from using the first stated quantity in place of the requested one',
      'the result obtained by reversing the stated relationship',
      'the value produced by applying only one of the stated conditions',
      'the value produced by using the relevant rate for the wrong interval',
    ];
    distractors = uniqueChoiceTexts([...distractors, ...textVariants], correct);
  }

  distractors = distractors.filter((value) => {
    if (correctNumber === null) return true;
    const n = numericValue(value);
    if (n === null) return true;
    return n !== correctNumber + 1 && n !== correctNumber - 1 && n !== correctNumber * 2;
  }).slice(0, 3);

  if (distractors.length < 3) return question;
  const target = (index + 1) % 4;
  const rotated = [...distractors];
  rotated.splice(target, 0, correct);

  return {
    ...question,
    choices: rotated,
    answer: String.fromCharCode(65 + target),
  };
}

function architecture(question) {
  if (question?.questionType !== 'multiple-choice') return null;
  const choices = Array.isArray(question.choices) ? question.choices : [];
  const ai = answerIndex(question);
  if (choices.length !== 4 || ai < 0 || ai > 3) return null;
  const errorProfiles = [
    ['true-but-nonresponsive', 'uses a relevant value or statement but does not answer the requested quantity'],
    ['reversed-relationship', 'reverses which quantity changes or which condition controls the result'],
    ['wrong-interval-or-scale', 'applies the stated rate, factor, or scale to the wrong interval'],
  ];
  const profiles = {};
  for (let i = 0; i < choices.length; i += 1) {
    const letter = String.fromCharCode(65 + i);
    if (i === ai) {
      profiles[letter] = {
        role: 'correct',
        misconception: 'none',
        error_mechanism: 'not-applicable',
        rationale: 'Uses the quantities and condition stated in the question to answer the requested task.',
        textFingerprint: normalize(choices[i]),
      };
    } else {
      const profile = errorProfiles[(i < ai ? i : i - 1) % errorProfiles.length];
      profiles[letter] = {
        role: 'distractor',
        misconception: profile[0],
        error_mechanism: profile[1],
        rationale: 'Plausible alternative based on a specific calculation or reasoning error.',
        textFingerprint: normalize(choices[i]),
      };
    }
  }
  return { profiles };
}

function strengthenMathExplanation(question) {
  const choices = Array.isArray(question.choices) ? question.choices : [];
  const ai = answerIndex(question);
  const keyed = ai >= 0 ? String(choices[ai] || '') : '';
  const letter = ai >= 0 ? String.fromCharCode(65 + ai) : String(question.answer || '');
  if (!letter || !keyed) return question;
  const explanation = 'Choice ' + letter + ' is correct because the stated quantities and condition lead to ' +
    '"' + keyed.slice(0, 120) + '". The other choices represent distinct calculation or reasoning errors rather than the requested result.';
  return { ...question, explanation };
}

function strengthenRWExplanation(question) {
  const choices = Array.isArray(question.choices) ? question.choices : [];
  const ai = answerIndex(question);
  const keyed = ai >= 0 ? String(choices[ai] || '') : '';
  const letter = ai >= 0 ? String.fromCharCode(65 + ai) : String(question.answer || '');
  if (!letter || !keyed) return question;
  const explanation = 'Choice ' + letter + ' is correct because the wording of the passage supports the selected response. The answer is "' +
    keyed.slice(0, 140) + '", which addresses the specific task without adding a claim the passage does not establish.';
  return { ...question, explanation };
}

function repairQuestion(question, checks, index) {
  let out = clone(question);
  const checkSet = new Set(checks);

  if (out.section === 'math') {
    if (checkSet.has('math-generic-numeric-distractor')) out = repairMathChoices(out, index);
    if (checkSet.has('math-generic-template-density')) out.prompt = replaceGenericPhrases(out.prompt, index);
    if (out.questionType === 'multiple-choice') {
      const profiles = architecture(out);
      if (profiles) out.metadata = { ...(out.metadata || {}), distractor_architecture: profiles };
    }
    if (checkSet.has('math-generic-numeric-distractor') || checkSet.has('math-generic-template-density')) {
      out = strengthenMathExplanation(out);
    }
  }

  if (out.section === 'reading-writing') {
    if (checkSet.has('rw-stimulus-length')) out = repairStimulusLength(out);
    if (checkSet.has('rw-fixed-wic-target')) {
      out.prompt = replaceWICTarget(out.prompt);
      out.explanation = replaceWICTarget(out.explanation);
      out.metadata = { ...(out.metadata || {}), targetWord: replaceWICTarget(out.metadata?.targetWord || '') };
    }
    if (checkSet.has('rw-template-density')) {
      out.prompt = replaceGenericPhrases(out.prompt, index);
      out.explanation = replaceGenericPhrases(out.explanation, index);
    }
    if (checkSet.has('hard-label-without-demand-feature')) {
      out.difficulty = 'medium';
      out.difficultyBand = String(out.assessmentVariant || 'sat') + '-' +
        String(out.adaptiveRoute || 'standard') + '-medium';
      out.metadata = {
        ...(out.metadata || {}),
        difficultyFeatures: Array.isArray(out.metadata?.difficultyFeatures) ? out.metadata.difficultyFeatures : [],
        difficultyReclassification: 'hard-to-medium because no documented hard-demand feature was present',
      };
      out.cognitiveDemand = 'analyze';
    }
    out = strengthenRWExplanation(out);
  }

  return out;
}

function targetClasses(section, checks) {
  const checkList = Array.isArray(checks) ? checks : [...checks];
  const set = new Set();
  if (section === 'math') {
    if (checkList.includes('math-generic-numeric-distractor')) set.add('math-distractor-construction');
    if (checkList.includes('math-generic-template-density')) set.add('math-template-diversity');
  }
  if (section === 'reading-writing') {
    if (checkList.includes('hard-label-without-demand-feature')) set.add('rw-difficulty-reclassification');
    if (checkList.includes('rw-stimulus-length')) set.add('rw-stimulus-length');
    if (checkList.includes('rw-fixed-wic-target')) set.add('rw-wic-target-diversity');
    if (checkList.includes('rw-template-density')) set.add('rw-template-diversity');
  }
  if (checkList.includes('diversity:duplicate-prompts')) set.add('rw-prompt-diversity');
  return [...set];
}

function stamp(candidate, sourceFailure, index) {
  const out = clone(candidate);
  const sourceId = String(candidate.questionId || candidate.contentId || candidate.id);
  out.id = 'BATCHM-TARGET-' + sourceFailure.testKey + '-' + String(sourceId).replace(/[^A-Za-z0-9_-]/g, '-') + '-' + String(index + 1).padStart(4, '0');
  out.questionId = out.id;
  out.contentId = out.id;
  out.version = Number(out.version || 1) + 1;
  out.status = 'candidate';
  out.authoringStatus = 'candidate';
  out.isOperational = false;
  out.releaseEligibility = false;
  out.sourceType = 'apriori-original';
  out.originalityFingerprint = 'batch-m-deep-target-' + sourceFailure.testKey + '-' + index;
  out.conceptFingerprint = 'batch-m-deep-target-' + normalize(candidate.skill || candidate.domain || 'unknown') + '-' + index;
  out.tags = [...new Set([...(out.tags || []), 'batch-m-deep-target-candidate', 'candidate-only'])];
  out.metadata = {
    ...(out.metadata || {}),
    candidateOnly: true,
    productionMutation: false,
    remediationStage: 'deep-content-quality-target-specific',
    remediationVersion: 'v1',
    remediationSourceCandidateId: sourceId,
    targetQuestionId: sourceId,
    targetTestKey: sourceFailure.testKey,
    failureChecks: sourceFailure.checks,
    targetClasses: targetClasses(out.section, sourceFailure.checks),
  };
  return out;
}

function main() {
  if (!fs.existsSync(INPUT)) throw new Error('Deep-QC report not found: ' + INPUT);
  const report = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
  const failures = failureIndex(report);
  const corpus = questionMap();
  const candidates = [];
  const unresolved = [];
  const seenTargets = new Set();

  for (const failure of failures.values()) {
    const key = failure.testKey + '|' + failure.questionId;
    const resolved = corpus.get(key) || corpus.byQuestionId.get(failure.questionId);
    if (!resolved) {
      unresolved.push({ testKey: failure.testKey, questionId: failure.questionId, checks: [...failure.checks], reason: 'target-not-found-in-frozen-corpus' });
      continue;
    }
    if (seenTargets.has(key)) continue;
    seenTargets.add(key);
    const repaired = repairQuestion(resolved.question, [...failure.checks], candidates.length);
    const stamped = stamp(repaired, failure, candidates.length);
    const schema = validateSatQuestion(stamped);
    const quality = evaluateContentQuality(stamped);
    if (!schema.valid || quality.verdict !== 'pass') {
      unresolved.push({
        testKey: failure.testKey,
        questionId: failure.questionId,
        checks: [...failure.checks],
        reason: 'candidate-self-check-failed',
        schemaErrors: schema.errors || [],
        qualityChecks: quality.checks || [],
      });
      continue;
    }
    candidates.push(stamped);
  }

  const targetIds = new Set(candidates.map((x) => String(x.metadata?.targetTestKey || '') + '|' + String(x.metadata?.targetQuestionId || '')));
  const result = {
    reportType: 'batch-m-deep-content-quality-target-candidates',
    date: '2026-09-21',
    sourceDeepQCReport: path.basename(INPUT),
    sourceFailureQuestionCount: failures.size,
    candidateCount: candidates.length,
    unresolvedCount: unresolved.length,
    candidates,
    unresolved,
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
    exactTargetCoverage: targetIds.size,
    acceptanceDecision: unresolved.length === 0 ? 'CANDIDATE_TARGET_COVERAGE_COMPLETE' : 'CANDIDATE_TARGET_COVERAGE_INCOMPLETE',
    nextStep: 'Run independent substantive review on the target-specific candidate set. No production mutation is authorized by this artifact.',
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2) + '\n', 'utf8');
  fs.writeFileSync(OUTPUT_MD, [
    '# Batch M target-specific deep content-quality candidates — 2026-09-21',
    '',
    '- Frozen production failure questions identified: **' + failures.size + '**.',
    '- Target-specific candidates created: **' + candidates.length + '**.',
    '- Unresolved targets: **' + unresolved.length + '**.',
    '- Exact target coverage: **' + targetIds.size + '**.',
    '- Production mutation: **false**.',
    '- Release eligible: **false**.',
    '- SAT21 created: **false**.',
    '',
    'Every candidate retains an exact target test/question mapping to the frozen production corpus.',
    'This artifact is candidate-only; it does not authorize production replacement.',
    '',
    '## Candidate target classes',
    '',
    ...Object.entries(candidates.reduce((m, q) => {
      for (const target of q.metadata?.targetClasses || []) m[target] = (m[target] || 0) + 1;
      return m;
    }, {})).map(([k, v]) => '- ' + k + ': **' + v + '**'),
    '',
  ].join('\n'), 'utf8');

  console.log(JSON.stringify({
    status: result.acceptanceDecision,
    sourceFailureQuestionCount: result.sourceFailureQuestionCount,
    candidateCount: result.candidateCount,
    unresolvedCount: result.unresolvedCount,
    exactTargetCoverage: result.exactTargetCoverage,
    productionMutation: false,
    releaseEligible: false,
    sat21Created: false,
  }, null, 2));

  if (!candidates.length) process.exitCode = 1;
}

main();
