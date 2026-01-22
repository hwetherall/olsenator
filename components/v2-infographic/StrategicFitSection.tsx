'use client';

import { useState } from 'react';
import { ShouldWeDoIt, CanWeDoIt, Synthesis, SectionVerdict } from '@/lib/v2-schema';

interface StrategicFitSectionProps {
  shouldWeDoIt: ShouldWeDoIt;
  canWeDoIt: CanWeDoIt;
  synthesis: Synthesis;
}

// Helper to get verdict colors
function getVerdictColor(decision: string) {
  switch (decision) {
    case 'Yes':
    case 'Proceed':
      return { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-500', icon: 'text-emerald-600' };
    case 'No':
    case 'Pass':
      return { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-500', icon: 'text-red-600' };
    case 'Borderline':
    case 'Conditional':
    default:
      return { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-500', icon: 'text-amber-600' };
  }
}

function getConfidenceColor(level: string) {
  switch (level) {
    case 'High':
      return { bg: 'bg-emerald-100', text: 'text-emerald-800' };
    case 'Medium':
      return { bg: 'bg-amber-100', text: 'text-amber-800' };
    case 'Low':
      return { bg: 'bg-red-100', text: 'text-red-800' };
    default:
      return { bg: 'bg-slate-100', text: 'text-slate-600' };
  }
}

interface ExpandableSectionProps {
  title: string;
  bottomLine: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  themeColor: 'blue' | 'purple';
  defaultExpanded?: boolean;
}

function ExpandableSection({ title, bottomLine, children, icon, themeColor, defaultExpanded = false }: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const themeStyles = {
    blue: {
      activeBg: 'bg-blue-50',
      hoverBg: 'hover:bg-blue-50/50',
      border: 'border-blue-100',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    purple: {
      activeBg: 'bg-purple-50',
      hoverBg: 'hover:bg-purple-50/50',
      border: 'border-purple-100',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  };

  const currentTheme = themeStyles[themeColor];

  return (
    <div className={`border ${currentTheme.border} rounded-xl overflow-hidden transition-all duration-200 ${isExpanded ? 'shadow-md ring-1 ring-offset-0 ' + (themeColor === 'blue' ? 'ring-blue-100' : 'ring-purple-100') : 'shadow-sm'}`}>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full px-5 py-4 ${isExpanded ? currentTheme.activeBg : 'bg-white'} ${currentTheme.hoverBg} transition-colors flex items-start gap-4 text-left group`}
      >
        <div className={`mt-0.5 w-8 h-8 rounded-lg ${currentTheme.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
          <div className={currentTheme.iconColor}>
            {icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-bold text-slate-800">{title}</span>
            <svg 
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <p className={`text-sm leading-snug ${isExpanded ? 'text-slate-600' : 'text-slate-500 line-clamp-2'}`}>
            {bottomLine}
          </p>
        </div>
      </button>
      
      {isExpanded && (
        <div className={`px-5 py-4 border-t ${currentTheme.border} bg-white`}>
          <div className="text-sm text-slate-600 space-y-3 pl-[3.25rem]">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

interface VerdictBadgeProps {
  verdict: SectionVerdict;
}

function VerdictBadge({ verdict }: VerdictBadgeProps) {
  const colors = getVerdictColor(verdict.decision);
  const confidenceColors = getConfidenceColor(verdict.confidence);

  return (
    <div className={`rounded-xl p-5 border-l-4 ${colors.bg} ${colors.border.replace('border', 'border-l')} shadow-sm`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {verdict.decision === 'Yes' && (
            <svg className={`w-5 h-5 ${colors.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {verdict.decision === 'Borderline' && (
            <svg className={`w-5 h-5 ${colors.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
          <span className={`text-base font-bold ${colors.text}`}>
            {verdict.decision}
          </span>
        </div>
        <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${confidenceColors.bg} ${confidenceColors.text}`}>
          {verdict.confidence} Confidence
        </span>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed pl-7 border-l-2 border-slate-200 ml-2.5">
        {verdict.rationale}
      </p>
    </div>
  );
}

export function StrategicFitSection({ shouldWeDoIt, canWeDoIt, synthesis }: StrategicFitSectionProps) {
  const finalVerdictColor = getVerdictColor(synthesis.final_verdict.decision);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Section Header */}
      <div className="px-8 py-6 border-b border-slate-200 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800">Strategic Fit Assessment</h2>
        <p className="text-sm text-slate-500 mt-1">Evaluating strategic attractiveness vs. execution capability</p>
      </div>

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        
        {/* Should We Do It Panel - Blue Theme */}
        <div className="p-8 bg-gradient-to-b from-white to-blue-50/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Should We Do It?</h3>
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Strategic Attractiveness</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <ExpandableSection 
              title="The Prize" 
              bottomLine={shouldWeDoIt.the_prize.bottom_line}
              themeColor="blue"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            >
              <div className="grid gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Market Size</span>
                  <p>{shouldWeDoIt.the_prize.market_size}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Margins</span>
                  <p>{shouldWeDoIt.the_prize.margins}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Durability</span>
                  <p>{shouldWeDoIt.the_prize.durability}</p>
                </div>
              </div>
            </ExpandableSection>

            <ExpandableSection 
              title="Strategic Fit" 
              bottomLine={shouldWeDoIt.strategic_fit.bottom_line}
              themeColor="blue"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              }
            >
              <div className="grid gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Bet Type</span>
                  <p>{shouldWeDoIt.strategic_fit.bet_type}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Portfolio Fit</span>
                  <p>{shouldWeDoIt.strategic_fit.portfolio_fit}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Priority Alignment</span>
                  <p>{shouldWeDoIt.strategic_fit.priority_alignment}</p>
                </div>
              </div>
            </ExpandableSection>

            <ExpandableSection 
              title="Our Edge" 
              bottomLine={shouldWeDoIt.our_edge.bottom_line}
              themeColor="blue"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            >
              <div className="grid gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Why Us</span>
                  <p>{shouldWeDoIt.our_edge.why_us}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Unfair Advantages</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    {shouldWeDoIt.our_edge.unfair_advantages.map((adv, i) => (
                      <li key={i}>{adv}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </ExpandableSection>
          </div>

          <VerdictBadge verdict={shouldWeDoIt.verdict} />
        </div>

        {/* Can We Do It Panel - Purple Theme */}
        <div className="p-8 bg-gradient-to-b from-white to-purple-50/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Can We Do It?</h3>
              <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">Execution Capability</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <ExpandableSection 
              title="Capital & Infrastructure" 
              bottomLine={canWeDoIt.capital_and_infrastructure.bottom_line}
              themeColor="purple"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
            >
              <div className="grid gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Cash Position</span>
                  <p>{canWeDoIt.capital_and_infrastructure.cash_position}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Facilities</span>
                  <p>{canWeDoIt.capital_and_infrastructure.facilities}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Tools & Systems</span>
                  <p>{canWeDoIt.capital_and_infrastructure.tools_and_systems}</p>
                </div>
              </div>
            </ExpandableSection>

            <ExpandableSection 
              title="Market Access" 
              bottomLine={canWeDoIt.market_access.bottom_line}
              themeColor="purple"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            >
              <div className="grid gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Customer Relationships</span>
                  <p>{canWeDoIt.market_access.customer_relationships}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Geographic Presence</span>
                  <p>{canWeDoIt.market_access.geographic_presence}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Regulatory Experience</span>
                  <p>{canWeDoIt.market_access.regulatory_experience}</p>
                </div>
              </div>
            </ExpandableSection>

            <ExpandableSection 
              title="People" 
              bottomLine={canWeDoIt.people.bottom_line}
              themeColor="purple"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              }
            >
              <div className="grid gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Skills</span>
                  <p>{canWeDoIt.people.skills}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Experience</span>
                  <p>{canWeDoIt.people.experience}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Bandwidth</span>
                  <p>{canWeDoIt.people.bandwidth}</p>
                </div>
              </div>
            </ExpandableSection>
          </div>

          <VerdictBadge verdict={canWeDoIt.verdict} />
        </div>
      </div>

      {/* Synthesis Strip */}
      <div className="border-t border-slate-200 bg-slate-50 p-8">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Executive Synthesis</h3>
        
        {/* 1. Final Verdict - Moved to Top */}
        <div 
          className="rounded-xl p-6 relative overflow-hidden mb-8 bg-white shadow-sm"
          style={{ borderLeft: `4px solid ${finalVerdictColor.border.replace('border-', 'var(--tw-colors-')}` }}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Final Recommendation
                </span>
                <span 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold"
                  style={{ backgroundColor: `${finalVerdictColor.border}20`, color: finalVerdictColor.text }}
                >
                  {synthesis.final_verdict.confidence} Confidence
                </span>
              </div>
              <h3 
                className="text-3xl font-bold mb-3"
                style={{ color: finalVerdictColor.border }}
              >
                {synthesis.final_verdict.decision}
              </h3>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                <p className="text-base text-slate-700 leading-relaxed font-medium">
                  {synthesis.final_verdict.condition}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Alignment & Divergence - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Alignment */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-green-700 uppercase tracking-wider flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Strategic Alignment
            </span>
            <div className="p-5 rounded-xl bg-white border border-green-100 shadow-sm h-full">
              <p className="text-sm text-slate-700 leading-relaxed">{synthesis.alignment}</p>
            </div>
          </div>

          {/* Divergence */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              Execution Gap
            </span>
            <div className="p-5 rounded-xl bg-white border border-amber-100 shadow-sm h-full">
              <p className="text-sm text-slate-700 leading-relaxed">{synthesis.divergence}</p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
