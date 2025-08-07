import React from 'react';
import { ArrowRight, Sparkles, Brain, Database, Shield, Users, Clock, Zap, Target } from 'lucide-react';
import { AIForwardButton } from './AIForwardButton';
import { aiForwardTranslations } from '../../config/aiForwardTranslations';

interface AIForwardWelcomeStepProps {
  onStart: () => void;
}

export function AIForwardWelcomeStep({ onStart }: AIForwardWelcomeStepProps) {
  const t = aiForwardTranslations;
  
  return (
    <div className="relative overflow-hidden">
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[800px] h-[800px] top-[-400px] right-[-400px] rounded-full bg-[#677076]/5 blur-3xl"></div>
          <div className="absolute w-[600px] h-[600px] bottom-[-300px] left-[-300px] rounded-full bg-[#B4926E]/5 blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="absolute top-8 left-8 z-20">
            <img src="/bloomteq-logo.svg" alt="Bloomteq Logo" className="h-8 w-auto" />
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#F5F6FA] mb-8">
                <Sparkles className="w-4 h-4 mr-2 text-[#B4926E]" />
                <span className="text-sm font-medium text-[#2E363C]">AI FORWARD projekat</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
                AI FORWARD upitnik <span className="text-gray-500">AI spremnosti</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed">
                {t.welcome.description}
              </p>
              <AIForwardButton
                size="lg" 
                icon={ArrowRight} 
                iconPosition="right" 
                onClick={onStart}
                className="w-full sm:w-auto"
              >
                {t.navigation.start}
              </AIForwardButton>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#F5F6FA] flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#B4926E] stroke-[#000000]" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Brzo</div>
                    <div className="text-sm text-gray-500">5-10 minuta</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#F5F6FA] flex items-center justify-center">
                    <Zap className="w-6 h-6 text-[#B4926E] stroke-[#000000]" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Besplatno</div>
                    <div className="text-sm text-gray-500">Bez troškova</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#F5F6FA] flex items-center justify-center">
                    <Target className="w-6 h-6 text-[#B4926E] stroke-[#000000]" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Ciljano</div>
                    <div className="text-sm text-gray-500">Prilagođeno MSP</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full lg:w-1/2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#677076]/10 to-[#B4926E]/10 blur-3xl"></div>
              <img
                src="/hero-image.svg"
                alt="AI FORWARD"
                className="relative w-full max-w-[600px] mx-auto"
                onError={(e) => {
                  console.error('Error loading hero image:', e);
                  const img = e.target as HTMLImageElement;
                  console.log('Failed image src:', img.src);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Assessment Areas */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">O AI FORWARD projektu</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Inovacioni centar Banja Luka & Bloomteq Sarajevo
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 transform transition-transform group-hover:scale-[1.02]"></div>
              <div className="relative glass-card p-6 sm:p-8 h-full">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-[#677076] flex items-center justify-center mb-4 sm:mb-6">
                  <Brain className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Inovacioni centar Banja Luka</h3>
                <p className="text-gray-600 mb-4 sm:mb-6">Vodeći centar za inovacije i podršku MSP u Bosni i Hercegovini</p>
                <p className="text-gray-500 text-sm sm:text-base">Specijalizovani za podršku malim i srednjim preduzećima u procesu digitalne transformacije i implementacije AI tehnologija.</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 transform transition-transform group-hover:scale-[1.02]"></div>
              <div className="relative glass-card p-6 sm:p-8 h-full">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-[#677076] flex items-center justify-center mb-4 sm:mb-6">
                  <Database className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Bloomteq Sarajevo</h3>
                <p className="text-gray-600 mb-4 sm:mb-6">Eksperti za AI i digitalnu transformaciju</p>
                <p className="text-gray-500 text-sm sm:text-base">Tim stručnjaka sa dugogodišnjim iskustvom u razvoju i implementaciji AI rješenja za poslovne potrebe.</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 transform transition-transform group-hover:scale-[1.02]"></div>
              <div className="relative glass-card p-6 sm:p-8 h-full">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-[#677076] flex items-center justify-center mb-4 sm:mb-6">
                  <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Cilj projekta</h3>
                <p className="text-gray-600 mb-4 sm:mb-6">Podsticanje ekonomskog rasta i otpornosti tržišta</p>
                <p className="text-gray-500 text-sm sm:text-base">Povećanje pismenosti u oblasti umjetne inteligencije u izvozno orijentisanim MSP, s posebnim fokusom na podršku preduzećima koja vode žene.</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 transform transition-transform group-hover:scale-[1.02]"></div>
              <div className="relative glass-card p-6 sm:p-8 h-full">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-[#677076] flex items-center justify-center mb-4 sm:mb-6">
                  <Users className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Vaša korist</h3>
                <p className="text-gray-600 mb-4 sm:mb-6">Prilagođene obuke i AI rješenja</p>
                <p className="text-gray-500 text-sm sm:text-base">Vaši odgovori pomoći će nam da dizajniramo prilagođene obuke, savjetodavne usluge i AI rješenja kako bi se unaprijedila primjena vještačke inteligencije među MSP.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 