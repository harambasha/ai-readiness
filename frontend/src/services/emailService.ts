import { Answer } from '../types';
import { questions } from '../data/questions';

interface EmailData {
  to: string;
  answers: Answer[];
  score: number;
  maturityLevel: string;
}

export async function sendEmail(to: string, subject: string, text: string, html: string) {
  try {
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, subject, text, html }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendAssessmentResults(email: string, answers: any[], score: number, maturityLevel: string) {
  try {
    const response = await fetch('/.netlify/functions/send-assessment-results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, answers, score, maturityLevel }),
    });

    if (!response.ok) {
      throw new Error('Failed to send assessment results');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending assessment results:', error);
    throw error;
  }
}

function getQuestionText(questionId: string): string {
  const question = questions.find(q => q.id === questionId);
  return question?.text || questionId;
}

function getOptionText(questionId: string, optionId: string): string {
  const question = questions.find(q => q.id === questionId);
  const option = question?.options?.find(o => o.id === optionId);
  return option?.text || optionId;
}

function generateEmailHtml(data: EmailData): string {
  return `
    <html>
      <body>
        <h1>Your AI Readiness Assessment Results</h1>
        <p>Thank you for completing the AI Readiness Assessment.</p>
        <h2>Your Score: ${data.score}</h2>
        <p>Maturity Level: ${data.maturityLevel}</p>
        <h3>Your Answers:</h3>
        <ul>
          ${data.answers.map(answer => `
            <li>
              <strong>Question:</strong> ${getQuestionText(answer.questionId)}<br>
              ${answer.optionId ? `<strong>Selected Option:</strong> ${getOptionText(answer.questionId, answer.optionId)}<br>` : ''}
              ${answer.score ? `<strong>Score:</strong> ${answer.score}<br>` : ''}
              ${answer.sliderValue ? `<strong>Slider Value:</strong> ${answer.sliderValue}%<br>` : ''}
              ${answer.textValue ? `<strong>Text Response:</strong> ${answer.textValue}<br>` : ''}
            </li>
          `).join('')}
        </ul>
      </body>
    </html>
  `;
}

function generateEmailText(data: EmailData): string {
  return `
    Your AI Readiness Assessment Results

    Thank you for completing the AI Readiness Assessment.

    Your Score: ${data.score}
    Maturity Level: ${data.maturityLevel}

    Your Answers:
    ${data.answers.map(answer => `
      Question: ${getQuestionText(answer.questionId)}
      ${answer.optionId ? `Selected Option: ${getOptionText(answer.questionId, answer.optionId)}` : ''}
      ${answer.score ? `Score: ${answer.score}` : ''}
      ${answer.sliderValue ? `Slider Value: ${answer.sliderValue}%` : ''}
      ${answer.textValue ? `Text Response: ${answer.textValue}` : ''}
    `).join('\n')}
  `;
} 