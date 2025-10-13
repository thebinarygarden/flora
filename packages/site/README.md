# bgflora-site

Next.js 15 demo site for developing and testing Flora components.

## Quick Start

From the repository root:

```bash
pnpm quick  # Clean, install, build UI, and start dev server at localhost:3000
```

Or step-by-step:

```bash
pnpm install
pnpm build:ui    # Required - build the UI library first
pnpm run:site    # Start development server
```

See [Root README](../../README.md) for full monorepo setup.

## Workspace Dependency

This site consumes `@binarygarden/flora` as a workspace dependency (`"@binarygarden/flora": "workspace:*"`). The UI library must be built before the site will work.

**Important:** Changes to Flora components require rebuilding the library (`pnpm build:ui` from root) before they appear in the site. Site code changes hot-reload automatically.

## Pages

- `/` - Component examples and demos
- `/theme` - Theme system documentation
- `/theme/creator` - Interactive theme creator tool
- `/icons` - Icon gallery

Live version: https://bgflora.app

## Commands

From this package directory:

```bash
pnpm dev      # Start dev server (requires UI library built)
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Related Documentation

- [Root README](../../README.md) - Monorepo setup and workflows
- [Flora Package README](../flora/README.md) - Component documentation
- [Development Guide](../../docs/DEVELOPMENT.md) - Contributing guide
- [Architecture Guide](../../docs/ARCHITECTURE.md) - Technical design

## License

MIT - Binary Garden
