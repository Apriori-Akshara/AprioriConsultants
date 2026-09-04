import crypto from "crypto";
import { query } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  try {
    const token = req.query.token;

    if (!token || typeof token !== "string") {
      return res.status(400).json({
        success: false,
        message: "Verification token is missing.",
      });
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const result = await query(
      `
        SELECT
          id,
          user_id,
          expires_at,
          used_at
        FROM email_verification_tokens
        WHERE token_hash = $1
        LIMIT 1
      `,
      [tokenHash]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "This verification link is invalid.",
      });
    }

    const verificationToken = result.rows[0];

    if (verificationToken.used_at) {
      return res.status(400).json({
        success: false,
        message: "This verification link has already been used.",
      });
    }

    if (new Date(verificationToken.expires_at) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "This verification link has expired.",
      });
    }

    await query("BEGIN");

    try {
      await query(
        `
          UPDATE users
          SET
            email_verified = TRUE,
            updated_at = NOW()
          WHERE id = $1
        `,
        [verificationToken.user_id]
      );

      await query(
        `
          UPDATE email_verification_tokens
          SET used_at = NOW()
          WHERE id = $1
        `,
        [verificationToken.id]
      );

      await query("COMMIT");
    } catch (transactionError) {
      await query("ROLLBACK");
      throw transactionError;
    }

    return res.status(200).json({
      success: true,
      message: "Your email has been verified successfully.",
    });
  } catch (error) {
    console.error("Email verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to verify your email address.",
    });
  }
}
