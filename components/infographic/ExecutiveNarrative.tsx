'use client';

import { colors, typography } from '@/lib/infographic-styles';

interface ExecutiveNarrativeProps {
  narrative: string;
}

export function ExecutiveNarrative({ narrative }: ExecutiveNarrativeProps) {
  if (!narrative) return null;

  return (
    <div 
      className="avoid-break rounded-lg p-6"
      style={{ 
        backgroundColor: colors.slate[50],
        borderLeft: `4px solid ${colors.navy}`,
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          style={{ color: colors.navy }}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" 
          />
        </svg>
        <h2 
          className="text-sm font-semibold uppercase tracking-wider"
          style={{ 
            color: colors.navy,
            fontFamily: typography.fontFamily.sans,
            fontWeight: typography.fontWeight.semibold,
          }}
        >
          Executive Summary
        </h2>
        <span 
          className="text-xs px-2 py-0.5 rounded-full ml-auto"
          style={{ 
            backgroundColor: colors.navy,
            color: colors.white,
          }}
        >
          AI Generated
        </span>
      </div>
      
      <p 
        className="text-base leading-relaxed"
        style={{ 
          color: colors.slate[700],
          lineHeight: typography.lineHeight.relaxed,
          fontStyle: 'italic',
        }}
      >
        &ldquo;{narrative}&rdquo;
      </p>
    </div>
  );
}

