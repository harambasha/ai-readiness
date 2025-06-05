import { testSendGridConnection, sendAssessmentResults } from '../services/emailService';

async function runEmailTests() {
  console.log('🧪 Starting email tests...\n');

  // Test 1: Verify SendGrid connection
  console.log('Test 1: Verifying SendGrid connection...');
  const connectionTest = await testSendGridConnection();
  console.log(connectionTest ? '✅ Connection test passed' : '❌ Connection test failed');
  console.log('----------------------------------------\n');

  // Test 2: Send a real assessment result
  console.log('Test 2: Sending assessment results...');
  const assessmentTest = await sendAssessmentResults({
    to: 'test@example.com', // Replace with your test email
    answers: [
      {
        questionId: 'test-question-1',
        optionId: 'test-option-1',
        score: 75
      },
      {
        questionId: 'test-question-2',
        textValue: 'Test response',
        score: 80
      }
    ],
    score: 77.5,
    maturityLevel: 'Advanced'
  });
  console.log(assessmentTest ? '✅ Assessment email test passed' : '❌ Assessment email test failed');
}

// Run the tests
runEmailTests().catch(console.error); 