import { getSeriesBMock, validateSeriesBMockRuntime } from './productionMockRuntime';

let legacyEngine = null;

function getLegacyEngine() {
  if (!legacyEngine) {
    // eslint-disable-next-line global-require
    legacyEngine = require('./adaptiveMockEngine');
  }
  return legacyEngine;
}

function normalizeModuleKey(value) {
  const normalized = String(value || '').toLowerCase();
  return normalized.endsWith('module-1') ? 'module-1' : normalized.endsWith('module-2') ? 'module-2' : normalized;
}

function normalizeMockKey(value) {
  const normalized = String(value || '').trim().toUpperCase().replace(/_/g, '');
  const match = normalized.match(/^(PSAT|SAT|TEST)(?:-?0?([1-9]|1[0-9]|20))$/);
  if (!match) return null;
  const family = match[1] === 'TEST' ? 'SAT' : match[1];
  return `${family}${Number(match[2])}`;
}

function isSeriesB(key) {
  return Boolean(key && key.startsWith('SAT') && Number(key.slice(3)) >= 11 && Number(key.slice(3)) <= 20);
}

function moduleQuestions(content, section, module) {
  return [...(content?.readingWriting || []), ...(content?.math || [])]
    .filter((question) => question.section === section && normalizeModuleKey(question.module) === module);
}

function exactAdaptivePool(questions, route, count, testKey) {
  const pool = questions.filter((question) => question.adaptiveRoute === route);
  if (pool.length !== count) throw new Error(`Adaptive mock bank integrity failure for ${testKey}: expected ${count} ${route} questions, found ${pool.length}`);
  return pool;
}

function validateProductionMock(mock) {
  const records = [...(mock?.readingWriting || []), ...(mock?.math || [])];
  if (records.length !== 196) throw new Error(`Production mock integrity failure for ${mock?.testId || 'unknown'}: expected 196 records, found ${records.length}`);
  const seen = new Set();
  for (const question of records) {
    if (!question?.questionId) throw new Error(`Production mock integrity failure: missing questionId in ${mock.testId}`);
    if (seen.has(question.questionId)) throw new Error(`Production mock integrity failure: duplicate questionId ${question.questionId}`);
    seen.add(question.questionId);
    if (question.testId !== mock.testId) throw new Error(`Production mock integrity failure: ${question.questionId} has mismatched testId`);
    if (!question.section || !question.module || String(question.prompt || '').trim() === '') throw new Error(`Production mock integrity failure: incomplete ${question.questionId}`);
    if (question.questionType === 'multiple-choice' && (!Array.isArray(question.choices) || question.choices.length !== 4)) throw new Error(`Production mock integrity failure: ${question.questionId} must have four choices`);
  }
}

function createSeriesBPlan(testKey, mock) {
  validateSeriesBMockRuntime(mock);
  validateProductionMock(mock);
  const rw1 = moduleQuestions(mock, 'reading-writing', 'module-1');
  const rw2 = moduleQuestions(mock, 'reading-writing', 'module-2');
  const math1 = moduleQuestions(mock, 'math', 'module-1');
  const math2 = moduleQuestions(mock, 'math', 'module-2');
  if (rw1.length !== 27 || rw2.length !== 81 || math1.length !== 22 || math2.length !== 66) {
    throw new Error(`Adaptive mock bank integrity failure for ${testKey}`);
  }
  return {
    version: 7,
    testKey,
    label: `SAT Mock ${Number(testKey.slice(3)).toString().padStart(2, '0')} — Series B`,
    sections: [
      { key: 'reading-writing', label: 'Reading and Writing', modules: [
        { key: 'module-1', minutes: 32, questions: rw1 },
        { key: 'module-2-standard', minutes: 32, route: 'standard', questions: exactAdaptivePool(rw2, 'standard', 27, testKey) },
        { key: 'module-2-high', minutes: 32, route: 'high', questions: exactAdaptivePool(rw2, 'high', 27, testKey) },
        { key: 'module-2-low', minutes: 32, route: 'low', questions: exactAdaptivePool(rw2, 'low', 27, testKey) },
      ]},
      { key: 'math', label: 'Math', modules: [
        { key: 'module-1', minutes: 35, questions: math1 },
        { key: 'module-2-standard', minutes: 35, route: 'standard', questions: exactAdaptivePool(math2, 'standard', 22, testKey) },
        { key: 'module-2-high', minutes: 35, route: 'high', questions: exactAdaptivePool(math2, 'high', 22, testKey) },
        { key: 'module-2-low', minutes: 35, route: 'low', questions: exactAdaptivePool(math2, 'low', 22, testKey) },
      ]},
    ],
  };
}

function answersMatch(question, suppliedAnswer) {
  const supplied = String(suppliedAnswer ?? '').trim();
  if (!supplied) return false;
  const correct = String(question.answer ?? '').trim();
  if (/^[A-D]$/i.test(correct) && Array.isArray(question.choices)) {
    const correctChoice = question.choices[correct.toUpperCase().charCodeAt(0) - 65];
    return supplied.toUpperCase() === correct.toUpperCase() || supplied === String(correctChoice ?? '').trim();
  }
  return supplied.toUpperCase() === correct.toUpperCase();
}

function scoreModule(questions, answers) {
  let correct = 0;
  let answered = 0;
  questions.forEach((question) => {
    const answer = answers?.[question.questionId];
    if (answer !== undefined && answer !== null && String(answer).trim() !== '') {
      answered += 1;
      if (answersMatch(question, answer)) correct += 1;
    }
  });
  const total = questions.length;
  return { correct, answered, total, accuracy: total ? Math.round((correct / total) * 100) : 0 };
}

function chooseModule2Route(module1Questions, answers) {
  const result = scoreModule(module1Questions, answers);
  const ratio = result.total ? result.correct / result.total : 0;
  if (ratio >= 0.75) return 'high';
  if (ratio <= 0.45) return 'low';
  return 'standard';
}

function displaySafePrompt(value) {
  let prompt = String(value || '');
  prompt = prompt.replace(/\s*For this (?:PSAT\/NMSQT|PSAT|SAT) form, the comparison uses \d+ observation sites\.\s*/gi, ' ');
  prompt = prompt.replace(/\s*The [^.?!\n]{1,160} analysis used a distinct comparison set of \d+ observations and reported the result separately for the (?:PSAT\/NMSQT|PSAT|SAT) form\.\s*/gi, ' ');
  return prompt.replace(/\n{3,}/g, '\n\n').trim();
}

function buildClientSafeTestFromPlan(plan) {
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

export function getMockDefinition(testKey) {
  const key = normalizeMockKey(testKey);
  if (!isSeriesB(key)) return getLegacyEngine().getMockDefinition(key);
  return getSeriesBMock(key);
}

export function createAdaptivePlan(testKey) {
  const key = normalizeMockKey(testKey);
  if (!key) return null;
  if (!isSeriesB(key)) return getLegacyEngine().createAdaptivePlan(key);
  const mock = getSeriesBMock(key);
  return mock ? createSeriesBPlan(key, mock) : null;
}

export function getModuleForRoute(plan, sectionKey, moduleIndex, route) {
  const section = plan?.sections?.find((item) => item.key === sectionKey);
  if (!section) return null;
  if (moduleIndex === 0) return section.modules.find((module) => module.key === 'module-1') || null;
  if (!['standard', 'high', 'low'].includes(String(route || ''))) return null;
  const key = `module-2-${route}`;
  return section.modules.find((module) => module.key === key && module.route === route) || null;
}

export function buildClientSafeTest(testKey) {
  const key = normalizeMockKey(testKey);
  if (!isSeriesB(key)) return getLegacyEngine().buildClientSafeTest(key);
  const plan = createAdaptivePlan(key);
  return plan ? buildClientSafeTestFromPlan(plan) : null;
}

export function flattenModule(module) {
  return module?.questions || [];
}

export { normalizeMockKey, scoreModule, chooseModule2Route };

export default {
  getMockDefinition,
  normalizeMockKey,
  createAdaptivePlan,
  getModuleForRoute,
  buildClientSafeTest,
  scoreModule,
  chooseModule2Route,
  flattenModule,
};
