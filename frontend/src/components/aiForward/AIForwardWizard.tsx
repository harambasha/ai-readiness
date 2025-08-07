import React, { useState, useCallback } from 'react';
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
      return answer && typeof answer === 'string' && answer.trim().length > 0;
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

      // Send data to backend
      const response = await fetch('/api/ai-forward-submit', {
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
        throw new Error('Greška prilikom slanja podataka');
      }

      setCurrentStep(aiForwardQuestions.length + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Došlo je do greške');
    } finally {
      setIsSubmitting(false);
    }
  }, [answers]);

  const currentQuestion = aiForwardQuestions[currentStep - 1];
  const progress = ((currentStep - 1) / aiForwardQuestions.length) * 100;

  if (currentStep === 0) {
    return <AIForwardWelcomeStep onStart={handleStart} />;
  }

  if (currentStep > aiForwardQuestions.length) {
    return <AIForwardSuccessStep />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-900">FORWARD</span>
            </div>
            
            <div className="text-sm text-gray-500">
              {t.progress.step} {currentStep} {t.progress.of} {aiForwardQuestions.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
} 