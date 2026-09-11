const VERBAL_BASES = [
  ['urban heat corridors', 'how planners compare cooling interventions across neighborhoods'],
  ['migratory bird timing', 'how biologists separate migration signals from weather variability'],
  ['ceramic pigment aging', 'how conservators evaluate color stability under changing light'],
  ['rail transfer design', 'how transit planners balance speed with reliable connections'],
  ['reef nursery restoration', 'how ecologists compare recovery across planting methods'],
  ['archival map repair', 'how conservators balance visible history with structural repair'],
  ['battery-material recovery', 'how engineers estimate usable material recovered from recycling'],
  ['urban language change', 'how linguists distinguish local innovation from broader change'],
  ['soil-carbon monitoring', 'how researchers account for variation between sampling locations'],
  ['museum sound design', 'how curators measure acoustics without disrupting visitor movement'],
  ['river-particle tracing', 'how geologists infer transport routes from particle signatures'],
  ['night-sky sensors', 'how astronomers separate instrument effects from environmental signals'],
  ['community garden output', 'how agronomists compare productivity across small growing plots'],
  ['satellite calibration', 'how remote-sensing teams align measurements collected in different seasons'],
  ['woodland corridor planning', 'how ecologists weigh connectivity against edge effects'],
  ['coastal dune recovery', 'how field teams distinguish natural succession from planted recovery'],
  ['microplastic collection', 'how oceanographers compare sampling methods with different biases'],
  ['ancient trade evidence', 'how archaeologists combine material evidence with geographic constraints'],
  ['indoor-air sensors', 'how public-health teams interpret uneven measurement coverage'],
  ['historic theater lighting', 'how preservationists balance authenticity with audience visibility'],
  ['urban tree survival', 'how foresters evaluate planting success beyond first-year survival'],
  ['wetland recovery metrics', 'how ecologists decide which indicators best capture restoration'],
  ['textile-dye fading', 'how materials scientists compare color loss under different exposures'],
  ['water-demand forecasting', 'how utilities distinguish weather effects from longer-term demand shifts'],
  ['public-art placement', 'how researchers measure whether placement changes pedestrian attention'],
  ['marine heatwave records', 'how climate scientists interpret short records with unusual events'],
  ['library digitization', 'how archivists prioritize material without treating age as the only criterion'],
  ['crop pollination trials', 'how biologists test whether abundance predicts useful pollination'],
  ['bridge vibration monitoring', 'how engineers identify signals associated with changing loads'],
  ['historical census gaps', 'how demographers handle missing records without inventing trends'],
  ['desert plant emergence', 'how botanists connect rainfall timing to delayed germination'],
  ['school commute behavior', 'how planners compare reported choices with observed travel patterns'],
  ['glacier sediment chemistry', 'how geochemists infer sources from overlapping mineral signatures'],
  ['restored grassland diversity', 'how ecologists evaluate diversity when dominant species also increase'],
  ['museum database links', 'how curators use metadata to reveal overlooked relationships'],
  ['renewable-grid forecasts', 'how analysts compare models under changing demand conditions']
];

const VERBAL_LENSES = [
  'a comparison of two study sites',
  'a change measured before and after an intervention',
  'a survey spanning several regions',
  'a long-term observational record',
  'a model checked against field observations',
  'a controlled experiment with repeated measurements'
];

const VERBAL_CONTEXTS = VERBAL_BASES.flatMap(([topic, aim]) =>
  VERBAL_LENSES.map((lens, index) => ({
    topic: `${topic} in ${['coastal districts', 'regional field stations', 'public institutions', 'restoration sites', 'seasonal monitoring programs', 'municipal planning studies'][index]}`,
    aim,
    lens,
    key: `${topic}|${lens}`,
  }))
);

const MATH_BASES = [
  'transit pass pricing', 'greenhouse irrigation', 'museum attendance', 'drone battery testing',
  'water-treatment planning', 'school fundraising', 'wildlife census design', 'solar-panel installation',
  'laboratory dilution', 'concert seating', 'bridge inspection', 'crop-yield comparison',
  'mobile data plans', 'warehouse packing', 'community energy use', 'robotics calibration',
  'river-flow estimation', 'library renovation', 'nutrition sampling', 'building acoustics',
  'satellite imaging', 'coastal monitoring', 'manufacturing quality', 'sports training',
  'bike-share demand', 'classroom experimentation', 'screening simulation', 'market demand',
  'habitat corridor planning', 'temperature sensing', 'soil moisture monitoring', 'solar storage',
  'elevator capacity', 'theater lighting', 'shipping costs', 'rainfall collection',
  'food-processing throughput', 'reservoir management', 'material-strength testing', 'campus shuttle use',
  'factory scheduling', 'wind-speed analysis', 'public-health sampling', 'recycling efficiency'
];

const MATH_ANGLES = [
  'The team is comparing two operating plans.',
  'The reported value is based on a revised schedule.',
  'The analyst wants a prediction under a changed condition.',
  'The reported measurement is being checked against a design target.'
];

const MATH_CONTEXTS = Array.from({ length: MATH_BASES.length * MATH_ANGLES.length }, (_, index) => {
  const base = MATH_BASES[Math.floor(index / MATH_ANGLES.length)];
  const angle = MATH_ANGLES[index % MATH_ANGLES.length];
  return {
    scenario: `a ${base} project`,
    angle,
    key: `${base}|${index % MATH_ANGLES.length}`,
  };
});

const rotateTo = (choices, correctIndex, targetIndex) => {
  const shift = (targetIndex - correctIndex + choices.length) % choices.length;
  const rotated = choices.map((_, index) => choices[(index - shift + choices.length) % choices.length]);
  return { choices: rotated, answer: String.fromCharCode(65 + targetIndex) };
};

const base = (id, testId, variant, section, module, domain, skill, prompt, choices, answer, explanation, options = {}) => ({
  contentId: id,
  version: 1,
  product: 'sat',
  questionId: id,
  testId,
  assessmentFamily: variant === 'psat-nmsqt' ? 'psat' : 'sat',
  assessmentVariant: variant,
  assessmentNumber: 1,
  section,
  module,
  domain,
  skill,
  subskill: skill,
  conceptId: `${domain}-${skill.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  difficulty: 'hard',
  difficultyBand: options.adaptiveRoute
    ? `mock-${variant === 'psat-nmsqt' ? 'psat' : 'sat'}-elevated-${options.adaptiveRoute}`
    : `mock-${variant === 'psat-nmsqt' ? 'psat' : 'sat'}-elevated`,
  cognitiveDemand: options.cognitiveDemand || 'analyze',
  questionType: options.questionType || 'multiple-choice',
  stimulusType: options.stimulusType || 'short-passage',
  interactionType: options.questionType === 'student-produced-response' ? 'student-produced-response' : 'single-select',
  timingMode: 'timed',
  estimatedTimeSeconds: section === 'reading-writing' ? 71 : 95,
  calculatorEligibility: section === 'math',
  calculatorMode: section === 'math' ? (options.calculatorMode || 'allowed') : 'not-applicable',
  calculatorRequired: options.calculatorRequired || false,
  referenceSheetRelevant: options.referenceSheetRelevant || false,
  passageId: null,
  prompt,
  choices,
  answer,
  explanation,
  figure: options.figure || null,
  isOperational: true,
  adaptiveRoute: options.adaptiveRoute || null,
  originalityFingerprint: id,
  conceptFingerprint: `${domain}-${skill}-${options.applicationFingerprint || id}`,
  tags: [variant, 'mock', 'elevated', 'apriori-original', ...(options.adaptiveRoute ? [`adaptive-route:${options.adaptiveRoute}`] : [])],
  lessonIds: [],
  sourceType: 'apriori-original',
  authoringStatus: 'validated',
  status: 'validated',
  releaseEligibility: true,
  metadata: {
    contextKey: options.contextKey || id,
    contextFamily: options.contextFamily || null,
    applicationFingerprint: options.applicationFingerprint || id,
    passageGenre: options.passageGenre || null,
    rhetoricalPurpose: options.rhetoricalPurpose || null,
    answerFormat: options.questionType === 'student-produced-response' ? 'numeric' : 'A-D'
  }
});

function verbalQuestion({ localIndex, globalIndex, testId, variant, module, route, context }) {
  const type = globalIndex % 12;
  const id = `${testId}-rw-${String(localIndex + 1).padStart(3, '0')}`;
  const method = context.lens;
  let domain = 'information-and-ideas';
  let skill = 'Central Ideas and Details';
  let prompt = '';
  let choices = [];
  let correctIndex = 0;
  let explanation = '';

  if (type === 0) {
    prompt = `Researchers examining ${context.topic} used ${method}. Their measurements differed across sites: one showed a faster response, while another showed a smaller initial change that persisted longer. The researchers also note that starting conditions were not identical.\n\nWhich choice best states the main idea of the text?`;
    choices = [
      'The study compares responses that differed in timing and persistence.',
      'The study proves that one condition caused every observed response.',
      'The study finds that all sites followed exactly the same pattern.',
      'The study shows that starting conditions had no effect on interpretation.'
    ];
    explanation = 'The correct choice summarizes the comparison without adding an unsupported causal conclusion.';
  } else if (type === 1) {
    prompt = `In a study of ${context.topic}, researchers observed a pattern after a seasonal shift, but temperature and moisture also changed. The authors therefore interpret the result cautiously.\n\nWhich inference is best supported by the text?`;
    choices = [
      'The seasonal shift may matter, but other changing conditions remain possible explanations.',
      'The seasonal shift caused the pattern because it occurred first.',
      'Temperature and moisture can be ignored because both changed gradually.',
      'The pattern can occur only when the seasonal shift takes the same form each year.'
    ];
    correctIndex = 0; skill = 'Inferences'; explanation = 'The evidence supports an association while leaving plausible alternatives open.';
  } else if (type === 2) {
    prompt = `A report on ${context.topic} claims that a revised measurement process is more precise. Under ${method}, the process produced a similar average but less spread across repeated trials.\n\nWhich choice best supports the claim?`;
    choices = [
      'The revised process produced less variation across repeated trials.',
      'The revised process produced a larger average in every reported trial.',
      'The earlier process required additional calibration before measurement.',
      'Both processes were examined during the same research period.'
    ];
    correctIndex = 0; skill = 'Command of Evidence'; explanation = 'Lower variation across repeated trials is direct evidence of greater precision.';
  } else if (type === 3) {
    prompt = `The curator described the ${context.topic} collection as deliberately **modest**, emphasizing that its value came from careful documentation rather than size.\n\nAs used in the text, what does "modest" most nearly mean?`;
    choices = ['limited in scale', 'carefully documented', 'financially costly', 'widely recognized'];
    correctIndex = 0; domain = 'craft-and-structure'; skill = 'Words in Context'; explanation = 'Here, modest means limited in scale.';
  } else if (type === 4) {
    prompt = `A report about ${context.topic} begins with a widely accepted explanation. It then presents results from ${method} that do not fit that explanation completely before proposing a qualified interpretation.\n\nWhat is the function of the new findings?`;
    choices = [
      'They provide evidence that prompts a qualification of the initial explanation.',
      'They repeat the initial explanation without changing its implications.',
      'They supply background information separate from the report’s central claim.',
      'They define a technical term needed to understand the earlier explanation.'
    ];
    correctIndex = 0; domain = 'craft-and-structure'; skill = 'Text Structure and Purpose'; explanation = 'The findings complicate the first account and therefore motivate a qualification.';
  } else if (type === 5) {
    prompt = `Passage 1 argues that an approach can improve outcomes in ${context.topic}. Passage 2 accepts that benefit but notes that local conditions can change the result.\n\nThe two authors would most likely agree that the approach`;
    choices = [
      'can help while still requiring attention to local conditions.',
      'works equally well regardless of local conditions.',
      'cannot help unless every site follows identical procedures.',
      'has little value because local conditions always outweigh its effects.'
    ];
    correctIndex = 0; domain = 'craft-and-structure'; skill = 'Cross-Text Connections'; explanation = 'Both passages recognize a possible benefit; the second adds a condition.';
  } else if (type === 6) {
    prompt = `Notes from a study of ${context.topic}: three approaches were compared; Approach B used 18% less energy than Approach A; Approach B also stayed within the target performance range.\n\nWhich choice most effectively uses the notes to emphasize the efficiency advantage?`;
    choices = [
      'Approach B used 18% less energy than Approach A and stayed within the target performance range.',
      'The study compared three approaches while recording their energy use.',
      'Approach B was one of the approaches included in the comparison.',
      'The researchers measured energy use and performance for each approach.'
    ];
    correctIndex = 0; domain = 'expression-of-ideas'; skill = 'Rhetorical Synthesis'; explanation = 'The correct choice combines the two facts that directly establish the stated efficiency advantage.';
  } else if (type === 7) {
    prompt = `New observations about ${context.topic} showed that demand fell as travel time increased. _____, the researchers revised their model to account for the pattern.`;
    choices = ['As a result', 'For instance', 'In contrast', 'At the same time'];
    correctIndex = 0; domain = 'expression-of-ideas'; skill = 'Transitions'; explanation = 'As a result correctly signals the consequence of the new observation.';
  } else if (type === 8) {
    prompt = `The committee approved the revised ${context.topic} plan _____ several members requested a later budget review.`;
    choices = ['; however,', '; and', '; because', '; therefore,'];
    correctIndex = 0; domain = 'standard-english-conventions'; skill = 'Boundaries'; explanation = 'The semicolon joins independent clauses, while however establishes the contrast.';
  } else if (type === 9) {
    prompt = `The study of ${context.topic} includes several explanations, each of which _____ a different assumption about the underlying process.`;
    choices = ['reflects', 'reflected', 'reflecting', 'has reflected'];
    correctIndex = 0; domain = 'standard-english-conventions'; skill = 'Form, Structure, and Sense'; explanation = 'Each is singular, so the singular verb reflects is required.';
  } else if (type === 10) {
    prompt = `Because an initial survey of ${context.topic} covered only one setting, researchers repeated the study across additional sites. The larger sample produced a similar direction of effect but a narrower estimate.\n\nWhich choice best describes why the second study strengthens the conclusion?`;
    choices = [
      'It tests whether the first pattern remains across a wider range of settings.',
      'It guarantees that the original finding applies in every possible setting.',
      'It removes all uncertainty by replacing observation with experimental evidence.',
      'It proves that the first setting represented every other setting.'
    ];
    correctIndex = 0; skill = 'Command of Evidence'; explanation = 'A broader sample tests robustness without guaranteeing universality.';
  } else {
    prompt = `Researchers describe ${context.topic} as a case in which an apparent improvement occurred immediately even though the long-term measure changed very little. They therefore caution readers about interpreting early gains.\n\nWhich choice best expresses the authors’ caution?`;
    choices = [
      'An early improvement is not proof that the effect will last.',
      'An early improvement always disappears when a longer measure is collected.',
      'A lasting effect can be established from the first measurement alone.',
      'Long-term measures are unnecessary when an early improvement is visible.'
    ];
    correctIndex = 0; skill = 'Inferences'; explanation = 'The authors distinguish short-term change from evidence of lasting effect.';
  }

  const targetPosition = globalIndex % 4;
  const shifted = rotateTo(choices, correctIndex, targetPosition);
  return base(id, testId, variant, 'reading-writing', module, domain, skill, prompt, shifted.choices, shifted.answer, explanation, {
    adaptiveRoute: route || null,
    cognitiveDemand: [1, 5, 6, 10, 11].includes(type) ? 'synthesize' : 'analyze',
    contextKey: `${variant}-verbal-context-${globalIndex}`,
    contextFamily: context.key,
    applicationFingerprint: `verbal-${globalIndex}`,
    passageGenre: ['science', 'history', 'humanities', 'social-science'][globalIndex % 4],
    rhetoricalPurpose: type === 6 ? 'emphasize a supported finding' : null
  });
}

function mathQuestion({ globalIndex, localIndex, testId, variant, module, route }) {
  const context = MATH_CONTEXTS[globalIndex];
  const pattern = globalIndex % 22;
  const id = `${testId}-math-${String(localIndex + 1).padStart(3, '0')}`;
  const targetPosition = globalIndex % 4;
  let prompt = '';
  let choices = [];
  let correct = 0;
  let explanation = '';
  let skill = 'Linear equations in one variable';
  let domain = 'algebra';
  let calculatorRequired = false;
  let questionType = 'multiple-choice';

  const v = Math.floor(globalIndex / 22);
  const u = globalIndex % 22;
  const n = 5 + (v % 8);
  const c = 4 + (u % 9);
  const scenarioLead = `${context.scenario}. ${context.angle}`;

  switch (pattern) {
    case 0: {
      const unit = n + 2; const total = 132 + 11 * unit;
      prompt = `${scenarioLead} A provider charges a fixed fee of $132 plus $11 for each service unit. A customer pays $${total}. How many service units were purchased?`;
      choices = [`${unit - 2}`, `${unit - 1}`, `${unit}`, `${unit + 2}`]; correct = 2;
      skill = 'Linear equations in one variable'; explanation = `Subtract the fixed fee and divide by 11: (${total} − 132) / 11 = ${unit}.`; break;
    }
    case 1: {
      const x1 = 2 + v; const dx = 4 + (u % 4); const slope = 2 + (u % 3); const y1 = 7 + c; const y2 = y1 + slope * dx;
      prompt = `${scenarioLead} A linear model passes through (${x1}, ${y1}) and (${x1 + dx}, ${y2}). What is the slope of the model?`;
      choices = [`${slope - 1}`, `${slope}`, `${slope + 1}`, `${slope + 2}`]; correct = 1;
      skill = 'Linear functions'; explanation = `Slope = (${y2} − ${y1}) / ${dx} = ${slope}.`; break;
    }
    case 2: {
      const adults = 7 + v; const students = 15 + u; const adultPrice = 19 + (u % 5); const studentPrice = 11 + (v % 4); const total = adults * adultPrice + students * studentPrice;
      prompt = `${scenarioLead} Adult entries cost $${adultPrice} and student entries cost $${studentPrice}. A group buys ${adults + students} entries for $${total}. How many adult entries were purchased?`;
      choices = [`${adults - 2}`, `${adults - 1}`, `${adults}`, `${adults + 2}`]; correct = 2;
      skill = 'Systems of two linear equations in two variables'; explanation = `Use a + s = ${adults + students} together with ${adultPrice}a + ${studentPrice}s = ${total}; solving gives a = ${adults}.`; break;
    }
    case 3: {
      const start = 9 + (u % 5); const add = 4 + (v % 4); const limit = start + add * (6 + (u % 5)); const max = Math.floor((limit - start) / add);
      prompt = `${scenarioLead} A storage area can hold at most ${limit} items. It already contains ${start}, and each shipment adds ${add}. What is the greatest whole number of shipments it can receive?`;
      choices = [`${max - 2}`, `${max - 1}`, `${max}`, `${max + 1}`]; correct = 2;
      skill = 'Linear inequalities in one or two variables'; explanation = `Solve ${start} + ${add}n ≤ ${limit}. The greatest whole-number solution is ${max}.`; break;
    }
    case 4: {
      const r = 4 + (u % 7);
      prompt = `${scenarioLead} A circular component has radius ${r} centimeters. Using π = 3.14, which expression gives its area?`;
      choices = [`3.14(${r})`, `3.14(${r})²`, `2(3.14)(${r})`, `3.14(2${r})`]; correct = 1;
      skill = 'Area and volume'; domain = 'geometry-and-trigonometry'; calculatorRequired = true; explanation = 'The area of a circle is πr², so 3.14(r)² is the correct expression.'; break;
    }
    case 5: {
      const r = 5 + (u % 6); const constant = r * r;
      prompt = `${scenarioLead} The quadratic f(x) = x² − ${2 * r}x + k has exactly one real zero. What value of k is required?`;
      choices = [`${constant - 3}`, `${constant - 1}`, `${constant}`, `${constant + 2}`]; correct = 2;
      skill = 'Nonlinear functions'; domain = 'advanced-math'; explanation = `A repeated zero requires a zero discriminant, so (${2 * r})² − 4k = 0 and k = ${constant}.`; break;
    }
    case 6: {
      const baseValue = 2 + (u % 3); const exponent = 4 + v; const result = Math.pow(baseValue, exponent);
      prompt = `${scenarioLead} A quantity is modeled by ${baseValue}^(x + 1). If the quantity equals ${result}, what is x?`;
      choices = [`${exponent - 3}`, `${exponent - 2}`, `${exponent - 1}`, `${exponent}`]; correct = 2;
      skill = 'Nonlinear equations in one variable'; domain = 'advanced-math'; explanation = `Because ${result} = ${baseValue}^${exponent}, x + 1 = ${exponent}, so x = ${exponent - 1}.`; break;
    }
    case 7: {
      const m = 1 + (u % 5); const delta = 4 + (v % 6); const rise = m * delta;
      prompt = `${scenarioLead} A linear model has slope ${m}. If the input increases by ${delta}, by how much does the predicted output increase?`;
      choices = [`${rise - 2}`, `${rise - 1}`, `${rise}`, `${rise + 2}`]; correct = 2;
      skill = 'Linear functions'; explanation = `The output changes by slope × change in input = ${m} × ${delta} = ${rise}.`; break;
    }
    case 8: {
      const value = Math.round((100 * 0.82 * 0.9));
      prompt = `${scenarioLead} An item is discounted by 18% and then by an additional 10% of the reduced price. What percent of the original price is paid?`;
      choices = [`${value - 7}%`, `${value - 3}%`, `${value}%`, `${value + 4}%`]; correct = 2;
      skill = 'Percentages'; domain = 'problem-solving-and-data-analysis'; explanation = `The paid fraction is 0.82 × 0.90 = 0.738, so 73.8% of the original price is paid.`; break;
    }
    case 9: {
      const p = 3 + (u % 4); const q = 5 + (v % 5); const amount = 6 + (u % 5); const water = amount * q / p;
      prompt = `${scenarioLead} A mixture uses concentrate and water in a ${p}:${q} ratio. If ${amount} liters of concentrate are used, how many liters of water are needed?`;
      const values = [water - 2, water - 1, water, water + 2].map((item) => Number.isInteger(item) ? String(item) : item.toFixed(1));
      choices = values; correct = 2;
      skill = 'Ratios, rates, proportional relationships, and units'; domain = 'problem-solving-and-data-analysis'; explanation = `Multiply the concentrate amount by ${q}/${p}; the result is ${water} liters.`; break;
    }
    case 10: {
      const mean = 20 + u; const sd = 4 + (v % 3); const add = 3 + (u % 5);
      prompt = `${scenarioLead} A data set has mean ${mean} and standard deviation ${sd}. If ${add} is added to every value, what are the new mean and standard deviation?`;
      choices = [`${mean + add} and ${sd - 1}`, `${mean + add} and ${sd}`, `${mean} and ${sd + add}`, `${mean + add - 1} and ${sd + 1}`]; correct = 1;
      skill = 'One-variable data: distributions and measures of center and spread'; domain = 'problem-solving-and-data-analysis'; explanation = `Adding a constant changes the mean by ${add} but leaves standard deviation unchanged.`; break;
    }
    case 11: {
      const count = 9 + (u % 7); const originalMean = 18 + (v % 6); const a = 8 + (u % 5); const b = 14 + (u % 7); const answer = (originalMean * count + a + b) / (count + 2);
      prompt = `${scenarioLead} A data set has ${count} values with mean ${originalMean}. Two additional values, ${a} and ${b}, are added. What is the new mean?`;
      const formatted = Number(answer.toFixed(1));
      choices = [`${(formatted - 1).toFixed(1)}`, `${(formatted - 0.5).toFixed(1)}`, `${formatted.toFixed(1)}`, `${(formatted + 1).toFixed(1)}`]; correct = 2;
      skill = 'One-variable data: distributions and measures of center and spread'; domain = 'problem-solving-and-data-analysis'; explanation = `Find the original total, add ${a} and ${b}, and divide by ${count + 2}; the mean is ${formatted}.`; break;
    }
    case 12: {
      const favorable = 3 + (u % 8); const total = favorable + 5 + (v % 6); const probability = favorable / total;
      prompt = `${scenarioLead} In a sample, ${favorable} of ${total} items meet a quality standard. If one item is selected at random, what is the probability that it meets the standard?`;
      choices = [(probability - 0.1).toFixed(2), probability.toFixed(2), (probability + 0.1).toFixed(2), (probability + 0.2).toFixed(2)]; correct = 1;
      skill = 'Probability and conditional probability'; domain = 'problem-solving-and-data-analysis'; explanation = `Probability = favorable outcomes / total outcomes = ${favorable}/${total} ≈ ${probability.toFixed(2)}.`; break;
    }
    case 13: {
      const slope = 1 + (u % 4); const intercept = 6 + v; const x = 3 + (u % 6); const y = slope * x + intercept;
      prompt = `${scenarioLead} A line of best fit is y = ${slope}x + ${intercept}. What y-value does the model predict when x = ${x}?`;
      choices = [`${y - 2}`, `${y - 1}`, `${y}`, `${y + 2}`]; correct = 2;
      skill = 'Two-variable data: models and scatterplots'; domain = 'problem-solving-and-data-analysis'; calculatorRequired = true; explanation = `Substituting x = ${x} gives y = ${y}.`; break;
    }
    case 14: {
      const diameter = 6 + (u % 9); const circumference = 3.14 * diameter;
      prompt = `${scenarioLead} A circular sensor has diameter ${diameter} centimeters. Using π = 3.14, what is its circumference to the nearest tenth?`;
      const rounded = Number(circumference.toFixed(1));
      choices = [`${(rounded - 1).toFixed(1)}`, `${rounded.toFixed(1)}`, `${(rounded + 1).toFixed(1)}`, `${(rounded + 2).toFixed(1)}`]; correct = 1;
      skill = 'Circles'; domain = 'geometry-and-trigonometry'; calculatorRequired = true; explanation = `Circumference = πd = 3.14 × ${diameter} ≈ ${rounded}.`; break;
    }
    case 15: {
      const legA = 3 + (u % 7); const legB = 4 + ((v + u) % 8); const hyp = Number(Math.sqrt(legA ** 2 + legB ** 2).toFixed(1));
      prompt = `${scenarioLead} A right-triangle cross-section has legs ${legA} and ${legB} units. What is the hypotenuse length, to the nearest tenth?`;
      choices = [`${(hyp - 1).toFixed(1)}`, `${(hyp - 0.5).toFixed(1)}`, `${hyp.toFixed(1)}`, `${(hyp + 0.7).toFixed(1)}`]; correct = 2;
      skill = 'Right triangles'; domain = 'geometry-and-trigonometry'; calculatorRequired = true; explanation = `Use the Pythagorean theorem: c = √(${legA}² + ${legB}²) ≈ ${hyp}.`; break;
    }
    case 16: {
      const width = 6 + (u % 8); const height = 8 + (v % 7); const area = width * height / 2;
      prompt = `${scenarioLead} A triangular panel has base ${width} meters and height ${height} meters. What is its area?`;
      choices = [`${area - 4}`, `${area - 2}`, `${area}`, `${area + 4}`]; correct = 2;
      skill = 'Area and volume'; domain = 'geometry-and-trigonometry'; explanation = `Triangle area = 1/2 × base × height = ${area}.`; break;
    }
    case 17: {
      const a = 2 + (u % 6); const b = 3 + (v % 5); const total = a + b; const product = a * b;
      prompt = `${scenarioLead} A quadratic has roots ${a} and ${b}. Which expression could represent the quadratic in factored form?`;
      choices = [`(x + ${a})(x + ${b})`, `(x − ${a})(x − ${b})`, `(x − ${total})(x + ${product})`, `(x + ${product})(x − ${total})`]; correct = 1;
      skill = 'Equivalent expressions'; domain = 'advanced-math'; explanation = `Roots a and b correspond to factors (x − a) and (x − b).`; break;
    }
    case 18: {
      const percent = 12 + (u % 9); const initial = 100 + 10 * v; const increase = initial * (percent / 100); const final = initial + increase;
      prompt = `${scenarioLead} A quantity of ${initial} increases by ${percent}%. What is the new value?`;
      const rounded = Number(final.toFixed(1));
      choices = [`${(rounded - 8).toFixed(1)}`, `${(rounded - 3).toFixed(1)}`, `${rounded.toFixed(1)}`, `${(rounded + 5).toFixed(1)}`]; correct = 2;
      skill = 'Percentages'; domain = 'problem-solving-and-data-analysis'; explanation = `Increase = ${initial} × ${percent}/100, so the new value is ${rounded}.`; break;
    }
    case 19: {
      const q = 5 + (u % 7); const p = 2 + (v % 4);
      prompt = `${scenarioLead} For x ≠ 0, which expression is equivalent to (${q}x + ${p}x)/${p}?`;
      choices = [`${q}/${p}`, `${q + p}/${p}`, `${q + p + 1}/${p}`, `${q}/${p + 1}`]; correct = 1;
      skill = 'Equivalent expressions'; domain = 'advanced-math'; explanation = `Combine like terms in the numerator: (${q} + ${p})x, then divide by ${p}.`; break;
    }
    case 20: {
      const coefficient = 2 + (u % 5); const constant = 5 + (v % 8); const x = 3 + (u % 6); const value = coefficient * x + constant;
      prompt = `${scenarioLead} A linear model is y = ${coefficient}x + ${constant}. What value of y is predicted when x = ${x}?`;
      choices = [`${value - 3}`, `${value - 1}`, `${value}`, `${value + 2}`]; correct = 2;
      skill = 'Linear equations in one variable'; explanation = `Substitute x = ${x}: y = ${coefficient}(${x}) + ${constant} = ${value}.`; break;
    }
    default: {
      const a = 3 + (u % 7); const b = 2 + (v % 6); const result = a * b;
      prompt = `${scenarioLead} A rectangular display uses ${a} rows with ${b} equal units in each row. How many units are displayed?`;
      choices = [`${result - 2}`, `${result - 1}`, `${result}`, `${result + 2}`]; correct = 2;
      skill = 'Linear equations in one variable'; explanation = `Multiply the number of rows by the units per row: ${a} × ${b} = ${result}.`; break;
    }
  }

  let answerChoices = choices;
  let answer = String.fromCharCode(65 + correct);
  if (questionType === 'multiple-choice') {
    const shifted = rotateTo(choices, correct, targetPosition);
    answerChoices = shifted.choices;
    answer = shifted.answer;
  }

  return base(id, testId, variant, 'math', module, domain, skill, prompt, answerChoices, answer, explanation, {
    adaptiveRoute: route || null,
    questionType,
    calculatorRequired,
    calculatorMode: calculatorRequired ? 'required' : 'allowed',
    referenceSheetRelevant: domain === 'geometry-and-trigonometry',
    contextKey: `${variant}-math-context-${globalIndex}`,
    contextFamily: context.key,
    applicationFingerprint: `math-${globalIndex}`,
    stimulusType: pattern >= 13 && pattern <= 16 ? 'data-or-geometry-application' : 'application'
  });
}

export function buildReadingWriting({ testId, variant, module }) {
  const isModule2 = module === 'rw-module-2';
  const count = isModule2 ? 81 : 27;
  const bankOffset = variant === 'psat-nmsqt' ? 0 : 108;
  return Array.from({ length: count }, (_, j) => {
    const globalIndex = bankOffset + (isModule2 ? 27 + j : j);
    const route = isModule2 ? ['high', 'standard', 'low'][Math.floor(j / 27)] : null;
    return verbalQuestion({
      localIndex: j,
      globalIndex,
      testId,
      variant,
      module,
      route,
      context: VERBAL_CONTEXTS[globalIndex]
    });
  });
}

export function buildMath({ testId, variant, module }) {
  const isModule2 = module === 'math-module-2';
  const count = isModule2 ? 66 : 22;
  const bankOffset = variant === 'psat-nmsqt' ? 0 : 88;
  return Array.from({ length: count }, (_, j) => {
    const globalIndex = bankOffset + (isModule2 ? 22 + j : j);
    const route = isModule2 ? ['high', 'standard', 'low'][Math.floor(j / 22)] : null;
    return mathQuestion({ globalIndex, localIndex: j, testId, variant, module, route });
  });
}

export const buildMock = ({ testId, variant, section, module }) => (
  section === 'reading-writing'
    ? buildReadingWriting({ testId, variant, module })
    : buildMath({ testId, variant, module })
);

export default { buildMock, buildReadingWriting, buildMath };
