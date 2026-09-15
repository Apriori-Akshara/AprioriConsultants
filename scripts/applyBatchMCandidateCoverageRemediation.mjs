import fs from 'node:fs';

const selectionPath = 'scripts/runBatchMTargetedCandidateSelection.js';
const mathPath = 'src/data/sat/mockContent/mathBankFactoryRemediatedUnique.js';

function replaceIfPresent(text, from, to) {
  return text.includes(from) ? text.replaceAll(from, to) : text;
}

let selection = fs.readFileSync(selectionPath, 'utf8');
selection = replaceIfPresent(selection, "sat: { rw: 900, math: 4500 },\n  psat: { rw: 900, math: 4500 },", "sat: { rw: 2500, math: 4500 },\n  psat: { rw: 2500, math: 4500 },");
fs.writeFileSync(selectionPath, selection);

let math = fs.readFileSync(mathPath, 'utf8');
math = replaceIfPresent(math, "if (skill === 'Quadratic functions')", "if (skill === 'Quadratic functions' || skill === 'Quadratic functions and representations')");
math = replaceIfPresent(math, "if (skill === 'Quadratic functions and representations')", "if (skill === 'Quadratic functions' || skill === 'Quadratic functions and representations')");
math = replaceIfPresent(math, "type: 'quadratic'", "type: 'parabola'");
math = replaceIfPresent(math, "type: 'geometry', values: { shape: 'right-triangle', x: leg, y: correct }", "type: 'right_triangle', values: { x: leg, y: correct }");
math = replaceIfPresent(math, "type: 'geometry', values: { shape: 'right-triangle', leg, hyp }", "type: 'right_triangle', values: { x: leg, y: hyp }");
math = replaceIfPresent(math, "const displayTypes = ['scatter', 'line_chart', 'bar_chart', 'table'];", "const displayTypes = ['scatter_plot', 'line_chart', 'bar_chart', 'table'];");
math = replaceIfPresent(math, "type: 'scatter', values: { points", "type: 'scatter_plot', values: { points");
math = replaceIfPresent(math, "type: 'scatter', points", "type: 'scatter_plot', points");
fs.writeFileSync(mathPath, math);

console.log(JSON.stringify({ applied: true, rerunnable: true, selectionPoolCounts: { sat: { rw: 2500, math: 4500 }, psat: { rw: 2500, math: 4500 } } }, null, 2));