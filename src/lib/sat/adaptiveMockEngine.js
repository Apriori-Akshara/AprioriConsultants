import { PSAT_MOCK_01_CONTENT, SAT_MOCK_01_CONTENT, PSAT_MOCK_02_CONTENT, SAT_MOCK_02_CONTENT, PSAT_MOCK_03_CONTENT, SAT_MOCK_03_CONTENT } from "../../data/sat/mockContent";

const MOCKS = {
  PSAT1: { id: "PSAT1", label: "PSAT/NMSQT Mock 01", assessmentVariant: "psat-nmsqt", content: PSAT_MOCK_01_CONTENT, sectionMinutes: { "reading-writing": 32, math: 35 } },
  SAT1: { id: "SAT1", label: "SAT Mock 01 — Series A", assessmentVariant: "sat-series-a", content: SAT_MOCK_01_CONTENT, sectionMinutes: { "reading-writing": 32, math: 35 } },
  PSAT2: { id: "PSAT2", label: "PSAT/NMSQT Mock 02", assessmentVariant: "psat-nmsqt", content: PSAT_MOCK_02_CONTENT, sectionMinutes: { "reading-writing": 32, math: 35 } },
  SAT2: { id: "SAT2", label: "SAT Mock 02 — Series A", assessmentVariant: "sat-series-a", content: SAT_MOCK_02_CONTENT, sectionMinutes: { "reading-writing": 32, math: 35 } },
  PSAT3: { id: "PSAT3", label: "PSAT/NMSQT Mock 03", assessmentVariant: "psat-nmsqt", content: PSAT_MOCK_03_CONTENT, sectionMinutes: { "reading-writing": 32, math: 35 } },
  SAT3: { id: "SAT3", label: "SAT Mock 03 — Series A", assessmentVariant: "sat-series-a", content: SAT_MOCK_03_CONTENT, sectionMinutes: { "reading-writing": 32, math: 35 } },
};

function normalizeModuleKey(value) {
  const normalized = String(value || "").toLowerCase();
  return normalized.endsWith("module-1") ? "module-1" : normalized.endsWith("module-2") ? "module-2" : normalized;
}

function contentRecords(content) {
  return [...(content?.readingWriting || []), ...(content?.math || [])];
}

function moduleQuestions(content, section, module) {
  return contentRecords(content).filter((q) => q.section === section && normalizeModuleKey(q.module) === module);
}

function exactAdaptivePool(questions, route, count) {
  const pool = questions.filter((q) => q.adaptiveRoute === route);
  if (pool.length !== count) {
    throw new Error(`Adaptive pool integrity failure: expected ${count} ${route} questions, found ${pool.length}`);
  }
  return pool;
}

function validateQuestionRecords(mock, questions) {
  const seen = new Set();
  questions.forEach((question) => {
    if (!question?.questionId) throw new Error(`Question integrity failure in ${mock.id}: missing questionId`);
    if (seen.has(question.questionId)) throw new Error(`Question integrity failure in ${mock.id}: duplicate questionId ${question.questionId}`);
    seen.add(question.questionId);
    if (question.testId !== mock.id) throw new Error(`Question integrity failure in ${mock.id}: ${question.questionId} has mismatched testId`);
    if (!question.section || !question.module) throw new Error(`Question integrity failure in ${mock.id}: ${question.questionId} missing section/module`);
    if (question.prompt == null || String(question.prompt).trim() === "") throw new Error(`Question integrity failure in ${mock.id}: ${question.questionId} missing prompt`);
    if (question.answer == null || String(question.answer).trim() === "") throw new Error(`Question integrity failure in ${mock.id}: ${question.questionId} missing answer`);
    if (question.questionType === "multiple-choice") {
      if (!Array.isArray(question.choices) || question.choices.length !== 4) throw new Error(`Question integrity failure in ${mock.id}: ${question.questionId} must have four choices`);
      const uniqueChoices = new Set(question.choices.map((choice) => String(choice).trim().toLowerCase()));
      if (uniqueChoices.size !== 4) throw new Error(`Question integrity failure in ${mock.id}: ${question.questionId} has duplicate choices`);
      const answer = String(question.answer).trim().toUpperCase();
      if (/^[A-D]$/.test(answer)) {
        const index = answer.charCodeAt(0) - 65;
        if (index < 0 || index >= question.choices.length) throw new Error(`Question integrity failure in ${mock.id}: ${question.questionId} has invalid answer position`);
      }
    }
  });
}

export function getMockDefinition(testKey) {
  return MOCKS[testKey] || null;
}

export function normalizeMockKey(value) {
  const normalized = String(value || "").trim().toUpperCase().replace(/_/g, "");
  const match = normalized.match(/^(PSAT|SAT|TEST)(?:-?0?([1-9]|1[0-9]|20))$/);
  if (!match) return null;
  const family = match[1] === "TEST" ? "SAT" : match[1];
  return `${family}${Number(match[2])}`;
}

export function createAdaptivePlan(testKey) {
  const mock = getMockDefinition(normalizeMockKey(testKey));
  if (!mock) return null;

  const rw1 = moduleQuestions(mock.content, "reading-writing", "module-1");
  const rw2 = moduleQuestions(mock.content, "reading-writing", "module-2");
  const math1 = moduleQuestions(mock.content, "math", "module-1");
  const math2 = moduleQuestions(mock.content, "math", "module-2");

  if (rw1.length !== 27 || rw2.length !== 81 || math1.length !== 22 || math2.length !== 66) {
    throw new Error(`Adaptive mock bank integrity failure for ${mock.id}`);
  }

  const allQuestions = [...rw1, ...rw2, ...math1, ...math2];
  validateQuestionRecords(mock, allQuestions);

  return {
    version: 6,
    testKey: mock.id,
    label: mock.label,
    sections: [
      {
        key: "reading-writing",
        label: "Reading and Writing",
        modules: [
          { key: "module-1", minutes: 32, questions: rw1 },
          { key: "module-2-standard", minutes: 32, route: "standard", questions: exactAdaptivePool(rw2, "standard", 27) },
          { key: "module-2-high", minutes: 32, route: "high", questions: exactAdaptivePool(rw2, "high", 27) },
          { key: "module-2-low", minutes: 32, route: "low", questions: exactAdaptivePool(rw2, "low", 27) },
        ],
      },
      {
        key: "math",
        label: "Math",
        modules: [
          { key: "module-1", minutes: 35, questions: math1 },
          { key: "module-2-standard", minutes: 35, route: "standard", questions: exactAdaptivePool(math2, "standard", 22) },
          { key: "module-2-high", minutes: 35, route: "high", questions: exactAdaptivePool(math2, "high", 22) },
          { key: "module-2-low", minutes: 35, route: "low", questions: exactAdaptivePool(math2, "low", 22) },
        ],
      },
    ],
  };
}

export function getModuleForRoute(plan, sectionKey, moduleIndex, route = "standard") {
  const section = plan?.sections?.find((item) => item.key === sectionKey);
  if (!section) return null;
  const key = moduleIndex === 0 ? "module-1" : `module-2-${route}`;
  return section.modules.find((module) => module.key === key) || null;
}

function answersMatch(question, suppliedAnswer) {
  const supplied = String(suppliedAnswer ?? "").trim();
  if (!supplied) return false;
  const correct = String(question.answer ?? "").trim();
  if (/^[A-D]$/i.test(correct) && Array.isArray(question.choices)) {
    const correctChoice = question.choices[correct.toUpperCase().charCodeAt(0) - 65];
    return supplied.toUpperCase() === correct.toUpperCase() || supplied === String(correctChoice ?? "").trim();
  }
  return supplied.toUpperCase() === correct.toUpperCase();
}

export function scoreModule(questions, answers) {
  let correct = 0;
  let answered = 0;
  questions.forEach((question) => {
    const answer = answers?.[question.questionId];
    if (answer !== undefined && answer !== null && String(answer).trim() !== "") {
      answered += 1;
      if (answersMatch(question, answer)) correct += 1;
    }
  });
  const total = questions.length;
  return { correct, answered, total, accuracy: total ? Math.round((correct / total) * 100) : 0 };
}

export function chooseModule2Route(module1Questions, answers) {
  const result = scoreModule(module1Questions, answers);
  const ratio = result.total ? result.correct / result.total : 0;
  if (ratio >= 0.75) return "high";
  if (ratio <= 0.45) return "low";
  return "standard";
}

function displaySafePrompt(value) {
  let prompt = String(value || "");
  prompt = prompt.replace(/\s*For this (?:PSAT\/NMSQT|PSAT|SAT) form, the comparison uses \d+ observation sites\.\s*/gi, " ");
  prompt = prompt.replace(/\s*The [^.?!\n]{1,160} analysis used a distinct comparison set of \d+ observations and reported the result separately for the (?:PSAT\/NMSQT|PSAT|SAT) form\.\s*/gi, " ");
  return prompt.replace(/\n{3,}/g, "\n\n").trim();
}

export function buildClientSafeTest(testKey) {
  const plan = createAdaptivePlan(testKey);
  if (!plan) return null;
  return {
    version: plan.version,
    testKey: plan.testKey,
    label: plan.label,
    sections: plan.sections.map((section) => ({
      key: section.key,
      label: section.label,
      modules: section.modules.map((module) => ({
        key: module.key,
        minutes: module.minutes,
        route: module.route || null,
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
          prompt: displaySafePrompt(question.prompt),
          choices: question.choices,
          figure: question.figure || null,
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
  getModuleForRoute,
  buildClientSafeTest,
  scoreModule,
  chooseModule2Route,
  flattenModule,
};