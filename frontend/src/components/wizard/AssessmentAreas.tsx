import * as React from 'react';
import { ASSESSMENT_AREAS, AssessmentArea } from '@/constants';

export const AssessmentAreas: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {ASSESSMENT_AREAS.map((area: AssessmentArea, index: number) => (
        <div
          key={index}
          className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${area.color}`}>
              <area.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{area.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{area.description}</p>
              <p className="mt-2 text-sm text-gray-500">{area.details}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 