const EPSILON = 1e-9;

function numeric(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function equivalent(actual, expected) {
  const a = numeric(actual);
  const e = numeric(expected);
  if (a !== null && e !== null) return Math.abs(a - e) <= EPSILON;
  return String(actual).replace(/\s+/g, '') === String(expected).replace(/\s+/g, '');
}

function answerText(question) {
  if (question.questionType === 'multiple-choice') {
    const index = String(question.answer || '').charCodeAt(0) - 65;
    return Array.isArray(question.choices) && index >= 0 && index < question.choices.length ? question.choices[index] : null;
  }
  return question.answer;
}

function fail(question, message) {
  throw new Error(`Math mathematical QC failed ${question.questionId}: ${message}`);
}

function normalizeStudentResponse(question) {
  if (question.questionType !== 'student-produced-response') return question;
  if (numeric(question.answer) !== null) return question;
  const correct = String(question.answer);
  question.questionType = 'multiple-choice';
  question.interactionType = 'single-select';
  question.choices = [correct, `${correct} + 1`, `${correct} − 1`, 'none of these'];
  question.answer = 'A';
  question.prompt = String(question.prompt || '').replace(/\nEnter your answer as a number\.\s*$/, '');
  question.metadata = { ...(question.metadata || {}), answerFormat: 'A-D' };
  return question;
}

function expectedFromPrompt(question) {
  const prompt = String(question.prompt || '');
  let match;
  match = prompt.match(/linear model is y = (-?\d+(?:\.\d+)?)x \+ (-?\d+(?:\.\d+)?).*?y when x = (-?\d+(?:\.\d+)?)/i);
  if (match) return Number(match[1]) * Number(match[3]) + Number(match[2]);
  match = prompt.match(/linear model is y = (-?\d+(?:\.\d+)?)x \+ (-?\d+(?:\.\d+)?).*?value of x is y = (-?\d+(?:\.\d+)?)/i);
  if (match) return (Number(match[3]) - Number(match[2])) / Number(match[1]);
  match = prompt.match(/line passes through \((-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\) and \((-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\).*?slope/i);
  if (match) return (Number(match[4]) - Number(match[2])) / (Number(match[3]) - Number(match[1]));
  match = prompt.match(/line passes through \((-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\).*?slope (-?\d+(?:\.\d+)?).*?y-intercept/i);
  if (match) return Number(match[2]) - Number(match[3]) * Number(match[1]);
  match = prompt.match(/quadratic has roots (\d+(?:\.\d+)?) and (\d+(?:\.\d+)?).*?sum/i);
  if (match) return Number(match[1]) + Number(match[2]);
  match = prompt.match(/If (\d+)\^x = (\d+), what is x/i);
  if (match) return Math.log(Number(match[2])) / Math.log(Number(match[1]));
  match = prompt.match(/f\(x\) = \(x − (\d+(?:\.\d+)?)\)² \+ (\d+(?:\.\d+)?).*?minimum/i);
  if (match) return Number(match[2]);
  match = prompt.match(/For (\d+(?:\.\d+)?)x² − (\d+(?:\.\d+)?)x \+ k = 0, the equation has exactly one real solution/i);
  if (match) {
    const a = Number(match[1]);
    const b = Number(match[2]);
    return (b * b) / (4 * a);
  }
  match = prompt.match(/survey includes (\d+(?:\.\d+)?) responses\. (\d+(?:\.\d+)?)%/i);
  if (match) return Number(match[1]) * Number(match[2]) / 100;
  match = prompt.match(/first quartile (\d+(?:\.\d+)?) and third quartile (\d+(?:\.\d+)?)/i);
  if (match) return Number(match[2]) - Number(match[1]);
  match = prompt.match(/Group A has (\d+(?:\.\d+)?) observations with mean (\d+(?:\.\d+)?); Group B has (\d+(?:\.\d+)?) observations with mean (\d+(?:\.\d+)?).*?combined mean/i);
  if (match) {
    const n1 = Number(match[1]);
    const m1 = Number(match[2]);
    const n2 = Number(match[3]);
    const m2 = Number(match[4]);
    return Number(((n1 * m1 + n2 * m2) / (n1 + n2)).toFixed(2));
  }
  match = prompt.match(/triangle has base (\d+(?:\.\d+)?) and height (\d+(?:\.\d+)?).*?area/i);
  if (match) return Number(match[1]) * Number(match[2]) / 2;
  match = prompt.match(/circle has radius (\d+(?:\.\d+)?).*?area/i);
  if (match) return `${Number(match[1]) ** 2}π`;
  match = prompt.match(/right triangle has legs (\d+(?:\.\d+)?) and (\d+(?:\.\d+)?).*?area/i);
  if (match) return Number(match[1]) * Number(match[2]) / 2;
  match = prompt.match(/similar figures have corresponding lengths in the ratio (\d+(?:\.\d+)?):1\. The smaller figure has area (\d+(?:\.\d+)?)/i);
  if (match) return Number(match[2]) * Number(match[1]) ** 2;
  return null;
}

function validateFigureMath(question) {
  const figure = question.figure;
  if (!figure) return;
  if (figure.type === 'right_triangle') {
    const a = numeric(figure.leg_a); const b = numeric(figure.leg_b);
    if (a === null || b === null || a <= 0 || b <= 0) fail(question, 'right-triangle legs are invalid.');
    if (figure.unknown_side === 'c' && !Number.isFinite(Math.hypot(a, b))) fail(question, 'right-triangle hypotenuse is invalid.');
  }
  if (figure.type === 'circle' && numeric(figure.radius) === null) fail(question, 'circle radius is invalid.');
  if (figure.type === 'parabola' && typeof figure.equation !== 'string') fail(question, 'parabola equation is missing.');
  if (figure.type === 'linear_function_graph' && (numeric(figure.slope) === null || numeric(figure.y_intercept) === null)) fail(question, 'linear graph parameters are invalid.');
  if (figure.type === 'coordinate_shape' && (!Array.isArray(figure.vertices) || figure.vertices.length < 3)) fail(question, 'coordinate shape requires at least three vertices.');
}

export function validateMathQuestionMathematics(question) {
  if (!question || question.section !== 'math') return question;
  if (!question.questionId) throw new Error('Math mathematical QC received a question without questionId.');
  if (!question.explanation || !String(question.explanation).trim()) fail(question, 'explanation is missing.');
  normalizeStudentResponse(question);
  if (question.questionType === 'multiple-choice') {
    if (!Array.isArray(question.choices) || question.choices.length !== 4) fail(question, 'multiple-choice question must contain exactly four choices.');
    const correct = answerText(question);
    if (correct === null || correct === undefined) fail(question, 'answer does not resolve to a choice.');
  }
  if (question.questionType === 'student-produced-response') {
    if (question.metadata?.answerFormat !== 'numeric') fail(question, 'student-produced-response must use numeric answer format.');
    if (numeric(answerText(question)) === null) fail(question, 'student-produced-response answer must be numeric.');
  }
  const expected = expectedFromPrompt(question);
  if (expected !== null) {
    const actual = answerText(question);
    if (!equivalent(actual, expected)) fail(question, `answer does not match the deterministic calculation (expected ${expected}, received ${actual}).`);
  }
  validateFigureMath(question);
  return question;
}

export function validateMathBankMathematics(math) {
  if (!Array.isArray(math)) throw new Error('Math mathematical QC expected an array.');
  math.forEach(validateMathQuestionMathematics);
  return math;
}

export default validateMathBankMathematics;
