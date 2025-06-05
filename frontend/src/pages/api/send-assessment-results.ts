import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { renderToString } from 'react-dom/server';
import { EmailTemplate } from '../../components/EmailTemplate';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { to, answers, score, maturityLevel } = req.body;

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Render email template to HTML
    const emailHtml = renderToString(
      <EmailTemplate
        answers={answers}
        score={score}
        maturityLevel={maturityLevel}
      />
    );

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject: 'Your AI Readiness Assessment Results',
      html: emailHtml,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
} 