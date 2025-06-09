import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'company-name',
    text: 'What is your company name?',
    description: 'Please enter your company name.',
    category: 'company',
    type: 'text',
    weight: 0, // No weight as it's not scored
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
    id: 'company-challenges',
    text: 'What are the main challenges your company currently faces?',
    description: 'Understanding your current business challenges helps us identify where AI and automation can provide the most value. This includes operational inefficiencies, resource constraints, or market pressures that could be addressed through AI solutions.',
    category: 'strategy',
    type: 'text',
    weight: 1.0,
    textInput: {
      placeholder: 'Describe your main business challenges...',
      maxLength: 500
    }
  },
  {
    id: 'business-goals',
    text: 'What are the main business goals you aim to achieve with the help of AI and automation?',
    description: 'Clear business goals are essential for successful AI implementation. This helps us understand your strategic objectives and how AI can be aligned with your broader business vision. Consider both short-term operational improvements and long-term strategic advantages.',
    category: 'strategy',
    type: 'text',
    weight: 1.0,
    textInput: {
      placeholder: 'Describe your main business goals for AI implementation...',
      maxLength: 500
    }
  },
  {
    id: 'business-metrics',
    text: 'What metrics or KPIs do you currently use to measure the success of your business?',
    description: 'Key Performance Indicators (KPIs) are crucial for measuring AI implementation success. Understanding your current metrics helps us establish baseline measurements and identify which metrics could be enhanced through AI-driven insights and automation.',
    category: 'strategy',
    type: 'text',
    weight: 1.0,
    textInput: {
      placeholder: 'List your key business metrics and KPIs...',
      maxLength: 500
    }
  },
  {
    id: 'time-consuming-processes',
    text: 'Which business processes in your company are currently the most time-consuming or resource-intensive?',
    description: 'Identifying resource-intensive processes helps us pinpoint opportunities for AI automation. These are typically repetitive tasks, data-heavy operations, or complex workflows that could benefit from AI-driven optimization and automation.',
    category: 'strategy',
    type: 'text',
    weight: 1.0,
    textInput: {
      placeholder: 'Describe your most time-consuming business processes...',
      maxLength: 500
    }
  },
  {
    id: 'process-documentation',
    text: 'How well-documented are your business processes?',
    description: 'Process documentation is crucial for AI implementation as it helps identify automation opportunities and ensures consistent execution. Well-documented processes make it easier to train AI systems and measure their effectiveness.',
    category: 'strategy',
    type: 'slider',
    weight: 1.0,
    slider: {
      min: 0,
      max: 100,
      step: 25,
      labels: {
        start: 'Not Started',
        end: 'Complete'
      }
    }
  },
  {
    id: 'workflow-restructuring',
    text: 'Are you open to restructuring workflows to accommodate AI and automation?',
    description: 'Workflow restructuring is often necessary to fully leverage AI capabilities. This question helps us understand your organization\'s flexibility and readiness to adapt existing processes to incorporate AI-driven automation and optimization.',
    category: 'strategy',
    type: 'slider',
    weight: 1.0,
    slider: {
      min: 0,
      max: 100,
      step: 25,
      labels: {
        start: 'Not Started',
        end: 'Complete'
      }
    }
  },
  {
    id: 'software-tools',
    text: 'How many different software and tools do your company currently use to manage your key business process?',
    description: 'The number and variety of software tools can indicate integration complexity and potential for AI-driven consolidation. Understanding your current tech stack helps us identify opportunities for AI integration and automation.',
    category: 'strategy',
    type: 'multiple-choice',
    weight: 1.0,
    options: [
      { id: 'st1', text: '1-5 tools', score: 1 },
      { id: 'st2', text: '5-10 tools', score: 2 },
      { id: 'st3', text: '10+ tools', score: 3 },
      { id: 'st4', text: '20+ tools', score: 4 }
    ]
  },
  {
    id: 'software-list',
    text: 'Could you please list them?',
    description: 'A detailed list of your current software tools helps us understand your technology ecosystem and identify potential integration points for AI solutions. This information is crucial for planning seamless AI implementation.',
    category: 'strategy',
    type: 'text',
    weight: 1.0,
    textInput: {
      placeholder: 'List your current software and tools...',
      maxLength: 500
    }
  },
  {
    id: 'it-solutions-alignment',
    text: 'How well do your current IT solutions align with your business workflow and user needs?',
    description: 'IT-Business alignment is crucial for successful AI implementation. This question helps us assess how well your current technology infrastructure supports your business processes and where AI can enhance this alignment.',
    category: 'strategy',
    type: 'slider',
    weight: 1.0,
    slider: {
      min: 0,
      max: 100,
      step: 25,
      labels: {
        start: 'Not Started',
        end: 'Complete'
      }
    }
  },
  {
    id: 'dedicated-it-team',
    text: 'Do you have a dedicated IT Team in your company?',
    description: 'A dedicated IT team is important for AI implementation as they can provide technical expertise and support. This helps us understand your organization\'s technical capabilities and support structure for AI initiatives.',
    category: 'strategy',
    type: 'multiple-choice',
    weight: 1.0,
    options: [
      { id: 'it1', text: 'Yes, we have a dedicated IT team', score: 4 },
      { id: 'it2', text: 'No, we don\'t have a dedicated IT team', score: 0 }
    ]
  },
  {
    id: 'strategy-vision',
    text: 'How well-defined is your organization\'s AI strategy and vision?',
    description: 'A clear AI strategy and vision are essential for successful implementation. This question helps us understand how well your organization has planned its AI journey and whether there\'s a clear roadmap for AI adoption.',
    category: 'strategy',
    type: 'multiple-choice',
    weight: 1.5,
    options: [
      { id: 'sv1', text: 'No formal AI strategy exists', score: 0 },
      { id: 'sv2', text: 'Basic ideas but no concrete plans', score: 1 },
      { id: 'sv3', text: 'Strategy in development with some goals defined', score: 2 },
      { id: 'sv4', text: 'Clear strategy with defined objectives', score: 3 },
      { id: 'sv5', text: 'Comprehensive strategy integrated with business goals', score: 4 }
    ]
  },
  {
    id: 'data-maturity',
    text: 'Rate your organization\'s data management maturity',
    description: 'Data maturity is crucial for AI success. This includes data quality, governance, and infrastructure. Understanding your data maturity helps us identify gaps and opportunities for AI implementation.',
    category: 'data',
    type: 'slider',
    weight: 1.8,
    slider: {
      min: 0,
      max: 100,
      step: 10,
      labels: {
        start: 'Basic',
        end: 'Advanced'
      }
    }
  },
  {
    id: 'infrastructure-readiness',
    text: 'How would you rate your technical infrastructure\'s AI readiness?',
    description: 'Technical infrastructure readiness is essential for AI implementation. This includes computing resources, data storage, and network capabilities. Understanding your infrastructure helps us plan for necessary upgrades or cloud solutions.',
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
    id: 'talent-expertise',
    text: 'What is your team\'s AI/ML expertise level?',
    description: 'AI/ML expertise is crucial for successful implementation and maintenance of AI solutions. This question helps us understand your team\'s capabilities and identify potential training needs or external support requirements.',
    category: 'talent',
    type: 'multiple-choice',
    weight: 1.7,
    options: [
      { id: 'te1', text: 'No dedicated AI expertise', score: 0 },
      { id: 'te2', text: 'Basic understanding in key teams', score: 1 },
      { id: 'te3', text: 'Dedicated AI roles and capabilities', score: 2 },
      { id: 'te4', text: 'Advanced expertise and specialized teams', score: 3 },
      { id: 'te5', text: 'Industry-leading AI capabilities', score: 4 }
    ]
  },
  {
    id: 'data-quality',
    text: 'How would you rate your data quality and standardization?',
    description: 'Data quality and standardization are fundamental for AI success. This includes data accuracy, completeness, consistency, and standardization across systems. Understanding your data quality helps us plan for necessary improvements.',
    category: 'data',
    type: 'multiple-choice',
    weight: 1.6,
    options: [
      { id: 'dq1', text: 'No standardized quality measures', score: 0 },
      { id: 'dq2', text: 'Basic quality controls', score: 1 },
      { id: 'dq3', text: 'Established quality framework', score: 2 },
      { id: 'dq4', text: 'Advanced quality management', score: 3 },
      { id: 'dq5', text: 'Industry-leading standards', score: 4 }
    ]
  },
  {
    id: 'data-privacy',
    text: 'Assess your data privacy and security measures',
    description: 'Data privacy and security are critical for AI implementation. This includes compliance with regulations, data protection measures, and security protocols. Understanding your current measures helps us ensure secure AI deployment.',
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
    id: 'ai-ethics',
    text: 'How mature is your AI ethics and responsibility framework?',
    description: 'AI ethics and responsibility are crucial for sustainable AI implementation. This includes guidelines for fair AI use, bias prevention, and responsible AI practices. Understanding your current framework helps us ensure ethical AI deployment.',
    category: 'governance',
    type: 'multiple-choice',
    weight: 1.7,
    options: [
      { id: 'ae1', text: 'No formal ethics framework', score: 0 },
      { id: 'ae2', text: 'Basic guidelines in place', score: 1 },
      { id: 'ae3', text: 'Established ethics policies', score: 2 },
      { id: 'ae4', text: 'Comprehensive ethics framework', score: 3 },
      { id: 'ae5', text: 'Industry-leading ethics standards', score: 4 }
    ]
  },
  {
    id: 'business-alignment',
    text: 'How well is AI aligned with your business objectives?',
    description: 'AI-business alignment ensures that AI initiatives support your strategic goals. This includes clear objectives, measurable outcomes, and stakeholder alignment. Understanding your current alignment helps us optimize AI implementation.',
    category: 'strategy',
    type: 'slider',
    weight: 1.6,
    slider: {
      min: 0,
      max: 100,
      step: 10,
      labels: {
        start: 'Minimal',
        end: 'Full Alignment'
      }
    }
  },
  {
    id: 'change-management',
    text: 'Rate your organization\'s change management capabilities',
    description: 'Change management is crucial for successful AI implementation. This includes stakeholder engagement, training programs, and communication strategies. Understanding your capabilities helps us plan for smooth AI adoption.',
    category: 'culture',
    type: 'multiple-choice',
    weight: 1.5,
    options: [
      { id: 'cm1', text: 'No formal change management', score: 0 },
      { id: 'cm2', text: 'Basic change processes', score: 1 },
      { id: 'cm3', text: 'Structured change framework', score: 2 },
      { id: 'cm4', text: 'Advanced change capabilities', score: 3 },
      { id: 'cm5', text: 'Exceptional change management', score: 4 }
    ]
  },
  {
    id: 'innovation-culture',
    text: 'Assess your organization\'s innovation culture',
    description: 'Innovation culture is important for AI adoption. This includes openness to new ideas, experimentation, and continuous learning. Understanding your culture helps us plan for successful AI implementation.',
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
    id: 'data-infrastructure',
    text: 'How advanced is your data infrastructure?',
    description: 'Data infrastructure is fundamental for AI success. This includes data storage, processing capabilities, and integration systems. Understanding your infrastructure helps us plan for necessary upgrades or cloud solutions.',
    category: 'infrastructure',
    type: 'multiple-choice',
    weight: 1.7,
    options: [
      { id: 'di1', text: 'Basic data storage only', score: 0 },
      { id: 'di2', text: 'Some data integration', score: 1 },
      { id: 'di3', text: 'Modern data warehouse', score: 2 },
      { id: 'di4', text: 'Advanced data platform', score: 3 },
      { id: 'di5', text: 'Full data ecosystem', score: 4 }
    ]
  },
  {
    id: 'talent-development',
    text: 'Rate your AI talent development program',
    description: 'AI talent development is crucial for sustainable AI implementation. This includes training programs, skill development, and career paths. Understanding your current program helps us identify gaps and opportunities.',
    category: 'talent',
    type: 'slider',
    weight: 1.5,
    slider: {
      min: 0,
      max: 100,
      step: 10,
      labels: {
        start: 'Limited',
        end: 'Comprehensive'
      }
    }
  },
  {
    id: 'risk-management',
    text: 'How mature is your AI risk management framework?',
    description: 'AI risk management is essential for sustainable implementation. This includes risk assessment, mitigation strategies, and monitoring systems. Understanding your framework helps us ensure secure and responsible AI deployment.',
    category: 'governance',
    type: 'multiple-choice',
    weight: 1.6,
    options: [
      { id: 'rm1', text: 'No risk framework', score: 0 },
      { id: 'rm2', text: 'Basic risk assessment', score: 1 },
      { id: 'rm3', text: 'Structured risk management', score: 2 },
      { id: 'rm4', text: 'Advanced risk controls', score: 3 },
      { id: 'rm5', text: 'Comprehensive risk framework', score: 4 }
    ]
  },
  {
    id: 'stakeholder-engagement',
    text: 'Assess stakeholder engagement in AI initiatives',
    description: 'Stakeholder engagement is crucial for successful AI implementation. This includes leadership support, user adoption, and cross-functional collaboration. Understanding your current engagement helps us plan for effective AI deployment.',
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
  {
    id: 'data-governance',
    text: 'How effective is your data governance framework?',
    description: 'Data governance is essential for AI success. This includes data policies, standards, and management processes. Understanding your framework helps us ensure proper data handling and compliance in AI implementation.',
    category: 'governance',
    type: 'multiple-choice',
    weight: 1.7,
    options: [
      { id: 'dg1', text: 'No governance framework', score: 0 },
      { id: 'dg2', text: 'Basic governance rules', score: 1 },
      { id: 'dg3', text: 'Established governance', score: 2 },
      { id: 'dg4', text: 'Advanced governance model', score: 3 },
      { id: 'dg5', text: 'Industry-leading governance', score: 4 }
    ]
  },
  {
    id: 'business-objectives',
    text: 'What are your primary business objectives for implementing AI?',
    description: 'Clear business objectives are essential for successful AI implementation. This helps us understand your strategic goals and how AI can support them. Consider both immediate operational improvements and long-term strategic advantages.',
    category: 'strategy',
    type: 'text',
    weight: 1.5,
    textInput: {
      placeholder: 'Describe your main business goals for AI implementation...',
      maxLength: 500
    }
  },
  {
    id: 'industry-challenges',
    text: 'What are the biggest challenges in your industry that AI could help solve?',
    description: 'Understanding industry challenges helps us identify AI opportunities. This includes market pressures, operational inefficiencies, or competitive threats that AI could address. This information helps us tailor AI solutions to your specific needs.',
    category: 'strategy',
    type: 'text',
    weight: 1.4,
    textInput: {
      placeholder: 'List the key challenges and how AI might address them...',
      maxLength: 500
    }
  },
  {
    id: 'roi-expectations',
    text: 'What are your expectations for AI ROI and timeline?',
    description: 'Realistic ROI expectations are crucial for successful AI implementation. This includes both financial returns and operational improvements. Understanding your expectations helps us set appropriate goals and timelines.',
    category: 'strategy',
    type: 'multiple-choice',
    weight: 1.6,
    options: [
      { id: 'roi1', text: 'Immediate cost savings (0-6 months)', score: 0 },
      { id: 'roi2', text: 'Short-term efficiency gains (6-12 months)', score: 1 },
      { id: 'roi3', text: 'Medium-term process optimization (1-2 years)', score: 2 },
      { id: 'roi4', text: 'Long-term strategic advantage (2-3 years)', score: 3 },
      { id: 'roi5', text: 'Transformational impact (3+ years)', score: 4 }
    ]
  },
  {
    id: 'competitor-analysis',
    text: 'How are your competitors using AI?',
    description: 'Understanding competitor AI usage helps identify opportunities and threats. This includes their AI initiatives, successes, and challenges. This information helps us develop a competitive AI strategy.',
    category: 'strategy',
    type: 'text',
    weight: 1.3,
    textInput: {
      placeholder: 'Describe your competitors\' AI initiatives and your competitive position...',
      maxLength: 500
    }
  },
  {
    id: 'customer-impact',
    text: 'How do you expect AI to impact your customer experience?',
    description: 'Customer experience is a key area for AI impact. This includes personalization, service automation, and customer insights. Understanding your expectations helps us focus AI implementation on customer value.',
    category: 'strategy',
    type: 'multiple-choice',
    weight: 1.5,
    options: [
      { id: 'ci1', text: 'No direct customer impact planned', score: 0 },
      { id: 'ci2', text: 'Basic customer service automation', score: 1 },
      { id: 'ci3', text: 'Enhanced customer insights and personalization', score: 2 },
      { id: 'ci4', text: 'Advanced customer experience transformation', score: 3 },
      { id: 'ci5', text: 'Complete customer journey reimagining', score: 4 }
    ]
  },
  {
    id: 'market-readiness',
    text: 'How ready is your market for AI-driven solutions?',
    description: 'Market readiness is crucial for successful AI implementation. This includes customer adoption, competitive landscape, and regulatory environment. Understanding your market helps us plan for effective AI deployment.',
    category: 'strategy',
    type: 'slider',
    weight: 1.4,
    slider: {
      min: 0,
      max: 100,
      step: 10,
      labels: {
        start: 'Not Ready',
        end: 'Highly Ready'
      }
    }
  },
  {
    id: 'regulatory-compliance',
    text: 'What are your industry-specific regulatory requirements for AI?',
    description: 'Regulatory compliance is essential for AI implementation. This includes industry-specific regulations, data protection laws, and ethical guidelines. Understanding your requirements helps us ensure compliant AI deployment.',
    category: 'governance',
    type: 'text',
    weight: 1.7,
    textInput: {
      placeholder: 'Describe relevant regulations and compliance requirements...',
      maxLength: 500
    }
  },
  {
    id: 'partnership-strategy',
    text: 'What is your strategy for AI partnerships and collaborations?',
    description: 'AI partnerships can accelerate implementation and provide expertise. This includes technology providers, research institutions, and industry partners. Understanding your strategy helps us identify potential collaboration opportunities.',
    category: 'strategy',
    type: 'multiple-choice',
    weight: 1.5,
    options: [
      { id: 'ps1', text: 'No partnership strategy', score: 0 },
      { id: 'ps2', text: 'Basic vendor relationships', score: 1 },
      { id: 'ps3', text: 'Strategic technology partnerships', score: 2 },
      { id: 'ps4', text: 'Ecosystem of AI partners', score: 3 },
      { id: 'ps5', text: 'Industry-leading partnerships', score: 4 }
    ]
  }
];