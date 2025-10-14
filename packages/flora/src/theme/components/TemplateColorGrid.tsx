'use client';

import { Theme } from '../types';
import { IconCopy } from '../../icons';

interface TemplateColorGridProps {
  theme: Theme;
  onCopyColor?: (hex: string, colorName: string) => void;
}

export function TemplateColorGrid({ theme, onCopyColor }: TemplateColorGridProps) {
  const formatLabel = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const colorGroups = [
    {
      title: 'Brand Colors',
      colors: [
        { key: 'primary', hex: theme.primary },
        { key: 'onPrimary', hex: theme.onPrimary },
        { key: 'secondary', hex: theme.secondary },
        { key: 'onSecondary', hex: theme.onSecondary },
        { key: 'tertiary', hex: theme.tertiary },
        { key: 'onTertiary', hex: theme.onTertiary },
      ]
    },
    {
      title: 'Surface Hierarchy',
      colors: [
        { key: 'background', hex: theme.background },
        { key: 'onBackground', hex: theme.onBackground },
        { key: 'surface', hex: theme.surface },
        { key: 'onSurface', hex: theme.onSurface },
      ]
    },
    {
      title: 'Interactive States',
      colors: [
        { key: 'border', hex: theme.border },
        { key: 'hover', hex: theme.hover },
        { key: 'focus', hex: theme.focus },
        { key: 'disabled', hex: theme.disabled },
        { key: 'onDisabled', hex: theme.onDisabled },
      ]
    },
    {
      title: 'Semantic States',
      colors: [
        { key: 'error', hex: theme.error },
        { key: 'onError', hex: theme.onError },
        { key: 'success', hex: theme.success },
        { key: 'onSuccess', hex: theme.onSuccess },
        { key: 'warning', hex: theme.warning },
        { key: 'onWarning', hex: theme.onWarning },
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {colorGroups.map((group) => (
        <div key={group.title}>
          {/* Group Title */}
          <h4
            className="text-xs font-semibold mb-2 opacity-70"
            style={{ color: 'var(--on-surface)' }}
          >
            {group.title}
          </h4>

          {/* Color Grid - Horizontal Layout */}
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {group.colors.map(({ key, hex }) => (
              <button
                key={key}
                onClick={() => onCopyColor?.(hex, formatLabel(key))}
                className="flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--background)',
                }}
              >
                {/* Color Preview Circle */}
                <div
                  className="w-8 h-8 rounded-full border-2"
                  style={{
                    backgroundColor: hex,
                    borderColor: 'var(--border)',
                  }}
                />

                {/* Label */}
                <div className="text-[10px] font-semibold text-center leading-tight" style={{ color: 'var(--on-surface)' }}>
                  {formatLabel(key)}
                </div>

                {/* Hex Value with Copy Icon */}
                <div className="flex items-center justify-center gap-0.5 text-[9px] opacity-70" style={{ color: 'var(--on-surface)' }}>
                  <IconCopy size={8} color="currentColor" />
                  <span className="font-mono">{hex}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
