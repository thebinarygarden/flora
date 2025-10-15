'use client';

import { Theme } from '@binarygarden/flora/theme';
import { ThemeSection } from '../ThemeSection';

interface SurfaceHierarchySectionProps {
  theme: Theme;
  selectedColorKey: keyof Theme | null;
  onColorSelect: (colorKey: keyof Theme) => void;
  onColorChange: (colorKey: keyof Theme, newColor: string) => void;
}

export function SurfaceHierarchySection(props: SurfaceHierarchySectionProps) {
  const colors = [
    'background',
    'onBackground',
    'surface',
    'onSurface',
    'surfaceVariant',
    'onSurfaceVariant',
  ] as const;

  const preview = (
    <div className="space-y-4">
      {/* Background Layer */}
      <div
        className="p-4 rounded-lg"
        style={{
          backgroundColor: 'var(--background)',
          border: '2px solid var(--border)',
        }}
      >
        <p
          className="text-sm font-medium"
          style={{ color: 'var(--on-background)' }}
        >
          Background Layer
        </p>
        <p
          className="text-xs opacity-70 mt-1"
          style={{ color: 'var(--on-background)' }}
        >
          Main page background
        </p>
      </div>

      {/* Surface Layer */}
      <div
        className="p-4 rounded-lg"
        style={{
          backgroundColor: 'var(--surface)',
          border: '2px solid var(--border)',
        }}
      >
        <p
          className="text-sm font-medium"
          style={{ color: 'var(--on-surface)' }}
        >
          Surface Layer
        </p>
        <p
          className="text-xs opacity-70 mt-1"
          style={{ color: 'var(--on-surface)' }}
        >
          Elevated cards with on-surface text
        </p>
      </div>

      {/* Surface Variant Layer */}
      <div
        className="p-4 rounded-lg"
        style={{
          backgroundColor: 'var(--surface-variant)',
          border: '2px solid var(--border)',
        }}
      >
        <p
          className="text-sm font-medium"
          style={{ color: 'var(--on-surface-variant)' }}
        >
          Surface Variant Layer
        </p>
        <p
          className="text-xs opacity-70 mt-1"
          style={{ color: 'var(--on-surface-variant)' }}
        >
          Alternative surface for emphasis and hierarchy
        </p>
      </div>
    </div>
  );

  return (
    <ThemeSection
      title="1. Surface Hierarchy"
      description="Define the foundational colors that create depth and hierarchy"
      colors={colors}
      {...props}
      preview={preview}
    />
  );
}
