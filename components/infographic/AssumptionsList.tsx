'use client';

import { CriticalAssumption } from '@/lib/schema';
import { colors, typography } from '@/lib/infographic-styles';
import { getLabels } from '@/lib/kajima-labels';

interface AssumptionsListProps {
  assumptions: CriticalAssumption[];
  kajimaMode?: boolean;
}

export function AssumptionsList({ assumptions, kajimaMode = false }: AssumptionsListProps) {
  const labels = getLabels(kajimaMode);
  if (assumptions.length === 0) return null;

  return (
    <div 
      className="avoid-break rounded-lg p-6"
      style={{ 
        backgroundColor: colors.white,
        border: `1px solid ${colors.slate[200]}`,
      }}
    >
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
          {labels.criticalAssumptions}
        </h2>
      </div>

      <p 
        className="text-sm mb-4"
        style={{ color: colors.slate[500] }}
      >
        {labels.assumptionsSubtitle}
      </p>

      <ul className="space-y-3">
        {assumptions.map((assumption, index) => (
          <li 
            key={index}
            className="flex items-start gap-3"
          >
            <span 
              className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: colors.slate[400] }}
            />
            <span 
              className="text-sm leading-relaxed"
              style={{ 
                color: colors.slate[700],
                lineHeight: typography.lineHeight.relaxed,
              }}
            >
              {assumption.assumption}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

