'use client';

import { Verdict } from '@/lib/schema';
import { colors, typography, getConfidenceColor } from '@/lib/infographic-styles';
import { getLabels } from '@/lib/kajima-labels';

interface VerdictPairProps {
  shouldWeDoIt: Verdict;
  canWeDoIt: Verdict;
  kajimaMode?: boolean;
}

export function VerdictPair({ shouldWeDoIt, canWeDoIt, kajimaMode = false }: VerdictPairProps) {
  const labels = getLabels(kajimaMode);
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
          {labels.investmentAssessment}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VerdictPanel 
          title={labels.shouldWeDoIt} 
          verdict={shouldWeDoIt}
          kajimaMode={kajimaMode}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <VerdictPanel 
          title={labels.canWeDoIt} 
          verdict={canWeDoIt}
          kajimaMode={kajimaMode}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
      </div>
    </div>
  );
}

interface VerdictPanelProps {
  title: string;
  verdict: Verdict;
  icon: React.ReactNode;
  kajimaMode: boolean;
}

function VerdictPanel({ title, verdict, icon, kajimaMode }: VerdictPanelProps) {
  const labels = getLabels(kajimaMode);
  const confidenceColor = getConfidenceColor(verdict.confidenceLevel);

  return (
    <div 
      className="rounded-lg p-5"
      style={{ 
        backgroundColor: colors.white,
        border: `1px solid ${colors.slate[200]}`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span style={{ color: colors.navy }}>{icon}</span>
          <h3 
            className="text-sm font-semibold"
            style={{ 
              color: colors.navy,
              fontWeight: typography.fontWeight.semibold,
            }}
          >
            {title}
          </h3>
        </div>
        
        {/* Confidence Badge */}
        <span 
          className="px-2 py-1 rounded text-xs font-medium"
          style={{ 
            backgroundColor: `${confidenceColor}15`,
            color: confidenceColor,
          }}
        >
          {kajimaMode 
            ? (verdict.confidenceLevel === 'High' ? labels.highConfidence 
               : verdict.confidenceLevel === 'Medium' ? labels.mediumConfidence 
               : labels.lowConfidence)
            : `${verdict.confidenceLevel} Confidence`
          }
        </span>
      </div>

      {/* Verdict */}
      <p 
        className="text-base font-medium mb-4"
        style={{ 
          color: colors.slate[700],
          fontWeight: typography.fontWeight.medium,
          lineHeight: typography.lineHeight.relaxed,
        }}
      >
        {verdict.verdict}
      </p>

      {/* Supporting Factors */}
      {verdict.supportingFactors.length > 0 && (
        <div>
          <h4 
            className="text-xs font-medium uppercase tracking-wider mb-2"
            style={{ color: colors.slate[500] }}
          >
            {labels.supportingFactors}
          </h4>
          <ul className="space-y-2">
            {verdict.supportingFactors.map((factor, index) => (
              <li 
                key={index}
                className="flex items-start gap-2 text-sm"
              >
                <span 
                  className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: colors.slate[400] }}
                />
                <span 
                  style={{ 
                    color: colors.slate[600],
                    lineHeight: typography.lineHeight.relaxed,
                  }}
                >
                  {factor}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

