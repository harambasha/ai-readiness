import React from 'react';
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer
} from 'recharts';

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
  // Transform data for Recharts
  const data = strengths.map((strength, index) => ({
    subject: strength.label,
    strengths: strength.value,
    improvements: improvements[index].value,
  }));

  return (
    <div className="w-full h-[500px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          data={data}
          margin={{ top: 20, right: 80, bottom: 20, left: 20 }}
        >
          <PolarGrid stroke="rgba(103, 112, 118, 0.1)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: 'rgba(103, 112, 118, 0.8)', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: 'rgba(103, 112, 118, 0.6)', fontSize: 10 }}
          />
          <Radar
            name="Strengths"
            dataKey="strengths"
            stroke="rgba(103, 112, 118, 1)"
            fill="rgba(103, 112, 118, 0.2)"
            fillOpacity={0.6}
          />
          <Radar
            name="Areas for Improvement"
            dataKey="improvements"
            stroke="rgba(138, 107, 78, 1)"
            fill="rgba(138, 107, 78, 0.2)"
            fillOpacity={0.6}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
            }}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}; 