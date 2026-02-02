'use client';

import { useState } from 'react';
import { SupportingAnalysis } from '@/lib/v2-schema';
import { Language, t } from '@/lib/v2-translations';

interface ProcessSectionProps {
  analysis: SupportingAnalysis;
  language?: Language;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

// Comparison Table Component
function ComparisonTable({ language }: { language: Language }) {
  const dimensions = [
    {
      key: 'riskLevel',
      option1: 'option1RiskLevel',
      option2: 'option2RiskLevel',
      option3: 'option3RiskLevel',
    },
    {
      key: 'capitalRequired',
      option1: 'option1Capital',
      option2: 'option2Capital',
      option3: 'option3Capital',
    },
    {
      key: 'timeToValue',
      option1: 'option1TimeToValue',
      option2: 'option2TimeToValue',
      option3: 'option3TimeToValue',
    },
    {
      key: 'keyStrength',
      option1: 'option1Strength',
      option2: 'option2Strength',
      option3: 'option3Strength',
    },
    {
      key: 'keyWeakness',
      option1: 'option1Weakness',
      option2: 'option2Weakness',
      option3: 'option3Weakness',
    },
    {
      key: 'deRiskability',
      option1: 'option1DeRisk',
      option2: 'option2DeRisk',
      option3: 'option3DeRisk',
    },
  ];

  return (
    <div className="mb-6 overflow-x-auto">
      <div className="inline-block min-w-full">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-3 text-left font-bold text-slate-700 border-b border-slate-200 min-w-[120px]">
                {t('dimension', language)}
              </th>
              <th className="p-3 text-center font-bold text-slate-500 border-b border-slate-200 min-w-[140px]">
                {t('option1StatusQuo', language)}
              </th>
              <th className="p-3 text-center font-bold text-emerald-700 border-b-2 border-emerald-500 bg-emerald-50 min-w-[160px]">
                <div className="flex items-center justify-center gap-1">
                  <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {t('option2NarrowPlatform', language)}
                </div>
              </th>
              <th className="p-3 text-center font-bold text-slate-500 border-b border-slate-200 min-w-[140px]">
                {t('option3EndToEnd', language)}
              </th>
            </tr>
          </thead>
          <tbody>
            {dimensions.map((dim, idx) => (
              <tr key={dim.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                <td className="p-3 font-semibold text-slate-700 border-b border-slate-100">
                  {t(dim.key as keyof typeof import('@/lib/v2-translations').translations, language)}
                </td>
                <td className="p-3 text-center text-slate-600 border-b border-slate-100">
                  {t(dim.option1 as keyof typeof import('@/lib/v2-translations').translations, language)}
                </td>
                <td className="p-3 text-center text-emerald-800 font-medium border-b border-emerald-100 bg-emerald-50/30">
                  {t(dim.option2 as keyof typeof import('@/lib/v2-translations').translations, language)}
                </td>
                <td className="p-3 text-center text-slate-600 border-b border-slate-100">
                  {t(dim.option3 as keyof typeof import('@/lib/v2-translations').translations, language)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ProcessSection({ analysis, language = 'en' }: ProcessSectionProps) {
  // State for modal
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Helper to render modal content based on selected option
  const renderModalContent = () => {
    // Option 1: Status Quo (Not Recommended)
    if (selectedOption === 'Option 1') {
      return (
        <div className="space-y-6">
          {/* Strategy Overview */}
          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">{t('strategy', language)}</h4>
            <p className="text-slate-600 leading-relaxed">
              {t('option1StrategyDetail', language)}
            </p>
          </div>

          {/* Pros */}
          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-3">{t('pros', language)}</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-slate-800 font-semibold">{t('option1Strength', language)}</strong>
                  <span className="text-slate-600 text-sm">Zero incremental capital required. No execution risk from software development.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Why Not Selected */}
          <div className="bg-red-50 border border-red-100 rounded-lg p-4">
            <h4 className="text-sm font-bold text-red-800 uppercase tracking-wider mb-2">{t('whyRejected', language)}</h4>
            <p className="text-red-900 text-sm leading-relaxed">
              {t('option1WhyNotSelected', language)}
            </p>
          </div>

          {/* When This Option Would Be Preferred */}
          <div className="border-t border-slate-100 pt-6">
            <h4 className="text-lg font-bold text-slate-800 mb-3">{t('whenPreferred', language)}</h4>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-slate-600 text-sm leading-relaxed">
                {t('option1WhenPreferred', language)}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Option 2: Narrow Platform (Recommended)
    if (selectedOption === 'Option 2') {
      return (
        <div className="space-y-6">
          {/* Recommendation Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wider">{t('recommended', language)}</h4>
            </div>
            <p className="text-emerald-900 font-medium">{analysis.path_summary.recommendation}</p>
          </div>
          
          {/* Strategy Overview */}
          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">{t('strategy', language)}</h4>
            <p className="text-slate-600 leading-relaxed">
              {t('option2StrategyDetail', language)}
            </p>
          </div>

          {/* Rationale - Three Key Factors */}
          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-3">{t('rationale', language)}</h4>
            <p className="text-slate-600 text-sm mb-4">{t('option2RationaleIntro', language)}</p>
            <div className="space-y-4">
              {/* Competitive Moat */}
              <div className="flex items-start gap-3 bg-emerald-50/50 rounded-lg p-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-700 font-bold text-xs">1</span>
                </div>
                <div>
                  <strong className="block text-emerald-800 font-semibold">{t('option2Rationale1Title', language)}</strong>
                  <span className="text-slate-600 text-sm">{t('option2Rationale1Detail', language)}</span>
                </div>
              </div>
              
              {/* Capital Efficiency */}
              <div className="flex items-start gap-3 bg-emerald-50/50 rounded-lg p-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-700 font-bold text-xs">2</span>
                </div>
                <div>
                  <strong className="block text-emerald-800 font-semibold">{t('option2Rationale2Title', language)}</strong>
                  <span className="text-slate-600 text-sm">{t('option2Rationale2Detail', language)}</span>
                </div>
              </div>
              
              {/* Market Fit */}
              <div className="flex items-start gap-3 bg-emerald-50/50 rounded-lg p-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-700 font-bold text-xs">3</span>
                </div>
                <div>
                  <strong className="block text-emerald-800 font-semibold">{t('option2Rationale3Title', language)}</strong>
                  <span className="text-slate-600 text-sm">{t('option2Rationale3Detail', language)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cons / Risks */}
          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-3">{t('cons', language)}</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="text-slate-600 text-sm">{t('option2ConsDetail', language)}</span>
              </li>
            </ul>
          </div>

          {/* Engagement Model */}
          <div className="border-t border-slate-100 pt-6">
            <h4 className="text-lg font-bold text-slate-800 mb-3">{t('recommendedEngagementModel', language)}</h4>
            <div className="grid gap-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t('leadUnit', language)}</span>
                <p className="text-sm text-slate-700">{t('leadUnitDetail', language)}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t('domainExpert', language)}</span>
                <p className="text-sm text-slate-700">{t('domainExpertDetail', language)}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t('orchestrationRole', language)}</span>
                <p className="text-sm text-slate-700">{t('orchestrationRoleDetail', language)}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Option 3: End-to-End Platform (Not Recommended)
    if (selectedOption === 'Option 3') {
      return (
        <div className="space-y-6">
          {/* Strategy Overview */}
          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">{t('strategy', language)}</h4>
            <p className="text-slate-600 leading-relaxed">
              {t('option3StrategyDetail', language)}
            </p>
          </div>

          {/* Pros */}
          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-3">{t('pros', language)}</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-slate-800 font-semibold">{t('option3Strength', language)}</strong>
                  <span className="text-slate-600 text-sm">{t('option3ProsDetail', language)}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Why Not Selected */}
          <div className="bg-red-50 border border-red-100 rounded-lg p-4">
            <h4 className="text-sm font-bold text-red-800 uppercase tracking-wider mb-2">{t('whyRejected', language)}</h4>
            <p className="text-red-900 text-sm leading-relaxed">
              {t('option3WhyNotSelected', language)}
            </p>
          </div>

          {/* When This Option Would Be Preferred */}
          <div className="border-t border-slate-100 pt-6">
            <h4 className="text-lg font-bold text-slate-800 mb-3">{t('whenPreferred', language)}</h4>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-slate-600 text-sm leading-relaxed">
                {t('option3WhenPreferred', language)}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Section Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7" />
              </svg>
            </div>
            <h2 className="text-base font-bold text-slate-800">{t('pathSelectionAnalysis', language)}</h2>
          </div>
        </div>

        {/* Path Selection Content */}
        <div className="p-6">
          {/* Option Cards - Option 2 (Narrow Platform) is now recommended */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Option 1: Status Quo (Not Recommended) */}
            <div 
              onClick={() => setSelectedOption('Option 1')}
              className="rounded-xl border border-slate-200 bg-slate-50 opacity-90 hover:opacity-100 transition-all cursor-pointer hover:shadow-md hover:border-slate-300 flex flex-col group"
            >
              <div className="p-6 border-b border-slate-200">
                <h4 className="text-lg font-bold text-slate-600 mb-2">{t('option1StatusQuo', language)}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('option1Description', language)}
                </p>
              </div>
              <div className="p-6 space-y-4 flex-grow">
                <div>
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block mb-2">{t('whyRejected', language)}</span>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-xs text-slate-600">
                      <svg className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="line-clamp-2">High strategic risk of commoditization as competitors digitize</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-slate-600">
                      <svg className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="line-clamp-2">Fails to establish new scalable profit center</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto pt-4 text-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 group-hover:underline">{t('viewAnalysis', language)}</span>
                </div>
              </div>
            </div>

            {/* Option 2: Narrow Platform (Recommended) - Center position, elevated */}
            <div 
              onClick={() => setSelectedOption('Option 2')}
              className="relative rounded-xl border-2 border-emerald-500 bg-white shadow-lg transform lg:-translate-y-2 z-10 flex flex-col cursor-pointer hover:shadow-xl transition-shadow group"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm group-hover:bg-emerald-600 transition-colors">
                {t('recommended', language)}
              </div>
              <div className="p-6 border-b border-slate-100 bg-emerald-50/10">
                <h4 className="text-lg font-bold text-slate-800 mb-2">{t('option2NarrowPlatform', language)}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t('option2Description', language)}
                </p>
              </div>
              <div className="p-6 space-y-4 flex-grow">
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-2">{t('rationale', language)}</span>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-xs text-slate-700">
                      <svg className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="line-clamp-2"><strong className="font-semibold">{t('option2Rationale1Title', language)}:</strong> Legal licensure creates defensible moat</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-slate-700">
                      <svg className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="line-clamp-2"><strong className="font-semibold">{t('option2Rationale2Title', language)}:</strong> Concierge MVP validates in months</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-slate-700">
                      <svg className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="line-clamp-2"><strong className="font-semibold">{t('option2Rationale3Title', language)}:</strong> Addresses municipal labor shortage</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto pt-4 text-center">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider group-hover:underline">{t('viewDetailsStrategy', language)}</span>
                </div>
              </div>
            </div>

            {/* Option 3: End-to-End Platform (Not Recommended) */}
            <div 
              onClick={() => setSelectedOption('Option 3')}
              className="rounded-xl border border-slate-200 bg-slate-50 opacity-90 hover:opacity-100 transition-all cursor-pointer hover:shadow-md hover:border-slate-300 flex flex-col group"
            >
              <div className="p-6 border-b border-slate-200">
                <h4 className="text-lg font-bold text-slate-600 mb-2">{t('option3EndToEnd', language)}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('option3Description', language)}
                </p>
              </div>
              <div className="p-6 space-y-4 flex-grow">
                <div>
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block mb-2">{t('whyRejected', language)}</span>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-xs text-slate-600">
                      <svg className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="line-clamp-2">Legal barrier: Design/construction separation required</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-slate-600">
                      <svg className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="line-clamp-2">Requires massive capital, 3.5+ year timeline</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto pt-4 text-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 group-hover:underline">{t('viewAnalysis', language)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Comparative Summary Table - Moved below option cards */}
          <div className="mt-8">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">{t('comparativeSummary', language)}</h3>
            <ComparisonTable language={language} />
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedOption}
        onClose={() => setSelectedOption(null)}
        title={selectedOption === 'Option 1' ? t('option1ModalTitle', language) : selectedOption === 'Option 2' ? t('option2ModalTitle', language) : t('option3ModalTitle', language)}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
}
