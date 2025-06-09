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
      'ci3': 'Significant impact on customer experience',
      'ci4': 'High impact on customer experience',
      'ci5': 'Transformative impact on customer experience'
    },
    'partnership-strategy': {
      'ps1': 'No formal partnership strategy',
      'ps2': 'Basic partnership strategy',
      'ps3': 'Comprehensive partnership strategy',
      'ps4': 'Advanced partnership strategy',
      'ps5': 'Strategic partnership ecosystem'
    },
    'software-tools': {
      'st1': 'Basic tools',
      'st2': 'Advanced tools',
      'st3': 'Enterprise-grade tools',
      'st4': 'Cutting-edge tools',
      'st5': 'Industry-leading tools'
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
      'te3': 'Extensive expertise',
      'te4': 'Advanced expertise',
      'te5': 'Industry-leading expertise'
    },
    'data-quality': {
      'dq1': 'Poor data quality',
      'dq2': 'Moderate data quality',
      'dq3': 'High data quality',
      'dq4': 'Excellent data quality',
      'dq5': 'Industry-leading data quality'
    },
    'ai-ethics': {
      'ae1': 'No ethical guidelines',
      'ae2': 'Basic ethical guidelines',
      'ae3': 'Comprehensive ethical guidelines',
      'ae4': 'Advanced ethical framework',
      'ae5': 'Industry-leading ethical standards'
    },
    'change-management': {
      'cm1': 'No change management',
      'cm2': 'Basic change management',
      'cm3': 'Comprehensive change management',
      'cm4': 'Advanced change management',
      'cm5': 'Transformative change leadership'
    },
    'data-infrastructure': {
      'di1': 'Basic infrastructure',
      'di2': 'Moderate infrastructure',
      'di3': 'Advanced infrastructure',
      'di4': 'Enterprise infrastructure',
      'di5': 'Cutting-edge infrastructure'
    },
    'risk-management': {
      'rm1': 'No risk management',
      'rm2': 'Basic risk management',
      'rm3': 'Comprehensive risk management',
      'rm4': 'Advanced risk management',
      'rm5': 'Enterprise risk framework'
    },
    'data-governance': {
      'dg1': 'No data governance',
      'dg2': 'Basic data governance',
      'dg3': 'Comprehensive data governance'
    },
    'roi-expectations': {
      'roi1': 'No clear ROI expectations',
      'roi2': 'Basic ROI expectations',
      'roi3': 'Detailed ROI expectations',
      'roi4': 'Advanced ROI metrics',
      'roi5': 'Comprehensive ROI framework'
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
    if (key.includes('slider') || 
        key.includes('score') || 
        key.includes('maturity') || 
        key.includes('readiness') || 
        key.includes('quality') || 
        key.includes('alignment') || 
        key.includes('infrastructure') || 
        key.includes('privacy') || 
        key.includes('culture') || 
        key.includes('engagement') || 
        key.includes('market')) {
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
      } else if (key.includes('optionId')) {
        // For option-based answers, check the numeric part
        const optionScore = parseInt(value.replace(/\D/g, ''));
        if (!isNaN(optionScore)) {
          if (optionScore >= 4) {
            strengths.push(formatQuestion(key));
          } else if (optionScore <= 2) {
            improvements.push(formatQuestion(key));
          }
        }
      }
    });

    // If no strengths or improvements found, add some default ones
    if (strengths.length === 0) {
      strengths.push('Data infrastructure and quality');
      strengths.push('AI strategy alignment');
      strengths.push('Talent development programs');
    }
    if (improvements.length === 0) {
      improvements.push('AI governance framework');
      improvements.push('Change management processes');
      improvements.push('Innovation culture development');
    }

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
          .score {
            font-size: 32px;
            font-weight: bold;
            color: #677076;
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background-color: #f7f6f4;
            border-radius: 8px;
          }
          .maturity-level {
            background-color: #f7f6f4;
            padding: 25px;
            border-radius: 8px;
            margin: 30px 0;
            text-align: center;
            color: #677076;
          }
          .maturity-level h2 {
            color: #677076;
            margin-bottom: 10px;
          }
          .maturity-level p {
            color: #4b5563;
            font-size: 18px;
            line-height: 1.6;
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
            color: #677076;
          }
          .answer {
            color: #4b5563;
            padding-left: 20px;
          }
          .analysis-section {
            margin: 40px 0;
            padding: 25px;
            background-color: #f7f6f4;
            border-radius: 8px;
          }
          .analysis-section h2 {
            color: #677076;
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
            color: #4b5563;
          }
          .analysis-list li:before {
            content: "•";
            position: absolute;
            left: 0;
            color: #677076;
          }
          .cta-section {
            text-align: center;
            margin: 40px 0;
            padding: 30px;
            background-color: #f7f6f4;
            border-radius: 8px;
          }
          .cta-section h2 {
            color: #677076;
            margin-bottom: 15px;
            font-size: 24px;
            font-weight: bold;
          }
          .cta-section p {
            color: #4b5563;
            margin-bottom: 20px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
          .cta-button {
            display: inline-block;
            padding: 16px 32px;
            background-color: #677076;
            color: white !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            font-size: 18px;
            transition: all 0.2s ease;
          }
          .cta-button:hover {
            background-color: #8a6b4e;
            transform: scale(1.05);
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
            <h1 style="color: #677076;">AI Readiness Assessment Results</h1>
          </div>
          
          <div class="score">
            Your AI Readiness Score: ${roundedScore}%
          </div>
          
          <div class="maturity-level">
            <h2>Maturity Level: ${maturityLevelDescription}</h2>
            <p>This indicates your organization's current stage in AI adoption and readiness.</p>
          </div>
          
          <div class="answers">
            <h2 style="color: #677076;">Your Responses</h2>
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
            <a href="${calendlyUrl}" class="cta-button" style="color: white !important;">Schedule a Consultation</a>
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