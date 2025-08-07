import React from 'react';
import { AIForwardTextInput } from './AIForwardTextInput';
import { AIForwardMultipleChoice } from './AIForwardMultipleChoice';
import { AIForwardYesNo } from './AIForwardYesNo';
import { Likert } from '../assessment/QuestionTypes/Likert';
import { AIForwardQuestion } from '../../data/aiForwardQuestions';
import { aiForwardTranslations } from '../../config/aiForwardTranslations';

interface AIForwardQuestionStepProps {
  question: AIForwardQuestion;
  value: string | string[] | number | null;
  onChange: (value: string | string[] | number | null) => void;
  onNext: () => void;
  onPrevious: () => void;
  canProceed: boolean;
  isLastQuestion: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function AIForwardQuestionStep({
  question,
  value,
  onChange,
  onNext,
  onPrevious,
  canProceed,
  isLastQuestion,
  onSubmit,
  isSubmitting
}: AIForwardQuestionStepProps) {
  const t = aiForwardTranslations;

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'text':
        return (
          <AIForwardTextInput
            value={value as string || ''}
            onChange={(newValue) => onChange(newValue)}
            placeholder="Unesite vaš odgovor..."
            required={question.required}
          />
        );

      case 'multiple-choice':
        return (
          <AIForwardMultipleChoice
            options={question.options || []}
            value={value as string[] || []}
            onChange={(newValue) => onChange(newValue)}
            hasOther={question.hasOther}
            otherLabel={t.form.other}
            pleaseSpecifyLabel={t.form.pleaseSpecify}
            selectAllLabel={t.form.selectAll}
            required={question.required}
          />
        );

      case 'yes-no':
        return (
          <AIForwardYesNo
            value={value as string || null}
            onChange={(newValue) => onChange(newValue)}
            yesLabel={t.form.yes}
            noLabel={t.form.no}
            notSureLabel={t.form.notSure}
            required={question.required}
          />
        );

      case 'likert':
        return (
          <Likert
            question={question.text}
            description={question.description}
            value={value as number | null}
            onChange={(newValue) => onChange(newValue)}
            labels={question.likertLabels!}
            required={question.required}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white">
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#2E363C] mb-4">
            {question.text}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </h2>
          {question.description && (
            <p className="text-base sm:text-lg text-[#687177] mb-6">{question.description}</p>
          )}
        </div>

        <div className="space-y-4 sm:space-y-6">
          {renderQuestionInput()}
        </div>

        {/* Required Field Notice */}
        {question.required && (
          <div className="mt-6 text-sm text-[#687177] text-center">
            * {t.form.required}
          </div>
        )}
      </div>
    </div>
  );
} 