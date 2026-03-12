'use client';

import { useState } from 'react';
import { ShouldWeDoIt, CanWeDoIt, Synthesis, SectionVerdict } from '@/lib/v2-schema';
import { Language, t } from '@/lib/v2-translations';

interface StrategicFitSectionProps {
  shouldWeDoIt: ShouldWeDoIt;
  canWeDoIt: CanWeDoIt;
  synthesis: Synthesis;
  language?: Language;
}

// Helper to get verdict colors - supports both English and Japanese decisions
function getVerdictColor(decision: string) {
  const lowerDecision = decision.toLowerCase();
  // Check for Yes/Go verdicts
  if (lowerDecision === 'yes' || lowerDecision === 'proceed' || decision === 'はい') {
    return { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-500', icon: 'text-emerald-600' };
  }
  // Check for No/Pass verdicts
  if (lowerDecision === 'no' || lowerDecision === 'pass' || decision === 'いいえ') {
    return { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-500', icon: 'text-red-600' };
  }
  // Default to Borderline/Conditional (amber)
  return { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-500', icon: 'text-amber-600' };
}

// Normalize decision for logic (handles both English and Japanese JSON values)
function normalizeDecision(decision: string): 'Yes' | 'No' | 'Borderline' | string {
  if (decision === 'Yes' || decision === 'はい') return 'Yes';
  if (decision === 'No' || decision === 'いいえ') return 'No';
  if (decision === 'Borderline' || decision === '境界線上') return 'Borderline';
  return decision;
}

function normalizeConfidence(confidence: string): 'High' | 'Medium' | 'Low' | string {
  if (confidence === 'High' || confidence === '高') return 'High';
  if (confidence === 'Medium' || confidence === '中') return 'Medium';
  if (confidence === 'Low' || confidence === '低') return 'Low';
  return confidence;
}

// Map raw decision value to translated label (Yes/Borderline/No -> はい/境界線上/いいえ when language is ja)
function getDecisionDisplayLabel(decision: string, lang: Language): string {
  const key = decision === 'Yes' || decision === 'はい' ? 'yes'
    : decision === 'No' || decision === 'いいえ' ? 'no'
    : decision === 'Borderline' || decision === '境界線上' ? 'borderline'
    : null;
  return key ? t(key, lang) : decision;
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
  language: Language;
}

function VerdictBadge({ verdict, language }: VerdictBadgeProps) {
  const colors = getVerdictColor(verdict.decision);
  const decisionNorm = normalizeDecision(verdict.decision);

  return (
    <div className={`verdict-badge rounded-xl p-5 border-l-4 ${colors.bg} ${colors.border.replace('border', 'border-l')} shadow-sm`}>
      <div className="flex items-center gap-2 mb-3">
          {decisionNorm === 'Yes' && (
            <svg className={`w-5 h-5 ${colors.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {decisionNorm === 'Borderline' && (
            <svg className={`w-5 h-5 ${colors.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
          {decisionNorm === 'No' && (
            <svg className={`w-5 h-5 ${colors.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span className={`text-base font-bold ${colors.text}`}>
            {getDecisionDisplayLabel(verdict.decision, language)}
          </span>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed pl-7 border-l-2 border-slate-200 ml-2.5">
        {verdict.rationale}
      </p>
    </div>
  );
}

// Helper to calculate position from verdict
function getVerdictPosition(verdict: SectionVerdict): number {
  const decision = normalizeDecision(verdict.decision);
  const confidence = normalizeConfidence(verdict.confidence);

  // Convert verdict to a position (0-100)
  if (decision === 'Yes') {
    return confidence === 'High' ? 85 : confidence === 'Medium' ? 70 : 60;
  }
  if (decision === 'Borderline') {
    return confidence === 'High' ? 55 : confidence === 'Medium' ? 45 : 40;
  }
  // No
  return confidence === 'High' ? 20 : confidence === 'Medium' ? 30 : 35;
}

export function StrategicFitSection({ shouldWeDoIt, canWeDoIt, synthesis, language = 'en' }: StrategicFitSectionProps) {
  // Calculate venture position on the 2x2
  const strategicX = getVerdictPosition(shouldWeDoIt.verdict);
  const executionY = getVerdictPosition(canWeDoIt.verdict);

  return (
    <div className="strategic-fit-section bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Section Header */}
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
        <h2 className="text-base font-bold text-slate-800">{t('strategicFitAssessment', language)}</h2>
      </div>

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        
        {/* Strategic Attractiveness Panel - Blue Theme */}
        <div className="p-6 bg-gradient-to-b from-white to-blue-50/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="font-bold text-sm text-slate-800">{t('strategicAttractiveness', language)}</h3>
          </div>

          <div className="space-y-4 mb-8">
            <ExpandableSection 
              title={t('thePrizeLabel', language)} 
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
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('marketSize', language)}</span>
                  <p>{shouldWeDoIt.the_prize.market_size}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('margins', language)}</span>
                  <p>{shouldWeDoIt.the_prize.margins}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('durability', language)}</span>
                  <p>{shouldWeDoIt.the_prize.durability}</p>
                </div>
              </div>
            </ExpandableSection>

            <ExpandableSection 
              title={t('strategicFit', language)} 
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
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('betType', language)}</span>
                  <p>{shouldWeDoIt.strategic_fit.bet_type}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('portfolioFit', language)}</span>
                  <p>{shouldWeDoIt.strategic_fit.portfolio_fit}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('priorityAlignment', language)}</span>
                  <p>{shouldWeDoIt.strategic_fit.priority_alignment}</p>
                </div>
              </div>
            </ExpandableSection>

            <ExpandableSection 
              title={t('ourEdge', language)} 
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
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('whyUs', language)}</span>
                  <p>{shouldWeDoIt.our_edge.why_us}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('unfairAdvantages', language)}</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    {shouldWeDoIt.our_edge.unfair_advantages.map((adv, i) => (
                      <li key={i}>{adv}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </ExpandableSection>
          </div>

          <VerdictBadge verdict={shouldWeDoIt.verdict} language={language} />
        </div>

        {/* Execution Capability Panel - Purple Theme */}
        <div className="p-6 bg-gradient-to-b from-white to-purple-50/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="font-bold text-sm text-slate-800">{t('executionCapability', language)}</h3>
          </div>

          <div className="space-y-4 mb-8">
            <ExpandableSection 
              title={t('capitalInfrastructure', language)} 
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
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('cashPosition', language)}</span>
                  <p>{canWeDoIt.capital_and_infrastructure.cash_position}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('facilities', language)}</span>
                  <p>{canWeDoIt.capital_and_infrastructure.facilities}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('toolsSystems', language)}</span>
                  <p>{canWeDoIt.capital_and_infrastructure.tools_and_systems}</p>
                </div>
              </div>
            </ExpandableSection>

            <ExpandableSection 
              title={t('marketAccess', language)} 
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
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('customerRelationships', language)}</span>
                  <p>{canWeDoIt.market_access.customer_relationships}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('geographicPresence', language)}</span>
                  <p>{canWeDoIt.market_access.geographic_presence}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('regulatoryExperience', language)}</span>
                  <p>{canWeDoIt.market_access.regulatory_experience}</p>
                </div>
              </div>
            </ExpandableSection>

            <ExpandableSection 
              title={t('people', language)} 
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
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('skills', language)}</span>
                  <p>{canWeDoIt.people.skills}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('experience', language)}</span>
                  <p>{canWeDoIt.people.experience}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t('bandwidth', language)}</span>
                  <p>{canWeDoIt.people.bandwidth}</p>
                </div>
              </div>
            </ExpandableSection>
          </div>

          <VerdictBadge verdict={canWeDoIt.verdict} language={language} />
        </div>
      </div>

      {/* 2x2 Strategic Quadrant */}
      <div className="strategic-quadrant border-t border-slate-200 bg-slate-50/50 p-6">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">{t('strategicPosition', language)}</h3>
        </div>
        
        <div className="max-w-md mx-auto print:max-w-xs">
          {/* Y-axis label */}
          <div className="flex items-stretch gap-3">
            <div className="flex flex-col justify-between py-2 text-[12px] text-black font-medium w-6">
              <span>{t('high', language)}</span>
              <span
                className={`writing-mode-vertical text-black font-semibold tracking-wide ${language === 'ja' ? '' : 'transform -rotate-180'}`}
                style={{ writingMode: 'vertical-rl' }}
              >
                {t('executionCapability', language)}
              </span>
              <span>{t('low', language)}</span>
            </div>
            
            {/* The 2x2 Grid */}
            <div className="flex-1 relative">
              <div className="grid grid-cols-2 grid-rows-2 aspect-square border border-slate-300 rounded-lg overflow-hidden">
                {/* Top-Left: Capable but Uninteresting */}
                <div className="bg-slate-100/50 border-r border-b border-slate-300 p-2 flex items-center justify-center">
                  <span className="text-[11px] font-medium text-black leading-tight text-center whitespace-pre-line">{t('capableButUninteresting', language)}</span>
                </div>
                {/* Top-Right: High Value */}
                <div className="bg-emerald-50 border-b border-slate-300 p-2 flex items-center justify-center">
                  <span className="text-[11px] font-bold text-black leading-tight text-center whitespace-pre-line">{t('highValueOpportunity', language)}</span>
                </div>
                {/* Bottom-Left: Avoid */}
                <div className="bg-red-50/50 border-r border-slate-300 p-2 flex items-center justify-center">
                  <span className="text-[11px] font-medium text-black leading-tight text-center">{t('avoid', language)}</span>
                </div>
                {/* Bottom-Right: Strategic but Risky */}
                <div className="bg-amber-50 p-2 flex items-center justify-center">
                  <span className="text-[11px] font-medium text-black leading-tight text-center whitespace-pre-line">{t('strategicButRisky', language)}</span>
                </div>
              </div>
              
              {/* Venture Position Dot */}
              <div 
                className="absolute w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ 
                  left: `${strategicX}%`, 
                  top: `${100 - executionY}%` 
                }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
                  {t('thisVenture', language)}
                </div>
              </div>
            </div>
          </div>
          
          {/* X-axis label */}
          <div className="flex justify-between mt-1 px-9 text-[12px] text-black font-medium">
            <span>{t('low', language)}</span>
            <span className="text-black font-semibold tracking-wide">{t('strategicAttractiveness', language)}</span>
            <span>{t('high', language)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
