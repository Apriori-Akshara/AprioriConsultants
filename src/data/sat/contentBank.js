import { SAT_ASSESSMENT_CATALOG } from "./assessmentCatalog";
import { SAT_ACTIVITY_BLUEPRINT } from "./activityBlueprint";

/**
 * Central SAT/PSAT content-bank manifest.
 *
 * This file is intentionally a manifest/index rather than a large content
 * payload. Individual question and lesson records can be added without
 * changing the assessment or application architecture.
 */

export const SAT_CONTENT_BANK_VERSION = "1.0.0";

export const SAT_CONTENT_BANK = {
  version: SAT_CONTENT_BANK_VERSION,

  assessmentCatalog: SAT_ASSESSMENT_CATALOG,

  activities: {
    foundation: SAT_ACTIVITY_BLUEPRINT.foundation,
    advanced: SAT_ACTIVITY_BLUEPRINT.advanced,
  },

  questions: {
    source: "apriori-original",
    storageMode: "modular-records",
    records: [],
  },

  passages: {
    records: [],
  },

  lessons: {
    source: "apriori-original",
    records: [],
  },

  mockManifests: {
    psat: [],
    satSeriesA: [],
    satSeriesB: [],
  },

  qualityGates: {
    originalityRequired: true,
    duplicateCheckRequired: true,
    explanationRequired: true,
    accessibilityReviewRequired: true,
    figureReviewRequiredWhenFigureExists: true,
    mathReviewRequiredForMath: true,
    calculatorReviewRequiredWhenCalculatorIsAllowed: true,
  },
};

export const getEmptyContentBankSummary = () => ({
  version: SAT_CONTENT_BANK_VERSION,
  questionCount: SAT_CONTENT_BANK.questions.records.length,
  passageCount: SAT_CONTENT_BANK.passages.records.length,
  lessonCount: SAT_CONTENT_BANK.lessons.records.length,
  psatMockCount: SAT_CONTENT_BANK.mockManifests.psat.length,
  satSeriesAMockCount: SAT_CONTENT_BANK.mockManifests.satSeriesA.length,
  satSeriesBMockCount: SAT_CONTENT_BANK.mockManifests.satSeriesB.length,
});

export default SAT_CONTENT_BANK;
