'use client';

import { NextStep } from '@/lib/schema-v2';
import { colors, typography } from '@/lib/infographic-styles';

interface NextStepsV2Props {
  nextSteps: NextStep[];
}

export function NextStepsV2({ nextSteps }: NextStepsV2Props) {
  if (nextSteps.length === 0) return null;

  return (
    <div className="avoid-break">
      <div className="flex items-center gap-2 mb-4">
        <div 
          className="w-1 h-6 rounded-full"
          style={{ backgroundColor: colors.risk.green }}
        />
        <h2 
          className="text-lg font-semibold"
          style={{ 
            color: colors.navy,
            fontFamily: typography.fontFamily.sans,
          }}
        >
          Next Steps
        </h2>
        <span 
          className="px-2 py-0.5 rounded text-xs font-medium"
          style={{ 
            backgroundColor: colors.risk.greenLight,
            color: colors.risk.green,
          }}
        >
          {nextSteps.length} actions
        </span>
      </div>

      <div className="space-y-3">
        {nextSteps.map((step, index) => (
          <div
            key={index}
            className="rounded-xl p-5 flex items-start gap-4"
            style={{ 
              backgroundColor: colors.white,
              border: `1px solid ${colors.slate[200]}`,
            }}
          >
            {/* Step Number */}
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg font-bold"
              style={{ 
                backgroundColor: colors.navy,
                color: colors.white,
              }}
            >
              {index + 1}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 
                className="text-sm font-semibold mb-2"
                style={{ color: colors.navy }}
              >
                {step.action}
              </h3>
              {step.details && (
                <p 
                  className="text-sm leading-relaxed"
                  style={{ 
                    color: colors.slate[600],
                    lineHeight: typography.lineHeight.relaxed,
                  }}
                >
                  {step.details}
                </p>
              )}
            </div>

            {/* Arrow indicator */}
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: colors.slate[100] }}
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ color: colors.slate[400] }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
