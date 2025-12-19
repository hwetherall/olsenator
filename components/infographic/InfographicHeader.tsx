'use client';

import { ProjectMetadata } from '@/lib/schema';
import { colors, typography, getDecisionColor, getDecisionBgColor } from '@/lib/infographic-styles';

interface InfographicHeaderProps {
  metadata: ProjectMetadata;
  headerImage?: string;
}

export function InfographicHeader({ metadata, headerImage }: InfographicHeaderProps) {
  const decisionColor = getDecisionColor(metadata.decision);
  const decisionBgColor = getDecisionBgColor(metadata.decision);

  return (
    <div className="infographic-header avoid-break">
      {/* Optional AI-generated header image */}
      {headerImage && (
        <div 
          className="w-full h-32 bg-cover bg-center rounded-t-lg"
          style={{ 
            backgroundImage: `url(${headerImage})`,
            backgroundColor: colors.slate[100],
          }}
        />
      )}
      
      <div 
        className="p-6 rounded-lg"
        style={{ 
          backgroundColor: colors.navy,
          borderTopLeftRadius: headerImage ? 0 : undefined,
          borderTopRightRadius: headerImage ? 0 : undefined,
        }}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Project Info */}
          <div className="flex-1">
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ 
                color: colors.white,
                fontFamily: typography.fontFamily.sans,
                fontWeight: typography.fontWeight.bold,
              }}
            >
              {metadata.projectName}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 mt-3">
              {/* Stage Badge */}
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: colors.white,
                }}
              >
                {metadata.stage}
              </span>
              
              {/* Industry */}
              <span 
                className="text-sm"
                style={{ color: colors.slate[300] }}
              >
                {metadata.industry}
              </span>
              
              {/* Location */}
              {metadata.location && (
                <>
                  <span style={{ color: colors.slate[500] }}>•</span>
                  <span 
                    className="text-sm"
                    style={{ color: colors.slate[300] }}
                  >
                    {metadata.location}
                  </span>
                </>
              )}
            </div>
          </div>
          
          {/* Decision Indicator */}
          <div 
            className="flex flex-col items-center justify-center px-6 py-4 rounded-lg min-w-[160px]"
            style={{ backgroundColor: decisionBgColor }}
          >
            <span 
              className="text-xs font-medium uppercase tracking-wider mb-1"
              style={{ color: colors.slate[500] }}
            >
              Recommendation
            </span>
            <span 
              className="text-lg font-bold"
              style={{ 
                color: decisionColor,
                fontWeight: typography.fontWeight.bold,
              }}
            >
              {metadata.decision}
            </span>
          </div>
        </div>
        
        {/* Recommendation Text */}
        {metadata.recommendation && (
          <p 
            className="mt-4 text-sm leading-relaxed"
            style={{ 
              color: colors.slate[300],
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            {metadata.recommendation}
          </p>
        )}
      </div>
    </div>
  );
}

