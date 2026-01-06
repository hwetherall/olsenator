'use client';

import { useState } from 'react';
import { QuestionAnswer, QACategory, getCategoryLabel, getCategoryColor } from '@/lib/qa-schema';
import { colors, typography } from '@/lib/infographic-styles';
import { QuestionCard } from './QuestionCard';

interface CategorySectionProps {
  category: QACategory;
  questions: QuestionAnswer[];
  defaultExpanded?: boolean;
}

export function CategorySection({ 
  category, 
  questions,
  defaultExpanded = false,
}: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const categoryColors = getCategoryColor(category);
  const label = getCategoryLabel(category);

  // Calculate stats for this category
  const highCount = questions.filter(q => q.confidence === 'High').length;
  const mediumCount = questions.filter(q => q.confidence === 'Medium').length;
  const lowCount = questions.filter(q => q.confidence === 'Low').length;

  return (
    <div className="avoid-break mb-8">
      {/* Category Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-4 flex items-center justify-between group border-b-2 transition-colors"
        style={{ 
          backgroundColor: 'transparent',
          borderColor: isExpanded ? colors.navy : colors.slate[200]
        }}
      >
        <div className="flex items-center gap-4">
          <div className="text-left">
            <h3 
              className="text-xl font-light"
              style={{ 
                color: colors.navy,
              }}
            >
              {label}
            </h3>
          </div>
          <span 
            className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium"
          >
            {questions.length}
          </span>
        </div>

        <div className="flex items-center gap-8">
          {/* Mini Stats */}
          <div className="flex items-center gap-3">
            {highCount > 0 && (
              <div className="flex items-center gap-1.5" title={`${highCount} High Confidence`}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.risk.green }} />
                <span className="text-xs text-slate-500 font-medium">{highCount}</span>
              </div>
            )}
            {mediumCount > 0 && (
              <div className="flex items-center gap-1.5" title={`${mediumCount} Medium Confidence`}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.risk.amber }} />
                <span className="text-xs text-slate-500 font-medium">{mediumCount}</span>
              </div>
            )}
            {lowCount > 0 && (
              <div className="flex items-center gap-1.5" title={`${lowCount} Low Confidence`}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.risk.red }} />
                <span className="text-xs text-slate-500 font-medium">{lowCount}</span>
              </div>
            )}
          </div>

          {/* Expand Icon */}
          <div 
            className="transition-transform duration-300"
            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ color: colors.navy }}
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Expanded Questions */}
      {isExpanded && (
        <div className="mt-2">
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      )}
    </div>
  );
}
