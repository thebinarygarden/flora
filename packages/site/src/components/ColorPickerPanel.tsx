'use client';

import { HSBColorPicker } from '@binarygarden/flora/form';

interface ColorPickerPanelProps {
  selectedHex: string;
  onChangeHex: (hex: string) => void;
  isMobile?: boolean;
}

export function ColorPickerPanel({
  selectedHex,
  onChangeHex,
  isMobile = false,
}: ColorPickerPanelProps) {
  return (
    <div
      className="w-full p-4 rounded-xl border-2"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <HSBColorPicker
        key={isMobile ? 'mobile' : 'desktop'}
        label="Seed"
        copyable={true}
        showColorIndicator={false}
        showGrid={!isMobile}
        initialHex={selectedHex}
        onChangeHex={onChangeHex}
        sb={isMobile}
      />
    </div>
  );
}
