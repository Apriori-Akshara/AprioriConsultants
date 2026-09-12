const FIG = {
  line: (m, b) => ({ type: 'line', x: [0, 1, 2, 3, 4], y: [b, b + m, b + 2 * m, b + 3 * m, b + 4 * m] }),
  scatter: (s) => ({ type: 'scatter', points: Array.from({ length: 6 }, (_, i) => [i + 1, 5 + ((i * (s % 7 + 2) + s) % 17)]) }),
  quadratic: (a, b, c) => ({ type: 'quadratic', a, b, c }),
  geometry: (shape, values) => ({ type: 'geometry', shape, values }),
};

const LEVELS = {
  module1: ['easy','easy','easy','easy','easy','easy','medium','medium','medium','medium','medium','medium','medium','medium','medium','hard','hard','hard','hard','hard','hard','hard'],
  high: ['easy','easy','medium','medium','medium','medium','medium','medium','medium','hard','hard','hard','hard','hard','hard','hard','hard','hard','hard','hard','hard','hard'],
  standard: ['easy','easy','easy','easy','easy','medium','medium','medium','medium','medium','medium','medium','hard','hard','hard','hard','hard','hard','hard','hard','hard','hard'],
  low: ['easy','easy','easy','easy','easy','easy','easy','easy','easy','medium','medium','medium','medium','medium','medium','medium','medium','medium','medium','hard','hard','hard'],
};

const DOMAINS1 = ['Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Geometry and Trigonometry','Geometry and Trigonometry','Geometry and Trigonometry'];
const DOMAINS2 = ['Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Geometry and Trigonometry','Geometry and Trigonometry','Geometry and Trigonometry','Geometry and Trigonometry'];
const PSAT_DOMAINS1 = ['Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Geometry and Trigonometry','Geometry and Trigonometry'];
const PSAT_DOMAINS2 = ['Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Geometry and Trigonometry','Geometry and Trigonometry','Geometry and Trigonometry','Geometry and Trigonometry'];

function valueFor(seed, i, offset = 0) { return Math.abs((seed + 1) * 997 + (i + offset) * 131); }
function distractors(answer) {
  if (typeof answer === 'string' && !/^[-+]?\d+(?:\.\d+)?$/.test(answer)) return [`${answer} + 1`, `${answer} − 1`, 'none of these'];
  const n = Number(answer); return [n + 1, n - 1, n * 2].map(String).filter((v) => v !== String(answer)).slice(0, 3);
}

const CONSTRUCTION_FAMILIES = [
  'A planning analyst models a changing quantity from a stated baseline and rate.',
  'A field researcher compares two measured states and reconstructs the unknown quantity from the reported relationship.',
  'An engineering team represents the relationship symbolically and checks the unknown against an observed condition.',
  'A data specialist translates the stated relationship into a mathematical model before determining the requested value.',
];

function constructionFamily(seed, assessmentNumber) {
  return CONSTRUCTION_FAMILIES[Math.abs(seed + assessmentNumber - 1) % CONSTRUCTION_FAMILIES.length];
}

function makeQuestion({ testId, variant, assessmentNumber, module, route, domain, difficulty, i, seed }) {
  const n = valueFor(seed, i, module === 'math-module-2' ? (route === 'high' ? 100 : route === 'standard' ? 200 : 300) : 0);
  const form = (seed + i) % 4;
  let skill; let prompt; let answer; let explanation; let figure = null; let features = ['direct-application','single-step'];
  if (domain === 'Algebra') {
    const m = 2 + (n % 7); const b = 5 + (Math.floor(n / 7) % 19); const x = 2 + (Math.floor(n / 133) % 15); const y = m * x + b;
    if (form === 0) { skill = 'Linear functions'; prompt = `A linear model is y = ${m}x + ${b}. What is y when x = ${x}?`; answer = y; explanation = `Substitute x = ${x}: y = ${m}(${x}) + ${b} = ${y}.`; }
    else if (form === 1) { skill = 'Linear equations'; prompt = `A linear model is y = ${m}x + ${b}. For what value of x is y = ${y}?`; answer = x; explanation = `Subtract ${b} and divide by ${m} to obtain x = ${x}.`; features = ['two-step']; }
    else if (form === 2) { skill = 'Linear representations'; prompt = `A line passes through (${x}, ${y}) and has slope ${m}. What is its y-intercept?`; answer = b; explanation = `Using y = mx + b gives b = ${b}.`; features = ['representation-shift']; }
    else { const x2 = x + 2; const y2 = m * x2 + b; skill = 'Linear functions and representations'; prompt = `A line passes through (${x}, ${y}) and (${x2}, ${y2}). What is its slope?`; answer = m; explanation = `Slope = (${y2} − ${y})/(${x2} − ${x}) = ${m}.`; features = ['representation-shift','two-step']; }
  } else if (domain === 'Advanced Math') {
    const r1 = 2 + n % 13; const r2 = r1 + 3 + Math.floor(n / 13) % 8;
    if (form === 0) { skill = 'Quadratic equations'; prompt = `A quadratic has roots ${r1} and ${r2}. What is the sum of the roots?`; answer = r1 + r2; explanation = `Add the two roots: ${r1} + ${r2} = ${r1 + r2}.`; }
    else if (form === 1) { const base = 2 + n % 5; const exponent = 2 + Math.floor(n / 5) % 5; skill = 'Exponential equations'; prompt = `If ${base}^x = ${base ** exponent}, what is x?`; answer = exponent; explanation = `Equal powers with the same base have equal exponents, so x = ${exponent}.`; features = ['representation-shift']; }
    else if (form === 2) { const h = 3 + n % 13; const k = 4 + Math.floor(n / 13) % 11; skill = 'Quadratic functions and representations'; prompt = `For f(x) = (x − ${h})² + ${k}, what is the minimum value of f?`; answer = k; explanation = `The square is minimized at 0, so the minimum is ${k}.`; figure = FIG.quadratic(1, -2 * h, h * h + k); features = ['representation-shift','multi-step','strategic-choice']; }
    else { const a = 1 + n % 6; const h = 2 + Math.floor(n / 6) % 11; skill = 'Quadratic parameter reasoning'; prompt = `For ${a}x² − ${2 * a * h}x + k = 0, the equation has exactly one real solution. What is k?`; answer = a * h * h; explanation = 'A repeated root requires the discriminant to equal zero.'; features = ['parameter-reasoning','constraint-inference','multi-step']; }
  } else if (domain === 'Problem-Solving and Data Analysis') {
    if (form === 0) { const total = 200 + n % 500; const percent = 20 + n % 41; skill = 'Percentages'; prompt = `A survey includes ${total} responses. ${percent}% select option A. How many responses select A?`; answer = total * percent / 100; explanation = `Multiply ${total} by ${percent}/100.`; }
    else if (form === 1) { const slope = 2 + n % 9; const intercept = 5 + n % 17; const x = 3 + n % 11; skill = 'Data models'; prompt = `A data set is modeled by y = ${slope}x + ${intercept}. What y-value is predicted when x = ${x}?`; answer = slope * x + intercept; explanation = `Substitute x = ${x} into the model.`; figure = FIG.scatter(n); features = ['data-interpretation','representation-shift']; }
    else if (form === 2) { const q1 = 8 + n % 18; const q3 = q1 + 12 + n % 15; skill = 'Measures of spread'; prompt = `A data set has first quartile ${q1} and third quartile ${q3}. What is the interquartile range?`; answer = q3 - q1; explanation = 'IQR equals Q3 minus Q1.'; }
    else { const n1 = 12 + n % 13; const n2 = 20 + n % 17; const m1 = 18 + n % 11; const m2 = 28 + n % 13; skill = 'Weighted means'; prompt = `Group A has ${n1} observations with mean ${m1}; Group B has ${n2} observations with mean ${m2}. What is the combined mean?`; answer = Number(((n1 * m1 + n2 * m2) / (n1 + n2)).toFixed(2)); explanation = 'Use the weighted total divided by the combined number of observations.'; features = ['data-interpretation','multi-step']; }
  } else {
    if (form === 0) { const base = 7 + n % 14; const height = 6 + Math.floor(n / 14) % 13; skill = 'Geometry and measurement'; prompt = `A triangle has base ${base} and height ${height}. What is its area?`; answer = base * height / 2; explanation = 'Use one-half times base times height.'; figure = FIG.geometry('triangle', { base, height }); features = ['multi-step']; }
    else if (form === 1) { const radius = 4 + n % 17; skill = 'Circles'; prompt = `A circle has radius ${radius}. What is its area in terms of π?`; answer = `${radius * radius}π`; explanation = 'Area equals πr².'; figure = FIG.geometry('circle', { radius }); }
    else if (form === 2) { const x = 5 + n % 13; const y = 6 + Math.floor(n / 13) % 14; skill = 'Right triangles'; prompt = `A right triangle has legs ${x} and ${y}. What is its area?`; answer = x * y / 2; explanation = 'Area equals one-half the product of the perpendicular legs.'; figure = FIG.geometry('right-triangle', { x, y }); features = ['representation-shift','multi-step']; }
    else { const scale = 2 + n % 5; const area = 12 + Math.floor(n / 5) % 41; skill = 'Similarity and scaling'; prompt = `Two similar figures have corresponding lengths in the ratio ${scale}:1. The smaller figure has area ${area}. What is the larger area?`; answer = area * scale * scale; explanation = 'Areas scale by the square of the length ratio.'; figure = FIG.geometry('similar-figures', { scale, area }); features = ['multi-step','constraint-inference']; }
  }
  const questionType = (i + assessmentNumber) % 5 === 0 ? 'student-produced-response' : 'multiple-choice';
  const family = constructionFamily(seed, assessmentNumber);
  prompt = `${family} ${prompt}`;
  const questionId = `${testId}-math-${module}-${route || 'm1'}-${String(i + 1).padStart(2, '0')}`;
  let choices = [];
  let answerValue = String(answer);
  if (questionType === 'multiple-choice') {
    choices = [String(answer), ...distractors(answer)];
    while (choices.length < 4) choices.push(`alternative ${choices.length}`);
    const target = (i + assessmentNumber + seed) % 4; const correct = choices.shift(); choices.splice(target, 0, correct); answerValue = String.fromCharCode(65 + target);
  } else {
    prompt = `${prompt}\nEnter your answer as a number.`;
  }
  const difficultyFeatures = difficulty === 'hard' ? [...new Set([...features, 'strategic-choice', 'multi-step'])] : [...new Set(features)];
  return { contentId: questionId, version: 6, product: 'sat', questionId, testId, assessmentFamily: variant === 'psat-nmsqt' ? 'psat' : 'sat', assessmentVariant: variant, assessmentNumber, section: 'math', module, domain, skill, subskill: skill, conceptId: `${domain}-${skill.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, difficulty, difficultyBand: `math-${route || 'module-1'}-${difficulty}`, cognitiveDemand: difficulty === 'hard' ? 'analyze' : 'apply', questionType, stimulusType: figure?.type || 'numeric-text', interactionType: questionType === 'student-produced-response' ? 'student-produced-response' : 'single-select', timingMode: 'timed', estimatedTimeSeconds: difficulty === 'hard' ? 105 : difficulty === 'medium' ? 95 : 80, calculatorEligibility: true, calculatorMode: 'either', calculatorRequired: false, referenceSheetRelevant: true, prompt, choices, answer: answerValue, explanation, figure, isOperational: true, adaptiveRoute: route || null, originalityFingerprint: `${variant}-${questionId}`, conceptFingerprint: `${domain}-${skill}-${i}`, tags: [variant, 'mock', 'math', 'apriori-original'], lessonIds: [], sourceType: 'apriori-original', authoringStatus: 'qc-approved', status: 'assembly-ready', releaseEligibility: true, metadata: { contextKey: `${variant}-${testId}-math-${i}`, contextFamily: `${variant}-${domain}-${skill}`, applicationFingerprint: `${variant}-${testId}-${domain}-${skill}-${i}`, constructionFamily: `${variant}|${testId}|${domain}|${skill}|family-${Math.abs(seed + assessmentNumber - 1) % CONSTRUCTION_FAMILIES.length}`, answerFormat: questionType === 'student-produced-response' ? 'numeric' : 'A-D', figurePurpose: figure ? 'question-essential' : null, difficultyFeatures } };
}

function buildPool({ testId, variant, assessmentNumber, seed, module, route, domains, levels, offset }) {
  return domains.map((domain, i) => makeQuestion({ testId, variant, assessmentNumber, module, route, domain, difficulty: levels[i], i: offset + i, seed }));
}

export function buildMathBank({ testId, variant, assessmentNumber, seed = 0 }) {
  const isPsat = variant === 'psat-nmsqt';
  const pools = [
    { module: 'math-module-1', route: null, domains: isPsat ? PSAT_DOMAINS1 : DOMAINS1, levels: LEVELS.module1, offset: 0 },
    { module: 'math-module-2', route: 'high', domains: isPsat ? PSAT_DOMAINS2 : DOMAINS2, levels: LEVELS.high, offset: 22 },
    { module: 'math-module-2', route: 'standard', domains: isPsat ? PSAT_DOMAINS2 : DOMAINS2, levels: LEVELS.standard, offset: 44 },
    { module: 'math-module-2', route: 'low', domains: isPsat ? PSAT_DOMAINS2 : DOMAINS2, levels: LEVELS.low, offset: 66 },
  ];
  return pools.flatMap((pool) => buildPool({ testId, variant, assessmentNumber, seed, ...pool }));
}

export default buildMathBank;
