'use client';

import { useState, useEffect } from 'react';
import { ThemeTemplate } from '../types';
import { useDialog } from '../../overlay';
import { IconPlus } from '../../icons';
import { IconCopy } from '../../icons';
import { templateToTheme, DEFAULT_SEED } from './templateUtils';

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

  const copyToClipboard = (hex: string, colorName: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      showAlert(`Copied ${colorName}: ${hex}`);
    });
  };

  const selectedTemplate = templates.find((t) => t.id === selectedId);

  // Get key colors to display
  const getKeyColors = (template: ThemeTemplate) => {
    const theme = templateToTheme(template, DEFAULT_SEED);
    return [
      { name: 'Background', hex: theme.background },
      { name: 'Surface', hex: theme.surface },
      { name: 'Primary', hex: theme.primary },
      { name: 'Secondary', hex: theme.secondary },
      { name: 'Tertiary', hex: theme.tertiary },
    ];
  };

  return (
    <div className="space-y-8">
      {/* Top Section: Create Button + Selected Theme */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
          <div
            className="lg:col-span-2 rounded-xl p-6 border-2"
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
                  {selectedTemplate.name}
                </h3>
                <p
                  className="text-sm opacity-70"
                  style={{ color: 'var(--on-surface)' }}
                >
                  Created {new Date(selectedTemplate.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(selectedTemplate.id, selectedTemplate.name)}
                className="py-2 px-4 rounded-lg font-medium transition-all hover:opacity-80"
                style={{
                  backgroundColor: 'var(--error)',
                  color: 'var(--on-error)',
                }}
              >
                Delete
              </button>
            </div>

            {/* Copyable Color Swatches */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {getKeyColors(selectedTemplate).map(({ name, hex }) => (
                <button
                  key={name}
                  onClick={() => copyToClipboard(hex, name)}
                  className="flex flex-col gap-2 p-3 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--background)',
                  }}
                >
                  <div
                    className="w-full h-20 rounded-md border"
                    style={{
                      backgroundColor: hex,
                      borderColor: 'var(--border)',
                    }}
                  />
                  <div className="text-xs font-semibold" style={{ color: 'var(--on-surface)' }}>
                    {name}
                  </div>
                  <div className="flex items-center justify-center gap-1 text-xs opacity-70" style={{ color: 'var(--on-surface)' }}>
                    <IconCopy size={12} color="currentColor" />
                    <span>{hex}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty State if no templates */}
        {!selectedTemplate && templates.length === 0 && (
          <div
            className="lg:col-span-2 rounded-xl p-12 border-2 flex items-center justify-center"
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
            {templates.map((template) => {
              const isSelected = template.id === selectedId;
              const keyColors = getKeyColors(template);

              return (
                <button
                  key={template.id}
                  onClick={() => setSelectedId(template.id)}
                  className="rounded-xl p-4 border-2 transition-all hover:scale-[1.02] text-left"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                    boxShadow: isSelected ? '0 0 0 2px var(--primary)' : 'none',
                  }}
                >
                  {/* Template Name */}
                  <h4
                    className="text-lg font-bold mb-3"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    {template.name}
                  </h4>

                  {/* Non-copyable Color Preview */}
                  <div className="grid grid-cols-5 gap-2">
                    {keyColors.map(({ name, hex }) => (
                      <div
                        key={name}
                        className="aspect-square rounded border"
                        style={{
                          backgroundColor: hex,
                          borderColor: 'var(--border)',
                        }}
                        title={name}
                      />
                    ))}
                  </div>

                  {/* Date */}
                  <p
                    className="text-xs opacity-50 mt-3"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    {new Date(template.createdAt).toLocaleDateString()}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
