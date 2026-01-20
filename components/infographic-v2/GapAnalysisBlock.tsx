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
      {/* Execution Gap Analysis - 7T Framework */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div 
            className="w-1.5 h-5 rounded-full"
            style={{ backgroundColor: colors.risk.amber }}
          />
          <span 
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: colors.slate[700] }}
          >
            7T Framework Analysis
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {gapKeys.map((key) => {
            const gap = gapLabels[key] || { label: key, icon: '📌' };
            return (
              <div
                key={key}
                className="rounded-xl p-4"
                style={{ 
                  backgroundColor: colors.slate[50],
                  border: `1px solid ${colors.slate[200]}`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{gap.icon}</span>
                  <span 
                    className="text-xs font-bold uppercase tracking-wider"
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
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div 
              className="w-1.5 h-5 rounded-full"
              style={{ backgroundColor: colors.risk.red }}
            />
            <span 
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: colors.slate[700] }}
            >
              Critical Assumptions ({data.criticalAssumptions.length})
            </span>
          </div>

          <div 
            className="rounded-xl p-5"
            style={{ 
              backgroundColor: colors.risk.redLight,
              border: `1px solid ${colors.risk.red}20`,
            }}
          >
            <div className="grid md:grid-cols-2 gap-3">
              {data.criticalAssumptions.map((assumption, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ backgroundColor: colors.white }}
                >
                  <span 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{ 
                      backgroundColor: colors.risk.red,
                      color: colors.white,
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
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
