import { Handler } from '@netlify/functions';
import sgMail from '@sendgrid/mail';
import { questions } from '../../src/data/questions';

// Initialize SendGrid
const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  console.error('SENDGRID_API_KEY is not set in environment variables');
  throw new Error('Email service is not properly configured. Please contact support.');
}

// Validate API key format
if (!apiKey.startsWith('SG.')) {
  console.error('Invalid SendGrid API key format. API key should start with "SG."');
  throw new Error('Email service is not properly configured. Please contact support.');
}

console.log('Initializing SendGrid with API key:', apiKey.substring(0, 5) + '...');
sgMail.setApiKey(apiKey);

// Industry Facts for email
const industryFacts = {
  en: {
    'strategy-vision': 'Industry Insight: According to McKinsey research, most Fortune 500 companies have formal AI strategies, but implementation remains a challenge.',
    'talent-expertise': 'Industry Insight: The AI talent gap is a major challenge. Gartner reports that companies investing in AI training see higher employee retention rates.',
    'data-quality': 'Industry Insight: IBM research indicates that poor data quality costs businesses millions annually.',
    'ai-ethics': 'Industry Insight: Deloitte research shows that consumers increasingly consider AI ethics when making purchasing decisions.',
    'change-management': 'Industry Insight: According to Prosci research, most AI projects fail due to poor change management.',
    'data-infrastructure': 'Industry Insight: AWS research indicates that companies with modern data infrastructure see faster AI deployment times.',
    'risk-management': 'Industry Insight: PwC research shows that many AI projects face regulatory compliance issues.',
    'roi-expectations': 'Industry Insight: According to MIT Sloan research, AI projects with realistic ROI expectations are more likely to be considered successful.',
    'customer-impact': 'Industry Insight: Salesforce research shows that AI-powered customer service improves satisfaction and reduces costs.',
    'kpi-measurement': 'Industry Insight: According to MIT research, companies with well-defined AI KPIs are more likely to achieve their goals.'
  },
  bs: {
    'strategy-vision': 'Industrijska perspektiva: Prema McKinsey istraživanju, većina Fortune 500 kompanija ima formalne AI strategije, ali implementacija ostaje izazov.',
    'talent-expertise': 'Industrijska perspektiva: Praznina u AI talentima je glavni izazov. Gartner izvještava da kompanije koje ulažu u AI obuku vide višu stopu zadržavanja zaposlenih.',
    'data-quality': 'Industrijska perspektiva: IBM istraživanje pokazuje da loš kvalitet podataka košta poslovne subjekte milijune godišnje.',
    'ai-ethics': 'Industrijska perspektiva: Deloitte istraživanje pokazuje da potrošači sve više razmatraju AI etiku prilikom donošenja odluka o kupnji.',
    'change-management': 'Industrijska perspektiva: Prema Prosci istraživanju, većina AI projekata ne uspijeva zbog lošeg upravljanja promjenama.',
    'data-infrastructure': 'Industrijska perspektiva: AWS istraživanje pokazuje da kompanije s modernom infrastrukturom podataka vide brže vrijeme AI implementacije.',
    'risk-management': 'Industrijska perspektiva: PwC istraživanje pokazuje da se mnogi AI projekti suočavaju s problemima regulatorne usklađenosti.',
    'roi-expectations': 'Industrijska perspektiva: Prema MIT Sloan istraživanju, AI projekti s realističnim očekivanjima ROI-a su vjerojatniji da će biti smatrani uspješnim.',
    'customer-impact': 'Industrijska perspektiva: Salesforce istraživanje pokazuje da AI-powered customer service poboljšava zadovoljstvo i smanjuje troškove.',
    'kpi-measurement': 'Industrijska perspektiva: Prema MIT istraživanju, kompanije s dobro definisanim AI KPI-jima su vjerojatnije da će postići svoje ciljeve.'
  }
};

// Map for option IDs to their text values
const OPTION_MAP: Record<string, string> = {
  // IT Team questions
  'it1': 'Yes, we have a dedicated IT team',
  'it2': 'No, we don\'t have a dedicated IT team',
  'it3': 'Don\'t know / Not sure',
  
  // Strategy Vision questions
  'sv1': 'No formal AI strategy exists',
  'sv2': 'Basic ideas but no concrete plans',
  'sv3': 'Strategy in development with some goals defined',
  'sv4': 'Clear strategy with defined objectives',
  'sv5': 'Comprehensive strategy integrated with business goals',
  'sv6': 'Don\'t know / Not sure',
  
  // Talent Expertise questions
  'te1': 'No dedicated AI expertise',
  'te2': 'Basic understanding in key teams',
  'te3': 'Dedicated AI roles and capabilities',
  'te4': 'Advanced expertise and specialized teams',
  'te5': 'Industry-leading AI capabilities',
  'te6': 'Don\'t know / Not sure',
  
  // Data Quality questions
  'dq1': 'No standardized quality measures',
  'dq2': 'Basic quality controls',
  'dq3': 'Established quality framework',
  'dq4': 'Advanced quality management',
  'dq5': 'Industry-leading standards',
  'dq6': 'Don\'t know / Not sure',
  
  // AI Ethics questions
  'ae1': 'No formal ethics framework',
  'ae2': 'Basic guidelines in place',
  'ae3': 'Established ethics policies',
  'ae4': 'Comprehensive ethics framework',
  'ae5': 'Industry-leading ethics standards',
  'ae6': 'Don\'t know / Not sure',
  
  // Change Management questions
  'cm1': 'No formal change management',
  'cm2': 'Basic change processes',
  'cm3': 'Structured change framework',
  'cm4': 'Advanced change capabilities',
  'cm5': 'Exceptional change management',
  'cm6': 'Don\'t know / Not sure',
  
  // Data Infrastructure questions
  'di1': 'Basic data storage only',
  'di2': 'Some data integration',
  'di3': 'Modern data warehouse',
  'di4': 'Advanced data platform',
  'di5': 'Full data ecosystem',
  'di6': 'Don\'t know / Not sure',
  
  // Risk Management questions
  'rm1': 'No risk framework',
  'rm2': 'Basic risk assessment',
  'rm3': 'Structured risk management',
  'rm4': 'Advanced risk controls',
  'rm5': 'Comprehensive risk framework',
  'rm6': 'Don\'t know / Not sure',
  
  // ROI Expectations questions
  'roi1': 'Immediate cost savings (0-6 months)',
  'roi2': 'Short-term efficiency gains (6-12 months)',
  'roi3': 'Medium-term process optimization (1-2 years)',
  'roi4': 'Long-term strategic advantage (2-3 years)',
  'roi5': 'Transformational impact (3+ years)',
  'roi6': 'Don\'t know / Would like guidance',
  
  // Customer Impact questions
  'ci1': 'No direct customer impact planned',
  'ci2': 'Basic customer service automation',
  'ci3': 'Enhanced customer insights and personalization',
  'ci4': 'Advanced customer experience transformation',
  'ci5': 'Complete customer journey reimagining',
  'ci6': 'Don\'t know / Would like guidance',
  
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

// Map for maturity levels
const MATURITY_LEVELS = {
  en: {
    'Initial': 'Initial',
    'Developing': 'Developing', 
    'Defined': 'Defined',
    'Managed': 'Managed',
    'Advanced': 'Advanced',
    'Leading': 'Leading'
  },
  bs: {
    'Initial': 'Početni',
    'Developing': 'U Razvoju',
    'Defined': 'Definisan', 
    'Managed': 'Upravljan',
    'Advanced': 'Napredan',
    'Leading': 'Vodeći'
  }
};

// Function to get question text by ID
function getQuestionText(questionId: string, language: string = 'en'): string {
  const questionTranslations = {
    en: {
      'company-name': 'What is your company name?',
      'company-email': 'Can you please provide your company email?',
      'dedicated-it-team': 'Do you have a dedicated IT Team in your company?',
      'strategy-vision': 'How well-defined is your organization\'s AI strategy and vision?',
      'talent-expertise': 'What is your team\'s AI/ML expertise level?',
      'data-quality': 'How would you rate your data quality and standardization?',
      'ai-ethics': 'How mature is your AI ethics and responsibility framework?',
      'change-management': 'Rate your organization\'s change management capabilities',
      'data-infrastructure': 'How advanced is your data infrastructure?',
      'risk-management': 'How mature is your AI risk management framework?',
      'roi-expectations': 'What are your expectations for AI ROI and timeline?',
      'customer-impact': 'How do you expect AI to impact your customer experience?',
      'data-maturity': 'Rate your organization\'s data management maturity',
      'infrastructure-readiness': 'How ready is your infrastructure for AI implementation?',
      'data-privacy': 'How well do you handle data privacy and compliance?',
      'business-alignment': 'How well is AI aligned with your business objectives?',
      'innovation-culture': 'How strong is your organization\'s innovation culture?',
      'talent-development': 'How well do you develop and retain AI talent?',
      'stakeholder-engagement': 'How well do you engage stakeholders in AI initiatives?',
      'data-governance': 'How mature is your data governance framework?',
      'business-objectives': 'What are your specific business objectives for AI?',
      'industry-challenges': 'What are your industry-specific challenges?',
      'competitor-analysis': 'How do you analyze your competitors\' AI initiatives?',
      'market-readiness': 'How ready is your market for AI adoption?',
      'regulatory-compliance': 'How do you handle regulatory compliance for AI?',
      'partnership-strategy': 'How well-defined is your AI partnership strategy?',
      'kpi-measurement': 'What key performance indicators (KPIs) do you plan to use to measure AI success?'
    },
    bs: {
      'company-name': 'Koje je ime vaše kompanije?',
      'company-email': 'Možete li nam dati vašu email adresu?',
      'dedicated-it-team': 'Imate li posvećen IT tim u vašoj kompaniji?',
      'strategy-vision': 'Koliko je dobro definisana AI strategija i vizija vaše organizacije?',
      'talent-expertise': 'Koji je nivo AI/ML ekspertize vašeg tima?',
      'data-quality': 'Kako ocjenjujete kvalitet i standardizaciju vaših podataka?',
      'ai-ethics': 'Koliko je zreo vaš AI etički i odgovorni okvir?',
      'change-management': 'Ocijenite sposobnosti upravljanja promjenama vaše organizacije',
      'data-infrastructure': 'Koliko je napredna vaša infrastruktura podataka?',
      'risk-management': 'Koliko je zreo vaš AI okvir upravljanja rizicima?',
      'roi-expectations': 'Koja su vaša očekivanja za AI ROI i vremenski okvir?',
      'customer-impact': 'Kako očekujete da će AI utjecati na vaše korisničko iskustvo?',
      'data-maturity': 'Ocijenite zrelost upravljanja podacima vaše organizacije',
      'infrastructure-readiness': 'Koliko je spremna vaša infrastruktura za AI implementaciju?',
      'data-privacy': 'Koliko dobro upravljate privatnošću podataka i usklađenošću?',
      'business-alignment': 'Koliko je dobro AI usklađen s vašim poslovnim ciljevima?',
      'innovation-culture': 'Koliko je jaka inovacijska kultura vaše organizacije?',
      'talent-development': 'Koliko dobro razvijate i zadržavate AI talente?',
      'stakeholder-engagement': 'Koliko dobro angažujete dionike u AI inicijativama?',
      'data-governance': 'Koliko je zreo vaš okvir upravljanja podacima?',
      'business-objectives': 'Koji su vaši specifični poslovni ciljevi za AI?',
      'industry-challenges': 'Koji su vaši izazovi specifični za industriju?',
      'competitor-analysis': 'Kako analizirate AI inicijative vaših konkurenata?',
      'market-readiness': 'Koliko je spremno vaše tržište za usvajanje AI-a?',
      'regulatory-compliance': 'Kako upravljate regulatornom usklađenošću za AI?',
      'partnership-strategy': 'Koliko je dobro definisana vaša AI strategija partnerstva?',
      'kpi-measurement': 'Koje ključne pokazatelje uspješnosti (KPI-je) planirate koristiti za mjerenje AI uspjeha?'
    }
  };
  
  return questionTranslations[language as keyof typeof questionTranslations]?.[questionId] || questionId;
}

// Function to get answer text from answer data
function getAnswerText(answer: any, language: string = 'en'): string {
  if (answer.textValue) {
    return answer.textValue;
  }
  
  if (answer.optionId) {
    // Translate option text based on language
    const optionTranslations = {
      en: {
        // IT Team questions
        'it1': 'Yes, we have a dedicated IT team',
        'it2': 'No, we don\'t have a dedicated IT team',
        'it3': 'Don\'t know / Not sure',
        
        // Strategy Vision questions
        'sv1': 'No formal AI strategy exists',
        'sv2': 'Basic ideas but no concrete plans',
        'sv3': 'Strategy in development with some goals defined',
        'sv4': 'Clear strategy with defined objectives',
        'sv5': 'Comprehensive strategy integrated with business goals',
        'sv6': 'Don\'t know / Not sure',
        
        // Talent Expertise questions
        'te1': 'No dedicated AI expertise',
        'te2': 'Basic understanding in key teams',
        'te3': 'Dedicated AI roles and capabilities',
        'te4': 'Advanced expertise and specialized teams',
        'te5': 'Industry-leading AI capabilities',
        'te6': 'Don\'t know / Not sure',
        
        // Data Quality questions
        'dq1': 'No standardized quality measures',
        'dq2': 'Basic quality controls',
        'dq3': 'Established quality framework',
        'dq4': 'Advanced quality management',
        'dq5': 'Industry-leading standards',
        'dq6': 'Don\'t know / Not sure',
        
        // AI Ethics questions
        'ae1': 'No formal ethics framework',
        'ae2': 'Basic guidelines in place',
        'ae3': 'Established ethics policies',
        'ae4': 'Comprehensive ethics framework',
        'ae5': 'Industry-leading ethics standards',
        'ae6': 'Don\'t know / Not sure',
        
        // Change Management questions
        'cm1': 'No formal change management',
        'cm2': 'Basic change processes',
        'cm3': 'Structured change framework',
        'cm4': 'Advanced change capabilities',
        'cm5': 'Exceptional change management',
        'cm6': 'Don\'t know / Not sure',
        
        // Data Infrastructure questions
        'di1': 'Basic data storage only',
        'di2': 'Some data integration',
        'di3': 'Modern data warehouse',
        'di4': 'Advanced data platform',
        'di5': 'Full data ecosystem',
        'di6': 'Don\'t know / Not sure',
        
        // Risk Management questions
        'rm1': 'No risk framework',
        'rm2': 'Basic risk assessment',
        'rm3': 'Structured risk management',
        'rm4': 'Advanced risk controls',
        'rm5': 'Comprehensive risk framework',
        'rm6': 'Don\'t know / Not sure',
        
        // ROI Expectations questions
        'roi1': 'Immediate cost savings (0-6 months)',
        'roi2': 'Short-term efficiency gains (6-12 months)',
        'roi3': 'Medium-term process optimization (1-2 years)',
        'roi4': 'Long-term strategic advantage (2-3 years)',
        'roi5': 'Transformational impact (3+ years)',
        'roi6': 'Don\'t know / Would like guidance',
        
        // Customer Impact questions
        'ci1': 'No direct customer impact planned',
        'ci2': 'Basic customer service automation',
        'ci3': 'Enhanced customer insights and personalization',
        'ci4': 'Advanced customer experience transformation',
        'ci5': 'Complete customer journey reimagining',
        'ci6': 'Don\'t know / Would like guidance',
        
        // Yes/No questions
        'yn1': 'Yes',
        'yn2': 'No'
      },
      bs: {
        // IT Team questions
        'it1': 'Da, imamo posvećen IT tim',
        'it2': 'Ne, nemamo posvećen IT tim',
        'it3': 'Ne znam / Nisam siguran',
        
        // Strategy Vision questions
        'sv1': 'Ne postoji formalna AI strategija',
        'sv2': 'Osnovne ideje ali bez konkretnih planova',
        'sv3': 'Strategija u razvoju s nekim definisanim ciljevima',
        'sv4': 'Jasna strategija s definisanim ciljevima',
        'sv5': 'Sveobuhvatna strategija integrirana s poslovnim ciljevima',
        'sv6': 'Ne znam / Nisam siguran',
        
        // Talent Expertise questions
        'te1': 'Nema posvećene AI ekspertize',
        'te2': 'Osnovno razumijevanje u ključnim timovima',
        'te3': 'Posvećene AI uloge i sposobnosti',
        'te4': 'Napredna ekspertiza i specijalizirani timovi',
        'te5': 'AI sposobnosti na nivou industrije',
        'te6': 'Ne znam / Nisam siguran',
        
        // Data Quality questions
        'dq1': 'Nema standardiziranih mjera kvaliteta',
        'dq2': 'Osnovne kontrole kvaliteta',
        'dq3': 'Uspostavljen okvir kvaliteta',
        'dq4': 'Napredno upravljanje kvalitetom',
        'dq5': 'Standardi na nivou industrije',
        'dq6': 'Ne znam / Nisam siguran',
        
        // AI Ethics questions
        'ae1': 'Nema formalnog etičkog okvira',
        'ae2': 'Osnovne smjernice na mjestu',
        'ae3': 'Uspostavljene etičke politike',
        'ae4': 'Sveobuhvatni etički okvir',
        'ae5': 'Etički standardi na nivou industrije',
        'ae6': 'Ne znam / Nisam siguran',
        
        // Change Management questions
        'cm1': 'Nema formalnog upravljanja promjenama',
        'cm2': 'Osnovni procesi promjena',
        'cm3': 'Strukturirani okvir promjena',
        'cm4': 'Napredne sposobnosti promjena',
        'cm5': 'Izvrsno upravljanje promjenama',
        'cm6': 'Ne znam / Nisam siguran',
        
        // Data Infrastructure questions
        'di1': 'Samo osnovno skladištenje podataka',
        'di2': 'Neka integracija podataka',
        'di3': 'Moderno skladište podataka',
        'di4': 'Napredna platforma podataka',
        'di5': 'Pun ekosistem podataka',
        'di6': 'Ne znam / Nisam siguran',
        
        // Risk Management questions
        'rm1': 'Nema okvira rizika',
        'rm2': 'Osnovna procjena rizika',
        'rm3': 'Strukturirano upravljanje rizicima',
        'rm4': 'Napredne kontrole rizika',
        'rm5': 'Sveobuhvatni okvir rizika',
        'rm6': 'Ne znam / Nisam siguran',
        
        // ROI Expectations questions
        'roi1': 'Trenutne uštede troškova (0-6 mjeseci)',
        'roi2': 'Kratkoročni dobitci efikasnosti (6-12 mjeseci)',
        'roi3': 'Srednjoročna optimizacija procesa (1-2 godine)',
        'roi4': 'Dugoročna strateška prednost (2-3 godine)',
        'roi5': 'Transformacijski utjecaj (3+ godine)',
        'roi6': 'Ne znam / Želio bih smjernice',
        
        // Customer Impact questions
        'ci1': 'Nije planiran direktan utjecaj na kupce',
        'ci2': 'Osnovna automatizacija korisničke službe',
        'ci3': 'Poboljšani uvidi o kupcima i personalizacija',
        'ci4': 'Napredna transformacija korisničkog iskustva',
        'ci5': 'Potpuno preosmišljavanje putanje kupca',
        'ci6': 'Ne znam / Želio bih smjernice',
        
        // Yes/No questions
        'yn1': 'Da',
        'yn2': 'Ne'
      }
    };
    
    const translatedOption = optionTranslations[language as keyof typeof optionTranslations]?.[answer.optionId];
    return translatedOption || OPTION_MAP[answer.optionId] || answer.optionId;
  }
  
  if (answer.sliderValue !== undefined) {
    // Translate slider values
    const sliderTranslations = {
      en: {
        0: 'Not Started',
        25: 'Early Stage',
        50: 'In Progress',
        75: 'Advanced',
        100: 'Complete'
      },
      bs: {
        0: 'Nije Započeto',
        25: 'Rana Faza',
        50: 'U Toku',
        75: 'Napredno',
        100: 'Završeno'
      }
    };
    
    const translatedSlider = sliderTranslations[language as keyof typeof sliderTranslations]?.[answer.sliderValue];
    return translatedSlider || SLIDER_MAP[answer.sliderValue] || `${answer.sliderValue}%`;
  }
  
  if (answer.score !== undefined) {
    return language === 'bs' ? `Rezultat: ${answer.score}` : `Score: ${answer.score}`;
  }
  
  return language === 'bs' ? 'Nije dat odgovor' : 'No answer provided';
}

// Define the Answer type
interface Answer {
  questionId: string;
  optionId?: string;
  sliderValue?: number;
  textValue?: string;
  score?: number;
}

// Define weights for each option
const OPTION_WEIGHTS: Record<string, number> = {
  // IT Infrastructure
  'it_1_1': 1, // No formal strategy
  'it_1_2': 2, // Basic documentation
  'it_1_3': 3, // Standardized processes
  'it_1_4': 4, // Comprehensive strategy
  'it_1_5': 5, // Advanced implementation

  'it_2_1': 1, // No dedicated team
  'it_2_2': 2, // Part-time resources
  'it_2_3': 3, // Small dedicated team
  'it_2_4': 4, // Cross-functional team
  'it_2_5': 5, // Specialized AI team

  'it_3_1': 1, // No cloud usage
  'it_3_2': 2, // Basic cloud storage
  'it_3_3': 3, // Some cloud services
  'it_3_4': 4, // Hybrid cloud
  'it_3_5': 5, // Cloud-first strategy

  'it_4_1': 1, // No data strategy
  'it_4_2': 2, // Basic data storage
  'it_4_3': 3, // Some data management
  'it_4_4': 4, // Comprehensive strategy
  'it_4_5': 5, // Advanced data platform

  'it_5_1': 1, // No security measures
  'it_5_2': 2, // Basic security
  'it_5_3': 3, // Standard security
  'it_5_4': 4, // Advanced security
  'it_5_5': 5, // Comprehensive security

  // Technical Expertise
  'te_1_1': 1, // No AI knowledge
  'te_1_2': 2, // Basic understanding
  'te_1_3': 3, // Some expertise
  'te_1_4': 4, // Strong expertise
  'te_1_5': 5, // Expert level

  'te_2_1': 1, // No training
  'te_2_2': 2, // Basic training
  'te_2_3': 3, // Regular training
  'te_2_4': 4, // Comprehensive training
  'te_2_5': 5, // Advanced training

  'te_3_1': 1, // No experience
  'te_3_2': 2, // Basic projects
  'te_3_3': 3, // Some projects
  'te_3_4': 4, // Multiple projects
  'te_3_5': 5, // Extensive experience

  'te_4_1': 1, // No tools
  'te_4_2': 2, // Basic tools
  'te_4_3': 3, // Some tools
  'te_4_4': 4, // Advanced tools
  'te_4_5': 5, // Comprehensive tools

  'te_5_1': 1, // No integration
  'te_5_2': 2, // Basic integration
  'te_5_3': 3, // Some integration
  'te_5_4': 4, // Advanced integration
  'te_5_5': 5, // Comprehensive integration

  // Data Quality
  'dq_1_1': 1, // No data
  'dq_1_2': 2, // Basic data
  'dq_1_3': 3, // Some data
  'dq_1_4': 4, // Good data
  'dq_1_5': 5, // Excellent data

  'dq_2_1': 1, // No structure
  'dq_2_2': 2, // Basic structure
  'dq_2_3': 3, // Some structure
  'dq_2_4': 4, // Good structure
  'dq_2_5': 5, // Excellent structure

  'dq_3_1': 1, // No quality
  'dq_3_2': 2, // Basic quality
  'dq_3_3': 3, // Some quality
  'dq_3_4': 4, // Good quality
  'dq_3_5': 5, // Excellent quality

  'dq_4_1': 1, // No governance
  'dq_4_2': 2, // Basic governance
  'dq_4_3': 3, // Some governance
  'dq_4_4': 4, // Good governance
  'dq_4_5': 5, // Excellent governance

  'dq_5_1': 1, // No security
  'dq_5_2': 2, // Basic security
  'dq_5_3': 3, // Some security
  'dq_5_4': 4, // Good security
  'dq_5_5': 5, // Excellent security

  // Business Strategy
  'bs_1_1': 1, // No strategy
  'bs_1_2': 2, // Basic strategy
  'bs_1_3': 3, // Some strategy
  'bs_1_4': 4, // Good strategy
  'bs_1_5': 5, // Excellent strategy

  'bs_2_1': 1, // No alignment
  'bs_2_2': 2, // Basic alignment
  'bs_2_3': 3, // Some alignment
  'bs_2_4': 4, // Good alignment
  'bs_2_5': 5, // Excellent alignment

  'bs_3_1': 1, // No investment
  'bs_3_2': 2, // Basic investment
  'bs_3_3': 3, // Some investment
  'bs_3_4': 4, // Good investment
  'bs_3_5': 5, // Excellent investment

  'bs_4_1': 1, // No metrics
  'bs_4_2': 2, // Basic metrics
  'bs_4_3': 3, // Some metrics
  'bs_4_4': 4, // Good metrics
  'bs_4_5': 5, // Excellent metrics

  'bs_5_1': 1, // No roadmap
  'bs_5_2': 2, // Basic roadmap
  'bs_5_3': 3, // Some roadmap
  'bs_5_4': 4, // Good roadmap
  'bs_5_5': 5, // Excellent roadmap

  // Organizational Readiness
  'or_1_1': 1, // No culture
  'or_1_2': 2, // Basic culture
  'or_1_3': 3, // Some culture
  'or_1_4': 4, // Good culture
  'or_1_5': 5, // Excellent culture

  'or_2_1': 1, // No skills
  'or_2_2': 2, // Basic skills
  'or_2_3': 3, // Some skills
  'or_2_4': 4, // Good skills
  'or_2_5': 5, // Excellent skills

  'or_3_1': 1, // No change
  'or_3_2': 2, // Basic change
  'or_3_3': 3, // Some change
  'or_3_4': 4, // Good change
  'or_3_5': 5, // Excellent change

  'or_4_1': 1, // No collaboration
  'or_4_2': 2, // Basic collaboration
  'or_4_3': 3, // Some collaboration
  'or_4_4': 4, // Good collaboration
  'or_4_5': 5, // Excellent collaboration

  'or_5_1': 1, // No leadership
  'or_5_2': 2, // Basic leadership
  'or_5_3': 3, // Some leadership
  'or_5_4': 4, // Good leadership
  'or_5_5': 5, // Excellent leadership
};

// Calculate the score based on answers
function calculateScore(answers: Answer[]): { score: number; maxScore: number; percentage: number; maturityLevel: string } {
  const totalScore = answers.reduce((sum, answer) => {
    const questionId = answer.questionId.split('_')[0];
    const question = questions.find(q => q.id === questionId);
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

interface AssessmentResult {
  email: string[];
  answers: any[];
  score: number;
  maxScore: number;
  percentage: number;
  maturityLevel: string;
  strengths: string[];
  improvements: string[];
  language?: string;
}

const getTranslatedContent = (language: string = 'en') => {
  const translations = {
    en: {
      subject: 'Your AI Readiness Assessment Results',
      greeting: 'Thank you for completing the AI Readiness Assessment. Here are your results:',
      overallScore: 'Overall Score',
      yourAnswers: 'Your Answers',
      recommendations: 'Recommendations',
      cta: 'View Full Report',
      footer: 'Thank you for using our AI Readiness Assessment tool.',
      dataRec: 'Improve data infrastructure and quality standards',
      techRec: 'Enhance technical capabilities and tooling',
      peopleRec: 'Develop AI expertise and change management',
      strategyRec: 'Align AI strategy with business objectives'
    },
    bs: {
      subject: 'Vaši rezultati procjene spremnosti za AI',
      greeting: 'Hvala vam što ste završili procjenu spremnosti za AI. Evo vaših rezultata:',
      overallScore: 'Ukupan rezultat',
      yourAnswers: 'Vaši odgovori',
      recommendations: 'Preporuke',
      cta: 'Pogledajte puni izvještaj',
      footer: 'Hvala vam što koristite naš alat za procjenu spremnosti za AI.',
      dataRec: 'Poboljšajte infrastrukturu podataka i standarde kvaliteta',
      techRec: 'Unapredite tehničke sposobnosti i alate',
      peopleRec: 'Razvijte AI ekspertizu i upravljanje promjenama',
      strategyRec: 'Uskladite AI strategiju s poslovnim ciljevima'
    }
  };
  
  return translations[language as keyof typeof translations] || translations.en;
};

const generateEmailHtml = (data: AssessmentResult) => {
  const t = getTranslatedContent(data.language);
  
  const answersHtml = data.answers.map(answer => {
    const questionId = answer.questionId;
    const questionText = getQuestionText(questionId, data.language);
    const answerText = getAnswerText(answer, data.language);
    const fact = industryFacts[data.language as keyof typeof industryFacts]?.[questionId];
    
    return `
      <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #E7E9EC;">
        <h4 style="color: #2E363C; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">
          ${questionText}
        </h4>
        <p style="color: #687177; margin: 0 0 8px 0; font-size: 14px;">
          ${answerText}
        </p>
        ${fact ? `
          <div style="background-color: #FFF7ED; border-left: 4px solid #F59E0B; padding: 8px 12px; margin-top: 8px; border-radius: 4px;">
            <p style="color: #92400E; margin: 0; font-size: 12px; font-style: italic;">
              ${fact}
            </p>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${t.subject}</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa;">
        <div style="background-color: #ffffff; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="background-color: #677076; padding: 30px; text-align: center;">
            <img src="https://bloomteq.com/wp-content/uploads/2024/01/bloomteq-logo-white.png" alt="Bloomteq Logo" style="height: 40px; margin-bottom: 20px; display: inline-block;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
              ${t.subject}
            </h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            <p style="color: #687177; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
              ${t.greeting}
            </p>
            
            <!-- Overall Score -->
            <div style="background-color: #f8f9fa; border: 1px solid #E7E9EC; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
              <h2 style="color: #2E363C; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
                ${t.overallScore}
              </h2>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
                <span style="font-size: 36px; font-weight: bold; color: #677076;">
                  ${Math.round(data.percentage)}%
                </span>
                <span style="font-size: 18px; font-weight: 600; color: #677076;">
                  ${MATURITY_LEVELS[data.language as keyof typeof MATURITY_LEVELS]?.[data.maturityLevel as keyof typeof MATURITY_LEVELS.en] || data.maturityLevel}
                </span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 14px; color: #687177; margin-bottom: 5px;">
                <span>${data.language === 'bs' ? 'Rezultat' : 'Score'}</span>
                <span>${data.score} / ${data.maxScore}</span>
              </div>
              <div style="width: 100%; height: 8px; background-color: #E7E9EC; border-radius: 4px; overflow: hidden;">
                <div style="width: ${data.percentage}%; height: 100%; background-color: #677076; transition: width 0.5s ease;"></div>
              </div>
            </div>
            
            <!-- Your Answers -->
            <h3 style="color: #2E363C; margin: 30px 0 15px 0; font-size: 18px; font-weight: 600;">
              ${t.yourAnswers}
            </h3>
            <div style="background-color: #ffffff; border: 1px solid #E7E9EC; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
              ${answersHtml}
            </div>
            
            <!-- Recommendations -->
            <div style="background-color: #f8f9fa; border: 1px solid #E7E9EC; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
              <h3 style="color: #2E363C; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                ${t.recommendations}
              </h3>
              <ul style="color: #687177; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>${t.dataRec}</li>
                <li>${t.techRec}</li>
                <li>${t.peopleRec}</li>
                <li>${t.strategyRec}</li>
              </ul>
            </div>
            
            <!-- CTA Button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="display: inline-block; background-color: #677076; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                ${t.cta}
              </a>
            </div>
            
            <!-- Footer -->
            <p style="color: #687177; font-size: 14px; line-height: 1.5; text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E7E9EC;">
              ${t.footer}
            </p>
            
            <!-- Disclaimer -->
            <div style="background-color: #f8f9fa; border: 1px solid #E7E9EC; border-radius: 6px; padding: 15px; margin-top: 20px;">
              <p style="color: #687177; font-size: 12px; line-height: 1.4; margin: 0; font-style: italic; text-align: center;">
                ${data.language === 'bs' 
                  ? 'Napomena: Industrijske perspektive prikazane tijekom procjene temelje se na industrijskim istraživanjima i trendovima. Specifične statistike mogu varirati ovisno o regiji i industriji.'
                  : 'Note: Industry insights provided during the assessment are based on industry research and trends. Specific statistics may vary by region and industry.'
                }
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data: AssessmentResult = JSON.parse(event.body || '{}');
    
    if (!data.email || !data.answers) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const html = generateEmailHtml(data);
    const t = getTranslatedContent(data.language);

    const msg = {
      to: data.email,
      from: 'noreply@bloomteq.com',
      subject: t.subject,
      html: html
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
}; 