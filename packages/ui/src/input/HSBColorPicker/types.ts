import * as React from 'react';

export interface HSBColor {
  h: number; // 0-360
  s: number; // 0-100
  b: number; // 0-100
}

export interface HSBColorPickerProps {
  value: HSBColor;
  onChange: (color: HSBColor) => void;
  className?: string;
}

export type DragType = 'saturation' | 'hue' | 'brightness' | 'saturation-2d';

export interface UseColorPickerProps {
  value: HSBColor;
  onChange: (color: HSBColor) => void;
  saturation2DRef: React.RefObject<HTMLDivElement | null>;
  saturationRef: React.RefObject<HTMLDivElement | null>;
  hueRef: React.RefObject<HTMLDivElement | null>;
  brightnessRef: React.RefObject<HTMLDivElement | null>;
}