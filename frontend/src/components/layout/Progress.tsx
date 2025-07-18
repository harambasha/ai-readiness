import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface ProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function Progress({ currentStep, totalSteps }: ProgressProps) {
  const { t } = useLanguage();
  const percentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="bg-white p-4 border-b border-[#E7E9EC]">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-[#687177]">
          {t('progress.step')} {currentStep} {t('progress.of')} {totalSteps}
        </span>
        <span className="text-sm text-[#687177]">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-[#E7E9EC] rounded-full h-2">
        <div
          className="bg-[#677076] h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
} 