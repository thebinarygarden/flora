# @binarygarden/flora

[![npm version](https://img.shields.io/npm/v/@binarygarden/flora)](https://www.npmjs.com/package/@binarygarden/flora)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> **The plants of a particular region** - Performance-first React component library for Binary Garden

Flora is the React component library for Binary Garden projects, and the
reference implementation of **[the Binary Garden design language](../../docs/DESIGN.md)** —
read that first. Its one rule: the trunk is black and white, and color comes from
the products. A single `--product-hue` is the entire theme.

Styling is plain token-driven CSS shipped as one stylesheet — no Tailwind, no
CSS-in-JS, no runtime style injection. Framer Motion powers the few animated
components. Flora enforces subpath-only imports (`@binarygarden/flora/form`)
instead of barrel exports to guarantee optimal production bundles regardless of
bundler configuration.

## Overview

Flora uses subpath-only imports. The main export `import { Button } from '@binarygarden/flora'` is intentionally disabled - components must be imported from explicit subpaths like `import { Button } from '@binarygarden/flora/form'`.

| Subpath       | Components                                                      |
| ------------- | --------------------------------------------------------------- |
| `/form`       | Button, IconButton, Input, Select, Checkbox, Radio, Switch      |
| `/ui`         | Card, Badge, Tag, Tooltip, AvatarGroup, CodeBlock, CopyableText |
| `/overlay`    | Dialog, Toast, ToastStack, DialogProvider / useDialog           |
| `/navigation` | SiteHeader, Tabs, Carousel, SidebarNav, CommandPalette          |
| `/marketing`  | Hero, ProductTile                                               |
| `/theme`      | ProductScope, ThemeToggleButton, ScriptPreloadTheme             |
| `/icons`      | 27 icon components                                              |
| `/hooks`      | useClientCheck, useViewport                                     |
| `/bg`         | BGLanding (a Hero over a full-bleed background), BGFooter       |

Over a `BGLanding`, give `SiteHeader` `revealAfter=".fl-hero-actions"`: the bar
stays hidden while the hero's own buttons are on screen, then slides in.

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
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "framer-motion": "^13.0.0"
}
```

## Usage

### Import Pattern

Flora **requires** explicit subpath imports:

```javascript
// ✅ Required pattern - explicit subpath imports
import { Button } from '@binarygarden/flora/form';
import { IconGithub, IconInfo } from '@binarygarden/flora/icons';
import { ProductScope } from '@binarygarden/flora/theme';
import { Badge, Card } from '@binarygarden/flora/ui';

// Import compiled styles
import '@binarygarden/flora/styles.css';

// ❌ This will NOT work (intentionally disabled)
import { Button, IconGithub } from '@binarygarden/flora';
```

**Why?** This architecture prevents accidentally importing entire icon collections (100+ components) when you only need a button. See [Design Philosophy](#design-philosophy) for details.

### Basic Setup

```tsx
import { ScriptPreloadTheme, ProductScope } from '@binarygarden/flora/theme';
import { Button } from '@binarygarden/flora/form';
import '@binarygarden/flora/styles.css';

export default function Layout({ children }) {
  return (
    <html lang="en">
      {/* sets data-theme before first paint, so dark mode never flashes */}
      <head>
        <ScriptPreloadTheme />
      </head>
      <body>
        {/* one hue is the whole theme. omit it to stay monochrome. */}
        <ProductScope hue={330}>{children}</ProductScope>
      </body>
    </html>
  );
}
```

### Fonts

Flora names Hanken Grotesk in `--font-sans` but does not fetch it — a component
library shouldn't force a network request on its consumers. Load it yourself:

```tsx
import { Hanken_Grotesk } from 'next/font/google';
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
});
// :root { --font-sans: var(--font-hanken), Helvetica, sans-serif; }
```

## Available Components

Live demos and API documentation:

- **[bgflora.app](https://bgflora.app)** — color, type, spacing, shape, motion, brand
- **[bgflora.app/components](https://bgflora.app/components)** — every component across its variants and states
- **[bgflora.app/icons](https://bgflora.app/icons)** — the icon set

The design language itself is written down in **[DESIGN.md](../../docs/DESIGN.md)**.

## Design Philosophy

Flora uses a **defensive architecture** approach: instead of relying on bundler tree-shaking to eliminate unused code, Flora makes it architecturally impossible to accidentally import unnecessary components.

### Subpath-Only Imports

The main `index.ts` is intentionally empty to force developers to import from specific subpaths:

```javascript
// ✅ Required - explicit subpath imports
import { Button } from '@binarygarden/flora/form';
import { IconGithub } from '@binarygarden/flora/icons';

// ❌ Not supported - main export is empty
import { Button, IconGithub } from '@binarygarden/flora';
```

### Why This Approach?

Modern bundlers (Webpack 5+, Vite, Rollup) **can tree-shake barrel exports effectively when properly configured**. However, tree-shaking can fail or be incomplete when:

- Bundlers aren't optimally configured
- Modules contain side effects
- Circular dependencies exist
- Development mode is active (tree-shaking disabled)
- Complex re-export chains obscure dependencies

Even when tree-shaking works correctly, barrel exports can obscure bundle impact during development. You might import a Button without realizing the same module also exports 100+ icon components that your bundler must analyze and eliminate.

### How It Works

Subpath imports enforce separation at the module resolution level:

- Each component category is a separate entry point
- Unused categories are eliminated before tree-shaking runs
- The main `index.ts` is empty, forcing subpath usage

### The Icon Problem

Icon collections commonly grow to 100+ components. Without subpath isolation, importing a button could cause your bundler to analyze the entire icon collection:

```javascript
// Traditional library - all exports in one barrel
import { Button } from '@library';
// Bundler must parse and analyze 100+ icon exports even if unused

// Flora - physically separated
import { Button } from '@binarygarden/flora/form';
import { IconGithub } from '@binarygarden/flora/icons';
// Icons directory never loaded unless explicitly imported
```

For technical details on build system, package structure, and Rollup configuration, see the [Architecture Guide](../../docs/ARCHITECTURE.md).

For contributing, adding components, and development workflow, see the [Development Guide](../../docs/DEVELOPMENT.md).

## TypeScript Support

Full TypeScript support with:

- **Declaration files** (`.d.ts`) for all exports
- **Declaration maps** (`.d.ts.map`) for IDE navigation
- **Source maps** (`.js.map`) for debugging
- **Strict type checking**

Your IDE will have full autocomplete and type information:

```tsx
import { Button } from '@binarygarden/flora/form';
import type { ButtonProps } from '@binarygarden/flora/form';
//            ^-- Full type information available
```

## Browser Support

Flora supports all modern browsers that support:

- ES2020+ JavaScript features
- CSS Grid and Flexbox
- CSS Custom Properties (CSS variables)
- `oklch()` colors and `@layer` cascade layers

Effectively: Chrome 111+, Firefox 113+, Safari 16.4+, Edge 111+ — the design
language is built on oklch and cascade layers, which raises the floor above the
previous ES2020 baseline.

## License

MIT - Binary Garden | [GitHub](https://github.com/thebinarygarden/flora) | [npm](https://www.npmjs.com/package/@binarygarden/flora)
