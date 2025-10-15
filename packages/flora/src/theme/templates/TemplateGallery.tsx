'use client';

import { useState, useEffect } from 'react';
import { ThemeTemplate, HSBColor } from '../types';
import { useDialog } from '../../overlay';
import { TemplateList } from './TemplateList';
import { SelectedTemplateView } from './SelectedTemplateView';

interface TemplateGalleryProps {
  loadTemplates: () => ThemeTemplate[];
  deleteTemplate: (id: string) => boolean;
  onCreateNew: () => void;
  onEdit?: (id: string) => void;
  hydrationSeed?: HSBColor;
  showCreateButton?: boolean;
}

export function TemplateGallery({
  loadTemplates,
  deleteTemplate,
  onCreateNew,
  onEdit,
  hydrationSeed,
  showCreateButton = true,
}: TemplateGalleryProps) {
  const [templates, setTemplates] = useState<ThemeTemplate[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { showConfirm, showAlert } = useDialog();

  // Load templates on mount and when returning to page
  useEffect(() => {
    const loadedTemplates = loadTemplates();
    setTemplates(loadedTemplates);
    // Auto-select first template if available
    if (loadedTemplates.length > 0 && !selectedId) {
      setSelectedId(loadedTemplates[0].id);
    }
  }, [loadTemplates, selectedId]);

  const handleDelete = (id: string, name: string) => {
    showConfirm(
      `Delete template "${name}"?`,
      () => {
        const success = deleteTemplate(id);
        if (success) {
          const updatedTemplates = loadTemplates();
          setTemplates(updatedTemplates);
          // If deleted template was selected, select first available or null
          if (selectedId === id) {
            setSelectedId(
              updatedTemplates.length > 0 ? updatedTemplates[0].id : null
            );
          }
        } else {
          showAlert('Failed to delete template.');
        }
      },
      undefined
    );
  };

  const selectedTemplate = templates.find((t) => t.id === selectedId);
  const isCreateSelected = selectedId === 'create-new';

  return (
    <div className="space-y-8">
      {/* Selected Template View */}
      <SelectedTemplateView
        selectedTemplate={selectedTemplate || null}
        isCreateSelected={isCreateSelected}
        onDelete={handleDelete}
        onEdit={onEdit}
        onCreateNew={onCreateNew}
        hydrationSeed={hydrationSeed}
      />

      {/* All Templates List */}
      {(showCreateButton || templates.length > 0) && (
        <TemplateList
          templates={templates}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onDelete={handleDelete}
          onEdit={onEdit}
          onCreateNew={onCreateNew}
          hydrationSeed={hydrationSeed}
          showCreateButton={showCreateButton}
        />
      )}
    </div>
  );
}
