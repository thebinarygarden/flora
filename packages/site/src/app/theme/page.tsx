'use client';

import { useState, useEffect } from 'react';
import {
  TemplateList,
  SelectedTemplateView,
  loadTemplates,
  deleteTemplate,
  ThemeTemplate,
  templateToTheme,
  useTheme,
  hsbToHex,
  hexToHSB,
  HSBColor,
} from '@binarygarden/flora/theme';
import { useRouter } from 'next/navigation';
import { ColorPickerPanel } from '../../components/ColorPickerPanel';
import { useDialog } from '@binarygarden/flora/overlay';
import { UIPreviewCarouselWithNav } from '../../components/UIPreviewCarouselWithNav';

export default function ThemePage() {
  const router = useRouter();
  const [selectedHex, setSelectedHex] = useState('#ff0000');
  const [templates, setTemplates] = useState<ThemeTemplate[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [lockedTemplates, setLockedTemplates] = useState<Set<string>>(
    new Set()
  );
  const { showConfirm, showAlert } = useDialog();
  const { theme: currentTheme } = useTheme();

  // Load templates on mount
  useEffect(() => {
    const loadedTemplates = loadTemplates();
    setTemplates(loadedTemplates);
    // Auto-select first template if available
    if (loadedTemplates.length > 0 && !selectedId) {
      setSelectedId(loadedTemplates[0].id);
    }
  }, [selectedId]);

  // Update color picker when template selection changes
  useEffect(() => {
    if (selectedId && selectedId !== 'create-new') {
      const template = templates.find((t) => t.id === selectedId);
      if (template && template.seed) {
        // Convert template seed (HSB) to hex and update the color picker
        const seedHex = hsbToHex(template.seed);
        setSelectedHex(seedHex);
      }
    }
  }, [selectedId, templates]);

  // Extract full HSB values from selected hex for template hydration
  const selectedHSB: HSBColor = hexToHSB(selectedHex);

  const handleEdit = (templateId: string) => {
    router.push(
      `/theme/creator?templateId=${templateId}&seedHue=${selectedHSB.hue}`
    );
  };

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

  const handleToggleLock = (id: string) => {
    setLockedTemplates((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectedTemplate = templates.find((t) => t.id === selectedId) || null;
  const isCreateSelected = selectedId === 'create-new';

  // Get theme for preview carousel - either hydrated template or current theme
  // If template is locked, use its original seed; otherwise use selectedHSB
  const isSelectedLocked = selectedId ? lockedTemplates.has(selectedId) : false;
  const effectiveHydrationSeed =
    isSelectedLocked && selectedTemplate?.seed
      ? selectedTemplate.seed
      : selectedHSB;
  const previewTheme = selectedTemplate
    ? templateToTheme(selectedTemplate, effectiveHydrationSeed)
    : currentTheme;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--on-background)',
      }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Theme Templates</h1>
          <p className="text-lg opacity-70">
            Select a seed color to hydrate templates, or create and manage your
            custom theme templates
          </p>
        </div>

        {/* Two Column Layout: Color Picker + All Templates */}
        <div className=" mb-12 flex flex-row gap-8 items-stretch h-[calc(80vh)]">
          {/* Color Picker - Left */}
          <div className="flex-shrink-0 flex items-center">
            <ColorPickerPanel
              selectedHex={selectedHex}
              onChangeHex={setSelectedHex}
            />
          </div>

          {/* All Templates List - Right */}
          <div
            className="flex-1 p-3 min-w-0 overflow-y-auto rounded-xl"
            style={{ backgroundColor: 'var(--surface)' }}
          >
            <TemplateList
              templates={templates}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onCreateNew={() => router.push('/theme/creator')}
              hydrationSeed={selectedHSB}
              showCreateButton={true}
              showTitle={true}
              lockedTemplates={lockedTemplates}
              onToggleLock={handleToggleLock}
            />

            {/* Selected Template View - Below Template List */}
            <div className="mt-8 mb-8">
              <SelectedTemplateView
                selectedTemplate={selectedTemplate}
                isCreateSelected={isCreateSelected}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onCreateNew={() => router.push('/theme/creator')}
                hydrationSeed={selectedHSB}
                showTitle={true}
                isLocked={selectedId ? lockedTemplates.has(selectedId) : false}
                onToggleLock={handleToggleLock}
              />
            </div>
            {/* UI Preview Carousel Section */}
            <UIPreviewCarouselWithNav
              theme={previewTheme}
              title="UI Preview"
              description="Browse different interface examples to see how your selected theme looks across various UI patterns"
              stickyNav={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
