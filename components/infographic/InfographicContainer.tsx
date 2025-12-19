'use client';

import { useRef } from 'react';
import { ExtractionResult, KajimaExtractionResult } from '@/lib/schema';
import { colors, typography } from '@/lib/infographic-styles';
import { getLabels } from '@/lib/kajima-labels';
import { InfographicHeader } from './InfographicHeader';
import { ExecutiveNarrative } from './ExecutiveNarrative';
import { VerdictCard } from './VerdictCard';
import { SixTRadar } from './SixTRadar';
import { HighlightCards } from './HighlightCards';
import { AssumptionsList } from './AssumptionsList';
import { VerdictPair } from './VerdictPair';
import { NextStepsTimeline } from './NextStepsTimeline';
import { ChapterSummaries } from './ChapterSummaries';

interface InfographicContainerProps {
  data: ExtractionResult | KajimaExtractionResult;
  narrative?: string;
  onCopyHtml?: () => void;
  kajimaMode?: boolean;
}

export function InfographicContainer({ 
  data, 
  narrative, 
  onCopyHtml,
  kajimaMode = false,
}: InfographicContainerProps) {
  const labels = getLabels(kajimaMode);
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

  return (
    <div className="w-full">
      {/* Action Buttons - Hidden in Print */}
      <div className="flex items-center justify-between mb-6 no-print">
        <div className="flex items-center gap-2">
          <span 
            className="text-sm font-medium"
            style={{ color: colors.slate[600] }}
          >
            {labels.investmentInfographic}
          </span>
          <span 
            className="text-xs px-2 py-0.5 rounded"
            style={{ 
              backgroundColor: colors.slate[100],
              color: colors.slate[500],
            }}
          >
            {labels.confidence}: {data.confidence}%
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
        {/* Page 1: Header, Summary, Radar, Highlights */}
        <div className="infographic-page-1">
          {/* Header */}
          <InfographicHeader 
            metadata={data.metadata} 
            kajimaMode={kajimaMode}
          />

          {/* Optional AI Narrative */}
          {narrative && (
            <div className="p-6 pt-0">
              <div className="mt-6">
                <ExecutiveNarrative narrative={narrative} kajimaMode={kajimaMode} />
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="p-6 space-y-6">
            {/* Executive Summary */}
            <VerdictCard executiveSummary={data.executiveSummary} kajimaMode={kajimaMode} />

            {/* Strategic Fit */}
            <div 
              className="avoid-break rounded-lg p-4"
              style={{ 
                backgroundColor: colors.slate[50],
                border: `1px solid ${colors.slate[200]}`,
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span 
                    className="text-xs font-medium uppercase tracking-wider block mb-1"
                    style={{ color: colors.slate[500] }}
                  >
                    {labels.strategicFitAssessment}
                  </span>
                  <p 
                    className="text-sm"
                    style={{ color: colors.slate[700] }}
                  >
                    {data.strategicFit.assessment}
                  </p>
                </div>
                <span 
                  className="px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-4"
                  style={{ 
                    backgroundColor: data.strategicFit.confidenceLevel === 'High' 
                      ? colors.risk.greenLight 
                      : data.strategicFit.confidenceLevel === 'Medium'
                        ? colors.risk.amberLight
                        : colors.risk.redLight,
                    color: data.strategicFit.confidenceLevel === 'High' 
                      ? colors.risk.green 
                      : data.strategicFit.confidenceLevel === 'Medium'
                        ? colors.risk.amber
                        : colors.risk.red,
                  }}
                >
                  {kajimaMode 
                    ? (data.strategicFit.confidenceLevel === 'High' ? labels.highConfidence 
                       : data.strategicFit.confidenceLevel === 'Medium' ? labels.mediumConfidence 
                       : labels.lowConfidence)
                    : `${data.strategicFit.confidenceLevel} Confidence`
                  }
                </span>
              </div>
            </div>

            {/* Six-T Radar */}
            <SixTRadar risks={data.sixTRisks} kajimaMode={kajimaMode} />

            {/* Highlights */}
            <HighlightCards highlights={data.highlights} kajimaMode={kajimaMode} />
          </div>
        </div>

        {/* Page 2: Assumptions, Verdicts, Next Steps, Chapters */}
        <div className="infographic-page-2 page-break-before">
          <div className="p-6 space-y-6">
            {/* Critical Assumptions */}
            <AssumptionsList assumptions={data.criticalAssumptions} kajimaMode={kajimaMode} />

            {/* Verdict Pair */}
            <VerdictPair 
              shouldWeDoIt={data.shouldWeDoIt} 
              canWeDoIt={data.canWeDoIt}
              kajimaMode={kajimaMode}
            />

            {/* Next Steps */}
            <NextStepsTimeline nextSteps={data.nextSteps} kajimaMode={kajimaMode} />

            {/* Chapter Summaries */}
            <ChapterSummaries chapters={data.chapters} kajimaMode={kajimaMode} />
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
            <span>{labels.generatedBy}</span>
            <span>{new Date().toLocaleDateString(kajimaMode ? 'ja-JP' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

