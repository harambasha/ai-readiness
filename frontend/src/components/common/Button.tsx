import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = ''
}: ButtonProps) {
  const { t } = useLanguage();
  
  // Check if children is a translation key (string that starts with a letter and contains dots)
  const isTranslationKey = typeof children === 'string' && /^[a-zA-Z][a-zA-Z0-9.]*$/.test(children);
  const buttonText = isTranslationKey ? t(children) : children;
  
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-[#677076] text-white hover:bg-[#5A6369] focus:ring-[#677076]',
    secondary: 'bg-white text-[#2E363C] border-2 border-[#E7E9EC] hover:border-[#677076] hover:shadow-md focus:ring-[#677076]',
    outline: 'bg-transparent text-[#677076] border-2 border-[#677076] hover:bg-[#677076] hover:text-white focus:ring-[#677076]'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const iconClasses = Icon ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : '';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${iconClasses} ${className}`}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
      {buttonText}
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
    </button>
  );
} 