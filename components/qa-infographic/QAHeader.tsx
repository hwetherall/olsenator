'use client';

import { QAMetadata } from '@/lib/qa-schema';
import { colors, typography } from '@/lib/infographic-styles';

interface QAHeaderProps {
  metadata: QAMetadata;
}

export function QAHeader({ metadata }: QAHeaderProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundColor: colors.white,
        paddingBottom: '2rem',
      }}
    >
      <div className="relative px-8 pt-8">
        {/* Top Row - Logo and Document Type */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            {/* Innovera Logo Style */}
            <span 
              className="text-2xl font-light tracking-[0.1em]"
              style={{ color: colors.navy }}
            >
              INNOVER<span style={{ color: colors.accent }}>A</span>
            </span>
          </div>
          
          <div 
            className="px-3 py-1 text-xs uppercase tracking-wider font-semibold"
            style={{ 
              color: colors.slate[500],
              border: `1px solid ${colors.slate[200]}`,
              borderRadius: '2px',
            }}
          >
            Q&A Analysis
          </div>
        </div>

        {/* Main Title Section - Aligned with "What if..." style */}
        <div className="mb-12">
          <div className="flex flex-col gap-4">
            <h1 
              className="text-5xl font-light leading-tight tracking-tight"
              style={{ 
                color: colors.navy,
                fontFamily: typography.fontFamily.sans,
              }}
            >
              {metadata.projectName}
            </h1>
            
            {/* Orange line divider */}
            <div 
              className="w-16 h-1 my-2"
              style={{ backgroundColor: colors.accent }}
            />

            <p 
              className="text-xl font-light"
              style={{ color: colors.slate[500] }}
            >
              {metadata.documentTitle}
            </p>
          </div>
        </div>

        {/* Stats Row - Minimalist */}
        <div 
          className="flex items-center gap-12 pt-6"
          style={{ borderTop: `1px solid ${colors.slate[100]}` }}
        >
          <div className="flex flex-col">
            <span style={{ color: colors.navy }} className="font-bold text-3xl">
              {metadata.questionCount}
            </span>
            <span className="text-xs uppercase tracking-wide font-medium" style={{ color: colors.slate[400] }}>
              Questions
            </span>
          </div>
          
          {metadata.date && (
            <div className="flex flex-col">
              <span style={{ color: colors.navy }} className="font-bold text-3xl">
                {new Date(metadata.date).getDate()}
              </span>
              <span className="text-xs uppercase tracking-wide font-medium" style={{ color: colors.slate[400] }}>
                {new Date(metadata.date).toLocaleString('default', { month: 'short', year: 'numeric' })}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
