import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface AIForwardMultipleChoiceProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  hasOther?: boolean;
  otherLabel?: string;
  pleaseSpecifyLabel?: string;
  selectAllLabel?: string;
  required?: boolean;
}

export function AIForwardMultipleChoice({
  options,
  value,
  onChange,
  hasOther = false,
  otherLabel = 'Ostalo',
  pleaseSpecifyLabel = 'Molimo specificirajte',
  selectAllLabel = 'Odaberite sve opcije koje se odnose na vas',
  required = false
}: AIForwardMultipleChoiceProps) {
  const [otherValue, setOtherValue] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleOptionToggle = (option: string) => {
    const newValue = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option];
    onChange(newValue);
  };

  const handleOtherToggle = () => {
    if (value.includes(otherLabel)) {
      onChange(value.filter(v => v !== otherLabel));
      setShowOtherInput(false);
      setOtherValue('');
    } else {
      onChange([...value, otherLabel]);
      setShowOtherInput(true);
    }
  };

  const handleOtherInputChange = (inputValue: string) => {
    setOtherValue(inputValue);
    // Update the "other" option with the specified value
    const newValue = value.filter(v => v !== otherLabel);
    if (inputValue.trim()) {
      onChange([...newValue, `${otherLabel}: ${inputValue.trim()}`]);
    } else {
      onChange(newValue);
    }
  };

  const handleSelectAll = () => {
    const allOptions = hasOther ? [...options, otherLabel] : options;
    onChange(allOptions);
    if (hasOther) {
      setShowOtherInput(true);
    }
  };

  const handleDeselectAll = () => {
    onChange([]);
    setShowOtherInput(false);
    setOtherValue('');
  };

  const allSelected = hasOther 
    ? value.length === options.length + 1
    : value.length === options.length;

  return (
    <div className="space-y-4">
      {/* Select All/Deselect All */}
      <div className="flex items-center justify-between p-4 bg-[#F5F6FA] rounded-lg">
        <span className="text-sm font-medium text-[#2E363C]">{selectAllLabel}</span>
        <button
          onClick={allSelected ? handleDeselectAll : handleSelectAll}
          className="text-sm text-[#B4926E] hover:text-[#677076] font-medium"
        >
          {allSelected ? 'Poništi sve' : 'Odaberi sve'}
        </button>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option, index) => (
          <label
            key={index}
            className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
              value.includes(option)
                ? 'border-[#677076] bg-[#677076]/5'
                : 'border-[#E7E9EC] hover:border-[#B4926E] hover:bg-[#F5F6FA]'
            }`}
          >
            <div className="flex-shrink-0 mt-1">
              <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                value.includes(option)
                  ? 'border-[#677076] bg-[#677076]'
                  : 'border-[#E7E9EC]'
              }`}>
                {value.includes(option) && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <span className={`font-medium ${value.includes(option) ? 'text-[#2E363C]' : 'text-[#2E363C]'}`}>
                {option}
              </span>
            </div>
            <input
              type="checkbox"
              checked={value.includes(option)}
              onChange={() => handleOptionToggle(option)}
              className="sr-only"
            />
          </label>
        ))}

        {/* Other Option */}
        {hasOther && (
          <div className="space-y-3">
            <label
              className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                value.some(v => v.startsWith(otherLabel))
                  ? 'border-[#677076] bg-[#677076]/5'
                  : 'border-[#E7E9EC] hover:border-[#B4926E] hover:bg-[#F5F6FA]'
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                  value.some(v => v.startsWith(otherLabel))
                    ? 'border-[#677076] bg-[#677076]'
                    : 'border-[#E7E9EC]'
                }`}>
                  {value.some(v => v.startsWith(otherLabel)) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <span className={`font-medium ${value.some(v => v.startsWith(otherLabel)) ? 'text-[#2E363C]' : 'text-[#2E363C]'}`}>
                  {otherLabel}
                </span>
              </div>
              <input
                type="checkbox"
                checked={value.some(v => v.startsWith(otherLabel))}
                onChange={handleOtherToggle}
                className="sr-only"
              />
            </label>

            {/* Other Input */}
            {showOtherInput && (
              <div className="ml-6">
                <label className="block text-sm font-medium text-[#2E363C] mb-2">
                  {pleaseSpecifyLabel}
                </label>
                <input
                  type="text"
                  value={otherValue}
                  onChange={(e) => handleOtherInputChange(e.target.value)}
                  className="w-full p-3 border-2 border-[#E7E9EC] rounded-lg focus:outline-none focus:border-[#B4926E]"
                  placeholder="Unesite vaš odgovor..."
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Required Field Notice */}
      {required && value.length === 0 && (
        <p className="text-sm text-red-600 mt-2">Molimo odaberite bar jednu opciju</p>
      )}
    </div>
  );
}