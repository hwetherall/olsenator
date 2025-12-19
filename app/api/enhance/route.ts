import { NextRequest, NextResponse } from 'next/server';
import { ExtractionResult } from '@/lib/schema';

export const maxDuration = 60;

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'google/gemini-2.5-pro-preview';

interface EnhanceRequest {
  data: ExtractionResult;
}

interface EnhanceResponse {
  success: boolean;
  narrative?: string;
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<EnhanceResponse>> {
  try {
    const body: EnhanceRequest = await request.json();

    if (!body.data) {
      return NextResponse.json(
        { success: false, error: 'Missing extraction data' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error('OPENROUTER_API_KEY is not configured');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const { data } = body;
    
    // Build a concise summary of the extraction for the prompt
    const summaryContext = `
Project: ${data.metadata.projectName}
Industry: ${data.metadata.industry}
Location: ${data.metadata.location || 'Not specified'}
Stage: ${data.metadata.stage}
Decision: ${data.metadata.decision}
Recommendation: ${data.metadata.recommendation}

Executive Summary: ${data.executiveSummary.verdict}

Key Reasoning:
${data.executiveSummary.coreReasoning.map(r => `- ${r}`).join('\n')}

Six-T Risks:
- Team: ${data.sixTRisks.team.rating} - ${data.sixTRisks.team.summary}
- TAM: ${data.sixTRisks.tam.rating} - ${data.sixTRisks.tam.summary}
- Technology: ${data.sixTRisks.technology.rating} - ${data.sixTRisks.technology.summary}
- Traction: ${data.sixTRisks.traction.rating} - ${data.sixTRisks.traction.summary}
- Terms: ${data.sixTRisks.terms.rating} - ${data.sixTRisks.terms.summary}
- Trends: ${data.sixTRisks.trends.rating} - ${data.sixTRisks.trends.summary}

Should We Do It: ${data.shouldWeDoIt.verdict} (${data.shouldWeDoIt.confidenceLevel} confidence)
Can We Do It: ${data.canWeDoIt.verdict} (${data.canWeDoIt.confidenceLevel} confidence)

Key Highlights:
${data.highlights.map(h => `- ${h.metric}: ${h.value}`).join('\n')}
`.trim();

    const systemPrompt = `You are an executive communications specialist at a venture capital firm. Your task is to synthesize investment analysis into a brief narrative summary that a CEO could read aloud at a board meeting.

Rules:
- Write exactly 3-4 sentences
- Use plain English, no jargon or bullet points
- Be direct and decisive
- Focus on the key recommendation and primary reasoning
- Include one specific data point or metric
- End with a clear directional statement

The tone should be confident and businesslike, as if briefing a senior executive.`;

    const userPrompt = `Based on this investment analysis, write a 3-4 sentence executive narrative summary:

${summaryContext}`;

    console.log('Generating executive narrative...');
    const startTime = Date.now();

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://olsenator.vercel.app',
        'X-Title': 'The Olsenator',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      return NextResponse.json(
        { success: false, error: 'Failed to generate narrative' },
        { status: 500 }
      );
    }

    const result = await response.json();
    const duration = Date.now() - startTime;
    console.log(`Narrative generated in ${duration}ms`);

    if (!result.choices || result.choices.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No narrative generated' },
        { status: 500 }
      );
    }

    const narrative = result.choices[0].message.content.trim();

    return NextResponse.json({
      success: true,
      narrative,
    });
  } catch (error) {
    console.error('Unexpected error in enhance route:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      },
      { status: 500 }
    );
  }
}

