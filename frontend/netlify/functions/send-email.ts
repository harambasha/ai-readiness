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
    const { to, subject, text, html } = JSON.parse(event.body || '{}');

    if (!to || !subject || (!text && !html)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Convert to array if it's a single email
    const recipients = Array.isArray(to) ? to : [to];

    // Send to each recipient individually
    const sendPromises = recipients.map(recipient => {
      const msg = {
        to: recipient,
        from: 'noreply@yourdomain.com', // Replace with your verified sender
        subject,
        text,
        html,
      };
      return sgMail.send(msg);
    });

    await Promise.all(sendPromises);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Emails sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};

export { handler }; 