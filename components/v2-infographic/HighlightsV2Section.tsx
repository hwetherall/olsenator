'use client';

import { HighlightV2, HighlightsMetadata, Polarity, SourceConfidence } from '@/lib/v2-schema';

interface HighlightsV2SectionProps {
  highlights: HighlightV2[];
  metadata: HighlightsMetadata;
}

// Category colors
const categoryColors: Record<string, { bg: string; text: string }> = {
  'Market': { bg: '#dbeafe', text: '#1e40af' },
  'Financial': { bg: '#dcfce7', text: '#166534' },
  'Team': { bg: '#fae8ff', text: '#86198f' },
  'Risk': { bg: '#fecaca', text: '#991b1b' },
  'Competitive': { bg: '#fed7aa', text: '#9a3412' },
  'Strategic': { bg: '#e0e7ff', text: '#3730a3' },
  'Technology': { bg: '#cffafe', text: '#155e75' },
  'Regulatory': { bg: '#fef3c7', text: '#92400e' },
};

// Source confidence badges
const confidenceBadges: Record<SourceConfidence, { icon: string; label: string; color: string }> = {
  'verified': { icon: '✓', label: 'Verified', color: '#22c55e' },
  'estimated': { icon: '~', label: 'Estimated', color: '#f59e0b' },
  'assumed': { icon: '?', label: 'Assumed', color: '#94a3b8' },
};

interface HighlightCardProps {
  highlight: HighlightV2;
}

function HighlightCard({ highlight }: HighlightCardProps) {
  const isTailwind = highlight.polarity === 'tailwind';
  const polarityColor = isTailwind ? '#22c55e' : '#ef4444';
  const categoryColor = categoryColors[highlight.category] || { bg: '#f1f5f9', text: '#475569' };
  const confidence = confidenceBadges[highlight.source_confidence];

  return (
    <div 
      className="bg-white rounded-xl border overflow-hidden transition-shadow hover:shadow-md"
      style={{ borderColor: '#e2e8f0', borderLeftWidth: '4px', borderLeftColor: polarityColor }}
    >
      <div className="p-4">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          {/* Polarity Icon */}
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${polarityColor}15` }}
          >
            {isTailwind ? (
              <svg className="w-3 h-3" style={{ color: polarityColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            ) : (
              <svg className="w-3 h-3" style={{ color: polarityColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            )}
          </div>

          {/* Category Tag */}
          <span 
            className="px-2 py-0.5 rounded text-xs font-medium"
            style={{ backgroundColor: categoryColor.bg, color: categoryColor.text }}
          >
            {highlight.category}
          </span>
        </div>

        {/* Highlight Text */}
        <p className="text-sm font-bold text-slate-800 mb-2 leading-tight">
          {highlight.highlight}
        </p>

        {/* Why It Matters */}
        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
          {highlight.why_it_matters}
        </p>

        {/* Context Grounding */}
        <div className="bg-slate-50 rounded-lg p-2 mb-3">
          <p className="text-xs text-slate-500 italic">
            {highlight.context_grounding}
          </p>
        </div>

        {/* Footer Row */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          {/* Time Sensitivity */}
          {highlight.time_sensitivity.is_time_bound && highlight.time_sensitivity.window ? (
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-amber-600 font-medium">
                {highlight.time_sensitivity.window}
              </span>
            </div>
          ) : (
            <span className="text-xs text-slate-400">No time constraint</span>
          )}

          {/* Source Confidence */}
          <div 
            className="flex items-center gap-1 px-2 py-0.5 rounded"
            style={{ backgroundColor: `${confidence.color}15` }}
          >
            <span style={{ color: confidence.color }}>{confidence.icon}</span>
            <span className="text-xs font-medium" style={{ color: confidence.color }}>
              {confidence.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HighlightsV2Section({ highlights, metadata }: HighlightsV2SectionProps) {
  // Separate tailwinds and headwinds
  const tailwinds = highlights.filter(h => h.polarity === 'tailwind');
  const headwinds = highlights.filter(h => h.polarity === 'headwind');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Section Header */}
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Key Highlights</h2>
            <p className="text-sm text-slate-500 mt-1">Critical facts balanced between opportunities and challenges</p>
          </div>

          {/* Balance Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-2 h-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-green-700">{metadata.tailwinds}</span>
              <span className="text-xs text-slate-500">Tailwinds</span>
            </div>
            <div className="w-px h-4 bg-slate-300" />
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-2 h-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-red-700">{metadata.headwinds}</span>
              <span className="text-xs text-slate-500">Headwinds</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {highlights.map((highlight, index) => (
            <HighlightCard key={index} highlight={highlight} />
          ))}
        </div>

        {/* Balance Check */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Balance Assessment</span>
          </div>
          <p className="text-sm text-slate-700">{metadata.balance_check}</p>
        </div>

        {/* Visual Balance Bar */}
        <div className="mt-4">
          <div className="h-2 rounded-full bg-slate-200 overflow-hidden flex">
            <div 
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${(metadata.tailwinds / metadata.total_highlights) * 100}%` }}
            />
            <div 
              className="h-full bg-red-500 transition-all duration-500"
              style={{ width: `${(metadata.headwinds / metadata.total_highlights) * 100}%` }}
            />
            {metadata.neutral > 0 && (
              <div 
                className="h-full bg-slate-400 transition-all duration-500"
                style={{ width: `${(metadata.neutral / metadata.total_highlights) * 100}%` }}
              />
            )}
          </div>
          <div className="flex justify-between mt-1 text-xs text-slate-500">
            <span>Tailwinds ({Math.round((metadata.tailwinds / metadata.total_highlights) * 100)}%)</span>
            <span>Headwinds ({Math.round((metadata.headwinds / metadata.total_highlights) * 100)}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
