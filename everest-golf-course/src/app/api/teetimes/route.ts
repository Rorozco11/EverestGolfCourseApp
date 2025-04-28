import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  // Create a connection to the database
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Ryan',
    database: 'EverestGolf_DB',
  });

  // Example query: get all tee times
  const [rows] = await connection.execute('SELECT * FROM teetimes ORDER BY times ASC');
  await connection.end();

  return NextResponse.json(rows);
}
