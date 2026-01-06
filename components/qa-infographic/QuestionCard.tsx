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

  const confidenceColors = {
    High: { bg: colors.risk.greenLight, text: colors.risk.green, dot: colors.risk.green },
    Medium: { bg: colors.risk.amberLight, text: colors.risk.amber, dot: colors.risk.amber },
    Low: { bg: colors.risk.redLight, text: colors.risk.red, dot: colors.risk.red },
  };

  const conf = confidenceColors[question.confidence];

  return (
    <div 
      className="rounded-lg overflow-hidden"
      style={{ 
        backgroundColor: colors.white,
        border: `1px solid ${colors.slate[200]}`,
      }}
    >
      {/* Question Header */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Question Number */}
          <div 
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ 
              backgroundColor: colors.slate[100],
              color: colors.slate[600],
            }}
          >
            {question.id}
          </div>

          <div className="flex-1 min-w-0">
            {/* Question Text */}
            <h4 
              className="text-sm font-medium mb-2 leading-relaxed"
              style={{ 
                color: colors.slate[700],
                fontWeight: typography.fontWeight.medium,
              }}
            >
              {question.question}
            </h4>

            {/* Answer */}
            <p 
              className="text-sm mb-3"
              style={{ 
                color: colors.slate[600],
                lineHeight: typography.lineHeight.relaxed,
              }}
            >
              {question.answer}
            </p>

            {/* Footer Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Confidence Badge */}
                <span 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: conf.bg, color: conf.text }}
                >
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: conf.dot }}
                  />
                  {question.confidence}
                </span>

                {/* Source */}
                {question.source && (
                  <span 
                    className="text-xs"
                    style={{ color: colors.slate[400] }}
                  >
                    {question.source}
                  </span>
                )}
              </div>

              {/* Expand Commentary Button */}
              {showCommentary && question.commentary && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 text-xs font-medium transition-colors hover:opacity-80"
                  style={{ color: colors.navy }}
                >
                  {isExpanded ? 'Hide' : 'Show'} Commentary
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
          className="px-4 py-3 border-t"
          style={{ 
            backgroundColor: colors.slate[50],
            borderColor: colors.slate[200],
          }}
        >
          <div className="flex items-start gap-2 pl-11">
            <svg 
              className="w-4 h-4 flex-shrink-0 mt-0.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ color: colors.teal }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <span 
                className="text-xs font-medium uppercase tracking-wider block mb-1"
                style={{ color: colors.teal }}
              >
                Innovera Commentary
              </span>
              <p 
                className="text-sm italic"
                style={{ 
                  color: colors.slate[600],
                  lineHeight: typography.lineHeight.relaxed,
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
