'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeTemplate, hsbToHex } from '@flora/ui/theme';
import { loadTemplates, deleteTemplate } from '@/app/theme/creator/_utils/themeStorage';

export function TemplateGallery() {
  const router = useRouter();
  const [templates, setTemplates] = useState<ThemeTemplate[]>([]);

  // Load templates on mount and when returning to page
  useEffect(() => {
    setTemplates(loadTemplates());
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete template "${name}"?`)) {
      const success = deleteTemplate(id);
      if (success) {
        setTemplates(loadTemplates());
      } else {
        alert('Failed to delete template.');
      }
    }
  };

  const handleCreateNew = () => {
    router.push('/theme/creator');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Create New Template Card */}
      <button
        onClick={handleCreateNew}
        className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-4 min-h-[240px] transition-all hover:scale-[1.02] hover:border-opacity-100"
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--surface)',
          color: 'var(--on-surface)',
        }}
      >
        <div className="text-6xl" style={{ color: 'var(--primary)' }}>+</div>
        <div className="text-lg font-semibold">Create New Template</div>
        <div className="text-sm opacity-70">Design a custom theme</div>
      </button>

      {/* Template Cards */}
      {templates.map((template) => {
        // Get seed color for preview
        const seedHex = hsbToHex(template.seed);

        return (
          <div
            key={template.id}
            className="rounded-xl p-6 flex flex-col gap-4 min-h-[240px] border-2 transition-all hover:scale-[1.02]"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
          >
            {/* Color Preview */}
            <div
              className="w-full h-24 rounded-lg border-2"
              style={{
                backgroundColor: seedHex,
                borderColor: 'var(--border)',
              }}
            />

            {/* Template Info */}
            <div className="flex-1">
              <h3
                className="text-xl font-bold mb-2"
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
              <p
                className="text-xs opacity-50 mt-1"
                style={{ color: 'var(--on-surface)' }}
              >
                Seed: {seedHex}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(template.id, template.name)}
                className="flex-1 py-2 px-4 rounded-lg font-medium transition-all hover:opacity-80"
                style={{
                  backgroundColor: 'var(--error)',
                  color: 'var(--on-error)',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}

      {/* Empty State */}
      {templates.length === 0 && (
        <div
          className="col-span-full text-center py-12 opacity-70"
          style={{ color: 'var(--on-background)' }}
        >
          <p className="text-lg mb-2">No templates yet</p>
          <p className="text-sm">Create your first theme template to get started!</p>
        </div>
      )}
    </div>
  );
}
