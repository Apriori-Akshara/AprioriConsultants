/**
 * SAT-specific access helpers.
 *
 * IMPORTANT SECURITY NOTE:
 * The current Apriori frontend stores user information in a browser-readable
 * "user" cookie. Because that cookie is client-readable and not signed by this
 * Next.js application, it is NOT treated here as a cryptographically secure
 * premium-content credential.
 *
 * For Day 2, this module provides:
 * 1. A centralized way to recognize the existing login state.
 * 2. A safe internal return-path validator.
 * 3. A single integration point for a future server-verifiable session/token.
 *
 * When the backend provides a trusted session/token verification mechanism,
 * replace the legacy-cookie branch here rather than rewriting every SAT page.
 */

const SAT_LOGIN_PATH = "/Auth";
const SAT_ROOT_PATH = "/SATMocks";

/**
 * Only internal application paths are allowed as return destinations.
 *
 * This prevents a returnTo parameter from being used as an open redirect.
 */
export function getSafeSatReturnPath(value) {
  if (typeof value !== "string" || !value.trim()) {
    return SAT_ROOT_PATH;
  }

  const trimmed = value.trim();

  // Must be an internal absolute path.
  if (!trimmed.startsWith("/")) {
    return SAT_ROOT_PATH;
  }

  // Prevent protocol-relative URLs such as //attacker.example.
  if (trimmed.startsWith("//")) {
    return SAT_ROOT_PATH;
  }

  // Prevent encoded or raw control characters.
  if (/[\r\n]/.test(trimmed)) {
    return SAT_ROOT_PATH;
  }

  // Restrict the return destination to the SAT area.
  if (trimmed !== SAT_ROOT_PATH && !trimmed.startsWith(`${SAT_ROOT_PATH}/`)) {
    return SAT_ROOT_PATH;
  }

  return trimmed;
}

/**
 * Build the existing login URL with a safe SAT return path.
 */
export function getSatLoginUrl(returnTo = SAT_ROOT_PATH) {
  const safeReturnTo = getSafeSatReturnPath(returnTo);

  return `${SAT_LOGIN_PATH}?returnTo=${encodeURIComponent(safeReturnTo)}`;
}

/**
 * Parse the existing frontend user cookie.
 *
 * SECURITY:
 * This is currently only a legacy authentication-state bridge.
 * It must not be described as a secure session verification mechanism.
 *
 * Future production implementation should replace this with backend/session
 * verification when the external auth service exposes a trusted mechanism.
 */
export function parseLegacyUserCookie(cookieValue) {
  if (!cookieValue || typeof cookieValue !== "string") {
    return null;
  }

  try {
    const decoded = decodeURIComponent(cookieValue);
    const parsed = JSON.parse(decoded);

    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    if (!parsed.userId) {
      return null;
    }

    if (parsed.active === false) {
      return null;
    }

    return {
      userId: parsed.userId,
      name: parsed.name || "",
      admin: Boolean(parsed.admin),
      trial: parsed.trial,
      type: parsed.type,
      next: parsed.next,
      active: parsed.active !== false,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Server-side access-state helper.
 *
 * Current status:
 * "legacy-cookie"
 *
 * This tells the calling page that the current application only has the
 * existing frontend auth cookie available to it.
 *
 * Future status:
 * "verified-session"
 *
 * This should be returned once the external backend exposes a trusted
 * server-verifiable authentication/session mechanism.
 */
export function getSatServerAccessState(req) {
  const cookieValue = req?.cookies?.user;
  const user = parseLegacyUserCookie(cookieValue);

  if (!user) {
    return {
      authenticated: false,
      mode: "legacy-cookie",
      user: null,
    };
  }

  return {
    authenticated: true,
    mode: "legacy-cookie",
    user,
  };
}

/**
 * Future production hook.
 *
 * Keep the interface stable so Day 4+ can use it without rewriting the
 * SAT application.
 *
 * Expected future result:
 *
 * {
 *   authenticated: true,
 *   mode: "verified-session",
 *   user: {...}
 * }
 */
export async function getVerifiedSatServerAccessState(req) {
  /**
   * IMPORTANT:
   * No endpoint is invented here because the current repository does not
   * establish the external backend's session-verification contract.
   *
   * Until that contract exists, fall back to the existing login-state bridge.
   */
  return getSatServerAccessState(req);
}

export default {
  getSafeSatReturnPath,
  getSatLoginUrl,
  parseLegacyUserCookie,
  getSatServerAccessState,
  getVerifiedSatServerAccessState,
};
