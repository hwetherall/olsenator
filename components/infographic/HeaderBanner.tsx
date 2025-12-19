'use client';

import { colors } from '@/lib/infographic-styles';

interface HeaderBannerProps {
  imageUrl?: string;
  projectName: string;
  industry: string;
}

export function HeaderBanner({ imageUrl, projectName, industry }: HeaderBannerProps) {
  if (!imageUrl) return null;

  return (
    <div 
      className="w-full h-48 rounded-t-lg relative overflow-hidden"
      style={{ backgroundColor: colors.slate[100] }}
    >
      <img
        src={imageUrl}
        alt={`${projectName} - ${industry}`}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Hide the banner if image fails to load
          (e.target as HTMLElement).parentElement!.style.display = 'none';
        }}
      />
      {/* Gradient overlay for text readability */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `linear-gradient(to bottom, transparent 50%, ${colors.navy}99 100%)`,
        }}
      />
    </div>
  );
}

