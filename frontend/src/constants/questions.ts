export const SLIDER_LABELS = [
  { value: 0, label: "Not Started" },
  { value: 25, label: "Early Stage" },
  { value: 50, label: "In Progress" },
  { value: 75, label: "Advanced" },
  { value: 100, label: "Complete" }
] as const;

export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple-choice',
  SLIDER: 'slider',
  TEXT: 'text',
  YES_NO: 'yes-no'
} as const;

export const COLORS = {
  PRIMARY: '#677076',
  SECONDARY: '#A3A59F',
  TEXT: {
    PRIMARY: '#1A1F22',
    SECONDARY: '#2E363C',
    MUTED: '#687177'
  },
  BORDER: {
    DEFAULT: '#E7E9EC',
    HOVER: '#677076'
  },
  BACKGROUND: {
    LIGHT: '#F5F6FA',
    WHITE: '#FFFFFF'
  }
} as const;

export const STYLES = {
  TRANSITION: 'transition-all duration-200',
  SCALE: {
    HOVER: 'transform hover:scale-105',
    SELECTED: 'transform scale-[1.02]'
  }
} as const; 