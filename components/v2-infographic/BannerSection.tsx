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
        return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', ring: 'ring-emerald-500/20' };
      case 'Medium-High':
        return { bg: 'bg-lime-500/10', text: 'text-lime-400', border: 'border-lime-500/30', ring: 'ring-lime-500/20' };
      case 'Medium':
        return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', ring: 'ring-amber-500/20' };
      case 'Medium-Low':
        return { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30', ring: 'ring-orange-500/20' };
      case 'Low':
        return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', ring: 'ring-red-500/20' };
      default:
        return { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30', ring: 'ring-slate-500/20' };
    }
  };

  // Extract decision keyword from answer
  const getDecisionFromAnswer = (answer: string) => {
    const firstWord = answer.split(' ')[0].toLowerCase();
    if (firstWord.includes('conditional')) return { word: 'Conditional Go', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' };
    if (firstWord.includes('yes') || firstWord.includes('proceed') || firstWord.includes('go')) return { word: 'Go', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
    if (firstWord.includes('no') || firstWord.includes('pass')) return { word: 'No Go', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
    return { word: 'Conditional', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' };
  };

  const confidenceStyle = getConfidenceColor(questionAndAnswer.confidence.rating);
  const decision = getDecisionFromAnswer(questionAndAnswer.the_answer);

  // Helper to clean the answer text
  const cleanAnswerText = (text: string) => {
    // 1. Remove the decision prefix (Conditional Go, Yes, etc.)
    let cleaned = text.replace(/^(Conditional Go|Conditional|Yes|No|Proceed|Pass)/i, '').trim();
    
    // 2. Remove "Option X" patterns, including parentheses
    // Matches: "(Option 2)", "Option 2)", "Option 2 -", "(Option 2) -", etc.
    cleaned = cleaned.replace(/^[\s-–]*\(?Option\s*\d+\)?[\s-–]*/i, '').trim();
    
    return cleaned;
  };

  const displayAnswer = cleanAnswerText(questionAndAnswer.the_answer) || questionAndAnswer.the_answer;

  return (
    <div className="bg-slate-900 text-white font-sans">
      {/* Top Banner - Cleaned Up Layout */}
      <div className="px-8 pt-10 pb-8 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          
          {/* Title Block */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
              {identification.project_name}
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
              {identification.one_liner}
            </p>
          </div>

          {/* Structured Metadata Grid - Replaces the messy tags */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-slate-800">
            
            {/* Stage */}
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1.5 rounded bg-blue-500/10 text-blue-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-0.5">Current Stage</p>
                <p className="text-sm font-medium text-slate-200">{identification.stage}</p>
              </div>
            </div>

            {/* Sector */}
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1.5 rounded bg-purple-500/10 text-purple-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-0.5">Sector</p>
                <p className="text-sm font-medium text-slate-200">{identification.sector}</p>
              </div>
            </div>

            {/* Geography */}
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1.5 rounded bg-emerald-500/10 text-emerald-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-0.5">Geography</p>
                <p className="text-sm font-medium text-slate-200">{identification.geography}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1.5 rounded bg-slate-700/30 text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-0.5">Report Date</p>
                <p className="text-sm font-medium text-slate-200">
                  {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-8 pb-12 space-y-10">
        
        {/* The Big Question */}
        <div className="text-center max-w-4xl mx-auto pt-4">
          <h2 className="text-2xl lg:text-3xl font-semibold text-white leading-tight">
            {questionAndAnswer.the_question}
          </h2>
        </div>

        {/* The Verdict Box */}
        <div className="max-w-5xl mx-auto bg-slate-800/40 rounded-2xl border border-slate-700 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-slate-700 to-slate-800"></div>
          
          <div className="flex flex-col md:flex-row">
            {/* Left: The Decision */}
            <div className="flex-1 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-700/50">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                The Verdict
              </span>
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-1.5 self-stretch rounded-full ${decision.bg.replace('/10', '')}`}></div>
                <div>
                  <h3 className={`text-4xl font-bold mb-2 ${decision.color}`}>
                    {decision.word}
                  </h3>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    {displayAnswer}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Confidence Score */}
            <div className="md:w-72 p-8 bg-slate-800/60 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
                Confidence Level
              </span>
              <div className={`relative flex items-center justify-center w-28 h-28 rounded-full border-[6px] ${confidenceStyle.border} ${confidenceStyle.bg} mb-3`}>
                <div className="text-center">
                  <span className={`text-3xl font-bold ${confidenceStyle.text}`}>
                    {questionAndAnswer.confidence.percentage ? `${questionAndAnswer.confidence.percentage}%` : ''}
                  </span>
                </div>
                {!questionAndAnswer.confidence.percentage && (
                   <svg className={`w-12 h-12 ${confidenceStyle.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                )}
              </div>
              <span className={`text-sm font-bold tracking-wide ${confidenceStyle.text}`}>
                {questionAndAnswer.confidence.rating}
              </span>
            </div>
          </div>
        </div>

        {/* Thesis Cards - The "Why" */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* The Prize */}
          <div className="group relative bg-slate-800/30 rounded-xl p-6 border border-amber-500/20 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-900/10">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500/40 to-transparent rounded-t-xl"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <span className="text-sm font-bold uppercase tracking-wider text-amber-400">
                The Prize
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm">
              {thesis.the_prize}
            </p>
          </div>

          {/* The Risk */}
          <div className="group relative bg-slate-800/30 rounded-xl p-6 border border-red-500/20 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/10">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/40 to-transparent rounded-t-xl"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <span className="text-sm font-bold uppercase tracking-wider text-red-400">
                The Risk
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm">
              {thesis.the_risk}
            </p>
          </div>

          {/* The Unlock */}
          <div className="group relative bg-slate-800/30 rounded-xl p-6 border border-emerald-500/20 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/10">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/40 to-transparent rounded-t-xl"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <span className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                The Unlock
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm">
              {thesis.the_unlock}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
