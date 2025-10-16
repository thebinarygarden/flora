'use client';

import { ThemeTemplate, HSBColor, Theme } from '../types';
import {
  IconLock,
  IconUnlock,
  IconPaintBrush,
  IconTrashcan,
  IconX,
  IconCheck,
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
  onColorFieldSelect?: (field: keyof Theme, hex: string) => void;
  hasUnsavedChanges?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
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
  onColorFieldSelect,
  hasUnsavedChanges = false,
  onSave,
  onCancel,
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
        className="rounded-xl px-6 pb-6 pt-3 h-full"
        style={{
          backgroundColor: 'var(--surface)',
        }}
      >
        {/* Template Header */}
        <div className="flex justify-between items-center mb-2">
          <h3
            className="text-2xl font-bold"
            style={{ color: 'var(--on-surface)' }}
          >
            {template.name}
          </h3>

          {/* Conditionally render Save/Cancel buttons or Date */}
          {hasUnsavedChanges ? (
            <div className="flex gap-2">
              <button
                onClick={onCancel}
                className="p-2 rounded-lg border-2 transition-all flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--error)',
                  color: 'var(--error)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--error)';
                  e.currentTarget.style.color = 'var(--on-error)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface)';
                  e.currentTarget.style.color = 'var(--error)';
                }}
              >
                <IconX size={20} color="currentColor" />
              </button>
              <button
                onClick={onSave}
                className="p-2 rounded-lg border-2 transition-all flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--success)',
                  color: 'var(--success)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--success)';
                  e.currentTarget.style.color = 'var(--on-success)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface)';
                  e.currentTarget.style.color = 'var(--success)';
                }}
              >
                <IconCheck size={20} color="currentColor" />
              </button>
            </div>
          ) : (
            <p
              className="text-sm opacity-70"
              style={{ color: 'var(--on-surface)' }}
            >
              {new Date(template.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* All Template Colors */}
        <TemplateColorGrid
          theme={theme}
          seed={effectiveSeed}
          onColorFieldSelect={onColorFieldSelect}
        />
      </div>
    );
  }

  // Collapsed view (not selected)
  return (
    <div
      onClick={onClick}
      className="rounded-xl p-3 border-2 transition-all cursor-pointer flex flex-row items-center gap-3 min-h-[66px]"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(template.id, template.name);
          }}
          className="p-1.5 rounded-lg transition-all"
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
  );
}
