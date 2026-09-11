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
