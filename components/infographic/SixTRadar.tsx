'use client';

import { SixTRisks, RiskRating } from '@/lib/schema';
import { colors, typography, radarConfig, getRiskColor } from '@/lib/infographic-styles';

interface SixTRadarProps {
  risks: SixTRisks;
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

// Generate hexagon path
function generateHexagonPath(centerX: number, centerY: number, radius: number): string {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI * 2) / 6;
    points.push(getPoint(centerX, centerY, angle, radius));
  }
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
}

// Generate radar polygon based on ratings
function generateRadarPolygon(
  centerX: number, 
  centerY: number, 
  maxRadius: number, 
  ratings: RiskRating[]
): string {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI * 2) / 6;
    const rating = ratings[i];
    const radiusMultiplier = radarConfig.ratingToRadius[rating];
    const radius = maxRadius * radiusMultiplier;
    points.push(getPoint(centerX, centerY, angle, radius));
  }
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
}

export function SixTRadar({ risks }: SixTRadarProps) {
  const { size, centerX, centerY, maxRadius, axes } = radarConfig;
  
  // Map risks to array in correct order
  const riskEntries: { name: string; rating: RiskRating; summary: string }[] = [
    { name: 'Team', rating: risks.team.rating, summary: risks.team.summary },
    { name: 'TAM', rating: risks.tam.rating, summary: risks.tam.summary },
    { name: 'Technology', rating: risks.technology.rating, summary: risks.technology.summary },
    { name: 'Traction', rating: risks.traction.rating, summary: risks.traction.summary },
    { name: 'Terms', rating: risks.terms.rating, summary: risks.terms.summary },
    { name: 'Trends', rating: risks.trends.rating, summary: risks.trends.summary },
  ];
  
  const ratings = riskEntries.map(r => r.rating);
  
  // Calculate label positions (slightly outside the hexagon)
  const labelRadius = maxRadius + 30;
  const labelPositions = axes.map((_, i) => {
    const angle = (i * Math.PI * 2) / 6;
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
          Six-T Risk Analysis
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
            {/* Background hexagons (grid lines) */}
            {[1, 0.6, 0.3].map((scale, i) => (
              <path
                key={i}
                d={generateHexagonPath(centerX, centerY, maxRadius * scale)}
                fill="none"
                stroke={colors.slate[200]}
                strokeWidth={1}
              />
            ))}
            
            {/* Axis lines */}
            {axes.map((_, i) => {
              const angle = (i * Math.PI * 2) / 6;
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
              d={generateRadarPolygon(centerX, centerY, maxRadius, ratings)}
              fill={colors.navy}
              fillOpacity={0.15}
              stroke={colors.navy}
              strokeWidth={2}
            />
            
            {/* Data points with color indicators */}
            {riskEntries.map((entry, i) => {
              const angle = (i * Math.PI * 2) / 6;
              const radiusMultiplier = radarConfig.ratingToRadius[entry.rating];
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
              // Determine text anchor based on position
              let textAnchor: 'start' | 'middle' | 'end' = 'middle';
              if (i === 1 || i === 2) textAnchor = 'start';
              if (i === 4 || i === 5) textAnchor = 'end';
              
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

