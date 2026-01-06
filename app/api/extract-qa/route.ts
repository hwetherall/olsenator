import { NextRequest, NextResponse } from 'next/server';
import { extractQAData } from '@/lib/openrouter';

export const maxDuration = 60; // Allow up to 60 seconds for extraction

interface ExtractQARequest {
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ExtractQARequest = await request.json();

    if (!body.content || typeof body.content !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid Q&A content' },
        { status: 400 }
      );
    }

    if (body.content.trim().length < 100) {
      return NextResponse.json(
        { success: false, error: 'Q&A content is too short. Please paste the full Q&A document.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error('OPENROUTER_API_KEY is not configured');
      return NextResponse.json(
        { success: false, error: 'Server configuration error: API key not configured' },
        { status: 500 }
      );
    }

    console.log(`Processing Q&A extraction (${body.content.length} characters)...`);
    const startTime = Date.now();

    const result = await extractQAData(body.content, apiKey);

    const duration = Date.now() - startTime;
    console.log(`Q&A extraction completed in ${duration}ms, success: ${result.success}`);

    if (!result.success) {
      console.error('Q&A extraction failed:', result.error);
      return NextResponse.json(
        { 
          success: false, 
          error: result.error,
          retried: result.retried 
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      retried: result.retried,
      duration,
    });
  } catch (error) {
    console.error('Unexpected error in extract-qa route:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      },
      { status: 500 }
    );
  }
}
