'use client';

import { CSSProperties } from 'react';

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

/**
 * Icon colour control: one large native colour input. The block paints
 * itself with the colour, so before anything is picked it shows
 * currentColor in either theme.
 */
export function IconColorPicker({
  selectedColor,
  onColorSelect,
}: ColorPickerProps) {
  const isHex = selectedColor.startsWith('#');

  return (
    <div className="col">
      <span className="label-sm">color</span>
      <div
        className="color-block"
        style={{ '--pick': selectedColor } as CSSProperties}
      >
        <input
          type="color"
          aria-label="icon color"
          value={isHex ? selectedColor : '#000000'}
          onChange={(e) => onColorSelect(e.target.value)}
        />
      </div>
      <span className="color-val">{selectedColor}</span>
    </div>
  );
}
