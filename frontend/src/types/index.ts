import { DivideIcon as LucideIcon } from 'lucide-react';
import { Answer, Question } from '../constants/types';

export type QuestionType = 'multiple-choice' | 'slider' | 'text' | 'yes-no';

export type Question = {
  id: string;
  text: string;
  description: string;
  category: Category;
  type: QuestionType;
  weight: number;
  options?: Option[];
  slider?: {
    min: number;
    max: number;
    step: number;
    labels: {
      start: string;
      end: string;
    };
  };
  textInput?: {
    placeholder: string;
    maxLength: number;
  };
  yesNo?: {
    yesScore: number;
    noScore: number;
  };
};

export type Option = {
  id: string;
  text: string;
  score: number;
};

export type Category = 
  | 'strategy'
  | 'data'
  | 'infrastructure'
  | 'talent'
  | 'governance'
  | 'culture';

export type CategoryInfo = {
  id: Category;
  title: string;
  description: string;
  icon: typeof LucideIcon;
  color: string;
};

export type Answer = {
  questionId: string;
  optionId?: string;
  score?: number;
  sliderValue?: number;
  textValue?: string;
};

export type ScoreResult = {
  score: number;
  maxScore: number;
  percentage: number;
  maturityLevel: MaturityLevel;
};

export type MaturityLevel = 
  | 'Initial'
  | 'Developing'
  | 'Defined'
  | 'Managed'
  | 'Advanced'
  | 'Leading';

export interface WizardContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
  questions: Question[];
  showError: boolean;
  setShowError: (show: boolean) => void;
  totalSteps: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  calculateScore: () => {
    percentage: number;
    maturityLevel: MaturityLevel;
    score: number;
    maxScore: number;
  };
}