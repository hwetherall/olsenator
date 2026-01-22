'use client';

import { useRef } from 'react';
import { V2ExtractionResult } from '@/lib/v2-schema';
import { BannerSection } from './BannerSection';
import { StrategicFitSection } from './StrategicFitSection';
import { GapQuadrantSection } from './GapQuadrantSection';
import { HighlightsV2Section } from './HighlightsV2Section';
import { NextStepsPathway } from './NextStepsPathway';

import { ProcessSection } from './ProcessSection';

interface V2InfographicContainerProps {
  data: V2ExtractionResult;
  onCopyHtml?: () => void;
}

export function V2InfographicContainer({ data, onCopyHtml }: V2InfographicContainerProps) {
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
          <span className="text-sm font-medium text-slate-600">
            V2 Executive Infographic
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">
            {data.identification.stage}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyHtml}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy HTML
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-slate-800 text-white hover:bg-slate-700"
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
        className="v2-infographic rounded-xl overflow-hidden shadow-xl"
        style={{ 
          backgroundColor: '#ffffff',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Page 1: Banner + Strategic Fit */}
        <div className="v2-infographic-page-1">
          {/* Banner Section */}
          <BannerSection 
            identification={data.identification}
            questionAndAnswer={data.question_and_answer}
            thesis={data.thesis}
          />

          {/* Page 1.5: The Process - Moved here */}
          {data.supporting_analysis && (
            <div className="px-6 pt-6">
              <ProcessSection analysis={data.supporting_analysis} />
            </div>
          )}

          {/* Strategic Fit Assessment */}
          <div className="p-6">
            <StrategicFitSection 
              shouldWeDoIt={data.should_we_do_it}
              canWeDoIt={data.can_we_do_it}
              synthesis={data.synthesis}
            />
          </div>
        </div>

        {/* Page 2: Gap Analysis + Highlights */}
        <div className="v2-infographic-page-2 page-break-before">
          <div className="p-6 space-y-6">
            {/* Gap Quadrant Analysis */}
            <GapQuadrantSection 
              gaps={data.gaps}
              summary={data.gap_summary}
            />

            {/* Key Highlights */}
            <HighlightsV2Section 
              highlights={data.highlights}
              metadata={data.highlights_metadata}
            />
          </div>
        </div>

        {/* Page 3: Next Steps Pathway */}
        <div className="v2-infographic-page-3 page-break-before">
          <div className="p-6">
            <NextStepsPathway 
              steps={data.next_steps}
              metadata={data.pathway_metadata}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-slate-700">
                {data.identification.project_name}
              </span>
              <span>|</span>
              <span>{data.identification.sector}</span>
              <span>|</span>
              <span>{data.identification.geography}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Generated by The Olsenator V2</span>
              <span>|</span>
              <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
