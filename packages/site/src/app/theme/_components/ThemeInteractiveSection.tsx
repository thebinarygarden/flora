'use client';

import { useState } from 'react';
import * as React from "react";
import { HSBColorPicker, hexToHsb, hexToRgb } from 'bgflora/input';

export function ThemeInteractiveSection() {
  const [color, setColor] = useState<string>("#299bba");
  const [copied, setCopied] = React.useState(false);
  const [copiedValue, setCopiedValue] = React.useState<string | null>(null);

  // Convert hex to other color formats for display
  const hsbColor = hexToHsb(color);
  const rgbColor = hexToRgb(color);

  const copyToClipboard = (text: string, valueType: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setCopiedValue(valueType);
    setTimeout(() => {
      setCopied(false);
      setCopiedValue(null);
    }, 500);
  };

  const copyHexToClipboard = () => {
    copyToClipboard(color, 'HEX');
  };

  return (
    <>
      {/* Color Preview */}
      <div className="mb-6">
        <div
          className={`w-full h-16 rounded-lg shadow-sm cursor-pointer ${copied ? 'ring-2 ring-green-500' : ''}`}
          style={{
            backgroundColor: color,
            border: `2px solid var(--on-background)`,
            transition: copied ? 'box-shadow 200ms' : 'none'
          }}
          onClick={copyHexToClipboard}
        />
        
        {/* Color Info */}
        <div className="flex justify-between items-center mt-3">
          <div
            className={`text-sm font-mono cursor-pointer transition-all duration-200 hover:bg-onSurface hover:bg-opacity-10 px-2 py-1 rounded ${copiedValue === 'HEX' ? 'text-green-500' : 'text-onSurface opacity-60'}`}
            onClick={() => copyToClipboard(color, 'HEX')}
          >
            HEX: {color}
          </div>
          <div
            className={`text-sm cursor-pointer transition-all duration-200 hover:bg-onSurface hover:bg-opacity-10 px-2 py-1 rounded ${copiedValue === 'HSB' ? 'text-green-500' : 'text-onSurface opacity-60'}`}
            onClick={() => copyToClipboard(`hsb(${hsbColor.h}, ${hsbColor.s}%, ${hsbColor.b}%)`, 'HSB')}
          >
            HSB: {hsbColor.h}, {hsbColor.s}%, {hsbColor.b}%
          </div>
          <div
            className={`text-sm cursor-pointer transition-all duration-200 hover:bg-onSurface hover:bg-opacity-10 px-2 py-1 rounded ${copiedValue === 'RGB' ? 'text-green-500' : 'text-onSurface opacity-60'}`}
            onClick={() => copyToClipboard(`rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`, 'RGB')}
          >
            RGB: {rgbColor.r}, {rgbColor.g}, {rgbColor.b}
          </div>
        </div>
      </div>
      
      {/* Color Picker */}
      <div className="max-w-md mx-auto">
        <HSBColorPicker
          onChangeHex={setColor}
        />
      </div>
    </>
  );
}