import { PSAT_MOCK_01_CONTENT as PSAT_BASE, SAT_MOCK_01_CONTENT as SAT_BASE } from "./stage1MockBank";
import { PSAT_MOCK_02_CONTENT as PSAT2_BASE, SAT_MOCK_02_CONTENT as SAT2_BASE } from "./stage2MockBank";
import { prepareStage2Mock } from "./stage2PostProcess";
import { buildMathBank } from "./mathBankFactoryV2";
import { validateMockContent, validateMockSeries } from "./mockContentQualityGate";
import { validateMockFigureQuality } from "./figureQualityGate";

const LONG_FORM_RW = new Set(["Central Ideas and Details", "Inferences", "Command of Evidence", "Text Structure and Purpose", "Cross-Text Connections", "Rhetorical Synthesis"]);

const CROSS_TEXT_PASSAGES = [
  "A separate research team found that an intervention produced a larger benefit in locations with fewer competing resources.",
  "In another study, researchers found that an early improvement was less persistent when environmental conditions became more demanding.",
  "A second investigation reported that the same general strategy produced different results across settings with different starting conditions.",
  "Researchers studying a related question found that an observed advantage became smaller when the surrounding conditions changed.",
  "A separate analysis concluded that a treatment can be effective overall while its size of effect varies across local circumstances.",
  "Another research group observed a similar pattern but noted that differences among sites affected the magnitude of the result.",
  "A follow-up study found that the direction of the overall pattern was consistent, although its strength varied among locations.",
  "A related investigation reported that the measured outcome depended partly on conditions that differed from one site to another.",
  "Researchers in a second setting found that the intervention remained useful, but the size of the benefit depended on local conditions.",
  "A separate comparison showed that an overall trend can remain visible even when individual sites respond differently.",
  "Another study found that the broad result was reproducible, while the magnitude of the effect changed with the setting.",
  "A later investigation likewise found that differences in conditions can change the strength of an otherwise consistent pattern.",
];

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

function preserveAnswerPosition(question, choices, explanation) {
  const currentIndex = String(question.answer || "A").charCodeAt(0) - 65;
  const ordered = [...choices];
  const correct = ordered.shift();
  ordered.splice(currentIndex, 0, correct);
  return { ...question, choices: ordered, answer: String.fromCharCode(65 + currentIndex), explanation };
}

function correctKnownVerbalQC(mock) {
  let crossTextIndex = 0;
  return {
    ...mock,
    readingWriting: (mock.readingWriting || []).map((question) => {
      if (question.skill === "Transitions" && Array.isArray(question.choices) && question.choices.length === 4) {
        const choices = [...question.choices];
        const currentIndex = String(question.answer || "A").charCodeAt(0) - 65;
        const contrastIndex = choices.findIndex((choice) => String(choice).trim() === "In contrast");
        if (contrastIndex >= 0 && contrastIndex !== currentIndex) {
          [choices[currentIndex], choices[contrastIndex]] = [choices[contrastIndex], choices[currentIndex]];
        }
        if (contrastIndex >= 0) {
          return {
            ...question,
            choices,
            answer: String.fromCharCode(65 + currentIndex),
            explanation: "In contrast correctly signals the contrast between a strong result in one setting and the decision not to generalize it to every setting.",
          };
        }
      }

      if (question.skill === "Command of Evidence") {
        const choices = [
          "A follow-up result showing that the effect changes when the relevant condition changes.",
          "A record showing only that the researchers collected many observations.",
          "A description of the equipment used to collect the original measurements.",
          "A statement noting that the study was conducted during a particular season.",
        ];
        const corrected = preserveAnswerPosition(question, choices, "The first choice is the strongest evidence because it directly supports the claim that the observed effect depends on conditions. The other choices describe the study without directly supporting that claim.");
        return { ...corrected, prompt: `${String(question.prompt || "").split("\n\n")[0]}\n\nSuppose a follow-up study were conducted. Which finding would best support the interpretation presented in the passage?` };
      }

      if (question.skill === "Words in Context") {
        const choices = ["determine", "remove", "measure", "separate"];
        const corrected = preserveAnswerPosition(question, choices, "In this context, identify means determine or recognize something through the comparison. The other choices do not express the meaning intended by the sentence.");
        return { ...corrected, prompt: `${String(question.prompt || "").split("\n\n")[0]}\n\nThe comparison helps researchers identify an important difference between the conditions. As used in this sentence, what does identify most nearly mean?` };
      }

      if (question.skill === "Cross-Text Connections") {
        const passage2 = CROSS_TEXT_PASSAGES[crossTextIndex % CROSS_TEXT_PASSAGES.length];
        crossTextIndex += 1;
        const choices = [
          "Both passages indicate that the strength of a result can depend on conditions.",
          "Both passages conclude that a result must be identical in every setting.",
          "Both passages argue that comparisons are unnecessary when a pattern is observed.",
          "Both passages conclude that local conditions have no effect on the result.",
        ];
        const corrected = preserveAnswerPosition(question, choices, "Both passages support a qualified interpretation: the broad pattern can be informative while the strength of the result varies with conditions.");
        return { ...corrected, prompt: `${String(question.prompt || "").split("\n\n")[0]}\n\nPassage 2: ${passage2}\n\nBased on the two passages, which statement would both authors most likely agree with?` };
      }

      if (question.skill === "Rhetorical Synthesis") {
        const choices = [
          "The comparison reveals a measurable effect, although its size depends on conditions.",
          "The researchers collected observations but did not report a result.",
          "The study proves that the same effect must occur in every setting.",
          "The comparison is useful only because it uses a large number of observations.",
        ];
        return preserveAnswerPosition(question, choices, "The first choice best accomplishes the goal because it emphasizes the result while preserving the important qualification about conditions.");
      }

      return question;
    }),
  };
}

function applyBlueprintMath(mock, assessmentNumber, seed) {
  return { ...mock, math: buildMathBank({ testId: mock.testId, variant: mock.assessmentVariant, assessmentNumber, seed }) };
}

const PSAT_BASE_ALIGNED = applyBlueprintMath(PSAT_BASE, 1, 0);
const SAT_BASE_ALIGNED = applyBlueprintMath(SAT_BASE, 1, 1);
const PSAT2_BASE_ALIGNED = prepareStage2Mock(applyBlueprintMath(PSAT2_BASE, 2, 2));
const SAT2_BASE_ALIGNED = prepareStage2Mock(applyBlueprintMath(SAT2_BASE, 2, 3));

const PSAT_NORMALIZED = normalizeVerbalChoices(correctKnownVerbalQC(balanceAnswerPositions(restoreInternalPromptUniqueness(PSAT_BASE_ALIGNED))));
const SAT_NORMALIZED = normalizeVerbalChoices(correctKnownVerbalQC(balanceAnswerPositions(restoreInternalPromptUniqueness(SAT_BASE_ALIGNED))));
const PSAT2_NORMALIZED = normalizeVerbalChoices(correctKnownVerbalQC(balanceAnswerPositions(PSAT2_BASE_ALIGNED)));
const SAT2_NORMALIZED = normalizeVerbalChoices(correctKnownVerbalQC(balanceAnswerPositions(SAT2_BASE_ALIGNED)));

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
