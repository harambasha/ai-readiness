import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Question, Answer } from '../../types';
import { sendAssessmentResults } from '../../services/emailService';
import { MultipleChoice, Slider, TextInput, YesNo } from './QuestionTypes';

interface QuestionStepProps {
  question: Question;
  answers: Answer[];
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
}

export function QuestionStep({ question, answers, setAnswers }: QuestionStepProps) {
  const currentAnswer = answers.find((a) => a.questionId === question.id);

  const handleMultipleChoice = (optionId: string, score: number) => {
    setAnswers((prev) => {
      const newAnswers = prev.filter((a) => a.questionId !== question.id);
      return [...newAnswers, { questionId: question.id, score, optionId }];
    });
  };

  const handleSlider = (score: number, sliderValue: number) => {
    setAnswers((prev) => {
      const newAnswers = prev.filter((a) => a.questionId !== question.id);
      return [...newAnswers, { questionId: question.id, score, sliderValue }];
    });
  };

  const handleText = (textValue: string) => {
    setAnswers((prev) => {
      const newAnswers = prev.filter((a) => a.questionId !== question.id);
      return [...newAnswers, { questionId: question.id, textValue }];
    });
  };

  const handleYesNo = (isYes: boolean) => {
    setAnswers((prev) => {
      const newAnswers = prev.filter((a) => a.questionId !== question.id);
      return [...newAnswers, { 
        questionId: question.id, 
        score: isYes ? question.yesNo?.yesScore : question.yesNo?.noScore 
      }];
    });
  };

  return (
    <div className="bg-white">
      <div className="p-3 sm:p-4 lg:p-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#2E363C] mb-2">
              {question.text}
            </h2>
            {question.description && (
              <p className="text-base sm:text-lg text-[#687177]">{question.description}</p>
            )}
          </div>

          <div className="space-y-4 sm:space-y-6">
            {question.type === 'multiple-choice' && (
              <MultipleChoice
                question={question}
                currentAnswer={currentAnswer}
                onSelect={handleMultipleChoice}
              />
            )}
            {question.type === 'slider' && (
              <Slider
                question={question}
                currentAnswer={currentAnswer}
                onChange={handleSlider}
              />
            )}
            {question.type === 'text' && (
              <TextInput
                question={question}
                currentAnswer={currentAnswer}
                onChange={handleText}
              />
            )}
            {question.type === 'yes-no' && (
              <YesNo
                question={question}
                currentAnswer={currentAnswer}
                onSelect={handleYesNo}
              />
            )}
          </div>
      </div>
    </div>
  );
} 