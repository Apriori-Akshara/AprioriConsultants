import { query } from "../../../lib/db";
import { getVerifiedSatServerAccessState } from "../../../lib/sat/satAccess";
import {
  INTERNAL_UNLOCK_CODES,
  getInternalUnlockState,
  hasCompletedAllFirstTenForBoth,
  grantInternalUnlock,
  revokeInternalUnlock,
} from "../../../lib/sat/testAccess";

async function requireAdmin(req, res) {
  const accessState = await getVerifiedSatServerAccessState(req);
  if (!accessState.authenticated || accessState.user?.admin !== true) {
    res.status(403).json({ error: "Admin access required" });
    return null;
  }
  return accessState.user;
}

async function resolveUser(value) {
  const identifier = String(value || "").trim();
  if (!identifier) return null;
  const result = await query(
    `SELECT id, user_id, name, email, admin, active
       FROM users
      WHERE LOWER(email) = LOWER($1)
         OR user_id = $1
      ORDER BY id
      LIMIT 1`,
    [identifier]
  );
  return result.rows[0] || null;
}

export default async function handler(req, res) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  try {
    const user = await resolveUser(req.method === "GET" ? req.query?.identifier : req.body?.identifier);

    if (req.method === "GET") {
      if (!user) return res.status(200).json({ user: null });
      const unlocks = await getInternalUnlockState(user.id);
      const completedBoth = await hasCompletedAllFirstTenForBoth(user.id);
      return res.status(200).json({
        user,
        unlocks,
        completedFirstTenForBoth: completedBoth,
      });
    }

    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    if (!user) return res.status(404).json({ error: "Student not found" });

    const action = String(req.body?.action || "");
    const code = action === "grant_8_10"
      ? INTERNAL_UNLOCK_CODES.TESTS_8_10
      : action === "grant_11_20"
        ? INTERNAL_UNLOCK_CODES.SAT_TESTS_11_20
        : action === "revoke_8_10" || action === "revoke_11_20"
          ? (action === "revoke_8_10" ? INTERNAL_UNLOCK_CODES.TESTS_8_10 : INTERNAL_UNLOCK_CODES.SAT_TESTS_11_20)
          : null;

    if (!code) return res.status(400).json({ error: "Invalid unlock action" });

    if (action === "grant_11_20") {
      const completedBoth = await hasCompletedAllFirstTenForBoth(user.id);
      if (!completedBoth) {
        return res.status(409).json({ error: "SAT Tests 11–20 can only be unlocked after Tests 1–10 are completed for both PSAT and SAT." });
      }
    }

    if (action.startsWith("grant_")) await grantInternalUnlock(user.id, code);
    else await revokeInternalUnlock(user.id, code);

    const unlocks = await getInternalUnlockState(user.id);
    const completedBoth = await hasCompletedAllFirstTenForBoth(user.id);
    return res.status(200).json({ user, unlocks, completedFirstTenForBoth: completedBoth });
  } catch (error) {
    console.error("SAT internal unlock API error:", error);
    return res.status(500).json({ error: "Unable to update SAT internal unlock" });
  }
}
