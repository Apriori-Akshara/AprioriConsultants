import React from "react";
import { formatMathForSvg } from "../../lib/sat/mathTypography";

export default function MathSvgText({ children, ...props }) {
  return React.createElement("text", props, formatMathForSvg(children));
}
