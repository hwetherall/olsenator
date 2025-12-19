'use client';

import { ExecutiveSummary } from '@/lib/schema';
import { colors, typography, spacing } from '@/lib/infographic-styles';
import { getLabels } from '@/lib/kajima-labels';

interface VerdictCardProps {
  executiveSummary: ExecutiveSummary;
  kajimaMode?: boolean;
}

export function VerdictCard({ executiveSummary, kajimaMode = false }: VerdictCardProps) {
  const labels = getLabels(kajimaMode);
  return (
    <div 
      className="avoid-break rounded-lg p-6"
      style={{ 
        backgroundColor: colors.white,
        border: `1px solid ${colors.slate[200]}`,
      }}
    >
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
          {labels.tellItToMeStraight}
        </h2>
      </div>
      
      {/* Main Verdict */}
      <p 
        className="text-xl font-medium leading-relaxed mb-6"
        style={{ 
          color: colors.slate[700],
          fontWeight: typography.fontWeight.medium,
          lineHeight: typography.lineHeight.relaxed,
        }}
      >
        {executiveSummary.verdict}
      </p>
      
      {/* Core Reasoning Points */}
      {executiveSummary.coreReasoning.length > 0 && (
        <div>
          <h3 
            className="text-sm font-medium uppercase tracking-wider mb-3"
            style={{ color: colors.slate[500] }}
          >
            {labels.keyTakeaways}
          </h3>
          <ul className="space-y-2">
            {executiveSummary.coreReasoning.map((reason, index) => (
              <li 
                key={index}
                className="flex items-start gap-3"
              >
                <span 
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium mt-0.5"
                  style={{ 
                    backgroundColor: colors.slate[100],
                    color: colors.slate[600],
                  }}
                >
                  {index + 1}
                </span>
                <span 
                  className="text-sm leading-relaxed"
                  style={{ 
                    color: colors.slate[600],
                    lineHeight: typography.lineHeight.relaxed,
                  }}
                >
                  {reason}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

