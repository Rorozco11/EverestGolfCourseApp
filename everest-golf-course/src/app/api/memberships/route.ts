import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  try {
    const { full_name, phone_number, email_address, town, comments } = await request.json();

    // Create database connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Insert membership request into database
    await connection.execute(
      `INSERT INTO MembershipRequests (
        full_name,
        phone_number,
        email_address,
        town,
        comments,
        created_at
      ) VALUES (?, ?, ?, ?, ?, NOW())`,
      [full_name, phone_number, email_address, town, comments]
    );

    await connection.end();

    return NextResponse.json({ message: 'Membership request submitted successfully' });
  } catch (error) {
    console.error('Membership request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 