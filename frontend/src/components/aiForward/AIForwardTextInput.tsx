import React from 'react';

interface AIForwardTextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export function AIForwardTextInput({
  value,
  onChange,
  placeholder = 'Unesite vaš odgovor...',
  required = false
}: AIForwardTextInputProps) {
  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-32 p-4 border-2 border-[#E7E9EC] rounded-lg focus:outline-none focus:border-[#B4926E] resize-none"
        required={required}
      />
      
      {/* Required Field Notice */}
      {required && !value.trim() && (
        <p className="text-sm text-red-600">Molimo unesite odgovor</p>
      )}
    </div>
  );
} 