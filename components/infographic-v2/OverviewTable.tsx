'use client';

import { OverviewTable as OverviewTableType } from '@/lib/schema-v2';
import { colors, typography } from '@/lib/infographic-styles';

interface OverviewTableProps {
  data: OverviewTableType;
}

export function OverviewTable({ data }: OverviewTableProps) {
  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'Proceed':
        return { bg: colors.risk.greenLight, text: colors.risk.green };
      case 'Conditional':
        return { bg: colors.risk.amberLight, text: colors.risk.amber };
      case 'Do Not Proceed':
        return { bg: colors.risk.redLight, text: colors.risk.red };
      default:
        return { bg: colors.slate[100], text: colors.slate[600] };
    }
  };

  const decisionColors = getDecisionColor(data.decision);

  return (
    <div 
      className="rounded-xl overflow-hidden"
      style={{ 
        backgroundColor: colors.navy,
        fontFamily: typography.fontFamily.sans,
      }}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 
              className="text-2xl font-bold mb-2"
              style={{ 
                color: colors.white,
                fontWeight: typography.fontWeight.bold,
              }}
            >
              {data.projectName}
            </h1>
            <p 
              className="text-sm leading-relaxed"
              style={{ 
                color: 'rgba(255,255,255,0.8)',
                lineHeight: typography.lineHeight.relaxed,
              }}
            >
              {data.oneLiner}
            </p>
          </div>
          
          {/* Decision Badge */}
          <div 
            className="px-4 py-2 rounded-lg text-center flex-shrink-0"
            style={{ backgroundColor: decisionColors.bg }}
          >
            <span 
              className="text-xs font-medium uppercase tracking-wider block mb-1"
              style={{ color: decisionColors.text }}
            >
              Decision
            </span>
            <span 
              className="text-lg font-bold block"
              style={{ color: decisionColors.text }}
            >
              {data.decision}
            </span>
          </div>
        </div>
      </div>

      {/* Location & Justification Bar */}
      <div 
        className="px-6 py-4 flex items-center gap-6"
        style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
      >
        {/* Location */}
        <div className="flex items-center gap-2">
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
          <span 
            className="text-sm"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            {data.location}
          </span>
        </div>

        {/* Divider */}
        <div 
          className="w-px h-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
        />

        {/* Justification */}
        <p 
          className="text-sm flex-1"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          {data.justification}
        </p>
      </div>
    </div>
  );
}
