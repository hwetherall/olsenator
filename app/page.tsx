'use client';

import { useState, useRef } from 'react';
import { MemoInput } from '@/components/MemoInput';
import { JsonOutput } from '@/components/JsonOutput';
import { InfographicContainer } from '@/components/infographic';
import { QAInfographicContainer } from '@/components/qa-infographic';
import { ExtractionResult, KajimaExtractionResult } from '@/lib/schema';
import { QAExtractionResult } from '@/lib/qa-schema';
import { removeTeamReferences } from '@/lib/kajima-transform';
import { PREFILL_TEXT } from '@/lib/prefill';
import { QA_PREFILL_TEXT } from '@/lib/qa-prefill';

type AppMode = 'memo' | 'qa';

interface ApiResponse {
  success: boolean;
  data?: ExtractionResult;
  error?: string;
  duration?: number;
  retried?: boolean;
}

interface QAApiResponse {
  success: boolean;
  data?: QAExtractionResult;
  error?: string;
  duration?: number;
  retried?: boolean;
}

export default function Home() {
  // Mode state
  const [mode, setMode] = useState<AppMode>('memo');
  
  // Input state
  const [memo, setMemo] = useState('');
  const [qaContent, setQaContent] = useState('');
  
  // Memo extraction state
  const [extractedData, setExtractedData] = useState<ExtractionResult | null>(null);
  const [displayData, setDisplayData] = useState<ExtractionResult | KajimaExtractionResult | null>(null);
  
  // QA extraction state
  const [qaData, setQaData] = useState<QAExtractionResult | null>(null);
  
  // Common state
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState<number | undefined>();
  const [retried, setRetried] = useState<boolean | undefined>();
  
  // Stage 2 State
  const [showInfographic, setShowInfographic] = useState(false);
  const [kajimaEnabled, setKajimaEnabled] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const infographicRef = useRef<HTMLDivElement>(null);

  const handleModeChange = (newMode: AppMode) => {
    setMode(newMode);
    // Reset all state when switching modes
    setError(null);
    setShowInfographic(false);
    setExtractedData(null);
    setDisplayData(null);
    setQaData(null);
    setDuration(undefined);
    setRetried(undefined);
  };

  const handleExtract = async () => {
    if (mode === 'memo') {
      await handleMemoExtract();
    } else {
      await handleQAExtract();
    }
  };

  const handleMemoExtract = async () => {
    if (memo.trim().length < 100) {
      setError('Please paste a complete investment memo (minimum 100 characters).');
      return;
    }

    setIsLoading(true);
    setError(null);
    setExtractedData(null);
    setDisplayData(null);
    setDuration(undefined);
    setRetried(undefined);
    setShowInfographic(false);

    const startTime = Date.now();

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memo }),
      });

      const result: ApiResponse = await response.json();

      if (!result.success || !result.data) {
        setError(result.error || 'Unknown error occurred');
        setRetried(result.retried);
        setIsLoading(false);
        return;
      }

      let finalData: ExtractionResult | KajimaExtractionResult = result.data;
      setRetried(result.retried);

      if (kajimaEnabled) {
        setIsLoading(false);
        setIsTranslating(true);

        const dataWithoutTeam = removeTeamReferences(result.data);

        try {
          const translateResponse = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: dataWithoutTeam }),
          });
          const translateResult = await translateResponse.json();
          
          if (translateResult.success && translateResult.data) {
            finalData = translateResult.data;
          } else {
            console.error('Translation failed:', translateResult.error);
            finalData = dataWithoutTeam;
          }
        } catch (err) {
          console.error('Failed to translate:', err);
          finalData = dataWithoutTeam;
        }
      }

      const totalDuration = Date.now() - startTime;
      setExtractedData(result.data);
      setDisplayData(finalData);
      setDuration(totalDuration);

    } catch (err) {
      setError(
        err instanceof Error 
          ? `Network error: ${err.message}` 
          : 'Failed to connect to the server'
      );
    } finally {
      setIsLoading(false);
      setIsTranslating(false);
    }
  };

  const handleQAExtract = async () => {
    if (qaContent.trim().length < 100) {
      setError('Please paste the Q&A document (minimum 100 characters).');
      return;
    }

    setIsLoading(true);
    setError(null);
    setQaData(null);
    setDuration(undefined);
    setRetried(undefined);
    setShowInfographic(false);

    const startTime = Date.now();

    try {
      const response = await fetch('/api/extract-qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: qaContent }),
      });

      const result: QAApiResponse = await response.json();

      if (!result.success || !result.data) {
        setError(result.error || 'Unknown error occurred');
        setRetried(result.retried);
        setIsLoading(false);
        return;
      }

      const totalDuration = Date.now() - startTime;
      setQaData(result.data);
      setDuration(totalDuration);
      setRetried(result.retried);

    } catch (err) {
      setError(
        err instanceof Error 
          ? `Network error: ${err.message}` 
          : 'Failed to connect to the server'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    if (mode === 'memo') {
      setMemo('');
      setExtractedData(null);
      setDisplayData(null);
      setKajimaEnabled(false);
    } else {
      setQaContent('');
      setQaData(null);
    }
    setError(null);
    setDuration(undefined);
    setRetried(undefined);
    setShowInfographic(false);
  };

  const handlePrefill = () => {
    if (mode === 'memo') {
      setMemo(PREFILL_TEXT);
    } else {
      setQaContent(QA_PREFILL_TEXT);
    }
  };

  const handleGenerateInfographic = async () => {
    setShowInfographic(true);

    setTimeout(() => {
      infographicRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCopyHtml = () => {
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const currentContent = mode === 'memo' ? memo : qaContent;
  const setCurrentContent = mode === 'memo' ? setMemo : setQaContent;
  const hasData = mode === 'memo' ? !!displayData : !!qaData;
  const currentData = mode === 'memo' ? displayData : qaData;

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header - Innovera Style */}
      <header className="no-print">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-light tracking-[0.2em] text-[var(--foreground)]">
                INNOV<span className="text-[var(--accent)]">E</span>RA
              </span>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              <span className="text-sm font-medium tracking-wider text-[var(--foreground)] cursor-default">
                THE OLSENATOR
              </span>
              <a 
                href="https://innovera.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium tracking-wider text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                INNOVERA.AI
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Mode Toggle */}
      <div className="max-w-7xl mx-auto px-8 no-print">
        <div className="flex items-center justify-center mb-8">
          <div 
            className="inline-flex items-center p-1 rounded-full"
            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <button
              onClick={() => handleModeChange('memo')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                mode === 'memo'
                  ? 'bg-[var(--accent)] text-white shadow-md'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Investment Memo
              </span>
            </button>
            <button
              onClick={() => handleModeChange('qa')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                mode === 'qa'
                  ? 'bg-[var(--accent)] text-white shadow-md'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Q&A Response
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      {!hasData && !error && !isLoading && (
        <div className="max-w-4xl mx-auto px-8 py-16 text-center no-print">
          {mode === 'memo' ? (
            <>
              <h2 className="text-4xl md:text-5xl font-light text-[var(--foreground)] leading-tight mb-8">
                Transform your investment memo into{' '}
                <span className="text-[var(--accent)] font-normal">visual insights</span>
              </h2>
              <p className="text-lg text-[var(--muted)] mb-12 max-w-2xl mx-auto">
                Paste your investment memo below and let The Olsenator extract structured data 
                and generate beautiful infographics for executive review.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-4xl md:text-5xl font-light text-[var(--foreground)] leading-tight mb-8">
                Transform Q&A documents into{' '}
                <span className="text-[var(--accent)] font-normal">visual clarity</span>
              </h2>
              <p className="text-lg text-[var(--muted)] mb-12 max-w-2xl mx-auto">
                Paste your client Q&A response and let The Olsenator create category-based 
                infographics highlighting confidence levels, gaps, and next steps.
              </p>
            </>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8 no-print">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column - Input */}
          <div className="space-y-5">
            <MemoInput
              value={currentContent}
              onChange={setCurrentContent}
              disabled={isLoading || isTranslating}
              onPrefill={handlePrefill}
              placeholder={mode === 'memo' 
                ? 'Paste your investment memo here...' 
                : 'Paste your Q&A response document here...'
              }
              label={mode === 'memo' ? 'Investment Memo' : 'Q&A Document'}
            />
            
            {/* Japanese Mode Toggle - Only for Memo Mode */}
            {mode === 'memo' && (
              <div className="flex items-center justify-between p-4 bg-white border border-[var(--border)] rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[var(--foreground)]">Japanese Mode</span>
                    <p className="text-xs text-[var(--muted)]">Remove team data & translate to Japanese</p>
                  </div>
                </div>
                <button
                  onClick={() => setKajimaEnabled(!kajimaEnabled)}
                  disabled={isLoading || isTranslating}
                  className={`relative w-12 h-7 rounded-full transition-colors disabled:opacity-50 ${
                    kajimaEnabled ? 'bg-rose-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      kajimaEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={handleExtract}
                disabled={isLoading || isTranslating || currentContent.trim().length < 100}
                className="flex-1 px-8 py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)]
                           text-white font-semibold rounded-full
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-300 ease-out
                           flex items-center justify-center gap-2
                           shadow-lg shadow-[var(--accent)]/20 hover:shadow-xl hover:shadow-[var(--accent)]/30
                           tracking-wide uppercase text-sm"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {mode === 'memo' ? 'Extracting...' : 'Analyzing Q&A...'}
                  </>
                ) : isTranslating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Translating to Japanese...
                  </>
                ) : (
                  mode === 'memo' 
                    ? (kajimaEnabled ? 'Extract & Translate' : 'Extract Data')
                    : 'Analyze Q&A'
                )}
              </button>
              
              <button
                onClick={handleClear}
                disabled={isLoading || isTranslating || (!currentContent && !hasData && !error)}
                className="px-6 py-4 bg-transparent border-2 border-[var(--border)]
                           hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--foreground)]
                           font-medium rounded-full
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-300 ease-out
                           tracking-wide uppercase text-sm"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Right Column - Output */}
          <div className="space-y-5">
            <JsonOutput
              data={currentData}
              error={error}
              isLoading={isLoading || isTranslating}
              loadingMessage={
                isTranslating 
                  ? 'Translating to Japanese...' 
                  : mode === 'memo' 
                    ? 'Extracting memo data...'
                    : 'Analyzing Q&A document...'
              }
              loadingSubtext={
                isTranslating 
                  ? 'Converting to consulting-grade Japanese' 
                  : mode === 'memo'
                    ? 'Analyzing your investment memo'
                    : 'Extracting questions, answers, and insights'
              }
              duration={duration}
              retried={retried}
              countdownDuration={mode === 'memo' && kajimaEnabled ? 30 : 15}
            />
            
            {/* Generate Infographic Button */}
            {hasData && !showInfographic && (
              <button
                onClick={handleGenerateInfographic}
                className="w-full px-8 py-5 bg-gradient-to-r from-[#1e293b] to-[#334155]
                           hover:from-[#334155] hover:to-[#475569]
                           text-white font-semibold rounded-full
                           transition-all duration-300 ease-out
                           flex items-center justify-center gap-3
                           shadow-lg hover:shadow-xl
                           tracking-wide uppercase text-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                Generate {mode === 'qa' ? 'Q&A ' : ''}Infographic
              </button>
            )}
          </div>
        </div>

        {/* Stage Disclaimer */}
        {!showInfographic && (
          <div className="mt-16 pt-8 border-t border-[var(--border)]">
            <div className="flex items-start gap-4 max-w-2xl mx-auto">
              <div className="w-10 h-10 rounded-xl bg-[var(--surface)] flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-[var(--muted)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-[var(--foreground)]">How it works</p>
                <p className="mt-1 text-[var(--muted)] leading-relaxed">
                  {mode === 'memo' 
                    ? 'Extract structured data from your investment memo, then generate a visual infographic optimized for executive review and print-to-PDF export. The entire process takes just seconds.'
                    : 'Extract questions, answers, confidence levels, and gaps from your Q&A document. Generate category-based infographics with actionable next steps for C-Suite presentation.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Infographic Section */}
      {showInfographic && hasData && (
        <div ref={infographicRef} className="border-t border-[var(--border)] bg-slate-100 no-print-bg">
          <div className="max-w-5xl mx-auto px-6 py-8">
            {/* Loading States */}
            {isTranslating && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3 no-print">
                <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                <span className="text-sm text-blue-700">
                  Translating to Japanese...
                </span>
              </div>
            )}

            {/* Copy Success Toast */}
            {copySuccess && (
              <div className="fixed bottom-4 right-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg z-50 no-print">
                HTML copied to clipboard!
              </div>
            )}

            {/* Render appropriate infographic based on mode */}
            {mode === 'memo' && displayData && (
              <InfographicContainer
                data={displayData}
                onCopyHtml={handleCopyHtml}
                kajimaMode={kajimaEnabled}
              />
            )}
            
            {mode === 'qa' && qaData && (
              <QAInfographicContainer
                data={qaData}
                onCopyHtml={handleCopyHtml}
              />
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto no-print">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--muted)]">
            <span className="text-lg font-light tracking-[0.15em] text-[var(--foreground)]/60">
              INNOV<span className="text-[var(--accent)]/60">E</span>RA
            </span>
            <p>
              Transforming investment memos into visual insights
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
