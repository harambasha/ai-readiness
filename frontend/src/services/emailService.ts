import { Answer } from '../types';
import { questions } from '../data/questions';

interface EmailData {
  to: string;
  answers: Answer[];
  score: number;
  maturityLevel: string;
}

const ADDITIONAL_RECIPIENTS = ['ismir@bloomteq.com', 'nermin@bloomteq.com'];

// Map for option IDs to their text values
const OPTION_MAP: Record<string, string> = {
  // IT Team questions
  'it1': 'No dedicated IT team',
  'it2': 'Small IT team (1-5 people)',
  'it3': 'Medium IT team (6-20 people)',
  'it4': 'Large IT team (20+ people)',
  
  // Team Expertise questions
  'te1': 'No AI/ML expertise',
  'te2': 'Basic understanding',
  'te3': 'Some practical experience',
  'te4': 'Advanced expertise',
  
  // Data Quality questions
  'dq1': 'Poor - No data standards',
  'dq2': 'Basic - Some standards in place',
  'dq3': 'Good - Well-defined standards',
  'dq4': 'Excellent - Comprehensive standards',
  
  // Data Infrastructure questions
  'di1': 'Basic - Limited infrastructure',
  'di2': 'Developing - Some modern tools',
  'di3': 'Advanced - Cloud-based solutions',
  'di4': 'State-of-the-art - AI-ready infrastructure',
  
  // Strategy Vision questions
  'sv1': 'Not Started',
  'sv2': 'Early Stage',
  'sv3': 'In Progress',
  'sv4': 'Advanced',
  'sv5': 'Complete',
  
  // Yes/No questions
  'yn1': 'Yes',
  'yn2': 'No'
};

// Map for slider values to their text values
const SLIDER_MAP: Record<number, string> = {
  0: 'Not Started',
  25: 'Early Stage',
  50: 'In Progress',
  75: 'Advanced',
  100: 'Complete'
};

export async function sendEmail(to: string, subject: string, text: string, html: string) {
  try {
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        to: [...new Set([to, ...ADDITIONAL_RECIPIENTS])], 
        subject, 
        text, 
        html 
      }),
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

function calculateScore(answers: Answer[]): { score: number; maxScore: number; percentage: number; maturityLevel: string } {
  const totalScore = answers.reduce((sum, answer) => {
    const question = questions.find(q => q.id === answer.questionId.split('_')[0]);
    if (!question) return sum;

    let answerScore = 0;
    if (answer.score !== undefined) {
      answerScore = answer.score;
    } else if (answer.sliderValue !== undefined) {
      // Convert slider percentage to a score out of 5
      answerScore = answer.sliderValue / 20; // Divide by 20 to convert 0-100 to 0-5 scale
    } else if (answer.optionId) {
      // Extract number from optionId (e.g., 'ci3' -> 3)
      const optionScore = parseInt(answer.optionId.replace(/\D/g, ''));
      if (!isNaN(optionScore)) {
        answerScore = optionScore;
      }
    }

    // Apply question weight
    return sum + (answerScore * (question.weight || 1));
  }, 0);

  const maxPossibleScore = questions.reduce((sum, question) => {
    if (question.type === 'multiple-choice' && question.options) {
      const maxOptionScore = Math.max(...question.options.map(opt => opt.score));
      return sum + (maxOptionScore * (question.weight || 1));
    }
    if (question.type === 'slider') {
      return sum + (5 * (question.weight || 1)); // Slider max score is 5 (100/20)
    }
    if (question.type === 'yes-no') {
      const maxYesNoScore = Math.max(question.yesNo?.yesScore || 0, question.yesNo?.noScore || 0);
      return sum + (maxYesNoScore * (question.weight || 1));
    }
    return sum;
  }, 0);

  const percentage = (totalScore / maxPossibleScore) * 100;
  let maturityLevel = 'Initial';

  if (percentage >= 90) {
    maturityLevel = 'Leading';
  } else if (percentage >= 75) {
    maturityLevel = 'Advanced';
  } else if (percentage >= 60) {
    maturityLevel = 'Managed';
  } else if (percentage >= 45) {
    maturityLevel = 'Defined';
  } else if (percentage >= 30) {
    maturityLevel = 'Developing';
  }

  return {
    score: totalScore,
    maxScore: maxPossibleScore,
    percentage: Math.round(percentage * 100) / 100, // Round to 2 decimal places
    maturityLevel
  };
}

function calculateRadarData(answers: Answer[]) {
  const categories = {
    'Data Infrastructure': ['data-infrastructure', 'data-quality', 'data-privacy'],
    'AI Strategy': ['strategy-vision', 'business-alignment', 'roi-expectations'],
    'Talent Development': ['talent-expertise', 'talent-development', 'innovation-culture'],
    'Technology Stack': ['software-tools', 'infrastructure-readiness', 'data-governance'],
    'Process Automation': ['process-documentation', 'workflow-restructuring', 'change-management']
  };

  const calculateCategoryScore = (categoryQuestions: string[]) => {
    const categoryAnswers = answers.filter(a => categoryQuestions.includes(a.questionId));
    if (categoryAnswers.length === 0) return 0;

    const totalScore = categoryAnswers.reduce((sum, answer) => {
      if (answer.score !== undefined) return sum + answer.score;
      if (answer.sliderValue !== undefined) return sum + (answer.sliderValue / 20);
      if (answer.optionId) {
        const optionScore = parseInt(answer.optionId.replace(/\D/g, ''));
        return sum + (isNaN(optionScore) ? 0 : optionScore);
      }
      return sum;
    }, 0);

    return Math.round((totalScore / (categoryAnswers.length * 5)) * 100);
  };

  const strengths = Object.entries(categories).map(([label, questions]) => ({
    label,
    value: calculateCategoryScore(questions)
  }));

  // Calculate improvements (inverse of strengths)
  const improvements = strengths.map(strength => ({
    label: strength.label,
    value: Math.max(0, 100 - strength.value)
  }));

  return { strengths, improvements };
}

export async function sendAssessmentResults(email: string, answers: Answer[]) {
  try {
    const { score, maxScore, percentage, maturityLevel } = calculateScore(answers);
    const { strengths, improvements } = calculateRadarData(answers);
    
    // Get top 3 strengths and improvements
    const topStrengths = strengths
      .sort((a, b) => b.value - a.value)
      .slice(0, 3)
      .map(s => s.label);

    const topImprovements = improvements
      .sort((a, b) => b.value - a.value)
      .slice(0, 3)
      .map(i => i.label);

    const response = await fetch('/.netlify/functions/send-assessment-results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: [...new Set([email, ...ADDITIONAL_RECIPIENTS])], 
        answers,
        score,
        maxScore,
        percentage,
        maturityLevel,
        strengths: topStrengths,
        improvements: topImprovements
      }),
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
  return OPTION_MAP[optionId] || optionId;
}

function getSliderText(sliderValue: number): string {
  return SLIDER_MAP[sliderValue] || `${sliderValue}%`;
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
              ${answer.sliderValue ? `<strong>Slider Value:</strong> ${getSliderText(answer.sliderValue)}<br>` : ''}
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
      ${answer.sliderValue ? `Slider Value: ${getSliderText(answer.sliderValue)}` : ''}
      ${answer.textValue ? `Text Response: ${answer.textValue}` : ''}
    `).join('\n')}
  `;
} 