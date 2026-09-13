import { validateStructuredFigure } from './figureRegistry';

const ALLOWED = new Set([
  'line', 'line_chart', 'scatter', 'scatter_plot', 'bar_chart', 'table',
  'quadratic', 'parabola', 'geometry',
  'right_triangle', 'general_triangle', 'circle', 'linear_function_graph',
  'coordinate_shape',
]);

function stable(value) {
  if (value === null || value === undefined) return '';
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  if (typeof value === 'object') return `{${Object.keys(value).sort().map((key) => `${key}:${stable(value[key])}`).join('|')}}`;
  return String(value);
}

function validateMockFigures(mock) {
  const seen = new Set();
  const typeCounts = {};
  const normalize = (question) => {
    if (!question.figure) return question;
    const visualVariant = String(question.questionId || 'question').replace(/[^a-zA-Z0-9_-]/g, '-');
    const figure = { ...question.figure, visualVariant };
    const structural = validateStructuredFigure(figure);
    if (!structural.valid) throw new Error(`Invalid structured Math figure ${question.questionId}: ${structural.errors.join(' ')}`);
    const signature = stable(figure);
    if (seen.has(signature)) throw new Error(`Duplicate Math figure detected after visual-variant normalization: ${question.questionId}`);
    seen.add(signature);
    typeCounts[figure.type] = (typeCounts[figure.type] || 0) + 1;

    if (question.section !== 'math') throw new Error(`Figure assigned outside Math: ${question.questionId}`);
    if (!ALLOWED.has(figure.type)) throw new Error(`Unsupported figure type ${figure.type}: ${question.questionId}`);
    if (question.metadata?.figurePurpose !== 'question-essential') throw new Error(`Math figure is not marked question-essential: ${question.questionId}`);

    const geometryTypes = ['geometry', 'table', 'right_triangle', 'general_triangle', 'circle', 'coordinate_shape'];
    const dataTypes = ['scatter', 'scatter_plot', 'line', 'line_chart', 'bar_chart', 'table'];
    const advancedTypes = ['quadratic', 'parabola', 'line', 'line_chart', 'bar_chart', 'table', 'coordinate_shape'];
    const algebraTypes = ['line', 'line_chart', 'bar_chart', 'table', 'coordinate_shape'];
    if (question.domain === 'Geometry and Trigonometry' && !geometryTypes.includes(figure.type)) throw new Error(`Geometry question has mismatched figure: ${question.questionId}`);
    if (question.domain === 'Problem-Solving and Data Analysis' && !dataTypes.includes(figure.type)) throw new Error(`Data-analysis question has mismatched figure: ${question.questionId}`);
    if (question.domain === 'Advanced Math' && !advancedTypes.includes(figure.type)) throw new Error(`Advanced Math question has mismatched figure: ${question.questionId}`);
    if (question.domain === 'Algebra' && !algebraTypes.includes(figure.type)) throw new Error(`Algebra question has mismatched figure: ${question.questionId}`);
    return { ...question, figure };
  };

  const readingWriting = (mock.readingWriting || []).map((question) => {
    if (question.figure) throw new Error(`R&W question must not use a Math figure: ${question.questionId}`);
    return question;
  });
  const math = (mock.math || []).map(normalize);
  return { ...mock, readingWriting, math, figureQuality: { count: seen.size, typeCounts } };
}

export function validateMockFigureQuality(psat, sat) {
  return { psat: validateMockFigures(psat), sat: validateMockFigures(sat) };
}

export default validateMockFigureQuality;
