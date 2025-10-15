import { Theme, HSBColor, ColorRelationship, ThemeTemplate } from '../types';
import {
  hexToHSB,
  hsbToHex,
  shortestHuePath,
  applyHueDelta,
} from '../utils/colorUtils';

// ============================================================================
// Constants
// ============================================================================

/**
 * Default seed hue for theme templates (red)
 */
export const DEFAULT_SEED_HUE = 0;

/**
 * Default seed color for theme templates (red at full saturation and brightness)
 */
export const DEFAULT_SEED: HSBColor = {
  hue: DEFAULT_SEED_HUE,
  saturation: 100,
  brightness: 100,
};

// ============================================================================
// Color Relationship Calculation
// ============================================================================

/**
 * Calculate the relationship between a color and a seed color
 * Uses ratios for saturation/brightness to support flexible hydration
 *
 * @param colorHex - The color to analyze (hex format)
 * @param seed - The reference seed color (HSB format)
 * @returns Color relationship with ratios and optional floor values
 *
 * @example
 * const seed = { hue: 190, saturation: 100, brightness: 100 };
 * const relationship = calculateColorRelationship("#2563eb", seed);
 * // Returns { hueDelta: 27, saturationRatio: 0.91, brightnessRatio: 0.92 }
 */
export function calculateColorRelationship(
  colorHex: string,
  seed: HSBColor
): ColorRelationship {
  const color = hexToHSB(colorHex);

  // Calculate hue delta (shortest path on color wheel)
  const hueDelta = shortestHuePath(seed.hue, color.hue);

  // Calculate ratios (handle division by zero)
  const saturationRatio =
    seed.saturation > 0 ? color.saturation / seed.saturation : 0;
  const brightnessRatio =
    seed.brightness > 0 ? color.brightness / seed.brightness : 0;

  const relationship: ColorRelationship = {
    hueDelta,
    saturationRatio,
    brightnessRatio,
  };

  return relationship;
}

/**
 * Hydrate a color from a relationship and a new seed
 *
 * @param seed - The seed color to use for hydration (HSB format)
 * @param relationship - The color relationship with ratios
 * @returns Hydrated HSB color
 *
 * @example
 * const seed = { hue: 0, saturation: 100, brightness: 100 }; // Red
 * const relationship = { hueDelta: 27, saturationRatio: 0.91, brightnessRatio: 0.92 };
 * const hydrated = hydrateColorFromRelationship(seed, relationship);
 * // Returns { hue: 27, saturation: 91, brightness: 92 } (Orange-red)
 */
export function hydrateColorFromRelationship(
  seed: HSBColor,
  relationship: ColorRelationship
): HSBColor {
  // Apply hue delta
  const hue = applyHueDelta(seed.hue, relationship.hueDelta);

  // Apply ratios
  let saturation = seed.saturation * relationship.saturationRatio;
  let brightness = seed.brightness * relationship.brightnessRatio;

  // Clamp to valid ranges
  saturation = Math.max(0, Math.min(100, saturation));
  brightness = Math.max(0, Math.min(100, brightness));

  return {
    hue: Math.round(hue),
    saturation: Math.round(saturation),
    brightness: Math.round(brightness),
  };
}

// ============================================================================
// Theme Template Conversion
// ============================================================================

/**
 * Convert a Theme object to a ThemeTemplate
 *
 * @param theme - The theme to convert
 * @param name - User-provided name for the template
 * @param seedHue - Optional hue for the seed (defaults to 190° cyan)
 * @returns ThemeTemplate ready for storage
 *
 * @example
 * const template = themeToTemplate(myTheme, "Ocean Vibes", 190);
 * // Template can now be saved and hydrated with different seeds
 */
export function themeToTemplate(
  theme: Theme,
  name: string,
  seedHue: number = DEFAULT_SEED_HUE
): ThemeTemplate {
  // Create seed with full saturation and brightness
  const seed: HSBColor = {
    hue: seedHue,
    saturation: 100,
    brightness: 100,
  };

  // Calculate relationships for all theme colors
  const colors = {} as { [K in keyof Theme]: ColorRelationship };

  (Object.keys(theme) as Array<keyof Theme>).forEach((key) => {
    const colorValue = theme[key];
    colors[key] = calculateColorRelationship(colorValue, seed);
  });

  return {
    id: Date.now().toString(),
    name,
    createdAt: new Date().toISOString(),
    seed,
    colors,
  };
}

/**
 * Convert a ThemeTemplate to a Theme object using a hydration seed
 *
 * @param template - The template to hydrate
 * @param hydrationSeed - The seed color to use for hydration
 * @returns Hydrated Theme object
 *
 * @example
 * const redSeed = { hue: 0, saturation: 100, brightness: 100 };
 * const theme = templateToTheme(savedTemplate, redSeed);
 * // Returns a complete Theme object with red-based colors
 */
export function templateToTheme(
  template: ThemeTemplate,
  hydrationSeed: HSBColor
): Theme {
  const theme = {} as Theme;

  (Object.keys(template.colors) as Array<keyof Theme>).forEach((key) => {
    const relationship = template.colors[key];
    const hydratedColor = hydrateColorFromRelationship(
      hydrationSeed,
      relationship
    );
    theme[key] = hsbToHex(hydratedColor);
  });

  return theme;
}
