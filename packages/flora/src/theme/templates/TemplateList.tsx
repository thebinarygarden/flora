'use client';

import { ThemeTemplate, HSBColor } from '../types';
import { TemplateCard } from './TemplateCard';
import { CreateTemplateCard } from './CreateTemplateCard';

interface TemplateListProps {
  templates: ThemeTemplate[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string, name: string) => void;
  onEdit?: (id: string) => void;
  onCreateNew: () => void;
  hydrationSeed?: HSBColor;
  showCreateButton?: boolean;
  showTitle?: boolean;
  lockedTemplates?: Set<string>;
  onToggleLock?: (id: string) => void;
}

export function TemplateList({
  templates,
  selectedId,
  onSelect,
  onDelete,
  onEdit,
  onCreateNew,
  hydrationSeed,
  showCreateButton = true,
  showTitle = true,
  lockedTemplates = new Set(),
  onToggleLock,
}: TemplateListProps) {
  return (
    <div>
      {/* Title and Create Button on same line */}
      {showTitle && (
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-xl font-semibold"
            style={{ color: 'var(--on-background)' }}
          >
            All Templates
          </h2>
          {showCreateButton && (
            <CreateTemplateCard
              onCreateNew={onCreateNew}
              expanded={false}
              onClick={onCreateNew}
              iconOnly={true}
            />
          )}
        </div>
      )}

      {/* If no title but create button is shown, render it separately */}
      {!showTitle && showCreateButton && (
        <div className="flex justify-center mb-4">
          <CreateTemplateCard
            onCreateNew={onCreateNew}
            expanded={false}
            onClick={onCreateNew}
          />
        </div>
      )}

      <div
        className="flex flex-col gap-1 max-h-[440px] overflow-y-auto p-4 rounded-xl"
        style={{ backgroundColor: 'var(--surface-variant)' }}
      >
        {/* All Template Cards */}
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            expanded={false}
            onDelete={onDelete}
            onEdit={onEdit}
            onClick={() => onSelect(template.id)}
            hydrationSeed={hydrationSeed}
            isSelected={template.id === selectedId}
            isLocked={lockedTemplates.has(template.id)}
            onToggleLock={onToggleLock}
          />
        ))}
      </div>
    </div>
  );
}
