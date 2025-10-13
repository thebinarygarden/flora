# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Flora is a **performance-first React component library** for Binary Garden projects. It enforces a **tree-shakable, subpath-only import architecture** that prevents accidental bundle bloat by requiring explicit subpath imports instead of barrel exports.

**Core Philosophy:** Force intentional imports to prevent accidental large bundles, improve tree-shaking, and make bundle impact explicit.

## Monorepo Structure

This is a pnpm workspace with two packages:
- **`packages/flora/`** - `@binarygarden/flora` - The component library (published to npm)
- **`packages/site/`** - `bgflora-site` - Next.js 15 development/demo site

## Essential Commands

### Development Workflow

```bash
# Quick start (recommended) - clean, install, build UI, run dev server
pnpm quick

# Step-by-step
pnpm install        # Install all dependencies
pnpm build:ui       # Build @binarygarden/flora component library
pnpm build:site     # Build bgflora-site Next.js app
pnpm run:site       # Start dev server at localhost:3000

# Clean everything
pnpm clean          # Remove node_modules, dist, .next directories
```

### Making UI Changes

**Important:** UI library changes require rebuild - no hot module reload for the library itself.

1. Edit components in `packages/flora/src/`
2. Run `pnpm build:ui` from repository root
3. Changes appear at `localhost:3000` (if dev server running)

## Architecture

### Subpath Import System

Flora **intentionally disables** barrel exports. Components must be imported from explicit subpaths:

```typescript
// ✅ Correct
import { Button } from '@binarygarden/flora/input';
import { IconGithub } from '@binarygarden/flora/icons';
import { ThemeProvider } from '@binarygarden/flora/theme';

// ❌ This will NOT work (intentionally)
import { Button } from '@binarygarden/flora';
```

**Why:** Prevents accidentally importing 100+ icon components when you only need a button. Icons are isolated from other components to prevent bundle bloat.

### Available Subpaths

Defined in `packages/flora/package.json` exports and `rollup.config.mjs` inputs:

- `@binarygarden/flora/input` - Input components (Button, HSBColorPicker)
- `@binarygarden/flora/icons` - Icon collection (20+ icons)
- `@binarygarden/flora/core` - Core components (BGLanding)
- `@binarygarden/flora/navigation` - Navigation components (MobileNav)
- `@binarygarden/flora/display` - Display components (Badge, Card, CopyableText, FullScreenOverlay)
- `@binarygarden/flora/theme` - Theme system (ThemeProvider, hooks, utilities)
- `@binarygarden/flora/styles.css` - Compiled Tailwind styles

### Source Directory Mapping

Source structure in `packages/flora/src/`:
```
src/
├── input/          → @binarygarden/flora/input
├── icons/          → @binarygarden/flora/icons
├── core/           → @binarygarden/flora/core
├── navigation/     → @binarygarden/flora/navigation
├── display/        → @binarygarden/flora/display
├── theme/          → @binarygarden/flora/theme
├── util/           → Internal utilities (not exported)
└── styles.css      → @binarygarden/flora/styles.css
```

## Build System

### Rollup Configuration

- **Config:** `packages/flora/rollup.config.mjs`
- **Output:** `packages/flora/dist/` with preserved directory structure matching `src/`
- **Format:** ESM only with `preserveModules: true` for optimal tree-shaking
- **Plugins:**
  - `@rollup/plugin-typescript` - TypeScript compilation with declarations
  - `@svgr/rollup` - Converts SVGs to React components
  - `rollup-plugin-postcss` - Compiles Tailwind CSS 4.x
  - `rollup-plugin-preserve-directives` - Preserves "use client" directives

### TypeScript Configuration

- **Root config:** `tsconfig.json` (base configuration)
- **Flora package:** `packages/flora/tsconfig.json` extends root
- **Target:** ES2017, ESM modules
- **Output:** Declaration files with source maps in `dist/`

### External Dependencies

The following are peer dependencies (not bundled):
- `react` ^18.2.0
- `react-dom` ^18.2.0
- `framer-motion` ^11.0.0
- `tailwindcss` ^4

## Theme System

### Required Setup

All Flora components require `ThemeProvider` wrapper with light and dark themes:

```typescript
import { ThemeProvider, type Theme } from '@binarygarden/flora/theme';

const lightTheme: Theme = {
  primary: '#2563eb',
  onPrimary: '#ffffff',
  secondary: '#10b981',
  onSecondary: '#ffffff',
  // ... 22 total color properties required
};

function App() {
  return (
    <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme}>
      {children}
    </ThemeProvider>
  );
}
```

### Theme Structure

The `Theme` type (in `packages/flora/src/theme/types.ts`) requires 22 color properties:
- **Brand colors:** primary, onPrimary, secondary, onSecondary, tertiary, onTertiary
- **Surfaces:** background, onBackground, surface, onSurface
- **Interactive states:** border, hover, focus, disabled, onDisabled
- **Semantic states:** error, onError, success, onSuccess, warning, onWarning

### Theme Template System

Advanced feature documented in `packages/flora/src/theme/TEMPLATE_SYSTEM.md`:
- **Purpose:** Save color themes and "hydrate" them with different seed colors
- **Storage:** Uses ratios/relationships instead of absolute colors
- **Use case:** Generate theme variations by rotating hue or adjusting saturation/brightness
- **API:** `saveTemplate()`, `hydrateTemplate()`, `loadTemplates()` in `templateUtils.ts`

## Adding New Components

1. **Create component** in appropriate `packages/flora/src/` subdirectory:
   - `input/` for input components
   - `icons/` for icons (keep isolated!)
   - `display/` for display components
   - `navigation/` for navigation components
   - `core/` for core components

2. **Export from subdirectory's `index.ts`**

3. **For new subpath categories:**
   - Add to `rollup.config.mjs` `input` array
   - Add to `package.json` `exports` field
   - Update documentation

4. **Build and test:** `pnpm build:ui && pnpm run:site`

## Key Design Patterns

### "use client" Directives

Many components use `"use client"` directive for Next.js App Router compatibility. These are preserved by `rollup-plugin-preserve-directives`.

### Framer Motion Integration

Animation components use `framer-motion` (peer dependency). Components like `Button`, `MobileNav`, and `BGLanding` use motion components for animations.

### Theme CSS Variables

The `ThemeProvider` applies theme colors as CSS variables (`--primary`, `--on-primary`, etc.) on `:root`. Components reference these variables via Tailwind classes.

### HSB Color System

The theme system uses HSB (Hue, Saturation, Brightness) internally for color manipulation, particularly for the template system. See `colorUtils.ts` for conversion utilities.

## Tech Stack Summary

**UI Library:**
- React 18.2+, React DOM 18.2+ (peer deps)
- TypeScript 5.3+
- Rollup 4.6+ for bundling
- Framer Motion 11.0+ (peer dep)
- Tailwind CSS 4.x (peer dep)

**Demo Site:**
- Next.js 15.4.4 with App Router
- React 19.1.0
- TypeScript 5.x
- Tailwind CSS 4.x

**Package Manager:** pnpm 10.8.0+ (required - enforced via `packageManager` field)

## Important Constraints

1. **Never add barrel exports** - Maintain subpath-only architecture
2. **Keep icons isolated** - Don't merge icon imports with other component categories
3. **UI changes require rebuild** - No HMR for the component library itself
4. **All components need ThemeProvider** - Components expect theme CSS variables
5. **Preserve module structure** - Rollup's `preserveModules: true` is critical for tree-shaking
6. **Use pnpm** - This is a pnpm workspace, don't use npm or yarn
