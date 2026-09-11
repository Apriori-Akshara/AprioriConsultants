/**
 * Canonical SAT Foundation content schema.
 *
 * Foundation is a standalone learning product. Its content IDs, progress,
 * and activity model must not be coupled to SAT Mock Test IDs or attempts.
 */

export const FOUNDATION_PRODUCT = "sat";
export const FOUNDATION_COURSE = "foundation";

export const FOUNDATION_SUBJECTS = ["verbal", "math"];
export const FOUNDATION_LEVELS = ["easy", "medium", "hard"];

export const FOUNDATION_ACTIVITY_TYPES = [
  "lesson",
  "assignment",
  "timed-drill",
  "non-timed-drill",
  "topic-exercise",
  "section-test",
  "practice-test",
];

export const FOUNDATION_STATUSES = [
  "draft",
  "review",
  "published",
  "archived",
];

export const createEmptyFoundationActivity = () => ({
  activityId: "",
  product: FOUNDATION_PRODUCT,
  course: FOUNDATION_COURSE,

  subject: "",
  level: "medium",
  activityType: "topic-exercise",

  title: "",
  description: "",

  topic: "",
  domain: "",
  skill: "",
  conceptId: "",

  questionIds: [],
  lessonContentId: null,

  estimatedTimeMinutes: null,
  status: "draft",

  sourceType: "apriori-original",
  legacySourceIds: [],

  metadata: {
    prerequisiteActivityIds: [],
    tags: [],
    explanationMode: "foundation",
  },
});

export function validateFoundationActivity(activity) {
  const errors = [];

  if (!activity || typeof activity !== "object") {
    return { valid: false, errors: ["Activity must be an object."] };
  }

  if (!activity.activityId) errors.push("Missing activityId.");
  if (activity.product !== FOUNDATION_PRODUCT) {
    errors.push(`Invalid product: ${activity.product}`);
  }
  if (activity.course !== FOUNDATION_COURSE) {
    errors.push(`Invalid course: ${activity.course}`);
  }
  if (!FOUNDATION_SUBJECTS.includes(activity.subject)) {
    errors.push(`Invalid subject: ${activity.subject}`);
  }
  if (!FOUNDATION_LEVELS.includes(activity.level)) {
    errors.push(`Invalid level: ${activity.level}`);
  }
  if (!FOUNDATION_ACTIVITY_TYPES.includes(activity.activityType)) {
    errors.push(`Invalid activityType: ${activity.activityType}`);
  }
  if (!activity.title) errors.push("Missing title.");
  if (!FOUNDATION_STATUSES.includes(activity.status)) {
    errors.push(`Invalid status: ${activity.status}`);
  }

  return { valid: errors.length === 0, errors };
}

export default {
  FOUNDATION_PRODUCT,
  FOUNDATION_COURSE,
  FOUNDATION_SUBJECTS,
  FOUNDATION_LEVELS,
  FOUNDATION_ACTIVITY_TYPES,
  FOUNDATION_STATUSES,
  createEmptyFoundationActivity,
  validateFoundationActivity,
};
