import React from 'react';

interface AIForwardYesNoProps {
  value: string | null;
  onChange: (value: string | null) => void;
  yesLabel?: string;
  noLabel?: string;
  notSureLabel?: string;
  required?: boolean;
}

export function AIForwardYesNo({
  value,
  onChange,
  yesLabel = 'Da',
  noLabel = 'Ne',
  notSureLabel = 'Nisam siguran/a',
  required = false
}: AIForwardYesNoProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => onChange(yesLabel)}
          className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
            value === yesLabel
              ? 'bg-[#677076] text-white transform scale-[1.02]'
              : 'bg-white border-2 border-[#E7E9EC] hover:border-[#B4926E] hover:shadow-md text-[#2E363C]'
          }`}
        >
          <span className="font-medium">{yesLabel}</span>
        </button>

        <button
          onClick={() => onChange(noLabel)}
          className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
            value === noLabel
              ? 'bg-[#677076] text-white transform scale-[1.02]'
              : 'bg-white border-2 border-[#E7E9EC] hover:border-[#B4926E] hover:shadow-md text-[#2E363C]'
          }`}
        >
          <span className="font-medium">{noLabel}</span>
        </button>

        <button
          onClick={() => onChange(notSureLabel)}
          className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
            value === notSureLabel
              ? 'bg-[#677076] text-white transform scale-[1.02]'
              : 'bg-white border-2 border-[#E7E9EC] hover:border-[#B4926E] hover:shadow-md text-[#2E363C]'
          }`}
        >
          <span className="font-medium">{notSureLabel}</span>
        </button>
      </div>

      {/* Required Field Notice */}
      {required && !value && (
        <p className="text-sm text-red-600 text-center">Molimo odaberite jednu opciju</p>
      )}
    </div>
  );
} 