'use client';

import { ThemeTemplate } from '../types';
import { IconTrashcan } from '../../icons';
import { templateToTheme, DEFAULT_SEED } from './templateUtils';
import { TemplateColorGrid } from '../components/TemplateColorGrid';

interface TemplateCardProps {
  template: ThemeTemplate;
  expanded: boolean;
  onDelete: (id: string, name: string) => void;
  onClick?: () => void;
  hydrationSeedHue?: number;
}

export function TemplateCard({
  template,
  expanded,
  onDelete,
  onClick,
  hydrationSeedHue
}: TemplateCardProps) {
  // Create hydration seed from provided hue or use default
  const hydrationSeed = {
    hue: hydrationSeedHue ?? DEFAULT_SEED.hue,
    saturation: 100,
    brightness: 100
  };

  // Get key colors to display
  const getKeyColors = (template: ThemeTemplate) => {
    const theme = templateToTheme(template, hydrationSeed);
    return [
      { name: 'Background', hex: theme.background },
      { name: 'Surface', hex: theme.surface },
      { name: 'Primary', hex: theme.primary },
      { name: 'Secondary', hex: theme.secondary },
      { name: 'Tertiary', hex: theme.tertiary },
    ];
  };

  const keyColors = getKeyColors(template);

  // Expanded view (selected)
  if (expanded) {
    const theme = templateToTheme(template, hydrationSeed);

    return (
      <div
        className="rounded-xl p-6 border-2"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--primary)',
        }}
      >
        {/* Template Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3
              className="text-2xl font-bold mb-1"
              style={{ color: 'var(--on-surface)' }}
            >
              {template.name}
            </h3>
            <p
              className="text-sm opacity-70"
              style={{ color: 'var(--on-surface)' }}
            >
              Created {new Date(template.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => onDelete(template.id, template.name)}
            className="p-2 rounded-lg transition-all group/delete"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--error)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--error)';
              e.currentTarget.style.color = 'var(--on-error)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--error)';
            }}
          >
            <IconTrashcan size={20} color="currentColor" />
          </button>
        </div>

        {/* All Template Colors */}
        <TemplateColorGrid theme={theme} />
      </div>
    );
  }

  // Collapsed view (not selected)
  return (
    <div
      onClick={onClick}
      className="rounded-xl p-3 border-2 transition-all hover:scale-[1.02] cursor-pointer flex flex-row items-center gap-3"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Content (Title and Date) - Left */}
      <div className="flex flex-col flex-shrink-0 min-w-0">
        <h4
          className="text-base font-bold truncate"
          style={{ color: 'var(--on-surface)' }}
        >
          {template.name}
        </h4>
        <p
          className="text-xs opacity-50"
          style={{ color: 'var(--on-surface)' }}
        >
          {new Date(template.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Inline Color Preview - Center */}
      <div className="flex gap-1.5 flex-grow justify-center">
        {keyColors.map(({ name, hex }) => (
          <div
            key={name}
            className="w-8 h-8 rounded border"
            style={{
              backgroundColor: hex,
              borderColor: 'var(--border)',
            }}
            title={name}
          />
        ))}
      </div>

      {/* Trashcan Icon - Right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(template.id, template.name);
        }}
        className="p-2 rounded-lg transition-all flex-shrink-0"
        style={{
          backgroundColor: 'transparent',
          color: 'var(--error)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--error)';
          e.currentTarget.style.color = 'var(--on-error)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--error)';
        }}
      >
        <IconTrashcan size={20} color="currentColor" />
      </button>
    </div>
  );
}
