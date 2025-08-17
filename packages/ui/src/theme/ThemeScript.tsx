import * as React from 'react';
import { Theme } from './types';

interface ThemeScriptProps {
  lightTheme: Theme;
  darkTheme: Theme;
}

/**
 * ThemeScript - Blocking script component that prevents theme flash
 * 
 * Add this to your <head> to ensure themes are applied before React hydrates.
 * This script runs immediately and sets CSS variables based on system preference.
 * 
 * Usage:
 * ```jsx
 * <head>
 *   <ThemeScript lightTheme={lightTheme} darkTheme={darkTheme} />
 * </head>
 * ```
 */
export const ThemeScript: React.FC<ThemeScriptProps> = ({ lightTheme, darkTheme }) => {
  const script = `
    (function() {
      try {
        // Detect system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Select appropriate theme
        const theme = prefersDark ? ${JSON.stringify(darkTheme)} : ${JSON.stringify(lightTheme)};
        
        // Apply theme as CSS variables
        const root = document.documentElement;
        
        // Map theme properties to CSS variables
        const cssVarMap = {
          primary: '--primary',
          onPrimary: '--on-primary',
          secondary: '--secondary',
          onSecondary: '--on-secondary',
          tertiary: '--tertiary',
          onTertiary: '--on-tertiary',
          background: '--background',
          onBackground: '--on-background',
          surface: '--surface',
          onSurface: '--on-surface',
          border: '--border',
          hover: '--hover',
          focus: '--focus',
          disabled: '--disabled',
          onDisabled: '--on-disabled',
          error: '--error',
          onError: '--on-error',
          success: '--success',
          onSuccess: '--on-success',
          warning: '--warning',
          onWarning: '--on-warning',
          fontFamily: '--font-family',
          fontFamilyMono: '--font-family-mono'
        };
        
        // Set CSS variables
        Object.entries(cssVarMap).forEach(([themeKey, cssVar]) => {
          if (theme[themeKey]) {
            root.style.setProperty(cssVar, theme[themeKey]);
          }
        });
        
      } catch (error) {
        // Fail silently - React will handle theme as fallback
        console.warn('Flora ThemeScript failed:', error);
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};