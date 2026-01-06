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
    <div className="avoid-break mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-2">
            <h2 
            className="text-2xl font-light"
            style={{ color: colors.navy }}
            >
            Confidence Overview
            </h2>
            <div className="w-12 h-0.5" style={{ backgroundColor: colors.accent }} />
        </div>

        {/* Summary Status Inline */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.risk.green }} />
            <span style={{ color: colors.slate[600] }}>
                <strong style={{ color: colors.navy }}>{stats.fullyAnswered}</strong> Fully Answered
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.risk.red }} />
            <span style={{ color: colors.slate[600] }}>
                <strong style={{ color: colors.navy }}>{stats.unanswered}</strong> Gaps Identified
            </span>
          </div>
        </div>
      </div>

      <div 
        className="p-8 shadow-sm"
        style={{ 
          backgroundColor: colors.white,
          border: `1px solid ${colors.slate[200]}`,
        }}
      >
        {/* Progress Bar - Thinner, more precise */}
        <div className="mb-8">
          <div className="flex justify-between text-xs uppercase tracking-wider font-semibold mb-3" style={{ color: colors.slate[400] }}>
             <span>Analysis Confidence Distribution</span>
             <span>{stats.totalQuestions} Questions</span>
          </div>
          <div 
            className="h-1.5 w-full flex"
            style={{ backgroundColor: colors.slate[100] }}
          >
            <div 
              className="h-full"
              style={{ 
                width: `${highPercent}%`,
                backgroundColor: colors.risk.green,
              }}
            />
            <div 
              className="h-full"
              style={{ 
                width: `${mediumPercent}%`,
                backgroundColor: colors.risk.amber,
              }}
            />
            <div 
              className="h-full"
              style={{ 
                width: `${lowPercent}%`,
                backgroundColor: colors.risk.red,
              }}
            />
          </div>
        </div>

        {/* Stats Grid - Minimalist */}
        <div className="grid grid-cols-3 gap-8">
          {/* High Confidence */}
          <div className="text-center p-4">
            <div 
              className="text-5xl font-light mb-2"
              style={{ color: colors.risk.green }}
            >
              {stats.highConfidence}
            </div>
            <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: colors.slate[500] }}>
              High Confidence
            </div>
          </div>

          {/* Medium Confidence */}
          <div className="text-center p-4 border-l border-r border-slate-100">
            <div 
              className="text-5xl font-light mb-2"
              style={{ color: colors.risk.amber }}
            >
              {stats.mediumConfidence}
            </div>
            <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: colors.slate[500] }}>
              Medium Confidence
            </div>
          </div>

          {/* Low Confidence */}
          <div className="text-center p-4">
            <div 
              className="text-5xl font-light mb-2"
              style={{ color: colors.risk.red }}
            >
              {stats.lowConfidence}
            </div>
            <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: colors.slate[500] }}>
              Critical Gaps
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
