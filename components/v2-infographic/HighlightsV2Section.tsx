'use client';

import { useState } from 'react';
import { HighlightV2, HighlightsMetadata, SourceConfidence } from '@/lib/v2-schema';
import { Language, t } from '@/lib/v2-translations';

interface HighlightsV2SectionProps {
  highlights: HighlightV2[];
  metadata: HighlightsMetadata;
  defaultCollapsed?: boolean;
  language?: Language;
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
    <div className="highlight-row group relative bg-white p-4 rounded-lg border border-slate-100 hover:border-slate-300 hover:shadow-sm transition-all duration-200">
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

export function HighlightsV2Section({ highlights, metadata, defaultCollapsed = false, language = 'en' }: HighlightsV2SectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const tailwinds = highlights.filter(h => h.polarity === 'tailwind');
  const headwinds = highlights.filter(h => h.polarity === 'headwind');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Collapsible Header */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="highlights-toggle w-full bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="text-left">
            <h2 className="text-base font-bold text-slate-800">{t('keyHighlights', language)}</h2>
            <p className="text-xs text-slate-500">
              {tailwinds.length} {t('tailwinds', language).toLowerCase()}, {headwinds.length} {t('headwinds', language).toLowerCase()}
            </p>
          </div>
        </div>
        <svg 
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible Content - Always rendered, hidden via CSS for print support */}
      <div className={`highlights-collapsible-content ${isCollapsed ? 'hidden' : ''}`}>
        {/* Balance Assessment */}
        <div className="px-6 py-3 bg-slate-50/50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-400" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Balance:</span>
            <span className="text-xs text-slate-600">{metadata.balance_check}</span>
          </div>
        </div>

        {/* The Ledger Layout */}
        <div className="highlights-grid grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          
          {/* Left Column: Tailwinds (Assets) */}
          <div className="p-6 bg-gradient-to-b from-emerald-50/30 to-transparent">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1 bg-emerald-100 text-emerald-600 rounded">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t('tailwinds', language)}</h3>
              <span className="ml-auto text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
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
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1 bg-rose-100 text-rose-600 rounded">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t('headwinds', language)}</h3>
              <span className="ml-auto text-[10px] font-bold bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full">
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
    </div>
  );
}
