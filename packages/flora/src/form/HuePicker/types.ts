import * as React from 'react';

export interface HuePickerProps {
  onChangeHue: (hue: number) => void; // hue value 0-359
  onChangeHex?: (hex: string) => void; // optional hex color of pure hue (s=100, b=100)
  className?: string;
  initialHue?: number; // optional initial hue value (0-359)
}

export interface UseHuePickerProps {
  internalHue: number;
  handleHueChange: (hue: number) => void;
  hueRef: React.RefObject<HTMLDivElement | null>;
}
