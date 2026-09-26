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
const URL_PATTERN = /\bhttps?:\/\/[^\s"']+/gi;

function protectUrls(value) {
  const urls = [];
  const protectedValue = String(value ?? "").replace(URL_PATTERN, (url) => {
    const token = "__APR_URL_" + urls.length + "__";
    urls.push(url);
    return token;
  });
  return { protectedValue, urls };
}

export function normalizeMathSourceNotation(value) {
  const { protectedValue, urls } = protectUrls(value);
  let normalized = normalizeWhitespace(protectedValue)
    .replace(/−/g, "-")
    .replace(/\u2212/g, "-")
    .replace(/<=/g, "≤")
    .replace(/>=/g, "≥")
    .replace(/([A-Za-z0-9)\]])[ \t]*\^[ \t]*([A-Za-z0-9({])/g, "$1^$2")
    .replace(/(\d)[ \t]*\/[ \t]*(\d)/g, "$1/$2");
  urls.forEach((url, index) => {
    normalized = normalized.replace("__APR_URL_" + index + "__", url);
  });
  return normalized;
}

export default { normalizeMathSourceNotation };
