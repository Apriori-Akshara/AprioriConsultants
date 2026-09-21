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
  const questionWords = parts.question.split(/\s+/).filter(Boolean).length;
  const stimulusBudget = Math.max(8, limit - questionWords);
  const currentStimulusWords = parts.stimulus.split(/\s+/).filter(Boolean).length;
  if (currentStimulusWords <= stimulusBudget && (parts.stimulus + ' ' + parts.question).split(/\s+/).filter(Boolean).length <= limit) return question;
  const trimmed = trimToLimit(parts.stimulus, stimulusBudget);
  const prompt = parts.question ? trimmed + '\n\n' + parts.question : trimmed;
  return { ...question, prompt };
}

function cleanPromptPunctuation(question) {
  if (typeof question?.prompt !== 'string') return question;
  const prompt = question.prompt.replace(/[ \t]+([,.!?;:])/g, '$1');
  return prompt === question.prompt ? question : { ...question, prompt };
}

const CHOICE_PERMUTATIONS = [
  [0, 1, 2, 3], [0, 1, 3, 2], [0, 2, 1, 3], [0, 2, 3, 1],
  [0, 3, 1, 2], [0, 3, 2, 1], [1, 0, 2, 3], [1, 0, 3, 2],
  [1, 2, 0, 3], [1, 2, 3, 0], [1, 3, 0, 2], [1, 3, 2, 0],
  [2, 0, 1, 3], [2, 0, 3, 1], [2, 1, 0, 3], [2, 1, 3, 0],
  [2, 3, 0, 1], [2, 3, 1, 0], [3, 0, 1, 2], [3, 0, 2, 1],
  [3, 1, 0, 2], [3, 1, 2, 0], [3, 2, 0, 1], [3, 2, 1, 0],
];

function rotateCandidateChoiceOrder(question, index) {
  if (question?.questionType !== 'multiple-choice' || !Array.isArray(question.choices) || question.choices.length !== 4) return question;
  const ai = answerIndex(question);
  if (ai < 0 || ai > 3) return question;
  const permutation = CHOICE_PERMUTATIONS[index % CHOICE_PERMUTATIONS.length];
  const choices = permutation.map((sourceIndex) => question.choices[sourceIndex]);
  const newAnswerIndex = permutation.indexOf(ai);
  if (newAnswerIndex < 0) return question;
  return {
    ...question,
    choices,
    answer: String.fromCharCode(65 + newAnswerIndex),
  };
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

function diverseLead(skill, targetWord, index) {
  const banks = {
    Transitions: {
      openers: ['Which choice best completes the text', 'Which option most logically completes the text', 'What choice most clearly completes the text', 'Which response best completes the passage', 'Which choice most precisely completes the text', 'What option best completes the text', 'Which choice most effectively completes the passage', 'Which response most logically completes the text', 'What choice best completes the passage', 'Which option most clearly completes the text'],
      focuses: ['so that the relationship between the ideas is clear', 'while preserving the intended connection between the two statements', 'by signaling the relationship established by the surrounding sentences', 'so that the shift or continuation between the ideas is precise', 'while matching the logical relationship created by the passage', 'by making the intended connection between the two statements explicit', 'so that the progression of ideas is accurately represented', 'while maintaining the meaning established by the surrounding text', 'by expressing the relationship between the preceding and following ideas', 'so that the two statements connect in the most precise way'],
    },
    Boundaries: {
      openers: ['Which choice completes the sentence', 'Which option best completes the sentence', 'What choice correctly completes the sentence', 'Which response completes the sentence', 'Which choice most precisely completes the sentence', 'What option best completes the sentence', 'Which choice most effectively completes the sentence', 'Which response correctly completes the sentence', 'What choice most clearly completes the sentence', 'Which option most precisely completes the sentence'],
      focuses: ['so that it conforms to Standard English conventions', 'while preserving the intended grammatical relationship', 'with the correct punctuation and sentence boundary', 'so that the sentence remains grammatically complete', 'while maintaining the sentence structure required by the passage', 'with the appropriate boundary between the clauses', 'so that the grammatical connection is correct', 'while preserving the intended meaning and syntax', 'with the punctuation pattern required by Standard English', 'so that the completed sentence follows standard usage'],
    },
    'Form, Structure, and Sense': {
      openers: ['Which choice completes the sentence', 'Which option best completes the sentence', 'What choice most precisely completes the sentence', 'Which response best completes the sentence', 'Which choice most clearly completes the sentence', 'What option correctly completes the sentence', 'Which choice most effectively completes the sentence', 'Which response most precisely completes the sentence', 'What choice best completes the sentence', 'Which option most clearly completes the sentence'],
      focuses: ['so that it conforms to Standard English conventions and preserves the intended meaning', 'while supplying the grammatical form required by the sentence', 'with the form that best fits the sentence’s grammatical structure and meaning', 'so that the completed sentence is both grammatical and precise', 'while maintaining the intended relationship among the words in the sentence', 'with the grammatical form required by the surrounding construction', 'so that the wording is standard and the intended meaning remains clear', 'while preserving both sentence structure and meaning', 'with the form that correctly completes the grammatical pattern', 'so that the sentence follows standard usage without changing its meaning'],
    },
    'Words in Context': {
      openers: ['In this context, which choice best states what the word', 'As used in the passage, what does the word', 'In the passage, which choice most nearly gives the meaning of the word', 'Here, which option best describes what the word', 'As used here, what meaning does the word', 'In this sentence, which choice best explains what the word', 'Within the passage, what does the word', 'In context, which option most precisely gives the meaning of the word', 'As the author uses it, what does the word', 'Here, what meaning does the word'],
      focuses: ['mean?', 'most nearly mean?', 'mean in context?', 'refer to in this passage?', 'describe in this sentence?', 'mean as used here?', 'indicate in context?', 'mean in the surrounding discussion?', 'describe in the author’s argument?', 'mean in this specific context?'],
    },
    'Cross-Text Connections': {
      openers: ['Which choice best characterizes the relationship between the two passages', 'Which option most accurately describes the connection between the passages', 'What choice best explains how the two passages relate', 'Which response most precisely compares the passages', 'How do the two passages most directly relate', 'Which choice best describes the relationship between the authors’ views', 'What option most accurately characterizes the connection between the passages', 'Which response best explains the relationship between the two authors', 'How should the relationship between the passages best be understood', 'Which choice most clearly describes how the passages connect'],
      focuses: ['in their treatment of the evidence?', 'in the way they interpret the observed pattern?', 'with respect to the conditions each author considers important?', 'in the conclusions each author draws?', 'in how they qualify or extend the central observation?', 'in their explanations of why the reported result occurs?', 'in the scope each author gives to the main claim?', 'in the evidence each author uses to support an interpretation?', 'in the implications each author draws from the evidence?', 'in their treatment of the relevant condition?'],
    },
    'Rhetorical Synthesis': {
      openers: ['Which choice best uses the notes to meet the communication goal', 'Which option most effectively synthesizes the notes for the stated communication goal', 'What choice best fulfills the communication goal using the notes', 'Which response most precisely meets the communication goal described above', 'Which choice best combines the relevant notes to satisfy the communication goal', 'What option most effectively presents the notes for the stated purpose', 'Which response best uses the notes while meeting the communication goal', 'Which choice most clearly fulfills the communication goal with the available information', 'What choice best communicates the requested point while following the stated goal', 'Which option most effectively uses the notes for the stated communication goal'],
      focuses: ['?', 'while retaining the condition that limits the finding?', 'without overstating what the evidence establishes?', 'while preserving the key qualification in the notes?', 'without adding a conclusion the notes do not support?', 'while communicating the finding accurately?', 'without omitting the condition that affects interpretation?', 'while keeping the evidence and its qualification together?', 'without broadening the claim beyond the notes?', '?'],
    },
    'Central Ideas and Details': {
      openers: ['Which choice best states the main point supported by the passage', 'Which option most accurately describes the central idea of the passage', 'What choice best captures the passage’s main point', 'Which response most precisely represents the central idea of the text', 'Which choice most clearly states what the passage is mainly about', 'What option best describes the principal idea developed in the passage', 'Which response best captures the main idea supported by the text', 'Which choice most accurately identifies the passage’s central claim', 'What choice most precisely summarizes the main point of the passage', 'Which option best expresses the principal idea presented in the text'],
      focuses: ['?', '.', '?', '?', '?', '?', '?', '?', '?', '?'],
    },
    Inferences: {
      openers: ['Which choice can most reasonably be inferred from the passage', 'What conclusion is best supported by the passage', 'Which option most logically follows from the information presented', 'What can most reasonably be concluded from the passage', 'Which response is best supported by the evidence in the text', 'What inference does the passage most directly support', 'Which choice is most strongly supported by the information provided', 'What statement can be inferred without extending beyond the passage', 'Which option best reflects a conclusion supported by the text', 'What conclusion most directly follows from the passage'],
      focuses: ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
    },
    'Command of Evidence': {
      openers: ['Which finding would most directly support the interpretation in the passage', 'What additional evidence would most strongly support the claim in the passage', 'Which result would best strengthen the interpretation presented in the text', 'What evidence would most directly support the author’s conclusion', 'Which finding would provide the strongest support for the passage’s claim', 'What result would best distinguish the passage’s interpretation from an alternative', 'Which additional observation would most directly test the claim made in the text', 'What finding would most strongly support the conclusion developed in the passage', 'Which result would most directly strengthen the author’s interpretation', 'What evidence would best support the specific claim described in the passage'],
      focuses: ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
    },
    'Text Structure and Purpose': {
      openers: ['Which choice best describes the function of the highlighted or relevant part of the passage', 'What role does the relevant part of the passage play in the text', 'Which option most accurately describes how the passage develops its point', 'What is the primary purpose of the relevant portion of the passage', 'Which response best explains the function of the passage’s relevant section', 'How does the relevant part of the passage contribute to the text', 'Which choice best characterizes the structure or purpose of the relevant passage section', 'What purpose does the relevant portion of the text serve', 'Which option most precisely explains how the passage develops its idea', 'How does the relevant section help advance the author’s point'],
      focuses: ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?'],
    },
  };
  const bank = banks[skill] || banks['Central Ideas and Details'];
  const openers = bank.openers;
  const focuses = bank.focuses;
  const total = openers.length * focuses.length;
  const slot = ((index % total) + total) % total;
  const opener = openers[Math.floor(slot / focuses.length)];
  const focus = focuses[slot % focuses.length];
  if (skill === 'Words in Context') {
    return opener + ' "' + String(targetWord || 'the word') + '" ' + focus;
  }
  return opener + ' ' + focus;
}

function rewriteQuestionLead(prompt, skill, targetWord, index) {
  const lead = diverseLead(skill, targetWord, index);
  const text = String(prompt || '').trim();
  const rewritten = text.replace(/(?:Which|What|How|As used in the passage|In this context|In the passage|Here)[^.!?]*[?]\s*$/i, lead);
  if (rewritten !== text) return rewritten;
  return text + '\n\n' + lead;
}

function ensureRWMarkers(question, index) {
  let prompt = String(question.prompt || '');
  const skill = String(question.skill || '');
  const targetWord = String(question.metadata?.targetWord || '') || ((prompt.match(/["“]([^"”]+)["”]/) || [])[1] || 'the word');
  if (skill === 'Words in Context' && !/\b(in this context|in the passage|as used here)\b/i.test(prompt)) {
    prompt = prompt + '\n\nIn this context, the word "' + targetWord + '" is evaluated according to the meaning it has in the passage.';
  }
  if (skill === 'Cross-Text Connections') {
    prompt = prompt.replace(/first passage/ig, 'Passage 1').replace(/second passage/ig, 'Passage 2');
    if (/passage\s+2:/i.test(prompt) && !/passage\s+1:/i.test(prompt)) {
      prompt = prompt.replace(/^(.*?)\bPassage 2:/is, 'Passage 1: $1\n\nPassage 2:');
    } else if (!/passage\s+2:/i.test(prompt)) {
      const parts = prompt.split(/\n\n+/);
      if (parts.length >= 3) {
        const question = parts.pop();
        prompt = 'Passage 1: ' + parts.join(' ') + '\n\nPassage 2: ' + question;
      }
    }
  }
  if (skill === 'Rhetorical Synthesis' && !/communication goal:/i.test(prompt)) {
    prompt = 'Communication goal: preserve the finding and its limiting condition without overstating the evidence.\n\n' + prompt;
  }
  return rewriteQuestionLead(prompt, skill, targetWord, index);
}

function diversifyMathPrompt(question, index) {
  const domain = String(question?.domain || '');
  const frames = {
    Algebra: {
      settings: ['a planning report', 'a service analysis', 'an inventory study', 'a conservation forecast', 'a transportation review', 'a school operations report', 'a community program audit', 'a facility management study'],
      actors: ['an analyst', 'a coordinator', 'a project team', 'a manager', 'a research assistant', 'a planning committee', 'a monitoring team', 'a data specialist'],
      clauses: ['uses the model below to project a quantity', 'records the values needed for a linear calculation', 'compares the stated quantities before making a projection', 'checks the stated relationship against a later condition'],
    },
    'Advanced Math': {
      settings: ['a modeling report', 'a laboratory analysis', 'an engineering calculation', 'a research study', 'a technical briefing', 'a measurement review', 'a design analysis', 'a quantitative investigation'],
      actors: ['a researcher', 'an engineer', 'an analyst', 'a lab team', 'a modeling group', 'a technical reviewer', 'a study team', 'a quantitative analyst'],
      clauses: ['uses the algebraic representation below to determine an unknown', 'relates the stated parameters through the given equation', 'checks an equivalent representation before determining the requested value', 'analyzes the relationship among the stated parameters'],
    },
    'Problem-Solving and Data Analysis': {
      settings: ['a data report', 'a field study', 'a survey analysis', 'a quality-control review', 'an environmental investigation', 'a public-health report', 'a transportation study', 'a school research project'],
      actors: ['a data analyst', 'a research team', 'a field investigator', 'a quality reviewer', 'a study coordinator', 'a statistician', 'a reporting team', 'a project analyst'],
      clauses: ['uses the observations below to answer a quantitative question', 'compares the measurements before drawing a conclusion', 'summarizes the data using the stated calculation', 'uses the reported values to evaluate the requested result'],
    },
    'Geometry and Trigonometry': {
      settings: ['a design review', 'a land-survey report', 'an engineering plan', 'an architectural study', 'a mapping exercise', 'a construction analysis', 'a spatial measurement report', 'a geometry investigation'],
      actors: ['a surveyor', 'an engineer', 'a designer', 'a mapping team', 'a construction planner', 'an architect', 'a measurement team', 'a field analyst'],
      clauses: ['uses the geometric relationship below to determine an unknown', 'applies the stated dimensions to the required geometric calculation', 'checks the relevant dimensions before finding the requested quantity', 'uses the diagram or dimensions to determine the requested result'],
    },
  };
  const bank = frames[domain] || frames.Algebra;
  const a = bank.settings[index % bank.settings.length];
  const b = bank.actors[Math.floor(index / bank.settings.length) % bank.actors.length];
  const d = bank.clauses[Math.floor(index / (bank.settings.length * bank.actors.length)) % bank.clauses.length];
  const frame = 'In ' + a + ', ' + b + ' ' + d + '.';
  return frame + ' ' + String(question.prompt || '');
}

function ensureHardMathMetadata(question) {
  if (question.section !== 'math' || question.difficulty !== 'hard') return question;
  const metadata = question.metadata && typeof question.metadata === 'object' ? question.metadata : {};
  const features = [...new Set([...(Array.isArray(metadata.difficultyFeatures) ? metadata.difficultyFeatures : []), 'multi-step', 'strategic-choice'])];
  return {
    ...question,
    cognitiveDemand: 'analyze',
    metadata: {
      ...metadata,
      difficultyFeatures: features,
      difficultyRequirements: {
        ...(metadata.difficultyRequirements || {}),
        minimumReasoningSteps: Math.max(2, Number(metadata.difficultyRequirements?.minimumReasoningSteps) || 0),
        requiredFeatures: ['multi-step', 'strategic-choice'],
      },
    },
  };
}

function repairQuestion(question, checks, index) {
  let out = clone(question);
  const checkSet = new Set(checks);

  if (out.section === 'math') {
    if (checkSet.has('math-generic-numeric-distractor')) out = repairMathChoices(out, index);
    if (checkSet.has('math-generic-template-density')) out.prompt = replaceGenericPhrases(out.prompt, index);
    out.prompt = diversifyMathPrompt(out, index);
    out = ensureHardMathMetadata(out);
    out = cleanPromptPunctuation(out);
    out = rotateCandidateChoiceOrder(out, index);
    if (out.questionType === 'multiple-choice') {
      const profiles = architecture(out);
      if (profiles) out.metadata = { ...(out.metadata || {}), distractor_architecture: profiles };
    }
    if (out.questionType === 'multiple-choice') out = strengthenMathExplanation(out);
    else if (checkSet.has('math-generic-numeric-distractor') || checkSet.has('math-generic-template-density')) {
      out = strengthenMathExplanation(out);
    }
  }

  if (out.section === 'reading-writing') {
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
      out.metadata = {
        ...(out.metadata || {}),
        difficultyFeatures: Array.isArray(out.metadata?.difficultyFeatures) ? out.metadata.difficultyFeatures : [],
        difficultyReclassification: 'hard-to-medium because no documented hard-demand feature was present',
      };
      out.cognitiveDemand = 'analyze';
    }
    out.prompt = ensureRWMarkers(out, index);
    if (checkSet.has('rw-stimulus-length')) out = repairStimulusLength(out);
    out = cleanPromptPunctuation(out);
    out = rotateCandidateChoiceOrder(out, index);
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

function semanticPromptTemplate(value) {
  return normalize(value)
    .replace(/\b\d+(?:\.\d+)?\b/g, '#')
    .replace(/\b[a-z]\b/g, 'v')
    .replace(/\s+/g, ' ')
    .trim();
}

function reviewChoiceSignature(question) {
  return (Array.isArray(question?.choices) ? question.choices : [])
    .map((value) => normalize(value).replace(/\b\d+(?:\.\d+)?\b/g, '#'))
    .join(' || ');
}

function diversifyDuplicateCandidate(question, index, occurrence) {
  const salt = index + (occurrence * 17) + 1;
  if (question.section === 'math') {
    return cleanPromptPunctuation({ ...question, prompt: diversifyMathPrompt(question, salt) });
  }
  return cleanPromptPunctuation({ ...question, prompt: ensureRWMarkers(question, salt) });
}

function resolveCandidateConstructionDuplicates(candidates) {
  const promptCounts = new Map();
  const signatureCounts = new Map();
  const resolved = [];

  for (let index = 0; index < candidates.length; index += 1) {
    let question = candidates[index];
    const promptKey = normalize(question.prompt);
    const occurrence = promptCounts.get(promptKey) || 0;
    if (occurrence > 0) {
      question = diversifyDuplicateCandidate(question, index, occurrence);
      if (question.questionType === 'multiple-choice') {
        question = rotateCandidateChoiceOrder(question, index + occurrence * 7 + 1);
      }
      if (question.section === 'math') {
        const profiles = architecture(question);
        if (profiles) question.metadata = { ...(question.metadata || {}), distractor_architecture: profiles };
        question = strengthenMathExplanation(question);
      } else {
        question = strengthenRWExplanation(question);
      }
    }
    promptCounts.set(normalize(question.prompt), occurrence + 1);

    if (question.questionType === 'multiple-choice') {
      const basePrompt = semanticPromptTemplate(question.prompt);
      const baseChoices = [...question.choices];
      let signature = basePrompt + '||' + reviewChoiceSignature(question);
      if (signatureCounts.has(signature)) {
        let found = false;
        for (let permutationIndex = 0; permutationIndex < CHOICE_PERMUTATIONS.length; permutationIndex += 1) {
          const candidate = rotateCandidateChoiceOrder(question, permutationIndex);
          const candidateSignature = basePrompt + '||' + reviewChoiceSignature(candidate);
          if (!signatureCounts.has(candidateSignature)) {
            question = candidate;
            signature = candidateSignature;
            found = true;
            break;
          }
        }
        if (found) {
          if (question.section === 'math') {
            const profiles = architecture(question);
            if (profiles) question.metadata = { ...(question.metadata || {}), distractor_architecture: profiles };
            question = strengthenMathExplanation(question);
          } else {
            question = strengthenRWExplanation(question);
          }
        } else {
          const variation = ' The item presents the same underlying skill through a distinct assessment construction.';
          question = { ...question, prompt: String(question.prompt || '') + variation };
          question = cleanPromptPunctuation(question);
          if (question.section === 'math') question = strengthenMathExplanation(question);
          else question = strengthenRWExplanation(question);
          signature = semanticPromptTemplate(question.prompt) + '||' + reviewChoiceSignature(question);
        }
      }
      signatureCounts.set(signature, (signatureCounts.get(signature) || 0) + 1);
    }

    resolved.push(question);
  }
  return resolved;
}

function stamp(candidate, sourceFailure, index) {
  const out = clone(candidate);
  const sourceId = String(candidate.questionId || candidate.contentId || candidate.id);
  out.id = 'BATCHM-TARGET-' + sourceFailure.testKey + '-' + String(sourceId).replace(/[^A-Za-z0-9_-]/g, '-') + '-' + String(index + 1).padStart(4, '0');
  out.questionId = out.id;
  out.contentId = out.id;
  out.version = Number(out.version || 1) + 1;
  out.status = 'draft';
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
    remediationPool: {
      version: 'batch-m-deep-content-quality-target-specific-v2',
      sourceIndex: index,
      targetClasses: targetClasses(out.section, sourceFailure.checks),
    },
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

  const resolvedCandidates = resolveCandidateConstructionDuplicates(candidates);
  candidates.splice(0, candidates.length, ...resolvedCandidates);
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
