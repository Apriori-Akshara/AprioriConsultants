import { PSAT_MOCK_01_CONTENT as PSAT_BASE, SAT_MOCK_01_CONTENT as SAT_BASE } from "./stage1MockBank";
import { PSAT_MOCK_02_CONTENT as PSAT2_BASE, SAT_MOCK_02_CONTENT as SAT2_BASE } from "./stage2MockBank";
import { prepareStage2Mock } from "./stage2PostProcess";
import { validateMockContent, validateMockSeries } from "./mockContentQualityGate";
import { validateMockFigureQuality } from "./figureQualityGate";

const LONG_FORM_RW = new Set(["Central Ideas and Details", "Inferences", "Command of Evidence", "Text Structure and Purpose", "Cross-Text Connections", "Rhetorical Synthesis"]);

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
      } else break;
    }
    return { ...question, choices };
  });
  return { ...mock, readingWriting: questions };
}

const PSAT_NORMALIZED = normalizeVerbalChoices(PSAT_BASE);
const SAT_NORMALIZED = normalizeVerbalChoices(SAT_BASE);
const PSAT2_NORMALIZED = normalizeVerbalChoices(prepareStage2Mock(PSAT2_BASE));
const SAT2_NORMALIZED = normalizeVerbalChoices(prepareStage2Mock(SAT2_BASE));

const FIGURE_NORMALIZED_01 = validateMockFigureQuality(PSAT_NORMALIZED, SAT_NORMALIZED);
const FIGURE_NORMALIZED_02 = validateMockFigureQuality(PSAT2_NORMALIZED, SAT2_NORMALIZED);

export const PSAT_MOCK_01_CONTENT = FIGURE_NORMALIZED_01.psat;
export const SAT_MOCK_01_CONTENT = FIGURE_NORMALIZED_01.sat;
export const PSAT_MOCK_02_CONTENT = FIGURE_NORMALIZED_02.psat;
export const SAT_MOCK_02_CONTENT = FIGURE_NORMALIZED_02.sat;

validateMockContent(PSAT_MOCK_01_CONTENT);
validateMockContent(SAT_MOCK_01_CONTENT);
validateMockContent(PSAT_MOCK_02_CONTENT);
validateMockContent(SAT_MOCK_02_CONTENT);
validateMockSeries(PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT, PSAT_MOCK_02_CONTENT, SAT_MOCK_02_CONTENT);

export const SAT_PSAT_STAGE_1_MOCKS = [PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT];
export const SAT_PSAT_STAGE_2_MOCKS = [PSAT_MOCK_02_CONTENT, SAT_MOCK_02_CONTENT];
export const SAT_PSAT_MOCKS = [PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT, PSAT_MOCK_02_CONTENT, SAT_MOCK_02_CONTENT];
export default SAT_PSAT_MOCKS;
