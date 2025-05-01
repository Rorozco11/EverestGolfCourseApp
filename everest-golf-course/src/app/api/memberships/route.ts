import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  try {
    const { full_name, phone_number, email_address, town, comments } = await request.json();

    // Create database connection
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'Ryan',
      database: 'EverestGolf_DB',
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