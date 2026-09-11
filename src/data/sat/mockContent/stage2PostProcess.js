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
  return rebalanceChoices(mock);
}

export default prepareStage2Mock;
