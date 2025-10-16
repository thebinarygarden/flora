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
  Theme,
  calculateColorRelationship,
  updateTemplate,
} from '@binarygarden/flora/theme';
import { useRouter } from 'next/navigation';
import { ColorPickerPanel } from '../../components/ColorPickerPanel';
import { useDialog } from '@binarygarden/flora/overlay';
import { UIPreviewCarouselWithNav } from '../../components/UIPreviewCarouselWithNav';
import { useViewport } from '@binarygarden/flora/hooks';

export default function ThemePage() {
  const router = useRouter();
  const { isMobile } = useViewport();
  const [selectedHex, setSelectedHex] = useState('#ff0000');
  const [colorPickerHex, setColorPickerHex] = useState('#ff0000'); // Separate state for color picker display
  const [templates, setTemplates] = useState<ThemeTemplate[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [lockedTemplates, setLockedTemplates] = useState<Set<string>>(
    new Set()
  );
  const { showConfirm, showAlert } = useDialog();
  const { theme: currentTheme } = useTheme();

  // Editing state
  const [editingField, setEditingField] = useState<keyof Theme | null>(null);
  const [pendingTemplate, setPendingTemplate] = useState<ThemeTemplate | null>(
    null
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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
        // Convert template seed (HSB) to hex and update both hydration seed and color picker
        const seedHex = hsbToHex(template.seed);
        setSelectedHex(seedHex);
        setColorPickerHex(seedHex); // Sync color picker to seed
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

  // Handle color field selection for editing
  const handleColorFieldSelect = (field: keyof Theme, hex: string) => {
    if (!selectedTemplate) return;

    // Create pending template if not already editing
    if (!pendingTemplate) {
      setPendingTemplate({ ...selectedTemplate });
    }

    // Set the editing field and update ONLY color picker (not hydration seed)
    setEditingField(field);
    setColorPickerHex(hex); // Only update color picker, keep selectedHex frozen
  };

  // Handle color picker changes when editing
  const handleColorPickerChange = (newHex: string) => {
    // Always update the color picker display
    setColorPickerHex(newHex);

    // If we're editing a field, update the pending template's field relationship
    if (editingField && selectedTemplate && pendingTemplate) {
      // Calculate relationship relative to the CURRENT hydration seed (selectedHSB)
      // This keeps the seed frozen and only changes the edited field
      const relationship = calculateColorRelationship(
        newHex,
        selectedHSB // Use current hydration seed, not template.seed
      );

      const updatedTemplate = {
        ...pendingTemplate,
        colors: {
          ...pendingTemplate.colors,
          [editingField]: relationship,
        },
      };

      setPendingTemplate(updatedTemplate);
      setHasUnsavedChanges(true);
    } else {
      // Not editing: update the hydration seed (shift entire theme)
      setSelectedHex(newHex);
    }
  };

  // Save changes to template
  const handleSave = () => {
    if (!pendingTemplate) return;

    const success = updateTemplate(pendingTemplate.id, pendingTemplate);
    if (success) {
      const updatedTemplates = loadTemplates();
      setTemplates(updatedTemplates);
      setPendingTemplate(null);
      setEditingField(null);
      setHasUnsavedChanges(false);
    } else {
      showAlert('Failed to update template.');
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setPendingTemplate(null);
    setEditingField(null);
    setHasUnsavedChanges(false);

    // Reset color picker to match the hydration seed
    setColorPickerHex(selectedHex);
  };

  const selectedTemplate = templates.find((t) => t.id === selectedId) || null;
  const isCreateSelected = selectedId === 'create-new';

  // Get theme for preview carousel - use pending template if editing, otherwise use selected template
  // If template is locked, use its original seed; otherwise use selectedHSB
  const isSelectedLocked = selectedId ? lockedTemplates.has(selectedId) : false;
  const effectiveHydrationSeed =
    isSelectedLocked && selectedTemplate?.seed
      ? selectedTemplate.seed
      : selectedHSB;

  // Use pending template for preview if it exists (during editing)
  const templateForPreview = pendingTemplate || selectedTemplate;
  const previewTheme = templateForPreview
    ? templateToTheme(templateForPreview, effectiveHydrationSeed)
    : currentTheme;

  return (
    <div
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--on-background)',
      }}
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-2">
          <h1 className="text-4xl font-bold mb-3">Theme Templates</h1>
          <p className="text-lg opacity-70">
            Select a seed color to hydrate templates, or create and manage your
            custom theme templates
          </p>
        </div>

        {/* Two Column Layout: Selected Template + Color Picker (Left) + All Templates (Right) */}
        <div
          className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-8 items-stretch ${isMobile ? '' : 'h-[calc(80vh)]'}`}
        >
          {/* Left Column: Selected Template View + Color Picker */}
          <div
            className={`${isMobile ? 'w-full' : 'w-[30%] max-w-[350px]'} flex-shrink-0 flex flex-col gap-3`}
          >
            {/* Selected Template View - Above Color Picker */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              <SelectedTemplateView
                selectedTemplate={templateForPreview}
                isCreateSelected={isCreateSelected}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onCreateNew={() => router.push('/theme/creator')}
                hydrationSeed={selectedHSB}
                showTitle={false}
                isLocked={selectedId ? lockedTemplates.has(selectedId) : false}
                onToggleLock={handleToggleLock}
                onColorFieldSelect={handleColorFieldSelect}
                hasUnsavedChanges={hasUnsavedChanges}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </div>

            {/* Color Picker - Below Selected Template */}
            <div className="flex-shrink-0">
              <ColorPickerPanel
                selectedHex={colorPickerHex}
                onChangeHex={handleColorPickerChange}
                isMobile={isMobile}
              />
            </div>
          </div>

          {/* Right Column: All Templates List + UI Preview */}
          <div
            className={`${isMobile ? 'max-h-[75vh]' : 'flex-1'} p-3 min-w-0 overflow-y-auto rounded-xl`}
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

            {/* UI Preview Carousel Section */}
            <UIPreviewCarouselWithNav
              theme={previewTheme}
              title="UI Preview"
              description="Browse different interface examples to see how your selected theme looks across various UI patterns"
              stickyNav={true}
              stickyTop="top-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
