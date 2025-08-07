import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { aiForwardTranslations } from '../../config/aiForwardTranslations';

interface AIForwardWelcomeStepProps {
  onStart: () => void;
}

export function AIForwardWelcomeStep({ onStart }: AIForwardWelcomeStepProps) {
  const t = aiForwardTranslations;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative overflow-hidden">
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[800px] h-[800px] top-[-400px] right-[-400px] rounded-full bg-blue-500/5 blur-3xl"></div>
            <div className="absolute w-[600px] h-[600px] bottom-[-300px] left-[-300px] rounded-full bg-purple-500/5 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
            <div className="absolute top-8 left-8 z-20">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="text-xl font-bold text-gray-900">FORWARD</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="w-full lg:w-1/2">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 mb-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-blue-600">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                    <path d="M5 3v4"></path>
                    <path d="M19 17v4"></path>
                    <path d="M3 5h4"></path>
                    <path d="M17 19h4"></path>
                  </svg>
                  <span className="text-sm font-medium text-blue-600">AI FORWARD projekat</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
                  {t.welcome.title}
                </h1>

                <div className="space-y-6 text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed">
                  <p>{t.welcome.description}</p>
                  <p>{t.welcome.projectGoal}</p>
                  <p>{t.welcome.purpose}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-lg font-medium text-gray-700">{t.welcome.timeEstimate}</p>
                  <p className="text-lg font-medium text-gray-700">{t.welcome.instruction}</p>
                </div>

                <Button 
                  size="lg" 
                  icon={ArrowRight} 
                  iconPosition="right" 
                  onClick={onStart}
                  className="w-full sm:w-auto"
                >
                  {t.navigation.start}
                </Button>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Brzo</div>
                      <div className="text-sm text-gray-500">5-10 minuta</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 flex items-center justify-center rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-green-600">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Besplatno</div>
                      <div className="text-sm text-gray-500">Bez troškova</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 flex items-center justify-center rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-purple-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="6"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Ciljano</div>
                      <div className="text-sm text-gray-500">Prilagođeno MSP</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative w-full lg:w-1/2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M9 12l2 2 4-4"></path>
                        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Izvozno orijentisana MSP</h3>
                    <p className="text-gray-600">Poseban fokus na podršku preduzećima koja vode žene</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">O AI FORWARD projektu</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Inovacioni centar Banja Luka & Ilyria Tech Group Sarajevo
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-3">Inovacioni centar Banja Luka</h3>
              <p className="text-gray-600">Vodeći centar za inovacije i podršku MSP u Bosni i Hercegovini</p>
            </div>
            
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-3">Ilyria Tech Group Sarajevo</h3>
              <p className="text-gray-600">Eksperti za AI i digitalnu transformaciju</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 