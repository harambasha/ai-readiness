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

  const optionMappings: Record<string, Record<string, string>> = {
    'customer-impact': {
      'ci1': 'No direct impact on customer experience',
      'ci2': 'Some impact on customer experience',
      'ci3': 'Significant impact on customer experience'
    },
    'partnership-strategy': {
      'ps1': 'No formal partnership strategy',
      'ps2': 'Basic partnership strategy',
      'ps3': 'Comprehensive partnership strategy'
    },
    'software-tools': {
      'st1': 'Basic tools',
      'st2': 'Advanced tools',
      'st3': 'Enterprise-grade tools'
    },
    'dedicated-it-team': {
      'it1': 'No dedicated IT team',
      'it2': 'Small IT team',
      'it3': 'Large IT team'
    },
    'strategy-vision': {
      'sv1': 'No clear strategy',
      'sv2': 'Basic strategy',
      'sv3': 'Comprehensive strategy'
    },
    'talent-expertise': {
      'te1': 'Limited expertise',
      'te2': 'Moderate expertise',
      'te3': 'Extensive expertise'
    },
    'data-quality': {
      'dq1': 'Poor data quality',
      'dq2': 'Moderate data quality',
      'dq3': 'High data quality'
    },
    'ai-ethics': {
      'ae1': 'No ethical guidelines',
      'ae2': 'Basic ethical guidelines',
      'ae3': 'Comprehensive ethical guidelines'
    },
    'change-management': {
      'cm1': 'No change management',
      'cm2': 'Basic change management',
      'cm3': 'Comprehensive change management'
    },
    'data-infrastructure': {
      'di1': 'Basic infrastructure',
      'di2': 'Moderate infrastructure',
      'di3': 'Advanced infrastructure'
    },
    'risk-management': {
      'rm1': 'No risk management',
      'rm2': 'Basic risk management',
      'rm3': 'Comprehensive risk management'
    },
    'data-governance': {
      'dg1': 'No data governance',
      'dg2': 'Basic data governance',
      'dg3': 'Comprehensive data governance'
    },
    'roi-expectations': {
      'roi1': 'No clear ROI expectations',
      'roi2': 'Basic ROI expectations',
      'roi3': 'Detailed ROI expectations'
    }
  };

  const maturityLevelDescription = maturityLevels[maturityLevel as keyof typeof maturityLevels] || maturityLevel;
  const roundedScore = Math.round(score * 100) / 100;

  // Get Calendly URL from environment variable
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/bloomteq/ai-readiness-consultation';

  function formatAnswer(key: string, value: string): string {
    // Check if this is an option-based answer
    for (const [category, options] of Object.entries(optionMappings)) {
      if (key.includes(category) && options[value]) {
        return options[value];
      }
    }

    // For slider values, convert to percentage
    if (key.includes('slider') || key.includes('score')) {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        return `${numValue}%`;
      }
    }

    // For text values, return as is
    return value;
  }

  function formatQuestion(key: string): string {
    return key
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/([A-Z])/g, ' $1')
      .trim();
  }

  // Analyze answers to determine key strengths and areas for improvement
  function analyzeAnswers(): { strengths: string[], improvements: string[] } {
    const strengths: string[] = [];
    const improvements: string[] = [];

    // Define thresholds for strengths and improvements
    const strengthThreshold = 75; // 75% or higher is a strength
    const improvementThreshold = 50; // Below 50% needs improvement

    Object.entries(answers).forEach(([key, value]) => {
      if (key.includes('slider') || key.includes('score')) {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          if (numValue >= strengthThreshold) {
            strengths.push(formatQuestion(key));
          } else if (numValue <= improvementThreshold) {
            improvements.push(formatQuestion(key));
          }
        }
      }
    });

    return { strengths, improvements };
  }

  const { strengths, improvements } = analyzeAnswers();

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
            background-color: #f9fafb;
          }
          .container {
            background-color: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .logo {
            max-width: 200px;
            margin-bottom: 20px;
          }
          .score {
            font-size: 32px;
            font-weight: bold;
            color: #2563eb;
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background-color: #f3f4f6;
            border-radius: 8px;
          }
          .maturity-level {
            background-color: #f3f4f6;
            padding: 25px;
            border-radius: 8px;
            margin: 30px 0;
            text-align: center;
          }
          .maturity-level h2 {
            color: #1f2937;
            margin-bottom: 10px;
          }
          .answers {
            margin-top: 40px;
          }
          .answer-item {
            margin-bottom: 25px;
            padding-bottom: 25px;
            border-bottom: 1px solid #e5e7eb;
          }
          .answer-item:last-child {
            border-bottom: none;
          }
          .question {
            font-weight: bold;
            margin-bottom: 10px;
            color: #1f2937;
          }
          .answer {
            color: #4b5563;
            padding-left: 20px;
          }
          .analysis-section {
            margin: 40px 0;
            padding: 25px;
            background-color: #f3f4f6;
            border-radius: 8px;
          }
          .analysis-section h2 {
            color: #1f2937;
            margin-bottom: 20px;
          }
          .analysis-list {
            list-style-type: none;
            padding: 0;
          }
          .analysis-list li {
            margin-bottom: 10px;
            padding-left: 20px;
            position: relative;
          }
          .analysis-list li:before {
            content: "•";
            position: absolute;
            left: 0;
            color: #2563eb;
          }
          .cta-section {
            text-align: center;
            margin: 40px 0;
            padding: 30px;
            background-color: #2563eb;
            color: white;
            border-radius: 8px;
          }
          .cta-section h2 {
            margin-bottom: 15px;
          }
          .cta-button {
            display: inline-block;
            padding: 12px 24px;
            background-color: white;
            color: #2563eb;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://bloomteq.com/wp-content/uploads/2024/03/bloomteq-logo.png" alt="Bloomteq Logo" class="logo">
            <h1>AI Readiness Assessment Results</h1>
          </div>
          
          <div class="score">
            Your AI Readiness Score: ${roundedScore}%
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
                  <div class="question">${formatQuestion(key)}</div>
                  <div class="answer">${formatAnswer(key, value)}</div>
                </div>
              `)
              .join('')}
          </div>

          <div class="analysis-section">
            <h2>Key Strengths</h2>
            <ul class="analysis-list">
              ${strengths.map(strength => `<li>${strength}</li>`).join('')}
            </ul>
          </div>

          <div class="analysis-section">
            <h2>Areas for Improvement</h2>
            <ul class="analysis-list">
              ${improvements.map(improvement => `<li>${improvement}</li>`).join('')}
            </ul>
          </div>

          <div class="cta-section">
            <h2>Ready to Accelerate Your AI Journey?</h2>
            <p>Our team of AI experts at Bloomteq can help you develop a comprehensive strategy and implementation plan tailored to your organization's needs.</p>
            <a href="${calendlyUrl}" class="cta-button">Schedule a Consultation</a>
          </div>

          <div class="footer">
            <p>© ${new Date().getFullYear()} Bloomteq. All rights reserved.</p>
            <p>This assessment was generated based on your responses to our AI Readiness Assessment.</p>
          </div>
        </div>
      </body>
    </html>
  `;
} 