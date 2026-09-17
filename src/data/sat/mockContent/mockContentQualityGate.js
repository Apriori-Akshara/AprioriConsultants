const normalize = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');

const wordCount = (value) =>
  normalize(value).split(/\s+/).filter(Boolean).length;

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

const LEVEL_SCORE = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const MATH_DOMAINS = [
  'Algebra',
  'Advanced Math',
  'Problem-Solving and Data Analysis',
  'Geometry and Trigonometry',
];

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
  const math = mock.math || [];
  const rules = expectedDomainCounts(mock);

  const modules = {
    module1: math.filter((q) => q.module === 'math-module-1'),
    high: math.filter((q) => q.module === 'math-module-2' && q.adaptiveRoute === 'high'),
    standard: math.filter((q) => q.module === 'math-module-2' && q.adaptiveRoute === 'standard'),
    low: math.filter((q) => q.module === 'math-module-2' && q.adaptiveRoute === 'low'),
  };

  for (const [label, items] of Object.entries(modules)) {
    const seen = new Set(items.map((q) => q.domain));
    for (const domain of MATH_DOMAINS) {
      if (!seen.has(domain)) errors.push(`${mock.testId}: Math ${label} is missing ${domain}`);
    }
  }

  for (const [route, items] of Object.entries({ high: modules.high, standard: modules.standard, low: modules.low })) {
    const combined = [...modules.module1, ...items];
    const counts = {
      algebra: combined.filter((q) => q.domain === 'Algebra').length,
      advanced: combined.filter((q) => q.domain === 'Advanced Math').length,
      psda: combined.filter((q) => q.domain === 'Problem-Solving and Data Analysis').length,
      geometry: combined.filter((q) => q.domain === 'Geometry and Trigonometry').length,
    };

    for (const [key, [min, max]] of Object.entries(rules)) {
      if (counts[key] < min || counts[key] > max) {
        errors.push(`${mock.testId}: ${route} route Math ${key} count ${counts[key]} is outside ${min}-${max}`);
      }
    }
  }

  const profile = (items) => ({
    easy: items.filter((q) => q.difficulty === 'easy').length,
    medium: items.filter((q) => q.difficulty === 'medium').length,
    hard: items.filter((q) => q.difficulty === 'hard').length,
  });

  const countRules = {
    module1: { easy: [4, 8], medium: [7, 10], hard: [4, 8] },
    high: { easy: [0, 4], medium: [6, 10], hard: [9, 14] },
    standard: { easy: [3, 7], medium: [7, 11], hard: [5, 9] },
    low: { easy: [6, 10], medium: [8, 12], hard: [2, 6] },
  };

  for (const [label, items] of Object.entries(modules)) {
    const counts = profile(items);
    for (const [level, [min, max]] of Object.entries(countRules[label])) {
      if (counts[level] < min || counts[level] > max) {
        errors.push(`${mock.testId}: Math ${label} ${level} count ${counts[level]} is outside ${min}-${max}`);
      }
    }

    for (const question of items.filter((q) => q.difficulty === 'hard')) {
      const features = new Set(question.metadata?.difficultyFeatures || []);
      if ([...features].filter((feature) => HARD_FEATURES.has(feature)).length < 2) {
        errors.push(`${mock.testId}: hard Math item lacks two approved difficulty features ${question.questionId}`);
      }
      if (!['analyze', 'synthesize'].includes(question.cognitiveDemand)) {
        errors.push(`${mock.testId}: hard Math item must use analyze/synthesize ${question.questionId}`);
      }
    }
  }

  const average = (items) =>
    items.reduce((sum, q) => sum + (LEVEL_SCORE[q.difficulty] || 0), 0) / Math.max(items.length, 1);

  const scores = {
    high: average(modules.high),
    standard: average(modules.standard),
    low: average(modules.low),
  };

  if (!(scores.high > scores.standard && scores.standard > scores.low)) {
    errors.push(`${mock.testId}: adaptive Math difficulty must satisfy High > Standard > Low`);
  }

  const hardShare = math.filter((q) => q.difficulty === 'hard').length / Math.max(math.length, 1);
  if (hardShare < 0.3) {
    errors.push(`${mock.testId}: Math bank hard share ${Math.round(hardShare * 100)}% is below the 30% internal floor`);
  }
}

function constructionFingerprint(question) {
  if (question.section !== 'math') return '';
  return normalize(question.prompt)
    .replace(/enter your answer as a number\.?/g, '')
    .replace(/[-+]?\d+(?:\.\d+)?/g, '<n>')
    .replace(/\s+/g, ' ')
    .trim();
}

function figureFingerprint(question) {
  if (!question.figure || question.section !== 'math') return '';
  const stable = (value) => {
    if (value === null || value === undefined) return '';
    if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
    if (typeof value === 'object') {
      return `{${Object.keys(value).filter((key) => key !== 'visualVariant').sort().map((key) => `${key}:${stable(value[key])}`).join('|')}}`;
    }
    return String(value);
  };
  return `${question.domain}|${question.figure.type}|${stable(question.figure)}`;
}

function passageFingerprint(question) {
  if (question.section !== 'reading-writing') return '';
  const prompt = String(question.prompt || '').trim();
  const parts = prompt.split(/\n\n/);
  if (parts.length <= 1) return normalize(prompt);
  return normalize(parts.slice(0, -1).join(' '));
}

function validateOne(mockContent) {
  const errors = [];
  const records = [...(mockContent.readingWriting || []), ...(mockContent.math || [])];
  const ids = new Set();
  const prompts = new Set();
  const verbalPassages = new Set();
  const answerPositions = { A: 0, B: 0, C: 0, D: 0 };

  if (records.length !== 196) errors.push(`${mockContent.testId}: expected 196 bank questions, found ${records.length}`);

  const mockTestId = String(mockContent.testId || '').trim();
  if (!/^(?:sat-mock-(?:0[1-9]|1[0-9]|20)|psat-mock-(?:0[1-9]|10))$/.test(mockTestId)) {
    errors.push(`${mockContent.testId || '(missing testId)'}: invalid mock identity`);
  }

  for (const question of records) {
    const questionId = String(question.questionId || '').trim();
    const questionTestId = String(question.testId || '').trim();
    const contentId = String(question.contentId || '').trim();

    if (!questionId) errors.push(`${mockTestId}: question is missing questionId`);
    if (!questionTestId) errors.push(`${mockTestId}: question ${questionId || '(missing ID)'} is missing testId`);
    else if (questionTestId !== mockTestId) errors.push(`${mockTestId}: question ${questionId || '(missing ID)'} has foreign testId ${questionTestId}`);
    if (!contentId) errors.push(`${mockTestId}: question ${questionId || '(missing ID)'} is missing contentId`);
    else if (questionId && contentId !== questionId) errors.push(`${mockTestId}: question ${questionId} has mismatched contentId ${contentId}`);
    if (questionId && mockTestId && !questionId.startsWith(`${mockTestId}-`)) errors.push(`${mockTestId}: question ${questionId} is outside its mock namespace`);
    if (ids.has(questionId)) errors.push(`${mockTestId}: duplicate questionId ${questionId}`);
    ids.add(questionId);

    const normalizedPrompt = normalize(question.prompt);
    if (prompts.has(normalizedPrompt)) errors.push(`${mockTestId}: duplicate prompt ${questionId}`);
    prompts.add(normalizedPrompt);
    if (!question.answer) errors.push(`${mockTestId}: missing answer ${questionId}`);
    if (!question.explanation) errors.push(`${mockTestId}: missing explanation ${questionId}`);

    if (question.section === 'reading-writing') {
      const context = normalize(question.metadata?.contextKey);
      if (!context) errors.push(`${mockTestId}: missing verbal context key ${questionId}`);
      if (verbalPassages.has(context)) errors.push(`${mockTestId}: repeated verbal context ${context}`);
      verbalPassages.add(context);
      if (!passageFingerprint(question)) errors.push(`${mockTestId}: missing passage content ${questionId}`);
    }

    if (question.questionType === 'multiple-choice') {
      if (!Array.isArray(question.choices) || question.choices.length !== 4) {
        errors.push(`${mockTestId}: four choices required ${questionId}`);
      } else {
        const lengths = question.choices.map(wordCount);
        if (Math.max(...lengths) - Math.min(...lengths) > 6) {
          errors.push(`${mockTestId}: answer-length imbalance ${questionId}`);
        }
        // Choice length may be a useful authoring signal, but it is not a
        // valid hard release gate: a correct answer can naturally be the
        // shortest or longest option without making the item invalid.
      }
      if (answerPositions[question.answer] !== undefined) answerPositions[question.answer] += 1;
    } else if (question.questionType === 'student-produced-response') {
      if (Array.isArray(question.choices) && question.choices.length !== 0) errors.push(`${mockTestId}: SPR item must not expose choices ${questionId}`);
      if (question.metadata?.answerFormat !== 'numeric') errors.push(`${mockTestId}: SPR item must use numeric answer format ${questionId}`);
    }
  }

  const rw1 = records.filter((q) => q.section === 'reading-writing' && q.module === 'rw-module-1');
  const rw2 = records.filter((q) => q.section === 'reading-writing' && q.module === 'rw-module-2');
  const math1 = records.filter((q) => q.section === 'math' && q.module === 'math-module-1');
  const math2 = records.filter((q) => q.section === 'math' && q.module === 'math-module-2');

  if (rw1.length !== 27) errors.push(`${mockTestId}: R&W Module 1 must contain 27 questions`);
  if (rw2.length !== 81) errors.push(`${mockTestId}: R&W Module 2 pool must contain 81 questions`);
  if (math1.length !== 22) errors.push(`${mockTestId}: Math Module 1 must contain 22 questions`);
  if (math2.length !== 66) errors.push(`${mockTestId}: Math Module 2 pool must contain 66 questions`);

  for (const route of ['high', 'standard', 'low']) {
    if (rw2.filter((q) => q.adaptiveRoute === route).length !== 27) errors.push(`${mockTestId}: R&W ${route} route must contain 27 questions`);
    if (math2.filter((q) => q.adaptiveRoute === route).length !== 22) errors.push(`${mockTestId}: Math ${route} route must contain 22 questions`);
  }

  const mcqValues = Object.values(answerPositions);
  if (Math.max(...mcqValues) - Math.min(...mcqValues) > 2) errors.push(`${mockTestId}: answer-key positions are not sufficiently balanced across A-D`);

  validateMathBlueprint(mockContent, errors);
  if (errors.length) throw new Error(`SAT/PSAT mock content quality gate failed:\n${errors.join('\n')}`);
  return { ok: true, questionCount: records.length };
}

export function validateMockContent(mockContent) {
  return validateOne(mockContent);
}

export function validateMockSeries(...mocks) {
  const results = mocks.map(validateOne);
  const errors = [];
  const promptMap = new Map();
  const passageMap = new Map();
  const mathConstructionMap = new Map();
  const mathFigureMap = new Map();
  const questionIdMap = new Map();
  const testIdMap = new Map();
  const originalityFingerprintMap = new Map();

  for (const mock of mocks) {
    const mockId = String(mock?.testId || '').trim();
    if (!mockId) {
      errors.push('Cross-mock isolation: a mock is missing testId');
      continue;
    }
    const previousMock = testIdMap.get(mockId);
    if (previousMock) errors.push(`Duplicate mock testId across series: ${mockId}`);
    else testIdMap.set(mockId, mock);

    const records = [...(mock.readingWriting || []), ...(mock.math || [])];
    for (const question of records) {
      const questionId = String(question.questionId || '').trim();
      const questionTestId = String(question.testId || '').trim();
      const contentId = String(question.contentId || '').trim();
      if (questionTestId !== mockId) errors.push(`Cross-mock identity mismatch: mock ${mockId} contains ${questionId || '(missing ID)'} tagged ${questionTestId || '(missing testId)'}`);
      if (!questionId || !questionId.startsWith(`${mockId}-`)) errors.push(`Cross-mock question namespace violation: ${questionId || '(missing ID)'} is not owned by ${mockId}`);
      if (!contentId) errors.push(`Cross-mock content identity missing: ${mockId} question ${questionId || '(missing ID)'} has no contentId`);
      else if (questionId && contentId !== questionId) errors.push(`Cross-mock content identity mismatch: ${mockId} question ${questionId} has contentId ${contentId}`);

      const previousId = questionIdMap.get(questionId);
      if (previousId && previousId !== mockId) errors.push(`Cross-mock questionId collision: ${questionId} appears in ${previousId} and ${mockId}`);
      else questionIdMap.set(questionId, mockId);

      const prompt = normalize(question.prompt);
      const previousPrompt = promptMap.get(prompt);
      if (previousPrompt && previousPrompt !== mockId) errors.push(`Cross-mock prompt repetition: ${questionId} repeats a prompt from ${previousPrompt}`);
      else promptMap.set(prompt, mockId);

      if (question.section === 'reading-writing') {
        const passage = passageFingerprint(question);
        if (passage) {
          const previousPassage = passageMap.get(passage);
          if (previousPassage && previousPassage !== mockId) errors.push(`Cross-mock passage repetition: ${questionId} repeats passage material from ${previousPassage}`);
          else passageMap.set(passage, mockId);
        }
      }

      if (question.section === 'math') {
        const construction = constructionFingerprint(question);
        if (construction) {
          const previousConstruction = mathConstructionMap.get(construction);
          if (previousConstruction && previousConstruction !== mockId) errors.push(`Cross-mock Math construction repetition: ${questionId} repeats normalized construction from ${previousConstruction}`);
          else mathConstructionMap.set(construction, mockId);
        }
        const figure = figureFingerprint(question);
        if (figure) {
          const previousFigure = mathFigureMap.get(figure);
          if (previousFigure && previousFigure !== mockId) errors.push(`Cross-mock figure repetition: ${questionId} repeats figure data from ${previousFigure}`);
          else mathFigureMap.set(figure, mockId);
        }
      }

      const originalityFingerprint = normalize(question.originalityFingerprint);
      if (originalityFingerprint) {
        const previousFingerprint = originalityFingerprintMap.get(originalityFingerprint);
        if (previousFingerprint && previousFingerprint !== mockId) errors.push(`Cross-mock originality fingerprint repetition: ${questionId} repeats ${originalityFingerprint}`);
        else originalityFingerprintMap.set(originalityFingerprint, mockId);
      }
    }
  }

  if (errors.length) throw new Error(`SAT/PSAT series isolation gate failed:\n${errors.join('\n')}`);
  return { ok: true, mockCount: mocks.length, results };
}
