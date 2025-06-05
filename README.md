# AI Readiness Assessment Tool

A comprehensive web application that helps organizations evaluate their readiness for AI implementation. The tool provides a structured assessment across multiple dimensions and delivers personalized recommendations.

## Features

- **Interactive Assessment**: 10-minute questionnaire covering key AI readiness areas
- **Real-time Scoring**: Immediate feedback on AI maturity level
- **Detailed Results**: Comprehensive breakdown of strengths and areas for improvement
- **Email Reports**: Automated delivery of assessment results
- **Consultation Booking**: Direct integration with Calendly for expert consultations

## Assessment Areas

1. **Strategic Vision**
   - AI strategy alignment with business goals
   - Market positioning and long-term growth plans
   - Investment priorities and strategic partnerships

2. **Data Readiness**
   - Data collection and storage capabilities
   - Data quality and governance
   - Security measures and infrastructure maturity

3. **Governance & Ethics**
   - AI policies and ethical frameworks
   - Compliance and risk management
   - Bias, privacy, and transparency practices

4. **Team Capability**
   - AI talent and skills assessment
   - Training and development programs
   - Cultural readiness for AI implementation

## Technical Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Email Service**: SendGrid
- **Scheduling**: Calendly Integration
- **Icons**: Lucide React

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd ai-readiness
   ```

2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the frontend directory with:
   ```
   VITE_SENDGRID_API_KEY=your_sendgrid_api_key
   VITE_CALENDLY_URL=your_calendly_url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── assessment/
│   │   ├── Wizard.tsx
│   │   └── ...
│   ├── context/
│   │   └── WizardContext.tsx
│   ├── data/
│   │   └── questions.ts
│   ├── services/
│   │   └── emailService.ts
│   ├── types/
│   │   └── index.ts
│   └── config/
│       └── constants.ts
```

## Email Configuration

The application uses SendGrid for email delivery. Configure your SendGrid API key in the environment variables to enable email functionality.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[Your License Here]

## Support

For support, email [support@bloomteq.com] or visit [https://bloomteq.com]

## AWS Deployment

### Prerequisites
- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Node.js and npm installed

### Deployment Steps

1. **Build the Application**
   ```bash
   cd frontend
   npm run build
   ```

2. **AWS Services Setup**

   a. **S3 Bucket Setup**
   ```bash
   # Create S3 bucket for static hosting
   aws s3 mb s3://your-ai-readiness-app
   
   # Enable static website hosting
   aws s3 website s3://your-ai-readiness-app --index-document index.html --error-document index.html
   ```

   b. **CloudFront Distribution**
   - Create a CloudFront distribution pointing to your S3 bucket
   - Configure custom domain (if applicable)
   - Enable HTTPS

   c. **Route 53 (Optional)**
   - Create hosted zone for your domain
   - Add A record pointing to CloudFront distribution

3. **Environment Configuration**
   Create a `.env.production` file:
   ```
   VITE_SENDGRID_API_KEY=your_production_sendgrid_key
   VITE_CALENDLY_URL=your_production_calendly_url
   VITE_API_URL=your_api_endpoint
   ```

4. **Deploy to S3**
   ```bash
   # Upload build files to S3
   aws s3 sync dist/ s3://your-ai-readiness-app --delete
   ```

5. **CloudFront Cache Invalidation**
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
   ```

### AWS Infrastructure (Terraform)

The project includes Terraform configurations for infrastructure as code. To deploy:

1. **Initialize Terraform**
   ```bash
   cd terraform
   terraform init
   ```

2. **Review and Apply**
   ```bash
   terraform plan
   terraform apply
   ```

### Monitoring and Maintenance

- Set up CloudWatch alarms for monitoring
- Configure S3 bucket versioning
- Enable CloudFront logging
- Set up AWS WAF for security

### Security Considerations

- Enable HTTPS everywhere
- Configure CORS policies
- Set up AWS WAF rules
- Implement proper IAM roles
- Enable AWS Shield for DDoS protection 