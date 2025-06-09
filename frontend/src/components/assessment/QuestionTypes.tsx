import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Question, Answer } from '../../types';

interface BaseProps {
  question: Question;
  currentAnswer?: Answer;
}

interface MultipleChoiceProps extends BaseProps {
  onSelect: (optionId: string, score: number) => void;
}

export function MultipleChoice({ question, currentAnswer, onSelect }: MultipleChoiceProps) {
  return (
    <div className="space-y-4 px-4">
      {question.options?.map((option) => {
        const isSelected = currentAnswer?.optionId === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id, option.score)}
            className={`w-full text-left p-4 transition-all duration-200 ${
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
  );
}

interface SliderProps extends BaseProps {
  onChange: (score: number, sliderValue: number | undefined, sliderLabel: string | undefined, value: number) => void;
}

export function Slider({ question, currentAnswer, onChange }: SliderProps) {
  const [sliderValue, setSliderValue] = useState<number | undefined>(currentAnswer?.score ? (currentAnswer.score / 4) * 100 : undefined);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Reset slider value when question changes
  useEffect(() => {
    setSliderValue(currentAnswer?.score ? (currentAnswer.score / 4) * 100 : undefined);
  }, [question.id, currentAnswer?.score]);

  const calculateSliderValue = (clientX: number) => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const position = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (position / rect.width) * 100));
    return Math.round(percentage / 25) * 25; // Snap to 25% increments
  };

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    // Convert the percentage value to a score between 0 and 4
    const score = (value / 100) * 4;
    onChange(score, undefined, undefined, value); // Pass the sliderValue as the fourth parameter
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const value = calculateSliderValue(e.clientX);
    handleSliderChange(value);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const value = calculateSliderValue(e.clientX);
    handleSliderChange(value);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    const value = calculateSliderValue(touch.clientX);
    handleSliderChange(value);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
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
    <div className="relative px-4">
      <div
        ref={sliderRef}
        className="relative h-2 bg-[#E7E9EC] cursor-pointer rounded-full"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className="absolute h-full bg-[#677076] transition-all duration-200 rounded-full"
          style={{ width: `${sliderValue || 0}%` }}
        />
        <div
          className="absolute w-6 h-6 bg-white border-2 border-[#677076] -top-2 transform -translate-x-1/2 transition-all duration-200 hover:scale-110 rounded-full"
          style={{ left: `${sliderValue || 0}%` }}
        />
      </div>
      <div className="flex justify-between mt-4 text-sm text-[#687177]">
        <span>{question.slider?.labels.start}</span>
        <span>{question.slider?.labels.end}</span>
      </div>
      {sliderValue !== undefined && (
        <div className="text-center mt-2 text-[#677076] font-medium">
          {sliderValue}%
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-4">
        {[
          { value: 0, label: question.slider?.labels.start },
          { value: 25, label: 'Early Stage' },
          { value: 50, label: 'In Progress' },
          { value: 75, label: 'Advanced' },
          { value: 100, label: question.slider?.labels.end }
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => {
              setSliderValue(value);
              handleSliderChange(value);
            }}
            className={`w-full px-2 py-2 text-xs sm:text-sm transition-all duration-200 rounded-lg ${
              sliderValue === value
                ? 'bg-[#677076] text-white'
                : 'bg-white border-2 border-[#677076] text-[#2E363C] hover:border-[#677076]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

interface TextInputProps extends BaseProps {
  onChange: (value: string) => void;
}

export function TextInput({ question, currentAnswer, onChange }: TextInputProps) {
  return (
    <div className="bg-[#F5F6FA] p-4 rounded-lg">
      <textarea
        value={currentAnswer?.textValue || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.textInput?.placeholder || 'Enter your response...'}
        className="w-full h-32 p-4 border-2 border-[#E7E9EC] rounded-lg focus:outline-none focus:border-[#677076] resize-none"
      />
    </div>
  );
}

interface YesNoProps extends BaseProps {
  onSelect: (value: boolean) => void;
}

export function YesNo({ question, currentAnswer, onSelect }: YesNoProps) {
  return (
    <div className="flex space-x-4 px-4">
      <button
        onClick={() => onSelect(true)}
        className={`flex-1 p-4 transition-all duration-200 ${
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
        onClick={() => onSelect(false)}
        className={`flex-1 p-4 transition-all duration-200 ${
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
  );
} 