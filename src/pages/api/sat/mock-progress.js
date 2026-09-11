import { query } from "../../../lib/db";
import { getVerifiedSatServerAccessState } from "../../../lib/sat/satAccess";
import { createAdaptivePlan, normalizeMockKey, chooseModule2Route, scoreModule } from "../../../lib/sat/adaptiveMockEngine";

async function ensureTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS sat_mock_attempts (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT NOT NULL,
      test_key TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'in-progress',
      current_section TEXT,
      current_module TEXT,
      module2_route_rw TEXT,
      module2_route_math TEXT,
      answers JSONB NOT NULL DEFAULT '{}'::jsonb,
      section_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
      started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      completed_at TIMESTAMPTZ
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_sat_mock_attempts_user ON sat_mock_attempts(user_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_sat_mock_attempts_test ON sat_mock_attempts(user_id, test_key)`);
}

async function authenticatedUser(req) {
  const state = await getVerifiedSatServerAccessState(req);
  return state.authenticated ? state.user : null;
}

function mergeAnswers(existing, incoming) {
  if (!incoming || typeof incoming !== "object" || Array.isArray(incoming)) return { ...existing };
  return { ...existing, ...incoming };
}

export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) return res.status(405).json({ error: "Method not allowed" });

  const user = await authenticatedUser(req);
  if (!user?.id) return res.status(401).json({ error: "Authentication required" });

  try {
    await ensureTable();

    if (req.method === "GET") {
      const result = await query(
        `SELECT id, test_key, status, current_section, current_module,
                module2_route_rw, module2_route_math, section_scores,
                started_at, updated_at, completed_at
           FROM sat_mock_attempts
          WHERE user_id = $1
          ORDER BY updated_at DESC`,
        [user.id]
      );
      return res.status(200).json({
        attempts: result.rows,
        completed: result.rows.filter((row) => row.status === "completed"),
      });
    }

    const action = req.body?.action;
    const testKey = normalizeMockKey(req.body?.testKey) || normalizeMockKey(req.body?.testId);
    const plan = testKey ? createAdaptivePlan(testKey) : null;
    if (!plan) return res.status(400).json({ error: "Unknown mock test" });

    if (action === "start") {
      const existing = await query(
        `SELECT * FROM sat_mock_attempts
          WHERE user_id = $1 AND test_key = $2 AND status = 'in-progress'
          ORDER BY updated_at DESC LIMIT 1`,
        [user.id, testKey]
      );
      if (existing.rows[0]) return res.status(200).json({ attempt: existing.rows[0] });

      const result = await query(
        `INSERT INTO sat_mock_attempts
          (user_id, test_key, status, current_section, current_module)
         VALUES ($1, $2, 'in-progress', 'reading-writing', 'module-1')
         RETURNING *`,
        [user.id, testKey]
      );
      return res.status(201).json({ attempt: result.rows[0] });
    }

    const attemptId = Number(req.body?.attemptId);
    if (!Number.isInteger(attemptId)) return res.status(400).json({ error: "Attempt ID is required" });

    const existing = await query(
      `SELECT * FROM sat_mock_attempts WHERE id = $1 AND user_id = $2 LIMIT 1`,
      [attemptId, user.id]
    );
    if (!existing.rows[0]) return res.status(404).json({ error: "Attempt not found" });

    const attempt = existing.rows[0];
    const answers = mergeAnswers(attempt.answers || {}, req.body?.answers);

    if (action === "answer") {
      const questionId = String(req.body?.questionId || "").trim();
      if (!questionId) return res.status(400).json({ error: "Question ID is required" });
      answers[questionId] = String(req.body?.answer ?? "").trim();

      await query(
        `UPDATE sat_mock_attempts
            SET answers = $1::jsonb,
                current_section = COALESCE($2, current_section),
                current_module = COALESCE($3, current_module),
                updated_at = NOW()
          WHERE id = $4 AND user_id = $5`,
        [JSON.stringify(answers), req.body?.section || null, req.body?.module || null, attemptId, user.id]
      );
      return res.status(200).json({ ok: true });
    }

    if (action === "route") {
      const section = req.body?.section;
      const route = section === "reading-writing"
        ? chooseModule2Route(plan.sections[0].modules[0].questions, answers)
        : chooseModule2Route(plan.sections[1].modules[0].questions, answers);
      const column = section === "reading-writing" ? "module2_route_rw" : "module2_route_math";

      await query(
        `UPDATE sat_mock_attempts
            SET ${column} = $1,
                answers = $2::jsonb,
                current_section = $3,
                current_module = 'module-2',
                updated_at = NOW()
          WHERE id = $4 AND user_id = $5`,
        [route, JSON.stringify(answers), section, attemptId, user.id]
      );
      return res.status(200).json({ route });
    }

    if (action === "finish") {
      const rwModule1 = plan.sections[0].modules[0].questions;
      const rwModule2 = plan.sections[0].modules[1].questions;
      const mathModule1 = plan.sections[1].modules[0].questions;
      const mathModule2 = plan.sections[1].modules[1].questions;

      const rw = scoreModule([...rwModule1, ...rwModule2], answers);
      const math = scoreModule([...mathModule1, ...mathModule2], answers);
      const total = rw.correct + math.correct;
      const max = rw.total + math.total;
      const accuracy = max ? Math.round((total / max) * 100) : 0;
      const scores = { readingWriting: rw, math, totalCorrect: total, totalQuestions: max, accuracy };

      await query(
        `UPDATE sat_mock_attempts
            SET status = 'completed',
                answers = $1::jsonb,
                section_scores = $2::jsonb,
                updated_at = NOW(),
                completed_at = NOW()
          WHERE id = $3 AND user_id = $4`,
        [JSON.stringify(answers), JSON.stringify(scores), attemptId, user.id]
      );

      return res.status(200).json({ completed: true, scores });
    }

    return res.status(400).json({ error: "Unknown action" });
  } catch (error) {
    console.error("SAT mock progress API error:", error);
    return res.status(500).json({ error: "Unable to save mock progress" });
  }
}
