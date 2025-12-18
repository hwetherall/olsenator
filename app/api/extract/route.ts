import { NextRequest, NextResponse } from 'next/server';
import { extractMemoData } from '@/lib/openrouter';

export const maxDuration = 60; // Allow up to 60 seconds for extraction

interface ExtractRequest {
  memo: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ExtractRequest = await request.json();

    if (!body.memo || typeof body.memo !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid memo content' },
        { status: 400 }
      );
    }

    if (body.memo.trim().length < 100) {
      return NextResponse.json(
        { success: false, error: 'Memo content is too short. Please paste the full investment memo.' },
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

    console.log(`Processing memo extraction (${body.memo.length} characters)...`);
    const startTime = Date.now();

    const result = await extractMemoData(body.memo, apiKey);

    const duration = Date.now() - startTime;
    console.log(`Extraction completed in ${duration}ms, success: ${result.success}`);

    if (!result.success) {
      console.error('Extraction failed:', result.error);
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
    console.error('Unexpected error in extract route:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      },
      { status: 500 }
    );
  }
}

