import React, { useState, useRef, useEffect } from 'react';
import { Question, Answer, QuestionType } from '../../../types';
import { SLIDER_LABELS, COLORS, STYLES } from '../../../constants/questions';

interface SliderQuestionProps {
  question: Question & { type: 'slider' };
  currentAnswer?: Answer;
  onChange: (value: number) => void;
}

export const SliderQuestion: React.FC<SliderQuestionProps> = ({
  question,
  currentAnswer,
  onChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const calculateSliderValue = (clientX: number) => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const position = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (position / rect.width) * 100));
    return Math.round(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const value = calculateSliderValue(e.clientX);
    onChange(value);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const value = calculateSliderValue(e.clientX);
    onChange(value);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
    }
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
    };
  }, [isDragging]);

  return (
    <div className={`bg-[${COLORS.BACKGROUND.LIGHT}] p-8`}>
      <div className={`flex justify-between text-sm text-[${COLORS.TEXT.MUTED}] mb-4`}>
        <span>{question.slider?.labels.start}</span>
        <span>{question.slider?.labels.end}</span>
      </div>

      <div 
        className="relative mb-12 py-4 cursor-pointer"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
      >
        <div className="slider-track">
          <div
            className="slider-track-fill"
            style={{ width: `${currentAnswer?.sliderValue || 0}%` }}
          />
          <div
            className="slider-thumb"
            style={{ left: `${currentAnswer?.sliderValue || 0}%` }}
          >
            <div className="slider-value">
              {currentAnswer?.sliderValue || 0}%
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 mt-8">
        {SLIDER_LABELS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`py-2 px-4 text-sm font-medium ${STYLES.TRANSITION} ${
              currentAnswer?.sliderValue === value
                ? 'bg-[#000000] text-white border-2 border-[#000000]'
                : `bg-[${COLORS.BACKGROUND.WHITE}] text-[${COLORS.TEXT.MUTED}] hover:bg-[${COLORS.BACKGROUND.LIGHT}] border-2 border-[${COLORS.BORDER.DEFAULT}]`
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}; 