// Template components
export { TemplateGallery } from './TemplateGallery';
export { TemplateCard } from './TemplateCard';
export { CreateTemplateCard } from './CreateTemplateCard';
export { TemplateList } from './TemplateList';
export { SelectedTemplateView } from './SelectedTemplateView';

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
  updateTemplate,
  getTemplateById,
} from './templateStorage';
