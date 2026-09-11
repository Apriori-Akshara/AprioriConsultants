import {
  SAT_ASSESSMENT_FAMILIES,
  SAT_ASSESSMENT_VARIANTS,
  SAT_CALCULATOR_MODES,
  SAT_COGNITIVE_DEMANDS,
  SAT_DIFFICULTIES,
  SAT_INTERACTION_TYPES,
  SAT_MODULES,
  SAT_PROGRESSION_BANDS,
  SAT_QUESTION_TYPES,
  SAT_SECTIONS,
  SAT_STATUS_LABELS,
  SAT_STIMULUS_TYPES,
} from "../../data/sat/questionSchema";
import { SAT_ACTIVITY_BLUEPRINT } from "../../data/sat/activityBlueprint";
import { getAssessmentConfig } from "../../data/sat/assessmentCatalog";

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

  if (record.assessmentFamily && !SAT_ASSESSMENT_FAMILIES.includes(record.assessmentFamily)) {
    errors.push(`Invalid assessmentFamily: ${record.assessmentFamily}`);
  }

  if (record.assessmentVariant && !SAT_ASSESSMENT_VARIANTS.includes(record.assessmentVariant)) {
    errors.push(`Invalid assessmentVariant: ${record.assessmentVariant}`);
  }

  if (record.section && !SAT_SECTIONS.includes(record.section)) {
    errors.push(`Invalid section: ${record.section}`);
  }

  if (record.module && !SAT_MODULES.includes(record.module)) {
    errors.push(`Invalid module: ${record.module}`);
  }

  if (record.difficulty && !SAT_DIFFICULTIES.includes(record.difficulty)) {
    errors.push(`Invalid difficulty: ${record.difficulty}`);
  }

  if (record.difficultyBand && !SAT_PROGRESSION_BANDS.includes(record.difficultyBand)) {
    errors.push(`Invalid difficultyBand: ${record.difficultyBand}`);
  }

  if (record.questionType && !SAT_QUESTION_TYPES.includes(record.questionType)) {
    errors.push(`Invalid questionType: ${record.questionType}`);
  }

  if (record.stimulusType && !SAT_STIMULUS_TYPES.includes(record.stimulusType)) {
    errors.push(`Invalid stimulusType: ${record.stimulusType}`);
  }

  if (record.cognitiveDemand && !SAT_COGNITIVE_DEMANDS.includes(record.cognitiveDemand)) {
    errors.push(`Invalid cognitiveDemand: ${record.cognitiveDemand}`);
  }

  if (record.calculatorMode && !SAT_CALCULATOR_MODES.includes(record.calculatorMode)) {
    errors.push(`Invalid calculatorMode: ${record.calculatorMode}`);
  }

  if (record.interactionType && !SAT_INTERACTION_TYPES.includes(record.interactionType)) {
    errors.push(`Invalid interactionType: ${record.interactionType}`);
  }

  if (record.status && !SAT_STATUS_LABELS.includes(record.status)) {
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

  if (
    record.status === "published" ||
    record.status === "assembly-ready"
  ) {
    if (record.releaseEligibility !== true) {
      errors.push("Assembly-ready/published content must have releaseEligibility=true.");
    }
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
