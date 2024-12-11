import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse'; // Corrected import for csv-parse
import { stringify } from 'csv-stringify';
import { NextResponse } from 'next/server';

// Path to the Excel file (CSV format)
const filePath = path.resolve('public', 'data.csv');

const parseCSV = (content) =>
  new Promise((resolve, reject) => {
    parse(content, { columns: true }, (err, records) => {
      if (err) reject(err);
      else resolve(records);
    });
  });

const stringifyCSV = (data) =>
  new Promise((resolve, reject) => {
    stringify(data, { header: true }, (err, output) => {
      if (err) reject(err);
      else resolve(output);
    });
  });

export async function POST(request) {
  try {
    const query = await request.text();
    const params = {};
    query.split('&').forEach((pair) => {
      if (pair) {
        const [key, value] = pair.split('=');
        params[key] = decodeURIComponent(value);
      }
    });

    const { app, sender, phone, message } = params;

    // Validate input
    if (!app || !sender || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Read existing data from the file
    const fileContent = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, 'utf-8')
      : '';
    const data = fileContent.trim() ? await parseCSV(fileContent) : [];

    // Prepare data
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const todayDate = `${day}/${month}/${year}`;
    const requestType = 'new request';

    // Add new entry
    data.push({ app, sender, phone, message, todayDate, requestType });

    // Write updated data back to the file
    const csvContent = await stringifyCSV(data);
    fs.writeFileSync(filePath, csvContent, 'utf-8');

    return NextResponse.json(
      { reply: 'Data added successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}


export async function GET(request) {
  const filePath = path.resolve('public', 'data.csv');

  try {
    // Read the file
    const fileStream = fs.createReadStream(filePath);

    // Set headers to trigger download
    const response = new NextResponse(fileStream);
    response.headers.set('Content-Type', 'text/csv');
    response.headers.set('Content-Disposition', 'attachment; filename="data.csv"');

    return response;
  } catch (error) {
    // Handle error if file is not found
    return NextResponse.json({ error: 'File not found or error while processing.' }, { status: 500 });
  }
}