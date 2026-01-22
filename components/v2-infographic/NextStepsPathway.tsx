'use client';

import { NextStepV2, PathwayMetadata, StepOwner, FailureAction } from '@/lib/v2-schema';

interface NextStepsPathwayProps {
  steps: NextStepV2[];
  metadata: PathwayMetadata;
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

function CompactStepCard({ step }: { step: NextStepV2 }) {
  const ownerStyle = ownerColors[step.owner];
  const failureStyle = failureColors[step.if_gate_fails.action];

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border-2 shadow-sm hover:shadow-md transition-shadow relative group"
      style={{ borderColor: ownerStyle.border }}>
      
      {/* Header: Number & Title */}
      <div className="p-4 pb-3 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
        <div className="flex items-start gap-3">
          <div 
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm"
            style={{ backgroundColor: ownerStyle.bg, color: ownerStyle.text, boxShadow: `0 0 0 1px ${ownerStyle.border}` }}
          >
            {step.step_number}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-slate-800 text-sm leading-tight mb-1">{step.step_title}</h4>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium capitalize" style={{ color: ownerStyle.text }}>{step.owner}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">{step.timeline}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body: Action & Gate */}
      <div className="p-4 flex-1 flex flex-col gap-4">
        <p className="text-xs text-slate-600 leading-relaxed">
          {step.description}
        </p>

        <div className="mt-auto space-y-3">
          {/* Success Gate */}
          <div className="bg-emerald-50/50 rounded-lg p-2.5 border border-emerald-100">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Success Gate</span>
            </div>
            <p className="text-xs text-emerald-900 font-medium leading-snug">{step.success_gate}</p>
          </div>

          {/* Failure Action */}
          <div className="flex items-center gap-2 text-xs">
             <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">If Fail:</span>
             <span 
               className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
               style={{ backgroundColor: failureStyle.bg, color: failureStyle.text, borderColor: failureStyle.border }}
             >
               {step.if_gate_fails.action}
             </span>
             <span className="text-slate-500 truncate" title={step.if_gate_fails.detail}>
               {step.if_gate_fails.detail}
             </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NextStepsPathway({ steps, metadata }: NextStepsPathwayProps) {
  // 1. Separate Parallel (Start) vs Converged (End) steps
  // Assumption: Steps with NO dependencies are "Phase 1" (Parallel)
  // Steps WITH dependencies are "Phase 2" (Converged)
  const parallelSteps = steps.filter(s => !s.depends_on || s.depends_on.length === 0);
  const convergedSteps = steps.filter(s => s.depends_on && s.depends_on.length > 0);

  // Sort converged steps by step number to maintain order
  convergedSteps.sort((a, b) => a.step_number - b.step_number);

  const confidenceColor = (conf: string) => {
    switch (conf.toLowerCase()) {
      case 'high': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            Decision Pathway
            <span className={`text-xs px-2 py-0.5 rounded-full border ${confidenceColor(metadata.pathway_confidence)}`}>
              {metadata.pathway_confidence} Confidence
            </span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Critical Path: <span className="font-semibold text-slate-700">{metadata.critical_path_duration}</span> • {metadata.total_steps} Steps
          </p>
        </div>
        <div className="flex gap-2">
           {/* Legend */}
           {Object.entries(ownerColors).map(([owner, style]) => (
             <div key={owner} className="flex items-center gap-1.5 px-2 py-1 rounded border bg-white" style={{ borderColor: style.border }}>
               <div className="w-2 h-2 rounded-full" style={{ backgroundColor: style.text }}></div>
               <span className="text-xs font-medium capitalize text-slate-600">{owner}</span>
             </div>
           ))}
        </div>
      </div>

      <div className="p-8 bg-slate-50/30">
        <div className="max-w-5xl mx-auto">
          
          {/* PHASE 1: PARALLEL EXECUTION */}
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-slate-200 rounded-full hidden md:block"></div>
            <div className="mb-4 flex items-center gap-2">
               <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Phase 1: Validation (Parallel)</span>
               <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {parallelSteps.map((step) => (
                <div key={step.step_number} className="relative">
                  <CompactStepCard step={step} />
                  {/* Connector Line Down (Desktop) */}
                  <div className="hidden md:block absolute left-1/2 -bottom-8 w-0.5 h-8 bg-slate-300 -ml-px z-0"></div>
                </div>
              ))}
            </div>
          </div>

          {/* CONVERGENCE POINT */}
          <div className="relative py-8 hidden md:flex justify-center items-center">
             {/* Horizontal Connector Bar */}
             <div className="absolute top-0 left-[16.66%] right-[16.66%] h-0.5 bg-slate-300"></div>
             {/* Vertical Connector to Next Phase */}
             <div className="h-8 w-0.5 bg-slate-300 absolute top-0"></div>
             
             <div className="bg-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-slate-300 relative z-10">
               If All Gates Pass
             </div>
             
             <div className="h-8 w-0.5 bg-slate-300 absolute bottom-0"></div>
          </div>

          {/* PHASE 2: EXECUTION / CONVERGED */}
          <div className="relative mt-8 md:mt-0">
             <div className="mb-4 flex items-center gap-2">
               <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Phase 2: Execution</span>
               <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            <div className="flex flex-col items-center gap-8">
              {convergedSteps.map((step, idx) => (
                <div key={step.step_number} className="w-full max-w-2xl relative">
                  <CompactStepCard step={step} />
                  {/* Connector to next item or final decision */}
                  <div className="absolute left-1/2 -bottom-8 w-0.5 h-8 bg-slate-300 -ml-px"></div>
                </div>
              ))}

              {/* ULTIMATE DECISION */}
              <div className="w-full max-w-2xl mt-4">
                <div className="bg-slate-900 rounded-xl p-1 shadow-lg">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700/50 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    
                    <div className="flex items-center gap-5 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-900/50 flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                          Ultimate Decision Unlock
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {metadata.ultimate_decision}
                        </h3>
                        <p className="text-slate-400 text-sm">
                          Completing all validation steps unlocks the full investment budget.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
