'use client';

import { QASummaryStats } from '@/lib/qa-schema';
import { colors, typography } from '@/lib/infographic-styles';

interface ConfidenceSummaryProps {
  stats: QASummaryStats;
}

export function ConfidenceSummary({ stats }: ConfidenceSummaryProps) {
  const total = stats.totalQuestions;
  const highPercent = Math.round((stats.highConfidence / total) * 100);
  const mediumPercent = Math.round((stats.mediumConfidence / total) * 100);
  const lowPercent = Math.round((stats.lowConfidence / total) * 100);

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
          Confidence Overview
        </h2>
      </div>

      <div 
        className="rounded-lg p-5"
        style={{ 
          backgroundColor: colors.white,
          border: `1px solid ${colors.slate[200]}`,
        }}
      >
        {/* Progress Bar */}
        <div className="mb-5">
          <div 
            className="h-4 rounded-full overflow-hidden flex"
            style={{ backgroundColor: colors.slate[100] }}
          >
            <div 
              className="h-full transition-all duration-500"
              style={{ 
                width: `${highPercent}%`,
                backgroundColor: colors.risk.green,
              }}
            />
            <div 
              className="h-full transition-all duration-500"
              style={{ 
                width: `${mediumPercent}%`,
                backgroundColor: colors.risk.amber,
              }}
            />
            <div 
              className="h-full transition-all duration-500"
              style={{ 
                width: `${lowPercent}%`,
                backgroundColor: colors.risk.red,
              }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          {/* High Confidence */}
          <div 
            className="rounded-lg p-4 text-center"
            style={{ backgroundColor: colors.risk.greenLight }}
          >
            <div 
              className="text-3xl font-bold mb-1"
              style={{ color: colors.risk.green }}
            >
              {stats.highConfidence}
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <span 
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: colors.risk.green }}
              />
              <span 
                className="text-sm font-medium"
                style={{ color: colors.risk.green }}
              >
                High
              </span>
            </div>
          </div>

          {/* Medium Confidence */}
          <div 
            className="rounded-lg p-4 text-center"
            style={{ backgroundColor: colors.risk.amberLight }}
          >
            <div 
              className="text-3xl font-bold mb-1"
              style={{ color: colors.risk.amber }}
            >
              {stats.mediumConfidence}
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <span 
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: colors.risk.amber }}
              />
              <span 
                className="text-sm font-medium"
                style={{ color: colors.risk.amber }}
              >
                Medium
              </span>
            </div>
          </div>

          {/* Low Confidence */}
          <div 
            className="rounded-lg p-4 text-center"
            style={{ backgroundColor: colors.risk.redLight }}
          >
            <div 
              className="text-3xl font-bold mb-1"
              style={{ color: colors.risk.red }}
            >
              {stats.lowConfidence}
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <span 
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: colors.risk.red }}
              />
              <span 
                className="text-sm font-medium"
                style={{ color: colors.risk.red }}
              >
                Low / Gap
              </span>
            </div>
          </div>
        </div>

        {/* Answer Status */}
        <div 
          className="pt-4 flex items-center justify-center gap-8"
          style={{ borderTop: `1px solid ${colors.slate[200]}` }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.risk.green }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm" style={{ color: colors.slate[600] }}>
              <strong style={{ color: colors.slate[700] }}>{stats.fullyAnswered}</strong> Fully Answered
            </span>
          </div>
          
          {stats.partiallyAnswered > 0 && (
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.risk.amber }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm" style={{ color: colors.slate[600] }}>
                <strong style={{ color: colors.slate[700] }}>{stats.partiallyAnswered}</strong> Partial
              </span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.risk.red }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-sm" style={{ color: colors.slate[600] }}>
              <strong style={{ color: colors.slate[700] }}>{stats.unanswered}</strong> Gaps Identified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
