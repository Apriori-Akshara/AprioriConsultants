function normalizePrompt(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function removeDuplicateGeometryPrompts(mock) {
  const seen = new Set();
  const math = (mock.math || []).map((question) => {
    const originalPrompt = String(question.prompt || '').trim();
    const normalized = normalizePrompt(originalPrompt);
    if (!normalized || !seen.has(normalized)) {
      if (normalized) seen.add(normalized);
      return question;
    }

    const match = originalPrompt.match(/^A triangle has a base of (\d+(?:\.\d+)?) units and a height of (\d+(?:\.\d+)?) units\. What is its area\?(\nEnter your answer as a number\.)?$/);
    if (!match) return question;

    const base = Number(match[1]);
    const originalHeight = Number(match[2]);
    const suffix = match[3] || '';
    let height = originalHeight + 2;
    let prompt = `A triangle has a base of ${base} units and a height of ${height} units. What is its area?${suffix}`;

    while (seen.has(normalizePrompt(prompt))) {
      height += 1;
      prompt = `A triangle has a base of ${base} units and a height of ${height} units. What is its area?${suffix}`;
    }

    seen.add(normalizePrompt(prompt));
    const answerValue = (base * height) / 2;
    const figure = question.figure ? { ...question.figure, values: { ...question.figure.values, base, height } } : question.figure;

    if (question.questionType === 'student-produced-response') {
      return { ...question, prompt, answer: answerValue, figure };
    }

    const correctIndex = String(question.answer).charCodeAt(0) - 65;
    const choices = [String(answerValue), String(answerValue + 1), String(answerValue - 1), String(answerValue * 2)];
    const first = choices.shift();
    choices.splice(correctIndex, 0, first);
    return { ...question, prompt, choices, answer: String.fromCharCode(65 + correctIndex), figure };
  });
  return { ...mock, math };
}

function rebalanceChoices(mock) {
  let mcqIndex = 0;
  const math = (mock.math || []).map((question) => {
    if (question.questionType !== 'multiple-choice' || !Array.isArray(question.choices) || question.choices.length !== 4) return question;
    const correctIndex = String(question.answer).charCodeAt(0) - 65;
    const targetIndex = mcqIndex % 4;
    mcqIndex += 1;
    if (correctIndex === targetIndex) return question;
    const choices = [...question.choices];
    [choices[correctIndex], choices[targetIndex]] = [choices[targetIndex], choices[correctIndex]];
    return { ...question, choices, answer: String.fromCharCode(65 + targetIndex) };
  });
  return { ...mock, math };
}

export function prepareStage2Mock(mock) {
  return rebalanceChoices(removeDuplicateGeometryPrompts(mock));
}

export default prepareStage2Mock;
