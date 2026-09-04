import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      password,
    } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and password are required.",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1 LIMIT 1",
      [normalizedEmail]
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

    const result = await pool.query(
      `
      INSERT INTO users (
        name,
        email,
        password,
        email_verified
      )
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, email_verified
      `,
      [
        name.trim(),
        normalizedEmail,
        password,
        false,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful.",
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
