'use client';

import { Button } from '@binarygarden/flora/form';

const strokeWidthOptions = ['thinnest', 'thinner', 'thin', 'base', 'bold', 'bolder', 'boldest', 'rotund'] as const;
const strokeWidthValues = {
  thinnest: 20,
  thinner: 25,
  thin: 30,
  base: 35,
  bold: 40,
  bolder: 45,
  boldest: 50,
  rotund: 55
};

interface StrokeWidthSelectorProps {
  selectedStrokeWidth: typeof strokeWidthOptions[number];
  onStrokeWidthChange: (strokeWidth: typeof strokeWidthOptions[number]) => void;
}

export function IconStrokeWidthSelector({ selectedStrokeWidth, onStrokeWidthChange }: StrokeWidthSelectorProps) {
  return (
    <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <h3 className="font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>Stroke Width</h3>
      <div className="grid grid-cols-2 gap-2">
        {strokeWidthOptions.map((width) => (
          <Button
            key={width}
            variant={selectedStrokeWidth === width ? 'primary' : 'outline'}
            onClick={() => onStrokeWidthChange(width)}
            className="text-xs px-2 py-1"
          >
            {width} ({strokeWidthValues[width]}px)
          </Button>
        ))}
      </div>
    </div>
  );
}