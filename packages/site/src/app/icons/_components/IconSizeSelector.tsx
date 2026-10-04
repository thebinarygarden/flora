'use client';

import { Tag } from '@binarygarden/flora/ui';

const SIZES = [12, 16, 18, 24, 32, 48, 64, 96];

interface SizeSelectorProps {
  selectedSize: number;
  onSizeChange: (size: number) => void;
}

export function IconSizeSelector({
  selectedSize,
  onSizeChange,
}: SizeSelectorProps) {
  return (
    <div className="col" style={{ gap: 'var(--space-3)' }}>
      <span className="label-sm">size</span>
      <div className="row">
        {SIZES.map((size) => (
          <Tag
            key={size}
            selected={selectedSize === size}
            onClick={() => onSizeChange(size)}
          >
            {size}
          </Tag>
        ))}
      </div>
    </div>
  );
}
