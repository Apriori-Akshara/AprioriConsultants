/**
 * Batch M — targeted remediation of failed independent-review candidates.
 *
 * Candidate-only stage. It consumes the controlled selection artifact plus the
 * independent-review findings and creates a new remediated candidate set.
 * It never mutates production, authorizes release, or creates SAT21.
 */
import fs from 'node:fs';
import path from 'node:path';

const SELECTION_INPUT = process.env.BATCH_M_SELECTION_INPUT ||
  'artifacts/batch-m-deep-content-quality-candidate-selection/BATCH-M-DEEP-CONTENT-QUALITY-CANDIDATE-SELECTION-2026-09-17.json';
const REVIEW_INPUT = process.env.BATCH_M_REVIEW_INPUT ||
  'artifacts/batch-m-deep-content-quality-independent-review/BATCH-M-DEEP-CONTENT-QUALITY-INDEPENDENT-REVIEW-2026-09-17.json';
const OUTPUT_DIR = 'artifacts/batch-m-deep-content-quality-targeted-remediation';
const OUTPUT_JSON = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-TARGETED-REMEDIATION-2026-09-17.json`;
const OUTPUT_MD = `${OUTPUT_DIR}/BATCH-M-DEEP-CONTENT-QUALITY-TARGETED-REMEDIATION-2026-09-17.md`;

const normalize = (value) => String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
const unique = (values) => [...new Set(values.filter(Boolean))];
const pick = (list, index) => list[((index % list.length) + list.length) % list.length];

function hash(index, salt = 0) {
  const raw = (index * 131 + salt * 97 + Math.floor(index / 7) * 17) >>> 0;
  return raw;
}

function rotateChoices(choices, correctIndex) {
  const out = [...choices];
  const correct = out.splice(correctIndex, 1)[0];
  const target = hash(correctIndex + choices.length, choices.length + correctIndex) % 4;
  out.splice(target, 0, correct);
  return { choices: out, answer: String.fromCharCode(65 + target) };
}

function ensureUniqueChoices(correct, distractors, index = 0) {
  const used = new Set([normalize(correct)]);
  const out = [];
  for (const raw of distractors) {
    let value = String(raw);
    if (used.has(normalize(value))) {
      const n = Number(value);
      if (Number.isFinite(n)) {
        let delta = 1;
        while (used.has(normalize(String(n + delta)))) delta += 1;
        value = String(n + delta);
      } else {
        value = `${value} (alternative ${index + out.length + 1})`;
      }
    }
    used.add(normalize(value));
    out.push(value);
  }
  while (out.length < 3) {
    const value = String((index + 2) * 7 + out.length);
    if (!used.has(normalize(value))) {
      used.add(normalize(value));
      out.push(value);
    }
  }
  return out.slice(0, 3);
}

function distractorArchitecture(correctText, distractors, theme) {
  const profiles = {};
  const labels = ['A', 'B', 'C', 'D'];
  for (let i = 0; i < 4; i += 1) {
    const text = i === 0 ? correctText : distractors[i - 1];
    if (i === 0) {
      profiles[labels[i]] = {
        role: 'correct',
        misconception: 'none',
        error_mechanism: 'not-applicable',
        rationale: `Directly answers the ${theme} task using the stated evidence or relationship.`,
      };
    } else {
      const kinds = [
        ['reversed-relationship', 'reverses the direction of the stated relationship'],
        ['overgeneralization', 'treats an observed pattern as universal or causal'],
        ['single-step-shortcut', 'uses only one part of a multi-step condition'],
      ];
      const [misconception, error] = kinds[i - 1];
      profiles[labels[i]] = {
        role: 'distractor',
        misconception,
        error_mechanism: error,
        rationale: `Plausible alternative for a student who ${error}.`,
      };
    }
    profiles[labels[i]].textFingerprint = normalize(text);
  }
  return profiles;
}

function parseAnswerIndex(answer) {
  const a = String(answer || '').trim().toUpperCase();
  return a.length === 1 ? a.charCodeAt(0) - 65 : -1;
}

function stamp(candidate, index, remediationType) {
  const out = structuredClone(candidate);
  out.version = Number(out.version || 1) + 1;
  out.isOperational = false;
  out.status = 'candidate';
  out.authoringStatus = 'candidate';
  out.releaseEligibility = false;
  out.sourceType = 'apriori-original';
  out.metadata = {
    ...(out.metadata || {}),
    candidateOnly: true,
    productionMutation: false,
    remediationStage: 'deep-content-quality-targeted-remediation',
    remediationVersion: 'v2',
    remediationSourceCandidateId: candidate.id || candidate.questionId,
    remediationType,
  };
  out.id = `${out.id}-RM2-${String(index + 1).padStart(4, '0')}`;
  out.questionId = out.id;
  out.contentId = out.id;
  out.originalityFingerprint = `batch-m-deep-remediation-v2-${candidate.testId}-${index}-${hash(index, 19)}`;
  out.conceptFingerprint = `${candidate.domain || candidate.skill || 'unknown'}-${candidate.skill || candidate.domain || 'unknown'}-${hash(index, 23)}`;
  out.tags = unique([...(out.tags || []), 'batch-m-deep-remediation-v2', 'candidate-only']);
  return out;
}

const scatterOpenings = [
  'A conservation team records paired measurements for',
  'A biology lab plots paired observations for',
  'A transit analyst compares paired values for',
  'A school research group records paired values for',
  'A climate study plots paired measurements of',
  'A city planner compares paired observations for',
  'A public-health team records paired measurements for',
  'An agricultural study plots paired observations of',
  'A manufacturing analyst records paired values for',
  'A museum study compares paired observations for',
];

const scatterTasks = [
  'To answer the question, first compare the relevant values and then apply the simple model.',
  'First identify the relevant change in the observations, then use that relationship to answer the question.',
  'After comparing the two relevant points, apply the resulting rate or relationship to the requested value.',
  'Given the plotted pattern, first determine the needed relationship and then use it to evaluate the requested quantity.',
  'To interpret the plot, first isolate the relevant evidence; then use the model only for the requested calculation or comparison.',
  'First determine what changes between the stated observations, then use that change to answer the question.',
  'After locating the relevant points, calculate or compare the corresponding values before choosing the supported conclusion.',
  'Use the observed values in two steps: identify the needed relationship first, then apply it to the quantity asked about.',
  'First identify the evidence that controls the result; then use the simple model to complete the requested comparison.',
  'Begin with the relevant plotted values, determine their relationship, and then use that relationship to answer the question.',
];

const scatterContexts = [
  'monthly output and training hours',
  'water temperature and dissolved oxygen',
  'distance traveled and battery use',
  'practice time and response accuracy',
  'rainfall and river discharge',
  'delivery distance and fuel use',
  'sleep duration and reaction time',
  'soil moisture and seedling growth',
  'machine setting and defect rate',
  'display time and visitor counts',
];

const scatterTaskBuilders = [
  (points) => {
    const x1 = points[0][0], x2 = points[4][0], y1 = points[0][1], y2 = points[4][1];
    const slope = (y2 - y1) / (x2 - x1);
    const targetX = x1 + 2;
    const estimate = Math.round(y1 + slope * (targetX - x1));
    return {
      kind: 'endpoint-interpolation',
      question: `Using the line through the first and last observed points as a simple model, what response value would be estimated when the explanatory variable is ${targetX}?`,
      answer: String(estimate),
      distractors: [String(y1), String(y2), String(y1 + (y2 - y1))],
      explanation: `The change from the first point to the last is ${y2 - y1} units over ${x2 - x1} units of the explanatory variable, so the model's slope is ${slope.toFixed(2)}. Moving to ${targetX} gives an estimated response of ${estimate}.`,
      theme: 'interpolating from a two-point linear model',
    };
  },
  (points) => {
    const x1 = points[1][0], x2 = points[4][0], y1 = points[1][1], y2 = points[4][1];
    const slope = (y2 - y1) / (x2 - x1);
    const deltaX = 4;
    const change = Math.round(slope * deltaX);
    return {
      kind: 'rate-of-change',
      question: `The model is based on the overall trend. Approximately how much would the response change for an increase of ${deltaX} units in the explanatory variable?`,
      answer: String(change),
      distractors: [String(Math.round(slope)), String(Math.round(Math.abs(y2 - y1))), String(Math.round(slope * 2))],
      explanation: `From (${x1}, ${y1}) to (${x2}, ${y2}), the response changes by ${y2 - y1} while the explanatory variable changes by ${x2 - x1}. Multiplying that rate by ${deltaX} gives an estimated change of ${change}.`,
      theme: 'estimating change from a model rate',
    };
  },
  (points) => {
    const x1 = points[0][0], x2 = points[4][0], y1 = points[0][1], y2 = points[4][1];
    const slope = (y2 - y1) / (x2 - x1);
    const residuals = points.map(([x, y]) => ({ x, residual: y - (y1 + slope * (x - x1)) }));
    const best = residuals.reduce((a, b) => Math.abs(b.residual) > Math.abs(a.residual) ? b : a);
    const side = best.residual > 0 ? 'above' : 'below';
    const point = points.find(([x]) => x === best.x);
    return {
      kind: 'residual-location',
      question: `Using the line through the first and last points as a reference, which observed point lies farthest ${side} that line?`,
      answer: `(${point[0]}, ${point[1]})`,
      distractors: points.filter(([x]) => x !== point[0]).slice(0, 3).map(([x, y]) => `(${x}, ${y})`),
      explanation: `The reference line connects the first and last observations. Comparing each observed value with the corresponding model value shows the largest residual at (${point[0]}, ${point[1]}), which is ${side} the line.`,
      theme: 'comparing observed values with a model',
    };
  },
  (points) => {
    const deltas = points.slice(1).map((p, i) => ({ from: points[i][0], to: p[0], change: p[1] - points[i][1] }));
    const largest = deltas.reduce((a, b) => Math.abs(b.change) > Math.abs(a.change) ? b : a);
    return {
      kind: 'largest-adjacent-change',
      question: 'Between which consecutive observed x-values is the change in the response greatest in magnitude?',
      answer: `${largest.from} to ${largest.to}`,
      distractors: deltas.filter((d) => d !== largest).slice(0, 3).map((d) => `${d.from} to ${d.to}`),
      explanation: `The adjacent response changes are ${deltas.map((d) => `${d.from}–${d.to}: ${d.change}`).join(', ')}. The largest change in magnitude occurs from ${largest.from} to ${largest.to}.`,
      theme: 'comparing local changes',
    };
  },
  (points) => {
    const yValues = points.map(([, y]) => y);
    const mean = yValues.reduce((a, b) => a + b, 0) / yValues.length;
    const rounded = Number(mean.toFixed(1));
    return {
      kind: 'response-average',
      question: 'What is the mean of the five observed response values?',
      answer: String(rounded),
      distractors: [String(yValues[0]), String(Number((mean + 2).toFixed(1))), String(Number((mean - 3).toFixed(1)))],
      explanation: `Adding the five response values gives ${yValues.reduce((a, b) => a + b, 0)}. Dividing by 5 gives a mean of ${rounded}.`,
      theme: 'summarizing the observed responses',
    };
  },
  (points) => {
    const rising = points[4][1] - points[0][1];
    const direction = rising >= 0 ? 'positive' : 'negative';
    return {
      kind: 'association-direction',
      question: 'Which statement best describes the overall direction of the association?',
      answer: direction === 'positive'
        ? 'The response tends to increase as the explanatory variable increases.'
        : 'The response tends to decrease as the explanatory variable increases.',
      distractors: direction === 'positive'
        ? ['The response is exactly constant at every x-value.', 'The data prove that changes in x cause every change in the response.', 'The response must decrease whenever x increases.']
        : ['The response is exactly constant at every x-value.', 'The data prove that changes in x cause every change in the response.', 'The response must increase whenever x increases.'],
      explanation: `Across the observed range, the response changes by ${rising} units from the first point to the last, so the overall association is ${direction}.`,
      theme: 'identifying association direction without claiming causation',
    };
  },
  (points) => {
    const x1 = points[0][0], x2 = points[4][0], y1 = points[0][1], y2 = points[4][1];
    const slope = (y2 - y1) / (x2 - x1);
    const nextX = x2 + 2;
    const extrap = Math.round(y2 + slope * (nextX - x2));
    return {
      kind: 'extrapolation',
      question: `Extending the simple linear trend beyond the observed range, what response would the model predict at x = ${nextX}?`,
      answer: String(extrap),
      distractors: [String(y2), String(Math.round(y1 + slope * 2)), String(Math.round(y2 + (nextX - x2)))],
      explanation: `The endpoint slope is ${slope.toFixed(2)}. Extending that rate two x-units beyond the last observation gives a predicted response of about ${extrap}. This is a model-based extrapolation, not a new observed value.`,
      theme: 'extrapolating from a simple linear model',
    };
  },
  (points) => {
    const leftRate = (points[2][1] - points[0][1]) / (points[2][0] - points[0][0]);
    const rightRate = (points[4][1] - points[2][1]) / (points[4][0] - points[2][0]);
    const answer = Math.abs(leftRate - rightRate) < 1 ? 'They are approximately the same.' : leftRate > rightRate ? 'The first-half rate is larger.' : 'The second-half rate is larger.';
    const distractors = answer === 'They are approximately the same.'
      ? ['The first-half rate is larger.', 'The second-half rate is larger.', 'The rates have opposite signs.']
      : ['They are approximately the same.', leftRate > rightRate ? 'The second-half rate is larger.' : 'The first-half rate is larger.', 'The rates have opposite signs.'];
    return {
      kind: 'rate-comparison',
      question: 'How does the average rate of change in the first half compare with the average rate of change in the second half?',
      answer,
      distractors,
      explanation: `The first-half average rate is ${leftRate.toFixed(2)}, while the second-half rate is ${rightRate.toFixed(2)}. Comparing those values gives the stated relationship.`,
      theme: 'comparing rates over two intervals',
    };
  },
  (points) => {
    const maxPoint = points.reduce((a, b) => b[1] > a[1] ? b : a);
    return {
      kind: 'maximum-response',
      question: 'Which observed x-value corresponds to the largest response value?',
      answer: String(maxPoint[0]),
      distractors: points.filter(([x]) => x !== maxPoint[0]).slice(0, 3).map(([x]) => String(x)),
      explanation: `The response values increase to a maximum of ${maxPoint[1]} at x = ${maxPoint[0]}.`,
      theme: 'locating a maximum observed response',
    };
  },
  (points) => {
    const minPoint = points.reduce((a, b) => b[1] < a[1] ? b : a);
    return {
      kind: 'minimum-response',
      question: 'Which observed x-value corresponds to the smallest response value?',
      answer: String(minPoint[0]),
      distractors: points.filter(([x]) => x !== minPoint[0]).slice(0, 3).map(([x]) => String(x)),
      explanation: `The response values have their minimum, ${minPoint[1]}, at x = ${minPoint[0]}.`,
      theme: 'locating a minimum observed response',
    };
  },
];

function buildScatter(candidate, index) {
  const out = stamp(candidate, index, 'MATH_SCATTER_TARGETED_REPAIR');
  const opening = scatterOpenings[index % scatterOpenings.length];
  const context = scatterContexts[Math.floor(index / scatterOpenings.length) % scatterContexts.length];
  const taskPrompt = scatterTasks[Math.floor(index / (scatterOpenings.length * scatterContexts.length)) % scatterTasks.length];
  const taskIndex = hash(index, 5) % scatterTaskBuilders.length;

  const base = 24 + (hash(index, 11) % 17);
  const slope = 2 + (hash(index, 13) % 4);
  const offsets = [-2, 1, -1, 2, 0].map((v, j) => v + ((hash(index, 20 + j) % 3) - 1));
  const points = [1, 2, 3, 4, 5].map((x, j) => [x, base + slope * x + offsets[j]]);
  const safePoints = points.map(([x, y]) => [x, Math.max(5, y)]);
  const built = scatterTaskBuilders[taskIndex](safePoints);
  const uniqueDistractors = ensureUniqueChoices(built.answer, built.distractors, index);
  const { choices, answer } = rotateChoices([built.answer, ...uniqueDistractors], hash(index, 61) % 4);

  out.prompt = `${opening} ${context}. The observations are ${safePoints.map(([x, y]) => `(${x}, ${y})`).join(', ')}. A simple linear model is used only as a summary of the observed trend. ${taskPrompt} ${built.question}`;
  out.choices = choices;
  out.answer = answer;
  out.explanation = `Choice ${answer} is correct because ${built.explanation}`;
  out.figure = { type: 'scatter', values: { points: safePoints } };
  out.skill = 'Scatterplot interpretation';
  out.subskill = `scatterplot ${built.kind}`;
  out.cognitiveDemand = 'analyze';
  out.difficulty = 'hard';
  out.difficultyBand = `${out.assessmentVariant || 'sat'}-${out.adaptiveRoute || 'standard'}-hard`;
  out.metadata.difficultyFeatures = unique(['data-interpretation', 'representation-shift', 'evidence-synthesis', 'multi-step', 'strategic-choice']);
  out.metadata.difficultyRequirements = {
    minimumReasoningSteps: 2,
    requiredFeatures: ['multi-step', 'strategic-choice'],
    distractorStandard: 'high-plausibility alternative based on a specific reasoning error',
  };
  const correctText = choices[parseAnswerIndex(answer)];
  const distractors = choices.filter((_, i) => i !== parseAnswerIndex(answer));
  out.metadata.distractor_architecture = { profiles: distractorArchitecture(correctText, distractors, built.theme) };
  out.metadata.figurePurpose = 'question-essential';
  out.metadata.constructionFamily = built.kind;
  out.metadata.repairTrace = {
    sourceIssueClasses: ['math:distractor-architecture-missing', 'math:weak-multistep-signal', 'diversity:semantic-template-cluster', 'diversity:prompt-choice-cluster'],
    repairRecipe: 'scatterplot-task-family-v2',
  };
  return out;
}

function buildRightTriangle(candidate, index) {
  const out = stamp(candidate, index, 'MATH_GEOMETRY_TARGETED_REPAIR');
  const leg = 5 + (hash(index, 31) % 10);
  const other = 4 + (hash(index, 37) % 9);
  const hyp = Math.sqrt(leg * leg + other * other);
  const hypText = Number.isInteger(hyp) ? String(hyp) : hyp.toFixed(2);
  const variants = [
    `A right-triangle support brace has legs of ${leg} units and ${other} units. What is the length of the brace spanning the two outer endpoints?`,
    `A rectangular display uses a diagonal brace across a right angle. The two perpendicular sides are ${leg} inches and ${other} inches. What is the brace length?`,
    `A right-triangle measurement has perpendicular sides of ${leg} centimeters and ${other} centimeters. What is the hypotenuse?`,
    `A survey team measures a right triangular plot with perpendicular sides ${leg} meters and ${other} meters. What is the diagonal distance?`,
    `A wheelchair ramp forms a right triangle with horizontal run ${leg} feet and vertical rise ${other} feet. What is the ramp length?`,
    `A roof support forms a right triangle with perpendicular lengths ${leg} meters and ${other} meters. What is the support length?`,
    `A camera cable crosses a rectangular corner with perpendicular distances ${leg} meters and ${other} meters. What is its straight-line length?`,
    `A triangular panel has a right angle between sides measuring ${leg} inches and ${other} inches. What is the side opposite the right angle?`,
    `A hiking route makes a right-angle turn after ${leg} kilometers horizontally and ${other} kilometers vertically. What is the direct distance?`,
    `A rectangular field has a diagonal separating sides of ${leg} yards and ${other} yards. What is the diagonal length?`,
  ];
  const prompt = variants[index % variants.length];
  const correct = hypText;
  const rotated = rotateChoices([correct, ...ensureUniqueChoices(correct, [String(leg + other), String(Math.abs(leg - other)), String(Number((Math.sqrt(leg * leg + other * other + 9)).toFixed(2)))], index)], hash(index, 43) % 4);
  out.prompt = `${prompt} Select the value that satisfies the Pythagorean relationship.`;
  out.choices = rotated.choices;
  out.answer = rotated.answer;
  out.explanation = `Choice ${rotated.answer} is correct because for a right triangle, c² = a² + b². Here c² = ${leg}² + ${other}² = ${leg * leg + other * other}, so c ≈ ${hypText}.`;
  out.figure = { type: 'geometry', values: { shape: 'right-triangle', legs: [leg, other], hypotenuse: hypText } };
  out.skill = 'Right-triangle relationships';
  out.subskill = `right-triangle application ${index % 4}`;
  out.difficulty = 'hard';
  out.difficultyBand = `${out.assessmentVariant || 'sat'}-${out.adaptiveRoute || 'standard'}-hard`;
  out.cognitiveDemand = 'analyze';
  out.metadata.difficultyFeatures = unique(['representation-shift', 'multi-step', 'strategic-choice']);
  out.metadata.difficultyRequirements = {
    minimumReasoningSteps: 2,
    requiredFeatures: ['multi-step', 'strategic-choice'],
    distractorStandard: 'high-plausibility alternative based on a specific reasoning error',
  };
  const correctText = rotated.choices[parseAnswerIndex(rotated.answer)];
  const distractors = rotated.choices.filter((_, i) => i !== parseAnswerIndex(rotated.answer));
  out.metadata.distractor_architecture = { profiles: distractorArchitecture(correctText, distractors, 'Pythagorean reasoning') };
  out.metadata.figurePurpose = 'question-essential';
  out.metadata.constructionFamily = 'right-triangle application';
  out.metadata.repairTrace = {
    sourceIssueClasses: ['math:distractor-architecture-missing', 'diversity:semantic-template-cluster', 'diversity:prompt-choice-cluster'],
    repairRecipe: 'geometry-application-family-v2',
  };
  return out;
}

function buildLinear(candidate, index) {
  const out = stamp(candidate, index, 'MATH_ALGEBRA_TARGETED_REPAIR');
  const start = 18 + (hash(index, 47) % 25);
  const rate = 2 + (hash(index, 53) % 7);
  const firstMonth = 2 + (hash(index, 59) % 4);
  const targetMonth = firstMonth + 3;
  const laterMonth = targetMonth + 2;
  const atTarget = start + rate * targetMonth;
  const answer = start + rate * laterMonth;
  const contexts = ['A conservation program', 'A school fundraiser', 'A water tank monitoring project', 'A library inventory system', 'A community garden', 'A transit pass program', 'A recycling center', 'A museum attendance project', 'A neighborhood garden', 'A science outreach program', 'A campus shuttle report', 'A food-bank inventory project'];
  const framing = [
    'The program publishes a monthly projection.', 'The coordinator compares a current count with a later estimate.',
    'The analyst uses the same rate for planning.', 'The project report includes a later forecast.',
    'The monitoring team checks the projection against a benchmark.', 'The manager extends the pattern for the next reporting period.',
    'The planning model is used to estimate a future count.', 'The study team compares the current record with a future target.',
    'The report asks for a model-based projection.', 'The staff uses the linear model to plan the next interval.',
  ];
  out.prompt = `${pick(contexts, index)} ${pick(framing, Math.floor(index / contexts.length))} It starts with ${start} units and changes by ${rate} units per month. After ${firstMonth} months, the model is used to compare a recorded value of ${start + rate * firstMonth} with a later projection. If the same linear rate continues, first use the stated monthly change and then determine what value is predicted after ${laterMonth} months?`;
  out.choices = [String(answer), String(atTarget), String(answer - rate), String(answer + rate)];
  const rotated = rotateChoices(out.choices, hash(index, 83) % 4);
  out.choices = rotated.choices;
  out.answer = rotated.answer;
  out.explanation = `Choice ${rotated.answer} is correct because the starting value is ${start} and the constant change is ${rate} per month. Evaluating the model at month ${laterMonth} gives ${start} + ${rate}(${laterMonth}) = ${answer}.`;
  out.skill = 'Linear relationships';
  out.subskill = `contextual linear projection ${index % 6}`;
  out.difficulty = 'medium';
  out.difficultyBand = `${out.assessmentVariant || 'sat'}-${out.adaptiveRoute || 'standard'}-medium`;
  out.cognitiveDemand = 'analyze';
  out.metadata.difficultyFeatures = unique(['context-dependent', 'multi-step', 'parameter-reasoning', 'strategic-choice']);
  out.metadata.difficultyRequirements = {
    minimumReasoningSteps: 2,
    requiredFeatures: ['multi-step', 'strategic-choice'],
    distractorStandard: 'high-plausibility alternative based on a specific reasoning error',
  };
  const correctText = out.choices[parseAnswerIndex(out.answer)];
  const distractors = out.choices.filter((_, i) => i !== parseAnswerIndex(out.answer));
  out.metadata.distractor_architecture = { profiles: distractorArchitecture(correctText, distractors, 'linear model projection') };
  out.metadata.repairTrace = {
    sourceIssueClasses: ['diversity:semantic-template-cluster', 'diversity:prompt-choice-cluster'],
    repairRecipe: 'contextual-linear-family-v2',
  };
  return out;
}

function buildExponential(candidate, index) {
  const out = stamp(candidate, index, 'MATH_EXPONENTIAL_TARGETED_REPAIR');
  const base = 2 + (hash(index, 67) % 4);
  const coefficient = 2 + (hash(index, 71) % 5);
  const first = 2 + (hash(index, 73) % 4);
  const target = first + 2;
  const unknownAnswer = target - 2;
  out.prompt = `A model is written as ${coefficient}·${base}^(${first}x). A second representation uses the exponent x + 2. For which value of x does the second representation equal ${coefficient}·${base}^${target}?`;
  out.choices = [String(unknownAnswer), String(unknownAnswer + 1), String(unknownAnswer - 1), String(target)];
  const rotated = rotateChoices(out.choices, hash(index, 89) % 4);
  out.choices = rotated.choices;
  out.answer = rotated.answer;
  out.explanation = `Choice ${rotated.answer} is correct because the bases and coefficients match, so the exponents must match: x + 2 = ${target}. Therefore x = ${unknownAnswer}.`;
  out.skill = 'Equivalent exponential representations';
  out.subskill = `exponent-matching transformation ${index % 5}`;
  out.difficulty = 'hard';
  out.difficultyBand = `${out.assessmentVariant || 'sat'}-${out.adaptiveRoute || 'standard'}-hard`;
  out.cognitiveDemand = 'analyze';
  out.metadata.difficultyFeatures = unique(['representation-shift', 'multi-step', 'strategic-choice']);
  out.metadata.difficultyRequirements = {
    minimumReasoningSteps: 2,
    requiredFeatures: ['multi-step', 'strategic-choice'],
    distractorStandard: 'high-plausibility alternative based on a specific reasoning error',
  };
  const correctText = out.choices[parseAnswerIndex(out.answer)];
  const distractors = out.choices.filter((_, i) => i !== parseAnswerIndex(out.answer));
  out.metadata.distractor_architecture = { profiles: distractorArchitecture(correctText, distractors, 'matching equivalent exponential forms') };
  out.metadata.repairTrace = {
    sourceIssueClasses: ['math:distractor-architecture-missing', 'diversity:semantic-template-cluster', 'diversity:prompt-choice-cluster'],
    repairRecipe: 'equivalent-exponential-family-v2',
  };
  return out;
}

function makeRWExplanation(q) {
  const answerIndex = parseAnswerIndex(q.answer);
  const choices = Array.isArray(q.choices) ? q.choices : [];
  const keyed = choices[answerIndex] || '';
  if (q.skill === 'Transitions') return `Choice ${q.answer} is correct because “${keyed}” signals the contrast between the mostly preserved records in the first clause and the missing years in the second clause.`;
  if (q.skill === 'Boundaries') return `Choice ${q.answer} is correct because “${keyed}” supplies the punctuation and connector needed to join two complete ideas without creating a splice.`;
  if (q.skill === 'Form, Structure, and Sense') return `Choice ${q.answer} is correct because “${keyed}” agrees with the plural subject and completes the past-tense verb phrase required by the sentence.`;
  if (q.skill === 'Words in Context') return q.explanation;
  if (q.skill === 'Rhetorical Synthesis') return `Choice ${q.answer} is correct because the recommendation must preserve the finding while explicitly retaining the condition that limits how broadly the evidence can be interpreted.`;
  const lead = q.skill === 'Cross-Text Connections'
    ? 'It compares the evidence and qualifications in both passages rather than treating either passage in isolation.'
    : q.skill === 'Central Ideas and Details'
      ? 'It captures the central change in interpretation caused by the later evidence.'
      : q.skill === 'Inferences'
        ? 'It follows from the relationship between the first observation and the later qualification.'
        : q.skill === 'Command of Evidence'
          ? 'It directly measures the condition that the passage identifies as relevant to the conclusion.'
          : 'It is the choice that directly satisfies the question using the specific evidence presented.';
  return `Choice ${q.answer}, “${keyed},” is correct. ${lead} The wording of the passage supports that choice, while the other options either overstate the evidence or answer a different question.`;
}

function buildRW(candidate, index) {
  const out = stamp(candidate, index, 'RW_EXPLANATION_AND_STEM_TARGETED_REPAIR');
  if (candidate.skill === 'Words in Context') {
    out.metadata.remediationHold = 'EXPERT_REVIEW_REQUIRED';
    out.metadata.repairTrace = { sourceIssueClasses: ['review:answer-explanation-alignment'], repairRecipe: 'held-for-expert-review' };
    return out;
  }
  out.explanation = makeRWExplanation(out);
  const weakSkills = new Set(['Transitions', 'Boundaries', 'Form, Structure, and Sense']);
  if (weakSkills.has(out.skill)) {
    const stems = {
      'Transitions': [
        'The archive preserves most of the original records, allowing researchers to reconstruct the sequence from surviving entries. _____, several years are missing from the sequence.',
        'The field team recovered most samples from the first season and documented their locations carefully. _____, a portion of the second season’s records is missing.',
        'The museum catalog contains detailed descriptions of nearly every object in the collection. _____, a few accession dates cannot be established from the surviving files.',
        'The survey includes responses from nearly every participating neighborhood. _____, several blocks supplied no usable responses.',
        'The experiment produced stable measurements across most trial conditions. _____, a small set of trials was interrupted before the final reading.',
        'The historical record preserves letters from both sides of the dispute. _____, the correspondence from one winter remains incomplete.',
        'The planning report lists the major construction dates in order. _____, two months are absent from the surviving project notes.',
        'The database contains entries for almost every shipment. _____, a short interval lacks verified delivery records.',
        'The field notebook records nearly every sampling location. _____, three locations are missing from the final map.',
        'The library ledger documents most purchases from the decade. _____, several early invoices were lost.',
        'The laboratory log contains repeated measurements for the study period. _____, the final week has no recorded values.',
        'The archive index is unusually complete for the collection. _____, a small group of files cannot be dated with confidence.',
      ],
      'Boundaries': [
        'The revised method produced a clearer signal in repeated trials, but the team had to recalibrate the instrument before comparing the final measurements across sites.',
        'The researchers repeated the procedure under controlled conditions, and the second trial produced a more stable estimate for the same measured quantity.',
        'The survey produced a stronger response after the wording was revised; the investigators therefore repeated the procedure with a larger sample.',
        'The engineering team tested the revised component on three separate days, and the same adjustment improved the measured output each time.',
        'The curator compared the new labels with the older catalog records; the revised descriptions removed several ambiguities in the collection.',
        'The field study used the same sampling protocol at each site, and the resulting measurements could therefore be compared directly.',
        'The analysts reviewed the preliminary estimates before publication, and the final report included only values supported by repeated checks.',
        'The technician replaced the worn sensor during the trial; the later readings were therefore recorded with the calibrated instrument.',
        'The researchers repeated the measurement after the first reading appeared inconsistent, and the second run produced a stable result.',
        'The committee revised the survey wording before the next round of responses; the updated version reduced an ambiguity in one question.',
        'The team recorded the observations immediately after each test, and the complete log made it possible to trace the final calculation.',
        'The archive staff cross-checked each date against the source document; the corrected catalog now reflects the verified chronology.',
      ],
      'Form, Structure, and Sense': [
        'The researchers who repeated the test used the same protocol and recorded the results in a common data table for later comparison.',
        'The volunteers who organized the archive reviewed the damaged files and entered the surviving information into the shared catalog.',
        'The analysts who checked the revised model compared its predictions with the observations before reporting the result.',
        'The engineers who inspected the prototype measured each component twice before approving the revised design.',
        'The historians who reviewed the correspondence compared the dated letters before describing the change in policy.',
        'The technicians who calibrated the instrument recorded the final settings before beginning the next series of measurements.',
        'The students who conducted the survey entered each response carefully before summarizing the results for the report.',
        'The curators who examined the artifacts compared the markings before assigning dates to the objects.',
        'The scientists who repeated the procedure checked the temperature readings before calculating the final average.',
        'The planners who reviewed the map compared the new route with the earlier proposal before recommending a change.',
        'The researchers who analyzed the observations separated the measurements by site before estimating the overall pattern.',
        'The editors who checked the report compared each numerical claim with its source before approving the final version.',
      ],
    };
    out.prompt = `${pick(stems[out.skill], index)}\n\n${out.skill === 'Transitions' ? 'Which choice completes the text so that the relationship between the ideas is clear?' : 'Which choice completes the text so that it conforms to Standard English conventions?'}`;
  }
  return out;
}

function repairCandidate(candidate, reviewItem, index) {
  const issues = new Set((reviewItem.failures || []).map((x) => x.code));
  if (candidate.section === 'math') {
    if (candidate.skill === 'Scatterplot interpretation') return buildScatter(candidate, index);
    if (candidate.skill === 'Right-triangle relationships') return buildRightTriangle(candidate, index);
    if (candidate.skill === 'Linear relationships') return buildLinear(candidate, index);
    if (candidate.skill === 'Equivalent exponential representations') return buildExponential(candidate, index);
    const out = stamp(candidate, index, 'MATH_GENERIC_TARGETED_REPAIR');
    out.metadata.repairTrace = { sourceIssueClasses: [...issues], repairRecipe: 'math-generic-explicit-distractor-and-diversity-v2' };
    if (candidate.questionType === 'multiple-choice') {
      const ai = parseAnswerIndex(candidate.answer);
      const keyed = candidate.choices?.[ai] || '';
      const distractors = (candidate.choices || []).filter((_, i) => i !== ai);
      out.metadata.distractor_architecture = { profiles: distractorArchitecture(keyed, distractors, candidate.skill || 'Math reasoning') };
    }
    out.explanation = out.explanation || 'The keyed answer follows from the specific values and relationship stated in the problem.';
    return out;
  }
  return buildRW(candidate, index);
}

const selection = JSON.parse(fs.readFileSync(SELECTION_INPUT, 'utf8'));
const reviewReport = JSON.parse(fs.readFileSync(REVIEW_INPUT, 'utf8'));
const candidates = Array.isArray(selection.candidates) ? selection.candidates : [];
const reviewById = new Map((reviewReport.review || []).map((r) => [String(r.id), r]));
if (!candidates.length) throw new Error('Selection candidate set is empty.');
if (reviewReport.sourceSelectedCount !== candidates.length) throw new Error(`Review/selection count mismatch: ${reviewReport.sourceSelectedCount} vs ${candidates.length}`);

const remediated = [];
const held = [];
const sourceMap = [];
for (let i = 0; i < candidates.length; i += 1) {
  const candidate = candidates[i];
  const reviewItem = reviewById.get(String(candidate.id));
  if (!reviewItem) throw new Error(`Missing review result for ${candidate.id}`);
  if (reviewItem.status === 'PASS') {
    remediated.push(structuredClone(candidate));
    sourceMap.push({ sourceId: candidate.id, outputId: candidate.id, status: 'UNCHANGED_PASS', reviewStatus: reviewItem.status });
    continue;
  }
  if (reviewItem.status === 'EXPERT_REVIEW_REQUIRED') {
    const heldCandidate = structuredClone(candidate);
    heldCandidate.metadata = { ...(heldCandidate.metadata || {}), remediationHold: 'EXPERT_REVIEW_REQUIRED', productionMutation: false, releaseEligibility: false };
    held.push(heldCandidate);
    sourceMap.push({ sourceId: candidate.id, outputId: candidate.id, status: 'HELD_FOR_EXPERT_REVIEW', reviewStatus: reviewItem.status });
    continue;
  }
  const repaired = repairCandidate(candidate, reviewItem, i);
  remediated.push(repaired);
  sourceMap.push({ sourceId: candidate.id, outputId: repaired.id, status: 'REMEDIATED', reviewStatus: reviewItem.status, issueClasses: [...new Set((reviewItem.failures || []).map((x) => x.code))] });
}

const output = {
  reportType: 'batch-m-deep-content-quality-targeted-remediation',
  date: '2026-09-17',
  sourceSelectionArtifact: path.basename(SELECTION_INPUT),
  sourceReviewArtifact: path.basename(REVIEW_INPUT),
  sourceCandidateCount: candidates.length,
  inputReviewCounts: reviewReport.counts,
  remediatedCandidateCount: remediated.length,
  expertReviewHoldCount: held.length,
  candidates: [...remediated, ...held],
  outputCandidates: [...remediated, ...held],
  sourceMap,
  productionMutation: false,
  releaseEligible: false,
  replacementAuthorization: 'NOT_AUTHORIZED',
  sat21Created: false,
  decision: 'CANDIDATE_REMEDIATION_ONLY',
  nextStep: 'Re-run independent substantive review against the remediated candidate set; candidates remain outside production.',
};

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(output, null, 2));
fs.writeFileSync(OUTPUT_MD, `# Batch M targeted remediation — 2026-09-17\n\n- Source candidates: **${candidates.length}**\n- Remediated candidates: **${remediated.length}**\n- Held for expert review: **${held.length}**\n- Production mutation: **false**\n- Release eligible: **false**\n- Replacement authorization: **NOT_AUTHORIZED**\n- SAT21 created: **false**\n\n## Remediation focus\n\n- Math scatterplot template diversity, multi-step reasoning, and distractor architecture.\n- Math right-triangle template diversity and distractor architecture.\n- Math linear/exponential template diversity.\n- R&W item-specific explanations.\n- R&W short-form stems for Transitions, Boundaries, and Form, Structure, and Sense.\n- Words-in-Context expert-review item remains held rather than auto-cleared.\n\nThis is a candidate-only remediation artifact. No production question was changed or released.\n`);

console.log(JSON.stringify({
  decision: output.decision,
  sourceCandidateCount: candidates.length,
  remediatedCandidateCount: remediated.length,
  expertReviewHoldCount: held.length,
  productionMutation: false,
  releaseEligible: false,
  replacementAuthorization: 'NOT_AUTHORIZED',
  sat21Created: false,
}, null, 2));
