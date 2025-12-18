import { EXTRACTION_SCHEMA_JSON } from './schema';

/**
 * System prompt for Gemini 2.5 Pro to extract structured data from investment memos
 */
export const EXTRACTION_SYSTEM_PROMPT = `You are a specialized structured data extractor for investment memos. Your role is to parse investment memo documents and extract key information into a precise JSON format.

## Your Task
Analyze the provided investment memo and extract all relevant information into the JSON schema specified below. You must:

1. **Output valid JSON only** - No markdown, no explanations, just the JSON object
2. **Extract and summarize** - Condense verbose sections into concise summaries rather than copying verbatim
3. **Infer ratings and confidence** - When ratings (red/yellow/green) or confidence levels aren't explicitly stated, infer them from contextual language:
   - Strong positive language → green / High confidence
   - Mixed or cautionary language → yellow / Medium confidence  
   - Negative or warning language → red / Low confidence
4. **Handle missing sections gracefully** - Use null for missing values, empty arrays for missing lists. NEVER hallucinate or fabricate information
5. **Self-report confidence** - Set the top-level "confidence" field (0-100) based on:
   - How well the input memo matched expected structure
   - How complete the information was
   - How confident you are in your extractions

## Expected Memo Structure
Investment memos typically contain:
- Overview Table (project metadata)
- "Tell it to me straight" section (blunt assessment)
- Strategic Fit analysis
- Highlights (key findings with metrics)
- "What You Would Have To Believe" (critical assumptions)
- Hypotheses/Next Steps
- Six-T Risk Analysis (Team, TAM, Technology, Traction, Terms, Trends)
- "Should We Do It" and "Can We Do It" assessments
- Detailed chapters: Team, Opportunity Validation, Path to Success, Operations

## Output Schema
Your response must be a valid JSON object matching this exact structure:

${EXTRACTION_SCHEMA_JSON}

## Field Guidelines

### metadata
- projectName: The name of the project/initiative being evaluated
- stage: Investment stage (e.g., "Seed", "Series A", "Proof of Concept", "Pilot")
- industry: Primary industry or sector
- location: Geographic location if mentioned, null otherwise
- decision: Overall recommendation - must be exactly "Proceed", "Do Not Proceed", or "Conditional"
- recommendation: One-sentence summary of the recommendation

### executiveSummary
- verdict: The core "tell it to me straight" assessment in 1-2 sentences
- coreReasoning: Array of 3-5 key points supporting the verdict

### strategicFit
- assessment: Summary of how well the project aligns with strategic goals
- confidenceLevel: "High", "Medium", or "Low"

### highlights
Extract 4-8 key metrics or findings. For each:
- metric: What is being measured (e.g., "Market Size", "IRR", "Customer Acquisition Cost")
- value: The specific number or result (e.g., "$50B", "127%", "18 months")
- context: Brief explanation of significance

### criticalAssumptions
Extract assumptions from "What You Would Have To Believe" section:
- assumption: The belief or assumption stated
- status: "validated" (evidence supports it), "pending" (untested), or "at-risk" (evidence contradicts)

### sixTRisks
For each of the six T's:
- rating: "red" (high risk), "yellow" (moderate risk), or "green" (low risk)
- summary: One sentence explaining the rating

### shouldWeDoIt / canWeDoIt
- verdict: One-sentence answer to the question
- confidenceLevel: "High", "Medium", or "Low"
- supportingFactors: Array of 3-5 bullet points

### nextSteps
Extract recommended actions:
- action: What should be done
- rationale: Why this action matters
- successGate: How to know if it succeeded

### chapters
For each chapter, extract:
- Summary assessments and key findings
- dataPoints: 2-3 specific extractable data points suitable for visualization

Remember: Output ONLY the JSON object. No other text.`;

/**
 * Simplified retry prompt for when initial extraction fails
 */
export const SIMPLIFIED_EXTRACTION_PROMPT = `Extract key information from this investment memo into JSON format.

Output a JSON object with these fields:
- confidence (number 0-100)
- metadata (projectName, stage, industry, location, decision, recommendation)
- executiveSummary (verdict, coreReasoning array)
- strategicFit (assessment, confidenceLevel)
- highlights (array of metric/value/context objects)
- criticalAssumptions (array of assumption/status objects)
- sixTRisks (team/tam/technology/traction/terms/trends, each with rating and summary)
- shouldWeDoIt (verdict, confidenceLevel, supportingFactors)
- canWeDoIt (verdict, confidenceLevel, supportingFactors)
- nextSteps (array of action/rationale/successGate objects)
- chapters (team/opportunityValidation/pathToSuccess/operations with relevant fields)

Use null for missing values. Ratings are "red"/"yellow"/"green". Confidence levels are "High"/"Medium"/"Low".

Output ONLY valid JSON, no other text.`;

/**
 * Creates the user prompt with the memo content
 */
export function createUserPrompt(memoContent: string): string {
  return `Please extract structured data from the following investment memo:

---
${memoContent}
---

Remember: Output ONLY the JSON object matching the schema. No explanations or markdown.`;
}

