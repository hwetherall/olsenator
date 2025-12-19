'use client';

import { useState, useRef } from 'react';
import { MemoInput } from '@/components/MemoInput';
import { JsonOutput } from '@/components/JsonOutput';
import { InfographicContainer } from '@/components/infographic';
import { ExtractionResult } from '@/lib/schema';

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
  const [narrative, setNarrative] = useState<string | undefined>();
  const [headerImage, setHeaderImage] = useState<string | undefined>();
  const [isGeneratingNarrative, setIsGeneratingNarrative] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const infographicRef = useRef<HTMLDivElement>(null);

  const handleExtract = async () => {
    if (memo.trim().length < 100) {
      setError('Please paste a complete investment memo (minimum 100 characters).');
      return;
    }

    setIsLoading(true);
    setError(null);
    setExtractedData(null);
    setDuration(undefined);
    setRetried(undefined);
    setShowInfographic(false);
    setNarrative(undefined);
    setHeaderImage(undefined);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memo }),
      });

      const result: ApiResponse = await response.json();

      if (result.success && result.data) {
        setExtractedData(result.data);
        setDuration(result.duration);
        setRetried(result.retried);
      } else {
        setError(result.error || 'Unknown error occurred');
        setRetried(result.retried);
      }
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
    setMemo('');
    setExtractedData(null);
    setError(null);
    setDuration(undefined);
    setRetried(undefined);
    setShowInfographic(false);
    setNarrative(undefined);
    setHeaderImage(undefined);
  };

  const handleGenerateInfographic = async () => {
    if (!extractedData) return;
    
    setShowInfographic(true);
    
    // If enhance is enabled, generate narrative
    if (enhanceEnabled) {
      setIsGeneratingNarrative(true);
      try {
        const response = await fetch('/api/enhance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: extractedData }),
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

  const handleGenerateHeaderImage = async () => {
    if (!extractedData) return;
    
    setIsGeneratingImage(true);
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: extractedData.metadata.projectName,
          industry: extractedData.metadata.industry,
          location: extractedData.metadata.location,
        }),
      });
      const result = await response.json();
      if (result.success && result.imageUrl) {
        setHeaderImage(result.imageUrl);
      }
    } catch (err) {
      console.error('Failed to generate header image:', err);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleCopyHtml = () => {
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] no-print">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--accent)] to-blue-700 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">
                The Olsenator
              </h1>
              <p className="text-sm text-[var(--muted)]">
                Extraction & Visualization Engine
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 no-print">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-4">
            <MemoInput
              value={memo}
              onChange={setMemo}
              disabled={isLoading}
            />
            
            <div className="flex gap-3">
              <button
                onClick={handleExtract}
                disabled={isLoading || memo.trim().length < 100}
                className="flex-1 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)]
                           text-white font-semibold rounded-lg
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors duration-200
                           flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Extracting...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    Extract Data
                  </>
                )}
              </button>
              
              <button
                onClick={handleClear}
                disabled={isLoading || (!memo && !extractedData && !error)}
                className="px-4 py-3 bg-[var(--surface)] border border-[var(--border)]
                           hover:bg-[var(--surface-hover)] text-[var(--foreground)]
                           font-medium rounded-lg
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors duration-200"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Right Column - Output */}
          <div className="space-y-4">
            <JsonOutput
              data={extractedData}
              error={error}
              isLoading={isLoading}
              duration={duration}
              retried={retried}
            />
            
            {/* Generate Infographic Button */}
            {extractedData && !showInfographic && (
              <div className="space-y-3">
                {/* Enhance Toggle */}
                <div className="flex items-center justify-between p-4 bg-[var(--surface)] border border-[var(--border)] rounded-lg">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div>
                      <span className="text-sm font-medium text-[var(--foreground)]">Enhance with AI</span>
                      <p className="text-xs text-[var(--muted)]">Generate executive narrative summary</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEnhanceEnabled(!enhanceEnabled)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      enhanceEnabled ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        enhanceEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <button
                  onClick={handleGenerateInfographic}
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#1e293b] to-[#334155]
                             hover:from-[#334155] hover:to-[#475569]
                             text-white font-semibold rounded-lg
                             transition-all duration-200
                             flex items-center justify-center gap-3"
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
          <div className="mt-12 border-t border-[var(--border)] pt-6">
            <div className="flex items-start gap-3 text-sm text-[var(--muted)]">
              <svg
                className="w-5 h-5 flex-shrink-0 mt-0.5"
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
              <div>
                <p className="font-medium text-[var(--foreground)]">Stage 2 — Rendering Engine</p>
                <p className="mt-1">
                  Extract data from your investment memo, then generate a visual infographic 
                  optimized for executive review and print-to-PDF export.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Infographic Section */}
      {showInfographic && extractedData && (
        <div ref={infographicRef} className="border-t border-[var(--border)] bg-slate-100 no-print-bg">
          <div className="max-w-5xl mx-auto px-6 py-8">
            {/* Loading States */}
            {(isGeneratingNarrative || isGeneratingImage) && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3 no-print">
                <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                <span className="text-sm text-blue-700">
                  {isGeneratingNarrative && 'Generating executive narrative...'}
                  {isGeneratingImage && 'Generating header image...'}
                </span>
              </div>
            )}

            {/* Generate Header Image Button */}
            {!headerImage && !isGeneratingImage && (
              <div className="mb-4 no-print">
                <button
                  onClick={handleGenerateHeaderImage}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Generate Header Image (AI)
                </button>
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
              data={extractedData}
              narrative={narrative}
              headerImage={headerImage}
              onCopyHtml={handleCopyHtml}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[var(--border)] mt-auto no-print">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-xs text-[var(--muted)] text-center">
            Built for Innovera.ai — Transforming investment memos into visual insights
          </p>
        </div>
      </footer>
    </main>
  );
}
