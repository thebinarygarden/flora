import { HSBColor } from './types';

// ============================================================================
// Internal Helpers
// ============================================================================

/**
 * Convert HSB to normalized RGB values (0-1)
 * @private
 */
const hsbToNormalizedRgb = (
  h: number,
  s: number,
  b: number
): { r: number; g: number; b: number } => {
  const sNorm = s / 100;
  const bNorm = b / 100;

  const c = bNorm * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = bNorm - c;

  let r = 0,
    g = 0,
    blue = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    blue = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    blue = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    blue = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    blue = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    blue = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    blue = x;
  }

  return {
    r: r + m,
    g: g + m,
    b: blue + m,
  };
};

// ============================================================================
// Color Conversion Functions
// ============================================================================

/**
 * Convert HSB color to hex string
 *
 * @param hsb - HSBColor object with hue (0-360), saturation (0-100), brightness (0-100)
 * @returns Hex color string (e.g., "#2563eb")
 *
 * @example
 * hsbToHex({ hue: 217, saturation: 91, brightness: 92 }) // "#2563eb"
 */
export function hsbToHex(hsb: HSBColor): string {
  const { r, g, b: blue } = hsbToNormalizedRgb(
    hsb.hue,
    hsb.saturation,
    hsb.brightness
  );

  const rHex = Math.round(r * 255)
    .toString(16)
    .padStart(2, '0');
  const gHex = Math.round(g * 255)
    .toString(16)
    .padStart(2, '0');
  const bHex = Math.round(blue * 255)
    .toString(16)
    .padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}

/**
 * Convert hex color to HSB object
 *
 * @param hex - Hex color string (with or without #)
 * @returns HSBColor object with hue (0-360), saturation (0-100), brightness (0-100)
 *
 * @example
 * hexToHSB("#2563eb") // { hue: 217, saturation: 91, brightness: 92 }
 */
export function hexToHSB(hex: string): HSBColor {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Parse RGB values (0-255) and normalize to 0-1
  const r = parseInt(cleanHex.slice(0, 2), 16) / 255;
  const g = parseInt(cleanHex.slice(2, 4), 16) / 255;
  const b = parseInt(cleanHex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  let s = 0;
  const brightness = max;

  // Calculate saturation
  if (max !== 0) {
    s = diff / max;
  }

  // Calculate hue
  if (diff !== 0) {
    if (max === r) {
      h = ((g - b) / diff) % 6;
    } else if (max === g) {
      h = (b - r) / diff + 2;
    } else {
      h = (r - g) / diff + 4;
    }
    h = h * 60;
    if (h < 0) h += 360;
  }

  return {
    hue: Math.round(h),
    saturation: Math.round(s * 100),
    brightness: Math.round(brightness * 100),
  };
}

/**
 * Convert hex color to RGB object
 *
 * @param hex - Hex color string (with or without #)
 * @returns RGB object with r, g, b values (0-255)
 *
 * @example
 * hexToRgb("#2563eb") // { r: 37, g: 99, b: 235 }
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Parse RGB values
  return {
    r: parseInt(cleanHex.slice(0, 2), 16),
    g: parseInt(cleanHex.slice(2, 4), 16),
    b: parseInt(cleanHex.slice(4, 6), 16),
  };
}

// ============================================================================
// Hue Manipulation Functions
// ============================================================================

/**
 * Calculate the shortest path between two hues on the color wheel
 * Returns a delta between -180 and +180 degrees
 *
 * @param fromHue - Starting hue (0-360)
 * @param toHue - Target hue (0-360)
 * @returns Shortest hue delta (-180 to +180)
 *
 * @example
 * shortestHuePath(10, 350) // Returns -20 (go left, not +340)
 * shortestHuePath(350, 10) // Returns +20 (go right, not -340)
 * shortestHuePath(0, 180) // Returns +180 (or -180, both equal)
 */
export function shortestHuePath(fromHue: number, toHue: number): number {
  // Normalize to 0-360
  const from = ((fromHue % 360) + 360) % 360;
  const to = ((toHue % 360) + 360) % 360;

  // Calculate direct delta
  let delta = to - from;

  // Adjust to shortest path
  if (delta > 180) {
    delta -= 360;
  } else if (delta < -180) {
    delta += 360;
  }

  return delta;
}

/**
 * Apply a hue delta to a hue value, wrapping around the color wheel
 *
 * @param hue - Base hue (0-360)
 * @param delta - Hue delta to apply (-∞ to +∞)
 * @returns Normalized hue (0-360)
 *
 * @example
 * applyHueDelta(350, 30) // Returns 20 (wraps around)
 * applyHueDelta(10, -30) // Returns 340 (wraps around)
 */
export function applyHueDelta(hue: number, delta: number): number {
  const result = hue + delta;
  return ((result % 360) + 360) % 360;
}
