# @binarygarden/flora

[![npm version](https://img.shields.io/npm/v/@binarygarden/flora)](https://www.npmjs.com/package/@binarygarden/flora)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> **The plants of a particular region** - Performance-first React component library for Binary Garden

Flora is the React component library for Binary Garden projects, and the
reference implementation of **[the Binary Garden design language](../../docs/DESIGN.md)** —
read that first. Its one rule: the trunk is black and white, and color comes from
the products. A single `--product-hue` is the entire theme.

Styling is plain token-driven CSS shipped as one stylesheet — no Tailwind, no
CSS-in-JS, no runtime style injection. Framer Motion powers the few animated
components.

## Components

Import from subpaths only; there is no root export.

| Subpath       | Components                                                      |
| ------------- | --------------------------------------------------------------- |
| `/form`       | Button, IconButton, Input, Select, Checkbox, Radio, Switch      |
| `/ui`         | Card, Badge, Tag, Tooltip, AvatarGroup, CodeBlock, CopyableText |
| `/overlay`    | Dialog, Toast, ToastStack, DialogProvider / useDialog           |
| `/navigation` | SiteHeader, Tabs, Carousel, SidebarNav, CommandPalette          |
| `/marketing`  | Hero, ProductTile                                               |
| `/theme`      | ProductScope, ThemeToggleButton, ScriptPreloadTheme             |
| `/icons`      | the icon set                                                    |
| `/bg`         | BGLanding (a Hero over a full-bleed background), BGFooter       |
| `/styles.css` | tokens, resets and every component's CSS                        |

Over a `BGLanding`, give `SiteHeader` `revealAfter=".fl-hero-actions"`: the bar
stays hidden while the hero's own buttons are on screen, then slides in.

Live demos: [bgflora.app/components](https://bgflora.app/components) and
[bgflora.app/icons](https://bgflora.app/icons).

### Why subpaths

There is no barrel export, so a button import can never pull in the icon set.
Unused categories are dropped at module resolution, before any tree-shaking, so
bundle size is guaranteed by the package structure rather than by how well a
consumer's bundler is configured.

## Installation

```bash
pnpm add @binarygarden/flora framer-motion
```

Peers: `react`, `react-dom`, `framer-motion`.

## Usage

```tsx
import { ScriptPreloadTheme, ProductScope } from '@binarygarden/flora/theme';
import { Button } from '@binarygarden/flora/form';
import '@binarygarden/flora/styles.css';

export default function Layout({ children }) {
  return (
    <html lang="en">
      {/* sets data-theme before first paint, so dark mode never flashes */}
      <head>
        <ScriptPreloadTheme />
      </head>
      <body>
        {/* one hue is the whole theme. omit it to stay monochrome. */}
        <ProductScope hue={330}>{children}</ProductScope>
      </body>
    </html>
  );
}
```

### Fonts

Flora names Hanken Grotesk in `--font-sans` but does not fetch it — a component
library shouldn't force a network request on its consumers. Load it yourself:

```tsx
import { Hanken_Grotesk } from 'next/font/google';
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
});
// :root { --font-sans: var(--font-hanken), Helvetica, sans-serif; }
```

## License

MIT - Binary Garden | [GitHub](https://github.com/thebinarygarden/flora) | [npm](https://www.npmjs.com/package/@binarygarden/flora)
