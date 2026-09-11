import {
  FOUNDATION_ACTIVITY_TYPES,
  FOUNDATION_LEVELS,
  FOUNDATION_SUBJECTS,
} from "./foundationSchema";

/**
 * High-level SAT Foundation structure.
 *
 * This configuration defines the learning architecture only. It does not
 * contain SAT Mock Test content and does not grant Mock Test access.
 */

export const SAT_FOUNDATION_CONFIG = {
  product: "sat",
  course: "foundation",
  title: "SAT Foundation",

  subjects: FOUNDATION_SUBJECTS.map((subject) => ({
    id: subject,
    title: subject === "verbal" ? "Verbal" : "Math",
    levels: FOUNDATION_LEVELS.map((level) => ({
      id: level,
      activityTypes: FOUNDATION_ACTIVITY_TYPES,
    })),
  })),

  activityTypes: [
    {
      id: "lesson",
      title: "Lessons",
      description: "Concept instruction and worked examples.",
    },
    {
      id: "assignment",
      title: "Assignments",
      description: "Structured practice assigned after instruction.",
    },
    {
      id: "timed-drill",
      title: "Timed Drills",
      description: "Short, timed practice targeting specific skills.",
    },
    {
      id: "non-timed-drill",
      title: "Non-Timed Drills",
      description: "Accuracy-first practice without a countdown.",
    },
    {
      id: "topic-exercise",
      title: "Exercises (Topic wise)",
      description: "Skill- and concept-based question practice.",
    },
    {
      id: "section-test",
      title: "Section wise Tests",
      description: "Focused assessments for a SAT section.",
    },
    {
      id: "practice-test",
      title: "Practice Tests",
      description: "Foundation-level cumulative assessments.",
    },
  ],

  progress: {
    tracks: ["overall", "verbal", "math", "easy", "medium", "hard"],
    includeAccuracy: true,
    includeAttemptHistory: true,
    includeRecommendations: true,
    leaderboard: false,
  },
};

export default SAT_FOUNDATION_CONFIG;
