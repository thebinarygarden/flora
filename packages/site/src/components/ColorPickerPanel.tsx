'use client';

import { HSBColorPicker } from '@binarygarden/flora/form';
import { CopyableText } from '@binarygarden/flora/ui';

interface ColorPickerPanelProps {
  selectedHex: string;
  onChangeHex: (hex: string) => void;
}

export function ColorPickerPanel({
  selectedHex,
  onChangeHex,
}: ColorPickerPanelProps) {
  return (
    <div
      className="flex-1 p-6 rounded-xl border-2"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        minWidth: '300px',
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <h4
          className="text-sm font-semibold opacity-70"
          style={{ color: 'var(--on-surface)' }}
        >
          Seed
        </h4>
        <div
          className="flex-1 h-6 rounded border-2"
          style={{
            backgroundColor: selectedHex,
            borderColor: 'var(--border)',
          }}
        />
      </div>

      <div className="mt-4">
        <CopyableText value={selectedHex} />
      </div>
      <HSBColorPicker
        initialHex={selectedHex}
        onChangeHex={onChangeHex}
        sb={true}
      />
    </div>
  );
}
