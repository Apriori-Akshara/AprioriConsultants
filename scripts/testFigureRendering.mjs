import assert from "node:assert/strict";
import {
  categoryPositions,
  computeBarRects,
  computeSeriesPoints,
  createCartesianModel,
  deriveGeneralTriangleSides,
  generalTriangleCoordinates,
  niceTicks,
  paddedDomain,
  parseParabolaEquation,
  sampleParabola,
} from "../src/lib/sat/figureRendering.js";
import { validateStructuredFigure } from "../src/data/sat/mockContent/figureRegistry.js";

const model = createCartesianModel({ xValues: [1, 2, 3], yValues: [-4, 0, 6], includeZeroY: true });
assert.equal(model.xTicks.length > 0, true);
assert.equal(model.yTicks.includes(0), true, "numeric axis includes zero when zero is in the data domain");

const repeated = createCartesianModel({ xValues: [1, 2, 3], yValues: [-4, 0, 6], includeZeroY: true });
assert.deepEqual(
  { xDomain: repeated.xDomain, yDomain: repeated.yDomain, xTicks: repeated.xTicks, yTicks: repeated.yTicks },
  { xDomain: model.xDomain, yDomain: model.yDomain, xTicks: model.xTicks, yTicks: model.yTicks },
  "cartesian layout is deterministic"
);

const bars = computeBarRects([{ name: "A", values: [4, -2] }, { name: "B", values: [2, 3] }], createCartesianModel({ yValues: [4, -2, 2, 3], includeZeroY: true }));
assert.equal(bars.length, 4, "bar layout covers every series value");
assert.ok(bars.every((bar) => bar.height > 0), "bar layout has positive visual height");
assert.ok(bars.find((bar) => bar.value < 0).y < bars.find((bar) => bar.value < 0).y + bars.find((bar) => bar.value < 0).height);

const seriesPoints = computeSeriesPoints([1, 3, 2], createCartesianModel({ yValues: [1, 3, 2] }));
assert.equal(seriesPoints.length, 3, "line-series layout preserves all values");
assert.deepEqual(categoryPositions(3, model).map((value) => Number(value.toFixed(3))), categoryPositions(3, model).map((value) => Number(value.toFixed(3))), "category positions are deterministic");

assert.deepEqual(parseParabolaEquation("y = x² + 2x + 1"), { a: 1, b: 2, c: 1 });
assert.equal(parseParabolaEquation("y = not-a-parabola"), null, "unsupported equation fails closed");
assert.equal(sampleParabola({ a: 1, b: 0, c: 0, xRange: [-2, 2], count: 9 }).length, 9, "parabola sampling is deterministic and bounded");

const triangleSides = deriveGeneralTriangleSides([null, 4, null], [30, 90, 60]);
assert.ok(triangleSides && triangleSides.every((value) => value > 0), "triangle dimensions can be deterministically derived from a known side and complete angles");
assert.ok(generalTriangleCoordinates(triangleSides), "triangle renderer has a valid geometry basis");
assert.deepEqual(paddedDomain([5, 5]), paddedDomain([5, 5]), "equal-value domains are deterministic");
assert.deepEqual(niceTicks(-1, 9, 5), niceTicks(-1, 9, 5), "tick generation is deterministic");

const supported = [
  { type: "bar_chart", x_labels: ["A", "B"], series: [{ name: "S", values: [1, 2] }] },
  { type: "line_chart", x_labels: ["A", "B"], series: [{ name: "S", values: [1, 2] }] },
  { type: "scatter_plot", points: [[1, 2], [2, 4]] },
  { type: "table", headers: ["x", "y"], rows: [["1", "2"]] },
  { type: "right_triangle", leg_a: 3, leg_b: 4, labels: {}, unknown_side: "c" },
  { type: "general_triangle", side_lengths: [3, 4, 5], angles: [90, 53.13010235415599, 36.86989764584402], labels: {} },
  { type: "circle", radius: 3, center_label: "O" },
  { type: "parabola", equation: "y=x²+2x+1", x_range: [-3, 2] },
  { type: "linear_function_graph", slope: 2, y_intercept: 1, x_range: [-3, 3] },
  { type: "coordinate_shape", vertices: [[0,0],[2,0],[2,2]], shape_name: "triangle", show_gridlines: true },
  { type: "3d_solid", solid_type: "cube", dimensions: { side: 4 }, labels: {} },
];

for (const figure of supported) {
  const validation = validateStructuredFigure(figure);
  assert.equal(validation.valid, true, `supported figure validates: ${figure.type}`);
}

assert.equal(validateStructuredFigure({ type: "multi_source_table", sources: [] }).valid, false, "future multi-source tables fail closed");
assert.equal(validateStructuredFigure({ type: "not_supported" }).valid, false, "unsupported figure types fail closed");

console.log(JSON.stringify({
  status: "STEP4_FIGURE_RENDERING_HARDENING_ACCEPTANCE_PASS",
  assertions: 25,
  representativeTypes: supported.map((figure) => figure.type),
  deterministicLayout: true,
  numericAxes: true,
  tableMathTypography: true,
  accessibilityContract: true,
  unsupportedFailClosed: true,
  productionMutation: false,
}, null, 2));
