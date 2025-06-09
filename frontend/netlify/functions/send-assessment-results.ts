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
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              max-width: 150px;
              height: auto;
              margin-bottom: 20px;
            }
            h1 {
              color: #2E363C;
              margin-bottom: 20px;
              font-size: 2.5rem;
              font-weight: bold;
            }
            h2 {
              color: #677076;
              margin-bottom: 15px;
            }
            h3 {
              color: #2E363C;
              margin-bottom: 15px;
              font-size: 1.25rem;
              font-weight: 600;
            }
            ul {
              list-style: none;
              padding: 0;
            }
            li {
              margin-bottom: 20px;
              padding: 15px;
              background-color: #f8f9fa;
              border-radius: 8px;
            }
            .score {
              font-size: 24px;
              font-weight: bold;
              color: #677076;
              margin: 20px 0;
            }
            .maturity-level {
              font-size: 18px;
              color: #677076;
              margin-bottom: 30px;
            }
            .question {
              font-weight: bold;
              color: #2E363C;
              margin-bottom: 10px;
            }
            .answer {
              color: #677076;
            }
            .grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
              margin-top: 2rem;
            }
            .card {
              background: white;
              padding: 2rem;
              border: 2px solid #E7E9EC;
              border-radius: 8px;
            }
            .card ul {
              list-style: none;
              padding: 0;
            }
            .card li {
              margin-bottom: 1rem;
              padding: 0;
              background: none;
              color: #687177;
            }
            .cta-section {
              margin-top: 40px;
              padding: 30px;
              background-color: #f8f9fa;
              border-radius: 12px;
              text-align: center;
            }
            .cta-title {
              font-size: 24px;
              color: #2E363C;
              margin-bottom: 20px;
            }
            .cta-description {
              color: #677076;
              margin-bottom: 30px;
              font-size: 16px;
            }
            .cta-button {
              display: inline-block;
              padding: 15px 30px;
              background-color: #677076;
              color: white;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              transition: background-color 0.2s;
            }
            .cta-button:hover {
              background-color: #2E363C;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="https://cdn.brandfetch.io/bloomteq.com/fallback/lettermark/theme/dark/h/256/w/256/icon?c=1bfwsmEH20zzEfSNTed" alt="Bloomteq Logo" class="logo">
            <h1>Your AI Readiness Results</h1>
            <p style="color: #687177; font-size: 1.25rem; max-width: 42rem; margin: 0 auto;">
              Based on your responses, here's your organization's current AI readiness assessment.
            </p>
          </div>

          <div class="grid">
            <div class="card">
              <h3>Overall Score</h3>
              <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
                <div style="font-size: 3.75rem; font-weight: bold; color: #677076;">
                  ${Math.round(score)}%
                </div>
                <div style="font-size: 1.5rem; font-weight: 600;">
                  ${maturityLevel}
                </div>
              </div>
            </div>

            <div class="card">
              <h3>Detailed Breakdown</h3>
              <div style="margin-top: 1rem;">
                <div style="display: flex; justify-content: space-between; color: #687177; font-size: 0.875rem; margin-bottom: 0.25rem;">
                  <span>Score</span>
                  <span>${score} / ${maxScore}</span>
                </div>
                <div style="height: 0.5rem; background: #E7E9EC; border-radius: 9999px; overflow: hidden;">
                  <div style="height: 100%; background: linear-gradient(to right, #677076, #8a6b4e); width: ${score}%;"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid">
            <div class="card">
              <h3>Next Steps</h3>
              <ul>
                <li>Review your detailed assessment report</li>
                <li>Identify key areas for improvement</li>
                <li>Develop an action plan</li>
                <li>Set measurable goals</li>
              </ul>
            </div>

            <div class="card">
              <h3>Resources</h3>
              <ul>
                <li>Schedule a free consultation to get your personalized AI implementation roadmap</li>
                <li>Access our comprehensive AI readiness guide</li>
                <li>Learn from industry best practices and case studies</li>
              </ul>
            </div>

            <div class="card">
              <h3>Support</h3>
              <ul>
                <li>Get expert guidance on your AI journey</li>
                <li>Receive personalized recommendations</li>
                <li>Access dedicated support for implementation</li>
              </ul>
            </div>
          </div>

          <div class="card" style="margin-top: 2rem;">
            <h3>Your Detailed Responses</h3>
            <ul>
              ${answers.map(answer => {
                const questionId = answer.questionId.split('_')[0]; // Get the prefix (it, te, dq, etc.)
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
                  <li>
                    <div class="question">${questionText}</div>
                    <div class="answer">${answerText}</div>
                  </li>
                `;
              }).join('')}
            </ul>
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