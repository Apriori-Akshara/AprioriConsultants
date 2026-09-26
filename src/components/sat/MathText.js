import React from "react";
import { typesetMathText } from "../../lib/sat/mathTypography";
import styles from "../../styles/MathTypography.module.css";

export default function MathText({ children, className = "", as = "span", ...props }) {
  const Tag = as;
  const classes = [styles.mathText, className].filter(Boolean).join(" ");
  return React.createElement(Tag, {
    ...props,
    className: classes,
    dangerouslySetInnerHTML: { __html: typesetMathText(children) },
  });
}
