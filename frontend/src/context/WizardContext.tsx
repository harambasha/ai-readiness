import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { questions } from '../data/questions';
import { Question, Answer, MaturityLevel, WizardContextType } from '../types';
import { useLanguage } from './LanguageContext';

export const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showError, setShowError] = useState(false);
  const { language } = useLanguage();

  const totalSteps = questions.length + 3; // Questions + Welcome + Team Warning + Results

  // Update current question when step changes
  useEffect(() => {
    if (currentStep > 2 && currentStep <= questions.length + 2) {
      setCurrentQuestion(questions[currentStep - 3]);
    } else {
      setCurrentQuestion(null);
    }
  }, [currentStep]);

  const goToNextStep = useCallback(() => {
    if (currentStep === 1) {
      setCurrentStep(2); // Go to team warning
      return;
    }
    
    if (currentStep === 2) {
      setCurrentStep(3); // Go to first question
      return;
    }
    
    if (currentStep === totalSteps) {
      return;
    }

    // Only validate answers for question steps (step 3 and onwards)
    const currentQuestion = questions[currentStep - 3];
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
    const totalScore = answers.reduce((sum, answer) => {
      const question = questions.find(q => q.id === answer.questionId.split('_')[0]);
      if (!question) return sum;

      let answerScore = 0;
      if (answer.score !== undefined) {
        answerScore = answer.score;
      } else if (answer.sliderValue !== undefined) {
        // Convert slider percentage to a score out of 5
        answerScore = answer.sliderValue / 20; // Divide by 20 to convert 0-100 to 0-5 scale
      } else if (answer.optionId) {
        // Extract number from optionId (e.g., 'ci3' -> 3)
        const optionScore = parseInt(answer.optionId.replace(/\D/g, ''));
        if (!isNaN(optionScore)) {
          answerScore = optionScore;
        }
      }

      // Apply question weight
      return sum + (answerScore * (question.weight || 1));
    }, 0);

    const maxPossibleScore = questions.reduce((sum, question) => {
      if (question.type === 'multiple-choice' && question.options) {
        const maxOptionScore = Math.max(...question.options.map(opt => opt.score));
        return sum + (maxOptionScore * (question.weight || 1));
      }
      if (question.type === 'slider') {
        return sum + (5 * (question.weight || 1)); // Slider max score is 5 (100/20)
      }
      if (question.type === 'yes-no') {
        const maxYesNoScore = Math.max(question.yesNo?.yesScore || 0, question.yesNo?.noScore || 0);
        return sum + (maxYesNoScore * (question.weight || 1));
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
      score: totalScore,
      maxScore: maxPossibleScore,
      percentage: Math.round(percentage * 100) / 100, // Round to 2 decimal places
      maturityLevel
    };
  }, [answers]);

  const canProceed = useCallback(() => {
    if (!currentQuestion) return false;

    const currentAnswer = answers.find((a) => a.questionId === currentQuestion.id);
    if (!currentAnswer) return false;

    switch (currentQuestion.type) {
      case 'multiple-choice':
        return currentAnswer.optionId !== undefined;
      case 'slider':
        return currentAnswer.score !== undefined || currentAnswer.sliderValue !== undefined;
      case 'text':
        return currentAnswer.textValue !== undefined && currentAnswer.textValue.trim() !== '';
      default:
        return false;
    }
  }, [currentQuestion, answers]);

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        totalSteps,
        currentQuestion,
        answers,
        setAnswers,
        questions,
        showError,
        setShowError,
        goToNextStep,
        goToPreviousStep,
        isFirstStep: currentStep === 1,
        isLastStep: currentStep === totalSteps,
        calculateScore,
        canProceed,
        language
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