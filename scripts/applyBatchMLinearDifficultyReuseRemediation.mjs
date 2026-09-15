import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve(process.cwd(), 'src/data/sat/mockContent/mathBankFactoryRemediatedUnique.js');
let source = fs.readFileSync(file, 'utf8');

const marker = '// Batch M linear difficulty/reuse remediation v1';
if (source.includes(marker)) {
  console.log('Batch M linear difficulty/reuse remediation already present.');
  process.exit(0);
}

function replaceBlock(start, end, replacement) {
  const startIndex = source.indexOf(start);
  if (startIndex < 0) throw new Error(`Start marker not found: ${start}`);
  const endIndex = source.indexOf(end, startIndex + start.length);
  if (endIndex < 0) throw new Error(`End marker not found: ${end}`);
  source = source.slice(0, startIndex) + replacement + source.slice(endIndex);
}

const linear = `  ${marker}
  if (skill === 'Linear relationships' || skill === 'Linear functions') {
    const variant = o % 4;
    // Variant 0: one-step rate interpretation (easy lane).
    if (variant === 0) {
      const slope = 2 + (o % 9);
      const intercept = 11 + o;
      const prompt = 'A delivery service charges a fixed fee of ' + intercept + ' dollars plus ' + slope + ' dollars per mile. The total cost C is a linear function of the number of miles m. What is the rate of change of C with respect to m?';
      return setNumericQuestion(question, prompt, slope, o);
    }
    // Variant 1: derive and evaluate from two points (medium lane).
    if (variant === 1) {
      const x1 = 2 + (o % 11);
      const slope = 3 + (o % 7);
      const y1 = 13 + o;
      const x2 = x1 + 5 + (o % 5);
      const y2 = y1 + slope * (x2 - x1);
      const x3 = x2 + 2 + (o % 6);
      const correct = y2 + slope * (x3 - x2);
      const prompt = 'A linear relationship passes through the points (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + '). What is the value of y when x = ' + x3 + '?';
      return setNumericQuestion(question, prompt, correct, o);
    }
    // Variant 2: threshold with a nontrivial whole-number constraint (hard lane).
    if (variant === 2) {
      const slope = 2 + (o % 8);
      const intercept = 17 + o;
      const target = intercept + slope * (4 + (o % 13)) + 1 + (o % 5);
      const correct = Math.ceil((target - intercept) / slope);
      const prompt = 'A linear model is given by y = ' + slope + 'x + ' + intercept + '. For what smallest whole-number value of x is y at least ' + target + '?';
      return setNumericQuestion(question, prompt, correct, o);
    }
    // Variant 3: starting quantity plus repeated change (medium lane).
    const start = 21 + o;
    const change = 4 + (o % 8);
    const periods = 4 + (o % 9);
    const correct = start + change * periods;
    const prompt = 'A quantity starts at ' + start + ' units and increases by ' + change + ' units during each of the next ' + periods + ' equal intervals. Assuming the relationship remains linear, what is the quantity after those intervals?';
    return setNumericQuestion(question, prompt, correct, o);
  }

`;

const systems = `  if (skill === 'Systems of linear equations' || skill === 'Linear equations') {
    const variant = o % 4;
    const a = 2 + (o % 17);
    const b = 1 + (o % 13);
    const x = 3 + o;
    const y = 5 + (o % 11);
    if (variant === 0) {
      const c1 = a * x + b * y;
      const c2 = (a + 1) * x + b * y;
      const prompt = 'The solution to the system of equations ' + a + 'x + ' + b + 'y = ' + c1 + ' and ' + (a + 1) + 'x + ' + b + 'y = ' + c2 + ' is (x, y). What is the value of x?';
      return setNumericQuestion(question, prompt, x, o);
    }
    if (variant === 1) {
      const c1 = a * x - b * y;
      const c2 = (a + 1) * x - b * y;
      const prompt = 'The solution to the system ' + a + 'x - ' + b + 'y = ' + c1 + ' and ' + (a + 1) + 'x - ' + b + 'y = ' + c2 + ' is (x, y). What is x + y?';
      return setNumericQuestion(question, prompt, x + y, o);
    }
    if (variant === 2) {
      const c1 = a * x + b * y;
      const c2 = (a + 1) * x + b * y;
      const prompt = 'Two quantities x and y satisfy ' + a + 'x + ' + b + 'y = ' + c1 + ' and ' + (a + 1) + 'x + ' + b + 'y = ' + c2 + '. What is the value of y?';
      return setNumericQuestion(question, prompt, y, o);
    }
    const c1 = a * x + b * y;
    const c2 = (a + 1) * x + b * y;
    const prompt = 'A pair (x, y) satisfies ' + a + 'x + ' + b + 'y = ' + c1 + '. A second condition is ' + (a + 1) + 'x + ' + b + 'y = ' + c2 + '. What is the value of x - y?';
    return setNumericQuestion(question, prompt, x - y, o);
  }

`;

const representations = `  if (skill === 'Equivalent linear representations' || skill === 'Linear representations' || skill === 'Linear functions and representations') {
    const variant = o % 4;
    if (variant === 0) {
      const slope = 2 + (o % 9);
      const intercept = 8 + o;
      const x = 4 + (o % 11);
      const correct = slope * x + intercept;
      const prompt = 'A line is represented by y = ' + slope + 'x + ' + intercept + '. A table gives the same linear relationship. What y-value belongs in the table when x = ' + x + '?';
      return setNumericQuestion(question, prompt, correct, o);
    }
    if (variant === 1) {
      const x1 = 1 + (o % 9);
      const y1 = 10 + o;
      const slope = 2 + (o % 7);
      const x2 = x1 + 4 + (o % 5);
      const y2 = y1 + slope * (x2 - x1);
      const prompt = 'A line passes through (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + '). Which numerical value represents the slope of the line?';
      return setNumericQuestion(question, prompt, slope, o);
    }
    if (variant === 2) {
      const slope = 3 + (o % 8);
      const intercept = 12 + o;
      const target = intercept + slope * (3 + (o % 10)) + 1 + (o % 4);
      const correct = (target - intercept) / slope;
      const prompt = 'A linear relationship has equation y = ' + slope + 'x + ' + intercept + '. What value of x gives y = ' + target + '?';
      return setNumericQuestion(question, prompt, correct, o);
    }
    const slope = 2 + (o % 9);
    const x1 = 2 + (o % 8);
    const y1 = 14 + o;
    const x2 = x1 + 3 + (o % 6);
    const y2 = y1 + slope * (x2 - x1);
    const intercept = y1 - slope * x1;
    const prompt = 'A linear relationship passes through (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + '). When written as y = mx + b, what is the value of b?';
    return setNumericQuestion(question, prompt, intercept, o);
  }

`;

replaceBlock(
  "  if (skill === 'Linear relationships' || skill === 'Linear functions') {",
  "  if (skill === 'Systems of linear equations' || skill === 'Linear equations') {",
  linear,
);
replaceBlock(
  "  if (skill === 'Systems of linear equations' || skill === 'Linear equations') {",
  "  if (skill === 'Equivalent linear representations' || skill === 'Linear representations' || skill === 'Linear functions and representations') {",
  systems,
);
replaceBlock(
  "  if (skill === 'Equivalent linear representations' || skill === 'Linear representations' || skill === 'Linear functions and representations') {",
  "  // Preserve the existing strategic construction branches below.",
  representations,
);

fs.writeFileSync(file, source, 'utf8');
console.log('Applied Batch M linear difficulty/reuse remediation v1.');
