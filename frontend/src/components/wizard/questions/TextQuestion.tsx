import React from 'react';
import { Question, Answer, QuestionType } from '../../../types';
import { COLORS, STYLES } from '../../../constants/questions';

interface TextQuestionProps {
  question: Question & { type: 'text' };
  currentAnswer?: Answer;
  onChange: (value: string) => void;
}

export const TextQuestion: React.FC<TextQuestionProps> = ({
  question,
  currentAnswer,
  onChange,
}) => {
  return (
    <div className={`bg-[${COLORS.BACKGROUND.LIGHT}] p-8`}>
      <textarea
        value={currentAnswer?.textValue || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.textInput?.placeholder}
        maxLength={question.textInput?.maxLength}
        className={`w-full h-32 p-4 rounded-lg border-2 border-[${COLORS.BORDER.DEFAULT}] focus:border-[${COLORS.PRIMARY}] focus:outline-none ${STYLES.TRANSITION} resize-none`}
      />
      <div className={`mt-2 text-sm text-[${COLORS.TEXT.MUTED}] text-right`}>
        {currentAnswer?.textValue?.length || 0}/{question.textInput?.maxLength} characters
      </div>
    </div>
  );
}; 