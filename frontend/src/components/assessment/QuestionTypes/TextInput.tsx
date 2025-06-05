import React from 'react';
import { Question, Answer } from '../../../types';

interface TextInputProps {
  question: Question;
  currentAnswer?: Answer;
  onChange: (value: string) => void;
}

export function TextInput({ question, currentAnswer, onChange }: TextInputProps) {
  if (!question.textInput) return null;

  const isEmailQuestion = question.id === 'company-email';
  const inputValue = currentAnswer?.textValue || '';

  if (isEmailQuestion) {
    return (
      <div className="space-y-4">
        <input
          type="email"
          value={inputValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your email..."
          maxLength={50}
          className="w-full h-12 p-4 border border-[#E7E9EC] focus:border-[#677076] focus:outline-none transition-all duration-200"
        />
        <div className="text-sm text-[#687177] text-right">
          {inputValue.length}/50 characters
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <textarea
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.textInput.placeholder}
        maxLength={question.textInput.maxLength}
        className="w-full h-32 p-4 border border-[#E7E9EC] focus:border-[#677076] focus:outline-none transition-all duration-200 resize-none"
      />
      <div className="text-sm text-[#687177] text-right">
        {inputValue.length}/{question.textInput.maxLength} characters
      </div>
    </div>
  );
} 