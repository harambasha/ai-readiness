import { Question } from '../types';

export const questions: Question[] = [
  // ===== MULTIPLE CHOICE QUESTIONS (First - Easy to answer) =====
  {
    id: 'company-name',
    text: 'What is your company name?',
    description: 'Please enter your company name.',
    category: 'company',
    type: 'text',
    weight: 0, // No weight as it's not scored
    textInput: {
      placeholder: 'Enter your company name...',
      maxLength: 50
    }
  },
  {
    id: 'company-email',
    text: 'Can you please provide your company email?',
    description: 'This helps us deliver your personalized AI readiness assessment results and recommendations directly to your inbox.',
    category: 'strategy',
    type: 'text',
    weight: 1.0,
    textInput: {
      placeholder: 'Enter your email...',
      maxLength: 50
    }
  },
  {
    id: 'dedicated-it-team',
    text: 'Do you have a dedicated IT Team in your company?',
    description: 'A dedicated IT team is important for AI implementation as they can provide technical expertise and support.',
    category: 'strategy',
    type: 'multiple-choice',
    weight: 1.0,
    options: [
      { id: 'it1', text: 'Yes, we have a dedicated IT team', score: 4 },
      { id: 'it2', text: 'No, we don\'t have a dedicated IT team', score: 0 },
      { id: 'it3', text: 'Don\'t know / Not sure', score: 1 }
    ]
  },
  {
    id: 'strategy-vision',
    text: 'How well-defined is your organization\'s AI strategy and vision?',
    description: 'A clear AI strategy and vision are essential for successful implementation.',
    category: 'strategy',
    type: 'multiple-choice',
    weight: 1.5,
    options: [
      { id: 'sv1', text: 'No formal AI strategy exists', score: 0 },
      { id: 'sv2', text: 'Basic ideas but no concrete plans', score: 1 },
      { id: 'sv3', text: 'Strategy in development with some goals defined', score: 2 },
      { id: 'sv4', text: 'Clear strategy with defined objectives', score: 3 },
      { id: 'sv5', text: 'Comprehensive strategy integrated with business goals', score: 4 },
      { id: 'sv6', text: 'Don\'t know / Not sure', score: 1 }
    ]
  },
  {
    id: 'talent-expertise',
    text: 'What is your team\'s AI/ML expertise level?',
    description: 'AI/ML expertise is crucial for successful implementation and maintenance of AI solutions.',
    category: 'talent',
    type: 'multiple-choice',
    weight: 1.7,
    options: [
      { id: 'te1', text: 'No dedicated AI expertise', score: 0 },
      { id: 'te2', text: 'Basic understanding in key teams', score: 1 },
      { id: 'te3', text: 'Dedicated AI roles and capabilities', score: 2 },
      { id: 'te4', text: 'Advanced expertise and specialized teams', score: 3 },
      { id: 'te5', text: 'Industry-leading AI capabilities', score: 4 },
      { id: 'te6', text: 'Don\'t know / Not sure', score: 1 }
    ]
  },
  {
    id: 'data-quality',
    text: 'How would you rate your data quality and standardization?',
    description: 'Data quality and standardization are fundamental for AI success.',
    category: 'data',
    type: 'multiple-choice',
    weight: 1.6,
    options: [
      { id: 'dq1', text: 'No standardized quality measures', score: 0 },
      { id: 'dq2', text: 'Basic quality controls', score: 1 },
      { id: 'dq3', text: 'Established quality framework', score: 2 },
      { id: 'dq4', text: 'Advanced quality management', score: 3 },
      { id: 'dq5', text: 'Industry-leading standards', score: 4 },
      { id: 'dq6', text: 'Don\'t know / Not sure', score: 1 }
    ]
  },
  {
    id: 'ai-ethics',
    text: 'How mature is your AI ethics and responsibility framework?',
    description: 'AI ethics and responsibility are crucial for sustainable AI implementation.',
    category: 'governance',
    type: 'multiple-choice',
    weight: 1.7,
    options: [
      { id: 'ae1', text: 'No formal ethics framework', score: 0 },
      { id: 'ae2', text: 'Basic guidelines in place', score: 1 },
      { id: 'ae3', text: 'Established ethics policies', score: 2 },
      { id: 'ae4', text: 'Comprehensive ethics framework', score: 3 },
      { id: 'ae5', text: 'Industry-leading ethics standards', score: 4 },
      { id: 'ae6', text: 'Don\'t know / Not sure', score: 1 }
    ]
  },
  {
    id: 'change-management',
    text: 'Rate your organization\'s change management capabilities',
    description: 'Change management is crucial for successful AI implementation.',
    category: 'culture',
    type: 'multiple-choice',
    weight: 1.5,
    options: [
      { id: 'cm1', text: 'No formal change management', score: 0 },
      { id: 'cm2', text: 'Basic change processes', score: 1 },
      { id: 'cm3', text: 'Structured change framework', score: 2 },
      { id: 'cm4', text: 'Advanced change capabilities', score: 3 },
      { id: 'cm5', text: 'Exceptional change management', score: 4 },
      { id: 'cm6', text: 'Don\'t know / Not sure', score: 1 }
    ]
  },
  {
    id: 'data-infrastructure',
    text: 'How advanced is your data infrastructure?',
    description: 'Data infrastructure is fundamental for AI success.',
    category: 'infrastructure',
    type: 'multiple-choice',
    weight: 1.7,
    options: [
      { id: 'di1', text: 'Basic data storage only', score: 0 },
      { id: 'di2', text: 'Some data integration', score: 1 },
      { id: 'di3', text: 'Modern data warehouse', score: 2 },
      { id: 'di4', text: 'Advanced data platform', score: 3 },
      { id: 'di5', text: 'Full data ecosystem', score: 4 },
      { id: 'di6', text: 'Don\'t know / Not sure', score: 1 }
    ]
  },
  {
    id: 'risk-management',
    text: 'How mature is your AI risk management framework?',
    description: 'AI risk management is essential for sustainable implementation.',
    category: 'governance',
    type: 'multiple-choice',
    weight: 1.6,
    options: [
      { id: 'rm1', text: 'No risk framework', score: 0 },
      { id: 'rm2', text: 'Basic risk assessment', score: 1 },
      { id: 'rm3', text: 'Structured risk management', score: 2 },
      { id: 'rm4', text: 'Advanced risk controls', score: 3 },
      { id: 'rm5', text: 'Comprehensive risk framework', score: 4 },
      { id: 'rm6', text: 'Don\'t know / Not sure', score: 1 }
    ]
  },
  {
    id: 'roi-expectations',
    text: 'What are your expectations for AI ROI and timeline?',
    description: 'Realistic ROI expectations are crucial for successful AI implementation.',
    category: 'strategy',
    type: 'multiple-choice',
    weight: 1.6,
    options: [
      { id: 'roi1', text: 'Immediate cost savings (0-6 months)', score: 0 },
      { id: 'roi2', text: 'Short-term efficiency gains (6-12 months)', score: 1 },
      { id: 'roi3', text: 'Medium-term process optimization (1-2 years)', score: 2 },
      { id: 'roi4', text: 'Long-term strategic advantage (2-3 years)', score: 3 },
      { id: 'roi5', text: 'Transformational impact (3+ years)', score: 4 },
      { id: 'roi6', text: 'Don\'t know / Would like guidance', score: 1 }
    ]
  },
  {
    id: 'customer-impact',
    text: 'How do you expect AI to impact your customer experience?',
    description: 'Customer experience is a key area for AI impact.',
    category: 'strategy',
    type: 'multiple-choice',
    weight: 1.5,
    options: [
      { id: 'ci1', text: 'No direct customer impact planned', score: 0 },
      { id: 'ci2', text: 'Basic customer service automation', score: 1 },
      { id: 'ci3', text: 'Enhanced customer insights and personalization', score: 2 },
      { id: 'ci4', text: 'Advanced customer experience transformation', score: 3 },
      { id: 'ci5', text: 'Complete customer journey reimagining', score: 4 },
      { id: 'ci6', text: 'Don\'t know / Would like guidance', score: 1 }
    ]
  },

  // ===== SLIDER QUESTIONS (Second - Visual and intuitive) =====
  {
    id: 'data-maturity',
    text: 'Rate your organization\'s data management maturity',
    description: 'Data maturity is crucial for AI success. This includes data quality, governance, and infrastructure.',
    category: 'data',
    type: 'slider',
    weight: 1.8,
    slider: {
      min: 0,
      max: 100,
      step: 10,
      labels: {
        start: 'Basic',
        end: 'Complete'
      }
    }
  },
  {
    id: 'infrastructure-readiness',
    text: 'How would you rate your technical infrastructure\'s AI readiness?',
    description: 'Technical infrastructure readiness is essential for AI implementation.',
    category: 'infrastructure',
    type: 'slider',
    weight: 1.6,
    slider: {
      min: 0,
      max: 100,
      step: 10,
      labels: {
        start: 'Limited',
        end: 'Enterprise-grade'
      }
    }
  },
  {
    id: 'data-privacy',
    text: 'Assess your data privacy and security measures',
    description: 'Data privacy and security are critical for AI implementation.',
    category: 'governance',
    type: 'slider',
    weight: 1.8,
    slider: {
      min: 0,
      max: 100,
      step: 10,
      labels: {
        start: 'Basic',
        end: 'Comprehensive'
      }
    }
  },
  {
    id: 'workflow-restructuring',
    text: 'Are you open to restructuring business processes to accommodate AI and automation?',
    description: 'Business process restructuring is often necessary to fully leverage AI capabilities.',
    category: 'strategy',
    type: 'slider',
    weight: 1.0,
    slider: {
      min: 0,
      max: 100,
      step: 25,
      labels: {
        start: 'Not Open',
        end: 'Fully Open'
      }
    }
  },
  {
    id: 'it-solutions-alignment',
    text: 'How well do your current IT solutions align with your business processes and user needs?',
    description: 'IT-Business alignment helps guide successful AI implementation.',
    category: 'strategy',
    type: 'slider',
    weight: 1.0,
    slider: {
      min: 0,
      max: 100,
      step: 25,
      labels: {
        start: 'Poor',
        end: 'Excellent'
      }
    }
  },
  {
    id: 'talent-development',
    text: 'Rate your AI talent development program',
    description: 'AI talent development helps guide sustainable AI implementation.',
    category: 'talent',
    type: 'slider',
    weight: 1.5,
    slider: {
      min: 0,
      max: 100,
      step: 10,
      labels: {
        start: 'Poor',
        end: 'Excellent'
      }
    }
  },
  {
    id: 'innovation-culture',
    text: 'Assess your organization\'s innovation culture',
    description: 'Innovation culture is important for AI adoption.',
    category: 'culture',
    type: 'slider',
    weight: 1.4,
    slider: {
      min: 0,
      max: 100,
      step: 10,
      labels: {
        start: 'Traditional',
        end: 'Innovative'
      }
    }
  },
  {
    id: 'stakeholder-engagement',
    text: 'Assess stakeholder engagement in AI initiatives',
    description: 'Stakeholder engagement is crucial for successful AI implementation.',
    category: 'culture',
    type: 'slider',
    weight: 1.4,
    slider: {
      min: 0,
      max: 100,
      step: 10,
      labels: {
        start: 'Minimal',
        end: 'Full Engagement'
      }
    }
  },

  // ===== TEXT QUESTIONS (Last - For detailed information) =====
  {
    id: 'business-objectives',
    text: 'What are your primary business objectives for implementing AI?',
    description: 'Clear business objectives are essential for successful AI implementation.',
    category: 'strategy',
    type: 'text',
    weight: 1.5,
    textInput: {
      placeholder: 'Describe your main business goals for AI implementation...',
      maxLength: 500
    }
  },
  {
    id: 'competitor-analysis',
    text: 'How are your competitors using AI?',
    description: 'Understanding competitor AI usage helps identify opportunities and threats.',
    category: 'strategy',
    type: 'text',
    weight: 1.3,
    textInput: {
      placeholder: 'Describe your competitors\' AI initiatives and your competitive position...',
      maxLength: 500
    }
  },
  {
    id: 'kpi-measurement',
    text: 'What key performance indicators (KPIs) do you plan to use to measure AI success?',
    description: 'Defining clear KPIs is essential for tracking AI implementation success and ROI.',
    category: 'strategy',
    type: 'text',
    weight: 1.4,
    textInput: {
      placeholder: 'Describe the KPIs you plan to track for AI success (e.g., efficiency gains, cost savings, customer satisfaction, etc.)...',
      maxLength: 500
    }
  }
];