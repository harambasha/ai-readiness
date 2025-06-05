import { Answer, Question } from '../types';
import { questions } from '../data/questions';
import { CALENDLY_URL } from '../config/constants';

interface EmailParams {
  to: string;
  answers: Answer[];
  score: number;
  maturityLevel: string;
}

export async function sendAssessmentResults({ to, answers, score, maturityLevel }: EmailParams) {
  // Group answers by category
  const categories = {
    'Strategic Vision': answers.filter(a => {
      const question = questions.find(q => q.id === a.questionId);
      return question?.category === 'strategy';
    }),
    'Data Readiness': answers.filter(a => {
      const question = questions.find(q => q.id === a.questionId);
      return question?.category === 'data';
    }),
    'Governance & Ethics': answers.filter(a => {
      const question = questions.find(q => q.id === a.questionId);
      return question?.category === 'governance';
    }),
    'Team Capability': answers.filter(a => {
      const question = questions.find(q => q.id === a.questionId);
      return question?.category === 'talent';
    })
  };

  // Create HTML content for each category
  const categorySections = Object.entries(categories).map(([category, categoryAnswers]) => {
    const answersHtml = categoryAnswers.map(answer => {
      let answerText = '';
      if (answer.textValue) {
        answerText = answer.textValue;
      } else if (answer.optionId) {
        const question = questions.find((q: Question) => q.id === answer.questionId);
        const option = question?.options?.find((o: { id: string; text: string }) => o.id === answer.optionId);
        answerText = option?.text || '';
      } else if (answer.sliderValue !== undefined) {
        answerText = `${answer.sliderValue}%`;
      }
      const question = questions.find((q: Question) => q.id === answer.questionId);
      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">
            <strong>${question?.text}</strong>
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">
            ${answerText}
          </td>
        </tr>
      `;
    }).join('');

    // Only show category if it has answers
    if (categoryAnswers.length === 0) return '';

    return `
      <div style="margin-bottom: 30px;">
        <h3 style="color: #677076; font-size: 18px; margin-bottom: 15px;">${category}</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #677076;">Question</th>
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #677076;">Your Answer</th>
            </tr>
          </thead>
          <tbody>
            ${answersHtml}
          </tbody>
        </table>
      </div>
    `;
  }).join('');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #677076; text-align: center; margin-bottom: 30px;">Your AI Readiness Assessment Results</h1>
      
      <div style="background-color: #f7f6f4; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h2 style="color: #677076; margin-bottom: 15px;">Overall Assessment</h2>
        <p style="margin-bottom: 10px;"><strong>Score:</strong> ${Math.round(score)}%</p>
        <p style="margin-bottom: 10px;"><strong>Maturity Level:</strong> ${maturityLevel}</p>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="color: #677076; margin-bottom: 20px;">Detailed Results</h2>
        ${categorySections}
      </div>

      <div style="background-color: #f7f6f4; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h2 style="color: #677076; margin-bottom: 15px;">Next Steps</h2>
        <ul style="list-style-type: none; padding: 0;">
          <li style="margin-bottom: 10px;">✓ Create an action plan based on your assessment results</li>
          <li style="margin-bottom: 10px;">✓ Share findings with key stakeholders</li>
          <li style="margin-bottom: 10px;">✓ Schedule a follow-up assessment in 6 months</li>
        </ul>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <p style="color: #677076; margin-bottom: 20px;">Ready to accelerate your AI journey?</p>
        <a href="${CALENDLY_URL}" 
           style="background-color: #677076; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;"
           target="_blank"
           rel="noopener noreferrer">
          Schedule a Consultation
        </a>
      </div>
    </div>
  `;

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject: 'Your AI Readiness Assessment Results',
        html,
      }),
    });

    if (!response.ok) {
      const responseText = await response.text();
      let errorDetails;
      try {
        errorDetails = JSON.parse(responseText);
      } catch (e) {
        console.error('Error parsing error response:', e);
      }
      throw new Error(errorDetails?.message || 'Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending assessment results:', error);
    throw error;
  }
} 