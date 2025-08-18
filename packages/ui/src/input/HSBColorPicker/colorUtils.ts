// Private helper function to convert HSB to normalized RGB values (0-1)
const hsbToNormalizedRgb = (h: number, s: number, b: number): { r: number; g: number; b: number } => {
  const sNorm = s / 100;
  const bNorm = b / 100;
  
  const c = bNorm * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = bNorm - c;
  
  let r = 0, g = 0, blue = 0;
  
  if (h >= 0 && h < 60) {
    r = c; g = x; blue = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; blue = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; blue = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; blue = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; blue = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; blue = x;
  }
  
  return {
    r: r + m,
    g: g + m,
    b: blue + m
  };
};

export const hsbToHex = (h: number, s: number, b: number): string => {
  const { r, g, b: blue } = hsbToNormalizedRgb(h, s, b);
  
  const rHex = Math.round(r * 255).toString(16).padStart(2, '0');
  const gHex = Math.round(g * 255).toString(16).padStart(2, '0');
  const bHex = Math.round(blue * 255).toString(16).padStart(2, '0');
  
  return `#${rHex}${gHex}${bHex}`;
};

export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  // Remove # if present
  const cleanHex = hex.replace('#', '');
  
  // Parse RGB values
  return {
    r: parseInt(cleanHex.slice(0, 2), 16),
    g: parseInt(cleanHex.slice(2, 4), 16),
    b: parseInt(cleanHex.slice(4, 6), 16)
  };
};

export const hexToHsb = (hex: string): { h: number; s: number; b: number } => {
  // Remove # if present
  const cleanHex = hex.replace('#', '');
  
  // Parse RGB values
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
    h: Math.round(h),
    s: Math.round(s * 100),
    b: Math.round(brightness * 100)
  };
};