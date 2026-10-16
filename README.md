# Flora

The React component library for Binary Garden projects, and the reference
implementation of the Binary Garden design language.

- **[DESIGN.md](docs/DESIGN.md)** — the design language: color, UI copy, type, spacing, motion
- **[Package README](packages/flora/README.md)** — components, installation, usage
- **[bgflora.app](https://bgflora.app)** — live specimens of every token and component

## Repository

- `packages/flora` — the library, published to npm as `@binarygarden/flora`
- `packages/site` — the demo site at bgflora.app, built against the local library

## Development

```bash
pnpm quick       # clean, install, build the library, start the site at localhost:3000
pnpm build:ui    # rebuild the library (the site has no HMR for library changes)
pnpm build:site  # production build of the site
pnpm precommit   # full clean build + lint + format check
```

## License

MIT - Binary Garden | [GitHub](https://github.com/thebinarygarden/flora)
