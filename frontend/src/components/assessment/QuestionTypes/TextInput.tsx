import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'tel';
}

export function TextInput({ 
  value, 
  onChange, 
  placeholder = "Unesite vaš odgovor...", 
  required = false,
  type = 'text'
}: TextInputProps) {
  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        rows={4}
        style={{ minHeight: '120px' }}
      />
      {required && (
        <p className="text-sm text-gray-500">* Obavezno polje</p>
      )}
    </div>
  );
} 