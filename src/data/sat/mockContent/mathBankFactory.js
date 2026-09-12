const FIG = {
  line: (m, b) => ({ type: 'line', x: [0, 1, 2, 3, 4], y: [b, b + m, b + 2 * m, b + 3 * m, b + 4 * m] }),
  scatter: (seed) => ({ type: 'scatter', points: Array.from({ length: 6 }, (_, i) => [i + 1, 5 + ((i * (seed % 7 + 2) + seed) % 17)]) }),
  quadratic: (a, b, c) => ({ type: 'quadratic', a, b, c }),
  geometry: (shape, values) => ({ type: 'geometry', shape, values }),
};

const DOMAIN_SKILLS = {
  Algebra: 'Linear equations, functions, systems and inequalities',
  'Advanced Math': 'Equivalent expressions, nonlinear equations and functions',
  'Problem-Solving and Data Analysis': 'Ratios, percentages, data, probability and statistical reasoning',
  'Geometry and Trigonometry': 'Area, volume, angles, triangles, circles and trigonometry',
};

const FEATURE_SETS = {
  easy: ['direct-application', 'single-step'],
  medium: ['two-step', 'representation-use'],
  hard: ['multi-step', 'strategic-choice', 'distractor-trap'],
};

const rotateChoices = (correct, distractors, target) => {
  const values = [String(correct), ...distractors.map(String)];
  const first = values.shift();
  values.splice(target, 0, first);
  return { choices: values, answer: String.fromCharCode(65 + target) };
};

function uniqueNumbers(values, correct) {
  const set = new Set([Number(correct)]);
  for (const value of values) {
    if (Number.isFinite(Number(value))) set.add(Number(value));
  }
  let bump = 1;
  while (set.size < 4) {
    set.add(Number(correct) + bump);
    if (set.size < 4) set.add(Number(correct) - bump);
    bump += 1;
  }
  return [...set].slice(1, 4);
}

function finish({ prompt, answer, explanation, skill, difficulty, index, seed, variant, route, figure = null, features = [] }) {
  const questionType = index % 4 === 3 ? 'student-produced-response' : 'multiple-choice';
  const id = `${variant === 'psat-nmsqt' ? 'psat' : 'sat'}-math-${seed}-${String(index + 1).padStart(3, '0')}`;
  const result = {
    contentId: id,
    version: 2,
    product: 'sat',
    questionId: id,
    testId: null,
    assessmentFamily: variant === 'psat-nmsqt' ? 'psat' : 'sat',
    assessmentVariant: variant,
    assessmentNumber: seed === 0 || seed === 17 ? 1 : 2,
    section: 'math',
    module: null,
    domain: null,
    skill,
    subskill: skill,
    conceptId: null,
    difficulty,
    difficultyBand: `math-${route || 'module-1'}-${difficulty}`,
    cognitiveDemand: difficulty === 'hard' ? 'analyze' : difficulty === 'medium' ? 'apply' : 'apply',
    questionType,
    stimulusType: figure?.type || 'numeric-text',
    interactionType: questionType === 'student-produced-response' ? 'student-produced-response' : 'single-select',
    timingMode: 'timed',
    estimatedTimeSeconds: difficulty === 'hard' ? 105 : difficulty === 'medium' ? 95 : 80,
    calculatorEligibility: true,
    calculatorMode: 'either',
    calculatorRequired: false,
    referenceSheetRelevant: true,
    prompt,
    choices: [],
    answer: null,
    explanation,
    figure,
    isOperational: true,
    adaptiveRoute: route || null,
    originalityFingerprint: `${variant}-${seed}-${index}-${skill}`,
    conceptFingerprint: `${skill}-${difficulty}-${index % 17}`,
    tags: [variant, 'mock', 'math', 'apriori-original'],
    lessonIds: [],
    sourceType: 'apriori-original',
    authoringStatus: 'qc-approved',
    status: 'assembly-ready',
    releaseEligibility: true,
    metadata: {
      contextKey: `${variant}-math-context-${seed}-${index}`,
      contextFamily: `${variant}-math-family-${skill}`,
      applicationFingerprint: `${variant}-math-${seed}-${index}-${skill}`,
      answerFormat: questionType === 'student-produced-response' ? 'numeric' : 'A-D',
      figurePurpose: figure ? 'question-essential' : null,
      difficultyFeatures: [...new Set([...FEATURE_SETS[difficulty], ...features])],
    },
  };
  result.testId = arguments[0]?.testId || null;
  result.module = arguments[0]?.module || null;
  result.domain = arguments[0]?.domain || null;
  result.questionId = `${result.testId || id}-${String(index + 1).padStart(3, '0')}`;
  result.contentId = result.questionId;
  result.originalityFingerprint = `${variant}-${result.questionId}`;
  result.conceptFingerprint = `${result.domain}-${skill}-${seed}-${index}`;
  if (questionType === 'student-produced-response') result.answer = String(answer);
  else {
    const target = (index + seed) % 4;
    const rotated = rotateChoices(answer, uniqueNumbers([answer + 1, answer - 1, answer * 2, answer + 2], answer), target);
    result.choices = rotated.choices;
    result.answer = rotated.answer;
  }
  return result;
}

function numericMCQ(args) {
  return finish(args);
}

function algebraQuestion({ difficulty, i, seed, variant, route, testId, module, domain }) {
  const pick = (i + seed) % 6;
  if (difficulty === 'easy') {
    if (pick % 2 === 0) {
      const m = 2 + ((i + seed) % 6); const b = 4 + ((i * 3 + seed) % 15); const x = 2 + ((i + seed) % 7); const answer = m * x + b;
      return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Linear functions', prompt: `A linear model is y = ${m}x + ${b}. What is y when x = ${x}?`, answer, explanation: `Substitute ${x} for x and calculate ${m}(${x}) + ${b} = ${answer}.` });
    }
    const a = 2 + ((i + seed) % 7); const b = 5 + ((i + seed * 2) % 13); const x = 3 + ((i + seed) % 5); const c = a * x + b;
    return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Linear equations in one variable', prompt: `For ${a}x + ${b} = ${c}, what is x?`, answer: x, explanation: `Subtract ${b} and divide by ${a}.` });
  }
  if (difficulty === 'medium') {
    if (pick % 2 === 0) {
      const x = 2 + ((i + seed) % 6); const y = 3 + ((i * 2 + seed) % 7); const a = 1 + ((i + seed) % 4); const b = 2 + ((i + seed) % 5); const c = a * x + b * y; const answer = x;
      return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Systems of two linear equations', prompt: `The system ${a}x + ${b}y = ${c} and x + y = ${x + y} has solution (x, y). What is x?`, answer, explanation: `Use x + y = ${x + y} to substitute y = ${x + y} - x into the first equation, then solve for x.`, features: ['substitution'] });
    }
    const x1 = 1 + ((i + seed) % 5); const x2 = x1 + 2; const m = 2 + ((i + seed) % 5); const b = 4 + ((i * 2 + seed) % 11); const y1 = m * x1 + b; const y2 = m * x2 + b;
    return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Linear functions', prompt: `A line passes through (${x1}, ${y1}) and (${x2}, ${y2}). What is its y-intercept?`, answer: b, explanation: `First find the slope from the two points, then substitute either point into y = mx + b.` });
  }
  const p = 2 + ((i + seed) % 5); const k = p * 3 + 6; const q = 2 + ((i * 2 + seed) % 5); const answer = q;
  if (pick % 3 === 0) {
    const figure = FIG.line(p, k);
    return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Linear functions and representations', prompt: `The graph shown is a line with slope ${p}. The line passes through the point (${q}, ${p * q + k}). What is its y-intercept?`, answer: k, explanation: `Use y = mx + b with the displayed point: ${p * q + k} = ${p}(${q}) + b, so b = ${k}.`, figure, features: ['representation-shift'] });
  }
  return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Systems and parameter reasoning', prompt: `For what value of k does the system y = ${p}x + ${k} and y = ${2 * p}x + ${k - 6} have an x-coordinate of ${q} at their intersection?`, answer: p * q + 6, explanation: `Set the two expressions for y equal, substitute the required x-value, and solve for k. This requires coordinating the two linear relationships.`, features: ['parameter-reasoning', 'constraint-inference'] });
}

function advancedQuestion({ difficulty, i, seed, variant, route, testId, module, domain }) {
  const pick = (i + seed) % 6;
  if (difficulty === 'easy') {
    const r1 = 2 + ((i + seed) % 6); const r2 = r1 + 3; const answer = r1;
    return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Quadratic equations', prompt: `One solution of x² - ${r1 + r2}x + ${r1 * r2} = 0 is ${answer}. What is the other solution?`, answer: r2, explanation: `The product of the roots is ${r1 * r2} and their sum is ${r1 + r2}, so the other root is ${r2}.` });
  }
  if (difficulty === 'medium') {
    if (pick % 2 === 0) {
      const a = 2 + ((i + seed) % 4); const x = 2 + ((i + seed) % 5); const answer = x; const value = Math.pow(a, x);
      return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Exponential equations', prompt: `If ${a}^x = ${value}, what is x?`, answer, explanation: `Rewrite ${value} as ${a}^${x}.` });
    }
    const r = 4 + ((i + seed) % 8); const answer = r + 1;
    return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Radical equations', prompt: `If sqrt(x + ${r}) = ${Math.sqrt(r + answer)}, what is x?`, answer, explanation: `Square both sides, subtract ${r}, and solve for x.` });
  }
  if (pick % 2 === 0) {
    const a = 1 + ((i + seed) % 4); const h = 2 + ((i * 2 + seed) % 6); const answer = h;
    return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Quadratic parameter reasoning', prompt: `For x² - ${2 * h}x + k = 0, the equation has exactly one real solution. What is k?`, answer: h * h, explanation: `Exactly one real solution means the discriminant is zero: (−${2 * h})² − 4k = 0, so k = ${h * h}.`, features: ['parameter-reasoning', 'constraint-inference'] });
  }
  const x = 1 + ((i + seed) % 5); const k = 2 + ((i * 3 + seed) % 6); const m = x * x - 2 * x; const answer = k;
  const figure = FIG.quadratic(1, -2 * x, k + m);
  return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Nonlinear functions and representations', prompt: `The quadratic graph shown has its axis of symmetry at x = ${x}. If its value at x = 0 is ${k + m}, what is the constant adjustment needed to make the y-intercept equal to ${k}?`, answer: m, explanation: `Compare the displayed y-intercept with the target value: (${k + m}) − ${k} = ${m}. The graph is used to identify the relevant representation before calculating.`, figure, features: ['representation-shift', 'strategic-choice'] });
}

function psdaQuestion({ difficulty, i, seed, variant, route, testId, module, domain }) {
  const pick = (i + seed) % 6;
  if (difficulty === 'easy') {
    const total = 200 + ((i + seed) % 6) * 25; const percent = 15 + ((i + seed) % 4) * 5; const answer = total * percent / 100;
    return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Percentages', prompt: `A population contains ${total} observations. If ${percent}% meet a condition, how many observations meet it?`, answer, explanation: `Multiply ${total} by ${percent}/100.` });
  }
  if (difficulty === 'medium') {
    if (pick % 2 === 0) {
      const m = 2 + ((i + seed) % 5); const b = 6 + ((i + seed) % 8); const x = 4 + ((i * 2 + seed) % 7); const answer = m * x + b; const figure = FIG.scatter(seed + i);
      return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Two-variable data and models', prompt: `A scatterplot is modeled by y = ${m}x + ${b}. According to the model, what y-value is predicted when x = ${x}?`, answer, explanation: `Substitute x = ${x} into the model. The scatterplot supplies the data context; the model supplies the calculation.`, figure, features: ['data-interpretation', 'representation-shift'] });
    }
    const sample = 250 + ((i + seed) % 6) * 25; const preferred = 45 + ((i + seed) % 5) * 10; const answer = Math.round(preferred / sample * 1000);
    return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Inference from sample statistics', prompt: `In a sample of ${sample} students, ${preferred} prefer option A. Using the sample proportion as an estimate, about how many of 1,000 students would be expected to prefer option A?`, answer, explanation: `Use the sample proportion ${preferred}/${sample} and scale it to 1,000.` });
  }
  if (variant !== 'psat-nmsqt' && pick % 3 === 0) {
    const n = 400 + ((i + seed) % 5) * 50; const estimate = 52 + ((i + seed) % 5); const margin = 3 + ((i + seed) % 3); const answer = estimate + margin;
    return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Margin of error', prompt: `A survey estimate is ${estimate}% with a reported margin of error of ±${margin} percentage points. What is the upper end of the reported interval?`, answer, explanation: `Add the margin of error to the estimate: ${estimate} + ${margin} = ${answer}.`, features: ['data-interpretation', 'multi-step'] });
  }
  if (pick % 2 === 0) {
    const a = 30 + ((i + seed) % 20); const b = 20 + ((i * 2 + seed) % 15); const c = 12 + ((i + seed) % 10); const answer = c / (a + c) * 100;
    const figure = FIG.scatter(seed + 2 * i);
    return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Conditional probability and data interpretation', prompt: `A study records ${a} participants in one group and ${c} of those participants have outcome C. What percentage of that group has outcome C? Use the displayed data context to identify the correct denominator.`, answer: Number(answer.toFixed(2)), explanation: `For a conditional percentage, divide the outcome count ${c} by the relevant group total ${a + c}, then multiply by 100.`, figure, features: ['data-interpretation', 'constraint-inference'] });
  }
  const n = 8 + ((i + seed) % 7); const mean = 20 + ((i * 3 + seed) % 10); const added = mean + 10 + ((i + seed) % 8); const answer = Number(((mean * n + added) / (n + 1)).toFixed(2));
  return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Distributions and measures of center', prompt: `A data set of ${n} values has mean ${mean}. After one value of ${added} is added, what is the new mean?`, answer, explanation: `Find the original total ${n} × ${mean}, add ${added}, and divide by ${n + 1}.`, features: ['multi-step', 'strategic-choice'] });
}

function geometryQuestion({ difficulty, i, seed, variant, route, testId, module, domain }) {
  const pick = (i + seed) % 6;
  if (difficulty === 'easy') {
    if (pick % 2 === 0) {
      const r = 3 + ((i + seed) % 7); const answer = r * r;
      return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Circles', prompt: `A circle has radius ${r}. What is its area in terms of π?`, answer, explanation: `Use A = πr², so the coefficient of π is ${r}² = ${answer}.`, figure: FIG.geometry('circle', { radius: r }) });
    }
    const base = 7 + ((i + seed) % 8); const height = 4 + ((i * 2 + seed) % 7); const answer = base * height / 2;
    return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Area and volume', prompt: `A triangle has base ${base} units and height ${height} units. What is its area in square units?`, answer, explanation: `Use one-half × base × height.`, figure: FIG.geometry('triangle', { base, height }) });
  }
  if (difficulty === 'medium') {
    if (pick % 2 === 0) {
      const a = 6 + ((i + seed) % 5); const b = 8 + ((i * 2 + seed) % 5); const answer = Math.sqrt(a * a + b * b);
      return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Right triangles', prompt: `The right triangle shown has legs ${a} and ${b}. What is the length of the hypotenuse?`, answer: Number(answer.toFixed(2)), explanation: `Apply the Pythagorean theorem: c² = ${a}² + ${b}².`, figure: FIG.geometry('right-triangle', { a, b }) });
    }
    const small = 3 + ((i + seed) % 5); const scale = 2 + ((i * 2 + seed) % 3); const answer = small * scale;
    return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Similarity', prompt: `Two similar triangles have corresponding sides in the ratio ${scale}:1. If the shorter corresponding side is ${small}, what is the longer side?`, answer, explanation: `Multiply the shorter side by the scale factor ${scale}.`, figure: FIG.geometry('similar-triangles', { shortSide: small, scale }) });
  }
  if (pick % 3 === 0) {
    const a = 5 + ((i + seed) % 5); const h = 4 + ((i * 2 + seed) % 6); const answer = a * h;
    return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Composite area and volume', prompt: `The figure can be decomposed into two congruent rectangles, each with width ${a} and height ${h}/2. What is the total area of the figure?`, answer, explanation: `Each rectangle has area ${a} × ${h / 2}; doubling gives ${answer}. The decomposition is the key step.`, figure: FIG.geometry('composite-rectangles', { width: a, height: h }), features: ['multi-step', 'strategic-choice'] });
  }
  if (pick % 3 === 1) {
    const leg = 6 + ((i + seed) % 5); const angle = 30 + ((i + seed) % 3) * 15; const ratio = angle === 30 ? 0.5 : angle === 45 ? 1 : Math.sqrt(3);
    const answer = Number((leg / ratio).toFixed(2));
    return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Right-triangle trigonometry', prompt: `In the right triangle shown, an acute angle is ${angle}°. The side opposite the angle has length ${leg}. Using the appropriate trigonometric relationship, what is the hypotenuse length?`, answer, explanation: `Use the special-angle ratio for ${angle}° and solve for the hypotenuse.`, figure: FIG.geometry('right-triangle-trig', { opposite: leg, angle }), features: ['representation-shift'] });
  }
  const radius = 4 + ((i + seed) % 6); const scale = 2 + ((i * 2 + seed) % 4); const answer = radius * scale;
  return numericMCQ({ testId, module, domain, variant, route, index: i, seed, difficulty, skill: 'Circle relationships and scaling', prompt: `A circle in the figure has radius ${radius}. A related circle has radius ${scale} times as large. By what factor does the area of the related circle exceed the original area?`, answer: scale * scale, explanation: `Area scales with the square of the radius. A radius scale factor of ${scale} produces an area scale factor of ${scale * scale}.`, figure: FIG.geometry('scaled-circles', { radius, scale }), features: ['constraint-inference', 'representation-shift'] });
}

function makeQuestion(args) {
  if (args.domain === 'Algebra') return algebraQuestion(args);
  if (args.domain === 'Advanced Math') return advancedQuestion(args);
  if (args.domain === 'Problem-Solving and Data Analysis') return psdaQuestion(args);
  return geometryQuestion(args);
}

const SAT_MODULE_1_DOMAINS = ['Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Geometry and Trigonometry','Geometry and Trigonometry','Geometry and Trigonometry'];
const SAT_MODULE_2_DOMAINS = ['Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Geometry and Trigonometry','Geometry and Trigonometry','Geometry and Trigonometry','Geometry and Trigonometry'];
const PSAT_MODULE_1_DOMAINS = SAT_MODULE_1_DOMAINS;
const PSAT_MODULE_2_DOMAINS = ['Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Algebra','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Advanced Math','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Problem-Solving and Data Analysis','Geometry and Trigonometry','Geometry and Trigonometry','Geometry and Trigonometry'];

const DIFFICULTY = {
  module1: ['easy','easy','easy','easy','easy','easy','medium','medium','medium','medium','medium','medium','medium','medium','medium','hard','hard','hard','hard','hard','hard','hard'],
  high: ['easy','easy','medium','medium','medium','medium','medium','hard','hard','hard','hard','hard','hard','hard','hard','hard','hard','hard','hard','hard','hard','hard'],
  standard: ['easy','easy','easy','easy','easy','medium','medium','medium','medium','medium','medium','medium','medium','hard','hard','hard','hard','hard','hard','hard','hard','hard'],
  low: ['easy','easy','easy','easy','easy','easy','easy','easy','easy','medium','medium','medium','medium','medium','medium','medium','medium','medium','medium','medium','hard','hard'],
};

export function buildMathBank({ testId, variant, assessmentNumber, seed }) {
  const isPSAT = variant === 'psat-nmsqt';
  const module1Domains = isPSAT ? PSAT_MODULE_1_DOMAINS : SAT_MODULE_1_DOMAINS;
  const module2Domains = isPSAT ? PSAT_MODULE_2_DOMAINS : SAT_MODULE_2_DOMAINS;
  const pools = [
    { module: 'math-module-1', route: null, domains: module1Domains, levels: DIFFICULTY.module1, offset: 0 },
    { module: 'math-module-2', route: 'high', domains: module2Domains, levels: DIFFICULTY.high, offset: 22 },
    { module: 'math-module-2', route: 'standard', domains: module2Domains, levels: DIFFICULTY.standard, offset: 44 },
    { module: 'math-module-2', route: 'low', domains: module2Domains, levels: DIFFICULTY.low, offset: 66 },
  ];

  let index = 0;
  const math = [];
  for (const pool of pools) {
    for (let i = 0; i < 22; i += 1) {
      const question = makeQuestion({
        testId,
        module: pool.module,
        route: pool.route,
        domain: pool.domains[i],
        difficulty: pool.levels[i],
        i: pool.offset + i,
        seed,
        variant,
        assessmentNumber,
      });
      question.testId = testId;
      question.assessmentNumber = assessmentNumber;
      question.module = pool.module;
      question.adaptiveRoute = pool.route || null;
      question.contentId = `${testId}-math-${String(index + 1).padStart(3, '0')}`;
      question.questionId = question.contentId;
      question.originalityFingerprint = `${variant}-${testId}-${index}-${seed}`;
      question.conceptFingerprint = `${question.domain}-${question.skill}-${pool.route || 'module-1'}-${seed}-${i}`;
      question.metadata.contextKey = `${variant}-${testId}-math-context-${index}`;
      question.metadata.applicationFingerprint = `${variant}-${testId}-${question.domain}-${question.skill}-${seed}-${index}`;
      math.push(question);
      index += 1;
    }
  }
  return math;
}
