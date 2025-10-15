'use client';

import { useState } from 'react';
import { Theme } from '../types';
import { ColorTile } from './ColorTile';

interface TemplateColorGridProps {
  theme: Theme;
  onCopyColor?: (hex: string, colorName: string) => void;
}

export function TemplateColorGrid({
  theme,
  onCopyColor: _onCopyColor,
}: TemplateColorGridProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  // Helper function to chunk pairs into groups of N
  const chunkPairs = <T,>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  // Group colors into pairs (base + on color) and singles
  const colorGroups = [
    {
      title: 'Brand Colors',
      pairs: [
        {
          base: { key: 'primary', hex: theme.primary },
          on: { key: 'onPrimary', hex: theme.onPrimary },
        },
        {
          base: { key: 'secondary', hex: theme.secondary },
          on: { key: 'onSecondary', hex: theme.onSecondary },
        },
        {
          base: { key: 'tertiary', hex: theme.tertiary },
          on: { key: 'onTertiary', hex: theme.onTertiary },
        },
      ],
    },
    {
      title: 'Surface Hierarchy',
      pairs: [
        {
          base: { key: 'background', hex: theme.background },
          on: { key: 'onBackground', hex: theme.onBackground },
        },
        {
          base: { key: 'surface', hex: theme.surface },
          on: { key: 'onSurface', hex: theme.onSurface },
        },
        {
          base: { key: 'surfaceVariant', hex: theme.surfaceVariant },
          on: { key: 'onSurfaceVariant', hex: theme.onSurfaceVariant },
        },
      ],
    },
    {
      title: 'Interactive States',
      pairs: [
        {
          base: { key: 'disabled', hex: theme.disabled },
          on: { key: 'onDisabled', hex: theme.onDisabled },
        },
        {
          base: { key: 'link', hex: theme.link },
          on: { key: 'onLink', hex: theme.onLink },
        },
      ],
      singles: [
        { key: 'border', hex: theme.border },
        { key: 'hover', hex: theme.hover },
        { key: 'focus', hex: theme.focus },
      ],
    },
    {
      title: 'Semantic States',
      pairs: [
        {
          base: { key: 'error', hex: theme.error },
          on: { key: 'onError', hex: theme.onError },
        },
        {
          base: { key: 'success', hex: theme.success },
          on: { key: 'onSuccess', hex: theme.onSuccess },
        },
        {
          base: { key: 'warning', hex: theme.warning },
          on: { key: 'onWarning', hex: theme.onWarning },
        },
        {
          base: { key: 'info', hex: theme.info },
          on: { key: 'onInfo', hex: theme.onInfo },
        },
        {
          base: { key: 'neutral', hex: theme.neutral },
          on: { key: 'onNeutral', hex: theme.onNeutral },
        },
        {
          base: { key: 'highlight', hex: theme.highlight },
          on: { key: 'onHighlight', hex: theme.onHighlight },
        },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {colorGroups.map((group) => {
        // Chunk pairs into groups of 3 (6 colors per row)
        const pairChunks = group.pairs ? chunkPairs(group.pairs, 3) : [];

        return (
          <div key={group.title}>
            {/* Group Title */}
            <h4
              className="text-sm font-semibold mb-2 opacity-80"
              style={{ color: 'var(--on-surface)' }}
            >
              {group.title}
            </h4>

            {/* Color Pairs - 3 pairs per row (6 colors) */}
            <div className="space-y-1.5">
              {pairChunks.map((chunk, chunkIndex) => (
                <div key={chunkIndex} className="flex gap-1.5">
                  {chunk.map((pair, pairIndex) => {
                    const baseIsCopied = copiedKey === pair.base.key;
                    const onIsCopied = copiedKey === pair.on.key;

                    return (
                      <div key={pairIndex} className="flex flex-1 gap-1.5">
                        {/* Base Color */}
                        <div className="flex-1">
                          <ColorTile
                            hex={pair.base.hex}
                            label={pair.base.key}
                            showLabel={true}
                            showHex={true}
                            showCopyIcon={true}
                            onClick={() =>
                              handleCopy(pair.base.key, pair.base.hex)
                            }
                            reactOnClick={baseIsCopied}
                            previewClassName="w-full h-8"
                            variant="card"
                          />
                        </div>

                        {/* On Color */}
                        <div className="flex-1">
                          <ColorTile
                            hex={pair.on.hex}
                            label={pair.on.key}
                            showLabel={true}
                            showHex={true}
                            showCopyIcon={true}
                            onClick={() => handleCopy(pair.on.key, pair.on.hex)}
                            reactOnClick={onIsCopied}
                            previewClassName="w-full h-8"
                            variant="card"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Single Colors (if any) */}
              {group.singles && group.singles.length > 0 && (
                <div className="grid grid-cols-3 gap-1.5 mt-1">
                  {group.singles.map(({ key, hex }) => {
                    const isCopied = copiedKey === key;
                    return (
                      <ColorTile
                        key={key}
                        hex={hex}
                        label={key}
                        showLabel={true}
                        showHex={true}
                        showCopyIcon={true}
                        onClick={() => handleCopy(key, hex)}
                        reactOnClick={isCopied}
                        previewClassName="w-full h-8"
                        variant="card"
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
