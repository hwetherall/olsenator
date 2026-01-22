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
      return { bg: '#dcfce7', text: '#166534', border: '#22c55e' };
    case 'No':
    case 'Pass':
      return { bg: '#fecaca', text: '#991b1b', border: '#ef4444' };
    case 'Borderline':
    case 'Conditional':
    default:
      return { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' };
  }
}

function getConfidenceColor(level: string) {
  switch (level) {
    case 'High':
      return { bg: '#dcfce7', text: '#166534' };
    case 'Medium':
      return { bg: '#fef3c7', text: '#92400e' };
    case 'Low':
      return { bg: '#fecaca', text: '#991b1b' };
    default:
      return { bg: '#f1f5f9', text: '#475569' };
  }
}

interface ExpandableSectionProps {
  title: string;
  bottomLine: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

function ExpandableSection({ title, bottomLine, children, defaultExpanded = false }: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between text-left"
      >
        <span className="text-sm font-semibold text-slate-700">{title}</span>
        <svg 
          className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="px-4 py-3 border-t border-slate-200">
        <p className="text-sm text-slate-600 font-medium">{bottomLine}</p>
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

interface VerdictBadgeProps {
  verdict: SectionVerdict;
}

function VerdictBadge({ verdict }: VerdictBadgeProps) {
  const verdictColor = getVerdictColor(verdict.decision);
  const confidenceColor = getConfidenceColor(verdict.confidence);

  return (
    <div 
      className="rounded-lg p-4"
      style={{ backgroundColor: `${verdictColor.border}10`, border: `1px solid ${verdictColor.border}30` }}
    >
      <div className="flex items-center justify-between mb-2">
        <span 
          className="px-2 py-0.5 rounded text-xs font-bold"
          style={{ backgroundColor: verdictColor.bg, color: verdictColor.text }}
        >
          {verdict.decision}
        </span>
        <span 
          className="px-2 py-0.5 rounded text-xs font-medium"
          style={{ backgroundColor: confidenceColor.bg, color: confidenceColor.text }}
        >
          {verdict.confidence} Confidence
        </span>
      </div>
      <p className="text-sm text-slate-600">{verdict.rationale}</p>
    </div>
  );
}

export function StrategicFitSection({ shouldWeDoIt, canWeDoIt, synthesis }: StrategicFitSectionProps) {
  const finalVerdictColor = getVerdictColor(synthesis.final_verdict.decision);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Section Header */}
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h2 className="text-lg font-bold text-slate-800">Strategic Fit Assessment</h2>
        <p className="text-sm text-slate-500 mt-1">Evaluating strategic attractiveness and execution capability</p>
      </div>

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Should We Do It Panel */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Should We Do It?</h3>
              <p className="text-xs text-slate-500">Strategic Attractiveness</p>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <ExpandableSection 
              title="The Prize" 
              bottomLine={shouldWeDoIt.the_prize.bottom_line}
            >
              <p><strong>Market Size:</strong> {shouldWeDoIt.the_prize.market_size}</p>
              <p><strong>Margins:</strong> {shouldWeDoIt.the_prize.margins}</p>
              <p><strong>Durability:</strong> {shouldWeDoIt.the_prize.durability}</p>
            </ExpandableSection>

            <ExpandableSection 
              title="Strategic Fit" 
              bottomLine={shouldWeDoIt.strategic_fit.bottom_line}
            >
              <p><strong>Bet Type:</strong> {shouldWeDoIt.strategic_fit.bet_type}</p>
              <p><strong>Portfolio Fit:</strong> {shouldWeDoIt.strategic_fit.portfolio_fit}</p>
              <p><strong>Priority Alignment:</strong> {shouldWeDoIt.strategic_fit.priority_alignment}</p>
            </ExpandableSection>

            <ExpandableSection 
              title="Our Edge" 
              bottomLine={shouldWeDoIt.our_edge.bottom_line}
            >
              <p><strong>Why Us:</strong> {shouldWeDoIt.our_edge.why_us}</p>
              <div>
                <strong>Unfair Advantages:</strong>
                <ul className="list-disc list-inside mt-1">
                  {shouldWeDoIt.our_edge.unfair_advantages.map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>
            </ExpandableSection>
          </div>

          <VerdictBadge verdict={shouldWeDoIt.verdict} />
        </div>

        {/* Can We Do It Panel */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Can We Do It?</h3>
              <p className="text-xs text-slate-500">Execution Capability</p>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <ExpandableSection 
              title="Capital & Infrastructure" 
              bottomLine={canWeDoIt.capital_and_infrastructure.bottom_line}
            >
              <p><strong>Cash Position:</strong> {canWeDoIt.capital_and_infrastructure.cash_position}</p>
              <p><strong>Facilities:</strong> {canWeDoIt.capital_and_infrastructure.facilities}</p>
              <p><strong>Tools & Systems:</strong> {canWeDoIt.capital_and_infrastructure.tools_and_systems}</p>
            </ExpandableSection>

            <ExpandableSection 
              title="Market Access" 
              bottomLine={canWeDoIt.market_access.bottom_line}
            >
              <p><strong>Customer Relationships:</strong> {canWeDoIt.market_access.customer_relationships}</p>
              <p><strong>Geographic Presence:</strong> {canWeDoIt.market_access.geographic_presence}</p>
              <p><strong>Regulatory Experience:</strong> {canWeDoIt.market_access.regulatory_experience}</p>
            </ExpandableSection>

            <ExpandableSection 
              title="People" 
              bottomLine={canWeDoIt.people.bottom_line}
            >
              <p><strong>Skills:</strong> {canWeDoIt.people.skills}</p>
              <p><strong>Experience:</strong> {canWeDoIt.people.experience}</p>
              <p><strong>Bandwidth:</strong> {canWeDoIt.people.bandwidth}</p>
            </ExpandableSection>
          </div>

          <VerdictBadge verdict={canWeDoIt.verdict} />
        </div>
      </div>

      {/* Synthesis Strip */}
      <div className="border-t border-slate-200 bg-slate-50 p-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Synthesis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Alignment */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">Aligned</span>
              <p className="text-sm text-slate-600 mt-1">{synthesis.alignment}</p>
            </div>
          </div>

          {/* Divergence */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Gap</span>
              <p className="text-sm text-slate-600 mt-1">{synthesis.divergence}</p>
            </div>
          </div>
        </div>

        {/* Gap to Close */}
        <div className="bg-white rounded-lg p-4 border border-slate-200 mb-4">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Critical Focus Area</span>
          <p className="text-sm text-slate-700 mt-1 font-medium">{synthesis.gap_to_close}</p>
        </div>

        {/* Final Verdict */}
        <div 
          className="rounded-lg p-4 text-center"
          style={{ backgroundColor: `${finalVerdictColor.border}15`, border: `2px solid ${finalVerdictColor.border}` }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: finalVerdictColor.text }}>
            Final Verdict
          </span>
          <span 
            className="text-xl font-bold block mb-2"
            style={{ color: finalVerdictColor.border }}
          >
            {synthesis.final_verdict.decision}
          </span>
          <p className="text-sm" style={{ color: finalVerdictColor.text }}>
            {synthesis.final_verdict.condition}
          </p>
          <span 
            className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium"
            style={{ backgroundColor: `${finalVerdictColor.border}20`, color: finalVerdictColor.text }}
          >
            {synthesis.final_verdict.confidence} Confidence
          </span>
        </div>
      </div>
    </div>
  );
}
