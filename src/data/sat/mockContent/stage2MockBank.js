const FIG = {
  line: (m, b) => ({ type: 'line', x: [0, 1, 2, 3, 4], y: [b, b + m, b + 2 * m, b + 3 * m, b + 4 * m] }),
  scatter: (seed) => ({ type: 'scatter', points: Array.from({ length: 6 }, (_, i) => [i + 1, 6 + ((i * (seed % 7 + 2) + seed) % 13)]) }),
  quadratic: (a, c) => ({ type: 'quadratic', a, b: -2 * a, c }),
  geometry: (shape, values) => ({ type: 'geometry', shape, values }),
};

const PSAT_CONTEXTS = [
  ['urban ecology', 'Researchers compare rooftop gardens with reflective roofs across several city blocks. Both reduce afternoon heat, but the garden effect is larger where surrounding buildings provide less shade.'],
  ['marine biology', 'Marine biologists compare two methods for restoring eelgrass beds. One produces faster initial coverage, while the other has higher survival after seasonal storms.'],
  ['archival science', 'Archivists compare two digitization priorities. A method based on age selects older records, while a combined method also considers handling frequency and physical fragility.'],
  ['linguistics', 'Linguists compare speech recordings from neighborhoods with different age distributions. A newer pronunciation is common among younger speakers but remains uncommon among older speakers.'],
  ['materials science', 'Materials researchers compare two coatings for protecting pigments from light. Both slow fading, but the difference between them is smaller for pigments with high initial saturation.'],
  ['transportation', 'A transit agency compares two station layouts. The revised layout reduces typical transfer time, with the largest improvement occurring during periods of heavy passenger volume.'],
  ['agriculture', 'Agronomists compare two planting schedules across small plots. The later schedule has a slightly lower average yield but less variation from plot to plot.'],
  ['conservation', 'Conservators compare two repair materials for historic paper. Both improve handling strength, but one can be removed more readily during later conservation work.'],
  ['astronomy', 'Astronomers compare two sensor calibrations. Both preserve the same long-term pattern, but one produces a larger reading under conditions of high humidity.'],
  ['public health', 'Researchers compare air-quality readings from sensors placed at different heights. Differences between heights are largest during cooking periods and smaller during background monitoring.'],
  ['geology', 'Geologists compare mineral signatures from sediment collected above and below a watershed boundary. Several minerals overlap, but one distinctive trace narrows the likely source area.'],
  ['climate science', 'Climate scientists compare short and long temperature records. Short records react more strongly to unusual events, while long records reveal recurring seasonal structure more clearly.'],
  ['forest ecology', 'Foresters compare first-year and third-year survival of newly planted trees. Some sites with strong first-year survival experience substantially larger losses by the third year.'],
  ['restoration ecology', 'Ecologists compare restoration indicators over time. Plant cover changes quickly, while species composition changes more slowly and better reflects longer-term recovery.'],
  ['cultural heritage', 'Curators use shared metadata to connect objects from separate collections. The new links reveal relationships that were difficult to identify when records were stored independently.'],
  ['engineering', 'Engineers compare vibration readings from a bridge under different loads. One frequency rises with heavier loads and disappears when the bridge is unloaded.'],
  ['demography', 'Demographers compare two methods for estimating a missing census year. One assumes a smooth trend, while the other uses neighboring records and produces a wider uncertainty range.'],
  ['botany', 'Botanists track seedling emergence after rainfall. Early rainfall improves emergence only when a later cool period preserves soil moisture.'],
  ['psychology', 'Researchers study attention near public art. Attention rises near installations positioned along routes where pedestrians spend more time.'],
  ['energy systems', 'Analysts compare two energy-demand forecasts. One responds more quickly to sudden changes, while the other produces smoother long-term projections.'],
  ['archaeology', 'Archaeologists compare pottery fragments from inland and coastal sites. Material composition suggests exchange, but the geographic pattern does not identify a single route.'],
  ['oceanography', 'Oceanographers compare two sampling nets. The finer net captures more small particles but is more sensitive to changes in towing speed.'],
  ['soil science', 'Researchers measure soil carbon at several depths. Deeper samples vary less among sites, while surface samples respond more strongly to recent vegetation changes.'],
  ['museum acoustics', 'Curators test sound levels in a gallery. A directional speaker reduces sound outside the intended exhibit without reducing measured volume at the listening point.'],
  ['wildlife management', 'Ecologists compare movement through two wildlife corridors. The wider corridor supports more movement overall, while the narrow corridor performs similarly where surrounding habitat is continuous.'],
  ['dune ecology', 'Field teams compare planted and naturally recovering dunes. Planting stabilizes sand sooner, while naturally recovering dunes develop greater plant diversity after several years.'],
  ['pollination', 'Biologists compare pollinator abundance with fruit production. More pollinators generally correspond to higher fruit production, but the relationship weakens when flowers are unusually sparse.'],
  ['water resources', 'Researchers compare two reservoir forecasting methods. Both follow seasonal demand, but one performs better during unusually dry weeks.'],
  ['urban planning', 'Planners compare reported travel choices with observed travel patterns. Students report choosing buses more often than observations suggest.'],
  ['mineral chemistry', 'Geochemists compare trace elements in glacier sediment. Several potential sources overlap, but one trace element is much more common near a particular source.'],
  ['plant diversity', 'Ecologists measure total plant diversity and dominance by a target species. A restoration treatment increases the target species without increasing total diversity.'],
  ['textile conservation', 'Materials scientists expose dyed textiles to two light levels. Higher exposure causes faster fading, but some dyes show little difference between the conditions.'],
  ['sound design', 'Acoustics researchers compare two room treatments. One reduces reflected sound more effectively, while the other preserves a similar measured level at the listening position.'],
  ['remote sensing', 'Remote-sensing researchers compare measurements from two seasons. After recalibration, the seasonal difference shrinks while the geographic pattern remains.'],
  ['coastal science', 'Coastal scientists compare two shoreline stabilization methods. One reduces short-term erosion more strongly, while the other permits greater habitat recovery over time.'],
  ['data curation', 'Data curators compare two ways to prioritize records for preservation. One uses frequency of access, while the other combines access with file fragility and replacement difficulty.'],
];

const SAT_CONTEXTS = PSAT_CONTEXTS.map(([topic, text], i) => [topic, `${text} In a separate analysis, the researchers also compared the pattern across ${34 + i} observation units and found that the main relationship remained visible after accounting for local conditions.`]);

const RW_SKILLS = [
  ['information-and-ideas', 'Central Ideas and Details', (text) => ({ q: `${text}\n\nWhich choice best states the central idea of the passage?`, c: ['The comparison reveals a pattern whose size depends on conditions.', 'The evidence proves that one factor determines every result.', 'The results show that every setting responds identically.', 'The study makes all earlier measurements unnecessary.'], e: 'The correct choice states the principal finding while preserving the qualification described in the passage.' })],
  ['information-and-ideas', 'Inferences', (text) => ({ q: `${text}\n\nWhich inference is best supported by the passage?`, c: ['The observed relationship may change when relevant conditions change.', 'The observed relationship must remain unchanged in every setting.', 'The evidence establishes one certain cause for the observed result.', 'The comparison found no meaningful difference among conditions.'], e: 'The passage describes a relationship that depends on conditions, supporting the qualified inference.' })],
  ['information-and-ideas', 'Command of Evidence', (text) => ({ q: `${text}\n\nWhich finding would best support the interpretation presented in the passage?`, c: ['The measured pattern remains visible after the relevant comparison is controlled.', 'Researchers collected observations at several locations.', 'Researchers recorded several measurements during the study.', 'The project followed earlier work on a related question.'], e: 'The first choice directly supports the interpretation rather than merely describing the study.' })],
  ['craft-and-structure', 'Words in Context', (text) => ({ q: `${text}\n\nAs used in the passage, which choice most nearly means “preserve”?`, c: ['maintain', 'replace', 'measure', 'separate'], e: 'In this context, preserve means to maintain or keep something in its existing state.' })],
  ['craft-and-structure', 'Text Structure and Purpose', (text) => ({ q: `${text}\n\nWhy does the author mention the condition that changes the strength of the initial pattern?`, c: ['To qualify the initial pattern by identifying an important condition.', 'To replace the initial pattern with an unrelated explanation.', 'To provide background that has no effect on the conclusion.', 'To repeat the initial pattern without changing its meaning.'], e: 'The added condition limits how broadly the initial finding should be interpreted.' })],
  ['craft-and-structure', 'Cross-Text Connections', (text) => ({ q: `${text}\n\nA researcher studying a different setting would most likely agree that the finding`, c: ['is informative but should be interpreted in light of local conditions.', 'is conclusive because the same pattern must occur everywhere.', 'is unimportant because local conditions always change results.', 'is useful only when researchers use a single measurement.'], e: 'The evidence supports a useful finding while recognizing conditions that affect interpretation.' })],
  ['expression-of-ideas', 'Rhetorical Synthesis', (text) => ({ q: `${text}\n\nWhich choice most effectively emphasizes the important result described in the passage?`, c: ['The comparison reveals a measurable effect, although its size depends on conditions.', 'The researchers collected measurements and compared them across the study.', 'The study examined several conditions and recorded the results.', 'The project involved researchers working with a defined set of observations.'], e: 'The first choice foregrounds the result and its qualification.' })],
  ['expression-of-ideas', 'Transitions', (text) => ({ q: `${text}\n\nThe researchers observed a strong pattern in one setting. _____, they did not conclude that the pattern would occur everywhere.`, c: ['For this reason', 'For example', 'In contrast', 'In addition'], e: 'For this reason expresses the logical consequence of the preceding observation.' })],
  ['standard-english-conventions', 'Boundaries', (text) => ({ q: `${text}\n\nThe revised method produced a clearer signal _____ it required additional calibration.`, c: ['; however,', '; therefore,', '; for example,', '; similarly,'], e: 'A semicolon separates the independent clauses, and however correctly signals contrast.' })],
  ['standard-english-conventions', 'Form, Structure, and Sense', (text) => ({ q: `${text}\n\nThe set of measurements, rather than the individual readings, _____ the basis for comparison.`, c: ['provides', 'provide', 'providing', 'have provided'], e: 'The singular subject set takes the singular verb provides.' })],
  ['information-and-ideas', 'Central Ideas and Details', (text) => ({ q: `${text}\n\nWhy do the researchers compare more than one condition?`, c: ['To determine whether the pattern persists beyond one condition.', 'To guarantee that the pattern has only one explanation.', 'To replace measurements with a theoretical description.', 'To show that every condition produces the same result.'], e: 'Comparing conditions helps determine whether the observed pattern persists.' })],
  ['information-and-ideas', 'Inferences', (text) => ({ q: `${text}\n\nWhich statement best describes the limitation identified in the passage?`, c: ['It prevents an overly broad interpretation of the observed pattern.', 'It introduces a topic unrelated to the investigation.', 'It confirms that every earlier measurement was incorrect.', 'It shows that earlier observations are no longer useful.'], e: 'The final qualification limits how broadly the result should be generalized.' })],
];

function rotate(choices, target) {
  const out = [...choices];
  const first = out.shift();
  out.splice(target, 0, first);
  return { choices: out, answer: String.fromCharCode(65 + target) };
}

function makeBase({ id, testId, variant, section, module, route, domain, skill, prompt, choices, answer, explanation, figure, i, questionType = 'multiple-choice' }) {
  return {
    contentId: id,
    version: 1,
    product: 'sat',
    questionId: id,
    testId,
    assessmentFamily: variant === 'psat-nmsqt' ? 'psat' : 'sat',
    assessmentVariant: variant,
    assessmentNumber: 2,
    section,
    module,
    domain,
    skill,
    subskill: skill,
    conceptId: `${domain}-${skill.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    difficulty: i % 3 === 0 ? 'hard' : i % 3 === 1 ? 'medium' : 'easy',
    difficultyBand: `mock-${variant === 'psat-nmsqt' ? 'psat' : 'sat'}-${route || 'module-1'}-${i % 3}`,
    cognitiveDemand: section === 'reading-writing' && i % 6 === 0 ? 'synthesize' : 'analyze',
    questionType,
    stimulusType: figure?.type || 'short-passage',
    interactionType: questionType === 'student-produced-response' ? 'student-produced-response' : 'single-select',
    timingMode: 'timed',
    estimatedTimeSeconds: section === 'reading-writing' ? 71 : 95,
    calculatorEligibility: section === 'math',
    calculatorMode: section === 'math' ? 'either' : 'none',
    calculatorRequired: false,
    referenceSheetRelevant: section === 'math',
    prompt,
    choices: choices || [],
    answer,
    explanation,
    figure: figure || null,
    isOperational: true,
    adaptiveRoute: route || null,
    originalityFingerprint: `${variant}-${id}`,
    conceptFingerprint: `${domain}-${skill}-${i}`,
    tags: [variant, 'mock-02', 'apriori-original'],
    lessonIds: [],
    sourceType: 'apriori-original',
    authoringStatus: 'qc-approved',
    status: 'assembly-ready',
    releaseEligibility: true,
    metadata: {
      contextKey: `${variant}-mock02-${id}`,
      contextFamily: `${variant}-mock02-context-${i}`,
      applicationFingerprint: `${variant}-mock02-${domain}-${i}`,
      answerFormat: questionType === 'student-produced-response' ? 'numeric' : 'A-D',
      figurePurpose: figure ? 'question-essential' : null,
    },
  };
}

function buildRW({ testId, variant, i, module, route, contexts }) {
  const contextIndex = i % contexts.length;
  const context = contexts[contextIndex];
  const [domain, skill, make] = RW_SKILLS[i % RW_SKILLS.length];
  const item = make(`${context[1]} The analysis focused on ${context[0]} and compared the result across a deliberately varied set of conditions.`);
  const rotated = rotate(item.c, i % 4);
  return makeBase({
    id: `${testId}-rw-${String(i + 1).padStart(3, '0')}`,
    testId,
    variant,
    section: 'reading-writing',
    module,
    route,
    domain,
    skill,
    prompt: `${item.q}\nThe researchers repeated the comparison using ${18 + ((i * 7) % 29)} observations to test whether the pattern persisted.`,
    choices: rotated.choices,
    answer: rotated.answer,
    explanation: item.e,
    i,
  });
}

function mathItem(domain, i, seed) {
  const s = seed + i * 3;
  if (domain === 'Algebra') {
    const m = 2 + (s % 7);
    const b = 9 + (s % 13);
    const x = 2 + (s % 6);
    const y = m * x + b;
    return { q: `A linear model is y = ${m}x + ${b}. What is y when x = ${x}?`, a: y, e: 'Substitute the given x-value into the linear equation.', figure: i % 2 === 0 ? FIG.line(m, b) : null };
  }
  if (domain === 'Advanced Math') {
    const a = 1 + (s % 4);
    const r1 = 2 + (s % 6);
    const r2 = 7 + (s % 7);
    return { q: `A quadratic equation has leading coefficient ${a} and roots ${r1} and ${r2}. What is the coefficient of x?`, a: -(r1 + r2) * a, e: 'For ax² + bx + c, the sum of the roots equals -b/a.', figure: i % 2 === 0 ? FIG.quadratic(a, r1 * r2) : null };
  }
  if (domain === 'Problem-Solving and Data Analysis') {
    const n = 5 + (s % 7);
    const mean = 18 + (s % 11);
    const added = mean + 6 + (s % 9);
    const answer = Number(((mean * n + added) / (n + 1)).toFixed(2));
    return { q: `A data set contains ${n} values with a mean of ${mean}. If ${added} is added, what is the new mean?`, a: answer, e: 'Find the original total, add the new value, then divide by the new number of values.', figure: i % 2 === 0 ? FIG.scatter(s) : null };
  }
  const base = 6 + (s % 8);
  const height = 4 + (s % 7);
  return { q: `A triangle has a base of ${base} units and a height of ${height} units. What is its area?`, a: (base * height) / 2, e: 'Use one-half times base times height.', figure: i % 2 === 0 ? FIG.geometry('triangle', { base, height }) : null };
}

function buildMath({ testId, variant, i, module, route, seed }) {
  const domains = ['Algebra', 'Advanced Math', 'Problem-Solving and Data Analysis', 'Geometry and Trigonometry'];
  const domain = domains[i % domains.length];
  const item = mathItem(domain, i, seed);
  const isSPR = i % 4 === 3;
  if (isSPR) {
    return makeBase({
      id: `${testId}-math-${String(i + 1).padStart(3, '0')}`,
      testId,
      variant,
      section: 'math',
      module,
      route,
      domain,
      skill: domain === 'Algebra' ? 'Linear Equations' : domain === 'Advanced Math' ? 'Nonlinear Equations' : domain === 'Problem-Solving and Data Analysis' ? 'Data Analysis' : 'Area and Volume',
      prompt: `${item.q}\nEnter your answer as a number.`,
      choices: [],
      answer: item.a,
      explanation: item.e,
      figure: item.figure,
      i,
      questionType: 'student-produced-response',
    });
  }
  const distractors = [item.a + 1, item.a - 1, typeof item.a === 'number' ? item.a * 2 : `${item.a} with a different scale`];
  const choices = [String(item.a), String(distractors[0]), String(distractors[1]), String(distractors[2])];
  const rotated = rotate(choices, i % 4);
  return makeBase({
    id: `${testId}-math-${String(i + 1).padStart(3, '0')}`,
    testId,
    variant,
    section: 'math',
    module,
    route,
    domain,
    skill: domain === 'Algebra' ? 'Linear Equations' : domain === 'Advanced Math' ? 'Nonlinear Equations' : domain === 'Problem-Solving and Data Analysis' ? 'Data Analysis' : 'Area and Volume',
    prompt: item.q,
    choices: rotated.choices,
    answer: rotated.answer,
    explanation: item.e,
    figure: item.figure,
    i,
  });
}

function buildMock({ testId, variant, seed, contexts }) {
  const readingWriting = [];
  const math = [];
  for (let i = 0; i < 27; i += 1) readingWriting.push(buildRW({ testId, variant, i, module: 'rw-module-1', contexts }));
  for (const route of ['high', 'standard', 'low']) {
    for (let i = 0; i < 27; i += 1) {
      const globalIndex = 27 + (route === 'high' ? 0 : route === 'standard' ? 27 : 54) + i;
      readingWriting.push(buildRW({ testId, variant, i: globalIndex, module: 'rw-module-2', route, contexts }));
    }
  }
  for (let i = 0; i < 22; i += 1) math.push(buildMath({ testId, variant, i, module: 'math-module-1', seed }));
  for (const route of ['high', 'standard', 'low']) {
    for (let i = 0; i < 22; i += 1) {
      const globalIndex = 22 + (route === 'high' ? 0 : route === 'standard' ? 22 : 44) + i;
      math.push(buildMath({ testId, variant, i: globalIndex, module: 'math-module-2', route, seed }));
    }
  }
  return { testId, readingWriting, math };
}

export const PSAT_MOCK_02_CONTENT = buildMock({
  testId: 'PSAT2',
  variant: 'psat-nmsqt',
  seed: 23,
  contexts: PSAT_CONTEXTS,
});

export const SAT_MOCK_02_CONTENT = buildMock({
  testId: 'SAT2',
  variant: 'sat-series-a',
  seed: 47,
  contexts: SAT_CONTEXTS,
});

export const SAT_PSAT_STAGE_2_MOCKS = [PSAT_MOCK_02_CONTENT, SAT_MOCK_02_CONTENT];
export default SAT_PSAT_STAGE_2_MOCKS;
