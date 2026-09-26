import React from "react";
import styles from "../../styles/SATMockTest.module.css";
import MathText from "./MathText";
import MathSvgText from "./MathSvgText";

const SOLID_VERTICES = {
  cube: [[170,70],[330,70],[400,115],[240,115],[170,230],[330,230],[400,185],[240,185]],
  rectangular_prism: [[150,85],[330,85],[410,125],[230,125],[150,225],[330,225],[410,185],[230,185]],
  cuboid: [[150,85],[330,85],[410,125],[230,125],[150,225],[330,225],[410,185],[230,185]],
};

function labelValue(labels, key) {
  const value = labels && labels[key];
  return value === undefined || value === null ? null : String(value);
}

function AccessibleFigure({ title, description, children }) {
  return (
    <div className={styles.figureBox} aria-label={description || title}>
      <div className={styles.figureTitle}><MathText>{title}</MathText></div>
      <svg viewBox="0 0 580 260" role="img" aria-label={description || title}>
        <title>{title}</title>
        <desc>{description || title}</desc>
        {children}
      </svg>
    </div>
  );
}

export default function ThreeDSolidFigure({ figure, title }) {
  const type = String(figure.solid_type || "").toLowerCase().replace(/\s+/g, "_");
  const labels = figure.labels || {};
  const dimensions = figure.dimensions || {};
  const dims = Object.keys(dimensions).filter((key) => dimensions[key] != null).map((key) => `${key} = ${dimensions[key]}`);

  if (type === "cylinder") {
    const radius = Number(dimensions.radius ?? dimensions.r);
    const height = Number(dimensions.height ?? dimensions.h);
    if (!(radius > 0) || !(height > 0)) return null;
    return (
      <AccessibleFigure title={title} description={`${title}. Cylinder with structured radius and height dimensions.`}>
        <ellipse cx="290" cy="55" rx="105" ry="28" className={styles.shape} />
        <line x1="185" y1="55" x2="185" y2="195" className={styles.shape} />
        <line x1="395" y1="55" x2="395" y2="195" className={styles.shape} />
        <path d="M185 195 A105 28 0 0 0 395 195" className={styles.shape} fill="none" />
        <line x1="290" y1="55" x2="395" y2="55" className={styles.dash} />
        <MathSvgText x="295" y="45">{labelValue(labels, "radius") || `r = ${radius}`}</MathSvgText>
        <MathSvgText x="410" y="130">{labelValue(labels, "height") || `h = ${height}`}</MathSvgText>
      </AccessibleFigure>
    );
  }

  if (type === "sphere") {
    const radius = Number(dimensions.radius ?? dimensions.r);
    if (!(radius > 0)) return null;
    return (
      <AccessibleFigure title={title} description={`${title}. Sphere with structured radius dimension.`}>
        <circle cx="290" cy="130" r="90" className={styles.shape} />
        <ellipse cx="290" cy="130" rx="90" ry="30" className={styles.dash} fill="none" />
        <line x1="290" y1="130" x2="380" y2="130" className={styles.dash} />
        <MathSvgText x="300" y="120">{labelValue(labels, "radius") || `r = ${radius}`}</MathSvgText>
      </AccessibleFigure>
    );
  }

  if (type === "cone") {
    const radius = Number(dimensions.radius ?? dimensions.r);
    const height = Number(dimensions.height ?? dimensions.h);
    if (!(radius > 0) || !(height > 0)) return null;
    return (
      <AccessibleFigure title={title} description={`${title}. Cone with structured radius and height dimensions.`}>
        <ellipse cx="290" cy="205" rx="105" ry="28" className={styles.shape} />
        <line x1="185" y1="205" x2="290" y2="45" className={styles.shape} />
        <line x1="395" y1="205" x2="290" y2="45" className={styles.shape} />
        <line x1="290" y1="45" x2="290" y2="205" className={styles.dash} />
        <MathSvgText x="300" y="125">{labelValue(labels, "height") || `h = ${height}`}</MathSvgText>
        <MathSvgText x="300" y="222">{labelValue(labels, "radius") || `r = ${radius}`}</MathSvgText>
      </AccessibleFigure>
    );
  }

  const vertices = SOLID_VERTICES[type];
  if (!vertices) return null;
  return (
    <AccessibleFigure title={title} description={`${title}. ${type.replace(/_/g, " ")} drawn from structured dimension data.`}>
      {[
        [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7],
      ].map(([a,b], index) => <line key={index} x1={vertices[a][0]} y1={vertices[a][1]} x2={vertices[b][0]} y2={vertices[b][1]} className={styles.shape} />)}
      <line x1={vertices[0][0]} y1={vertices[0][1]} x2={vertices[6][0]} y2={vertices[6][1]} className={styles.dash} />
      {dims.slice(0, 3).map((item, index) => <MathSvgText key={index} x={[225,405,115][index]} y={[65,145,155][index]}>{item}</MathSvgText>)}
      {labelValue(labels, "front") && <MathSvgText x="290" y="246" textAnchor="middle">{labelValue(labels, "front")}</MathSvgText>}
    </AccessibleFigure>
  );
}
