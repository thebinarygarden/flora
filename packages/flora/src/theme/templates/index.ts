// Template component
export { TemplateGallery } from './TemplateGallery';

// Template utilities and constants
export {
  calculateColorRelationship,
  hydrateColorFromRelationship,
  themeToTemplate,
  templateToTheme,
  DEFAULT_SEED_HUE,
  DEFAULT_SEED,
} from './templateUtils';

// Template storage
export {
  loadTemplates,
  saveTemplate,
  deleteTemplate,
  hydrateTemplate,
  updateTemplateName,
  getTemplateById,
} from './templateStorage';
