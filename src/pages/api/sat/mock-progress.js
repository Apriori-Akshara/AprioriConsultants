import { query } from "../../../lib/db";
import { getVerifiedSatServerAccessState } from "../../../lib/sat/satAccess";
import { getSatTestAccess } from "../../../lib/sat/testAccess";
import {
  createAdaptivePlan,
  normalizeMockKey,
  chooseModule2Route,
  getModuleForRoute,
} from "../../../lib/sat/productionAdaptiveMockEngine";
import { buildPracticeReport } from "../../../lib/sat/mockScoring";

async function ensureTable() {
  await query(`CREATE TABLE IF NOT EXISTS sat_mock_attempts (
    id BIGSERIAL PRIMARY KEY, user_id BIGINT NOT NULL, test_key TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'in-progress', current_section TEXT, current_module TEXT,
    current_question INTEGER NOT NULL DEFAULT 0, module2_route_rw TEXT, module2_route_math TEXT,
    answers JSONB NOT NULL DEFAULT '{}'::jsonb, flags JSONB NOT NULL DEFAULT '{}'::jsonb,
    section_scores JSONB NOT NULL DEFAULT '{}'::jsonb, notes JSONB NOT NULL DEFAULT '{}'::jsonb,
    module_started_at TIMESTAMPTZ, module_deadline_at TIMESTAMPTZ, break_deadline_at TIMESTAMPTZ,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), completed_at TIMESTAMPTZ)`);
  await query(`ALTER TABLE sat_mock_attempts ADD COLUMN IF NOT EXISTS current_question INTEGER NOT NULL DEFAULT 0`);
  await query(`ALTER TABLE sat_mock_attempts ADD COLUMN IF NOT EXISTS flags JSONB NOT NULL DEFAULT '{}'::jsonb`);
  await query(`ALTER TABLE sat_mock_attempts ADD COLUMN IF NOT EXISTS notes JSONB NOT NULL DEFAULT '{}'::jsonb`);
  await query(`ALTER TABLE sat_mock_attempts ADD COLUMN IF NOT EXISTS module_started_at TIMESTAMPTZ`);
  await query(`ALTER TABLE sat_mock_attempts ADD COLUMN IF NOT EXISTS module_deadline_at TIMESTAMPTZ`);
  await query(`ALTER TABLE sat_mock_attempts ADD COLUMN IF NOT EXISTS break_deadline_at TIMESTAMPTZ`);
  await query(`CREATE INDEX IF NOT EXISTS idx_sat_mock_attempts_user ON sat_mock_attempts(user_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_sat_mock_attempts_test ON sat_mock_attempts(user_id, test_key)`);
}

async function authenticatedUser(req) {
  const state = await getVerifiedSatServerAccessState(req);
  return state.authenticated ? state.user : null;
}

function assessmentFamilyForTestKey(testKey) {
  const key = String(testKey || "").toUpperCase();
  if (key.startsWith("PSAT")) return "psat";
  if (key.startsWith("SAT")) return "sat";
  return null;
}

function testNumberForTestKey(testKey) {
  const match = String(testKey || "").match(/(\d+)$/);
  return match ? Number(match[1]) : null;
}

function deadlineForModule(module) {
  return new Date(Date.now() + (Number(module?.minutes) || 0) * 60 * 1000);
}

function publicAttempt(row) {
  return { ...row, answers: row.answers || {}, flags: row.flags || {}, notes: row.notes || {} };
}

function questionFromPlan(plan, questionId) {
  const target = String(questionId || "").trim();
  if (!target) return null;

  for (const section of plan?.sections || []) {
    for (const module of section.modules || []) {
      const question = (module.questions || []).find((item) => item.questionId === target);
      if (question) return { question, section, module };
    }
  }
  return null;
}

function moduleContext(plan, sectionKey, moduleKey, route) {
  const moduleIndex = String(moduleKey || "module-1").endsWith("module-2") ? 1 : 0;
  return getModuleForRoute(plan, sectionKey, moduleIndex, route || "standard");
}

function activeModule(plan, attempt) {
  if (!attempt?.current_section || !attempt?.current_module) return null;
  const section = plan.sections.find((item) => item.key === attempt.current_section);
  if (!section) return null;
  if (attempt.current_module === "module-1") return section.modules.find((item) => item.key === "module-1") || null;
  const route = section.key === "reading-writing" ? attempt.module2_route_rw : attempt.module2_route_math;
  return moduleContext(plan, section.key, attempt.current_module, route);
}

function completedModuleKey(section, module) {
  return `${section}:${module}`;
}

function serializeAttempt(row) {
  return publicAttempt(row);
}

export default async function handler(req, res) {
  try {
    const user = await authenticatedUser(req);
    if (!user) return res.status(401).json({ error: "Authentication required" });

    await ensureTable();

    if (req.method === "GET") {
      const result = await query(`SELECT * FROM sat_mock_attempts WHERE user_id = $1 ORDER BY updated_at DESC`, [user.id]);
      return res.status(200).json({ attempts: result.rows.filter((row) => row.status === "in-progress").map(serializeAttempt), completed: result.rows.filter((row) => row.status === "completed").map(serializeAttempt) });
    }

    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const action = String(req.body?.action || "");
    const testKey = normalizeMockKey(req.body?.testKey);
    if (!testKey) return res.status(400).json({ error: "Invalid mock test" });

    const testNumber = testNumberForTestKey(testKey);
    const assessmentFamily = assessmentFamilyForTestKey(testKey);
    const access = await getSatTestAccess(user.id, testNumber, assessmentFamily);
    if (!access.allowed) return res.status(403).json({ error: "Mock access denied", reason: access.reason });

    const plan = createAdaptivePlan(testKey);
    if (!plan) return res.status(404).json({ error: "Mock test not found" });

    if (action === "start") {
      const existing = await query(`SELECT * FROM sat_mock_attempts WHERE user_id = $1 AND test_key = $2 AND status = 'in-progress' ORDER BY updated_at DESC LIMIT 1`, [user.id, testKey]);
      if (existing.rows[0]) return res.status(200).json({ attempt: serializeAttempt(existing.rows[0]), resumed: true });
      const created = await query(`INSERT INTO sat_mock_attempts (user_id, test_key, status, current_section, current_module, current_question) VALUES ($1, $2, 'in-progress', 'reading-writing', 'module-1', 0) RETURNING *`, [user.id, testKey]);
      return res.status(200).json({ attempt: serializeAttempt(created.rows[0]), resumed: false });
    }

    const attemptId = Number(req.body?.attemptId);
    if (!Number.isInteger(attemptId)) return res.status(400).json({ error: "Invalid attempt" });
    const found = await query(`SELECT * FROM sat_mock_attempts WHERE id = $1 AND user_id = $2 AND test_key = $3 LIMIT 1`, [attemptId, user.id, testKey]);
    const attempt = found.rows[0];
    if (!attempt) return res.status(404).json({ error: "Attempt not found" });
    if (attempt.status !== "in-progress" && !["finish"].includes(action)) return res.status(409).json({ error: "Attempt is no longer active" });

    if (action === "begin") {
      if (attempt.module_started_at && attempt.module_deadline_at) return res.status(200).json({ deadlineAt: attempt.module_deadline_at });
      const module = activeModule(plan, attempt);
      const deadline = deadlineForModule(module);
      await query(`UPDATE sat_mock_attempts SET module_started_at = NOW(), module_deadline_at = $1, updated_at = NOW() WHERE id = $2`, [deadline, attemptId]);
      return res.status(200).json({ deadlineAt: deadline });
    }

    if (action === "answer" || action === "flag" || action === "note" || action === "position") {
      const module = activeModule(plan, attempt);
      if (!module) return res.status(409).json({ error: "Invalid active module" });
      if (action === "answer") {
        const target = questionFromPlan(plan, req.body?.questionId);
        if (!target || target.module.key !== module.key || target.section.key !== attempt.current_section) return res.status(400).json({ error: "Question does not belong to the active module" });
        const answers = { ...(attempt.answers || {}), [target.question.questionId]: req.body?.answer ?? "" };
        await query(`UPDATE sat_mock_attempts SET answers = $1, updated_at = NOW() WHERE id = $2`, [JSON.stringify(answers), attemptId]);
      } else if (action === "flag") {
        const target = questionFromPlan(plan, req.body?.questionId);
        if (!target || target.module.key !== module.key || target.section.key !== attempt.current_section) return res.status(400).json({ error: "Question does not belong to the active module" });
        const flags = { ...(attempt.flags || {}), [target.question.questionId]: Boolean(req.body?.flagged) };
        await query(`UPDATE sat_mock_attempts SET flags = $1, updated_at = NOW() WHERE id = $2`, [JSON.stringify(flags), attemptId]);
      } else if (action === "note") {
        const target = questionFromPlan(plan, req.body?.questionId);
        if (!target || target.module.key !== module.key || target.section.key !== attempt.current_section) return res.status(400).json({ error: "Question does not belong to the active module" });
        const notes = { ...(attempt.notes || {}), [target.question.questionId]: String(req.body?.note || "") };
        await query(`UPDATE sat_mock_attempts SET notes = $1, updated_at = NOW() WHERE id = $2`, [JSON.stringify(notes), attemptId]);
      } else {
        const questionIndex = Number(req.body?.questionIndex);
        if (!Number.isInteger(questionIndex) || questionIndex < 0 || questionIndex >= module.questions.length) return res.status(400).json({ error: "Invalid question position" });
        await query(`UPDATE sat_mock_attempts SET current_question = $1, updated_at = NOW() WHERE id = $2`, [questionIndex, attemptId]);
      }
      return res.status(200).json({ ok: true });
    }

    if (action === "advance") {
      const module = activeModule(plan, attempt);
      if (!module) return res.status(409).json({ error: "Invalid active module" });
      const moduleAnswers = attempt.answers || {};
      let nextSection = attempt.current_section;
      let nextModule = attempt.current_module;
      let nextRoute = null;
      if (attempt.current_section === "reading-writing" && attempt.current_module === "module-1") {
        nextRoute = chooseModule2Route(module.questions, moduleAnswers);
        nextModule = `module-2-${nextRoute}`;
        await query(`UPDATE sat_mock_attempts SET module2_route_rw = $1, current_module = $2, current_question = 0, module_started_at = NOW(), module_deadline_at = $3, updated_at = NOW() WHERE id = $4`, [nextRoute, nextModule, deadlineForModule(getModuleForRoute(plan, "reading-writing", 1, nextRoute)), attemptId]);
        return res.status(200).json({ ok: true, next: { section: "reading-writing", module: nextModule, route: nextRoute, deadlineAt: deadlineForModule(getModuleForRoute(plan, "reading-writing", 1, nextRoute)) } });
      }
      if (attempt.current_section === "reading-writing" && String(attempt.current_module).endsWith("module-2")) {
        const breakDeadlineAt = new Date(Date.now() + 10 * 60 * 1000);
        await query(`UPDATE sat_mock_attempts SET current_section = 'math', current_module = 'module-1', current_question = 0, break_deadline_at = $1, module_started_at = NULL, module_deadline_at = NULL, updated_at = NOW() WHERE id = $2`, [breakDeadlineAt, attemptId]);
        return res.status(200).json({ ok: true, next: { break: true, breakDeadlineAt } });
      }
      if (attempt.current_section === "math" && attempt.current_module === "module-1") {
        nextRoute = chooseModule2Route(module.questions, moduleAnswers);
        nextModule = `module-2-${nextRoute}`;
        await query(`UPDATE sat_mock_attempts SET module2_route_math = $1, current_module = $2, current_question = 0, module_started_at = NOW(), module_deadline_at = $3, updated_at = NOW() WHERE id = $4`, [nextRoute, nextModule, deadlineForModule(getModuleForRoute(plan, "math", 1, nextRoute)), attemptId]);
        return res.status(200).json({ ok: true, next: { section: "math", module: nextModule, route: nextRoute, deadlineAt: deadlineForModule(getModuleForRoute(plan, "math", 1, nextRoute)) } });
      }
      if (attempt.current_section === "math" && String(attempt.current_module).endsWith("module-2")) {
        await query(`UPDATE sat_mock_attempts SET updated_at = NOW() WHERE id = $1`, [attemptId]);
        return res.status(200).json({ ok: true, next: { complete: true } });
      }
      return res.status(409).json({ error: "Invalid progression state" });
    }

    if (action === "resume-break") {
      const module = plan.sections.find((section) => section.key === "math")?.modules.find((item) => item.key === "module-1");
      const deadline = deadlineForModule(module);
      await query(`UPDATE sat_mock_attempts SET break_deadline_at = NULL, module_started_at = NOW(), module_deadline_at = $1, updated_at = NOW() WHERE id = $2`, [deadline, attemptId]);
      return res.status(200).json({ ok: true, next: { section: "math", module: "module-1", deadlineAt: deadline } });
    }

    if (action === "finish") {
      const refreshed = await query(`SELECT * FROM sat_mock_attempts WHERE id = $1 AND user_id = $2 AND test_key = $3 LIMIT 1`, [attemptId, user.id, testKey]);
      const current = refreshed.rows[0];
      const allQuestions = plan.sections.flatMap((section) => {
        const module1 = section.modules.find((module) => module.key === "module-1");
        const route = section.key === "reading-writing" ? current.module2_route_rw : current.module2_route_math;
        const module2 = getModuleForRoute(plan, section.key, 1, route);
        return [...(module1?.questions || []), ...(module2?.questions || [])];
      });
      const answers = current.answers || {};
      let correct = 0;
      let answered = 0;
      for (const question of allQuestions) {
        const answer = answers[question.questionId];
        if (answer !== undefined && answer !== null && String(answer).trim() !== "") {
          answered += 1;
          const expected = String(question.answer || "").trim().toUpperCase();
          const supplied = String(answer).trim().toUpperCase();
          if (supplied === expected || (Array.isArray(question.choices) && /^[A-D]$/.test(expected) && supplied === String(question.choices[expected.charCodeAt(0) - 65] || "").trim().toUpperCase())) correct += 1;
        }
      }
      const sectionScores = {};
      for (const section of plan.sections) {
        const module1 = section.modules.find((module) => module.key === "module-1");
        const route = section.key === "reading-writing" ? current.module2_route_rw : current.module2_route_math;
        const module2 = getModuleForRoute(plan, section.key, 1, route);
        sectionScores[section.key] = scoreModule([...(module1?.questions || []), ...(module2?.questions || [])], answers);
      }
      const scores = { accuracy: allQuestions.length ? Math.round(correct / allQuestions.length * 100) : 0, totalCorrect: correct, totalQuestions: allQuestions.length, answered, readingWriting: sectionScores["reading-writing"], math: sectionScores.math };
      await query(`UPDATE sat_mock_attempts SET status = 'completed', section_scores = $1, completed_at = NOW(), updated_at = NOW() WHERE id = $2`, [JSON.stringify(scores), attemptId]);
      return res.status(200).json({ ok: true, scores });
    }

    return res.status(400).json({ error: "Unsupported action" });
  } catch (error) {
    console.error("SAT mock progress error:", error);
    return res.status(500).json({ error: error.message || "Unable to process mock attempt" });
  }
}
