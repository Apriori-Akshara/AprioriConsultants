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
 *
 * This module intentionally contains no server-side imports.
 */
export function getSatLoginUrl(returnTo = SAT_ROOT_PATH) {
  const safeReturnTo = getSafeSatReturnPath(returnTo);

  return `${SAT_LOGIN_PATH}?returnTo=${encodeURIComponent(safeReturnTo)}`;
}

export default {
  getSafeSatReturnPath,
  getSatLoginUrl,
};
