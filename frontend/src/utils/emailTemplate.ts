export function generateEmailTemplate(
  answers: Record<string, string>,
  score: number,
  maturityLevel: string
): string {
  const maturityLevels = {
    'Level 1': 'Initial',
    'Level 2': 'Managed',
    'Level 3': 'Defined',
    'Level 4': 'Quantitatively Managed',
    'Level 5': 'Optimizing'
  };

  const maturityLevelDescription = maturityLevels[maturityLevel as keyof typeof maturityLevels] || maturityLevel;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>AI Readiness Assessment Results</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .score {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
            text-align: center;
            margin: 20px 0;
          }
          .maturity-level {
            background-color: #f3f4f6;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .answers {
            margin-top: 30px;
          }
          .answer-item {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e5e7eb;
          }
          .question {
            font-weight: bold;
            margin-bottom: 10px;
          }
          .answer {
            color: #4b5563;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>AI Readiness Assessment Results</h1>
        </div>
        
        <div class="score">
          Your AI Readiness Score: ${score}%
        </div>
        
        <div class="maturity-level">
          <h2>Maturity Level: ${maturityLevelDescription}</h2>
          <p>This indicates your organization's current stage in AI adoption and readiness.</p>
        </div>
        
        <div class="answers">
          <h2>Your Responses</h2>
          ${Object.entries(answers)
            .filter(([key]) => key !== 'company-email')
            .map(([key, value]) => `
              <div class="answer-item">
                <div class="question">${key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                <div class="answer">${value}</div>
              </div>
            `)
            .join('')}
        </div>
      </body>
    </html>
  `;
} 