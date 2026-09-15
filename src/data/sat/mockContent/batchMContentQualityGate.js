/**
 * Batch M — content-quality gate for SAT/PSAT remediation candidates.
 *
 * Deliberately separate from the frozen production store. It evaluates
 * replacement candidates and never mutates accepted production records.
 */

const RW_SKILLS = new Set([
  'Central Ideas and Details', 'Inferences', 'Command of Evidence', 'Words in Context',
  'Text Structure and Purpose', 'Cross-Text Connections', 'Rhetorical Synthesis',
  'Transitions', 'Boundaries', 'Form, Structure, and Sense',
]);

const SHORT_STIMULUS_RW_SKILLS = new Set([
  'Transitions', 'Boundaries', 'Form, Structure, and Sense',
]);

const GRAMMAR_RW_SKILLS = new Set(['Transitions', 'Boundaries', 'Form, Structure, and Sense']);

const MATH_DOMAINS = new Set([
  'Algebra', 'Advanced Math', 'Problem-Solving and Data Analysis', 'Geometry and Trigonometry',
]);

const GENERIC_RW_PHRASES = [
  'the observed relationship', 'the reported comparison condition', 'the stated relationship',
  'the result therefore supports', 'qualify means to limit or modify',
  'the first choice directly reflects the evidence relationship', 'the researchers collected observations',
];

const GENERIC_MATH_PHRASES = [
  'uses the reported relationship directly', 'the unknown is isolated from the stated condition',
  'the quantities are connected through the model', 'substitute', 'area equals',
];

const HARD_FEATURES = new Set([
  'multi-step', 'strategic-choice', 'constraint-inference', 'representation-shift',
  'evidence-synthesis', 'parameter-reasoning',
]);

function normalize(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function wordCount(value) {
  return normalize(value).split(/\s+/).filter(Boolean).length;
}

function includesGeneric(text, phrases) {
  const normalized = normalize(text);
  return phrases.filter((phrase) => normalized.includes(normalize(phrase)));
}

function choiceTexts(question) {
  return Array.isArray(question?.choices) ? question.choices.map(normalize) : [];
}

function semanticTokenSet(value) {
  return new Set(normalize(value).split(/[^a-z0-9]+/).filter((token) => token.length > 3));
}

function overlap(a, b) {
  const left = semanticTokenSet(a);
  const right = semanticTokenSet(b);
  if (!left.size || !right.size) return 0;
  return [...left].filter((token) => right.has(token)).length / Math.max(left.size, right.size);
}

function evaluateDifficulty(question, notes) {
  const difficulty = String(question?.difficulty || '');
  const features = new Set(question?.metadata?.difficultyFeatures || []);
  if (!['easy', 'medium', 'hard'].includes(difficulty)) notes.push('difficulty-missing-or-invalid');
  if (difficulty === 'hard' && ![...features].some((feature) => HARD_FEATURES.has(feature))) notes.push('hard-label-without-demand-feature');
  if (difficulty === 'easy' && features.has('multi-step')) notes.push('easy-label-conflicts-with-multi-step');

  if (difficulty === 'medium') {
    if (question?.section === 'reading-writing') {
      const skill = String(question?.skill || '');
      if (!SHORT_STIMULUS_RW_SKILLS.has(skill) && wordCount(question?.prompt) < 25) {
        notes.push('medium-item-too-thin');
      }
    } else if (question?.section === 'math' && wordCount(question?.prompt) < 18) {
      notes.push('medium-item-too-thin');
    }
  }
}

function evaluateRW(question, notes) {
  const choices = choiceTexts(question);
  const answerIndex = String(question?.answer || '').charCodeAt(0) - 65;
  const stimulus = String(question?.prompt || '');
  const metadata = question?.metadata || {};
  const skill = String(question?.skill || '');
  if (!RW_SKILLS.has(skill)) notes.push('unsupported-rw-skill');
  if (choices.length !== 4) notes.push('rw-choice-count');
  if (answerIndex < 0 || answerIndex > 3) notes.push('rw-answer-key');

  const stimulusWords = wordCount(stimulus);
  if (SHORT_STIMULUS_RW_SKILLS.has(skill)) {
    if (stimulusWords < 8 || stimulusWords > 80) notes.push('rw-stimulus-length');
  } else if (stimulusWords < 25 || stimulusWords > 150) {
    notes.push('rw-stimulus-length');
  }

  if (includesGeneric(stimulus, GENERIC_RW_PHRASES).length >= 2) notes.push('rw-template-density');
  if (new Set(choices).size !== 4) notes.push('rw-duplicate-choice');
  if (answerIndex >= 0 && answerIndex < choices.length && !GRAMMAR_RW_SKILLS.has(skill)) {
    const correct = choices[answerIndex];
    const maxWrongOverlap = Math.max(...choices.filter((_, index) => index !== answerIndex).map((choice) => overlap(correct, choice)), 0);
    if (maxWrongOverlap > 0.9) notes.push('rw-choice-near-duplicate');
  }
  if (!metadata.sourceFamily || !metadata.rhetoricalStructure || !metadata.cognitiveOperation) notes.push('rw-blueprint-metadata-incomplete');
  if (question?.skill === 'Words in Context' && /qualify/i.test(question.prompt)) notes.push('rw-fixed-wic-target');
  if (question?.skill === 'Cross-Text Connections' && !/passage 2/i.test(stimulus)) notes.push('rw-cross-text-structure-missing');
  if (question?.skill === 'Rhetorical Synthesis' && !/goal:/i.test(stimulus)) notes.push('rw-synthesis-goal-missing');
}

function evaluateMath(question, notes) {
  const choices = choiceTexts(question);
  const metadata = question?.metadata || {};
  const features = new Set(metadata.difficultyFeatures || []);
  const prompt = String(question?.prompt || '');
  if (!MATH_DOMAINS.has(String(question?.domain || ''))) notes.push('unsupported-math-domain');
  if (question?.questionType === 'student-produced-response') {
    if (choices.length) notes.push('spr-has-multiple-choice-options');
  } else if (choices.length !== 4) notes.push('math-choice-count');
  if (includesGeneric(prompt, GENERIC_MATH_PHRASES).length >= 2) notes.push('math-template-density');
  if (question?.difficulty === 'hard' && ![...features].some((feature) => HARD_FEATURES.has(feature))) notes.push('math-hard-without-reasoning-feature');
  if (question?.difficulty === 'hard' && !features.has('multi-step')) notes.push('math-hard-not-multi-step');
  if (question?.figure && metadata.figurePurpose !== 'question-essential') notes.push('math-figure-not-essential');
  if (question?.questionType === 'multiple-choice') {
    const answer = String(question?.answer || '');
    const answerIndex = answer.charCodeAt(0) - 65;
    if (answerIndex < 0 || answerIndex > 3) notes.push('math-answer-key');
    const wrongChoices = choices.filter((_, index) => index !== answerIndex);
    const answerText = choices[answerIndex] || '';
    const numeric = Number(answerText);
    if (Number.isFinite(numeric) && wrongChoices.some((choice) => [numeric + 1, numeric - 1, numeric * 2].includes(Number(choice)))) notes.push('math-generic-numeric-distractor');
  }
  if (question?.figure && !metadata.figurePurpose) notes.push('math-figure-purpose-missing');
}

export function evaluateContentQuality(question) {
  const notes = [];
  if (!question || typeof question !== 'object') return { verdict: 'fail', severity: 'serious', checks: ['invalid-question'], score: 0 };
  evaluateDifficulty(question, notes);
  if (question.section === 'reading-writing') evaluateRW(question, notes);
  else if (question.section === 'math') evaluateMath(question, notes);
  else notes.push('unsupported-section');
  const unique = [...new Set(notes)];
  const serious = unique.some((note) => ['unsupported-rw-skill', 'unsupported-math-domain', 'invalid-question', 'rw-answer-key', 'math-answer-key', 'rw-choice-count', 'math-choice-count', 'rw-stimulus-length'].includes(note));
  return {
    verdict: unique.length === 0 ? 'pass' : 'fail',
    severity: serious ? 'serious' : unique.length >= 3 ? 'targeted' : 'review',
    checks: unique,
    score: Math.max(0, 100 - (unique.length * 10) - (serious ? 20 : 0)),
    reviewer: 'batch-m-content-quality-v1',
    productionMutation: false,
  };
}

export function evaluateContentQualityBatch(questions) {
  const items = Array.isArray(questions) ? questions.map(evaluateContentQuality) : [];
  const failed = items.filter((item) => item.verdict !== 'pass');
  return {
    itemCount: items.length,
    passed: failed.length === 0,
    passedCount: items.length - failed.length,
    failedCount: failed.length,
    averageScore: items.length ? Number((items.reduce((sum, item) => sum + item.score, 0) / items.length).toFixed(2)) : 0,
    seriousFailureCount: failed.filter((item) => item.severity === 'serious').length,
    items,
  };
}

export default evaluateContentQuality;
