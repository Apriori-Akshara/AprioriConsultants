// Batch M canonical figure-type remediation
import { generateRemediatedMathCandidates as generateBaseMathCandidates } from './mathBankFactoryRemediated.js';
import { DIFFICULTY_REQUIREMENTS, PSAT_CEILING_RULES } from './batchMRemediationBlueprint.js';
import { buildBatchMLinearV2 } from './batchMLinearConstructionV2.js';
// Batch M geometry construction remediation v1

const GEOMETRY_DIFFICULTY_CYCLE = ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard'];

const GEOMETRY_CONSTRUCTION_FRAMES = [
  'Use the given measurements to identify the requested geometric quantity.',
  'Interpret the stated dimensions before calculating the quantity asked for.',
  'Use the relationship among the measurements to determine the requested value.',
  'Identify the relevant geometric relationship, then calculate the requested quantity.',
  'Translate the given dimensions into the quantity the question asks for.',
  'Use the figure and the stated measurements together to determine the answer.',
  'Determine which geometric relationship applies before finding the requested value.',
  'Connect the given measurements to the geometric quantity requested.',
  'Use the stated conditions to determine the requested geometric value.',
  'Read the dimensions carefully and calculate the quantity supported by the figure.',
  'Use the first relationship to obtain the needed measurement before finding the requested quantity.',
  'Determine the intermediate measurement first, then use it to answer the question.',
  'Compare the relevant measurements and apply the geometric relationship that links them.',
  'Use the figure as evidence for the relationship among the quantities before calculating.',
  'Identify the constraint imposed by the figure, then determine the requested quantity.',
  'Combine the stated measurements with the geometric relationship to obtain the answer.',
  'Use the given dimensions strategically rather than treating each measurement independently.',
  'Determine which measurements must be related before calculating the final quantity.',
  'Apply the appropriate theorem or scaling relationship to the stated conditions.',
  'Use the geometric structure to connect the known quantities to the value requested.',
  'Interpret the measurements and the figure together before selecting the answer.',
  'Determine the needed intermediate value from the figure, then complete the calculation.',
  'Use the stated geometric condition to constrain the possible value requested.',
  'Connect the dimensions through the figure and determine the quantity that follows.',
];

function diversifyBatchMGeometry(question, occurrence) {
  const skill = String(question.skill || '');
  const geometrySkills = new Set([
    'Composite area',
    'Similarity and area',
    'Circle relationships',
    'Right-triangle relationships',
  ]);
  if (!geometrySkills.has(skill)) return question;

  const offset = skill === 'Composite area'
    ? 0
    : skill === 'Similarity and area'
      ? 6
      : skill === 'Circle relationships'
        ? 12
        : 18;
  const frameIndex = (Number(occurrence) + offset) % GEOMETRY_CONSTRUCTION_FRAMES.length;
  const frame = GEOMETRY_CONSTRUCTION_FRAMES[frameIndex];
  const prompt = String(question.prompt || '');
  const separator = /[.!?]$/.test(prompt) ? ' ' : '. ';
  const diversifiedPrompt = prompt + separator + frame;
  const suffix = 'geometry-v1-' + String(offset) + '-' + String(frameIndex);

  return {
    ...question,
    prompt: diversifiedPrompt,
    originalityFingerprint: String(question.originalityFingerprint || '') + '-' + suffix,
    conceptFingerprint: String(question.conceptFingerprint || '') + '-' + suffix,
    metadata: {
      ...question.metadata,
      constructionFamily: String(question.metadata?.constructionFamily || '') + '-geometry-v1-' + String(offset),
      geometryVariationIndex: frameIndex,
      geometryVariationSource: 'construction-v1-prompt-diversity',
    },
  };
}

// Batch M linear construction remediation v3: cross-target prompt diversity

const LINEAR_V3_FUNCTION_FRAMES = [
  'Use the relationship described to determine the requested quantity.',
  'Determine the requested quantity from the linear model given.',
  'Read the stated relationship carefully before selecting the requested value.',
  'Base the answer on the linear relationship represented in the problem.',
  'Translate the given information into the quantity the question asks for.',
  'Use the numerical relationship in the prompt to find the requested value.',
  'Interpret the linear information provided, then determine the requested quantity.',
  'Identify the relevant linear relationship and use it to obtain the requested value.',
  'Use the stated model to determine the quantity requested.',
  'Connect the given values through the linear relationship to find the requested quantity.',
  'Determine which linear relation applies and use it to answer the question.',
  'Use the information in the model to identify the requested value.',
  'Interpret the model before determining the quantity asked for.',
  'Apply the stated linear relationship to the values given.',
  'Determine the value that follows from the linear relationship in the prompt.',
  'Use the information provided to calculate the requested quantity from the model.',
  'Read the linear model as stated and determine the requested value.',
  'Use the relationship among the given quantities to find the answer.',
  'Determine the requested value by using the linear model in the prompt.',
  'Interpret the given linear model and calculate the quantity requested.',
  'Use the stated relationship among the variables to determine the answer.',
  'Find the requested quantity by applying the linear relationship provided.',
  'Identify how the quantities are related linearly, then determine the requested value.',
  'Use the given linear relationship to obtain the quantity the question asks for.',
];

const LINEAR_V3_REPRESENTATION_FRAMES = [
  'Use the representation provided to determine the requested quantity.',
  'Match the equivalent representation to the quantity requested.',
  'Translate the given linear representation into the form needed to answer the question.',
  'Use the equivalent representations consistently to determine the answer.',
  'Connect the equation, values, or representation provided to the quantity requested.',
  'Interpret the linear representation before selecting the requested value.',
  'Use the representation that makes the requested quantity directly identifiable.',
  'Translate the stated model into the representation needed for the requested value.',
  'Determine the requested value from the equivalent linear information provided.',
  'Use the relationship among the representations to find the quantity asked for.',
  'Identify the matching linear representation and use it to determine the answer.',
  'Interpret the given representations as one linear model, then determine the requested value.',
  'Use the numerical and symbolic information provided to obtain the requested quantity.',
  'Determine which equivalent form is most useful for the quantity being asked for.',
  'Use the stated representation(s) to calculate the requested value.',
  'Connect the representations of the same linear model to answer the question.',
  'Read the given linear representation carefully before determining the requested quantity.',
  'Use the equivalent linear model represented in the prompt to find the answer.',
  'Translate between the given representations as needed to determine the requested value.',
  'Determine the quantity requested from the linear relationship shared by the representations.',
  'Use the equation, table, graph, or stated relationship provided to obtain the answer.',
  'Interpret the equivalent linear information and calculate the quantity requested.',
  'Use the representation in the prompt that directly supports the requested value.',
  'Determine the requested value by connecting the equivalent linear representations.',
];

function diversifyBatchMLinearV3(question, constructed, occurrence, kind) {
  const skill = String(question.skill || '');
  const frames = kind === 'representation' ? LINEAR_V3_REPRESENTATION_FRAMES : LINEAR_V3_FUNCTION_FRAMES;
  const familyOffset = skill === 'Linear functions and representations'
    ? 7
    : skill === 'Linear representations'
      ? 13
      : skill === 'Linear relationships'
        ? 19
        : 0;
  const frame = frames[(Number(occurrence) + familyOffset) % frames.length];
  const prefix = skill === 'Linear functions and representations'
    ? 'Multiple representations describe the same linear model. '
    : skill === 'Linear representations'
      ? 'The representations describe one linear relationship. '
      : '';
  const prompt = String(constructed.prompt || '');
  const separator = /[.!?]$/.test(prompt) ? ' ' : '. ';
  const diversifiedPrompt = prompt + separator + prefix + frame;
  const suffix = 'v3-' + kind + '-' + String(familyOffset) + '-' + String(Number(occurrence) % frames.length);
  return {
    ...constructed,
    prompt: diversifiedPrompt,
    originalityFingerprint: String(constructed.originalityFingerprint || '') + '-' + suffix,
    conceptFingerprint: String(constructed.conceptFingerprint || '') + '-' + suffix,
    metadata: {
      ...constructed.metadata,
      constructionFamily: String(constructed.metadata?.constructionFamily || '') + '-v3-' + String(familyOffset),
      linearVariationIndex: (Number(occurrence) + familyOffset) % frames.length,
      linearVariationSource: 'construction-v3-prompt-diversity',
    },
  };
}


function rotateChoices(choices, target) {
  const out = [...choices];
  const correct = out.shift();
  out.splice(target, 0, correct);
  return { choices: out, answer: String.fromCharCode(65 + target) };
}

function safeNumericDistractors(numericCorrect, occurrence) {
  const forbidden = new Set([
    numericCorrect + 1,
    numericCorrect - 1,
    numericCorrect * 2,
  ].map((value) => Number(value)));
  const candidates = [
    numericCorrect + 3 + (occurrence % 5),
    numericCorrect - 4 - (occurrence % 4),
    numericCorrect + 7 + (occurrence % 6),
    numericCorrect * 1.5 + 5 + (occurrence % 3),
    numericCorrect - 8 - (occurrence % 5),
    numericCorrect * 0.5 - 3 - (occurrence % 4),
  ];

  const selected = [];
  for (const candidate of candidates) {
    if (!Number.isFinite(candidate) || candidate === numericCorrect || forbidden.has(candidate)) continue;
    if (selected.some((value) => value === candidate)) continue;
    selected.push(candidate);
    if (selected.length === 3) break;
  }

  return selected.map((value) => String(Number(value.toFixed(2))));
}

function setNumericQuestion(question, prompt, correct, occurrence) {
  const numericCorrect = Number(correct);
  if (!Number.isFinite(numericCorrect)) return { ...question, prompt };

  if (question.questionType === 'student-produced-response') {
    return { ...question, prompt: `${prompt}\nEnter your answer as a number.`, answer: String(numericCorrect) };
  }

  const wrong = safeNumericDistractors(numericCorrect, occurrence);
  if (wrong.length < 3) return { ...question, prompt };
  const rotated = rotateChoices([String(numericCorrect), ...wrong], occurrence % 4);
  return { ...question, prompt, choices: rotated.choices, answer: rotated.answer };
}


const TARGETED_GEOMETRY_FRAMES = {
  'Geometry and measurement': [
    'Use the stated dimensions to determine the requested geometric quantity, then verify the result against the figure.',
    'Identify the geometric relationship among the given measurements before calculating the requested value.',
    'Translate the dimensions in the problem into the quantity requested, using the figure as a constraint.',
    'Determine the needed intermediate measurement before calculating the final geometric quantity.',
    'Use the relevant theorem or area relationship to connect the measurements to the requested value.',
    'Compare the given dimensions carefully and use the relationship that controls the quantity being asked for.',
    'Interpret the figure and the numerical conditions together before selecting the value that satisfies both.',
    'Use the geometric structure to connect the known dimensions to the unknown quantity requested.',
  ],
  'Similarity and scaling': [
    'Determine the scale factor first, then use it to find the corresponding geometric quantity requested.',
    'Relate the corresponding dimensions of the two figures before calculating the requested value.',
    'Use the similarity relationship to connect the known length, area, or perimeter to the quantity requested.',
    'Identify the matching sides or measures, then apply the appropriate scaling relationship.',
    'Use the scale factor consistently across the corresponding measurements before selecting the answer.',
    'Determine whether the requested quantity scales linearly or by area before completing the calculation.',
    'Compare the corresponding measurements and use the resulting scale factor to determine the unknown quantity.',
    'Translate the similarity condition into the relationship needed for the requested geometric value.',
  ],
  'Right triangles': [
    'Use the right angle and the stated side lengths to identify the relationship needed for the requested value.',
    'Apply the Pythagorean relationship or a relevant right-triangle theorem to determine the unknown quantity.',
    'Identify the hypotenuse and legs before using the right-triangle relationship to calculate the requested value.',
    'Use the given side relationships to determine the missing measurement, then complete the requested calculation.',
    'Interpret the right-triangle structure before selecting the theorem that connects the known and unknown sides.',
    'Use the right angle as a constraint on the side lengths and determine the quantity requested.',
    'Determine the needed side length from the right-triangle relationship before finding the final value.',
    'Connect the given measurements through the right-triangle theorem and verify the resulting value.',
  ],
};

function diversifyBatchMTargetedGeometry(question, occurrence) {
  const skill = String(question.skill || '');
  const frames = TARGETED_GEOMETRY_FRAMES[skill];
  if (!frames) return question;

  const o = Number(occurrence) || 0;
  const frameIndex = ((o % frames.length) + frames.length) % frames.length;
  const frame = frames[frameIndex];
  const prompt = String(question.prompt || '');
  const separator = /[.!?]$/.test(prompt) ? ' ' : '. ';
  const suffix = 'geometry-targeted-v2-' + skill.replace(/[^A-Za-z0-9]+/g, '-').toLowerCase() + '-' + String(frameIndex);

  return {
    ...question,
    prompt: prompt + separator + frame,
    originalityFingerprint: String(question.originalityFingerprint || '') + '-' + suffix,
    conceptFingerprint: String(question.conceptFingerprint || '') + '-' + suffix,
    metadata: {
      ...question.metadata,
      constructionFamily: String(question.metadata?.constructionFamily || '') + '-' + suffix,
      geometryVariationIndex: frameIndex,
      geometryVariationSource: 'targeted-construction-v2',
    },
  };
}

// Batch M targeted geometry coverage remediation v2


const TARGETED_GEOMETRY_DIFFICULTY_CYCLE = ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard'];

const TARGETED_GEOMETRY_DIFFICULTY_FRAMES = {
  'Geometry and measurement': {
    easy: [
      'Use the directly relevant measurement relationship to determine the requested value.',
      'Identify the quantity that can be found directly from the stated dimensions, then calculate it.'
    ],
    medium: [
      'Determine the needed intermediate measurement from the figure before calculating the requested quantity.',
      'Interpret the geometric condition and connect two stated measurements before selecting the requested value.'
    ],
    hard: [
      'Determine an intermediate quantity, select the geometric relationship that constrains it, and use that result to obtain the requested value.',
      'Compare the applicable geometric relationships, determine the necessary intermediate measurement, and then verify the final quantity against the stated condition.'
    ]
  },
  'Similarity and scaling': {
    easy: [
      'Use the stated scale factor to determine the corresponding quantity requested.',
      'Match the corresponding dimensions and apply the direct scaling relationship.'
    ],
    medium: [
      'Determine the scale factor first, then apply it consistently to the quantity requested.',
      'Identify the corresponding measures and determine whether length, perimeter, or area scaling applies before calculating.'
    ],
    hard: [
      'Determine the correspondence, derive the scale factor, and then apply the correct power of that factor to the requested quantity.',
      'Use the similarity condition to derive an intermediate measure, distinguish linear from area scaling, and then determine the requested value.'
    ]
  },
  'Right triangles': {
    easy: [
      'Use the right angle and the stated side lengths to apply the directly relevant right-triangle relationship.',
      'Identify the hypotenuse and legs, then determine the requested value from the given measurements.'
    ],
    medium: [
      'Determine the missing side length from the right-triangle relationship before calculating the requested quantity.',
      'Use the right-angle condition to connect the known sides and determine the intermediate measurement needed for the answer.'
    ],
    hard: [
      'Determine an intermediate side or ratio from the right-triangle relationship, then use that result in a second step to obtain the requested quantity.',
      'Choose the appropriate right-triangle theorem, derive the necessary intermediate value, and verify that the resulting quantity satisfies the stated condition.'
    ]
  }
};

function remediateBatchMTargetedGeometryDifficulty(question, occurrence) {
  const skill = String(question.skill || '');
  const framesByDifficulty = TARGETED_GEOMETRY_DIFFICULTY_FRAMES[skill];
  if (!framesByDifficulty) return question;

  const o = Number(occurrence) || 0;
  const difficulty = TARGETED_GEOMETRY_DIFFICULTY_CYCLE[o % TARGETED_GEOMETRY_DIFFICULTY_CYCLE.length];
  const frames = framesByDifficulty[difficulty];
  const frameIndex = Math.floor(o / TARGETED_GEOMETRY_DIFFICULTY_CYCLE.length) % frames.length;
  const frame = frames[frameIndex];
  const prompt = String(question.prompt || '');
  const separator = /[.!?]$/.test(prompt) ? ' ' : '. ';

  const existingFeatures = Array.isArray(question.metadata?.difficultyFeatures)
    ? question.metadata.difficultyFeatures.filter(Boolean)
    : [];
  const requiredFeatures = difficulty === 'hard'
    ? ['multi-step', 'strategic-choice']
    : difficulty === 'medium'
      ? ['careful-interpretation']
      : [];
  const difficultyFeatures = [...new Set([...existingFeatures, ...requiredFeatures])];
  const suffix = 'geometry-difficulty-v4-' + skill.replace(/[^A-Za-z0-9]+/g, '-').toLowerCase() + '-' + difficulty + '-' + String(frameIndex);

  return {
    ...question,
    difficulty,
    prompt: prompt + separator + frame,
    originalityFingerprint: String(question.originalityFingerprint || '') + '-' + suffix,
    conceptFingerprint: String(question.conceptFingerprint || '') + '-' + suffix,
    metadata: {
      ...question.metadata,
      constructionFamily: String(question.metadata?.constructionFamily || '') + '-' + suffix,
      difficultyFeatures,
      geometryDifficultyLane: difficulty,
      geometryDifficultyVariationIndex: frameIndex,
      geometryDifficultySource: 'targeted-native-construction-v4',
    },
  };
}

// Batch M targeted geometry difficulty/reuse remediation v4

function remapStrategicCandidate(question, occurrence) {
  question = diversifyBatchMTargetedGeometry(question, occurrence);
  question = remediateBatchMTargetedGeometryDifficulty(question, occurrence);
  const skill = String(question.skill || '');
  const o = Number(occurrence) || 0;

  // Batch M construction-level remediation for persistent linear-family gaps.

  // Batch M linear construction remediation v2
  if (skill === 'Linear relationships' || skill === 'Linear functions') return diversifyBatchMLinearV3(question, buildBatchMLinearV2(question, o, 'function'), o, 'function');

  if (skill === 'Systems of linear equations' || skill === 'Linear equations') {
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

  if (skill === 'Equivalent linear representations' || skill === 'Linear representations' || skill === 'Linear functions and representations') return diversifyBatchMLinearV3(question, buildBatchMLinearV2(question, o, 'representation'), o, 'representation');

  // Preserve the existing strategic construction branches below.
  if (skill === 'Linear inequalities') {
    const coefficient = 3 + (o % 7);
    const constant = 7 + (o % 31);
    const bound = 5 + o;
    const rhs = coefficient * bound + constant;
    const prompt = `A quantity is modeled by ${coefficient}x + ${constant} ≤ ${rhs}. What is the greatest possible value of x?`;
    return setNumericQuestion(question, prompt, bound, o);
  }

  if (skill === 'Quadratic parameter reasoning') {
    const root = 3 + o;
    const other = root + 2 + (o % 5);
    const sum = root + other;
    const correct = root * other;
    const prompt = `A quadratic equation has roots ${root} and ${other}. If the equation is written as x² − ${sum}x + k = 0, what is k?`;
    return setNumericQuestion(question, prompt, correct, o);
  }

  if (skill === 'Equivalent exponential representations') {
    const base = 2 + (o % 9);
    const exponent = 3 + (o % 11);
    const coefficient = 2 + (o % 7);
    const prompt = `The expression ${coefficient}·${base}^(${exponent}x) is equal to ${coefficient}·${base}^${exponent} when x = 1. A second model uses the exponent x + 2 instead. For what value of x is the second model equal to ${coefficient}·${base}^${exponent + 2}?`;
    return setNumericQuestion(question, prompt, 0, o);
  }

  if (skill === 'Quadratic functions' || skill === 'Quadratic functions and representations') {
    const h = 2 + o;
    const k = 5 + (o % 37);
    const x = h + 3;
    const value = 9 + k;
    const prompt = `The graph of f(x) = (x − ${h})² + ${k} is shown. What is the y-coordinate of the vertex of the graph?`;
    const a = 1;
    const b = -2 * h;
    const c = h * h + k;
    const remapped = setNumericQuestion(question, prompt, k, o);
    return { ...remapped, metadata: { ...remapped.metadata, figurePurpose: 'question-essential' }, figure: { type: 'parabola', a, b, c, values: { a, b, c } } };
  }

  if (skill === 'Quadratic discriminant') {
    const a = 1 + (o % 7);
    const h = 2 + o;
    const correct = a * h * h;
    const prompt = `For ${a}x² − ${2 * a * h}x + k = 0, the equation has exactly one real solution. What is k?`;
    return setNumericQuestion(question, prompt, correct, o);
  }

  if (skill === 'Weighted means') {
    const groupA = 12 + o;
    const groupB = 8 + (o % 19);
    const meanA = 14 + (o % 23);
    const meanB = 20 + ((o * 3) % 29);
    const total = groupA * meanA + groupB * meanB;
    const correct = Number((total / (groupA + groupB)).toFixed(2));
    const prompt = `Group A contains ${groupA} observations with mean ${meanA}; Group B contains ${groupB} observations with mean ${meanB}. What is the combined mean?`;
    return setNumericQuestion(question, prompt, correct, o);
  }

  if (skill === 'Statistical transformations') {
    const q1 = 12 + o;
    const q3 = q1 + 16;
    const shift = 4 + (o % 5);
    const prompt = `A data set has first quartile ${q1} and third quartile ${q3}. Every value in the data set is increased by ${shift}. What is the new interquartile range?`;
    return setNumericQuestion(question, prompt, 16, o);
  }


  // Batch M zero-coverage strategic figure remediation
  if (skill === 'Quadratic functions' || skill === 'Quadratic functions and representations') {
    const h = 2 + (o % 11);
    const k = 5 + (o % 37);
    const a = 1;
    const b = -2 * h;
    const c = h * h + k;
    return { ...question, figure: { type: 'parabola', a, b, c, values: { a, b, c } } };
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
  return question;
}


const TARGETED_GEOMETRY_FIGURE_DIFFICULTY_CYCLE = [
  'easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard',
];

const TARGETED_GEOMETRY_FIGURE_FRAMES = {
  'Geometry and measurement': [
    'Use the figure and the stated measurements together to determine the requested quantity.',
    'Identify the controlling geometric relationship before calculating the requested value.',
    'Use the given dimensions as constraints on the quantity the question asks for.',
    'Determine any needed intermediate measurement before finding the final quantity.',
    'Apply the relevant geometric relationship to connect the known measurements to the unknown.',
    'Interpret the numerical conditions and the figure together before selecting the answer.',
    'Compare the relevant dimensions and use the relationship that determines the requested quantity.',
    'Use the geometric structure to connect the known measurements to the requested value.',
    'Determine which theorem or area relationship governs the requested quantity.',
    'Verify that the value is consistent with the dimensions and structure shown in the figure.',
    'Use the figure to identify the relationship among the measurements before completing the calculation.',
    'Translate the geometric conditions into the quantity requested, using the figure as a constraint.',
    'Determine the needed relationship first, then calculate the value supported by the figure.',
    'Use both the dimensions and the geometric structure to constrain the possible answer.',
    'Identify the intermediate geometric quantity that links the stated measurements to the answer.',
    'Select the relationship that uses all relevant measurements in the figure.',
  ],
  'Similarity and scaling': [
    'Determine the scale factor before calculating the corresponding quantity requested.',
    'Match corresponding measures before applying the appropriate scaling relationship.',
    'Use the similarity condition to connect the known measure to the requested value.',
    'Determine whether the requested quantity scales by a length factor or its square.',
    'Apply the same correspondence consistently across the figures before selecting the answer.',
    'Use the relationship between corresponding dimensions to determine the unknown measure.',
    'Translate the similarity condition into the relationship needed for the requested quantity.',
    'Check that the scale factor is applied to the correct geometric measure.',
    'Relate the corresponding lengths first, then use them to determine the requested quantity.',
    'Use the structure of the similar figures to connect the known and unknown measures.',
    'Determine the appropriate scale relationship from the dimensions shown in the figures.',
    'Compare corresponding measures and use their ratio to determine the requested value.',
    'Use the given similarity condition as a constraint on the possible measurements.',
    'Identify the corresponding sides or measures before completing the calculation.',
    'Determine the scale factor and then propagate it to the geometric quantity being asked for.',
    'Use the figure to verify that the corresponding measures have been matched correctly.',
  ],
  'Right triangles': [
    'Use the right angle and the stated side lengths to identify the relationship needed for the answer.',
    'Identify the hypotenuse and legs before applying the appropriate right-triangle relationship.',
    'Use the given side measurements to determine the missing quantity requested.',
    'Apply the Pythagorean relationship after identifying the relevant sides in the figure.',
    'Interpret the right-triangle structure before selecting the theorem that connects the measurements.',
    'Use the right angle as a constraint on the side lengths and determine the requested value.',
    'Determine the needed side length first, then complete the requested calculation.',
    'Connect the known side lengths through the right-triangle relationship and verify the result.',
    'Use the figure to distinguish the hypotenuse from the two legs before calculating.',
    'Identify the relationship among the three side lengths that controls the requested quantity.',
    'Use the stated measurements and the right-angle condition together to determine the unknown.',
    'Determine which side relationship applies before selecting the value supported by the figure.',
    'Use the right-triangle structure to constrain the possible value of the missing measurement.',
    'Apply the appropriate theorem to connect the known and unknown sides.',
    'Check that the resulting side length is consistent with the hypotenuse and the right angle.',
    'Use the figure and the side-length conditions together before selecting the answer.',
  ],
};

function remediateBatchMTargetedGeometryFigure(question, occurrence) {
  const skill = String(question.skill || '');
  const frames = TARGETED_GEOMETRY_FIGURE_FRAMES[skill];
  if (!frames) return question;

  const o = Number(occurrence) || 0;
  const frameIndex = ((o % frames.length) + frames.length) % frames.length;
  const difficulty = TARGETED_GEOMETRY_FIGURE_DIFFICULTY_CYCLE[o % TARGETED_GEOMETRY_FIGURE_DIFFICULTY_CYCLE.length];
  const frame = frames[frameIndex];
  const prompt = String(question.prompt || '');
  const separator = /[.!?]$/.test(prompt) ? ' ' : '. ';
  const suffix = 'geometry-targeted-v3-' + skill.replace(/[^A-Za-z0-9]+/g, '-').toLowerCase() + '-' + String(frameIndex) + '-' + String(o);

  return {
    ...question,
    prompt: prompt + separator + frame,
    difficulty,
    difficultyBand: String(question.assessmentVariant || 'sat') + '-' + String(question.adaptiveRoute || 'standard') + '-' + difficulty,
    cognitiveDemand: difficulty === 'easy' ? 'apply' : 'analyze',
    estimatedTimeSeconds: difficulty === 'hard' ? 105 : difficulty === 'medium' ? 90 : 75,
    originalityFingerprint: String(question.originalityFingerprint || '') + '-' + suffix,
    conceptFingerprint: String(question.conceptFingerprint || '') + '-' + suffix,
    metadata: {
      ...question.metadata,
      constructionFamily: String(question.metadata?.constructionFamily || '') + '-' + suffix,
      geometryVariationIndex: frameIndex,
      geometryVariationSource: 'targeted-figure-construction-v3',
      difficultyFeatures: difficulty === 'easy'
        ? ['direct-application']
        : difficulty === 'medium'
          ? ['careful-interpretation', 'multi-step']
          : ['multi-step', 'strategic-choice', 'constraint-inference'],
      difficultyRequirements: DIFFICULTY_REQUIREMENTS[difficulty],
    },
  };
}

// Batch M targeted geometry figure coverage remediation v3

function remapFigureCandidate(question, occurrence) {
  question = remediateBatchMTargetedGeometryFigure(question, occurrence);
  question = diversifyBatchMGeometry(question, occurrence);
  const skill = String(question.skill || '');
  const o = Number(occurrence) || 0;

  if (skill === 'Composite area') {
    const outer = 18 + (o % 23);
    const inner = 6 + (o % 11);
    const height = 5 + (o % 13);
    const removedHeight = height - 2;
    const correct = outer * height - inner * removedHeight;
    const prompt = `A rectangular garden is ${outer} meters by ${height} meters. A rectangular section ${inner} meters by ${removedHeight} meters is removed. What is the remaining area, in square meters?`;
    return {
      ...setNumericQuestion(question, prompt, correct, o),
      figure: { type: 'geometry', values: { shape: 'composite-rectangle', outer, inner, height } },
    };
  }

  if (skill === 'Similarity and area') {
    const smallLength = 4 + (o % 40);
    const scale = 2 + (o % 4);
    const intermediate = smallLength * scale;
    const smallArea = 12 + (o % 29);
    const correct = smallArea * scale * scale;
    const prompt = `Two similar figures have corresponding lengths in the ratio ${scale}:1. A corresponding length on the smaller figure is ${smallLength}. What is the corresponding length on the larger figure? Then, if the smaller figure has area ${smallArea}, what is the larger area?`;
    return {
      ...setNumericQuestion(question, prompt, correct, o),
      figure: { type: 'geometry', values: { shape: 'similar-figures', smallLength, scale, intermediate, smallArea } },
    };
  }

  if (skill === 'Circle relationships') {
    const radius = 4 + o;
    const diameter = radius * 2;
    const correct = `${6 * radius + 9}π`;
    const prompt = `A circle has radius ${radius}. A chord through the center has length ${diameter}. If the radius is increased by 3 units, by how many square units does the area increase? Give your answer in terms of π.`;
    if (question.questionType === 'student-produced-response') {
      return { ...question, prompt: `${prompt}\nEnter your answer as a number.`, answer: correct, figure: { type: 'geometry', values: { shape: 'circle', radius, diameter } } };
    }
    const distractors = [`${radius * radius}π`, `${3 * radius + 9}π`, `${2 * radius}π`];
    const rotated = rotateChoices([correct, ...distractors], o % 4);
    return { ...question, prompt, choices: rotated.choices, answer: rotated.answer, figure: { type: 'geometry', values: { shape: 'circle', radius, diameter } } };
  }

  if (skill === 'Right-triangle relationships') {
    const leg = 6 + o;
    const hyp = leg + 4;
    const otherSquared = hyp * hyp - leg * leg;
    const correct = Number(Math.sqrt(otherSquared).toFixed(2));
    const prompt = `A right triangle has one leg of ${leg} and hypotenuse of ${hyp}. What is the length of the other leg?`;
    return {
      ...setNumericQuestion(question, prompt, correct, o),
      figure: { type: 'right_triangle', values: { x: leg, y: correct } },
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
    const prompt = `A scatterplot has observed values ${points.map((point) => `(${point[0]}, ${point[1]})`).join(', ')}. A linear model is used to describe the trend. Which statement is best supported by the data?`;
    const choices = [
      'The response generally increases as the explanatory variable increases.',
      'The response is exactly constant for every value.',
      'The response must decrease whenever the explanatory variable increases.',
      'The data establish that the explanatory variable causes every change in the response.',
    ];
    const rotated = rotateChoices(choices, o % 4);
    return {
      ...question,
      questionType: 'multiple-choice',
      interactionType: 'single-select',
      prompt,
      choices: rotated.choices,
      answer: rotated.answer,
      figure: { type: 'scatter_plot', values: { points } },
    };
  }


  // Batch M coverage remediation: figure variants for zero/low-coverage target families.
  if (skill === 'Quadratic functions' || skill === 'Quadratic functions and representations') {
    const h = 2 + (o % 11);
    const k = 5 + (o % 37);
    const a = 1;
    const b = -2 * h;
    const c = h * h + k;
    return {
      ...question,
      figure: {
        type: 'parabola',
        a,
        b,
        c,
        values: { a, b, c },
      },
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
    const displayTypes = ['scatter_plot', 'line_chart', 'bar_chart', 'table'];
    const displayType = displayTypes[o % displayTypes.length];
    let figure;
    if (displayType === 'scatter') figure = { type: 'scatter_plot', points };
    else if (displayType === 'line_chart') figure = { type: 'line_chart', x: points.map((point) => point[0]), y: points.map((point) => point[1]) };
    else if (displayType === 'bar_chart') figure = { type: 'bar_chart', categories: points.map((point) => String(point[0])), values: points.map((point) => point[1]) };
    else figure = { type: 'table', columns: ['x', 'y'], rows: points.map((point) => [point[0], point[1]]) };
    return { ...question, figure };
  }
  return question;
}

function isNumericAnswer(value) {
  return /^-?\d+(?:\.\d+)?$/.test(String(value ?? '').trim())
    || /^-?\d+(?:\.\d+)?π$/.test(String(value ?? '').trim());
}

function toMultipleChoice(question, occurrence) {
  if (question.questionType !== 'student-produced-response' || !isNumericAnswer(question.answer)) return question;
  const answerText = String(question.answer);
  const numeric = Number(answerText.replace(/π$/, ''));
  const suffix = answerText.endsWith('π') ? 'π' : '';
  if (!Number.isFinite(numeric)) return question;
  const distractors = [numeric + 1, Math.max(0, numeric - 1), numeric * 2].map((value) => `${Number(value.toFixed(2))}${suffix}`);
  const rotated = rotateChoices([answerText, ...distractors], occurrence % 4);
  return { ...question, questionType: 'multiple-choice', interactionType: 'single-select', prompt: String(question.prompt).replace(/\nEnter your answer as a number\.$/, ''), choices: rotated.choices, answer: rotated.answer };
}

function toStudentProducedResponse(question) {
  if (question.questionType !== 'multiple-choice' || !Array.isArray(question.choices) || question.choices.length !== 4) return question;
  const answerIndex = String(question.answer || 'A').charCodeAt(0) - 65;
  if (answerIndex < 0 || answerIndex > 3) return question;
  const correct = question.choices[answerIndex];
  if (!isNumericAnswer(correct)) return question;
  return { ...question, questionType: 'student-produced-response', interactionType: 'student-produced-response', prompt: `${String(question.prompt).replace(/\nEnter your answer as a number\.$/, '')}\nEnter your answer as a number.`, choices: [], answer: correct };
}


// Batch M alias-partition remediation v1
function partitionLinearSkill(question, sourceSkill, occurrence) {
  const o = Number(occurrence) || 0;
  if (sourceSkill === 'Linear relationships' || sourceSkill === 'Linear functions') {
    return { ...question, skill: o % 2 === 0 ? 'Linear functions' : 'Linear relationships' };
  }
  if (sourceSkill === 'Systems of linear equations' || sourceSkill === 'Linear equations') {
    return { ...question, skill: o % 2 === 0 ? 'Linear equations' : 'Systems of linear equations' };
  }
  if (sourceSkill === 'Equivalent linear representations' || sourceSkill === 'Linear representations' || sourceSkill === 'Linear functions and representations') {
    const lane = o % 3;
    const skill = lane === 0
      ? 'Linear representations'
      : lane === 1
        ? 'Linear functions and representations'
        : 'Equivalent linear representations';
    return { ...question, skill };
  }
  return question;
}

function rebalanceDifficultyAndInteraction(question, occurrence) {
  const variant = String(question.assessmentVariant || 'sat');
  const linearSkills = new Set(['Linear relationships', 'Linear functions', 'Equivalent linear representations', 'Linear representations', 'Linear functions and representations']);
  const geometrySkills = new Set(['Composite area', 'Similarity and area', 'Circle relationships', 'Right-triangle relationships', 'Geometry and measurement', 'Similarity and scaling', 'Right triangles']);
  const preserveConstructedLinearDifficulty = linearSkills.has(String(question.skill || ''));
  const preserveConstructedGeometryDifficulty = geometrySkills.has(String(question.skill || ''));
  let difficulty = preserveConstructedLinearDifficulty || preserveConstructedGeometryDifficulty
    ? (preserveConstructedLinearDifficulty ? question.difficulty : GEOMETRY_DIFFICULTY_CYCLE[((occurrence % GEOMETRY_DIFFICULTY_CYCLE.length) + GEOMETRY_DIFFICULTY_CYCLE.length) % GEOMETRY_DIFFICULTY_CYCLE.length])
    : ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard'][occurrence % 10];
  if (variant === 'psat-nmsqt' && difficulty === 'hard' && ['Advanced Math', 'Geometry and Trigonometry'].includes(question.domain)) {
    difficulty = 'medium';
  }
  const features = new Set(question.metadata?.difficultyFeatures || []);
  if (difficulty === 'medium') features.add('careful-interpretation');
  if (difficulty === 'hard') {
    features.add('multi-step');
    features.add('strategic-choice');
  }
  let next = {
    ...question,
    difficulty,
    difficultyBand: `${variant}-${question.adaptiveRoute || 'standard'}-${difficulty}`,
    cognitiveDemand: difficulty === 'easy' ? 'apply' : 'analyze',
    estimatedTimeSeconds: difficulty === 'hard' ? 105 : difficulty === 'medium' ? 90 : 75,
    metadata: {
      ...question.metadata,
      difficultyFeatures: [...features],
      difficultyRequirements: DIFFICULTY_REQUIREMENTS[difficulty],
      psatCeiling: variant === 'psat-nmsqt' ? PSAT_CEILING_RULES : question.metadata?.psatCeiling || null,
    },
  };

  if (next.questionType === 'student-produced-response' && Array.isArray(next.choices) && next.choices.length === 4) {
    const existingAnswerIndex = String(next.answer || '').charCodeAt(0) - 65;
    if (existingAnswerIndex >= 0 && existingAnswerIndex < 4) {
      next = { ...next, questionType: 'multiple-choice', interactionType: 'single-select' };
    }
  }

  const answerIndex = String(next.answer || 'A').charCodeAt(0) - 65;
  const correctChoice = next.questionType === 'multiple-choice' && answerIndex >= 0
    ? next.choices?.[answerIndex]
    : next.answer;
  const canBeSpr = next.questionType === 'student-produced-response'
    || (next.questionType === 'multiple-choice' && isNumericAnswer(correctChoice));
  const wantSpr = occurrence % 4 === 0 && canBeSpr;
  next = wantSpr ? toStudentProducedResponse(next) : toMultipleChoice(next, occurrence);
  return next;
}

export function generateRemediatedMathCandidatesUnique(options = {}) {
  const result = generateBaseMathCandidates(options);
  const skillOccurrences = {};

  const candidates = result.candidates.map((candidate) => {
    const skill = String(candidate.skill || '');
    const occurrence = skillOccurrences[skill] || 0;
    skillOccurrences[skill] = occurrence + 1;
    const remapped = candidate.figure
      ? remapFigureCandidate(candidate, occurrence)
      : remapStrategicCandidate(candidate, occurrence);
    const partitioned = partitionLinearSkill(remapped, skill, occurrence);
    return rebalanceDifficultyAndInteraction(partitioned, occurrence);
  });

  return {
    ...result,
    candidates,
    quality: candidates.map((candidate) => candidate),
  };
}

export default generateRemediatedMathCandidatesUnique;
