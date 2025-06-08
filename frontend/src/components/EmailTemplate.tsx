import React from 'react';
import { Answer } from '../types';
import { questions } from '../data/questions';
import Image from 'next/image';
import bloomteqLogo from '../assets/bloomteq-logo.svg?url';

interface EmailTemplateProps {
  answers: Answer[];
  score: number;
  maturityLevel: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ answers, score, maturityLevel }) => {
  const getRecommendation = (score: number): string => {
    if (score < 40) return "Your organization is in the early stages of AI readiness. Focus on developing foundational capabilities and building basic AI awareness.";
    if (score < 60) return "You're making progress but there's room for improvement. Prioritize data infrastructure and talent development.";
    if (score < 75) return "You're well on your way! Consider expanding your AI initiatives and strengthening governance frameworks.";
    if (score < 90) return "Strong AI readiness! Focus on optimization and scaling your AI capabilities.";
    return "Exceptional AI readiness! Continue leading innovation and sharing best practices.";
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '2px solid #677076' }}>
        <img 
          src={bloomteqLogo}
          alt="Bloomteq Logo" 
          style={{ height: '40px', marginBottom: '20px' }} 
        />
        <h1 style={{ color: '#677076', fontSize: '24px', margin: '0' }}>AI Readiness Assessment Results</h1>
      </div>

      {/* Score Section */}
      <div style={{ textAlign: 'center', padding: '30px 0', backgroundColor: '#f7f6f4' }}>
        <h2 style={{ color: '#677076', fontSize: '36px', margin: '0 0 10px 0' }}>
          {score.toFixed(1)}%
        </h2>
        <div style={{ 
          display: 'inline-block', 
          backgroundColor: '#fff', 
          padding: '8px 16px', 
          borderRadius: '20px',
          color: '#677076',
          fontSize: '16px'
        }}>
          Maturity Level: {maturityLevel}
        </div>
      </div>

      {/* Recommendation */}
      <div style={{ padding: '20px', backgroundColor: '#fff', margin: '20px 0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#677076', margin: '0 0 10px 0' }}>What This Means</h3>
        <p style={{ color: '#666', lineHeight: '1.6', margin: '0' }}>
          {getRecommendation(score)}
        </p>
      </div>

      {/* Detailed Responses */}
      <div style={{ margin: '20px 0' }}>
        <h3 style={{ color: '#677076', margin: '0 0 20px 0' }}>Your Responses</h3>
        {answers.map((answer, index) => {
          const question = questions.find(q => q.id === answer.questionId);
          if (!question) return null;

          return (
            <div key={index} style={{ 
              padding: '15px', 
              backgroundColor: '#fff', 
              marginBottom: '15px', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h4 style={{ color: '#677076', margin: '0 0 10px 0', fontSize: '16px' }}>
                {question.text}
              </h4>
              <p style={{ color: '#666', margin: '0', lineHeight: '1.6' }}>
                {answer.optionId ? 
                  question.options?.find(opt => opt.id === answer.optionId)?.text :
                  answer.textValue || `Score: ${answer.score}`
                }
              </p>
            </div>
          );
        })}
      </div>

      {/* Next Steps */}
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f7f6f4', 
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <h3 style={{ color: '#677076', margin: '0 0 15px 0' }}>Next Steps</h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: '0', 
          margin: '0',
          color: '#666'
        }}>
          <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
            • Create an action plan based on your assessment results
          </li>
          <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
            • Share findings with key stakeholders
          </li>
          <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
            • Schedule a follow-up assessment in 6 months
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        padding: '20px 0', 
        borderTop: '2px solid #677076',
        color: '#666',
        fontSize: '14px'
      }}>
        <p style={{ margin: '0 0 10px 0' }}>
          Ready to accelerate your AI journey?
        </p>
        <a href="https://bloomteq.com/contact" 
           style={{ 
             display: 'inline-block',
             padding: '12px 24px',
             backgroundColor: '#677076',
             color: '#fff',
             textDecoration: 'none',
             borderRadius: '4px',
             marginTop: '10px'
           }}>
          Schedule a Consultation
        </a>
      </div>
    </div>
  );
}; 