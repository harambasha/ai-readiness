import React, { createContext, useContext, useState, useCallback } from 'react';
import { Answer, WizardContextType, ScoreResult, MaturityLevel } from '../types';
import { questions } from '../data/questions';

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showError, setShowError] = useState(false);

  const totalSteps = questions.length + 2; // Questions + Welcome + Results

  const goToNextStep = useCallback(() => {
    if (currentStep === 1) {
      setCurrentStep(2);
      return;
    }
    
    if (currentStep === totalSteps) {
      return;
    }

    const currentQuestion = questions[currentStep - 2];
    const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);
    
    if (!currentAnswer) {
      return; // Don't proceed if question is not answered
    }

    // For slider questions, check if a value is set
    if (currentQuestion.type === 'slider' && currentAnswer.sliderValue === undefined) {
      return;
    }

    // For multiple choice, check if an option is selected
    if (currentQuestion.type === 'multiple-choice' && !currentAnswer.optionId) {
      return;
    }

    // For text questions, check if there's text input
    if (currentQuestion.type === 'text' && (!currentAnswer.textValue || currentAnswer.textValue.trim() === '')) {
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  }, [currentStep, totalSteps, answers]);

  const goToPreviousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const calculateScore = useCallback(() => {
    const totalScore = answers.reduce((sum, answer) => sum + (answer.score || 0), 0);
    const maxPossibleScore = questions.reduce((sum, question) => {
      if (question.type === 'multiple-choice' && question.options) {
        return sum + Math.max(...question.options.map(opt => opt.score));
      }
      if (question.type === 'slider') {
        return sum + (question.slider?.max || 0);
      }
      if (question.type === 'yes-no') {
        return sum + Math.max(question.yesNo?.yesScore || 0, question.yesNo?.noScore || 0);
      }
      return sum;
    }, 0);

    const percentage = (totalScore / maxPossibleScore) * 100;
    let maturityLevel: MaturityLevel = 'Initial';

    if (percentage >= 90) {
      maturityLevel = 'Leading';
    } else if (percentage >= 75) {
      maturityLevel = 'Advanced';
    } else if (percentage >= 60) {
      maturityLevel = 'Managed';
    } else if (percentage >= 45) {
      maturityLevel = 'Defined';
    } else if (percentage >= 30) {
      maturityLevel = 'Developing';
    }

    return {
      percentage,
      maturityLevel,
      score: totalScore,
      maxScore: maxPossibleScore
    };
  }, [answers]);

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        totalSteps,
        answers,
        setAnswers,
        questions,
        showError,
        setShowError,
        goToNextStep,
        goToPreviousStep,
        isFirstStep: currentStep === 1,
        isLastStep: currentStep === totalSteps,
        calculateScore
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}