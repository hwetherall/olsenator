'use client';

import { Identification, QuestionAndAnswer, Thesis } from '@/lib/v2-schema';

interface BannerSectionProps {
  identification: Identification;
  questionAndAnswer: QuestionAndAnswer;
  thesis: Thesis;
}

export function BannerSection({ identification, questionAndAnswer, thesis }: BannerSectionProps) {
  // Determine confidence color
  const getConfidenceColor = (rating: string) => {
    switch (rating) {
      case 'High':
        return { bg: '#dcfce7', text: '#166534', border: '#22c55e' };
      case 'Medium-High':
        return { bg: '#ecfccb', text: '#3f6212', border: '#84cc16' };
      case 'Medium':
        return { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' };
      case 'Medium-Low':
        return { bg: '#fed7aa', text: '#9a3412', border: '#f97316' };
      case 'Low':
        return { bg: '#fecaca', text: '#991b1b', border: '#ef4444' };
      default:
        return { bg: '#f1f5f9', text: '#475569', border: '#94a3b8' };
    }
  };

  // Extract decision keyword from answer
  const getDecisionFromAnswer = (answer: string) => {
    const firstWord = answer.split(' ')[0].toLowerCase();
    if (firstWord.includes('conditional')) return { word: 'Conditional', color: '#f59e0b' };
    if (firstWord.includes('yes') || firstWord.includes('proceed') || firstWord.includes('go')) return { word: 'Yes', color: '#22c55e' };
    if (firstWord.includes('no') || firstWord.includes('pass')) return { word: 'No', color: '#ef4444' };
    return { word: 'Conditional', color: '#f59e0b' };
  };

  const confidenceStyle = getConfidenceColor(questionAndAnswer.confidence.rating);
  const decision = getDecisionFromAnswer(questionAndAnswer.the_answer);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Top Banner - Identification Strip */}
      <div className="px-8 py-6 border-b border-slate-700/50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Project Name & One-liner */}
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">
              {identification.project_name}
            </h1>
            <p className="text-slate-300 text-sm lg:text-base max-w-2xl">
              {identification.one_liner}
            </p>
          </div>
          
          {/* Metadata Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {identification.stage}
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {identification.sector}
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {identification.geography}
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30">
              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {/* Question & Answer Block */}
      <div className="px-8 py-8">
        <div className="max-w-4xl">
          {/* The Question */}
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">
              The Question
            </span>
            <h2 className="text-xl lg:text-2xl font-semibold text-white leading-tight">
              {questionAndAnswer.the_question}
            </h2>
          </div>

          {/* The Answer */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-4">
            <div className="flex-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">
                The Answer
              </span>
              <div className="flex items-start gap-3">
                {/* Decision Badge */}
                <span 
                  className="flex-shrink-0 px-3 py-1 rounded-md text-sm font-bold"
                  style={{ 
                    backgroundColor: `${decision.color}20`,
                    color: decision.color,
                    border: `1px solid ${decision.color}40`
                  }}
                >
                  {decision.word}
                </span>
                <p className="text-base lg:text-lg text-slate-200 leading-relaxed">
                  {questionAndAnswer.the_answer}
                </p>
              </div>
            </div>

            {/* Confidence Indicator */}
            <div 
              className="flex-shrink-0 px-4 py-3 rounded-lg text-center min-w-[120px]"
              style={{ 
                backgroundColor: `${confidenceStyle.border}15`,
                border: `1px solid ${confidenceStyle.border}40`
              }}
            >
              <span className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: confidenceStyle.border }}>
                Confidence
              </span>
              <span className="text-lg font-bold block" style={{ color: confidenceStyle.border }}>
                {questionAndAnswer.confidence.rating}
              </span>
              {questionAndAnswer.confidence.percentage && (
                <span className="text-sm" style={{ color: confidenceStyle.border }}>
                  {questionAndAnswer.confidence.percentage}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Thesis Row - Three Cards */}
      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* The Prize */}
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                The Prize
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {thesis.the_prize}
            </p>
          </div>

          {/* The Risk */}
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                The Risk
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {thesis.the_risk}
            </p>
          </div>

          {/* The Unlock */}
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z" />
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                The Unlock
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {thesis.the_unlock}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
