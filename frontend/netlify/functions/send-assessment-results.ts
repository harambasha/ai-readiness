import { Handler } from '@netlify/functions';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  throw new Error('SENDGRID_API_KEY is not set');
}
sgMail.setApiKey(apiKey);

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
      ${answers.map(answer => `
        Question: ${answer.questionId}
        ${answer.optionId ? `Selected Option: ${answer.optionId}` : ''}
        ${answer.score ? `Score: ${answer.score}` : ''}
        ${answer.sliderValue ? `Slider Value: ${answer.sliderValue}%` : ''}
        ${answer.textValue ? `Text Response: ${answer.textValue}` : ''}
      `).join('\n')}
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
            ${answers.map(answer => `
              <li>
                <strong>Question:</strong> ${answer.questionId}<br>
                ${answer.optionId ? `<strong>Selected Option:</strong> ${answer.optionId}<br>` : ''}
                ${answer.score ? `<strong>Score:</strong> ${answer.score}<br>` : ''}
                ${answer.sliderValue ? `<strong>Slider Value:</strong> ${answer.sliderValue}%<br>` : ''}
                ${answer.textValue ? `<strong>Text Response:</strong> ${answer.textValue}<br>` : ''}
              </li>
            `).join('')}
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