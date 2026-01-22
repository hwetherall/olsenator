'use client';

import { HighlightV2, HighlightsMetadata, SourceConfidence } from '@/lib/v2-schema';

interface HighlightsV2SectionProps {
  highlights: HighlightV2[];
  metadata: HighlightsMetadata;
}

// Simplified category colors - using a more muted, professional palette
const categoryColors: Record<string, string> = {
  'Market': 'text-blue-600 bg-blue-50 border-blue-100',
  'Financial': 'text-emerald-600 bg-emerald-50 border-emerald-100',
  'Team': 'text-purple-600 bg-purple-50 border-purple-100',
  'Risk': 'text-rose-600 bg-rose-50 border-rose-100',
  'Competitive': 'text-orange-600 bg-orange-50 border-orange-100',
  'Strategic': 'text-indigo-600 bg-indigo-50 border-indigo-100',
  'Technology': 'text-cyan-600 bg-cyan-50 border-cyan-100',
  'Regulatory': 'text-amber-600 bg-amber-50 border-amber-100',
};

// Simplified confidence indicators
const confidenceIcons: Record<SourceConfidence, string> = {
  'verified': '✓',
  'estimated': '~',
  'assumed': '?',
};

function HighlightRow({ highlight }: { highlight: HighlightV2 }) {
  const isTailwind = highlight.polarity === 'tailwind';
  const categoryStyle = categoryColors[highlight.category] || 'text-slate-600 bg-slate-50 border-slate-100';
  
  return (
    <div className="group relative bg-white p-4 rounded-lg border border-slate-100 hover:border-slate-300 hover:shadow-sm transition-all duration-200">
      {/* Top Meta Row */}
      <div className="flex items-center justify-between mb-2">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${categoryStyle}`}>
          {highlight.category}
        </span>
        
        <div className="flex items-center gap-3 text-xs text-slate-400">
          {highlight.time_sensitivity.is_time_bound && (
            <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {highlight.time_sensitivity.window}
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-2">
        <h4 className="text-sm font-bold text-slate-900 leading-snug">
          {highlight.highlight}
        </h4>
        <p className="text-sm text-slate-600 leading-relaxed border-l-2 border-slate-200 pl-3">
          {highlight.why_it_matters}
        </p>
      </div>

      {/* Context Grounding - Made more readable */}
      {highlight.context_grounding && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-500 leading-relaxed">
            <span className="font-semibold text-slate-700">Context:</span> {highlight.context_grounding}
          </p>
        </div>
      )}
    </div>
  );
}

export function HighlightsV2Section({ highlights, metadata }: HighlightsV2SectionProps) {
  const tailwinds = highlights.filter(h => h.polarity === 'tailwind');
  const headwinds = highlights.filter(h => h.polarity === 'headwind');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header & Synthesis */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Key Highlights</h2>
            <p className="text-sm text-slate-500 mt-1">Critical facts balanced between opportunities and challenges</p>
          </div>
          
          {/* Synthesis Box */}
          <div className="bg-white px-4 py-3 rounded-lg border border-slate-200 shadow-sm md:max-w-md">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Balance Assessment</span>
            </div>
            <p className="text-sm font-medium text-slate-700 leading-snug">
              {metadata.balance_check}
            </p>
          </div>
        </div>
      </div>

      {/* The Ledger Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
        
        {/* Left Column: Tailwinds (Assets) */}
        <div className="p-6 bg-gradient-to-b from-emerald-50/30 to-transparent">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-md">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Tailwinds</h3>
              <p className="text-xs text-slate-500">Market drivers & competitive advantages</p>
            </div>
            <span className="ml-auto text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
              {tailwinds.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {tailwinds.map((highlight, index) => (
              <HighlightRow key={`tailwind-${index}`} highlight={highlight} />
            ))}
          </div>
        </div>

        {/* Right Column: Headwinds (Liabilities) */}
        <div className="p-6 bg-gradient-to-b from-rose-50/30 to-transparent">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-1.5 bg-rose-100 text-rose-600 rounded-md">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Headwinds</h3>
              <p className="text-xs text-slate-500">Risks, gaps & structural challenges</p>
            </div>
            <span className="ml-auto text-xs font-bold bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
              {headwinds.length}
            </span>
          </div>

          <div className="space-y-3">
            {headwinds.map((highlight, index) => (
              <HighlightRow key={`headwind-${index}`} highlight={highlight} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
