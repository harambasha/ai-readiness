import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { createServerlessHandler } from '../../lib/serverless';

// Initialize SendGrid
const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  console.error('SENDGRID_API_KEY is not set in environment variables');
} else if (!apiKey.startsWith('SG.')) {
  console.error('Invalid SendGrid API key format. API key should start with "SG."');
}
sgMail.setApiKey(apiKey || '');

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { to, subject, html } = req.body;

    if (!to || !subject || !html) {
      console.error('Missing required fields:', { to, subject, html });
      return res.status(400).json({ 
        message: 'Missing required fields',
        details: { to, subject, html }
      });
    }

    if (!apiKey) {
      console.error('SendGrid API key is not configured');
      return res.status(500).json({ 
        message: 'Email service is not properly configured',
        error: 'Missing API key'
      });
    }

    if (!apiKey.startsWith('SG.')) {
      console.error('Invalid SendGrid API key format');
      return res.status(500).json({ 
        message: 'Email service is not properly configured',
        error: 'Invalid API key format. API key should start with "SG."'
      });
    }

    const msg = {
      to,
      from: 'info@bloomteq.com',
      subject,
      html,
    };

    console.log('Attempting to send email to:', to);
    console.log('Using API key starting with:', apiKey.substring(0, 5) + '...');
    
    await sgMail.send(msg);
    console.log('Email sent successfully to:', to);

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error('SendGrid API error details:', error.response.body);
    }
    
    // Handle specific SendGrid API errors
    if (error.response?.body?.errors?.[0]?.message?.includes('authorization grant')) {
      return res.status(401).json({ 
        message: 'Failed to send email',
        error: 'Invalid or expired API key',
        details: error.response.body
      });
    }
    
    return res.status(500).json({ 
      message: 'Failed to send email',
      error: error.message,
      details: error.response?.body || 'No additional details available'
    });
  }
}

export default createServerlessHandler(handler); 