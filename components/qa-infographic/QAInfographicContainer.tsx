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
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyHtml}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-slate-50"
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
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:opacity-90"
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
        className="infographic overflow-hidden shadow-2xl"
        style={{ 
          backgroundColor: colors.white,
          fontFamily: typography.fontFamily.sans,
          borderRadius: '4px', // Tighter radius
        }}
      >
        {/* Page 1: Header, Summary, Categories Overview */}
        <div className="infographic-page-1">
          {/* Header */}
          <QAHeader metadata={data.metadata} />

          {/* Main Content */}
          <div className="px-8 pb-8 space-y-10">
            {/* Confidence Summary */}
            <ConfidenceSummary stats={data.summaryStats} />

            {/* Key Insights */}
            {data.keyInsights && data.keyInsights.length > 0 && (
              <div className="avoid-break">
                <div className="flex flex-col gap-2 mb-6">
                  <h2 
                    className="text-2xl font-light"
                    style={{ color: colors.navy }}
                  >
                    Key Strategic Insights
                  </h2>
                  <div className="w-12 h-0.5" style={{ backgroundColor: colors.accent }} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.keyInsights.slice(0, 3).map((insight, index) => (
                    <div 
                      key={index}
                      className="p-6 transition-shadow"
                      style={{ 
                        backgroundColor: colors.slate[50],
                        borderLeft: `2px solid ${colors.navy}`
                      }}
                    >
                      <h4 
                        className="text-base font-bold mb-3"
                        style={{ color: colors.navy }}
                      >
                        {insight.title}
                      </h4>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: colors.slate[600] }}
                      >
                        {insight.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Sections */}
            <div className="space-y-6">
              <div className="flex flex-col gap-2 mb-6">
                <h2 
                  className="text-2xl font-light"
                  style={{ color: colors.navy }}
                >
                  Questions by Category
                </h2>
                <div className="w-12 h-0.5" style={{ backgroundColor: colors.accent }} />
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
          <div className="p-8 space-y-10">
            {/* Gaps Table */}
            <GapsTable gaps={data.gaps} />

            {/* Next Steps */}
            <QANextSteps nextSteps={data.nextSteps} />

            {/* Cross-Domain Insights */}
            {data.crossDomainInsights && data.crossDomainInsights.length > 0 && (
              <div className="avoid-break">
                <div className="flex flex-col gap-2 mb-6">
                  <h2 
                    className="text-2xl font-light"
                    style={{ color: colors.navy }}
                  >
                    Cross-Domain Analysis
                  </h2>
                  <div className="w-12 h-0.5" style={{ backgroundColor: colors.accent }} />
                </div>

                <div className="space-y-6">
                  {data.crossDomainInsights.map((insight, index) => (
                    <div 
                      key={index}
                      className="p-6"
                      style={{ 
                        backgroundColor: colors.white,
                        border: `1px solid ${colors.slate[200]}`,
                      }}
                    >
                      <div className="flex items-start gap-6">
                        <div 
                          className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
                          style={{ backgroundColor: colors.slate[50] }}
                        >
                          <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            style={{ color: colors.accent }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h4 
                              className="text-lg font-bold"
                              style={{ color: colors.navy }}
                            >
                              {insight.title}
                            </h4>
                            <span 
                              className="text-xs px-2 py-1 uppercase tracking-wider font-semibold"
                              style={{ 
                                color: colors.slate[500],
                                border: `1px solid ${colors.slate[200]}`
                              }}
                            >
                              Relates to Q{insight.relatedQuestions.join(', Q')}
                            </span>
                          </div>
                          
                          <p 
                            className="text-sm mb-4 leading-relaxed"
                            style={{ color: colors.slate[600] }}
                          >
                            {insight.insight}
                          </p>
                          
                          {insight.recommendation && (
                            <div 
                              className="flex items-start gap-3 pt-4"
                              style={{ borderTop: `1px solid ${colors.slate[100]}` }}
                            >
                              <div className="mt-0.5">
                                <svg 
                                    className="w-4 h-4" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                    style={{ color: colors.accent }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </div>
                              <div>
                                <span 
                                  className="text-xs font-bold uppercase tracking-wider block mb-1"
                                  style={{ color: colors.accent }}
                                >
                                  Strategic Recommendation
                                </span>
                                <span 
                                  className="text-sm"
                                  style={{ color: colors.navy }}
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

        {/* Footer - Dark Branding from Footer Image */}
        <div 
          className="px-12 py-12 mt-8 relative overflow-hidden"
          style={{ 
            backgroundColor: colors.navy,
            color: colors.white,
          }}
        >
           {/* Watermark Logo */}
           <div 
              className="absolute right-0 bottom-0 opacity-5 pointer-events-none select-none"
              style={{
                  fontSize: '120px',
                  fontWeight: 900,
                  lineHeight: 0.8,
                  marginBottom: '-20px',
                  marginRight: '-10px',
                  color: colors.white
              }}
           >
               INNOVERA
           </div>

          <div className="flex items-end justify-between relative z-10">
            <div>
               <span 
                className="text-2xl font-light tracking-[0.1em]"
                style={{ color: colors.white }}
              >
                INNOVER<span style={{ color: colors.accent }}>A</span>
              </span>
              <div className="mt-4 text-sm opacity-60 font-light">
                Innovation as a Discipline.
              </div>
            </div>
            
            <div className="text-right">
                <div className="text-xs uppercase tracking-widest opacity-40 mb-1">Generated By</div>
                <div className="text-sm font-medium">Olsenator AI Analysis</div>
                <div className="text-xs opacity-40 mt-1">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
