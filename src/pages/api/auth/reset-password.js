import crypto from "crypto";
import { query } from "../../../lib/db";
import { createPasswordHash, ensurePasswordResetTokensTable } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  try {
    const token = req.body?.token;
    const password = req.body?.password;

    if (!token || typeof token !== "string" || !password) {
      return res.status(400).json({
        success: false,
        message: "Reset token and new password are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    await ensurePasswordResetTokensTable();

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const passwordHash = await createPasswordHash(password);

    const result = await query(
      `
        WITH valid_token AS (
          SELECT id, user_id
          FROM password_reset_tokens
          WHERE token_hash = $1
            AND used_at IS NULL
            AND expires_at > NOW()
          LIMIT 1
        ),
        updated_user AS (
          UPDATE users u
          SET password_hash = $2,
              updated_at = NOW()
          FROM valid_token v
          WHERE u.id = v.user_id
            AND u.email_verified = TRUE
          RETURNING u.id
        ),
        marked_token AS (
          UPDATE password_reset_tokens t
          SET used_at = NOW()
          FROM valid_token v
          INNER JOIN updated_user u ON u.id = v.user_id
          WHERE t.id = v.id
          RETURNING t.id
        ),
        deleted_sessions AS (
          DELETE FROM sessions s
          USING updated_user u
          WHERE s.user_id = u.id
          RETURNING s.id
        )
        SELECT u.id
        FROM updated_user u
        INNER JOIN marked_token t ON TRUE
        LIMIT 1
      `,
      [tokenHash, passwordHash]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "This password reset link is invalid or has expired.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Your password has been reset successfully. You can now log in with your Student ID and new password.",
    });
  } catch (error) {
    console.error("Password reset completion error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to reset your password. Please try again later.",
    });
  }
}
