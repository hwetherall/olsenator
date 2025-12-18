'use client';

interface MemoInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function MemoInput({ value, onChange, disabled }: MemoInputProps) {
  return (
    <div className="w-full">
      <label 
        htmlFor="memo-input" 
        className="block text-sm font-medium text-[var(--muted)] mb-2"
      >
        Investment Memo
      </label>
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
        className="w-full h-[400px] px-4 py-3 bg-[var(--surface)] border border-[var(--border)] 
                   rounded-lg text-[var(--foreground)] placeholder-[var(--muted)]
                   focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent
                   resize-none font-mono text-sm leading-relaxed
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200"
        spellCheck={false}
      />
      <div className="mt-2 flex justify-between text-xs text-[var(--muted)]">
        <span>
          {value.length.toLocaleString()} characters
        </span>
        <span>
          Minimum 100 characters required
        </span>
      </div>
    </div>
  );
}

