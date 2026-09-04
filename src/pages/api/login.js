// AFTER
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
    const { name, userId, password, ipAddress, location } = req.body || {};

    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: "User ID and password are required",
      });
    }

    const result = await query(
      `
        SELECT
          id,
          user_id,
          name,
          password_hash,
          admin,
          trial,
          type,
          next,
          active,
          completed_quizzes
        FROM users
        WHERE user_id = $1
        LIMIT 1
      `,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const user = result.rows[0];

    const passwordValid = await verifyPassword(
      password,
      user.password_hash
    );

    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (name && user.name && name.trim() !== user.name.trim()) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

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
        completedQuizzes: user.completed_quizzes || [],
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
}
