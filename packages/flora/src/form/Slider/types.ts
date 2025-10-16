import * as React from 'react';

export interface SliderProps {
  value: number; // Current value of the slider
  min: number; // Minimum value
  max: number; // Maximum value
  onChange: (value: number) => void; // Callback when value changes
  gradient: string; // CSS gradient for the slider track
  className?: string;
  indicatorColor?: string | ((value: number) => string); // Color for the indicator (can be function)
}

export interface UseSliderProps {
  value: number;
  min: number;
  max: number;
  handleChange: (value: number) => void;
  sliderRef: React.RefObject<HTMLDivElement | null>;
}
