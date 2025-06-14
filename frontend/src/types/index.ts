import { LucideIcon } from 'lucide-react';

export type MaturityLevel = 
  | 'Initial'
  | 'Developing'
  | 'Defined'
  | 'Managed'
  | 'Advanced'
  | 'Leading';

export type QuestionType = 'multiple-choice' | 'slider' | 'text' | 'yes-no';

export interface Answer {
  questionId: string;
  optionId?: string;
  score?: number;
  sliderValue?: number;
  textValue?: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  description?: string;
  category?: string;
  weight?: number;
  options?: Array<{
    id: string;
    text: string;
    score: number;
  }>;
  slider?: {
    labels: {
      start: string;
      end: string;
    };
    min: number;
    max: number;
    step?: number;
  };
  textInput?: {
    placeholder: string;
    maxLength: number;
  };
  yesNo?: {
    yesScore: number;
    noScore: number;
  };
}

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
  icon: LucideIcon;
  color: string;
};

export type ScoreResult = {
  score: number;
  maxScore: number;
  percentage: number;
  maturityLevel: MaturityLevel;
};

export interface WizardContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  currentQuestion: Question | null;
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
  questions: Question[];
  showError: boolean;
  setShowError: (show: boolean) => void;
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
  canProceed: () => boolean;
}