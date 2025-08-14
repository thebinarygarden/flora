"use client";
import * as React from "react";
import { useTheme } from '../theme';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  variant = 'primary',
                                                  className = '',
                                                  ...props
                                              }) => {
    const { theme } = useTheme();

    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: theme.primary,
                    color: theme.onPrimary,
                    borderColor: theme.primary,
                };
            case 'secondary':
                return {
                    backgroundColor: theme.secondary,
                    color: theme.onSecondary,
                    borderColor: theme.secondary,
                };
            case 'tertiary':
                return {
                    backgroundColor: theme.tertiary || theme.primary,
                    color: theme.onTertiary || theme.onPrimary,
                    borderColor: theme.tertiary || theme.primary,
                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    color: theme.primary,
                    borderColor: theme.border,
                    border: `1px solid ${theme.border}`,
                };
            default:
                return {
                    backgroundColor: theme.primary,
                    color: theme.onPrimary,
                    borderColor: theme.primary,
                };
        }
    };

    const variantStyles = getVariantStyles();
    
    return (
        <button
            className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors hover:opacity-90 disabled:opacity-50 ${className}`}
            style={{
                ...variantStyles,
                fontFamily: theme.fontFamily,
                '--focus-ring-color': theme.focus,
            } as React.CSSProperties & { '--focus-ring-color': string }}
            onClick={() => console.log("success")}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;