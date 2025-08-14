"use client";
import * as React from "react";
import { useTheme } from '../theme';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'tertiary';
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-400',
    tertiary: 'bg-transparent hover:bg-blue-50 focus:ring-blue-500',
};

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  variant = 'primary',
                                                  className = '',
                                                  ...props
                                              }) => {
    const { theme } = useTheme();
    
    return (
        <button
            className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${variantClasses[variant]} ${className}`}
            onClick={() => console.log("success")}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;