'use client';

import { useState } from 'react';
import { Theme, HSBColor } from '../types';
import { hsbToHex } from '../utils/colorUtils';
import { IconArrow } from '../../icons';

interface TemplateColorGridProps {
  theme: Theme;
  seed?: HSBColor;
  onCopyColor?: (hex: string, colorName: string) => void;
  onColorFieldSelect?: (field: keyof Theme, hex: string) => void;
  tileHeight?: string;
  tileGap?: string;
  tileBorderWidth?: string;
}

export function TemplateColorGrid({
  theme,
  seed,
  onCopyColor: _onCopyColor,
  onColorFieldSelect,
  tileHeight = 'h-3',
  tileGap = 'gap-0',
  tileBorderWidth = 'border-2',
}: TemplateColorGridProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Organize colors into sections with names and field keys
  const colorSections = [
    ...(seed
      ? [
          {
            title: 'Seed',
            colors: [{ hex: hsbToHex(seed), name: 'Seed', field: null }],
            cols: 1,
          },
        ]
      : []),
    {
      title: 'Brand Colors',
      colors: [
        {
          hex: theme.primary,
          name: 'Primary',
          field: 'primary' as keyof Theme,
        },
        {
          hex: theme.onPrimary,
          name: 'On Primary',
          field: 'onPrimary' as keyof Theme,
        },
        {
          hex: theme.secondary,
          name: 'Secondary',
          field: 'secondary' as keyof Theme,
        },
        {
          hex: theme.onSecondary,
          name: 'On Secondary',
          field: 'onSecondary' as keyof Theme,
        },
        {
          hex: theme.tertiary,
          name: 'Tertiary',
          field: 'tertiary' as keyof Theme,
        },
        {
          hex: theme.onTertiary,
          name: 'On Tertiary',
          field: 'onTertiary' as keyof Theme,
        },
      ],
      cols: 6,
    },
    {
      title: 'Surface Hierarchy',
      colors: [
        {
          hex: theme.background,
          name: 'Background',
          field: 'background' as keyof Theme,
        },
        {
          hex: theme.onBackground,
          name: 'On Background',
          field: 'onBackground' as keyof Theme,
        },
        {
          hex: theme.surface,
          name: 'Surface',
          field: 'surface' as keyof Theme,
        },
        {
          hex: theme.onSurface,
          name: 'On Surface',
          field: 'onSurface' as keyof Theme,
        },
        {
          hex: theme.surfaceVariant,
          name: 'Surface Variant',
          field: 'surfaceVariant' as keyof Theme,
        },
        {
          hex: theme.onSurfaceVariant,
          name: 'On Surface Variant',
          field: 'onSurfaceVariant' as keyof Theme,
        },
      ],
      cols: 6,
    },
    {
      title: 'Interactive States',
      colors: [
        {
          hex: theme.disabled,
          name: 'Disabled',
          field: 'disabled' as keyof Theme,
        },
        {
          hex: theme.onDisabled,
          name: 'On Disabled',
          field: 'onDisabled' as keyof Theme,
        },
        { hex: theme.link, name: 'Link', field: 'link' as keyof Theme },
        { hex: theme.onLink, name: 'On Link', field: 'onLink' as keyof Theme },
        { hex: theme.border, name: 'Border', field: 'border' as keyof Theme },
        { hex: theme.hover, name: 'Hover', field: 'hover' as keyof Theme },
        { hex: theme.focus, name: 'Focus', field: 'focus' as keyof Theme },
      ],
      cols: 7,
    },
    {
      title: 'Semantic States',
      colors: [
        { hex: theme.error, name: 'Error', field: 'error' as keyof Theme },
        {
          hex: theme.onError,
          name: 'On Error',
          field: 'onError' as keyof Theme,
        },
        {
          hex: theme.success,
          name: 'Success',
          field: 'success' as keyof Theme,
        },
        {
          hex: theme.onSuccess,
          name: 'On Success',
          field: 'onSuccess' as keyof Theme,
        },
        {
          hex: theme.warning,
          name: 'Warning',
          field: 'warning' as keyof Theme,
        },
        {
          hex: theme.onWarning,
          name: 'On Warning',
          field: 'onWarning' as keyof Theme,
        },
        { hex: theme.info, name: 'Info', field: 'info' as keyof Theme },
        { hex: theme.onInfo, name: 'On Info', field: 'onInfo' as keyof Theme },
        {
          hex: theme.neutral,
          name: 'Neutral',
          field: 'neutral' as keyof Theme,
        },
        {
          hex: theme.onNeutral,
          name: 'On Neutral',
          field: 'onNeutral' as keyof Theme,
        },
        {
          hex: theme.highlight,
          name: 'Highlight',
          field: 'highlight' as keyof Theme,
        },
        {
          hex: theme.onHighlight,
          name: 'On Highlight',
          field: 'onHighlight' as keyof Theme,
        },
      ],
      cols: 12,
    },
  ];

  const handleSectionClick = (sectionTitle: string) => {
    if (expandedSection === sectionTitle) {
      setExpandedSection(null);
      setSelectedColor(null);
    } else {
      setExpandedSection(sectionTitle);
      setSelectedColor(null);
    }
  };

  return (
    <div className="space-y-4">
      {colorSections.map((section) => {
        const isExpanded = expandedSection === section.title;

        return (
          <div key={section.title}>
            {/* Section Header - Clickable */}
            <button
              onClick={() => handleSectionClick(section.title)}
              className="w-full flex items-center justify-between mb-2 px-2 py-1 rounded-lg transition-all hover:bg-opacity-50"
              style={{
                color: 'var(--on-surface)',
                backgroundColor: isExpanded
                  ? 'var(--surface-variant)'
                  : 'transparent',
              }}
            >
              <h4 className="text-sm font-semibold opacity-80">
                {section.title}
              </h4>
              <div
                className="transition-transform duration-200"
                style={{
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <IconArrow orientation="down" size={16} color="currentColor" />
              </div>
            </button>

            {/* Collapsed View - Small color tiles in single row */}
            {!isExpanded && (
              <div
                className={`grid ${tileGap}`}
                style={{
                  gridTemplateColumns: `repeat(${section.cols}, minmax(0, 1fr))`,
                }}
              >
                {section.colors.map((colorObj, index) => (
                  <div
                    key={index}
                    className={`w-full ${tileHeight} rounded-lg ${tileBorderWidth}`}
                    style={{
                      backgroundColor: colorObj.hex,
                      borderColor: 'var(--border)',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Expanded View - Compact 2-column layout */}
            {isExpanded && (
              <div className="space-y-0">
                {section.colors.map((colorObj, index) => {
                  const isSelected = selectedColor === colorObj.hex;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedColor(colorObj.hex);
                        if (onColorFieldSelect && colorObj.field) {
                          onColorFieldSelect(colorObj.field, colorObj.hex);
                        }
                      }}
                      className={`w-full grid grid-cols-2 items-center gap-1 px-2 py-1 ${isSelected ? 'border-2' : ''} transition-all hover:bg-opacity-50`}
                      style={{
                        ...(isSelected && { borderColor: 'var(--primary)' }),
                      }}
                    >
                      {/* Column 1: Theme Field Name */}
                      <span
                        className="text-sm font-medium text-left"
                        style={{ color: 'var(--on-surface)' }}
                      >
                        {colorObj.name}
                      </span>

                      {/* Column 2: Color Swatch */}
                      <div
                        className="h-6 rounded"
                        style={{
                          backgroundColor: colorObj.hex,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
