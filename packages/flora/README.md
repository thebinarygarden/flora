# @binarygarden/flora

[![npm version](https://img.shields.io/npm/v/@binarygarden/flora)](https://www.npmjs.com/package/@binarygarden/flora)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> **The plants of a particular region** - Performance-first React component library for Binary Garden

Flora is a React component library built for Binary Garden projects. It leverages **Tailwind CSS** for styling and **Framer Motion** for animations. Flora's CSS system is **theme-driven**, consuming color themes from your application through the `ThemeProvider` - allowing complete control over your design system while maintaining consistent component behavior. Flora enforces subpath-only imports (`@binarygarden/flora/input`) instead of barrel exports to guarantee optimal production bundles regardless of bundler configuration.

## Overview

Flora uses subpath-only imports. The main export `import { Button } from '@binarygarden/flora'` is intentionally disabled - components must be imported from explicit subpaths like `import { Button } from '@binarygarden/flora/input'`.

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

View all components with live demos and API documentation at **[bgflora.app/components](https://bgflora.app/components)**

## Design Philosophy

Flora uses a **defensive architecture** approach: instead of relying on bundler tree-shaking to eliminate unused code, Flora makes it architecturally impossible to accidentally import unnecessary components.

### Subpath-Only Imports

The main `index.ts` is intentionally empty to force developers to import from specific subpaths:

```javascript
// ✅ Required - explicit subpath imports
import { Button } from '@binarygarden/flora/input';
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
import { Button } from '@binarygarden/flora/input';
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

## License

MIT - Binary Garden | [GitHub](https://github.com/thebinarygarden/flora) | [npm](https://www.npmjs.com/package/@binarygarden/flora)
