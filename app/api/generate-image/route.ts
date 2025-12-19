import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 120; // Image generation can take longer

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const IMAGE_MODEL = 'black-forest-labs/flux-1.1-pro';

interface GenerateImageRequest {
  projectName: string;
  industry: string;
  location?: string | null;
}

interface GenerateImageResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<GenerateImageResponse>> {
  try {
    const body: GenerateImageRequest = await request.json();

    if (!body.projectName || !body.industry) {
      return NextResponse.json(
        { success: false, error: 'Missing project name or industry' },
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

    // Build the image generation prompt
    const locationContext = body.location ? ` in ${body.location}` : '';
    const prompt = `Professional minimal illustration of ${body.industry.toLowerCase()} industry${locationContext}, abstract geometric style, navy blue (#1e293b) and white color scheme, clean lines, modern corporate aesthetic, suitable for business presentation header, no text, no people`;

    console.log('Generating header image with prompt:', prompt);
    const startTime = Date.now();

    // Call OpenRouter with the image generation model
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://olsenator.vercel.app',
        'X-Title': 'The Olsenator',
      },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      
      // Return gracefully - image generation is optional
      return NextResponse.json(
        { success: false, error: 'Image generation unavailable' },
        { status: 200 } // Return 200 so frontend doesn't treat as error
      );
    }

    const result = await response.json();
    const duration = Date.now() - startTime;
    console.log(`Image generated in ${duration}ms`);

    // Extract image URL from response
    // OpenRouter returns images in different formats depending on the model
    let imageUrl: string | undefined;

    if (result.choices && result.choices[0]?.message?.content) {
      const content = result.choices[0].message.content;
      
      // Check if content is a URL
      if (typeof content === 'string' && content.startsWith('http')) {
        imageUrl = content;
      } else if (typeof content === 'string' && content.startsWith('data:image')) {
        // Base64 data URL
        imageUrl = content;
      } else if (Array.isArray(content)) {
        // Some models return content as array with image_url
        const imageContent = content.find((c: { type: string }) => c.type === 'image_url');
        if (imageContent?.image_url?.url) {
          imageUrl = imageContent.image_url.url;
        }
      }
    }

    // Also check for image in response data directly
    if (!imageUrl && result.data?.url) {
      imageUrl = result.data.url;
    }

    if (!imageUrl) {
      console.log('No image URL in response:', JSON.stringify(result, null, 2));
      return NextResponse.json(
        { success: false, error: 'No image generated' },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    console.error('Unexpected error in generate-image route:', error);
    // Return gracefully - image generation is optional
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Image generation failed' 
      },
      { status: 200 }
    );
  }
}

