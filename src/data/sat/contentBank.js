import { SAT_ASSESSMENT_CATALOG } from "./assessmentCatalog";
import { SAT_ACTIVITY_BLUEPRINT } from "./activityBlueprint";
import { PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT } from "./mockContent";

/**
 * Central SAT/PSAT content-bank manifest.
 *
 * This remains a manifest/index. Question records are modular and the
 * assessment/application architecture does not depend on their physical file.
 */

export const SAT_CONTENT_BANK_VERSION = "1.1.0";

const STAGE_1_QUESTIONS = [
  ...PSAT_MOCK_01_CONTENT.readingWriting,
  ...PSAT_MOCK_01_CONTENT.math,
  ...SAT_MOCK_01_CONTENT.readingWriting,
  ...SAT_MOCK_01_CONTENT.math,
];

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
    records: STAGE_1_QUESTIONS,
  },
  passages: { records: [] },
  lessons: { source: "apriori-original", records: [] },
  mockManifests: {
    psat: [PSAT_MOCK_01_CONTENT],
    satSeriesA: [SAT_MOCK_01_CONTENT],
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

export const getContentBankSummary = () => ({
  version: SAT_CONTENT_BANK_VERSION,
  questionCount: SAT_CONTENT_BANK.questions.records.length,
  passageCount: SAT_CONTENT_BANK.passages.records.length,
  lessonCount: SAT_CONTENT_BANK.lessons.records.length,
  psatMockCount: SAT_CONTENT_BANK.mockManifests.psat.length,
  satSeriesAMockCount: SAT_CONTENT_BANK.mockManifests.satSeriesA.length,
  satSeriesBMockCount: SAT_CONTENT_BANK.mockManifests.satSeriesB.length,
});

export default SAT_CONTENT_BANK;
