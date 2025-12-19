'use client';

import { useState, useEffect } from 'react';
import { Chapters, KajimaChapters } from '@/lib/schema';
import { colors, typography } from '@/lib/infographic-styles';
import { getLabels } from '@/lib/kajima-labels';

interface ChapterSummariesProps {
  chapters: Chapters | KajimaChapters;
  kajimaMode?: boolean;
}

type ChapterTab = 'team' | 'opportunity' | 'path' | 'operations';

export function ChapterSummaries({ chapters, kajimaMode = false }: ChapterSummariesProps) {
  const labels = getLabels(kajimaMode);
  const [activeTab, setActiveTab] = useState<ChapterTab>(kajimaMode ? 'opportunity' : 'team');

  // Update default tab when kajimaMode changes
  useEffect(() => {
    if (kajimaMode && activeTab === 'team') {
      setActiveTab('opportunity');
    }
  }, [kajimaMode, activeTab]);

  const allTabs: { id: ChapterTab; label: string }[] = [
    { id: 'team', label: labels.team },
    { id: 'opportunity', label: kajimaMode ? labels.opportunityValidation : 'Opportunity' },
    { id: 'path', label: labels.pathToSuccess },
    { id: 'operations', label: labels.operations },
  ];

  // Filter out team tab in Kajima mode
  const tabs = kajimaMode ? allTabs.filter(tab => tab.id !== 'team') : allTabs;

  return (
    <div 
      className="page-break-before rounded-lg overflow-hidden"
      style={{ 
        backgroundColor: colors.white,
        border: `1px solid ${colors.slate[200]}`,
      }}
    >
      <div className="flex items-center gap-2 p-6 pb-4">
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
          {labels.detailedAnalysis}
        </h2>
      </div>

      {/* Tabs */}
      <div 
        className="flex border-b px-6 no-print"
        style={{ borderColor: colors.slate[200] }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-3 text-sm font-medium transition-colors relative"
            style={{ 
              color: activeTab === tab.id ? colors.navy : colors.slate[500],
            }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: colors.navy }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content - Screen View */}
      <div className="p-6 no-print">
        {activeTab === 'team' && !kajimaMode && <TeamChapter team={(chapters as Chapters).team} kajimaMode={kajimaMode} />}
        {activeTab === 'opportunity' && <OpportunityChapter opportunity={chapters.opportunityValidation} kajimaMode={kajimaMode} />}
        {activeTab === 'path' && <PathChapter path={chapters.pathToSuccess} kajimaMode={kajimaMode} />}
        {activeTab === 'operations' && <OperationsChapter operations={chapters.operations} kajimaMode={kajimaMode} />}
      </div>

      {/* Print View - Show All */}
      <div className="p-6 print-only hidden print:block">
        <div className="space-y-8">
          {!kajimaMode && (
            <div>
              <h3 
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: colors.navy }}
              >
                {labels.teamAnalysis}
              </h3>
              <TeamChapter team={(chapters as Chapters).team} kajimaMode={kajimaMode} />
            </div>
          )}
          <div>
            <h3 
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: colors.navy }}
            >
              {labels.opportunityValidation}
            </h3>
            <OpportunityChapter opportunity={chapters.opportunityValidation} kajimaMode={kajimaMode} />
          </div>
          <div>
            <h3 
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: colors.navy }}
            >
              {labels.pathToSuccess}
            </h3>
            <PathChapter path={chapters.pathToSuccess} kajimaMode={kajimaMode} />
          </div>
          <div>
            <h3 
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: colors.navy }}
            >
              {labels.operations}
            </h3>
            <OperationsChapter operations={chapters.operations} kajimaMode={kajimaMode} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamChapter({ team, kajimaMode }: { team: Chapters['team']; kajimaMode: boolean }) {
  const labels = getLabels(kajimaMode);
  return (
    <div className="space-y-4">
      <Section title={labels.capabilityAssessment} content={team.capabilityAssessment} />
      {team.identifiedGaps.length > 0 && (
        <Section title={labels.identifiedGaps} items={team.identifiedGaps} />
      )}
      {team.dataPoints.length > 0 && (
        <DataPoints items={team.dataPoints} kajimaMode={kajimaMode} />
      )}
    </div>
  );
}

function OpportunityChapter({ opportunity, kajimaMode }: { opportunity: Chapters['opportunityValidation']; kajimaMode: boolean }) {
  const labels = getLabels(kajimaMode);
  return (
    <div className="space-y-4">
      <Section title={labels.problemStatement} content={opportunity.problemStatement} />
      <Section title={labels.marketSize} content={opportunity.marketSize} />
      <Section title={labels.competitivePositioning} content={opportunity.competitivePositioning} />
      {opportunity.dataPoints.length > 0 && (
        <DataPoints items={opportunity.dataPoints} kajimaMode={kajimaMode} />
      )}
    </div>
  );
}

function PathChapter({ path, kajimaMode }: { path: Chapters['pathToSuccess']; kajimaMode: boolean }) {
  const labels = getLabels(kajimaMode);
  return (
    <div className="space-y-4">
      <Section title={labels.productRequirements} content={path.productRequirements} />
      <Section title={labels.goToMarket} content={path.goToMarket} />
      <Section title={labels.revenueModel} content={path.revenueModel} />
      {path.dataPoints.length > 0 && (
        <DataPoints items={path.dataPoints} kajimaMode={kajimaMode} />
      )}
    </div>
  );
}

function OperationsChapter({ operations, kajimaMode }: { operations: Chapters['operations']; kajimaMode: boolean }) {
  const labels = getLabels(kajimaMode);
  const metrics = [
    { label: labels.irr, value: operations.irr },
    { label: labels.paybackPeriod, value: operations.paybackPeriod },
    { label: labels.margins, value: operations.margins },
  ].filter(m => m.value);

  return (
    <div className="space-y-4">
      {metrics.length > 0 && (
        <div 
          className="grid grid-cols-3 gap-4 p-4 rounded-lg"
          style={{ backgroundColor: colors.slate[50] }}
        >
          {metrics.map((metric, index) => (
            <div key={index}>
              <span 
                className="text-xs font-medium uppercase tracking-wider block mb-1"
                style={{ color: colors.slate[500] }}
              >
                {metric.label}
              </span>
              <span 
                className="text-lg font-semibold"
                style={{ color: colors.navy }}
              >
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      )}
      {operations.operationalRisks.length > 0 && (
        <Section title={labels.operationalRisks} items={operations.operationalRisks} isWarning />
      )}
      {operations.dataPoints.length > 0 && (
        <DataPoints items={operations.dataPoints} kajimaMode={kajimaMode} />
      )}
    </div>
  );
}

function Section({ 
  title, 
  content, 
  items, 
  isWarning 
}: { 
  title: string; 
  content?: string; 
  items?: string[]; 
  isWarning?: boolean;
}) {
  return (
    <div>
      <h4 
        className="text-xs font-medium uppercase tracking-wider mb-2"
        style={{ color: colors.slate[500] }}
      >
        {title}
      </h4>
      {content && (
        <p 
          className="text-sm leading-relaxed"
          style={{ 
            color: colors.slate[600],
            lineHeight: typography.lineHeight.relaxed,
          }}
        >
          {content}
        </p>
      )}
      {items && items.length > 0 && (
        <ul className="space-y-1">
          {items.map((item, index) => (
            <li 
              key={index}
              className="flex items-start gap-2 text-sm"
            >
              <span 
                className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: isWarning ? colors.risk.amber : colors.slate[400] }}
              />
              <span 
                style={{ 
                  color: colors.slate[600],
                  lineHeight: typography.lineHeight.relaxed,
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DataPoints({ items, kajimaMode }: { items: string[]; kajimaMode: boolean }) {
  const labels = getLabels(kajimaMode);
  if (items.length === 0) return null;
  
  return (
    <div 
      className="p-3 rounded-lg"
      style={{ backgroundColor: colors.slate[50] }}
    >
      <h4 
        className="text-xs font-medium uppercase tracking-wider mb-2"
        style={{ color: colors.slate[500] }}
      >
        {labels.supportingData}
      </h4>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li 
            key={index}
            className="text-xs"
            style={{ color: colors.slate[500] }}
          >
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

