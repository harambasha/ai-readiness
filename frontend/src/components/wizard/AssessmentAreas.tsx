import React from 'react';
import { Database, Code, Users, LineChart } from 'lucide-react';

const areas = [
  {
    icon: Database,
    title: 'Data Infrastructure',
    description: 'Evaluate your data collection, storage, and processing capabilities.'
  },
  {
    icon: Code,
    title: 'Technical Readiness',
    description: 'Assess your technical infrastructure and AI implementation capabilities.'
  },
  {
    icon: Users,
    title: 'Team & Skills',
    description: 'Review your team\'s AI expertise and organizational readiness.'
  },
  {
    icon: LineChart,
    title: 'Business Strategy',
    description: 'Analyze your AI strategy alignment with business objectives.'
  }
];

export function AssessmentAreas() {
  return (
    <div className="py-20 bg-[#F5F6FA]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#2E363C] mb-12">
          Assessment Areas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {areas.map((area) => (
            <div key={area.title} className="bg-white p-8 rounded-lg shadow-sm">
              <area.icon className="w-12 h-12 text-[#677076] mb-6" />
              <h3 className="text-xl font-semibold text-[#2E363C] mb-4">
                {area.title}
              </h3>
              <p className="text-[#687177]">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 