# @flora/site

The development and demo site for Flora UI components. Built with Next.js 15 and React 19.

## Purpose

This package serves as:
- **Development environment** for testing Flora UI components
- **Demo site** showcasing component usage and variants
- **Design Documentation** explaining the design decisions taken with flora
- **Integration testing** for the UI library in a real Next.js application

## Tech Stack

- **Next.js 15.4.4** with App Router
- **React 19.1.0** with latest features
- **TailwindCSS 4.x** matching the UI library
- **TypeScript 5.x** with strict configuration
- **ESLint** with Next.js configuration

## Getting Started

### From Repository Root (Recommended)
```bash
# Quick start - builds UI library and starts dev server
pnpm quick

# Or manually
pnpm install
pnpm build:ui      # Must build UI library first
pnpm run:site      # Start development server
```

### Individual Commands
```bash
# From this package directory
pnpm dev          # Start development server (requires UI library built)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

The site runs at http://localhost:3000

## Key Features

### Demonstrates Flora Usage Patterns
The site showcases the **correct import patterns** that Flora enforces:

### Tailwind Integration
- Configured to work seamlessly with `@flora/ui` styles
- Uses TailwindCSS 4.x matching the UI library
- Imports Flora styles: `import '@flora/ui/styles.css'`

### Development Workflow
1. **Make changes** to UI components in `../ui/src/`
2. **Rebuild UI library**: `pnpm build:ui` (from root)
3. **View changes** automatically in the dev server
4. **Test different variants** and usage patterns

## Development Notes

### UI Library Dependency
This site consumes `@flora/ui` as a workspace dependency:
```json
{
  "dependencies": {
    "@flora/ui": "workspace:*"
  }
}
```

### Hot Reloading
- Changes to site code hot-reload automatically
- Changes to UI library require rebuilding: `pnpm build:ui`
