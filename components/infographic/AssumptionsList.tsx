'use client';

import { CriticalAssumption } from '@/lib/schema';
import { colors, typography, getAssumptionColor, getAssumptionBgColor } from '@/lib/infographic-styles';

interface AssumptionsListProps {
  assumptions: CriticalAssumption[];
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'validated':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    case 'pending':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      );
    case 'at-risk':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    default:
      return null;
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'validated':
      return 'Validated';
    case 'pending':
      return 'Pending';
    case 'at-risk':
      return 'At Risk';
    default:
      return status;
  }
}

export function AssumptionsList({ assumptions }: AssumptionsListProps) {
  if (assumptions.length === 0) return null;

  // Group by status for better organization
  const validated = assumptions.filter(a => a.status === 'validated');
  const pending = assumptions.filter(a => a.status === 'pending');
  const atRisk = assumptions.filter(a => a.status === 'at-risk');

  return (
    <div 
      className="avoid-break rounded-lg p-6"
      style={{ 
        backgroundColor: colors.white,
        border: `1px solid ${colors.slate[200]}`,
      }}
    >
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
          Critical Assumptions
        </h2>
      </div>

      <p 
        className="text-sm mb-4"
        style={{ color: colors.slate[500] }}
      >
        What you would have to believe for this investment to succeed
      </p>

      <div className="space-y-2">
        {/* At Risk First (most important) */}
        {atRisk.map((assumption, index) => (
          <AssumptionItem key={`at-risk-${index}`} assumption={assumption} />
        ))}
        
        {/* Pending */}
        {pending.map((assumption, index) => (
          <AssumptionItem key={`pending-${index}`} assumption={assumption} />
        ))}
        
        {/* Validated Last */}
        {validated.map((assumption, index) => (
          <AssumptionItem key={`validated-${index}`} assumption={assumption} />
        ))}
      </div>

      {/* Summary Stats */}
      <div 
        className="flex items-center gap-4 mt-4 pt-4"
        style={{ borderTop: `1px solid ${colors.slate[200]}` }}
      >
        <div className="flex items-center gap-2">
          <span 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: colors.assumption.validated }}
          />
          <span className="text-xs" style={{ color: colors.slate[500] }}>
            {validated.length} Validated
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: colors.assumption.pending }}
          />
          <span className="text-xs" style={{ color: colors.slate[500] }}>
            {pending.length} Pending
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: colors.assumption.atRisk }}
          />
          <span className="text-xs" style={{ color: colors.slate[500] }}>
            {atRisk.length} At Risk
          </span>
        </div>
      </div>
    </div>
  );
}

function AssumptionItem({ assumption }: { assumption: CriticalAssumption }) {
  const statusColor = getAssumptionColor(assumption.status);
  const statusBgColor = getAssumptionBgColor(assumption.status);

  return (
    <div 
      className="flex items-start gap-3 p-3 rounded-lg"
      style={{ backgroundColor: statusBgColor }}
    >
      <div 
        className="flex-shrink-0 mt-0.5"
        style={{ color: statusColor }}
      >
        {getStatusIcon(assumption.status)}
      </div>
      <div className="flex-1 min-w-0">
        <span 
          className="text-sm leading-relaxed"
          style={{ 
            color: colors.slate[700],
            lineHeight: typography.lineHeight.relaxed,
          }}
        >
          {assumption.assumption}
        </span>
      </div>
      <span 
        className="flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded"
        style={{ 
          color: statusColor,
          backgroundColor: colors.white,
        }}
      >
        {getStatusLabel(assumption.status)}
      </span>
    </div>
  );
}

