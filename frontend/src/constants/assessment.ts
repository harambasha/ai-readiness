import { Brain, Database, Shield, Users, LucideIcon } from 'lucide-react';

export interface AssessmentArea {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string;
  color: string;
}

export const ASSESSMENT_AREAS: AssessmentArea[] = [
  {
    icon: Brain,
    title: "Strategic Vision",
    description: "Evaluate your AI strategy alignment with business goals",
    details: "Assess how well your AI initiatives align with overall business objectives, market positioning, and long-term growth plans. This includes evaluating your AI roadmap, investment priorities, and strategic partnerships.",
    color: "from-[#B4926E] to-[#A3A59F]"
  },
  {
    icon: Database,
    title: "Data Readiness",
    description: "Assess your data quality and infrastructure capabilities",
    details: "Review your data collection, storage, and processing capabilities. Evaluate data quality, governance, security measures, and the maturity of your data infrastructure to support AI initiatives.",
    color: "from-[#B4926E] to-[#A3A59F]"
  },
  {
    icon: Shield,
    title: "Governance & Ethics",
    description: "Review your AI policies and ethical framework",
    details: "Examine your organization's approach to AI governance, including ethical guidelines, compliance frameworks, risk management, and responsible AI practices. Assess how well you're addressing bias, privacy, and transparency.",
    color: "from-[#B4926E] to-[#A3A59F]"
  },
  {
    icon: Users,
    title: "Team Capability",
    description: "Gauge your team's AI expertise and readiness",
    details: "Evaluate your organization's AI talent, skills development programs, and cultural readiness. Assess technical capabilities, training initiatives, and how well your team can implement and maintain AI solutions.",
    color: "from-[#B4926E] to-[#A3A59F]"
  }
] as const;

export const ASSESSMENT_GRADIENTS = {
  PRIMARY: "from-[#B4926E] to-[#A3A59F]",
  SECONDARY: "from-[#A3A59F] to-[#B4926E]"
} as const; 