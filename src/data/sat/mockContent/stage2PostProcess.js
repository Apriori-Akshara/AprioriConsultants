function removeDuplicateGeometryPrompts(mock) {
  const seen = new Set();
  let duplicateIndex = 0;
  const math = (mock.math || []).map((question) => {
    const normalized = String(question.prompt || '').trim().toLowerCase();
    if (!normalized || !seen.has(normalized)) {
      if (normalized) seen.add(normalized);
      return question;
    }
    const match = String(question.prompt).match(/^A triangle has a base of (\d+(?:\.\d+)?) units and a height of (\d+(?:\.\d+)?) units\. What is its area\?$/);
    if (!match) return question;
    const base = Number(match[1]);
    const height = Number(match[2]) + 2 + duplicateIndex;
    duplicateIndex += 1;
    const answerValue = (base * height) / 2;
    const correctIndex = String(question.answer).charCodeAt(0) - 65;
    const choices = [String(answerValue), String(answerValue + 1), String(answerValue - 1), String(answerValue * 2)];
    const first = choices.shift();
    choices.splice(correctIndex, 0, first);
    return {
      ...question,
      prompt: `A triangle has a base of ${base} units and a height of ${height} units. What is its area?`,
      choices,
      answer: String.fromCharCode(65 + correctIndex),
      figure: question.figure ? { ...question.figure, values: { ...question.figure.values, base, height } } : question.figure,
    };
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
