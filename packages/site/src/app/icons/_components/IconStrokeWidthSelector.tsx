'use client';

import { Select } from '@binarygarden/flora/form';
import { type StrokeWidth } from '@binarygarden/flora/icons';

const OPTIONS: { value: StrokeWidth; label: string }[] = [
  { value: 'thinnest', label: 'thinnest · 20' },
  { value: 'thinner', label: 'thinner · 25' },
  { value: 'thin', label: 'thin · 30' },
  { value: 'base', label: 'base · 35' },
  { value: 'bold', label: 'bold · 40' },
  { value: 'bolder', label: 'bolder · 45' },
  { value: 'boldest', label: 'boldest · 50' },
  { value: 'rotund', label: 'rotund · 55' },
];

interface StrokeWidthSelectorProps {
  selectedStrokeWidth: StrokeWidth;
  onStrokeWidthChange: (strokeWidth: StrokeWidth) => void;
}

export function IconStrokeWidthSelector({
  selectedStrokeWidth,
  onStrokeWidthChange,
}: StrokeWidthSelectorProps) {
  return (
    <Select
      label="stroke width"
      options={OPTIONS}
      value={selectedStrokeWidth}
      onChange={(e) => onStrokeWidthChange(e.target.value as StrokeWidth)}
    />
  );
}
