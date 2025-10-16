import { Theme, ThemeTemplate, ThemeTemplateStorage, HSBColor } from '../types';
import {
  themeToTemplate,
  templateToTheme,
  DEFAULT_SEED_HUE,
} from './templateUtils';

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
 * Save a theme template to localStorage
 * If a template with the same name exists, it will be overwritten
 *
 * @param theme - The theme to save
 * @param name - User-provided name for the template
 * @param seedHue - Optional hue for the seed (defaults to red)
 * @returns The saved template
 */
export function saveTemplate(
  theme: Theme,
  name: string,
  seedHue: number = DEFAULT_SEED_HUE
): ThemeTemplate {
  try {
    const templates = loadTemplates();

    // Check if a template with this name already exists
    const existingIndex = templates.findIndex((t) => t.name === name);

    let template: ThemeTemplate;

    if (existingIndex !== -1) {
      // Overwrite existing template, preserving ID and creation date
      const existingTemplate = templates[existingIndex];
      template = themeToTemplate(theme, name, seedHue);
      template.id = existingTemplate.id;
      template.createdAt = existingTemplate.createdAt;
      templates[existingIndex] = template;
    } else {
      // Create new template
      template = themeToTemplate(theme, name, seedHue);
      templates.push(template);
    }

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
      brightness: seedBrightness,
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

/**
 * Update an existing template with new data
 *
 * @param id - Template ID to update
 * @param updatedTemplate - The updated template data
 * @returns true if updated, false if not found
 */
export function updateTemplate(
  id: string,
  updatedTemplate: ThemeTemplate
): boolean {
  try {
    const templates = loadTemplates();
    const index = templates.findIndex((t) => t.id === id);

    if (index === -1) {
      return false;
    }

    // Ensure the ID matches
    updatedTemplate.id = id;
    templates[index] = updatedTemplate;

    const storage: ThemeTemplateStorage = { templates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

    return true;
  } catch (error) {
    console.error('Error updating template:', error);
    return false;
  }
}
