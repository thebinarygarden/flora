import { BGLanding } from '@binarygarden/flora/bg';
import { Button, Input, Switch } from '@binarygarden/flora/form';
import { Card, Badge, CodeBlock } from '@binarygarden/flora/ui';
import { ProductScope, ThemeToggleButton } from '@binarygarden/flora/theme';
import { IconBGLogo, IconGithub } from '@binarygarden/flora/icons';
import { PageHead, Section, Specimen } from '@/app/_components/Specimen';

const INSTALL = `npm i @binarygarden/flora`;

const USAGE = `import '@binarygarden/flora/styles.css';
import { ProductScope } from '@binarygarden/flora/theme';

export default function Layout({ children }) {
  // one hue. that's the whole theme.
  return <ProductScope hue={330}>{children}</ProductScope>;
}`;

const NEUTRALS = [
  ['--bg-1', 'page / raised surface'],
  ['--bg-2', 'sunken surface'],
  ['--bg-3', 'tracks, disabled'],
  ['--fg-1', 'body text'],
  ['--fg-2', 'muted text, labels'],
  ['--fg-3', 'faint text'],
  ['--line-1', 'resting borders'],
  ['--line-2', 'strong borders'],
];

const SEMANTIC = [
  ['--ok', 'oklch(0.62 0.15 150)'],
  ['--warn', 'oklch(0.72 0.15 75)'],
  ['--danger', 'oklch(0.58 0.19 25)'],
  ['--info', 'oklch(0.6 0.13 240)'],
];

const TYPE_SCALE = [
  ['--text-2xs', '11'],
  ['--text-xs', '12'],
  ['--text-sm', '13'],
  ['--text-md', '15'],
  ['--text-lg', '18'],
  ['--text-xl', '22'],
  ['--text-2xl', '28'],
  ['--text-3xl', '36'],
  ['--text-4xl', '48'],
  ['--text-5xl', '64'],
  ['--text-6xl', '88'],
];

const MEASURE = [
  ['display (hero headline)', '16ch'],
  ['h1', '24ch'],
  ['hero subtitle', '48ch'],
  ['lead paragraph (lg)', '60ch'],
  ['body and small paragraphs', '68ch'],
];

const SPACE = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32];

const RADIUS = [
  ['--radius-xs', '4', 'badges, focus'],
  ['--radius-sm', '6', 'controls'],
  ['--radius-md', '8', 'cards, code'],
  ['--radius-lg', '12', 'tiles, dialogs, palette'],
  ['--radius-full', '999', 'tags, switches'],
];

const EASING = [
  ['--ease-out', 'cubic-bezier(0.2, 0.8, 0.2, 1)', 'state changes, 120–200ms'],
  ['--ease-in-out', 'cubic-bezier(0.65, 0, 0.35, 1)', 'symmetric moves'],
  [
    '--ease-spring',
    'cubic-bezier(0.34, 1.4, 0.64, 1)',
    'entrances only — it overshoots',
  ],
];

function Swatch({
  token,
  note,
  theme,
}: {
  token: string;
  note?: string;
  /** pin the chip's colour to one theme, whatever the page's */
  theme?: 'light' | 'dark';
}) {
  return (
    <div className="swatch">
      <div
        className="chip"
        data-theme={theme}
        style={{ background: `var(${token})` }}
      />
      <div className="name">{token}</div>
      {note && <div className="val">{note}</div>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <BGLanding
        className="home-hero"
        eyebrowMark={<IconBGLogo size={6} />}
        eyebrow="flora"
        title={
          <>
            plants of <em>a particular region or time</em>
          </>
        }
        subtitle="react components for binary garden"
        actions={
          <>
            <Button size="lg" variant="ghost" href="/components">
              components
            </Button>
            <Button size="lg" variant="ghost" href="/icons">
              icons
            </Button>
            <Button
              size="lg"
              variant="ghost"
              href="https://github.com/thebinarygarden/flora"
              iconLeft={<IconGithub size={16} />}
            >
              github
            </Button>
            <ThemeToggleButton />
          </>
        }
        media={
          <div className="col">
            <CodeBlock title="terminal" language="sh" code={INSTALL} />
            <CodeBlock
              title="app/layout.tsx"
              language="tsx"
              lines
              code={USAGE}
            />
          </div>
        }
        background={
          <video src="/newhozions.mp4" autoPlay muted loop playsInline />
        }
      />

      <div className="page">
        <PageHead eyebrow="the design" title="one hue is the whole theme.">
          every binary garden site and product is built from the same
          components, type, spacing and motion. our own sites, like{' '}
          <a href="https://binarygarden.com">the trunk</a> and this one, are
          black and white. each product we make for others adds one color. the
          rules below make that work.
        </PageHead>

        {/* ---------------------------------------------------------- colors */}
        <Section title="color">
          <Specimen
            label="neutrals · light"
            note="oklch hue 150 at chroma 0.004 — a trace of chlorophyll, so black and white read as paper and soil rather than #000 and #fff."
            block
          >
            <div className="swatches">
              {NEUTRALS.map(([t, n]) => (
                <Swatch key={t} token={t} note={n} theme="light" />
              ))}
            </div>
          </Specimen>

          <Specimen
            label="neutrals · dark"
            note="data-theme='dark' on <html>. the same hue with inverted lightness; borders replace shadows."
            block
          >
            <div className="swatches">
              {NEUTRALS.map(([t, n]) => (
                <Swatch key={t} token={t} note={n} theme="dark" />
              ))}
            </div>
          </Specimen>

          <Specimen
            label="accent · one knob"
            note="--product-hue is the only thing that changes between products. the trunk sets none, so the accent is just the text colour: black in light mode, white in dark."
            block
          >
            <div className="row">
              <div className="col" style={{ gap: 'var(--space-2)' }}>
                <span className="val">no scope · the trunk</span>
                <div className="row">
                  <Button>primary</Button>
                  <Badge tone="accent">accent</Badge>
                </div>
              </div>
              {[60, 150, 200, 330].map((hue) => (
                <ProductScope key={hue} hue={hue}>
                  <div className="col" style={{ gap: 'var(--space-2)' }}>
                    <span className="val">hue {hue}</span>
                    <div className="row">
                      <Button>primary</Button>
                      <Badge tone="accent">accent</Badge>
                    </div>
                  </div>
                </ProductScope>
              ))}
            </div>
          </Specimen>

          <Specimen
            label="semantic"
            note="status only, never decorative. a semantic colour on a button that isn't reporting state is a bug."
            block
          >
            <div className="swatches">
              {SEMANTIC.map(([t, v]) => (
                <Swatch key={t} token={t} note={v} />
              ))}
            </div>
          </Specimen>
        </Section>

        {/* ------------------------------------------------------------ type */}
        <Section title="type">
          <Specimen
            label="display"
            note="hanken grotesk, medium, tracking -0.03em, leading 1.05. text-wrap: balance on headings."
            block
          >
            <div
              style={{
                font: 'var(--type-display)',
                letterSpacing: 'var(--tracking-display)',
                textWrap: 'balance',
              }}
            >
              open source, for humans.
            </div>
          </Specimen>

          <Specimen
            label="headings & body"
            note="one family. hierarchy comes from size, weight and tracking — never from a second face."
            block
          >
            <div className="col">
              <div
                style={{
                  font: 'var(--type-h1)',
                  letterSpacing: 'var(--tracking-heading)',
                }}
              >
                h1 · 36 / 1.2
              </div>
              <div
                style={{
                  font: 'var(--type-h2)',
                  letterSpacing: 'var(--tracking-heading)',
                }}
              >
                h2 · 22 / 1.2
              </div>
              <div style={{ font: 'var(--type-lg)' }}>lg · 18 / 1.5</div>
              <div style={{ font: 'var(--type-body)' }}>
                body · 15 / 1.5 — paragraphs get text-wrap: pretty.
              </div>
              <div
                style={{
                  font: 'var(--type-small)',
                  color: 'var(--text-muted)',
                }}
              >
                small · 13 / 1.5
              </div>
            </div>
          </Specimen>

          <Specimen label="scale" note="11 → 88 in 11 steps." block>
            <table className="specs">
              <thead>
                <tr>
                  <th>token</th>
                  <th>px</th>
                  <th>specimen</th>
                </tr>
              </thead>
              <tbody>
                {TYPE_SCALE.map(([t, px]) => (
                  <tr key={t}>
                    <td>
                      <code>{t}</code>
                    </td>
                    <td>{px}</td>
                    <td style={{ fontSize: `var(${t})`, lineHeight: 1.1 }}>
                      binary garden
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Specimen>

          <Specimen
            label="line length"
            note="lines of 45–75 characters read best, so headings and paragraphs cap their width in ch. the bigger the text, the shorter the line."
            block
          >
            <table className="specs">
              <thead>
                <tr>
                  <th>text</th>
                  <th>max-width</th>
                </tr>
              </thead>
              <tbody>
                {MEASURE.map(([text, cap]) => (
                  <tr key={text}>
                    <td>{text}</td>
                    <td>
                      <code>{cap}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p
              style={{
                font: 'var(--type-body)',
                maxWidth: '68ch',
                textWrap: 'pretty',
                margin: 0,
              }}
            >
              this paragraph stops at 68ch however wide the window gets. below
              that it wraps with its container like any other text. code,
              tables, labels and one-line ui text like buttons and nav are not
              capped.
            </p>
          </Specimen>

          <Specimen
            label="labels & code"
            note="labels are lowercase at +0.02em tracking and use --fg-2, not --fg-3, on the page background. code uses the system mono stack."
            block
          >
            <div className="col">
              <span
                style={{
                  font: 'var(--type-label)',
                  letterSpacing: 'var(--tracking-label)',
                  color: 'var(--text-muted)',
                }}
              >
                a label · 12 / 500 / +0.02em
              </span>
              <CodeBlock
                language="ts"
                code={`const hue = 330; // the whole theme`}
              />
            </div>
          </Specimen>
        </Section>

        {/* --------------------------------------------------------- spacing */}
        <Section title="spacing & shape">
          <Specimen
            label="scale"
            note="4px base. components use 1–6; sections use 20–24 of vertical space."
            block
          >
            <div className="col" style={{ gap: 'var(--space-2)' }}>
              {SPACE.map((n) => (
                <div key={n} className="row" style={{ gap: 'var(--space-3)' }}>
                  <code
                    style={{
                      font: 'var(--type-code)',
                      color: 'var(--text-faint)',
                      minWidth: '10ch',
                    }}
                  >
                    --space-{n}
                  </code>
                  <div
                    style={{
                      height: 12,
                      width: `var(--space-${n})`,
                      background: 'var(--accent)',
                      borderRadius: 2,
                    }}
                  />
                  <span className="val">{n * 4}</span>
                </div>
              ))}
            </div>
          </Specimen>

          <Specimen
            label="control heights"
            note="32 / 40 / 48. every control in the system lands on one of these."
          >
            <Button size="sm">sm · 32</Button>
            <Button size="md">md · 40</Button>
            <Button size="lg">lg · 48</Button>
          </Specimen>

          <Specimen
            label="radius & shadow"
            note="soft, not round — the radius grows with the box. shadows appear only on things that float; resting cards use a border."
            block
          >
            <table className="specs">
              <thead>
                <tr>
                  <th>token</th>
                  <th>px</th>
                  <th>used for</th>
                  <th>specimen</th>
                </tr>
              </thead>
              <tbody>
                {RADIUS.map(([t, px, use]) => (
                  <tr key={t}>
                    <td>
                      <code>{t}</code>
                    </td>
                    <td>{px}</td>
                    <td>{use}</td>
                    <td>
                      <div
                        style={{
                          width: 64,
                          height: 28,
                          borderRadius: `var(${t})`,
                          background: 'var(--surface-sunken)',
                          border: '1px solid var(--line-1)',
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row" style={{ marginTop: 'var(--space-4)' }}>
              {['--shadow-sm', '--shadow-md', '--shadow-lg'].map((s) => (
                <div
                  key={s}
                  style={{
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-raised)',
                    boxShadow: `var(${s})`,
                    font: 'var(--type-label)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </Specimen>
        </Section>

        {/* ---------------------------------------------------------- motion */}
        <Section title="motion">
          <Specimen
            label="easing"
            note="ease-out for most things; the spring is for entrances only, because it overshoots. reduced motion zeroes every duration."
            block
          >
            <table className="specs">
              <thead>
                <tr>
                  <th>token</th>
                  <th>curve</th>
                  <th>used for</th>
                </tr>
              </thead>
              <tbody>
                {EASING.map(([t, c, use]) => (
                  <tr key={t}>
                    <td>
                      <code>{t}</code>
                    </td>
                    <td>
                      <code>{c}</code>
                    </td>
                    <td>{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Specimen>

          <Specimen
            label="hover · press · reveal"
            note="buttons lift 1px on hover, cards 2px with a shadow. press scales to .98. reveals rise 12px and fade, staggered 60ms."
            block
          >
            <div className="grid-auto rise">
              <Card
                interactive
                title="hover me"
                description="lift 1px + shadow"
              />
              <Card interactive title="press me" description="scale .98" />
              <Card
                interactive
                title="revealed"
                description="rise 12px + fade"
              />
            </div>
          </Specimen>

          <Specimen
            label="focus"
            note="a 2px accent ring offset by the page colour. inputs get a 3px soft-accent halo instead. tab through these."
          >
            <Button variant="secondary">tab to me</Button>
            <Input placeholder="then to me" />
            <Switch label="and me" />
          </Specimen>
        </Section>

        {/* ----------------------------------------------------------- brand */}
        <Section title="brand">
          <Specimen
            label="mark"
            note="the five-petal flower: black on light, white on dark, never recoloured or tinted with a product hue. minimum 20px. the name is set beside it in hanken grotesk 500 at -0.01em."
          >
            <IconBGLogo size={48} />
            <IconBGLogo size={28} />
            <IconBGLogo size={20} />
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                font: 'var(--type-body)',
                fontWeight: 500,
                letterSpacing: '-0.01em',
              }}
            >
              <IconBGLogo size={24} />
              binary garden
            </span>
          </Specimen>

          <Specimen
            label="voice"
            note="terse, technical, lowercase. say the thing."
            block
          >
            <table className="specs">
              <thead>
                <tr>
                  <th>do</th>
                  <th>not</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>open source, for humans.</td>
                  <td>Powerful, Seamless Open Source!</td>
                </tr>
                <tr>
                  <td>read the docs</td>
                  <td>Learn More</td>
                </tr>
                <tr>
                  <td>publish</td>
                  <td>Get Started Now</td>
                </tr>
                <tr>
                  <td>v1.2 · 14 contributors</td>
                  <td>Version 1.2 (14 contributors!)</td>
                </tr>
                <tr>
                  <td>published</td>
                  <td>We published your changes 🎉</td>
                </tr>
              </tbody>
            </table>
          </Specimen>
        </Section>
      </div>
    </>
  );
}
