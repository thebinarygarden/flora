# Flora Monorepo

Development repository for Flora - the React component library for Binary Garden
projects, and the reference implementation of the Binary Garden design language.

**Start with [DESIGN.md](docs/DESIGN.md)** — it documents the design language itself:
how color works, the voice, type, spacing, shape, motion and iconography.

## Quick Start

```bash
pnpm quick  # Clean, install, build, and start dev server at localhost:3000
```

This command:

1. Cleans all build artifacts and dependencies
2. Installs all workspace dependencies
3. Builds the Flora component library
4. Starts the Next.js demo site for testing

## What's in this Monorepo

### `packages/flora`

The main component library published to npm as `@binarygarden/flora`. Uses subpath-only imports for optimal bundle sizes.

### `packages/site`

Next.js 16 demo site for developing and testing components during development.

## Navigation

**For Library Users:**

- **[DESIGN.md](docs/DESIGN.md)** - The design language: color, voice, type, spacing, motion
- **[Foundations](https://bgflora.app)** - Live specimens of every token
- **[Component Documentation](https://bgflora.app/components)** - Live demos and API reference
- **[Package README](packages/flora/README.md)** - Installation and usage guide

**For Contributors:**

- **[Development Guide](docs/DEVELOPMENT.md)** - How to contribute, add components, workflows
- **[Architecture Guide](docs/ARCHITECTURE.md)** - Technical design and build system

## Development Workflow

```bash
# Available commands
pnpm build:ui       # Build the Flora component library
pnpm build:site     # Build the Next.js demo site
pnpm run:site       # Start dev server at localhost:3000
pnpm clean          # Remove all build artifacts
```

**Important:** Library changes require rebuild - there's no HMR for the library itself. Run `pnpm build:ui` after making changes to components.

See [Development Guide](docs/DEVELOPMENT.md) for detailed contribution instructions.

## License

MIT - Binary Garden | [GitHub](https://github.com/thebinarygarden/flora)
