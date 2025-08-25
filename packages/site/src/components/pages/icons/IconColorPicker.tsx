'use client';

import { useState } from 'react';
import { HSBColorPicker } from '@flora/ui/dist/input';
import { Button } from '@flora/ui/dist/input';

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  customColors: string[];
  onAddCustomColor: (color: string) => void;
}

export function IconColorPicker({ selectedColor, onColorSelect, customColors, onAddCustomColor }: ColorPickerProps) {
  const [showCustomColorPicker, setShowCustomColorPicker] = useState(false);
  const [pickerColor, setPickerColor] = useState('');

  const handlePickerColorChange = (hex: string) => {
    setPickerColor(hex);
  };

  const saveCustomColor = () => {
    onAddCustomColor(pickerColor);
    onColorSelect(pickerColor);
    setShowCustomColorPicker(false);
  };

  const cancelColorPicker = () => {
    setPickerColor('');
    setShowCustomColorPicker(false);
  };

  return (
    <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <h3 className="font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>Color</h3>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {customColors.map((color) => (
            <button
              key={color}
              onClick={() => {
                onColorSelect(color);
                setShowCustomColorPicker(false);
              }}
              className={`w-8 h-8 rounded border-2 transition-all ${
                selectedColor === color && !showCustomColorPicker ? 'border-gray-800 scale-110' : 'border-gray-300'
              }`}
              style={{
                backgroundColor: color
              }}
            />
          ))}

          <button
            onClick={() => setShowCustomColorPicker(!showCustomColorPicker)}
            className={`w-8 h-8 rounded border-2 flex items-center justify-center text-xs font-bold border-gray-300`}
            style={{
              backgroundColor: showCustomColorPicker ? pickerColor : 'var(--surface)',
              color: 'var(--on-background)'
            }}
          >
            {!showCustomColorPicker && ('+')}
          </button>
        </div>

        {showCustomColorPicker && (
          <div className="mt-4 space-y-4">
            <HSBColorPicker
              onChangeHex={handlePickerColorChange}
              className="w-full"
            />
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={saveCustomColor}
                className="flex-1"
              >
                Save Color
              </Button>
              <Button
                variant="outline"
                onClick={cancelColorPicker}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}