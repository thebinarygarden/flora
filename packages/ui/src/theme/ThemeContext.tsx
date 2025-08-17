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

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    // Apply theme manually by updating CSS variables
    // This handles manual toggle after initial theme is set by ThemeScript
    if (typeof document !== 'undefined') {
      const theme = newIsDark ? darkTheme : lightTheme;
      const root = document.documentElement;
      
      // Update CSS variables for manual toggle
      root.style.setProperty('--primary', theme.primary);
      root.style.setProperty('--on-primary', theme.onPrimary);
      root.style.setProperty('--secondary', theme.secondary);
      root.style.setProperty('--on-secondary', theme.onSecondary);
      root.style.setProperty('--tertiary', theme.tertiary || theme.primary);
      root.style.setProperty('--on-tertiary', theme.onTertiary || theme.onPrimary);
      root.style.setProperty('--background', theme.background);
      root.style.setProperty('--on-background', theme.onBackground);
      root.style.setProperty('--surface', theme.surface);
      root.style.setProperty('--on-surface', theme.onSurface);
      root.style.setProperty('--border', theme.border);
      root.style.setProperty('--hover', theme.hover);
      root.style.setProperty('--focus', theme.focus);
      root.style.setProperty('--disabled', theme.disabled);
      root.style.setProperty('--on-disabled', theme.onDisabled);
      root.style.setProperty('--error', theme.error);
      root.style.setProperty('--on-error', theme.onError);
      root.style.setProperty('--success', theme.success);
      root.style.setProperty('--on-success', theme.onSuccess);
      root.style.setProperty('--warning', theme.warning);
      root.style.setProperty('--on-warning', theme.onWarning);
      root.style.setProperty('--font-family', theme.fontFamily);
      root.style.setProperty('--font-family-mono', theme.fontFamilyMono);
      
    }
  };

  // Initialize from system preference on mount (but don't cause flash)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Always use media query to detect theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
  }, []);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};