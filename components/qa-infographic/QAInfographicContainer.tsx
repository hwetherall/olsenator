'use client';

import { useRef } from 'react';
import { QAExtractionResult, QACategory } from '@/lib/qa-schema';
import { colors, typography } from '@/lib/infographic-styles';
import { QAHeader } from './QAHeader';
import { ConfidenceSummary } from './ConfidenceSummary';
import { CategorySection } from './CategorySection';
import { GapsTable } from './GapsTable';
import { QANextSteps } from './QANextSteps';

interface QAInfographicContainerProps {
  data: QAExtractionResult;
  onCopyHtml?: () => void;
}

export function QAInfographicContainer({ 
  data, 
  onCopyHtml,
}: QAInfographicContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyHtml = () => {
    if (containerRef.current) {
      const html = containerRef.current.outerHTML;
      navigator.clipboard.writeText(html).then(() => {
        onCopyHtml?.();
      });
    }
  };

  // Group questions by category
  const categories: QACategory[] = ['market', 'technical', 'financial', 'strategy'];
  const questionsByCategory = categories.reduce((acc, category) => {
    acc[category] = data.questions.filter(q => q.category === category);
    return acc;
  }, {} as Record<QACategory, typeof data.questions>);

  return (
    <div className="w-full">
      {/* Action Buttons - Hidden in Print */}
      <div className="flex items-center justify-between mb-6 no-print">
        <div className="flex items-center gap-2">
          <span 
            className="text-sm font-medium"
            style={{ color: colors.slate[600] }}
          >
            Q&A Response Infographic
          </span>
          <span 
            className="text-xs px-2 py-0.5 rounded"
            style={{ 
              backgroundColor: colors.slate[100],
              color: colors.slate[500],
            }}
          >
            Confidence: {data.confidence}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyHtml}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors"
            style={{ 
              backgroundColor: colors.white,
              border: `1px solid ${colors.slate[300]}`,
              color: colors.slate[700],
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy HTML
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors"
            style={{ 
              backgroundColor: colors.navy,
              color: colors.white,
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Download as PDF
          </button>
        </div>
      </div>

      {/* Infographic Content */}
      <div 
        ref={containerRef}
        className="infographic rounded-lg overflow-hidden"
        style={{ 
          backgroundColor: colors.white,
          fontFamily: typography.fontFamily.sans,
        }}
      >
        {/* Page 1: Header, Summary, Categories Overview */}
        <div className="infographic-page-1">
          {/* Header */}
          <QAHeader metadata={data.metadata} />

          {/* Main Content */}
          <div className="p-6 space-y-6">
            {/* Confidence Summary */}
            <ConfidenceSummary stats={data.summaryStats} />

            {/* Key Insights */}
            {data.keyInsights && data.keyInsights.length > 0 && (
              <div className="avoid-break">
                <div className="flex items-center gap-2 mb-4">
                  <div 
                    className="w-1 h-6 rounded-full"
                    style={{ backgroundColor: colors.teal }}
                  />
                  <h2 
                    className="text-lg font-semibold"
                    style={{ 
                      color: colors.navy,
                      fontFamily: typography.fontFamily.sans,
                      fontWeight: typography.fontWeight.semibold,
                    }}
                  >
                    Key Strategic Insights
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.keyInsights.slice(0, 3).map((insight, index) => (
                    <div 
                      key={index}
                      className="rounded-lg p-4"
                      style={{ 
                        backgroundColor: colors.slate[50],
                        border: `1px solid ${colors.slate[200]}`,
                      }}
                    >
                      <h4 
                        className="text-sm font-semibold mb-2"
                        style={{ color: colors.navy }}
                      >
                        {insight.title}
                      </h4>
                      <p 
                        className="text-sm"
                        style={{ 
                          color: colors.slate[600],
                          lineHeight: typography.lineHeight.relaxed,
                        }}
                      >
                        {insight.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Sections */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-1 h-6 rounded-full"
                  style={{ backgroundColor: colors.navy }}
                />
                <h2 
                  className="text-lg font-semibold"
                  style={{ 
                    color: colors.navy,
                    fontFamily: typography.fontFamily.sans,
                    fontWeight: typography.fontWeight.semibold,
                  }}
                >
                  Questions by Category
                </h2>
              </div>
              
              {categories.map((category) => {
                const questions = questionsByCategory[category];
                if (questions.length === 0) return null;
                return (
                  <CategorySection 
                    key={category}
                    category={category}
                    questions={questions}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Page 2: Gaps and Next Steps */}
        <div className="infographic-page-2 page-break-before">
          <div className="p-6 space-y-6">
            {/* Gaps Table */}
            <GapsTable gaps={data.gaps} />

            {/* Next Steps */}
            <QANextSteps nextSteps={data.nextSteps} />

            {/* Cross-Domain Insights */}
            {data.crossDomainInsights && data.crossDomainInsights.length > 0 && (
              <div className="avoid-break">
                <div className="flex items-center gap-2 mb-4">
                  <div 
                    className="w-1 h-6 rounded-full"
                    style={{ backgroundColor: colors.navy }}
                  />
                  <h2 
                    className="text-lg font-semibold"
                    style={{ 
                      color: colors.navy,
                      fontFamily: typography.fontFamily.sans,
                      fontWeight: typography.fontWeight.semibold,
                    }}
                  >
                    Cross-Domain Analysis
                  </h2>
                </div>

                <div className="space-y-4">
                  {data.crossDomainInsights.map((insight, index) => (
                    <div 
                      key={index}
                      className="rounded-lg p-5"
                      style={{ 
                        backgroundColor: colors.white,
                        border: `1px solid ${colors.slate[200]}`,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: colors.slate[100] }}
                        >
                          <svg 
                            className="w-4 h-4" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            style={{ color: colors.navy }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 
                              className="text-base font-semibold"
                              style={{ color: colors.slate[700] }}
                            >
                              {insight.title}
                            </h4>
                            <span 
                              className="text-xs px-2 py-1 rounded"
                              style={{ 
                                backgroundColor: colors.slate[100],
                                color: colors.slate[500],
                              }}
                            >
                              Q{insight.relatedQuestions.join(', Q')}
                            </span>
                          </div>
                          
                          <p 
                            className="text-sm mb-3"
                            style={{ 
                              color: colors.slate[600],
                              lineHeight: typography.lineHeight.relaxed,
                            }}
                          >
                            {insight.insight}
                          </p>
                          
                          {insight.recommendation && (
                            <div 
                              className="flex items-start gap-2 pt-3"
                              style={{ borderTop: `1px solid ${colors.slate[100]}` }}
                            >
                              <svg 
                                className="w-4 h-4 flex-shrink-0 mt-0.5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                style={{ color: colors.teal }}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <div>
                                <span 
                                  className="text-xs font-medium uppercase tracking-wider block mb-0.5"
                                  style={{ color: colors.teal }}
                                >
                                  Recommendation
                                </span>
                                <span 
                                  className="text-sm"
                                  style={{ color: colors.slate[600] }}
                                >
                                  {insight.recommendation}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div 
          className="px-6 py-4 mt-6"
          style={{ 
            backgroundColor: colors.slate[50],
            borderTop: `1px solid ${colors.slate[200]}`,
          }}
        >
          <div className="flex items-center justify-between text-xs" style={{ color: colors.slate[500] }}>
            <span>Generated by The Olsenator • Innovera</span>
            <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
