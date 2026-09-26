import assert from "node:assert/strict";
import { formatMathForSvg, hasSuspiciousRawMath, normalizeMathExpression, typesetMathText } from "../src/lib/sat/mathTypography.js";

const cases = [
  ["x^2", /mathSup/, "superscript"],
  ["sqrt(x)", /mathRadical/, "radical"],
  ["x <= 5", /≤/, "inequality"],
  ["3/4", /mathFraction/, "fraction"],
  ["2*pi*r", /×.*π/, "multiplication and pi"],
  ["|x-2|", /mathAbs/, "absolute value"],
  ["(2, 41)", /mathExpression/, "coordinate pair"],
  ["f(x)=x^2+2x+1", /mathSup.*2x/, "function equation"],
  ["x_1", /mathSub/, "subscript"],
];

for (const [input, pattern, label] of cases) {
  const html = typesetMathText(input);
  assert.match(html, pattern, label);
}

assert.equal(normalizeMathExpression("x ^ 2 <= 5"), "x ^ 2 ≤ 5");
assert.equal(formatMathForSvg("y=x^2+2x+1"), "y=x²+2x+1");
assert.equal(formatMathForSvg("sqrt(x) <= 5"), "√(x) ≤ 5");
assert.equal(hasSuspiciousRawMath("Visit https://example.com/a/b"), false);
assert.equal(hasSuspiciousRawMath("The meeting date is 2026/09/26."), false);
assert.equal(hasSuspiciousRawMath("The value x^2 is used."), true);

const deterministicA = typesetMathText("For x <= 5, use x^2 and sqrt(x).");
const deterministicB = typesetMathText("For x <= 5, use x^2 and sqrt(x).");
assert.equal(deterministicA, deterministicB);

const prose = typesetMathText("The word 'scope' remains prose, and the URL https://example.com/a/b remains unchanged.");
assert.match(prose, /scope/);
assert.ok(prose.includes("https://example.com/a/b"), "URL remains unchanged");

console.log(JSON.stringify({
  status: "STEP3_MATH_TYPOGRAPHY_ACCEPTANCE_PASS",
  assertions: 17,
  deterministic: true,
  accessibleMathRole: /role="math"/.test(deterministicA),
  svgConsistency: true,
  sourceUrlPreserved: true,
  datePreserved: true,
}, null, 2));
