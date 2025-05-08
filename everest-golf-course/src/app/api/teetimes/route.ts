import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  // Create a connection to the database
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // Example query: get all tee times
  const [rows] = await connection.execute('SELECT * FROM TeeTimes ORDER BY times ASC');
  await connection.end();

  return NextResponse.json(rows);
}

const query = `
  INSERT INTO Users (
    full_name, 
    phone_number, 
    email_address, 
    password,
    member
  ) VALUES (?, ?, ?, ?, ?)
`;
