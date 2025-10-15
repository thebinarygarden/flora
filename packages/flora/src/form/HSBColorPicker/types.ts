import * as React from 'react';

export interface HSBColorPickerProps {
  onChangeHex: (hex: string) => void; // hex color callback
  className?: string;
  initialHex?: string; // optional initial hex color
  sb?: boolean; // show saturation and brightness sliders
}

export type DragType = 'hue' | 'sb-grid' | 'saturation' | 'brightness';

export interface HSBColor {
  h: number; // 0-360
  s: number; // 0-100
  b: number; // 0-100
}

export interface UseColorPickerProps {
  internalHsb: HSBColor;
  handleHsbChange: (color: HSBColor) => void;
  sbGridRef: React.RefObject<HTMLDivElement | null>;
  hueRef: React.RefObject<HTMLDivElement | null>;
  saturationRef?: React.RefObject<HTMLDivElement | null>;
  brightnessRef?: React.RefObject<HTMLDivElement | null>;
}
