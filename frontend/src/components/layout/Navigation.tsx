import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface NavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
  currentStep: number;
}

export function Navigation({ 
  isFirstStep, 
  isLastStep, 
  onPrevious, 
  onNext,
  currentStep 
}: NavigationProps) {
  const { t } = useLanguage();
  
  return (
    <div className="flex justify-between p-6 bg-[#000000] border-t border-[#E7E9EC]">
      <button
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`flex items-center px-6 py-3 transition-all duration-200 ${
          isFirstStep
            ? 'text-[#9AA3AA] cursor-not-allowed'
            : 'text-[#2E363C] hover:bg-white hover:shadow-md'
        }`}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        {t('previous')}
      </button>
      <button
        onClick={onNext}
        disabled={isLastStep}
        className={`flex items-center px-6 py-3 transition-all duration-200 ${
          isLastStep
            ? 'text-[#9AA3AA] cursor-not-allowed'
            : 'bg-[#000000] text-white hover:opacity-90'
        }`}
      >
        {currentStep === 1 ? t('start') : t('next')}
        <ArrowRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
} 