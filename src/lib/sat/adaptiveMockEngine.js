import { PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT } from "../../data/sat/mockContent";

const MOCKS = {
  PSAT1: {
    id: "PSAT1",
    label: "PSAT/NMSQT Mock 01",
    assessmentVariant: "psat-nmsqt",
    content: PSAT_MOCK_01_CONTENT,
    sectionMinutes: {
      "reading-writing": 32,
      math: 35,
    },
  },
  SAT1: {
    id: "SAT1",
    label: "SAT Mock 01 — Series A",
    assessmentVariant: "sat",
    content: SAT_MOCK_01_CONTENT,
    sectionMinutes: {
      "reading-writing": 32,
      math: 35,
    },
  },
};

const ROUTES = ["standard", "high", "low"];

function routeForQuestion(question, fallbackIndex) {
  return question.adaptiveRoute || ROUTES[fallbackIndex % ROUTES.length];
}

function getQuestionPool(questions, route) {
  const explicit = questions.filter((question, index) => routeForQuestion(question, index) === route);
  return explicit.length >= 8 ? explicit : questions;
}

function moduleQuestions(content, section, module) {
  return content.questions.records.filter(
    (question) => question.section === section && question.module === module
  );
}

function selectByRoute(questions, route, count) {
  const pool = getQuestionPool(questions, route);
  return pool.slice(0, count);
}

export function getMockDefinition(testKey) {
  return MOCKS[testKey] || null;
}

export function normalizeMockKey(value) {
  const normalized = String(value || "").trim().toUpperCase();
  if (normalized === "PSAT1" || normalized === "PSAT-1" || normalized === "PSAT01") return "PSAT1";
  if (normalized === "SAT1" || normalized === "SAT-1" || normalized === "SAT01" || normalized === "TEST1") return "SAT1";
  return null;
}

export function createAdaptivePlan(testKey) {
  const mock = getMockDefinition(normalizeMockKey(testKey));
  if (!mock) return null;

  const rw1 = moduleQuestions(mock.content, "reading-writing", "module-1");
  const rw2 = moduleQuestions(mock.content, "reading-writing", "module-2");
  const math1 = moduleQuestions(mock.content, "math", "module-1");
  const math2 = moduleQuestions(mock.content, "math", "module-2");

  return {
    version: 1,
    testKey: mock.id,
    label: mock.label,
    sections: [
      {
        key: "reading-writing",
        label: "Reading and Writing",
        modules: [
          { key: "module-1", minutes: mock.sectionMinutes["reading-writing"], questions: rw1 },
          { key: "module-2-standard", minutes: mock.sectionMinutes["reading-writing"], route: "standard", questions: selectByRoute(rw2, "standard", 27) },
          { key: "module-2-high", minutes: mock.sectionMinutes["reading-writing"], route: "high", questions: selectByRoute(rw2, "high", 27) },
          { key: "module-2-low", minutes: mock.sectionMinutes["reading-writing"], route: "low", questions: selectByRoute(rw2, "low", 27) },
        ],
      },
      {
        key: "math",
        label: "Math",
        modules: [
          { key: "module-1", minutes: mock.sectionMinutes.math, questions: math1 },
          { key: "module-2-standard", minutes: mock.sectionMinutes.math, route: "standard", questions: selectByRoute(math2, "standard", 22) },
          { key: "module-2-high", minutes: mock.sectionMinutes.math, route: "high", questions: selectByRoute(math2, "high", 22) },
          { key: "module-2-low", minutes: mock.sectionMinutes.math, route: "low", questions: selectByRoute(math2, "low", 22) },
        ],
      },
    ],
  };
}

export function scoreModule(questions, answers) {
  let correct = 0;
  let answered = 0;

  questions.forEach((question) => {
    const answer = answers?.[question.questionId];
    if (answer !== undefined && answer !== null && String(answer).trim() !== "") {
      answered += 1;
      if (String(answer).trim().toUpperCase() === String(question.answer).trim().toUpperCase()) {
        correct += 1;
      }
    }
  });

  const total = questions.length;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;

  return { correct, answered, total, accuracy };
}

export function chooseModule2Route(module1Questions, answers) {
  const result = scoreModule(module1Questions, answers);
  const ratio = result.total ? result.correct / result.total : 0;

  if (ratio >= 0.75) return "high";
  if (ratio <= 0.45) return "low";
  return "standard";
}

export function buildClientSafeTest(testKey) {
  const plan = createAdaptivePlan(testKey);
  if (!plan) return null;

  return {
    version: plan.version,
    testKey: plan.testKey,
    label: plan.label,
    sections: plan.sections.map((section) => ({
      ...section,
      modules: section.modules.map((module) => ({
        ...module,
        questions: module.questions.map((question) => ({
          questionId: question.questionId,
          section: question.section,
          module: question.module,
          domain: question.domain,
          skill: question.skill,
          difficulty: question.difficulty,
          difficultyBand: question.difficultyBand,
          questionType: question.questionType,
          stimulusType: question.stimulusType,
          calculatorMode: question.calculatorMode,
          calculatorRequired: question.calculatorRequired,
          referenceSheetRelevant: question.referenceSheetRelevant,
          prompt: question.prompt,
          choices: question.choices,
          answer: question.answer,
          explanation: question.explanation,
        })),
      })),
    })),
  };
}

export function flattenModule(module) {
  return module?.questions || [];
}

export default {
  normalizeMockKey,
  getMockDefinition,
  createAdaptivePlan,
  buildClientSafeTest,
  scoreModule,
  chooseModule2Route,
  flattenModule,
};
