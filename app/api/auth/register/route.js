import { NextResponse } from "next/server";
import { query } from "../../../../src/lib/db";
import { createPasswordHash } from "../../../../src/lib/auth";
import crypto from "crypto";

export async function POST(request) {
  try {
    const body = await request.json();

    const name = body?.name?.trim();
    const email = body?.email?.trim()?.toLowerCase();
    const password = body?.password;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and password are required.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters long.",
        },
        { status: 400 }
      );
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
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists.",
        },
        { status: 409 }
      );
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

    return NextResponse.json(
      {
        success: true,
        message:
          "Registration successful. Please verify your email address.",
        user: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to complete registration.",
      },
      { status: 500 }
    );
  }
}
