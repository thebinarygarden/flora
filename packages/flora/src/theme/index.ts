// Types
export type {
  Theme,
  HSBColor,
  ColorRelationship,
  ThemeTemplate,
  ThemeTemplateStorage,
} from './types';

// Components
export {
  ThemeProvider,
  useTheme,
  ThemeToggleButton,
  ColorPickerDropdown,
} from './components';

// Utilities (color utils and scripts)
export {
  hsbToHex,
  hexToHSB,
  hexToRgb,
  shortestHuePath,
  applyHueDelta,
  ScriptPreloadTheme,
} from './utils';

// Templates (component, utilities, constants, and storage)
export {
  TemplateGallery,
  calculateColorRelationship,
  hydrateColorFromRelationship,
  themeToTemplate,
  templateToTheme,
  DEFAULT_SEED_HUE,
  DEFAULT_SEED,
  loadTemplates,
  saveTemplate,
  deleteTemplate,
  hydrateTemplate,
  updateTemplateName,
  getTemplateById,
} from './templates';