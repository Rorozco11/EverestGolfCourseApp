import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    // Create MySQL connection
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'Ryan',
      database: 'EverestGolf_DB',
    });
    
    const { full_name, phone_number, email_address, password, member } = await request.json();

    // Basic validation
    if (!email_address || !password || !full_name ) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Hash the password with minimum salt rounds (4) for fastest processing
    const hashedPassword = await bcrypt.hash(password || '', 4); // Handle even if password is empty

    // Insert the user into the database with all fields
    const query = `
      INSERT INTO Users (
        full_name, 
        phone_number, 
        email_address, 
        password,
        member
      ) VALUES (?, ?, ?, ?, ?)
    `;

    try {
      await connection.execute(query, [
        full_name, 
        phone_number || null, 
        email_address, 
        hashedPassword, 
        member || null
      ]);

      await connection.end(); // Close the connection

      return NextResponse.json(
        { 
          message: 'User created successfully',
          success: true,
          popupMessage: 'You have successfully signed up. Please log in.'
        },
        { status: 201 }
      );
    } catch (dbError: any) {
      // Check for duplicate email
      if (dbError.code === 'ER_DUP_ENTRY') {
        return NextResponse.json(
          { message: 'Email already exists' },
          { status: 400 }
        );
      }
      throw dbError; // Re-throw if it's not a duplicate error
    }

  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
