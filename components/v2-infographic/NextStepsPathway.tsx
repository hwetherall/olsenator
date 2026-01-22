'use client';

import { useState } from 'react';
import { NextStepV2, PathwayMetadata, StepOwner, FailureAction } from '@/lib/v2-schema';

interface NextStepsPathwayProps {
  steps: NextStepV2[];
  metadata: PathwayMetadata;
}

// Owner badge colors
const ownerColors: Record<StepOwner, { bg: string; text: string; border: string }> = {
  'venture': { bg: '#dbeafe', text: '#1e40af', border: '#3b82f6' },
  'joint': { bg: '#fae8ff', text: '#86198f', border: '#d946ef' },
  'investor': { bg: '#dcfce7', text: '#166534', border: '#22c55e' },
};

// Failure action colors
const failureColors: Record<FailureAction, { bg: string; text: string }> = {
  'pivot': { bg: '#fef3c7', text: '#92400e' },
  'pass': { bg: '#fecaca', text: '#991b1b' },
  'reassess': { bg: '#e0e7ff', text: '#3730a3' },
};

interface StepCardProps {
  step: NextStepV2;
  isExpanded: boolean;
  onToggle: () => void;
  isFirst: boolean;
  isLast: boolean;
  parallelSteps: number[];
}

function StepCard({ step, isExpanded, onToggle, isFirst, isLast, parallelSteps }: StepCardProps) {
  const ownerStyle = ownerColors[step.owner];
  const failureStyle = failureColors[step.if_gate_fails.action];

  return (
    <div className="relative">
      {/* Connection Line */}
      {!isFirst && (
        <div className="absolute -top-4 left-6 w-0.5 h-4 bg-slate-300" />
      )}

      {/* Step Card */}
      <div 
        className={`
          relative bg-white rounded-xl border-2 overflow-hidden transition-all duration-200
          ${isExpanded ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}
        `}
        style={{ borderColor: ownerStyle.border }}
      >
        {/* Header */}
        <button 
          onClick={onToggle}
          className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-50 transition-colors"
        >
          {/* Step Number */}
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ backgroundColor: ownerStyle.bg, color: ownerStyle.text }}
          >
            {step.step_number}
          </div>

          {/* Title & Owner */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-slate-800 truncate">{step.step_title}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span 
                className="px-2 py-0.5 rounded text-xs font-medium capitalize"
                style={{ backgroundColor: ownerStyle.bg, color: ownerStyle.text }}
              >
                {step.owner}
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-medium text-slate-600">{step.timeline}</span>
            </div>
          </div>

          {/* Expand Icon */}
          <svg 
            className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-4 pb-4 pt-2 border-t border-slate-100">
            {/* Description */}
            <p className="text-sm text-slate-600 mb-4">{step.description}</p>

            {/* Dependencies */}
            {step.depends_on && step.depends_on.length > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                <span className="text-xs text-slate-500">
                  Depends on: Steps {step.depends_on.join(', ')}
                </span>
              </div>
            )}

            {/* Success Gate */}
            <div className="bg-green-50 rounded-lg p-3 mb-3 border border-green-200">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span className="text-xs font-semibold text-green-700 uppercase tracking-wider block mb-1">
                    Success Gate
                  </span>
                  <p className="text-sm text-green-800">{step.success_gate}</p>
                </div>
              </div>
            </div>

            {/* Fork Visualization */}
            <div className="grid grid-cols-2 gap-3">
              {/* Success Path */}
              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                    If Success
                  </span>
                </div>
                <p className="text-xs text-emerald-800">{step.unlocks}</p>
              </div>

              {/* Failure Path */}
              <div 
                className="rounded-lg p-3 border"
                style={{ backgroundColor: `${failureStyle.bg}50`, borderColor: failureStyle.bg }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4" style={{ color: failureStyle.text }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span 
                    className="text-xs font-semibold uppercase tracking-wider capitalize"
                    style={{ color: failureStyle.text }}
                  >
                    If Fail → {step.if_gate_fails.action}
                  </span>
                </div>
                <p className="text-xs" style={{ color: failureStyle.text }}>{step.if_gate_fails.detail}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Parallel indicator */}
      {parallelSteps.length > 0 && (
        <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-xs text-slate-400 whitespace-nowrap">
          ‖ Parallel with {parallelSteps.join(', ')}
        </div>
      )}

      {/* Connection to next */}
      {!isLast && (
        <div className="absolute -bottom-4 left-6 w-0.5 h-4 bg-slate-300" />
      )}
    </div>
  );
}

export function NextStepsPathway({ steps, metadata }: NextStepsPathwayProps) {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([1]); // First step expanded by default

  const toggleStep = (stepNum: number) => {
    setExpandedSteps(prev => 
      prev.includes(stepNum) 
        ? prev.filter(n => n !== stepNum)
        : [...prev, stepNum]
    );
  };

  // Find parallel steps (those without dependencies that can run together)
  const getParallelSteps = (step: NextStepV2): number[] => {
    if (step.depends_on && step.depends_on.length > 0) return [];
    return steps
      .filter(s => 
        s.step_number !== step.step_number && 
        (!s.depends_on || s.depends_on.length === 0)
      )
      .map(s => s.step_number);
  };

  // Get confidence color
  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High': return { bg: '#dcfce7', text: '#166534', border: '#22c55e' };
      case 'Medium': return { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' };
      case 'Low': return { bg: '#fecaca', text: '#991b1b', border: '#ef4444' };
      default: return { bg: '#f1f5f9', text: '#475569', border: '#94a3b8' };
    }
  };

  const confidenceStyle = getConfidenceColor(metadata.pathway_confidence);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Section Header */}
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Decision Pathway</h2>
            <p className="text-sm text-slate-500 mt-1">Validation steps with clear success gates and off-ramps</p>
          </div>

          {/* Critical Path Duration */}
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Critical Path
            </span>
            <span className="text-lg font-bold text-slate-800">{metadata.critical_path_duration}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Pathway Metadata */}
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Total Steps:</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-sm font-semibold text-slate-700">
              {metadata.total_steps}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Confidence:</span>
            <span 
              className="px-2 py-0.5 rounded text-sm font-semibold"
              style={{ backgroundColor: confidenceStyle.bg, color: confidenceStyle.text }}
            >
              {metadata.pathway_confidence}
            </span>
          </div>
        </div>

        {/* Steps Timeline */}
        <div className="relative space-y-4 ml-8 mb-6">
          {steps.map((step, index) => (
            <StepCard
              key={step.step_number}
              step={step}
              isExpanded={expandedSteps.includes(step.step_number)}
              onToggle={() => toggleStep(step.step_number)}
              isFirst={index === 0}
              isLast={index === steps.length - 1}
              parallelSteps={getParallelSteps(step)}
            />
          ))}
        </div>

        {/* Ultimate Decision Node */}
        <div className="relative mt-8">
          {/* Connection line */}
          <div className="absolute -top-8 left-14 w-0.5 h-8 bg-slate-300" />
          
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                  Ultimate Decision
                </span>
                <h3 className="text-lg font-bold">{metadata.ultimate_decision}</h3>
              </div>
            </div>
            <p className="text-sm text-white/70">
              Completing all validation steps will unlock this final investment decision.
            </p>
          </div>
        </div>

        {/* Owner Legend */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">
            Step Ownership
          </span>
          <div className="flex flex-wrap gap-3">
            {(Object.entries(ownerColors) as [StepOwner, typeof ownerColors[StepOwner]][]).map(([owner, colors]) => (
              <div key={owner} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors.border }}
                />
                <span className="text-xs text-slate-600 capitalize">{owner}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Print-friendly version */}
      <div className="hidden print:block p-6 border-t border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">All Steps</h3>
        <div className="space-y-4">
          {steps.map((step) => {
            const ownerStyle = ownerColors[step.owner];
            return (
              <div key={step.step_number} className="p-4 rounded-lg border" style={{ borderColor: ownerStyle.border }}>
                <div className="flex items-center gap-2 mb-2">
                  <span 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: ownerStyle.bg, color: ownerStyle.text }}
                  >
                    {step.step_number}
                  </span>
                  <span className="font-semibold text-slate-800">{step.step_title}</span>
                  <span className="text-xs px-2 py-0.5 rounded capitalize" style={{ backgroundColor: ownerStyle.bg, color: ownerStyle.text }}>
                    {step.owner}
                  </span>
                  <span className="text-xs text-slate-500">{step.timeline}</span>
                </div>
                <p className="text-xs text-slate-600 mb-2">{step.description}</p>
                <p className="text-xs text-green-700"><strong>Success:</strong> {step.success_gate}</p>
                <p className="text-xs text-red-700"><strong>If Fail:</strong> {step.if_gate_fails.action} - {step.if_gate_fails.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
