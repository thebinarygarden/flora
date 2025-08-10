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

// ❌ This will NOT work (intentionally disabled)
// import { Button, IconGithub } from '@flora/ui';
```

Flora comes with it's own compiled styles, and requires that the style sheet be imported to the gloabl.css of the consuming project 
``` css
import '@flora/ui/styles.css';
```


## Available Components

Available components can be search and observed using Flora's site: https://bgflora.app

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