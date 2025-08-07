export interface AIForwardQuestion {
  id: string;
  type: 'multiple-choice' | 'text' | 'likert' | 'yes-no';
  text: string;
  description?: string;
  options?: string[];
  required?: boolean;
  hasOther?: boolean;
  likertLabels?: {
    min: string;
    max: string;
  };
}

export const aiForwardQuestions: AIForwardQuestion[] = [
  // Section A: Basic Information
  {
    id: 'company-name',
    type: 'text',
    text: 'Naziv vašeg preduzeća',
    description: 'Molimo unesite puni naziv vašeg preduzeća',
    required: true
  },
  {
    id: 'contact-person',
    type: 'text',
    text: 'Ime i prezime kontakt osobe',
    description: 'Osoba koja će biti glavni kontakt za AI FORWARD projekat',
    required: true
  },
  {
    id: 'email',
    type: 'text',
    text: 'Email adresa',
    description: 'Vaša email adresa za komunikaciju',
    required: true
  },
  {
    id: 'phone',
    type: 'text',
    text: 'Broj telefona',
    description: 'Vaš kontakt broj telefona',
    required: true
  },
  {
    id: 'company-size',
    type: 'multiple-choice',
    text: 'Broj zaposlenih u vašem preduzeću',
    description: 'Odaberite kategoriju koja najbolje opisuje veličinu vašeg preduzeća',
    options: [
      '1-10 zaposlenih',
      '11-50 zaposlenih',
      '51-250 zaposlenih',
      'Preko 250 zaposlenih'
    ],
    required: true,
    hasOther: true
  },
  {
    id: 'eu-export',
    type: 'yes-no',
    text: 'Da li vaše preduzeće izvozi proizvode ili usluge u EU?',
    description: 'Ovo pitanje je ključno za AI FORWARD projekat jer se fokusira na izvozno orijentisana preduzeća',
    required: true
  },
  {
    id: 'export-markets',
    type: 'multiple-choice',
    text: 'U koje EU zemlje izvozite?',
    description: 'Odaberite sve zemlje u koje izvozite (možete odabrati više opcija)',
    options: [
      'Njemačka',
      'Austrija',
      'Italija',
      'Slovenija',
      'Hrvatska',
      'Mađarska',
      'Češka',
      'Poljska',
      'Nizozemska',
      'Belgija',
      'Francuska',
      'Španija',
      'Ostale EU zemlje'
    ],
    hasOther: true
  },
  {
    id: 'women-led',
    type: 'yes-no',
    text: 'Da li je vaše preduzeće vođeno od strane žene?',
    description: 'AI FORWARD projekat posebno podržava preduzeća koja vode žene',
    required: true
  },

  // Section B: Current AI Usage
  {
    id: 'ai-usage',
    type: 'yes-no',
    text: 'Da li vaše preduzeće trenutno koristi neke oblike vještačke inteligencije?',
    description: 'Ovo uključuje chatbotove, automatizaciju, analitiku podataka, itd.',
    required: true
  },
  {
    id: 'ai-applications',
    type: 'multiple-choice',
    text: 'Koje AI aplikacije koristite?',
    description: 'Odaberite sve opcije koje se odnose na vaše preduzeće',
    options: [
      'Chatbotovi za korisničku podršku',
      'Automatizacija procesa',
      'Analitika podataka',
      'Prediktivna analitika',
      'Obrazovanje i trening',
      'Kontrola kvaliteta',
      'Upravljanje zalihama',
      'Digitalni marketing',
      'Finansijska analitika',
      'Ne koristimo AI'
    ],
    hasOther: true
  },
  {
    id: 'ai-benefits',
    type: 'multiple-choice',
    text: 'Koje koristi ste primijetili od korištenja AI?',
    description: 'Odaberite sve koristi koje ste doživjeli',
    options: [
      'Povećanje produktivnosti',
      'Smanjenje troškova',
      'Poboljšanje kvaliteta',
      'Brže donošenje odluka',
      'Bolja korisnička iskustva',
      'Povećanje prodaje',
      'Smanjenje grešaka',
      'Još nismo vidjeli značajne koristi'
    ],
    hasOther: true
  },

  // Section C: Training and Skills
  {
    id: 'ai-training-need',
    type: 'likert',
    text: 'Koliko vam je potrebna obuka o vještačkoj inteligenciji?',
    description: 'Ocijenite koliko vam je potrebna obuka na skali od 1 do 5',
    likertLabels: {
      min: 'Uopšte nam nije potrebna',
      max: 'Veoma nam je potrebna'
    },
    required: true
  },
  {
    id: 'training-areas',
    type: 'multiple-choice',
    text: 'U kojim oblastima vam je potrebna obuka?',
    description: 'Odaberite sve oblasti koje vas interesuju',
    options: [
      'Osnove vještačke inteligencije',
      'AI strategija i implementacija',
      'Analitika podataka',
      'Automatizacija procesa',
      'AI u marketingu',
      'AI u proizvodnji',
      'AI u finansijama',
      'Etika i regulativa AI',
      'AI alati i platforme',
      'Upravljanje AI projektima'
    ],
    hasOther: true
  },
  {
    id: 'current-ai-knowledge',
    type: 'likert',
    text: 'Kako ocijenjujete trenutno znanje vašeg tima o AI?',
    description: 'Ocijenite na skali od 1 do 5',
    likertLabels: {
      min: 'Početni nivo',
      max: 'Napredni nivo'
    },
    required: true
  },

  // Section D: Barriers and Challenges
  {
    id: 'ai-barriers',
    type: 'multiple-choice',
    text: 'Koje su glavne prepreke za implementaciju AI u vašem preduzeću?',
    description: 'Odaberite sve prepreke koje se odnose na vaše preduzeće',
    options: [
      'Nedostatak finansijskih sredstava',
      'Nedostatak stručnog kadra',
      'Nedostatak podataka',
      'Nedostatak tehničke infrastrukture',
      'Nepoznavanje AI mogućnosti',
      'Otpor prema promjenama',
      'Sigurnosni i pravni aspekti',
      'Nedostatak vremena',
      'Nedostatak jasne strategije',
      'Nema prepreka'
    ],
    hasOther: true
  },
  {
    id: 'investment-readiness',
    type: 'likert',
    text: 'Koliko ste spremni da investirate u AI rješenja?',
    description: 'Ocijenite na skali od 1 do 5',
    likertLabels: {
      min: 'Nismo spremni',
      max: 'Veoma smo spremni'
    },
    required: true
  },

  // Section E: EU ESG Compliance
  {
    id: 'esg-awareness',
    type: 'likert',
    text: 'Koliko ste upoznati sa EU ESG (Environmental, Social, Governance) zahtjevima?',
    description: 'Ocijenite na skali od 1 do 5',
    likertLabels: {
      min: 'Nismo upoznati',
      max: 'Veoma smo upoznati'
    },
    required: true
  },
  {
    id: 'esg-compliance',
    type: 'multiple-choice',
    text: 'Koje ESG prakse već implementirate?',
    description: 'Odaberite sve prakse koje već koristite',
    options: [
      'Mjere za smanjenje ugljeničnog otiska',
      'Obnovljivi izvori energije',
      'Recikliranje i održivo upravljanje otpadom',
      'Diverzitet i inkluzija na radnom mjestu',
      'Sigurnost i zdravlje na radu',
      'Transparentnost u poslovanju',
      'Etika u poslovanju',
      'Angažman sa lokalnom zajednicom',
      'Još nismo implementirali ESG prakse'
    ],
    hasOther: true
  },

  // Section F: Future Plans and Feedback
  {
    id: 'ai-future-plans',
    type: 'multiple-choice',
    text: 'Koje AI inicijative planirate u narednih 12 mjeseci?',
    description: 'Odaberite sve planove koje imate',
    options: [
      'Implementacija AI alata',
      'Obuka tima',
      'Razvoj AI strategije',
      'Partnerstvo sa AI kompanijama',
      'Istraživanje AI mogućnosti',
      'Digitalna transformacija',
      'Još nemamo konkretne planove'
    ],
    hasOther: true
  },
  {
    id: 'ai-forward-expectations',
    type: 'multiple-choice',
    text: 'Šta očekujete od AI FORWARD projekta?',
    description: 'Odaberite sve očekivanja koja imate',
    options: [
      'Besplatne obuke i radionice',
      'Savjetodavne usluge',
      'AI rješenja prilagođena vašim potrebama',
      'Mrežiranje sa drugim preduzećima',
      'Pristup AI ekspertima',
      'Finansijsku podršku',
      'Tehničku podršku',
      'Informacije o EU tendersima'
    ],
    hasOther: true
  },
  {
    id: 'additional-feedback',
    type: 'text',
    text: 'Dodatni komentari ili sugestije',
    description: 'Molimo podijelite bilo kakve dodatne komentare, sugestije ili pitanja koja imate u vezi sa AI FORWARD projektom',
    required: false
  }
]; 