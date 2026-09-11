const VERBAL_TOPICS = [
  ['urban cooling maps', 'how planners compare heat exposure across neighborhoods'],
  ['migratory bird timing', 'how biologists separate seasonal signals from weather changes'],
  ['ceramic pigment durability', 'how conservation scientists test color stability over time'],
  ['rail timetable design', 'how transit planners balance speed with transfer reliability'],
  ['reef restoration', 'how ecologists compare recovery under different planting methods'],
  ['archival map repair', 'how conservators decide whether restoration should remain visible'],
  ['battery-material recycling', 'how engineers measure recovery efficiency without overstating yield'],
  ['language change in cities', 'how linguists distinguish local innovation from wider trends'],
  ['soil-carbon sampling', 'how researchers account for variation between sampling sites'],
  ['museum acoustics', 'how curators assess sound without disrupting visitor flow'],
  ['river-sediment tracing', 'how geologists infer transport pathways from particle signatures'],
  ['night-sky monitoring', 'how astronomers separate instrument effects from environmental change'],
  ['community garden yields', 'how agronomists compare productivity across small plots'],
  ['satellite image calibration', 'how remote-sensing teams correct measurements across seasons'],
  ['woodland corridor design', 'how ecologists weigh connectivity against edge effects'],
  ['coastal-dune recovery', 'how field teams distinguish natural succession from planted recovery'],
  ['microplastic sampling', 'how oceanographers compare collection methods with different biases'],
  ['ancient trade routes', 'how archaeologists combine material evidence with geographic constraints'],
  ['indoor-air sensor networks', 'how public-health teams interpret uneven sensor coverage'],
  ['historic theater lighting', 'how preservationists balance authenticity with audience visibility'],
  ['urban tree survival', 'how foresters evaluate planting success beyond first-year survival'],
  ['wetland restoration metrics', 'how ecologists decide which indicators best capture recovery'],
  ['textile-dye chemistry', 'how materials scientists compare fading under different exposures'],
  ['water-demand forecasting', 'how utilities distinguish weather effects from long-term demand shifts'],
  ['public art placement', 'how researchers measure whether placement changes pedestrian attention'],
  ['marine heatwave records', 'how climate scientists interpret short records with unusual events'],
  ['library digitization', 'how archivists prioritize material without equating age with significance'],
  ['crop pollination studies', 'how biologists test whether abundance predicts useful pollination'],
  ['bridge vibration monitoring', 'how engineers identify patterns that indicate changing loads'],
  ['historical census records', 'how demographers handle gaps without inventing unsupported trends'],
  ['desert plant emergence', 'how botanists connect rainfall timing to delayed germination'],
  ['school commute surveys', 'how planners compare reported travel choices with observed behavior'],
  ['glacier-sediment chemistry', 'how geochemists infer sources from overlapping mineral signatures'],
  ['restored grasslands', 'how ecologists evaluate diversity when dominant species also increase'],
  ['museum collection databases', 'how curators use metadata to reveal overlooked relationships'],
  ['renewable-grid forecasting', 'how energy analysts compare models under changing demand patterns'],
  ['historic building materials', 'how conservation teams test compatibility before repair']
];

const VERBAL_METHODS = [
  'a paired-site comparison', 'a controlled field trial', 'a sequence of repeated measurements',
  'a cross-regional survey', 'a long-term observational record', 'a model comparison',
  'a before-and-after study', 'a small experimental intervention', 'a matched-sample analysis'
];

const rotate = (choices, correctIndex, amount) => {
  const shift = amount % choices.length;
  const rotated = choices.map((_, index) => choices[(index - shift + choices.length) % choices.length]);
  const rotatedCorrect = (correctIndex + shift) % choices.length;
  return { choices: rotated, answer: String.fromCharCode(65 + rotatedCorrect) };
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
  difficultyBand: options.adaptiveRoute ? `mock-${variant === 'psat-nmsqt' ? 'psat' : 'sat'}-elevated-${options.adaptiveRoute}` : `mock-${variant === 'psat-nmsqt' ? 'psat' : 'sat'}-elevated`,
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
  conceptFingerprint: `${domain}-${skill}-${options.contextKey || id}`,
  tags: [variant, 'mock', 'elevated', 'apriori-original', ...(options.adaptiveRoute ? [options.adaptiveRoute] : [])],
  lessonIds: [],
  sourceType: 'apriori-original',
  authoringStatus: 'validated',
  status: 'validated',
  releaseEligibility: true,
  metadata: {
    contextKey: options.contextKey || id,
    contextFamily: options.contextFamily || null,
    passageGenre: options.passageGenre || null,
    rhetoricalPurpose: options.rhetoricalPurpose || null,
    answerFormat: options.questionType === 'student-produced-response' ? 'numeric' : 'A-D'
  }
});

function verbalQuestion({ index, testId, variant, module, route, topicIndex }) {
  const [topic, aim] = VERBAL_TOPICS[topicIndex];
  const method = VERBAL_METHODS[(index + topicIndex) % VERBAL_METHODS.length];
  const contextKey = `${variant}-verbal-${topicIndex}-${index}`;
  const type = index % 12;
  const id = `${testId}-rw-${String(index + 1).padStart(3, '0')}`;
  let domain = 'information-and-ideas';
  let skill = 'Central Ideas and Details';
  let prompt;
  let choices;
  let correctIndex = 0;
  let explanation;

  if (type === 0) {
    prompt = `Researchers examining ${topic} used ${method}. Their results differed across two settings: one showed an early change, while the other showed a smaller initial effect that persisted longer. The researchers also note that the settings began with different baseline conditions.\n\nWhich choice best states the main idea of the text?`;
    choices = [
      'The study compares settings whose responses differed in timing and persistence.',
      'The study proves that the later response was caused by one shared condition.',
      'The study finds that both settings produced the same pattern over time.',
      'The study shows that baseline conditions were unrelated to the results.'
    ];
    explanation = 'The choice captures the comparison in timing and persistence without adding an unsupported causal claim.';
  } else if (type === 1) {
    prompt = `In a study of ${topic}, researchers observed a pattern after a seasonal change, but temperature and moisture changed at the same time. The authors therefore discuss the pattern cautiously.\n\nWhich inference is best supported by the text?`;
    choices = [
      'The seasonal change may matter, but other changing conditions remain possible explanations.',
      'The seasonal change must have caused the pattern because it happened first.',
      'Temperature and moisture can be ruled out because they changed gradually.',
      'The pattern can occur only when the seasonal change happens in the same way.'
    ];
    correctIndex = 0; skill = 'Inferences'; explanation = 'The evidence supports an association while leaving alternative explanations open.';
  } else if (type === 2) {
    prompt = `A report on ${topic} claims that a newer measurement procedure is more precise. In a controlled comparison, the procedure produced nearly the same average result but a narrower spread across repeated measurements.\n\nWhich choice best supports the claim?`;
    choices = [
      'The newer procedure produced less variation across repeated measurements.',
      'The newer procedure produced a higher average result in every trial.',
      'The older procedure required a separate calibration step before testing.',
      'The two procedures were used during the same general research period.'
    ];
    correctIndex = 0; skill = 'Command of Evidence'; explanation = 'Lower variation across repeated measurements is direct evidence of greater precision.';
  } else if (type === 3) {
    prompt = `The curator described the ${topic} collection as deliberately **modest**, emphasizing that its value came from careful documentation rather than size.\n\nAs used in the text, what does "modest" most nearly mean?`;
    choices = ['limited in scale', 'carefully recorded', 'financially costly', 'widely recognized'];
    correctIndex = 0; domain = 'craft-and-structure'; skill = 'Words in Context'; explanation = 'Here, modest refers to the collection being limited in scale.';
  } else if (type === 4) {
    prompt = `A report about ${topic} begins with a widely accepted explanation. It then presents findings from ${method} that do not fit that explanation completely before proposing a more qualified interpretation.\n\nWhat is the function of the new findings?`;
    choices = [
      'They create evidence that prompts the author to qualify the initial explanation.',
      'They repeat the initial explanation without changing its implications.',
      'They provide historical background that is separate from the main claim.',
      'They define a technical term that the earlier explanation depends upon.'
    ];
    correctIndex = 0; domain = 'craft-and-structure'; skill = 'Text Structure and Purpose'; explanation = 'The findings conflict with a simple account and motivate a more qualified interpretation.';
  } else if (type === 5) {
    prompt = `Passage 1 argues that a particular approach can improve outcomes in ${topic}. Passage 2 accepts the potential benefit but notes that local conditions can change the result.\n\nThe two authors would most likely agree that the approach`;
    choices = [
      'can provide benefits while still requiring attention to local conditions.',
      'works equally well in every setting regardless of local conditions.',
      'cannot improve outcomes unless every setting uses identical procedures.',
      'has little value because local conditions always override its effects.'
    ];
    correctIndex = 0; domain = 'craft-and-structure'; skill = 'Cross-Text Connections'; explanation = 'Both passages recognize the possible benefit; the second adds an important qualification.';
  } else if (type === 6) {
    prompt = `Notes from a study of ${topic}: researchers compared three approaches; Approach B used 18% less energy than Approach A; Approach B also remained within the target performance range.\n\nWhich choice most effectively uses the notes to emphasize the efficiency advantage?`;
    choices = [
      'Approach B used 18% less energy than Approach A while remaining within the target range.',
      'Researchers compared three approaches during the study of the topic.',
      'Approach B was included among the approaches evaluated by the researchers.',
      'The study measured both energy use and performance for each approach.'
    ];
    correctIndex = 0; domain = 'expression-of-ideas'; skill = 'Rhetorical Synthesis'; explanation = 'The best choice combines the two facts that directly establish the efficiency advantage.';
  } else if (type === 7) {
    prompt = `New observations about ${topic} showed that demand fell as travel time increased. _____, the researchers revised their model to account for the pattern.`;
    choices = ['As a result', 'For instance', 'In contrast', 'At the same time'];
    correctIndex = 0; domain = 'expression-of-ideas'; skill = 'Transitions'; explanation = 'As a result correctly signals that the revision followed from the observation.';
  } else if (type === 8) {
    prompt = `The committee approved the revised ${topic} plan _____ several members requested a later review of the budget.`;
    choices = ['; however,', '; and', '; because', '; therefore,'];
    correctIndex = 0; domain = 'standard-english-conventions'; skill = 'Boundaries'; explanation = 'The two independent clauses are correctly joined with a semicolon and a contrasting transition.';
  } else if (type === 9) {
    prompt = `The study of ${topic} includes several explanations, each of which _____ a different assumption about the underlying process.`;
    choices = ['reflects', 'reflected', 'reflecting', 'has reflected'];
    correctIndex = 0; domain = 'standard-english-conventions'; skill = 'Form, Structure, and Sense'; explanation = 'The singular subject each requires the singular verb reflects.';
  } else if (type === 10) {
    prompt = `Because the first survey of ${topic} included only one neighborhood, the researchers repeated the study across four additional sites. The broader sample produced a similar direction of effect but a narrower estimate.\n\nWhich choice best describes why the second study strengthens the conclusion?`;
    choices = [
      'It tests whether the first pattern remains when the sample covers more settings.',
      'It guarantees that the original finding will apply in every setting.',
      'It removes all uncertainty by replacing observation with experimental evidence.',
      'It proves that the first neighborhood was representative of every other site.'
    ];
    correctIndex = 0; skill = 'Command of Evidence'; explanation = 'A broader sample tests the robustness of the pattern across settings without guaranteeing universality.';
  } else {
    prompt = `The researchers describe ${topic} as a case in which an apparent improvement occurred immediately, although the long-term measure changed very little. They therefore caution readers about interpreting early gains.\n\nWhich choice best expresses the authors' caution?`;
    choices = [
      'An early improvement should not be treated as proof of a lasting effect.',
      'An early improvement always disappears once a longer measure is collected.',
      'A lasting effect can be established from the first measurement alone.',
      'Long-term measures are unnecessary when an early improvement is visible.'
    ];
    correctIndex = 0; domain = 'information-and-ideas'; skill = 'Inferences'; explanation = 'The authors distinguish short-term change from evidence of lasting effect.';
  }

  const shifted = rotate(choices, correctIndex, (index * 3 + topicIndex) % 4);
  const routeValue = route || null;
  return base(id, testId, variant, 'reading-writing', module, domain, skill, `${prompt}\n\nContext focus: ${aim}.`, shifted.choices, shifted.answer, explanation, {
    adaptiveRoute: routeValue,
    cognitiveDemand: type === 5 || type === 6 || type === 10 ? 'synthesize' : 'analyze',
    contextKey,
    contextFamily: topic,
    passageGenre: ['science', 'history', 'humanities', 'social-science'][(topicIndex + index) % 4],
    rhetoricalPurpose: type === 6 ? 'emphasize a supported finding' : null
  });
}

const MATH_SCENARIOS = [
  'a transit pass pricing study', 'a greenhouse irrigation schedule', 'a museum attendance forecast', 'a drone battery test',
  'a water-treatment pilot', 'a school fundraising plan', 'a wildlife census', 'a solar-panel installation',
  'a laboratory dilution trial', 'a concert seating model', 'a bridge inspection survey', 'a crop-yield comparison',
  'a mobile data plan', 'a warehouse packing system', 'a community energy report', 'a robotics calibration task',
  'a river-flow estimate', 'a public-library renovation', 'a nutrition study', 'a building acoustics test',
  'a satellite imaging project', 'a coastal monitoring program', 'a manufacturing quality check', 'a sports training study',
  'a city bike-share system', 'a classroom experiment', 'a medical screening simulation', 'a market demand model',
  'a habitat corridor survey', 'a temperature sensor study', 'a soil moisture trial', 'a solar storage experiment',
  'an elevator capacity study', 'a theater lighting plan', 'a shipping cost model', 'a rainfall collection study',
  'a food-processing line', 'a reservoir management model', 'a material-strength test', 'a campus shuttle survey',
  'a factory scheduling model', 'a wind-speed dataset', 'a public-health sample', 'a recycling efficiency study'
];

const mathChoice = (choices, correctIndex) => rotate(choices, correctIndex, correctIndex * 2 + choices.length);

function mathQuestion({ index, testId, variant, module, route, globalIndex }) {
  const scenario = MATH_SCENARIOS[(globalIndex + (variant === 'sat-series-a' ? 7 : 0)) % MATH_SCENARIOS.length];
  const pattern = globalIndex % 22;
  const id = `${testId}-math-${String(globalIndex + 1).padStart(3, '0')}`;
  let prompt = '';
  let choices = [];
  let correct = 0;
  let explanation = '';
  let skill = '';
  let domain = 'algebra';
  let calculatorRequired = false;
  let questionType = 'multiple-choice';

  const v = Math.floor(globalIndex / 22);
  const a = 4 + ((globalIndex * 3 + v) % 9);
  const b = 7 + ((globalIndex * 5 + v) % 13);

  switch (pattern) {
    case 0: {
      const unit = 6 + v;
      const total = 118 + 9 * unit;
      prompt = `${scenario}: A service charges a fixed fee of $118 plus $9 for each additional unit. A customer pays $${total}. How many additional units did the customer purchase?`;
      choices = [`${unit - 2}`, `${unit - 1}`, `${unit}`, `${unit + 1}`]; correct = 2;
      skill = 'Linear equations in one variable'; explanation = `Subtract the fixed $118 fee, then divide the remainder by $9 to obtain ${unit}.`; break;
    }
    case 1: {
      const x1 = 2 + v; const x2 = x1 + 5; const y1 = 11 + index; const slope = 2 + (v % 3); const y2 = y1 + slope * 5;
      prompt = `${scenario}: A linear model passes through (${x1}, ${y1}) and (${x2}, ${y2}). What is the slope of the model?`;
      choices = [`${slope - 1}`, `${slope}`, `${slope + 1}`, `${slope + 2}`]; correct = 1;
      skill = 'Linear functions'; explanation = `The slope is (change in y)/(change in x) = ${slope * 5}/5 = ${slope}.`; break;
    }
    case 2: {
      const adults = 8 + v; const students = 18 + v; const adultPrice = 21 + v; const studentPrice = 13 + v;
      const total = adults * adultPrice + students * studentPrice;
      prompt = `${scenario}: Adult entries cost $${adultPrice} and student entries cost $${studentPrice}. A group buys ${adults + students} entries for $${total}. How many adult entries were purchased?`;
      choices = [`${adults - 2}`, `${adults - 1}`, `${adults}`, `${adults + 2}`]; correct = 2;
      skill = 'Systems of two linear equations in two variables'; explanation = `Using a + s = ${adults + students} and ${adultPrice}a + ${studentPrice}s = ${total} gives a = ${adults}.`; break;
    }
    case 3: {
      const start = 8 + v; const add = 4 + (v % 3); const limit = 51 + v * 2; const max = Math.floor((limit - start) / add);
      prompt = `${scenario}: A storage area can hold at most ${limit} items. It already contains ${start}, and each shipment adds ${add}. What is the greatest whole number of shipments it can receive?`;
      choices = [`${max - 2}`, `${max - 1}`, `${max}`, `${max + 1}`]; correct = 2;
      skill = 'Linear inequalities in one or two variables'; explanation = `Solve ${start} + ${add}n ≤ ${limit}; the greatest whole-number solution is ${max}.`; break;
    }
    case 4: {
      const r = 5 + v; const h = 8 + (index % 4); const area = Math.PI * r * r;
      prompt = `${scenario}: A circular component has radius ${r} centimeters. Using π = 3.14, which expression gives its area?`;
      choices = [`3.14(${r})`, `3.14(${r})²`, `2(3.14)(${r})`, `3.14(2${r})`]; correct = 1;
      skill = 'Area and volume'; domain = 'geometry-and-trigonometry'; calculatorRequired = true; explanation = 'The area of a circle is πr², so 3.14(r)² is the correct expression.'; break;
    }
    case 5: {
      const k = 5 + (globalIndex % 6); const vertex = 4 + v; const constant = vertex * vertex;
      prompt = `${scenario}: The quadratic f(x) = x² − ${2 * vertex}x + k has exactly one real zero when k equals a certain value. What value of k is required?`;
      choices = [`${constant - 3}`, `${constant - 1}`, `${constant}`, `${constant + 2}`]; correct = 2;
      skill = 'Nonlinear functions'; domain = 'advanced-math'; explanation = `A repeated zero requires a zero discriminant: (${2 * vertex})² − 4k = 0, so k = ${constant}.`; break;
    }
    case 6: {
      const baseValue = 2 + (v % 3); const exponent = 3 + v; const answer = Math.pow(baseValue, exponent - 1);
      prompt = `${scenario}: A quantity is modeled by ${baseValue}^(x + 1). If the quantity equals ${Math.pow(baseValue, exponent)}, what is x?`;
      choices = [`${exponent - 3}`, `${exponent - 2}`, `${exponent - 1}`, `${exponent}`]; correct = 2;
      skill = 'Nonlinear equations in one variable'; domain = 'advanced-math'; explanation = `Equating exponents gives x + 1 = ${exponent}, so x = ${exponent - 1}.`; break;
    }
    case 7: {
      const m = 1 + (v % 4); const c = 3 + index; const delta = 4 + v; const rise = m * delta;
      prompt = `${scenario}: A linear model is y = ${m}x + ${c}. If x increases by ${delta}, by how much does the predicted value of y increase?`;
      choices = [`${rise - 2}`, `${rise - 1}`, `${rise}`, `${rise + 2}`]; correct = 2;
      skill = 'Linear functions'; explanation = `The slope is ${m}, so a change of ${delta} in x changes y by ${m} × ${delta} = ${rise}.`; break;
    }
    case 8: {
      const original = 80 + 5 * v; const d1 = 0.2; const d2 = 0.1; const paid = original * (1 - d1) * (1 - d2);
      const percent = Math.round((paid / original) * 100);
      prompt = `${scenario}: An item is discounted by 20% and then by an additional 10% of the reduced price. What percent of the original price is paid?`;
      choices = [`${percent - 5}%`, `${percent - 2}%`, `${percent}%`, `${percent + 3}%`]; correct = 2;
      skill = 'Percentages'; domain = 'problem-solving-and-data-analysis'; explanation = `The customer pays 0.80 × 0.90 = 0.72 of the original price, or 72%.`; break;
    }
    case 9: {
      const p = 3 + v; const q = 7 + v; const amount = 6 + v;
      const water = amount * q / p;
      prompt = `${scenario}: A mixture uses concentrate and water in a ${p}:${q} ratio. If ${amount} liters of concentrate are used, how many liters of water are needed?`;
      choices = [`${water - 2}`, `${water - 1}`, `${water}`, `${water + 2}`]; correct = 2;
      skill = 'Ratios, rates, proportional relationships, and units'; domain = 'problem-solving-and-data-analysis'; explanation = `Multiply the concentrate amount by ${q}/${p}; this gives ${water} liters of water.`; break;
    }
    case 10: {
      const mean = 18 + v; const sd = 4 + (index % 3); const add = 3 + v;
      prompt = `${scenario}: A data set has mean ${mean} and standard deviation ${sd}. If ${add} is added to every value, what are the new mean and standard deviation?`;
      choices = [`${mean + add} and ${sd - 1}`, `${mean + add} and ${sd}`, `${mean} and ${sd + add}`, `${mean + add - 1} and ${sd}`]; correct = 1;
      skill = 'One-variable data: distributions and measures of center and spread'; domain = 'problem-solving-and-data-analysis'; explanation = `Adding a constant increases the mean by ${add} and leaves the standard deviation unchanged.`; break;
    }
    case 11: {
      const a1 = 4 + v; const a2 = 6 + v; const count = 10 + v; const total = a1 + a2 + count * (5 + v);
      const newMean = total / (count + 2);
      prompt = `${scenario}: A data set originally has mean ${5 + v}. Two additional values, ${a1} and ${a2}, are added. What is the new mean if the original data set contained ${count} values?`;
      const oldTotal = (5 + v) * count; const answer = (oldTotal + a1 + a2) / (count + 2);
      choices = [answer.toFixed(1), (answer + 0.5).toFixed(1), (answer + 1).toFixed(1), (answer - 0.5).toFixed(1)]; correct = 0;
      skill = 'One-variable data: distributions and measures of center and spread'; domain = 'problem-solving-and-data-analysis'; explanation = `Compute the original total, add the two new values, and divide by ${count + 2}.`; break;
    }
    case 12: {
      const success = 3 + v; const total = 8 + v; const draw = 3 + (index % 3);
      prompt = `${scenario}: In a sample, ${success} of ${total} items meet a quality standard. If an item is selected at random from the sample, what is the probability that it meets the standard?`;
      const value = success / total;
      choices = [(value - 0.1).toFixed(2), value.toFixed(2), (value + 0.1).toFixed(2), (value + 0.2).toFixed(2)]; correct = 1;
      skill = 'Probability and conditional probability'; domain = 'problem-solving-and-data-analysis'; explanation = `The probability is favorable outcomes divided by total outcomes: ${success}/${total} ≈ ${value.toFixed(2)}.`; break;
    }
    case 13: {
      const slope = 1 + (v % 4); const intercept = 7 + index; const x = 3 + v; const y = slope * x + intercept;
      prompt = `${scenario}: A scatterplot has a line of best fit represented by y = ${slope}x + ${intercept}. What y-value does the model predict when x = ${x}?`;
      choices = [`${y - 2}`, `${y - 1}`, `${y}`, `${y + 2}`]; correct = 2;
      skill = 'Two-variable data: models and scatterplots'; domain = 'problem-solving-and-data-analysis'; calculatorRequired = true; explanation = `Substituting x = ${x} gives y = ${slope}(${x}) + ${intercept} = ${y}.`; break;
    }
    case 14: {
      const radius = 3 + v; const diameter = 2 * radius; const circumference = 2 * 3.14 * radius;
      prompt = `${scenario}: A circular sensor has diameter ${diameter} centimeters. Using π = 3.14, what is its circumference to the nearest tenth of a centimeter?`;
      choices = [`${(circumference - 1).toFixed(1)}`, `${circumference.toFixed(1)}`, `${(circumference + 1).toFixed(1)}`, `${(circumference + 2).toFixed(1)}`]; correct = 1;
      skill = 'Circles'; domain = 'geometry-and-trigonometry'; calculatorRequired = true; explanation = `Circumference = πd = 3.14 × ${diameter} ≈ ${circumference.toFixed(1)}.`; break;
    }
    case 15: {
      const legs = [3 + v, 4 + v]; const hyp = Math.sqrt(legs[0] ** 2 + legs[1] ** 2);
      const rounded = Number(hyp.toFixed(1));
      prompt = `${scenario}: A right-triangle cross-section has legs ${legs[0]} and ${legs[1]} units. What is the length of the hypotenuse, to the nearest tenth?`;
      choices = [(rounded - 1.0).toFixed(1), (rounded - 0.5).toFixed(1), rounded.toFixed(1), (rounded + 0.7).toFixed(1)]; correct = 2;
      skill = 'Right triangles'; domain = 'geometry-and-trigonometry'; calculatorRequired = true; explanation = `Use the Pythagorean theorem: c² = ${legs[0]}² + ${legs[1]}².`; break;
    }
    case 16: {
      const baseLen = 6 + v; const height = 9 + (index % 5); const area = 0.5 * baseLen * height;
      prompt = `${scenario}: A triangular panel has base ${baseLen} meters and height ${height} meters. What is its area?`;
      choices = [`${area - 4}`, `${area - 2}`, `${area}`, `${area + 4}`]; correct = 2;
      skill = 'Area and volume'; domain = 'geometry-and-trigonometry'; explanation = `Triangle area = 1/2 × base × height = ${area}.`; break;
    }
    case 17: {
      const x = 4 + v; const expr = 3 * x + 5; const scale = 2 + (v % 2); const answer = 3 * (scale * x) + 5;
      prompt = `${scenario}: A function is defined by f(x) = 3x + 5. A new input is ${scale} times the original input x = ${x}. What is f(${scale}x)?`;
      choices = [`${answer - 6}`, `${answer - 3}`, `${answer}`, `${answer + 6}`]; correct = 2;
      skill = 'Functions'; domain = 'advanced-math'; explanation = `The new input is ${scale * x}; substituting gives ${answer}.`; break;
    }
    case 18: {
      const p = 2 + v; const q = 5 + v; const r = 3 + v; const answer = p * (q + r);
      prompt = `${scenario}: An expression is given by ${p}(x + ${q}) = ${r} + ${p}x + __. Which expression fills the blank?`;
      choices = [`${p * q - 1}`, `${p * q}`, `${p * q + 1}`, `${p * q + p}`]; correct = 2;
      skill = 'Equivalent expressions'; domain = 'advanced-math'; explanation = `Distributing ${p} across x + ${q} adds the constant ${p * q}; accounting for the existing r leaves the stated blank.`; break;
    }
    case 19: {
      const p = 4 + v; const q = 9 + v; const answer = p + q;
      prompt = `${scenario}: Two positive quantities have sum ${answer}. One quantity is ${p}. What is the other quantity?`;
      choices = [`${q - 2}`, `${q - 1}`, `${q}`, `${q + 2}`]; correct = 2;
      skill = 'Linear equations in one variable'; explanation = `Subtract ${p} from the total ${answer} to obtain ${q}.`; break;
    }
    case 20: {
      const numerator = 5 + v; const denominator = 2 + (index % 3); const add = 3 + v;
      const answer = `${numerator + add}/${denominator}`;
      prompt = `${scenario}: For a nonzero value of x, which expression is equivalent to (${numerator}x + ${add}x)/${denominator}?`;
      choices = [`${numerator}/${denominator}`, `${numerator + add}/${denominator}`, `${numerator + add}/${denominator + 1}`, `${numerator + add + 1}/${denominator}`]; correct = 1;
      skill = 'Equivalent expressions'; domain = 'advanced-math'; explanation = `Combine like terms in the numerator: (${numerator}+${add})x, then divide by ${denominator}.`; break;
    }
    default: {
      const m = 3 + v; const b0 = 2 + index; const x = 4 + v; const answer = m * x + b0;
      prompt = `${scenario}: A linear model is y = ${m}x + ${b0}. What is y when x = ${x}?`;
      choices = [`${answer - 3}`, `${answer - 1}`, `${answer}`, `${answer + 2}`]; correct = 2;
      skill = 'Linear equations in one variable'; explanation = `Substitute x = ${x}: y = ${m}(${x}) + ${b0} = ${answer}.`;
    }
  }

  const shifted = mathChoice(choices, correct);
  return base(id, testId, variant, 'math', module, domain, skill, prompt, shifted.choices, shifted.answer, explanation, {
    adaptiveRoute: route || null,
    questionType,
    calculatorRequired,
    calculatorMode: calculatorRequired ? 'required' : 'allowed',
    referenceSheetRelevant: domain === 'geometry-and-trigonometry',
    contextKey: `${variant}-math-${globalIndex}`,
    contextFamily: scenario,
    stimulusType: 'application'
  });
}

export function buildReadingWriting({ testId, variant, module }) {
  const isModule2 = module === 'rw-module-2';
  const count = isModule2 ? 81 : 27;
  const globalOffset = variant === 'psat-nmsqt' ? 0 : 1000;
  return Array.from({ length: count }, (_, j) => {
    const localIndex = j;
    const topicIndex = (globalOffset + (isModule2 ? 27 + j : j)) % VERBAL_TOPICS.length;
    const route = isModule2 ? ['high', 'standard', 'low'][Math.floor(j / 27)] : null;
    return verbalQuestion({ index: globalOffset + (isModule2 ? 27 + j : j), testId, variant, module, route, topicIndex });
  });
}

export function buildMath({ testId, variant, module }) {
  const isModule2 = module === 'math-module-2';
  const count = isModule2 ? 66 : 22;
  const globalOffset = variant === 'psat-nmsqt' ? 0 : 1000;
  return Array.from({ length: count }, (_, j) => {
    const absolute = globalOffset + (isModule2 ? 22 + j : j);
    const route = isModule2 ? ['high', 'standard', 'low'][Math.floor(j / 22)] : null;
    return mathQuestion({ index: j, testId, variant, module, route, globalIndex: absolute });
  });
}

export const buildMock = ({ testId, variant, section, module }) => (
  section === 'reading-writing'
    ? buildReadingWriting({ testId, variant, module })
    : buildMath({ testId, variant, module })
);
