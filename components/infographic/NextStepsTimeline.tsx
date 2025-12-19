'use client';

import { NextStep } from '@/lib/schema';
import { colors, typography } from '@/lib/infographic-styles';
import { getLabels } from '@/lib/kajima-labels';

interface NextStepsTimelineProps {
  nextSteps: NextStep[];
  kajimaMode?: boolean;
}

export function NextStepsTimeline({ nextSteps, kajimaMode = false }: NextStepsTimelineProps) {
  const labels = getLabels(kajimaMode);
  if (nextSteps.length === 0) return null;

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
          {labels.recommendedNextSteps}
        </h2>
      </div>

      <div className="relative">
        {nextSteps.map((step, index) => (
          <div 
            key={index}
            className="relative pl-8 pb-6 last:pb-0"
          >
            {/* Timeline Line */}
            {index < nextSteps.length - 1 && (
              <div 
                className="absolute left-3 top-6 bottom-0 w-0.5"
                style={{ backgroundColor: colors.slate[200] }}
              />
            )}
            
            {/* Timeline Node */}
            <div 
              className="absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
              style={{ 
                backgroundColor: colors.navy,
                color: colors.white,
              }}
            >
              {index + 1}
            </div>

            {/* Content */}
            <div 
              className="rounded-lg p-4 ml-2"
              style={{ backgroundColor: colors.slate[50] }}
            >
              {/* Action */}
              <h4 
                className="text-sm font-semibold mb-2"
                style={{ 
                  color: colors.slate[700],
                  fontWeight: typography.fontWeight.semibold,
                }}
              >
                {step.action}
              </h4>

              {/* Rationale */}
              {step.rationale && (
                <p 
                  className="text-sm mb-3"
                  style={{ 
                    color: colors.slate[600],
                    lineHeight: typography.lineHeight.relaxed,
                  }}
                >
                  {step.rationale}
                </p>
              )}

              {/* Success Gate */}
              <div 
                className="flex items-start gap-2 pt-2"
                style={{ borderTop: `1px solid ${colors.slate[200]}` }}
              >
                <svg 
                  className="w-4 h-4 flex-shrink-0 mt-0.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ color: colors.risk.green }}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <div>
                  <span 
                    className="text-xs font-medium uppercase tracking-wider block mb-0.5"
                    style={{ color: colors.slate[500] }}
                  >
                    {labels.successGate}
                  </span>
                  <span 
                    className="text-sm"
                    style={{ color: colors.slate[600] }}
                  >
                    {step.successGate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

