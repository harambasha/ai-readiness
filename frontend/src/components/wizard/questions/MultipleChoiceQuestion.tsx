import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Question, Answer } from '../../../types';
import { COLORS, STYLES } from '../../../constants/questions';

interface MultipleChoiceQuestionProps {
  question: Question & { type: 'multiple-choice' };
  currentAnswer?: Answer;
  onSelect: (optionId: string, score: number) => void;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  currentAnswer,
  onSelect,
}) => {
  return (
    <div className="space-y-4">
      {question.options?.map((option) => {
        const isSelected = currentAnswer?.optionId === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id, option.score)}
            className={`w-full text-left p-6 ${STYLES.TRANSITION} ${
              isSelected
                ? `bg-[${COLORS.PRIMARY}] border-2 border-[${COLORS.PRIMARY}] text-white ${STYLES.SCALE.SELECTED}`
                : `bg-[${COLORS.BACKGROUND.WHITE}] border-2 border-[${COLORS.BORDER.DEFAULT}] hover:border-[${COLORS.BORDER.HOVER}] hover:shadow-md text-[${COLORS.TEXT.SECONDARY}]`
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-medium ${isSelected ? 'text-white' : `text-[${COLORS.TEXT.SECONDARY}]`}`}>
                {option.text}
              </span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${STYLES.TRANSITION} ${
                isSelected 
                  ? 'border-white bg-white/20' 
                  : `border-[${COLORS.BORDER.DEFAULT}]`
              }`}>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}; 