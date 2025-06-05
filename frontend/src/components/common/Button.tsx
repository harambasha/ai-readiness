import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'SM' | 'MD' | 'LG' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'MD',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200';
  
  const variantStyles = {
    primary: 'bg-[#677076] text-white hover:bg-[#4A4F52]',
    secondary: 'bg-[#E7E9EC] text-[#2E363C] hover:bg-[#DCE0E3]',
    outline: 'border-2 border-[#677076] text-[#677076] hover:bg-[#677076] hover:text-white'
  };

  const sizeStyles = {
    'SM': 'px-4 py-2 text-sm rounded-lg',
    'MD': 'px-6 py-3 text-base rounded-lg',
    'LG': 'px-8 py-4 text-lg rounded-lg',
    'lg': 'px-8 py-4 text-lg rounded-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className="mr-2" size={size === 'SM' ? 16 : size === 'MD' ? 20 : 24} />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon className="ml-2" size={size === 'SM' ? 16 : size === 'MD' ? 20 : 24} />
      )}
    </button>
  );
} 