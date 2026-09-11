import { query } from "../../lib/db";
import {
  verifyPassword,
  createSession,
  setSessionCookie,
} from "../../lib/auth";

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
      typeof userId === "string" ? userId.trim().toUpperCase() : "";

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
        WHERE UPPER(user_id) = $1
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

    const passwordValid = await verifyPassword(password, user.password_hash);

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

    const sessionToken = await createSession(user.id);
    setSessionCookie(res, sessionToken);

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
