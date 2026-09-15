/**
 * Batch M remediation candidate generator for Math.
 *
 * Candidate-only module. It is not imported by batchMProductionStore.js and
 * cannot alter the frozen production corpus by itself.
 */

import { MATH_REMEDIATION_CONSTRUCTIONS, DIFFICULTY_REQUIREMENTS, PSAT_CEILING_RULES, MATH_SPR_TARGET } from './batchMRemediationBlueprint.js';
import { evaluateContentQuality } from './batchMContentQualityGate.js';

const BASE_DOMAINS = Object.keys(MATH_REMEDIATION_CONSTRUCTIONS);

function pick(list, index) {
  return list[((index % list.length) + list.length) % list.length];
}

function rotateChoices(choices, target) {
  const out = [...choices];
  const correct = out.shift();
  out.splice(target, 0, correct);
  return { choices: out, answer: String.fromCharCode(65 + target) };
}

function figure(type, values) {
  return { type, values };
}

function numericChoices(answer, index) {
  const text = String(answer);
  const numeric = Number(answer);
  const wrong = Number.isFinite(numeric)
    ? [numeric + 1, Math.max(0, numeric - 1), numeric * 2].map(String)
    : [`${text} + 1`, `${text} − 1`, `${text} × 2`];
  return rotateChoices([text, ...wrong], (index + 1) % 4);
}

function buildMath(index, options) {
  const {
    testId = 'SAT1',
    variant = 'sat',
    assessmentNumber = 1,
    module = 'math-module-1',
    route = 'standard',
  } = options;

  // Domain and skill now cycle independently. This ensures every Math domain
  // receives every remediation skill family across the candidate pool instead
  // of permanently coupling one skill to one domain position.
  const skillIndex = Math.floor(index / 4) % 4;
  const domain = BASE_DOMAINS[(index + skillIndex) % BASE_DOMAINS.length];
  const constructionCycle = Math.floor(index / (BASE_DOMAINS.length * 4));
  const construction = pick(MATH_REMEDIATION_CONSTRUCTIONS[domain], constructionCycle);
  const difficulty = pick(['easy', 'medium', 'medium', 'hard'], index + assessmentNumber);
  const hard = difficulty === 'hard';
  const spr = index % 4 === 0;
  let skill;
  let prompt;
  let numericAnswer;
  let choices = [];
  let explanation;
  let fig = null;
  let features = [];

  if (domain === 'Algebra') {
    if (skillIndex === 0) {
      const rate = 3 + (index % 6);
      const baseline = 18 + index * 2;
      const monthsKnown = 4 + (index % 5);
      const monthsAsked = 6 + (index % 5);
      const target = baseline + rate * monthsKnown;
      skill = 'Linear relationships';
      prompt = `A conservation program records ${baseline} units at the start and increases by ${rate} units each month. After ${monthsKnown} months, the program reaches ${target} units. If the same rate continues, how many units will be recorded after ${monthsAsked} months?`;
      numericAnswer = baseline + rate * monthsAsked;
      explanation = 'Model the quantity with the stated baseline and constant monthly rate, then evaluate the requested month.';
      features = ['context-dependent', 'multi-step', 'parameter-reasoning'];
    } else if (skillIndex === 1) {
      const cost = 12 + (index % 19);
      const fixed = 40 + (index % 9) * 5;
      const units = 6 + (index % 7);
      const total = fixed + cost * units;
      skill = 'Systems of linear equations';
      prompt = `A service charges a fixed fee of $${fixed} plus $${cost} per unit. A customer paid $${total}. How many units were billed?`;
      numericAnswer = units;
      explanation = 'Subtract the fixed fee from the total and divide by the per-unit charge.';
      features = ['context-dependent', 'two-step'];
    } else if (skillIndex === 2) {
      const slope = 2 + (index % 5);
      const intercept = 8 + (index % 31);
      const x1 = 2 + (index % 4);
      const y1 = slope * x1 + intercept;
      const x2 = x1 + 3;
      const y2 = slope * x2 + intercept;
      skill = 'Equivalent linear representations';
      prompt = `A line passes through (${x1}, ${y1}) and (${x2}, ${y2}). A second equation represents the same line as y = ${slope}x + b. What is b?`;
      numericAnswer = intercept;
      explanation = 'Use the two given points to identify the slope and then substitute either point to determine the intercept.';
      features = ['representation-shift', 'two-step'];
    } else {
      const coefficient = 3 + (index % 4);
      const constant = 7 + (index % 9);
      const bound = 5 + (index % 6);
      skill = 'Linear inequalities';
      prompt = `A quantity is modeled by ${coefficient}x + ${constant} ≤ ${coefficient * bound + constant}. What is the greatest possible value of x?`;
      numericAnswer = bound;
      explanation = 'Subtract the constant and divide by the positive coefficient; the inequality direction stays unchanged.';
      features = ['constraint-inference'];
    }
  } else if (domain === 'Advanced Math') {
    if (skillIndex === 0) {
      const root = 3 + (index % 8);
      const other = root + 2 + (index % 5);
      const sum = root + other;
      skill = 'Quadratic parameter reasoning';
      prompt = `A quadratic equation has roots ${root} and ${other}. If the equation is written as x² − ${sum}x + k = 0, what is k?`;
      numericAnswer = root * other;
      explanation = 'For a monic quadratic, the constant term equals the product of the roots.';
      features = ['representation-shift', 'constraint-inference'];
    } else if (skillIndex === 1) {
      const base = 2 + (index % 6);
      const exponent = 3 + (index % 7);
      const coefficient = 2 + (index % 5);
      skill = 'Equivalent exponential representations';
      prompt = `The expression ${coefficient}·${base}^(${exponent}x) is equal to ${coefficient}·${base}^${exponent} when x = 1. A second model uses the exponent x + 2 instead. For what value of x is the second model equal to ${coefficient}·${base}^${exponent + 2}?`;
      numericAnswer = 0;
      explanation = 'Set the exponents equal after matching the common base and coefficient.';
      features = ['representation-shift', 'multi-step'];
    } else if (skillIndex === 2) {
      const h = 2 + (index % 11);
      const k = 5 + (index % 37);
      const x = h + 3;
      const value = 9 + k;
      skill = 'Quadratic functions';
      prompt = `A function is f(x) = (x − ${h})² + ${k}. Another point on the graph has x = ${x} and f(x) = ${value}. What is the value of ${k}?`;
      numericAnswer = k;
      explanation = 'Substitute the given x and function value; the squared term is known, allowing the vertical shift to be isolated.';
      features = ['representation-shift', 'constraint-inference'];
    } else {
      const a = 1 + (index % 7);
      const h = 2 + (index % 11);
      skill = 'Quadratic discriminant';
      prompt = `For ${a}x² − ${2 * a * h}x + k = 0, the equation has exactly one real solution. What is k?`;
      numericAnswer = a * h * h;
      explanation = 'Exactly one real solution means the discriminant is zero; solving that condition gives the required constant.';
      features = ['parameter-reasoning', 'constraint-inference', 'multi-step'];
    }
  } else if (domain === 'Problem-Solving and Data Analysis') {
    if (skillIndex === 0) {
      const original = 240 + index * 5;
      const first = 10 + (index % 6);
      const second = 5 + (index % 5);
      const final = original * (1 + first / 100) * (1 - second / 100);
      skill = 'Multi-stage percentages';
      prompt = `A quantity starts at ${original}. It increases by ${first}% and then decreases by ${second}%. What is the resulting quantity?`;
      numericAnswer = Number(final.toFixed(2));
      explanation = 'Apply the two percentage changes successively rather than adding or subtracting the percentages.';
      features = ['context-dependent', 'multi-step', 'strategic-choice'];
    } else if (skillIndex === 1) {
      const groupA = 12 + (index % 8);
      const groupB = 8 + (index % 7);
      const meanA = 14 + (index % 9);
      const meanB = 20 + (index % 8);
      const total = groupA * meanA + groupB * meanB;
      skill = 'Weighted means';
      prompt = `Group A contains ${groupA} observations with mean ${meanA}; Group B contains ${groupB} observations with mean ${meanB}. What is the combined mean?`;
      numericAnswer = Number((total / (groupA + groupB)).toFixed(2));
      explanation = 'Multiply each group size by its mean, add the totals, and divide by the combined number of observations.';
      features = ['data-interpretation', 'multi-step'];
    } else if (skillIndex === 2) {
      const points = [[1, 8 + index], [2, 11 + index], [3, 15 + index], [4, 18 + index], [5, 22 + index]];
      skill = 'Scatterplot interpretation';
      prompt = `A scatterplot has observed values ${points.map((point) => `(${point[0]}, ${point[1]})`).join(', ')}. A linear model is used to describe the trend. Which statement is best supported by the data?`;
      choices = ['The response generally increases as the explanatory variable increases.', 'The response is exactly constant for every value.', 'The response must decrease whenever the explanatory variable increases.', 'The data establish that the explanatory variable causes every change in the response.'];
      numericAnswer = null;
      explanation = 'The plotted values rise overall, although the increase is not perfectly uniform; the data alone do not establish causation.';
      fig = figure('scatter', { points });
      features = ['data-interpretation', 'representation-shift', 'evidence-synthesis'];
    } else {
      const q1 = 12 + (index % 10);
      const q3 = q1 + 16;
      const shift = 4 + (index % 5);
      skill = 'Statistical transformations';
      prompt = `A data set has first quartile ${q1} and third quartile ${q3}. Every value in the data set is increased by ${shift}. What is the new interquartile range?`;
      numericAnswer = q3 - q1;
      explanation = 'Adding the same constant to every observation shifts both quartiles equally, so their difference is unchanged.';
      features = ['constraint-inference'];
    }
  } else {
    if (skillIndex === 0) {
      const outer = 18 + (index % 23);
      const inner = 6 + (index % 11);
      const height = 5 + (index % 13);
      const removedHeight = height - 2;
      skill = 'Composite area';
      prompt = `A rectangular garden is ${outer} meters by ${height} meters. A rectangular section ${inner} meters by ${removedHeight} meters is removed. What is the remaining area, in square meters?`;
      numericAnswer = outer * height - inner * removedHeight;
      explanation = 'Find the area of the full rectangle and subtract the area of the removed rectangle.';
      fig = figure('geometry', { shape: 'composite-rectangle', outer, inner, height });
      features = ['representation-shift', 'multi-step'];
    } else if (skillIndex === 1) {
      const smallLength = 4 + (index % 40);
      const scale = 2 + (index % 4);
      const intermediate = smallLength * scale;
      const smallArea = 12 + (index % 29);
      skill = 'Similarity and area';
      prompt = `Two similar figures have corresponding lengths in the ratio ${scale}:1. A corresponding length on the smaller figure is ${smallLength}. If the smaller figure has area ${smallArea}, what is the larger area?`;
      numericAnswer = smallArea * scale * scale;
      explanation = `Lengths scale by ${scale}; areas scale by ${scale}², so the larger area is ${smallArea} × ${scale}².`;
      fig = figure('geometry', { shape: 'similar-figures', smallLength, scale, intermediate, smallArea });
      features = ['multi-step', 'strategic-choice', 'representation-shift'];
    } else if (skillIndex === 2) {
      const radius = 4 + (index % 41);
      const diameter = radius * 2;
      skill = 'Circle relationships';
      prompt = `A circle has radius ${radius}. If the radius is increased by 3 units, by how many square units does the area increase? Give your answer in terms of π.`;
      numericAnswer = `${6 * radius + 9}π`;
      explanation = 'The area change is π[(r + 3)² − r²] = π(6r + 9).';
      fig = figure('geometry', { shape: 'circle', radius, diameter });
      features = ['multi-step', 'constraint-inference'];
    } else {
      const leg = 6 + (index % 41);
      const hyp = leg + 4;
      const otherSquared = hyp * hyp - leg * leg;
      const other = Math.sqrt(otherSquared);
      skill = 'Right-triangle relationships';
      prompt = `A right triangle has one leg of ${leg} and hypotenuse of ${hyp}. What is the length of the other leg?`;
      numericAnswer = Number(other.toFixed(2));
      explanation = 'Use the Pythagorean theorem and take the positive square root for the unknown leg.';
      fig = figure('geometry', { shape: 'right-triangle', leg, hyp });
      features = ['representation-shift', 'multi-step'];
    }
  }

  const questionType = spr ? 'student-produced-response' : 'multiple-choice';
  if (!spr && !choices.length) {
    const rotated = numericChoices(numericAnswer, index + assessmentNumber);
    choices = rotated.choices;
    numericAnswer = rotated.answer;
  } else if (!spr && choices.length) {
    ({ choices, answer: numericAnswer } = rotateChoices(choices, (index + assessmentNumber) % 4));
  }

  if (spr) prompt = `${prompt}\nEnter your answer as a number.`;
  if (module === 'math-module-2' && route === 'low' && domain === 'Advanced Math') {
    prompt = `${prompt} Use the information provided; no advanced technique beyond the stated relationship is required.`;
  }

  const difficultyFeatures = hard
    ? [...new Set([...features, 'multi-step', 'strategic-choice'])]
    : [...new Set(features)];
  const id = `${testId}-math-rem-${module}-${route}-${String(index + 1).padStart(3, '0')}`;
  const record = {
    contentId: id,
    version: 7,
    product: 'sat',
    questionId: id,
    testId,
    assessmentFamily: variant === 'psat-nmsqt' ? 'psat' : 'sat',
    assessmentVariant: variant,
    assessmentNumber,
    section: 'math',
    module,
    domain,
    skill,
    subskill: construction,
    conceptId: `${domain}-${skill.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    difficulty,
    difficultyBand: `${variant}-${route}-${difficulty}`,
    cognitiveDemand: hard ? 'analyze' : difficulty === 'medium' ? 'analyze' : 'apply',
    questionType,
    stimulusType: fig ? fig.type : 'numeric-text',
    interactionType: questionType === 'student-produced-response' ? 'student-produced-response' : 'single-select',
    timingMode: 'timed',
    estimatedTimeSeconds: hard ? 105 : difficulty === 'medium' ? 90 : 75,
    calculatorEligibility: true,
    calculatorMode: 'desmos-or-basic',
    calculatorRequired: false,
    referenceSheetRelevant: true,
    prompt,
    choices: questionType === 'student-produced-response' ? [] : choices,
    answer: questionType === 'student-produced-response' ? String(numericAnswer) : numericAnswer,
    explanation,
    figure: fig,
    isOperational: false,
    adaptiveRoute: route,
    originalityFingerprint: `batch-m-math-rem-${variant}-${testId}-${index}-${domain}-${construction}`,
    conceptFingerprint: `${domain}-${skill}-${index}`,
    tags: [variant, 'batch-m-remediation-candidate', 'apriori-original', `domain-${domain}`],
    lessonIds: [],
    sourceType: 'apriori-original',
    authoringStatus: 'candidate',
    status: 'candidate',
    releaseEligibility: false,
    metadata: {
      constructionFamily: construction,
      difficultyFeatures,
      difficultyRequirements: DIFFICULTY_REQUIREMENTS[difficulty],
      figurePurpose: fig ? 'question-essential' : null,
      psatCeiling: variant === 'psat-nmsqt' ? PSAT_CEILING_RULES : null,
      candidateOnly: true,
      productionMutation: false,
      sprTarget: MATH_SPR_TARGET,
    },
  };
  return record;
}

export function generateRemediatedMathCandidates(options = {}) {
  const count = Math.max(1, Number(options.count) || 40);
  const candidates = Array.from({ length: count }, (_, index) => buildMath(index, options));
  return {
    candidates,
    quality: candidates.map(evaluateContentQuality),
    studentProducedResponsePercent: Number((candidates.filter((item) => item.questionType === 'student-produced-response').length / candidates.length * 100).toFixed(2)),
    sprTarget: MATH_SPR_TARGET,
    productionMutation: false,
  };
}

export default generateRemediatedMathCandidates;
