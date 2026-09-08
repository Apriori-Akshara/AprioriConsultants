```javascript
import { query } from "../db";

const FREE_TEST_MIN = 1;
const FREE_TEST_MAX = 2;

const PREMIUM_TEST_MIN = 3;
const PREMIUM_TEST_MAX = 10;

const PREMIUM_ENTITLEMENT_CODE = "SAT_PREMIUM";

export function normalizeTestNumber(testNumber) {
  const number = Number(testNumber);

  if (!Number.isInteger(number)) {
    return null;
  }

  return number;
}

export function isValidTestNumber(testNumber) {
  const number = normalizeTestNumber(testNumber);

  return (
    number !== null &&
    number >= FREE_TEST_MIN &&
    number <= PREMIUM_TEST_MAX
  );
}

export function isFreeTest(testNumber) {
  const number = normalizeTestNumber(testNumber);

  return (
    number !== null &&
    number >= FREE_TEST_MIN &&
    number <= FREE_TEST_MAX
  );
}

export function isPremiumTest(testNumber) {
  const number = normalizeTestNumber(testNumber);

  return (
    number !== null &&
    number >= PREMIUM_TEST_MIN &&
    number <= PREMIUM_TEST_MAX
  );
}

export async function hasActivePremiumEntitlement(userId) {
  if (!userId) {
    return false;
  }

  const result = await query(
    `
      SELECT id
      FROM entitlements
      WHERE user_id = $1
        AND entitlement_code = $2
        AND status = 'active'
        AND (starts_at IS NULL OR starts_at <= NOW())
        AND (expires_at IS NULL OR expires_at > NOW())
      LIMIT 1
    `,
    [userId, PREMIUM_ENTITLEMENT_CODE]
  );

  return result.rows.length > 0;
}

export async function getSatTestAccess(userId, testNumber) {
  const number = normalizeTestNumber(testNumber);

  if (!userId) {
    return {
      allowed: false,
      reason: "not_authenticated",
      testNumber: number,
      premiumRequired: false,
    };
  }

  if (!isValidTestNumber(number)) {
    return {
      allowed: false,
      reason: "invalid_test",
      testNumber: number,
      premiumRequired: false,
    };
  }

  if (isFreeTest(number)) {
    return {
      allowed: true,
      reason: "free_test",
      testNumber: number,
      premiumRequired: false,
    };
  }

  if (isPremiumTest(number)) {
    const entitled = await hasActivePremiumEntitlement(userId);

    if (!entitled) {
      return {
        allowed: false,
        reason: "subscription_required",
        testNumber: number,
        premiumRequired: true,
      };
    }

    return {
      allowed: true,
      reason: "active_entitlement",
      testNumber: number,
      premiumRequired: true,
    };
  }

  return {
    allowed: false,
    reason: "invalid_test",
    testNumber: number,
    premiumRequired: false,
  };
}

export default {
  normalizeTestNumber,
  isValidTestNumber,
  isFreeTest,
  isPremiumTest,
  hasActivePremiumEntitlement,
  getSatTestAccess,
};
```
