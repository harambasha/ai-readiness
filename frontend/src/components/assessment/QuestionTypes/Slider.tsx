import React, { useRef, useState } from 'react';
import { Question, Answer } from '../../../types';

interface SliderProps {
  question: Question;
  currentAnswer?: Answer;
  onChange: (value: number) => void;
}

export function Slider({ question, currentAnswer, onChange }: SliderProps) {
  const [sliderValue, setSliderValue] = useState<number | undefined>(currentAnswer?.sliderValue);
  const sliderRef = useRef<HTMLDivElement>(null);

  const calculateSliderValue = (clientX: number) => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const position = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (position / rect.width) * 100));
    return Math.round(percentage / 25) * 25; // Snap to 25% increments
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const value = calculateSliderValue(e.clientX);
    setSliderValue(value);
    onChange(value);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const value = calculateSliderValue(touch.clientX);
    setSliderValue(value);
    onChange(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-[#687177]">
        <span>{question.slider?.labels.start}</span>
        <span>{question.slider?.labels.end}</span>
      </div>

      <div
        ref={sliderRef}
        className="relative h-2 bg-[#E7E9EC] cursor-pointer"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className="absolute h-full bg-[#677076] transition-all duration-200"
          style={{ width: `${sliderValue || 0}%` }}
        />
        <div
          className="absolute w-6 h-6 bg-white border-2 border-[#677076] -top-2 transform -translate-x-1/2 transition-all duration-200 hover:scale-110"
          style={{ left: `${sliderValue || 0}%` }}
        />
      </div>

      {sliderValue !== undefined && (
        <div className="text-center text-[#677076] font-medium">
          {sliderValue}%
        </div>
      )}

      <div className="grid grid-cols-5 gap-3">
        {[0, 25, 50, 75, 100].map((value) => {
          const label = value === 0 ? question.slider?.labels.start :
                      value === 100 ? question.slider?.labels.end :
                      value === 25 ? 'Early Stage' :
                      value === 50 ? 'In Progress' :
                      'Advanced';
          return (
            <button
              key={value}
              onClick={() => {
                setSliderValue(value);
                onChange(value);
              }}
              className={`px-3 py-2 text-sm transition-all duration-200 ${
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
  );
} 