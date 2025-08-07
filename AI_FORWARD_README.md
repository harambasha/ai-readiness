# AI FORWARD - AI Readiness Questionnaire for BiH SMEs

## 🎯 Project Overview

**AI FORWARD** is a specialized AI readiness questionnaire designed specifically for export-oriented small and medium enterprises (SMEs) in Bosnia and Herzegovina. This project is part of the "AI FORWARD" initiative by Inovacioni centar Banja Luka and Ilyria Tech Group Sarajevo.

## 🟩 Key Differences from Main Version

- **New Questions**: Sections A–F tailored for the AI FORWARD project
- **Bosnian Language**: All questions and content in Bosnian
- **EU Export Focus**: Emphasis on EU export readiness and compliance
- **Gender-Inclusive**: Special focus on women-led SMEs
- **EU ESG Compliance**: Questions about Environmental, Social, and Governance requirements
- **Localized Content**: Landing page and emails specifically for BiH context

## 📋 Questionnaire Sections

### Section A: Basic Information
- Company name and contact details
- Company size classification
- EU export status
- Women-led business identification

### Section B: Current AI Usage
- AI implementation status
- AI applications in use
- Benefits experienced from AI

### Section C: Training and Skills
- AI training needs assessment
- Required training areas
- Current team AI knowledge level

### Section D: Barriers and Challenges
- Implementation obstacles
- Investment readiness
- Resource constraints

### Section E: EU ESG Compliance
- ESG awareness level
- Current ESG practices
- Compliance readiness

### Section F: Future Plans and Feedback
- Planned AI initiatives
- Project expectations
- Additional feedback

## 🚀 Deployment

### Branch: `ai-forward-bih`
### Subdomain: `ai-forward`

### Prerequisites
- Node.js 18+
- Netlify account
- SendGrid API key

### Environment Variables
```env
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=your_from_email@domain.com
ADMIN_EMAIL=admin@domain.com
```

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Netlify Deployment
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables
5. Deploy to `ai-forward` subdomain

## 📧 Email Templates

### Confirmation Email (Respondent)
- Personalized thank you message
- Project information
- Next steps notification
- AI FORWARD branding

### Notification Email (Admin)
- Summary of key responses
- Complete form data
- Highlighted important fields (EU export, women-led, AI usage)
- Professional formatting

## 🛠 Technical Implementation

### Components
- `AIForwardWizard`: Main questionnaire flow
- `AIForwardWelcomeStep`: Landing page
- `AIForwardQuestionStep`: Individual question rendering
- `AIForwardSuccessStep`: Confirmation page
- `Likert`: 1-5 scale component

### Data Structure
```typescript
interface AIForwardQuestion {
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
```

### API Endpoint
- **Function**: `ai-forward-submit.ts`
- **Method**: POST
- **Path**: `/api/ai-forward-submit`
- **Features**: Email notifications, data validation, error handling

## 📊 Form Logic

### Required Fields
- Q6: EU export status
- Q9: AI usage status
- All basic information fields

### Validation Rules
- Email format validation
- Required field validation
- Multiple choice minimum selection
- Likert scale range validation

### "Other" Options
- All multiple-choice questions include "Ostalo" option
- Free-text field for specification
- Proper validation and handling

## 🎨 Design Features

### Branding
- AI FORWARD logo and colors
- Professional gradient backgrounds
- Responsive design
- Mobile-friendly interface

### User Experience
- Progress indicator
- Clear navigation
- Form validation feedback
- Loading states
- Error handling

## 📈 Analytics & Tracking

### Data Collection
- Form submission timestamps
- Company information
- AI readiness indicators
- Training needs assessment
- Barrier identification

### Reporting
- Admin dashboard access
- Email notifications
- Data export capabilities
- Trend analysis potential

## 🔒 Security & Privacy

### Data Protection
- Secure form submission
- Email encryption
- No data storage on client
- GDPR compliance considerations

### Access Control
- Admin email notifications
- Secure API endpoints
- Input validation
- Error logging

## 📞 Support

### Technical Support
- Development team contact
- Bug reporting process
- Feature requests
- Documentation updates

### Project Partners
- **Inovacioni centar Banja Luka**: Project coordination
- **Ilyria Tech Group Sarajevo**: Technical implementation

## 🔄 Maintenance

### Regular Updates
- Question content updates
- Email template modifications
- UI/UX improvements
- Security patches

### Monitoring
- Form submission rates
- Error tracking
- Performance monitoring
- User feedback collection

---

**Note**: This is a separate deployment from the main AI readiness assessment. The main version remains unchanged on the `main` branch, while this specialized version runs on the `ai-forward-bih` branch and `ai-forward` subdomain. 