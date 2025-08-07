import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { TextInput } from '../assessment/QuestionTypes/TextInput';
import { MultipleChoice } from '../assessment/QuestionTypes/MultipleChoice';
import { YesNo } from '../assessment/QuestionTypes/YesNo';
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
          <TextInput
            value={value as string || ''}
            onChange={(newValue) => onChange(newValue)}
            placeholder="Unesite vaš odgovor..."
            required={question.required}
          />
        );

      case 'multiple-choice':
        return (
          <MultipleChoice
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
          <YesNo
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
      <div className="space-y-6">
        {/* Question Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {question.text}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </h2>
          {question.description && (
            <p className="text-gray-600 text-lg leading-relaxed">
              {question.description}
            </p>
          )}
        </div>

        {/* Question Input */}
        <div className="mt-8">
          {renderQuestionInput()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={false}
            icon={ArrowLeft}
            iconPosition="left"
          >
            {t.navigation.previous}
          </Button>

          <div className="flex items-center space-x-4">
            {isLastQuestion ? (
              <Button
                onClick={onSubmit}
                disabled={!canProceed || isSubmitting}
                icon={isSubmitting ? undefined : ArrowRight}
                iconPosition="right"
                loading={isSubmitting}
              >
                {isSubmitting ? t.common.loading : t.navigation.submit}
              </Button>
            ) : (
              <Button
                onClick={onNext}
                disabled={!canProceed}
                icon={ArrowRight}
                iconPosition="right"
              >
                {t.navigation.next}
              </Button>
            )}
          </div>
        </div>

        {/* Required Field Notice */}
        {question.required && (
          <div className="text-sm text-gray-500 text-center">
            * {t.form.required}
          </div>
        )}
      </div>
    </div>
  );
} 