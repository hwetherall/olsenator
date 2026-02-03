'use client';

import Image from 'next/image';

import logo from '@/components/logo.jpg';
import { Identification, QuestionAndAnswer, Thesis, Synthesis } from '@/lib/v2-schema';
import { Language, t, formatDate } from '@/lib/v2-translations';

interface BannerSectionProps {
  identification: Identification;
  questionAndAnswer: QuestionAndAnswer;
  thesis: Thesis;
  synthesis?: Synthesis;
  language?: Language;
}

export function BannerSection({ identification, questionAndAnswer, thesis, synthesis, language = 'en' }: BannerSectionProps) {
  // Extract decision styling and verdict title from synthesis data
  const getDecisionFromAnswer = (answer: string, lang: Language) => {
    const lowerAnswer = answer.toLowerCase();
    // Get the verdict title from synthesis if available, otherwise fall back to decision type
    const verdictTitle = synthesis?.final_verdict?.verdict_title;
    
    // Check for Japanese patterns first
    if (answer.includes('条件付き') || lowerAnswer.includes('conditional')) {
      return { 
        word: verdictTitle || t('conditional', lang), 
        color: 'text-amber-400', 
        bg: 'bg-amber-500/10', 
        border: 'border-amber-500/30' 
      };
    }
    if (lowerAnswer.includes('yes') || lowerAnswer.includes('proceed') || lowerAnswer.includes('go') || answer.includes('はい')) {
      return { 
        word: verdictTitle || t('go', lang), 
        color: 'text-emerald-400', 
        bg: 'bg-emerald-500/10', 
        border: 'border-emerald-500/30' 
      };
    }
    if (lowerAnswer.includes('no') || lowerAnswer.includes('pass') || answer.includes('いいえ')) {
      return { 
        word: verdictTitle || t('noGo', lang), 
        color: 'text-red-400', 
        bg: 'bg-red-500/10', 
        border: 'border-red-500/30' 
      };
    }
    return { 
      word: verdictTitle || t('conditional', lang), 
      color: 'text-amber-400', 
      bg: 'bg-amber-500/10', 
      border: 'border-amber-500/30' 
    };
  };

  const decision = getDecisionFromAnswer(questionAndAnswer.the_answer, language);

  // Helper to clean the answer text
  const cleanAnswerText = (text: string) => {
    // 1. Remove the decision prefix (Conditional Go, Yes, etc.) - English and Japanese
    let cleaned = text.replace(/^(Conditional Go|Conditional|Yes|No|Proceed|Pass|条件付きGo|条件付き)/i, '').trim();
    
    // 2. Remove "Option X" patterns, including parentheses - English and Japanese
    // Matches: "(Option 2)", "Option 2)", "Option 2 -", "(Option 2) -", "(オプション2)", etc.
    cleaned = cleaned.replace(/^[\s-–]*\(?(Option|オプション)\s*\d+\)?[\s-–]*/i, '').trim();
    
    return cleaned;
  };

  const displayAnswer = cleanAnswerText(questionAndAnswer.the_answer) || questionAndAnswer.the_answer;

  return (
    <div className="bg-slate-900 text-white font-sans">
      {/* Top Banner - Tighter Layout */}
      <div className="px-6 pt-6 pb-5 bg-slate-900">
        <div className="max-w-5xl mx-auto relative">
          <div className="absolute top-0 right-0">
            <Image
              src={logo}
              alt="Company logo"
              className="h-24 w-24 md:h-28 md:w-28 object-contain"
              priority
            />
          </div>
          
          {/* Title Block */}
          <div className="mb-5 pr-24 md:pr-28">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white mb-2 leading-tight">
              {identification.project_name}
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
              {identification.one_liner}
            </p>
          </div>

          {/* Structured Metadata Grid - Compact */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4 border-y border-slate-800">
            
            {/* Stage */}
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-blue-500/10 text-blue-400">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{t('stage', language)}</p>
                <p className="text-xs font-medium text-slate-200">{identification.stage}</p>
              </div>
            </div>

            {/* Sector */}
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-purple-500/10 text-purple-400">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{t('sector', language)}</p>
                <p className="text-xs font-medium text-slate-200">{identification.sector}</p>
              </div>
            </div>

            {/* Geography */}
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-emerald-500/10 text-emerald-400">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{t('geography', language)}</p>
                <p className="text-xs font-medium text-slate-200">{identification.geography}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-slate-700/30 text-slate-400">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{t('date', language)}</p>
                <p className="text-xs font-medium text-slate-200">
                  {formatDate(new Date(), language)}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-6 pb-8 space-y-6">
        
        {/* The Big Question */}
        <div className="text-center max-w-4xl mx-auto pt-2">
          <h2 className="text-lg lg:text-xl font-semibold text-white leading-tight">
            {questionAndAnswer.the_question}
          </h2>
        </div>

        {/* The Verdict Box - Full Width, No Confidence */}
        <div className="max-w-5xl mx-auto bg-slate-800/40 rounded-xl border border-slate-700 overflow-hidden relative shadow-lg">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-slate-700 to-slate-800"></div>
          
          <div className="p-6 flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
              {t('theVerdict', language)}
            </span>
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-1 self-stretch rounded-full ${decision.bg.replace('/10', '')}`}></div>
              <div>
                <h3 className={`text-2xl font-bold mb-1 ${decision.color}`}>
                  {decision.word}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {displayAnswer}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Thesis Cards - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {/* The Prize */}
          <div className="group relative bg-slate-800/30 rounded-lg p-4 border border-amber-500/20 hover:bg-slate-800/50 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500/40 to-transparent rounded-t-lg"></div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {t('thePrize', language)}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              {thesis.the_prize}
            </p>
          </div>

          {/* The Risk */}
          <div className="group relative bg-slate-800/30 rounded-lg p-4 border border-red-500/20 hover:bg-slate-800/50 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500/40 to-transparent rounded-t-lg"></div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-red-500/10 text-red-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                {t('theRisk', language)}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              {thesis.the_risk}
            </p>
          </div>

          {/* The Unlock */}
          <div className="group relative bg-slate-800/30 rounded-lg p-4 border border-emerald-500/20 hover:bg-slate-800/50 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500/40 to-transparent rounded-t-lg"></div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {t('theUnlock', language)}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              {thesis.the_unlock}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
