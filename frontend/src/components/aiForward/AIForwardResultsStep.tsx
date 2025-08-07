import React from 'react';
import { ArrowRight, CheckCircle2, Target, TrendingUp, Lightbulb } from 'lucide-react';
import { AIForwardButton } from './AIForwardButton';
import { aiForwardTranslations } from '../../config/aiForwardTranslations';

interface AIForwardAnswers {
  [key: string]: string | string[] | number | null;
}

interface AIForwardResultsStepProps {
  answers: AIForwardAnswers;
  onContinue: () => void;
}

export function AIForwardResultsStep({ answers, onContinue }: AIForwardResultsStepProps) {
  const t = aiForwardTranslations;

  // Calculate basic statistics
  const totalQuestions = Object.keys(answers).length;
  const answeredQuestions = Object.values(answers).filter(answer => 
    answer !== null && answer !== undefined && 
    (typeof answer === 'string' ? answer.trim() !== '' : true) &&
    (Array.isArray(answer) ? answer.length > 0 : true)
  ).length;

  const completionRate = Math.round((answeredQuestions / totalQuestions) * 100);

  // Analyze answers for insights
  const getInsights = () => {
    const insights = [];

    // Check if company has AI strategy
    const hasStrategy = answers['ai-strategy'];
    if (hasStrategy && typeof hasStrategy === 'string') {
      if (hasStrategy.includes('Da') || hasStrategy.includes('Yes')) {
        insights.push({
          icon: CheckCircle2,
          title: 'AI Strategija',
          description: 'Vaša organizacija već ima definisanu AI strategiju, što je odličan početak!',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        });
      } else {
        insights.push({
          icon: Lightbulb,
          title: 'AI Strategija',
          description: 'Razvoj AI strategije bi mogao biti prvi korak ka digitalnoj transformaciji.',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        });
      }
    }

    // Check data readiness
    const dataReadiness = answers['data-readiness'];
    if (dataReadiness && typeof dataReadiness === 'number') {
      if (dataReadiness >= 4) {
        insights.push({
          icon: TrendingUp,
          title: 'Spremnost podataka',
          description: 'Vaši podaci su dobro organizovani i spremni za AI implementaciju.',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        });
      } else {
        insights.push({
          icon: Target,
          title: 'Spremnost podataka',
          description: 'Unapređenje organizacije podataka može značajno poboljšati AI inicijative.',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50'
        });
      }
    }

    // Check team readiness
    const teamReadiness = answers['team-readiness'];
    if (teamReadiness && Array.isArray(teamReadiness)) {
      if (teamReadiness.length > 2) {
        insights.push({
          icon: CheckCircle2,
          title: 'Tim spremnost',
          description: 'Vaš tim ima dobru osnovu za rad sa AI tehnologijama.',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        });
      } else {
        insights.push({
          icon: Lightbulb,
          title: 'Tim spremnost',
          description: 'Obuka tima u AI oblastima može ubrzati implementaciju.',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        });
      }
    }

    return insights;
  };

  const insights = getInsights();

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <img src="/bloomteq-logo.svg" alt="Bloomteq Logo" className="h-8 w-auto" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2E363C] mb-4">
          Vaši rezultati AI spremnosti
        </h1>
        <p className="text-lg text-[#687177]">
          Analizirali smo vaše odgovore i pripremili prilagođene preporuke
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-white p-6 sm:p-8 border-2 border-[#E7E9EC]">
          <h3 className="text-xl font-semibold text-[#2E363C] mb-4">
            Završeno upitnika
          </h3>
          <div className="flex items-center justify-center space-x-4">
            <div className="text-6xl font-bold text-[#B4926E]">
              {completionRate}%
            </div>
            <div className="text-2xl font-semibold text-[#677076]">
              Završeno
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-[#687177] mb-1">
              <span>Odgovoreno pitanja</span>
              <span>{answeredQuestions} / {totalQuestions}</span>
            </div>
            <div className="h-2 bg-[#E7E9EC] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D9D9D9] via-[#A3A59F] to-[#B4926E] transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 border-2 border-[#E7E9EC]">
          <h3 className="text-xl font-semibold text-[#2E363C] mb-4">
            Ključni uvid
          </h3>
          <div className="space-y-4">
            {insights.length > 0 ? (
              insights.slice(0, 3).map((insight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`${insight.color} flex-shrink-0 mt-1`}>
                    <insight.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#2E363C] text-sm">
                      {insight.title}
                    </h4>
                    <p className="text-[#687177] text-xs leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[#687177] text-sm">
                Analizirali smo vaše odgovore i pripremili prilagođene preporuke.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <div className="bg-white p-6 sm:p-8 border-2 border-[#E7E9EC]">
          <h3 className="text-xl font-semibold text-[#2E363C] mb-4">
            Preporuke
          </h3>
          <ul className="space-y-4 text-[#687177]">
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#B4926E] rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm">Razvoj AI strategije i roadmap-a</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#B4926E] rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm">Unapređenje data infrastrukture</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#B4926E] rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm">Obuka tima u AI oblastima</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 sm:p-8 border-2 border-[#E7E9EC]">
          <h3 className="text-xl font-semibold text-[#2E363C] mb-4">
            Ključne snage
          </h3>
          <ul className="space-y-4 text-[#687177]">
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#B4926E] rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm">Spremnost za digitalnu transformaciju</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#B4926E] rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm">Razumijevanje AI potencijala</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#B4926E] rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm">Otvorenost ka inovacijama</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 sm:p-8 border-2 border-[#E7E9EC]">
          <h3 className="text-xl font-semibold text-[#2E363C] mb-4">
            Područja za poboljšanje
          </h3>
          <ul className="space-y-4 text-[#687177]">
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#B4926E] rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm">Data organizacija i kvalitet</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#B4926E] rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm">AI tehnološka infrastruktura</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#B4926E] rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm">AI governance i etika</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <AIForwardButton onClick={onContinue} variant="primary">
          Nastavi
        </AIForwardButton>
      </div>
    </div>
  );
} 