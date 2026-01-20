'use client';

import { HighlightCard } from '@/lib/schema-v2';
import { colors, typography } from '@/lib/infographic-styles';

interface HighlightCardsV2Props {
  highlights: HighlightCard[];
}

export function HighlightCardsV2({ highlights }: HighlightCardsV2Props) {
  if (highlights.length === 0) return null;

  return (
    <div className="avoid-break">
      <div className="flex items-center gap-2 mb-4">
        <div 
          className="w-1 h-6 rounded-full"
          style={{ backgroundColor: colors.navy }}
        />
        <h2 
          className="text-lg font-semibold"
          style={{ 
            color: colors.navy,
            fontFamily: typography.fontFamily.sans,
          }}
        >
          Key Highlights
        </h2>
        <span 
          className="px-2 py-0.5 rounded text-xs font-medium"
          style={{ 
            backgroundColor: colors.slate[100],
            color: colors.slate[600],
          }}
        >
          {highlights.length} insights
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="rounded-xl p-5"
            style={{ 
              backgroundColor: colors.white,
              border: `1px solid ${colors.slate[200]}`,
            }}
          >
            {/* Headline */}
            <div className="flex items-start gap-3 mb-3">
              <span 
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold"
                style={{ 
                  backgroundColor: colors.navy,
                  color: colors.white,
                }}
              >
                {index + 1}
              </span>
              <h3 
                className="text-sm font-semibold leading-tight"
                style={{ color: colors.navy }}
              >
                {highlight.headline}
              </h3>
            </div>
            
            {/* Insight */}
            <p 
              className="text-sm leading-relaxed mb-3"
              style={{ 
                color: colors.slate[600],
                lineHeight: typography.lineHeight.relaxed,
              }}
            >
              {highlight.insight}
            </p>

            {/* Source Chapter */}
            <span 
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs"
              style={{ 
                backgroundColor: colors.slate[100],
                color: colors.slate[500],
              }}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {highlight.sourceChapter}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
