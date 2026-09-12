import { getModuleForRoute, scoreModule } from "./adaptiveMockEngine";

function cleanLabel(value, fallback) {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function addBreakdown(map, key, fallback) {
  const label = cleanLabel(key, fallback);
  if (!map[label]) map[label] = { label, total: 0, answered: 0, correct: 0, accuracy: 0 };
  return map[label];
}

function scoreQuestions(questions, answers, context) {
  const breakdown = {
    domains: {},
    skills: {},
    difficulty: {},
  };
  const review = [];
  let answered = 0;
  let correct = 0;

  questions.forEach((question) => {
    const supplied = answers?.[question.questionId];
    const hasAnswer = supplied !== undefined && supplied !== null && String(supplied).trim() !== "";
    const one = scoreModule([question], answers);
    const isCorrect = one.correct === 1;
    if (hasAnswer) answered += 1;
    if (isCorrect) correct += 1;

    const domain = addBreakdown(breakdown.domains, question.domain, "Unclassified domain");
    const skill = addBreakdown(breakdown.skills, question.skill, "Unclassified skill");
    const difficulty = addBreakdown(breakdown.difficulty, question.difficultyBand || question.difficulty, "Unclassified difficulty");
    [domain, skill, difficulty].forEach((item) => {
      item.total += 1;
      if (hasAnswer) item.answered += 1;
      if (isCorrect) item.correct += 1;
    });

    review.push({
      questionId: question.questionId,
      section: context.section,
      module: context.module,
      route: context.route,
      domain: domain.label,
      skill: skill.label,
      difficulty: difficulty.label,
      answered: hasAnswer,
      correct: isCorrect,
      flagged: Boolean(context.flags?.[question.questionId]),
    });
  });

  const finalize = (map) => Object.values(map).map((item) => ({ ...item, accuracy: item.total ? Math.round((item.correct / item.total) * 100) : 0 }));
  const total = questions.length;
  return {
    total,
    answered,
    unanswered: total - answered,
    correct,
    incorrect: answered - correct,
    accuracy: total ? Math.round((correct / total) * 100) : 0,
    domains: finalize(breakdown.domains),
    skills: finalize(breakdown.skills),
    difficulty: finalize(breakdown.difficulty),
    review,
  };
}

export function buildPracticeReport(plan, attempt) {
  const answers = attempt?.answers || {};
  const flags = attempt?.flags || {};
  const rwRoute = attempt?.module2_route_rw || "standard";
  const mathRoute = attempt?.module2_route_math || "standard";
  const sections = {};
  const allReview = [];

  plan.sections.forEach((section) => {
    const route = section.key === "reading-writing" ? rwRoute : mathRoute;
    const module1 = getModuleForRoute(plan, section.key, 0);
    const module2 = getModuleForRoute(plan, section.key, 1, route);
    const m1 = scoreQuestions(module1?.questions || [], answers, { section: section.key, module: "module-1", route: "base", flags });
    const m2 = scoreQuestions(module2?.questions || [], answers, { section: section.key, module: "module-2", route, flags });
    const sectionQuestions = [...(module1?.questions || []), ...(module2?.questions || [])];
    const combined = scoreQuestions(sectionQuestions, answers, { section: section.key, module: "section", route, flags });
    sections[section.key] = {
      label: section.label,
      route,
      total: combined.total,
      answered: combined.answered,
      unanswered: combined.unanswered,
      correct: combined.correct,
      incorrect: combined.incorrect,
      accuracy: combined.accuracy,
      modules: { module1: m1, module2: m2 },
      domains: combined.domains,
      skills: combined.skills,
      difficulty: combined.difficulty,
    };
    allReview.push(...combined.review);
  });

  const rw = sections["reading-writing"];
  const math = sections.math;
  const totalQuestions = (rw?.total || 0) + (math?.total || 0);
  const totalAnswered = (rw?.answered || 0) + (math?.answered || 0);
  const totalCorrect = (rw?.correct || 0) + (math?.correct || 0);

  const aggregate = (field) => {
    const map = {};
    [rw, math].forEach((section) => (section?.[field] || []).forEach((item) => {
      const existing = map[item.label] || { label: item.label, total: 0, answered: 0, correct: 0 };
      existing.total += item.total;
      existing.answered += item.answered;
      existing.correct += item.correct;
      map[item.label] = existing;
    }));
    return Object.values(map).map((item) => ({ ...item, accuracy: item.total ? Math.round((item.correct / item.total) * 100) : 0 }));
  };

  return {
    version: 1,
    scoreType: "practice_raw_performance",
    scoreNotice: "This is an Apriori practice-performance report. It is not an official College Board scaled score.",
    testKey: plan.testKey,
    testLabel: plan.label,
    completedAt: attempt.completed_at || new Date().toISOString(),
    totalQuestions,
    answered: totalAnswered,
    unanswered: totalQuestions - totalAnswered,
    totalCorrect,
    totalIncorrect: totalAnswered - totalCorrect,
    accuracy: totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0,
    adaptiveRoutes: { readingWriting: rwRoute, math: mathRoute },
    sections,
    domains: aggregate("domains"),
    skills: aggregate("skills"),
    difficulty: aggregate("difficulty"),
    review: allReview,
  };
}

export default { buildPracticeReport };
