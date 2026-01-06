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

  // Get category icon
  const getCategoryIcon = () => {
    switch (category) {
      case 'market':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        );
      case 'technical':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        );
      case 'financial':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        );
      case 'strategy':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        );
    }
  };

  return (
    <div className="avoid-break">
      {/* Category Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full rounded-lg p-4 flex items-center justify-between transition-all hover:shadow-md"
        style={{ 
          backgroundColor: categoryColors.bg,
          border: `2px solid ${categoryColors.border}`,
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: categoryColors.border }}
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ color: categoryColors.text }}
            >
              {getCategoryIcon()}
            </svg>
          </div>
          
          <div className="text-left">
            <h3 
              className="text-base font-semibold"
              style={{ 
                color: categoryColors.text,
                fontWeight: typography.fontWeight.semibold,
              }}
            >
              {label}
            </h3>
            <span 
              className="text-sm"
              style={{ color: categoryColors.text, opacity: 0.8 }}
            >
              {questions.length} question{questions.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Mini Stats */}
          <div className="flex items-center gap-2">
            {highCount > 0 && (
              <span 
                className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded"
                style={{ backgroundColor: colors.risk.greenLight, color: colors.risk.green }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.risk.green }} />
                {highCount}
              </span>
            )}
            {mediumCount > 0 && (
              <span 
                className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded"
                style={{ backgroundColor: colors.risk.amberLight, color: colors.risk.amber }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.risk.amber }} />
                {mediumCount}
              </span>
            )}
            {lowCount > 0 && (
              <span 
                className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded"
                style={{ backgroundColor: colors.risk.redLight, color: colors.risk.red }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.risk.red }} />
                {lowCount}
              </span>
            )}
          </div>

          {/* Expand Icon */}
          <svg 
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ color: categoryColors.text }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expanded Questions */}
      {isExpanded && (
        <div className="mt-3 space-y-3 pl-4 border-l-2" style={{ borderColor: categoryColors.border }}>
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      )}
    </div>
  );
}
