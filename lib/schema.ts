/**
 * Extraction Schema for The Olsenator
 * 
 * This schema defines the structure of JSON data extracted from investment memos.
 * It is designed to be visualization-ready for Stage 2's rendering engine.
 */

export type RiskRating = "red" | "yellow" | "green";
export type ConfidenceLevel = "High" | "Medium" | "Low";
export type Decision = "Proceed" | "Do Not Proceed" | "Conditional";
export type AssumptionStatus = "validated" | "pending" | "at-risk";

export interface RiskAssessment {
  rating: RiskRating;
  summary: string;
}

export interface Highlight {
  metric: string;
  value: string;
  context: string;
}

export interface CriticalAssumption {
  assumption: string;
  status: AssumptionStatus;
}

export interface NextStep {
  action: string;
  rationale: string;
  successGate: string;
}

export interface ProjectMetadata {
  projectName: string;
  stage: string;
  industry: string;
  location: string | null;
  decision: Decision;
  recommendation: string;
}

export interface ExecutiveSummary {
  verdict: string;
  coreReasoning: string[];
}

export interface StrategicFit {
  assessment: string;
  confidenceLevel: ConfidenceLevel;
}

export interface SixTRisks {
  team: RiskAssessment;
  tam: RiskAssessment;
  technology: RiskAssessment;
  traction: RiskAssessment;
  terms: RiskAssessment;
  trends: RiskAssessment;
}

export interface Verdict {
  verdict: string;
  confidenceLevel: ConfidenceLevel;
  supportingFactors: string[];
}

export interface TeamChapter {
  capabilityAssessment: string;
  identifiedGaps: string[];
  dataPoints: string[];
}

export interface OpportunityValidationChapter {
  problemStatement: string;
  marketSize: string;
  competitivePositioning: string;
  dataPoints: string[];
}

export interface PathToSuccessChapter {
  productRequirements: string;
  goToMarket: string;
  revenueModel: string;
  dataPoints: string[];
}

export interface OperationsChapter {
  irr: string | null;
  paybackPeriod: string | null;
  margins: string | null;
  operationalRisks: string[];
  dataPoints: string[];
}

export interface Chapters {
  team: TeamChapter;
  opportunityValidation: OpportunityValidationChapter;
  pathToSuccess: PathToSuccessChapter;
  operations: OperationsChapter;
}

export interface ExtractionResult {
  /** Self-reported confidence score (0-100) based on input quality */
  confidence: number;
  
  /** Project metadata from the Overview Table */
  metadata: ProjectMetadata;
  
  /** Executive summary from "Tell it to me straight" section */
  executiveSummary: ExecutiveSummary;
  
  /** Strategic fit assessment with confidence level */
  strategicFit: StrategicFit;
  
  /** Key highlights with metrics and context */
  highlights: Highlight[];
  
  /** Critical assumptions with validation status */
  criticalAssumptions: CriticalAssumption[];
  
  /** Six-T Risk Analysis ratings */
  sixTRisks: SixTRisks;
  
  /** "Should We Do It" verdict and supporting factors */
  shouldWeDoIt: Verdict;
  
  /** "Can We Do It" verdict and supporting factors */
  canWeDoIt: Verdict;
  
  /** Recommended next steps with actions and success gates */
  nextSteps: NextStep[];
  
  /** Detailed chapter-level extractions */
  chapters: Chapters;
}

/**
 * JSON Schema representation for embedding in prompts
 * This is used to instruct the LLM on exact output structure
 */
export const EXTRACTION_SCHEMA_JSON = `{
  "confidence": number (0-100),
  "metadata": {
    "projectName": string,
    "stage": string,
    "industry": string,
    "location": string | null,
    "decision": "Proceed" | "Do Not Proceed" | "Conditional",
    "recommendation": string
  },
  "executiveSummary": {
    "verdict": string,
    "coreReasoning": string[]
  },
  "strategicFit": {
    "assessment": string,
    "confidenceLevel": "High" | "Medium" | "Low"
  },
  "highlights": [
    {
      "metric": string,
      "value": string,
      "context": string
    }
  ],
  "criticalAssumptions": [
    {
      "assumption": string,
      "status": "validated" | "pending" | "at-risk"
    }
  ],
  "sixTRisks": {
    "team": { "rating": "red" | "yellow" | "green", "summary": string },
    "tam": { "rating": "red" | "yellow" | "green", "summary": string },
    "technology": { "rating": "red" | "yellow" | "green", "summary": string },
    "traction": { "rating": "red" | "yellow" | "green", "summary": string },
    "terms": { "rating": "red" | "yellow" | "green", "summary": string },
    "trends": { "rating": "red" | "yellow" | "green", "summary": string }
  },
  "shouldWeDoIt": {
    "verdict": string,
    "confidenceLevel": "High" | "Medium" | "Low",
    "supportingFactors": string[]
  },
  "canWeDoIt": {
    "verdict": string,
    "confidenceLevel": "High" | "Medium" | "Low",
    "supportingFactors": string[]
  },
  "nextSteps": [
    {
      "action": string,
      "rationale": string,
      "successGate": string
    }
  ],
  "chapters": {
    "team": {
      "capabilityAssessment": string,
      "identifiedGaps": string[],
      "dataPoints": string[]
    },
    "opportunityValidation": {
      "problemStatement": string,
      "marketSize": string,
      "competitivePositioning": string,
      "dataPoints": string[]
    },
    "pathToSuccess": {
      "productRequirements": string,
      "goToMarket": string,
      "revenueModel": string,
      "dataPoints": string[]
    },
    "operations": {
      "irr": string | null,
      "paybackPeriod": string | null,
      "margins": string | null,
      "operationalRisks": string[],
      "dataPoints": string[]
    }
  }
}`;

/**
 * Validates that an object matches the ExtractionResult structure
 * Returns true if valid, false otherwise
 */
/**
 * Five-T Risks structure (without Team) for Kajima mode
 */
export interface FiveTRisks {
  tam: RiskAssessment;
  technology: RiskAssessment;
  traction: RiskAssessment;
  terms: RiskAssessment;
  trends: RiskAssessment;
}

/**
 * Kajima Chapters structure (without Team chapter)
 */
export interface KajimaChapters {
  opportunityValidation: OpportunityValidationChapter;
  pathToSuccess: PathToSuccessChapter;
  operations: OperationsChapter;
}

/**
 * Modified ExtractionResult for Kajima mode (no team references)
 */
export interface KajimaExtractionResult extends Omit<ExtractionResult, 'sixTRisks' | 'chapters'> {
  sixTRisks: FiveTRisks;
  chapters: KajimaChapters;
}

export function validateExtractionResult(data: unknown): data is ExtractionResult {
  if (!data || typeof data !== 'object') return false;
  
  const result = data as Record<string, unknown>;
  
  // Check top-level required fields
  if (typeof result.confidence !== 'number') return false;
  if (!result.metadata || typeof result.metadata !== 'object') return false;
  if (!result.executiveSummary || typeof result.executiveSummary !== 'object') return false;
  if (!result.strategicFit || typeof result.strategicFit !== 'object') return false;
  if (!Array.isArray(result.highlights)) return false;
  if (!Array.isArray(result.criticalAssumptions)) return false;
  if (!result.sixTRisks || typeof result.sixTRisks !== 'object') return false;
  if (!result.shouldWeDoIt || typeof result.shouldWeDoIt !== 'object') return false;
  if (!result.canWeDoIt || typeof result.canWeDoIt !== 'object') return false;
  if (!Array.isArray(result.nextSteps)) return false;
  if (!result.chapters || typeof result.chapters !== 'object') return false;
  
  // Validate Six-T structure
  const sixT = result.sixTRisks as Record<string, unknown>;
  const requiredRisks = ['team', 'tam', 'technology', 'traction', 'terms', 'trends'];
  for (const risk of requiredRisks) {
    if (!sixT[risk] || typeof sixT[risk] !== 'object') return false;
    const riskObj = sixT[risk] as Record<string, unknown>;
    if (!['red', 'yellow', 'green'].includes(riskObj.rating as string)) return false;
    if (typeof riskObj.summary !== 'string') return false;
  }
  
  return true;
}

