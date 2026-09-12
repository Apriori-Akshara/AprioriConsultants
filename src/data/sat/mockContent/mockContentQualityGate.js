const normalize = (value) => String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
const wordCount = (value) => normalize(value).split(/\s+/).filter(Boolean).length;
const HARD_FEATURES = new Set(['multi-step','representation-shift','non-routine-modeling','distractor-trap','parameter-reasoning','data-interpretation','strategic-choice','constraint-inference']);
const LEVEL_SCORE = { easy: 1, medium: 2, hard: 3 };
const LONG_FORM_R_W_SKILLS = new Set(['Central Ideas and Details','Inferences','Command of Evidence','Text Structure and Purpose','Cross-Text Connections','Rhetorical Synthesis']);
const MATH_DOMAINS = ['Algebra','Advanced Math','Problem-Solving and Data Analysis','Geometry and Trigonometry'];

function expectedDomainCounts(mock) {
  const isPsat = mock.assessmentVariant === 'psat-nmsqt';
  return {
    algebra: isPsat ? [13, 15] : [13, 15],
    advanced: isPsat ? [12, 15] : [13, 15],
    psda: isPsat ? [7, 9] : [5, 7],
    geometry: isPsat ? [4, 6] : [5, 7],
  };
}

function validateMathBlueprint(mock, errors) {
  const math = (mock.math || []);
  const rules = expectedDomainCounts(mock);
  const modules = {
    module1: math.filter((q) => q.module === 'math-module-1'),
    high: math.filter((q) => q.module === 'math-module-2' && q.adaptiveRoute === 'high'),
    standard: math.filter((q) => q.module === 'math-module-2' && q.adaptiveRoute === 'standard'),
    low: math.filter((q) => q.module === 'math-module-2' && q.adaptiveRoute === 'low'),
  };
  for (const [label, items] of Object.entries(modules)) {
    const seen = new Set(items.map((q) => q.domain));
    for (const domain of MATH_DOMAINS) if (!seen.has(domain)) errors.push(`${mock.testId}: Math ${label} is missing ${domain}`);
  }

  for (const [route, items] of Object.entries({ high: modules.high, standard: modules.standard, low: modules.low })) {
    const m1 = modules.module1;
    const combined = [...m1, ...items];
    const counts = {
      algebra: combined.filter((q) => q.domain === 'Algebra').length,
      advanced: combined.filter((q) => q.domain === 'Advanced Math').length,
      psda: combined.filter((q) => q.domain === 'Problem-Solving and Data Analysis').length,
      geometry: combined.filter((q) => q.domain === 'Geometry and Trigonometry').length,
    };
    for (const [key, [min, max]] of Object.entries(rules)) {
      if (counts[key] < min || counts[key] > max) errors.push(`${mock.testId}: ${route} route Math ${key} count ${counts[key]} is outside ${min}-${max}`);
    }
  }

  const profile = (items) => ({
    easy: items.filter((q) => q.difficulty === 'easy').length,
    medium: items.filter((q) => q.difficulty === 'medium').length,
    hard: items.filter((q) => q.difficulty === 'hard').length,
  });
  const countRules = {
    module1: { easy: [4,8], medium: [7,10], hard: [4,8] },
    high: { easy: [0,4], medium: [6,10], hard: [9,14] },
    standard: { easy: [3,7], medium: [7,11], hard: [5,9] },
    low: { easy: [6,10], medium: [8,12], hard: [2,6] },
  };
  for (const [label, items] of Object.entries(modules)) {
    const counts = profile(items);
    for (const [level, [min, max]] of Object.entries(countRules[label])) {
      if (counts[level] < min || counts[level] > max) errors.push(`${mock.testId}: Math ${label} ${level} count ${counts[level]} is outside ${min}-${max}`);
    }
    for (const question of items.filter((q) => q.difficulty === 'hard')) {
      const features = new Set(question.metadata?.difficultyFeatures || []);
      if ([...features].filter((feature) => HARD_FEATURES.has(feature)).length < 2) errors.push(`${mock.testId}: hard Math item lacks two approved difficulty features ${question.questionId}`);
      if (!['analyze','synthesize'].includes(question.cognitiveDemand)) errors.push(`${mock.testId}: hard Math item must use analyze/synthesize ${question.questionId}`);
    }
  }

  const average = (items) => items.reduce((sum, q) => sum + (LEVEL_SCORE[q.difficulty] || 0), 0) / Math.max(items.length, 1);
  const scores = { high: average(modules.high), standard: average(modules.standard), low: average(modules.low) };
  if (!(scores.high > scores.standard && scores.standard > scores.low)) errors.push(`${mock.testId}: adaptive Math difficulty must satisfy High > Standard > Low`);

  const hardShare = math.filter((q) => q.difficulty === 'hard').length / Math.max(math.length, 1);
  if (hardShare < 0.30) errors.push(`${mock.testId}: Math bank hard share ${Math.round(hardShare * 100)}% is below the 30% internal floor`);
}

function validateOne(mockContent) {
  const errors = [];
  const records = [...(mockContent.readingWriting || []), ...(mockContent.math || [])];
  const ids = new Set(); const prompts = new Set(); const verbalContexts = new Set(); const answerPositions = { A:0, B:0, C:0, D:0 };
  if (records.length !== 196) errors.push(`${mockContent.testId}: expected 196 bank questions, found ${records.length}`);

  for (const question of records) {
    if (ids.has(question.questionId)) errors.push(`${mockContent.testId}: duplicate questionId ${question.questionId}`);
    ids.add(question.questionId);
    const normalizedPrompt = normalize(question.prompt);
    if (prompts.has(normalizedPrompt)) errors.push(`${mockContent.testId}: duplicate prompt ${question.questionId}`);
    prompts.add(normalizedPrompt);
    if (!question.answer) errors.push(`${mockContent.testId}: missing answer ${question.questionId}`);
    if (!question.explanation) errors.push(`${mockContent.testId}: missing explanation ${question.questionId}`);

    if (question.section === 'reading-writing') {
      const context = normalize(question.metadata?.contextKey);
      if (!context) errors.push(`${mockContent.testId}: missing verbal context key ${question.questionId}`);
      if (verbalContexts.has(context)) errors.push(`${mockContent.testId}: repeated verbal context ${context}`);
      verbalContexts.add(context);
    }

    if (question.questionType === 'multiple-choice') {
      if (!Array.isArray(question.choices) || question.choices.length !== 4) errors.push(`${mockContent.testId}: four choices required ${question.questionId}`);
      else {
        const lengths = question.choices.map(wordCount);
        if (Math.max(...lengths) - Math.min(...lengths) > 6) errors.push(`${mockContent.testId}: answer-length imbalance ${question.questionId}`);
        if (question.section === 'reading-writing' && LONG_FORM_R_W_SKILLS.has(question.skill)) {
          const correctIndex = String(question.answer).charCodeAt(0) - 65;
          const correctWords = lengths[correctIndex];
          const otherLengths = lengths.filter((_, index) => index !== correctIndex);
          if (correctWords > Math.max(...otherLengths) || correctWords < Math.min(...otherLengths)) errors.push(`${mockContent.testId}: correct verbal choice has a unique length clue ${question.questionId}`);
        }
      }
      if (answerPositions[question.answer] !== undefined) answerPositions[question.answer] += 1;
    } else if (question.questionType === 'student-produced-response') {
      if (Array.isArray(question.choices) && question.choices.length !== 0) errors.push(`${mockContent.testId}: SPR item must not expose choices ${question.questionId}`);
      if (question.metadata?.answerFormat !== 'numeric') errors.push(`${mockContent.testId}: SPR item must use numeric answer format ${question.questionId}`);
    }
  }

  const rw1 = records.filter((q) => q.section === 'reading-writing' && q.module === 'rw-module-1');
  const rw2 = records.filter((q) => q.section === 'reading-writing' && q.module === 'rw-module-2');
  const math1 = records.filter((q) => q.section === 'math' && q.module === 'math-module-1');
  const math2 = records.filter((q) => q.section === 'math' && q.module === 'math-module-2');
  if (rw1.length !== 27) errors.push(`${mockContent.testId}: R&W Module 1 must contain 27 questions`);
  if (rw2.length !== 81) errors.push(`${mockContent.testId}: R&W Module 2 pool must contain 81 questions`);
  if (math1.length !== 22) errors.push(`${mockContent.testId}: Math Module 1 must contain 22 questions`);
  if (math2.length !== 66) errors.push(`${mockContent.testId}: Math Module 2 pool must contain 66 questions`);
  for (const route of ['high','standard','low']) {
    if (rw2.filter((q) => q.adaptiveRoute === route).length !== 27) errors.push(`${mockContent.testId}: R&W ${route} route must contain 27 questions`);
    if (math2.filter((q) => q.adaptiveRoute === route).length !== 22) errors.push(`${mockContent.testId}: Math ${route} route must contain 22 questions`);
  }

  const mcqValues = Object.values(answerPositions);
  if (Math.max(...mcqValues) - Math.min(...mcqValues) > 2) errors.push(`${mockContent.testId}: answer-key positions are not sufficiently balanced across A-D`);
  validateMathBlueprint(mockContent, errors);
  if (errors.length) throw new Error(`SAT/PSAT mock content quality gate failed:\n${errors.join('\n')}`);
  return { ok: true, questionCount: records.length };
}

export function validateMockContent(mockContent) { return validateOne(mockContent); }

export function validateMockSeries(...mocks) {
  const results = mocks.map(validateOne); const errors = []; const all = mocks.flatMap((mock) => [...(mock.readingWriting || []), ...(mock.math || [])]);
  const promptMap = new Map(); const verbalContextMap = new Map(); const mathApplicationMap = new Map(); const questionIdMap = new Map();
  for (const question of all) {
    const previousId = questionIdMap.get(question.questionId);
    if (previousId) errors.push(`Duplicate question ID across mock series: ${previousId.questionId} and ${question.questionId}`); else questionIdMap.set(question.questionId, question);
    const normalizedPrompt = normalize(question.prompt); const previousPrompt = promptMap.get(normalizedPrompt);
    if (previousPrompt && previousPrompt.testId !== question.testId) errors.push(`Cross-mock duplicate prompt: ${previousPrompt.questionId} and ${question.questionId}`); else promptMap.set(normalizedPrompt, question);
    if (question.section === 'reading-writing') {
      const context = normalize(question.metadata?.contextKey); const previousContext = verbalContextMap.get(context);
      if (previousContext && previousContext.testId !== question.testId) errors.push(`Cross-mock repeated verbal context: ${previousContext.questionId} and ${question.questionId}`); else verbalContextMap.set(context, question);
    }
    if (question.section === 'math') {
      const fingerprint = normalize(question.metadata?.applicationFingerprint); const previousApplication = mathApplicationMap.get(fingerprint);
      if (previousApplication && previousApplication.testId !== question.testId) errors.push(`Cross-mock repeated Math application: ${previousApplication.questionId} and ${question.questionId}`); else mathApplicationMap.set(fingerprint, question);
    }
  }
  if (errors.length) throw new Error(`SAT/PSAT mock series quality gate failed:\n${errors.join('\n')}`);
  return { ok: true, questionCount: results.reduce((sum, result) => sum + result.questionCount, 0) };
}

export function validateMockPair(psatMock, satMock) { return validateMockSeries(psatMock, satMock); }
export default validateMockContent;
