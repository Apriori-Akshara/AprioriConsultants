import React from "react";
import { formatMathForSvg } from "../../lib/sat/mathTypography";

export default function MathSvgText({ children, ...props }) {
  const formatted = formatMathForSvg(children);
  return React.createElement("text", { ...props, "aria-label": formatted }, formatted);
}
