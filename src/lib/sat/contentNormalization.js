function normalizeWhitespace(value) {
  return String(value ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .trim();
}

/**
 * Normalize source-style mathematical notation without changing ordinary prose,
 * URLs, dates, identifiers, or structured numeric data.
 */
export function normalizeMathSourceNotation(value) {
  return normalizeWhitespace(value)
    .replace(/−/g, "-")
    .replace(/\u2212/g, "-")
    .replace(/<=/g, "≤")
    .replace(/>=/g, "≥")
    .replace(/([A-Za-z0-9)\]])[ \t]*\^[ \t]*([A-Za-z0-9({])/g, "$1^$2")
    .replace(/(\d)[ \t]*\/[ \t]*(\d)/g, "$1/$2");
}

export default { normalizeMathSourceNotation };
