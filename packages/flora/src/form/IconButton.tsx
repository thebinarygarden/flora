'use client';
import * as React from 'react';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label?: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'error'
    | 'success'
    | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  variant = 'primary',
  size = 'md',
  showLabel = true,
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      case 'md':
      default:
        return 'px-4 py-2';
    }
  };

  const getVariantStyles = () => {
    if (props.disabled) {
      return {
        backgroundColor: 'var(--disabled)',
        color: 'var(--on-disabled)',
        cursor: 'not-allowed',
        border: 'none',
      };
    }

    const baseStyles = {
      border: isHovered ? 'none' : '1px solid var(--border)',
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          backgroundColor: isHovered ? 'var(--primary)' : 'var(--surface)',
          color: isHovered ? 'var(--on-primary)' : 'var(--primary)',
        };
      case 'secondary':
        return {
          ...baseStyles,
          backgroundColor: isHovered ? 'var(--secondary)' : 'var(--surface)',
          color: isHovered ? 'var(--on-secondary)' : 'var(--secondary)',
        };
      case 'tertiary':
        return {
          ...baseStyles,
          backgroundColor: isHovered ? 'var(--tertiary)' : 'var(--surface)',
          color: isHovered ? 'var(--on-tertiary)' : 'var(--tertiary)',
        };
      case 'error':
        return {
          ...baseStyles,
          backgroundColor: isHovered ? 'var(--error)' : 'var(--surface)',
          color: isHovered ? 'var(--on-error)' : 'var(--error)',
        };
      case 'success':
        return {
          ...baseStyles,
          backgroundColor: isHovered ? 'var(--success)' : 'var(--surface)',
          color: isHovered ? 'var(--on-success)' : 'var(--success)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--primary)',
          border: `1px solid var(--border)`,
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: isHovered ? 'var(--primary)' : 'var(--surface)',
          color: isHovered ? 'var(--on-primary)' : 'var(--primary)',
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <button
      className={`cursor-pointer flex items-center gap-2 rounded-lg transition-all duration-200 font-medium ${sizeStyles} ${className}`}
      style={variantStyles}
      onMouseEnter={() => !props.disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={props.disabled}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {showLabel && label && <span>{label}</span>}
    </button>
  );
};

export default IconButton;
