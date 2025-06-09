import { Handler } from '@netlify/functions';
import sgMail from '@sendgrid/mail';
import { generateEmailTemplate } from '../../src/utils/emailTemplate';

export const handler: Handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No request body provided' })
    };
  }

  try {
    const { to, answers, score, maturityLevel } = JSON.parse(event.body);

    if (!to || !answers || typeof score !== 'number' || !maturityLevel) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      throw new Error('SENDGRID_API_KEY is not configured');
    }

    sgMail.setApiKey(apiKey);

    const html = generateEmailTemplate(answers, score, maturityLevel);

    const msg = {
      to,
      from: 'your-verified-sender@yourdomain.com', // Replace with your verified sender
      subject: 'Your AI Readiness Assessment Results',
      html,
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
}; 