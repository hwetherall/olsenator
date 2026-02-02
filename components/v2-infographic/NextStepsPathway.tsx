'use client';

import { useState } from 'react';
import { NextStepV2, PathwayMetadata, StepOwner, FailureAction } from '@/lib/v2-schema';
import { Language, t } from '@/lib/v2-translations';

interface NextStepsPathwayProps {
  steps: NextStepV2[];
  metadata: PathwayMetadata;
  language?: Language;
}

// Owner badge colors
const ownerColors: Record<StepOwner, { bg: string; text: string; border: string; ring: string }> = {
  'venture': { bg: '#eff6ff', text: '#1e40af', border: '#bfdbfe', ring: '#60a5fa' }, // Blue
  'joint': { bg: '#fdf4ff', text: '#86198f', border: '#f0abfc', ring: '#e879f9' },   // Purple
  'investor': { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0', ring: '#4ade80' }, // Green
};

// Failure action colors
const failureColors: Record<FailureAction, { bg: string; text: string; border: string }> = {
  'pivot': { bg: '#fffbeb', text: '#92400e', border: '#fde68a' },
  'pass': { bg: '#fef2f2', text: '#991b1b', border: '#fecaca' },
  'reassess': { bg: '#eef2ff', text: '#3730a3', border: '#c7d2fe' },
};

// Helper to translate owner names
function translateOwner(owner: StepOwner, lang: Language): string {
  const ownerTranslations: Record<StepOwner, { en: string; ja: string }> = {
    'venture': { en: 'venture', ja: 'ベンチャー' },
    'joint': { en: 'joint', ja: '共同' },
    'investor': { en: 'investor', ja: '投資家' }
  };
  return ownerTranslations[owner]?.[lang] || owner;
}

// Helper to translate failure action
function translateFailureAction(action: FailureAction, lang: Language): string {
  const actionTranslations: Record<FailureAction, { en: string; ja: string }> = {
    'pivot': { en: 'Pivot', ja: 'ピボット' },
    'pass': { en: 'Pass', ja: 'パス' },
    'reassess': { en: 'Reassess', ja: '再評価' }
  };
  return actionTranslations[action]?.[lang] || action;
}

// Step detail modal
function StepDetailModal({ step, onClose, language = 'en' }: { step: NextStepV2; onClose: () => void; language?: Language }) {
  const ownerStyle = ownerColors[step.owner];
  const failureStyle = failureColors[step.if_gate_fails.action];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-slate-100 flex items-start justify-between sticky top-0 bg-white z-10">
          <div className="flex items-start gap-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: ownerStyle.bg, color: ownerStyle.text }}
            >
              {step.step_number}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">{step.step_title}</h3>
              <div className="flex items-center gap-2 text-xs mt-1">
                <span className="font-medium capitalize" style={{ color: ownerStyle.text }}>{translateOwner(step.owner, language)}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{step.timeline}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-4">
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('whatToDo', language)}</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{step.description}</p>
          </div>

          {/* Success Gate */}
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">{t('successGate', language)}</h4>
            <p className="text-sm text-emerald-900 font-medium">{step.success_gate}</p>
          </div>

          {/* What it unlocks */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('unlocks', language)}</h4>
            <p className="text-sm text-slate-700">{step.unlocks}</p>
          </div>

          {/* If gate fails */}
          <div 
            className="rounded-lg p-4 border"
            style={{ backgroundColor: failureStyle.bg, borderColor: failureStyle.border }}
          >
            <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: failureStyle.text }}>
              {t('ifGateFails', language)}: {translateFailureAction(step.if_gate_fails.action, language)}
            </h4>
            <p className="text-sm" style={{ color: failureStyle.text }}>{step.if_gate_fails.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Clickable step card
function ClickableStepCard({ step, onClick, language = 'en' }: { step: NextStepV2; onClick: () => void; language?: Language }) {
  const ownerStyle = ownerColors[step.owner];

  return (
    <button 
      onClick={onClick}
      className="step-card h-full w-full text-left flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group overflow-hidden"
    >
      {/* Header Section */}
      <div className="p-4 border-b border-slate-50 flex items-start justify-between gap-3 bg-white">
        <div className="flex items-start gap-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm"
            style={{ backgroundColor: ownerStyle.bg, color: ownerStyle.text }}
          >
            {step.step_number}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-base leading-tight group-hover:text-blue-700 transition-colors">
              {step.step_title}
            </h4>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide bg-slate-100 text-slate-500">
                {step.timeline}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide border" 
                style={{ 
                  backgroundColor: ownerStyle.bg, 
                  color: ownerStyle.text,
                  borderColor: ownerStyle.border 
                }}>
                {translateOwner(step.owner, language)}
              </span>
            </div>
          </div>
        </div>
        <div className="text-slate-300 group-hover:text-blue-500 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col gap-4 bg-slate-50/30">
        <p className="text-sm text-slate-600 leading-relaxed">
          {step.description}
        </p>

        {/* Success Gate - Prominent */}
        <div className="mt-auto bg-emerald-50/50 rounded-lg border border-emerald-100 p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">{t('successGate', language)}</span>
          </div>
          <p className="text-xs font-medium text-emerald-900 leading-snug">
            {step.success_gate}
          </p>
        </div>
      </div>
    </button>
  );
}

export function NextStepsPathway({ steps, metadata, language = 'en' }: NextStepsPathwayProps) {
  const [selectedStep, setSelectedStep] = useState<NextStepV2 | null>(null);

  // Separate Parallel (Start) vs Converged (End) steps
  const parallelSteps = steps.filter(s => !s.depends_on || s.depends_on.length === 0);
  const convergedSteps = steps.filter(s => s.depends_on && s.depends_on.length > 0);

  // Sort converged steps by step number to maintain order
  convergedSteps.sort((a, b) => a.step_number - b.step_number);

  return (
    <>
      <div className="next-steps-section bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header - Simplified */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h2 className="text-base font-bold text-slate-800">{t('nextSteps', language)}</h2>
          </div>
          <div className="flex gap-2">
             {/* Legend */}
             {Object.entries(ownerColors).map(([owner, style]) => (
               <div key={owner} className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: style.bg }}>
                 <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: style.text }}></div>
                 <span className="font-medium capitalize" style={{ color: style.text }}>{translateOwner(owner as StepOwner, language)}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="p-6 bg-slate-50/30">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* PHASE 1: PARALLEL EXECUTION */}
            <div className="phase-section">
              <div className="phase-header mb-4 flex items-center gap-3">
                 <div className="px-2 py-1 bg-slate-100 rounded text-xs font-bold uppercase tracking-wider text-slate-500 border border-slate-200">
                   {t('phase1Validation', language)}
                 </div>
                 <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {parallelSteps.map((step) => (
                  <ClickableStepCard 
                    key={step.step_number} 
                    step={step} 
                    onClick={() => setSelectedStep(step)}
                    language={language}
                  />
                ))}
              </div>
            </div>

            {/* CONVERGENCE INDICATOR */}
            <div className="convergence-indicator flex items-center justify-center py-4">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full border border-slate-200 shadow-sm">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{t('ifAllGatesPass', language)}</span>
              </div>
            </div>

            {/* PHASE 2: EXECUTION / CONVERGED */}
            {convergedSteps.length > 0 && (
              <div className="phase-section">
                <div className="phase-header mb-4 flex items-center gap-3">
                   <div className="px-2 py-1 bg-slate-100 rounded text-xs font-bold uppercase tracking-wider text-slate-500 border border-slate-200">
                     {t('phase2Execution', language)}
                   </div>
                   <div className="h-px bg-slate-200 flex-1"></div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {convergedSteps.map((step) => (
                    <ClickableStepCard 
                      key={step.step_number} 
                      step={step} 
                      onClick={() => setSelectedStep(step)}
                      language={language}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Step Detail Modal */}
      {selectedStep && (
        <StepDetailModal 
          step={selectedStep} 
          onClose={() => setSelectedStep(null)}
          language={language}
        />
      )}
    </>
  );
}
