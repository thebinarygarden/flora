# @flora/ui

The core UI component library for Flora. Built with performance-first architecture and forced tree-shaking.

## Installation

```bash
npm install @flora/ui
# or
pnpm add @flora/ui
# or  
yarn add @flora/ui
```

## Usage

Flora enforces **subpath-only imports** to prevent accidental bundle bloat:

```javascript
// ✅ Required import pattern
import { Button } from '@flora/ui/input';
import { IconGithub, IconInfo } from '@flora/ui/icons';
import { ThemeProvider, useTheme } from '@flora/ui/theme';

// ❌ This will NOT work (intentionally disabled)
// import { Button, IconGithub } from '@flora/ui';
```

Flora comes with it's own compiled styles, and requires that the style sheet be imported to the global.css of the consuming project:
``` css
@import '@flora/ui/styles.css';
```

## Theme Setup

Flora requires you to wrap your application with the `ThemeProvider` and provide both light and dark themes:

```tsx
import { ThemeProvider, type Theme } from '@flora/ui/theme';

// Define your themes
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
  // ... your dark theme values
};

// Wrap your app
function App() {
  return (
    <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme}>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### Theme Structure

The `Theme` type includes all the colors and typography needed for consistent theming:

- **Brand Colors**: `primary`, `secondary`, `tertiary` (with corresponding `on*` colors)
- **Surface Hierarchy**: `background`, `surface` for different elevation levels
- **Interactive States**: `hover`, `focus`, `disabled` for user interactions
- **Semantic Colors**: `error`, `success`, `warning` for status communication

### Using Themes in Components

Components automatically receive the current theme via React context. The theme switches automatically based on system preference, but you can also provide manual controls:

```tsx
import { useTheme } from '@flora/ui/theme';

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

## Available Components

Available components can be searched and observed using Flora's site: https://bgflora.app

## Architecture

### Build System
- **Rollup** with ESM output and preserved modules
- **TypeScript** with full declaration files
- **@svgr/rollup** for SVG-to-React conversion
- **PostCSS + Tailwind** for style processing

### Package Exports
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
    "./styles.css": "./dist/styles.css"
  }
}
```

## Development

### Setup
```bash
# From repository root
pnpm install
pnpm build:ui
```

## Design Philosophy

### Why No Convenience Imports?
The main `index.ts` is intentionally empty to force developers to import from specific subpaths. This:

1. **Prevents accidental bloat** - Can't accidentally import entire icon collection
2. **Makes dependencies explicit** - Clear what parts of the library you're using  
3. **Improves tree-shaking** - Bundlers can eliminate unused categories entirely
4. **Better bundle analysis** - Easier to track what's actually being used

### Performance First
Every architectural decision prioritizes bundle size:
- Icons separated from inputs to prevent importing large collections
- ESM with preserved modules for optimal tree-shaking
- Minimal runtime dependencies (only `tslib`)
- SVGs converted to React components for better optimization

## Peer Dependencies

Required in your project:
- `react`: ^18.2.0
- `react-dom`: ^18.2.0  
- `tailwindcss`: ^4

## TypeScript Support

Full TypeScript support with:
- Declaration files for all components
- Source maps for debugging
- Strict type checking