/**
 * Central configuration for the Apriori Digital SAT 10-Day Mock Program.
 *
 * IMPORTANT:
 * - This configuration describes the testing architecture.
 * - It does NOT contain question content.
 * - Future test content should live in dedicated SAT data files.
 * - Keep these settings centralized so the adaptive/scoring engine can be
 *   calibrated later without rewriting React components.
 */

export const SAT_PROGRAM_VERSION = "1.0.0";

export const SAT_PROGRAM_CONFIG = {
  programId: "apriori-digital-sat-10-day",
  displayName: "Apriori Digital SAT 10-Day Mock Program",
  shortName: "Apriori SAT 10-Day Program",

  status: "development",

  /**
   * This is a practice score estimate, not an official College Board score.
   * Future scoring work will calibrate the conversion model centrally.
   */
  scoring: {
    scoreType: "estimated-sat-score",
    sectionMinimum: 200,
    sectionMaximum: 800,
    totalMinimum: 400,
    totalMaximum: 1600,

    /**
     * These values are deliberately placeholders for Day 1.
     * Day 5 and Day 7 will replace/extend them with a tested model.
     */
    provisional: {
      useIRTInspiredModel: true,
      confidenceRangeEnabled: true,
      scoreBandWidth: 40,
    },
  },

  sections: {
    readingAndWriting: {
      id: "reading-writing",
      displayName: "Reading and Writing",
      shortName: "R&W",
      modules: [
        {
          id: "rw-module-1",
          displayName: "Reading and Writing — Module 1",
          durationMinutes: 32,
          questionCount: 27,
          adaptive: false,
        },
        {
          id: "rw-module-2",
          displayName: "Reading and Writing — Module 2",
          durationMinutes: 32,
          questionCount: 27,
          adaptive: true,

          /**
           * Day 5 will populate the appropriate pool using Module 1 results.
           */
          adaptivePools: {
            high: "rw-module-2-high",
            standard: "rw-module-2-standard",
            low: "rw-module-2-low",
          },
        },
      ],
      domains: [
        {
          id: "information-and-ideas",
          displayName: "Information and Ideas",
        },
        {
          id: "craft-and-structure",
          displayName: "Craft and Structure",
        },
        {
          id: "expression-of-ideas",
          displayName: "Expression of Ideas",
        },
        {
          id: "standard-english-conventions",
          displayName: "Standard English Conventions",
        },
      ],
    },

    math: {
      id: "math",
      displayName: "Math",
      shortName: "Math",
      modules: [
        {
          id: "math-module-1",
          displayName: "Math — Module 1",
          durationMinutes: 35,
          questionCount: 22,
          adaptive: false,
        },
        {
          id: "math-module-2",
          displayName: "Math — Module 2",
          durationMinutes: 35,
          questionCount: 22,
          adaptive: true,

          adaptivePools: {
            high: "math-module-2-high",
            standard: "math-module-2-standard",
            low: "math-module-2-low",
          },
        },
      ],
      domains: [
        {
          id: "algebra",
          displayName: "Algebra",
        },
        {
          id: "advanced-math",
          displayName: "Advanced Math",
        },
        {
          id: "problem-solving-and-data-analysis",
          displayName: "Problem-Solving and Data Analysis",
        },
        {
          id: "geometry-and-trigonometry",
          displayName: "Geometry and Trigonometry",
        },
      ],
    },
  },

  break: {
    afterSectionId: "reading-writing",
    durationMinutes: 10,
    skippable: true,
    autoStartNextSection: false,
  },

  /**
   * The program is intended to provide one mock per day.
   * Release logic itself will be implemented later so that authentication,
   * server validation and student-specific timing cannot be bypassed.
   */
  release: {
    mode: "one-test-per-day",
    testCount: 10,
    firstDayNumber: 1,
    allowFuturePreviewForAdminOnly: true,
    allowStudentEarlyAccess: false,
  },

  /**
   * These are the eight main SAT content domains represented by the program.
   */
  domainIds: [
    "information-and-ideas",
    "craft-and-structure",
    "expression-of-ideas",
    "standard-english-conventions",
    "algebra",
    "advanced-math",
    "problem-solving-and-data-analysis",
    "geometry-and-trigonometry",
  ],

  /**
   * Global rules for the content system.
   */
  contentRules: {
    originalContentOnly: true,
    allowConceptRepetition: true,
    allowQuestionRepetition: false,
    allowPassageRepetition: false,
    allowFigureRepetition: false,
    allowTrivialNumberSubstitution: false,

    validateAnswerBeforePublish: true,
    validateExplanationBeforePublish: true,
    validateFiguresBeforePublish: true,
    validateOriginalityBeforePublish: true,
  },

  /**
   * Future report capabilities.
   */
  reporting: {
    includeTotalScore: true,
    includeSectionScores: true,
    includeScoreRange: true,
    includeAdaptivePath: true,
    includeDomainAnalysis: true,
    includeSkillAnalysis: true,
    includeDifficultyAnalysis: true,
    includeTimeAnalysis: true,
    includeQuestionReview: true,
    includeLikelyErrorTypes: true,
    includeRecommendations: true,
    includeTestHistory: true,
    includeTargetScoreAnalysis: true,
  },

  /**
   * Future figure-rendering system.
   * Actual rendering components will be implemented later.
   */
  figures: {
    engine: "svg-structured",
    accessibilityDescriptionsRequired: true,

    supportedTypes: [
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
    ],
  },

  /**
   * The real test has reference information available during Math.
   * We describe our future UX here rather than copying official wording.
   */
  mathReference: {
    enabled: true,
    accessibleDuringMathModules: true,
    previewBeforeTest: true,

    /**
     * The actual visual reference sheet will be implemented later.
     */
    supportedTopics: [
      "circle",
      "rectangle",
      "triangle",
      "right-triangle",
      "rectangular-prism",
      "cylinder",
      "sphere",
      "coordinate-geometry",
    ],
  },
};

export default SAT_PROGRAM_CONFIG;
