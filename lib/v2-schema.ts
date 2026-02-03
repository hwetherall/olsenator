/**
 * V2 Extraction Schema for The Olsenator
 * 
 * This schema defines the structure of JSON data for the V2 executive investment infographic.
 * Designed for visualization-ready rendering with quadrant plots, polarity indicators, and decision pathways.
 */

// ============================================
// Section 0: Identification & Core Question
// ============================================

export interface Identification {
  project_name: string;
  one_liner: string;
  stage: string;
  sector: string;
  geography: string;
}

export interface Confidence {
  rating: "High" | "Medium-High" | "Medium" | "Medium-Low" | "Low";
  percentage: number | null;
}

export interface QuestionAndAnswer {
  the_question: string;
  the_answer: string;
  confidence: Confidence;
}

export interface Thesis {
  the_prize: string;
  the_risk: string;
  the_unlock: string;
}

// ============================================
// Section 1: Strategic Fit Assessment
// ============================================

export interface ThePrizeDetail {
  market_size: string;
  margins: string;
  durability: string;
  bottom_line: string;
}

export interface StrategicFitDetail {
  bet_type: string;
  portfolio_fit: string;
  priority_alignment: string;
  bottom_line: string;
}

export interface OurEdgeDetail {
  unfair_advantages: string[];
  why_us: string;
  bottom_line: string;
}

export interface SectionVerdict {
  decision: "Yes" | "No" | "Borderline";
  confidence: "High" | "Medium" | "Low";
  rationale: string;
}

export interface ShouldWeDoIt {
  the_prize: ThePrizeDetail;
  strategic_fit: StrategicFitDetail;
  our_edge: OurEdgeDetail;
  verdict: SectionVerdict;
}

export interface CapitalAndInfrastructure {
  cash_position: string;
  facilities: string;
  tools_and_systems: string;
  bottom_line: string;
}

export interface MarketAccess {
  customer_relationships: string;
  geographic_presence: string;
  regulatory_experience: string;
  bottom_line: string;
}

export interface People {
  skills: string;
  experience: string;
  bandwidth: string;
  bottom_line: string;
}

export interface CanWeDoIt {
  capital_and_infrastructure: CapitalAndInfrastructure;
  market_access: MarketAccess;
  people: People;
  verdict: SectionVerdict;
}

export interface FinalVerdict {
  verdict_title: string; // AI-generated 2-5 word summary of the recommended path forward (e.g., "Narrow Platform First", "Full Vertical Integration")
  decision: "Conditional" | "Proceed" | "Pass";
  condition: string; // Subtitle with more detail explaining the verdict
  confidence: "High" | "Medium" | "Low";
}

export interface Synthesis {
  alignment: string;
  divergence: string;
  gap_to_close: string;
  final_verdict: FinalVerdict;
}

// ============================================
// Section 2: Gap Analysis
// ============================================

export type GapQuadrant = "Dealbreaker" | "Priority Investment" | "Quick Win" | "Mixed" | "Manageable";

export interface GapScore {
  score: number; // 1-5
  label: "Critical" | "Large" | "Medium" | "Small";
}

export interface EaseScore {
  score: number; // 1-5
  label: "Very Hard" | "Hard" | "Medium" | "Easy" | "Very Easy";
}

export interface Gap {
  dimension: string;
  category: "core" | "optional";
  current_state: string;
  required_state: string;
  gap_summary: string;
  gap_size: GapScore;
  ease_of_closing: EaseScore;
  quadrant: GapQuadrant;
  why_easy_or_hard: string;
  action_to_close: string;
  risk_of_inaction?: string; // New field
  owner?: string; // New field
}

export interface GapSummary {
  total_dimensions_assessed: number;
  dealbreakers: string[];
  priority_investments: string[];
  quick_wins: string[];
  manageable: string[];
  mixed: string[];
  overall_gap_assessment: string;
}

// ============================================
// Section 3: Key Highlights
// ============================================

export type Polarity = "tailwind" | "headwind";
export type SourceConfidence = "verified" | "estimated" | "assumed";

export interface TimeSensitivity {
  is_time_bound: boolean;
  window: string | null;
}

export interface HighlightV2 {
  highlight: string;
  category: "Market" | "Financial" | "Team" | "Risk" | "Competitive" | "Strategic" | "Technology" | "Regulatory";
  why_it_matters: string;
  context_grounding: string;
  polarity: Polarity;
  time_sensitivity: TimeSensitivity;
  source_confidence: SourceConfidence;
}

export interface HighlightsMetadata {
  total_highlights: number;
  tailwinds: number;
  headwinds: number;
  neutral: number;
  balance_check: string;
}

// ============================================
// Section 4: Next Steps / Decision Pathway
// ============================================

export type StepOwner = "venture" | "joint" | "investor";
export type FailureAction = "pivot" | "pass" | "reassess";

export interface FailureCondition {
  action: FailureAction;
  detail: string;
}

export interface NextStepV2 {
  step_number: number;
  step_title: string;
  owner: StepOwner;
  description: string;
  timeline: string;
  depends_on: number[] | null;
  success_gate: string;
  unlocks: string;
  if_gate_fails: FailureCondition;
}

export interface PathwayMetadata {
  total_steps: number;
  critical_path_duration: string;
  ultimate_decision: string;
  pathway_confidence: "High" | "Medium" | "Low";
}

// ============================================
// Section 5: Supporting Analysis (Optional)
// ============================================

export interface ExploredAndTested {
  headline: string;
  insight: string;
  source_chapter: string;
}

export interface RiskAcknowledged {
  headline: string;
  insight: string;
  severity: "high" | "medium" | "low";
  source_chapter: string;
}

export interface TradeOffResolved {
  trade_off: string;
  resolution: string;
  supporting_evidence: string;
  source_chapters: string[];
  confidence: "high" | "medium" | "low";
}

export interface AlternativeConsidered {
  alternative: string;
  why_not_preferred: string;
  source_chapters: string[];
  confidence: "high" | "medium" | "low";
}

export interface PathAdvantage {
  advantage: string;
  description: string;
  source_chapter: string;
  confidence: "high" | "medium" | "low";
}

export interface PathSummary {
  recommendation: string;
  path_description: string;
  confidence: "high" | "medium" | "low";
}

export interface SupportingAnalysis {
  explored_and_tested: ExploredAndTested[];
  risks_acknowledged: RiskAcknowledged[];
  path_summary: PathSummary;
  key_trade_offs_resolved: TradeOffResolved[];
  alternatives_considered: AlternativeConsidered[];
  path_advantages: PathAdvantage[];
}

// ============================================
// Main V2 Extraction Result
// ============================================

export interface V2ExtractionResult {
  // Section 0: Banner/Header
  identification: Identification;
  question_and_answer: QuestionAndAnswer;
  thesis: Thesis;
  
  // Section 1: Strategic Fit
  should_we_do_it: ShouldWeDoIt;
  can_we_do_it: CanWeDoIt;
  synthesis: Synthesis;
  
  // Section 2: Gap Analysis
  gaps: Gap[];
  gap_summary: GapSummary;
  
  // Section 3: Highlights
  highlights: HighlightV2[];
  highlights_metadata: HighlightsMetadata;
  
  // Section 4: Next Steps
  next_steps: NextStepV2[];
  pathway_metadata: PathwayMetadata;
  
  // Section 5: Supporting Analysis (optional)
  supporting_analysis?: SupportingAnalysis;
}

// ============================================
// JSON Schema for Prompt Embedding
// ============================================

export const V2_EXTRACTION_SCHEMA_JSON = `{
  "identification": {
    "project_name": string,
    "one_liner": string,
    "stage": string,
    "sector": string,
    "geography": string
  },
  "question_and_answer": {
    "the_question": string,
    "the_answer": string,
    "confidence": {
      "rating": "High" | "Medium-High" | "Medium" | "Medium-Low" | "Low",
      "percentage": number | null
    }
  },
  "thesis": {
    "the_prize": string,
    "the_risk": string,
    "the_unlock": string
  },
  "should_we_do_it": {
    "the_prize": {
      "market_size": string,
      "margins": string,
      "durability": string,
      "bottom_line": string
    },
    "strategic_fit": {
      "bet_type": string,
      "portfolio_fit": string,
      "priority_alignment": string,
      "bottom_line": string
    },
    "our_edge": {
      "unfair_advantages": string[],
      "why_us": string,
      "bottom_line": string
    },
    "verdict": {
      "decision": "Yes" | "No" | "Borderline",
      "confidence": "High" | "Medium" | "Low",
      "rationale": string
    }
  },
  "can_we_do_it": {
    "capital_and_infrastructure": {
      "cash_position": string,
      "facilities": string,
      "tools_and_systems": string,
      "bottom_line": string
    },
    "market_access": {
      "customer_relationships": string,
      "geographic_presence": string,
      "regulatory_experience": string,
      "bottom_line": string
    },
    "people": {
      "skills": string,
      "experience": string,
      "bandwidth": string,
      "bottom_line": string
    },
    "verdict": {
      "decision": "Yes" | "No" | "Borderline",
      "confidence": "High" | "Medium" | "Low",
      "rationale": string
    }
  },
  "synthesis": {
    "alignment": string,
    "divergence": string,
    "gap_to_close": string,
    "final_verdict": {
      "verdict_title": string, // 2-5 word summary of recommended path (e.g., "Narrow Platform First", "Strategic Partnership")
      "decision": "Conditional" | "Proceed" | "Pass",
      "condition": string, // Subtitle explaining the verdict in more detail
      "confidence": "High" | "Medium" | "Low"
    }
  },
  "gaps": [{
    "dimension": string,
    "category": "core" | "optional",
    "current_state": string,
    "required_state": string,
    "gap_summary": string,
    "gap_size": { "score": 1-5, "label": "Critical" | "Large" | "Medium" | "Small" },
    "ease_of_closing": { "score": 1-5, "label": "Very Hard" | "Hard" | "Medium" | "Easy" | "Very Easy" },
    "quadrant": "Dealbreaker" | "Priority Investment" | "Quick Win" | "Mixed" | "Manageable",
    "why_easy_or_hard": string,
    "action_to_close": string,
    "risk_of_inaction": string,
    "owner": string
  }],
  "gap_summary": {
    "total_dimensions_assessed": number,
    "dealbreakers": string[],
    "priority_investments": string[],
    "quick_wins": string[],
    "manageable": string[],
    "mixed": string[],
    "overall_gap_assessment": string
  },
  "highlights": [{
    "highlight": string, // The provocative insight or hard truth (bold headline)
    "category": "Market" | "Financial" | "Team" | "Risk" | "Competitive" | "Strategic" | "Technology" | "Regulatory",
    "why_it_matters": string, // The "So What?" - impact on investment thesis
    "context_grounding": string, // The "Proof" - hard data or comparables
    "polarity": "tailwind" | "headwind",
    "time_sensitivity": { "is_time_bound": boolean, "window": string | null },
    "source_confidence": "verified" | "estimated" | "assumed"
  }],
  "highlights_metadata": {
    "total_highlights": number,
    "tailwinds": number,
    "headwinds": number,
    "neutral": number,
    "balance_check": string
  },
  "next_steps": [{
    "step_number": number,
    "step_title": string,
    "owner": "venture" | "joint" | "investor",
    "description": string,
    "timeline": string,
    "depends_on": number[] | null,
    "success_gate": string,
    "unlocks": string,
    "if_gate_fails": { "action": "pivot" | "pass" | "reassess", "detail": string }
  }],
  "pathway_metadata": {
    "total_steps": number,
    "critical_path_duration": string,
    "ultimate_decision": string,
    "pathway_confidence": "High" | "Medium" | "Low"
  },
  "supporting_analysis": {
    "explored_and_tested": [{
      "headline": string,
      "insight": string,
      "source_chapter": string
    }],
    "risks_acknowledged": [{
      "headline": string,
      "insight": string,
      "severity": "high" | "medium" | "low",
      "source_chapter": string
    }],
    "path_summary": {
      "recommendation": string,
      "path_description": string,
      "confidence": "high" | "medium" | "low"
    },
    "key_trade_offs_resolved": [{
      "trade_off": string,
      "resolution": string,
      "supporting_evidence": string,
      "source_chapters": string[],
      "confidence": "high" | "medium" | "low"
    }],
    "alternatives_considered": [{
      "alternative": string,
      "why_not_preferred": string,
      "source_chapters": string[],
      "confidence": "high" | "medium" | "low"
    }],
    "path_advantages": [{
      "advantage": string,
      "description": string,
      "source_chapter": string,
      "confidence": "high" | "medium" | "low"
    }]
  }
}`;

// ============================================
// Validation Function
// ============================================

export function validateV2ExtractionResult(data: unknown): data is V2ExtractionResult {
  if (!data || typeof data !== 'object') return false;
  
  const result = data as Record<string, unknown>;
  
  // Check required top-level fields
  if (!result.identification || typeof result.identification !== 'object') return false;
  if (!result.question_and_answer || typeof result.question_and_answer !== 'object') return false;
  if (!result.thesis || typeof result.thesis !== 'object') return false;
  if (!result.should_we_do_it || typeof result.should_we_do_it !== 'object') return false;
  if (!result.can_we_do_it || typeof result.can_we_do_it !== 'object') return false;
  if (!result.synthesis || typeof result.synthesis !== 'object') return false;
  if (!Array.isArray(result.gaps)) return false;
  if (!result.gap_summary || typeof result.gap_summary !== 'object') return false;
  if (!Array.isArray(result.highlights)) return false;
  if (!result.highlights_metadata || typeof result.highlights_metadata !== 'object') return false;
  if (!Array.isArray(result.next_steps)) return false;
  if (!result.pathway_metadata || typeof result.pathway_metadata !== 'object') return false;
  
  // Validate identification
  const id = result.identification as Record<string, unknown>;
  if (typeof id.project_name !== 'string') return false;
  if (typeof id.one_liner !== 'string') return false;
  
  // Validate question_and_answer
  const qa = result.question_and_answer as Record<string, unknown>;
  if (typeof qa.the_question !== 'string') return false;
  if (typeof qa.the_answer !== 'string') return false;
  
  // Validate thesis
  const thesis = result.thesis as Record<string, unknown>;
  if (typeof thesis.the_prize !== 'string') return false;
  if (typeof thesis.the_risk !== 'string') return false;
  if (typeof thesis.the_unlock !== 'string') return false;
  
  // Validate gaps array items
  for (const gap of result.gaps as unknown[]) {
    if (!gap || typeof gap !== 'object') return false;
    const g = gap as Record<string, unknown>;
    if (typeof g.dimension !== 'string') return false;
    if (!['Dealbreaker', 'Priority Investment', 'Quick Win', 'Mixed', 'Manageable'].includes(g.quadrant as string)) return false;
  }
  
  // Validate highlights array items
  for (const highlight of result.highlights as unknown[]) {
    if (!highlight || typeof highlight !== 'object') return false;
    const h = highlight as Record<string, unknown>;
    if (typeof h.highlight !== 'string') return false;
    if (!['tailwind', 'headwind'].includes(h.polarity as string)) return false;
  }
  
  // Validate next_steps array items
  for (const step of result.next_steps as unknown[]) {
    if (!step || typeof step !== 'object') return false;
    const s = step as Record<string, unknown>;
    if (typeof s.step_number !== 'number') return false;
    if (typeof s.step_title !== 'string') return false;
  }
  
  return true;
}
