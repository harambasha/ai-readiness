export const COLORS = {
  primary: '#a88968',
  primaryDark: '#8a6b4e',
  text: {
    primary: '#2E363C',
    secondary: '#687177',
    light: '#9AA3AA'
  },
  background: {
    light: '#F5F6FA',
    white: '#FFFFFF',
    error: '#FEF2F2'
  },
  border: {
    light: '#E7E9EC',
    error: '#FCA5A5'
  }
} as const;

export const ASSESSMENT_AREAS = [
  {
    icon: 'Brain',
    title: "Strategic Vision",
    description: "Evaluate your AI strategy alignment with business goals",
    details: "Assess how well your AI initiatives align with overall business objectives, market positioning, and long-term growth plans. This includes evaluating your AI roadmap, investment priorities, and strategic partnerships.",
    color: "from-[#B4926E] to-[#A3A59F]"
  },
  {
    icon: 'Database',
    title: "Data Readiness",
    description: "Assess your data quality and infrastructure capabilities",
    details: "Review your data collection, storage, and processing capabilities. Evaluate data quality, governance, security measures, and the maturity of your data infrastructure to support AI initiatives.",
    color: "from-[#B4926E] to-[#A3A59F]"
  },
  {
    icon: 'Shield',
    title: "Governance & Ethics",
    description: "Review your AI policies and ethical framework",
    details: "Examine your organization's approach to AI governance, including ethical guidelines, compliance frameworks, risk management, and responsible AI practices. Assess how well you're addressing bias, privacy, and transparency.",
    color: "from-[#B4926E] to-[#A3A59F]"
  },
  {
    icon: 'Users',
    title: "Team Capability",
    description: "Gauge your team's AI expertise and readiness",
    details: "Evaluate your organization's AI talent, skills development programs, and cultural readiness. Assess technical capabilities, training initiatives, and how well your team can implement and maintain AI solutions.",
    color: "from-[#B4926E] to-[#A3A59F]"
  }
] as const;

export const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CTO, TechVision",
    image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg",
    quote: "The assessment provided clear, actionable insights that helped us prioritize our AI initiatives."
  },
  {
    name: "James Wilson",
    role: "CEO, Innovation Labs",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    quote: "This scorecard was instrumental in helping us understand our AI readiness gaps and opportunities."
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Digital",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    quote: "The recommendations were practical and helped us create a solid AI implementation roadmap."
  }
] as const;

export const SLIDER_LABELS = [
  { value: 0, label: "Not Started" },
  { value: 25, label: "Early Stage" },
  { value: 50, label: "In Progress" },
  { value: 75, label: "Advanced" },
  { value: 100, label: "Complete" }
] as const;

export const MATURITY_LEVELS = {
  BEGINNER: { threshold: 40, message: "Your organization is in the early stages of AI readiness. Focus on developing foundational capabilities and building basic AI awareness." },
  DEVELOPING: { threshold: 60, message: "You're making progress but there's room for improvement. Prioritize data infrastructure and talent development." },
  ESTABLISHED: { threshold: 75, message: "You're well on your way! Consider expanding your AI initiatives and strengthening governance frameworks." },
  ADVANCED: { threshold: 90, message: "Strong AI readiness! Focus on optimization and scaling your AI capabilities." },
  LEADING: { threshold: 100, message: "Exceptional AI readiness! Continue leading innovation and sharing best practices." }
} as const;

export * from './assessment';
export * from './questions';
export * from './ui';
export * from './results';
export * from './types'; 