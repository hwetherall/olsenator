'use client';

import { useState, useRef } from 'react';
import { MemoInput } from '@/components/MemoInput';
import { V2InfographicContainer } from '@/components/v2-infographic';
import { V2ExtractionResult } from '@/lib/v2-schema';
import { V2_PREFILL_TEXT } from '@/lib/v2-prefill';

type AppMode = 'v2';

interface V2ApiResponse {
  success: boolean;
  data?: V2ExtractionResult;
  error?: string;
  duration?: number;
  retried?: boolean;
  parsed?: boolean;
}

export default function Home() {
  // Mode state - V2 Analysis is the only mode
  const [mode] = useState<AppMode>('v2');
  
  // Input state
  const [v2Content, setV2Content] = useState('');
  
  // V2 extraction state
  const [v2Data, setV2Data] = useState<V2ExtractionResult | null>(null);
  
  // Common state
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState<number | undefined>();
  const [retried, setRetried] = useState<boolean | undefined>();
  
  // Stage 2 State
  const [showInfographic, setShowInfographic] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const infographicRef = useRef<HTMLDivElement>(null);

  const handleExtract = async () => {
    await handleV2Extract();
  };

  const handleV2Extract = async () => {
    if (v2Content.trim().length < 50) {
      setError('Please paste valid V2 JSON (minimum 50 characters).');
      return;
    }

    setIsLoading(true);
    setError(null);
    setV2Data(null);
    setDuration(undefined);
    setRetried(undefined);
    setShowInfographic(false);

    const startTime = Date.now();

    try {
      const response = await fetch('/api/extract-v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: v2Content }),
      });

      const result: V2ApiResponse = await response.json();

      if (!result.success || !result.data) {
        setError(result.error || 'Unknown error occurred');
        setRetried(result.retried);
        setIsLoading(false);
        return;
      }

      const totalDuration = Date.now() - startTime;
      setV2Data(result.data);
      setDuration(totalDuration);
      setRetried(result.retried);
      
      // Automatically show infographic after successful validation
      setShowInfographic(true);
      
      // Scroll to infographic
      setTimeout(() => {
        infographicRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

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
    setV2Content('');
    setV2Data(null);
    setError(null);
    setDuration(undefined);
    setRetried(undefined);
    setShowInfographic(false);
  };

  const handlePrefill = () => {
    setV2Content(V2_PREFILL_TEXT);
  };

  const handleCopyHtml = () => {
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const currentContent = v2Content;
  const setCurrentContent = setV2Content;
  const hasData = !!v2Data;
  const currentData = v2Data;

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
      {!hasData && !error && !isLoading && (
        <div className="max-w-4xl mx-auto px-8 py-16 text-center no-print">
          <h2 className="text-4xl md:text-5xl font-light text-[var(--foreground)] leading-tight mb-8">
            Executive-grade investment{' '}
            <span className="text-[var(--accent)] font-normal">infographics</span>
          </h2>
          <p className="text-lg text-[var(--muted)] mb-12 max-w-2xl mx-auto">
            Paste the content of the "Olsenator Input" chapter and generate a comprehensive visual infographic 
            with gap analysis, decision pathways, and strategic fit assessment.
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8 no-print">
        {/* Input Section - Hidden when infographic is shown */}
        {!showInfographic && (
          <div className="max-w-3xl mx-auto space-y-5">
            <MemoInput
              value={currentContent}
              onChange={setCurrentContent}
              disabled={isLoading}
              onPrefill={handlePrefill}
              placeholder='Paste your V2 JSON here (following the V2_EXTRACTION_SCHEMA_JSON schema)...'
              label='V2 JSON Input'
            />
            
            {/* Error State */}
            {error && (
              <div className="w-full min-h-[100px] bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-red-600 font-semibold">Validation Failed</h3>
                    <p className="text-red-700/70 mt-1 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={handleExtract}
                disabled={isLoading || currentContent.trim().length < 50}
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
                    Validating & Fixing JSON...
                  </>
                ) : (
                  'Validate & Generate Infographic'
                )}
              </button>
              
              <button
                onClick={handleClear}
                disabled={isLoading || (!currentContent && !hasData && !error)}
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
        )}

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
                  Parse the content of the "Olsenator Input" chapter and generate a comprehensive visual infographic with gap analysis, decision pathways, and strategic fit assessment.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Infographic Section */}
      {showInfographic && hasData && (
        <div className="min-h-screen">
          {/* Back Button */}
          <div className="max-w-7xl mx-auto px-8 py-4 no-print">
            <button
              onClick={() => setShowInfographic(false)}
              className="flex items-center gap-2 px-4 py-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Back to Input</span>
            </button>
          </div>
          
          <div ref={infographicRef} className="border-t border-[var(--border)] bg-slate-100 no-print-bg">
            <div className="max-w-5xl mx-auto px-6 py-8">
            {/* Copy Success Toast */}
            {copySuccess && (
              <div className="fixed bottom-4 right-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg z-50 no-print">
                HTML copied to clipboard!
              </div>
            )}

            {/* Render V2 infographic */}
            {v2Data && (
              <V2InfographicContainer
                data={v2Data}
                onCopyHtml={handleCopyHtml}
                language='en'
              />
            )}
            </div>
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
