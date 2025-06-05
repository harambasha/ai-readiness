export type MaturityLevel = 'LEADING' | 'ADVANCED' | 'ESTABLISHED' | 'DEVELOPING' | 'BEGINNER';

export const MATURITY_LEVELS: Record<MaturityLevel, {
  threshold: number;
  color: string;
  message: string;
}> = {
  LEADING: {
    threshold: 90,
    color: 'text-green-600',
    message: "Exceptional AI readiness! Continue leading innovation and sharing best practices."
  },
  ADVANCED: {
    threshold: 75,
    color: 'text-blue-600',
    message: "Strong AI readiness! Focus on optimization and scaling your AI capabilities."
  },
  ESTABLISHED: {
    threshold: 60,
    color: 'text-yellow-600',
    message: "You're well on your way! Consider expanding your AI initiatives and strengthening governance frameworks."
  },
  DEVELOPING: {
    threshold: 40,
    color: 'text-orange-600',
    message: "You're making progress but there's room for improvement. Prioritize data infrastructure and talent development."
  },
  BEGINNER: {
    threshold: 0,
    color: 'text-red-600',
    message: "Your organization is in the early stages of AI readiness. Focus on developing foundational capabilities and building basic AI awareness."
  }
} as const;

export const GRADIENTS = {
  PRIMARY: {
    DEFAULT: 'linear-gradient(90deg, #D9D9D9 0%, #A3A59F 33%, #B4926E 66%, #EA9C74 100%)',
    HOVER: 'linear-gradient(90deg, #EA9C74 0%, #B4926E 33%, #A3A59F 66%, #D9D9D9 100%)',
    TEXT: 'linear-gradient(90deg, #B4926E 0%, #EA9C74 100%)',
    BORDER: 'linear-gradient(90deg, #D9D9D9 0%, #A3A59F 33%, #B4926E 66%, #EA9C74 100%)'
  },
  BACKGROUND: {
    DEFAULT: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
  }
} as const;

export const BUTTON_VARIANTS = {
  PRIMARY: {
    background: 'bg-[#a88968]',
    text: 'text-white',
    hover: 'hover:opacity-90'
  },
  SECONDARY: {
    background: 'bg-white',
    text: 'text-[#2E363C]',
    border: 'border-2 border-[#E7E9EC]',
    hover: 'hover:border-[#a88968] hover:shadow-md'
  },
  OUTLINE: {
    background: 'bg-transparent',
    text: 'text-[#2E363C]',
    border: 'border-2 border-[#E7E9EC]',
    hover: 'hover:border-[#a88968]'
  }
} as const;

export const BUTTON_SIZES = {
  SM: {
    padding: 'px-4 py-2',
    text: 'text-sm',
    icon: 'w-4 h-4'
  },
  MD: {
    padding: 'px-6 py-3',
    text: 'text-base',
    icon: 'w-5 h-5'
  },
  LG: {
    padding: 'px-8 py-4',
    text: 'text-lg',
    icon: 'w-6 h-6'
  }
} as const; 