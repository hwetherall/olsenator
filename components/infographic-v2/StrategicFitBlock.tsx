'use client';

import { StrategicFitBlock as StrategicFitBlockType } from '@/lib/schema-v2';
import { colors, typography } from '@/lib/infographic-styles';

interface StrategicFitBlockProps {
  data: StrategicFitBlockType;
}

export function StrategicFitBlock({ data }: StrategicFitBlockProps) {
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
          Strategic Fit Assessment
        </h2>
      </div>

      {/* Main Assessment */}
      <div 
        className="rounded-xl p-5 mb-4"
        style={{ 
          backgroundColor: colors.slate[50],
          border: `1px solid ${colors.slate[200]}`,
        }}
      >
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
            border: `1px solid ${colors.slate[200]}`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: colors.risk.amberLight }}
            >
              <svg 
                className="w-4 h-4" 
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
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: colors.navy }}
            >
              Can We Do It?
            </span>
          </div>
          <p 
            className="text-sm leading-relaxed"
            style={{ 
              color: colors.slate[600],
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            {data.canWeDoIt}
          </p>
        </div>

        {/* Should We Do It */}
        <div 
          className="rounded-xl p-5"
          style={{ 
            backgroundColor: colors.white,
            border: `1px solid ${colors.slate[200]}`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: colors.risk.greenLight }}
            >
              <svg 
                className="w-4 h-4" 
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
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: colors.navy }}
            >
              Should We Do It?
            </span>
          </div>
          <p 
            className="text-sm leading-relaxed"
            style={{ 
              color: colors.slate[600],
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            {data.shouldWeDoIt}
          </p>
        </div>
      </div>
    </div>
  );
}
