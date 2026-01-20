'use client';

import { colors, typography } from '@/lib/infographic-styles';

interface SectionHeaderProps {
  sectionNumber: number;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ sectionNumber, title, subtitle }: SectionHeaderProps) {
  return (
    <div 
      className="flex items-center gap-4 mb-5 pb-4"
      style={{ borderBottom: `2px solid ${colors.slate[200]}` }}
    >
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ 
          backgroundColor: colors.navy,
          fontFamily: typography.fontFamily.sans,
        }}
      >
        <span 
          className="text-lg font-bold"
          style={{ color: colors.white }}
        >
          {sectionNumber}
        </span>
      </div>
      <div>
        <h2 
          className="text-xl font-bold"
          style={{ 
            color: colors.navy,
            fontFamily: typography.fontFamily.sans,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p 
            className="text-sm mt-0.5"
            style={{ color: colors.slate[500] }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
