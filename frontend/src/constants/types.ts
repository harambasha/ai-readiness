export type QuestionType = 'multiple-choice' | 'slider' | 'text' | 'yes-no';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  description?: string;
  category?: string;
  weight?: number;
  options?: {
    id: string;
    text: string;
    score: number;
  }[];
  slider?: {
    labels: {
      start: string;
      end: string;
    };
    min: number;
    max: number;
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

export interface Answer {
  questionId: string;
  optionId?: string;
  score?: number;
  sliderValue?: number;
  textValue?: string;
} 