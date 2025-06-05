import React from 'react';
import { Question, Answer, QuestionType } from '../../types';
import { MultipleChoiceQuestion } from './questions/MultipleChoiceQuestion';
import { SliderQuestion } from './questions/SliderQuestion';
import { TextQuestion } from './questions/TextQuestion';

interface QuestionStepProps {
  question: Question;
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({
  question,
  answers,
  setAnswers,
}) => {
  const currentAnswer = answers.find((a) => a.questionId === question.id);

  const handleOptionSelect = (optionId: string, score: number) => {
    const newAnswers = answers.filter((a) => a.questionId !== question.id);
    newAnswers.push({ questionId: question.id, optionId, score });
    setAnswers(newAnswers);
  };

  const handleSliderChange = (value: number) => {
    const newAnswers = answers.filter((a) => a.questionId !== question.id);
    newAnswers.push({
      questionId: question.id,
      score: (value / 100) * 4,
      sliderValue: value,
    });
    setAnswers(newAnswers);
  };

  const handleTextChange = (value: string) => {
    const newAnswers = answers.filter((a) => a.questionId !== question.id);
    newAnswers.push({
      questionId: question.id,
      textValue: value
    });
    setAnswers(newAnswers);
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <MultipleChoiceQuestion
            question={question as Question & { type: 'multiple-choice' }}
            currentAnswer={currentAnswer}
            onSelect={handleOptionSelect}
          />
        );
      case 'slider':
        return (
          <SliderQuestion
            question={question as Question & { type: 'slider' }}
            currentAnswer={currentAnswer}
            onChange={handleSliderChange}
          />
        );
      case 'text':
        return (
          <TextQuestion
            question={question as Question & { type: 'text' }}
            currentAnswer={currentAnswer}
            onChange={handleTextChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-[#1A1F22] mb-8">{question.text}</h2>
      {renderQuestion()}
    </div>
  );
}; 