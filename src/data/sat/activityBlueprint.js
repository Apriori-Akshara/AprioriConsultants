/**
 * SAT Foundation/Advanced exercise and drill blueprint.
 *
 * This is configuration only. The master content-quality document remains the
 * source of truth for content quality and publication.
 */

export const SAT_ACTIVITY_BLUEPRINT = {
  foundation: {
    setsPerActivity: 5,
    questionsPerSet: 10,
    totalQuestions: 50,
    progressionBands: [
      "foundation-set-01",
      "foundation-set-02",
      "foundation-set-03",
      "foundation-set-04",
      "foundation-set-05",
    ],
    majorDifficultyJumpAfterEverySet: true,
  },

  advanced: {
    setsPerActivity: 10,
    questionsPerSet: 20,
    totalQuestions: 200,
    progressionBands: Array.from(
      { length: 10 },
      (_, index) => `advanced-set-${String(index + 1).padStart(2, "0")}`
    ),
    majorDifficultyJumpAfterEverySet: true,
  },

  timing: {
    modes: ["timed", "non-timed"],
    readingWritingAverageSecondsPerQuestion: 64 * 60 / 54,
    mathAverageSecondsPerQuestion: 70 * 60 / 44,
    timedHardStop: true,
    nonTimedHardStop: false,
    nonTimedRecordsElapsedTime: true,
  },
};

export const getActivityTimeoutSeconds = ({
  section,
  questionCount,
  timingMode,
}) => {
  if (timingMode !== "timed") return null;

  const secondsPerQuestion =
    section === "math"
      ? SAT_ACTIVITY_BLUEPRINT.timing.mathAverageSecondsPerQuestion
      : SAT_ACTIVITY_BLUEPRINT.timing.readingWritingAverageSecondsPerQuestion;

  return Math.ceil(secondsPerQuestion * questionCount);
};

export default SAT_ACTIVITY_BLUEPRINT;
