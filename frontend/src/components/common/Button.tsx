import React from 'react';
import { LucideIcon } from 'lucide-react';
import { BUTTON_VARIANTS, BUTTON_SIZES } from '../../constants/ui';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: keyof typeof BUTTON_VARIANTS;
  size?: keyof typeof BUTTON_SIZES;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'PRIMARY',
  size = 'MD',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-0';
  
  const variantStyles = [
    BUTTON_VARIANTS[variant].background,
    BUTTON_VARIANTS[variant].text,
    BUTTON_VARIANTS[variant].hover,
    variant !== 'PRIMARY' && BUTTON_VARIANTS[variant].border
  ].filter(Boolean).join(' ');

  const sizeStyles = [
    BUTTON_SIZES[size].padding,
    BUTTON_SIZES[size].text
  ].join(' ');

  const classes = [
    baseStyles,
    variantStyles,
    sizeStyles,
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon className={`${BUTTON_SIZES[size].icon} mr-2`} />
          )}
          {children}
          {Icon && iconPosition === 'right' && (
            <Icon className={`${BUTTON_SIZES[size].icon} ml-2`} />
          )}
        </>
      )}
    </button>
  );
} 