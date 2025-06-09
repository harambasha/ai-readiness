import React from 'react';

interface RadarChartProps {
  strengths: {
    label: string;
    value: number;
  }[];
  improvements: {
    label: string;
    value: number;
  }[];
}

export const RadarChart: React.FC<RadarChartProps> = ({ strengths, improvements }) => {
  const size = 400;
  const center = size / 2;
  const radius = size * 0.4;
  const numPoints = strengths.length;
  const angleStep = (2 * Math.PI) / numPoints;

  const getPointCoordinates = (index: number, value: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const distance = (value / 100) * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    };
  };

  const generatePolygonPoints = (data: { value: number }[]) => {
    return data
      .map((point, index) => {
        const { x, y } = getPointCoordinates(index, point.value);
        return `${x},${y}`;
      })
      .join(' ');
  };

  const generateAxisLines = () => {
    return strengths.map((_, index) => {
      const { x, y } = getPointCoordinates(index, 100);
      return (
        <line
          key={`axis-${index}`}
          x1={center}
          y1={center}
          x2={x}
          y2={y}
          stroke="rgba(103, 112, 118, 0.1)"
          strokeWidth="1"
        />
      );
    });
  };

  const generateLabels = () => {
    return strengths.map((point, index) => {
      const { x, y } = getPointCoordinates(index, 110);
      return (
        <text
          key={`label-${index}`}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(103, 112, 118, 0.8)"
          fontSize="12"
        >
          {point.label}
        </text>
      );
    });
  };

  const generateCircles = () => {
    return [20, 40, 60, 80, 100].map((value) => (
      <circle
        key={`circle-${value}`}
        cx={center}
        cy={center}
        r={(value / 100) * radius}
        fill="none"
        stroke="rgba(103, 112, 118, 0.1)"
        strokeWidth="1"
      />
    ));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circles */}
        {generateCircles()}
        
        {/* Axis lines */}
        {generateAxisLines()}
        
        {/* Strengths polygon */}
        <polygon
          points={generatePolygonPoints(strengths)}
          fill="rgba(103, 112, 118, 0.2)"
          stroke="rgba(103, 112, 118, 1)"
          strokeWidth="2"
        />
        
        {/* Improvements polygon */}
        <polygon
          points={generatePolygonPoints(improvements)}
          fill="rgba(138, 107, 78, 0.2)"
          stroke="rgba(138, 107, 78, 1)"
          strokeWidth="2"
        />
        
        {/* Labels */}
        {generateLabels()}
        
        {/* Legend */}
        <g transform={`translate(${size - 150}, 20)`}>
          <rect x="0" y="0" width="12" height="12" fill="rgba(103, 112, 118, 0.2)" stroke="rgba(103, 112, 118, 1)" />
          <text x="20" y="10" fill="rgba(103, 112, 118, 0.8)" fontSize="12">Strengths</text>
          <rect x="0" y="20" width="12" height="12" fill="rgba(138, 107, 78, 0.2)" stroke="rgba(138, 107, 78, 1)" />
          <text x="20" y="30" fill="rgba(103, 112, 118, 0.8)" fontSize="12">Areas for Improvement</text>
        </g>
      </svg>
    </div>
  );
}; 