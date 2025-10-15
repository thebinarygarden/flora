// ============================================================================
// Core Theme Types
// ============================================================================

export type Theme = {
  // Brand colors - multiple button variants
  primary: string;
  onPrimary: string;
  secondary: string;
  onSecondary: string;
  tertiary: string;
  onTertiary: string;

  // Surface hierarchy
  background: string; // page background
  onBackground: string;
  surface: string; // cards, modals
  onSurface: string;
  surfaceVariant: string; // alternative surface for emphasis and hierarchy
  onSurfaceVariant: string;

  // Interactive states
  border: string; // input borders, dividers
  hover: string; // hover overlay
  focus: string; // focus rings
  disabled: string; // disabled backgrounds
  onDisabled: string;
  link: string; // clickable text links
  onLink: string;

  // Semantic states
  error: string;
  onError: string;
  success: string;
  onSuccess: string;
  warning: string;
  onWarning: string;
  info: string; // informational messages
  onInfo: string;
  neutral: string; // default/non-critical notifications
  onNeutral: string;
  highlight: string; // emphasized/featured content background
  onHighlight: string;
};

// ============================================================================
// Template System Types
// ============================================================================

/**
 * HSB color representation with descriptive property names
 */
export interface HSBColor {
  /** Hue in degrees (0-360) */
  hue: number;

  /** Saturation percentage (0-100) */
  saturation: number;

  /** Brightness percentage (0-100) */
  brightness: number;
}

/**
 * Represents the relationship between a color and the template seed.
 * Uses ratios for saturation/brightness to enable flexible hydration with any seed.
 */
export interface ColorRelationship {
  /** Hue delta in degrees (-180 to +180, shortest path on color wheel) */
  hueDelta: number;

  /** Saturation as ratio of seed saturation (0.0 to ~2.0, typically 0-1) */
  saturationRatio: number;

  /** Brightness as ratio of seed brightness (0.0 to ~2.0, typically 0-1) */
  brightnessRatio: number;

  /** Optional floor for saturation (used for grays/desaturated colors) */
  minSaturation?: number;

  /** Optional floor for brightness (used for very dark colors) */
  minBrightness?: number;
}

/**
 * A theme template that stores color relationships relative to a seed color.
 * Can be "hydrated" with any seed to generate new theme variations.
 */
export interface ThemeTemplate {
  /** Unique identifier (timestamp-based) */
  id: string;

  /** User-provided name */
  name: string;

  /** ISO timestamp of creation */
  createdAt: string;

  /** The reference seed color used when saving (for reference/preview) */
  seed: HSBColor;

  /** Color relationships for each theme property */
  colors: {
    [K in keyof Theme]: ColorRelationship;
  };
}

/**
 * Storage structure for multiple theme templates in localStorage
 */
export interface ThemeTemplateStorage {
  templates: ThemeTemplate[];
}
