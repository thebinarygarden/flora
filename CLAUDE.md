# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Flora is a **performance-first React component library** built with a tree-shakable, subpath-only import architecture. The core philosophy prioritizes bundle optimization over developer convenience by enforcing specific subpath imports.

This is a pnpm monorepo with two packages:
- `@flora/ui` - The component library (packages/ui/)
- `@flora/site` - Next.js demo/development site (packages/site/)

## Core Architecture Principles

### Subpath-Only Imports (Critical)
Flora **intentionally disables** convenience imports to prevent bundle bloat:

```javascript
// ✅ Required pattern
import { Button } from '@flora/ui/input';
import { IconInfo } from '@flora/ui/icons';
import { ThemeProvider } from '@flora/ui/theme';

// ❌ Intentionally NOT supported
import { Button } from '@flora/ui';
```

**Why:** Icon collections can contain 100+ components. Separating icons from inputs ensures applications importing buttons don't accidentally pull in entire icon libraries.

### Package Exports Structure
The UI library uses explicit subpath exports defined in packages/ui/package.json:
- `./input` - Input components (Button, HSBColorPicker, etc.)
- `./icons` - Icon collection (separate to prevent accidental bloat)
- `./core` - Core components (BGLanding, etc.)
- `./navigation` - Navigation components (MobileNav, etc.)
- `./display` - Display components
- `./theme` - ThemeProvider, useTheme, types
- `./styles.css` - Compiled Tailwind styles

Each subpath exports from its own index.ts file in packages/ui/src/

### Build System
- **Rollup** with ESM output and `preserveModules: true` for optimal tree-shaking
- **@svgr/rollup** converts SVGs to React components
- **PostCSS + Tailwind 4.x** for style compilation
- **TypeScript** with full declaration files and source maps

Build output goes to packages/ui/dist/ with preserved directory structure matching src/

## Development Commands

### Quick Start
```bash
pnpm quick  # Clean install, build UI, start dev site
```

### Individual Commands
```bash
pnpm install           # Install all dependencies
pnpm build:ui          # Build @flora/ui component library
pnpm build:site        # Build @flora/site Next.js app
pnpm run:site          # Start development server at localhost:3000
pnpm clean             # Remove all node_modules, dist, and .next directories
```

### Package-Specific Commands
```bash
# From packages/ui/
pnpm build             # Build component library (uses Rollup)

# From packages/site/
pnpm dev               # Start Next.js dev server (requires UI library built first)
pnpm build             # Production build
pnpm start             # Start production server
pnpm lint              # Run ESLint
```

## Development Workflow

### Making Changes to UI Components
1. Edit components in `packages/ui/src/`
2. Run `pnpm build:ui` from root to rebuild
3. View changes at `localhost:3000` (if dev server running)
4. UI library changes require rebuild - no hot reload

### Adding New Components
1. Add component to appropriate directory in `packages/ui/src/`
   - Input components → `src/input/`
   - Icons → `src/icons/`
   - Navigation → `src/navigation/`
   - Core → `src/core/`
   - Display → `src/display/`
2. Export from the directory's `index.ts`
3. Add to rollup.config.mjs inputs if creating new subpath
4. Update package.json exports if creating new subpath
5. Build and test: `pnpm build:ui && pnpm run:site`

### Theme System
Flora requires ThemeProvider wrapping the application with both lightTheme and darkTheme objects conforming to the Theme type. See packages/ui/README.md for full theme structure.

Components access theme via `useTheme()` hook which provides:
- `theme` - Current theme object with all color values
- `isDark` - Boolean for current mode
- `toggleTheme` - Function to switch themes

Theme automatically switches based on system preference.

## Tech Stack

**UI Library:**
- React 18.2+ / React DOM 18.2+
- Framer Motion 11.0+ (peer dependency)
- Tailwind CSS 4.x (peer dependency)
- TypeScript 5.3+
- Rollup 4.6+ for bundling

**Demo Site:**
- Next.js 15.4.4 with App Router
- React 19.1.0
- Tailwind CSS 4.x
- TypeScript 5.x

## Important Files

- `rollup.config.mjs` - Build configuration for UI library
- `packages/ui/src/styles.css` - Global styles compiled with Tailwind
- `packages/ui/package.json` - Defines all subpath exports
- `packages/site/src/app/themes.ts` - Example theme definitions

## Testing Changes
Always test UI library changes in the demo site before committing. The site demonstrates correct usage patterns and integration.
