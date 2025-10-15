'use client';

import { Button } from '@binarygarden/flora/form';

const sizeOptions = [12, 18, 24, 30, 36, 42, 48, 60, 72, 84, 96];

interface SizeSelectorProps {
  selectedSize: number;
  onSizeChange: (size: number) => void;
}

export function IconSizeSelector({
  selectedSize,
  onSizeChange,
}: SizeSelectorProps) {
  return (
    <div
      className="p-6 rounded-lg border"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <h3 className="font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>
        Size
      </h3>
      <div className="flex flex-wrap gap-2">
        {sizeOptions.map((size) => (
          <Button
            key={size}
            variant={selectedSize === size ? 'primary' : 'outline'}
            onClick={() => onSizeChange(size)}
            className="text-sm px-3 py-1"
          >
            {size}px
          </Button>
        ))}
      </div>
    </div>
  );
}
