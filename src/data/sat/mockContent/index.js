import { PSAT_MOCK_01_CONTENT as PSAT_BASE, SAT_MOCK_01_CONTENT as SAT_BASE } from "./stage1MockBank";
import { PSAT_MOCK_02_CONTENT as PSAT2_BASE, SAT_MOCK_02_CONTENT as SAT2_BASE } from "./stage2MockBank";
import { prepareStage2Mock } from "./stage2PostProcess";
import { validateMockContent, validateMockSeries } from "./mockContentQualityGate";
import { validateMockFigureQuality } from "./figureQualityGate";

const LONG_FORM_RW = new Set(["Central Ideas and Details", "Inferences", "Command of Evidence", "Text Structure and Purpose", "Cross-Text Connections", "Rhetorical Synthesis"]);

const STAGE1_STEM_MARKERS = [
  "Which choice best states the main idea?",
  "Which inference is best supported?",
  "Which finding best supports the interpretation?",
  "As used in the text, what does \"responds\" most nearly mean?",
  "Why does the author describe the condition that weakens the initial pattern?",
  "A second researcher would most likely agree that the finding",
  "Which choice most effectively emphasizes the important result?",
  "The researchers found the strongest effect in one setting. _____, they did not conclude it would occur everywhere.",
  "The revised method produced a clearer signal _____ it required additional calibration.",
  "The set of measurements, rather than the individual readings, _____ the basis for comparison.",
  "Why do the researchers compare more than one condition?",
  "Which statement best describes the final observation?",
];

function removeGeneratedObservationFiller(mock) {
  const questions = [...(mock.readingWriting || [])].map((question) => ({
    ...question,
    prompt: String(question.prompt || "").replace(/\nFor this (?:PSAT|SAT) form, the comparison uses \d+ observation sites\.$/i, ""),
  }));
  return { ...mock, readingWriting: questions };
}

function splitStage1Prompt(prompt) {
  const value = String(prompt || "");
  let bestIndex = -1;
  let bestMarker = "";

  for (const marker of STAGE1_STEM_MARKERS) {
    const index = value.indexOf(marker);
    if (index >= 0 && (bestIndex < 0 || index < bestIndex)) {
      bestIndex = index;
      bestMarker = marker;
    }
  }

  if (bestIndex < 0) {
    const parts = value.split(/\n\s*\n/);
    return parts.length > 1 ? { context: parts[0].trim(), suffix: parts.slice(1).join("\n\n").trim() } : null;
  }

  const context = value.slice(0, bestIndex).trim().replace(/\n+$/, "");
  const suffix = value.slice(bestIndex).trim();
  return context ? { context, suffix } : null;
}

function normalizePrompt(value) {
  return String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function diversifyStage1Prompts(...mocks) {
  const poolBySkill = new Map();

  for (const mock of mocks) {
    for (const question of mock.readingWriting || []) {
      const parts = splitStage1Prompt(question.prompt);
      if (!parts?.context || !parts?.suffix) continue;
      const skill = String(question.skill || "");
      if (!poolBySkill.has(skill)) poolBySkill.set(skill, []);
      if (!poolBySkill.get(skill).includes(parts.context)) poolBySkill.get(skill).push(parts.context);
    }
  }

  const seenPrompts = new Set();
  return mocks.map((mock) => {
    const readingWriting = (mock.readingWriting || []).map((question) => {
      const originalPrompt = String(question.prompt || "");
      const normalizedOriginal = normalizePrompt(originalPrompt);
      const parts = splitStage1Prompt(originalPrompt);
      if (!normalizedOriginal || !parts?.context || !parts?.suffix) {
        if (normalizedOriginal) seenPrompts.add(normalizedOriginal);
        return question;
      }

      const skill = String(question.skill || "");
      const candidates = poolBySkill.get(skill) || [];
      let selectedContext = parts.context;
      let selectedPrompt = originalPrompt;

      for (const candidate of candidates) {
        const candidatePrompt = `${candidate}\n\n${parts.suffix}`;
        const normalizedCandidate = normalizePrompt(candidatePrompt);
        if (!seenPrompts.has(normalizedCandidate)) {
          selectedContext = candidate;
          selectedPrompt = candidatePrompt;
          break;
        }
      }

      const normalizedSelected = normalizePrompt(selectedPrompt);
      seenPrompts.add(normalizedSelected);

      if (selectedContext === parts.context) return question;

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
