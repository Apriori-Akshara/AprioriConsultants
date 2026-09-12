const normalize = (value) => String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
const wordCount = (value) => normalize(value).split(/\s+/).filter(Boolean).length;

const LONG_FORM_R_W_SKILLS = new Set([
  'Central Ideas and Details',
  'Inferences',
  'Command of Evidence',
  'Text Structure and Purpose',
  'Cross-Text Connections',
  'Rhetorical Synthesis',
]);

const HARD_FEATURES = new Set([
  'multi-step',
  'representation-shift',
  'non-routine-modeling',
  'distractor-trap',
  'parameter-reasoning',
  'data-interpretation',
  'strategic-choice',
  'constraint-inference',
]);

const DIFFICULTY_SCORE = { easy: 1, medium: 2, hard: 3 };

function validateMathDifficulty(mockContent, errors) {
  const math = (mockContent.math || []);
  const modules = {
    'math-module-1': math.filter((q) => q.module === 'math-module-1'),
    high: math.filter((q) => q.module === 'math-module-2' && q.adaptiveRoute === 'high'),
    standard: math.filter((q) => q.module === 'math-module-2' && q.adaptiveRoute === 'standard'),
    low: math.filter((q) => q.module === 'math-module-2' && q.adaptiveRoute === 'low'),
  };

  const profile = (items) => ({
    easy: items.filter((q) => q.difficulty === 'easy').length,
    medium: items.filter((q) => q.difficulty === 'medium').length,
    hard: items.filter((q) => q.difficulty === 'hard').length,
  });

  const validateCounts = (label, counts, rules) => {
    for (const [level, [min, max]] of Object.entries(rules)) {
      if (counts[level] < min || counts[level] > max) {
        errors.push(`${mockContent.testId}: Math ${label} ${level} count ${counts[level]} is outside ${min}-${max}`);
      }
    }
  };

  validateCounts('Module 1', profile(modules['math-module-1']), {
    easy: [4, 8],
    medium: [7, 10],
    hard: [4, 8],
  });
  validateCounts('High route', profile(modules.high), {
    easy: [0, 4],
    medium: [6, 10],
    hard: [9, 14],
  });
  validateCounts('Standard route', profile(modules.standard), {
    easy: [3, 7],
    medium: [7, 11],
    hard: [5, 9],
  });
  validateCounts('Low route', profile(modules.low), {
    easy: [6, 10],
    medium: [8, 12],
    hard: [2, 6],
  });

  for (const [label, items] of Object.entries(modules)) {
    if (!items.length) continue;
    for (const question of items) {
      if (question.difficulty !== 'hard') continue;
      const features = new Set(question.metadata?.difficultyFeatures || []);
      const featureCount = [...features].filter((feature) => HARD_FEATURES.has(feature)).length;
      if (featureCount < 2) errors.push(`${mockContent.testId}: hard Math item lacks two approved difficulty features ${question.questionId}`);
      if (!['analyze', 'synthesize'].includes(question.cognitiveDemand)) errors.push(`${mockContent.testId}: hard Math item must use analyze/synthesize cognitive demand ${question.questionId}`);
    }
  }

  const routeScore = (items) => items.reduce((sum, q) => sum + (DIFFICULTY_SCORE[q.difficulty] || 0), 0) / Math.max(items.length, 1);
  const m1Score = routeScore(modules['math-module-1']);
  const highScore = routeScore(modules.high);
  const standardScore = routeScore(modules.standard);
  const lowScore = routeScore(modules.low);

  if (!(highScore > standardScore && standardScore > lowScore)) {
    errors.push(`${mockContent.testId}: adaptive Math route difficulty must increase High > Standard > Low`);
  }

  const hardShare = math.filter((q) => q.difficulty === 'hard').length / Math.max(math.length, 1);
  if (hardShare < 0.30) errors.push(`${mockContent.testId}: Math bank hard share ${Math.round(hardShare * 100)}% is below the 30% minimum internal QC target`);

  return { modules, scores: { module1: m1Score, high: highScore, standard: standardScore, low: lowScore } };
}

function validateOne(mockContent) {
  const errors = [];
  const records = [...(mockContent.readingWriting || []), ...(mockContent.math || [])];
  const ids = new Set();
  const prompts = new Set();
  const verbalContexts = new Set();
  const answerPositions = { A: 0, B: 0, C: 0, D: 0 };

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
      if (!Array.isArray(question.choices) || question.choices.length !== 4) {
        errors.push(`${mockContent.testId}: four choices required ${question.questionId}`);
      } else {
        const lengths = question.choices.map(wordCount);
        if (Math.max(...lengths) - Math.min(...lengths) > 6) errors.push(`${mockContent.testId}: answer-length imbalance ${question.questionId}`);
        if (question.section === 'reading-writing' && LONG_FORM_R_W_SKILLS.has(question.skill)) {
          const correctIndex = String(question.answer).charCodeAt(0) - 65;
          const correctWords = lengths[correctIndex];
          const otherLengths = lengths.filter((_, index) => index !== correctIndex);
          if (correctWords > Math.max(...otherLengths) || correctWords < Math.min(...otherLengths)) {
            errors.push(`${mockContent.testId}: correct verbal choice has a unique length clue ${question.questionId}`);
          }
        }
      }
      if (answerPositions[question.answer] !== undefined) answerPositions[question.answer] += 1;
    } else if (question.questionType === 'student-produced-response') {
      if (Array.isArray(question.choices) && question.choices.length !== 0) errors.push(`${mockContent.testId}: SPR item must not expose answer choices ${question.questionId}`);
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

  for (const route of ['high', 'standard', 'low']) {
    const rwRoute = rw2.filter((q) => q.adaptiveRoute === route);
    const mathRoute = math2.filter((q) => q.adaptiveRoute === route);
    if (rwRoute.length !== 27) errors.push(`${mockContent.testId}: R&W ${route} route must contain 27 questions`);
    if (mathRoute.length !== 22) errors.push(`${mockContent.testId}: Math ${route} route must contain 22 questions`);
  }

  const mcqTotal = Object.values(answerPositions).reduce((sum, value) => sum + value, 0);
  if (mcqTotal) {
    const values = Object.values(answerPositions);
    if (Math.max(...values) - Math.min(...values) > 2) errors.push(`${mockContent.testId}: answer-key positions are not sufficiently balanced across A-D`);
  }

  validateMathDifficulty(mockContent, errors);

  if (errors.length) throw new Error(`SAT/PSAT mock content quality gate failed:\n${errors.join('\n')}`);
  return { ok: true, questionCount: records.length };
}

export function validateMockContent(mockContent) {
  return validateOne(mockContent);
}

export function validateMockSeries(...mocks) {
  const results = mocks.map(validateOne);
  const errors = [];
  const all = mocks.flatMap((mock) => [...(mock.readingWriting || []), ...(mock.math || [])]);
  const promptMap = new Map();
  const verbalContextMap = new Map();
  const mathApplicationMap = new Map();
  const questionIdMap = new Map();

  for (const question of all) {
    const previousId = questionIdMap.get(question.questionId);
    if (previousId) errors.push(`Duplicate question ID across mock series: ${previousId.questionId} and ${question.questionId}`);
    else questionIdMap.set(question.questionId, question);

    const normalizedPrompt = normalize(question.prompt);
    const previousPrompt = promptMap.get(normalizedPrompt);
    if (previousPrompt && previousPrompt.testId !== question.testId) errors.push(`Cross-mock duplicate prompt: ${previousPrompt.questionId} and ${question.questionId}`);
    else promptMap.set(normalizedPrompt, question);

    if (question.section === 'reading-writing') {
      const context = normalize(question.metadata?.contextKey);
      const previousContext = verbalContextMap.get(context);
      if (previousContext && previousContext.testId !== question.testId) errors.push(`Cross-mock repeated verbal context: ${previousContext.questionId} and ${question.questionId}`);
      else verbalContextMap.set(context, question);
    }

    if (question.section === 'math') {
      const fingerprint = normalize(question.metadata?.applicationFingerprint);
      const previousApplication = mathApplicationMap.get(fingerprint);
      if (previousApplication && previousApplication.testId !== question.testId) errors.push(`Cross-mock repeated Math application: ${previousApplication.questionId} and ${question.questionId}`);
      else mathApplicationMap.set(fingerprint, question);
    }
  }

  if (errors.length) throw new Error(`SAT/PSAT mock series quality gate failed:\n${errors.join('\n')}`);
  return { ok: true, questionCount: results.reduce((sum, result) => sum + result.questionCount, 0) };
}

export function validateMockPair(psatMock, satMock) {
  return validateMockSeries(psatMock, satMock);
}

export default validateMockContent;
