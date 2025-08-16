"use client";

import { useTheme } from '@flora/ui/theme';

export default function ThemeCreator() {
  const { theme } = useTheme();
  
  return (
    <div 
      className="min-h-screen p-8"
      style={{ 
        backgroundColor: theme.background,
        color: theme.onBackground 
      }}
    >
      <h1 className="text-3xl font-bold mb-4">Theme Creator</h1>
      <p style={{ color: theme.onSurface }}>Coming Soon</p>
    </div>
  );
}