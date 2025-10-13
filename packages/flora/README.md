# @binarygarden/flora

Performance-first React component library with tree-shakable subpath imports.

[![npm version](https://img.shields.io/npm/v/@binarygarden/flora)](https://www.npmjs.com/package/@binarygarden/flora)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

Flora is built around **forced tree-shaking** through subpath-only imports. Unlike traditional component libraries that allow barrel imports, Flora intentionally prevents `import { Button } from '@binarygarden/flora'` to eliminate accidental bundle bloat.

### Key Features

- **Subpath-Only Imports** - Enforced separation prevents accidental large bundles
- **Performance First** - Every architectural decision prioritizes bundle size
- **Tailwind Native** - Components use Tailwind CSS 4.x
- **Zero Runtime Bloat** - Minimal dependencies (only tslib)
- **TypeScript First** - Full type safety with declaration maps
- **Advanced Theme System** - Dynamic theming with template support

## Installation

```bash
npm install @binarygarden/flora framer-motion
# or
pnpm add @binarygarden/flora framer-motion
# or
yarn add @binarygarden/flora framer-motion
```

### Peer Dependencies

Required in your project:

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "framer-motion": "^11.0.0",
  "tailwindcss": "^4"
}
```

## Usage

### Import Pattern

Flora **requires** explicit subpath imports:

```javascript
// ✅ Required pattern - explicit subpath imports
import { Button } from '@binarygarden/flora/input';
import { IconGithub, IconInfo } from '@binarygarden/flora/icons';
import { ThemeProvider, useTheme } from '@binarygarden/flora/theme';
import { Badge, Card } from '@binarygarden/flora/display';

// Import compiled styles
import '@binarygarden/flora/styles.css';

// ❌ This will NOT work (intentionally disabled)
import { Button, IconGithub } from '@binarygarden/flora';
```

**Why?** This architecture prevents accidentally importing entire icon collections (100+ components) when you only need a button. See [Design Philosophy](#design-philosophy) for details.

### Basic Setup

```tsx
import { ThemeProvider } from '@binarygarden/flora/theme';
import { Button } from '@binarygarden/flora/input';
import '@binarygarden/flora/styles.css';

function App() {
  return (
    <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme}>
      <Button variant="primary">Click me</Button>
    </ThemeProvider>
  );
}
```

## Available Components

### Input (`@binarygarden/flora/input`)

Interactive input components for user interaction.

#### Button

```tsx
import { Button } from '@binarygarden/flora/input';

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="outline">Outline</Button>
<Button disabled>Disabled</Button>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'tertiary' | 'outline'`
- `disabled`: `boolean`
- Standard button HTML attributes

#### HSBColorPicker

Interactive HSB (Hue, Saturation, Brightness) color picker component.

```tsx
import { HSBColorPicker, type HSBColor } from '@binarygarden/flora/input';

const [color, setColor] = useState<HSBColor>({
  hue: 180,
  saturation: 50,
  brightness: 50
});

<HSBColorPicker value={color} onChange={setColor} />
```

**Props:**
- `value`: `HSBColor` - Current color value
- `onChange`: `(color: HSBColor) => void` - Change handler

**Color Utilities:**
```tsx
import { hsbToHex, hexToHsb, hexToRgb } from '@binarygarden/flora/input';

const hex = hsbToHex({ hue: 180, saturation: 50, brightness: 50 });
const hsb = hexToHsb('#3b82f6');
const rgb = hexToRgb('#3b82f6');
```

### Icons (`@binarygarden/flora/icons`)

SVG icon components optimized for performance.

```tsx
import { IconGithub, IconInfo, IconArrow } from '@binarygarden/flora/icons';

<IconGithub size={24} color="#000000" />
<IconInfo size={16} strokeWidth="regular" />
<IconArrow direction="right" size={20} />
```

**Available Icons:**

- `IconArrow` - Directional arrow (supports `direction` prop)
- `IconBGDocs` - Binary Garden documentation icon
- `IconBGLogo` - Binary Garden logo
- `IconContact` - Contact/mail icon
- `IconCopy` - Copy to clipboard icon
- `IconDay` - Sun/day mode icon
- `IconEyeDropper` - Color picker/eyedropper icon
- `IconGithub` - GitHub logo
- `IconHide` - Hide/visibility off icon
- `IconInfo` - Information icon
- `IconLinkOut` - External link icon
- `IconMenu` - Hamburger menu icon
- `IconNight` - Moon/night mode icon
- `IconPaintBrush` - Paint brush/theme icon
- `IconSave` - Save/disk icon
- `IconSearch` - Search/magnifying glass icon
- `IconView` - View/visibility on icon
- `IconX` - Close/X icon
- `IconYoutube` - YouTube logo

**IconProps:**
```tsx
type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: 'thin' | 'regular' | 'thick';
  className?: string;
};
```

### Display (`@binarygarden/flora/display`)

Components for displaying content and information.

#### Badge

```tsx
import { Badge } from '@binarygarden/flora/display';

<Badge variant="primary">New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="warning">Warning</Badge>
```

#### Card

```tsx
import { Card } from '@binarygarden/flora/display';

<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

#### CopyableText

Text component with built-in copy-to-clipboard functionality.

```tsx
import { CopyableText } from '@binarygarden/flora/display';

<CopyableText value="#3b82f6" />
```

#### FullScreenOverlay

Full-screen modal overlay component.

```tsx
import { FullScreenOverlay } from '@binarygarden/flora/display';

<FullScreenOverlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <div>Overlay content</div>
</FullScreenOverlay>
```

### Navigation (`@binarygarden/flora/navigation`)

Navigation components for application structure.

#### MobileNav

Responsive mobile navigation component with animated menu.

```tsx
import { MobileNav, type NavItem } from '@binarygarden/flora/navigation';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

<MobileNav items={navItems} />
```

### Core (`@binarygarden/flora/core`)

Core Binary Garden components.

#### BGLanding

Binary Garden branded landing component.

```tsx
import { BGLanding } from '@binarygarden/flora/core';

<BGLanding />
```

### Theme (`@binarygarden/flora/theme`)

Complete theming system with dynamic color management.

#### ThemeProvider & useTheme

```tsx
import { ThemeProvider, useTheme, type Theme } from '@binarygarden/flora/theme';

// Define themes
const lightTheme: Theme = {
  // Brand colors
  primary: '#2563eb',
  onPrimary: '#ffffff',
  secondary: '#6b7280',
  onSecondary: '#ffffff',
  tertiary: '#7c3aed',
  onTertiary: '#ffffff',

  // Surface hierarchy
  background: '#ffffff',
  onBackground: '#111827',
  surface: '#f9fafb',
  onSurface: '#374151',

  // Interactive states
  border: '#d1d5db',
  hover: '#2563eb',
  focus: '#3b82f6',
  disabled: '#f3f4f6',
  onDisabled: '#9ca3af',

  // Semantic states
  error: '#dc2626',
  onError: '#ffffff',
  success: '#16a34a',
  onSuccess: '#ffffff',
  warning: '#ca8a04',
  onWarning: '#ffffff'
};

const darkTheme: Theme = {
  // ... dark theme colors
};

// Wrap your app
function App() {
  return (
    <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme}>
      <YourApp />
    </ThemeProvider>
  );
}

// Use in components
function MyComponent() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <div style={{ backgroundColor: theme.surface, color: theme.onSurface }}>
      <button onClick={toggleTheme}>
        Switch to {isDark ? 'light' : 'dark'} mode
      </button>
    </div>
  );
}
```

**Theme Type Structure:**

```typescript
type Theme = {
  // Brand colors
  primary: string;
  onPrimary: string;
  secondary: string;
  onSecondary: string;
  tertiary: string;
  onTertiary: string;

  // Surface hierarchy
  background: string;    // Page background
  onBackground: string;
  surface: string;       // Cards, modals
  onSurface: string;

  // Interactive states
  border: string;        // Borders, dividers
  hover: string;         // Hover overlays
  focus: string;         // Focus rings
  disabled: string;      // Disabled backgrounds
  onDisabled: string;

  // Semantic states
  error: string;
  onError: string;
  success: string;
  onSuccess: string;
  warning: string;
  onWarning: string;
};
```

#### ThemeToggleButton

Pre-built theme toggle button component.

```tsx
import { ThemeToggleButton } from '@binarygarden/flora/theme';

<ThemeToggleButton />
```

#### ColorPickerDropdown

Advanced color picker with theme integration.

```tsx
import { ColorPickerDropdown } from '@binarygarden/flora/theme';

<ColorPickerDropdown />
```

#### ThemeScript

Client-side script for preventing theme flash on page load. Add to your HTML `<head>`:

```tsx
import { ThemeScript } from '@binarygarden/flora/theme';

<head>
  <ThemeScript />
</head>
```

#### Theme Templates

Flora includes a powerful template system for saving and rehydrating themes with different seed colors.

```tsx
import {
  themeToTemplate,
  templateToTheme,
  type ThemeTemplate
} from '@binarygarden/flora/theme';

// Save current theme as template
const template: ThemeTemplate = themeToTemplate(
  currentLightTheme,
  currentDarkTheme,
  { name: 'My Theme', id: 'theme-123' }
);

// Rehydrate template with new seed color
const newTheme = templateToTheme(template, {
  hue: 200,
  saturation: 60,
  brightness: 50
});
```

**Color Utilities:**

```tsx
import {
  hsbToHex,
  hexToHSB,
  hexToRgb,
  applyHueDelta,
  shortestHuePath
} from '@binarygarden/flora/theme';

// Convert between color formats
const hex = hsbToHex({ hue: 200, saturation: 50, brightness: 50 });
const hsb = hexToHSB('#3b82f6');
const rgb = hexToRgb('#3b82f6');

// Calculate hue relationships
const delta = shortestHuePath(180, 270); // -90
const newHue = applyHueDelta(180, -90);   // 90
```

## Design Philosophy

### Why No Convenience Imports?

The main `index.ts` is intentionally empty to force developers to import from specific subpaths. This provides:

1. **Prevents accidental bloat** - Can't accidentally import entire icon collection (100+ components)
2. **Makes dependencies explicit** - Clear visibility into what parts of library you're using
3. **Improves tree-shaking** - Bundlers can eliminate unused categories entirely
4. **Better bundle analysis** - Easier to track actual usage in production builds

### Performance First

Every architectural decision prioritizes bundle size:

- **Icons separated from inputs** - Prevents importing large collections accidentally
- **ESM with preserved modules** - Optimal tree-shaking
- **Minimal runtime dependencies** - Only `tslib` (automatically added by TypeScript)
- **SVGs converted to React components** - Better optimization than runtime SVG parsing
- **Compiled Tailwind styles** - Single CSS file, no runtime style generation

### The Icon Problem Explained

Icon collections commonly grow to 100+ components. Without subpath isolation:

```javascript
// packages/ui/src/index.ts (typical library)
export * from './input/Button';
export * from './icons/IconGithub';
export * from './icons/IconTwitter';
// ... 98 more icon exports

// Developer imports a button
import { Button } from '@library';

// Their bundler may pull in references to ALL exports,
// even with tree-shaking, depending on bundler config
```

With Flora's architecture:

```javascript
// Icons are completely separate
import { Button } from '@binarygarden/flora/input';
import { IconGithub } from '@binarygarden/flora/icons';

// Bundler can eliminate the entire icons/ directory
// if you never import from it
```

## Architecture

### Build System

Flora uses Rollup for optimal ESM output:

```javascript
// rollup.config.mjs
export default {
  input: [
    'src/input/index.ts',
    'src/icons/index.ts',
    'src/core/index.ts',
    'src/navigation/index.ts',
    'src/theme/index.ts',
    'src/display/index.ts',
    'src/styles.css'
  ],
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,      // Keeps directory structure
    preserveModulesRoot: 'src',
    sourcemap: true
  },
  plugins: [
    svgr(),           // SVG to React components
    typescript(),     // TypeScript compilation
    postcss()         // Tailwind CSS compilation
  ]
};
```

**Key Features:**
- **preserveModules: true** - Maintains source directory structure for optimal tree-shaking
- **ESM only** - Modern bundle format for best performance
- **Full TypeScript support** - Declaration files and source maps
- **SVG optimization** - SVGs converted to optimized React components

### Package Exports

All subpaths are explicitly defined in `package.json`:

```json
{
  "exports": {
    "./input": {
      "import": "./dist/input/index.js",
      "types": "./dist/input/index.d.ts"
    },
    "./icons": {
      "import": "./dist/icons/index.js",
      "types": "./dist/icons/index.d.ts"
    },
    "./core": {
      "import": "./dist/core/index.js",
      "types": "./dist/core/index.d.ts"
    },
    "./navigation": {
      "import": "./dist/navigation/index.js",
      "types": "./dist/navigation/index.d.ts"
    },
    "./theme": {
      "import": "./dist/theme/index.js",
      "types": "./dist/theme/index.d.ts"
    },
    "./display": {
      "import": "./dist/display/index.js",
      "types": "./dist/display/index.d.ts"
    },
    "./styles.css": "./dist/styles.css"
  }
}
```

This enforces subpath-only imports at the package level.

## Development

### Building the Library

```bash
# From packages/flora/ directory
pnpm build

# Or from repository root
pnpm build:ui
```

Output goes to `dist/` with preserved source directory structure:

```
dist/
  input/
    index.js
    index.d.ts
    Button.js
    Button.d.ts
  icons/
    index.js
    index.d.ts
    IconGithub.js
    IconGithub.d.ts
  // ... other subpaths
  styles.css
```

### Adding New Components

1. **Create component** in appropriate `src/` subdirectory
2. **Export from index.ts** in that subdirectory
3. **Build and test**: `pnpm build:ui`

**Example:**

```tsx
// src/input/TextField.tsx
export function TextField(props: TextFieldProps) {
  return <input {...props} />;
}

// src/input/index.ts
export { TextField } from './TextField';
export type { TextFieldProps } from './TextField';

// Usage
import { TextField } from '@binarygarden/flora/input';
```

### Creating New Subpaths

If you need a new category (e.g., `./layout`):

1. **Create directory**: `src/layout/`
2. **Add to rollup.config.mjs inputs**: `'src/layout/index.ts'`
3. **Add to package.json exports**:
   ```json
   {
     "exports": {
       "./layout": {
         "import": "./dist/layout/index.js",
         "types": "./dist/layout/index.d.ts"
       }
     }
   }
   ```
4. **Build**: `pnpm build`

## TypeScript Support

Full TypeScript support with:

- **Declaration files** (`.d.ts`) for all exports
- **Declaration maps** (`.d.ts.map`) for IDE navigation
- **Source maps** (`.js.map`) for debugging
- **Strict type checking**

Your IDE will have full autocomplete and type information:

```tsx
import { Button } from '@binarygarden/flora/input';
import type { ButtonProps, Theme } from '@binarygarden/flora/input';
//            ^-- Full type information available
```

## Browser Support

Flora supports all modern browsers that support:

- ES2020+ JavaScript features
- CSS Grid and Flexbox
- CSS Custom Properties (CSS variables)

Effectively: Chrome 88+, Firefox 78+, Safari 14+, Edge 88+

## Repository

- **GitHub**: https://github.com/thebinarygarden/flora
- **Issues**: https://github.com/thebinarygarden/flora/issues
- **npm**: https://www.npmjs.com/package/@binarygarden/flora

## License

MIT - Binary Garden

---

**Built with ❤️ by Binary Garden**

For development site and live examples, see [Demo Site README](../site/README.md)
