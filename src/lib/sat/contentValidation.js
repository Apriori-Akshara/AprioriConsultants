import { SAT_ACTIVITY_BLUEPRINT } from "../../data/sat/activityBlueprint";
import { getAssessmentConfig } from "../../data/sat/assessmentCatalog";

const ASSESSMENT_FAMILIES = ["psat", "sat"];
const ASSESSMENT_VARIANTS = ["psat-nmsqt", "sat-series-a", "sat-series-b"];
const DIFFICULTIES = ["easy", "medium", "hard"];
const SECTIONS = ["reading-writing", "math"];
const MODULES = [
  "rw-module-1",
  "rw-module-2-high",
  "rw-module-2-standard",
  "rw-module-2-low",
  "math-module-1",
  "math-module-2-high",
  "math-module-2-standard",
  "math-module-2-low",
];
const QUESTION_TYPES = ["multiple-choice", "student-produced-response"];
const STIMULUS_TYPES = [
  "single-short-passage",
  "paired-passages",
  "notes-bullets",
  "sentence-level",
  "equation",
  "table",
  "chart",
  "scatterplot",
  "line-graph",
  "bar-chart",
  "histogram",
  "box-plot",
  "coordinate-plane",
  "number-line",
  "geometry-diagram",
  "mixed-visual",
  "word-problem",
  "data-set",
  "other-approved",
];
const COGNITIVE_DEMANDS = ["recall-apply", "interpret", "analyze", "reason", "synthesize"];
const CALCULATOR_MODES = ["none", "scientific", "graphing", "either"];
const INTERACTION_TYPES = ["select-one", "enter-numeric"];
const STATUS_LABELS = [
  "draft",
  "author-review",
  "content-review",
  "subject-review",
  "qc-approved",
  "assembly-ready",
  "published",
  "retired",
];
const PROGRESSION_BANDS = [
  "foundation-set-01",
  "foundation-set-02",
  "foundation-set-03",
  "foundation-set-04",
  "foundation-set-05",
  "advanced-set-01",
  "advanced-set-02",
  "advanced-set-03",
  "advanced-set-04",
  "advanced-set-05",
  "advanced-set-06",
  "advanced-set-07",
  "advanced-set-08",
  "advanced-set-09",
  "advanced-set-10",
];

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

export function validateSatContentRecord(record) {
  const errors = [];

  if (!record || typeof record !== "object") {
    return { valid: false, errors: ["Content record must be an object."] };
  }

  if (!isNonEmptyString(record.contentId || record.questionId)) {
    errors.push("Missing contentId/questionId.");
  }

  if (!isNonEmptyString(record.product)) {
    errors.push("Missing product.");
  }

  if (record.assessmentFamily && !ASSESSMENT_FAMILIES.includes(record.assessmentFamily)) {
    errors.push(`Invalid assessmentFamily: ${record.assessmentFamily}`);
  }

  if (record.assessmentVariant && !ASSESSMENT_VARIANTS.includes(record.assessmentVariant)) {
    errors.push(`Invalid assessmentVariant: ${record.assessmentVariant}`);
  }

  if (record.section && !SECTIONS.includes(record.section)) {
    errors.push(`Invalid section: ${record.section}`);
  }

  if (record.module && !MODULES.includes(record.module)) {
    errors.push(`Invalid module: ${record.module}`);
  }

  if (record.difficulty && !DIFFICULTIES.includes(record.difficulty)) {
    errors.push(`Invalid difficulty: ${record.difficulty}`);
  }

  if (record.difficultyBand && !PROGRESSION_BANDS.includes(record.difficultyBand)) {
    errors.push(`Invalid difficultyBand: ${record.difficultyBand}`);
  }

  if (record.questionType && !QUESTION_TYPES.includes(record.questionType)) {
    errors.push(`Invalid questionType: ${record.questionType}`);
  }

  if (record.stimulusType && !STIMULUS_TYPES.includes(record.stimulusType)) {
    errors.push(`Invalid stimulusType: ${record.stimulusType}`);
  }

  if (record.cognitiveDemand && !COGNITIVE_DEMANDS.includes(record.cognitiveDemand)) {
    errors.push(`Invalid cognitiveDemand: ${record.cognitiveDemand}`);
  }

  if (record.calculatorMode && !CALCULATOR_MODES.includes(record.calculatorMode)) {
    errors.push(`Invalid calculatorMode: ${record.calculatorMode}`);
  }

  if (record.interactionType && !INTERACTION_TYPES.includes(record.interactionType)) {
    errors.push(`Invalid interactionType: ${record.interactionType}`);
  }

  if (record.status && !STATUS_LABELS.includes(record.status)) {
    errors.push(`Invalid status: ${record.status}`);
  }

  if (record.assessmentVariant) {
    const assessment = getAssessmentConfig(record.assessmentVariant);
    if (!assessment) {
      errors.push(`No assessment configuration found for ${record.assessmentVariant}.`);
    }
  }

  if (record.activityType === "foundation-exercise" || record.activityType === "foundation-drill") {
    if (record.setsPerActivity !== SAT_ACTIVITY_BLUEPRINT.foundation.setsPerActivity) {
      errors.push("Foundation activities must contain exactly 5 sets.");
    }
    if (record.questionsPerSet !== SAT_ACTIVITY_BLUEPRINT.foundation.questionsPerSet) {
      errors.push("Foundation activities must contain 10 questions per set.");
    }
    if (record.totalQuestions !== SAT_ACTIVITY_BLUEPRINT.foundation.totalQuestions) {
      errors.push("Foundation activities must contain exactly 50 questions.");
    }
  }

  if (record.activityType === "advanced-exercise" || record.activityType === "advanced-drill") {
    if (record.setsPerActivity !== SAT_ACTIVITY_BLUEPRINT.advanced.setsPerActivity) {
      errors.push("Advanced activities must contain exactly 10 sets.");
    }
    if (record.questionsPerSet !== SAT_ACTIVITY_BLUEPRINT.advanced.questionsPerSet) {
      errors.push("Advanced activities must contain 20 questions per set.");
    }
    if (record.totalQuestions !== SAT_ACTIVITY_BLUEPRINT.advanced.totalQuestions) {
      errors.push("Advanced activities must contain exactly 200 questions.");
    }
  }

  if (record.timingMode === "timed" && record.timeoutSeconds == null) {
    errors.push("Timed activities must define a timeoutSeconds value.");
  }

  if (record.timingMode === "non-timed" && record.timeoutSeconds != null) {
    errors.push("Non-timed activities must not have a hard timeout.");
  }

  if ((record.status === "published" || record.status === "assembly-ready") && record.releaseEligibility !== true) {
    errors.push("Assembly-ready/published content must have releaseEligibility=true.");
  }

  return { valid: errors.length === 0, errors };
}

export function validateActivityBlueprint(activity) {
  const errors = [];

  if (!activity || typeof activity !== "object") {
    return { valid: false, errors: ["Activity must be an object."] };
  }

  if (!activity.timingMode || !["timed", "non-timed"].includes(activity.timingMode)) {
    errors.push("Activity timingMode must be timed or non-timed.");
  }

  if (activity.progressionBands && !Array.isArray(activity.progressionBands)) {
    errors.push("progressionBands must be an array when provided.");
  }

  if (activity.majorDifficultyJumpAfterEverySet !== true) {
    errors.push("Activities must require a major difficulty jump after every set.");
  }

  return { valid: errors.length === 0, errors };
}

export default {
  validateSatContentRecord,
  validateActivityBlueprint,
};
