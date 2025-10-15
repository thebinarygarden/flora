# Flora Architecture

Technical deep dive into Flora's defensive architecture and build system.

## Design Philosophy

Flora uses **defensive architecture**: instead of relying on bundler tree-shaking, it makes it structurally impossible to accidentally import unnecessary components.

### The Problem

Modern bundlers (Webpack 5+, Vite, Rollup) can tree-shake barrel exports when properly configured. However, tree-shaking fails when:

- Bundlers aren't optimally configured
- Modules contain side effects
- Circular dependencies exist
- Development mode is active
- Complex re-export chains obscure dependencies

Even when tree-shaking works, barrel exports obscure bundle impact. You might write `import { Button } from '@library'` without realizing the same file exports 100+ icons your bundler must analyze.

### Flora's Solution

**Subpath-only imports** enforced at the package level:

```javascript
// ✅ Required
import { Button } from '@binarygarden/flora/input';
import { IconGithub } from '@binarygarden/flora/icons';

// ❌ Not supported (main index.ts is empty)
import { Button } from '@binarygarden/flora';
```

**How it works:**

1. Main `index.ts` is empty
2. Each category is a separate entry point
3. `package.json` exports only defined subpaths
4. Unused categories eliminated at module resolution (before tree-shaking)

**Benefits:**

- Bundle size controlled by structure, not tooling
- Explicit dependencies (conscious choice of categories)
- Physical isolation (icons separated from inputs)
- Clear bundle analysis

**Trade-off:** Sacrifices import convenience for guaranteed optimization.

## Build System

### Rollup Configuration

```javascript
// rollup.config.mjs
export default {
  input: [
    'src/input/index.ts',
    'src/icons/index.ts',
    'src/display/index.ts',
    'src/navigation/index.ts',
    'src/theme/index.ts',
    'src/core/index.ts',
    'src/styles.css',
  ],
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true, // Critical for tree-shaking
    preserveModulesRoot: 'src',
    sourcemap: true,
  },
  external: ['react', 'react-dom', 'framer-motion', 'tailwindcss'],
  plugins: [
    svgr(), // SVG → React components
    typescript(), // TypeScript + declarations
    postcss(), // Tailwind CSS compilation
  ],
};
```

**Key choices:**

- **`preserveModules: true`** - Maintains source structure, each component is a separate file for optimal tree-shaking
- **ESM only** - Modern format, better tree-shaking, smaller output
- **External dependencies** - Peer deps not bundled (no duplicate React)

### Package Exports

Subpaths enforced via `package.json`:

```json
{
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    "./input": {
      "import": "./dist/input/index.js",
      "types": "./dist/input/index.d.ts"
    },
    "./icons": {
      "import": "./dist/icons/index.js",
      "types": "./dist/icons/index.d.ts"
    },
    "./display": {
      "import": "./dist/display/index.js",
      "types": "./dist/display/index.d.ts"
    },
    "./navigation": {
      "import": "./dist/navigation/index.js",
      "types": "./dist/navigation/index.d.ts"
    },
    "./theme": {
      "import": "./dist/theme/index.js",
      "types": "./dist/theme/index.d.ts"
    },
    "./core": {
      "import": "./dist/core/index.js",
      "types": "./dist/core/index.d.ts"
    },
    "./styles.css": "./dist/styles.css"
  },
  "sideEffects": ["*.css"]
}
```

**Why explicit exports?**

1. Public API control (only intended subpaths exposed)
2. Future-proof (internal reorganization won't break consumers)
3. Better TypeScript resolution

## Directory Structure

```
packages/flora/
├── src/
│   ├── input/           → @binarygarden/flora/input
│   ├── icons/           → @binarygarden/flora/icons
│   ├── display/         → @binarygarden/flora/display
│   ├── navigation/      → @binarygarden/flora/navigation
│   ├── theme/           → @binarygarden/flora/theme
│   ├── core/            → @binarygarden/flora/core
│   ├── util/            → Internal (NOT exported)
│   ├── index.ts         → Empty (forces subpath imports)
│   └── styles.css       → @binarygarden/flora/styles.css
└── dist/                → Build output (mirrors src/)
```

**Rules:**

- One category per directory
- Each directory has `index.ts` (single export point)
- `util/` not exported (internal only)
- Root `index.ts` empty

## The Icon Problem

Icon collections grow to 100+ components. This is the primary motivation for Flora's architecture.

**Traditional library:**

```javascript
// All exports in one barrel
import { Button } from '@library';
// Bundler must parse 100+ icon exports even if unused
```

**Flora:**

```javascript
import { Button } from '@binarygarden/flora/input';
// Icons directory never touched unless explicitly imported
```

Icons are architecturally eliminated before bundler optimizations.

## Build Output

With `preserveModules: true`, output mirrors source:

```
dist/
├── input/
│   ├── index.js + index.d.ts
│   ├── Button.js + Button.d.ts
│   └── HSBColorPicker.js + HSBColorPicker.d.ts
├── icons/
│   ├── index.js + index.d.ts
│   ├── IconGithub.js + IconGithub.d.ts
│   └── ... (20+ icons)
└── styles.css
```

Consumer bundlers can tree-shake at the file level.

## Further Reading

- [Package README](../packages/flora/README.md) - API documentation
- [Development Guide](./DEVELOPMENT.md) - Contributing
- [Theme System](./THEME_SYSTEM.md) - Advanced theming
- [Rollup preserveModules](https://rollupjs.org/configuration-options/#output-preservemodules)
- [Node.js Package Exports](https://nodejs.org/api/packages.html#exports)
