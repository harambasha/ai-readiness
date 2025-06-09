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
const SENDER_EMAIL = 'info@bloomteq.com';

function calculateScore(answers: Answer[]): number {
  let totalScore = 0;
  let totalQuestions = 0;

  answers.forEach(answer => {
    // Skip non-scoring questions
    if (answer.questionId === 'company-email' || 
        answer.questionId === 'company-challenges' ||
        answer.questionId === 'business-goals' ||
        answer.questionId === 'business-metrics' ||
        answer.questionId === 'time-consuming-processes' ||
        answer.questionId === 'software-list' ||
        answer.questionId === 'business-objectives' ||
        answer.questionId === 'industry-challenges' ||
        answer.questionId === 'competitor-analysis' ||
        answer.questionId === 'regulatory-compliance') {
      return;
    }

    let score = 0;
    if (answer.score !== undefined) {
      score = answer.score;
    } else if (answer.sliderValue !== undefined) {
      score = answer.sliderValue / 25; // Convert percentage to 1-5 scale
    } else if (answer.optionId) {
      // Extract number from optionId (e.g., 'ci3' -> 3)
      const optionScore = parseInt(answer.optionId.replace(/\D/g, ''));
      if (!isNaN(optionScore)) {
        score = optionScore;
      }
    }

    if (score > 0) {
      totalScore += score;
      totalQuestions++;
    }
  });

  // Calculate average score and convert to percentage
  const averageScore = totalQuestions > 0 ? (totalScore / totalQuestions) * 20 : 0; // Multiply by 20 to convert 1-5 scale to percentage
  return Math.round(averageScore * 100) / 100; // Round to 2 decimal places
}

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
    const { answers, maturityLevel } = JSON.parse(event.body);

    console.log('Received request:', { maturityLevel });

    if (!Array.isArray(answers) || !maturityLevel) {
      console.error('Missing or invalid required fields:', { answers, maturityLevel });
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Missing or invalid required fields',
          received: { answers, maturityLevel }
        })
      };
    }

    // Calculate score
    const score = calculateScore(answers);
    console.log('Calculated score:', score);

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