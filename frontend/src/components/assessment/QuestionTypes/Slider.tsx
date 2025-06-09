import React, { useState, useRef, useEffect } from 'react';
import { Question, Answer } from '../../../types';

const MATURITY_LEVELS = [
  { value: 0, label: 'Not Started' },
  { value: 25, label: 'Early Stage' },
  { value: 50, label: 'In Progress' },
  { value: 75, label: 'Advanced' },
  { value: 100, label: 'Complete' }
] as const;

interface SliderProps {
  question: Question;
  currentAnswer?: Answer;
  onChange: (value: number) => void;
}

export function Slider({ question, currentAnswer, onChange }: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [sliderValue, setSliderValue] = useState<number | undefined>(currentAnswer?.sliderValue);
  const sliderRef = useRef<HTMLDivElement>(null);

  const calculateSliderValue = (clientX: number) => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const position = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (position / rect.width) * 100));
    return Math.round(percentage / 25) * 25; // Snap to 25% increments
  };

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    onChange(value);
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

  if (!question.slider) return null;

  return (
    <div className="space-y-6">
      <div
        ref={sliderRef}
        className="relative h-2 bg-[#E7E9EC] rounded-full cursor-pointer"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className="absolute h-full bg-[#677076] rounded-full transition-all duration-200"
          style={{ width: `${((sliderValue || 0) - question.slider.min) / (question.slider.max - question.slider.min) * 100}%` }}
        />
        <div
          className="absolute w-6 h-6 bg-white border-2 border-[#677076] rounded-full -top-2 transform -translate-x-1/2 transition-all duration-200 hover:scale-110"
          style={{ left: `${((sliderValue || 0) - question.slider.min) / (question.slider.max - question.slider.min) * 100}%` }}
        />
      </div>

      <div className="flex justify-between text-sm text-[#687177]">
        <span>{question.slider.labels.start}</span>
        <span>{question.slider.labels.end}</span>
      </div>

      {sliderValue !== undefined && (
        <div className="text-center text-[#677076] font-medium">
          {sliderValue}%
        </div>
      )}

      <div className="grid grid-cols-5 gap-3">
        {MATURITY_LEVELS.map(({ value, label }) => {
          const displayLabel = value === 0 ? question.slider?.labels.start :
                            value === 100 ? question.slider?.labels.end :
                            label;
          return (
            <button
              key={value}
              onClick={() => handleSliderChange(value)}
              className={`px-3 py-2 text-sm transition-all duration-200 ${
                sliderValue === value
                  ? 'bg-[#677076] text-white'
                  : 'bg-white border-2 border-[#E7E9EC] text-[#2E363C] hover:border-[#677076]'
              }`}
            >
              {displayLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
} 