import { NextRequest, NextResponse } from 'next/server';
import { ExtractionResult } from '@/lib/schema';

export const maxDuration = 120; // Allow up to 120 seconds for translation

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'openai/gpt-4.5-preview'; // Using gpt-4.5-preview as gpt-5.2 may not be available yet

interface TranslateRequest {
  data: ExtractionResult;
}

interface TranslateResponse {
  success: boolean;
  data?: ExtractionResult;
  error?: string;
}

const TRANSLATION_SYSTEM_PROMPT = `Role: 
You are a professional translator specializing in management consulting, corporate strategy, and technology for Japanese enterprise clients. 

Objective: 
Translate English text into high-quality, natural Japanese suitable for board presentations, strategy decks, feasibility studies, and executive reports.

Translation Rules:

1. Tone & Style
- Use clear, concise, formal consulting-grade Japanese.
- Avoid literal translations.
- Write as if preparing materials for:
  - McKinsey Japan
  - BCG Tokyo
  - Accenture Strategy Japan
  - NRI / Mitsubishi Research Institute
  - Kajima / Mitsubishi / large Japanese corporates

2. Business-Natural Terminology
Use Japanese terms commonly used in consulting decks:
- 戦略的示唆
- 推奨方針
- 市場機会
- 実行可能性
- 事業化
- パイロット導入
- 統合リスク
- 確信度
- ガバナンス
- エコシステム
- ソリューション
- プラットフォーム

Typical English business terms should remain in English or katakana when that is standard in Japan (e.g., KPI, ROI, BMS, WTP, APPI, データドリブン).

3. Translation Approach
- Translate meaning, not words.
- Use natural consulting phrasing, even if the English is casual or dense.
- When English concepts lack a direct Japanese equivalent, choose the closest business-appropriate expression.

4. Output Format
You will receive a JSON object with English text values. Return the SAME JSON structure with all string values translated to Japanese. Preserve all keys, numbers, and structure exactly as provided. Only translate string values.`;

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

  // Translate all strings in a single API call
  const userPrompt = `Translate the following JSON array of English strings to Japanese. Return ONLY a JSON array with the same number of elements, where each element is the Japanese translation of the corresponding English string. Maintain the exact order.

English strings to translate:
${JSON.stringify(strings, null, 2)}

Return only the JSON array of translated strings, no explanation.`;

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
      temperature: 0.3,
      max_tokens: 16000,
    }),
  });

  if (!response.ok) {
    throw new Error(`Translation API failed with status ${response.status}`);
  }

  const result = await response.json();
  
  if (!result.choices || result.choices.length === 0) {
    throw new Error('No translation response generated');
  }

  let translatedStrings: string[];
  try {
    const content = result.choices[0].message.content.trim();
    // Try to extract JSON array from response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      translatedStrings = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Could not find JSON array in response');
    }
  } catch (e) {
    console.error('Failed to parse translation response:', e);
    throw new Error('Failed to parse translation response');
  }

  if (translatedStrings.length !== strings.length) {
    console.error(`Translation mismatch: expected ${strings.length}, got ${translatedStrings.length}`);
    // Fall back to original strings if counts don't match
    translatedStrings = strings;
  }

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

