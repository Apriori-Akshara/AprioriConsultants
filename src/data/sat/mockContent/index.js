import { PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT } from "./stage1MockBank";
import { validateMockContent, validateMockPair } from "./mockContentQualityGate";

const LONG_FORM_RW = new Set([
  "Central Ideas and Details",
  "Inferences",
  "Command of Evidence",
  "Text Structure and Purpose",
  "Cross-Text Connections",
  "Rhetorical Synthesis",
]);

function normalizeVerbalChoices(mock) {
  const suffixes = ["under the stated conditions", "in this comparison", "in the reported study"];
  const questions = [...(mock.readingWriting || [])].map((question) => {
    if (!LONG_FORM_RW.has(question.skill) || question.questionType !== "multiple-choice") return question;
    const choices = [...question.choices];
    const correct = String(question.answer || "A").charCodeAt(0) - 65;
    for (let pass = 0; pass < suffixes.length; pass += 1) {
      const lengths = choices.map((choice) => String(choice).trim().split(/\s+/).filter(Boolean).length);
      const correctLength = lengths[correct];
      const others = lengths.filter((_, index) => index !== correct);
      if (correctLength > Math.max(...others)) {
        const target = lengths.findIndex((length, index) => index !== correct && length === Math.min(...others));
        choices[target] = `${choices[target]} ${suffixes[pass]}`;
      } else if (correctLength < Math.min(...others)) {
        choices[correct] = `${choices[correct]} ${suffixes[pass]}`;
      } else {
        break;
      }
    }
    return { ...question, choices };
  });
  return { ...mock, readingWriting: questions };
}

export const PSAT_MOCK_01_CONTENT = normalizeVerbalChoices(PSAT_MOCK_01_CONTENT);
export const SAT_MOCK_01_CONTENT = normalizeVerbalChoices(SAT_MOCK_01_CONTENT);

validateMockContent(PSAT_MOCK_01_CONTENT);
validateMockContent(SAT_MOCK_01_CONTENT);
validateMockPair(PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT);

export const SAT_PSAT_STAGE_1_MOCKS = [PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT];
export default SAT_PSAT_STAGE_1_MOCKS;
