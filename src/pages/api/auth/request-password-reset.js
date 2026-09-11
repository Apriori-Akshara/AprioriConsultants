import crypto from "crypto";
import { Resend } from "resend";
import { query } from "../../../lib/db";
import { ensurePasswordResetTokensTable } from "../../../lib/auth";

function getAppOrigin() {
  return (
    process.env.NEXT_PUBLIC_APP_ORIGIN ||
    "https://www.aprioriconsultants.org"
  ).replace(/\/$/, "");
}

function getEmailFrom() {
  return process.env.EMAIL_FROM || "Apriori Consultants <noreply@aprioriconsultants.org>";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  try {
    const email = req.body?.email?.trim()?.toLowerCase();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter the email address used for your account.",
      });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Password reset email configuration is incomplete: RESEND_API_KEY is missing.");
      return res.status(500).json({
        success: false,
        message: "Password recovery is temporarily unavailable. Please try again later.",
      });
    }

    await ensurePasswordResetTokensTable();

    const result = await query(
      `
        SELECT id, user_id, name, email
        FROM users
        WHERE LOWER(email) = $1
          AND email_verified = TRUE
        LIMIT 1
      `,
      [email]
    );

    const genericMessage =
      "If a verified account exists for this email, we have sent a recovery email with your Student ID and a password reset link.";

    if (result.rows.length === 0) {
      return res.status(200).json({ success: true, message: genericMessage });
    }

    const user = result.rows[0];
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    await query(
      `
        UPDATE password_reset_tokens
        SET used_at = NOW()
        WHERE user_id = $1
          AND used_at IS NULL
      `,
      [user.id]
    );

    await query(
      `
        INSERT INTO password_reset_tokens (
          user_id,
          token_hash,
          expires_at
        )
        VALUES ($1, $2, NOW() + INTERVAL '30 minutes')
      `,
      [user.id, tokenHash]
    );

    const resetUrl =
      `${getAppOrigin()}/ResetPassword?token=${encodeURIComponent(token)}`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error: emailError } = await resend.emails.send({
      from: getEmailFrom(),
      to: user.email,
      subject: "Apriori Consultants account recovery",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <h2>Apriori Consultants account recovery</h2>
          <p>Dear ${user.name},</p>
          <p>We received a request to recover your SAT Mock Test account.</p>
          <p><strong>Your Student ID:</strong> ${user.user_id}</p>
          <p>Use the button below to create a new password:</p>
          <p style="margin: 30px 0;">
            <a
              href="${resetUrl}"
              style="display:inline-block;padding:12px 24px;background:#000000;color:#ffffff;text-decoration:none;border-radius:6px;"
            >
              Reset My Password
            </a>
          </p>
          <p>This reset link expires in 30 minutes and can be used only once.</p>
          <p>If you did not request this, you can safely ignore this email.</p>
          <p>Regards,<br />Apriori Consultants</p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Password reset email error:", emailError);
      return res.status(502).json({
        success: false,
        message: "We could not send the recovery email. Please try again later.",
      });
    }

    return res.status(200).json({ success: true, message: genericMessage });
  } catch (error) {
    console.error("Password reset request error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to start password recovery. Please try again later.",
    });
  }
}
