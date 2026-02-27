'use client';

import { useState } from 'react';
import { QuestionAnswer } from '@/lib/qa-schema';
import { colors, typography } from '@/lib/infographic-styles';

interface QuestionCardProps {
  question: QuestionAnswer;
  showCommentary?: boolean;
}

export function QuestionCard({ question, showCommentary = true }: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="transition-all hover:bg-slate-50"
      style={{ 
        backgroundColor: colors.white,
        borderBottom: `1px solid ${colors.slate[200]}`,
        padding: '1.5rem 0'
      }}
    >
      {/* Question Header */}
      <div className="px-2">
        <div className="flex items-start gap-6">
          {/* Question Number */}
          <div 
            className="flex-shrink-0 w-8 text-sm font-bold text-right pt-1"
            style={{ 
              color: colors.slate[400],
            }}
          >
            {String(question.id).padStart(2, '0')}
          </div>

          <div className="flex-1 min-w-0">
            {/* Question Text */}
            <h4 
              className="text-base font-semibold mb-3 leading-relaxed"
              style={{ 
                color: colors.navy,
              }}
            >
              {question.question}
            </h4>

            {/* Answer */}
            <p 
              className="text-sm mb-4 leading-relaxed"
              style={{ 
                color: colors.slate[600],
              }}
            >
              {question.answer}
            </p>

            {/* Footer Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Source */}
                {question.source && (
                  <span 
                    className="text-xs text-slate-400"
                  >
                    Source: {question.source}
                  </span>
                )}
              </div>

              {/* Expand Commentary Button */}
              {showCommentary && question.commentary && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors hover:text-orange-600"
                  style={{ color: colors.accent }}
                >
                  {isExpanded ? 'Hide Analysis' : 'Innovera Analysis'}
                  <svg 
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Commentary */}
      {showCommentary && question.commentary && isExpanded && (
        <div 
          className="mt-4 ml-14 p-4"
          style={{ 
            backgroundColor: colors.slate[50],
            borderLeft: `2px solid ${colors.accent}`,
          }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p 
                className="text-sm italic leading-relaxed"
                style={{ 
                  color: colors.slate[700],
                }}
              >
                {question.commentary}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
