/**
 * Canonical SAT question schema.
 *
 * This is the format all future question-generation prompts must produce.
 *
 * It is deliberately independent from the existing src/data/questions.json.
 * The current question file remains untouched during Day 1.
 */

export const SAT_DIFFICULTIES = ["easy", "medium", "hard"];

export const SAT_SECTIONS = ["reading-writing", "math"];

export const SAT_MODULES = [
  "rw-module-1",
  "rw-module-2",
  "math-module-1",
  "math-module-2",
];

export const SAT_RW_DOMAINS = [
  "information-and-ideas",
  "craft-and-structure",
  "expression-of-ideas",
  "standard-english-conventions",
];

export const SAT_MATH_DOMAINS = [
  "algebra",
  "advanced-math",
  "problem-solving-and-data-analysis",
  "geometry-and-trigonometry",
];

export const SAT_QUESTION_TYPES = [
  "multiple-choice",
  "student-produced-response",
];

export const SAT_FIGURE_TYPES = [
  "scatterplot",
  "line-graph",
  "bar-chart",
  "histogram",
  "table",
  "box-plot",
  "coordinate-plane",
  "number-line",
  "triangle",
  "right-triangle",
  "circle",
  "polygon",
  "composite-geometry",
  "angle-diagram",
  "quadratic-graph",
  "transformation",
];

export const createEmptyQuestion = () => ({
  questionId: "",
  testId: "",
  section: "",
  module: "",

  domain: "",
  skill: "",
  conceptId: "",

  difficulty: "medium",
  questionType: "multiple-choice",

  passageId: null,

  prompt: "",

  choices: [],

  answer: "",

  explanation: "",

  estimatedTimeSeconds: null,

  isOperational: true,

  figure: null,

  /**
   * Fingerprints are generated/validated before publication.
   * They are not intended for display to students.
   */
  originalityFingerprint: "",
  conceptFingerprint: "",

  /**
   * Future content-management fields.
   */
  tags: [],
  sourceType: "apriori-original",
  authoringStatus: "draft",

  /**
   * Optional structured data for future analytics.
   */
  metadata: {
    readingTopic: null,
    mathSubskill: null,
    passageGenre: null,
    rhetoricalPurpose: null,
    answerFormat: null,
  },
});

/**
 * Lightweight validation for the question object.
 *
 * This does not replace the much deeper content validation that will be added
 * later. It simply catches structural mistakes before content is published.
 */
export function validateSatQuestion(question) {
  const errors = [];

  if (!question || typeof question !== "object") {
    return {
      valid: false,
      errors: ["Question must be an object."],
    };
  }

  if (!question.questionId) {
    errors.push("Missing questionId.");
  }

  if (!question.testId) {
    errors.push("Missing testId.");
  }

  if (!SAT_SECTIONS.includes(question.section)) {
    errors.push(`Invalid section: ${question.section}`);
  }

  if (!SAT_MODULES.includes(question.module)) {
    errors.push(`Invalid module: ${question.module}`);
  }

  if (!SAT_DIFFICULTIES.includes(question.difficulty)) {
    errors.push(`Invalid difficulty: ${question.difficulty}`);
  }

  if (!SAT_QUESTION_TYPES.includes(question.questionType)) {
    errors.push(`Invalid questionType: ${question.questionType}`);
  }

  if (!question.domain) {
    errors.push("Missing domain.");
  }

  if (!question.skill) {
    errors.push("Missing skill.");
  }

  if (!question.conceptId) {
    errors.push("Missing conceptId.");
  }

  if (!question.prompt || typeof question.prompt !== "string") {
    errors.push("Prompt must be a non-empty string.");
  }

  if (!question.answer && question.answer !== 0) {
    errors.push("Missing answer.");
  }

  if (!question.explanation || typeof question.explanation !== "string") {
    errors.push("Missing explanation.");
  }

  if (!SAT_QUESTION_TYPES.includes(question.questionType)) {
    errors.push("Unsupported question type.");
  }

  if (
    question.questionType === "multiple-choice" &&
    (!Array.isArray(question.choices) || question.choices.length !== 4)
  ) {
    errors.push(
      "Multiple-choice questions must contain exactly four choices."
    );
  }

  if (
    question.figure &&
    !SAT_FIGURE_TYPES.includes(question.figure.type)
  ) {
    errors.push(`Unsupported figure type: ${question.figure.type}`);
  }

  if (question.isOperational !== true && question.isOperational !== false) {
    errors.push("isOperational must be true or false.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Future figure schema.
 *
 * Figures will be rendered from structured SVG data rather than copied
 * competitor/official images.
 */
export const createFigureSpec = ({
  type,
  ariaLabel = "",
  title = "",
  data = {},
}) => {
  return {
    type,
    ariaLabel,
    title,
    data,
  };
};

export default {
  SAT_DIFFICULTIES,
  SAT_SECTIONS,
  SAT_MODULES,
  SAT_RW_DOMAINS,
  SAT_MATH_DOMAINS,
  SAT_QUESTION_TYPES,
  SAT_FIGURE_TYPES,
  createEmptyQuestion,
  validateSatQuestion,
  createFigureSpec,
};
