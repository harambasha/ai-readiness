import React, { useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Target } from 'lucide-react';
import { AIForwardWelcomeStep } from './AIForwardWelcomeStep';
import { AIForwardQuestionStep } from './AIForwardQuestionStep';
import { AIForwardSuccessStep } from './AIForwardSuccessStep';
import { aiForwardQuestions } from '../../data/aiForwardQuestions';
import { aiForwardTranslations } from '../../config/aiForwardTranslations';

interface AIForwardAnswers {
  [key: string]: string | string[] | number | null;
}

export function AIForwardWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AIForwardAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = aiForwardTranslations;

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation function
  const validatePhone = (phone: string): boolean => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    // Check if it has at least 8 digits (international standard)
    return cleanPhone.length >= 8;
  };

  const handleStart = useCallback(() => {
    setCurrentStep(1);
  }, []);

  const handleAnswerChange = useCallback((questionId: string, value: string | string[] | number | null) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < aiForwardQuestions.length) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const validateCurrentQuestion = useCallback(() => {
    const currentQuestion = aiForwardQuestions[currentStep - 1];
    if (!currentQuestion?.required) return true;

    const answer = answers[currentQuestion.id];
    
    if (currentQuestion.type === 'text') {
      if (!answer || typeof answer !== 'string' || answer.trim().length === 0) {
        return false;
      }

      // Email validation
      if (currentQuestion.id === 'email') {
        return validateEmail(answer.trim());
      }

      // Phone validation
      if (currentQuestion.id === 'phone') {
        return validatePhone(answer.trim());
      }

      return true;
    }
    
    if (currentQuestion.type === 'multiple-choice') {
      return answer && Array.isArray(answer) && answer.length > 0;
    }
    
    if (currentQuestion.type === 'yes-no') {
      return answer !== null && answer !== undefined;
    }
    
    if (currentQuestion.type === 'likert') {
      return typeof answer === 'number' && answer >= 1 && answer <= 5;
    }
    
    return true;
  }, [currentStep, answers]);

  const getValidationMessage = useCallback(() => {
    const currentQuestion = aiForwardQuestions[currentStep - 1];
    if (!currentQuestion) return '';

    const answer = answers[currentQuestion.id];
    
    if (currentQuestion.type === 'text') {
      if (!answer || typeof answer !== 'string' || answer.trim().length === 0) {
        return 'Ovo polje je obavezno';
      }

      // Email validation message
      if (currentQuestion.id === 'email') {
        if (!validateEmail(answer.trim())) {
          return 'Molimo unesite validnu email adresu';
        }
      }

      // Phone validation message
      if (currentQuestion.id === 'phone') {
        if (!validatePhone(answer.trim())) {
          return 'Molimo unesite validan broj telefona';
        }
      }
    }
    
    return '';
  }, [currentStep, answers]);

  const canProceedToNext = useCallback(() => {
    return validateCurrentQuestion();
  }, [validateCurrentQuestion]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate all required questions
      const missingRequired = aiForwardQuestions.filter(q => 
        q.required && !answers[q.id]
      );

      if (missingRequired.length > 0) {
        throw new Error('Molimo odgovorite na sva obavezna pitanja');
      }

      // Move directly to success step
      setCurrentStep(aiForwardQuestions.length + 1);

      // Try to send data to backend (but don't block success display)
      try {
        const response = await fetch('/.netlify/functions/ai-forward-submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answers,
            timestamp: new Date().toISOString(),
            project: 'AI_FORWARD'
          }),
        });

        if (!response.ok) {
          console.warn('Greška prilikom slanja podataka, ali zahvalnica je prikazana');
        }
      } catch (emailError) {
        console.warn('Email nije poslat, ali zahvalnica je prikazana:', emailError);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Došlo je do greške');
    } finally {
      setIsSubmitting(false);
    }
  }, [answers]);

  // Show welcome step
  if (currentStep === 0) {
    return <AIForwardWelcomeStep onStart={handleStart} />;
  }

  // Show success step
  if (currentStep > aiForwardQuestions.length) {
    return <AIForwardSuccessStep />;
  }

  const currentQuestion = aiForwardQuestions[currentStep - 1];
  const progress = (currentStep / aiForwardQuestions.length) * 100;
  const validationMessage = getValidationMessage();

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-8 text-[#687177]">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span className="text-sm font-medium">{t.progress.step} {currentStep} {t.progress.of} {aiForwardQuestions.length}</span>
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

      {/* Card container */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div className="relative">
          <AIForwardQuestionStep
            question={currentQuestion}
            value={answers[currentQuestion.id]}
            onChange={(value) => handleAnswerChange(currentQuestion.id, value)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={canProceedToNext()}
            isLastQuestion={currentStep === aiForwardQuestions.length}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between p-4 sm:p-6 bg-[#F5F6FA] border-t border-[#E7E9EC] gap-4 sm:gap-0">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center justify-center px-4 sm:px-6 py-3 transition-all duration-200 ${
              currentStep === 1
                ? 'text-[#9AA3AA] cursor-not-allowed'
                : 'text-[#2E363C] hover:bg-white hover:shadow-md'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t.navigation.previous}
          </button>
          <div className="flex flex-col items-end space-y-2">
            {error && (
              <p className="text-sm text-red-600 flex items-center">
                <span className="mr-1">⚠️</span>
                {error}
              </p>
            )}
            {validationMessage && (
              <p className="text-sm text-red-600 flex items-center">
                <span className="mr-1">⚠️</span>
                {validationMessage}
              </p>
            )}
            <button
              onClick={currentStep === aiForwardQuestions.length ? handleSubmit : handleNext}
              disabled={!canProceedToNext() || isSubmitting}
              className={`flex items-center justify-center px-4 sm:px-6 py-3 transition-all duration-200 ${
                !canProceedToNext() || isSubmitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#000000] text-white hover:opacity-90'
              }`}
            >
              {isSubmitting ? t.common.loading : (currentStep === aiForwardQuestions.length ? t.navigation.submit : t.navigation.next)}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 