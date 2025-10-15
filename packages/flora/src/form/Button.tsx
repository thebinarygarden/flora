'use client';
import * as React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'dashed';
  icon?: React.ReactNode;
  subtitle?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon,
  subtitle,
  className = '',
  ...props
}) => {
  const isDashed = variant === 'dashed';

  const getVariantStyles = () => {
    const baseStyles = props.disabled
      ? {
          backgroundColor: 'var(--disabled)',
          color: 'var(--on-disabled)',
          cursor: 'not-allowed',
          opacity: 1,
        }
      : {};

    if (props.disabled) return baseStyles;

    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--primary)',
          color: 'var(--on-primary)',
          borderColor: 'var(--primary)',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--secondary)',
          color: 'var(--on-secondary)',
          borderColor: 'var(--secondary)',
        };
      case 'tertiary':
        return {
          backgroundColor: 'var(--tertiary)',
          color: 'var(--on-tertiary)',
          borderColor: 'var(--tertiary)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--primary)',
          borderColor: 'var(--border)',
          border: `1px solid var(--border)`,
        };
      case 'dashed':
        return {
          backgroundColor: 'var(--surface-variant)',
          color: 'var(--on-surface-variant)',
          borderColor: 'var(--border)',
          border: `2px dashed var(--border)`,
        };
      default:
        return {
          backgroundColor: 'var(--primary)',
          color: 'var(--on-primary)',
          borderColor: 'var(--primary)',
        };
    }
  };

  const variantStyles = getVariantStyles();

  const baseClassName = isDashed
    ? `rounded-xl p-8 font-medium focus:outline-none transition-all hover:scale-[1.02] relative overflow-hidden ${className}`
    : `px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors relative overflow-hidden group ${className}`;

  return (
    <button
      className={baseClassName}
      style={
        {
          ...variantStyles,
          '--tw-ring-color': 'var(--focus)',
        } as React.CSSProperties & Record<string, string>
      }
      disabled={props.disabled}
      onMouseEnter={(e) => {
        if (!props.disabled) {
          const overlay = e.currentTarget.querySelector(
            '.hover-overlay'
          ) as HTMLElement;
          if (overlay) overlay.style.opacity = '1';
        }
      }}
      onMouseLeave={(e) => {
        const overlay = e.currentTarget.querySelector(
          '.hover-overlay'
        ) as HTMLElement;
        if (overlay) overlay.style.opacity = '0';
      }}
      {...props}
    >
      {/* Hover overlay */}
      {!props.disabled && (
        <span
          className="hover-overlay absolute inset-0 transition-opacity pointer-events-none"
          style={{
            backgroundColor: 'var(--hover)',
            opacity: 0,
          }}
        />
      )}

      {/* Content */}
      {isDashed && (icon || subtitle) ? (
        <div className="flex flex-col items-center justify-center gap-4 min-h-[200px] relative z-10">
          {icon && <span className="relative z-10">{icon}</span>}
          {children && (
            <div className="text-lg font-semibold relative z-10">
              {children}
            </div>
          )}
          {subtitle && (
            <div className="text-sm opacity-70 relative z-10">{subtitle}</div>
          )}
        </div>
      ) : (
        <>
          {icon && (
            <span className="relative z-10 inline-flex items-center mr-2">
              {icon}
            </span>
          )}
          <span className="relative z-10">{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;
