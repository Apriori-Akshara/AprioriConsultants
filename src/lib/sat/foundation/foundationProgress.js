export const FOUNDATION_PROGRESS_STATUSES = [
  "not-started",
  "in-progress",
  "completed",
];

export const createEmptyFoundationProgress = () => ({
  overall: {
    completedActivities: 0,
    totalActivities: 0,
    completionPercent: 0,
  },

  subjects: {
    verbal: {
      completedActivities: 0,
      totalActivities: 0,
      completionPercent: 0,
    },
    math: {
      completedActivities: 0,
      totalActivities: 0,
      completionPercent: 0,
    },
  },

  levels: {
    easy: { completedActivities: 0, totalActivities: 0, completionPercent: 0 },
    medium: { completedActivities: 0, totalActivities: 0, completionPercent: 0 },
    hard: { completedActivities: 0, totalActivities: 0, completionPercent: 0 },
  },

  activityTypes: {
    lesson: { completed: 0, total: 0 },
    assignment: { completed: 0, total: 0 },
    "timed-drill": { completed: 0, total: 0 },
    "non-timed-drill": { completed: 0, total: 0 },
    "topic-exercise": { completed: 0, total: 0 },
    "section-test": { completed: 0, total: 0 },
    "practice-test": { completed: 0, total: 0 },
  },

  accuracy: {
    attemptedQuestions: 0,
    correctQuestions: 0,
    percent: 0,
  },

  recentActivity: [],
  recommendedNextActivityId: null,
});

export function calculateCompletionPercent(completed, total) {
  if (!total || total < 1) return 0;
  return Math.round((completed / total) * 100);
}

export function calculateAccuracyPercent(correct, attempted) {
  if (!attempted || attempted < 1) return 0;
  return Math.round((correct / attempted) * 100);
}

export default {
  FOUNDATION_PROGRESS_STATUSES,
  createEmptyFoundationProgress,
  calculateCompletionPercent,
  calculateAccuracyPercent,
};
