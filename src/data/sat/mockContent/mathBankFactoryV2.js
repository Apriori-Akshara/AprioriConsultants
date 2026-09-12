const FIG = {
  line: (m, b) => ({ type: 'line', x: [0, 1, 2, 3, 4], y: [b, b + m, b + 2 * m, b + 3 * m, b + 4 * m] }),
  scatter: (s) => ({ type: 'scatter', points: Array.from({ length: 6 }, (_, i) => [i + 1, 5 + ((i * (s % 7 + 2) + s) % 17)]) }),
  quadratic: (a, b, c) => ({ type: 'quadratic', a, b, c }),
  geometry: (shape, values) => ({ type: 'geometry', shape, values }),
};

const FEATURES = {
  easy: ['direct-application', 'single-step'],
  medium: ['two-step', 'representation-shift'],
  hard: ['multi-step', 'strategic-choice', 'distractor-trap'],
};

const wrong = (answer, mode = 'generic') => {
  const n = Number(answer);
  if (!Number.isFinite(n)) return ['not defined', 'insufficient information', 'cannot be determined'];
  const candidates = mode === 'algebra'
    ? [n + 2, n - 2, n * 2]
    : mode === 'percent'
      ? [n + 5, n - 5, 100 - n]
      : [n + 1, n - 1, n * 2];
  return [...new Set(candidates.filter((v) => v !== n))].slice(0, 3);
};

const routeOffset = (args) => {
  const key = `${args.variant}|${args.testId}|${args.module}|${args.route || 'm1'}`;
  let hash = 17;
  for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return hash % 997;
};

function sequenceValue(a) {
  return a.i * 37 + a.seed + routeOffset(a);
}

function item({ testId, variant, assessmentNumber, module, route, domain, i, difficulty, skill, prompt, answer, explanation, figure = null, features = [], distractors }) {
  const questionType = i % 4 === 3 ? 'student-produced-response' : 'multiple-choice';
  const questionId = `${testId}-math-${module}-${route || 'm1'}-${String(i + 1).padStart(2, '0')}`;
  const out = {
    contentId: questionId, version: 3, product: 'sat', questionId, testId,
    assessmentFamily: variant === 'psat-nmsqt' ? 'psat' : 'sat', assessmentVariant: variant,
    assessmentNumber, section: 'math', module, domain, skill, subskill: skill,
    conceptId: `${domain}-${skill.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    difficulty, difficultyBand: `math-${route || 'module-1'}-${difficulty}`,
    cognitiveDemand: difficulty === 'hard' ? 'analyze' : 'apply', questionType,
    stimulusType: figure?.type || 'numeric-text', interactionType: questionType === 'student-produced-response' ? 'student-produced-response' : 'single-select',
    timingMode: 'timed', estimatedTimeSeconds: difficulty === 'hard' ? 105 : difficulty === 'medium' ? 95 : 80,
    calculatorEligibility: true, calculatorMode: 'either', calculatorRequired: false, referenceSheetRelevant: true,
    prompt: questionType === 'student-produced-response' ? `${prompt}\nEnter your answer as a number.` : prompt,
    choices: [], answer: null, explanation, figure, isOperational: true, adaptiveRoute: route || null,
    originalityFingerprint: `${variant}-${questionId}`, conceptFingerprint: `${domain}-${skill}-${i}`,
    tags: [variant, 'mock', 'math', 'apriori-original'], lessonIds: [], sourceType: 'apriori-original',
    authoringStatus: 'qc-approved', status: 'assembly-ready', releaseEligibility: true,
    metadata: {
      contextKey: `${variant}-${testId}-math-${i}`,
      contextFamily: `${variant}-${domain}-${skill}`,
      applicationFingerprint: `${variant}-${testId}-${domain}-${skill}-${i}`,
      answerFormat: questionType === 'student-produced-response' ? 'numeric' : 'A-D',
      figurePurpose: figure ? 'question-essential' : null,
      difficultyFeatures: [...new Set([...FEATURES[difficulty], ...features])],
    },
  };
  if (questionType === 'student-produced-response') out.answer = String(answer);
  else {
    const choices = [String(answer), ...(distractors || wrong(answer, domain === 'Algebra' ? 'algebra' : domain === 'Problem-Solving and Data Analysis' ? 'percent' : 'generic'))];
    const target = (i + assessmentNumber) % 4;
    const first = choices.shift(); choices.splice(target, 0, first);
    out.choices = choices;
    out.answer = String.fromCharCode(65 + target);
  }
  return out;
}

function algebra(a) {
  const p = sequenceValue(a);
  if (a.difficulty === 'easy') {
    const m = 2 + p % 6, b = 4 + (p * 3) % 19, x = 2 + Math.floor(p / 19) % 9, y = m * x + b;
    return item({ ...a, skill: 'Linear functions', prompt: `A linear model is y = ${m}x + ${b}. What is y when x = ${x}?`, answer: y, explanation: `Substitute x = ${x}: ${m}(${x}) + ${b} = ${y}.`, distractors: [y - m, y + m, b] });
  }
  if (a.difficulty === 'medium') {
    const x = 2 + p % 11, y = 3 + (p * 2) % 13, c = x + y;
    return item({ ...a, skill: 'Systems of two linear equations', prompt: `The system x + y = ${c} and 2x + 3y = ${2 * x + 3 * y} has solution (x, y). What is x?`, answer: x, explanation: `Use x = ${c} − y in the second equation and solve.`, distractors: [y, c, x + y] });
  }
  if (p % 2 === 0) {
    const m = 2 + p % 7, b = 5 + (p * 3) % 17, x1 = 2 + (p * 5) % 13, x2 = x1 + 3, y1 = m * x1 + b, y2 = m * x2 + b;
    return item({ ...a, skill: 'Linear functions and representations', prompt: `A line passes through (${x1}, ${y1}) and (${x2}, ${y2}). What is its y-intercept?`, answer: b, explanation: `The slope is ${m}; substituting either point into y = ${m}x + b gives b = ${b}.`, distractors: [y1, y2, b + m], features: ['multi-step'] });
  }
  const m = 2 + p % 7, b = 6 + (p * 3) % 17, q = 2 + (p * 5) % 11;
  return item({ ...a, skill: 'Linear equations and parameter reasoning', prompt: `Line A is y = ${m}x + ${b}. Line B is parallel to Line A and passes through (${q}, ${m * q + b + 4}). What is the y-intercept of Line B?`, answer: b + 4, explanation: `Parallel lines have the same slope. Substitute the given point into y = ${m}x + b_B to obtain b_B = ${b + 4}.`, distractors: [b, b + m, m * q + b], features: ['parameter-reasoning', 'constraint-inference'] });
}

function advanced(a) {
  const p = sequenceValue(a);
  if (a.difficulty === 'easy') {
    const r1 = 2 + p % 37, r2 = r1 + 3;
    return item({ ...a, skill: 'Quadratic equations', prompt: `One solution of x² − ${r1 + r2}x + ${r1 * r2} = 0 is ${r1}. What is the other solution?`, answer: r2, explanation: `The roots sum to ${r1 + r2}; subtract ${r1} to get ${r2}.`, distractors: [r1, r2 - 1, r2 + 1] });
  }
  if (a.difficulty === 'medium') {
    const base = 2 + p % 13, exponent = 2 + (p * 3) % 11, value = base ** exponent;
    return item({ ...a, skill: 'Exponential equations', prompt: `If ${base}^x = ${value}, what is x?`, answer: exponent, explanation: `Rewrite ${value} as ${base}^${exponent}.`, distractors: [exponent - 1, exponent + 1, base * exponent] });
  }
  if (p % 2 === 0) {
    const h = 2 + p % 31, answer = h * h;
    return item({ ...a, skill: 'Quadratic parameter reasoning', prompt: `For x² − ${2 * h}x + k = 0, the equation has exactly one real solution. What is k?`, answer, explanation: `Exactly one real solution requires discriminant 0: ${2 * h}² − 4k = 0, so k = ${answer}.`, distractors: [(2 * h) ** 2, answer - h, answer + h], features: ['parameter-reasoning', 'constraint-inference'] });
  }
  const h = 2 + p % 29, c = 12 + (p * 5) % 31, vertex = c - h * h;
  return item({ ...a, skill: 'Quadratic functions and representations', prompt: `A quadratic is f(x) = x² − ${2 * h}x + ${c}. What is the minimum value of f(x)?`, answer: vertex, explanation: `Complete the square: f(x) = (x − ${h})² + ${vertex}; therefore the minimum is ${vertex}.`, figure: FIG.quadratic(1, -2 * h, c), distractors: [c, h, vertex + h], features: ['representation-shift', 'multi-step', 'strategic-choice'] });
}

function psda(a) {
  const p = sequenceValue(a);
  if (a.difficulty === 'easy') {
    const total = 200 + (p % 17) * 25, pct = 15 + (p * 7 % 8) * 5, answer = total * pct / 100;
    return item({ ...a, skill: 'Percentages', prompt: `A population contains ${total} observations. If ${pct}% meet a condition, how many observations meet it?`, answer, explanation: `Calculate ${total} × ${pct}/100 = ${answer}.`, distractors: [answer + 5, answer - 5, total - answer] });
  }
  if (a.difficulty === 'medium') {
    const m = 2 + p % 11, b = 6 + (p * 3) % 17, x = 4 + (p * 5) % 13, y = m * x + b;
    return item({ ...a, skill: 'Two-variable data and models', prompt: `The scatterplot shown is modeled by y = ${m}x + ${b}. According to the model, what y-value is predicted when x = ${x}?`, answer: y, explanation: `Substitute x = ${x} into the model.`, figure: FIG.scatter(p), distractors: [m * x, y + m, b + x], features: ['data-interpretation', 'representation-shift'] });
  }
  if (a.variant !== 'psat-nmsqt' && p % 3 === 0) {
    const estimate = 52 + p % 29, margin = 3 + (p * 5) % 7, answer = estimate + margin;
    return item({ ...a, skill: 'Margin of error', prompt: `A survey estimate is ${estimate}% with a margin of error of ±${margin} percentage points. What is the upper end of the reported interval?`, answer, explanation: `Add the margin of error: ${estimate} + ${margin} = ${answer}.`, distractors: [estimate - margin, estimate + 2 * margin, margin], features: ['data-interpretation', 'multi-step'] });
  }
  if (p % 2 === 0) {
    const group = 40 + p % 31, outcome = 8 + (p * 7) % 19, answer = Number((outcome / group * 100).toFixed(2));
    return item({ ...a, skill: 'Conditional probability and data interpretation', prompt: `A study records ${group} participants in a group, and ${outcome} of those participants have outcome C. What percentage of the group has outcome C?`, answer, explanation: `The relevant denominator is ${group}: ${outcome}/${group} × 100 = ${answer}%.`, figure: FIG.scatter(p + 3), distractors: [Number((outcome / (group + outcome) * 100).toFixed(2)), Number((outcome / Math.max(1, group - outcome) * 100).toFixed(2)), Number((group / outcome * 100).toFixed(2))], features: ['data-interpretation', 'constraint-inference'] });
  }
  const n = 8 + p % 17, mean = 20 + (p * 3) % 19, added = mean + 10 + (p * 5) % 13, answer = Number(((mean * n + added) / (n + 1)).toFixed(2));
  return item({ ...a, skill: 'Distributions and measures of center', prompt: `A data set of ${n} values has mean ${mean}. After one value of ${added} is added, what is the new mean?`, answer, explanation: `Find the original total, add ${added}, and divide by ${n + 1}.`, distractors: [mean, added, Number(((mean * n - added) / (n + 1)).toFixed(2))], features: ['multi-step', 'strategic-choice'] });
}

function geometry(a) {
  const p = sequenceValue(a);
  if (a.difficulty === 'easy') {
    const r = 3 + p % 31, answer = r * r;
    return item({ ...a, skill: 'Circles', prompt: `A circle has radius ${r}. What is its area in terms of π?`, answer, explanation: `Use A = πr², so the coefficient of π is ${answer}.`, figure: FIG.geometry('circle', { radius: r }), distractors: [r, 2 * r, r * r + r] });
  }
  if (a.difficulty === 'medium') {
    const x = 6 + p % 23, y = 8 + (p * 5) % 29, answer = Number(Math.sqrt(x * x + y * y).toFixed(2));
    return item({ ...a, skill: 'Right triangles', prompt: `The right triangle shown has legs ${x} and ${y}. What is the length of the hypotenuse?`, answer, explanation: `Apply c² = ${x}² + ${y}².`, figure: FIG.geometry('right-triangle', { x, y }), distractors: [x + y, Math.abs(y - x), Number(Math.sqrt(Math.max(1, y * y - x * x)).toFixed(2))], features: ['multi-step'] });
  }
  if (p % 2 === 0) {
    const side = 4 + p % 19, scale = 2 + p % 5, answer = scale * scale;
    return item({ ...a, skill: 'Similarity and scaling', prompt: `Two similar figures have corresponding lengths in the ratio ${scale}:1. By what factor does area change?`, answer, explanation: `Area scales by the square of the length scale factor: ${scale}² = ${answer}.`, figure: FIG.geometry('similar-figures', { side, scale }), distractors: [scale, scale + 1, scale * 3], features: ['constraint-inference', 'representation-shift'] });
  }
  const angle = [30, 45, 60][p % 3], opposite = 6 + p % 31, sine = angle === 30 ? 0.5 : angle === 45 ? Math.SQRT1_2 : Math.sqrt(3) / 2, answer = Number((opposite / sine).toFixed(2));
  return item({ ...a, skill: 'Right-triangle trigonometry', prompt: `In the right triangle shown, an acute angle is ${angle}°. The side opposite the angle has length ${opposite}. What is the hypotenuse length?`, answer, explanation: `Use sin(${angle}°) = opposite/hypotenuse.`, figure: FIG.geometry('right-triangle-trig', { opposite, angle }), distractors: [opposite, Number((opposite / (Math.cos(angle * Math.PI / 180))).toFixed(2)), Number((opposite * sine).toFixed(2))], features: ['representation-shift', 'multi-step'] });
}

function generate(args) {
  if (args.domain === 'Algebra') return algebra(args);
  if (args.domain === 'Advanced Math') return advanced(args);
  if (args.domain === 'Problem-Solving and Data Analysis') return psda(args);
  return geometry(args);
}

const SAT_M1 = ['Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Geometry and Trigonometry','Geometry and Trigonometry','Geometry and Trigonometry'];
const SAT_M2 = ['Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Geometry and Trigonometry','Geometry and Trigonometry','Geometry and Trigonometry','Geometry and Trigonometry'];
const PSAT_M1 = SAT_M1;
const PSAT_M2 = ['Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Geometry and Trigonometry','Geometry and Trigonometry','Geometry and Trigonometry'];

const LEVELS = {
  module1: ['easy','easy','easy','easy','easy','easy','medium','medium','medium','medium','medium','medium','medium','medium','medium','hard','hard','hard','hard','hard','hard','hard'],
  high: ['easy','easy','medium','medium','medium','medium','medium','medium','medium','hard','hard','hard','hard','hard','hard','hard','hard','hard','hard','hard','hard'],
  standard: ['easy','easy','easy','easy','easy','medium','medium','medium','medium','medium','medium','medium','medium','hard','hard','hard','hard','hard','hard','hard','hard'],
  low: ['easy','easy','easy','easy','easy','easy','easy','easy','easy','medium','medium','medium','medium','medium','medium','medium','medium','medium','medium','hard','hard','hard'],
};

export function buildMathBank({ testId, variant, assessmentNumber, seed }) {
  const m1 = variant === 'psat-nmsqt' ? PSAT_M1 : SAT_M1;
  const m2 = variant === 'psat-nmsqt' ? PSAT_M2 : SAT_M2;
  const pools = [
    ['math-module-1', null, m1, LEVELS.module1, 0],
    ['math-module-2', 'high', m2, LEVELS.high, 22],
    ['math-module-2', 'standard', m2, LEVELS.standard, 44],
    ['math-module-2', 'low', m2, LEVELS.low, 66],
  ];
  return pools.flatMap(([module, route, domains, levels, offset]) => domains.map((domain, i) => generate({ testId, variant, assessmentNumber, module, route, domain, difficulty: levels[i], i: offset + i, seed })));
}
