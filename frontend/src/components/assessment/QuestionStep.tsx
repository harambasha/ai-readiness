import React from 'react';
import { CheckCircle2, Lightbulb } from 'lucide-react';
import { Question, Answer } from '../../types';
import { sendAssessmentResults } from '../../services/emailService';
import { MultipleChoice, Slider, TextInput, YesNo } from './QuestionTypes';
import { useLanguage } from '../../context/LanguageContext';
import { questionTranslations, questionDescriptionTranslations, optionTranslations } from '../../data/questionTranslations';
import { industryFacts } from '../../data/industryFacts';

interface QuestionStepProps {
  question: Question;
  answers: Answer[];
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
}

export function QuestionStep({ question, answers, setAnswers }: QuestionStepProps) {
  const { t, language } = useLanguage();
  const currentAnswer = answers.find((a) => a.questionId === question.id);

  const handleMultipleChoice = (optionId: string, score: number) => {
    setAnswers((prev) => {
      const newAnswers = prev.filter((a) => a.questionId !== question.id);
      return [...newAnswers, { questionId: question.id, score, optionId }];
    });
  };

  const handleSlider = (score: number, sliderValue: number) => {
    setAnswers((prev) => {
      const newAnswers = prev.filter((a) => a.questionId !== question.id);
      return [...newAnswers, { questionId: question.id, score, sliderValue }];
    });
  };

  const handleText = (textValue: string) => {
    setAnswers((prev) => {
      const newAnswers = prev.filter((a) => a.questionId !== question.id);
      return [...newAnswers, { questionId: question.id, textValue }];
    });
  };

  const handleYesNo = (isYes: boolean) => {
    setAnswers((prev) => {
      const newAnswers = prev.filter((a) => a.questionId !== question.id);
      return [...newAnswers, { 
        questionId: question.id, 
        score: isYes ? question.yesNo?.yesScore : question.yesNo?.noScore 
      }];
    });
  };

  // Use translations for question text/description
  const questionText = questionTranslations[language][question.id] || question.text;
  const questionDescription = question.description ? (questionDescriptionTranslations[language][question.id] || question.description) : '';
  
  // Get industry fact for this question
  const industryFact = industryFacts[question.id];

  return (
    <div className="bg-white">
      <div className="p-3 sm:p-4 lg:p-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#2E363C] mb-4">
              {questionText}
            </h2>
            {questionDescription && (
              <p className="text-base sm:text-lg text-[#687177] mb-6">{questionDescription}</p>
            )}
            
            {/* Industry Fun Fact */}
            {industryFact && (
              <div className="bg-[#F8F9FA] border border-[#E7E9EC] rounded-lg p-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-[#677076] rounded-full flex items-center justify-center">
                      <Lightbulb className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#2E363C] leading-relaxed font-medium break-words">
                      {industryFact[language]}
                    </p>
                    <p className="text-xs text-[#687177] mt-2 italic">
                      {language === 'en' 
                        ? "Note: These insights are based on industry research and trends. Specific statistics may vary by region and industry."
                        : "Napomena: Ove perspektive su temeljene na industrijskim istraživanjima i trendovima. Specifične statistike mogu varirati ovisno o regiji i industriji."
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 sm:space-y-6">
            {question.type === 'multiple-choice' && (
              <MultipleChoice
                question={question}
                currentAnswer={currentAnswer}
                onSelect={handleMultipleChoice}
                language={language}
              />
            )}
            {question.type === 'slider' && (
              <Slider
                question={question}
                currentAnswer={currentAnswer}
                onChange={handleSlider}
                language={language}
              />
            )}
            {question.type === 'text' && (
              <TextInput
                question={question}
                currentAnswer={currentAnswer}
                onChange={handleText}
                language={language}
              />
            )}
            {question.type === 'yes-no' && (
              <YesNo
                question={question}
                currentAnswer={currentAnswer}
                onSelect={handleYesNo}
                language={language}
              />
            )}
          </div>
      </div>
    </div>
  );
} 