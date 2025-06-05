import React from 'react';
import { Target } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep - 1) / (totalSteps - 2)) * 100;
  
  return (
    <div className="flex items-center justify-between mb-8 text-[#687177]">
      <div className="flex items-center space-x-2">
        <Target className="w-5 h-5" />
        <span className="text-sm font-medium">Question {currentStep - 1} of {totalSteps - 2}</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-32 h-1 bg-[#E7E9EC] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#D9D9D9] via-[#A3A59F] to-[#B4926E] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-medium">{Math.round(progress)}%</span>
      </div>
    </div>
  );
} 