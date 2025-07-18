import React from 'react';
import { Database, Code, Users, LineChart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const areas = [
  {
    icon: Database,
    titleKey: 'areas.data',
    descriptionKey: 'questions.data.description'
  },
  {
    icon: Code,
    titleKey: 'areas.technology',
    descriptionKey: 'questions.technology.description'
  },
  {
    icon: Users,
    titleKey: 'areas.people',
    descriptionKey: 'questions.people.description'
  },
  {
    icon: LineChart,
    titleKey: 'areas.strategy',
    descriptionKey: 'questions.strategy.description'
  }
];

export function AssessmentAreas() {
  const { t } = useLanguage();
  
  return (
    <div className="py-20 bg-[#F5F6FA]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#2E363C] mb-12">
          {t('welcome.features.comprehensive')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {areas.map((area) => (
            <div key={area.titleKey} className="bg-white p-8 rounded-lg shadow-sm">
              <area.icon className="w-12 h-12 text-[#677076] mb-6" />
              <h3 className="text-xl font-semibold text-[#2E363C] mb-4">
                {t(area.titleKey)}
              </h3>
              <p className="text-[#687177]">
                {t(area.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 