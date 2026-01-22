'use client';

import { StrategicFitBlock as StrategicFitBlockType } from '@/lib/schema-v2';
import { colors, typography } from '@/lib/infographic-styles';

interface StrategicFitBlockProps {
  data: StrategicFitBlockType;
}

// Helper to extract score/verdict from text
// Example input: "Borderline (Low confidence). While NLM has..."
// Returns: { score: "Borderline (Low confidence)", text: "While NLM has..." }
function extractScore(fullText: string) {
  // Regex to find the first sentence which typically contains the verdict/score
  // Looks for text ending with a period, but tries to be smart about parentheses
  const match = fullText.match(/^([^\.]+?(\([^\)]+\))?)\.\s+(.+)$/);
  
  if (match) {
    return {
      score: match[1].trim(),
      text: match[3].trim()
    };
  }
  
  // Fallback if no clean separation found
  return {
    score: '',
    text: fullText
  };
}

export function StrategicFitBlock({ data }: StrategicFitBlockProps) {
  const canWe = extractScore(data.canWeDoIt);
  const shouldWe = extractScore(data.shouldWeDoIt);

  return (
    <div className="space-y-5">
      {/* Main Assessment */}
      <div 
        className="rounded-xl p-5"
        style={{ 
          backgroundColor: colors.slate[50],
          border: `1px solid ${colors.slate[200]}`,
        }}
      >
        <span 
          className="text-xs font-semibold uppercase tracking-wider block mb-3"
          style={{ color: colors.slate[500] }}
        >
          Assessment Summary
        </span>
        <p 
          className="text-sm leading-relaxed"
          style={{ 
            color: colors.slate[700],
            lineHeight: typography.lineHeight.relaxed,
          }}
        >
          {data.assessment}
        </p>
      </div>

      {/* Can We / Should We Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Can We Do It */}
        <div 
          className="rounded-xl p-5"
          style={{ 
            backgroundColor: colors.white,
            border: `2px solid ${colors.risk.amber}30`,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: colors.risk.amberLight }}
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ color: colors.risk.amber }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                />
              </svg>
            </div>
            <span 
              className="text-base font-bold uppercase tracking-wide"
              style={{ color: colors.navy }}
            >
              Can We Do It?
            </span>
          </div>

          {/* Extracted Score Component */}
          {canWe.score && (
            <div 
              className="mb-4 inline-block px-3 py-1.5 rounded-lg text-sm font-bold"
              style={{ 
                backgroundColor: colors.risk.amberLight,
                color: colors.risk.amber,
              }}
            >
              {canWe.score}
            </div>
          )}

          <p 
            className="text-sm leading-relaxed"
            style={{ 
              color: colors.slate[600],
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            {canWe.text}
          </p>
        </div>

        {/* Should We Do It */}
        <div 
          className="rounded-xl p-5"
          style={{ 
            backgroundColor: colors.white,
            border: `2px solid ${colors.risk.green}30`,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: colors.risk.greenLight }}
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ color: colors.risk.green }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 10V3L4 14h7v7l9-11h-7z" 
                />
              </svg>
            </div>
            <span 
              className="text-base font-bold uppercase tracking-wide"
              style={{ color: colors.navy }}
            >
              Should We Do It?
            </span>
          </div>

          {/* Extracted Score Component */}
          {shouldWe.score && (
            <div 
              className="mb-4 inline-block px-3 py-1.5 rounded-lg text-sm font-bold"
              style={{ 
                backgroundColor: colors.risk.greenLight,
                color: colors.risk.green,
              }}
            >
              {shouldWe.score}
            </div>
          )}

          <p 
            className="text-sm leading-relaxed"
            style={{ 
              color: colors.slate[600],
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            {shouldWe.text}
          </p>
        </div>
      </div>
    </div>
  );
}
