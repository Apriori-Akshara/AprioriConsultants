const ALLOWED = new Set(["line", "scatter", "quadratic", "geometry"]);

function stable(value) {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;
  if (typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${key}:${stable(value[key])}`).join("|")}}`;
  return String(value);
}

function signature(figure) {
  return stable(figure);
}

function validateMockFigures(mock) {
  const questions = [...(mock.readingWriting || []), ...(mock.math || [])];
  const seen = new Set();
  const typeCounts = {};

  for (const question of questions) {
    if (!question.figure) continue;
    if (question.section !== "math") throw new Error(`Figure assigned outside Math: ${question.questionId}`);
    if (!ALLOWED.has(question.figure.type)) throw new Error(`Unsupported figure type ${question.figure.type}: ${question.questionId}`);
    if (question.metadata?.figurePurpose !== "question-essential") throw new Error(`Math figure is not marked question-essential: ${question.questionId}`);

    const key = signature(question.figure);
    if (seen.has(key)) throw new Error(`Duplicate Math figure detected: ${question.questionId}`);
    seen.add(key);
    typeCounts[question.figure.type] = (typeCounts[question.figure.type] || 0) + 1;

    if (question.domain === "Geometry and Trigonometry" && question.figure.type !== "geometry") {
      throw new Error(`Geometry question has non-geometry figure: ${question.questionId}`);
    }
    if (question.domain === "Problem-Solving and Data Analysis" && !["scatter", "line"].includes(question.figure.type)) {
      throw new Error(`Data-analysis question has mismatched figure: ${question.questionId}`);
    }
    if (question.domain === "Advanced Math" && !["quadratic", "line"].includes(question.figure.type)) {
      throw new Error(`Advanced Math question has mismatched figure: ${question.questionId}`);
    }
    if (question.domain === "Algebra" && question.figure.type !== "line") {
      throw new Error(`Algebra question has mismatched figure: ${question.questionId}`);
    }
  }

  return { count: seen.size, typeCounts };
}

export function validateMockFigureQuality(psat, sat) {
  const psatReport = validateMockFigures(psat);
  const satReport = validateMockFigures(sat);
  return { psat: psatReport, sat: satReport };
}

export default validateMockFigureQuality;
