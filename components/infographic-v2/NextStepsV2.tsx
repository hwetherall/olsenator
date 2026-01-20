'use client';

import { NextStep } from '@/lib/schema-v2';
import { colors, typography } from '@/lib/infographic-styles';

interface NextStepsV2Props {
  nextSteps: NextStep[];
}

export function NextStepsV2({ nextSteps }: NextStepsV2Props) {
  if (nextSteps.length === 0) return null;

  return (
    <div className="space-y-3">
      {nextSteps.map((step, index) => (
        <div
          key={index}
          className="rounded-xl p-5 flex items-start gap-4"
          style={{ 
            backgroundColor: index === 0 ? colors.risk.greenLight : colors.white,
            border: `1px solid ${index === 0 ? colors.risk.green + '30' : colors.slate[200]}`,
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
              className="text-sm font-bold mb-2"
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

          {/* Arrow */}
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
  );
}
