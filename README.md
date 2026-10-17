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

flora is licensed under the GNU Affero General Public License, version 3 or any later
version (`AGPL-3.0-or-later`). You can use, change and sell it. If you distribute a
modified version, or run one that people use over a network, you must make its source
code available to them under the same license. The full text is in [LICENSE](LICENSE).

```
Copyright (C) 2026 Binary Garden

This program is free software: you can redistribute it and/or modify it under the terms
of the GNU Affero General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
```
