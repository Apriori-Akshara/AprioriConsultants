import crypto from "crypto";
import { query } from "./db";

const SESSION_DURATION_SECONDS = 6 * 60 * 60;

function hashPassword(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(derivedKey.toString("hex"));
    });
  });
}

export async function verifyPassword(password, storedPassword) {
  const [salt, storedHash] = storedPassword.split(":");

  if (!salt || !storedHash) {
    return false;
  }

  const derivedHash = await hashPassword(password, salt);

  return crypto.timingSafeEqual(
    Buffer.from(derivedHash, "hex"),
    Buffer.from(storedHash, "hex")
  );
}

export function createPasswordHash(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");

    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(`${salt}:${derivedKey.toString("hex")}`);
    });
  });
}

export async function ensurePasswordResetTokensTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL UNIQUE,
      expires_at TIMESTAMPTZ NOT NULL,
      used_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE INDEX IF NOT EXISTS password_reset_tokens_user_id_idx
    ON password_reset_tokens(user_id)
  `);

  await query(`
    CREATE INDEX IF NOT EXISTS password_reset_tokens_active_idx
    ON password_reset_tokens(token_hash, expires_at)
    WHERE used_at IS NULL
  `);
}

export async function createSession(userId) {
  const sessionToken = crypto.randomBytes(32).toString("hex");

  await query(
    `
      INSERT INTO sessions (
        session_token,
        user_id,
        expires_at
      )
      VALUES ($1, $2, NOW() + INTERVAL '6 hours')
    `,
    [sessionToken, userId]
  );

  return sessionToken;
}

export async function getSessionUser(sessionToken) {
  if (!sessionToken) {
    return null;
  }

  const result = await query(
    `
      SELECT
        u.id,
        u.user_id,
        u.name,
        u.admin,
        u.trial,
        u.type,
        u.next,
        u.active,
        u.completed_quizzes
      FROM sessions s
      INNER JOIN users u
        ON u.id = s.user_id
      WHERE s.session_token = $1
        AND s.expires_at > NOW()
      LIMIT 1
    `,
    [sessionToken]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}

export function setSessionCookie(res, sessionToken) {
  const cookie = [
    `session=${sessionToken}`,
    "Path=/",
    `Max-Age=${SESSION_DURATION_SECONDS}`,
    "HttpOnly",
    "SameSite=Lax",
    process.env.NODE_ENV === "production" ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  res.setHeader("Set-Cookie", cookie);
}
