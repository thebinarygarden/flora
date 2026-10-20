import * as React from 'react';

export const THEME_STORAGE_KEY = 'flora-theme';

export interface ScriptPreloadThemeProps {
  /** Used when the visitor has no stored choice and no OS preference for dark. */
  defaultTheme?: 'light' | 'dark';
}

/**
 * Sets `data-theme` on `<html>` before first paint, so a dark-mode visitor
 * never sees a flash of the light palette. Render it in `<head>`.
 *
 * ```tsx
 * <head><ScriptPreloadTheme /></head>
 * ```
 */
export function ScriptPreloadTheme({
  defaultTheme = 'light',
}: ScriptPreloadThemeProps) {
  const js =
    `(function(){try{` +
    `var t=localStorage.getItem('${THEME_STORAGE_KEY}');` +
    `if(t!=='light'&&t!=='dark'){` +
    `t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'${defaultTheme}';` +
    `}` +
    `document.documentElement.setAttribute('data-theme',t);` +
    `}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
