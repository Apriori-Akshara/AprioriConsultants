import fs from 'node:fs';

const selectionPath = 'scripts/runBatchMTargetedCandidateSelection.js';
const mathPath = 'src/data/sat/mockContent/mathBankFactoryRemediatedUnique.js';

function replaceIfPresent(text, from, to) {
  return text.includes(from) ? text.replaceAll(from, to) : text;
}

let selection = fs.readFileSync(selectionPath, 'utf8');
selection = replaceIfPresent(selection, "sat: { rw: 900, math: 4500 },\n  psat: { rw: 900, math: 4500 },", "sat: { rw: 5000, math: 8000 },\n  psat: { rw: 5000, math: 8000 },");
selection = replaceIfPresent(selection, "sat: { rw: 2500, math: 4500 },\n  psat: { rw: 2500, math: 4500 },", "sat: { rw: 5000, math: 8000 },\n  psat: { rw: 5000, math: 8000 },");
selection = replaceIfPresent(selection, "const variant = product === 'sat' ? 'sat' : 'psat-nmsqt';", "const variant = product === 'sat' ? 'sat-series-a' : 'psat-nmsqt';");
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
math = replaceIfPresent(
  math,
  "const prompt = `A function is f(x) = (x − ${h})² + ${k}. Another point on the graph has x = ${x} and f(x) = ${value}. What is the value of ${k}?`;\n    return setNumericQuestion(question, prompt, k, o);",
  "const prompt = `The graph of f(x) = (x − ${h})² + ${k} is shown. What is the y-coordinate of the vertex of the graph?`;\n    const a = 1;\n    const b = -2 * h;\n    const c = h * h + k;\n    const remapped = setNumericQuestion(question, prompt, k, o);\n    return { ...remapped, metadata: { ...remapped.metadata, figurePurpose: 'question-essential' }, figure: { type: 'parabola', a, b, c, values: { a, b, c } } };"
);
fs.writeFileSync(mathPath, math);

console.log(JSON.stringify({ applied: true, rerunnable: true, quadraticFigureRemediation: true, quadraticFigurePurpose: 'question-essential', satAssessmentVariant: 'sat-series-a', selectionPoolCounts: { sat: { rw: 5000, math: 8000 }, psat: { rw: 5000, math: 8000 } } }, null, 2));