import { SAT_ASSESSMENT_CATALOG } from "./assessmentCatalog";
import { SAT_ACTIVITY_BLUEPRINT } from "./activityBlueprint";
import { PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT } from "./mockContent";
import { validateMockContent } from "./mockContent/mockContentQualityGate";

validateMockContent(PSAT_MOCK_01_CONTENT);
validateMockContent(SAT_MOCK_01_CONTENT);

export const SAT_CONTENT_BANK_VERSION = "1.2.0";

const STAGE_1_QUESTIONS = [
  ...PSAT_MOCK_01_CONTENT.readingWriting,
  ...PSAT_MOCK_01_CONTENT.math,
  ...SAT_MOCK_01_CONTENT.readingWriting,
  ...SAT_MOCK_01_CONTENT.math,
];

const allQuestionIds = new Set();
const allVerbalContexts = new Set();
const allVerbalPrompts = new Set();

for (const question of STAGE_1_QUESTIONS) {
  if (allQuestionIds.has(question.questionId)) {
    throw new Error(`Duplicate SAT/PSAT question ID across mocks: ${question.questionId}`);
  }
  allQuestionIds.add(question.questionId);

  if (question.section === "reading-writing") {
    const contextKey = String(question.metadata?.contextKey || "").trim().toLowerCase();
    const normalizedPrompt = String(question.prompt || "").trim().toLowerCase().replace(/\s+/g, " ");
    if (allVerbalContexts.has(contextKey)) {
      throw new Error(`Repeated verbal context across mocks: ${contextKey}`);
    }
    if (allVerbalPrompts.has(normalizedPrompt)) {
      throw new Error(`Repeated verbal question across mocks: ${question.questionId}`);
    }
    allVerbalContexts.add(contextKey);
    allVerbalPrompts.add(normalizedPrompt);
  }
}

if (STAGE_1_QUESTIONS.length !== 392) {
  throw new Error(`Stage 1 mock bank must contain 392 bank questions (196 per mock); found ${STAGE_1_QUESTIONS.length}`);
}

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
    crossMockVerbalContextCheckRequired: true,
    verbalAnswerLengthBalanceRequired: true,
    answerPositionBalanceRequired: true,
    explanationRequired: true,
    accessibilityReviewRequired: true,
    figureReviewRequiredWhenFigureExists: true,
    mathReviewRequiredForMath: true,
    calculatorReviewRequiredWhenCalculatorIsAllowed: true,
    adaptiveRoutePoolIntegrityRequired: true,
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
