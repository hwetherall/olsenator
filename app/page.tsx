'use client';

import { useState } from 'react';
import { MemoInput } from '@/components/MemoInput';
import { JsonOutput } from '@/components/JsonOutput';
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
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-[var(--border)]">
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
                Extraction Engine
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
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
          <div>
            <JsonOutput
              data={extractedData}
              error={error}
              isLoading={isLoading}
              duration={duration}
              retried={retried}
            />
          </div>
        </div>

        {/* Stage Disclaimer */}
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
              <p className="font-medium text-[var(--foreground)]">Stage 1 — Extraction Engine</p>
              <p className="mt-1">
                This is the data extraction phase of The Olsenator. The JSON output produced here 
                will be consumed by Stage 2&apos;s rendering engine to generate visual infographics. 
                Copy the extracted JSON for use in downstream visualization workflows.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-xs text-[var(--muted)] text-center">
            Built for Innovera.ai — Transforming investment memos into structured data
          </p>
        </div>
      </footer>
    </main>
  );
}

