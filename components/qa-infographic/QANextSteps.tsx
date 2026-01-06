'use client';

import { QANextStep, getPriorityDisplay } from '@/lib/qa-schema';
import { colors, typography } from '@/lib/infographic-styles';

interface QANextStepsProps {
  nextSteps: QANextStep[];
}

export function QANextSteps({ nextSteps }: QANextStepsProps) {
  if (nextSteps.length === 0) return null;

  // Sort by priority
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const sortedSteps = [...nextSteps].sort((a, b) => 
    priorityOrder[a.priority] - priorityOrder[b.priority]
  );

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
          Recommended Next Steps
        </h2>
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
                  width: '90px',
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
                Action
              </th>
              <th 
                className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ 
                  color: colors.slate[500],
                  borderBottom: `1px solid ${colors.slate[200]}`,
                }}
              >
                Rationale
              </th>
              <th 
                className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ 
                  color: colors.slate[500],
                  borderBottom: `1px solid ${colors.slate[200]}`,
                  width: '150px',
                }}
              >
                Owner
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedSteps.map((step, index) => {
              const priority = getPriorityDisplay(step.priority);
              return (
                <tr 
                  key={index}
                  style={{ 
                    borderBottom: index < sortedSteps.length - 1 ? `1px solid ${colors.slate[100]}` : 'none',
                  }}
                >
                  <td className="px-4 py-3">
                    <span 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: priority.bgColor, color: priority.color }}
                    >
                      {(step.priority === 'critical' || step.priority === 'high') && (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                      {priority.label}
                    </span>
                  </td>
                  <td 
                    className="px-4 py-3 text-sm font-medium"
                    style={{ color: colors.slate[700] }}
                  >
                    {step.action}
                  </td>
                  <td 
                    className="px-4 py-3 text-sm"
                    style={{ 
                      color: colors.slate[600],
                      lineHeight: typography.lineHeight.relaxed,
                    }}
                  >
                    {step.rationale}
                  </td>
                  <td className="px-4 py-3">
                    <span 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium"
                      style={{ 
                        backgroundColor: colors.slate[100],
                        color: colors.slate[700],
                      }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {step.owner}
                    </span>
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
