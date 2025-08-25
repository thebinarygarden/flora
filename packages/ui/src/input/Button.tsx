"use client";
import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  variant = 'primary',
                                                  className = '',
                                                  ...props
                                              }) => {
    const getVariantStyles = () => {
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
            default:
                return {
                    backgroundColor: 'var(--primary)',
                    color: 'var(--on-primary)',
                    borderColor: 'var(--primary)',
                };
        }
    };

    const variantStyles = getVariantStyles();
    
    return (
        <button
            className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors hover:opacity-90 disabled:opacity-50 ${className}`}
            style={{
                ...variantStyles,
                '--tw-ring-color': 'var(--focus)',
            } as React.CSSProperties & { '--tw-ring-color': string }}
            onClick={() => console.log("success")}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;