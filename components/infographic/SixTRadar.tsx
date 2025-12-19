'use client';

import { SixTRisks, RiskRating, FiveTRisks } from '@/lib/schema';
import { colors, typography, radarConfig, pentagonRadarConfig, getRiskColor } from '@/lib/infographic-styles';

interface SixTRadarProps {
  risks: SixTRisks | FiveTRisks;
  kajimaMode?: boolean;
}

// Calculate point on hexagon at given angle and radius
function getPoint(centerX: number, centerY: number, angle: number, radius: number): { x: number; y: number } {
  // Offset by -90 degrees so first axis points up
  const adjustedAngle = angle - Math.PI / 2;
  return {
    x: centerX + radius * Math.cos(adjustedAngle),
    y: centerY + radius * Math.sin(adjustedAngle),
  };
}

// Generate polygon path for n sides
function generatePolygonPath(centerX: number, centerY: number, radius: number, sides: number): string {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i * Math.PI * 2) / sides;
    points.push(getPoint(centerX, centerY, angle, radius));
  }
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
}

// Generate radar polygon based on ratings
function generateRadarPolygon(
  centerX: number, 
  centerY: number, 
  maxRadius: number, 
  ratings: RiskRating[],
  ratingToRadius: Record<string, number>
): string {
  const sides = ratings.length;
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i * Math.PI * 2) / sides;
    const rating = ratings[i];
    const radiusMultiplier = ratingToRadius[rating];
    const radius = maxRadius * radiusMultiplier;
    points.push(getPoint(centerX, centerY, angle, radius));
  }
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
}

export function SixTRadar({ risks, kajimaMode = false }: SixTRadarProps) {
  // Choose config based on mode
  const config = kajimaMode ? pentagonRadarConfig : radarConfig;
  const { size, centerX, centerY, maxRadius, axes, ratingToRadius } = config;
  const numSides = axes.length;
  
  // Map risks to array in correct order
  const riskEntries: { name: string; rating: RiskRating; summary: string }[] = kajimaMode
    ? [
        { name: 'TAM', rating: risks.tam.rating, summary: risks.tam.summary },
        { name: 'Technology', rating: risks.technology.rating, summary: risks.technology.summary },
        { name: 'Traction', rating: risks.traction.rating, summary: risks.traction.summary },
        { name: 'Terms', rating: risks.terms.rating, summary: risks.terms.summary },
        { name: 'Trends', rating: risks.trends.rating, summary: risks.trends.summary },
      ]
    : [
        { name: 'Team', rating: (risks as SixTRisks).team.rating, summary: (risks as SixTRisks).team.summary },
        { name: 'TAM', rating: risks.tam.rating, summary: risks.tam.summary },
        { name: 'Technology', rating: risks.technology.rating, summary: risks.technology.summary },
        { name: 'Traction', rating: risks.traction.rating, summary: risks.traction.summary },
        { name: 'Terms', rating: risks.terms.rating, summary: risks.terms.summary },
        { name: 'Trends', rating: risks.trends.rating, summary: risks.trends.summary },
      ];
  
  const ratings = riskEntries.map(r => r.rating);
  
  // Calculate label positions (slightly outside the polygon)
  const labelRadius = maxRadius + 30;
  const labelPositions = axes.map((_, i) => {
    const angle = (i * Math.PI * 2) / numSides;
    return getPoint(centerX, centerY, angle, labelRadius);
  });

  return (
    <div 
      className="avoid-break rounded-lg p-6"
      style={{ 
        backgroundColor: colors.white,
        border: `1px solid ${colors.slate[200]}`,
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div 
          className="w-1 h-6 rounded-full"
          style={{ backgroundColor: colors.navy }}
        />
        <h2 
          className="text-lg font-semibold"
          style={{ 
            color: colors.navy,
            fontFamily: typography.fontFamily.sans,
            fontWeight: typography.fontWeight.semibold,
          }}
        >
          {kajimaMode ? 'Five-T Risk Analysis' : 'Six-T Risk Analysis'}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* SVG Radar Chart */}
        <div className="relative flex-shrink-0">
          <svg 
            width={size} 
            height={size} 
            viewBox={`0 0 ${size} ${size}`}
            className="overflow-visible"
          >
            {/* Background polygons (grid lines) */}
            {[1, 0.6, 0.3].map((scale, i) => (
              <path
                key={i}
                d={generatePolygonPath(centerX, centerY, maxRadius * scale, numSides)}
                fill="none"
                stroke={colors.slate[200]}
                strokeWidth={1}
              />
            ))}
            
            {/* Axis lines */}
            {axes.map((_, i) => {
              const angle = (i * Math.PI * 2) / numSides;
              const endPoint = getPoint(centerX, centerY, angle, maxRadius);
              return (
                <line
                  key={i}
                  x1={centerX}
                  y1={centerY}
                  x2={endPoint.x}
                  y2={endPoint.y}
                  stroke={colors.slate[200]}
                  strokeWidth={1}
                />
              );
            })}
            
            {/* Radar fill polygon */}
            <path
              d={generateRadarPolygon(centerX, centerY, maxRadius, ratings, ratingToRadius)}
              fill={colors.navy}
              fillOpacity={0.15}
              stroke={colors.navy}
              strokeWidth={2}
            />
            
            {/* Data points with color indicators */}
            {riskEntries.map((entry, i) => {
              const angle = (i * Math.PI * 2) / numSides;
              const radiusMultiplier = ratingToRadius[entry.rating];
              const radius = maxRadius * radiusMultiplier;
              const point = getPoint(centerX, centerY, angle, radius);
              const riskColor = getRiskColor(entry.rating);
              
              return (
                <g key={i}>
                  {/* Outer ring */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={10}
                    fill={colors.white}
                    stroke={riskColor}
                    strokeWidth={3}
                  />
                  {/* Inner dot */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={4}
                    fill={riskColor}
                  />
                </g>
              );
            })}
            
            {/* Axis labels */}
            {axes.map((label, i) => {
              const pos = labelPositions[i];
              // Determine text anchor based on position relative to center
              let textAnchor: 'start' | 'middle' | 'end' = 'middle';
              const xDiff = pos.x - centerX;
              if (xDiff > 10) textAnchor = 'start';
              else if (xDiff < -10) textAnchor = 'end';
              
              return (
                <text
                  key={i}
                  x={pos.x}
                  y={pos.y}
                  textAnchor={textAnchor}
                  dominantBaseline="middle"
                  fill={colors.slate[600]}
                  fontSize="12"
                  fontWeight="500"
                  fontFamily={typography.fontFamily.sans}
                >
                  {label}
                </text>
              );
            })}
          </svg>
        </div>
        
        {/* Risk Summaries */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {riskEntries.map((entry, i) => {
            const riskColor = getRiskColor(entry.rating);
            return (
              <div 
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{ backgroundColor: colors.slate[50] }}
              >
                <div 
                  className="flex-shrink-0 w-3 h-3 rounded-full mt-1"
                  style={{ backgroundColor: riskColor }}
                />
                <div>
                  <span 
                    className="text-sm font-medium block"
                    style={{ color: colors.slate[700] }}
                  >
                    {entry.name}
                  </span>
                  <span 
                    className="text-xs leading-relaxed"
                    style={{ color: colors.slate[500] }}
                  >
                    {entry.summary}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div 
        className="flex items-center justify-center gap-6 mt-6 pt-4"
        style={{ borderTop: `1px solid ${colors.slate[200]}` }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.risk.green }}
          />
          <span className="text-xs" style={{ color: colors.slate[500] }}>Low Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.risk.amber }}
          />
          <span className="text-xs" style={{ color: colors.slate[500] }}>Medium Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.risk.red }}
          />
          <span className="text-xs" style={{ color: colors.slate[500] }}>High Risk</span>
        </div>
      </div>
    </div>
  );
}

