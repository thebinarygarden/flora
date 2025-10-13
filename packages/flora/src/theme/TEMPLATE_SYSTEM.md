# Theme Template System

## Overview

The Theme Template system allows you to save color themes and "hydrate" them with different seed colors to create variations while preserving the original color relationships.

## How It Works

### Ratio-Based Storage

Instead of storing absolute color values, templates store **relationships** between colors using ratios:

```typescript
interface ColorRelationship {
  hueDelta: number;           // Hue shift from seed (-180 to +180)
  saturationRatio: number;    // Saturation as ratio of seed (0.0-2.0)
  brightnessRatio: number;    // Brightness as ratio of seed (0.0-2.0)
  minSaturation?: number;     // Floor value for grays
  minBrightness?: number;     // Floor value for dark colors
}
```

### Example

**Saving:**
- Seed: Cyan (190°, 100%, 100%)
- Primary: Blue (#2563eb) = (217°, 91%, 92%)
- Relationship stored:
  - `hueDelta: +27` (27° clockwise from seed)
  - `saturationRatio: 0.91` (91% of seed saturation)
  - `brightnessRatio: 0.92` (92% of seed brightness)

**Hydrating with Red (0°, 100%, 100%):**
- Primary becomes: (0° + 27°, 100% × 0.91, 100% × 0.92) = (27°, 91%, 92%)
- Result: Orange-red color with same relative properties

**Hydrating with Muted Purple (270°, 50%, 60%):**
- Primary becomes: (270° + 27°, 50% × 0.91, 60% × 0.92) = (297°, 45.5%, 55.2%)
- Result: Muted magenta with proportionally reduced vibrancy

## Usage

### Saving a Template

1. Create your theme using the Theme Creator
2. Click "Save Template" button at bottom of page
3. Enter a name
4. Template saved with cyan (190°) seed by default

```typescript
import { saveTemplate } from './_utils/themeStorage';

const template = saveTemplate(myTheme, "Ocean Vibes", 190);
```

### Loading Templates

```typescript
import { loadTemplates, getTemplateById } from './_utils/themeStorage';

// Get all templates
const templates = loadTemplates();

// Get specific template
const template = getTemplateById("1699123456789");
```

### Hydrating a Template

```typescript
import { hydrateTemplate } from './_utils/themeStorage';

// Hydrate with pure red (full saturation/brightness)
const redTheme = hydrateTemplate("1699123456789", 0, 100, 100);

// Hydrate with muted blue
const mutedBlueTheme = hydrateTemplate("1699123456789", 220, 50, 70);

// Hydrate with pure green (S/B default to 100)
const greenTheme = hydrateTemplate("1699123456789", 120);
```

## Edge Cases Handled

### Pure Grays (S < 15%)
Colors like `onBackground: #111827` (saturation ~5%) are locked:
- `minSaturation: 5` prevents them from becoming colorful
- Preserves neutral text/backgrounds

### Very Dark Colors (B < 20%)
Near-black colors maintain darkness:
- `minBrightness: 10` ensures they stay dark even with bright seeds

### Very Bright Colors (B > 95%, S < 10%)
Near-white colors stay white:
- Both `minSaturation` and `minBrightness` locked
- Prevents white backgrounds becoming tinted

## localStorage Structure

```json
{
  "templates": [
    {
      "id": "1699123456789",
      "name": "Ocean Vibes",
      "createdAt": "2025-10-11T10:30:00.000Z",
      "seed": {
        "hue": 190,
        "saturation": 100,
        "brightness": 100
      },
      "colors": {
        "primary": {
          "hueDelta": 27,
          "saturationRatio": 0.91,
          "brightnessRatio": 0.92
        },
        "onBackground": {
          "hueDelta": 28,
          "saturationRatio": 0.05,
          "brightnessRatio": 0.10,
          "minSaturation": 5,
          "minBrightness": 10
        }
        // ... all theme colors
      }
    }
  ]
}
```

## Benefits

1. **Hue Rotation**: Change entire theme color scheme instantly
2. **Tone Shifting**: Create darker/lighter or muted/vibrant variants
3. **Accessibility**: Generate high-contrast or low-contrast versions
4. **Compact Storage**: Only stores mathematical relationships
5. **Infinite Variations**: One template → unlimited color schemes

## API Reference

### Color Conversion
- `hexToHSB(hex: string): HSBColor`
- `hsbToHex(hsb: HSBColor): string`
- `shortestHuePath(from: number, to: number): number`
- `applyHueDelta(hue: number, delta: number): number`

### Template Calculation
- `calculateColorRelationship(hex: string, seed: HSBColor): ColorRelationship`
- `hydrateColorFromRelationship(seed: HSBColor, rel: ColorRelationship): HSBColor`
- `themeToTemplate(theme: Theme, name: string, seedHue?: number): ThemeTemplate`
- `templateToTheme(template: ThemeTemplate, seed: HSBColor): Theme`

### Storage
- `loadTemplates(): ThemeTemplate[]`
- `saveTemplate(theme: Theme, name: string, seedHue?: number): ThemeTemplate`
- `deleteTemplate(id: string): boolean`
- `hydrateTemplate(id: string, hue: number, sat?: number, bright?: number): Theme | null`
- `getTemplateById(id: string): ThemeTemplate | null`
- `updateTemplateName(id: string, name: string): boolean`
