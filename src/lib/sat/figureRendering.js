const DEFAULT_PLOT = Object.freeze({
  width: 620,
  height: 320,
  left: 68,
  right: 24,
  top: 28,
  bottom: 72,
});

function finiteValues(values) {
  return Array.isArray(values) && values.length > 0 && values.every((value) => Number.isFinite(Number(value)));
}

export function formatTick(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "";
  const absolute = Math.abs(numeric);
  let precision = 0;
  if (absolute !== 0 && absolute < 1) precision = 2;
  else if (!Number.isInteger(numeric)) precision = 2;
  return numeric
    .toFixed(precision)
    .replace(/0+$/, "")
    .replace(/\\.$/, "")
    .replace(/^-0$/, "0");
}

export function niceTicks(min, max, count = 5) {
  const lower = Number(min);
  const upper = Number(max);
  if (!Number.isFinite(lower) || !Number.isFinite(upper)) return [];
  if (lower === upper) return [lower];

  const span = Math.abs(upper - lower);
  const rawStep = span / Math.max(1, count - 1);
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const normalized = rawStep / magnitude;
  const factor = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 2.5 ? 2.5 : normalized <= 5 ? 5 : 10;
  const step = factor * magnitude;
  const start = Math.ceil(lower / step - 1e-10) * step;
  const end = Math.floor(upper / step + 1e-10) * step;
  const ticks = [];
  for (let value = start, guard = 0; value <= end + step * 1e-9 && guard < 20; value += step, guard += 1) {
    const rounded = Number(value.toFixed(12));
    ticks.push(rounded);
  }
  if (!ticks.length) return [lower, upper];
  return ticks;
}

export function paddedDomain(values, { includeZero = false, padding = 0.08 } = {}) {
  const numeric = (values || []).map(Number).filter(Number.isFinite);
  if (!numeric.length) return [0, 1];
  let min = Math.min(...numeric);
  let max = Math.max(...numeric);
  if (includeZero) {
    min = Math.min(min, 0);
    max = Math.max(max, 0);
  }
  if (min === max) {
    const delta = Math.abs(min) || 1;
    min -= delta;
    max += delta;
  }
  const span = max - min;
  const pad = span * Math.max(0, padding);
  return [min - pad, max + pad];
}

export function createCartesianModel({
  xValues = [],
  yValues = [],
  xDomain = null,
  yDomain = null,
  includeZeroX = false,
  includeZeroY = false,
  plot = DEFAULT_PLOT,
} = {}) {
  const resolvedXDomain = xDomain || paddedDomain(xValues, { includeZero: includeZeroX });
  const resolvedYDomain = yDomain || paddedDomain(yValues, { includeZero: includeZeroY });
  const xSpan = resolvedXDomain[1] - resolvedXDomain[0] || 1;
  const ySpan = resolvedYDomain[1] - resolvedYDomain[0] || 1;
  const xScale = (value) => plot.left + ((Number(value) - resolvedXDomain[0]) / xSpan) * (plot.width - plot.left - plot.right);
  const yScale = (value) => plot.height - plot.bottom - ((Number(value) - resolvedYDomain[0]) / ySpan) * (plot.height - plot.top - plot.bottom);
  const xTicks = niceTicks(resolvedXDomain[0], resolvedXDomain[1], 6);
  const yTicks = niceTicks(resolvedYDomain[0], resolvedYDomain[1], 6);
  return {
    ...plot,
    xDomain: resolvedXDomain,
    yDomain: resolvedYDomain,
    xScale,
    yScale,
    xTicks,
    yTicks,
  };
}

export function categoryPositions(count, model) {
  if (!Number.isFinite(Number(count)) || count <= 0) return [];
  const n = Number(count);
  const width = model.width - model.left - model.right;
  const step = n === 1 ? width / 2 : width / (n - 1);
  const start = n === 1 ? model.left + width / 2 : model.left;
  return Array.from({ length: n }, (_, index) => start + index * step);
}

export function computeSeriesPoints(values, model) {
  if (!finiteValues(values) || values.length < 2) return [];
  const positions = categoryPositions(values.length, model);
  return values.map((value, index) => [positions[index], model.yScale(value)]);
}

export function computeScatterPoints(points, model) {
  if (!Array.isArray(points) || points.length < 2) return [];
  return points.map((point) => [model.xScale(point[0]), model.yScale(point[1])]);
}

export function computeBarRects(series, model) {
  if (!Array.isArray(series) || !series.length) return [];
  const labelCount = series[0]?.values?.length || 0;
  if (!labelCount || series.some((item) => !finiteValues(item.values) || item.values.length !== labelCount)) return [];
  const centers = categoryPositions(labelCount, model);
  const groupWidth = (model.width - model.left - model.right) / Math.max(1, labelCount);
  const barWidth = Math.max(4, Math.min(32, groupWidth / Math.max(1, series.length + 0.7)));
  const baseline = model.yScale(0);
  const rects = [];
  series.forEach((item, seriesIndex) => {
    item.values.forEach((value, index) => {
      const x = centers[index] - (barWidth * series.length) / 2 + seriesIndex * barWidth;
      const y = model.yScale(value);
      rects.push({
        seriesIndex,
        index,
        x,
        y: Math.min(y, baseline),
        width: Math.max(3, barWidth * 0.82),
        height: Math.max(1, Math.abs(y - baseline)),
        value: Number(value),
      });
    });
  });
  return rects;
}

export function deriveGeneralTriangleSides(sideLengths, angles) {
  const sides = Array.isArray(sideLengths) ? sideLengths.map((value) => (value == null ? null : Number(value))) : [];
  const angleValues = Array.isArray(angles) ? angles.map((value) => (value == null ? null : Number(value))) : [];
  if (sides.length !== 3 || angleValues.length !== 3) return null;
  if (sides.every((value) => Number.isFinite(value) && value > 0)) return sides;

  const knownSideIndex = sides.findIndex((value) => Number.isFinite(value) && value > 0);
  const hasAllAngles = angleValues.every((value) => Number.isFinite(value) && value > 0 && value < 180);
  if (knownSideIndex >= 0 && hasAllAngles) {
    const sine = Math.sin((angleValues[knownSideIndex] * Math.PI) / 180);
    if (Math.abs(sine) < 1e-9) return null;
    const scale = sides[knownSideIndex] / sine;
    const derived = angleValues.map((angle) => scale * Math.sin((angle * Math.PI) / 180));
    if (derived.every((value) => Number.isFinite(value) && value > 0)) return derived;
  }
  return null;
}

export function generalTriangleCoordinates(sideLengths) {
  if (!Array.isArray(sideLengths) || sideLengths.length !== 3 || !sideLengths.every((value) => Number.isFinite(Number(value)) && Number(value) > 0)) return null;
  const [a, b, c] = sideLengths.map(Number);
  const x = (a * a + b * b - c * c) / (2 * a);
  const heightSquared = b * b - x * x;
  if (heightSquared <= 0) return null;
  return [[0, 0], [a, 0], [x, Math.sqrt(heightSquared)]];
}

export function parseParabolaEquation(equation) {
  let source = String(equation ?? "")
    .trim()
    .toLowerCase()
    .replace(/[−–—]/g, "-")
    .replace(/²/g, "^2")
    .replace(/\\s+/g, "")
    .replace(/^y=/, "");
  const match = source.match(/^([+-]?(?:\\d+(?:\\.\\d+)?)?)x\\^2(?:([+-](?:\\d+(?:\\.\\d+)?)?)x)?(?:([+-](?:\\d+(?:\\.\\d+)?)))?$/);
  if (!match) return null;
  const a = match[1] === "" || match[1] === "+" ? 1 : match[1] === "-" ? -1 : Number(match[1]);
  const b = match[2] == null ? 0 : Number(match[2]);
  const c = match[3] == null ? 0 : Number(match[3]);
  if (![a, b, c].every(Number.isFinite) || a === 0) return null;
  return { a, b, c };
}

export function sampleParabola({ a, b, c, xRange, count = 61 } = {}) {
  if (![a, b, c].every(Number.isFinite) || !Array.isArray(xRange) || xRange.length !== 2) return [];
  const [start, end] = xRange.map(Number);
  if (!Number.isFinite(start) || !Number.isFinite(end) || start >= end) return [];
  const points = [];
  for (let index = 0; index < count; index += 1) {
    const x = start + ((end - start) * index) / Math.max(1, count - 1);
    points.push([x, a * x * x + b * x + c]);
  }
  return points;
}

export function isWithinDomain(value, domain) {
  return Number(value) >= Number(domain[0]) && Number(value) <= Number(domain[1]);
}

export function seriesDash(seriesIndex) {
  return seriesIndex === 0 ? undefined : seriesIndex === 1 ? "8 5" : seriesIndex === 2 ? "2 4" : "12 4 2 4";
}
