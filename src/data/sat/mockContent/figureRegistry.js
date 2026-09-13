const FIGURE_SPECS = Object.freeze({
  bar_chart: Object.freeze({ required: ['x_labels', 'series'] }),
  line_chart: Object.freeze({ required: ['x_labels', 'series'] }),
  scatter_plot: Object.freeze({ required: ['points'] }),
  table: Object.freeze({ required: ['headers', 'rows'] }),
  number_line: Object.freeze({ required: ['min', 'max', 'marked_points'] }),
  right_triangle: Object.freeze({ required: ['leg_a', 'leg_b', 'labels', 'unknown_side'] }),
  general_triangle: Object.freeze({ required: ['side_lengths', 'angles', 'labels'] }),
  circle: Object.freeze({ required: ['radius', 'center_label'] }),
  parabola: Object.freeze({ required: ['equation', 'x_range'] }),
  linear_function_graph: Object.freeze({ required: ['slope', 'y_intercept', 'x_range'] }),
  coordinate_shape: Object.freeze({ required: ['vertices', 'shape_name', 'show_gridlines'] }),
  '3d_solid': Object.freeze({ required: ['solid_type', 'dimensions', 'labels'] }),
  multi_source_table: Object.freeze({ required: ['sources'], future: true }),
  geometry: Object.freeze({ required: [] }),
});

const LEGACY_ALIASES = Object.freeze({
  line: 'line_chart',
  scatter: 'scatter_plot',
  quadratic: 'parabola',
  geometry: 'geometry',
});

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isFiniteNumber(value) {
  return Number.isFinite(Number(value));
}

function validateNumericArray(values, label, errors) {
  if (!Array.isArray(values) || !values.length) {
    errors.push(`${label} must be a non-empty array.`);
    return;
  }
  if (values.some((value) => !isFiniteNumber(value))) errors.push(`${label} must contain only finite numbers.`);
}

function validateSeries(type, figure, errors) {
  if (!Array.isArray(figure.x_labels) || !figure.x_labels.length) errors.push(`${type}.x_labels must be a non-empty array.`);
  if (!Array.isArray(figure.series) || !figure.series.length) {
    errors.push(`${type}.series must be a non-empty array.`);
    return;
  }
  const labelCount = Array.isArray(figure.x_labels) ? figure.x_labels.length : 0;
  figure.series.forEach((series, index) => {
    if (!isObject(series)) {
      errors.push(`${type}.series[${index}] must be an object.`);
      return;
    }
    if (typeof series.name !== 'string' || !series.name.trim()) errors.push(`${type}.series[${index}].name must be a non-empty string.`);
    validateNumericArray(series.values, `${type}.series[${index}].values`, errors);
    if (Array.isArray(series.values) && series.values.length !== labelCount) errors.push(`${type}.series[${index}].values length must equal x_labels length.`);
  });
  if (figure.x_axis_title !== undefined && typeof figure.x_axis_title !== 'string') errors.push(`${type}.x_axis_title must be a string when provided.`);
  if (figure.y_axis_title !== undefined && typeof figure.y_axis_title !== 'string') errors.push(`${type}.y_axis_title must be a string when provided.`);
}

function validateTable(figure, errors) {
  if (!Array.isArray(figure.headers) || !figure.headers.length) errors.push('table.headers must be a non-empty array.');
  if (!Array.isArray(figure.rows) || !figure.rows.length) errors.push('table.rows must be a non-empty array.');
  if (Array.isArray(figure.headers) && figure.headers.some((header) => typeof header !== 'string')) errors.push('table.headers must contain strings.');
  if (Array.isArray(figure.rows)) {
    const width = Array.isArray(figure.headers) ? figure.headers.length : 0;
    figure.rows.forEach((row, index) => {
      if (!Array.isArray(row)) errors.push(`table.rows[${index}] must be an array.`);
      else if (row.length !== width) errors.push(`table.rows[${index}] length must equal headers length.`);
    });
  }
}

function validateLegacyFigure(rawType, figure, errors) {
  if (rawType === 'line') {
    if (!Array.isArray(figure.x) || !Array.isArray(figure.y)) errors.push('Legacy line figures require x and y arrays.');
    if (Array.isArray(figure.x) && Array.isArray(figure.y) && figure.x.length !== figure.y.length) errors.push('Legacy line x/y arrays must have equal lengths.');
    if (Array.isArray(figure.x)) validateNumericArray(figure.x, 'Legacy line.x', errors);
    if (Array.isArray(figure.y)) validateNumericArray(figure.y, 'Legacy line.y', errors);
  }
  if (rawType === 'scatter') {
    if (!Array.isArray(figure.points)) errors.push('Legacy scatter figures require a points array.');
  }
  if (rawType === 'quadratic') {
    if (!isFiniteNumber(figure.a) || !isFiniteNumber(figure.b) || !isFiniteNumber(figure.c)) errors.push('Legacy quadratic figures require numeric a, b and c.');
  }
  if (rawType === 'geometry' && !isObject(figure.values || {})) errors.push('Legacy geometry figures require a values object.');
}

function validateStructuredFigure(figure) {
  if (!isObject(figure)) return { valid: false, errors: ['Figure must be an object.'], canonicalType: null };
  const rawType = String(figure.type || figure.figure_type || '').trim();
  const canonicalType = LEGACY_ALIASES[rawType] || rawType;
  const spec = FIGURE_SPECS[canonicalType];
  if (!spec) return { valid: false, errors: [`Unsupported figure type: ${rawType || 'missing'}.`], canonicalType };

  const errors = [];
  if (Object.prototype.hasOwnProperty.call(LEGACY_ALIASES, rawType)) validateLegacyFigure(rawType, figure, errors);
  else {
    for (const field of spec.required) if (!(field in figure)) errors.push(`Missing figure field: ${field}.`);
    if (canonicalType === 'bar_chart' || canonicalType === 'line_chart') validateSeries(canonicalType, figure, errors);
    if (canonicalType === 'scatter_plot') {
      if (!Array.isArray(figure.points) || !figure.points.length) errors.push('scatter_plot.points must be a non-empty array.');
      if (Array.isArray(figure.points) && figure.points.some((point) => !isObject(point) || !isFiniteNumber(point.x) || !isFiniteNumber(point.y))) errors.push('scatter_plot.points must contain numeric x/y objects.');
      if (figure.trend_line !== undefined && typeof figure.trend_line !== 'boolean') errors.push('scatter_plot.trend_line must be boolean when provided.');
      if (figure.x_axis_title !== undefined && typeof figure.x_axis_title !== 'string') errors.push('scatter_plot.x_axis_title must be a string when provided.');
      if (figure.y_axis_title !== undefined && typeof figure.y_axis_title !== 'string') errors.push('scatter_plot.y_axis_title must be a string when provided.');
    }
    if (canonicalType === 'table') validateTable(figure, errors);
    if (canonicalType === 'number_line') {
      if (!isFiniteNumber(figure.min)) errors.push('number_line.min must be numeric.');
      if (!isFiniteNumber(figure.max)) errors.push('number_line.max must be numeric.');
      if (isFiniteNumber(figure.min) && isFiniteNumber(figure.max) && Number(figure.min) >= Number(figure.max)) errors.push('number_line.min must be less than max.');
    }
    if (canonicalType === 'circle' && !isFiniteNumber(figure.radius)) errors.push('circle.radius must be numeric.');
    if (canonicalType === 'parabola' && typeof figure.equation !== 'string') errors.push('parabola.equation must be a string.');
    if (canonicalType === 'linear_function_graph' && !isFiniteNumber(figure.slope)) errors.push('linear_function_graph.slope must be numeric.');
    if (canonicalType === 'linear_function_graph' && !isFiniteNumber(figure.y_intercept)) errors.push('linear_function_graph.y_intercept must be numeric.');
  }
  return { valid: errors.length === 0, errors, canonicalType, future: Boolean(spec.future) };
}

function normalizeFigure(figure) {
  if (!isObject(figure)) return null;
  const rawType = String(figure.type || figure.figure_type || '').trim();
  const canonicalType = LEGACY_ALIASES[rawType] || rawType;
  return { ...figure, type: rawType, figureType: canonicalType, validation: validateStructuredFigure(figure) };
}

const RENDERERS = new Map();

export function registerFigureRenderer(figureType, renderer) {
  if (!FIGURE_SPECS[figureType]) throw new Error(`Cannot register unknown figure type: ${figureType}`);
  if (typeof renderer !== 'function') throw new Error(`Renderer for ${figureType} must be a function.`);
  RENDERERS.set(figureType, renderer);
}

export function getFigureRenderer(figureType) { return RENDERERS.get(figureType) || null; }
export function getFigureSpec(figureType) { return FIGURE_SPECS[figureType] || null; }
export function normalizeMathFigure(figure) { return normalizeFigure(figure); }
export { FIGURE_SPECS, LEGACY_ALIASES, validateStructuredFigure };
