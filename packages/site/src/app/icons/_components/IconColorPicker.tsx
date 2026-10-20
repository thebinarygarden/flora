'use client';

import { CSSProperties } from 'react';

interface ColorPickerProps {
  label: string;
  ariaLabel: string;
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

/**
 * Icon colour control: one large native colour input. The block paints
 * itself with the colour, so before anything is picked it shows
 * currentColor in either theme.
 */
export function IconColorPicker({
  label,
  ariaLabel,
  selectedColor,
  onColorSelect,
}: ColorPickerProps) {
  const isHex = selectedColor.startsWith('#');

  return (
    <div className="col">
      <span className="label-sm">{label}</span>
      <div
        className="color-block"
        style={{ '--pick': selectedColor } as CSSProperties}
      >
        <input
          type="color"
          aria-label={ariaLabel}
          value={isHex ? selectedColor : '#000000'}
          onChange={(e) => onColorSelect(e.target.value)}
        />
      </div>
      <span className="color-val">{selectedColor}</span>
    </div>
  );
}
