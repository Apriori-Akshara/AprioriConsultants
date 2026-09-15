import fs from 'node:fs';

const selectionPath = 'scripts/runBatchMTargetedCandidateSelection.js';
const mathPath = 'src/data/sat/mockContent/mathBankFactoryRemediatedUnique.js';

function requireReplace(text, from, to, label) {
  if (!text.includes(from)) throw new Error(`${label}: expected source text was not found.`);
  return text.replaceAll(from, to);
}

let selection = fs.readFileSync(selectionPath, 'utf8');
selection = selection.replaceAll(
  "sat: { rw: 900, math: 4500 },\n  psat: { rw: 900, math: 4500 },",
  "sat: { rw: 2500, math: 4500 },\n  psat: { rw: 2500, math: 4500 },"
);
fs.writeFileSync(selectionPath, selection);

let math = fs.readFileSync(mathPath, 'utf8');

// The generator's actual construction names are used here; the target-side
// skill aliases are handled by the selection runner.
math = requireReplace(
  math,
  "if (skill === 'Quadratic functions and representations')",
  "if (skill === 'Quadratic functions' || skill === 'Quadratic functions and representations')",
  'quadratic skill alias'
);

// Selection compares raw figure types to the frozen target metadata, so use
// the canonical display type rather than the pre-canonical internal type.
math = math.replaceAll("type: 'quadratic'", "type: 'parabola'");
math = math.replaceAll("type: 'geometry', values: { shape: 'right-triangle', x: leg, y: correct }", "type: 'right_triangle', values: { x: leg, y: correct }");
math = math.replaceAll("type: 'geometry', values: { shape: 'right-triangle', leg, hyp }", "type: 'right_triangle', values: { x: leg, y: hyp }");
math = math.replaceAll("const displayTypes = ['scatter', 'line_chart', 'bar_chart', 'table'];", "const displayTypes = ['scatter_plot', 'line_chart', 'bar_chart', 'table'];");
math = math.replaceAll("type: 'scatter', values: { points", "type: 'scatter_plot', values: { points");
math = math.replaceAll("type: 'scatter', points", "type: 'scatter_plot', points");

fs.writeFileSync(mathPath, math);

console.log(JSON.stringify({
  applied: true,
  selectionPoolCounts: { sat: { rw: 2500, math: 4500 }, psat: { rw: 2500, math: 4500 } },
  mathCoverageFixes: [
    'quadratic-source-skill-figure-remediation',
    'quadratic-canonical-figure-type',
    'data-model-canonical-figure-type',
    'right-triangle-canonical-figure-type',
  ],
}, null, 2));