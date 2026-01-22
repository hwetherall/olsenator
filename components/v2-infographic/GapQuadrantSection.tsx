'use client';

import { useState } from 'react';
import { Gap, GapSummary, GapQuadrant } from '@/lib/v2-schema';
import { AlertTriangle, CheckCircle2, ArrowRight, AlertCircle, Target, User, TrendingUp, XCircle } from 'lucide-react';

interface GapQuadrantSectionProps {
  gaps: Gap[];
  summary: GapSummary;
}

// Quadrant colors configuration
const quadrantConfig: Record<GapQuadrant, { 
  bg: string; 
  border: string; 
  text: string; 
  dot: string;
  icon: React.ElementType;
  label: string;
}> = {
  'Quick Win': { 
    bg: 'bg-emerald-50', 
    border: 'border-emerald-200', 
    text: 'text-emerald-800', 
    dot: '#10b981',
    icon: CheckCircle2,
    label: 'Quick Wins'
  },
  'Priority Investment': { 
    bg: 'bg-blue-50', 
    border: 'border-blue-200', 
    text: 'text-blue-800', 
    dot: '#3b82f6',
    icon: Target,
    label: 'Priority Investments'
  },
  'Manageable': { 
    bg: 'bg-amber-50', 
    border: 'border-amber-200', 
    text: 'text-amber-800', 
    dot: '#f59e0b',
    icon: AlertCircle,
    label: 'Manageable'
  },
  'Dealbreaker': { 
    bg: 'bg-rose-50', 
    border: 'border-rose-200', 
    text: 'text-rose-900', 
    dot: '#ef4444',
    icon: AlertTriangle,
    label: 'Dealbreakers'
  },
  'Mixed': { 
    bg: 'bg-slate-50', 
    border: 'border-slate-200', 
    text: 'text-slate-700', 
    dot: '#64748b',
    icon: AlertCircle,
    label: 'Mixed'
  },
};

function GapBridgeCard({ gap, isExpanded, onClick }: { gap: Gap; isExpanded: boolean; onClick: () => void }) {
  const config = quadrantConfig[gap.quadrant];
  
  return (
    <div 
      className={`
        bg-white rounded-xl border shadow-sm transition-all duration-300 overflow-hidden
        ${isExpanded ? 'ring-2 ring-offset-1' : 'hover:border-slate-300'}
      `}
      style={{ 
        borderColor: isExpanded ? config.dot : undefined,
        boxShadow: isExpanded ? `0 4px 12px ${config.dot}15` : undefined
      }}
    >
      {/* Header - Always Visible */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer bg-white"
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${config.dot}15`, color: config.dot }}
          >
            <config.icon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">{gap.dimension}</h4>
            <p className="text-xs text-slate-500">{gap.gap_summary}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] uppercase font-bold text-slate-400">Gap Size</div>
            <div className="flex gap-0.5 justify-end mt-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-3 rounded-sm ${i <= gap.gap_size.score ? '' : 'bg-slate-100'}`}
                  style={{ backgroundColor: i <= gap.gap_size.score ? config.dot : undefined }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Content - The Bridge Visualization */}
      {isExpanded && (
        <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
          <div className="pt-4 border-t border-slate-100 space-y-4">
            
            {/* The A to B Bridge */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-stretch">
              {/* Point A: Current State */}
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 relative">
                <div className="absolute top-3 right-3">
                  <XCircle className="w-4 h-4 text-slate-400" />
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Where We Are (Point A)
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {gap.current_state}
                </p>
              </div>

              {/* The Gap Arrow */}
              <div className="flex flex-col items-center justify-center py-2 md:py-0">
                <div className="h-px w-full md:w-px md:h-full bg-slate-200 absolute -z-10" />
                <div className="bg-white p-1.5 rounded-full border border-slate-200 shadow-sm z-10">
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Point B: Required State */}
              <div className="bg-emerald-50/50 rounded-lg p-3 border border-emerald-100 relative">
                <div className="absolute top-3 right-3">
                  <Target className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                  Where We Need To Be (Point B)
                </span>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  {gap.required_state}
                </p>
              </div>
            </div>

            {/* The Action Plan (The Bridge) */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3" />
                  Action to Close Gap
                </span>
                {gap.owner && (
                  <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                    <User className="w-3 h-3" />
                    Owner: {gap.owner}
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-slate-800">
                  {gap.action_to_close}
                </p>
                <div className="mt-2 flex items-center gap-2">
                   <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                     Ease: {gap.ease_of_closing.label}
                   </span>
                   <span className="text-[10px] text-slate-400">
                     • {gap.why_easy_or_hard}
                   </span>
                </div>
              </div>
            </div>

            {/* Risk of Inaction */}
            {gap.risk_of_inaction && (
              <div className="flex gap-3 items-start p-3 bg-rose-50 rounded-lg border border-rose-100">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block mb-0.5">
                    Risk of Inaction
                  </span>
                  <p className="text-xs text-rose-800">
                    {gap.risk_of_inaction}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export function GapQuadrantSection({ gaps, summary }: GapQuadrantSectionProps) {
  const [selectedGap, setSelectedGap] = useState<string | null>(null);
  const [hoveredGap, setHoveredGap] = useState<string | null>(null);

  // Filter gaps by priority for the list view
  const criticalGaps = gaps.filter(g => g.quadrant === 'Dealbreaker');
  const priorityGaps = gaps.filter(g => g.quadrant === 'Priority Investment');
  const otherGaps = gaps.filter(g => g.quadrant !== 'Dealbreaker' && g.quadrant !== 'Priority Investment');

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
      {/* Header with Overall Assessment */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              Execution Gap Analysis
            </h2>
            <p className="text-sm text-slate-500 mt-1">Mapping gaps by size and difficulty to close</p>
          </div>
          {/* Overall Assessment Banner */}
          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm max-w-2xl">
            <div className="flex gap-3">
              <div className="shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Overall Verdict
                </span>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {summary.overall_gap_assessment}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        
        {/* LEFT COLUMN: The Chart (Visual) */}
        <div className="lg:col-span-5 p-6 flex flex-col">
          <h3 className="text-sm font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <Target className="w-4 h-4 text-slate-500" />
            Gap Landscape
          </h3>
          
          <div className="flex">
            {/* Y-Axis Label Container */}
            <div className="w-6 flex flex-col justify-between py-8 mr-2 relative h-[400px]">
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap absolute top-0 left-1/2 -translate-x-1/2">Easy</span>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap">
                 <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Ease of Closing</span>
              </div>
              
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap absolute bottom-0 left-1/2 -translate-x-1/2">Hard</span>
            </div>

            {/* Chart Container */}
            <div className="relative flex-1 aspect-square max-w-[400px]">
              {/* Background Quadrants */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 rounded-lg overflow-hidden border border-slate-200">
                {/* Top-Left: Quick Wins */}
                <div className="bg-emerald-50/50 border-r border-b border-slate-200 flex p-2">
                  <span className="text-[10px] font-bold text-emerald-700/50 uppercase tracking-wider">Quick Wins</span>
                </div>
                {/* Top-Right: Priority Investments */}
                <div className="bg-blue-50/50 border-b border-slate-200 flex p-2 justify-end">
                  <span className="text-[10px] font-bold text-blue-700/50 uppercase tracking-wider text-right">Priority<br/>Investments</span>
                </div>
                {/* Bottom-Left: Manageable */}
                <div className="bg-amber-50/50 border-r border-slate-200 flex items-end p-2">
                  <span className="text-[10px] font-bold text-amber-700/50 uppercase tracking-wider">Manageable</span>
                </div>
                {/* Bottom-Right: Dealbreakers */}
                <div className="bg-rose-50/50 flex items-end justify-end p-2">
                  <span className="text-[10px] font-bold text-rose-700/50 uppercase tracking-wider">Dealbreakers</span>
                </div>
              </div>

              {/* Dots */}
              {gaps.map((gap) => {
                const pos = getPosition(gap.gap_size.score, gap.ease_of_closing.score);
                const config = quadrantConfig[gap.quadrant];
                const isSelected = selectedGap === gap.dimension;
                const isHovered = hoveredGap === gap.dimension;
                const isCritical = gap.quadrant === 'Dealbreaker';

                return (
                  <button
                    key={gap.dimension}
                    onClick={() => setSelectedGap(isSelected ? null : gap.dimension)}
                    onMouseEnter={() => setHoveredGap(gap.dimension)}
                    onMouseLeave={() => setHoveredGap(null)}
                    className={`
                      absolute transform -translate-x-1/2 -translate-y-1/2
                      flex items-center justify-center
                      transition-all duration-300 ease-out
                      ${isSelected || isHovered ? 'z-20 scale-125' : 'z-10 scale-100'}
                    `}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  >
                    <div 
                      className={`
                        w-3 h-3 rounded-full shadow-sm ring-2 ring-white
                        ${isCritical ? 'animate-pulse' : ''}
                      `}
                      style={{ backgroundColor: config.dot }}
                    />
                    
                    {/* Tooltip on Hover */}
                    {(isHovered || isSelected) && (
                      <div 
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                        style={{ minWidth: '120px' }}
                      >
                        <div className="px-2 py-1 bg-slate-800 text-white text-xs rounded shadow-lg text-center whitespace-normal">
                          {gap.dimension}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* X Axis Labels */}
          <div className="flex pl-8 mt-2">
            <div className="flex-1 flex justify-between text-[10px] text-slate-400 font-medium px-1">
              <span>Small Gap</span>
              <span className="text-slate-600 font-bold uppercase tracking-wider">Gap Size</span>
              <span>Large Gap</span>
            </div>
          </div>

          {/* Compact Legend */}
          <div className="mt-8 grid grid-cols-2 gap-2">
            {(Object.entries(quadrantConfig) as [GapQuadrant, typeof quadrantConfig[GapQuadrant]][]).map(([key, config]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.dot }} />
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{key}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Action List (Bridge View) */}
        <div className="lg:col-span-7 bg-slate-50/50 flex flex-col h-full">
          <div className="p-6 space-y-6">
            
            {/* 1. Dealbreakers Section */}
            {criticalGaps.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-rose-700 flex items-center gap-2 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  Critical Dealbreakers
                </h3>
                <div className="grid gap-3">
                  {criticalGaps.map((gap) => (
                    <GapBridgeCard 
                      key={gap.dimension}
                      gap={gap}
                      isExpanded={selectedGap === gap.dimension || true} // Default expanded for dealbreakers
                      onClick={() => setSelectedGap(selectedGap === gap.dimension ? null : gap.dimension)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 2. Priority Investments */}
            {priorityGaps.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-blue-700 flex items-center gap-2 uppercase tracking-wider">
                  <Target className="w-4 h-4" />
                  Priority Investments
                </h3>
                <div className="grid gap-3">
                  {priorityGaps.map((gap) => (
                    <GapBridgeCard 
                      key={gap.dimension}
                      gap={gap}
                      isExpanded={selectedGap === gap.dimension}
                      onClick={() => setSelectedGap(selectedGap === gap.dimension ? null : gap.dimension)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 3. Other Gaps (Collapsed/Compact) */}
            {otherGaps.length > 0 && (
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Other Observations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {otherGaps.map((gap) => {
                    const config = quadrantConfig[gap.quadrant];
                    return (
                      <div 
                        key={gap.dimension}
                        className={`
                          bg-white rounded border border-slate-200 p-2.5 flex items-center gap-3
                          hover:border-slate-300 transition-colors cursor-pointer
                          ${selectedGap === gap.dimension ? 'ring-1 ring-slate-300' : ''}
                        `}
                        onMouseEnter={() => setHoveredGap(gap.dimension)}
                        onMouseLeave={() => setHoveredGap(null)}
                        onClick={() => setSelectedGap(selectedGap === gap.dimension ? null : gap.dimension)}
                      >
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: config.dot }} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-700 truncate">{gap.dimension}</p>
                          <p className="text-xs text-slate-500 truncate">{gap.quadrant}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
