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
    <div className="avoid-break mb-8">
      <div className="flex flex-col gap-2 mb-6">
        <h2 
          className="text-2xl font-light"
          style={{ color: colors.navy }}
        >
          Recommended Next Steps
        </h2>
        <div className="w-12 h-0.5" style={{ backgroundColor: colors.accent }} />
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
                Action Item
              </th>
              <th 
                className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider"
                style={{ color: colors.slate[500] }}
              >
                Rationale
              </th>
              <th 
                className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider"
                style={{ color: colors.slate[500], width: '160px' }}
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
                    {step.action}
                  </td>
                  <td 
                    className="px-6 py-4 text-sm align-top"
                    style={{ 
                      color: colors.slate[600],
                      lineHeight: typography.lineHeight.relaxed,
                    }}
                  >
                    {step.rationale}
                  </td>
                  <td className="px-6 py-4 align-top">
                    <span 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider"
                      style={{ 
                        backgroundColor: colors.slate[100],
                        color: colors.slate[600],
                      }}
                    >
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
