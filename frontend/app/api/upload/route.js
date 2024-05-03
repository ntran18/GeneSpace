const { NextResponse } = require('next/server');
const xlsx = require('xlsx');
import { preprocessingData } from '@/utils/data';
const csvParse = require('csv-parse');

async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file uploaded' });
  }

  // Check if the uploaded file is an Excel file
  if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
    return NextResponse.json({ success: false, message: 'Uploaded file must be an Excel file' });
  }

  try {
    // Read the file contents
    const bytes = await file.arrayBuffer()
    const fileBuffer = Buffer.from(bytes)
    
    // Parse the Excel file from binary data
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    
    // Extract data from the first sheet
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const excelData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    const graph = preprocessingData(excelData)
    // Return a JSON response with the parsed Excel data
    return NextResponse.json({ success: true, graph});
  } catch (error) {
    console.error('Error processing Excel file:', error);
    return NextResponse.json({ success: false, message: 'Error processing Excel file' });
  }
}

module.exports = { POST };
