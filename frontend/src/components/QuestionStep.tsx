import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Question, Answer } from '../types';
import { TextInput } from './assessment/QuestionTypes';
import { sendAssessmentResults } from '../services/emailService';

interface QuestionStepProps {
  question: Question;
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
  showError: boolean;
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
    <div className={`p-10 ${showError ? 'bg-red-50/30' : ''}`}>
      <div className="flex items-start space-x-3 mb-8">
        <h2 className={`text-2xl font-bold ${showError ? 'text-red-600' : 'text-[#1A1F22]'}`}>
          {question.text}
        </h2>
        <span className={`text-red-600 font-bold ${showError ? 'opacity-100' : 'opacity-0'}`}>*</span>
      </div>

      {question.type === 'multiple-choice' && question.options && (
        <div className="space-y-4">
          {question.options.map((option) => {
            const isSelected = currentAnswer?.optionId === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id, option.score)}
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
                  <div className={`w-6 h-6 border-2 flex items-center justify-center transition-all duration-200 ${
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
      )}

      {question.type === 'text' && question.textInput && (
        <div className="bg-[#F5F6FA] p-8">
          <TextInput
            question={question}
            currentAnswer={currentAnswer}
            onChange={handleTextChange}
          />
        </div>
      )}

      {question.type === 'slider' && question.slider && (
        <div className="relative">
          <div
            ref={sliderRef}
            className="relative h-2 bg-[#E7E9EC] cursor-pointer"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div
              className="absolute h-full bg-[#677076] transition-all duration-200"
              style={{ width: `${((sliderValue || 0) - question.slider.min) / (question.slider.max - question.slider.min) * 100}%` }}
            />
            <div
              className="absolute w-6 h-6 bg-white border-2 border-[#677076] -top-2 transform -translate-x-1/2 transition-all duration-200 hover:scale-110"
              style={{ left: `${((sliderValue || 0) - question.slider.min) / (question.slider.max - question.slider.min) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-4 text-sm text-[#687177]">
            <span>{question.slider?.labels.start}</span>
            <span>{question.slider?.labels.end}</span>
          </div>
          {sliderValue !== undefined && (
            <div className="text-center mt-2 text-[#677076] font-medium">
              {sliderValue}
            </div>
          )}
          <div className="flex justify-between mt-4 space-x-2">
            {[0, 25, 50, 75, 100].map((value) => {
              const label = value === 0 ? question.slider?.labels.start :
                          value === 100 ? question.slider?.labels.end :
                          value === 25 ? 'Early Stage' :
                          value === 50 ? 'In Progress' :
                          'Advanced';
              return (
                <button
                  key={value}
                  onClick={() => handleSliderChange(value)}
                  className={`flex-1 px-3 py-2 text-sm transition-all duration-200 ${
                    sliderValue === value
                      ? 'bg-[#677076] text-white'
                      : 'bg-white border-2 border-[#677076] text-[#2E363C] hover:border-[#677076]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {question.type === 'yes-no' && (
        <div className="flex space-x-4">
          <button
            onClick={() => handleYesNoSelect(true)}
            className={`flex-1 p-6 transition-all duration-200 ${
              currentAnswer?.score === question.yesNo?.yesScore
                ? 'bg-[#677076] text-white transform scale-[1.02]'
                : 'bg-white border-2 border-[#E7E9EC] hover:border-[#677076] hover:shadow-md text-[#2E363C]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Yes</span>
              <div className={`w-6 h-6 border-2 flex items-center justify-center transition-all duration-200 ${
                currentAnswer?.score === question.yesNo?.yesScore
                  ? 'border-white bg-white/20'
                  : 'border-[#DCE0E3]'
              }`}>
                {currentAnswer?.score === question.yesNo?.yesScore && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
            </div>
          </button>
          <button
            onClick={() => handleYesNoSelect(false)}
            className={`flex-1 p-6 transition-all duration-200 ${
              currentAnswer?.score === question.yesNo?.noScore
                ? 'bg-[#677076] text-white transform scale-[1.02]'
                : 'bg-white border-2 border-[#E7E9EC] hover:border-[#677076] hover:shadow-md text-[#2E363C]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">No</span>
              <div className={`w-6 h-6 border-2 flex items-center justify-center transition-all duration-200 ${
                currentAnswer?.score === question.yesNo?.noScore
                  ? 'border-white bg-white/20'
                  : 'border-[#DCE0E3]'
              }`}>
                {currentAnswer?.score === question.yesNo?.noScore && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
} 