'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
      <div className="w-full h-[500px] bg-[var(--surface)] border border-[var(--border)] rounded-lg flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-[var(--border)] border-t-[var(--accent)] rounded-full animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-[var(--foreground)] font-medium">Extracting memo data...</p>
          <p className="text-sm text-[var(--muted)] mt-1">This may take up to 30 seconds</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[200px] bg-[var(--surface)] border border-red-500/50 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5"
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
          <div>
            <h3 className="text-red-500 font-semibold">Extraction Failed</h3>
            <p className="text-[var(--muted)] mt-1">{error}</p>
            {retried && (
              <p className="text-xs text-[var(--muted)] mt-2">
                Note: A retry was attempted with a simplified prompt but also failed.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-[500px] bg-[var(--surface)] border border-[var(--border)] border-dashed rounded-lg flex flex-col items-center justify-center gap-2">
        <svg
          className="w-12 h-12 text-[var(--muted)]"
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
        <p className="text-[var(--muted)] text-center">
          Extracted JSON will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-[var(--muted)]">
            Extracted JSON
          </span>
          {duration && (
            <span className="text-xs text-[var(--muted)] bg-[var(--surface)] px-2 py-0.5 rounded">
              {(duration / 1000).toFixed(1)}s
            </span>
          )}
          {retried && (
            <span className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded">
              Retried
            </span>
          )}
        </div>
        <CopyButton text={jsonString} />
      </div>
      <div className="relative rounded-lg overflow-hidden border border-[var(--border)]">
        <SyntaxHighlighter
          language="json"
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'var(--surface)',
            fontSize: '0.8125rem',
            lineHeight: '1.5',
            maxHeight: '500px',
            overflow: 'auto',
          }}
          showLineNumbers
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: 'var(--muted)',
            userSelect: 'none',
          }}
        >
          {jsonString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

