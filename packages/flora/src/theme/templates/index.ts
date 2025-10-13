// Template component
export { TemplateGallery } from './TemplateGallery';

// Template utilities
export {
  calculateColorRelationship,
  hydrateColorFromRelationship,
  themeToTemplate,
  templateToTheme,
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
