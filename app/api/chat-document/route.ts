import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    // Read the markdown document from the chat folder
    const filePath = path.join(process.cwd(), 'app', 'chat', '2026-01-13_NLM_RIC_Project_.md');
    const content = await readFile(filePath, 'utf-8');
    
    // Return plain text content
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Failed to read chat document:', error);
    return new NextResponse('Failed to load document', {
      status: 500,
    });
  }
}
