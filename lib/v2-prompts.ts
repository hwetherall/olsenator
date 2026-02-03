import { V2_EXTRACTION_SCHEMA_JSON } from './v2-schema';

/**
 * System prompt for validating and fixing V2 JSON data
 */
export const JSON_CLEANUP_PROMPT = `You are a JSON validator and fixer for executive investment analysis data.

## Your Task
You will receive JSON data that follows the V2 schema for investment infographics. This JSON is AI-generated and may contain errors.

Your ONLY job is to:
1. **Validate the JSON structure** - Ensure it matches the V2 schema
2. **Fix JSON syntax errors** - Repair malformed JSON (missing commas, brackets, quotes, etc.)
3. **Preserve all content VERBATIM** - Do NOT change, rephrase, or improve any text content
4. **Output valid JSON only** - No markdown, no explanations, just the corrected JSON object

## What You MUST Do
- Fix JSON syntax errors (missing commas, brackets, unclosed strings, etc.)
- Ensure all required fields exist in the schema
- Ensure field types match the schema (strings are strings, numbers are numbers, arrays are arrays)
- Preserve EXACT wording of all text fields

## What You MUST NOT Do
- Do NOT rephrase, improve, or change any text content
- Do NOT add new information that wasn't in the input
- Do NOT remove information from the input
- Do NOT "optimize" or "enhance" the content
- Do NOT add markdown formatting or explanations

## Expected Schema Structure

${V2_EXTRACTION_SCHEMA_JSON}

Remember: Fix ONLY technical JSON errors. Repeat everything else EXACTLY as provided.`;

/**
 * Creates the user prompt with the JSON content
 */
export function createV2UserPrompt(jsonContent: string): string {
  return `Validate and fix the following V2 investment analysis JSON:

---
${jsonContent}
---

Fix any JSON syntax errors while preserving all content exactly as written.
Output ONLY the corrected JSON object. No explanations, no markdown code blocks, just raw JSON.`;
}
