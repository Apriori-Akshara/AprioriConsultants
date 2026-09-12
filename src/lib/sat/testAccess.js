import { query } from "../db";

const FREE_TEST_MIN = 1;
const FREE_TEST_MAX = 10;
const PREMIUM_TEST_MIN = 3;
const PREMIUM_TEST_MAX = 10;
const SAT_TEST_MAX = 20;

const PREMIUM_ENTITLEMENT_CODE = "SAT_PREMIUM";
const INTERNAL_UNLOCK_8_10 = "SAT_INTERNAL_UNLOCK_8_10";
const INTERNAL_UNLOCK_11_20 = "SAT_INTERNAL_UNLOCK_11_20";

export function normalizeTestNumber(testNumber) {
  const number = Number(testNumber);
  return Number.isInteger(number) ? number : null;
}

export function normalizeAssessmentFamily(value) {
  const family = String(value || "").trim().toLowerCase();
  if (family === "psat" || family === "psat-nmsqt") return "psat";
  if (family === "sat" || family === "sat-series-a") return "sat";
  return null;
}

export function isValidTestNumber(testNumber) {
  const number = normalizeTestNumber(testNumber);
  return number !== null && number >= FREE_TEST_MIN && number <= SAT_TEST_MAX;
}

export function isFreeTest(testNumber) {
  const number = normalizeTestNumber(testNumber);
  return number !== null && number >= FREE_TEST_MIN && number <= FREE_TEST_MAX;
}

export function isPremiumTest(testNumber) {
  const number = normalizeTestNumber(testNumber);
  return number !== null && number >= PREMIUM_TEST_MIN && number <= PREMIUM_TEST_MAX;
}

function isActiveRow(row) {
  if (!row || row.status !== "active") return false;
  const now = Date.now();
  const startsAt = row.starts_at ? new Date(row.starts_at).getTime() : null;
  const expiresAt = row.expires_at ? new Date(row.expires_at).getTime() : null;
  return (!startsAt || startsAt <= now) && (!expiresAt || expiresAt > now);
}

export async function hasActiveEntitlement(userId, entitlementCode) {
  if (!userId) return false;
  const result = await query(
    `SELECT status, starts_at, expires_at FROM entitlements WHERE user_id = $1 AND entitlement_code = $2 ORDER BY id DESC LIMIT 1`,
    [userId, entitlementCode]
  );
  return isActiveRow(result.rows[0]);
}

export async function hasActivePremiumEntitlement(userId) {
  return hasActiveEntitlement(userId, PREMIUM_ENTITLEMENT_CODE);
}

export async function hasInternalUnlock(userId, assessmentFamily, testNumber) {
  const family = normalizeAssessmentFamily(assessmentFamily);
  const number = normalizeTestNumber(testNumber);
  if (!userId || !family || !number) return false;
  if (number >= 8 && number <= 10) return hasActiveEntitlement(userId, INTERNAL_UNLOCK_8_10);
  if (family === "sat" && number >= 11 && number <= 20) return hasActiveEntitlement(userId, INTERNAL_UNLOCK_11_20);
  return false;
}

export async function hasCompletedAllFirstTen(userId, assessmentFamily) {
  const family = normalizeAssessmentFamily(assessmentFamily);
  if (!userId || !family) return false;
  const prefix = family.toUpperCase();
  const expected = Array.from({ length: 10 }, (_, index) => `${prefix}${index + 1}`);
  const result = await query(
    `SELECT DISTINCT test_key FROM sat_mock_attempts WHERE user_id = $1 AND status = 'completed' AND test_key = ANY($2::text[])`,
    [userId, expected]
  );
  return result.rows.length === expected.length;
}

export async function hasCompletedAllFirstTenForBoth(userId) {
  const [psat, sat] = await Promise.all([hasCompletedAllFirstTen(userId, "psat"), hasCompletedAllFirstTen(userId, "sat")]);
  return psat && sat;
}

export async function getSatTestAccess(userId, testNumber, assessmentFamily = "sat") {
  const number = normalizeTestNumber(testNumber);
  const family = normalizeAssessmentFamily(assessmentFamily);
  if (!userId) return { allowed: false, reason: "not_authenticated", testNumber: number, assessmentFamily: family, premiumRequired: false, internalUnlock: false };
  if (!family) return { allowed: false, reason: "invalid_assessment_family", testNumber: number, assessmentFamily: null, premiumRequired: false, internalUnlock: false };
  if (!isValidTestNumber(number)) return { allowed: false, reason: "invalid_test", testNumber: number, assessmentFamily: family, premiumRequired: false, internalUnlock: false };
  if (isFreeTest(number)) return { allowed: true, reason: "free_test", testNumber: number, assessmentFamily: family, premiumRequired: false, internalUnlock: false };

  if (number >= 11 && number <= 20) {
    if (family !== "sat") return { allowed: false, reason: "not_configured", testNumber: number, assessmentFamily: family, premiumRequired: false, internalUnlock: false };
    const unlocked = await hasInternalUnlock(userId, family, number);
    return unlocked ? { allowed: true, reason: "internal_unlock", testNumber: number, assessmentFamily: family, premiumRequired: false, internalUnlock: true } : { allowed: false, reason: "internal_unlock_required", testNumber: number, assessmentFamily: family, premiumRequired: false, internalUnlock: false };
  }

  if (number >= 8 && number <= 10 && await hasInternalUnlock(userId, family, number)) {
    return { allowed: true, reason: "internal_unlock", testNumber: number, assessmentFamily: family, premiumRequired: true, internalUnlock: true };
  }

  if (isPremiumTest(number)) {
    const entitled = await hasActivePremiumEntitlement(userId);
    if (!entitled) return { allowed: false, reason: "subscription_required", testNumber: number, assessmentFamily: family, premiumRequired: true, internalUnlock: false };
    return { allowed: true, reason: "active_entitlement", testNumber: number, assessmentFamily: family, premiumRequired: true, internalUnlock: false };
  }

  return { allowed: false, reason: "invalid_test", testNumber: number, assessmentFamily: family, premiumRequired: false, internalUnlock: false };
}

export async function grantInternalUnlock(userId, entitlementCode) {
  if (!userId) throw new Error("User ID is required");
  if (![INTERNAL_UNLOCK_8_10, INTERNAL_UNLOCK_11_20].includes(entitlementCode)) throw new Error("Invalid internal unlock code");
  const existing = await query(`SELECT id FROM entitlements WHERE user_id = $1 AND entitlement_code = $2 ORDER BY id DESC LIMIT 1`, [userId, entitlementCode]);
  if (existing.rows[0]) {
    await query(`UPDATE entitlements SET status = 'active', starts_at = COALESCE(starts_at, NOW()), updated_at = NOW() WHERE id = $1`, [existing.rows[0].id]);
    return;
  }
  await query(`INSERT INTO entitlements (user_id, entitlement_code, status, starts_at) VALUES ($1, $2, 'active', NOW())`, [userId, entitlementCode]);
}

export async function revokeInternalUnlock(userId, entitlementCode) {
  await query(`UPDATE entitlements SET status = 'revoked', updated_at = NOW() WHERE user_id = $1 AND entitlement_code = $2`, [userId, entitlementCode]);
}

export async function getInternalUnlockState(userId) {
  const result = await query(`SELECT entitlement_code, status, starts_at, expires_at FROM entitlements WHERE user_id = $1 AND entitlement_code IN ($2, $3) ORDER BY entitlement_code`, [userId, INTERNAL_UNLOCK_8_10, INTERNAL_UNLOCK_11_20]);
  return result.rows;
}

export const INTERNAL_UNLOCK_CODES = { TESTS_8_10: INTERNAL_UNLOCK_8_10, SAT_TESTS_11_20: INTERNAL_UNLOCK_11_20 };

export default { normalizeTestNumber, normalizeAssessmentFamily, isValidTestNumber, isFreeTest, isPremiumTest, hasActivePremiumEntitlement, hasInternalUnlock, hasCompletedAllFirstTen, hasCompletedAllFirstTenForBoth, getSatTestAccess, grantInternalUnlock, revokeInternalUnlock, getInternalUnlockState, INTERNAL_UNLOCK_CODES };
