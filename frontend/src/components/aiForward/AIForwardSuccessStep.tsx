import React from 'react';
import { CheckCircle } from 'lucide-react';
import { aiForwardTranslations } from '../../config/aiForwardTranslations';

export function AIForwardSuccessStep() {
  const t = aiForwardTranslations;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sm:p-12">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            {t.success.title}
          </h1>

          <h2 className="text-xl text-gray-600 mb-8">
            {t.success.subtitle}
          </h2>

          <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-8">
            <p>{t.success.message}</p>
            <p>{t.success.nextSteps}</p>
          </div>

          {/* Signature */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-gray-600 whitespace-pre-line">
              {t.success.signature}
            </p>
          </div>

          {/* AI FORWARD Logo */}
          <div className="mt-8 flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold text-gray-900">FORWARD</span>
          </div>

          {/* Project Partners */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Projekat implementiraju:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8">
              <div className="text-center">
                <p className="font-semibold text-gray-900">Inovacioni centar Banja Luka</p>
                <p className="text-sm text-gray-500">Vodeći centar za inovacije</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900">Ilyria Tech Group Sarajevo</p>
                <p className="text-sm text-gray-500">AI eksperti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 