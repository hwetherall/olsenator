import { NextRequest, NextResponse } from 'next/server';
import { ExtractionResult } from '@/lib/schema';

export const maxDuration = 120; // Allow up to 120 seconds for translation

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'google/gemini-3-flash-preview';

interface TranslateRequest {
  data: ExtractionResult;
}

interface TranslateResponse {
  success: boolean;
  data?: ExtractionResult;
  error?: string;
}

const TRANSLATION_SYSTEM_PROMPT = `You are a professional translator specializing in management consulting, corporate strategy, and technology for Japanese enterprise clients.

Your task: Translate English strings to high-quality, natural Japanese suitable for board presentations, strategy decks, and executive reports.

Translation Rules:
1. Use clear, concise, formal consulting-grade Japanese (McKinsey/BCG/Kajima style)
2. Translate meaning, not words - use natural consulting phrasing
3. Use Japanese business terms: 戦略的示唆, 推奨方針, 市場機会, 実行可能性, 事業化, パイロット導入, 統合リスク, 確信度, ガバナンス
4. Keep standard English/katakana terms: KPI, ROI, BMS, データドリブン, プラットフォーム, ソリューション

CRITICAL OUTPUT FORMAT:
- You will receive a JSON array of English strings
- Return ONLY a valid JSON array with the Japanese translations
- Same number of elements, same order
- No explanation, no markdown, just the raw JSON array`;

// Fields that should NOT be translated (enum values that must remain in English)
const EXCLUDED_FIELDS = new Set([
  'rating',           // "red" | "yellow" | "green"
  'status',           // "validated" | "pending" | "at-risk"
  'decision',         // "Proceed" | "Do Not Proceed" | "Conditional"
  'confidenceLevel',  // "High" | "Medium" | "Low"
]);

/**
 * Recursively translate all string values in an object
 */
async function translateObject(
  obj: unknown,
  apiKey: string
): Promise<unknown> {
  // Collect all strings to translate
  const strings: string[] = [];
  const paths: (string | number)[][] = [];

  function collectStrings(value: unknown, path: (string | number)[] = []): void {
    // Skip fields that are enum values and should not be translated
    const lastKey = path[path.length - 1];
    if (typeof lastKey === 'string' && EXCLUDED_FIELDS.has(lastKey)) {
      return; // Skip this field entirely
    }
    
    if (typeof value === 'string' && value.trim().length > 0) {
      strings.push(value);
      paths.push([...path]);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => collectStrings(item, [...path, index]));
    } else if (value !== null && typeof value === 'object') {
      Object.entries(value).forEach(([key, val]) => 
        collectStrings(val, [...path, key])
      );
    }
  }

  collectStrings(obj);

  if (strings.length === 0) {
    return obj;
  }

  console.log(`Translating ${strings.length} strings...`);

  // Translate all strings in a single API call
  const userPrompt = `Translate these ${strings.length} English strings to Japanese. Return ONLY a JSON array with exactly ${strings.length} Japanese translations in the same order.

${JSON.stringify(strings)}

Output only the JSON array, nothing else.`;

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://olsenator.vercel.app',
      'X-Title': 'The Olsenator - Kajima Translation',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: TRANSLATION_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.2,
      max_tokens: 16000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Translation API error:', response.status, errorText);
    throw new Error(`Translation API failed with status ${response.status}: ${errorText}`);
  }

  const result = await response.json();
  
  if (result.error) {
    console.error('OpenRouter error:', result.error);
    throw new Error(`OpenRouter error: ${result.error.message || JSON.stringify(result.error)}`);
  }
  
  if (!result.choices || result.choices.length === 0) {
    console.error('No choices in response:', JSON.stringify(result));
    throw new Error('No translation response generated');
  }

  let translatedStrings: string[];
  const content = result.choices[0].message.content.trim();
  console.log('Raw translation response (first 500 chars):', content.substring(0, 500));
  
  try {
    // Try to extract JSON array from response - handle various formats
    // Remove markdown code blocks if present
    let cleanContent = content;
    if (cleanContent.includes('```')) {
      const codeBlockMatch = cleanContent.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (codeBlockMatch) {
        cleanContent = codeBlockMatch[1].trim();
      }
    }
    
    // Try to find JSON array
    const jsonMatch = cleanContent.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      translatedStrings = JSON.parse(jsonMatch[0]);
    } else {
      // Maybe the whole content is the array
      translatedStrings = JSON.parse(cleanContent);
    }
  } catch (e) {
    console.error('Failed to parse translation response:', e);
    console.error('Full response content:', content);
    throw new Error('Failed to parse translation response as JSON array');
  }

  if (!Array.isArray(translatedStrings)) {
    console.error('Parsed result is not an array:', typeof translatedStrings);
    throw new Error('Translation response is not an array');
  }

  if (translatedStrings.length !== strings.length) {
    console.warn(`Translation count mismatch: expected ${strings.length}, got ${translatedStrings.length}`);
    // Try to use what we got, padding with originals if needed
    if (translatedStrings.length < strings.length) {
      const padded = [...translatedStrings];
      for (let i = translatedStrings.length; i < strings.length; i++) {
        padded.push(strings[i]);
      }
      translatedStrings = padded;
    } else {
      translatedStrings = translatedStrings.slice(0, strings.length);
    }
  }
  
  console.log(`Successfully translated ${translatedStrings.length} strings`);

  // Apply translations back to object
  const translatedObj = JSON.parse(JSON.stringify(obj));
  
  function setValueAtPath(
    target: Record<string, unknown>,
    path: (string | number)[],
    value: string
  ): void {
    let current: unknown = target;
    for (let i = 0; i < path.length - 1; i++) {
      current = (current as Record<string | number, unknown>)[path[i]];
    }
    (current as Record<string | number, unknown>)[path[path.length - 1]] = value;
  }

  paths.forEach((path, index) => {
    setValueAtPath(translatedObj, path, translatedStrings[index]);
  });

  return translatedObj;
}

export async function POST(request: NextRequest): Promise<NextResponse<TranslateResponse>> {
  try {
    const body: TranslateRequest = await request.json();

    if (!body.data) {
      return NextResponse.json(
        { success: false, error: 'Missing data to translate' },
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

    console.log('Starting Japanese translation...');
    const startTime = Date.now();

    const translatedData = await translateObject(body.data, apiKey);

    const duration = Date.now() - startTime;
    console.log(`Translation completed in ${duration}ms`);

    return NextResponse.json({
      success: true,
      data: translatedData as ExtractionResult,
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Translation failed',
      },
      { status: 500 }
    );
  }
}

