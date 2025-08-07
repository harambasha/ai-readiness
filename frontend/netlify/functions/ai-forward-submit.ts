import { Handler } from '@netlify/functions';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  throw new Error('SENDGRID_API_KEY is not set');
}
sgMail.setApiKey(apiKey);

interface AIForwardSubmission {
  answers: Record<string, any>;
  timestamp: string;
  project: string;
}

const generateConfirmationEmail = (answers: Record<string, any>) => {
  const companyName = answers['company-name'] || 'N/A';
  const contactPerson = answers['contact-person'] || 'N/A';
  const email = answers['email'] || 'N/A';

  return {
    to: email,
    from: process.env.FROM_EMAIL!,
    subject: 'Potvrda prijema vaših odgovora – AI FORWARD upitnik',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI FORWARD - Potvrda prijema</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
          .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">AI FORWARD</div>
            <p>Inovacioni centar Banja Luka & Bloomteq</p>
          </div>
          
          <div class="content">
            <h2>Poštovani/a ${contactPerson},</h2>
            
            <p>Hvala Vam što ste ispunili AI FORWARD upitnik za preduzeće <strong>${companyName}</strong>.</p>
            
            <p>Vaši odgovori će nam pomoći da bolje razumijemo potrebe malih i srednjih preduzeća u Bosni i Hercegovini i pružimo ciljanu podršku u oblasti vještačke inteligencije i digitalne transformacije.</p>
            
            <p><strong>Bićete blagovremeno obaviješteni o narednim koracima i mogućnostima koje nudimo kroz AI FORWARD projekat.</strong></p>
            
            <div class="signature">
              <p>Srdačno,<br>
              <strong>AI FORWARD tim</strong><br>
              Inovacioni centar Banja Luka & Bloomteq Sarajevo</p>
            </div>
          </div>
          
          <div class="footer">
            <p>Ova poruka je automatski generisana. Molimo ne odgovarajte na nju.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

const generateAdminNotification = (answers: Record<string, any>) => {
  const companyName = answers['company-name'] || 'N/A';
  const contactPerson = answers['contact-person'] || 'N/A';
  const email = answers['email'] || 'N/A';
  const phone = answers['phone'] || 'N/A';
  const companySize = answers['company-size'] || 'N/A';
  const euExport = answers['eu-export'] || 'N/A';
  const womenLed = answers['women-led'] || 'N/A';
  const aiUsage = answers['ai-usage'] || 'N/A';

  const formatAnswers = (answers: Record<string, any>) => {
    return Object.entries(answers)
      .map(([key, value]) => {
        const question = getQuestionText(key);
        const answer = Array.isArray(value) ? value.join(', ') : value;
        return `<tr><td><strong>${question}</strong></td><td>${answer}</td></tr>`;
      })
      .join('');
  };

  return {
    to: process.env.ADMIN_EMAIL!,
    from: process.env.FROM_EMAIL!,
    subject: 'Novi odgovor – AI FORWARD upitnik',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Novi AI FORWARD odgovor</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
          .summary { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #2563eb; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f8f9fa; font-weight: bold; }
          .highlight { background-color: #fef3c7; padding: 2px 4px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Novi AI FORWARD odgovor</h1>
            <p>Novi ispitanik je popunio AI FORWARD upitnik</p>
          </div>
          
          <div class="content">
            <div class="summary">
              <h3>Sažetak:</h3>
              <p><strong>Preduzeće:</strong> ${companyName}</p>
              <p><strong>Kontakt osoba:</strong> ${contactPerson}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Telefon:</strong> ${phone}</p>
              <p><strong>Veličina preduzeća:</strong> ${companySize}</p>
              <p><strong>EU izvoz:</strong> <span class="highlight">${euExport}</span></p>
              <p><strong>Vođeno od strane žene:</strong> <span class="highlight">${womenLed}</span></p>
              <p><strong>Koristi AI:</strong> ${aiUsage}</p>
            </div>
            
            <h3>Detaljni odgovori:</h3>
            <table>
              <thead>
                <tr>
                  <th>Pitanje</th>
                  <th>Odgovor</th>
                </tr>
              </thead>
              <tbody>
                ${formatAnswers(answers)}
              </tbody>
            </table>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

const getQuestionText = (questionId: string): string => {
  const questionMap: Record<string, string> = {
    'company-name': 'Naziv preduzeća',
    'contact-person': 'Ime i prezime kontakt osobe',
    'email': 'Email adresa',
    'phone': 'Broj telefona',
    'company-size': 'Broj zaposlenih',
    'eu-export': 'Da li vaše preduzeće izvozi proizvode ili usluge u EU?',
    'export-markets': 'U koje EU zemlje izvozite?',
    'women-led': 'Da li je vaše preduzeće vođeno od strane žene?',
    'ai-usage': 'Da li vaše preduzeće trenutno koristi neke oblike vještačke inteligencije?',
    'ai-applications': 'Koje AI aplikacije koristite?',
    'ai-benefits': 'Koje koristi ste primijetili od korištenja AI?',
    'ai-training-need': 'Koliko vam je potrebna obuka o vještačkoj inteligenciji?',
    'training-areas': 'U kojim oblastima vam je potrebna obuka?',
    'current-ai-knowledge': 'Kako ocijenjujete trenutno znanje vašeg tima o AI?',
    'ai-barriers': 'Koje su glavne prepreke za implementaciju AI u vašem preduzeću?',
    'investment-readiness': 'Koliko ste spremni da investirate u AI rješenja?',
    'esg-awareness': 'Koliko ste upoznati sa EU ESG zahtjevima?',
    'esg-compliance': 'Koje ESG prakse već implementirate?',
    'ai-future-plans': 'Koje AI inicijative planirate u narednih 12 mjeseci?',
    'ai-forward-expectations': 'Šta očekujete od AI FORWARD projekta?',
    'additional-feedback': 'Dodatni komentari ili sugestije'
  };

  return questionMap[questionId] || questionId;
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Debug environment variables
    console.log('Environment variables:', {
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY ? 'SET' : 'NOT SET',
      FROM_EMAIL: process.env.FROM_EMAIL,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL
    });

    // Check if SendGrid API key is available
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY is not set');
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({ 
          error: 'SendGrid API key not configured' 
        })
      };
    }

    const submission: AIForwardSubmission = JSON.parse(event.body || '{}');
    
    if (!submission.answers || !submission.answers['email']) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Send confirmation email to respondent
    const confirmationEmail = generateConfirmationEmail(submission.answers);
    await sgMail.send(confirmationEmail);

    // Send notification email to admin
    const adminEmail = generateAdminNotification(submission.answers);
    await sgMail.send(adminEmail);

    // Here you could also save to a database or other storage
    // For now, we'll just log the submission
    console.log('AI FORWARD submission received:', {
      timestamp: submission.timestamp,
      company: submission.answers['company-name'],
      email: submission.answers['email']
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Odgovori uspješno poslani' 
      })
    };

  } catch (error) {
    console.error('Error processing AI FORWARD submission:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        error: 'Greška prilikom slanja podataka' 
      })
    };
  }
}; 