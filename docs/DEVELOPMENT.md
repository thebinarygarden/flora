# Flora Development Guide

Contributor guide for working with the Flora monorepo. This repo contains the Flora component library package and a Next.js demo site for testing.

## Prerequisites

- **Node.js** 20+
- **pnpm** 10.8.0+ (required)

```bash
npm install -g pnpm
```

## Quick Start

```bash
pnpm quick  # Clean, install, build, and start dev server at localhost:3000
```

Or step-by-step:

```bash
pnpm install
pnpm build:ui
pnpm run:site
```

## Available Commands

| Command | Description |
|---------|-------------|
| `pnpm quick` | Clean, install, build UI, start dev server |
| `pnpm build:ui` | Build @binarygarden/flora component library |
| `pnpm build:site` | Build bgflora-site Next.js app |
| `pnpm run:site` | Start dev server at localhost:3000 |
| `pnpm clean` | Remove all node_modules, dist, .next |

## Development Workflow

**Important:** UI library changes require rebuild (no HMR for the library).

```bash
# Terminal 1 - Keep dev server running
pnpm run:site

# Terminal 2 - Rebuild after each change
pnpm build:ui
# Refresh browser
```

**Demo site changes** have hot module reload.

## Adding New Components

### 1. Create Component

Create your component file in the appropriate category directory (input, display, navigation, etc.):

```tsx
'use client';

export interface TextFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextField({ value, onChange }: TextFieldProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-[var(--border)] rounded px-3 py-2"
    />
  );
}
```

### 2. Export from Category Index

Export your component from the category's index file:

```typescript
export { Button } from './Button';
export { TextField } from './TextField';
export type { TextFieldProps } from './TextField';
```

### 3. Build and Test

```bash
pnpm build:ui
pnpm run:site
```

### 4. Create Demo Page

Create a test page in the demo site to showcase your component.

### 5. Update Documentation

Add component to the package README in the appropriate category section.

## Creating New Subpaths

To create a new component category:

1. Create the category directory in the library source
2. Add the entry point to `rollup.config.mjs` inputs
3. Add the subpath to `package.json` exports:
   ```json
   {
     "exports": {
       "./category-name": {
         "import": "./dist/category-name/index.js",
         "types": "./dist/category-name/index.d.ts"
       }
     }
   }
   ```
4. Build: `pnpm build:ui`

## Adding Icons

1. Add SVG file to the icons directory
2. SVG requirements:
   - Use `currentColor` for fills/strokes
   - Include `viewBox` attribute
3. Export from the icons index file
4. Build: `pnpm build:ui`

The `@svgr/rollup` plugin converts SVGs to React components automatically.

## Build System

See [Architecture Guide](./ARCHITECTURE.md) for detailed Rollup configuration and `preserveModules` explanation.

**Key points:**
- ESM only (`format: 'esm'`)
- `preserveModules: true` maintains source structure
- Each component is a separate file for optimal tree-shaking

## Architecture Principles

See [Architecture Guide](./ARCHITECTURE.md) for full explanation.

**Critical rules:**
1. Never add barrel exports (main `index.ts` must stay empty)
2. Keep icons isolated from other categories
3. All components depend on ThemeProvider
4. Use theme CSS variables: `var(--primary)`, not hardcoded colors

## Publishing

1. Update `version` in the library's `package.json`
2. Build the library: `pnpm build:ui`
3. Publish from the library package directory: `npm publish`

## Resources

- [Architecture Guide](./ARCHITECTURE.md) - Design philosophy and build system
- [Theme System](./THEME_SYSTEM.md) - Advanced theming
- [Package README](../packages/flora/README.md) - API documentation
