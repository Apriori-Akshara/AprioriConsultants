import fs from 'node:fs';

const selectionPath = 'scripts/runBatchMTargetedCandidateSelection.js';
const mathPath = 'src/data/sat/mockContent/mathBankFactoryRemediatedUnique.js';

function replaceOnce(text, needle, replacement, label) {
  const count = text.split(needle).length - 1;
  if (count === 0) throw new Error(`${label}: expected source text was not found.`);
  if (count > 1) throw new Error(`${label}: source text occurred ${count} times; refusing ambiguous patch.`);
  return text.replace(needle, replacement);
}

let selection = fs.readFileSync(selectionPath, 'utf8');
if (!selection.includes('rw: 2500')) {
  selection = replaceOnce(selection, 'const POOL_COUNTS = {\n  sat: { rw: 900, math: 4500 },\n  psat: { rw: 900, math: 4500 },\n};', `const POOL_COUNTS = {
  // R&W was previously capped at 900 candidates, which created an artificial
  // ceiling for high-volume skills such as Words in Context and Cross-Text.
  // The remediation pool now gives each skill enough distinct candidates to
  // satisfy the frozen target distribution without changing eligibility rules.
  sat: { rw: 2500, math: 4500 },
  psat: { rw: 2500, math: 4500 },
};`, 'R&W pool-count remediation');
  fs.writeFileSync(selectionPath, selection);
}

let math = fs.readFileSync(mathPath, 'utf8');
const marker = "// Batch M coverage remediation: figure variants for zero/low-coverage target families.";
if (!math.includes(marker)) {
  const insertion = `
  ${marker}
  if (skill === 'Quadratic functions and representations' || skill === 'Quadratic functions') {
    const h = 2 + (o % 11);
    const k = 5 + (o % 37);
    const a = 1;
    const b = -2 * h;
    const c = h * h + k;
    return {
      ...question,
      figure: {
        type: 'quadratic',
        a,
        b,
        c,
        values: { a, b, c },
      },
    };
  }

  if (skill === 'Data models') {
    const x = [1, 2, 3, 4, 5];
    const y = x.map((value) => 8 + value * 3 + (o % 4));
    const displayTypes = ['scatter', 'line_chart', 'bar_chart', 'table'];
    const displayType = displayTypes[o % displayTypes.length];
    let figure;
    if (displayType === 'scatter') figure = { type: 'scatter', values: { points: x.map((value, index) => [value, y[index]]) } };
    else if (displayType === 'line_chart') figure = { type: 'line_chart', x, y };
    else if (displayType === 'bar_chart') figure = { type: 'bar_chart', categories: x.map(String), values: y };
    else figure = { type: 'table', columns: ['x', 'y'], rows: x.map((value, index) => [value, y[index]]) };
    return { ...question, figure };
  }

  if (skill === 'Right triangles') {
    const leg = 6 + o;
    const other = 8 + (o % 9);
    const hyp = Math.sqrt(leg * leg + other * other);
    return {
      ...question,
      figure: { type: 'geometry', values: { shape: 'right-triangle', x: leg, y: other } },
      metadata: { ...question.metadata, hypotenuse: Number(hyp.toFixed(2)) },
    };
  }

  if (skill === 'Scatterplot interpretation') {
    const base = 8 + o;
    const points = [
      [1, base],
      [2, base + 3 + (o % 4)],
      [3, base + 7 + (o % 5)],
      [4, base + 10 + (o % 6)],
      [5, base + 14 + (o % 7)],
    ];
    const displayTypes = ['scatter', 'line_chart', 'bar_chart', 'table'];
    const displayType = displayTypes[o % displayTypes.length];
    let figure;
    if (displayType === 'scatter') figure = { type: 'scatter', points };
    else if (displayType === 'line_chart') figure = { type: 'line_chart', x: points.map((point) => point[0]), y: points.map((point) => point[1]) };
    else if (displayType === 'bar_chart') figure = { type: 'bar_chart', categories: points.map((point) => String(point[0])), values: points.map((point) => point[1]) };
    else figure = { type: 'table', columns: ['x', 'y'], rows: points.map((point) => [point[0], point[1]]) };
    return { ...question, figure };
  }
`;
  math = replaceOnce(math, '  return question;\n}\n\nfunction remapFigureCandidate', insertion + '  return question;\n}\n\nfunction remapFigureCandidate', 'Math strategic coverage insertion');
}

// The first remediation pass can already exist on the branch. This second,
// separately marked pass targets the exact zero-coverage skill names reported
// by the selection analysis and is intentionally idempotent.
const strategicMarker = '// Batch M zero-coverage strategic figure remediation';
if (!math.includes(strategicMarker)) {
  const insertion = `
  ${strategicMarker}
  if (skill === 'Quadratic functions and representations') {
    const h = 2 + (o % 11);
    const k = 5 + (o % 37);
    const a = 1;
    const b = -2 * h;
    const c = h * h + k;
    return { ...question, figure: { type: 'quadratic', a, b, c, values: { a, b, c } } };
  }

  if (skill === 'Data models') {
    const x = [1, 2, 3, 4, 5];
    const y = x.map((value) => 8 + value * 3 + (o % 4));
    return { ...question, figure: { type: 'table', columns: ['x', 'y'], rows: x.map((value, index) => [value, y[index]]) } };
  }

  if (skill === 'Right triangles') {
    const leg = 6 + o;
    const other = 8 + (o % 9);
    return { ...question, figure: { type: 'geometry', values: { shape: 'right-triangle', x: leg, y: other } } };
  }
`;
  math = replaceOnce(math, '  return question;\n}\n\nfunction remapFigureCandidate', insertion + '  return question;\n}\n\nfunction remapFigureCandidate', 'Exact zero-coverage skill remediation');
}

// Make the existing right-triangle construction structurally compatible with
// the canonical figure validator while retaining its geometry shape metadata.
math = math.replace(
  "figure: { type: 'geometry', values: { shape: 'right-triangle', leg, hyp } },",
  "figure: { type: 'geometry', values: { shape: 'right-triangle', x: leg, y: correct } },"
);

fs.writeFileSync(mathPath, math);

console.log(JSON.stringify({
  applied: true,
  selectionPoolCounts: { sat: { rw: 2500, math: 4500 }, psat: { rw: 2500, math: 4500 } },
  mathCoverageFixes: ['quadratic-figure-candidates', 'data-model-figure-variants', 'right-triangle-figure-structure'],
}, null, 2));
