import { Handler } from '@netlify/functions';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  throw new Error('SENDGRID_API_KEY is not set');
}
sgMail.setApiKey(apiKey);

// Map for option IDs to their text values
const OPTION_MAP: Record<string, string> = {
  // IT Team questions
  'it1': 'No dedicated IT team',
  'it2': 'Small IT team (1-5 people)',
  'it3': 'Medium IT team (6-20 people)',
  'it4': 'Large IT team (20+ people)',
  
  // Team Expertise questions
  'te1': 'No AI/ML expertise',
  'te2': 'Basic understanding',
  'te3': 'Some practical experience',
  'te4': 'Advanced expertise',
  
  // Data Quality questions
  'dq1': 'Poor - No data standards',
  'dq2': 'Basic - Some standards in place',
  'dq3': 'Good - Well-defined standards',
  'dq4': 'Excellent - Comprehensive standards',
  
  // Data Infrastructure questions
  'di1': 'Basic - Limited infrastructure',
  'di2': 'Developing - Some modern tools',
  'di3': 'Advanced - Cloud-based solutions',
  'di4': 'State-of-the-art - AI-ready infrastructure',
  
  // Strategy Vision questions
  'sv1': 'Not Started',
  'sv2': 'Early Stage',
  'sv3': 'In Progress',
  'sv4': 'Advanced',
  'sv5': 'Complete',

  // Software Tools questions
  'st1': 'Basic - Limited tools',
  'st2': 'Developing - Some modern tools',
  'st3': 'Advanced - Comprehensive toolset',
  'st4': 'State-of-the-art - AI-ready tools',

  // AI Ethics questions
  'ae1': 'Not Started',
  'ae2': 'Early Stage',
  'ae3': 'In Progress',
  'ae4': 'Advanced',
  'ae5': 'Complete',

  // Change Management questions
  'cm1': 'Not Started',
  'cm2': 'Early Stage',
  'cm3': 'In Progress',
  'cm4': 'Advanced',
  'cm5': 'Complete',

  // Risk Management questions
  'rm1': 'Not Started',
  'rm2': 'Early Stage',
  'rm3': 'In Progress',
  'rm4': 'Advanced',
  'rm5': 'Complete',

  // Data Governance questions
  'dg1': 'Not Started',
  'dg2': 'Early Stage',
  'dg3': 'In Progress',
  'dg4': 'Advanced',
  'dg5': 'Complete',

  // Customer Impact questions
  'ci1': 'Not Started',
  'ci2': 'Early Stage',
  'ci3': 'In Progress',
  'ci4': 'Advanced',
  'ci5': 'Complete',

  // Partnership Strategy questions
  'ps1': 'Not Started',
  'ps2': 'Early Stage',
  'ps3': 'In Progress',
  'ps4': 'Advanced',
  'ps5': 'Complete',

  // ROI Expectations questions
  'roi1': 'Short-term (0-6 months)',
  'roi2': 'Medium-term (6-12 months)',
  'roi3': 'Long-term (12+ months)',
  'roi4': 'Strategic investment'
};

// Map for question IDs to their text values
const QUESTION_MAP: Record<string, string> = {
  // Company Information
  'company-name': 'Company Name',
  'company-email': 'Company Email',
  
  // Business Context
  'company-challenges': 'What are your main business challenges?',
  'business-goals': 'What are your primary business goals?',
  'business-metrics': 'What key metrics do you track?',
  'time-consuming-processes': 'What are your most time-consuming processes?',
  'process-documentation': 'How well are your processes documented?',
  'workflow-restructuring': 'How ready are you for workflow restructuring?',
  'software-tools': 'What is your current software tool landscape?',
  'software-list': 'What software tools do you currently use?',
  'it-solutions-alignment': 'How well are your IT solutions aligned?',
  'dedicated-it-team': 'Do you have a dedicated IT Team in your company?',
  
  // Strategy & Vision
  'strategy-vision': 'How well-defined is your organization\'s AI strategy and vision?',
  'data-maturity': 'What is your data maturity level?',
  'infrastructure-readiness': 'How ready is your infrastructure for AI?',
  'talent-expertise': 'What is your team\'s AI/ML expertise level?',
  'data-quality': 'How would you rate your data quality and standardization?',
  'data-privacy': 'How well do you handle data privacy?',
  'ai-ethics': 'How well-defined are your AI ethics guidelines?',
  'business-alignment': 'How well is AI aligned with your business goals?',
  'change-management': 'How ready are you for change management?',
  'innovation-culture': 'How strong is your innovation culture?',
  'data-infrastructure': 'How advanced is your data infrastructure?',
  'talent-development': 'How well do you develop AI talent?',
  'risk-management': 'How well do you manage AI-related risks?',
  'stakeholder-engagement': 'How well do you engage stakeholders?',
  'data-governance': 'How well do you govern your data?',
  
  // Business Objectives
  'business-objectives': 'What are your specific business objectives?',
  'industry-challenges': 'What are your industry-specific challenges?',
  'roi-expectations': 'What are your ROI expectations?',
  'competitor-analysis': 'How do you analyze your competitors?',
  'customer-impact': 'How do you measure customer impact?',
  'market-readiness': 'How ready is your market?',
  'regulatory-compliance': 'How do you handle regulatory compliance?',
  'partnership-strategy': 'How well-defined is your partnership strategy?'
};

// Map for slider values to their text values
const SLIDER_MAP: Record<number, string> = {
  0: 'Not Started',
  25: 'Early Stage',
  50: 'In Progress',
  75: 'Advanced',
  100: 'Complete'
};

// Define the Answer type
interface Answer {
  questionId: string;
  optionId?: string;
  sliderValue?: number;
  textValue?: string;
}

// Define weights for each option
const OPTION_WEIGHTS: Record<string, number> = {
  // IT Infrastructure
  'it_1_1': 1, // No formal strategy
  'it_1_2': 2, // Basic documentation
  'it_1_3': 3, // Standardized processes
  'it_1_4': 4, // Comprehensive strategy
  'it_1_5': 5, // Advanced implementation

  'it_2_1': 1, // No dedicated team
  'it_2_2': 2, // Part-time resources
  'it_2_3': 3, // Small dedicated team
  'it_2_4': 4, // Cross-functional team
  'it_2_5': 5, // Specialized AI team

  'it_3_1': 1, // No cloud usage
  'it_3_2': 2, // Basic cloud storage
  'it_3_3': 3, // Some cloud services
  'it_3_4': 4, // Hybrid cloud
  'it_3_5': 5, // Cloud-first strategy

  'it_4_1': 1, // No data strategy
  'it_4_2': 2, // Basic data storage
  'it_4_3': 3, // Some data management
  'it_4_4': 4, // Comprehensive strategy
  'it_4_5': 5, // Advanced data platform

  'it_5_1': 1, // No security measures
  'it_5_2': 2, // Basic security
  'it_5_3': 3, // Standard security
  'it_5_4': 4, // Advanced security
  'it_5_5': 5, // Comprehensive security

  // Technical Expertise
  'te_1_1': 1, // No AI knowledge
  'te_1_2': 2, // Basic understanding
  'te_1_3': 3, // Some expertise
  'te_1_4': 4, // Strong expertise
  'te_1_5': 5, // Expert level

  'te_2_1': 1, // No training
  'te_2_2': 2, // Basic training
  'te_2_3': 3, // Regular training
  'te_2_4': 4, // Comprehensive training
  'te_2_5': 5, // Advanced training

  'te_3_1': 1, // No experience
  'te_3_2': 2, // Basic projects
  'te_3_3': 3, // Some projects
  'te_3_4': 4, // Multiple projects
  'te_3_5': 5, // Extensive experience

  'te_4_1': 1, // No tools
  'te_4_2': 2, // Basic tools
  'te_4_3': 3, // Some tools
  'te_4_4': 4, // Advanced tools
  'te_4_5': 5, // Comprehensive tools

  'te_5_1': 1, // No integration
  'te_5_2': 2, // Basic integration
  'te_5_3': 3, // Some integration
  'te_5_4': 4, // Advanced integration
  'te_5_5': 5, // Comprehensive integration

  // Data Quality
  'dq_1_1': 1, // No data
  'dq_1_2': 2, // Basic data
  'dq_1_3': 3, // Some data
  'dq_1_4': 4, // Good data
  'dq_1_5': 5, // Excellent data

  'dq_2_1': 1, // No structure
  'dq_2_2': 2, // Basic structure
  'dq_2_3': 3, // Some structure
  'dq_2_4': 4, // Good structure
  'dq_2_5': 5, // Excellent structure

  'dq_3_1': 1, // No quality
  'dq_3_2': 2, // Basic quality
  'dq_3_3': 3, // Some quality
  'dq_3_4': 4, // Good quality
  'dq_3_5': 5, // Excellent quality

  'dq_4_1': 1, // No governance
  'dq_4_2': 2, // Basic governance
  'dq_4_3': 3, // Some governance
  'dq_4_4': 4, // Good governance
  'dq_4_5': 5, // Excellent governance

  'dq_5_1': 1, // No security
  'dq_5_2': 2, // Basic security
  'dq_5_3': 3, // Some security
  'dq_5_4': 4, // Good security
  'dq_5_5': 5, // Excellent security

  // Business Strategy
  'bs_1_1': 1, // No strategy
  'bs_1_2': 2, // Basic strategy
  'bs_1_3': 3, // Some strategy
  'bs_1_4': 4, // Good strategy
  'bs_1_5': 5, // Excellent strategy

  'bs_2_1': 1, // No alignment
  'bs_2_2': 2, // Basic alignment
  'bs_2_3': 3, // Some alignment
  'bs_2_4': 4, // Good alignment
  'bs_2_5': 5, // Excellent alignment

  'bs_3_1': 1, // No investment
  'bs_3_2': 2, // Basic investment
  'bs_3_3': 3, // Some investment
  'bs_3_4': 4, // Good investment
  'bs_3_5': 5, // Excellent investment

  'bs_4_1': 1, // No metrics
  'bs_4_2': 2, // Basic metrics
  'bs_4_3': 3, // Some metrics
  'bs_4_4': 4, // Good metrics
  'bs_4_5': 5, // Excellent metrics

  'bs_5_1': 1, // No roadmap
  'bs_5_2': 2, // Basic roadmap
  'bs_5_3': 3, // Some roadmap
  'bs_5_4': 4, // Good roadmap
  'bs_5_5': 5, // Excellent roadmap

  // Organizational Readiness
  'or_1_1': 1, // No culture
  'or_1_2': 2, // Basic culture
  'or_1_3': 3, // Some culture
  'or_1_4': 4, // Good culture
  'or_1_5': 5, // Excellent culture

  'or_2_1': 1, // No skills
  'or_2_2': 2, // Basic skills
  'or_2_3': 3, // Some skills
  'or_2_4': 4, // Good skills
  'or_2_5': 5, // Excellent skills

  'or_3_1': 1, // No change
  'or_3_2': 2, // Basic change
  'or_3_3': 3, // Some change
  'or_3_4': 4, // Good change
  'or_3_5': 5, // Excellent change

  'or_4_1': 1, // No collaboration
  'or_4_2': 2, // Basic collaboration
  'or_4_3': 3, // Some collaboration
  'or_4_4': 4, // Good collaboration
  'or_4_5': 5, // Excellent collaboration

  'or_5_1': 1, // No leadership
  'or_5_2': 2, // Basic leadership
  'or_5_3': 3, // Some leadership
  'or_5_4': 4, // Good leadership
  'or_5_5': 5, // Excellent leadership
};

// Calculate the score based on answers
function calculateScore(answers: Answer[]): number {
  let totalScore = 0;
  let maxPossibleScore = 0;

  answers.forEach(answer => {
    if (answer.optionId) {
      // For multiple choice questions, each option has a weight
      const optionWeight = OPTION_WEIGHTS[answer.optionId] || 0;
      totalScore += optionWeight;
      maxPossibleScore += 5; // Assuming 5 is the maximum weight for any option
    } else if (answer.sliderValue !== undefined) {
      // For slider questions, the value is the score
      totalScore += answer.sliderValue;
      maxPossibleScore += 100; // Sliders are 0-100
    }
  });

  // Convert to percentage
  return (totalScore / maxPossibleScore) * 100;
}

// Calculate maturity level based on score
function calculateMaturityLevel(score: number): string {
  if (score >= 80) return 'Advanced';
  if (score >= 60) return 'Intermediate';
  if (score >= 40) return 'Developing';
  if (score >= 20) return 'Beginning';
  return 'Novice';
}

const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    console.log('Received request body:', JSON.stringify(body, null, 2));

    const { email, answers } = body;

    if (!email || !answers) {
      console.error('Missing required fields:', { email, answers });
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Missing required fields',
          details: {
            hasEmail: !!email,
            hasAnswers: !!answers
          }
        }),
      };
    }

    // Convert to array if it's a single email
    const recipients = Array.isArray(email) ? email : [email];
    console.log('Sending to recipients:', recipients);

    const score = calculateScore(answers);
    const maturityLevel = calculateMaturityLevel(score);
    const maxScore = 100; // Maximum possible score

    const subject = 'Your AI Readiness Assessment Results';
    const text = `
      Your AI Readiness Assessment Results

      Thank you for completing the AI Readiness Assessment.

      Your Score: ${score}
      Maturity Level: ${maturityLevel}

      Your Answers:
      ${answers.map(answer => {
        const questionId = answer.questionId.split('_')[0]; // Get the prefix (it, te, dq, etc.)
        const questionText = QUESTION_MAP[questionId] || answer.questionId;
        let answerText = '';
        
        if (answer.optionId) {
          answerText = `Selected Option: ${OPTION_MAP[answer.optionId] || answer.optionId}`;
        } else if (answer.sliderValue !== undefined) {
          answerText = `Slider Value: ${SLIDER_MAP[answer.sliderValue] || `${answer.sliderValue}%`}`;
        } else if (answer.textValue) {
          answerText = `Text Response: ${answer.textValue}`;
        }

        return `
          Question: ${questionText}
          ${answerText}
        `;
      }).join('\n')}
    `;

    const html = `
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'IBM Plex Sans', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
            }
            .header {
              text-align: center;
              padding: 40px 20px;
              background: linear-gradient(135deg, #677076 0%, #8a6b4e 100%);
              color: white;
            }
            .logo {
              max-width: 120px;
              height: auto;
              margin-bottom: 20px;
            }
            h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 700;
              color: white;
            }
            .subtitle {
              color: rgba(255, 255, 255, 0.9);
              font-size: 16px;
              margin-top: 10px;
            }
            .content {
              padding: 40px 20px;
            }
            .score-container {
              text-align: center;
              margin-bottom: 40px;
            }
            .score {
              font-size: 48px;
              font-weight: 700;
              color: #677076;
              margin: 0;
            }
            .maturity {
              font-size: 20px;
              font-weight: 600;
              color: #8a6b4e;
              margin: 10px 0;
            }
            .progress-bar {
              height: 8px;
              background: #f0f0f0;
              border-radius: 4px;
              margin: 20px auto;
              max-width: 300px;
              overflow: hidden;
            }
            .progress {
              height: 100%;
              background: linear-gradient(to right, #677076, #8a6b4e);
              border-radius: 4px;
            }
            .section {
              margin-bottom: 40px;
            }
            .section-title {
              font-size: 20px;
              font-weight: 600;
              color: #2E363C;
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 2px solid #f0f0f0;
            }
            .grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 40px;
            }
            .card {
              background: #f9fafb;
              padding: 20px;
              border-radius: 8px;
            }
            .list-item {
              display: flex;
              align-items: flex-start;
              margin-bottom: 15px;
            }
            .icon-container {
              width: 24px;
              height: 24px;
              background: #677076;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 12px;
              flex-shrink: 0;
            }
            .icon {
              width: 14px;
              height: 14px;
              color: white;
            }
            .text {
              color: #4b5563;
              font-size: 14px;
            }
            .response-item {
              margin-bottom: 24px;
              padding-bottom: 24px;
              border-bottom: 1px solid #f0f0f0;
            }
            .response-item:last-child {
              border-bottom: none;
              margin-bottom: 0;
              padding-bottom: 0;
            }
            .question {
              font-weight: 600;
              color: #2E363C;
              margin-bottom: 8px;
              font-size: 15px;
            }
            .answer {
              color: #677076;
              font-size: 14px;
            }
            .cta-section {
              background: #f9fafb;
              padding: 40px 20px;
              text-align: center;
              border-top: 1px solid #f0f0f0;
            }
            .cta-title {
              font-size: 24px;
              color: #2E363C;
              margin-bottom: 16px;
              font-weight: 600;
            }
            .cta-description {
              color: #677076;
              margin-bottom: 24px;
              font-size: 15px;
              max-width: 500px;
              margin-left: auto;
              margin-right: auto;
            }
            .cta-button {
              display: inline-block;
              padding: 14px 32px;
              background: linear-gradient(135deg, #677076 0%, #8a6b4e 100%);
              color: white;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 15px;
              transition: opacity 0.2s;
            }
            .cta-button:hover {
              opacity: 0.9;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #677076;
              font-size: 12px;
            }
            @media (max-width: 600px) {
              .grid {
                grid-template-columns: 1fr;
              }
              .header {
                padding: 30px 20px;
              }
              h1 {
                font-size: 24px;
              }
              .content {
                padding: 30px 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://cdn.brandfetch.io/bloomteq.com/fallback/lettermark/theme/dark/h/256/w/256/icon?c=1bfwsmEH20zzEfSNTed" alt="Bloomteq Logo" class="logo">
              <h1>Your AI Readiness Results</h1>
              <div class="subtitle">Based on your responses, here's your organization's current AI readiness assessment.</div>
            </div>

            <div class="content">
              <div class="score-container">
                <div class="score">${Math.round(score)}%</div>
                <div class="maturity">${maturityLevel}</div>
                <div class="progress-bar">
                  <div class="progress" style="width: ${score}%"></div>
                </div>
              </div>

              <div class="grid">
                <div class="card">
                  <div class="section-title">Key Strengths</div>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    <li class="list-item">
                      <div class="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </div>
                      <span class="text">Data infrastructure and quality</span>
                    </li>
                    <li class="list-item">
                      <div class="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </div>
                      <span class="text">AI strategy alignment</span>
                    </li>
                    <li class="list-item">
                      <div class="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </div>
                      <span class="text">Talent development programs</span>
                    </li>
                  </ul>
                </div>

                <div class="card">
                  <div class="section-title">Areas for Improvement</div>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    <li class="list-item">
                      <div class="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                          <circle cx="12" cy="12" r="10"></circle>
                          <circle cx="12" cy="12" r="6"></circle>
                          <circle cx="12" cy="12" r="2"></circle>
                        </svg>
                      </div>
                      <span class="text">AI governance framework</span>
                    </li>
                    <li class="list-item">
                      <div class="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                          <circle cx="12" cy="12" r="10"></circle>
                          <circle cx="12" cy="12" r="6"></circle>
                          <circle cx="12" cy="12" r="2"></circle>
                        </svg>
                      </div>
                      <span class="text">Change management processes</span>
                    </li>
                    <li class="list-item">
                      <div class="icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                          <circle cx="12" cy="12" r="10"></circle>
                          <circle cx="12" cy="12" r="6"></circle>
                          <circle cx="12" cy="12" r="2"></circle>
                        </svg>
                      </div>
                      <span class="text">Innovation culture development</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Your Detailed Responses</div>
                <div>
                  ${answers.map(answer => {
                    const questionId = answer.questionId.split('_')[0];
                    const questionText = QUESTION_MAP[questionId] || answer.questionId;
                    let answerText = '';
                    
                    if (answer.optionId) {
                      answerText = OPTION_MAP[answer.optionId] || answer.optionId;
                    } else if (answer.sliderValue !== undefined) {
                      answerText = SLIDER_MAP[answer.sliderValue] || `${answer.sliderValue}%`;
                    } else if (answer.textValue) {
                      answerText = answer.textValue;
                    }

                    return `
                      <div class="response-item">
                        <div class="question">${questionText}</div>
                        <div class="answer">${answerText}</div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>

            <div class="cta-section">
              <h2 class="cta-title">Ready to Transform Your Business with AI?</h2>
              <p class="cta-description">
                Based on your assessment results, we can help you develop a comprehensive AI strategy 
                tailored to your organization's needs. Schedule a free consultation with our AI experts 
                to discuss your results and next steps.
              </p>
              <a href="https://calendly.com/bloomteq/ai-readiness-consultation" class="cta-button">
                Schedule Your Free Consultation
              </a>
            </div>

            <div class="footer">
              © ${new Date().getFullYear()} Bloomteq. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `;

    // Send to each recipient individually
    const sendPromises = recipients.map(recipient => {
      const msg = {
        to: recipient,
        from: 'info@bloomteq.com', // Updated to use verified sender
        subject,
        text,
        html,
      };
      console.log('Sending email to:', recipient);
      return sgMail.send(msg);
    });

    try {
      await Promise.all(sendPromises);
      console.log('Successfully sent all emails');
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Assessment results sent successfully' }),
      };
    } catch (sendError) {
      console.error('Error sending emails:', sendError);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Failed to send emails',
          details: sendError.message
        }),
      };
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to process request',
        details: error.message
      }),
    };
  }
};

export { handler }; 