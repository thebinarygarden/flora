'use client';

import { Select } from '@binarygarden/flora/form';
import { type StrokeWidth } from '@binarygarden/flora/icons';
import type { Dict } from '@/lib/i18n';

const WIDTHS: [StrokeWidth, number][] = [
  ['thinnest', 20],
  ['thinner', 25],
  ['thin', 30],
  ['base', 35],
  ['bold', 40],
  ['bolder', 45],
  ['boldest', 50],
  ['rotund', 55],
];

interface StrokeWidthSelectorProps {
  t: Dict['icons'];
  selectedStrokeWidth: StrokeWidth;
  onStrokeWidthChange: (strokeWidth: StrokeWidth) => void;
}

export function IconStrokeWidthSelector({
  t,
  selectedStrokeWidth,
  onStrokeWidthChange,
}: StrokeWidthSelectorProps) {
  return (
    <Select
      label={t.strokeWidth}
      options={WIDTHS.map(([value, n]) => ({
        value,
        label: `${t.strokes[value]} · ${n}`,
      }))}
      value={selectedStrokeWidth}
      onChange={(e) => onStrokeWidthChange(e.target.value as StrokeWidth)}
    />
  );
}
