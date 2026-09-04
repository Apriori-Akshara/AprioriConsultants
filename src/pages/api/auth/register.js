import crypto from "crypto";
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
      [
        userId,
        name,
        email,
        passwordHash,
        false,
      ]
    );

    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Please verify your email address.",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to complete registration.",
    });
  }
}
