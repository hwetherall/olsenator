'use client';

import { useState, useRef } from 'react';
import { MemoInput } from '@/components/MemoInput';
import { JsonOutput } from '@/components/JsonOutput';
import { InfographicContainer } from '@/components/infographic';
import { ExtractionResult, KajimaExtractionResult } from '@/lib/schema';
import { removeTeamReferences } from '@/lib/kajima-transform';
import { PREFILL_TEXT } from '@/lib/prefill';

interface ApiResponse {
  success: boolean;
  data?: ExtractionResult;
  error?: string;
  duration?: number;
  retried?: boolean;
}

export default function Home() {
  const [memo, setMemo] = useState('');
  const [extractedData, setExtractedData] = useState<ExtractionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState<number | undefined>();
  const [retried, setRetried] = useState<boolean | undefined>();
  
  // Stage 2 State
  const [showInfographic, setShowInfographic] = useState(false);
  const [enhanceEnabled, setEnhanceEnabled] = useState(false);
  const [kajimaEnabled, setKajimaEnabled] = useState(false);
  const [narrative, setNarrative] = useState<string | undefined>();
  const [isGeneratingNarrative, setIsGeneratingNarrative] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [displayData, setDisplayData] = useState<ExtractionResult | KajimaExtractionResult | null>(null);
  
  const infographicRef = useRef<HTMLDivElement>(null);

  const handleExtract = async () => {
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
    setNarrative(undefined);

    const startTime = Date.now();

    try {
      // Step 1: Extract data from memo
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

      // Step 2 & 3: If Kajima mode, remove team and translate
      if (kajimaEnabled) {
        setIsLoading(false);
        setIsTranslating(true);

        // Step 2: Remove team references
        const dataWithoutTeam = removeTeamReferences(result.data);

        // Step 3: Translate to Japanese
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
            // If translation fails, still use the team-removed data
            console.error('Translation failed:', translateResult.error);
            finalData = dataWithoutTeam;
          }
        } catch (err) {
          console.error('Failed to translate:', err);
          finalData = dataWithoutTeam;
        }
      }

      const totalDuration = Date.now() - startTime;
      setExtractedData(result.data); // Keep original for reference
      setDisplayData(finalData); // This is what we show (possibly translated)
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

  const handleClear = () => {
    setMemo('');
    setExtractedData(null);
    setError(null);
    setDuration(undefined);
    setRetried(undefined);
    setShowInfographic(false);
    setNarrative(undefined);
    setKajimaEnabled(false);
    setDisplayData(null);
  };

  const handlePrefill = () => {
    setMemo(PREFILL_TEXT);
  };

  const handleGenerateInfographic = async () => {
    if (!displayData) return;
    
    setShowInfographic(true);
    
    // If enhance is enabled, generate narrative (use original data for better English narrative)
    if (enhanceEnabled) {
      setIsGeneratingNarrative(true);
      try {
        const response = await fetch('/api/enhance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: extractedData || displayData }),
        });
        const result = await response.json();
        if (result.success && result.narrative) {
          setNarrative(result.narrative);
        }
      } catch (err) {
        console.error('Failed to generate narrative:', err);
      } finally {
        setIsGeneratingNarrative(false);
      }
    }

    // Scroll to infographic
    setTimeout(() => {
      infographicRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCopyHtml = () => {
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

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

      {/* Hero Section */}
      {!extractedData && !error && !isLoading && (
        <div className="max-w-4xl mx-auto px-8 py-16 text-center no-print">
          <h2 className="text-4xl md:text-5xl font-light text-[var(--foreground)] leading-tight mb-8">
            Transform your investment memo into{' '}
            <span className="text-[var(--accent)] font-normal">visual insights</span>
          </h2>
          <p className="text-lg text-[var(--muted)] mb-12 max-w-2xl mx-auto">
            Paste your investment memo below and let The Olsenator extract structured data 
            and generate beautiful infographics for executive review.
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8 no-print">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column - Input */}
          <div className="space-y-5">
            <MemoInput
              value={memo}
              onChange={setMemo}
              disabled={isLoading || isTranslating}
              onPrefill={handlePrefill}
            />
            
            {/* Japanese Mode Toggle - Before Extraction */}
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
            
            <div className="flex gap-3">
              <button
                onClick={handleExtract}
                disabled={isLoading || isTranslating || memo.trim().length < 100}
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
                    Extracting...
                  </>
                ) : isTranslating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Translating to Japanese...
                  </>
                ) : (
                  kajimaEnabled ? 'Extract & Translate' : 'Extract Data'
                )}
              </button>
              
              <button
                onClick={handleClear}
                disabled={isLoading || isTranslating || (!memo && !extractedData && !error)}
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
              data={displayData}
              error={error}
              isLoading={isLoading || isTranslating}
              loadingMessage={isTranslating ? 'Translating to Japanese...' : 'Extracting memo data...'}
              loadingSubtext={isTranslating ? 'Converting to consulting-grade Japanese' : 'Analyzing your investment memo'}
              duration={duration}
              retried={retried}
              countdownDuration={kajimaEnabled ? 30 : 15}
            />
            
            {/* Generate Infographic Button */}
            {displayData && !showInfographic && (
              <div className="space-y-4">
                {/* Enhance Toggle */}
                <div className="flex items-center justify-between p-5 bg-white border border-[var(--border)] rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-[var(--foreground)]">Enhance with AI</span>
                      <p className="text-xs text-[var(--muted)]">Generate executive narrative summary</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEnhanceEnabled(!enhanceEnabled)}
                    className={`relative w-12 h-7 rounded-full transition-colors ${
                      enhanceEnabled ? 'bg-[var(--accent)]' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        enhanceEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

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
                  Generate Infographic
                </button>
              </div>
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
                  Extract structured data from your investment memo, then generate a visual infographic 
                  optimized for executive review and print-to-PDF export. The entire process takes just seconds.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Infographic Section */}
      {showInfographic && displayData && (
        <div ref={infographicRef} className="border-t border-[var(--border)] bg-slate-100 no-print-bg">
          <div className="max-w-5xl mx-auto px-6 py-8">
            {/* Loading States */}
            {(isGeneratingNarrative || isTranslating) && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3 no-print">
                <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                <span className="text-sm text-blue-700">
                  {isTranslating && 'Translating to Japanese...'}
                  {isGeneratingNarrative && 'Generating executive narrative...'}
                </span>
              </div>
            )}

            {/* Copy Success Toast */}
            {copySuccess && (
              <div className="fixed bottom-4 right-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg z-50 no-print">
                HTML copied to clipboard!
              </div>
            )}

            {/* Infographic */}
            <InfographicContainer
              data={displayData}
              narrative={narrative}
              onCopyHtml={handleCopyHtml}
              kajimaMode={kajimaEnabled}
            />
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
