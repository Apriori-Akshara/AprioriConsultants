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

    const tokenResult = await query(
      `
        SELECT id, user_id
        FROM password_reset_tokens
        WHERE token_hash = $1
          AND used_at IS NULL
          AND expires_at > NOW()
        LIMIT 1
      `,
      [tokenHash]
    );

    if (tokenResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "This password reset link is invalid or has expired.",
      });
    }

    const resetToken = tokenResult.rows[0];
    const passwordHash = await createPasswordHash(password);

    await query("BEGIN");

    try {
      await query(
        `
          UPDATE users
          SET password_hash = $1, updated_at = NOW()
          WHERE id = $2
            AND email_verified = TRUE
        `,
        [passwordHash, resetToken.user_id]
      );

      await query(
        `
          UPDATE password_reset_tokens
          SET used_at = NOW()
          WHERE id = $1
        `,
        [resetToken.id]
      );

      await query(
        `
          DELETE FROM sessions
          WHERE user_id = $1
        `,
        [resetToken.user_id]
      );

      await query("COMMIT");
    } catch (transactionError) {
      await query("ROLLBACK");
      throw transactionError;
    }

    return res.status(200).json({
      success: true,
      message: "Your password has been reset successfully. You can now log in with your Student ID and new password.",
    });
  } catch (error) {
    console.error("Password reset completion error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to reset your password. Please try again later.",
    });
  }
}
