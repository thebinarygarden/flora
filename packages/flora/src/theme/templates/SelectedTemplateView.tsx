'use client';

import { ThemeTemplate, HSBColor } from '../types';
import { TemplateCard } from './TemplateCard';
import { CreateTemplateCard } from './CreateTemplateCard';

interface SelectedTemplateViewProps {
  selectedTemplate: ThemeTemplate | null;
  isCreateSelected: boolean;
  onDelete: (id: string, name: string) => void;
  onEdit?: (id: string) => void;
  onCreateNew: () => void;
  hydrationSeed?: HSBColor;
  showTitle?: boolean;
  isLocked?: boolean;
  onToggleLock?: (id: string) => void;
}

export function SelectedTemplateView({
  selectedTemplate,
  isCreateSelected,
  onDelete,
  onEdit,
  onCreateNew,
  hydrationSeed,
  showTitle = true,
  isLocked = false,
  onToggleLock,
}: SelectedTemplateViewProps) {
  return (
    <div>
      {showTitle && (
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--on-background)' }}
        >
          {isCreateSelected
            ? 'Create New Template'
            : selectedTemplate
              ? 'Selected Template'
              : 'No Selection'}
        </h2>
      )}

      <div className="grid grid-cols-1 gap-4">
        {/* Create Template Card (Expanded) */}
        {isCreateSelected && (
          <CreateTemplateCard onCreateNew={onCreateNew} expanded={true} />
        )}

        {/* Selected Template (Expanded) */}
        {selectedTemplate && !isCreateSelected && (
          <TemplateCard
            template={selectedTemplate}
            expanded={true}
            onDelete={onDelete}
            onEdit={onEdit}
            hydrationSeed={hydrationSeed}
            isLocked={isLocked}
            onToggleLock={onToggleLock}
          />
        )}

        {/* Empty State if no selection */}
        {!selectedTemplate && !isCreateSelected && (
          <div
            className="rounded-xl p-12 border-2 flex items-center justify-center"
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--surface)',
            }}
          >
            <div
              className="text-center opacity-70"
              style={{ color: 'var(--on-surface)' }}
            >
              <p className="text-lg mb-2">No template selected</p>
              <p className="text-sm">
                Select a template from the list to view details
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
