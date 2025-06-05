import { Answer } from '../types';

interface EmailData {
  to: string;
  answers: Answer[];
  score: number;
  maturityLevel: string;
}

export async function sendAssessmentResults(data: EmailData): Promise<void> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: data.to,
        subject: 'Your AI Readiness Assessment Results',
        html: generateEmailHtml(data),
        text: generateEmailText(data),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending assessment results:', error);
    throw error;
  }
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
              <strong>Question ID:</strong> ${answer.questionId}<br>
              ${answer.optionId ? `<strong>Selected Option:</strong> ${answer.optionId}<br>` : ''}
              ${answer.score ? `<strong>Score:</strong> ${answer.score}<br>` : ''}
              ${answer.sliderValue ? `<strong>Slider Value:</strong> ${answer.sliderValue}<br>` : ''}
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
      Question ID: ${answer.questionId}
      ${answer.optionId ? `Selected Option: ${answer.optionId}` : ''}
      ${answer.score ? `Score: ${answer.score}` : ''}
      ${answer.sliderValue ? `Slider Value: ${answer.sliderValue}` : ''}
      ${answer.textValue ? `Text Response: ${answer.textValue}` : ''}
    `).join('\n')}
  `;
} 