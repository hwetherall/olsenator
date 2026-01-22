import { NextRequest, NextResponse } from 'next/server';
import { extractV2Data } from '@/lib/openrouter';
import { isStructuredV2Input } from '@/lib/v2-prompts';

export const maxDuration = 60; // Allow up to 60 seconds for extraction

interface ExtractV2Request {
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ExtractV2Request = await request.json();

    if (!body.content || typeof body.content !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid content' },
        { status: 400 }
      );
    }

    if (body.content.trim().length < 100) {
      return NextResponse.json(
        { success: false, error: 'Content is too short. Please paste the full document.' },
        { status: 400 }
      );
    }

    const startTime = Date.now();
    const isStructured = isStructuredV2Input(body.content);
    
    if (isStructured) {
      console.log('Detected pre-structured V2 input, sending to AI for transformation...');
    }

    // Always use AI extraction to transform input into final V2 schema
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error('OPENROUTER_API_KEY is not configured');
      return NextResponse.json(
        { success: false, error: 'Server configuration error: API key not configured' },
        { status: 500 }
      );
    }

    console.log(`Processing V2 extraction (${body.content.length} characters)...`);

    const result = await extractV2Data(body.content, apiKey);

    const duration = Date.now() - startTime;
    console.log(`V2 extraction completed in ${duration}ms, success: ${result.success}`);

    if (!result.success) {
      console.error('V2 extraction failed:', result.error);
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
    console.error('Unexpected error in extract-v2 route:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      },
      { status: 500 }
    );
  }
}
