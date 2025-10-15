'use client';

import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'neutral'
    | 'highlight'
    | 'link'
    | 'surfaceVariant'
    | 'outline';
  size?: 'small' | 'medium';
  className?: string;
  style?: React.CSSProperties;
}

const getVariantStyles = (variant: string): React.CSSProperties => {
  if (variant === 'outline') {
    return {
      backgroundColor: 'transparent',
      color: 'var(--on-surface)',
      border: '1px solid var(--border)',
    };
  }

  const varName = variant === 'surfaceVariant' ? 'surface-variant' : variant;
  const onVarName =
    variant === 'surfaceVariant' ? 'on-surface-variant' : `on-${variant}`;

  return {
    backgroundColor: `var(--${varName})`,
    color: `var(--${onVarName})`,
    border: 'none',
  };
};

export function Badge({
  children,
  variant = 'outline',
  size = 'medium',
  className = '',
  style = {},
}: BadgeProps) {
  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-medium ${sizeClasses[size]} ${className}`}
      style={{
        ...getVariantStyles(variant),
        ...style,
      }}
    >
      {children}
    </span>
  );
}
