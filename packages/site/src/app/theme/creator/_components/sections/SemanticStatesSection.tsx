'use client';

import { Theme } from '@binarygarden/flora/theme';
import { ThemeSection } from '../ThemeSection';

interface SemanticStatesSectionProps {
  theme: Theme;
  selectedColorKey: keyof Theme | null;
  onColorSelect: (colorKey: keyof Theme) => void;
  onColorChange: (colorKey: keyof Theme, newColor: string) => void;
}

export function SemanticStatesSection(props: SemanticStatesSectionProps) {
  const colors = [
    'error',
    'onError',
    'success',
    'onSuccess',
    'warning',
    'onWarning',
    'info',
    'onInfo',
    'neutral',
    'onNeutral',
    'highlight',
    'onHighlight',
  ] as const;

  const preview = (
    <div className="space-y-3">
      {/* Success Alert */}
      <div
        className="p-3 rounded-lg"
        style={{
          backgroundColor: 'var(--success)',
          color: 'var(--on-success)',
        }}
      >
        <p className="text-xs font-semibold">✓ Success</p>
        <p className="text-xs opacity-80 mt-1">Operation completed</p>
      </div>

      {/* Warning Alert */}
      <div
        className="p-3 rounded-lg"
        style={{
          backgroundColor: 'var(--warning)',
          color: 'var(--on-warning)',
        }}
      >
        <p className="text-xs font-semibold">⚠ Warning</p>
        <p className="text-xs opacity-80 mt-1">Please review this</p>
      </div>

      {/* Error Alert */}
      <div
        className="p-3 rounded-lg"
        style={{
          backgroundColor: 'var(--error)',
          color: 'var(--on-error)',
        }}
      >
        <p className="text-xs font-semibold">✕ Error</p>
        <p className="text-xs opacity-80 mt-1">Something went wrong</p>
      </div>

      {/* Info Alert */}
      <div
        className="p-3 rounded-lg"
        style={{
          backgroundColor: 'var(--info)',
          color: 'var(--on-info)',
        }}
      >
        <p className="text-xs font-semibold">ℹ Info</p>
        <p className="text-xs opacity-80 mt-1">New features available</p>
      </div>

      {/* Neutral Alert */}
      <div
        className="p-3 rounded-lg"
        style={{
          backgroundColor: 'var(--neutral)',
          color: 'var(--on-neutral)',
        }}
      >
        <p className="text-xs font-semibold">● Neutral</p>
        <p className="text-xs opacity-80 mt-1">System notification</p>
      </div>

      {/* Highlight Alert */}
      <div
        className="p-3 rounded-lg"
        style={{
          backgroundColor: 'var(--highlight)',
          color: 'var(--on-highlight)',
        }}
      >
        <p className="text-xs font-semibold">★ Highlighted</p>
        <p className="text-xs opacity-80 mt-1">Featured promotion</p>
      </div>
    </div>
  );

  return (
    <ThemeSection
      title="4. Semantic States"
      description="Set colors for status messages (error, success, warning, info, neutral, highlight)"
      colors={colors}
      {...props}
      preview={preview}
    />
  );
}
