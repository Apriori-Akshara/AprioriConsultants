import React from "react";
import styles from "../../styles/SATMockTest.module.css";

const SOLID_VERTICES = {
  cube: [[170,70],[330,70],[400,115],[240,115],[170,230],[330,230],[400,185],[240,185]],
  rectangular_prism: [[150,85],[330,85],[410,125],[230,125],[150,225],[330,225],[410,185],[230,185]],
  cuboid: [[150,85],[330,85],[410,125],[230,125],[150,225],[330,225],[410,185],[230,185]],
};

function labelValue(labels, key) {
  const value = labels && labels[key];
  return value === undefined || value === null ? null : String(value);
}

export default function ThreeDSolidFigure({ figure, title }) {
  const type = String(figure.solid_type || "").toLowerCase().replace(/\s+/g, "_");
  const labels = figure.labels || {};
  const dimensions = figure.dimensions || {};
  const dims = Object.keys(dimensions).map((key) => `${key} = ${dimensions[key]}`);

  if (type === "cylinder") {
    const radius = Number(dimensions.radius || dimensions.r || 4);
    const height = Number(dimensions.height || dimensions.h || 8);
    const rx = 105; const top = 55; const bottom = 195;
    return <div className={styles.figureBox} aria-label={title}>
      <div className={styles.figureTitle}>{title}</div>
      <svg viewBox="0 0 580 250" role="img">
        <ellipse cx="290" cy={top} rx={rx} ry="28" className={styles.shape} />
        <line x1={185} y1={top} x2={185} y2={bottom} className={styles.shape} />
        <line x1={395} y1={top} x2={395} y2={bottom} className={styles.shape} />
        <path d={`M185 ${bottom} A105 28 0 0 0 395 ${bottom}`} className={styles.shape} fill="none" />
        <line x1="290" y1={top} x2="395" y2={top} className={styles.dash} />
        <text x="295" y="45">{labelValue(labels, "radius") || `r = ${radius}`}</text>
        <text x="410" y="130">{labelValue(labels, "height") || `h = ${height}`}</text>
        {dims.filter((item) => !/^(radius|r|height|h)\s*=/.test(item)).map((item, index) => <text key={index} x="220" y={225 + index * 16}>{item}</text>)}
      </svg>
    </div>;
  }

  if (type === "sphere") {
    const radius = Number(dimensions.radius || dimensions.r || 4);
    return <div className={styles.figureBox} aria-label={title}>
      <div className={styles.figureTitle}>{title}</div>
      <svg viewBox="0 0 580 250" role="img">
        <circle cx="290" cy="125" r="90" className={styles.shape} />
        <ellipse cx="290" cy="125" rx="90" ry="30" className={styles.dash} fill="none" />
        <line x1="290" y1="125" x2="380" y2="125" className={styles.dash} />
        <text x="300" y="115">{labelValue(labels, "radius") || `r = ${radius}`}</text>
      </svg>
    </div>;
  }

  if (type === "cone") {
    const radius = Number(dimensions.radius || dimensions.r || 4);
    const height = Number(dimensions.height || dimensions.h || 8);
    return <div className={styles.figureBox} aria-label={title}>
      <div className={styles.figureTitle}>{title}</div>
      <svg viewBox="0 0 580 250" role="img">
        <ellipse cx="290" cy="200" rx="105" ry="28" className={styles.shape} />
        <line x1="185" y1="200" x2="290" y2="45" className={styles.shape} />
        <line x1="395" y1="200" x2="290" y2="45" className={styles.shape} />
        <line x1="290" y1="45" x2="290" y2="200" className={styles.dash} />
        <text x="300" y="125">{labelValue(labels, "height") || `h = ${height}`}</text>
        <text x="300" y="218">{labelValue(labels, "radius") || `r = ${radius}`}</text>
      </svg>
    </div>;
  }

  const vertices = SOLID_VERTICES[type] || SOLID_VERTICES.rectangular_prism;
  const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
  return <div className={styles.figureBox} aria-label={title}>
    <div className={styles.figureTitle}>{title}</div>
    <svg viewBox="0 0 580 250" role="img">
      {edges.map(([a,b], index) => <line key={index} x1={vertices[a][0]} y1={vertices[a][1]} x2={vertices[b][0]} y2={vertices[b][1]} className={styles.shape} />)}
      <line x1={vertices[0][0]} y1={vertices[0][1]} x2={vertices[6][0]} y2={vertices[6][1]} className={styles.dash} />
      {dims.slice(0,3).map((item, index) => <text key={index} x={[225,405,115][index]} y={[65,145,155][index]}>{item}</text>)}
      {labelValue(labels, "front") && <text x="250" y="245">{labelValue(labels, "front")}</text>}
    </svg>
  </div>;
}
