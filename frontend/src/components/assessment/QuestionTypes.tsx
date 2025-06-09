import React from 'react';
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
    <div className="space-y-4">
      {question.options?.map((option) => {
        const isSelected = currentAnswer?.optionId === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id, option.score)}
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
  );
}

interface SliderProps extends BaseProps {
  onChange: (value: number) => void;
}

export function Slider({ question, currentAnswer, onChange }: SliderProps) {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [sliderValue, setSliderValue] = React.useState<number | undefined>(currentAnswer?.sliderValue);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const value = Math.round(percentage / 25) * 25; // Snap to 0, 25, 50, 75, 100
    setSliderValue(value);
    onChange(value);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const value = Math.round(percentage / 25) * 25; // Snap to 0, 25, 50, 75, 100
    setSliderValue(value);
    onChange(value);
  };

  return (
    <div className="relative">
      <div
        ref={sliderRef}
        className="relative h-2 bg-[#E7E9EC] cursor-pointer"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className="absolute h-full bg-[#677076] transition-all duration-200"
          style={{ width: `${((sliderValue || 0) - (question.slider?.min || 0)) / ((question.slider?.max || 100) - (question.slider?.min || 0)) * 100}%` }}
        />
        <div
          className="absolute w-6 h-6 bg-white border-2 border-[#677076] -top-2 transform -translate-x-1/2 transition-all duration-200 hover:scale-110"
          style={{ left: `${((sliderValue || 0) - (question.slider?.min || 0)) / ((question.slider?.max || 100) - (question.slider?.min || 0)) * 100}%` }}
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
              onClick={() => {
                setSliderValue(value);
                onChange(value);
              }}
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
  );
}

interface TextInputProps extends BaseProps {
  onChange: (value: string) => void;
}

export function TextInput({ question, currentAnswer, onChange }: TextInputProps) {
  return (
    <div className="bg-[#F5F6FA] p-8">
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
    <div className="flex space-x-4">
      <button
        onClick={() => onSelect(true)}
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
        onClick={() => onSelect(false)}
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
  );
} 