import React from 'react';
import { CheckCircle } from 'lucide-react';
import { aiForwardTranslations } from '../../config/aiForwardTranslations';

export function AIForwardSuccessStep() {
  const t = aiForwardTranslations;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sm:p-12">
          {/* Header */}
          <div className="flex items-center justify-center mb-8">
            <img src="/bloomteq-logo.svg" alt="Bloomteq Logo" className="h-8 w-auto" />
          </div>

          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          {/* Content */}
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2E363C] mb-6">
            {t.success.title}
          </h1>
          
          <p className="text-lg text-[#687177] mb-8 leading-relaxed">
            {t.success.message}
          </p>

          <div className="bg-[#F5F6FA] rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-[#2E363C] mb-4">Šta slijedi?</h3>
            <ul className="text-left space-y-3 text-[#687177]">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#B4926E] rounded-full mt-2 flex-shrink-0"></div>
                <span>Naš tim će analizirati vaše odgovore i prilagoditi preporuke vašim specifičnim potrebama</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#B4926E] rounded-full mt-2 flex-shrink-0"></div>
                <span>Kontaktiraćemo vas sa detaljnim izvještajem i konkretnim koracima za implementaciju AI rješenja</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#B4926E] rounded-full mt-2 flex-shrink-0"></div>
                <span>Ponudićemo vam pristup obukama i savjetodavnim uslugama kroz AI FORWARD projekat</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-[#687177]">
            {t.success.contact}
          </p>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#687177]">
              <div>
                <h4 className="font-semibold text-[#2E363C] mb-2">Inovacioni centar Banja Luka</h4>
                <p>Vodeći centar za inovacije i podršku MSP</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#2E363C] mb-2">Bloomteq</h4>
                <p>Eksperti za AI i digitalnu transformaciju</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 