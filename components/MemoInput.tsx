'use client';

interface MemoInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  onPrefill?: () => void;
}

export function MemoInput({ value, onChange, disabled, onPrefill }: MemoInputProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <label 
          htmlFor="memo-input" 
          className="block text-sm font-semibold text-[var(--foreground)] tracking-wide"
        >
          Investment Memo
        </label>
        {onPrefill && (
          <button
            onClick={onPrefill}
            disabled={disabled}
            className="px-4 py-1.5 text-xs font-medium text-[var(--accent)] 
                     border border-[var(--accent)] rounded-lg
                     hover:bg-[var(--accent)] hover:text-white
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200 ease-out
                     tracking-wide uppercase"
          >
            Example Text
          </button>
        )}
      </div>
      <textarea
        id="memo-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Paste your investment memo here...

Expected format includes:
• Overview Table (project metadata)
• 'Tell it to me straight' section
• Strategic Fit analysis
• Highlights and key findings
• 'What You Would Have To Believe' assumptions
• Six-T Risk Analysis (Team, TAM, Technology, Traction, Terms, Trends)
• 'Should We Do It' and 'Can We Do It' assessments
• Chapter analyses (Team, Opportunity, Path to Success, Operations)"
        className="w-full h-[400px] px-5 py-4 bg-white border-2 border-[var(--border)] 
                   rounded-2xl text-[var(--foreground)] placeholder-[var(--muted)]/60
                   focus:outline-none focus:ring-0 focus:border-[var(--accent)]
                   resize-none font-mono text-sm leading-relaxed
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-300 ease-out
                   shadow-sm hover:shadow-md focus:shadow-md"
        spellCheck={false}
      />
      <div className="mt-3 flex justify-between text-xs text-[var(--muted)]">
        <span className="font-medium">
          {value.length.toLocaleString()} characters
        </span>
        <span>
          Minimum 100 required
        </span>
      </div>
    </div>
  );
}

