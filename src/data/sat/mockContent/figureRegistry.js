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

const LEGACY_ALIASES = Object.freeze({ line: 'line_chart', scatter: 'scatter_plot', quadratic: 'parabola', geometry: 'geometry' });
const SOLID_TYPES = new Set(['cube', 'rectangular_prism', 'cuboid', 'cylinder', 'sphere', 'cone']);

function isObject(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
function isFiniteNumber(value) { return Number.isFinite(Number(value)); }
function positiveNumber(value) { return isFiniteNumber(value) && Number(value) > 0; }
function validateNumericArray(values, label, errors) { if (!Array.isArray(values) || !values.length) { errors.push(`${label} must be a non-empty array.`); return; } if (values.some((value) => !isFiniteNumber(value))) errors.push(`${label} must contain only finite numbers.`); }
function validateSeries(type, figure, errors) {
  if (!Array.isArray(figure.x_labels) || !figure.x_labels.length) errors.push(`${type}.x_labels must be a non-empty array.`);
  if (!Array.isArray(figure.series) || !figure.series.length) { errors.push(`${type}.series must be a non-empty array.`); return; }
  const labelCount = Array.isArray(figure.x_labels) ? figure.x_labels.length : 0;
  figure.series.forEach((series, index) => {
    if (!isObject(series)) { errors.push(`${type}.series[${index}] must be an object.`); return; }
    if (typeof series.name !== 'string' || !series.name.trim()) errors.push(`${type}.series[${index}].name must be a non-empty string.`);
    validateNumericArray(series.values, `${type}.series[${index}].values`, errors);
    if (Array.isArray(series.values) && series.values.length !== labelCount) errors.push(`${type}.series[${index}].values length must equal x_labels length.`);
  });
}
function validateTable(figure, errors) {
  if (!Array.isArray(figure.headers) || !figure.headers.length) errors.push('table.headers must be a non-empty array.');
  if (!Array.isArray(figure.rows) || !figure.rows.length) errors.push('table.rows must be a non-empty array.');
  if (Array.isArray(figure.headers) && figure.headers.some((header) => typeof header !== 'string')) errors.push('table.headers must contain strings.');
  if (Array.isArray(figure.rows)) { const width = Array.isArray(figure.headers) ? figure.headers.length : 0; figure.rows.forEach((row, index) => { if (!Array.isArray(row)) errors.push(`table.rows[${index}] must be an array.`); else if (row.length !== width) errors.push(`table.rows[${index}] length must equal headers length.`); }); }
}
function validateRightTriangle(figure, errors) {
  if (!positiveNumber(figure.leg_a)) errors.push('right_triangle.leg_a must be a positive number.');
  if (!positiveNumber(figure.leg_b)) errors.push('right_triangle.leg_b must be a positive number.');
  if (!isObject(figure.labels)) errors.push('right_triangle.labels must be an object.');
  if (!['a', 'b', 'c'].includes(String(figure.unknown_side))) errors.push('right_triangle.unknown_side must be a, b, or c.');
  if (figure.unknown_side === 'c' && positiveNumber(figure.leg_a) && positiveNumber(figure.leg_b)) { const c = Math.hypot(Number(figure.leg_a), Number(figure.leg_b)); if (!Number.isFinite(c)) errors.push('right_triangle hypotenuse calculation is invalid.'); }
}
function validateGeneralTriangle(figure, errors) {
  if (!Array.isArray(figure.side_lengths) || figure.side_lengths.length !== 3) errors.push('general_triangle.side_lengths must contain exactly three entries.');
  if (!Array.isArray(figure.angles) || figure.angles.length !== 3) errors.push('general_triangle.angles must contain exactly three entries.');
  if (!isObject(figure.labels)) errors.push('general_triangle.labels must be an object.');
  const sides = Array.isArray(figure.side_lengths) ? figure.side_lengths : [];
  const knownSides = sides.filter((value) => value !== null && value !== undefined).map(Number);
  if (knownSides.some((value) => !Number.isFinite(value) || value <= 0)) errors.push('general_triangle.side_lengths must contain positive numbers or null.');
  if (knownSides.length === 3 && !(knownSides[0] + knownSides[1] > knownSides[2] && knownSides[0] + knownSides[2] > knownSides[1] && knownSides[1] + knownSides[2] > knownSides[0])) errors.push('general_triangle.side_lengths violate the triangle inequality.');
  const angles = Array.isArray(figure.angles) ? figure.angles : [];
  const knownAngles = angles.filter((value) => value !== null && value !== undefined).map(Number);
  if (knownAngles.some((value) => !Number.isFinite(value) || value <= 0 || value >= 180)) errors.push('general_triangle.angles must contain values between 0 and 180 degrees or null.');
  if (knownAngles.length === 3 && Math.abs(knownAngles.reduce((sum, value) => sum + value, 0) - 180) > 1e-9) errors.push('general_triangle.angles must sum to 180 degrees.');
}
function validateCircle(figure, errors) {
  if (!positiveNumber(figure.radius)) errors.push('circle.radius must be a positive number.');
  if (typeof figure.center_label !== 'string' || !figure.center_label.trim()) errors.push('circle.center_label must be a non-empty string.');
  for (const field of ['inscribed_angle', 'central_angle']) if (figure[field] !== undefined && (!isFiniteNumber(figure[field]) || Number(figure[field]) <= 0 || Number(figure[field]) >= 180)) errors.push(`circle.${field} must be an angle between 0 and 180 degrees when provided.`);
}
function validateParabola(figure, errors) { if (typeof figure.equation !== 'string' || !figure.equation.trim()) errors.push('parabola.equation must be a non-empty string.'); if (!Array.isArray(figure.x_range) || figure.x_range.length !== 2 || !figure.x_range.every(isFiniteNumber) || Number(figure.x_range[0]) >= Number(figure.x_range[1])) errors.push('parabola.x_range must be two increasing numeric values.'); }
function validateLinearGraph(figure, errors) { if (!isFiniteNumber(figure.slope)) errors.push('linear_function_graph.slope must be numeric.'); if (!isFiniteNumber(figure.y_intercept)) errors.push('linear_function_graph.y_intercept must be numeric.'); if (!Array.isArray(figure.x_range) || figure.x_range.length !== 2 || !figure.x_range.every(isFiniteNumber) || Number(figure.x_range[0]) >= Number(figure.x_range[1])) errors.push('linear_function_graph.x_range must be two increasing numeric values.'); }
function validateCoordinateShape(figure, errors) { if (!Array.isArray(figure.vertices) || figure.vertices.length < 3) errors.push('coordinate_shape.vertices must contain at least three vertices.'); if (Array.isArray(figure.vertices) && figure.vertices.some((point) => !Array.isArray(point) || point.length !== 2 || !point.every(isFiniteNumber))) errors.push('coordinate_shape.vertices must contain numeric [x, y] pairs.'); if (typeof figure.shape_name !== 'string' || !figure.shape_name.trim()) errors.push('coordinate_shape.shape_name must be a non-empty string.'); if (typeof figure.show_gridlines !== 'boolean') errors.push('coordinate_shape.show_gridlines must be boolean.'); }
function validate3DSolid(figure, errors) {
  const solidType = String(figure.solid_type || '').trim().toLowerCase().replace(/\s+/g, '_');
  if (!SOLID_TYPES.has(solidType)) errors.push(`3d_solid.solid_type must be one of: ${Array.from(SOLID_TYPES).join(', ')}.`);
  if (!isObject(figure.dimensions)) errors.push('3d_solid.dimensions must be an object.');
  else Object.entries(figure.dimensions).forEach(([key, value]) => { if (!positiveNumber(value)) errors.push(`3d_solid.dimensions.${key} must be a positive number.`); });
  if (!isObject(figure.labels)) errors.push('3d_solid.labels must be an object.');
  if (solidType === 'cube' && isObject(figure.dimensions)) { const values = Object.values(figure.dimensions).map(Number); if (values.length && values.some((value) => value !== values[0])) errors.push('3d_solid cube dimensions must be equal.'); }
}
function validateMultiSourceTable(figure, errors) {
  if (!Array.isArray(figure.sources) || !figure.sources.length) { errors.push('multi_source_table.sources must be a non-empty array.'); return; }
  figure.sources.forEach((source, index) => {
    if (!isObject(source)) { errors.push(`multi_source_table.sources[${index}] must be an object.`); return; }
    if (typeof source.title !== 'string' || !source.title.trim()) errors.push(`multi_source_table.sources[${index}].title must be a non-empty string.`);
    if (!Array.isArray(source.headers) || !source.headers.length) errors.push(`multi_source_table.sources[${index}].headers must be a non-empty array.`);
    if (!Array.isArray(source.rows) || !source.rows.length) errors.push(`multi_source_table.sources[${index}].rows must be a non-empty array.`);
    if (Array.isArray(source.rows) && Array.isArray(source.headers)) source.rows.forEach((row, rowIndex) => { if (!Array.isArray(row) || row.length !== source.headers.length) errors.push(`multi_source_table.sources[${index}].rows[${rowIndex}] width must equal headers length.`); });
  });
}
function validateLegacyFigure(rawType, figure, errors) { if (rawType === 'line') { if (!Array.isArray(figure.x) || !Array.isArray(figure.y)) errors.push('Legacy line figures require x and y arrays.'); if (Array.isArray(figure.x) && Array.isArray(figure.y) && figure.x.length !== figure.y.length) errors.push('Legacy line x/y arrays must have equal lengths.'); } if (rawType === 'scatter' && !Array.isArray(figure.points)) errors.push('Legacy scatter figures require a points array.'); if (rawType === 'quadratic' && (!isFiniteNumber(figure.a) || !isFiniteNumber(figure.b) || !isFiniteNumber(figure.c))) errors.push('Legacy quadratic figures require numeric a, b and c.'); }
function validateStructuredFigure(figure) {
  if (!isObject(figure)) return { valid: false, errors: ['Figure must be an object.'], canonicalType: null };
  const rawType = String(figure.type || figure.figure_type || '').trim(); const canonicalType = LEGACY_ALIASES[rawType] || rawType; const spec = FIGURE_SPECS[canonicalType]; if (!spec) return { valid: false, errors: [`Unsupported figure type: ${rawType || 'missing'}.`], canonicalType };
  const errors = [];
  if (spec.future) return { valid: false, errors: ['Future figure type is reserved and cannot be delivered.'], canonicalType, future: true };
  if (Object.prototype.hasOwnProperty.call(LEGACY_ALIASES, rawType)) validateLegacyFigure(rawType, figure, errors); else { for (const field of spec.required) if (!(field in figure)) errors.push(`Missing figure field: ${field}.`); if (canonicalType === 'bar_chart' || canonicalType === 'line_chart') validateSeries(canonicalType, figure, errors); if (canonicalType === 'scatter_plot') { if (!Array.isArray(figure.points) || !figure.points.length) errors.push('scatter_plot.points must be a non-empty array.'); } if (canonicalType === 'table') validateTable(figure, errors); if (canonicalType === 'right_triangle') validateRightTriangle(figure, errors); if (canonicalType === 'general_triangle') validateGeneralTriangle(figure, errors); if (canonicalType === 'circle') validateCircle(figure, errors); if (canonicalType === 'parabola') validateParabola(figure, errors); if (canonicalType === 'linear_function_graph') validateLinearGraph(figure, errors); if (canonicalType === 'coordinate_shape') validateCoordinateShape(figure, errors); if (canonicalType === '3d_solid') validate3DSolid(figure, errors); if (canonicalType === 'multi_source_table') validateMultiSourceTable(figure, errors); }
  return { valid: errors.length === 0, errors, canonicalType, future: false };
}
function normalizeFigure(figure) { if (!isObject(figure)) return null; const rawType = String(figure.type || figure.figure_type || '').trim(); const canonicalType = LEGACY_ALIASES[rawType] || rawType; return { ...figure, type: rawType, figureType: canonicalType, validation: validateStructuredFigure(figure) }; }
const RENDERERS = new Map();
export function registerFigureRenderer(figureType, renderer) { if (!FIGURE_SPECS[figureType]) throw new Error(`Cannot register unknown figure type: ${figureType}`); if (typeof renderer !== 'function') throw new Error(`Renderer for ${figureType} must be a function.`); RENDERERS.set(figureType, renderer); }
export function getFigureRenderer(figureType) { return RENDERERS.get(figureType) || null; }
export function getFigureSpec(figureType) { return FIGURE_SPECS[figureType] || null; }
export function normalizeMathFigure(figure) { return normalizeFigure(figure); }
export { FIGURE_SPECS, LEGACY_ALIASES, validateStructuredFigure };
