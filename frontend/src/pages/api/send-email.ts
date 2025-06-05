import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { createServerlessHandler } from '../../lib/serverless';

const resend = new Resend(process.env.RESEND_API_KEY);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const data = await resend.emails.send({
      from: 'AI Readiness Assessment <assessment@bloomteq.com>',
      to,
      subject,
      html,
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
}

export default createServerlessHandler(handler); 