import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { full_name, email_address, password } = await request.json();

    // Basic validation
    if (!full_name || !email_address || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    await sql`
      INSERT INTO EverestGolfCourse_DB.Users (full_name, email_address, password)
      VALUES (${full_name}, ${email_address}, ${hashedPassword})
    `;

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    // Check for duplicate email
    if (error.code === '23505') { // PostgreSQL unique constraint violation
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 400 }
      );
    }

    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
