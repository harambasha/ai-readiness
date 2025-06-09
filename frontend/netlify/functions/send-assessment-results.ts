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
  
  // Yes/No questions
  'yn1': 'Yes',
  'yn2': 'No'
};

// Map for slider values to their text values
const SLIDER_MAP: Record<number, string> = {
  0: 'Not Started',
  25: 'Early Stage',
  50: 'In Progress',
  75: 'Advanced',
  100: 'Complete'
};

// Map for question IDs to their text values
const QUESTION_MAP: Record<string, string> = {
  'it': 'Do you have a dedicated IT Team in your company?',
  'te': 'What is your team\'s AI/ML expertise level?',
  'dq': 'How would you rate your data quality and standardization?',
  'di': 'How advanced is your data infrastructure?',
  'sv': 'How well-defined is your organization\'s AI strategy and vision?'
};

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

    const { email, answers, score, maturityLevel } = body;

    if (!email || !answers || score === undefined || !maturityLevel) {
      console.error('Missing required fields:', { email, answers, score, maturityLevel });
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Missing required fields',
          details: {
            hasEmail: !!email,
            hasAnswers: !!answers,
            hasScore: score !== undefined,
            hasMaturityLevel: !!maturityLevel
          }
        }),
      };
    }

    // Convert to array if it's a single email
    const recipients = Array.isArray(email) ? email : [email];
    console.log('Sending to recipients:', recipients);

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
            }
            h2 {
              color: #677076;
              margin-bottom: 15px;
            }
            h3 {
              color: #677076;
              margin-bottom: 10px;
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
          </style>
        </head>
        <body>
          <div class="header">
            <img src="https://cdn.brandfetch.io/bloomteq.com/fallback/lettermark/theme/dark/h/256/w/256/icon?c=1bfwsmEH20zzEfSNTed" alt="Bloomteq Logo" class="logo">
            <h1>Your AI Readiness Assessment Results</h1>
          </div>
          <p>Thank you for completing the AI Readiness Assessment.</p>
          <div class="score">Your Score: ${score}</div>
          <div class="maturity-level">Maturity Level: ${maturityLevel}</div>
          <h3>Your Answers:</h3>
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