'use client';

import { OverviewBlock as OverviewBlockType } from '@/lib/schema-v2';
import { colors, typography } from '@/lib/infographic-styles';

interface OverviewBlockProps {
  data: OverviewBlockType;
}

export function OverviewBlock({ data }: OverviewBlockProps) {
  const getConfidenceColor = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case 'high':
        return { bg: colors.risk.greenLight, text: colors.risk.green };
      case 'medium':
        return { bg: colors.risk.amberLight, text: colors.risk.amber };
      case 'low':
        return { bg: colors.risk.redLight, text: colors.risk.red };
      default:
        return { bg: colors.slate[100], text: colors.slate[600] };
    }
  };

  const pathColors = getConfidenceColor(data.pathSummary.confidence);

  return (
    <div className="space-y-6">
      {/* Project Description & Decision */}
      <div 
        className="rounded-xl p-6"
        style={{ 
          backgroundColor: colors.white,
          border: `1px solid ${colors.slate[200]}`,
        }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Description */}
          <div>
            <span 
              className="text-xs font-medium uppercase tracking-wider block mb-2"
              style={{ color: colors.slate[500] }}
            >
              Project Description
            </span>
            <p 
              className="text-sm leading-relaxed"
              style={{ 
                color: colors.slate[700],
                lineHeight: typography.lineHeight.relaxed,
              }}
            >
              {data.projectDescription}
            </p>
          </div>

          {/* Right: Decision Statement & Recommendation */}
          <div className="space-y-4">
            <div>
              <span 
                className="text-xs font-medium uppercase tracking-wider block mb-2"
                style={{ color: colors.slate[500] }}
              >
                Decision Statement
              </span>
              <span 
                className="text-lg font-semibold"
                style={{ color: colors.navy }}
              >
                {data.decisionStatement}
              </span>
            </div>
            <div>
              <span 
                className="text-xs font-medium uppercase tracking-wider block mb-2"
                style={{ color: colors.slate[500] }}
              >
                Recommendation
              </span>
              <p 
                className="text-sm"
                style={{ color: colors.slate[600] }}
              >
                {data.recommendation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Path Summary */}
      <div 
        className="rounded-xl p-6"
        style={{ 
          backgroundColor: pathColors.bg,
          border: `1px solid ${pathColors.text}20`,
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <span 
              className="text-xs font-medium uppercase tracking-wider block mb-2"
              style={{ color: pathColors.text }}
            >
              Path Forward
            </span>
            <p 
              className="text-sm font-medium mb-2"
              style={{ color: colors.slate[800] }}
            >
              {data.pathSummary.recommendation}
            </p>
            <p 
              className="text-sm"
              style={{ color: colors.slate[600] }}
            >
              {data.pathSummary.pathDescription}
            </p>
          </div>
          <span 
            className="px-3 py-1 rounded-full text-xs font-medium flex-shrink-0"
            style={{ 
              backgroundColor: colors.white,
              color: pathColors.text,
            }}
          >
            {data.pathSummary.confidence.charAt(0).toUpperCase() + data.pathSummary.confidence.slice(1)} Confidence
          </span>
        </div>
      </div>

      {/* Risks Acknowledged */}
      {data.risksAcknowledged.length > 0 && (
        <div className="avoid-break">
          <div className="flex items-center gap-2 mb-4">
            <div 
              className="w-1 h-6 rounded-full"
              style={{ backgroundColor: colors.risk.red }}
            />
            <h3 
              className="text-lg font-semibold"
              style={{ color: colors.navy }}
            >
              Risks Acknowledged
            </h3>
          </div>
          <div className="grid gap-3">
            {data.risksAcknowledged.slice(0, 6).map((risk, index) => {
              const severityColors = getConfidenceColor(risk.severity === 'high' ? 'low' : risk.severity === 'low' ? 'high' : 'medium');
              return (
                <div
                  key={index}
                  className="rounded-lg p-4 flex items-start gap-3"
                  style={{ 
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.slate[200]}`,
                  }}
                >
                  <span 
                    className="px-2 py-0.5 rounded text-xs font-medium flex-shrink-0"
                    style={{ 
                      backgroundColor: severityColors.bg,
                      color: severityColors.text,
                    }}
                  >
                    {risk.severity.toUpperCase()}
                  </span>
                  <div className="flex-1">
                    <span 
                      className="font-medium text-sm block mb-1"
                      style={{ color: colors.slate[800] }}
                    >
                      {risk.risk}
                    </span>
                    <p 
                      className="text-xs"
                      style={{ color: colors.slate[500] }}
                    >
                      {risk.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
