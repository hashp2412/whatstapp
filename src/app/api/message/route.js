import fs from 'fs';
import path from 'path';
import { parse, stringify } from 'csv/sync';
import { NextResponse } from 'next/server';

// Path to the Excel file (CSV format)
const filePath = ('/data.csv');

export async function POST(request) {
  
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
    
    // Read existing data from the file
    let data = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      data = parse(fileContent, { columns: true });
    }

    // Check if the entry already exists
   

    

    // Add new entry to the data
    data.push({ app, sender, phone, message });

    // Write updated data back to the file
    const csvContent = stringify(data, { header: true });
    fs.writeFileSync(filePath, csvContent, 'utf-8');

    return NextResponse.json(
      { reply: 'Data added successfully'},
      { status: 201 }
    );
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