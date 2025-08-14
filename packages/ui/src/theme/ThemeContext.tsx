"use client";
import * as React from 'react';
import { Theme } from './types';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider from @flora/ui');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  lightTheme: Theme;
  darkTheme: Theme;
  defaultDark?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  lightTheme, 
  darkTheme, 
  defaultDark = false 
}) => {
  const [isDark, setIsDark] = React.useState(defaultDark);

  // Initialize theme from system preference if no default provided
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};