import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2';

// Add this interface at the top of the file
interface User extends RowDataPacket {
  id: number;
  full_name: string;
  phone_number: string;
  email_address: string;
  password: string;
  member: boolean;
  created_at: Date;
}

export async function POST(request: Request) {
  try {
    const { email_address, password } = await request.json();

    // Input validation
    if (!email_address || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Create database connection
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'Ryan',
      database: 'EverestGolf_DB',
    });

    // Find user
    const [users] = await connection.execute<User[]>(
      'SELECT * FROM Users WHERE email_address = ?',
      [email_address]
    );
    await connection.end();

    const user = Array.isArray(users) ? users[0] : null;

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Don't send the password back to the client
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}