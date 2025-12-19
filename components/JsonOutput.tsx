'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyButton } from './CopyButton';

interface JsonOutputProps {
  data: object | null;
  error?: string | null;
  isLoading?: boolean;
  duration?: number;
  retried?: boolean;
}

export function JsonOutput({ data, error, isLoading, duration, retried }: JsonOutputProps) {
  const jsonString = data ? JSON.stringify(data, null, 2) : '';

  if (isLoading) {
    return (
      <div className="w-full h-[500px] bg-white border-2 border-[var(--border)] rounded-2xl flex flex-col items-center justify-center gap-4 shadow-sm">
        <div className="relative">
          <div className="w-14 h-14 border-4 border-[var(--border)] border-t-[var(--accent)] rounded-full animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-[var(--foreground)] font-semibold">Extracting memo data...</p>
          <p className="text-sm text-[var(--muted)] mt-2">This may take up to 30 seconds</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[200px] bg-red-50 border-2 border-red-200 rounded-2xl p-6">
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
            <h3 className="text-red-600 font-semibold">Extraction Failed</h3>
            <p className="text-red-700/70 mt-1 text-sm">{error}</p>
            {retried && (
              <p className="text-xs text-red-600/60 mt-2">
                A retry was attempted with a simplified prompt but also failed.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-[500px] bg-white border-2 border-dashed border-[var(--border)] rounded-2xl flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[var(--surface)] flex items-center justify-center">
          <svg
            className="w-8 h-8 text-[var(--muted)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-[var(--muted)] text-center text-sm">
          Extracted JSON will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[var(--foreground)] tracking-wide">
            Extracted JSON
          </span>
          {duration && (
            <span className="text-xs font-medium text-[var(--accent)] bg-[var(--accent)]/10 px-2.5 py-1 rounded-full">
              {(duration / 1000).toFixed(1)}s
            </span>
          )}
          {retried && (
            <span className="text-xs font-medium text-amber-600 bg-amber-100 px-2.5 py-1 rounded-full">
              Retried
            </span>
          )}
        </div>
        <CopyButton text={jsonString} />
      </div>
      <div className="relative rounded-2xl overflow-hidden border-2 border-[var(--border)] shadow-sm">
        <SyntaxHighlighter
          language="json"
          style={oneLight}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            background: '#fafafa',
            fontSize: '0.8125rem',
            lineHeight: '1.6',
            maxHeight: '500px',
            overflow: 'auto',
          }}
          showLineNumbers
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: '#9ca3af',
            userSelect: 'none',
          }}
        >
          {jsonString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

