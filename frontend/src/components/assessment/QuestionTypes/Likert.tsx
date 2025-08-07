import React from 'react';

interface LikertProps {
  question: string;
  description?: string;
  value: number | null;
  onChange: (value: number) => void;
  labels: {
    min: string;
    max: string;
  };
  required?: boolean;
}

export function Likert({ question, description, value, onChange, labels, required }: LikertProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-[#687177] mb-2">
          <span>{labels.min}</span>
          <span>{labels.max}</span>
        </div>
        
        <div className="flex justify-between items-center space-x-2">
          {[1, 2, 3, 4, 5].map((scaleValue) => (
            <button
              key={scaleValue}
              type="button"
              onClick={() => onChange(scaleValue)}
              className={`flex-1 py-3 px-2 rounded-lg border-2 transition-all duration-200 ${
                value === scaleValue
                  ? 'border-[#677076] bg-[#677076] text-white'
                  : 'border-[#E7E9EC] hover:border-[#B4926E] text-[#2E363C]'
              }`}
            >
              <span className="text-lg font-semibold">{scaleValue}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 