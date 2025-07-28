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
import { WelcomeStep } from './wizard/WelcomeStep';
import { useLanguage } from '../context/LanguageContext';
import { questionTranslations, optionTranslations } from '../data/questionTranslations';
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
  const { t, language } = useLanguage();

  // Only get currentQuestion if we're on a question step (after welcome and team warning)
  const currentQuestion = currentStep > 2 && currentStep <= questions.length + 2 
    ? questions[currentStep - 3] 
    : null;

  if (currentStep === 1) {
    return <WelcomeStep onStart={goToNextStep} />;
  }

  // Team approach warning step
  if (currentStep === 2) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-8 text-[#687177]">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">{t('questions')} 0 {t('of')} {totalSteps - 3}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-32 h-1 bg-[#E7E9EC] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D9D9D9] via-[#A3A59F] to-[#B4926E] transition-all duration-500 ease-out"
                style={{ width: '0%' }}
              />
            </div>
            <span className="text-sm font-medium">0%</span>
          </div>
        </div>

        {/* Card container */}
        <div className="overflow-hidden rounded-lg shadow-lg">
          <div className="relative bg-white p-8">
            <div className="text-center mb-8">
              <Users className="w-16 h-16 mx-auto mb-4 text-[#2E363C]" />
              <h2 className="text-2xl font-bold text-[#2E363C] mb-4">
                {t('teamApproachRecommended')}
              </h2>
              <p className="text-[#687177] max-w-2xl mx-auto">
                {t('teamApproachDescription')}
              </p>
            </div>
            
            <div className="bg-[#F5F6FA] border border-[#E7E9EC] rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-[#2E363C] mb-3">
                {t('recommendedParticipants')}
              </h3>
              <ul className="space-y-2 text-[#687177]">
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-[#B4926E]" />
                  {t('ceoOrBusinessOwner')}
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-[#B4926E]" />
                  {t('itManagerOrCto')}
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-[#B4926E]" />
                  {t('operationsManager')}
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-[#B4926E]" />
                  {t('dataAnalystOrScientist')}
                </li>
              </ul>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between p-4 sm:p-6 bg-[#F5F6FA] border-t border-[#E7E9EC] gap-4 sm:gap-0">
            <button
              onClick={goToPreviousStep}
              className="flex items-center justify-center px-4 sm:px-6 py-3 transition-all duration-200 text-[#2E363C] hover:bg-white hover:shadow-md"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('previous')}
            </button>
            <button
              onClick={goToNextStep}
              className="flex items-center justify-center px-4 sm:px-6 py-3 transition-all duration-200 bg-[#000000] text-white hover:opacity-90"
            >
              {t('continueWithAssessment')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === totalSteps) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <ResultsStep />
      </div>
    );
  }

  // If we're on a question step but currentQuestion is null, something went wrong
  if (!currentQuestion) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('error')}</h1>
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      {/* Progress indicator */}
              <div className="flex items-center justify-between mb-8 text-[#687177]">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">{t('questionLabel')} {currentStep - 2} {t('of')} {totalSteps - 3}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-32 h-1 bg-[#E7E9EC] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D9D9D9] via-[#A3A59F] to-[#B4926E] transition-all duration-500 ease-out"
                style={{ width: `${((currentStep - 2) / (totalSteps - 3)) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium">{Math.round(((currentStep - 2) / (totalSteps - 3)) * 100)}%</span>
          </div>
        </div>

      {/* Card container */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div className="relative">
          <QuestionStep
            question={currentQuestion}
            answers={answers}
            setAnswers={setAnswers}
          />
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between p-4 sm:p-6 bg-[#F5F6FA] border-t border-[#E7E9EC] gap-4 sm:gap-0">
          <button
            onClick={goToPreviousStep}
            disabled={isFirstStep}
            className={`flex items-center justify-center px-4 sm:px-6 py-3 transition-all duration-200 ${
              isFirstStep
                ? 'text-[#9AA3AA] cursor-not-allowed'
                : 'text-[#2E363C] hover:bg-white hover:shadow-md'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('previous')}
          </button>
          <button
            onClick={goToNextStep}
            disabled={isLastStep}
            className={`flex items-center justify-center px-4 sm:px-6 py-3 transition-all duration-200 ${
              isLastStep
                ? 'text-[#9AA3AA] cursor-not-allowed'
                : 'bg-[#000000] text-white hover:opacity-90'
            }`}
          >
            {t('next')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}



function ResultsStep() {
  const { calculateScore, answers, language } = useWizard();
  const result = calculateScore();
  const [emailSent, setEmailSent] = useState(false);
  const { t } = useLanguage();

  // Find the email and company name from answers
  const emailAnswer = answers.find((a: Answer) => a.questionId === 'company-email');
  const companyNameAnswer = answers.find((a: Answer) => a.questionId === 'company-name');
  const userEmail = emailAnswer?.textValue;
  const companyName = companyNameAnswer?.textValue || 'Your Company';

  useEffect(() => {
    const sendFinalResults = async () => {
      if (userEmail && !emailSent) {
        try {
          await sendAssessmentResults(userEmail, answers, language);
          setEmailSent(true);
          console.log('Final assessment results email sent successfully');
        } catch (error) {
          console.error('Error sending final assessment results:', error);
        }
      }
    };

    sendFinalResults();
  }, [userEmail, answers, emailSent, language]);

  const getRecommendation = (score: number): string => {
    if (score < 40) return t('yourOrganizationIsInTheEarlyStagesOfAiReadinessFocusOnDevelopingFoundationalCapabilitiesAndBuildingBasicAiAwareness');
    if (score < 60) return t('youReMakingProgressButThereSRoomForImprovementPrioritizeDataInfrastructureAndTalentDevelopment');
    if (score < 75) return t('youReWellOnYourWayConsiderExpandingYourAiInitiativesAndStrengtheningGovernanceFrameworks');
    if (score < 90) return t('strongAiReadinessFocusOnOptimizationAndScalingYourAiCapabilities');
    return t('exceptionalAiReadinessContinueLeadingInnovationAndSharingBestPractices');
  };

  // Calculate radar chart data based on answers
  const calculateRadarData = () => {
    const categories = {
      [t('chartCategories.dataInfrastructure')]: ['data-infrastructure', 'data-quality', 'data-privacy'],
      [t('chartCategories.aiStrategy')]: ['strategy-vision', 'business-alignment', 'roi-expectations'],
      [t('chartCategories.talentDevelopment')]: ['talent-expertise', 'talent-development', 'innovation-culture'],
      [t('chartCategories.technologyStack')]: ['software-tools', 'infrastructure-readiness', 'data-governance'],
      [t('chartCategories.processAutomation')]: ['process-documentation', 'workflow-restructuring', 'change-management']
    };

    const calculateCategoryScore = (categoryQuestions: string[]) => {
      const categoryAnswers = answers.filter(a => categoryQuestions.includes(a.questionId));
      if (categoryAnswers.length === 0) return 0;

      const totalScore = categoryAnswers.reduce((sum, answer) => {
        if (answer.score !== undefined) return sum + answer.score;
        if (answer.sliderValue !== undefined) return sum + (answer.sliderValue / 20);
        if (answer.optionId) {
          const optionScore = parseInt(answer.optionId.replace(/\D/g, ''));
          return sum + (isNaN(optionScore) ? 0 : optionScore);
        }
        return sum;
      }, 0);

      return Math.round((totalScore / (categoryAnswers.length * 5)) * 100);
    };

    const strengths = Object.entries(categories).map(([label, questions]) => ({
      label,
      value: calculateCategoryScore(questions)
    }));

    // Calculate improvements (inverse of strengths)
    const improvements = strengths.map(strength => ({
      label: strength.label,
      value: Math.max(0, 100 - strength.value)
    }));

    return { strengths, improvements };
  };

  const { strengths, improvements } = calculateRadarData();

  // Get top 3 strengths and improvements
  const topStrengths = strengths
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
    .map(s => s.label);

  const topImprovements = improvements
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
    .map(i => i.label);

  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="text-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-[#677076] mb-6 sm:mb-8">
          {t('results.title')}
        </h2>
        
        {/* Team approach warning */}
        <div className="bg-[#F5F6FA] border border-[#E7E9EC] rounded-lg p-4 max-w-2xl mx-auto mb-6">
          <p className="text-[#687177] text-sm">
            <strong className="text-[#B4926E]">💡 {t('tip')}:</strong> {t('assessmentCoversDifferentAreas')}
          </p>
        </div>
        
        <div className="inline-block bg-[#f7f6f4] px-6 sm:px-8 py-3 sm:py-4 rounded-xl mb-6 sm:mb-8 shadow-sm">
          <span className="text-[#677076] text-lg sm:text-xl">
            {t('results.overallScore')}: <span className="font-bold text-[#677076]">{t(`maturityLevels.${result.maturityLevel}`)}</span>
          </span>
        </div>
        <div className="mt-4 sm:mt-6">
          <AnimatedScore value={result.percentage} />
        </div>
        {emailSent && (
          <div className="mt-4 sm:mt-6 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-[#677076] mr-2" />
            <span className="text-[#677076]">
              {t('results.emailSent')}
            </span>
          </div>
        )}
        <button
          className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 bg-[#677076] text-white rounded-lg hover:bg-[#4d545a] transition text-base sm:text-lg font-medium"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert(t('linkCopiedToClipboard'));
          }}
        >
          {t('results.shareResults')}
        </button>
      </div>

      <div className="bg-gray-50 p-6 sm:p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {t('whatThisMeans')}
        </h3>
        <p className="text-gray-600">
          {getRecommendation(result.percentage)}
        </p>
      </div>

      <div className="relative w-full">
        <img
          src="/working_programming.png"
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
          {t('aiReadinessAnalysis')}
        </h3>
        <RadarChart strengths={strengths} improvements={improvements} language={language} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-gray-50 p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {t('results.keyStrengths')}
          </h3>
          <ul className="space-y-4">
            {topStrengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <div className="w-8 h-8 bg-[#677076] rounded-lg flex items-center justify-center mr-4 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-600">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {t('results.areasForImprovement')}
          </h3>
          <ul className="space-y-4">
            {topImprovements.map((improvement, index) => (
              <li key={index} className="flex items-start">
                <div className="w-8 h-8 bg-[#677076] rounded-lg flex items-center justify-center mr-4 mt-1">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-600">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-[#f7f6f4] p-6 sm:p-8 text-center">
        <h3 className="text-2xl font-bold text-[#677076] mb-4">
          {t('readyToAccelerateYourAiJourney')}
        </h3>
        <p className="text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto">
          {t('ourTeamOfAiExpertsAtBloomteqCanHelpYouDevelopAComprehensiveStrategyAndImplementationPlanTailoredToYourOrganizationSNeeds')}
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-[#677076] text-white hover:bg-[#8a6b4e] transition-all duration-200 transform hover:scale-105"
        >
          {t('scheduleAConsultation')}
          <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 ml-2 text-white" />
        </a>
      </div>

      <div className="relative w-full">
        <img
          src="/future_image.png"
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
          {t('nextSteps')}
        </h3>
        <div className="grid gap-4">
          <div className="bg-white p-4 rounded-lg flex items-start">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#677076] rounded-lg flex items-center justify-center mr-4 mt-1">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-gray-600 text-sm sm:text-base">{t('createAnActionPlanBasedOnYourAssessmentResults')}</span>
          </div>
          <div className="bg-white p-4 rounded-lg flex items-start">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#677076] rounded-lg flex items-center justify-center mr-4 mt-1">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-gray-600 text-sm sm:text-base">{t('shareFindingsWithKeyStakeholders')}</span>
          </div>
          <div className="bg-white p-4 rounded-lg flex items-start">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#677076] rounded-lg flex items-center justify-center mr-4 mt-1">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-gray-600 text-sm sm:text-base">{t('scheduleAFollowUpAssessmentInSixMonths')}</span>
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