# Flora
 
> **The plants of a particular region** - These are the components that make up the Binary Garden

Flora is designed around **tree-shakable, performance-first architecture** that forces optimal bundle sizes through selective imports.

## Philosophy

Flora prioritizes **bundle optimization over developer convenience**. Instead of allowing large bundle imports, we enforce specific subpath imports that guarantee only the components you need make it to production.

```javascript
// Flora forces this pattern - only imports what you use
import { Button } from '@flora/ui/input';
import { IconInfo } from '@flora/ui/icons';

// This is intentionally NOT supported - prevents bundle bloat
import { Button, IconInfo } from '@flora/ui';
```

## Features

- **Forced Tree-Shaking** - Subpath-only imports prevent accidental bundle bloat
- **Performance First** - Icons and inputs separated to avoid large collections
- **Tailwind Native** - Components compile within your application's Tailwind setup  
- **Zero Runtime Bloat** - Minimal dependencies, maximum performance
- **TypeScript First** - Full type safety with declaration maps

## Quick Start

```bash
# Install
npm install @flora/ui

# Import specific components
import { Button } from '@flora/ui/input';
import { IconGithub } from '@flora/ui/icons';

# Import styles
import '@flora/ui/styles.css';
```

## Development

This is a pnpm monorepo with two packages:

```
packages/
  ui/          # Main component library (@flora/ui)
  site/        # Development/demo site (@flora/site)
```

### Setup

```bash
# Quick start (recommended)
pnpm quick

# Or manual setup
pnpm install
pnpm build:ui
pnpm run:site
```

### Commands

```bash
pnpm build:ui     # Build component library
pnpm build:site   # Build demo site  
pnpm run:site     # Start development server
pnpm clean        # Clean all build artifacts
```

## Architecture Decisions

### Why Subpath-Only Imports?

Traditional component libraries allow convenience imports like `import { Button, Icon } from '@library'`. This seems developer-friendly but leads to:

1. **Accidental large bundles** when importing from icon collections
2. **Poor tree-shaking** due to complex dependency graphs
3. **Unclear bundle impact** for developers

Flora forces intentional imports:
- Want a button? Import from `/input`
- Want an icon? Import from `/icons`
- This makes bundle impact explicit and prevents accidents

### Why Icons Are Separate?

Icon collections can easily become 100+ components. By separating icons from inputs, applications importing buttons don't accidentally pull in entire icon libraries.

## Contributing

See individual package READMEs for detailed development information:
- [UI Package README](packages/ui/README.md)
- [Site Package README](packages/site/README.md)

## License

MIT – Binary Garden