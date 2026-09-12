import { query } from "../../../lib/db";
import { getVerifiedSatServerAccessState } from "../../../lib/sat/satAccess";
import { getSatTestAccess } from "../../../lib/sat/testAccess";
import {
  createAdaptivePlan,
  normalizeMockKey,
  chooseModule2Route,
  getModuleForRoute,
} from "../../../lib/sat/adaptiveMockEngine";
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
  return new Date(
    Date.now() + (Number(module?.minutes) || 0) * 60 * 1000
  );
}

function publicAttempt(row) {
  return {
    ...row,
    answers: row.answers || {},
    flags: row.flags || {},
    notes: row.notes || {},
  };
}

export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = await authenticatedUser(req);

  if (!user?.id) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    await ensureTable();

    if (req.method === "GET") {
      const requestedId = Number(req.query?.attemptId);

      if (Number.isInteger(requestedId)) {
        const result = await query(
          `SELECT id,test_key,status,section_scores,completed_at
           FROM sat_mock_attempts
           WHERE id=$1 AND user_id=$2
           LIMIT 1`,
          [requestedId, user.id]
        );

        const row = result.rows[0];

        if (!row) {
          return res.status(404).json({ error: "Attempt not found" });
        }

        if (row.status !== "completed") {
          return res
            .status(409)
            .json({ error: "This attempt is not completed yet" });
        }

        return res.status(200).json({
          attempt: row,
          report: row.section_scores || null,
        });
      }

      const result = await query(
        `SELECT id,test_key,status,current_section,current_module,current_question,
                module2_route_rw,module2_route_math,section_scores,flags,notes,
                module_started_at,module_deadline_at,break_deadline_at,
                started_at,updated_at,completed_at
         FROM sat_mock_attempts
         WHERE user_id=$1
         ORDER BY updated_at DESC`,
        [user.id]
      );

      return res.status(200).json({
        attempts: result.rows,
        completed: result.rows.filter((row) => row.status === "completed"),
      });
    }

    const action = req.body?.action;
    const attemptId = Number(req.body?.attemptId);

    let testKey = normalizeMockKey(req.body?.testKey);

    if (!testKey && Number.isInteger(attemptId)) {
      const lookup = await query(
        `SELECT test_key
         FROM sat_mock_attempts
         WHERE id=$1 AND user_id=$2
         LIMIT 1`,
        [attemptId, user.id]
      );

      testKey = normalizeMockKey(lookup.rows[0]?.test_key);
    }

    const plan = testKey ? createAdaptivePlan(testKey) : null;

    if (!plan) {
      return res.status(400).json({ error: "Unknown mock test" });
    }

    /*
     * Server-authoritative access check.
     *
     * This API must enforce the same mock-access rule as the page route,
     * rather than relying only on the client or the page-level check.
     */
    const assessmentFamily = assessmentFamilyForTestKey(testKey);
    const testNumber = testNumberForTestKey(testKey);

    if (
      !assessmentFamily ||
      !Number.isInteger(testNumber) ||
      testNumber < 1 ||
      testNumber > 10
    ) {
      return res.status(403).json({
        error: "Mock test access denied",
        reason: "invalid_mock",
      });
    }

    const access = await getSatTestAccess(
      user.id,
      testNumber,
      assessmentFamily
    );

    if (!access.allowed) {
      return res.status(403).json({
        error: "Mock test access denied",
        reason: access.reason || "not_allowed",
      });
    }

    if (action === "start") {
      const existing = await query(
        `SELECT *
         FROM sat_mock_attempts
         WHERE user_id=$1
           AND test_key=$2
           AND status='in-progress'
         ORDER BY updated_at DESC
         LIMIT 1`,
        [user.id, testKey]
      );

      if (existing.rows[0]) {
        return res.status(200).json({
          resumed: true,
          attempt: publicAttempt(existing.rows[0]),
        });
      }

      const result = await query(
        `INSERT INTO sat_mock_attempts
          (user_id,test_key,status,current_section,current_module,current_question)
         VALUES
          ($1,$2,'in-progress','reading-writing','module-1',0)
         RETURNING *`,
        [user.id, testKey]
      );

      return res.status(201).json({
        resumed: false,
        attempt: publicAttempt(result.rows[0]),
      });
    }

    if (!Number.isInteger(attemptId)) {
      return res.status(400).json({ error: "Attempt ID is required" });
    }

    const existing = await query(
      `SELECT *
       FROM sat_mock_attempts
       WHERE id=$1 AND user_id=$2
       LIMIT 1`,
      [attemptId, user.id]
    );

    if (!existing.rows[0]) {
      return res.status(404).json({ error: "Attempt not found" });
    }

    const attempt = existing.rows[0];
    const answers = { ...(attempt.answers || {}) };
    const flags = { ...(attempt.flags || {}) };
    const notes = { ...(attempt.notes || {}) };

    if (attempt.status === "completed" && action !== "finish") {
      return res
        .status(409)
        .json({ error: "This attempt is already completed" });
    }

    if (action === "begin") {
      if (attempt.module_deadline_at) {
        return res.status(200).json({
          started: true,
          deadlineAt: attempt.module_deadline_at,
        });
      }

      if (attempt.break_deadline_at) {
        return res.status(409).json({
          error: "The inter-section break is active",
          break: true,
          breakDeadlineAt: attempt.break_deadline_at,
        });
      }

      const section = attempt.current_section || "reading-writing";
      const moduleIndex = String(attempt.current_module || "module-1").endsWith(
        "module-2"
      )
        ? 1
        : 0;

      const route =
        section === "reading-writing"
          ? attempt.module2_route_rw || "standard"
          : attempt.module2_route_math || "standard";

      const currentModule = getModuleForRoute(
        plan,
        section,
        moduleIndex,
        route
      );

      const deadline = deadlineForModule(currentModule);

      await query(
        `UPDATE sat_mock_attempts
         SET module_started_at=NOW(),
             module_deadline_at=$1,
             updated_at=NOW()
         WHERE id=$2
           AND user_id=$3
           AND status='in-progress'`,
        [deadline, attemptId, user.id]
      );

      return res.status(200).json({
        started: true,
        deadlineAt: deadline.toISOString(),
      });
    }

    if (action === "resume-break") {
      if (!attempt.break_deadline_at) {
        return res.status(409).json({ error: "No active break" });
      }

      if (
        new Date(attempt.break_deadline_at).getTime() <= Date.now()
      ) {
        return res
          .status(409)
          .json({ error: "Break has expired", expired: true });
      }

      const nextModule = getModuleForRoute(plan, "math", 0);
      const deadline = deadlineForModule(nextModule);

      await query(
        `UPDATE sat_mock_attempts
         SET break_deadline_at=NULL,
             module_started_at=NOW(),
             module_deadline_at=$1,
             updated_at=NOW()
         WHERE id=$2
           AND user_id=$3
           AND status='in-progress'`,
        [deadline, attemptId, user.id]
      );

      return res.status(200).json({
        next: {
          section: "math",
          module: "module-1",
          question: 0,
          route: "standard",
          deadlineAt: deadline.toISOString(),
        },
      });
    }

    if (action === "answer") {
      if (
        attempt.module_deadline_at &&
        new Date(attempt.module_deadline_at).getTime() <= Date.now()
      ) {
        return res.status(409).json({
          error: "This module's time has expired",
          expired: true,
          deadlineAt: attempt.module_deadline_at,
        });
      }

      const questionId = String(req.body?.questionId || "").trim();

      if (!questionId) {
        return res.status(400).json({ error: "Question ID is required" });
      }

      answers[questionId] = String(req.body?.answer ?? "").trim();

      await query(
        `UPDATE sat_mock_attempts
         SET answers=$1::jsonb,
             current_section=COALESCE($2,current_section),
             current_module=COALESCE($3,current_module),
             current_question=COALESCE($4,current_question),
             updated_at=NOW()
         WHERE id=$5
           AND user_id=$6
           AND status='in-progress'`,
        [
          JSON.stringify(answers),
          req.body?.section || null,
          req.body?.module || null,
          Number.isInteger(req.body?.questionIndex)
            ? req.body.questionIndex
            : null,
          attemptId,
          user.id,
        ]
      );

      return res.status(200).json({ ok: true });
    }

    if (action === "flag") {
      const questionId = String(req.body?.questionId || "").trim();

      if (!questionId) {
        return res.status(400).json({ error: "Question ID is required" });
      }

      flags[questionId] = Boolean(req.body?.flagged);

      await query(
        `UPDATE sat_mock_attempts
         SET flags=$1::jsonb,
             updated_at=NOW()
         WHERE id=$2
           AND user_id=$3
           AND status='in-progress'`,
        [JSON.stringify(flags), attemptId, user.id]
      );

      return res.status(200).json({ ok: true, flags });
    }

    if (action === "note") {
      const questionId = String(req.body?.questionId || "").trim();

      if (!questionId) {
        return res.status(400).json({ error: "Question ID is required" });
      }

      notes[questionId] = String(req.body?.note ?? "");

      await query(
        `UPDATE sat_mock_attempts
         SET notes=$1::jsonb,
             updated_at=NOW()
         WHERE id=$2
           AND user_id=$3
           AND status='in-progress'`,
        [JSON.stringify(notes), attemptId, user.id]
      );

      return res.status(200).json({ ok: true, notes });
    }

    if (action === "position") {
      const questionIndex = Number(req.body?.questionIndex);

      if (!Number.isInteger(questionIndex) || questionIndex < 0) {
        return res
          .status(400)
          .json({ error: "Question index is required" });
      }

      await query(
        `UPDATE sat_mock_attempts
         SET current_section=COALESCE($1,current_section),
             current_module=COALESCE($2,current_module),
             current_question=$3,
             updated_at=NOW()
         WHERE id=$4
           AND user_id=$5
           AND status='in-progress'`,
        [
          req.body?.section || null,
          req.body?.module || null,
          questionIndex,
          attemptId,
          user.id,
        ]
      );

      return res.status(200).json({ ok: true });
    }

    if (action === "advance") {
      const section = attempt.current_section || req.body?.section;
      const moduleKey =
        attempt.current_module || req.body?.module || "module-1";
      const currentModuleIndex = String(moduleKey).endsWith("module-2")
        ? 1
        : 0;

      if (currentModuleIndex === 0) {
        const module1 = getModuleForRoute(plan, section, 0);
        const route = chooseModule2Route(
          module1?.questions || [],
          answers
        );

        const column =
          section === "reading-writing"
            ? "module2_route_rw"
            : "module2_route_math";

        const nextModule = getModuleForRoute(
          plan,
          section,
          1,
          route
        );

        const deadline = deadlineForModule(nextModule);

        await query(
          `UPDATE sat_mock_attempts
           SET ${column}=$1,
               current_module='module-2',
               current_question=0,
               module_started_at=NOW(),
               module_deadline_at=$2,
               break_deadline_at=NULL,
               updated_at=NOW()
           WHERE id=$3
             AND user_id=$4
             AND status='in-progress'`,
          [route, deadline, attemptId, user.id]
        );

        return res.status(200).json({
          next: {
            section,
            module: "module-2",
            question: 0,
            route,
            deadlineAt: deadline.toISOString(),
          },
        });
      }

      if (section === "reading-writing") {
        const breakDeadline = new Date(
          Date.now() + 10 * 60 * 1000
        );

        await query(
          `UPDATE sat_mock_attempts
           SET current_section='math',
               current_module='module-1',
               current_question=0,
               module_started_at=NULL,
               module_deadline_at=NULL,
               break_deadline_at=$1,
               updated_at=NOW()
           WHERE id=$2
             AND user_id=$3
             AND status='in-progress'`,
          [breakDeadline, attemptId, user.id]
        );

        return res.status(200).json({
          next: {
            break: true,
            section: "math",
            module: "module-1",
            question: 0,
            breakDeadlineAt: breakDeadline.toISOString(),
          },
        });
      }

      return res.status(200).json({ next: { complete: true } });
    }

    if (action === "finish") {
      const fresh = await query(
        `SELECT *
         FROM sat_mock_attempts
         WHERE id=$1 AND user_id=$2
         LIMIT 1`,
        [attemptId, user.id]
      );

      const currentAttempt = fresh.rows[0];

      if (!currentAttempt) {
        return res.status(404).json({ error: "Attempt not found" });
      }

      if (
        currentAttempt.status === "completed" &&
        currentAttempt.section_scores
      ) {
        return res.status(200).json({
          completed: true,
          scores: currentAttempt.section_scores,
        });
      }

      const report = buildPracticeReport(plan, currentAttempt);
      const completedAt = new Date().toISOString();

      report.completedAt = completedAt;

      await query(
        `UPDATE sat_mock_attempts
         SET status='completed',
             section_scores=$1::jsonb,
             updated_at=NOW(),
             completed_at=$2::timestamptz,
             module_deadline_at=NULL,
             break_deadline_at=NULL
         WHERE id=$3
           AND user_id=$4`,
        [
          JSON.stringify(report),
          completedAt,
          attemptId,
          user.id,
        ]
      );

      return res.status(200).json({
        completed: true,
        scores: report,
      });
    }

    return res.status(400).json({ error: "Unknown action" });
  } catch (error) {
    console.error("SAT mock progress API error:", error);
    return res
      .status(500)
      .json({ error: "Unable to save mock progress" });
  }
}
