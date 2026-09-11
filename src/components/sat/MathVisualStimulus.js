import React from "react";
import styles from "../../styles/SATMockTest.module.css";

function variantNumber(value) {
  return String(value || "visual").split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function scalePoints(points, width = 500, height = 210) {
  if (!Array.isArray(points) || !points.length) return [];
  const xs = points.map((p) => Number(p[0]));
  const ys = points.map((p) => Number(p[1]));
  const minX = Math.min(...xs); const maxX = Math.max(...xs);
  const minY = Math.min(...ys); const maxY = Math.max(...ys);
  const rangeX = maxX - minX || 1; const rangeY = maxY - minY || 1;
  return points.map(([x, y]) => [40 + ((x - minX) / rangeX) * width, height - ((y - minY) / rangeY) * 165]);
}

function LineFigure({ figure, title }) {
  const points = (figure.x || []).map((x, index) => [Number(x), Number((figure.y || [])[index])]);
  const scaled = scalePoints(points);
  const polyline = scaled.map(([x, y]) => `${x},${y}`).join(" ");
  const n = variantNumber(figure.visualVariant);
  return <div className={styles.figureBox} aria-label={title}>
    <div className={styles.figureTitle}>{title}</div>
    <svg viewBox="0 0 580 250" role="img">
      <line x1="40" y1="210" x2="550" y2="210" className={styles.axis} /><line x1="40" y1="25" x2="40" y2="210" className={styles.axis} />
      {polyline && <polyline points={polyline} className={styles.graphLine} fill="none" strokeDasharray={n % 3 === 0 ? "7 4" : undefined} />}
      {scaled.map(([x, y], index) => <circle key={`${x}-${index}`} cx={x} cy={y} r={4 + (n % 3)} className={styles.graphPoint} />)}
      <text x="548" y="230">x</text><text x="22" y="32">y</text>
    </svg>
  </div>;
}

function ScatterFigure({ figure, title }) {
  const scaled = scalePoints(figure.points || []);
  const n = variantNumber(figure.visualVariant);
  return <div className={styles.figureBox} aria-label={title}>
    <div className={styles.figureTitle}>{title}</div>
    <svg viewBox="0 0 580 250" role="img">
      <line x1="40" y1="210" x2="550" y2="210" className={styles.axis} /><line x1="40" y1="25" x2="40" y2="210" className={styles.axis} />
      {scaled.map(([x, y], index) => <circle key={`${x}-${index}`} cx={x} cy={y} r={5 + (n % 2)} className={styles.scatterPoint} />)}
      <text x="548" y="230">x</text><text x="22" y="32">y</text>
    </svg>
  </div>;
}

function QuadraticFigure({ figure, title }) {
  const a = Number(figure.a || 1); const b = Number(figure.b || 0); const c = Number(figure.c || 0);
  const points = Array.from({ length: 11 }, (_, index) => { const x = -5 + index; return [x, a * x * x + b * x + c]; });
  const scaled = scalePoints(points);
  const n = variantNumber(figure.visualVariant);
  return <div className={styles.figureBox} aria-label={title}>
    <div className={styles.figureTitle}>{title}</div>
    <svg viewBox="0 0 580 250" role="img">
      <line x1="40" y1="210" x2="550" y2="210" className={styles.axis} /><line x1="290" y1="25" x2="290" y2="210" className={styles.axis} />
      <polyline points={scaled.map(([x, y]) => `${x},${y}`).join(" ")} className={styles.graphLine} fill="none" strokeDasharray={n % 4 === 0 ? "6 3" : undefined} />
      <text x="548" y="230">x</text><text x="272" y="32">y</text>
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

export default function MathVisualStimulus({ figure, skill = "Math" }) {
  if (!figure) return null;
  const title = figure.title || `${skill} — question-specific visual`;
  if (figure.type === "line") return <LineFigure figure={figure} title={title} />;
  if (figure.type === "scatter") return <ScatterFigure figure={figure} title={title} />;
  if (figure.type === "quadratic") return <QuadraticFigure figure={figure} title={title} />;
  if (figure.type === "geometry") return <GeometryFigure figure={figure} title={title} />;
  return null;
}
