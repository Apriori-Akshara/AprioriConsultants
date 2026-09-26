import React from "react";
import styles from "../../styles/SATMockTest.module.css";
import { normalizeMathFigure } from "../../data/sat/mockContent/figureRegistry";
import MathText from "./MathText";
import MathSvgText from "./MathSvgText";
import {
  categoryPositions,
  computeBarRects,
  computeScatterPoints,
  computeSeriesPoints,
  createCartesianModel,
  deriveGeneralTriangleSides,
  generalTriangleCoordinates,
  formatTick,
  isWithinDomain,
  niceTicks,
  paddedDomain,
  parseParabolaEquation,
  sampleParabola,
  seriesDash,
} from "../../lib/sat/figureRendering";

const PLOT = Object.freeze({ width: 620, height: 320, left: 68, right: 24, top: 28, bottom: 72 });

function CartesianFrame({ title, xAxisTitle, yAxisTitle, model, xLabels = null, description, legend = null, children }) {
  if (!model) return null;
  const xAxisY = isWithinDomain(0, model.yDomain) ? model.yScale(0) : model.height - model.bottom;
  const yAxisX = isWithinDomain(0, model.xDomain) ? model.xScale(0) : model.left;
  const xPositions = Array.isArray(xLabels) ? categoryPositions(xLabels.length, model) : null;
  const xTickValues = xLabels ? [] : model.xTicks;
  return (
    <div className={styles.figureBox} aria-label={description || title}>
      <div className={styles.figureTitle}><MathText>{title}</MathText></div>
      <svg viewBox="0 0 620 320" role="img" aria-label={description || title}>
        <title>{title}</title>
        <desc>{description || title}</desc>
        {model.yTicks.map((tick) => (
          <g key={`y-grid-${tick}`}>
            <line x1={model.left} y1={model.yScale(tick)} x2={model.width - model.right} y2={model.yScale(tick)} className={styles.axisGridline} />
            <line x1={yAxisX - 5} y1={model.yScale(tick)} x2={yAxisX + 5} y2={model.yScale(tick)} className={styles.axisTick} />
            <MathSvgText x={yAxisX - 9} y={model.yScale(tick) + 4} textAnchor="end">{formatTick(tick)}</MathSvgText>
          </g>
        ))}
        <line x1={model.left} y1={xAxisY} x2={model.width - model.right} y2={xAxisY} className={styles.axis} />
        <line x1={yAxisX} y1={model.top} x2={yAxisX} y2={model.height - model.bottom} className={styles.axis} />
        {xTickValues.map((tick) => (
          <g key={`x-tick-${tick}`}>
            <line x1={model.xScale(tick)} y1={xAxisY - 5} x2={model.xScale(tick)} y2={xAxisY + 5} className={styles.axisTick} />
            <MathSvgText x={model.xScale(tick)} y={xAxisY + 20} textAnchor="middle">{formatTick(tick)}</MathSvgText>
          </g>
        ))}
        {xPositions?.map((x, index) => (
          <g key={`x-category-${index}`}>
            <line x1={x} y1={xAxisY - 5} x2={x} y2={xAxisY + 5} className={styles.axisTick} />
            <MathSvgText x={x} y={xAxisY + 20} textAnchor="middle">{String(xLabels[index])}</MathSvgText>
          </g>
        ))}
        <MathSvgText x={model.width - model.right} y={model.height - 16} textAnchor="end">{xAxisTitle || "x"}</MathSvgText>
        <MathSvgText x={20} y={model.top + 6}>{yAxisTitle || "y"}</MathSvgText>
        {children}
      </svg>
      {legend}
    </div>
  );
}

function ChartLegend({ series }) {
  if (!Array.isArray(series) || series.length < 2) return null;
  return (
    <div className={styles.chartLegend} aria-label="Chart series legend">
      {series.map((item, index) => (
        <span className={styles.chartLegendItem} key={index}>
          <span className={styles.chartLegendMarker} aria-hidden="true">{index === 0 ? "—" : index === 1 ? "- -" : index === 2 ? "··" : "≋"}</span>
          <span>{String(item.name)}</span>
        </span>
      ))}
    </div>
  );
}

function validatePointPairs(points) {
  return Array.isArray(points) && points.length >= 2 && points.every((point) => Array.isArray(point) && point.length === 2 && point.every((value) => Number.isFinite(Number(value))));
}

function LegacyLineFigure({ figure, title }) {
  const raw = (figure.x || []).map((x, index) => [Number(x), Number((figure.y || [])[index])]);
  if (!validatePointPairs(raw)) return null;
  const model = createCartesianModel({ xValues: raw.map((point) => point[0]), yValues: raw.map((point) => point[1]), plot: PLOT });
  const scaled = computeScatterPoints(raw, model);
  const polyline = scaled.map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <CartesianFrame title={title} xAxisTitle={figure.x_axis_title} yAxisTitle={figure.y_axis_title} model={model} description={`${title}. Line graph with plotted values and numeric axes.`}>
      {scaled.length > 1 && <polyline points={polyline} className={styles.graphLine} strokeDasharray={seriesDash(0)} fill="none" />}
      {scaled.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="5" className={styles.graphPoint} />)}
    </CartesianFrame>
  );
}

function DataSeriesFigure({ figure, title, bar }) {
  const labels = Array.isArray(figure.x_labels) ? figure.x_labels.map(String) : [];
  const series = Array.isArray(figure.series) ? figure.series : [];
  const values = series.flatMap((item) => Array.isArray(item.values) ? item.values.map(Number) : []);
  if (!labels.length || !series.length || !values.length || !values.every(Number.isFinite) || series.some((item) => !item?.values || item.values.length !== labels.length)) return null;
  const model = createCartesianModel({
    yValues: values,
    yDomain: paddedDomain(values, { includeZero: true }),
    includeZeroY: true,
    plot: PLOT,
  });
  if (bar) {
    const rects = computeBarRects(series, model);
    if (!rects.length) return null;
    return (
      <CartesianFrame title={title} xAxisTitle={figure.x_axis_title} yAxisTitle={figure.y_axis_title} model={model} xLabels={labels} legend={<ChartLegend series={series} />} description={`${title}. Bar chart with ${labels.length} categories and ${series.length} data series.`}>
        {rects.map((rect) => <rect key={`${rect.seriesIndex}-${rect.index}`} x={rect.x} y={rect.y} width={rect.width} height={rect.height} className={styles.bar} fillOpacity={Math.max(0.45, 0.9 - rect.seriesIndex * 0.15)} rx="2" />)}
      </CartesianFrame>
    );
  }
  return (
    <CartesianFrame title={title} xAxisTitle={figure.x_axis_title} yAxisTitle={figure.y_axis_title} model={model} xLabels={labels} legend={<ChartLegend series={series} />} description={`${title}. Line chart with ${labels.length} categories and ${series.length} data series.`}>
      {series.map((item, seriesIndex) => {
        const scaled = computeSeriesPoints(item.values, model);
        return (
          <React.Fragment key={seriesIndex}>
            <polyline points={scaled.map(([x, y]) => `${x},${y}`).join(" ")} className={styles.graphLine} strokeDasharray={seriesDash(seriesIndex)} fill="none" />
            {scaled.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="4" className={styles.graphPoint} />)}
          </React.Fragment>
        );
      })}
    </CartesianFrame>
  );
}

function ScatterFigure({ figure, title }) {
  const points = (figure.points || []).map((point) => Array.isArray(point)
    ? [Number(point[0]), Number(point[1])]
    : [Number(point?.x), Number(point?.y)]);
  if (!validatePointPairs(points)) return null;
  const model = createCartesianModel({ xValues: points.map((point) => point[0]), yValues: points.map((point) => point[1]), plot: PLOT });
  const scaled = computeScatterPoints(points, model);
  return (
    <CartesianFrame title={title} xAxisTitle={figure.x_axis_title} yAxisTitle={figure.y_axis_title} model={model} description={`${title}. Scatter plot with numeric x and y axes.`}>
      {scaled.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="5" className={styles.scatterPoint} />)}
    </CartesianFrame>
  );
}

function TableFigure({ figure, title }) {
  if (!Array.isArray(figure.headers) || !figure.headers.length || !Array.isArray(figure.rows) || !figure.rows.length) return null;
  if (figure.rows.some((row) => !Array.isArray(row) || row.length !== figure.headers.length)) return null;
  return (
    <div className={styles.figureBox} aria-label={title}>
      <div className={styles.figureTitle}><MathText>{title}</MathText></div>
      <div className={styles.figureTableWrap}>
        <table className={styles.figureTable}>
          <caption className={styles.srOnly}>{title}</caption>
          <thead><tr>{figure.headers.map((header, index) => <th key={index} scope="col"><MathText>{String(header)}</MathText></th>)}</tr></thead>
          <tbody>{figure.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}><MathText>{String(cell)}</MathText></td>)}</tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function RightTriangleFigure({ figure, title }) {
  const a = Number(figure.leg_a);
  const b = Number(figure.leg_b);
  if (!(a > 0) || !(b > 0)) return null;
  const hypotenuse = Math.hypot(a, b);
  const labels = figure.labels || {};
  return (
    <div className={styles.figureBox} aria-label={title}>
      <div className={styles.figureTitle}><MathText>{title}</MathText></div>
      <svg viewBox="0 0 580 250" role="img" aria-label={title}>
        <title>{title}</title>
        <desc>{`${title}. Right triangle with leg lengths ${a} and ${b}.`}</desc>
        <polygon points="145,195 425,195 145,55" className={styles.shape} />
        {figure.show_right_angle_marker !== false && <polyline points="145,175 165,175 165,195" className={styles.dash} fill="none" />}
        <MathSvgText x="270" y="220">{labels.a || `a = ${a}`}</MathSvgText>
        <MathSvgText x="110" y="130" textAnchor="end">{labels.b || `b = ${b}`}</MathSvgText>
        <MathSvgText x="285" y="120">{labels.c || `c = ${formatTick(hypotenuse)}`}</MathSvgText>
      </svg>
    </div>
  );
}

function GeneralTriangleFigure({ figure, title }) {
  const sides = deriveGeneralTriangleSides(figure.side_lengths, figure.angles);
  const coordinates = generalTriangleCoordinates(sides);
  if (!coordinates) return null;
  const maxX = Math.max(...coordinates.map((point) => point[0]));
  const maxY = Math.max(...coordinates.map((point) => point[1]));
  const scale = 220 / Math.max(maxX, maxY, 1);
  const points = coordinates.map(([x, y]) => [155 + x * scale, 195 - y * scale]);
  const labels = figure.labels || {};
  const rawSides = figure.side_lengths || [];
  return (
    <div className={styles.figureBox} aria-label={title}>
      <div className={styles.figureTitle}><MathText>{title}</MathText></div>
      <svg viewBox="0 0 580 250" role="img" aria-label={title}>
        <title>{title}</title>
        <desc>{`${title}. Triangle diagram with structured side and angle data.`}</desc>
        <polygon points={points.map(([x, y]) => `${x},${y}`).join(" ")} className={styles.shape} />
        <MathSvgText x={(points[0][0] + points[1][0]) / 2} y="220">{labels.a || (rawSides[0] != null ? `a = ${rawSides[0]}` : "a")}</MathSvgText>
        <MathSvgText x={points[0][0] - 8} y={(points[0][1] + points[2][1]) / 2}>{labels.b || (rawSides[1] != null ? `b = ${rawSides[1]}` : "b")}</MathSvgText>
        <MathSvgText x={points[1][0] + 8} y={(points[1][1] + points[2][1]) / 2}>{labels.c || (rawSides[2] != null ? `c = ${rawSides[2]}` : "c")}</MathSvgText>
        {(figure.angles || []).map((angle, index) => angle != null ? <MathSvgText key={index} x={points[index][0]} y={points[index][1] + (index === 1 ? 18 : -10)}>{`${angle}°`}</MathSvgText> : null)}
      </svg>
    </div>
  );
}

function CircleFigure({ figure, title }) {
  const radius = Number(figure.radius);
  if (!(radius > 0) || typeof figure.center_label !== "string" || !figure.center_label.trim()) return null;
  const labels = figure.labels || {};
  return (
    <div className={styles.figureBox} aria-label={title}>
      <div className={styles.figureTitle}><MathText>{title}</MathText></div>
      <svg viewBox="0 0 580 250" role="img" aria-label={title}>
        <title>{title}</title>
        <desc>{`${title}. Circle with structured radius and angle labels.`}</desc>
        <circle cx="290" cy="125" r="82" className={styles.shape} />
        <line x1="290" y1="125" x2="372" y2="125" className={styles.dash} />
        <MathSvgText x="320" y="116">{labels.radius || `r = ${radius}`}</MathSvgText>
        <MathSvgText x="290" y="145" textAnchor="middle">{figure.center_label}</MathSvgText>
        {figure.inscribed_angle != null && <MathSvgText x="120" y="70">inscribed angle = {figure.inscribed_angle}°</MathSvgText>}
        {figure.central_angle != null && <MathSvgText x="360" y="70">central angle = {figure.central_angle}°</MathSvgText>}
        {figure.chord && <line x1="220" y1="80" x2="360" y2="80" className={styles.shape} />}
      </svg>
    </div>
  );
}

function ParabolaFigure({ figure, title }) {
  const parsed = parseParabolaEquation(figure.equation);
  const xRange = Array.isArray(figure.x_range) && figure.x_range.length === 2 ? figure.x_range.map(Number) : null;
  if (!parsed || !xRange || !xRange.every(Number.isFinite) || xRange[0] >= xRange[1]) return null;
  const points = sampleParabola({ ...parsed, xRange });
  if (points.length < 2) return null;
  const model = createCartesianModel({ xValues: points.map((point) => point[0]), yValues: points.map((point) => point[1]), plot: PLOT });
  const vertexX = -parsed.b / (2 * parsed.a);
  const vertexY = parsed.a * vertexX * vertexX + parsed.b * vertexX + parsed.c;
  const vertex = [model.xScale(vertexX), model.yScale(vertexY)];
  const scaled = computeScatterPoints(points, model);
  return (
    <CartesianFrame title={title} model={model} description={`${title}. Parabola for the structured equation ${figure.equation}.`}>
      <polyline points={scaled.map(([x, y]) => `${x},${y}`).join(" ")} className={styles.graphLine} fill="none" />
      {figure.highlight_vertex && isWithinDomain(vertexX, model.xDomain) && isWithinDomain(vertexY, model.yDomain) && <circle cx={vertex[0]} cy={vertex[1]} r="6" className={styles.graphPoint} />}
    </CartesianFrame>
  );
}

function QuadraticFigure({ figure, title }) {
  const a = Number(figure.a);
  const b = Number(figure.b);
  const c = Number(figure.c);
  if (![a, b, c].every(Number.isFinite) || a === 0) return null;
  const xRange = Array.isArray(figure.x_range) && figure.x_range.length === 2 ? figure.x_range.map(Number) : [-10, 10];
  if (!xRange.every(Number.isFinite) || xRange[0] >= xRange[1]) return null;
  return <ParabolaFigure figure={{ ...figure, equation: `y = ${a}x^2${b >= 0 ? "+" : ""}${b}x${c >= 0 ? "+" : ""}${c}`, x_range: xRange }} title={title} />;
}

function LinearFunctionFigure({ figure, title }) {
  const slope = Number(figure.slope);
  const intercept = Number(figure.y_intercept);
  const range = Array.isArray(figure.x_range) && figure.x_range.length === 2 ? figure.x_range.map(Number) : null;
  const highlights = Array.isArray(figure.highlight_points) ? figure.highlight_points.map((point) => [Number(point.x), Number(point.y)]) : [];
  if (![slope, intercept].every(Number.isFinite) || !range || !range.every(Number.isFinite) || range[0] >= range[1]) return null;
  if (highlights.some((point) => !point.every(Number.isFinite))) return null;
  const endpoints = [[range[0], slope * range[0] + intercept], [range[1], slope * range[1] + intercept]];
  const allPoints = endpoints.concat(highlights);
  const model = createCartesianModel({ xValues: allPoints.map((point) => point[0]), yValues: allPoints.map((point) => point[1]), plot: PLOT });
  const scaled = computeScatterPoints(endpoints, model);
  return (
    <CartesianFrame title={title} model={model} description={`${title}. Linear-function graph with structured slope, intercept, and x-range.`}>
      <line x1={scaled[0][0]} y1={scaled[0][1]} x2={scaled[1][0]} y2={scaled[1][1]} className={styles.graphLine} />
      {highlights.map((point, index) => {
        const scaledPoint = [model.xScale(point[0]), model.yScale(point[1])];
        return <circle key={index} cx={scaledPoint[0]} cy={scaledPoint[1]} r="5" className={styles.graphPoint} />;
      })}
    </CartesianFrame>
  );
}

function CoordinateShapeFigure({ figure, title }) {
  const vertices = Array.isArray(figure.vertices) ? figure.vertices.map(([x, y]) => [Number(x), Number(y)]) : [];
  if (!vertices.length || vertices.some((point) => !point.every(Number.isFinite))) return null;
  const model = createCartesianModel({
    xValues: vertices.map((point) => point[0]),
    yValues: vertices.map((point) => point[1]),
    includeZeroX: true,
    includeZeroY: true,
    plot: PLOT,
  });
  const scaled = computeScatterPoints(vertices, model);
  const polygon = scaled.map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <CartesianFrame title={title} model={model} xAxisTitle="x" yAxisTitle="y" description={`${title}. Coordinate-plane shape with labeled vertices.`}>
      {figure.show_gridlines && model.xTicks.map((tick) => <line key={`vx-${tick}`} x1={model.xScale(tick)} y1={model.top} x2={model.xScale(tick)} y2={model.height - model.bottom} className={styles.axisGridline} />)}
      {figure.show_gridlines && model.yTicks.map((tick) => <line key={`hy-${tick}`} x1={model.left} y1={model.yScale(tick)} x2={model.width - model.right} y2={model.yScale(tick)} className={styles.axisGridline} />)}
      <polygon points={polygon} className={styles.shape} />
      {vertices.map(([x, y], index) => <MathSvgText key={index} x={scaled[index][0] + 8} y={scaled[index][1] - 8}>{`(${x}, ${y})`}</MathSvgText>)}
    </CartesianFrame>
  );
}

function GeometryFigure({ figure, title }) {
  const values = figure.values || {};
  const shape = figure.shape || "";
  if (shape === "circle") {
    const radius = Number(values.radius);
    if (!(radius > 0)) return null;
    return <CircleFigure figure={{ ...figure, radius, center_label: figure.center_label || "O" }} title={title} />;
  }
  if (shape === "rectangle") {
    const width = Number(values.width);
    const height = Number(values.height);
    if (!(width > 0) || !(height > 0)) return null;
    return (
      <div className={styles.figureBox} aria-label={title}>
        <div className={styles.figureTitle}><MathText>{title}</MathText></div>
        <svg viewBox="0 0 580 250" role="img" aria-label={title}>
          <title>{title}</title><desc>{`${title}. Rectangle using structured width and height values.`}</desc>
          <rect x="155" y="55" width="270" height="140" className={styles.shape} />
          <MathSvgText x="290" y="220" textAnchor="middle">w = {width}</MathSvgText>
          <MathSvgText x="435" y="130">h = {height}</MathSvgText>
        </svg>
      </div>
    );
  }
  if (shape === "triangle") {
    const base = Number(values.base);
    const height = Number(values.height);
    if (!(base > 0) || !(height > 0)) return null;
    return (
      <div className={styles.figureBox} aria-label={title}>
        <div className={styles.figureTitle}><MathText>{title}</MathText></div>
        <svg viewBox="0 0 580 250" role="img" aria-label={title}>
          <title>{title}</title><desc>{`${title}. Triangle using structured base and height values.`}</desc>
          <polygon points="120,195 290,45 460,195" className={styles.shape} />
          <line x1="290" y1="45" x2="290" y2="195" className={styles.dash} />
          <MathSvgText x="255" y="220">base = {base}</MathSvgText>
          <MathSvgText x="305" y="125">h = {height}</MathSvgText>
        </svg>
      </div>
    );
  }
  return null;
}

export default function MathVisualStimulusCore({ figure, skill = "Math" }) {
  if (!figure) return null;
  const normalized = normalizeMathFigure(figure);
  if (!normalized || !normalized.validation.valid) return null;
  const rendererType = normalized.figureType;
  const renderers = {
    line: LegacyLineFigure,
    line_chart: (props) => <DataSeriesFigure {...props} bar={false} />,
    bar_chart: (props) => <DataSeriesFigure {...props} bar />,
    scatter: ScatterFigure,
    scatter_plot: ScatterFigure,
    table: TableFigure,
    quadratic: QuadraticFigure,
    parabola: ParabolaFigure,
    right_triangle: RightTriangleFigure,
    general_triangle: GeneralTriangleFigure,
    circle: CircleFigure,
    linear_function_graph: LinearFunctionFigure,
    coordinate_shape: CoordinateShapeFigure,
    geometry: GeometryFigure,
  };
  const Renderer = renderers[rendererType];
  if (!Renderer) return null;
  const title = normalized.title || `${skill} — question-specific visual`;
  return <Renderer figure={normalized} title={title} />;
}
