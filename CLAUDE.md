# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Flora is a React component library for Binary Garden projects built as a pnpm monorepo. It uses a **defensive architecture** with subpath-only imports to guarantee optimal bundle sizes without relying on tree-shaking.

Published to npm as `@binarygarden/flora` (currently v0.0.2).

## Monorepo Structure

- `packages/flora/` - Main component library (published package)
- `packages/site/` - Next.js 15 demo site for testing components
- `docs/` - Architecture, development, and theme system documentation

## Essential Commands

### Quick Start
```bash
pnpm quick  # Clean, install, build UI, start dev server at localhost:3000
```

### Build Commands
```bash
pnpm build:ui       # Build @binarygarden/flora (required after library changes)
pnpm build:site     # Build Next.js demo site
pnpm run:site       # Start dev server at localhost:3000
pnpm clean          # Remove node_modules, dist, .next from all packages
```

### Development Workflow
**Important:** Library changes require rebuild - no HMR for the library itself.

```bash
# Terminal 1 - Keep dev server running
pnpm run:site

# Terminal 2 - Rebuild after each component change
pnpm build:ui
# Then refresh browser
```

Demo site changes have hot module reload.

### Publishing (from packages/flora/)
```bash
# 1. Update version in packages/flora/package.json
# 2. Build the library
pnpm build:ui
# 3. Publish from library directory
cd packages/flora && npm publish
```

## Architecture Principles

### Defensive Architecture: Subpath-Only Imports

Flora enforces subpath imports at the package level to guarantee optimal bundle sizes:

```javascript
// ✅ Required (explicit category imports)
import { Button } from '@binarygarden/flora/input';
import { IconGithub } from '@binarygarden/flora/icons';
import { ThemeProvider } from '@binarygarden/flora/theme';

// ❌ Not supported (main index.ts is empty)
import { Button } from '@binarygarden/flora';
```

**Why this matters:**
- Icons directory isolated from inputs/navigation/etc
- Unused categories eliminated at module resolution (before bundler optimizations)
- Bundle size controlled by structure, not tooling
- No risk of accidentally importing 100+ icons when you only need a button

### Available Subpaths
- `@binarygarden/flora/input` - Form components (Button, HSBColorPicker, etc)
- `@binarygarden/flora/icons` - Icon components (20+ SVG icons)
- `@binarygarden/flora/core` - Core utilities
- `@binarygarden/flora/navigation` - Navigation components
- `@binarygarden/flora/theme` - ThemeProvider and theme utilities
- `@binarygarden/flora/display` - Display components
- `@binarygarden/flora/styles.css` - Global styles

### Critical Rules

1. **Never add barrel exports** - `packages/flora/src/index.ts` must stay empty
2. **Keep icons isolated** - Icon category never imported unless explicitly needed
3. **All components depend on ThemeProvider** - Use CSS variables like `var(--primary)`, never hardcoded colors
4. **One category = one directory** - Each with its own `index.ts` export file

## Build System

Uses Rollup with `preserveModules: true` to maintain source structure in output:

```javascript
// rollup.config.mjs inputs (packages/flora/rollup.config.mjs:8-16)
input: [
    'src/input/index.ts',
    'src/icons/index.ts',
    'src/core/index.ts',
    'src/navigation/index.ts',
    'src/theme/index.ts',
    'src/display/index.ts',
    'src/styles.css',
]
```

**Key settings:**
- ESM only (`format: 'esm'`)
- `preserveModules: true` - Each component becomes separate file for optimal tree-shaking
- External: react, react-dom, framer-motion (peer dependencies)
- Plugins: svgr (SVG → React components), TypeScript, PostCSS (Tailwind)

### Adding New Components

1. Create component in appropriate category directory (input, display, navigation, etc.)
2. Export from category's `index.ts`
3. Build: `pnpm build:ui`
4. Test in demo site: `pnpm run:site`

### Creating New Subpaths

1. Create category directory in `packages/flora/src/`
2. Add entry point to `rollup.config.mjs` inputs
3. Add subpath to `packages/flora/package.json` exports:
   ```json
   "./category-name": {
     "import": "./dist/category-name/index.js",
     "types": "./dist/category-name/index.d.ts"
   }
   ```
4. Build: `pnpm build:ui`

## Theme System

All components use CSS variables provided by `ThemeProvider`:

```typescript
import { ThemeProvider } from '@binarygarden/flora/theme';

<ThemeProvider theme={myTheme}>
  <App />
</ThemeProvider>
```

**Theme Template System:**
- Saves color themes as **ratios** (relationships between colors)
- Hydrate templates with different seed colors to create variations
- Preserves relative color properties (hue shifts, saturation/brightness ratios)
- Handles edge cases: pure grays, near-black, near-white colors

See `docs/THEME_SYSTEM.md` for detailed API.

## Icon Handling

Icons are SVGs converted to React components via `@svgr/rollup`:

1. Add SVG to `packages/flora/src/icons/`
2. Use `currentColor` for fills/strokes
3. Include `viewBox` attribute
4. Export from `packages/flora/src/icons/index.ts`
5. Build: `pnpm build:ui`

Icons remain architecturally isolated - never imported unless explicitly needed.

## Demo Site (packages/site/)

Next.js 15 app for testing components during development:

```bash
pnpm run:site  # Starts dev server at localhost:3000
pnpm build:site  # Production build
```

Uses workspace dependency: `"@binarygarden/flora": "workspace:*"`

## Documentation

- `docs/ARCHITECTURE.md` - Defensive architecture philosophy, build system details
- `docs/DEVELOPMENT.md` - Contribution workflow, adding components
- `docs/THEME_SYSTEM.md` - Theme templates, color relationships, hydration API
- `packages/flora/README.md` - Public API documentation

## Technologies

- **Build:** Rollup, TypeScript, PostCSS
- **Styling:** Tailwind CSS v4, CSS variables
- **Animation:** Framer Motion (peer dependency)
- **Icons:** SVGR (SVG → React components)
- **Demo Site:** Next.js 15, React 19

## Important Files

- `packages/flora/rollup.config.mjs` - Build configuration, entry points
- `packages/flora/package.json` - Subpath exports, version, peer dependencies
- `packages/flora/src/index.ts` - Must remain empty (enforces subpath imports)
- `pnpm-workspace.yaml` - Monorepo workspace configuration
