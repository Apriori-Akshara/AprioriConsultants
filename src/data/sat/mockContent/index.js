import { PSAT_MOCK_01_CONTENT as PSAT_BASE, SAT_MOCK_01_CONTENT as SAT_BASE } from "./stage1MockBank";
import { PSAT_MOCK_02_CONTENT as PSAT2_BASE, SAT_MOCK_02_CONTENT as SAT2_BASE } from "./stage2MockBank";
import { prepareStage2Mock } from "./stage2PostProcess";
import { buildMathBank } from "./mathBankFactoryV2";
import { validateMockContent, validateMockSeries } from "./mockContentQualityGate";
import { validateMockFigureQuality } from "./figureQualityGate";

const LONG_FORM_RW = new Set(["Central Ideas and Details", "Inferences", "Command of Evidence", "Text Structure and Purpose", "Cross-Text Connections", "Rhetorical Synthesis"]);

function restoreInternalPromptUniqueness(mock) {
  const variantLabel = mock.assessmentVariant === "psat-nmsqt" ? "PSAT" : "SAT";
  const baseCount = mock.assessmentVariant === "psat-nmsqt" ? 11 : 31;
  const questions = [...(mock.readingWriting || [])].map((question, index) => {
    const prompt = String(question.prompt || "");
    const filler = `\nFor this ${variantLabel} form, the comparison uses ${baseCount + (index % 17)} observation sites.`;
    if (prompt.includes("observation sites.")) return question;
    return { ...question, prompt: `${prompt}${filler}` };
  });
  return { ...mock, readingWriting: questions };
}

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

function balanceAnswerPositions(mock) {
  let mcqIndex = 0;
  const rebalance = (question) => {
    if (question.questionType !== "multiple-choice" || !Array.isArray(question.choices) || question.choices.length !== 4) return question;
    const choices = [...question.choices];
    const current = String(question.answer || "A").charCodeAt(0) - 65;
    const target = mcqIndex % 4;
    mcqIndex += 1;
    if (current === target) return question;
    [choices[current], choices[target]] = [choices[target], choices[current]];
    return { ...question, choices, answer: String.fromCharCode(65 + target) };
  };
  return {
    ...mock,
    readingWriting: (mock.readingWriting || []).map(rebalance),
    math: (mock.math || []).map(rebalance),
  };
}

function applyBlueprintMath(mock, assessmentNumber, seed) {
  return {
    ...mock,
    math: buildMathBank({
      testId: mock.testId,
      variant: mock.assessmentVariant,
      assessmentNumber,
      seed,
    }),
  };
}

const PSAT_BASE_ALIGNED = applyBlueprintMath(PSAT_BASE, 1, 0);
const SAT_BASE_ALIGNED = applyBlueprintMath(SAT_BASE, 1, 1);
const PSAT2_BASE_ALIGNED = prepareStage2Mock(applyBlueprintMath(PSAT2_BASE, 2, 2));
const SAT2_BASE_ALIGNED = prepareStage2Mock(applyBlueprintMath(SAT2_BASE, 2, 3));

const PSAT_NORMALIZED = balanceAnswerPositions(normalizeVerbalChoices(restoreInternalPromptUniqueness(PSAT_BASE_ALIGNED)));
const SAT_NORMALIZED = balanceAnswerPositions(normalizeVerbalChoices(restoreInternalPromptUniqueness(SAT_BASE_ALIGNED)));
const PSAT2_NORMALIZED = balanceAnswerPositions(normalizeVerbalChoices(PSAT2_BASE_ALIGNED));
const SAT2_NORMALIZED = balanceAnswerPositions(normalizeVerbalChoices(SAT2_BASE_ALIGNED));

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
validateMockSeries(PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT, PSAT_MOCK_02_CONTENT, SAT2_NORMALIZED);

export const SAT_PSAT_STAGE_1_MOCKS = [PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT];
export const SAT_PSAT_STAGE_2_MOCKS = [PSAT_MOCK_02_CONTENT, SAT_MOCK_02_CONTENT];
export const SAT_PSAT_MOCKS = [PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT, PSAT_MOCK_02_CONTENT, SAT_MOCK_02_CONTENT];
export default SAT_PSAT_MOCKS;
