# CLAUDE.md

Flora is Binary Garden's React component library (`@binarygarden/flora`, `packages/flora`)
plus its demo site (`packages/site`, bgflora.app), in one pnpm workspace.

**Flora is the reference implementation of the Binary Garden design language. Read
`docs/DESIGN.md` before changing anything visual.** Its one rule: the trunk is black and
white; color comes from the products. A single `--product-hue` is the entire theme.

## Commands

```bash
pnpm quick       # clean, install, build the library, start the site at localhost:3000
pnpm build:ui    # rebuild the library; the site does NOT hot-reload library changes
pnpm build:site  # production build of the site
pnpm lint
pnpm format      # prettier; CI runs format:check
pnpm precommit   # full check before pushing: clean build, lint, format check
```

## Rules

1. **Subpath imports only, no barrel.** Each category (`src/<category>/index.ts`) is its own
   entry point, so importing a button never pulls in the icon set. Never add a root index.
2. **Never hardcode a color.** Always a token (`var(--accent)`, `var(--text-body)`,
   `var(--line-1)`); the set is in `docs/DESIGN.md` and `src/tokens/`.
3. **A component is a thin wrapper over a `.fl-*` class** in `src/styles.css`, with variants
   as data attributes (`<button className="fl-btn" data-variant={variant} />`). No Tailwind,
   no CSS-in-JS, no runtime style injection.
4. **Attach an event handler only when the consumer passed one**
   (`onSelect ? handler : undefined`). An unconditional handler stops the component
   rendering from a server component.
5. **`'use client'` only where there is state or an effect**; keep the rest server-renderable.
6. Theming is `data-theme` on an element plus `ProductScope` (`data-product` + `--product-hue`).
   There is no ThemeProvider and no theme object.

## Adding things

- **Component:** add it to the category directory, export it from that category's
  `index.ts`, `pnpm build:ui`, then demo it in the site and add it to the table in
  `packages/flora/README.md`.
- **Category (subpath):** new `src/<category>/index.ts`, add it to `input` in
  `rollup.config.mjs` and to `exports` in `packages/flora/package.json`.
- **Icon:** add the SVG to `src/icons/svg/` (strokes in `currentColor` at
  `var(--stroke-width)`, with a `viewBox`), wrap it in an `icon-<name>.tsx` following the
  existing ones, and export it from `src/icons/index.ts`. `@svgr/rollup` turns the SVG into a
  component at build time.

## Publishing

Bump `version` in `packages/flora/package.json` and push to `main`; `publish-ui.yaml`
publishes when the version is new, via npm trusted publishing (OIDC, no token). Versions
bump the last digit for normal releases. The site deploys to Cloud Run on pushes that touch
either package.
