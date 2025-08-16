"use client";

import { useState } from 'react';
import { HSBColorPicker, type HSBColor } from '@flora/ui/input';
import { useTheme } from '@flora/ui/theme';

export default function ThemePicker() {
  const [seedColor, setSeedColor] = useState<HSBColor>({ h: 220, s: 80, b: 60 });
  const { theme } = useTheme();

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: theme.background,
        color: theme.onBackground 
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Theme Picker</h1>
        
        <div className="max-w-md mx-auto">
          <HSBColorPicker
            value={seedColor}
            onChange={setSeedColor}
          />
        </div>
      </div>
    </div>
  );
}