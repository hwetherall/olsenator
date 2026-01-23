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

export function ProcessSection({ analysis, language = 'en' }: ProcessSectionProps) {
  // State for modal
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Helper to render modal content based on selected option
  const renderModalContent = () => {
    if (selectedOption === 'Option 1') {
      return (
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
            <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">Recommendation</h4>
            <p className="text-emerald-900 font-medium">{analysis.path_summary.recommendation}</p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">Strategy</h4>
            <p className="text-slate-600 leading-relaxed">
              Integrate with an existing civic-tech player like Dappi Studio LLC (FixMyStreet Japan) via API to handle citizen reporting. NLM builds the downstream workflow engine that converts these reports into professional engineering tasks.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-3">Pros</h4>
            <ul className="space-y-3">
              {analysis.path_advantages.map((adv, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <strong className="block text-slate-800 font-semibold">{adv.advantage}</strong>
                    <span className="text-slate-600 text-sm">{adv.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-3">Cons</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="text-slate-600 text-sm">Creates dependency on third-party roadmaps; requires successful API integration negotiation.</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-6 mt-6">
            <h4 className="text-lg font-bold text-slate-800 mb-3">Recommended Engagement Model</h4>
            <div className="grid gap-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Lead Unit</span>
                <p className="text-sm text-slate-700">New Business Planning & Strategy Division acts as the "Venture Lead," responsible for the platform business model.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Domain Expert</span>
                <p className="text-sm text-slate-700">Nikkei Engineering acts as the "Technical Anchor," defining the inspection protocols (Steps 2–3).</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Orchestration Role</span>
                <p className="text-sm text-slate-700">NLM functions as the Platform Orchestrator, managing the data flow between citizens, municipalities, and external contractors.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (selectedOption === 'Option 2') {
      return (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">Strategy</h4>
            <p className="text-slate-600 leading-relaxed">
              Build a closed ecosystem where NLM owns all data and user interfaces. Develop a proprietary "Super-App" covering the entire lifecycle from citizen reporting to construction management (Steps 1–5).
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-3">Pros</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-600 text-sm">Maximum control over data security and user experience; eliminates vendor dependencies.</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-3">Cons (Why Rejected)</h4>
            <ul className="space-y-3">
              {analysis.alternatives_considered
                .filter(alt => alt.alternative.includes('Option 2') || alt.alternative.includes('Internal Build'))
                .map((alt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <strong className="block text-slate-800 font-semibold">{alt.why_not_preferred}</strong>
                      <span className="text-slate-600 text-sm">Custom software development involves significant upfront costs and maintenance liabilities.</span>
                    </div>
                  </li>
                ))}
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-slate-800 font-semibold">Redundancy</strong>
                  <span className="text-slate-600 text-sm">Replicates existing free tools (e.g., LINE reporting, FixMyStreet), potentially slowing municipal adoption due to switching costs.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    if (selectedOption === 'Option 3') {
      return (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">Strategy</h4>
            <p className="text-slate-600 leading-relaxed">
              Acquire a player like Dappi Studio LLC to own the "Step 1" entry point. Immediately secure the technology stack and user base.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-3">Pros</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-600 text-sm">Immediate market share and talent acquisition.</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-3">Cons (Why Rejected)</h4>
            <ul className="space-y-3">
              {analysis.alternatives_considered
                .filter(alt => alt.alternative.includes('Option 3') || alt.alternative.includes('Acquisition'))
                .map((alt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <strong className="block text-slate-800 font-semibold">{alt.why_not_preferred}</strong>
                      <span className="text-slate-600 text-sm">GovTech valuations are rising, with multiples reaching high double-digits.</span>
                    </div>
                  </li>
                ))}
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <strong className="block text-slate-800 font-semibold">Integration Risk</strong>
                  <span className="text-slate-600 text-sm">Cultural mismatch between a nimble civic-tech startup and a large corporate entity could stifle innovation.</span>
                </div>
              </li>
            </ul>
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
            <h2 className="text-base font-bold text-slate-800">Path Selection Analysis</h2>
          </div>
        </div>

        {/* Path Selection Content */}
        <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Option 1: Recommended */}
              <div 
                onClick={() => setSelectedOption('Option 1')}
                className="relative rounded-xl border-2 border-emerald-500 bg-white shadow-lg transform lg:-translate-y-2 z-10 flex flex-col cursor-pointer hover:shadow-xl transition-shadow group"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm group-hover:bg-emerald-600 transition-colors">
                  Recommended
                </div>
                <div className="p-6 border-b border-slate-100 bg-emerald-50/10">
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Option 1: Partnership-Led</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Focus on Steps 2–3 (Inspection/Design) while partnering for Step 1.
                  </p>
                </div>
                <div className="p-6 space-y-4 flex-grow">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-2">Pros</span>
                    <ul className="space-y-2">
                      {analysis.path_advantages.slice(0, 2).map((adv, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <svg className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="line-clamp-2"><strong className="font-semibold">{adv.advantage}:</strong> {adv.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto pt-4 text-center">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider group-hover:underline">View Details & Strategy</span>
                  </div>
                </div>
              </div>

              {/* Option 2: Full Build */}
              <div 
                onClick={() => setSelectedOption('Option 2')}
                className="rounded-xl border border-slate-200 bg-slate-50 opacity-90 hover:opacity-100 transition-all cursor-pointer hover:shadow-md hover:border-slate-300 flex flex-col group"
              >
                <div className="p-6 border-b border-slate-200">
                  <h4 className="text-lg font-bold text-slate-600 mb-2">Option 2: Full Internal Build</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Build proprietary "Super-App" covering entire lifecycle (Steps 1–5).
                  </p>
                </div>
                <div className="p-6 space-y-4 flex-grow">
                  <div>
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block mb-2">Why Rejected</span>
                    <ul className="space-y-2">
                      {analysis.alternatives_considered
                        .filter(alt => alt.alternative.includes('Option 2') || alt.alternative.includes('Internal Build'))
                        .slice(0, 2)
                        .map((alt, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                            <svg className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-clamp-2">{alt.why_not_preferred}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="mt-auto pt-4 text-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 group-hover:underline">View Analysis</span>
                  </div>
                </div>
              </div>

              {/* Option 3: Acquisition */}
              <div 
                onClick={() => setSelectedOption('Option 3')}
                className="rounded-xl border border-slate-200 bg-slate-50 opacity-90 hover:opacity-100 transition-all cursor-pointer hover:shadow-md hover:border-slate-300 flex flex-col group"
              >
                <div className="p-6 border-b border-slate-200">
                  <h4 className="text-lg font-bold text-slate-600 mb-2">Option 3: Acquisition</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Acquire a GovTech startup to secure tech stack and user base immediately.
                  </p>
                </div>
                <div className="p-6 space-y-4 flex-grow">
                  <div>
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block mb-2">Why Rejected</span>
                    <ul className="space-y-2">
                      {analysis.alternatives_considered
                        .filter(alt => alt.alternative.includes('Option 3') || alt.alternative.includes('Acquisition'))
                        .slice(0, 2)
                        .map((alt, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                            <svg className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="line-clamp-2">{alt.why_not_preferred}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="mt-auto pt-4 text-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 group-hover:underline">View Analysis</span>
                  </div>
                </div>
              </div>

            </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedOption}
        onClose={() => setSelectedOption(null)}
        title={selectedOption === 'Option 1' ? 'Option 1: Partnership-Led Narrow Platform' : selectedOption === 'Option 2' ? 'Option 2: Full Internal Build' : 'Option 3: Strategic Acquisition'}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
}
