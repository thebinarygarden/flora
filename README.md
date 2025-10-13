# Flora

> **The plants of a particular region** - A performance-first React component library for Binary Garden projects

Flora is a React component library built specifically for Binary Garden projects. It leverages **Tailwind CSS** for styling and **Framer Motion** for animations. Flora's CSS system is **theme-driven**, consuming color themes from your application through the `ThemeProvider` - allowing complete control over your design system while maintaining consistent component behavior.

## Philosophy

Flora is built around a **tree-shakable, subpath-only import architecture** that prioritizes bundle optimization over developer convenience. By enforcing explicit subpath imports, Flora prevents accidental bundle bloat and ensures optimal production bundle sizes.

Traditional component libraries allow convenient barrel imports like `import { Button, Icon } from '@library'`, which seems developer-friendly but often leads to:

- **Accidental large bundles** - importing one icon can pull in entire icon collections
- **Poor tree-shaking** - complex dependency graphs make dead code elimination difficult
- **Hidden bundle impact** - developers unaware of what they're actually shipping

Flora takes a different approach by **forcing intentional imports**:

```javascript
// ✅ Flora requires explicit subpath imports
import { Button } from '@binarygarden/flora/input';
import { IconGithub } from '@binarygarden/flora/icons';
import { ThemeProvider } from '@binarygarden/flora/theme';

// ❌ This is intentionally NOT supported
import { Button, IconGithub } from '@binarygarden/flora';
```

This makes bundle impact explicit and prevents accidental imports. Icons are separated from inputs because icon collections can contain 100+ components - applications importing buttons shouldn't accidentally pull in entire icon libraries.

## Monorepo Structure

This is a pnpm workspace monorepo with two packages:

```
packages/
  flora/          # @binarygarden/flora - Component library
  site/           # bgflora-site - Next.js demo/development site
```

- **@binarygarden/flora** - The main component library published to npm
- **bgflora-site** - Development site for testing and showcasing components

## Quick Start

### Installation

Flora requires React 18.2+, Framer Motion, and Tailwind CSS 4.x as peer dependencies. Install them alongside Flora:

```bash
npm install @binarygarden/flora react react-dom framer-motion tailwindcss
# or
pnpm add @binarygarden/flora react react-dom framer-motion tailwindcss
```

**Note:** If you already have React and Tailwind CSS installed in your project, you only need to add Flora and Framer Motion.

### Basic Usage

```javascript
// Import components from specific subpaths
import { Button } from '@binarygarden/flora/input';
import { IconGithub } from '@binarygarden/flora/icons';
import { ThemeProvider } from '@binarygarden/flora/theme';
import { Badge } from '@binarygarden/flora/display';

// Import compiled styles
import '@binarygarden/flora/styles.css';
```

### Theme Setup

Flora requires wrapping your application with `ThemeProvider`:

```tsx
import { ThemeProvider, type Theme } from '@binarygarden/flora/theme';

const lightTheme: Theme = {
  primary: '#2563eb',
  onPrimary: '#ffffff',
  // ... see Flora package README for complete structure
};

const darkTheme: Theme = {
  primary: '#3b82f6',
  onPrimary: '#ffffff',
  // ... see Flora package README for complete structure
};

function App() {
  return (
    <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

## Development

### Prerequisites

- **Node.js** 20+
- **pnpm** 10.8.0+

### Setup Commands

```bash
# Quick start (recommended) - clean, install, build, and run
pnpm quick

# Or step-by-step
pnpm install          # Install all dependencies
pnpm build:ui         # Build @binarygarden/flora component library
pnpm run:site         # Start development server at localhost:3000
```

### Available Commands

| Command | Description |
|---------|-------------|
| `pnpm quick` | Clean install, build UI library, start dev server |
| `pnpm build:ui` | Build @binarygarden/flora component library |
| `pnpm build:site` | Build bgflora-site Next.js app |
| `pnpm run:site` | Start development server at localhost:3000 |
| `pnpm clean` | Remove all node_modules, dist, and .next directories |

### Development Workflow

#### Making Changes to UI Components

1. Edit components in `packages/flora/src/`
2. Run `pnpm build:ui` from root to rebuild library
3. Changes appear at `localhost:3000` (if dev server running)

**Note:** UI library changes require rebuild - there's no hot module reload for the library itself.

#### Adding New Components

1. Add component to appropriate directory:
   - `packages/flora/src/input/` - Input components
   - `packages/flora/src/icons/` - Icon components
   - `packages/flora/src/core/` - Core components
   - `packages/flora/src/navigation/` - Navigation components
   - `packages/flora/src/display/` - Display components
   - `packages/flora/src/theme/` - Theme utilities

2. Export from the directory's `index.ts`

3. If creating a new subpath category:
   - Add to `rollup.config.mjs` inputs
   - Add to `package.json` exports

4. Build and test: `pnpm build:ui && pnpm run:site`

## Architecture

### Available Subpaths

Flora exports the following subpaths (see individual package README for complete component list):

- `@binarygarden/flora/input` - Input components (Button, HSBColorPicker)
- `@binarygarden/flora/icons` - Icon collection (20+ icons)
- `@binarygarden/flora/core` - Core components (BGLanding)
- `@binarygarden/flora/navigation` - Navigation components (MobileNav)
- `@binarygarden/flora/display` - Display components (Badge, Card, CopyableText, FullScreenOverlay)
- `@binarygarden/flora/theme` - Theme system (ThemeProvider, hooks, utilities)
- `@binarygarden/flora/styles.css` - Compiled Tailwind styles

### Build System

- **Rollup** with ESM output and `preserveModules: true` for optimal tree-shaking
- **TypeScript** with full declaration files and source maps
- **@svgr/rollup** converts SVGs to React components
- **PostCSS + Tailwind 4.x** for style compilation

Build output goes to `packages/flora/dist/` with preserved directory structure matching `src/`.

### Tech Stack

**UI Library:**
- React 18.2+ (peer dependency)
- React DOM 18.2+ (peer dependency)
- Framer Motion 11.0+ (peer dependency)
- Tailwind CSS 4.x (peer dependency)
- TypeScript 5.3+
- Rollup 4.6+ for bundling

**Demo Site:**
- Next.js 15.4.4 with App Router
- React 19.1.0
- Tailwind CSS 4.x
- TypeScript 5.x

## Package Documentation

For detailed documentation on each package:

- **[Flora Component Library README](packages/flora/README.md)** - Complete component API, theme system details
- **[Demo Site README](packages/site/README.md)** - Development site information

## Why Subpath-Only Imports?

### Performance First

Every architectural decision prioritizes bundle size:

1. **Prevents accidental imports** - Can't import entire icon collection when you only need one button
2. **Makes dependencies explicit** - Clear visibility into what parts of the library you're using
3. **Improves tree-shaking** - Bundlers can eliminate unused categories entirely
4. **Better bundle analysis** - Easier to track actual usage in production

### The Icon Problem

Icon collections commonly grow to 100+ components. Without subpath isolation:

```javascript
// Developer imports a button
import { Button } from '@library';

// But the icon collection is in the same barrel export...
// Now their bundle potentially includes 100+ unused icons!
```

With Flora's architecture:

```javascript
// Icons are completely separate
import { Button } from '@binarygarden/flora/input';
import { IconGithub } from '@binarygarden/flora/icons';

// Bundle only includes what you explicitly import
```

## Contributing

This is currently a monorepo for Binary Garden projects. For contribution guidelines and detailed development information, see individual package READMEs.

## License

MIT - Binary Garden
