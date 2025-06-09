import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Question, Answer } from '../../../types';

interface MultipleChoiceProps {
  question: Question;
  currentAnswer?: Answer;
  onSelect: (optionId: string, score: number) => void;
}

export function MultipleChoice({ question, currentAnswer, onSelect }: MultipleChoiceProps) {
  if (!question.options) return null;

  return (
    <div className="space-y-4">
      {question.options.map((option) => {
        const isSelected = currentAnswer?.optionId === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id, option.score)}
            className={`w-full text-left p-6 transition-all duration-200 ${
              isSelected
                ? 'bg-[#677076] border-2 border-[#677076] text-white transform scale-[1.02]'
                : 'bg-white border-2 border-[#E7E9EC] hover:border-[#677076] hover:shadow-md text-[#2E363C]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`font-medium ${isSelected ? 'text-white' : 'text-[#2E363C]'}`}>
                {option.text}
              </span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                isSelected 
                  ? 'border-white bg-white/20' 
                  : 'border-[#DCE0E3]'
              }`}>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
} 