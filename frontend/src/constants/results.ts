export const RESULTS_SECTIONS = {
  HEADER: {
    TITLE: "Your AI Readiness Results",
    SUBTITLE: "Based on your responses, here's your organization's current AI readiness assessment."
  },
  OVERALL_SCORE: {
    TITLE: "Overall Score"
  },
  DETAILED_BREAKDOWN: {
    TITLE: "Detailed Breakdown",
    SCORE_LABEL: "Score"
  },
  NEXT_STEPS: {
    TITLE: "Next Steps",
    ITEMS: [
      "Review your detailed assessment report",
      "Identify key areas for improvement",
      "Develop an action plan",
      "Set measurable goals"
    ]
  },
  RESOURCES: {
    TITLE: "Resources",
    ITEMS: [
      "AI Implementation Guide",
      "Best Practices Documentation",
      "Case Studies",
      "Expert Consultation"
    ]
  },
  SUPPORT: {
    TITLE: "Support",
    ITEMS: [
      "Schedule a Consultation",
      "Join our Community",
      "Access Training Materials",
      "Get Expert Support"
    ]
  }
} as const;

export const RESULTS_COLORS = {
  TEXT: {
    PRIMARY: '#2E363C',
    SECONDARY: '#687177',
    ACCENT: '#677076'
  },
  BORDER: '#E7E9EC',
  GRADIENT: {
    FROM: '#677076',
    TO: '#8a6b4e'
  }
} as const;

export const RESULTS_LAYOUT = {
  MAX_WIDTH: 'max-w-[1200px]',
  PADDING: 'px-4 sm:px-6 lg:px-8',
  GRID_GAP: 'gap-8',
  CARD_PADDING: 'p-8',
  BORDER: 'border-2'
} as const; 