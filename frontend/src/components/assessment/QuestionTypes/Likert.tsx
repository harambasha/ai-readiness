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
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {question}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h3>
        {description && (
          <p className="text-gray-600 mb-4">{description}</p>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
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
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400 text-gray-700'
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