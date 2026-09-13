import React from "react";
import styles from "../../styles/SATMockTest.module.css";
import { normalizeMathFigure } from "../../data/sat/mockContent/figureRegistry";

function variantNumber(value) {
  return String(value || "visual").split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function numericExtent(values) {
  const numbers = values.map(Number).filter(Number.isFinite);
  if (!numbers.length) return [0, 1];
  const min = Math.min(...numbers); const max = Math.max(...numbers);
  if (min === max) return [min - 1, max + 1];
  const pad = (max - min) * 0.08;
  return [min - pad, max + pad];
}

function scaleXY(points, width = 500, height = 190) {
  if (!Array.isArray(points) || !points.length) return [];
  const xs = points.map((p) => Number(p[0])); const ys = points.map((p) => Number(p[1]));
  const [minX, maxX] = numericExtent(xs); const [minY, maxY] = numericExtent(ys);
  return points.map(([x, y]) => [40 + ((Number(x) - minX) / (maxX - minX)) * width, height - ((Number(y) - minY) / (maxY - minY)) * 165]);
}

function ChartFrame({ title, xAxisTitle, yAxisTitle, children }) {
  return <div className={styles.figureBox} aria-label={title}>
    <div className={styles.figureTitle}>{title}</div>
    <svg viewBox="0 0 620 290" role="img">
      <line x1="40" y1="210" x2="560" y2="210" className={styles.axis} />
      <line x1="40" y1="25" x2="40" y2="210" className={styles.axis} />
      {children}
      <text x="565" y="231">{xAxisTitle || "x"}</text>
      <text x="15" y="28">{yAxisTitle || "y"}</text>
    </svg>
  </div>;
}

function LegacyLineFigure({ figure, title }) {
  const points = (figure.x || []).map((x, index) => [Number(x), Number((figure.y || [])[index])]);
  const scaled = scaleXY(points);
  const polyline = scaled.map(([x, y]) => `${x},${y}`).join(" ");
  const n = variantNumber(figure.visualVariant);
  return <ChartFrame title={title} xAxisTitle={figure.x_axis_title} yAxisTitle={figure.y_axis_title}>
    {polyline && <polyline points={polyline} className={styles.graphLine} fill="none" strokeDasharray={n % 3 === 0 ? "7 4" : undefined} />}
    {scaled.map(([x, y], index) => <circle key={`${x}-${index}`} cx={x} cy={y} r={4 + (n % 3)} className={styles.graphPoint} />)}
  </ChartFrame>;
}

function DataSeriesFigure({ figure, title, bar }) {
  const labels = figure.x_labels || [];
  const series = figure.series || [];
  const values = series.flatMap((item) => item.values || []).map(Number).filter(Number.isFinite);
  const [minY, maxY] = numericExtent(values);
  const baseline = 210 - ((0 - minY) / (maxY - minY)) * 165;
  const zeroY = Math.max(25, Math.min(210, baseline));
  const plotWidth = 500; const groupWidth = labels.length ? plotWidth / labels.length : plotWidth;
  const labelStep = labels.length > 10 ? Math.ceil(labels.length / 10) : 1;
  return <ChartFrame title={title} xAxisTitle={figure.x_axis_title} yAxisTitle={figure.y_axis_title}>
    {bar ? series.map((item, seriesIndex) => (item.values || []).map((value, index) => {
      const numeric = Number(value);
      const slot = groupWidth / Math.max(series.length, 1);
      const x = 40 + index * groupWidth + seriesIndex * slot + slot * 0.12;
      const y = numeric >= 0 ? 210 - ((numeric - 0) / (maxY - minY)) * 165 : zeroY;
      const height = Math.abs(numeric / (maxY - minY)) * 165;
      return <rect key={`${seriesIndex}-${index}`} x={x} y={Math.min(y, zeroY)} width={Math.max(4, slot * 0.76)} height={Math.max(1, height)} className={styles.bar} rx="2" />;
    })) : series.map((item, seriesIndex) => {
      const points = (item.values || []).map((value, index) => [index, Number(value)]);
      const scaled = points.map(([x, y]) => [40 + (labels.length <= 1 ? 250 : (x / (labels.length - 1)) * plotWidth), 210 - ((y - minY) / (maxY - minY)) * 165]);
      return <React.Fragment key={seriesIndex}>
        <polyline points={scaled.map(([x, y]) => `${x},${y}`).join(" ")} className={styles.graphLine} fill="none" />
        {scaled.map(([x, y], index) => <circle key={`${seriesIndex}-${index}`} cx={x} cy={y} r="4" className={styles.graphPoint} />)}
      </React.Fragment>;
    })}
    {labels.map((label, index) => index % labelStep === 0 ? <text key={index} x={40 + (labels.length <= 1 ? 0 : (index / (labels.length - 1)) * plotWidth)} y="232" textAnchor="middle">{String(label)}</text> : null)}
  </ChartFrame>;
}

function ScatterFigure({ figure, title }) {
  const points = (figure.points || []).map((point) => [Number(point.x), Number(point.y)]);
  const scaled = scaleXY(points);
  let trend = null;
  if (figure.trend_line && points.length >= 2) {
    const meanX = points.reduce((sum, point) => sum + point[0], 0) / points.length;
    const meanY = points.reduce((sum, point) => sum + point[1], 0) / points.length;
    const denominator = points.reduce((sum, point) => sum + ((point[0] - meanX) ** 2), 0);
    const slope = denominator ? points.reduce((sum, point) => sum + ((point[0] - meanX) * (point[1] - meanY)), 0) / denominator : 0;
    const intercept = meanY - slope * meanX;
    const xs = points.map((point) => point[0]); const minX = Math.min(...xs); const maxX = Math.max(...xs);
    trend = scaleXY([[minX, slope * minX + intercept], [maxX, slope * maxX + intercept]]);
  }
  return <ChartFrame title={title} xAxisTitle={figure.x_axis_title} yAxisTitle={figure.y_axis_title}>
    {trend && <line x1={trend[0][0]} y1={trend[0][1]} x2={trend[1][0]} y2={trend[1][1]} className={styles.trendLine} />}
    {scaled.map(([x, y], index) => <circle key={`${x}-${index}`} cx={x} cy={y} r="5" className={styles.scatterPoint} />)}
  </ChartFrame>;
}

function TableFigure({ figure, title }) {
  return <div className={styles.figureBox} aria-label={title}>
    <div className={styles.figureTitle}>{title}</div>
    <div className={styles.figureTableWrap}>
      <table className={styles.figureTable}>
        <caption className={styles.srOnly}>{title}</caption>
        <thead><tr>{figure.headers.map((header, index) => <th key={index} scope="col">{header}</th>)}</tr></thead>
        <tbody>{figure.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{String(cell)}</td>)}</tr>)}</tbody>
      </table>
    </div>
  </div>;
}

function RightTriangleFigure({ figure, title }) {
  const a = Number(figure.leg_a); const b = Number(figure.leg_b); const hypotenuse = Math.hypot(a, b);
  const unknown = String(figure.unknown_side);
  const displayed = unknown === 'c' ? hypotenuse : unknown === 'a' ? a : b;
  const labels = figure.labels || {};
  return <div className={styles.figureBox} aria-label={title}>
    <div className={styles.figureTitle}>{title}</div>
    <svg viewBox="0 0 580 250" role="img">
      <polygon points="145,195 425,195 145,55" className={styles.shape} />
      {figure.show_right_angle_marker !== false && <polyline points="145,175 165,175 165,195" className={styles.dash} fill="none" />}
      <text x="270" y="220">{labels.a || `a = ${a}`}</text>
      <text x="110" y="130" textAnchor="end">{labels.b || `b = ${b}`}</text>
      <text x="285" y="120">{labels.c || `c = ${displayed}`}</text>
    </svg>
  </div>;
}

function GeneralTriangleFigure({ figure, title }) {
  const sides = figure.side_lengths || [];
  const labels = figure.labels || {};
  const base = Number(sides[0] || 8); const left = Number(sides[1] || 7); const right = Number(sides[2] || 6);
  const x = (base * base + left * left - right * right) / (2 * base);
  const y = Math.sqrt(Math.max(0, left * left - x * x));
  const scale = 230 / Math.max(base, x + 0.01);
  const bx = 155; const by = 195; const cx = bx + base * scale; const ax = bx + x * scale; const ay = by - y * scale;
  return <div className={styles.figureBox} aria-label={title}>
    <div className={styles.figureTitle}>{title}</div>
    <svg viewBox="0 0 580 250" role="img">
      <polygon points={`${bx},${by} ${cx},${by} ${ax},${ay}`} className={styles.shape} />
      <text x={(bx + cx) / 2} y="220">{labels.a || (sides[0] != null ? `a = ${sides[0]}` : 'a')}</text>
      <text x={ax - 18} y={(ay + by) / 2}>{labels.b || (sides[1] != null ? `b = ${sides[1]}` : 'b')}</text>
      <text x={(ax + cx) / 2 + 8} y={(ay + by) / 2}>{labels.c || (sides[2] != null ? `c = ${sides[2]}` : 'c')}</text>
      {(figure.angles || []).map((angle, index) => angle != null ? <text key={index} x={[bx + 12, ax, cx - 20][index]} y={[by - 12, ay + 18, by - 12][index]}>{angle}°</text> : null)}
    </svg>
  </div>;
}

function CircleFigure({ figure, title }) {
  const radius = Number(figure.radius); const labels = figure.labels || {};
  return <div className={styles.figureBox} aria-label={title}>
    <div className={styles.figureTitle}>{title}</div>
    <svg viewBox="0 0 580 250" role="img">
      <circle cx="290" cy="125" r="82" className={styles.shape} />
      <line x1="290" y1="125" x2="372" y2="125" className={styles.dash} />
      <text x="320" y="116">{labels.radius || `r = ${radius}`}</text>
      <text x="290" y="145" textAnchor="middle">{figure.center_label}</text>
      {figure.inscribed_angle != null && <text x="120" y="70">inscribed angle = {figure.inscribed_angle}°</text>}
      {figure.central_angle != null && <text x="360" y="70">central angle = {figure.central_angle}°</text>}
      {figure.chord && <line x1="220" y1="80" x2="360" y2="80" className={styles.shape} />}
    </svg>
  </div>;
}

function parseParabolaEquation(equation) {
  const text = String(equation).replace(/\s+/g, '').toLowerCase().replace(/^y=/, '');
  const match = text.match(/^([+-]?(?:\d+(?:\.\d+)?)?)x\^2([+-](?:\d+(?:\.\d+)?)?)x([+-](?:\d+(?:\.\d+)?))$/);
  if (!match) return { a: 1, b: 0, c: 0 };
  return { a: match[1] === '' || match[1] === '+' ? 1 : match[1] === '-' ? -1 : Number(match[1]), b: Number(match[2] || 0), c: Number(match[3] || 0) };
}

function ParabolaFigure({ figure, title }) {
  const { a, b, c } = parseParabolaEquation(figure.equation);
  const [start, end] = figure.x_range.map(Number);
  const points = Array.from({ length: 41 }, (_, index) => { const x = start + ((end - start) * index) / 40; return [x, a * x * x + b * x + c]; });
  const scaled = scaleXY(points);
  const vertexX = -b / (2 * a); const vertexY = a * vertexX * vertexX + b * vertexX + c;
  return <ChartFrame title={title}>
    <polyline points={scaled.map(([x, y]) => `${x},${y}`).join(' ')} className={styles.graphLine} fill="none" />
    {figure.highlight_vertex && <circle cx={scaleXY([[vertexX, vertexY]])[0][0]} cy={scaleXY([[vertexX, vertexY]])[0][1]} r="6" className={styles.graphPoint} />}
  </ChartFrame>;
}

function LinearFunctionFigure({ figure, title }) {
  const slope = Number(figure.slope); const intercept = Number(figure.y_intercept); const [start, end] = figure.x_range.map(Number);
  const points = [[start, slope * start + intercept], [end, slope * end + intercept]];
  const scaled = scaleXY(points);
  return <ChartFrame title={title}>
    <line x1={scaled[0][0]} y1={scaled[0][1]} x2={scaled[1][0]} y2={scaled[1][1]} className={styles.graphLine} />
    {(figure.highlight_points || []).map((point, index) => {
      const x = Number(point.x); const y = Number(point.y);
      const scaledPoint = scaleXY([...points, [x, y]]).at(-1);
      return <circle key={index} cx={scaledPoint[0]} cy={scaledPoint[1]} r="5" className={styles.graphPoint} />;
    })}
  </ChartFrame>;
}

function CoordinateShapeFigure({ figure, title }) {
  const vertices = figure.vertices.map(([x, y]) => [Number(x), Number(y)]);
  const scaled = scaleXY(vertices, 420, 155);
  const polygon = scaled.map(([x, y]) => `${x + 40},${y + 30}`).join(' ');
  const xs = vertices.map((point) => point[0]); const ys = vertices.map((point) => point[1]);
  const [minX, maxX] = numericExtent(xs); const [minY, maxY] = numericExtent(ys);
  const grid = [];
  if (figure.show_gridlines) {
    for (let x = Math.ceil(minX); x <= Math.floor(maxX); x += 1) grid.push(<line key={`x-${x}`} x1={40 + ((x - minX) / (maxX - minX || 1)) * 420} y1="30" x2={40 + ((x - minX) / (maxX - minX || 1)) * 420} y2="185" className={styles.gridline} />);
    for (let y = Math.ceil(minY); y <= Math.floor(maxY); y += 1) grid.push(<line key={`y-${y}`} x1="40" y1={185 - ((y - minY) / (maxY - minY || 1)) * 155} x2="460" y2={185 - ((y - minY) / (maxY - minY || 1)) * 155} className={styles.gridline} />);
  }
  return <div className={styles.figureBox} aria-label={title}>
    <div className={styles.figureTitle}>{title}</div>
    <svg viewBox="0 0 580 250" role="img">
      {grid}
      <polygon points={polygon} className={styles.shape} />
      {vertices.map(([x, y], index) => <text key={index} x={scaled[index][0] + 44} y={scaled[index][1] + 26}>({x}, {y})</text>)}
    </svg>
  </div>;
}

function GeometryFigure({ figure, title }) {
  const values = figure.values || {};
  const shape = figure.shape || "triangle";
  if (shape === "circle") {
    const radius = Number(values.radius || 4);
    return <div className={styles.figureBox} aria-label={title}><div className={styles.figureTitle}>{title}</div><svg viewBox="0 0 580 250" role="img"><circle cx="290" cy="125" r="85" className={styles.shape} /><line x1="290" y1="125" x2="375" y2="125" className={styles.dash} /><text x="322" y="116">r = {radius}</text></svg></div>;
  }
  if (shape === "rectangle") {
    const width = Number(values.width || 8); const height = Number(values.height || 5);
    return <div className={styles.figureBox} aria-label={title}><div className={styles.figureTitle}>{title}</div><svg viewBox="0 0 580 250" role="img"><rect x="155" y="55" width="270" height="140" className={styles.shape} /><text x="270" y="220">w = {width}</text><text x="435" y="130">h = {height}</text></svg></div>;
  }
  const base = Number(values.base || 8); const height = Number(values.height || 5);
  return <div className={styles.figureBox} aria-label={title}><div className={styles.figureTitle}>{title}</div><svg viewBox="0 0 580 250" role="img"><polygon points="120,195 290,45 460,195" className={styles.shape} /><line x1="290" y1="45" x2="290" y2="195" className={styles.dash} /><text x="255" y="220">base = {base}</text><text x="300" y="125">h = {height}</text></svg></div>;
}

const LEGACY_RENDERERS = {
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

export default function MathVisualStimulus({ figure, skill = "Math" }) {
  if (!figure) return null;
  const normalized = normalizeMathFigure(figure);
  if (!normalized || !normalized.validation.valid) return null;
  const rendererType = normalized.type || normalized.figureType;
  const Renderer = LEGACY_RENDERERS[rendererType] || LEGACY_RENDERERS[normalized.figureType];
  if (!Renderer) return null;
  const title = normalized.title || `${skill} — question-specific visual`;
  return <Renderer figure={normalized} title={title} />;
}
