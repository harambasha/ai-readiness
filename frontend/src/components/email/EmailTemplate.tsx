import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface EmailTemplateProps {
  result: {
    percentage: number;
    maturityLevel: string;
    score: number;
    maxScore: number;
  };
  answers: Array<{
    question: string;
    answer: string;
  }>;
}

export function EmailTemplate({ result, answers }: EmailTemplateProps) {
  const { t } = useLanguage();
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#2E363C', margin: '0', fontSize: '24px' }}>
          {t('email.subject')}
        </h1>
      </div>
      
      <div style={{ padding: '20px' }}>
        <p style={{ color: '#687177', fontSize: '16px', lineHeight: '1.5' }}>
          {t('email.greeting')}
        </p>
        
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #E7E9EC', borderRadius: '8px', padding: '20px', margin: '20px 0' }}>
          <h2 style={{ color: '#2E363C', margin: '0 0 15px 0', fontSize: '20px' }}>
            {t('results.overallScore')}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#677076' }}>
              {Math.round(result.percentage)}%
            </span>
            <span style={{ fontSize: '18px', fontWeight: 'semibold', color: '#677076' }}>
              {result.maturityLevel}
            </span>
          </div>
          <div style={{ marginTop: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#687177', marginBottom: '5px' }}>
              <span>{t('results.overallScore')}</span>
              <span>{result.score} / {result.maxScore}</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#E7E9EC', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${result.percentage}%`,
                  height: '100%',
                  backgroundColor: '#677076',
                  transition: 'width 0.5s ease'
                }}
              />
            </div>
          </div>
        </div>
        
        <h3 style={{ color: '#2E363C', margin: '30px 0 15px 0', fontSize: '18px' }}>
          {t('email.yourAnswers')}
        </h3>
        
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #E7E9EC', borderRadius: '8px', padding: '20px' }}>
          {answers.map((item, index) => (
            <div key={index} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: index < answers.length - 1 ? '1px solid #E7E9EC' : 'none' }}>
              <h4 style={{ color: '#2E363C', margin: '0 0 10px 0', fontSize: '16px', fontWeight: 'semibold' }}>
                {item.question}
              </h4>
              <p style={{ color: '#687177', margin: '0', fontSize: '14px' }}>
                {item.answer}
              </p>
            </div>
          ))}
        </div>
        
        <div style={{ backgroundColor: '#f8f9fa', border: '1px solid #E7E9EC', borderRadius: '8px', padding: '20px', margin: '20px 0' }}>
          <h3 style={{ color: '#2E363C', margin: '0 0 15px 0', fontSize: '18px' }}>
            {t('results.recommendations')}
          </h3>
          <ul style={{ color: '#687177', fontSize: '14px', lineHeight: '1.6', margin: '0', paddingLeft: '20px' }}>
            <li>{t('email.recommendations.data')}</li>
            <li>{t('email.recommendations.technology')}</li>
            <li>{t('email.recommendations.people')}</li>
            <li>{t('email.recommendations.strategy')}</li>
          </ul>
        </div>
        
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a
            href="#"
            style={{
              display: 'inline-block',
              backgroundColor: '#677076',
              color: '#ffffff',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 'semibold',
              fontSize: '16px'
            }}
          >
            {t('email.cta')}
          </a>
        </div>
        
        <p style={{ color: '#687177', fontSize: '14px', lineHeight: '1.5', textAlign: 'center' }}>
          {t('email.footer')}
        </p>
      </div>
    </div>
  );
} 