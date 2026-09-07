/**
 * SAT-specific server-side access helpers.
 *
 * SECURITY:
 * The authoritative SAT authentication mechanism is the server-side
 * session stored in PostgreSQL and represented to the browser by the
 * HTTP-only "session" cookie.
 *
 * The older browser-readable "user" cookie is intentionally NOT used
 * to authorize SAT access.
 */

import { getSessionUser } from "../auth";

const SAT_LOGIN_PATH = "/Auth";
const SAT_ROOT_PATH = "/SATMocks";

/**
 * Only internal SAT application paths are allowed as return destinations.
 *
 * This prevents returnTo from becoming an open redirect.
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

  // Prevent raw control characters.
  if (/[\r\n]/.test(trimmed)) {
    return SAT_ROOT_PATH;
  }

  // Restrict the return destination to the SAT area.
  if (
    trimmed !== SAT_ROOT_PATH &&
    !trimmed.startsWith(`${SAT_ROOT_PATH}/`)
  ) {
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
 * Read and verify the server-side SAT session.
 *
 * The browser-readable legacy "user" cookie is deliberately ignored.
 */
export async function getVerifiedSatServerAccessState(req) {
  const sessionToken = req?.cookies?.session;

  if (!sessionToken) {
    return {
      authenticated: false,
      mode: "verified-session",
      user: null,
    };
  }

  try {
    const user = await getSessionUser(sessionToken);

    if (!user) {
      return {
        authenticated: false,
        mode: "verified-session",
        user: null,
      };
    }

    // The session must belong to an active account.
    if (user.active === false) {
      return {
        authenticated: false,
        mode: "verified-session",
        user: null,
      };
    }

    return {
      authenticated: true,
      mode: "verified-session",
      user,
    };
  } catch (error) {
    console.error("SAT session verification error:", error);

    return {
      authenticated: false,
      mode: "verified-session",
      user: null,
    };
  }
}

export function getSatUserId(accessState) {
  if (!accessState?.authenticated) {
    return null;
  }

  return accessState.user?.id || null;
}

export default {
  getSafeSatReturnPath,
  getSatLoginUrl,
  getVerifiedSatServerAccessState,
  getSatUserId,
};
