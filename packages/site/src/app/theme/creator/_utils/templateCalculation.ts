import { Theme } from '@flora/ui/theme';
import { ColorRelationship, HSBColor, ThemeTemplate } from '../_types/ThemeTemplate';
import { hexToHSB, hsbToHex, shortestHuePath, applyHueDelta } from './colorConversion';

/**
 * Calculate the relationship between a color and a seed color
 * Uses ratios for saturation/brightness to support flexible hydration
 *
 * @param colorHex - The color to analyze (hex format)
 * @param seed - The reference seed color (HSB format)
 * @returns Color relationship with ratios and optional floor values
 */
export function calculateColorRelationship(
  colorHex: string,
  seed: HSBColor
): ColorRelationship {
  const color = hexToHSB(colorHex);

  // Calculate hue delta (shortest path on color wheel)
  const hueDelta = shortestHuePath(seed.hue, color.hue);

  // Calculate ratios (handle division by zero)
  const saturationRatio = seed.saturation > 0 ? color.saturation / seed.saturation : 0;
  const brightnessRatio = seed.brightness > 0 ? color.brightness / seed.brightness : 0;

  const relationship: ColorRelationship = {
    hueDelta,
    saturationRatio,
    brightnessRatio
  };

  // Add floor values for special cases

  // Lock saturation floor for very desaturated colors (grays)
  // This preserves colors that are intentionally gray/neutral
  if (color.saturation < 15) {
    relationship.minSaturation = color.saturation;
  }

  // Lock brightness floor for very dark colors
  // This preserves near-black colors (like dark text)
  if (color.brightness < 20) {
    relationship.minBrightness = color.brightness;
  }

  // Lock brightness ceiling for very bright colors
  // This preserves near-white colors (like light backgrounds)
  if (color.brightness > 95 && color.saturation < 10) {
    relationship.minBrightness = color.brightness;
    relationship.minSaturation = color.saturation;
  }

  return relationship;
}

/**
 * Hydrate a color from a relationship and a new seed
 *
 * @param seed - The seed color to use for hydration (HSB format)
 * @param relationship - The color relationship with ratios
 * @returns Hydrated HSB color
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

  // Apply floor constraints
  if (relationship.minSaturation !== undefined) {
    saturation = Math.max(relationship.minSaturation, saturation);
  }
  if (relationship.minBrightness !== undefined) {
    brightness = Math.max(relationship.minBrightness, brightness);
  }

  // Clamp to valid ranges
  saturation = Math.max(0, Math.min(100, saturation));
  brightness = Math.max(0, Math.min(100, brightness));

  return {
    hue: Math.round(hue),
    saturation: Math.round(saturation),
    brightness: Math.round(brightness)
  };
}

/**
 * Convert a Theme object to a ThemeTemplate
 *
 * @param theme - The theme to convert
 * @param name - User-provided name for the template
 * @param seedHue - Optional hue for the seed (defaults to 190° cyan)
 * @returns ThemeTemplate ready for storage
 */
export function themeToTemplate(
  theme: Theme,
  name: string,
  seedHue: number = 190
): ThemeTemplate {
  // Create seed with full saturation and brightness
  const seed: HSBColor = {
    hue: seedHue,
    saturation: 100,
    brightness: 100
  };

  // Calculate relationships for all theme colors
  const colors = {} as { [K in keyof Theme]: ColorRelationship };

  (Object.keys(theme) as Array<keyof Theme>).forEach((key) => {
    const colorValue = theme[key];
    if (typeof colorValue === 'string') {
      colors[key] = calculateColorRelationship(colorValue, seed);
    }
  });

  return {
    id: Date.now().toString(),
    name,
    createdAt: new Date().toISOString(),
    seed,
    colors
  };
}

/**
 * Convert a ThemeTemplate to a Theme object using a hydration seed
 *
 * @param template - The template to hydrate
 * @param hydrationSeed - The seed color to use for hydration
 * @returns Hydrated Theme object
 */
export function templateToTheme(
  template: ThemeTemplate,
  hydrationSeed: HSBColor
): Theme {
  const theme = {} as Theme;

  (Object.keys(template.colors) as Array<keyof Theme>).forEach((key) => {
    const relationship = template.colors[key];
    const hydratedColor = hydrateColorFromRelationship(hydrationSeed, relationship);
    theme[key] = hsbToHex(hydratedColor);
  });

  return theme;
}
