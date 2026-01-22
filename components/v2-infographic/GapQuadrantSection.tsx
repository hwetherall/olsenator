'use client';

import { useState } from 'react';
import { Gap, GapSummary, GapQuadrant } from '@/lib/v2-schema';

interface GapQuadrantSectionProps {
  gaps: Gap[];
  summary: GapSummary;
}

// Quadrant colors
const quadrantColors: Record<GapQuadrant, { bg: string; border: string; text: string; dot: string }> = {
  'Quick Win': { bg: '#dcfce7', border: '#22c55e', text: '#166534', dot: '#22c55e' },
  'Priority Investment': { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af', dot: '#3b82f6' },
  'Manageable': { bg: '#fef3c7', border: '#f59e0b', text: '#92400e', dot: '#f59e0b' },
  'Dealbreaker': { bg: '#fecaca', border: '#ef4444', text: '#991b1b', dot: '#ef4444' },
  'Mixed': { bg: '#e2e8f0', border: '#64748b', text: '#475569', dot: '#64748b' },
};

interface GapDetailCardProps {
  gap: Gap;
  onClose: () => void;
}

function GapDetailCard({ gap, onClose }: GapDetailCardProps) {
  const colors = quadrantColors[gap.quadrant];

  return (
    <div 
      className="absolute z-20 w-80 bg-white rounded-xl shadow-xl border overflow-hidden"
      style={{ borderColor: colors.border }}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: colors.bg }}>
        <div>
          <span 
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: colors.text }}
          >
            {gap.quadrant}
          </span>
          <h4 className="font-bold text-slate-800">{gap.dimension}</h4>
        </div>
        <button 
          onClick={onClose}
          className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
        >
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Gap Summary */}
        <div 
          className="p-3 rounded-lg text-sm font-medium"
          style={{ backgroundColor: `${colors.border}10`, color: colors.text }}
        >
          {gap.gap_summary}
        </div>

        {/* Current vs Required */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Where We Are</span>
            <p className="text-xs text-slate-600 mt-1">{gap.current_state}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Where We Need To Be</span>
            <p className="text-xs text-slate-600 mt-1">{gap.required_state}</p>
          </div>
        </div>

        {/* Scores */}
        <div className="flex items-center gap-4 py-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Gap Size:</span>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
              {gap.gap_size.label} ({gap.gap_size.score}/5)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Ease:</span>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
              {gap.ease_of_closing.label} ({gap.ease_of_closing.score}/5)
            </span>
          </div>
        </div>

        {/* Why Easy/Hard */}
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Why {gap.ease_of_closing.score >= 3 ? 'Easy' : 'Hard'}?</span>
          <p className="text-xs text-slate-600 mt-1">{gap.why_easy_or_hard}</p>
        </div>

        {/* Action */}
        <div className="pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Action to Close</span>
          <p className="text-xs text-slate-700 mt-1 font-medium">{gap.action_to_close}</p>
        </div>
      </div>
    </div>
  );
}

export function GapQuadrantSection({ gaps, summary }: GapQuadrantSectionProps) {
  const [selectedGap, setSelectedGap] = useState<Gap | null>(null);
  const [hoveredGap, setHoveredGap] = useState<string | null>(null);

  // Calculate dot positions (scale from 1-5 to 0-100%)
  const getPosition = (gapSize: number, ease: number) => {
    // X: gap size (1=left, 5=right)
    // Y: ease of closing (1=bottom hard, 5=top easy)
    const x = ((gapSize - 1) / 4) * 100;
    const y = 100 - ((ease - 1) / 4) * 100; // Invert Y so easy is at top
    return { x, y };
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Section Header */}
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h2 className="text-lg font-bold text-slate-800">Execution Gap Analysis</h2>
        <p className="text-sm text-slate-500 mt-1">Mapping gaps by size and difficulty to close</p>
      </div>

      <div className="p-6">
        {/* Quadrant Chart */}
        <div className="relative mb-6">
          {/* Chart Container */}
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Background Quadrants */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
              {/* Top-Left: Quick Wins */}
              <div className="bg-green-50 border-r border-b border-slate-200 flex items-center justify-center">
                <span className="text-xs font-semibold text-green-700 opacity-50">Quick Wins</span>
              </div>
              {/* Top-Right: Priority Investments */}
              <div className="bg-blue-50 border-b border-slate-200 flex items-center justify-center">
                <span className="text-xs font-semibold text-blue-700 opacity-50">Priority Investments</span>
              </div>
              {/* Bottom-Left: Manageable */}
              <div className="bg-amber-50 border-r border-slate-200 flex items-center justify-center">
                <span className="text-xs font-semibold text-amber-700 opacity-50">Manageable</span>
              </div>
              {/* Bottom-Right: Dealbreakers */}
              <div className="bg-red-50 flex items-center justify-center">
                <span className="text-xs font-semibold text-red-700 opacity-50">Dealbreakers</span>
              </div>
            </div>

            {/* Axis Labels */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-xs text-slate-500">
              <span>Small Gap</span>
              <span className="font-medium">Gap Size</span>
              <span>Large Gap</span>
            </div>
            <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-between text-xs text-slate-500 writing-mode-vertical">
              <span className="transform -rotate-90 origin-left translate-x-4">Easy</span>
              <span className="transform -rotate-90 origin-left translate-x-2 font-medium">Ease of Closing</span>
              <span className="transform -rotate-90 origin-left">Hard</span>
            </div>

            {/* Dots */}
            {gaps.map((gap) => {
              const pos = getPosition(gap.gap_size.score, gap.ease_of_closing.score);
              const colors = quadrantColors[gap.quadrant];
              const isSelected = selectedGap?.dimension === gap.dimension;
              const isHovered = hoveredGap === gap.dimension;

              return (
                <div key={gap.dimension} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
                  <button
                    onClick={() => setSelectedGap(isSelected ? null : gap)}
                    onMouseEnter={() => setHoveredGap(gap.dimension)}
                    onMouseLeave={() => setHoveredGap(null)}
                    className={`
                      relative -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full 
                      flex items-center justify-center cursor-pointer
                      transition-all duration-200 ease-out
                      ${isSelected || isHovered ? 'scale-125 z-10' : 'scale-100'}
                    `}
                    style={{ 
                      backgroundColor: colors.dot,
                      boxShadow: isSelected || isHovered ? `0 0 0 3px ${colors.bg}, 0 4px 12px rgba(0,0,0,0.15)` : '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <span className="text-white text-[10px] font-bold">
                      {gap.dimension.split(' ')[0].charAt(0)}
                    </span>
                  </button>

                  {/* Hover Label */}
                  {(isHovered && !isSelected) && (
                    <div className="absolute left-1/2 -translate-x-1/2 -top-8 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20">
                      {gap.dimension}
                    </div>
                  )}

                  {/* Detail Card */}
                  {isSelected && (
                    <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2">
                      <GapDetailCard gap={gap} onClose={() => setSelectedGap(null)} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6 pt-8">
          {(Object.entries(quadrantColors) as [GapQuadrant, typeof quadrantColors[GapQuadrant]][]).map(([quadrant, colors]) => (
            <div key={quadrant} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.dot }} />
              <span className="text-xs text-slate-600">{quadrant}</span>
            </div>
          ))}
        </div>

        {/* Summary Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {/* Dealbreakers */}
          {summary.dealbreakers.length > 0 && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
              <span className="text-xs font-semibold text-red-700 uppercase tracking-wider block mb-2">
                Dealbreakers ({summary.dealbreakers.length})
              </span>
              <ul className="space-y-1">
                {summary.dealbreakers.map((item, i) => (
                  <li key={i} className="text-xs text-red-600">• {item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Priority Investments */}
          {summary.priority_investments.length > 0 && (
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider block mb-2">
                Priority ({summary.priority_investments.length})
              </span>
              <ul className="space-y-1">
                {summary.priority_investments.map((item, i) => (
                  <li key={i} className="text-xs text-blue-600">• {item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Wins */}
          {summary.quick_wins.length > 0 && (
            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <span className="text-xs font-semibold text-green-700 uppercase tracking-wider block mb-2">
                Quick Wins ({summary.quick_wins.length})
              </span>
              <ul className="space-y-1">
                {summary.quick_wins.map((item, i) => (
                  <li key={i} className="text-xs text-green-600">• {item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Mixed/Manageable */}
          {(summary.mixed.length > 0 || summary.manageable.length > 0) && (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block mb-2">
                Mixed ({summary.mixed.length + summary.manageable.length})
              </span>
              <ul className="space-y-1">
                {[...summary.mixed, ...summary.manageable].map((item, i) => (
                  <li key={i} className="text-xs text-amber-600">• {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Overall Assessment */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Overall Gap Assessment
          </span>
          <p className="text-sm text-slate-700">{summary.overall_gap_assessment}</p>
        </div>
      </div>

      {/* Print-friendly Gap List */}
      <div className="hidden print:block p-6 border-t border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Gap Details</h3>
        <div className="space-y-3">
          {gaps.map((gap) => {
            const colors = quadrantColors[gap.quadrant];
            return (
              <div key={gap.dimension} className="p-3 rounded border" style={{ borderColor: colors.border, backgroundColor: `${colors.bg}50` }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-slate-800">{gap.dimension}</span>
                  <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: colors.bg, color: colors.text }}>
                    {gap.quadrant}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{gap.gap_summary}</p>
                <p className="text-xs text-slate-500 mt-1"><strong>Action:</strong> {gap.action_to_close}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
