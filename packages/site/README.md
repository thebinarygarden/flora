# bgflora-site

Development and demo site for the Flora component library. Built with Next.js 15 App Router and React 19.

## Purpose

This package serves multiple purposes:

- **Development Environment** - Local testing and iteration on Flora components
- **Demo Showcase** - Live examples of all components with different variants
- **Integration Testing** - Real-world Next.js application consuming Flora
- **Documentation** - Visual reference for component usage patterns
- **Theme Creator** - Interactive tool for building custom themes

## Tech Stack

- **Next.js** 15.4.4 with App Router
- **React** 19.1.0
- **@binarygarden/flora** - Component library (workspace dependency)
- **Tailwind CSS** 4.x
- **TypeScript** 5.x
- **Framer Motion** 11.0+ (for animations)

## Getting Started

### From Repository Root (Recommended)

The recommended way to start development is from the repository root:

```bash
# Quick start - clean, install, build UI, start dev server
pnpm quick

# Or step-by-step
pnpm install
pnpm build:ui      # MUST build UI library first
pnpm run:site      # Start development server
```

The site will be available at **http://localhost:3000**

### From This Package Directory

If running commands from `packages/site/`:

```bash
# Development server (requires UI library built first)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint
```

**Important:** The site depends on `@binarygarden/flora` as a workspace dependency. You must build the UI library (`pnpm build:ui` from root) before the site will work.

## Site Structure

### Pages & Routes

The site uses Next.js 15 App Router with the following structure:

```
src/app/
  page.tsx              # Home - Component overview and examples
  theme/
    page.tsx            # Theme documentation
    creator/
      page.tsx          # Interactive theme creator tool
  icons/
    page.tsx            # Icon gallery and showcase
  layout.tsx            # Root layout with ThemeProvider
  themes.ts             # Example theme definitions
```

### Key Features

#### 1. Component Showcase (/)

The home page demonstrates all Flora components with live examples:

- Button variants (primary, secondary, tertiary, outline)
- Interactive components with real functionality
- Proper usage patterns and import examples

#### 2. Theme Creator (/theme/creator)

Interactive tool for building custom Flora themes:

- Visual color picker for all theme properties
- Real-time preview of theme changes
- Template system for saving/loading themes
- Seed color hydration (generate themes from single color)
- Export themes as TypeScript code

#### 3. Icon Gallery (/icons)

Searchable gallery of all Flora icons:

- Visual preview of all 20+ icons
- Copy import statements
- Download individual SVG files
- Size and color customization preview

#### 4. Theme System (/theme)

Documentation and examples of Flora's theming system:

- Theme structure explanation
- Dark/light mode switching
- CSS custom property integration

## Development Workflow

### Making Changes to the Site

1. **Edit site code** in `packages/site/src/`
2. **Changes hot-reload automatically** - Next.js dev server handles HMR
3. **View changes immediately** at http://localhost:3000

### Testing UI Library Changes

When working on Flora components:

1. **Edit component** in `packages/flora/src/`
2. **Rebuild UI library**: `pnpm build:ui` (from root)
3. **Refresh browser** - Changes appear after rebuild

**Note:** UI library changes do NOT hot-reload. You must rebuild the library to see changes in the site.

### Development Commands Overview

| Command | Location | Description |
|---------|----------|-------------|
| `pnpm quick` | Root | Clean, install, build UI, start dev server |
| `pnpm build:ui` | Root | Rebuild Flora component library |
| `pnpm run:site` | Root | Start development server |
| `pnpm dev` | This package | Start dev server (requires UI built) |
| `pnpm build` | This package | Production build |
| `pnpm start` | This package | Start production server |
| `pnpm lint` | This package | Run ESLint |

## Project Structure

```
packages/site/
  src/
    app/
      page.tsx                    # Home page
      layout.tsx                  # Root layout
      themes.ts                   # Example themes
      _components/                # Shared site components
      theme/
        page.tsx                  # Theme docs
        creator/
          page.tsx                # Theme creator
          _utils/                 # Theme utilities
      icons/
        page.tsx                  # Icon gallery
        _components/              # Icon-specific components
        _hooks/                   # Icon utilities (download, etc.)
  public/                         # Static assets
  next.config.js                  # Next.js configuration
  tailwind.config.ts              # Tailwind configuration
  tsconfig.json                   # TypeScript configuration
```

## Configuration

### Next.js Config

The site uses standard Next.js 15 App Router configuration:

```javascript
// next.config.js
const nextConfig = {
  // Standard configuration
};

export default nextConfig;
```

### Tailwind Config

Tailwind CSS 4.x configured to work with Flora styles:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Additional configuration
};

export default config;
```

### TypeScript Config

Extends Next.js TypeScript configuration with strict type checking:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Example Theme Setup

The site demonstrates proper Flora theme setup in `src/app/themes.ts`:

```typescript
import { Theme } from '@binarygarden/flora/theme';

export const lightTheme: Theme = {
  // Brand colors
  primary: '#2563eb',        // blue-600
  onPrimary: '#ffffff',
  secondary: '#6b7280',      // gray-500
  onSecondary: '#ffffff',
  tertiary: '#7c3aed',       // violet-600
  onTertiary: '#ffffff',

  // Surface hierarchy
  background: '#ffffff',
  onBackground: '#111827',   // gray-900
  surface: '#f9fafb',        // gray-50
  onSurface: '#374151',      // gray-700

  // Interactive states
  border: '#d1d5db',         // gray-300
  hover: '#2563eb',
  focus: '#3b82f6',          // blue-500
  disabled: '#f3f4f6',       // gray-100
  onDisabled: '#9ca3af',     // gray-400

  // Semantic states
  error: '#dc2626',          // red-600
  onError: '#ffffff',
  success: '#16a34a',        // green-600
  onSuccess: '#ffffff',
  warning: '#ca8a04',        // yellow-600
  onWarning: '#ffffff'
};

export const darkTheme: Theme = {
  // Dark theme colors (see file for full implementation)
};
```

This is integrated in `src/app/layout.tsx`:

```tsx
import { ThemeProvider } from '@binarygarden/flora/theme';
import { lightTheme, darkTheme } from './themes';
import '@binarygarden/flora/styles.css';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Demonstrating Import Patterns

The site consistently demonstrates correct Flora import patterns:

```typescript
// ✅ Correct - explicit subpath imports
import { Button } from '@binarygarden/flora/input';
import { IconGithub, IconInfo } from '@binarygarden/flora/icons';
import { ThemeProvider, useTheme } from '@binarygarden/flora/theme';
import { Badge, Card } from '@binarygarden/flora/display';
import { MobileNav } from '@binarygarden/flora/navigation';
import { BGLanding } from '@binarygarden/flora/core';

// Import styles
import '@binarygarden/flora/styles.css';
```

## Dependency Management

### Workspace Dependency

The site consumes Flora as a workspace dependency:

```json
{
  "dependencies": {
    "@binarygarden/flora": "workspace:*",
    "framer-motion": "^11.0.0",
    "next": "15.4.4",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  }
}
```

This allows the site to consume the local Flora package without publishing to npm. Any changes to Flora require rebuilding the library (`pnpm build:ui`).

### Hot Reloading Behavior

- **Site code changes** → Hot reloads automatically ✅
- **Flora component changes** → Requires `pnpm build:ui` ❌

This is expected behavior for monorepo workspace dependencies.

## Building for Production

### Production Build

```bash
# From root
pnpm build:site

# Or from this package
pnpm build
```

This creates an optimized production build in `.next/`:

```bash
# Start production server
pnpm start
```

### Build Output

Next.js generates:

- Static pages for routes without dynamic data
- Server components for interactive pages
- Optimized JavaScript bundles with code splitting
- CSS with Tailwind utilities

## Environment Variables

Currently no environment variables are required. Add `.env.local` if you need environment-specific configuration:

```bash
# .env.local (gitignored)
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Troubleshooting

### "Module not found: @binarygarden/flora"

**Solution:** Build the UI library first:

```bash
# From repository root
pnpm build:ui
```

### Component changes not appearing

**Solution:** Rebuild the UI library after making changes to Flora components:

```bash
# From repository root
pnpm build:ui
```

The dev server will pick up changes after rebuild.

### Type errors after UI library changes

**Solution:** Restart the TypeScript server in your editor, or restart the dev server:

```bash
# Stop dev server (Ctrl+C)
pnpm run:site
```

### Port 3000 already in use

**Solution:** Kill the process using port 3000 or use a different port:

```bash
# Kill process on port 3000
kill -9 $(lsof -ti:3000)

# Or use different port
PORT=3001 pnpm dev
```

## Related Documentation

- **[Root README](../../README.md)** - Monorepo overview and setup
- **[Flora Component Library README](../flora/README.md)** - Complete component API
- **Next.js Documentation** - https://nextjs.org/docs
- **Tailwind CSS Documentation** - https://tailwindcss.com/docs

## Contributing

When adding new pages or features to the demo site:

1. **Follow Flora's import patterns** - Use explicit subpath imports
2. **Document component usage** - Show code examples with components
3. **Test with both themes** - Ensure dark mode works correctly
4. **Optimize for performance** - Use Next.js best practices (Server Components, etc.)
5. **Add to navigation** - Update MobileNav if adding new routes

## License

MIT - Binary Garden

This site is part of the Flora monorepo and serves as the official development environment and documentation for the @binarygarden/flora component library.
