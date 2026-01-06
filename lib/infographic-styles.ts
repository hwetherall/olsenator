/**
 * Design System for Infographic Rendering
 * 
 * Strict design system for visual consistency across all generated infographics.
 * Aligned with Innovera's Corporate Identity (Website).
 */

export const colors = {
  // Primary colors - Innovera Brand
  // Dark Navy from the footer/header images
  navy: '#0f172a',    // Deep slate/navy (darker than before)
  white: '#ffffff',
  // Vibrant Orange from the "bottom line impact" text and logo
  accent: '#f97316',  // Bright orange
  
  // Slate hierarchy for text
  slate: {
    900: '#0f172a',  // Darkest headings (matches navy)
    700: '#334155',  // Primary body text
    600: '#475569',  // Secondary body text
    500: '#64748b',  // Tertiary text
    400: '#94a3b8',  // Muted text
    300: '#cbd5e1',  // Borders
    200: '#e2e8f0',  // Light borders
    100: '#f1f5f9',  // Background accent
    50: '#f8fafc',   // Lightest background
  },
  
  // Risk indicator colors (Six-T)
  risk: {
    red: '#ef4444',
    redLight: '#fef2f2',
    redBorder: '#fee2e2',
    amber: '#f59e0b',
    amberLight: '#fffbeb',
    amberBorder: '#fef3c7',
    green: '#10b981', 
    greenLight: '#ecfdf5',
    greenBorder: '#d1fae5',
  },
  
  // Confidence level colors
  confidence: {
    high: '#10b981',
    medium: '#f59e0b',
    low: '#ef4444',
  },
  
  // Decision colors
  decision: {
    proceed: '#10b981',
    proceedBg: '#ecfdf5',
    conditional: '#f59e0b',
    conditionalBg: '#fffbeb',
    doNotProceed: '#ef4444',
    doNotProceedBg: '#fef2f2',
  },
  
  // Assumption status colors
  assumption: {
    validated: '#10b981',
    validatedBg: '#ecfdf5',
    pending: '#f59e0b',
    pendingBg: '#fffbeb',
    atRisk: '#ef4444',
    atRiskBg: '#fef2f2',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

export const typography = {
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const borderRadius = {
  sm: '2px',         // Sharper corners based on the "technical" feel
  md: '4px',
  lg: '8px',
  xl: '12px',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
} as const;

// Six-T radar chart configuration
export const radarConfig = {
  size: 300,
  centerX: 150,
  centerY: 150,
  maxRadius: 120,
  axes: ['Team', 'TAM', 'Technology', 'Traction', 'Terms', 'Trends'] as const,
  ratingToRadius: {
    green: 1.0,   // 100% of maxRadius
    yellow: 0.6,  // 60% of maxRadius
    red: 0.3,     // 30% of maxRadius
  },
} as const;

// Five-T radar chart configuration (Kajima mode - no Team)
export const pentagonRadarConfig = {
  size: 300,
  centerX: 150,
  centerY: 150,
  maxRadius: 120,
  axes: ['TAM', 'Technology', 'Traction', 'Terms', 'Trends'] as const,
  ratingToRadius: {
    green: 1.0,   // 100% of maxRadius
    yellow: 0.6,  // 60% of maxRadius
    red: 0.3,     // 30% of maxRadius
  },
} as const;

// Helper functions
export function getDecisionColor(decision: string): string {
  switch (decision) {
    case 'Proceed':
      return colors.decision.proceed;
    case 'Do Not Proceed':
      return colors.decision.doNotProceed;
    case 'Conditional':
      return colors.decision.conditional;
    default:
      return colors.slate[500];
  }
}

export function getDecisionBgColor(decision: string): string {
  switch (decision) {
    case 'Proceed':
      return colors.decision.proceedBg;
    case 'Do Not Proceed':
      return colors.decision.doNotProceedBg;
    case 'Conditional':
      return colors.decision.conditionalBg;
    default:
      return colors.slate[100];
  }
}

export function getRiskColor(rating: string): string {
  switch (rating) {
    case 'green':
      return colors.risk.green;
    case 'yellow':
      return colors.risk.amber;
    case 'red':
      return colors.risk.red;
    default:
      return colors.slate[400];
  }
}

export function getConfidenceColor(level: string): string {
  switch (level) {
    case 'High':
      return colors.confidence.high;
    case 'Medium':
      return colors.confidence.medium;
    case 'Low':
      return colors.confidence.low;
    default:
      return colors.slate[400];
  }
}

export function getAssumptionColor(status: string): string {
  switch (status) {
    case 'validated':
      return colors.assumption.validated;
    case 'pending':
      return colors.assumption.pending;
    case 'at-risk':
      return colors.assumption.atRisk;
    default:
      return colors.slate[400];
  }
}

export function getAssumptionBgColor(status: string): string {
  switch (status) {
    case 'validated':
      return colors.assumption.validatedBg;
    case 'pending':
      return colors.assumption.pendingBg;
    case 'at-risk':
      return colors.assumption.atRiskBg;
    default:
      return colors.slate[100];
  }
}
