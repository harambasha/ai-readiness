import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Question, Answer } from '../types';
import { sendAssessmentResults } from '../services/emailService';
import { MultipleChoice } from './assessment/QuestionTypes';
import { Slider } from './assessment/QuestionTypes';
import { TextInput } from './assessment/QuestionTypes';
import { YesNo } from './assessment/QuestionTypes';

interface QuestionStepProps {
  question: Question;
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
  showError?: boolean;
}

export function QuestionStep({ question, answers, setAnswers, showError }: QuestionStepProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [sliderValue, setSliderValue] = useState<number | undefined>(undefined);
  const sliderRef = useRef<HTMLDivElement>(null);
  const currentAnswer = answers.find(a => a.questionId === question.id);

  const handleOptionSelect = (optionId: string, score: number) => {
    const newAnswers = answers.filter(a => a.questionId !== question.id);
    newAnswers.push({ questionId: question.id, optionId, score });
    setAnswers(newAnswers);
  };

  const handleTextChange = async (text: string) => {
    const newAnswers = answers.filter(a => a.questionId !== question.id);
    newAnswers.push({ questionId: question.id, textValue: text });
    setAnswers(newAnswers);

    // If this is the email question, send the email
    if (question.id === 'company-email') {
      try {
        await sendAssessmentResults(
          text,
          newAnswers,
          0, // Initial score
          'In Progress'
        );
      } catch (error) {
        console.error('Error sending initial email:', error);
      }
    }
  };

  const handleYesNoSelect = (isYes: boolean) => {
    const newAnswers = answers.filter(a => a.questionId !== question.id);
    newAnswers.push({ 
      questionId: question.id, 
      score: isYes ? question.yesNo?.yesScore : question.yesNo?.noScore 
    });
    setAnswers(newAnswers);
  };

  const calculateSliderValue = (clientX: number) => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const position = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (position / rect.width) * 100));
    return Math.round(percentage / 25) * 25; // Snap to 25% increments
  };

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    const newAnswers = answers.filter((a) => a.questionId !== question.id);
    newAnswers.push({
      questionId: question.id,
      score: (value / 100) * 4,
      sliderValue: value,
    });
    setAnswers(newAnswers);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const value = calculateSliderValue(e.clientX);
    handleSliderChange(value);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const value = calculateSliderValue(e.clientX);
    handleSliderChange(value);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    const value = calculateSliderValue(touch.clientX);
    handleSliderChange(value);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const value = calculateSliderValue(touch.clientX);
    handleSliderChange(value);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('touchend', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove as any);
    }
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove as any);
      document.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove as any);
    };
  }, [isDragging]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#2E363C]">{question.text}</h2>
        {question.description && (
          <p className="text-gray-600">{question.description}</p>
        )}
      </div>

      <div className="space-y-6">
        {question.type === 'multiple-choice' && (
          <MultipleChoice
            question={question}
            currentAnswer={currentAnswer}
            onSelect={handleOptionSelect}
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

        {question.type === 'yes-no' && (
          <YesNo
            question={question}
            currentAnswer={currentAnswer}
            onSelect={handleYesNoSelect}
          />
        )}
      </div>
    </div>
  );
} 