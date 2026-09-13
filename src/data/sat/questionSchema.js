/**
 * Canonical SAT/PSAT question schema.
 *
 * Backward-compatible with the original SAT schema while adding the metadata
 * required by the master Test Prep Content Quality Control system.
 */

export const SAT_DIFFICULTIES = ["easy", "medium", "hard"];
export const SAT_SECTIONS = ["reading-writing", "math"];
export const SAT_MODULES = ["rw-module-1", "rw-module-2", "math-module-1", "math-module-2"];
export const SAT_RW_DOMAINS = ["information-and-ideas", "craft-and-structure", "expression-of-ideas", "standard-english-conventions"];
export const SAT_MATH_DOMAINS = ["algebra", "advanced-math", "problem-solving-and-data-analysis", "geometry-and-trigonometry"];
export const SAT_QUESTION_TYPES = ["multiple-choice", "student-produced-response"];
export const SAT_ASSESSMENT_FAMILIES = ["psat", "sat"];
export const SAT_ASSESSMENT_VARIANTS = ["psat-nmsqt", "sat-series-a", "sat-series-b"];
export const SAT_PROGRESSION_BANDS = [
  ...Array.from({ length: 5 }, (_, i) => `foundation-set-${String(i + 1).padStart(2, "0")}`),
  ...Array.from({ length: 10 }, (_, i) => `advanced-set-${String(i + 1).padStart(2, "0")}`),
  "mock-psat-elevated",
  "mock-sat-elevated",
];
export const SAT_COGNITIVE_DEMANDS = ["recall", "apply", "analyze", "reason", "synthesize", "evaluate"];
export const SAT_INTERACTION_TYPES = ["single-select", "student-produced-response"];
export const SAT_STIMULUS_TYPES = ["short-passage", "paired-passage", "notes", "table", "chart", "graph", "equation", "geometry-diagram", "none"];
export const SAT_CALCULATOR_MODES = ["not-applicable", "allowed", "recommended", "required"];
export const SAT_STATUS_LABELS = ["draft", "validated", "assembly-ready", "published", "retired"];

// Canonical structured figure types from the figure registry, plus legacy names
// that remain valid while the existing Math bank is migrated incrementally.
export const SAT_FIGURE_TYPES = [
  "bar_chart", "line_chart", "scatter_plot", "table", "number_line",
  "right_triangle", "general_triangle", "circle", "parabola", "linear_function_graph",
  "coordinate_shape", "3d_solid", "multi_source_table", "geometry",
  "line", "scatter", "quadratic",
];

export const createEmptyQuestion = () => ({
  contentId: "", version: 1, product: "sat", questionId: "", testId: "",
  assessmentFamily: "sat", assessmentVariant: "sat-series-a", assessmentNumber: 1,
  section: "", module: "", domain: "", skill: "", subskill: "", conceptId: "",
  difficulty: "medium", difficultyBand: "mock-sat-elevated", cognitiveDemand: "analyze",
  questionType: "multiple-choice", stimulusType: "none", interactionType: "single-select",
  timingMode: "timed", estimatedTimeSeconds: null,
  calculatorEligibility: false, calculatorMode: "not-applicable", calculatorRequired: false,
  referenceSheetRelevant: false, passageId: null, prompt: "", choices: [], answer: "", explanation: "", figure: null,
  isOperational: true, originalityFingerprint: "", conceptFingerprint: "", tags: [], lessonIds: [],
  sourceType: "apriori-original", authoringStatus: "draft", status: "draft", releaseEligibility: false,
  metadata: { readingTopic: null, mathSubskill: null, passageGenre: null, rhetoricalPurpose: null, answerFormat: null },
});

export function validateSatQuestion(question) {
  const errors = [];
  if (!question || typeof question !== "object") return { valid: false, errors: ["Question must be an object."] };
  if (!question.questionId && !question.contentId) errors.push("Missing questionId/contentId.");
  if (!question.testId) errors.push("Missing testId.");
  if (!SAT_SECTIONS.includes(question.section)) errors.push(`Invalid section: ${question.section}`);
  if (!SAT_MODULES.includes(question.module)) errors.push(`Invalid module: ${question.module}`);
  if (!SAT_DIFFICULTIES.includes(question.difficulty)) errors.push(`Invalid difficulty: ${question.difficulty}`);
  if (!SAT_QUESTION_TYPES.includes(question.questionType)) errors.push(`Invalid questionType: ${question.questionType}`);
  if (question.assessmentFamily && !SAT_ASSESSMENT_FAMILIES.includes(question.assessmentFamily)) errors.push(`Invalid assessmentFamily: ${question.assessmentFamily}`);
  if (question.assessmentVariant && !SAT_ASSESSMENT_VARIANTS.includes(question.assessmentVariant)) errors.push(`Invalid assessmentVariant: ${question.assessmentVariant}`);
  if (question.difficultyBand && !SAT_PROGRESSION_BANDS.includes(question.difficultyBand)) errors.push(`Invalid difficultyBand: ${question.difficultyBand}`);
  if (question.cognitiveDemand && !SAT_COGNITIVE_DEMANDS.includes(question.cognitiveDemand)) errors.push(`Invalid cognitiveDemand: ${question.cognitiveDemand}`);
  if (question.stimulusType && !SAT_STIMULUS_TYPES.includes(question.stimulusType)) errors.push(`Invalid stimulusType: ${question.stimulusType}`);
  if (question.calculatorMode && !SAT_CALCULATOR_MODES.includes(question.calculatorMode)) errors.push(`Invalid calculatorMode: ${question.calculatorMode}`);
  if (question.interactionType && !SAT_INTERACTION_TYPES.includes(question.interactionType)) errors.push(`Invalid interactionType: ${question.interactionType}`);
  if (question.status && !SAT_STATUS_LABELS.includes(question.status)) errors.push(`Invalid status: ${question.status}`);
  if (!question.domain) errors.push("Missing domain.");
  if (!question.skill) errors.push("Missing skill.");
  if (!question.conceptId) errors.push("Missing conceptId.");
  if (!question.prompt || typeof question.prompt !== "string") errors.push("Prompt must be a non-empty string.");
  if (question.answer === "" || question.answer === null || question.answer === undefined) errors.push("Missing answer.");
  if (!question.explanation || typeof question.explanation !== "string") errors.push("Missing explanation.");
  if (question.questionType === "multiple-choice" && (!Array.isArray(question.choices) || question.choices.length !== 4)) errors.push("Multiple-choice questions must contain exactly four choices.");
  if (question.figure && !SAT_FIGURE_TYPES.includes(question.figure.type)) errors.push(`Unsupported figure type: ${question.figure.type}`);
  if (question.timingMode === "timed" && question.estimatedTimeSeconds == null) errors.push("Timed questions require estimatedTimeSeconds.");
  if (question.timingMode === "non-timed" && question.timeoutSeconds != null) errors.push("Non-timed questions must not have a hard timeout.");
  return { valid: errors.length === 0, errors };
}

export const createFigureSpec = ({ type, ariaLabel = "", title = "", data = {} }) => ({ type, ariaLabel, title, data });

export default {
  SAT_DIFFICULTIES, SAT_SECTIONS, SAT_MODULES, SAT_RW_DOMAINS, SAT_MATH_DOMAINS, SAT_QUESTION_TYPES,
  SAT_ASSESSMENT_FAMILIES, SAT_ASSESSMENT_VARIANTS, SAT_PROGRESSION_BANDS, SAT_COGNITIVE_DEMANDS,
  SAT_INTERACTION_TYPES, SAT_STIMULUS_TYPES, SAT_CALCULATOR_MODES, SAT_STATUS_LABELS, SAT_FIGURE_TYPES,
  createEmptyQuestion, validateSatQuestion, createFigureSpec,
};
