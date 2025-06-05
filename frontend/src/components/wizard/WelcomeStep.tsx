import React from 'react';
import { ArrowRight, Zap, Target } from 'lucide-react';
import { Button } from '../common/Button';
import { AssessmentAreas } from './AssessmentAreas';
import { Testimonials } from './Testimonials';

interface WelcomeStepProps {
  onStart: () => void;
}

export function WelcomeStep({ onStart }: WelcomeStepProps) {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <div className="text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#2E363C]">
          AI Readiness Assessment
        </h1>
        <p className="text-xl text-[#687177] max-w-2xl mx-auto">
          Evaluate your organization's readiness for AI implementation and get personalized recommendations for your journey.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 border-2 border-[#E7E9EC]">
          <h3 className="text-xl font-semibold text-[#2E363C] mb-4">Comprehensive Assessment</h3>
          <p className="text-[#687177]">
            Evaluate your organization across multiple dimensions including strategy, data, infrastructure, and talent.
          </p>
        </div>

        <div className="bg-white p-8 border-2 border-[#E7E9EC]">
          <h3 className="text-xl font-semibold text-[#2E363C] mb-4">Personalized Insights</h3>
          <p className="text-[#687177]">
            Receive tailored recommendations based on your current state and specific business needs.
          </p>
        </div>

        <div className="bg-white p-8 border-2 border-[#E7E9EC]">
          <h3 className="text-xl font-semibold text-[#2E363C] mb-4">Actionable Roadmap</h3>
          <p className="text-[#687177]">
            Get a clear path forward with prioritized steps to improve your AI readiness.
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
          Start Assessment
        </Button>
      </div>
    </div>
  );
} 