/**
 * Q&A Extraction Schema for The Olsenator
 * 
 * This schema defines the structure of JSON data extracted from Q&A response documents.
 * It is designed to transform dense client Q&A documents into visual infographics.
 */

import { ConfidenceLevel } from './schema';

export type QACategory = 'market' | 'technical' | 'financial' | 'strategy';
export type Priority = 'critical' | 'high' | 'medium' | 'low';

export interface QuestionAnswer {
  /** Question number (e.g., 1, 2, 3...) */
  id: number;
  /** The client's question */
  question: string;
  /** Brief, direct answer */
  answer: string;
  /** Confidence level in the answer */
  confidence: ConfidenceLevel;
  /** Category grouping */
  category: QACategory;
  /** Source chapters/references (optional) */
  source?: string;
  /** Innovera's expert commentary (optional) */
  commentary?: string;
}

export interface GapItem {
  /** The question that couldn't be fully answered */
  question: string;
  /** What information is missing */
  whatsMissing: string;
  /** Recommended action to address the gap */
  recommendedAction: string;
  /** Priority level */
  priority: Priority;
}

export interface CrossDomainInsight {
  /** Title of the insight */
  title: string;
  /** Which questions this insight relates to */
  relatedQuestions: number[];
  /** The integrated insight */
  insight: string;
  /** Recommendation based on the insight */
  recommendation?: string;
}

export interface QANextStep {
  /** Priority level */
  priority: Priority;
  /** The action to take */
  action: string;
  /** Why this action matters */
  rationale: string;
  /** Who should own this action */
  owner: string;
}

export interface QASummaryStats {
  /** Total number of questions */
  totalQuestions: number;
  /** Count of high confidence answers */
  highConfidence: number;
  /** Count of medium confidence answers */
  mediumConfidence: number;
  /** Count of low confidence answers */
  lowConfidence: number;
  /** Count of fully answered questions */
  fullyAnswered: number;
  /** Count of partially answered questions */
  partiallyAnswered: number;
  /** Count of unanswered questions (gaps) */
  unanswered: number;
}

export interface QAMetadata {
  /** Project or client name */
  projectName: string;
  /** Document title or context */
  documentTitle: string;
  /** Date of the Q&A (if available) */
  date?: string;
  /** Number of questions analyzed */
  questionCount: number;
}

export interface KeyInsight {
  /** Short title */
  title: string;
  /** The insight content */
  content: string;
  /** Category this insight relates to */
  category: QACategory;
}

export interface QAExtractionResult {
  /** Self-reported confidence score (0-100) based on input quality */
  confidence: number;

  /** Document metadata */
  metadata: QAMetadata;

  /** Summary statistics */
  summaryStats: QASummaryStats;

  /** All questions and answers */
  questions: QuestionAnswer[];

  /** Key insights synthesized from the Q&A */
  keyInsights: KeyInsight[];

  /** Cross-domain integrated insights */
  crossDomainInsights: CrossDomainInsight[];

  /** Identified gaps requiring attention */
  gaps: GapItem[];

  /** Recommended next steps */
  nextSteps: QANextStep[];
}

/**
 * JSON Schema representation for embedding in prompts
 */
export const QA_EXTRACTION_SCHEMA_JSON = `{
  "confidence": number (0-100),
  "metadata": {
    "projectName": string,
    "documentTitle": string,
    "date": string | null,
    "questionCount": number
  },
  "summaryStats": {
    "totalQuestions": number,
    "highConfidence": number,
    "mediumConfidence": number,
    "lowConfidence": number,
    "fullyAnswered": number,
    "partiallyAnswered": number,
    "unanswered": number
  },
  "questions": [
    {
      "id": number,
      "question": string,
      "answer": string,
      "confidence": "High" | "Medium" | "Low",
      "category": "market" | "technical" | "financial" | "strategy",
      "source": string | null,
      "commentary": string | null
    }
  ],
  "keyInsights": [
    {
      "title": string,
      "content": string,
      "category": "market" | "technical" | "financial" | "strategy"
    }
  ],
  "crossDomainInsights": [
    {
      "title": string,
      "relatedQuestions": number[],
      "insight": string,
      "recommendation": string | null
    }
  ],
  "gaps": [
    {
      "question": string,
      "whatsMissing": string,
      "recommendedAction": string,
      "priority": "critical" | "high" | "medium" | "low"
    }
  ],
  "nextSteps": [
    {
      "priority": "critical" | "high" | "medium" | "low",
      "action": string,
      "rationale": string,
      "owner": string
    }
  ]
}`;

/**
 * Get display label for category
 */
export function getCategoryLabel(category: QACategory): string {
  const labels: Record<QACategory, string> = {
    market: 'Market & Commercial Strategy',
    technical: 'Technical & Operations',
    financial: 'Financial & Regulatory',
    strategy: 'Strategy & Competition',
  };
  return labels[category];
}

/**
 * Get color scheme for category
 */
export function getCategoryColor(category: QACategory): { bg: string; text: string; border: string } {
  const colors: Record<QACategory, { bg: string; text: string; border: string }> = {
    market: { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
    technical: { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
    financial: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
    strategy: { bg: '#f3e8ff', text: '#7c3aed', border: '#c4b5fd' },
  };
  return colors[category];
}

/**
 * Get priority display properties
 */
export function getPriorityDisplay(priority: Priority): { label: string; color: string; bgColor: string } {
  const displays: Record<Priority, { label: string; color: string; bgColor: string }> = {
    critical: { label: 'Critical', color: '#dc2626', bgColor: '#fef2f2' },
    high: { label: 'High', color: '#ea580c', bgColor: '#fff7ed' },
    medium: { label: 'Medium', color: '#ca8a04', bgColor: '#fefce8' },
    low: { label: 'Low', color: '#16a34a', bgColor: '#f0fdf4' },
  };
  return displays[priority];
}

/**
 * Validates that an object matches the QAExtractionResult structure
 */
export function validateQAExtractionResult(data: unknown): data is QAExtractionResult {
  if (!data || typeof data !== 'object') return false;

  const result = data as Record<string, unknown>;

  // Check top-level required fields
  if (typeof result.confidence !== 'number') return false;
  if (!result.metadata || typeof result.metadata !== 'object') return false;
  if (!result.summaryStats || typeof result.summaryStats !== 'object') return false;
  if (!Array.isArray(result.questions)) return false;
  if (!Array.isArray(result.keyInsights)) return false;
  if (!Array.isArray(result.crossDomainInsights)) return false;
  if (!Array.isArray(result.gaps)) return false;
  if (!Array.isArray(result.nextSteps)) return false;

  // Validate questions structure
  for (const q of result.questions as unknown[]) {
    if (!q || typeof q !== 'object') return false;
    const question = q as Record<string, unknown>;
    if (typeof question.id !== 'number') return false;
    if (typeof question.question !== 'string') return false;
    if (typeof question.answer !== 'string') return false;
    if (!['High', 'Medium', 'Low'].includes(question.confidence as string)) return false;
    if (!['market', 'technical', 'financial', 'strategy'].includes(question.category as string)) return false;
  }

  return true;
}
