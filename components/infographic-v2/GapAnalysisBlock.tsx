'use client';

import { GapAnalysisBlock as GapAnalysisBlockType } from '@/lib/schema-v2';
import { colors, typography } from '@/lib/infographic-styles';

interface GapAnalysisBlockProps {
  data: GapAnalysisBlockType;
}

const gapLabels: Record<string, { label: string; icon: string }> = {
  team: { label: 'Team', icon: '👥' },
  tam: { label: 'TAM', icon: '📊' },
  technology: { label: 'Technology', icon: '⚙️' },
  traction: { label: 'Traction', icon: '📈' },
  terms: { label: 'Terms', icon: '📋' },
  trends: { label: 'Trends', icon: '🔮' },
  transactions: { label: 'Transactions', icon: '💰' },
};

export function GapAnalysisBlock({ data }: GapAnalysisBlockProps) {
  const gaps = data.executionGaps;
  const gapKeys = Object.keys(gaps) as Array<keyof typeof gaps>;

  return (
    <div className="space-y-6">
      {/* Execution Gap Analysis */}
      <div className="avoid-break">
        <div className="flex items-center gap-2 mb-4">
          <div 
            className="w-1 h-6 rounded-full"
            style={{ backgroundColor: colors.risk.amber }}
          />
          <h2 
            className="text-lg font-semibold"
            style={{ 
              color: colors.navy,
              fontFamily: typography.fontFamily.sans,
            }}
          >
            Execution Gap Analysis (7T Framework)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {gapKeys.map((key) => {
            const gap = gapLabels[key] || { label: key, icon: '📌' };
            return (
              <div
                key={key}
                className="rounded-lg p-4"
                style={{ 
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.slate[200]}`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{gap.icon}</span>
                  <span 
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: colors.navy }}
                  >
                    {gap.label}
                  </span>
                </div>
                <p 
                  className="text-xs leading-relaxed"
                  style={{ 
                    color: colors.slate[600],
                    lineHeight: typography.lineHeight.relaxed,
                  }}
                >
                  {gaps[key]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Critical Assumptions */}
      {data.criticalAssumptions.length > 0 && (
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
              }}
            >
              Critical Assumptions
            </h2>
            <span 
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{ 
                backgroundColor: colors.slate[100],
                color: colors.slate[600],
              }}
            >
              {data.criticalAssumptions.length} items
            </span>
          </div>

          <div 
            className="rounded-xl p-5"
            style={{ 
              backgroundColor: colors.slate[50],
              border: `1px solid ${colors.slate[200]}`,
            }}
          >
            <ul className="space-y-3">
              {data.criticalAssumptions.map((assumption, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-3"
                >
                  <span 
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium mt-0.5"
                    style={{ 
                      backgroundColor: colors.risk.amberLight,
                      color: colors.risk.amber,
                    }}
                  >
                    {index + 1}
                  </span>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ 
                      color: colors.slate[700],
                      lineHeight: typography.lineHeight.relaxed,
                    }}
                  >
                    {assumption}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
