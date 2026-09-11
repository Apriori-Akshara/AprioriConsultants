import { PSAT_MOCK_01_CONTENT as PSAT_BASE, SAT_MOCK_01_CONTENT as SAT_BASE } from "./stage1MockBank";
import { PSAT_MOCK_02_CONTENT as PSAT2_BASE, SAT_MOCK_02_CONTENT as SAT2_BASE } from "./stage2MockBank";
import { prepareStage2Mock } from "./stage2PostProcess";
import { validateMockContent, validateMockSeries } from "./mockContentQualityGate";
import { validateMockFigureQuality } from "./figureQualityGate";

const LONG_FORM_RW = new Set(["Central Ideas and Details", "Inferences", "Command of Evidence", "Text Structure and Purpose", "Cross-Text Connections", "Rhetorical Synthesis"]);

function removeGeneratedObservationFiller(mock) {
  const questions = [...(mock.readingWriting || [])].map((question) => ({
    ...question,
    prompt: String(question.prompt || "").replace(/\nFor this (?:PSAT|SAT) form, the comparison uses \d+ observation sites\.$/i, ""),
  }));
  return { ...mock, readingWriting: questions };
}

function diversifyStage1Prompts(...mocks) {
  const poolBySkill = new Map();
  const seenPrefixesBySkill = new Map();

  for (const mock of mocks) {
    for (const question of mock.readingWriting || []) {
      const parts = String(question.prompt || "").split("\n\n");
      const context = parts.length > 1 ? parts[0].trim() : "";
      if (!context) continue;
      const skill = String(question.skill || "");
      if (!poolBySkill.has(skill)) poolBySkill.set(skill, []);
      if (!poolBySkill.get(skill).some((item) => item === context)) poolBySkill.get(skill).push(context);
    }
  }

  const seenPrompts = new Set();
  return mocks.map((mock) => {
    const readingWriting = (mock.readingWriting || []).map((question) => {
      const originalPrompt = String(question.prompt || "");
      const normalizedOriginal = originalPrompt.trim().toLowerCase().replace(/\s+/g, " ");
      const parts = originalPrompt.split("\n\n");
      const originalContext = parts.length > 1 ? parts[0].trim() : "";
      const suffix = parts.length > 1 ? parts.slice(1).join("\n\n") : "";
      const skill = String(question.skill || "");

      if (!normalizedOriginal || seenPrompts.has(normalizedOriginal) || !originalContext || !suffix) {
        if (normalizedOriginal) seenPrompts.add(normalizedOriginal);
        return question;
      }

      const candidates = poolBySkill.get(skill) || [];
      if (!candidates.length) {
        seenPrompts.add(normalizedOriginal);
        return question;
      }

      let selectedContext = originalContext;
      let selectedPrompt = originalPrompt;

      for (const candidate of candidates) {
        const candidatePrompt = `${candidate}\n\n${suffix}`;
        const normalizedCandidate = candidatePrompt.trim().toLowerCase().replace(/\s+/g, " ");
        if (!seenPrompts.has(normalizedCandidate)) {
          selectedContext = candidate;
          selectedPrompt = candidatePrompt;
          break;
        }
      }

      const normalizedSelected = selectedPrompt.trim().toLowerCase().replace(/\s+/g, " ");
      seenPrompts.add(normalizedSelected);
      if (selectedContext === originalContext) return question;

      return {
        ...question,
        prompt: selectedPrompt,
        metadata: {
          ...(question.metadata || {}),
          contextFamily: `${question.metadata?.contextFamily || "stage1"}|${selectedContext}`,
        },
      };
    });

    return { ...mock, readingWriting };
  });
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

const STAGE1_DIVERSIFIED = diversifyStage1Prompts(
  removeGeneratedObservationFiller(PSAT_BASE),
  removeGeneratedObservationFiller(SAT_BASE),
);

const PSAT_NORMALIZED = normalizeVerbalChoices(STAGE1_DIVERSIFIED[0]);
const SAT_NORMALIZED = normalizeVerbalChoices(STAGE1_DIVERSIFIED[1]);
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
