'use client';

import { useRef } from 'react';
import { ExtractionResultV2 } from '@/lib/schema-v2';
import { colors, typography } from '@/lib/infographic-styles';
import { SectionHeader } from './SectionHeader';
import { OverviewTable } from './OverviewTable';
import { OverviewBlock } from './OverviewBlock';
import { StrategicFitBlock } from './StrategicFitBlock';
import { GapAnalysisBlock } from './GapAnalysisBlock';
import { HighlightCardsV2 } from './HighlightCardsV2';
import { NextStepsV2 } from './NextStepsV2';

interface InfographicContainerV2Props {
  data: ExtractionResultV2;
  onCopyHtml?: () => void;
}

export function InfographicContainerV2({ 
  data, 
  onCopyHtml,
}: InfographicContainerV2Props) {
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
            Investment Infographic V2
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
        {/* ========== SECTION 0: Overview Table ========== */}
        <OverviewTable data={data.overviewTable} />

        {/* ========== SECTION 1: Overview Block ========== */}
        <div 
          className="p-6"
          style={{ backgroundColor: colors.white }}
        >
          <SectionHeader 
            sectionNumber={1} 
            title="Overview" 
            subtitle="Project description, recommendation, and key risks"
          />
          <OverviewBlock data={data.overviewBlock} />
        </div>

        {/* Section Divider */}
        <div style={{ height: '8px', backgroundColor: colors.slate[100] }} />

        {/* ========== SECTION 2: Strategic Fit ========== */}
        <div 
          className="p-6"
          style={{ backgroundColor: colors.white }}
        >
          <SectionHeader 
            sectionNumber={2} 
            title="Strategic Fit Assessment" 
            subtitle="Can we do it? Should we do it?"
          />
          <StrategicFitBlock data={data.strategicFit} />
        </div>

        {/* Section Divider */}
        <div style={{ height: '8px', backgroundColor: colors.slate[100] }} />

        {/* ========== SECTION 3: Gap Analysis & Assumptions ========== */}
        <div 
          className="p-6"
          style={{ backgroundColor: colors.white }}
        >
          <SectionHeader 
            sectionNumber={3} 
            title="Gap Analysis & Assumptions" 
            subtitle="Execution gaps and critical assumptions to validate"
          />
          <GapAnalysisBlock data={data.gapAnalysis} />
        </div>

        {/* Section Divider */}
        <div style={{ height: '8px', backgroundColor: colors.slate[100] }} />

        {/* ========== SECTION 4: Key Highlights ========== */}
        <div 
          className="p-6"
          style={{ backgroundColor: colors.white }}
        >
          <SectionHeader 
            sectionNumber={4} 
            title="Key Highlights" 
            subtitle="Critical insights from exploration and testing"
          />
          <HighlightCardsV2 highlights={data.highlights} />
        </div>

        {/* Section Divider */}
        <div style={{ height: '8px', backgroundColor: colors.slate[100] }} />

        {/* ========== SECTION 5: Next Steps ========== */}
        <div 
          className="p-6"
          style={{ backgroundColor: colors.white }}
        >
          <SectionHeader 
            sectionNumber={5} 
            title="Next Steps" 
            subtitle="Recommended actions to move forward"
          />
          <NextStepsV2 nextSteps={data.nextSteps} />
        </div>

        {/* Footer */}
        <div 
          className="px-6 py-4"
          style={{ 
            backgroundColor: colors.navy,
          }}
        >
          <div className="flex items-center justify-between text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <span>Generated by The Olsenator • Innovera.ai</span>
            <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
