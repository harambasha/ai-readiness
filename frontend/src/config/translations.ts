export const translations = {
  en: {
    // Navigation
    next: 'Next',
    previous: 'Previous',
    start: 'Start Assessment',
    finish: 'Finish',
    
    // Welcome page
    welcome: {
      title: 'AI Readiness Assessment',
      tagline: {
        part1: 'Transform Your Business with',
        part2: ' AI Innovation'
      },
      description: 'Discover if your organization is ready to harness the power of AI. Get personalized insights and actionable recommendations in just 10 minutes.',
      startButton: 'Start Free Assessment',
      features: {
        comprehensive: 'Comprehensive Assessment',
        actionable: 'Actionable Roadmap',
        quick: {
          title: 'Quick',
          subtitle: '10 minutes'
        },
        free: {
          title: 'Free',
          subtitle: 'No cost'
        },
        personalized: {
          title: 'Personalized',
          subtitle: 'Custom insights'
        }
      },
      assessmentAreas: {
        title: 'Comprehensive Assessment Areas',
        subtitle: 'Our AI readiness scorecard evaluates your organization across four critical dimensions',
        strategy: {
          title: 'Strategic Vision',
          subtitle: 'Evaluate your AI strategy alignment with business goals',
          description: 'Assess how well your AI initiatives align with overall business objectives, market positioning, and long-term growth plans. This includes evaluating your AI roadmap, investment priorities, and strategic partnerships.'
        },
        data: {
          title: 'Data Readiness',
          subtitle: 'Assess your data quality and infrastructure capabilities',
          description: 'Review your data collection, storage, and processing capabilities. Evaluate data quality, governance, security measures, and the maturity of your data infrastructure to support AI initiatives.'
        },
        governance: {
          title: 'Governance & Ethics',
          subtitle: 'Review your AI policies and ethical framework',
          description: 'Examine your organization\'s approach to AI governance, including ethical guidelines, compliance frameworks, risk management, and responsible AI practices. Assess how well you\'re addressing bias, privacy, and transparency.'
        },
        team: {
          title: 'Team Capability',
          subtitle: 'Gauge your team\'s AI expertise and readiness',
          description: 'Evaluate your organization\'s AI talent, skills development programs, and cultural readiness. Assess technical capabilities, training initiatives, and how well your team can implement and maintain AI solutions.'
        }
      }
    },
    
    // Assessment areas
    areas: {
      strategy: 'AI Strategy',
      data: 'Data Infrastructure',
      technology: 'Technology Stack',
      people: 'People & Skills',
      processes: 'Processes & Governance',
      culture: 'Culture & Change Management'
    },
    
    // Questions
    questions: {
      strategy: {
        title: 'AI Strategy & Vision',
        description: 'Understanding your organization\'s strategic approach to AI'
      },
      data: {
        title: 'Data Infrastructure',
        description: 'Evaluating your data readiness for AI implementation'
      },
      technology: {
        title: 'Technology Stack',
        description: 'Assessing your current technology capabilities'
      },
      people: {
        title: 'People & Skills',
        description: 'Evaluating your team\'s AI readiness'
      },
      processes: {
        title: 'Processes & Governance',
        description: 'Understanding your operational readiness'
      },
      culture: {
        title: 'Culture & Change Management',
        description: 'Assessing organizational readiness for AI adoption'
      }
    },
    
    // Results
    results: {
      title: 'Your AI Readiness Results',
      subtitle: 'Based on your responses, here is your assessment:',
      overallScore: 'Overall Score',
      categoryScores: 'Category Scores',
      keyStrengths: 'Key Strengths',
      areasForImprovement: 'Areas for Improvement',
      recommendations: 'Recommendations',
      getFullReport: 'Get Your Complete Report',
      emailPlaceholder: 'Enter your email address',
      sendResults: 'Send Results',
      emailSent: 'Results sent successfully!',
      emailError: 'Error sending results. Please try again.',
      downloadPDF: 'Download PDF Report',
      shareResults: 'Share Results'
    },
    
    // Radar Chart Categories
    chartCategories: {
      dataInfrastructure: 'Data Infrastructure',
      aiStrategy: 'AI Strategy',
      talentDevelopment: 'Talent Development',
      technologyStack: 'Technology Stack',
      processAutomation: 'Process Automation'
    },
    
    // Chart Elements
    chartElements: {
      strengths: 'Strengths',
      areasForImprovement: 'Areas for Improvement'
    },
    
    // Common
    loading: 'Loading...',
    sending: 'Sending...',
    error: 'An error occurred',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    submit: 'Submit',
    back: 'Back',
    continue: 'Continue',
    questionLabel: 'Question',
    of: 'of',
    tip: 'Tip',
    assessmentCoversDifferentAreas: 'This assessment covers different areas (business, governance, technology). For best results, consider involving a team that covers all areas.',
    linkCopiedToClipboard: 'Link copied to clipboard!',
    aiReadinessAnalysis: 'AI Readiness Analysis',

    // Email Validation
    emailValidation: {
      required: 'Email address is required',
      invalid: 'Please enter a valid email address'
    },
    
    // Team approach warning
    teamApproachRecommended: 'Team Approach Recommended',
    teamApproachDescription: 'For the most accurate assessment, we recommend completing this evaluation as a team. Different perspectives from various departments will provide a more comprehensive view of your organization\'s AI readiness.',
    recommendedParticipants: 'Recommended Participants:',
    ceoOrBusinessOwner: 'CEO or Business Owner',
    itManagerOrCto: 'IT Manager or CTO',
    operationsManager: 'Operations Manager',
    dataAnalystOrScientist: 'Data Analyst or Scientist',
    continueWithAssessment: 'Continue with Assessment',
    
    // Recommendations
    yourOrganizationIsInTheEarlyStagesOfAiReadinessFocusOnDevelopingFoundationalCapabilitiesAndBuildingBasicAiAwareness: 'Your organization is in the early stages of AI readiness. Focus on developing foundational capabilities and building basic AI awareness. Start by identifying 2-3 high-impact use cases, invest in data quality initiatives, and begin AI literacy training for key stakeholders. Consider pilot projects in areas like customer service automation or data analysis to build momentum and demonstrate value.',
    youReMakingProgressButThereSRoomForImprovementPrioritizeDataInfrastructureAndTalentDevelopment: 'You\'re making progress but there\'s room for improvement. Prioritize data infrastructure and talent development. Strengthen your data governance framework, implement data quality monitoring, and develop a comprehensive AI talent strategy. Focus on upskilling existing teams and establishing clear AI project management processes. Consider forming an AI steering committee to align initiatives with business objectives.',
    youReWellOnYourWayConsiderExpandingYourAiInitiativesAndStrengtheningGovernanceFrameworks: 'You\'re well on your way! Consider expanding your AI initiatives and strengthening governance frameworks. Scale successful AI projects across departments, implement advanced analytics capabilities, and establish robust AI ethics and compliance frameworks. Focus on creating a data-driven culture, developing AI centers of excellence, and building strategic partnerships with AI vendors and research institutions.',
    strongAiReadinessFocusOnOptimizationAndScalingYourAiCapabilities: 'Strong AI readiness! Focus on optimization and scaling your AI capabilities. Implement advanced AI solutions like predictive analytics, natural language processing, and computer vision. Establish AI-driven decision-making processes, optimize model performance, and develop automated AI pipelines. Focus on creating AI-first products and services, implementing real-time analytics, and building a comprehensive AI ecosystem.',
    exceptionalAiReadinessContinueLeadingInnovationAndSharingBestPractices: 'Exceptional AI readiness! Continue leading innovation and sharing best practices. Pioneer cutting-edge AI applications, develop proprietary AI solutions, and establish thought leadership in your industry. Focus on AI research and development, contribute to AI standards and frameworks, and mentor other organizations. Consider establishing AI innovation labs, publishing research papers, and participating in industry consortia to shape the future of AI.',
    
    // Results page
    readyToAccelerateYourAiJourney: 'Ready to Accelerate Your AI Journey?',
    ourTeamOfAiExpertsAtBloomteqCanHelpYouDevelopAComprehensiveStrategyAndImplementationPlanTailoredToYourOrganizationSNeeds: 'Our team of AI experts at Bloomteq can help you develop a comprehensive strategy and implementation plan tailored to your organization\'s needs.',
    scheduleAConsultation: 'Schedule a Consultation',
    whatThisMeans: 'What This Means',
    nextSteps: 'Next Steps',
    createAnActionPlanBasedOnYourAssessmentResults: 'Create an action plan based on your assessment results',
    shareFindingsWithKeyStakeholders: 'Share findings with key stakeholders',
    scheduleAFollowUpAssessmentInSixMonths: 'Schedule a follow-up assessment in six months',
    
    // Footer
    footer: {
      poweredBy: 'Powered by',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      contact: 'Contact Us'
    },
    
    // Maturity levels
    maturityLevels: {
      Initial: 'Initial stage',
      Developing: 'Developing stage',
      Defined: 'Defined stage',
      Managed: 'Managed stage',
      Advanced: 'Advanced stage',
      Leading: 'Leading stage in the industry'
    }
  },
  
  bs: {
    // Navigation
    next: 'Sljedeći',
    previous: 'Prethodni',
    start: 'Započni Procjenu',
    finish: 'Završi',
    
    // Welcome page
    welcome: {
      title: 'Procjena Spremnosti za AI',
      tagline: {
        part1: 'Transformirajte Vaš Posao s',
        part2: ' AI Inovacijama'
      },
      description: 'Provjerite je li vaša organizacija spremna iskoristiti puni potencijal umjetne inteligencije. U samo 10 minuta dobit ćete personalizirane uvide i konkretne preporuke.',
      startButton: 'Pokrenite Procjenu',
      features: {
        comprehensive: 'Sveobuhvatna Procjena',
        actionable: 'Koristi Putanja',
        quick: {
          title: 'Brzo',
          subtitle: '10 minuta'
        },
        free: {
          title: 'Besplatno',
          subtitle: 'Bez troškova'
        },
        personalized: {
          title: 'Personalizirano',
          subtitle: 'Prilagođeni uvidi'
        }
      },
      assessmentAreas: {
        title: 'Sveobuhvatna Područja Procjene',
        subtitle: 'Naša AI procjena spremnosti evaluira vašu organizaciju kroz četiri kritične dimenzije',
        strategy: {
          title: 'Strateška Vizija',
          subtitle: 'Procijenite usklađenost vaše AI strategije s poslovnim ciljevima',
          description: 'Procijenite koliko dobro se vaše AI inicijative poklapaju s općim poslovnim ciljevima, tržišnim pozicioniranjem i dugoročnim planovima rasta. Ovo uključuje evaluaciju vaše AI putanje, prioriteta investicija i strateških partnerstava.'
        },
        data: {
          title: 'Spremnost Podataka',
          subtitle: 'Procijenite kvalitet vaših podataka i sposobnosti infrastrukture',
          description: 'Pregledajte vaše sposobnosti prikupljanja, skladištenja i obrade podataka. Procijenite kvalitet podataka, upravljanje, sigurnosne mjere i zrelost vaše infrastrukture podataka za podršku AI inicijativama.'
        },
        governance: {
          title: 'Upravljanje i Etika',
          subtitle: 'Pregledajte vaše AI politike i etički okvir',
          description: 'Ispitajte pristup vaše organizacije AI upravljanju, uključujući etičke smjernice, okvire usklađenosti, upravljanje rizicima i odgovorne AI prakse. Procijenite koliko dobro se bavite pristranošću, privatnošću i transparentnošću.'
        },
        team: {
          title: 'Sposobnost Tima',
          subtitle: 'Ocijenite AI ekspertizu i spremnost vašeg tima',
          description: 'Procijenite AI talente vaše organizacije, programe razvoja vještina i kulturnu spremnost. Procijenite tehničke sposobnosti, inicijative obuke i koliko dobro vaš tim može implementirati i održavati AI rješenja.'
        }
      }
    },
    
    // Assessment areas
    areas: {
      strategy: 'AI Strategija',
      data: 'Data Infrastruktura',
      technology: 'Tehnološki Stack',
      people: 'Ljudi i Vještine',
      processes: 'Procesi i Upravljanje',
      culture: 'Kultura i Upravljanje Promjenama'
    },
    
    // Questions
    questions: {
      strategy: {
        title: 'AI Strategija i Vizija',
        description: 'Razumijevanje strateškog pristupa vaše organizacije AI-u'
      },
      data: {
        title: 'Data Infrastruktura',
        description: 'Procjena spremnosti vaših podataka za implementaciju AI-a'
      },
      technology: {
        title: 'Tehnološki Stack',
        description: 'Procjena vaših trenutnih tehnoloških sposobnosti'
      },
      people: {
        title: 'Ljudi i Vještine',
        description: 'Procjena spremnosti vašeg tima za AI'
      },
      processes: {
        title: 'Procesi i Upravljanje',
        description: 'Razumijevanje vaše operativne spremnosti'
      },
      culture: {
        title: 'Kultura i Upravljanje Promjenama',
        description: 'Procjena organizacijske spremnosti za usvajanje AI-a'
      }
    },
    
    // Results
    results: {
      title: 'Vaši Rezultati Spremnosti za AI',
      subtitle: 'Na osnovu vaših odgovora, evo vaše procjene:',
      overallScore: 'Ukupan Rezultat',
      categoryScores: 'Rezultati po Kategorijama',
      keyStrengths: 'Ključne Snage',
      areasForImprovement: 'Područja za Poboljšanje',
      recommendations: 'Preporuke',
      getFullReport: 'Dobijte Vaš Kompletan Izvještaj',
      emailPlaceholder: 'Unesite vašu email adresu',
      sendResults: 'Pošalji Rezultate',
      emailSent: 'Rezultati uspješno poslani!',
      emailError: 'Greška pri slanju rezultata. Molimo pokušajte ponovo.',
      downloadPDF: 'Preuzmi PDF Izvještaj',
      shareResults: 'Podijeli Rezultate'
    },
    
    // Radar Chart Categories
    chartCategories: {
      dataInfrastructure: 'Data Infrastruktura',
      aiStrategy: 'AI Strategija',
      talentDevelopment: 'Razvoj Talenata',
      technologyStack: 'Tehnološki Stack',
      processAutomation: 'Automatizacija Procesa'
    },
    
    // Chart Elements
    chartElements: {
      strengths: 'Snage',
      areasForImprovement: 'Područja za Poboljšanje'
    },
    
    // Common
    loading: 'Učitavanje...',
    sending: 'Slanje...',
    error: 'Došlo je do greške',
    success: 'Uspjeh',
    cancel: 'Otkaži',
    save: 'Spremi',
    submit: 'Pošalji',
    back: 'Nazad',
    continue: 'Nastavi',
    questionLabel: 'Pitanje',
    of: 'od',
    tip: 'Savjet',
    assessmentCoversDifferentAreas: 'Ova procjena pokriva različita područja (biznis, governance, tehnologiju). Za najbolje rezultate, razmislite o uključivanju tima koji pokriva sva područja.',
    linkCopiedToClipboard: 'Link kopiran u clipboard!',
    aiReadinessAnalysis: 'AI Analiza Spremnosti',

    // Email Validation
    emailValidation: {
      required: 'Email adresa je obavezna',
      invalid: 'Unesite valjanu email adresu'
    },
    
    // Team approach warning
    teamApproachRecommended: 'Preporučuje se Timski Pristup',
    teamApproachDescription: 'Za najprecizniju procjenu, preporučujemo da ovu evaluaciju završite kao tim. Različite perspektive iz različitih odjela pružit će sveobuhvatniji pogled na spremnost vaše organizacije za AI.',
    recommendedParticipants: 'Preporučeni sudionici:',
    ceoOrBusinessOwner: 'CEO ili vlasnik posla',
    itManagerOrCto: 'IT menadžer ili CTO',
    operationsManager: 'Menadžer operacija',
    dataAnalystOrScientist: 'Analitičar podataka ili znanstvenik',
    continueWithAssessment: 'Nastavi s Procjenom',
    
    // Recommendations
    yourOrganizationIsInTheEarlyStagesOfAiReadinessFocusOnDevelopingFoundationalCapabilitiesAndBuildingBasicAiAwareness: 'Vaša organizacija je u ranim fazama spremnosti za AI. Fokusirajte se na razvoj osnovnih sposobnosti i izgradnju osnovne AI svijesti. Započnite identificiranjem 2-3 slučaja upotrebe visokog uticaja, uložite u inicijative kvaliteta podataka i započnite AI obuku pismenosti za ključne nositelje odgovornosti. Razmislite o pilot projektima u područjima poput automatizacije korisničke podrške ili analize podataka za izgradnju momentuma i demonstraciju vrijednosti.',
    youReMakingProgressButThereSRoomForImprovementPrioritizeDataInfrastructureAndTalentDevelopment: 'Napredujete, ali ima prostora za poboljšanje. Prioritetizirajte infrastrukturu podataka i razvoj talenata. Ojačajte vaš okvir upravljanja podacima, implementirajte praćenje kvaliteta podataka i razvijte sveobuhvatnu AI strategiju talenata. Fokusirajte se na unapređenje postojećih timova i uspostavljanje jasnih AI procesa upravljanja projektima. Razmislite o formiranju AI upravnog odbora za usklađivanje inicijativa s poslovnim ciljevima.',
    youReWellOnYourWayConsiderExpandingYourAiInitiativesAndStrengtheningGovernanceFrameworks: 'Dobro ste na putu! Razmislite o proširenju vaših AI inicijativa i jačanju okvira upravljanja. Skalirajte uspješne AI projekte kroz odjele, implementirajte napredne analitičke sposobnosti i uspostavite robusne AI etičke i usklađenosti okvire. Fokusirajte se na stvaranje kulture vođene podacima, razvoj AI centara izvrsnosti i izgradnju strateških partnerstava s AI dobavljačima i istraživačkim institucijama.',
    strongAiReadinessFocusOnOptimizationAndScalingYourAiCapabilities: 'Jaka spremnost za AI! Fokusirajte se na optimizaciju i skaliranje vaših AI sposobnosti. Implementirajte napredna AI rješenja poput prediktivne analitike, obrade prirodnog jezika i računarskog vida. Uspostavite AI procese donošenja odluka, optimizirajte performanse modela i razvijte automatizirane AI pipeline-ove. Fokusirajte se na stvaranje AI-prvih proizvoda i usluga, implementiranje analitike u stvarnom vremenu i izgradnju sveobuhvatnog AI ekosistema.',
    exceptionalAiReadinessContinueLeadingInnovationAndSharingBestPractices: 'Izvrsna spremnost za AI! Nastavite voditi inovacije i dijeliti najbolje prakse. Pionirite najnovije AI aplikacije, razvijte vlasnička AI rješenja i uspostavite misaono vodstvo u vašoj industriji. Fokusirajte se na AI istraživanje i razvoj, doprinosite AI standardima i okvirima i mentorirajte druge organizacije. Razmislite o uspostavljanju AI inovacijskih laboratorija, objavljivanju istraživačkih radova i sudjelovanju u industrijskim konzorcijima za oblikovanje budućnosti AI-a.',
    
    // Results page
    readyToAccelerateYourAiJourney: 'Spremni da Ubrzate Vaš AI Put?',
    ourTeamOfAiExpertsAtBloomteqCanHelpYouDevelopAComprehensiveStrategyAndImplementationPlanTailoredToYourOrganizationSNeeds: 'Naš tim AI eksperata u Bloomteq-u može vam pomoći da razvijete sveobuhvatnu strategiju i plan implementacije prilagođen potrebama vaše organizacije.',
    scheduleAConsultation: 'Zakažite Konsultaciju',
    whatThisMeans: 'Šta Ovo Znači',
    nextSteps: 'Sljedeći Koraci',
    createAnActionPlanBasedOnYourAssessmentResults: 'Kreirajte akcioni plan na osnovu rezultata vaše procjene',
    shareFindingsWithKeyStakeholders: 'Podijelite nalaze s ključnim ljudima',
    scheduleAFollowUpAssessmentInSixMonths: 'Zakažite naknadnu procjenu za šest mjeseci',
    
    // Footer
    footer: {
      poweredBy: 'Pokreće',
      privacyPolicy: 'Politika Privatnosti',
      termsOfService: 'Uslovi Korištenja',
      contact: 'Kontaktirajte Nas'
    },
    
    // Maturity levels
    maturityLevels: {
      Initial: 'Početni stadij',
      Developing: 'U razvojnom stadiju',
      Defined: 'Definisan stadij',
      Managed: 'Dobro kontroliran stadij',
      Advanced: 'Napredan stadij',
      Leading: 'Vodeći stadij u industriji'
    }
  }
};

export type Language = 'en' | 'bs';
export type TranslationKey = keyof typeof translations.en; 