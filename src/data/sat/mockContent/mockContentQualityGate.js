const normalize = (value) => String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
const wordCount = (value) => normalize(value).split(/\s+/).filter(Boolean).length;

export function validateMockContent(mockContent) {
  const errors = [];
  const records = [...(mockContent.readingWriting || []), ...(mockContent.math || [])];
  const ids = new Set();
  const prompts = new Set();
  const verbalContexts = new Set();
  const answerPositions = { A: 0, B: 0, C: 0, D: 0 };

  if (records.length === 0) errors.push(`${mockContent.testId}: no question records`);

  for (const question of records) {
    if (ids.has(question.questionId)) errors.push(`${mockContent.testId}: duplicate questionId ${question.questionId}`);
    ids.add(question.questionId);

    const normalizedPrompt = normalize(question.prompt);
    if (prompts.has(normalizedPrompt)) errors.push(`${mockContent.testId}: duplicate prompt ${question.questionId}`);
    prompts.add(normalizedPrompt);

    if (question.section === 'reading-writing') {
      const context = normalize(question.metadata?.contextKey);
      if (!context) errors.push(`${mockContent.testId}: missing verbal context key ${question.questionId}`);
      if (verbalContexts.has(context)) errors.push(`${mockContent.testId}: repeated verbal context ${context}`);
      verbalContexts.add(context);
    }

    if (!question.answer) errors.push(`${mockContent.testId}: missing answer ${question.questionId}`);
    if (!question.explanation) errors.push(`${mockContent.testId}: missing explanation ${question.questionId}`);

    if (question.questionType === 'multiple-choice') {
      if (!Array.isArray(question.choices) || question.choices.length !== 4) {
        errors.push(`${mockContent.testId}: four choices required ${question.questionId}`);
      } else {
        const choiceLengths = question.choices.map(wordCount);
        if (Math.max(...choiceLengths) - Math.min(...choiceLengths) > 3) {
          errors.push(`${mockContent.testId}: answer-length imbalance ${question.questionId}`);
        }
      }
      if (answerPositions[question.answer] !== undefined) answerPositions[question.answer] += 1;
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

  if (records.length !== 196) errors.push(`${mockContent.testId}: expected 196 bank questions, found ${records.length}`);

  const mcqTotal = Object.values(answerPositions).reduce((sum, value) => sum + value, 0);
  if (mcqTotal && Math.max(...Object.values(answerPositions)) / mcqTotal > 0.4) {
    errors.push(`${mockContent.testId}: answer-key position imbalance creates a guessing pattern`);
  }

  if (errors.length) throw new Error(`SAT/PSAT mock content quality gate failed:\n${errors.join('\n')}`);
  return { ok: true, questionCount: records.length };
}

export default validateMockContent;
