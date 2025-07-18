import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';

interface WelcomeStepProps {
  onStart: () => void;
}

export function WelcomeStep({ onStart }: WelcomeStepProps) {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <div className="text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#2E363C]">
          {t('welcome.title')}
        </h1>
        <p className="text-xl text-[#687177] max-w-2xl mx-auto">
          {t('welcome.subtitle')}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 border-2 border-[#E7E9EC]">
          <h3 className="text-xl font-semibold text-[#2E363C] mb-4">{t('welcome.features.comprehensive')}</h3>
          <p className="text-[#687177]">
            {t('welcome.description')}
          </p>
        </div>

        <div className="bg-white p-8 border-2 border-[#E7E9EC]">
          <h3 className="text-xl font-semibold text-[#2E363C] mb-4">{t('welcome.features.personalized')}</h3>
          <p className="text-[#687177]">
            {t('welcome.description')}
          </p>
        </div>

        <div className="bg-white p-8 border-2 border-[#E7E9EC]">
          <h3 className="text-xl font-semibold text-[#2E363C] mb-4">{t('welcome.features.actionable')}</h3>
          <p className="text-[#687177]">
            {t('welcome.description')}
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Button
          size="lg"
          icon={ArrowRight}
          iconPosition="right"
          onClick={onStart}
        >
          {t('welcome.startButton')}
        </Button>
      </div>
    </div>
  );
} 