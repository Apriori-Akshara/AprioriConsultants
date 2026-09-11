import crypto from "crypto";
import { query } from "../../lib/db";

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

async function verifyLoginPassword(password, storedPassword) {
  if (typeof storedPassword !== "string") {
    return false;
  }

  const separator = storedPassword.indexOf(":");
  if (separator <= 0) {
    return false;
  }

  const salt = storedPassword.slice(0, separator);
  const storedHash = storedPassword.slice(separator + 1);

  if (!salt || !storedHash || !/^[0-9a-f]+$/i.test(storedHash)) {
    return false;
  }

  const derivedHash = await hashPassword(password, salt);
  const expected = Buffer.from(derivedHash, "hex");
  const actual = Buffer.from(storedHash, "hex");

  if (expected.length !== actual.length) {
    return false;
  }

  return crypto.timingSafeEqual(expected, actual);
}

async function createLoginSession(userId) {
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

function setLoginSessionCookie(res, sessionToken) {
  const cookie = [
    `session=${sessionToken}`,
    "Path=/",
    `Max-Age=${SESSION_DURATION_SECONDS}`,
    "HttpOnly",
    "SameSite=Lax",
    "Secure",
  ].join("; ");

  res.setHeader("Set-Cookie", cookie);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { userId, password, ipAddress, location } = req.body || {};
    const normalizedUserId =
      typeof userId === "string" ? userId.trim() : "";

    if (!normalizedUserId || typeof password !== "string" || !password) {
      return res.status(400).json({
        success: false,
        message: "Student ID and password are required",
      });
    }

    const result = await query(
      `
        SELECT
          id,
          user_id,
          name,
          password_hash,
          email_verified,
          admin,
          trial,
          type,
          next,
          active,
          completed_quizzes
        FROM users
        WHERE LOWER(TRIM(user_id)) = LOWER($1)
        LIMIT 1
      `,
      [normalizedUserId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid Student ID or password.",
      });
    }

    const user = result.rows[0];

    if (!user.email_verified) {
      return res.status(403).json({
        success: false,
        message:
          "Please verify your email address before logging in. Check your email for the verification link.",
      });
    }

    const passwordValid = await verifyLoginPassword(
      password,
      user.password_hash
    );

    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Student ID or password.",
      });
    }

    try {
      await query(
        `
          INSERT INTO login_logs (
            user_id,
            ip_address,
            location
          )
          VALUES ($1, $2, $3)
        `,
        [user.id, ipAddress || null, location || null]
      );
    } catch (logError) {
      console.error("Login log error:", logError);
    }

    const sessionToken = await createLoginSession(user.id);
    setLoginSessionCookie(res, sessionToken);

    return res.status(200).json({
      success: true,
      user: {
        userId: user.user_id,
        name: user.name,
        admin: user.admin,
        trial: user.trial,
        type: user.type,
        next: user.next,
        active: user.active,
        email_verified: user.email_verified,
        completedQuizzes: user.completed_quizzes || [],
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to complete login. Please try again later.",
    });
  }
}
