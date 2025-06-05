import React, { createContext, useContext, useState, useCallback } from 'react';
import { Answer, WizardContextType, ScoreResult, MaturityLevel } from '../types';
import { questions } from '../data/questions';

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answer[]>([]);

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

  const calculateScore = useCallback((): ScoreResult => {
    let totalScore = 0;
    let maxPossibleScore = 0;

    questions.forEach(question => {
      const answer = answers.find(a => a.questionId === question.id);
      if (answer) {
        if (question.type === 'text') {
          // For text questions, assign a neutral score of 2 (middle of 0-4 scale)
          totalScore += 2 * question.weight;
        } else {
          totalScore += (answer.score || 0) * question.weight;
        }
        maxPossibleScore += 4 * question.weight; // Max score is 4 for all types
      }
    });

    const percentage = maxPossibleScore > 0 
      ? (totalScore / maxPossibleScore) * 100 
      : 0;

    let maturityLevel: MaturityLevel = 'Beginner';
    if (percentage >= 90) maturityLevel = 'Leading';
    else if (percentage >= 75) maturityLevel = 'Advanced';
    else if (percentage >= 60) maturityLevel = 'Established';
    else if (percentage >= 40) maturityLevel = 'Developing';

    return {
      score: totalScore,
      maxScore: maxPossibleScore,
      percentage,
      maturityLevel
    };
  }, [answers]);

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        totalSteps,
        answers,
        setAnswers,
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