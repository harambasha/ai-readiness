import { Handler } from '@netlify/functions';
import sgMail from '@sendgrid/mail';
import { generateEmailTemplate } from '../../src/utils/emailTemplate';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

type Answer = {
  questionId: string;
  textValue?: string;
  score?: number;
  sliderValue?: number;
  optionId?: string;
};

// Replace this with your verified sender email address
const SENDER_EMAIL = 'ismir@antcolony.io';

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
    const { answers, score, maturityLevel } = JSON.parse(event.body);

    console.log('Received request:', { score, maturityLevel });

    if (!Array.isArray(answers) || typeof score !== 'number' || !maturityLevel) {
      console.error('Missing or invalid required fields:', { answers, score, maturityLevel });
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Missing or invalid required fields',
          received: { answers, score, maturityLevel }
        })
      };
    }

    // Find the email answer
    const emailAnswer = answers.find((answer: Answer) => answer.questionId === 'company-email');
    if (!emailAnswer?.textValue) {
      console.error('No email found in answers');
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'No email found in answers' })
      };
    }

    // Transform answers array into a record
    const answersRecord = answers.reduce((acc: Record<string, string>, answer: Answer) => {
      let value = '';
      if (answer.textValue) {
        value = answer.textValue;
      } else if (answer.optionId) {
        value = answer.optionId;
      } else if (answer.sliderValue !== undefined) {
        value = answer.sliderValue.toString();
      } else if (answer.score !== undefined) {
        value = answer.score.toString();
      }
      acc[answer.questionId] = value;
      return acc;
    }, {});

    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      console.error('SENDGRID_API_KEY is not configured');
      throw new Error('SENDGRID_API_KEY is not configured');
    }

    // Validate API key format
    if (!apiKey.startsWith('SG.')) {
      console.error('Invalid SendGrid API key format');
      throw new Error('Invalid SendGrid API key format');
    }

    sgMail.setApiKey(apiKey);

    const html = generateEmailTemplate(answersRecord, score, maturityLevel);

    const msg = {
      to: emailAnswer.textValue,
      from: SENDER_EMAIL,
      subject: 'Your AI Readiness Assessment Results',
      html,
    };

    console.log('Sending email to:', emailAnswer.textValue);
    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
    } catch (sendError: any) {
      console.error('SendGrid error:', sendError);
      if (sendError.response) {
        console.error('SendGrid response:', sendError.response.body);
      }
      throw new Error(`SendGrid error: ${sendError.message}`);
    }

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