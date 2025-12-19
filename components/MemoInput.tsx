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
        className="block text-sm font-semibold text-[var(--foreground)] mb-3 tracking-wide"
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

