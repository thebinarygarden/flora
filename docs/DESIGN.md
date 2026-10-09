# The Binary Garden design language

Binary Garden is a community of technical creatives — designers, animators,
developers, product people — building open source products for humans.
`binarygarden.com` is the **trunk**: the repo and site that carry the
garden's crucial infrastructure (central auth, the links out to every product,
the docs and, later, the shop). Each product is its own app. **flora** is the
shared React component library every product imports, and the trunk is built on
flora too.

**The one rule: the trunk is black and white; color comes from the products.**
Every product shares the same components, type, spacing and motion. The only
thing that changes is a single hue.

Live specimens of everything below: [bgflora.app](https://bgflora.app)
and [`/components`](https://bgflora.app/components) on the flora site.

---

## 1. How color works

Read this first — it is the part of the system that is unusual.

- **Neutrals are not gray.** They are oklch with hue `150` and chroma `0.004` —
  a trace of chlorophyll, so black and white feel like paper and soil rather
  than `#000` and `#fff`.
- **`--accent` is the only brand color token.** On the trunk it resolves to the
  foreground (`--fg-1`), so primary buttons are black in light and white in
  dark.
- **A product scope is one attribute.** Any element carrying `data-product` and
  `--product-hue: <0–360>` becomes a product scope. Inside it, `--accent`,
  `--accent-fg`, `--accent-soft` and `--accent-line` are derived from that hue.
  Nothing else changes.
- **`ProductTile` sets its own scope.** It is the one place color appears on the
  trunk.
- **Light and dark are equal citizens**, selected by `data-theme` on `<html>`.
  Dark raises accent lightness slightly for contrast. (The selector is scoped to
  the element, not `:root`, so a dark region can be nested inside a light page —
  the docs use this for the dark specimen.)
- **Semantic colors — `--ok --warn --danger --info` — are for status only,
  never decoration.** A semantic color on a control that isn't reporting state
  is a bug.

```tsx
import { ProductScope } from '@binarygarden/flora/theme';

// the trunk: no scope, everything monochrome
<Button>publish</Button>

// a product: one number is the whole theme
<ProductScope hue={330}>
  <Button>publish</Button>
</ProductScope>
```

### Color tokens

| Token      | Light            | Role                     |
| ---------- | ---------------- | ------------------------ |
| `--bg-1`   | `oklch(0.985 …)` | page and raised surfaces |
| `--bg-2`   | `oklch(0.965 …)` | sunken surfaces          |
| `--bg-3`   | `oklch(0.935 …)` | tracks, disabled fills   |
| `--fg-1`   | `oklch(0.17 …)`  | body text                |
| `--fg-2`   | `oklch(0.45 …)`  | muted text, labels       |
| `--fg-3`   | `oklch(0.62 …)`  | faint text               |
| `--line-1` | `oklch(0.90 …)`  | resting borders          |
| `--line-2` | `oklch(0.82 …)`  | strong borders           |
| `--scrim`  | `--fg-1 / 0.4`   | overlay scrims           |

Aliases read better in component CSS and are what you should reach for:
`--surface-page`, `--surface-raised`, `--surface-sunken`, `--surface-overlay`,
`--text-body`, `--text-muted`, `--text-faint`, `--border-default`,
`--border-strong`, `--focus-ring`.

---

## 2. Voice

The writing is as much a part of this system as the type.

- **Terse, technical, lowercase.** Say the thing. "install flora. pick a hue.
  ship."
- **Everything is lowercase** — headings, labels, buttons, nav. Product names
  too (pollen, mycel). Proper nouns from outside (GitHub, Next.js) keep their
  casing inside prose but become lowercase as a label ("github").
- **Person:** "we" for the community, "you" for the reader, sparingly. Prefer no
  pronoun: "published", not "we published your changes".
- **Length:** headlines ≤ 8 words, one idea. Body ≤ 2 sentences. Buttons 1–3
  words, verbs: "publish", "view source", "explore the garden".
- **Punctuation:** periods end headlines ("open source, for humans."). No
  exclamation marks. Middle dots separate metadata: "v1.2 · 14 contributors".
- **No emoji. No marketing adjectives** (powerful, seamless, beautiful). No "get
  started" or "learn more" — name the destination: "read the docs".
- Numbers as numerals. Versions as `v1.2.0`. Relative time lowercase: "2h ago".

| Write                    | Not                             |
| ------------------------ | ------------------------------- |
| open source, for humans. | Powerful, Seamless Open Source! |
| read the docs            | Learn More                      |
| publish                  | Get Started Now                 |
| v1.2 · 14 contributors   | Version 1.2 (14 contributors!)  |
| published                | We published your changes 🎉    |

---

## 3. Type

**One family: Hanken Grotesk** (weights 300–800). Hierarchy comes from size,
weight and tracking — never from a second face. Code uses the system mono stack,
because code is content, not brand.

| Style   | Size / leading | Weight | Tracking |
| ------- | -------------- | ------ | -------- |
| display | 64 / 1.05      | 500    | −0.03em  |
| h1      | 36 / 1.2       | 500    | −0.02em  |
| h2      | 22 / 1.2       | 500    | −0.02em  |
| lg      | 18 / 1.5       | 400    | 0        |
| body    | 15 / 1.5       | 400    | 0        |
| small   | 13 / 1.5       | 400    | 0        |
| label   | 12 / 1         | 500    | +0.02em  |
| code    | 13 / 1.7       | 400    | mono     |

Use the composite tokens as a `font` shorthand: `font: var(--type-body)`. The
scale itself runs `--text-2xs` (11) through `--text-6xl` (88) in 11 steps.

`text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs. Body text
must clear 4.5:1; labels use `--fg-2`, never `--fg-3`, on the page background.

### Line length

Text never runs the full width of a wide screen. Lines of roughly 45–75
characters are the easiest to read, so every heading and paragraph caps its
width in `ch` (one character of the current font), and the bigger the text, the
shorter the line:

| Text                      | max-width |
| ------------------------- | --------- |
| display (hero headline)   | 16ch      |
| h1                        | 24ch      |
| hero subtitle             | 48ch      |
| lead paragraph (lg)       | 60ch      |
| body and small paragraphs | 68ch      |

Below the cap the text wraps with the container as usual. Code, tables, labels
and one-line UI text (buttons, nav) are not capped.

### Loading the font

flora names the family in `--font-sans` but deliberately does not fetch it — a
component library shouldn't force a network request on its consumers. Load it in
the app:

```tsx
// next/font: self-hosted, no extra request, no flash of fallback
import { Hanken_Grotesk } from 'next/font/google';
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
});
// then in CSS:  :root { --font-sans: var(--font-hanken), Helvetica, sans-serif; }
```

Or, outside Next.js, add the Google Fonts `@import` yourself.

---

## 4. Spacing, shape and layout

- **4px base.** Components use `--space-1` through `--space-6`; sections use
  `--space-20`/`--space-24` of vertical space.
- **Controls are 32 / 40 / 48 tall** (`--control-sm/md/lg`). Every control in
  the system lands on one of these.
- **Container** is 1280 max (`--container-lg`) with a fluid gutter,
  `clamp(1rem, 4vw, 3rem)`.
- **Grids** are `repeat(auto-fill, minmax(280px, 1fr))` — responsive without
  breakpoints. This is why the system needs almost no media queries.
- **Shape is soft, not round.** The radius grows with the box: 4 (badges,
  focus), 6 (controls), 8 (cards, code), 12 (tiles, dialogs, palette). Tags and
  switches are the only pills.
- **Borders:** 1px `--line-1` on resting surfaces. **Cards have borders, not
  shadows.**
- **Shadows only on things that float** — dialog, palette, toast, the pill-tab
  thumb. Light mode uses faint two-layer shadows; dark mode swaps to a 1px ring
  plus a deep soft shadow.
- **Backgrounds are flat.** No gradients, no textures, no illustrations on the
  trunk. Photos on the trunk are `filter: grayscale(1)`, restored to full color
  inside a product scope.
- **Transparency and blur** are for the sticky header and overlay scrims only:
  `backdrop-filter: blur(12px)` over an 80% page color or a 40% scrim.
- **Layout:** a sticky 60px header, content in the container, and nothing else
  fixed except toasts and overlays.

---

## 5. Motion

Expressive, but disciplined: **the spring is for entrances only, because it
overshoots.**

| Token           | Value                              | For                      |
| --------------- | ---------------------------------- | ------------------------ |
| `--ease-out`    | `cubic-bezier(0.2, 0.8, 0.2, 1)`   | state changes, 120–200ms |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)`   | symmetric moves          |
| `--ease-spring` | `cubic-bezier(0.34, 1.4, 0.64, 1)` | entrances only           |

- **Entrances** rise 12px and fade (`bg-rise`) or grow from .96 (`bg-grow`) on
  the spring, staggered 60ms (`--stagger`).
- **Hover** lifts 1px (`--lift`), plus a shadow on cards. **Press** scales to
  .98 (`--press`).
- Check, radio and switch thumbs spring.
- Durations: `--dur-1` 120ms, `--dur-2` 200ms, `--dur-3` 320ms, `--dur-4` 600ms.
- **`prefers-reduced-motion` zeroes every duration.**

**Focus** is a 2px accent ring offset by the page color (`--focus-ring`). Inputs
use a 3px soft-accent halo instead.

---

## 6. Iconography and the mark

- **Icons** are flora's own 25-mark set (`@binarygarden/flora/icons`): 1.5px
  stroke, `currentColor`, 16px inline and 18px in icon buttons. No icon font, no
  emoji. A few Unicode glyphs do real work: `×` (remove/dismiss), `·` (metadata
  separator), `⌘` (shortcut hints).
- **The logo** is the five-petal flower mark: black on light, white on dark,
  **never recolored or tinted with a product hue.** Minimum 20px. The name is
  set beside it in Hanken Grotesk 500 at −0.01em.
- **Product glyphs:** when a product has no image, its tile shows the first two
  letters of its name on its hue.

---

## 7. Components

Imported from subpaths, always:

| Subpath       | Components                                                      |
| ------------- | --------------------------------------------------------------- |
| `/form`       | Button, IconButton, Input, Select, Checkbox, Radio, Switch      |
| `/ui`         | Card, Badge, Tag, Tooltip, AvatarGroup, CodeBlock, CopyableText |
| `/overlay`    | Dialog, Toast, ToastStack, DialogProvider / useDialog           |
| `/navigation` | SiteHeader, Tabs, Carousel, SidebarNav, CommandPalette          |
| `/marketing`  | Hero, ProductTile                                               |
| `/theme`      | ProductScope, ThemeToggleButton, ScriptPreloadTheme             |
| `/icons`      | 26 icon components                                              |
| `/hooks`      | useClientCheck, useViewport                                     |

### How components are styled

Every component is a thin React wrapper over a token-driven class in
`styles.css`. There is no CSS-in-JS, no runtime style injection, and **no
Tailwind** — the token set already covers spacing, type, radius, shadow and
motion, so a utility layer would be a second vocabulary for the same things.

```tsx
<button className="fl-btn" data-variant="primary" data-size="md" />
```

Variants are data attributes, not class permutations. The stylesheet uses native
cascade layers (`@layer base, components`) so an app's own unlayered CSS always
wins without specificity games.

---

## 8. Open decisions

Deliberately left loose:

- Exact product hues. Tiles accept any 0–360; pick per product when it exists.
- Whether products may tint surfaces (`--accent-soft` on backgrounds) or stay
  accent-only. The tokens support both.
- Self-hosted font files vs Google Fonts.
- Illustration and photography direction for product splashes.
