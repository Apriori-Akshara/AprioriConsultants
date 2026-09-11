import { SAT_ASSESSMENT_CATALOG } from "./assessmentCatalog";
import { SAT_ACTIVITY_BLUEPRINT } from "./activityBlueprint";
import { PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT, PSAT_MOCK_02_CONTENT, SAT_MOCK_02_CONTENT } from "./mockContent";
import { validateMockSeries } from "./mockContent/mockContentQualityGate";

validateMockSeries(PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT, PSAT_MOCK_02_CONTENT, SAT_MOCK_02_CONTENT);

export const SAT_CONTENT_BANK_VERSION = "1.4.0";

const STAGE_1_QUESTIONS = [
  ...PSAT_MOCK_01_CONTENT.readingWriting,
  ...PSAT_MOCK_01_CONTENT.math,
  ...SAT_MOCK_01_CONTENT.readingWriting,
  ...SAT_MOCK_01_CONTENT.math,
];

const STAGE_2_QUESTIONS = [
  ...PSAT_MOCK_02_CONTENT.readingWriting,
  ...PSAT_MOCK_02_CONTENT.math,
  ...SAT_MOCK_02_CONTENT.readingWriting,
  ...SAT_MOCK_02_CONTENT.math,
];

const ALL_QUESTIONS = [...STAGE_1_QUESTIONS, ...STAGE_2_QUESTIONS];
const allQuestionIds = new Set();
const allVerbalContexts = new Set();
const allVerbalPrompts = new Set();
const allMathApplications = new Set();

for (const question of ALL_QUESTIONS) {
  if (allQuestionIds.has(question.questionId)) throw new Error(`Duplicate SAT/PSAT question ID across mocks: ${question.questionId}`);
  allQuestionIds.add(question.questionId);

  if (question.section === "reading-writing") {
    const contextKey = String(question.metadata?.contextKey || "").trim().toLowerCase();
    const normalizedPrompt = String(question.prompt || "").trim().toLowerCase().replace(/\s+/g, " ");
    if (allVerbalContexts.has(contextKey)) throw new Error(`Repeated verbal context across mocks: ${contextKey}`);
    if (allVerbalPrompts.has(normalizedPrompt)) throw new Error(`Repeated verbal question across mocks: ${question.questionId}`);
    allVerbalContexts.add(contextKey);
    allVerbalPrompts.add(normalizedPrompt);
  }

  if (question.section === "math") {
    const application = String(question.metadata?.applicationFingerprint || "").trim().toLowerCase();
    if (allMathApplications.has(application)) throw new Error(`Repeated Math application across mocks: ${application}`);
    allMathApplications.add(application);
  }
}

if (STAGE_1_QUESTIONS.length !== 392) throw new Error(`Stage 1 mock bank must contain 392 bank questions (196 per mock); found ${STAGE_1_QUESTIONS.length}`);
if (STAGE_2_QUESTIONS.length !== 392) throw new Error(`Stage 2 mock bank must contain 392 bank questions (196 per mock); found ${STAGE_2_QUESTIONS.length}`);
if (ALL_QUESTIONS.length !== 784) throw new Error(`Four calibrated mocks must contain 784 bank questions; found ${ALL_QUESTIONS.length}`);

export const SAT_CONTENT_BANK = {
  version: SAT_CONTENT_BANK_VERSION,
  assessmentCatalog: SAT_ASSESSMENT_CATALOG,
  activities: { foundation: SAT_ACTIVITY_BLUEPRINT.foundation, advanced: SAT_ACTIVITY_BLUEPRINT.advanced },
  questions: { source: "apriori-original", storageMode: "modular-records", records: ALL_QUESTIONS },
  passages: { records: [] },
  lessons: { source: "apriori-original", records: [] },
  mockManifests: {
    psat: [PSAT_MOCK_01_CONTENT, PSAT_MOCK_02_CONTENT],
    satSeriesA: [SAT_MOCK_01_CONTENT, SAT_MOCK_02_CONTENT],
    satSeriesB: [],
  },
  qualityGates: {
    originalityRequired: true,
    duplicateCheckRequired: true,
    crossMockVerbalContextCheckRequired: true,
    crossMockMathApplicationCheckRequired: true,
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
