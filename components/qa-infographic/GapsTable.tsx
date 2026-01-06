'use client';

import { GapItem, getPriorityDisplay } from '@/lib/qa-schema';
import { colors, typography } from '@/lib/infographic-styles';

interface GapsTableProps {
  gaps: GapItem[];
}

export function GapsTable({ gaps }: GapsTableProps) {
  if (gaps.length === 0) return null;

  return (
    <div className="avoid-break mb-8">
      <div className="flex flex-col gap-2 mb-6">
        <h2 
          className="text-2xl font-light"
          style={{ color: colors.navy }}
        >
          Identified Gaps
        </h2>
        <div className="w-12 h-0.5" style={{ backgroundColor: colors.risk.red }} />
      </div>

      <div 
        className="overflow-hidden"
        style={{ 
          backgroundColor: colors.white,
          border: `1px solid ${colors.slate[200]}`,
        }}
      >
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: colors.slate[50], borderBottom: `1px solid ${colors.slate[200]}` }}>
              <th 
                className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider"
                style={{ color: colors.slate[500], width: '120px' }}
              >
                Priority
              </th>
              <th 
                className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider"
                style={{ color: colors.slate[500] }}
              >
                Topic
              </th>
              <th 
                className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider"
                style={{ color: colors.slate[500] }}
              >
                Missing Information
              </th>
              <th 
                className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider"
                style={{ color: colors.slate[500] }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {gaps.map((gap, index) => {
              const priority = getPriorityDisplay(gap.priority);
              return (
                <tr 
                  key={index}
                  style={{ 
                    borderBottom: index < gaps.length - 1 ? `1px solid ${colors.slate[100]}` : 'none',
                  }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 align-top">
                    <span 
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                      style={{ 
                        color: priority.color,
                      }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: priority.color }}></span>
                      {priority.label}
                    </span>
                  </td>
                  <td 
                    className="px-6 py-4 text-sm font-semibold align-top"
                    style={{ color: colors.navy }}
                  >
                    {gap.question}
                  </td>
                  <td 
                    className="px-6 py-4 text-sm align-top"
                    style={{ 
                        color: colors.slate[600],
                        lineHeight: typography.lineHeight.relaxed 
                    }}
                  >
                    {gap.whatsMissing}
                  </td>
                  <td 
                    className="px-6 py-4 text-sm align-top"
                    style={{ color: colors.slate[700] }}
                  >
                    <div className="flex items-start gap-2">
                        <svg 
                            className="w-4 h-4 flex-shrink-0 mt-0.5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            style={{ color: colors.accent }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{gap.recommendedAction}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
