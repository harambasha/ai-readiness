import { Handler } from '@netlify/functions';
import sgMail from '@sendgrid/mail';
import { generateEmailTemplate } from '../../src/utils/emailTemplate';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

export const handler: Handler = async (event) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'No request body provided' })
    };
  }

  try {
    const { to, answers, score, maturityLevel } = JSON.parse(event.body);

    console.log('Received request:', { to, score, maturityLevel });

    if (!to || !answers || typeof score !== 'number' || !maturityLevel) {
      console.error('Missing required fields:', { to, answers, score, maturityLevel });
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Missing required fields',
          received: { to, answers, score, maturityLevel }
        })
      };
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      console.error('SENDGRID_API_KEY is not configured');
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

    console.log('Sending email to:', to);
    await sgMail.send(msg);
    console.log('Email sent successfully');

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
}; 