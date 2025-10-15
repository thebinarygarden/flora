'use client';

import { ThemeTemplate, HSBColor } from '../types';
import {
  IconLock,
  IconUnlock,
  IconPaintBrush,
  IconTrashcan,
} from '../../icons';
import { templateToTheme, DEFAULT_SEED } from './templateUtils';
import { TemplateColorGrid } from '../components/TemplateColorGrid';

interface TemplateCardProps {
  template: ThemeTemplate;
  expanded: boolean;
  onDelete: (id: string, name: string) => void;
  onEdit?: (id: string) => void;
  onClick?: () => void;
  hydrationSeed?: HSBColor;
  isSelected?: boolean;
  isLocked?: boolean;
  onToggleLock?: (id: string) => void;
}

export function TemplateCard({
  template,
  expanded,
  onDelete,
  onEdit,
  onClick,
  hydrationSeed = DEFAULT_SEED,
  isSelected = false,
  isLocked = false,
  onToggleLock,
}: TemplateCardProps) {
  // Determine which seed to use: original if locked, hydration seed if unlocked
  const effectiveSeed =
    isLocked && template.seed ? template.seed : hydrationSeed;

  // Get key colors to display
  const getKeyColors = (template: ThemeTemplate) => {
    const theme = templateToTheme(template, effectiveSeed);
    return [
      { name: 'Primary', hex: theme.primary },
      { name: 'Secondary', hex: theme.secondary },
      { name: 'Tertiary', hex: theme.tertiary },
      { name: 'Background', hex: theme.background },
      { name: 'Surface', hex: theme.surface },
      { name: 'Surface Variant', hex: theme.surfaceVariant },
    ];
  };

  const keyColors = getKeyColors(template);

  // Expanded view (selected)
  if (expanded) {
    const theme = templateToTheme(template, effectiveSeed);

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
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(template.id)}
                className="p-2 rounded-lg transition-all"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--primary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.color = 'var(--on-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--primary)';
                }}
              >
                <IconPaintBrush size={20} color="currentColor" />
              </button>
            )}
            {onToggleLock && (
              <button
                onClick={() => onToggleLock(template.id)}
                className="p-2 rounded-lg transition-all"
                style={{
                  backgroundColor: 'transparent',
                  color: isLocked ? 'var(--on-surface)' : 'var(--primary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isLocked
                    ? 'var(--surface-variant)'
                    : 'var(--primary)';
                  e.currentTarget.style.color = isLocked
                    ? 'var(--on-surface)'
                    : 'var(--on-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = isLocked
                    ? 'var(--on-surface)'
                    : 'var(--primary)';
                }}
              >
                {isLocked ? (
                  <IconLock size={20} color="currentColor" />
                ) : (
                  <IconUnlock size={20} color="currentColor" />
                )}
              </button>
            )}
            <button
              onClick={() => onDelete(template.id, template.name)}
              className="p-2 rounded-lg transition-all"
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
      className="rounded-xl p-3 border-2 transition-all hover:scale-[1.01] cursor-pointer flex flex-row items-center gap-3 min-h-[66px]"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
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

      {/* Action Buttons - Right */}
      <div className="flex gap-2 flex-shrink-0">
        {onEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(template.id);
            }}
            className="p-1.5 rounded-lg transition-all"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary)';
              e.currentTarget.style.color = 'var(--on-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--primary)';
            }}
          >
            <IconPaintBrush size={20} color="currentColor" />
          </button>
        )}
        {onToggleLock && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleLock(template.id);
            }}
            className="p-1.5 rounded-lg transition-all"
            style={{
              backgroundColor: 'transparent',
              color: isLocked ? 'var(--on-surface)' : 'var(--primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isLocked
                ? 'var(--surface-variant)'
                : 'var(--primary)';
              e.currentTarget.style.color = isLocked
                ? 'var(--on-surface)'
                : 'var(--on-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = isLocked
                ? 'var(--on-surface)'
                : 'var(--primary)';
            }}
          >
            {isLocked ? (
              <IconLock size={20} color="currentColor" />
            ) : (
              <IconUnlock size={20} color="currentColor" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
