"use client";

import React from 'react';

export interface CardProps {
    children: React.ReactNode;
    variant?: 'flat' | 'outlined' | 'elevated';
    padding?: 'small' | 'medium' | 'large';
    className?: string;
    style?: React.CSSProperties;
}

export function Card({
    children,
    variant = 'outlined',
    padding = 'medium',
    className = '',
    style = {}
}: CardProps) {
    const paddingClasses = {
        small: 'p-2',
        medium: 'p-4',
        large: 'p-6'
    };

    const variantStyles: Record<string, React.CSSProperties> = {
        flat: {
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none'
        },
        outlined: {
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: 'none'
        },
        elevated: {
            backgroundColor: 'var(--surface)',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }
    };

    return (
        <div
            className={`rounded-lg ${paddingClasses[padding]} ${className}`}
            style={{
                color: 'var(--on-surface)',
                ...variantStyles[variant],
                ...style
            }}
        >
            {children}
        </div>
    );
}
