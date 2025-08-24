import * as React from 'react';

export interface HSBColorPickerProps {
  onChangeHex: (hex: string) => void; // hex color callback
  className?: string;
  initialHex?: string; // optional initial hex color
}

export type DragType = 'hue' | 'saturation-2d';

export interface HSBColor {
  h: number; // 0-360
  s: number; // 0-100
  b: number; // 0-100
}

export interface UseColorPickerProps {
  internalHsb: HSBColor;
  handleHsbChange: (color: HSBColor) => void;
  saturation2DRef: React.RefObject<HTMLDivElement | null>;
  hueRef: React.RefObject<HTMLDivElement | null>;
}