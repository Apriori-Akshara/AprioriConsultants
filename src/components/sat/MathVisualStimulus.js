import React from "react";
import MathVisualStimulusCore from "./MathVisualStimulusCore";
import ThreeDSolidFigure from "./ThreeDSolidFigure";
import { normalizeMathFigure } from "../../data/sat/mockContent/figureRegistry";

export default function MathVisualStimulus({ figure, skill = "Math" }) {
  if (!figure) return null;
  const normalized = normalizeMathFigure(figure);
  if (!normalized || !normalized.validation.valid) return null;
  const type = normalized.type || normalized.figureType;
  const title = normalized.title || `${skill} — question-specific visual`;
  if (type === "3d_solid") return <ThreeDSolidFigure figure={normalized} title={title} />;
  if (type === "multi_source_table") return null;
  return <MathVisualStimulusCore figure={figure} skill={skill} />;
}
