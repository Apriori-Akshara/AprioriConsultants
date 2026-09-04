import crypto from "crypto";
import { Resend } from "resend";
import { query } from "../../../lib/db";
import { createPasswordHash } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  try {
    const body = req.body || {};

    const name = body?.name?.trim();
    const email = body?.email?.trim()?.toLowerCase();
    const password = body?.password;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    const existingUser = await query(
      `
        SELECT id
        FROM users
        WHERE LOWER(email) = $1
        LIMIT 1
      `,
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const passwordHash = await createPasswordHash(password);

    const userId =
      "SAT-" +
      crypto.randomBytes(4).toString("hex").toUpperCase();

    const result = await query(
      `
        INSERT INTO users (
          user_id,
          name,
          email,
          password_hash,
          email_verified
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING
          id,
          user_id,
          name,
          email,
          email_verified
      `,
      [userId, name, email, passwordHash, false]
    );

    const user = result.rows[0];

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const verificationTokenHash = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    await query(
      `
        INSERT INTO email_verification_tokens (
          user_id,
          token_hash,
          expires_at
        )
        VALUES (
          $1,
          $2,
          NOW() + INTERVAL '24 hours'
        )
      `,
      [user.id, verificationTokenHash]
    );

    const verificationUrl =
      `https://aprioriconsultants.onrender.com/VerifyEmail?token=${encodeURIComponent(
        verificationToken
      )}`;

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from:
        process.env.EMAIL_FROM ||
        "Apriori Consultants <onboarding@resend.dev>",
      to: email,
      subject: "Verify your Apriori Consultants account",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Apriori Consultants</h2>

          <p>Dear ${name},</p>

          <p>
            Thank you for registering for the SAT Mock Test platform.
          </p>

          <p>
            Please verify your email address by clicking the button below:
          </p>

          <p style="margin: 30px 0;">
            <a
              href="${verificationUrl}"
              style="
                display: inline-block;
                padding: 12px 24px;
                background: #000000;
                color: #ffffff;
                text-decoration: none;
                border-radius: 6px;
              "
            >
              Verify My Email
            </a>
          </p>

          <p>
            This verification link will expire in 24 hours.
          </p>

          <p>
            If you did not create this account, you can safely ignore this email.
          </p>

          <p>
            Regards,<br />
            Apriori Consultants
          </p>
        </div>
      `,
    });

    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Please check your email and click the verification link.",
      user: {
        id: user.id,
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        email_verified: user.email_verified,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to complete registration.",
    });
  }
}
