/**
 * Mock 1 production blueprint.
 *
 * Configuration only: no question text is stored here.
 * This blueprint is the contract used before Mock 1 content generation.
 * It is deliberately independent from the shared test-taking engine.
 */

export const MOCK_01_BLUEPRINT = {
  testId: "sat-mock-01",
  assessmentFamily: "sat",
  assessmentVariant: "sat-series-a",
  assessmentNumber: 1,
  title: "Apriori SAT Mock Test 1",
  contentStatus: "blueprint-approved",
  sourceType: "apriori-original",

  objective: {
    purpose: "First production-proof mock for the shared 20-mock PSAT/SAT-style system.",
    priority: "Validate the complete content-generation, originality-QC, adaptive, scoring, reporting and student-experience pipeline before replication.",
    originalityRule: "Every passage, question, answer choice, explanation, figure and data construction must be original Apriori content.",
  },

  structure: {
    totalOperationalQuestions: 98,
    sections: {
      readingWriting: {
        questionCount: 54,
        durationMinutes: 64,
        modules: [
          {
            id: "rw-module-1",
            questionCount: 27,
            durationMinutes: 32,
            adaptive: false,
            difficultyMix: { easy: 8, medium: 13, hard: 6 },
          },
          {
            id: "rw-module-2",
            questionCount: 27,
            durationMinutes: 32,
            adaptive: true,
            routePools: ["high", "standard", "low"],
          },
        ],
      },
      math: {
        questionCount: 44,
        durationMinutes: 70,
        modules: [
          {
            id: "math-module-1",
            questionCount: 22,
            durationMinutes: 35,
            adaptive: false,
            difficultyMix: { easy: 7, medium: 10, hard: 5 },
            studentProducedResponseCount: 4,
          },
          {
            id: "math-module-2",
            questionCount: 22,
            durationMinutes: 35,
            adaptive: true,
            routePools: ["high", "standard", "low"],
            studentProducedResponseCount: 5,
          },
        ],
      },
    },
    break: {
      durationMinutes: 10,
      afterSection: "reading-writing",
    },
  },

  contentInventory: {
    // Module 1 questions are presented to every student.
    rwModule1: {
      total: 27,
      domains: {
        "information-and-ideas": 7,
        "craft-and-structure": 7,
        "expression-of-ideas": 7,
        "standard-english-conventions": 6,
      },
      stimulusPlan: {
        shortPassage: 17,
        notes: 4,
        pairedPassage: 3,
        none: 3,
      },
    },

    // Three complete alternative Module 2 pools are required so the server can
    // select one route without exposing unused premium content to the browser.
    rwModule2: {
      poolCount: 3,
      questionsPerPool: 27,
      totalCandidateQuestions: 81,
      domainsPerPool: {
        "information-and-ideas": 7,
        "craft-and-structure": 7,
        "expression-of-ideas": 7,
        "standard-english-conventions": 6,
      },
      routeDifficultyProfiles: {
        high: { easy: 3, medium: 10, hard: 14 },
        standard: { easy: 7, medium: 14, hard: 6 },
        low: { easy: 13, medium: 11, hard: 3 },
      },
      stimulusRule: "Use varied original short passages, notes and limited paired-text constructions; do not reuse a stimulus across pools.",
    },

    mathModule1: {
      total: 22,
      domains: {
        algebra: 5,
        "advanced-math": 6,
        "problem-solving-and-data-analysis": 6,
        "geometry-and-trigonometry": 5,
      },
      difficultyMix: { easy: 7, medium: 10, hard: 5 },
      questionTypeMix: {
        "multiple-choice": 18,
        "student-produced-response": 4,
      },
      figureTarget: 7,
      calculatorPolicy: "Mix calculator-eligible and non-calculator-dependent reasoning; calculator eligibility must be explicit in metadata.",
    },

    mathModule2: {
      poolCount: 3,
      questionsPerPool: 22,
      totalCandidateQuestions: 66,
      domainsPerPool: {
        algebra: 5,
        "advanced-math": 6,
        "problem-solving-and-data-analysis": 6,
        "geometry-and-trigonometry": 5,
      },
      routeDifficultyProfiles: {
        high: { easy: 2, medium: 8, hard: 12 },
        standard: { easy: 6, medium: 11, hard: 5 },
        low: { easy: 11, medium: 9, hard: 2 },
      },
      questionTypeMixPerPool: {
        "multiple-choice": 17,
        "student-produced-response": 5,
      },
      figureTargetPerPool: 7,
      calculatorPolicy: "Calculator eligibility is recorded per question; no route may depend on a calculator being required for a specific device or browser.",
    },

    candidateInventoryTotal: 245,
  },

  writingAndContentRules: {
    readingWriting: {
      originalPassagesRequired: true,
      repeatedPassageAllowed: false,
      repeatedQuestionAllowed: false,
      nearDuplicateAllowed: false,
      domainsMustBeBalancedAcrossModules: true,
      questionFocuses: [
        "central ideas and details",
        "inferences",
        "command of evidence",
        "words in context",
        "text structure and purpose",
        "cross-text connections",
        "rhetorical synthesis",
        "transitions",
        "boundaries",
        "form structure and sense",
      ],
    },
    math: {
      repeatedQuestionAllowed: false,
      trivialNumberSubstitutionAllowed: false,
      repeatedConstructionAllowed: false,
      repeatedFigureDataAllowed: false,
      repeatedGraphTableConstructionAllowed: false,
      figuresMustBeStructured: true,
      figureAccessibilityRequired: true,
    },
  },

  adaptiveRouting: {
    sectionIndependent: true,
    module1DeterminesModule2: true,
    routeLabels: ["high", "standard", "low"],
    routeDecisionSource: "server-side Module 1 performance using the shared Stage 3 adaptive service.",
    calibration: "Do not claim College Board scoring or proprietary thresholds. Use Apriori's centrally calibrated provisional model.",
    routePoolIntegrity: "Every selected route must contain a complete valid 27-question R&W pool or 22-question Math pool before publication.",
  },

  questionMetadataRequirements: [
    "questionId",
    "testId",
    "section",
    "module",
    "domain",
    "skill",
    "conceptId",
    "difficulty",
    "difficultyBand",
    "cognitiveDemand",
    "questionType",
    "stimulusType",
    "interactionType",
    "estimatedTimeSeconds",
    "calculatorEligibility",
    "calculatorMode",
    "referenceSheetRelevant",
    "passageId",
    "prompt",
    "choices",
    "answer",
    "explanation",
    "figure",
    "originalityFingerprint",
    "conceptFingerprint",
    "sourceType",
    "authoringStatus",
    "status",
    "releaseEligibility",
  ],

  qualityGates: {
    structural: [
      "exact question and module counts",
      "unique question IDs",
      "valid schema for every record",
      "valid domain/skill/concept metadata",
      "valid answer keys",
      "exactly four choices for multiple-choice items",
      "valid adaptive route pools",
      "valid figure references",
    ],
    originality: [
      "no exact duplicate question",
      "no repeated R&W passage or context",
      "no near-duplicate R&W construction",
      "no repeated Math construction",
      "no trivial numerical substitution",
      "no repeated figure/data construction",
      "collision check against every previously completed mock",
    ],
    content: [
      "independent answer verification",
      "explanation verification",
      "mathematical verification",
      "figure/data verification",
      "answer-choice plausibility review",
      "difficulty and skill alignment review",
      "accessibility review",
    ],
    release: "All applicable quality gates must pass before a question or pool becomes assembly-ready.",
  },

  productionOrder: [
    "blueprint-approved",
    "generate-module-1-content",
    "generate-complete-adaptive-pools",
    "run-structural-qc",
    "run-originality-qc-against-library",
    "run-content-and-answer-qc",
    "run-figure-qc",
    "integrate-with-shared-adaptive-engine",
    "test-complete-student-flow",
    "integrate-scoring-and-reporting",
    "polish-ui-ux",
    "deploy",
    "verify",
    "mark-mock-complete",
  ],
};

export default MOCK_01_BLUEPRINT;
