import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Question, Answer } from '../../types';
import { sendAssessmentResults } from '../../services/emailService';
import { MultipleChoice, Slider, TextInput } from './QuestionTypes';

interface QuestionStepProps {
  question: Question;
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
  showError?: boolean;
}

export function QuestionStep({ question, answers, setAnswers }: QuestionStepProps) {
  const currentAnswer = answers.find(a => a.questionId === question.id);

  const handleMultipleChoiceSelect = (optionId: string) => {
    const option = question.options?.find(opt => opt.id === optionId);
    const newAnswers = answers.filter(a => a.questionId !== question.id);
    newAnswers.push({
      questionId: question.id,
      optionId,
      score: option?.score || 0
    });
    setAnswers(newAnswers);
  };

  const handleSliderChange = (value: number) => {
    const newAnswers = answers.filter(a => a.questionId !== question.id);
    newAnswers.push({
      questionId: question.id,
      sliderValue: value,
      score: Math.round(value / 25) // Convert percentage to 0-4 score
    });
    setAnswers(newAnswers);
  };

  const handleTextChange = (value: string) => {
    const newAnswers = answers.filter(a => a.questionId !== question.id);
    newAnswers.push({
      questionId: question.id,
      textValue: value,
      score: 0 // Text questions don't contribute to score
    });
    setAnswers(newAnswers);
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