// Batch M canonical figure-type remediation
import { generateRemediatedMathCandidates as generateBaseMathCandidates } from './mathBankFactoryRemediated.js';
import { DIFFICULTY_REQUIREMENTS, PSAT_CEILING_RULES } from './batchMRemediationBlueprint.js';

function rotateChoices(choices, target) {
  const out = [...choices];
  const correct = out.shift();
  out.splice(target, 0, correct);
  return { choices: out, answer: String.fromCharCode(65 + target) };
}

function safeNumericDistractors(numericCorrect, occurrence) {
  const forbidden = new Set([
    numericCorrect + 1,
    numericCorrect - 1,
    numericCorrect * 2,
  ].map((value) => Number(value)));
  const candidates = [
    numericCorrect + 3 + (occurrence % 5),
    numericCorrect - 4 - (occurrence % 4),
    numericCorrect + 7 + (occurrence % 6),
    numericCorrect * 1.5 + 5 + (occurrence % 3),
    numericCorrect - 8 - (occurrence % 5),
    numericCorrect * 0.5 - 3 - (occurrence % 4),
  ];

  const selected = [];
  for (const candidate of candidates) {
    if (!Number.isFinite(candidate) || candidate === numericCorrect || forbidden.has(candidate)) continue;
    if (selected.some((value) => value === candidate)) continue;
    selected.push(candidate);
    if (selected.length === 3) break;
  }

  return selected.map((value) => String(Number(value.toFixed(2))));
}

function setNumericQuestion(question, prompt, correct, occurrence) {
  const numericCorrect = Number(correct);
  if (!Number.isFinite(numericCorrect)) return { ...question, prompt };

  if (question.questionType === 'student-produced-response') {
    return { ...question, prompt: `${prompt}\nEnter your answer as a number.`, answer: String(numericCorrect) };
  }

  const wrong = safeNumericDistractors(numericCorrect, occurrence);
  if (wrong.length < 3) return { ...question, prompt };
  const rotated = rotateChoices([String(numericCorrect), ...wrong], occurrence % 4);
  return { ...question, prompt, choices: rotated.choices, answer: rotated.answer };
}

function remapStrategicCandidate(question, occurrence) {
  const skill = String(question.skill || '');
  const o = Number(occurrence) || 0;

  if (skill === 'Linear inequalities') {
    const coefficient = 3 + (o % 7);
    const constant = 7 + (o % 31);
    const bound = 5 + o;
    const rhs = coefficient * bound + constant;
    const prompt = `A quantity is modeled by ${coefficient}x + ${constant} ≤ ${rhs}. What is the greatest possible value of x?`;
    return setNumericQuestion(question, prompt, bound, o);
  }

  if (skill === 'Quadratic parameter reasoning') {
    const root = 3 + o;
    const other = root + 2 + (o % 5);
    const sum = root + other;
    const correct = root * other;
    const prompt = `A quadratic equation has roots ${root} and ${other}. If the equation is written as x² − ${sum}x + k = 0, what is k?`;
    return setNumericQuestion(question, prompt, correct, o);
  }

  if (skill === 'Equivalent exponential representations') {
    const base = 2 + (o % 9);
    const exponent = 3 + (o % 11);
    const coefficient = 2 + (o % 7);
    const prompt = `The expression ${coefficient}·${base}^(${exponent}x) is equal to ${coefficient}·${base}^${exponent} when x = 1. A second model uses the exponent x + 2 instead. For what value of x is the second model equal to ${coefficient}·${base}^${exponent + 2}?`;
    return setNumericQuestion(question, prompt, 0, o);
  }

  if (skill === 'Quadratic functions') {
    const h = 2 + o;
    const k = 5 + (o % 37);
    const x = h + 3;
    const value = 9 + k;
    const prompt = `A function is f(x) = (x − ${h})² + ${k}. Another point on the graph has x = ${x} and f(x) = ${value}. What is the value of ${k}?`;
    return setNumericQuestion(question, prompt, k, o);
  }

  if (skill === 'Quadratic discriminant') {
    const a = 1 + (o % 7);
    const h = 2 + o;
    const correct = a * h * h;
    const prompt = `For ${a}x² − ${2 * a * h}x + k = 0, the equation has exactly one real solution. What is k?`;
    return setNumericQuestion(question, prompt, correct, o);
  }

  if (skill === 'Weighted means') {
    const groupA = 12 + o;
    const groupB = 8 + (o % 19);
    const meanA = 14 + (o % 23);
    const meanB = 20 + ((o * 3) % 29);
    const total = groupA * meanA + groupB * meanB;
    const correct = Number((total / (groupA + groupB)).toFixed(2));
    const prompt = `Group A contains ${groupA} observations with mean ${meanA}; Group B contains ${groupB} observations with mean ${meanB}. What is the combined mean?`;
    return setNumericQuestion(question, prompt, correct, o);
  }

  if (skill === 'Statistical transformations') {
    const q1 = 12 + o;
    const q3 = q1 + 16;
    const shift = 4 + (o % 5);
    const prompt = `A data set has first quartile ${q1} and third quartile ${q3}. Every value in the data set is increased by ${shift}. What is the new interquartile range?`;
    return setNumericQuestion(question, prompt, 16, o);
  }


  // Batch M zero-coverage strategic figure remediation
  if (skill === 'Quadratic functions' || skill === 'Quadratic functions and representations') {
    const h = 2 + (o % 11);
    const k = 5 + (o % 37);
    const a = 1;
    const b = -2 * h;
    const c = h * h + k;
    return { ...question, figure: { type: 'parabola', a, b, c, values: { a, b, c } } };
  }

  if (skill === 'Data models') {
    const x = [1, 2, 3, 4, 5];
    const y = x.map((value) => 8 + value * 3 + (o % 4));
    return { ...question, figure: { type: 'table', columns: ['x', 'y'], rows: x.map((value, index) => [value, y[index]]) } };
  }

  if (skill === 'Right triangles') {
    const leg = 6 + o;
    const other = 8 + (o % 9);
    return { ...question, figure: { type: 'geometry', values: { shape: 'right-triangle', x: leg, y: other } } };
  }
  return question;
}

function remapFigureCandidate(question, occurrence) {
  const skill = String(question.skill || '');
  const o = Number(occurrence) || 0;

  if (skill === 'Composite area') {
    const outer = 18 + (o % 23);
    const inner = 6 + (o % 11);
    const height = 5 + (o % 13);
    const removedHeight = height - 2;
    const correct = outer * height - inner * removedHeight;
    const prompt = `A rectangular garden is ${outer} meters by ${height} meters. A rectangular section ${inner} meters by ${removedHeight} meters is removed. What is the remaining area, in square meters?`;
    return {
      ...setNumericQuestion(question, prompt, correct, o),
      figure: { type: 'geometry', values: { shape: 'composite-rectangle', outer, inner, height } },
    };
  }

  if (skill === 'Similarity and area') {
    const smallLength = 4 + (o % 40);
    const scale = 2 + (o % 4);
    const intermediate = smallLength * scale;
    const smallArea = 12 + (o % 29);
    const correct = smallArea * scale * scale;
    const prompt = `Two similar figures have corresponding lengths in the ratio ${scale}:1. A corresponding length on the smaller figure is ${smallLength}. What is the corresponding length on the larger figure? Then, if the smaller figure has area ${smallArea}, what is the larger area?`;
    return {
      ...setNumericQuestion(question, prompt, correct, o),
      figure: { type: 'geometry', values: { shape: 'similar-figures', smallLength, scale, intermediate, smallArea } },
    };
  }

  if (skill === 'Circle relationships') {
    const radius = 4 + o;
    const diameter = radius * 2;
    const correct = `${6 * radius + 9}π`;
    const prompt = `A circle has radius ${radius}. A chord through the center has length ${diameter}. If the radius is increased by 3 units, by how many square units does the area increase? Give your answer in terms of π.`;
    if (question.questionType === 'student-produced-response') {
      return { ...question, prompt: `${prompt}\nEnter your answer as a number.`, answer: correct, figure: { type: 'geometry', values: { shape: 'circle', radius, diameter } } };
    }
    const distractors = [`${radius * radius}π`, `${3 * radius + 9}π`, `${2 * radius}π`];
    const rotated = rotateChoices([correct, ...distractors], o % 4);
    return { ...question, prompt, choices: rotated.choices, answer: rotated.answer, figure: { type: 'geometry', values: { shape: 'circle', radius, diameter } } };
  }

  if (skill === 'Right-triangle relationships') {
    const leg = 6 + o;
    const hyp = leg + 4;
    const otherSquared = hyp * hyp - leg * leg;
    const correct = Number(Math.sqrt(otherSquared).toFixed(2));
    const prompt = `A right triangle has one leg of ${leg} and hypotenuse of ${hyp}. What is the length of the other leg?`;
    return {
      ...setNumericQuestion(question, prompt, correct, o),
      figure: { type: 'right_triangle', values: { x: leg, y: correct } },
    };
  }

  if (skill === 'Scatterplot interpretation') {
    const base = 8 + o;
    const points = [
      [1, base],
      [2, base + 3 + (o % 4)],
      [3, base + 7 + (o % 5)],
      [4, base + 10 + (o % 6)],
      [5, base + 14 + (o % 7)],
    ];
    const prompt = `A scatterplot has observed values ${points.map((point) => `(${point[0]}, ${point[1]})`).join(', ')}. A linear model is used to describe the trend. Which statement is best supported by the data?`;
    const choices = [
      'The response generally increases as the explanatory variable increases.',
      'The response is exactly constant for every value.',
      'The response must decrease whenever the explanatory variable increases.',
      'The data establish that the explanatory variable causes every change in the response.',
    ];
    const rotated = rotateChoices(choices, o % 4);
    return {
      ...question,
      questionType: 'multiple-choice',
      interactionType: 'single-select',
      prompt,
      choices: rotated.choices,
      answer: rotated.answer,
      figure: { type: 'scatter_plot', values: { points } },
    };
  }


  // Batch M coverage remediation: figure variants for zero/low-coverage target families.
  if (skill === 'Quadratic functions') {
    const h = 2 + (o % 11);
    const k = 5 + (o % 37);
    const a = 1;
    const b = -2 * h;
    const c = h * h + k;
    return {
      ...question,
      figure: {
        type: 'parabola',
        a,
        b,
        c,
        values: { a, b, c },
      },
    };
  }

  if (skill === 'Scatterplot interpretation') {
    const base = 8 + o;
    const points = [
      [1, base],
      [2, base + 3 + (o % 4)],
      [3, base + 7 + (o % 5)],
      [4, base + 10 + (o % 6)],
      [5, base + 14 + (o % 7)],
    ];
    const displayTypes = ['scatter_plot', 'line_chart', 'bar_chart', 'table'];
    const displayType = displayTypes[o % displayTypes.length];
    let figure;
    if (displayType === 'scatter') figure = { type: 'scatter_plot', points };
    else if (displayType === 'line_chart') figure = { type: 'line_chart', x: points.map((point) => point[0]), y: points.map((point) => point[1]) };
    else if (displayType === 'bar_chart') figure = { type: 'bar_chart', categories: points.map((point) => String(point[0])), values: points.map((point) => point[1]) };
    else figure = { type: 'table', columns: ['x', 'y'], rows: points.map((point) => [point[0], point[1]]) };
    return { ...question, figure };
  }
  return question;
}

function isNumericAnswer(value) {
  return /^-?\d+(?:\.\d+)?$/.test(String(value ?? '').trim())
    || /^-?\d+(?:\.\d+)?π$/.test(String(value ?? '').trim());
}

function toMultipleChoice(question, occurrence) {
  if (question.questionType !== 'student-produced-response' || !isNumericAnswer(question.answer)) return question;
  const answerText = String(question.answer);
  const numeric = Number(answerText.replace(/π$/, ''));
  const suffix = answerText.endsWith('π') ? 'π' : '';
  if (!Number.isFinite(numeric)) return question;
  const distractors = [numeric + 1, Math.max(0, numeric - 1), numeric * 2].map((value) => `${Number(value.toFixed(2))}${suffix}`);
  const rotated = rotateChoices([answerText, ...distractors], occurrence % 4);
  return { ...question, questionType: 'multiple-choice', interactionType: 'single-select', prompt: String(question.prompt).replace(/\nEnter your answer as a number\.$/, ''), choices: rotated.choices, answer: rotated.answer };
}

function toStudentProducedResponse(question) {
  if (question.questionType !== 'multiple-choice' || !Array.isArray(question.choices) || question.choices.length !== 4) return question;
  const answerIndex = String(question.answer || 'A').charCodeAt(0) - 65;
  if (answerIndex < 0 || answerIndex > 3) return question;
  const correct = question.choices[answerIndex];
  if (!isNumericAnswer(correct)) return question;
  return { ...question, questionType: 'student-produced-response', interactionType: 'student-produced-response', prompt: `${String(question.prompt).replace(/\nEnter your answer as a number\.$/, '')}\nEnter your answer as a number.`, choices: [], answer: correct };
}

function rebalanceDifficultyAndInteraction(question, occurrence) {
  const variant = String(question.assessmentVariant || 'sat');
  let difficulty = ['easy', 'medium', 'medium', 'hard'][occurrence % 4];
  if (variant === 'psat-nmsqt' && difficulty === 'hard' && ['Advanced Math', 'Geometry and Trigonometry'].includes(question.domain)) {
    difficulty = 'medium';
  }
  const features = new Set(question.metadata?.difficultyFeatures || []);
  if (difficulty === 'medium') features.add('careful-interpretation');
  if (difficulty === 'hard') {
    features.add('multi-step');
    features.add('strategic-choice');
  }
  let next = {
    ...question,
    difficulty,
    difficultyBand: `${variant}-${question.adaptiveRoute || 'standard'}-${difficulty}`,
    cognitiveDemand: difficulty === 'easy' ? 'apply' : 'analyze',
    estimatedTimeSeconds: difficulty === 'hard' ? 105 : difficulty === 'medium' ? 90 : 75,
    metadata: {
      ...question.metadata,
      difficultyFeatures: [...features],
      difficultyRequirements: DIFFICULTY_REQUIREMENTS[difficulty],
      psatCeiling: variant === 'psat-nmsqt' ? PSAT_CEILING_RULES : question.metadata?.psatCeiling || null,
    },
  };

  if (next.questionType === 'student-produced-response' && Array.isArray(next.choices) && next.choices.length === 4) {
    const existingAnswerIndex = String(next.answer || '').charCodeAt(0) - 65;
    if (existingAnswerIndex >= 0 && existingAnswerIndex < 4) {
      next = { ...next, questionType: 'multiple-choice', interactionType: 'single-select' };
    }
  }

  const answerIndex = String(next.answer || 'A').charCodeAt(0) - 65;
  const correctChoice = next.questionType === 'multiple-choice' && answerIndex >= 0
    ? next.choices?.[answerIndex]
    : next.answer;
  const canBeSpr = next.questionType === 'student-produced-response'
    || (next.questionType === 'multiple-choice' && isNumericAnswer(correctChoice));
  const wantSpr = occurrence % 4 === 0 && canBeSpr;
  next = wantSpr ? toStudentProducedResponse(next) : toMultipleChoice(next, occurrence);
  return next;
}

export function generateRemediatedMathCandidatesUnique(options = {}) {
  const result = generateBaseMathCandidates(options);
  const skillOccurrences = {};

  const candidates = result.candidates.map((candidate) => {
    const skill = String(candidate.skill || '');
    const occurrence = skillOccurrences[skill] || 0;
    skillOccurrences[skill] = occurrence + 1;
    const remapped = candidate.figure
      ? remapFigureCandidate(candidate, occurrence)
      : remapStrategicCandidate(candidate, occurrence);
    return rebalanceDifficultyAndInteraction(remapped, occurrence);
  });

  return {
    ...result,
    candidates,
    quality: candidates.map((candidate) => candidate),
  };
}

export default generateRemediatedMathCandidatesUnique;
