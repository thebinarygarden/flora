"use client";

import React from 'react';

export interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'error' | 'warning' | 'outline';
    size?: 'small' | 'medium';
    className?: string;
    style?: React.CSSProperties;
}

export function Badge({
    children,
    variant = 'outline',
    size = 'medium',
    className = '',
    style = {}
}: BadgeProps) {
    const sizeClasses = {
        small: 'px-2 py-0.5 text-xs',
        medium: 'px-3 py-1 text-sm'
    };

    const variantStyles: Record<string, React.CSSProperties> = {
        primary: {
            backgroundColor: 'var(--primary)',
            color: 'var(--on-primary)',
            border: 'none'
        },
        secondary: {
            backgroundColor: 'var(--secondary)',
            color: 'var(--on-secondary)',
            border: 'none'
        },
        tertiary: {
            backgroundColor: 'var(--tertiary)',
            color: 'var(--on-tertiary)',
            border: 'none'
        },
        success: {
            backgroundColor: 'var(--success)',
            color: 'var(--on-success)',
            border: 'none'
        },
        error: {
            backgroundColor: 'var(--error)',
            color: 'var(--on-error)',
            border: 'none'
        },
        warning: {
            backgroundColor: 'var(--warning)',
            color: 'var(--on-warning)',
            border: 'none'
        },
        outline: {
            backgroundColor: 'transparent',
            color: 'var(--on-surface)',
            border: '1px solid var(--border)'
        }
    };

    return (
        <span
            className={`inline-flex items-center justify-center rounded-full font-medium ${sizeClasses[size]} ${className}`}
            style={{
                ...variantStyles[variant],
                ...style
            }}
        >
            {children}
        </span>
    );
}
