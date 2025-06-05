import React from 'react';
import { Question, Answer } from '../../types';
import { MultipleChoice, Slider, TextInput } from './QuestionTypes';

interface QuestionStepProps {
  question: Question;
  currentAnswer?: Answer;
  onAnswer: (answer: Answer) => void;
}

export function QuestionStep({ question, currentAnswer, onAnswer }: QuestionStepProps) {
  const handleMultipleChoiceSelect = (optionId: string) => {
    const option = question.options?.find(opt => opt.id === optionId);
    onAnswer({
      questionId: question.id,
      optionId,
      score: option?.score || 0
    });
  };

  const handleSliderChange = (value: number) => {
    onAnswer({
      questionId: question.id,
      sliderValue: value,
      score: Math.round(value / 25) // Convert percentage to 0-4 score
    });
  };

  const handleTextChange = (value: string) => {
    onAnswer({
      questionId: question.id,
      textValue: value,
      score: 0 // Text questions don't contribute to score
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#2E363C]">{question.text}</h2>
      </div>

      <div className="space-y-6">
        {question.type === 'multiple-choice' && (
          <MultipleChoice
            question={question}
            currentAnswer={currentAnswer}
            onSelect={handleMultipleChoiceSelect}
          />
        )}

        {question.type === 'slider' && (
          <Slider
            question={question}
            currentAnswer={currentAnswer}
            onChange={handleSliderChange}
          />
        )}

        {question.type === 'text' && (
          <TextInput
            question={question}
            currentAnswer={currentAnswer}
            onChange={handleTextChange}
          />
        )}
      </div>
    </div>
  );
} 