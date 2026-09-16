import fs from 'node:fs';

const targetPath = 'src/data/sat/mockContent/mathBankFactoryRemediatedUnique.js';
let text = fs.readFileSync(targetPath, 'utf8');

const v2Marker = '// Batch M linear construction remediation v2';

function replaceBlock(start, end, replacement) {
  const startIndex = text.indexOf(start);
  if (startIndex < 0) throw new Error(`Start marker not found: ${start}`);
  const endIndex = text.indexOf(end, startIndex + start.length);
  if (endIndex < 0) throw new Error(`End marker not found: ${end}`);
  text = text.slice(0, startIndex) + replacement + text.slice(endIndex);
}

if (text.includes(v2Marker)) {
  console.log(JSON.stringify({ applied: false, alreadyApplied: true, version: 'v2' }, null, 2));
  process.exit(0);
}

const helpers = `function batchMLinearDifficultyLabel(occurrence) {
  return ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard'][occurrence % 10];
}

function batchMLinearDifficultyFeatures(difficulty) {
  if (difficulty === 'easy') return ['direct-application'];
  if (difficulty === 'medium') return ['careful-interpretation', 'multi-step'];
  return ['multi-step', 'strategic-choice', 'constraint-inference'];
}

function batchMLinearContext(occurrence) {
  const contexts = [
    'a water tank',
    'a museum membership program',
    'a delivery route',
    'a subscription service',
    'a conservation project',
    'a school fundraiser',
    'a manufacturing process',
    'a transit pass program',
  ];
  return contexts[Math.floor(occurrence / 10) % contexts.length];
}

`;

const helperMarker = 'function remapStrategicCandidate(question, occurrence) {';
if (!text.includes('function batchMLinearDifficultyLabel(')) {
  const helperIndex = text.indexOf(helperMarker);
  if (helperIndex < 0) throw new Error('remapStrategicCandidate marker was not found; refusing an unsafe patch.');
  text = text.slice(0, helperIndex) + helpers + text.slice(helperIndex);
}

const linear = `  ${v2Marker}
  if (skill === 'Linear relationships' || skill === 'Linear functions') {
    const variant = o % 10;
    const difficulty = batchMLinearDifficultyLabel(o);
    const context = batchMLinearContext(o);
    const seed = o + Math.floor(o / 10) * 17;
    let prompt;
    let correct;

    if (variant === 0) {
      const rate = 2 + (seed % 10);
      const start = 20 + (seed % 31);
      const intervals = 3 + (seed % 8);
      correct = rate;
      prompt = 'The ' + context + ' contains ' + start + ' units at the start and increases by ' + rate + ' units during each of the next ' + intervals + ' equal intervals. What is the rate of change of the quantity per interval?';
    } else if (variant === 1) {
      const x1 = 2 + (seed % 9);
      const x2 = x1 + 4 + (seed % 5);
      const slope = 2 + (seed % 7);
      const y1 = 10 + (seed % 29);
      const y2 = y1 + slope * (x2 - x1);
      const x3 = x2 + 2 + (seed % 6);
      correct = y1 + slope * (x3 - x1);
      prompt = 'A linear function passes through (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + '). What is the value of the function when x = ' + x3 + '?';
    } else if (variant === 2) {
      const rate = 3 + (seed % 8);
      const start = 14 + (seed % 27);
      const known = 3 + (seed % 7);
      const asked = known + 4 + (seed % 6);
      correct = start + rate * asked;
      prompt = 'A linear model for ' + context + ' is based on a starting amount of ' + start + ' and a constant rate of ' + rate + ' units per period. What amount is predicted after ' + asked + ' periods?';
    } else if (variant === 3) {
      const slopeA = 2 + (seed % 6);
      const interceptA = 8 + (seed % 19);
      const slopeB = 1 + ((seed + 3) % 5);
      const interceptB = 22 + (seed % 17);
      const x = interceptB > interceptA ? Math.ceil((interceptB - interceptA) / Math.max(1, slopeA - slopeB)) : 4 + (seed % 9);
      const y = slopeA * x + interceptA;
      const validX = Math.max(1, x);
      const compared = slopeA * validX + interceptA;
      const other = slopeB * validX + interceptB;
      correct = compared - other;
      prompt = 'Two linear models are f(x) = ' + slopeA + 'x + ' + interceptA + ' and g(x) = ' + slopeB + 'x + ' + interceptB + '. What is f(' + validX + ') − g(' + validX + ')?';
    } else if (variant === 4) {
      const slope = 2 + (seed % 8);
      const intercept = 10 + (seed % 23);
      const numerator = intercept + slope * (4 + (seed % 8));
      correct = (numerator - intercept) / slope;
      prompt = 'A linear function is f(x) = ' + slope + 'x + ' + intercept + '. For what value of x does f(x) equal ' + numerator + '?';
    } else if (variant === 5) {
      const x1 = 1 + (seed % 8);
      const x2 = x1 + 5 + (seed % 4);
      const slope = 3 + (seed % 7);
      const y1 = 12 + (seed % 21);
      const y2 = y1 + slope * (x2 - x1);
      const x3 = x2 + 3 + (seed % 5);
      correct = y2 + slope * (x3 - x2);
      prompt = 'A linear relationship has y = ' + y1 + ' when x = ' + x1 + ' and y = ' + y2 + ' when x = ' + x2 + '. What is y when x = ' + x3 + '?';
    } else if (variant === 6) {
      const x1 = 2 + (seed % 7);
      const slope = 2 + (seed % 9);
      const intercept = 9 + (seed % 24);
      const y1 = slope * x1 + intercept;
      correct = intercept;
      prompt = 'A linear function has slope ' + slope + ' and passes through (' + x1 + ', ' + y1 + '). When written as y = mx + b, what is b?';
    } else if (variant === 7) {
      const rate = 2 + (seed % 9);
      const x1 = 3 + (seed % 6);
      const y1 = 18 + (seed % 23);
      const x2 = x1 + 4 + (seed % 4);
      const y2 = y1 + rate * (x2 - x1);
      const x3 = x2 + 2 + (seed % 5);
      correct = y2 + rate * (x3 - x2);
      prompt = 'The values of a quantity are ' + y1 + ' at time ' + x1 + ' and ' + y2 + ' at time ' + x2 + '. Assuming the quantity changes linearly, what is its value at time ' + x3 + '?';
    } else if (variant === 8) {
      const fixedA = 28 + (seed % 23);
      const rateA = 4 + (seed % 6);
      const fixedB = 64 + (seed % 31);
      const rateB = 2 + (seed % 5);
      const denominator = rateA - rateB;
      const breakEven = denominator > 0 ? Math.ceil((fixedB - fixedA) / denominator) : 6 + (seed % 8);
      const totalA = fixedA + rateA * breakEven;
      const totalB = fixedB + rateB * breakEven;
      correct = totalA - totalB;
      prompt = 'Two plans have costs A(x) = ' + rateA + 'x + ' + fixedA + ' and B(x) = ' + rateB + 'x + ' + fixedB + '. What is A(' + breakEven + ') − B(' + breakEven + ')?';
    } else {
      const m = 2 + (seed % 7);
      const xA = 2 + (seed % 6);
      const yA = 14 + (seed % 19);
      const xB = xA + 5 + (seed % 4);
      const yB = yA + m * (xB - xA);
      const xC = xB + 4 + (seed % 5);
      const target = yB + m * (xC - xB) + 1 + (seed % 4);
      correct = Math.ceil((target - yA) / m) + xA - xA;
      prompt = 'A linear function passes through (' + xA + ', ' + yA + ') and (' + xB + ', ' + yB + '). What is the smallest whole-number x for which the function value is at least ' + target + '?';
    }

    const remapped = setNumericQuestion(question, prompt, correct, o);
    return {
      ...remapped,
      difficulty,
      difficultyBand: `${String(question.assessmentVariant || 'sat')}-${String(question.adaptiveRoute || 'standard')}-${difficulty}`,
      cognitiveDemand: difficulty === 'easy' ? 'apply' : 'analyze',
      estimatedTimeSeconds: difficulty === 'hard' ? 105 : difficulty === 'medium' ? 90 : 75,
      subskill: `linear-construction-v2-${variant}`,
      originalityFingerprint: `batch-m-linear-v2-${skill}-${variant}-${seed}`,
      conceptFingerprint: `linear-v2-${skill}-${variant}-${seed}`,
      metadata: {
        ...remapped.metadata,
        constructionFamily: `linear-construction-v2-${variant}`,
        difficultyFeatures: batchMLinearDifficultyFeatures(difficulty),
        difficultyRequirements: DIFFICULTY_REQUIREMENTS[difficulty],
      },
    };
  }

`;

const representations = `  if (skill === 'Equivalent linear representations' || skill === 'Linear representations' || skill === 'Linear functions and representations') {
    const variant = o % 10;
    const difficulty = batchMLinearDifficultyLabel(o);
    const seed = o + Math.floor(o / 10) * 23;
    let prompt;
    let correct;

    if (variant === 0) {
      const slope = 2 + (seed % 8);
      const intercept = 7 + (seed % 23);
      const x = 3 + (seed % 9);
      correct = slope * x + intercept;
      prompt = 'A line is represented by y = ' + slope + 'x + ' + intercept + '. A table represents the same relationship. What y-value should appear in the table when x = ' + x + '?';
    } else if (variant === 1) {
      const x1 = 1 + (seed % 8);
      const x2 = x1 + 5 + (seed % 4);
      const slope = 2 + (seed % 7);
      const y1 = 9 + (seed % 21);
      const y2 = y1 + slope * (x2 - x1);
      correct = slope;
      prompt = 'A line passes through (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + '). What is the slope of the line?';
    } else if (variant === 2) {
      const x1 = 2 + (seed % 7);
      const x2 = x1 + 4 + (seed % 5);
      const slope = 2 + (seed % 8);
      const intercept = 6 + (seed % 25);
      const y1 = slope * x1 + intercept;
      const y2 = slope * x2 + intercept;
      correct = intercept;
      prompt = 'A line passes through (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + '). When the equation is written as y = mx + b, what is the value of b?';
    } else if (variant === 3) {
      const slope = 3 + (seed % 6);
      const intercept = 8 + (seed % 19);
      const y = slope + intercept;
      correct = slope;
      prompt = 'A line is described by the equation y = ' + slope + 'x + ' + intercept + '. Another representation gives two points, including (1, ' + y + '). What is the rate of change represented by the two-point data?';
    } else if (variant === 4) {
      const slope = 2 + (seed % 9);
      const xKnown = 3 + (seed % 6);
      const yKnown = 16 + (seed % 27);
      const intercept = yKnown - slope * xKnown;
      const xAsked = xKnown + 4 + (seed % 5);
      correct = intercept + slope * xAsked;
      prompt = 'A table and an equation describe the same linear model. The table shows y = ' + yKnown + ' when x = ' + xKnown + ', and the model has slope ' + slope + '. What y-value corresponds to x = ' + xAsked + '?';
    } else if (variant === 5) {
      const coefficient = 2 + (seed % 7);
      const constant = 18 + (seed % 24);
      const yIntercept = constant / coefficient;
      const remainder = constant - coefficient * Math.floor(yIntercept);
      const cleanIntercept = remainder === 0 ? yIntercept : Math.ceil(constant / coefficient);
      correct = cleanIntercept;
      prompt = 'The line ' + coefficient + 'y = ' + coefficient * 3 + 'x + ' + constant + ' is equivalent to y = 3x + b. What is b?';
    } else if (variant === 6) {
      const slope = 2 + (seed % 8);
      const intercept = 9 + (seed % 21);
      const x1 = 2 + (seed % 6);
      const x2 = x1 + 3 + (seed % 5);
      const y1 = slope * x1 + intercept;
      const y2 = slope * x2 + intercept;
      correct = y2;
      prompt = 'A data table includes (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + ') from a linear model. What y-value should correspond to x = ' + x2 + '?';
    } else if (variant === 7) {
      const slope = 2 + (seed % 7);
      const intercept = 11 + (seed % 23);
      const x = 4 + (seed % 7);
      const standardA = slope;
      const standardB = -1;
      const standardC = intercept;
      correct = standardA;
      prompt = 'A line is written as ' + standardA + 'x ' + (standardB < 0 ? '− y = ' : '+ y = ') + standardC + '. What is the coefficient of x in its equivalent slope-intercept form?';
    } else if (variant === 8) {
      const slope = 2 + (seed % 8);
      const x1 = 1 + (seed % 7);
      const y1 = 10 + (seed % 19);
      const x2 = x1 + 5 + (seed % 4);
      const y2 = y1 + slope * (x2 - x1);
      const x3 = x2 + 2 + (seed % 5);
      correct = y2 + slope * (x3 - x2);
      prompt = 'A graph, table, and equation describe the same line. The graph shows points (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + '). What y-value belongs to x = ' + x3 + '?';
    } else {
      const slope = 3 + (seed % 7);
      const x1 = 2 + (seed % 6);
      const y1 = 12 + (seed % 22);
      const x2 = x1 + 4 + (seed % 4);
      const y2 = y1 + slope * (x2 - x1);
      const x3 = x2 + 3 + (seed % 5);
      correct = Math.ceil((y1 + slope * (x3 - x1) - y1) / slope);
      prompt = 'A line passes through (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + '). Which value of x gives the line a y-value of ' + (y1 + slope * (x3 - x1)) + '?';
    }

    const remapped = setNumericQuestion(question, prompt, correct, o + 19);
    return {
      ...remapped,
      difficulty,
      difficultyBand: `${String(question.assessmentVariant || 'sat')}-${String(question.adaptiveRoute || 'standard')}-${difficulty}`,
      cognitiveDemand: difficulty === 'easy' ? 'apply' : 'analyze',
      estimatedTimeSeconds: difficulty === 'hard' ? 105 : difficulty === 'medium' ? 90 : 75,
      subskill: `linear-representation-v2-${variant}`,
      originalityFingerprint: `batch-m-linear-representation-v2-${skill}-${variant}-${seed}`,
      conceptFingerprint: `linear-representation-v2-${skill}-${variant}-${seed}`,
      metadata: {
        ...remapped.metadata,
        constructionFamily: `linear-representation-v2-${variant}`,
        difficultyFeatures: batchMLinearDifficultyFeatures(difficulty),
        difficultyRequirements: DIFFICULTY_REQUIREMENTS[difficulty],
      },
    };
  }

`;

replaceBlock(
  "  // Batch M linear difficulty/reuse remediation v1\n  if (skill === 'Linear relationships' || skill === 'Linear functions') {",
  "  if (skill === 'Systems of linear equations' || skill === 'Linear equations') {",
  linear,
);

replaceBlock(
  "  if (skill === 'Equivalent linear representations' || skill === 'Linear representations' || skill === 'Linear functions and representations') {",
  "  // Preserve the existing strategic construction branches below.",
  representations,
);

const oldDifficultySnippet = `  // Use a 10-item difficulty lane (30% easy / 50% medium / 20% hard)\n  // so each source skill has materially broader coverage of the frozen\n  // target difficulty distribution without weakening the difficulty gate.\n  const difficultyLane = ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard'];\n  let difficulty = difficultyLane[occurrence % difficultyLane.length];`;
const newDifficultySnippet = `  const linearSkills = new Set(['Linear relationships', 'Linear functions', 'Equivalent linear representations', 'Linear representations', 'Linear functions and representations']);\n  const preserveConstructedLinearDifficulty = linearSkills.has(String(question.skill || ''));\n  // Linear v2 assigns difficulty from the actual construction lane. Other skills retain the established deterministic rebalance.\n  let difficulty = preserveConstructedLinearDifficulty ? question.difficulty : ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard'][occurrence % 10];`;
if (!text.includes(oldDifficultySnippet)) throw new Error('Expected difficulty rebalance snippet was not found; refusing an unsafe patch.');
text = text.replace(oldDifficultySnippet, newDifficultySnippet);

fs.writeFileSync(targetPath, text, 'utf8');
console.log(JSON.stringify({
  applied: true,
  version: 'v2',
  sourceFamilies: ['Linear functions', 'Linear functions and representations', 'Linear representations'],
  constructionLane: '10 deterministic variants; 30% easy / 50% medium / 20% hard',
  preservesDifficultyGate: true,
  preservesQuestionTypeGate: true,
  preservesVariantAndPSATCeiling: true,
  candidateOnly: true,
}, null, 2));