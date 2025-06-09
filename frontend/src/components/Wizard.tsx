import React, { useState, useEffect } from 'react';
import { useWizard } from '../context/WizardContext';
import { questions } from '../data/questions';
import { sendAssessmentResults } from '../services/emailService';
import { CALENDLY_URL } from '../config/constants';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, Target, Zap, 
  Brain, Users, Star, Shield, 
  Database, Sparkles, Clock 
} from 'lucide-react';
import { Question, Answer } from '../types';
import { QuestionStep } from './assessment/QuestionStep';
import Image from 'next/image';
import { RadarChart } from './RadarChart';

export function Wizard() {
  const {
    currentStep,
    totalSteps,
    goToNextStep,
    goToPreviousStep,
    isFirstStep,
    isLastStep,
    answers,
    setAnswers,
  } = useWizard();

  const currentQuestion = questions[currentStep - 2];

  return (
    <>
      {currentStep === 1 ? (
        <WelcomeStep onStart={goToNextStep} />
      ) : (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          {/* Progress indicator */}
          {currentStep > 1 && currentStep < totalSteps && (
            <div className="flex items-center justify-between mb-8 text-[#687177]">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span className="text-sm font-medium">Question {currentStep - 1} of {totalSteps - 2}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-32 h-1 bg-[#E7E9EC] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D9D9D9] via-[#A3A59F] to-[#B4926E] transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep - 1) / (totalSteps - 2)) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{Math.round(((currentStep - 1) / (totalSteps - 2)) * 100)}%</span>
              </div>
            </div>
          )}

          {/* Card container */}
          <div className={` overflow-hidden${currentStep !== totalSteps ? ' shadow-lg' : ''}`}>
            <div className="relative">
              {currentStep > 1 && currentStep <= questions.length + 1 && (
                <QuestionStep
                  question={currentQuestion}
                  answers={answers}
                  setAnswers={setAnswers}
                />
              )}
              {currentStep === totalSteps && (
                <div>
                  <ResultsStep />
                </div>
              )}
            </div>

            {/* Navigation */}
            {currentStep !== totalSteps && (
              <div className="flex justify-between p-6 bg-[#F5F6FA] border-t border-[#E7E9EC]">
                <button
                  onClick={goToPreviousStep}
                  disabled={isFirstStep}
                  className={`flex items-center px-6 py-3  transition-all duration-200 ${
                    isFirstStep
                      ? 'text-[#9AA3AA] cursor-not-allowed'
                      : 'text-[#2E363C] hover:bg-white hover:shadow-md'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>
                <button
                  onClick={goToNextStep}
                  disabled={isLastStep}
                  className={`flex items-center px-6 py-3 transition-all duration-200 ${
                    isLastStep
                      ? 'text-[#9AA3AA] cursor-not-allowed'
                      : 'bg-[#000000] text-white hover:opacity-90'
                  }`}
                >
                  {currentStep === 1 ? 'Start Assessment' : 'Next'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function WelcomeStep({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[800px] h-[800px] top-[-400px] right-[-400px] rounded-full bg-blue-500/5 blur-3xl"></div>
          <div className="absolute w-[600px] h-[600px] bottom-[-300px] left-[-300px] rounded-full bg-purple-500/5 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="absolute top-8 left-8 z-20">
            <img 
              src="/public/bloomteq-logo.svg" 
              alt="Bloomteq Logo" 
              className="h-8 w-auto"
              onError={(e) => {
                console.error('Error loading logo:', e);
                const img = e.target as HTMLImageElement;
                console.log('Failed image src:', img.src);
              }}
            />
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 mb-8">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">AI Readiness Assessment</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
                Transform Your Business with 
                <span className="text-[#677076]"> AI Innovation</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed">
                Discover if your organization is ready to harness the power of AI. Get personalized insights and actionable recommendations in just 10 minutes.
              </p>

              <button
                onClick={onStart}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg bg-[#000000] text-white hover:opacity-90 transition-all duration-200 transform hover:scale-105"
              >
                Start Free Assessment
                <ArrowRight className="w-6 h-6 ml-2" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#F5F6FA] flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#B4926E] stroke-[#000000]" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Quick</div>
                    <div className="text-sm text-gray-500">10 minutes</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#F5F6FA] flex items-center justify-center">
                    <Zap className="w-6 h-6 text-[#B4926E] stroke-[#000000]" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Free</div>
                    <div className="text-sm text-gray-500">No cost</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#F5F6FA] flex items-center justify-center">
                    <Target className="w-6 h-6 text-[#B4926E] stroke-[#000000]" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Personalized</div>
                    <div className="text-sm text-gray-500">Custom insights</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full lg:w-1/2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl"></div>
              <img
                src="/public/hero-image.svg"
                alt="AI Readiness Assessment"
                className="relative w-full max-w-[600px] mx-auto"
                onError={(e) => {
                  console.error('Error loading hero image:', e);
                  const img = e.target as HTMLImageElement;
                  console.log('Failed image src:', img.src);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Areas */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Comprehensive Assessment Areas</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI readiness scorecard evaluates your organization across four critical dimensions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                icon: Brain,
                title: "Strategic Vision",
                description: "Evaluate your AI strategy alignment with business goals",
                details: "Assess how well your AI initiatives align with overall business objectives, market positioning, and long-term growth plans. This includes evaluating your AI roadmap, investment priorities, and strategic partnerships.",
                color: "from-[#B4926E] to-[#A3A59F]"
              },
              {
                icon: Database,
                title: "Data Readiness",
                description: "Assess your data quality and infrastructure capabilities",
                details: "Review your data collection, storage, and processing capabilities. Evaluate data quality, governance, security measures, and the maturity of your data infrastructure to support AI initiatives.",
                color: "from-[#B4926E] to-[#A3A59F]"
              },
              {
                icon: Shield,
                title: "Governance & Ethics",
                description: "Review your AI policies and ethical framework",
                details: "Examine your organization's approach to AI governance, including ethical guidelines, compliance frameworks, risk management, and responsible AI practices. Assess how well you're addressing bias, privacy, and transparency.",
                color: "from-[#B4926E] to-[#A3A59F]"
              },
              {
                icon: Users,
                title: "Team Capability",
                description: "Gauge your team's AI expertise and readiness",
                details: "Evaluate your organization's AI talent, skills development programs, and cultural readiness. Assess technical capabilities, training initiatives, and how well your team can implement and maintain AI solutions.",
                color: "from-[#B4926E] to-[#A3A59F]"
              }
            ].map((area, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 transform transition-transform group-hover:scale-[1.02]"></div>
                <div className="relative glass-card p-6 sm:p-8 h-full">
                  <div className={`w-12 sm:w-16 h-12 sm:h-16 bg-[#677076] flex items-center justify-center mb-4 sm:mb-6`}>
                    <area.icon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{area.title}</h3>
                  <p className="text-gray-600 mb-4 sm:mb-6">{area.description}</p>
                  <p className="text-gray-500 text-sm sm:text-base">{area.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsStep() {
  const { calculateScore, answers } = useWizard();
  const result = calculateScore();
  const [emailSent, setEmailSent] = useState(false);

  // Find the email and company name from answers
  const emailAnswer = answers.find((a: Answer) => a.questionId === 'company-email');
  const companyNameAnswer = answers.find((a: Answer) => a.questionId === 'company-name');
  const userEmail = emailAnswer?.textValue;
  const companyName = companyNameAnswer?.textValue || 'Your Company';

  useEffect(() => {
    const sendFinalResults = async () => {
      if (userEmail && !emailSent) {
        try {
          await sendAssessmentResults(
            userEmail,
            answers,
            result.percentage,
            result.maturityLevel
          );
          setEmailSent(true);
          console.log('Final assessment results email sent successfully');
        } catch (error) {
          console.error('Error sending final assessment results:', error);
        }
      }
    };

    sendFinalResults();
  }, [userEmail, answers, result, emailSent]);

  const getRecommendation = (score: number): string => {
    if (score < 40) return "Your organization is in the early stages of AI readiness. Focus on developing foundational capabilities and building basic AI awareness.";
    if (score < 60) return "You're making progress but there's room for improvement. Prioritize data infrastructure and talent development.";
    if (score < 75) return "You're well on your way! Consider expanding your AI initiatives and strengthening governance frameworks.";
    if (score < 90) return "Strong AI readiness! Focus on optimization and scaling your AI capabilities.";
    return "Exceptional AI readiness! Continue leading innovation and sharing best practices.";
  };

  const chartData = {
    strengths: [
      { label: 'Data Infrastructure', value: 85 },
      { label: 'AI Strategy', value: 75 },
      { label: 'Talent Development', value: 65 },
      { label: 'Technology Stack', value: 70 },
      { label: 'Process Automation', value: 60 },
    ],
    improvements: [
      { label: 'Data Infrastructure', value: 40 },
      { label: 'AI Strategy', value: 45 },
      { label: 'Talent Development', value: 35 },
      { label: 'Technology Stack', value: 50 },
      { label: 'Process Automation', value: 55 },
    ],
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="text-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-[#677076] mb-6 sm:mb-8">
          {companyName}'s AI Readiness Score
        </h2>
        <div className="inline-block bg-[#f7f6f4] px-6 sm:px-8 py-3 sm:py-4 rounded-xl mb-6 sm:mb-8 shadow-sm">
          <span className="text-[#677076] text-lg sm:text-xl">
            Maturity Level: <span className="font-bold text-[#677076]">{result.maturityLevel}</span>
          </span>
        </div>
        <div className="mt-4 sm:mt-6">
          <AnimatedScore value={result.percentage} />
        </div>
        {emailSent && (
          <div className="mt-4 sm:mt-6 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-[#677076] mr-2" />
            <span className="text-[#677076]">
              Results have been sent to <span className="font-semibold">{userEmail}</span>
            </span>
          </div>
        )}
        <button
          className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 bg-[#677076] text-white rounded-lg hover:bg-[#4d545a] transition text-base sm:text-lg font-medium"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
          }}
        >
          Share Results
        </button>
      </div>

      <div className="bg-gray-50 p-6 sm:p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          What This Means
        </h3>
        <p className="text-gray-600">
          {getRecommendation(result.percentage)}
        </p>
      </div>

      <div className="relative w-full">
        <img
          src="/public/working_programming.png"
          alt="Working Programming"
          className="w-full h-auto rounded-lg shadow-lg"
          onError={(e) => {
            console.error('Error loading working programming image:', e);
            const img = e.target as HTMLImageElement;
            console.log('Failed image src:', img.src);
          }}
        />
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          AI Readiness Analysis
        </h3>
        <RadarChart strengths={chartData.strengths} improvements={chartData.improvements} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-gray-50 p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Key Strengths
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="w-8 h-8 bg-[#677076] rounded-lg flex items-center justify-center mr-4 mt-1">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-600">Data infrastructure and quality</span>
            </li>
            <li className="flex items-start">
              <div className="w-8 h-8 bg-[#677076] rounded-lg flex items-center justify-center mr-4 mt-1">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-600">AI strategy alignment</span>
            </li>
            <li className="flex items-start">
              <div className="w-8 h-8 bg-[#677076] rounded-lg flex items-center justify-center mr-4 mt-1">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-600">Talent development programs</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Areas for Improvement
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="w-8 h-8 bg-[#677076] rounded-lg flex items-center justify-center mr-4 mt-1">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-600">AI governance framework</span>
            </li>
            <li className="flex items-start">
              <div className="w-8 h-8 bg-[#677076] rounded-lg flex items-center justify-center mr-4 mt-1">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-600">Change management processes</span>
            </li>
            <li className="flex items-start">
              <div className="w-8 h-8 bg-[#677076] rounded-lg flex items-center justify-center mr-4 mt-1">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-600">Innovation culture development</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-[#f7f6f4] p-6 sm:p-8 text-center">
        <h3 className="text-2xl font-bold text-[#677076] mb-4">
          Ready to Accelerate Your AI Journey?
        </h3>
        <p className="text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Our team of AI experts at Bloomteq can help you develop a comprehensive strategy and implementation plan tailored to your organization's needs.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-[#677076] text-white hover:bg-[#8a6b4e] transition-all duration-200 transform hover:scale-105"
        >
          Schedule a Consultation
          <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 ml-2 text-white" />
        </a>
      </div>

      <div className="relative w-full">
        <img
          src="/public/future_image.png"
          alt="Future of AI"
          className="w-full h-auto rounded-lg shadow-lg"
          onError={(e) => {
            console.error('Error loading future image:', e);
            const img = e.target as HTMLImageElement;
            console.log('Failed image src:', img.src);
          }}
        />
      </div>

      <div className="bg-gray-50 p-6 sm:p-8 mt-8 sm:mt-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Next Steps
        </h3>
        <div className="grid gap-4">
          <div className="bg-white p-4 rounded-lg flex items-start">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#677076] rounded-lg flex items-center justify-center mr-4 mt-1">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-gray-600 text-sm sm:text-base">Create an action plan based on your assessment results</span>
          </div>
          <div className="bg-white p-4 rounded-lg flex items-start">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#677076] rounded-lg flex items-center justify-center mr-4 mt-1">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-gray-600 text-sm sm:text-base">Share findings with key stakeholders</span>
          </div>
          <div className="bg-white p-4 rounded-lg flex items-start">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#677076] rounded-lg flex items-center justify-center mr-4 mt-1">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-gray-600 text-sm sm:text-base">Schedule a follow-up assessment in 6 months</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedScore({ value }: { value: number }) {
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Number((progress * value).toFixed(1)));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }, [value]);
  return (
    <div className="text-8xl font-bold text-[#677076] mb-6 tracking-tight">{display}%</div>
  );
}