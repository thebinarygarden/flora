'use client';

import { useState, useEffect } from 'react';
import { ThemeTemplate } from '../types';
import { useDialog } from '../../overlay';
import { IconPlus } from '../../icons';
import { TemplateCard } from './TemplateCard';

interface TemplateGalleryProps {
  loadTemplates: () => ThemeTemplate[];
  deleteTemplate: (id: string) => boolean;
  onCreateNew: () => void;
}

export function TemplateGallery({
  loadTemplates,
  deleteTemplate,
  onCreateNew,
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
            setSelectedId(updatedTemplates.length > 0 ? updatedTemplates[0].id : null);
          }
        } else {
          showAlert('Failed to delete template.');
        }
      },
      undefined,
    );
  };

  const selectedTemplate = templates.find((t) => t.id === selectedId);

  return (
    <div className="space-y-8">
      {/* Top Section: Create Button + Selected Template */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Create New Template Card */}
        <button
          onClick={onCreateNew}
          className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-4 min-h-[280px] transition-all hover:scale-[1.02] hover:border-opacity-100"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--surface)',
            color: 'var(--on-surface)',
          }}
        >
          <IconPlus size={64} color="var(--primary)" />
          <div className="text-lg font-semibold">Create New Template</div>
          <div className="text-sm opacity-70">Design a custom theme</div>
        </button>

        {/* Selected Template (Expanded) */}
        {selectedTemplate && (
          <TemplateCard
            template={selectedTemplate}
            expanded={true}
            onDelete={handleDelete}
          />
        )}

        {/* Empty State if no templates */}
        {!selectedTemplate && templates.length === 0 && (
          <div
            className="md:col-span-2 lg:col-span-3 rounded-xl p-12 border-2 flex items-center justify-center"
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--surface)',
            }}
          >
            <div className="text-center opacity-70" style={{ color: 'var(--on-surface)' }}>
              <p className="text-lg mb-2">No templates yet</p>
              <p className="text-sm">Create your first theme template to get started!</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section: Other Templates (Collapsed) */}
      {templates.length > 1 && (
        <div>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: 'var(--on-background)' }}
          >
            All Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto pr-2">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                expanded={false}
                onDelete={handleDelete}
                onClick={() => setSelectedId(template.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
