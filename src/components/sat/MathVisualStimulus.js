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

function QuadraticFigure({ figure, title }) {
  const a = Number(figure.a || 1); const b = Number(figure.b || 0); const c = Number(figure.c || 0);
  const points = Array.from({ length: 11 }, (_, index) => { const x = -5 + index; return [x, a * x * x + b * x + c]; });
  const scaled = scaleXY(points);
  const n = variantNumber(figure.visualVariant);
  return <ChartFrame title={title}>
    <polyline points={scaled.map(([x, y]) => `${x},${y}`).join(" ")} className={styles.graphLine} fill="none" strokeDasharray={n % 4 === 0 ? "6 3" : undefined} />
  </ChartFrame>;
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
  parabola: QuadraticFigure,
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
