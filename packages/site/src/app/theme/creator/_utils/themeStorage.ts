import {
  Theme,
  ThemeTemplate,
  ThemeTemplateStorage,
  HSBColor,
  themeToTemplate,
  templateToTheme,
} from '@flora/ui/theme';

const STORAGE_KEY = 'flora-theme-templates';

/**
 * Get all saved templates from localStorage
 */
export function loadTemplates(): ThemeTemplate[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const storage: ThemeTemplateStorage = JSON.parse(stored);
    return storage.templates || [];
  } catch (error) {
    console.error('Error loading theme templates:', error);
    return [];
  }
}

/**
 * Save a new theme template to localStorage
 *
 * @param theme - The theme to save
 * @param name - User-provided name for the template
 * @param seedHue - Optional hue for the seed (defaults to 190° cyan)
 * @returns The saved template
 */
export function saveTemplate(
  theme: Theme,
  name: string,
  seedHue: number = 190
): ThemeTemplate {
  const template = themeToTemplate(theme, name, seedHue);

  try {
    const templates = loadTemplates();
    templates.push(template);

    const storage: ThemeTemplateStorage = { templates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

    return template;
  } catch (error) {
    console.error('Error saving theme template:', error);
    throw error;
  }
}

/**
 * Delete a template by ID
 *
 * @param id - Template ID to delete
 * @returns true if deleted, false if not found
 */
export function deleteTemplate(id: string): boolean {
  try {
    const templates = loadTemplates();
    const filteredTemplates = templates.filter((t) => t.id !== id);

    if (filteredTemplates.length === templates.length) {
      return false; // Template not found
    }

    const storage: ThemeTemplateStorage = { templates: filteredTemplates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

    return true;
  } catch (error) {
    console.error('Error deleting theme template:', error);
    return false;
  }
}

/**
 * Load a template by ID and hydrate it with a seed
 *
 * @param templateId - ID of the template to load
 * @param seedHue - Hue for hydration seed (0-360)
 * @param seedSaturation - Saturation for hydration seed (0-100, defaults to 100)
 * @param seedBrightness - Brightness for hydration seed (0-100, defaults to 100)
 * @returns Hydrated Theme object, or null if template not found
 */
export function hydrateTemplate(
  templateId: string,
  seedHue: number,
  seedSaturation: number = 100,
  seedBrightness: number = 100
): Theme | null {
  try {
    const templates = loadTemplates();
    const template = templates.find((t) => t.id === templateId);

    if (!template) {
      console.error(`Template with ID ${templateId} not found`);
      return null;
    }

    const hydrationSeed: HSBColor = {
      hue: seedHue,
      saturation: seedSaturation,
      brightness: seedBrightness
    };

    return templateToTheme(template, hydrationSeed);
  } catch (error) {
    console.error('Error hydrating theme template:', error);
    return null;
  }
}

/**
 * Update an existing template's name
 *
 * @param id - Template ID to update
 * @param newName - New name for the template
 * @returns true if updated, false if not found
 */
export function updateTemplateName(id: string, newName: string): boolean {
  try {
    const templates = loadTemplates();
    const template = templates.find((t) => t.id === id);

    if (!template) {
      return false;
    }

    template.name = newName;

    const storage: ThemeTemplateStorage = { templates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

    return true;
  } catch (error) {
    console.error('Error updating template name:', error);
    return false;
  }
}

/**
 * Get a single template by ID
 *
 * @param id - Template ID to find
 * @returns Template or null if not found
 */
export function getTemplateById(id: string): ThemeTemplate | null {
  const templates = loadTemplates();
  return templates.find((t) => t.id === id) || null;
}
