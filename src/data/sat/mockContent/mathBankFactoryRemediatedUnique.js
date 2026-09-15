import { generateRemediatedMathCandidates as generateBaseMathCandidates } from './mathBankFactoryRemediated.js';

function rotateChoices(choices, target) {
  const out = [...choices];
  const correct = out.shift();
  out.splice(target, 0, correct);
  return { choices: out, answer: String.fromCharCode(65 + target) };
}

function setNumericQuestion(question, prompt, correct, occurrence) {
  const numericCorrect = Number(correct);
  if (!Number.isFinite(numericCorrect)) return { ...question, prompt };

  if (question.questionType === 'student-produced-response') {
    return { ...question, prompt: `${prompt}\nEnter your answer as a number.`, answer: String(numericCorrect) };
  }

  const wrong = [
    String(numericCorrect + 1),
    String(Math.max(0, numericCorrect - 1)),
    String(numericCorrect * 2),
  ];
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

  return question;
}

export function generateRemediatedMathCandidatesUnique(options = {}) {
  const result = generateBaseMathCandidates(options);
  const skillOccurrences = {};

  const candidates = result.candidates.map((candidate) => {
    if (candidate.figure) return candidate;
    const skill = String(candidate.skill || '');
    const occurrence = skillOccurrences[skill] || 0;
    skillOccurrences[skill] = occurrence + 1;
    return remapStrategicCandidate(candidate, occurrence);
  });

  return {
    ...result,
    candidates,
    quality: candidates.map((candidate) => candidate),
  };
}

export default generateRemediatedMathCandidatesUnique;
