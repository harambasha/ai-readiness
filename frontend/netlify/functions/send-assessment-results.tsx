import { Handler } from '@netlify/functions';
import sgMail from '@sendgrid/mail';
import { renderToString } from 'react-dom/server';
import { EmailTemplate } from '../../components/EmailTemplate';

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
    const { email, answers, score, maturityLevel } = JSON.parse(event.body || '{}');

    if (!email || !answers || !score || !maturityLevel) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const emailHtml = renderToString(
      <EmailTemplate
        answers={answers}
        score={score}
        maturityLevel={maturityLevel}
      />
    );

    const msg = {
      to: email,
      from: 'noreply@yourdomain.com', // Replace with your verified sender
      subject: 'Your AI Readiness Assessment Results',
      html: emailHtml,
    };

    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Assessment results sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending assessment results:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send assessment results' }),
    };
  }
};

export { handler }; 