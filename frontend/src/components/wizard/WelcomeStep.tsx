import React from 'react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';

interface WelcomeStepProps {
  onStart: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[800px] h-[800px] top-[-400px] right-[-400px] rounded-full bg-blue-500/5 blur-3xl"></div>
          <div className="absolute w-[600px] h-[600px] bottom-[-300px] left-[-300px] rounded-full bg-purple-500/5 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="absolute top-8 left-8 z-20">
            <img src="/bloomteq-logo.svg" alt="Bloomteq Logo" className="h-8 w-auto" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 mb-8">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">AI Readiness Assessment</span>
              </div>
              
              <h1 className="text-6xl font-bold mb-8 leading-tight">
                Transform Your Business with 
                <span className="text-[#677076]"> AI Innovation</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Discover if your organization is ready to harness the power of AI. Get personalized insights and actionable recommendations in just 10 minutes.
              </p>

              <button
                onClick={onStart}
                className="inline-flex items-center px-8 py-4 text-lg bg-[#000000] text-white hover:opacity-90 transition-all duration-200 transform hover:scale-105"
              >
                Start Free Assessment
                <ArrowRight className="w-6 h-6 ml-2" />
              </button>

              <FeatureHighlights />
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl"></div>
              <img 
                src="/hero-image.svg"
                alt="AI Technology"
                className="relative w-[600px] h-[600px]"
              />
            </div>
          </div>
        </div>
      </div>

      <AssessmentAreas />
      <Testimonials />
    </div>
  );
};

const FeatureHighlights: React.FC = () => (
  <div className="flex items-center space-x-8 mt-12">
    <FeatureItem 
      icon={Clock}
      title="Quick"
      description="10 minutes"
    />
    <FeatureItem 
      icon={Zap}
      title="Free"
      description="No cost"
    />
    <FeatureItem 
      icon={Target}
      title="Personalized"
      description="Custom insights"
    />
  </div>
);

interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, description }) => (
  <div className="flex items-center space-x-3">
    <div className="w-12 h-12 bg-[#F5F6FA] flex items-center justify-center">
      <Icon className="w-6 h-6 text-[#B4926E] stroke-[#000000]" />
    </div>
    <div>
      <div className="font-medium text-gray-900">{title}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
  </div>
); 