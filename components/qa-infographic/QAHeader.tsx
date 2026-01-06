'use client';

import { QAMetadata } from '@/lib/qa-schema';
import { colors, typography } from '@/lib/infographic-styles';

interface QAHeaderProps {
  metadata: QAMetadata;
}

export function QAHeader({ metadata }: QAHeaderProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.navy} 0%, #1e3a5f 100%)`,
      }}
    >
      {/* Decorative Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative px-8 py-8">
        {/* Top Row - Logo and Document Type */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span 
              className="text-lg tracking-[0.15em] font-light"
              style={{ color: 'rgba(255,255,255,0.9)' }}
            >
              INNOV<span style={{ color: colors.teal }}>E</span>RA
            </span>
          </div>
          
          <div 
            className="px-4 py-2 rounded-full text-sm font-medium"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: colors.white,
            }}
          >
            Q&A Response Analysis
          </div>
        </div>

        {/* Main Title */}
        <div className="mb-6">
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ 
              color: colors.white,
              fontFamily: typography.fontFamily.sans,
              fontWeight: typography.fontWeight.bold,
            }}
          >
            {metadata.projectName}
          </h1>
          <p 
            className="text-lg opacity-80"
            style={{ color: colors.white }}
          >
            {metadata.documentTitle}
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.teal }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-white text-sm font-medium">
              {metadata.questionCount} Questions
            </span>
          </div>
          
          {metadata.date && (
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.teal }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-white text-sm font-medium">
                {metadata.date}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
