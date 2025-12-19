/**
 * Kajima Transform Utility
 * 
 * Removes all team-related references from the extraction result
 * for Kajima-specific outputs.
 */

import { ExtractionResult, SixTRisks, Chapters } from './schema';

/**
 * Five-T Risks structure (without Team)
 */
export interface FiveTRisks {
  tam: SixTRisks['tam'];
  technology: SixTRisks['technology'];
  traction: SixTRisks['traction'];
  terms: SixTRisks['terms'];
  trends: SixTRisks['trends'];
}

/**
 * Kajima Chapters structure (without Team chapter)
 */
export interface KajimaChapters {
  opportunityValidation: Chapters['opportunityValidation'];
  pathToSuccess: Chapters['pathToSuccess'];
  operations: Chapters['operations'];
}

/**
 * Modified ExtractionResult for Kajima mode
 */
export interface KajimaExtractionResult extends Omit<ExtractionResult, 'sixTRisks' | 'chapters'> {
  sixTRisks: FiveTRisks;
  chapters: KajimaChapters;
}

/**
 * Removes team references from the extraction result
 * 
 * @param data - The original extraction result
 * @returns A new object with team data removed
 */
export function removeTeamReferences(data: ExtractionResult): KajimaExtractionResult {
  // Create a deep copy to avoid mutating the original
  const result = JSON.parse(JSON.stringify(data)) as ExtractionResult;

  // Remove team from sixTRisks
  const { team: _teamRisk, ...fiveTRisks } = result.sixTRisks;

  // Remove team from chapters
  const { team: _teamChapter, ...kajimaChapters } = result.chapters;

  return {
    ...result,
    sixTRisks: fiveTRisks,
    chapters: kajimaChapters,
  };
}

/**
 * Checks if data has team references (is full ExtractionResult)
 */
export function hasTeamReferences(data: ExtractionResult | KajimaExtractionResult): data is ExtractionResult {
  return 'team' in data.sixTRisks && 'team' in data.chapters;
}

