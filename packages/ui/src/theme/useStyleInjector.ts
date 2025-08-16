"use client";

import { useEffect } from 'react';
import { Theme } from './types';

/**
 * Hook that injects theme values as CSS custom properties on the document root.
 * This allows CSS to use var(--primary), var(--background), etc.
 */
export function useStyleInjector(theme: Theme) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    // Update CSS custom properties with current theme values
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
  }, [theme]);
}