'use client';

import { GapItem, getPriorityDisplay } from '@/lib/qa-schema';
import { colors, typography } from '@/lib/infographic-styles';

interface GapsTableProps {
  gaps: GapItem[];
}

export function GapsTable({ gaps }: GapsTableProps) {
  if (gaps.length === 0) return null;

  return (
    <div className="avoid-break">
      <div className="flex items-center gap-2 mb-4">
        <div 
          className="w-1 h-6 rounded-full"
          style={{ backgroundColor: colors.risk.red }}
        />
        <h2 
          className="text-lg font-semibold"
          style={{ 
            color: colors.navy,
            fontFamily: typography.fontFamily.sans,
            fontWeight: typography.fontWeight.semibold,
          }}
        >
          Identified Gaps
        </h2>
        <span 
          className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium"
          style={{ 
            backgroundColor: colors.risk.redLight,
            color: colors.risk.red,
          }}
        >
          {gaps.length} item{gaps.length !== 1 ? 's' : ''} requiring attention
        </span>
      </div>

      <div 
        className="rounded-lg overflow-hidden"
        style={{ 
          backgroundColor: colors.white,
          border: `1px solid ${colors.slate[200]}`,
        }}
      >
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: colors.slate[50] }}>
              <th 
                className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ 
                  color: colors.slate[500],
                  borderBottom: `1px solid ${colors.slate[200]}`,
                  width: '80px',
                }}
              >
                Priority
              </th>
              <th 
                className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ 
                  color: colors.slate[500],
                  borderBottom: `1px solid ${colors.slate[200]}`,
                }}
              >
                Question
              </th>
              <th 
                className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ 
                  color: colors.slate[500],
                  borderBottom: `1px solid ${colors.slate[200]}`,
                }}
              >
                What's Missing
              </th>
              <th 
                className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ 
                  color: colors.slate[500],
                  borderBottom: `1px solid ${colors.slate[200]}`,
                }}
              >
                Action Required
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
                >
                  <td className="px-4 py-3">
                    <span 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: priority.bgColor, color: priority.color }}
                    >
                      {gap.priority === 'critical' && (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                      {priority.label}
                    </span>
                  </td>
                  <td 
                    className="px-4 py-3 text-sm font-medium"
                    style={{ color: colors.slate[700] }}
                  >
                    {gap.question}
                  </td>
                  <td 
                    className="px-4 py-3 text-sm"
                    style={{ color: colors.slate[600] }}
                  >
                    {gap.whatsMissing}
                  </td>
                  <td 
                    className="px-4 py-3 text-sm"
                    style={{ color: colors.slate[600] }}
                  >
                    <div className="flex items-start gap-2">
                      <svg 
                        className="w-4 h-4 flex-shrink-0 mt-0.5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        style={{ color: colors.teal }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {gap.recommendedAction}
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
