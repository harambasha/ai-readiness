import { CategoryInfo } from '../types';
import { Brain, Database, Server, Users, Scale, Lightbulb } from 'lucide-react';

export const categories: CategoryInfo[] = [
  {
    id: 'strategy',
    title: 'AI Strategy',
    description: 'Assessment of organizational AI vision, goals, and implementation roadmap',
    icon: Brain,
    color: 'text-blue-600',
  },
  {
    id: 'data',
    title: 'Data Readiness',
    description: 'Evaluation of data quality, accessibility, and management practices',
    icon: Database,
    color: 'text-green-600',
  },
  {
    id: 'infrastructure',
    title: 'Technical Infrastructure',
    description: 'Analysis of computing resources, tools, and platforms',
    icon: Server,
    color: 'text-purple-600',
  },
  {
    id: 'talent',
    title: 'Talent & Skills',
    description: 'Assessment of AI/ML expertise and training programs',
    icon: Users,
    color: 'text-orange-600',
  },
  {
    id: 'governance',
    title: 'AI Governance',
    description: 'Evaluation of AI policies, ethics, and risk management',
    icon: Scale,
    color: 'text-red-600',
  },
  {
    id: 'culture',
    title: 'Innovation Culture',
    description: 'Assessment of organizational readiness for AI adoption',
    icon: Lightbulb,
    color: 'text-yellow-600',
  },
];