const MATH_OPERATOR_RE = /(?:\^|_|<=|>=|=|<|>|\*|\/|π|\bpi\b|√|sqrt\(|[⁻⁰¹²³⁴⁵⁶⁷⁸⁹])/i;
const GREEK = new Map([
  ['alpha','α'],['beta','β'],['gamma','γ'],['delta','δ'],['theta','θ'],['lambda','λ'],
  ['mu','μ'],['sigma','σ'],['phi','φ'],['omega','ω'],['pi','π'],['rho','ρ'],
]);

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeSource(value) {
  return String(value ?? '')
    .replace(/\\u2212/g, '−')
    .replace(/\\u00d7/g, '×')
    .replace(/≤/g, '<=')
    .replace(/≥/g, '>=')
    .trim();
}

function plainNormalizeExpression(value) {
  let text = normalizeSource(value)
    .replace(/\bpi\b/gi, 'π')
    .replace(/\balpha\b/gi, 'α')
    .replace(/\bbeta\b/gi, 'β')
    .replace(/\bgamma\b/gi, 'γ')
    .replace(/\bdelta\b/gi, 'δ')
    .replace(/\btheta\b/gi, 'θ')
    .replace(/\blambda\b/gi, 'λ')
    .replace(/\bmu\b/gi, 'μ')
    .replace(/\bsigma\b/gi, 'σ')
    .replace(/\bphi\b/gi, 'φ')
    .replace(/\bomega\b/gi, 'ω')
    .replace(/<=/g, '≤')
    .replace(/>=/g, '≥')
    .replace(/\*/g, '×')
    .replace(/(^|[\s(])-/g, '$1−');
  return text;
}

function isDateLike(value) {
  const text = String(value).trim();
  return /^\d{4}\/\d{1,2}(?:\/\d{1,2})?$/.test(text);
}

function isMathCandidate(value) {
  const text = String(value ?? '').trim();
  if (!text || isDateLike(text)) return false;
  if (!MATH_OPERATOR_RE.test(text)) return false;
  if (/^https?:\/\//i.test(text) || /^www\./i.test(text)) return false;
  return /[0-9A-Za-zπ√]/.test(text);
}

function renderGreekAndSymbols(value) {
  let text = String(value);
  for (const [name, symbol] of GREEK) {
    text = text.replace(new RegExp('\\\\b' + name + '\\\\b', 'gi'), symbol);
  }
  return text
    .replace(/<=/g, '≤')
    .replace(/>=/g, '≥')
    .replace(/\*/g, '×')
    .replace(/−/g, '−');
}

function simpleFractionHtml(value) {
  const match = String(value).match(/^\s*([+\-−]?[A-Za-z0-9πθφμ.]+)\s*\/\s*([+\-−]?[A-Za-z0-9πθφμ.]+)\s*$/);
  if (!match || isDateLike(value)) return null;
  return '<span class="mathFraction"><span class="mathNumerator">' +
    renderExpression(match[1]) +
    '</span><span class="mathFractionBar" aria-hidden="true"></span><span class="mathDenominator">' +
    renderExpression(match[2]) +
    '</span></span>';
}

function consumeBalanced(value, startIndex, open='(', close=')') {
  if (value[startIndex] !== open) return null;
  let depth = 0;
  for (let i = startIndex; i < value.length; i += 1) {
    if (value[i] === open) depth += 1;
    else if (value[i] === close) {
      depth -= 1;
      if (depth === 0) return { content: value.slice(startIndex + 1, i), end: i };
    }
  }
  return null;
}

function renderExpression(value) {
  let text = renderGreekAndSymbols(normalizeSource(value));
  const fraction = simpleFractionHtml(text);
  if (fraction) return fraction;

  let html = '';
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (/^sqrt$/i.test(text.slice(i, i + 4)) && text[i + 4] === '(') {
      const balanced = consumeBalanced(text, i + 4);
      if (balanced) {
        html += '<span class="mathRadical" role="img" aria-label="square root">';
        html += '√<span class="mathRadicand">' + renderExpression(balanced.content) + '</span></span>';
        i = balanced.end;
        continue;
      }
    }

    if (char === '^' || char === '_') {
      const next = text[i + 1];
      if (!next) {
        html += escapeHtml(char);
        continue;
      }
      let content = next;
      let end = i + 1;
      if (next === '(') {
        const balanced = consumeBalanced(text, i + 1);
        if (balanced) {
          content = balanced.content;
          end = balanced.end;
        }
      }
      html += '<span class="' + (char === '^' ? 'mathSup' : 'mathSub') + '">' + renderExpression(content) + '</span>';
      i = end;
      continue;
    }

    if (char === '-' && (i === 0 || /[\s(=+*/<>≤≥]/.test(text[i - 1]))) {
      html += '−';
      continue;
    }

    html += escapeHtml(char);
  }

  return html;
}

function renderMathExpression(value) {
  const source = String(value ?? '').trim();
  const plain = plainNormalizeExpression(source);
  const simpleFraction = simpleFractionHtml(source);
  const visible = simpleFraction || renderExpression(source);
  return '<span class="mathExpression" role="math" aria-label="' + escapeHtml(plain) + '">' + visible + '</span>';
}

function candidatePatterns() {
  return [
    /\b[A-Za-z][A-Za-z0-9_]*\s*(?:<=|>=|=|<|>)\s*[+−-]?\d+(?:\.\d+)?\b/g,
    /sqrt\([^)\n]+\)/gi,
    /\|\s*[^|\n]+\s*\|/g,
    /\(\s*[+\-]?\d+(?:\.\d+)?\s*,\s*[+\-]?\d+(?:\.\d+)?\s*\)/g,
    /\b-?\d+(?:\.\d+)?\s*\/\s*-?\d+(?:\.\d+)?\b/g,
    /\b[A-Za-z]\s*\/\s*[A-Za-z]\b/g,
    /\b[A-Za-z][A-Za-z0-9_]*(?:\([^)\n]+\))?\s*(?:<=|>=|=|<|>)\s*[+\-−]?(?:[A-Za-z0-9πθφμ](?:[A-Za-z0-9_πθφμ]*)?)(?:\s*[\^_]\s*(?:\([^)]+\)|[A-Za-z0-9+−\-./]+))?(?:\s*[+\-×*]\s*(?:[A-Za-z0-9πθφμ]+(?:\s*[\^_]\s*(?:\([^)]+\)|[A-Za-z0-9+−\-./]+))?))* /g,
    /\b[A-Za-zπθφμ][A-Za-z0-9πθφμ]*(?:\s*\^\s*(?:\([^)]+\)|[A-Za-z0-9+−\-./]+))+/g,
    /\b\d+\s*\*\s*[A-Za-zπθφμ]\b/g,
    /\b(?:\d+(?:\.\d+)?\s*)?(?:pi|π)[A-Za-z0-9πθφμ]*(?:\s*\^\s*(?:\([^)]+\)|[A-Za-z0-9+−\-./]+))?/gi,
  ];
}

function findMathRanges(text) {
  const ranges = [];
  for (const pattern of candidatePatterns()) {
    for (const match of String(text).matchAll(pattern)) {
      const value = match[0];
      if (!isMathCandidate(value)) continue;
      const start = match.index;
      const end = start + value.length;
      if (ranges.some((item) => start < item.end && end > item.start)) continue;
      ranges.push({ start, end, value });
    }
  }
  return ranges.sort((a, b) => a.start - b.start);
}

function renderAbsoluteValue(source) {
  const inner = source.trim().replace(/^\|/, '').replace(/\|$/, '');
  return '<span class="mathAbs"><span class="mathAbsBar" aria-hidden="true">|</span>' +
    renderExpression(inner) +
    '<span class="mathAbsBar" aria-hidden="true">|</span></span>';
}

function renderCandidate(value) {
  const source = String(value);
  if (/^\|[\s\S]+\|$/.test(source.trim())) return '<span class="mathExpression" role="math" aria-label="' + escapeHtml(plainNormalizeExpression(source)) + '">' + renderAbsoluteValue(source) + '</span>';
  return renderMathExpression(source);
}

export function normalizeMathExpression(value) {
  return plainNormalizeExpression(value);
}

export function typesetMathText(value) {
  const text = String(value ?? '');
  const ranges = findMathRanges(text);
  if (!ranges.length) {
    return escapeHtml(text).replace(/\n/g, '<br />');
  }

  let html = '';
  let cursor = 0;
  for (const range of ranges) {
    html += escapeHtml(text.slice(cursor, range.start)).replace(/\n/g, '<br />');
    html += renderCandidate(range.value);
    cursor = range.end;
  }
  html += escapeHtml(text.slice(cursor)).replace(/\n/g, '<br />');
  return html;
}

export function formatMathForSvg(value) {
  return plainNormalizeExpression(value)
    .replace(/\^2\b/g, '²')
    .replace(/\^3\b/g, '³')
    .replace(/\^4\b/g, '⁴')
    .replace(/\^5\b/g, '⁵')
    .replace(/\^6\b/g, '⁶')
    .replace(/\^7\b/g, '⁷')
    .replace(/\^8\b/g, '⁸')
    .replace(/\^9\b/g, '⁹')
    .replace(/\^1\b/g, '¹')
    .replace(/\^0\b/g, '⁰')
    .replace(/\^\(([^)]+)\)/g, '^$1')
    .replace(/\s*\/\s*/g, '⁄')
    .replace(/\bsqrt\(([^)]+)\)/gi, '√($1)')
    .replace(/_([0-9]+)/g, (_, value) => value.replace(/[0-9]/g, (digit) => ({ "0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉" }[digit])));
}

export function hasSuspiciousRawMath(value) {
  const text = String(value ?? '');
  if (/https?:\/\/|www\./i.test(text)) return false;
  return findMathRanges(text).some((range) =>
    /(?:\^|<=|>=|sqrt\(|\d+\s*\/\s*\d+|\*)/.test(range.value)
  );
}

export default {
  normalizeMathExpression,
  typesetMathText,
  formatMathForSvg,
  hasSuspiciousRawMath,
};
