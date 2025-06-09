import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

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
  const data: ChartData<'radar'> = {
    labels: strengths.map(s => s.label),
    datasets: [
      {
        label: 'Strengths',
        data: strengths.map(s => s.value),
        backgroundColor: 'rgba(103, 112, 118, 0.2)',
        borderColor: 'rgba(103, 112, 118, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(103, 112, 118, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(103, 112, 118, 1)',
      },
      {
        label: 'Areas for Improvement',
        data: improvements.map(i => i.value),
        backgroundColor: 'rgba(138, 107, 78, 0.2)',
        borderColor: 'rgba(138, 107, 78, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(138, 107, 78, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(138, 107, 78, 1)',
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(103, 112, 118, 0.1)',
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          color: 'rgba(103, 112, 118, 0.8)',
        },
        pointLabels: {
          color: 'rgba(103, 112, 118, 0.8)',
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgba(103, 112, 118, 0.8)',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Radar data={data} options={options} />
    </div>
  );
}; 