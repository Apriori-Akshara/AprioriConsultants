/**
 * Canonical student SAT attempt schema.
 *
 * Day 1 defines the data contract.
 * Persistent storage and secure server handling will be implemented later.
 */

export const ATTEMPT_STATUSES = [
  "not-started",
  "in-progress",
  "completed",
  "abandoned",
];

export const MODULE_STATUSES = [
  "locked",
  "available",
  "in-progress",
  "completed",
];

export const ADAPTIVE_ROUTES = [
  "high",
  "standard",
  "low",
  null,
];

export const createModuleAttempt = ({
  moduleId,
  questionIds = [],
}) => ({
  moduleId,

  status: "locked",

  startedAt: null,
  completedAt: null,

  questionIds,

  route: null,

  responses: {},

  questionMetrics: {},

  summary: {
    attempted: 0,
    correct: 0,
    incorrect: 0,
    skipped: 0,
    flagged: 0,

    averageTimeSeconds: null,
    totalTimeSeconds: 0,
  },
});

export const createSatAttempt = ({
  attemptId,
  userId,
  testId,
}) => ({
  attemptId,
  userId,
  testId,

  programId: "apriori-digital-sat-10-day",

  status: "not-started",

  createdAt: new Date().toISOString(),

  startedAt: null,
  completedAt: null,

  currentSection: "reading-writing",
  currentModule: "rw-module-1",

  modules: {
    rwModule1: createModuleAttempt({
      moduleId: "rw-module-1",
    }),

    rwModule2: createModuleAttempt({
      moduleId: "rw-module-2",
    }),

    mathModule1: createModuleAttempt({
      moduleId: "math-module-1",
    }),

    mathModule2: createModuleAttempt({
      moduleId: "math-module-2",
    }),
  },

  adaptive: {
    readingAndWriting: {
      module1AbilityEstimate: null,
      selectedModule2Route: null,
      selectionReason: null,
    },

    math: {
      module1AbilityEstimate: null,
      selectedModule2Route: null,
      selectionReason: null,
    },
  },

  scoring: {
    estimatedReadingAndWriting: null,
    estimatedMath: null,
    estimatedTotal: null,

    readingAndWritingRange: null,
    mathRange: null,
    totalRange: null,

    methodologyVersion: "provisional",
  },

  report: {
    domainPerformance: {},
    skillPerformance: {},
    difficultyPerformance: {},
    timingAnalysis: {},
    errorAnalysis: {},
    recommendations: [],
  },

  integrity: {
    questionOrderLocked: false,
    adaptiveRouteLocked: false,
    submissionFinalized: false,
  },
});

export const validateSatAttempt = (attempt) => {
  const errors = [];

  if (!attempt || typeof attempt !== "object") {
    return {
      valid: false,
      errors: ["Attempt must be an object."],
    };
  }

  if (!attempt.attemptId) {
    errors.push("Missing attemptId.");
  }

  if (!attempt.userId) {
    errors.push("Missing userId.");
  }

  if (!attempt.testId) {
    errors.push("Missing testId.");
  }

  if (!ATTEMPT_STATUSES.includes(attempt.status)) {
    errors.push(`Invalid attempt status: ${attempt.status}`);
  }

  if (!attempt.modules || typeof attempt.modules !== "object") {
    errors.push("Missing modules.");
  }

  if (!attempt.adaptive || typeof attempt.adaptive !== "object") {
    errors.push("Missing adaptive state.");
  }

  if (!attempt.scoring || typeof attempt.scoring !== "object") {
    errors.push("Missing scoring state.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export default {
  ATTEMPT_STATUSES,
  MODULE_STATUSES,
  ADAPTIVE_ROUTES,
  createModuleAttempt,
  createSatAttempt,
  validateSatAttempt,
};
