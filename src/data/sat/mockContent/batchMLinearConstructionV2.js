import { DIFFICULTY_REQUIREMENTS } from './batchMRemediationBlueprint.js';

const DIFFICULTIES = ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard'];
const CONTEXTS = ['water tank', 'membership program', 'delivery route', 'subscription service', 'conservation project', 'school fundraiser', 'manufacturing process', 'transit pass'];

function rotateChoices(choices, target) {
  const out = [...choices];
  const correct = out.shift();
  out.splice(target, 0, correct);
  return { choices: out, answer: String.fromCharCode(65 + target) };
}

function distractors(answer, occurrence) {
  const n = Number(answer);
  if (!Number.isFinite(n)) return [];
  const values = [n + 3 + (occurrence % 7), n - 4 - (occurrence % 5), n + 7 + (occurrence % 6), n * 1.5 + 5 + (occurrence % 4)];
  return [...new Set(values.filter((v) => Number.isFinite(v) && v !== n).map((v) => String(Number(v.toFixed(2)))))].slice(0, 3);
}

function setNumeric(question, prompt, correct, occurrence) {
  const answer = Number(correct);
  if (!Number.isFinite(answer)) return { ...question, prompt };
  if (question.questionType === 'student-produced-response') {
    return { ...question, prompt: prompt + '\nEnter your answer as a number.', answer: String(answer) };
  }
  const wrong = distractors(answer, occurrence);
  const rotated = rotateChoices([String(answer), ...wrong], occurrence % 4);
  return { ...question, prompt, choices: rotated.choices, answer: rotated.answer };
}

function finish(question, prompt, correct, occurrence, kind, variant, difficulty, seed) {
  const updated = setNumeric(question, prompt, correct, occurrence);
  return {
    ...updated,
    difficulty,
    difficultyBand: String(question.assessmentVariant || 'sat') + '-' + String(question.adaptiveRoute || 'standard') + '-' + difficulty,
    cognitiveDemand: difficulty === 'easy' ? 'apply' : 'analyze',
    estimatedTimeSeconds: difficulty === 'hard' ? 105 : difficulty === 'medium' ? 90 : 75,
    subskill: 'batch-m-linear-v2-' + kind + '-' + variant,
    originalityFingerprint: 'batch-m-linear-v2-' + kind + '-' + variant + '-' + seed,
    conceptFingerprint: 'batch-m-linear-v2-' + kind + '-' + variant + '-' + seed,
    metadata: {
      ...updated.metadata,
      constructionFamily: 'batch-m-linear-v2-' + kind + '-' + variant,
      difficultyFeatures: difficulty === 'easy' ? ['direct-application'] : difficulty === 'medium' ? ['careful-interpretation', 'multi-step'] : ['multi-step', 'strategic-choice', 'constraint-inference'],
      difficultyRequirements: DIFFICULTY_REQUIREMENTS[difficulty],
    },
  };
}

export function buildBatchMLinearV2(question, occurrence, kind) {
  const o = Number(occurrence) || 0;
  const variant = o % 10;
  const difficulty = DIFFICULTIES[variant];
  const seed = o + Math.floor(o / 10) * (kind === 'representation' ? 23 : 17);
  let prompt = '';
  let correct = 0;

  if (kind === 'function') {
    const context = CONTEXTS[Math.floor(o / 10) % CONTEXTS.length];
    if (variant === 0) {
      const rate = 2 + seed % 10; const start = 20 + seed % 31;
      correct = rate;
      prompt = 'A ' + context + ' starts with ' + start + ' units and increases by ' + rate + ' units per interval. What is the rate of change?';
    } else if (variant === 1) {
      const x1 = 2 + seed % 9; const x2 = x1 + 4 + seed % 5; const m = 2 + seed % 7; const y1 = 10 + seed % 29; const y2 = y1 + m * (x2 - x1); const x3 = x2 + 2 + seed % 6;
      correct = y1 + m * (x3 - x1);
      prompt = 'A linear function passes through (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + '). What is its value when x = ' + x3 + '?';
    } else if (variant === 2) {
      const m = 3 + seed % 8; const b = 14 + seed % 27; const x = 5 + seed % 11;
      correct = b + m * x;
      prompt = 'A linear model for the ' + context + ' starts at ' + b + ' units and changes by ' + m + ' units per period. What is predicted after ' + x + ' periods?';
    } else if (variant === 3) {
      const m1 = 2 + seed % 6; const b1 = 8 + seed % 19; const m2 = 1 + (seed + 3) % 5; const b2 = 22 + seed % 17; const x = 4 + seed % 9;
      correct = (m1 * x + b1) - (m2 * x + b2);
      prompt = 'Two linear models are f(x) = ' + m1 + 'x + ' + b1 + ' and g(x) = ' + m2 + 'x + ' + b2 + '. What is f(' + x + ') − g(' + x + ')?';
    } else if (variant === 4) {
      const m = 2 + seed % 8; const b = 10 + seed % 23; const x = 4 + seed % 9;
      correct = x;
      prompt = 'A linear function is f(x) = ' + m + 'x + ' + b + '. For what value of x is f(x) = ' + (m * x + b) + '?';
    } else if (variant === 5) {
      const x1 = 1 + seed % 8; const m = 3 + seed % 7; const y1 = 12 + seed % 21; const x2 = x1 + 5 + seed % 4; const y2 = y1 + m * (x2 - x1); const x3 = x2 + 3 + seed % 5;
      correct = y2 + m * (x3 - x2);
      prompt = 'A linear relationship has y = ' + y1 + ' when x = ' + x1 + ' and y = ' + y2 + ' when x = ' + x2 + '. What is y when x = ' + x3 + '?';
    } else if (variant === 6) {
      const x = 2 + seed % 7; const m = 2 + seed % 9; const b = 9 + seed % 24;
      correct = b;
      prompt = 'A linear function has slope ' + m + ' and passes through (' + x + ', ' + (m * x + b) + '). What is its y-intercept?';
    } else if (variant === 7) {
      const m = 2 + seed % 9; const x1 = 3 + seed % 6; const y1 = 18 + seed % 23; const x2 = x1 + 4 + seed % 4; const y2 = y1 + m * (x2 - x1); const x3 = x2 + 2 + seed % 5;
      correct = y2 + m * (x3 - x2);
      prompt = 'A quantity is ' + y1 + ' at time ' + x1 + ' and ' + y2 + ' at time ' + x2 + '. Assuming a linear change, what is its value at time ' + x3 + '?';
    } else if (variant === 8) {
      const a = 28 + seed % 23; const m1 = 4 + seed % 6; const b = 64 + seed % 31; const m2 = 2 + seed % 5; const x = 5 + seed % 9;
      correct = (a + m1 * x) - (b + m2 * x);
      prompt = 'Two plans cost A(x) = ' + m1 + 'x + ' + a + ' and B(x) = ' + m2 + 'x + ' + b + '. What is A(' + x + ') − B(' + x + ')?';
    } else {
      const m = 2 + seed % 7; const x1 = 2 + seed % 6; const y1 = 14 + seed % 19; const x2 = x1 + 5 + seed % 4; const y2 = y1 + m * (x2 - x1); const threshold = y2 + m * (4 + seed % 5) + 1 + seed % 4;
      correct = x1 + Math.ceil((threshold - y1) / m);
      prompt = 'A linear function passes through (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + '). What is the smallest whole-number x for which the function value is at least ' + threshold + '?';
    }
  } else {
    if (variant === 0) {
      const m = 2 + seed % 8; const b = 7 + seed % 23; const x = 3 + seed % 9; correct = m * x + b;
      prompt = 'A line is y = ' + m + 'x + ' + b + '. What y-value belongs in a table when x = ' + x + '?';
    } else if (variant === 1) {
      const x1 = 1 + seed % 8; const x2 = x1 + 5 + seed % 4; const m = 2 + seed % 7; const y1 = 9 + seed % 21; correct = m;
      prompt = 'A line passes through (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + (y1 + m * (x2 - x1)) + '). What is the slope?';
    } else if (variant === 2) {
      const x1 = 2 + seed % 7; const x2 = x1 + 4 + seed % 5; const m = 2 + seed % 8; const b = 6 + seed % 25; correct = b;
      prompt = 'A line passes through (' + x1 + ', ' + (m * x1 + b) + ') and (' + x2 + ', ' + (m * x2 + b) + '). What is b in y = mx + b?';
    } else if (variant === 3) {
      const m = 3 + seed % 6; const b = 8 + seed % 19; correct = m;
      prompt = 'A line is y = ' + m + 'x + ' + b + '. A second representation includes the point (1, ' + (m + b) + '). What rate of change is represented?';
    } else if (variant === 4) {
      const m = 2 + seed % 9; const x1 = 3 + seed % 6; const y1 = 16 + seed % 27; const x2 = x1 + 4 + seed % 5; correct = y1 + m * (x2 - x1);
      prompt = 'A table and an equation describe the same model. The table shows y = ' + y1 + ' when x = ' + x1 + ', and the slope is ' + m + '. What y-value corresponds to x = ' + x2 + '?';
    } else if (variant === 5) {
      const c = 2 + seed % 7; const b = 5 + seed % 17; correct = b;
      prompt = 'The equation ' + c + 'y = ' + (c * 3) + 'x + ' + (c * b) + ' is equivalent to y = 3x + b. What is b?';
    } else if (variant === 6) {
      const m = 2 + seed % 8; const b = 9 + seed % 21; const x = 4 + seed % 7; correct = m * x + b;
      prompt = 'An equation and a data table represent the same line. The equation is y = ' + m + 'x + ' + b + '. What y-value belongs to x = ' + x + '?';
    } else if (variant === 7) {
      const m = 2 + seed % 7; const b = 11 + seed % 23; correct = m;
      prompt = 'A line is written as ' + m + 'x − y = ' + b + '. What is the coefficient of x in slope-intercept form?';
    } else if (variant === 8) {
      const m = 2 + seed % 8; const x1 = 1 + seed % 7; const y1 = 10 + seed % 19; const x2 = x1 + 5 + seed % 4; const y2 = y1 + m * (x2 - x1); const x3 = x2 + 2 + seed % 5; correct = y2 + m * (x3 - x2);
      prompt = 'A graph, table, and equation describe the same line. Two known points are (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + '). What y-value belongs to x = ' + x3 + '?';
    } else {
      const m = 3 + seed % 7; const x1 = 2 + seed % 6; const y1 = 12 + seed % 22; const x2 = x1 + 4 + seed % 4; const y2 = y1 + m * (x2 - x1); const yTarget = y2 + m * (3 + seed % 5); correct = x2 + (yTarget - y2) / m;
      prompt = 'A line passes through (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + '). Which x-value corresponds to y = ' + yTarget + '?';
    }
  }

  return finish(question, prompt, correct, o + (kind === 'representation' ? 19 : 0), kind, variant, difficulty, seed);
}
