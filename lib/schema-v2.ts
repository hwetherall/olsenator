/**
 * Extraction Schema V2 for The Olsenator
 * 
 * This schema defines the structure for the new 6-section investment memo format.
 * Sections 0-5 map to specific visualization components.
 */

export type DecisionType = "Proceed" | "Do Not Proceed" | "Conditional";
export type SeverityLevel = "high" | "medium" | "low";
export type ConfidenceLevel = "high" | "medium" | "low";

// Section 0 - Overview Table
export interface OverviewTable {
  projectName: string;
  oneLiner: string;
  location: string;
  decision: DecisionType;
  justification: string;
}

// Section 1 - Overview Block
export interface ExploredItem {
  headline: string;
  insight: string;
  sourceChapter: string;
}

export interface RiskItem {
  risk: string;
  description: string;
  severity: SeverityLevel;
  sourceChapter: string;
}

export interface PathSummary {
  recommendation: string;
  pathDescription: string;
  confidence: ConfidenceLevel;
}

export interface TradeOff {
  tradeOff: string;
  resolution: string;
  supportingEvidence: string;
  sourceChapters: string[];
  confidence: ConfidenceLevel;
}

export interface Alternative {
  alternative: string;
  whyNotPreferred: string;
  sourceChapters: string[];
  confidence: ConfidenceLevel;
}

export interface PathAdvantage {
  advantage: string;
  description: string;
  sourceChapter: string;
  confidence: ConfidenceLevel;
}

export interface OverviewBlock {
  projectDescription: string;
  decisionStatement: string;
  recommendation: string;
  exploredAndTested: ExploredItem[];
  risksAcknowledged: RiskItem[];
  pathSummary: PathSummary;
  keyTradeOffsResolved: TradeOff[];
  alternativesConsidered: Alternative[];
  pathAdvantages: PathAdvantage[];
}

// Section 2 - Strategic Fit Block
export interface StrategicFitBlock {
  assessment: string;
  canWeDoIt: string;
  shouldWeDoIt: string;
}

// Section 3 - Gap and Assumptions Block
export interface ExecutionGaps {
  team: string;
  tam: string;
  technology: string;
  traction: string;
  terms: string;
  trends: string;
  transactions: string;
}

export interface GapAnalysisBlock {
  executionGaps: ExecutionGaps;
  criticalAssumptions: string[];
}

// Section 4 - Key Highlights Block
export interface HighlightCard {
  headline: string;
  insight: string;
  sourceChapter: string;
}

// Section 5 - Next Steps Block
export interface NextStep {
  action: string;
  details: string;
}

// Complete V2 Extraction Result
export interface ExtractionResultV2 {
  /** Self-reported confidence score (0-100) based on input quality */
  confidence: number;
  
  /** Section 0 - Overview Table */
  overviewTable: OverviewTable;
  
  /** Section 1 - Overview Block */
  overviewBlock: OverviewBlock;
  
  /** Section 2 - Strategic Fit Block */
  strategicFit: StrategicFitBlock;
  
  /** Section 3 - Gap and Assumptions Block */
  gapAnalysis: GapAnalysisBlock;
  
  /** Section 4 - Key Highlights (derived from explored_and_tested, top 4-6) */
  highlights: HighlightCard[];
  
  /** Section 5 - Next Steps */
  nextSteps: NextStep[];
}

/**
 * JSON Schema representation for embedding in prompts
 */
export const EXTRACTION_SCHEMA_V2_JSON = `{
  "confidence": number (0-100),
  "overviewTable": {
    "projectName": string,
    "oneLiner": string,
    "location": string,
    "decision": "Proceed" | "Do Not Proceed" | "Conditional",
    "justification": string
  },
  "overviewBlock": {
    "projectDescription": string,
    "decisionStatement": string,
    "recommendation": string,
    "exploredAndTested": [
      {
        "headline": string,
        "insight": string,
        "sourceChapter": string
      }
    ],
    "risksAcknowledged": [
      {
        "risk": string,
        "description": string,
        "severity": "high" | "medium" | "low",
        "sourceChapter": string
      }
    ],
    "pathSummary": {
      "recommendation": string,
      "pathDescription": string,
      "confidence": "high" | "medium" | "low"
    },
    "keyTradeOffsResolved": [
      {
        "tradeOff": string,
        "resolution": string,
        "supportingEvidence": string,
        "sourceChapters": string[],
        "confidence": "high" | "medium" | "low"
      }
    ],
    "alternativesConsidered": [
      {
        "alternative": string,
        "whyNotPreferred": string,
        "sourceChapters": string[],
        "confidence": "high" | "medium" | "low"
      }
    ],
    "pathAdvantages": [
      {
        "advantage": string,
        "description": string,
        "sourceChapter": string,
        "confidence": "high" | "medium" | "low"
      }
    ]
  },
  "strategicFit": {
    "assessment": string,
    "canWeDoIt": string,
    "shouldWeDoIt": string
  },
  "gapAnalysis": {
    "executionGaps": {
      "team": string,
      "tam": string,
      "technology": string,
      "traction": string,
      "terms": string,
      "trends": string,
      "transactions": string
    },
    "criticalAssumptions": string[]
  },
  "highlights": [
    {
      "headline": string,
      "insight": string,
      "sourceChapter": string
    }
  ],
  "nextSteps": [
    {
      "action": string,
      "details": string
    }
  ]
}`;

/**
 * Validates that an object matches the ExtractionResultV2 structure
 */
export function validateExtractionResultV2(data: unknown): data is ExtractionResultV2 {
  if (!data || typeof data !== 'object') return false;
  
  const result = data as Record<string, unknown>;
  
  // Check top-level required fields
  if (typeof result.confidence !== 'number') return false;
  if (!result.overviewTable || typeof result.overviewTable !== 'object') return false;
  if (!result.overviewBlock || typeof result.overviewBlock !== 'object') return false;
  if (!result.strategicFit || typeof result.strategicFit !== 'object') return false;
  if (!result.gapAnalysis || typeof result.gapAnalysis !== 'object') return false;
  if (!Array.isArray(result.highlights)) return false;
  if (!Array.isArray(result.nextSteps)) return false;
  
  // Validate overviewTable
  const overview = result.overviewTable as Record<string, unknown>;
  if (typeof overview.projectName !== 'string') return false;
  if (typeof overview.oneLiner !== 'string') return false;
  if (typeof overview.location !== 'string') return false;
  if (!['Proceed', 'Do Not Proceed', 'Conditional'].includes(overview.decision as string)) return false;
  if (typeof overview.justification !== 'string') return false;
  
  // Validate overviewBlock
  const block = result.overviewBlock as Record<string, unknown>;
  if (typeof block.projectDescription !== 'string') return false;
  if (typeof block.decisionStatement !== 'string') return false;
  if (typeof block.recommendation !== 'string') return false;
  if (!Array.isArray(block.exploredAndTested)) return false;
  if (!Array.isArray(block.risksAcknowledged)) return false;
  if (!block.pathSummary || typeof block.pathSummary !== 'object') return false;
  
  // Validate strategicFit
  const fit = result.strategicFit as Record<string, unknown>;
  if (typeof fit.assessment !== 'string') return false;
  if (typeof fit.canWeDoIt !== 'string') return false;
  if (typeof fit.shouldWeDoIt !== 'string') return false;
  
  // Validate gapAnalysis
  const gap = result.gapAnalysis as Record<string, unknown>;
  if (!gap.executionGaps || typeof gap.executionGaps !== 'object') return false;
  if (!Array.isArray(gap.criticalAssumptions)) return false;
  
  // Validate executionGaps has all 7 T's
  const gaps = gap.executionGaps as Record<string, unknown>;
  const requiredGaps = ['team', 'tam', 'technology', 'traction', 'terms', 'trends', 'transactions'];
  for (const g of requiredGaps) {
    if (typeof gaps[g] !== 'string') return false;
  }
  
  return true;
}
