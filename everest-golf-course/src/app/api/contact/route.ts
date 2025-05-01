import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  try {
    const { full_name, phone_number, email_address, message } = await request.json();

    // Create database connection
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'Ryan',
      database: 'EverestGolf_DB',
    });

    // Insert the contact form data into the database
    await connection.execute(
      'INSERT INTO contact_submissions (full_name, phone_number, email_address, message) VALUES (?, ?, ?, ?)',
      [full_name, phone_number, email_address, message]
    );

    // Close the connection
    await connection.end();

    return NextResponse.json({ message: 'Contact form submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
} 