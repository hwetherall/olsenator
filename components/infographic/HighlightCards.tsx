'use client';

import { Highlight } from '@/lib/schema';
import { colors, typography } from '@/lib/infographic-styles';
import { getLabels } from '@/lib/kajima-labels';

interface HighlightCardsProps {
  highlights: Highlight[];
  kajimaMode?: boolean;
}

export function HighlightCards({ highlights, kajimaMode = false }: HighlightCardsProps) {
  const labels = getLabels(kajimaMode);
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
            fontWeight: typography.fontWeight.semibold,
          }}
        >
          {labels.keyHighlights}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="rounded-lg p-4"
            style={{ 
              backgroundColor: colors.white,
              border: `1px solid ${colors.slate[200]}`,
            }}
          >
            {/* Metric Name */}
            <span 
              className="text-xs font-medium uppercase tracking-wider block mb-2"
              style={{ color: colors.slate[500] }}
            >
              {highlight.metric}
            </span>
            
            {/* Value */}
            <span 
              className="text-2xl font-bold block mb-2"
              style={{ 
                color: colors.navy,
                fontWeight: typography.fontWeight.bold,
              }}
            >
              {highlight.value}
            </span>
            
            {/* Context */}
            <span 
              className="text-sm leading-relaxed"
              style={{ 
                color: colors.slate[500],
                lineHeight: typography.lineHeight.relaxed,
              }}
            >
              {highlight.context}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

