import { BGLanding } from '@binarygarden/flora/bg';
import { Button, Input, Switch } from '@binarygarden/flora/form';
import { Card, Badge, CodeBlock } from '@binarygarden/flora/ui';
import { ProductScope } from '@binarygarden/flora/theme';
import { IconBGLogo, IconGithub } from '@binarygarden/flora/icons';
import { PageHead, Section, Specimen } from '@/components/specimen';
import { SiteActions, SiteNav } from '@/components/site-chrome';
import { format } from '@/lib/format';
import { getI18n } from '@/lib/i18n';

const INSTALL = `npm i @binarygarden/flora`;

const USAGE = `import '@binarygarden/flora/styles.css';
import { ProductScope } from '@binarygarden/flora/theme';

export default function Layout({ children }) {
  // one hue. that's the whole theme.
  return <ProductScope hue={330}>{children}</ProductScope>;
}`;

// notes for these come from the dictionary, keyed by token
const NEUTRALS = [
  '--bg-1',
  '--bg-2',
  '--bg-3',
  '--fg-1',
  '--fg-2',
  '--fg-3',
  '--line-1',
  '--line-2',
] as const;

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
  ['display', '16ch'],
  ['h1', '24ch'],
  ['subtitle', '48ch'],
  ['lead', '60ch'],
  ['body', '68ch'],
] as const;

const SPACE = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32];

const RADIUS = [
  ['--radius-xs', '4'],
  ['--radius-sm', '6'],
  ['--radius-md', '8'],
  ['--radius-lg', '12'],
  ['--radius-full', '999'],
] as const;

const EASING = [
  ['--ease-out', 'cubic-bezier(0.2, 0.8, 0.2, 1)'],
  ['--ease-in-out', 'cubic-bezier(0.65, 0, 0.35, 1)'],
  ['--ease-spring', 'cubic-bezier(0.34, 1.4, 0.64, 1)'],
] as const;

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

export default async function Home() {
  const { t } = await getI18n();
  const h = t.home;
  const [introBefore, introAfter] = h.intro.split('{trunk}');
  return (
    <>
      <SiteNav overLanding />
      <main>
        <BGLanding
          corner={<SiteActions />}
          className="home-hero"
          eyebrowMark={<IconBGLogo size={6} />}
          eyebrow="flora"
          title={
            <>
              {h.titleStart} <em>{h.titleEm}</em>
            </>
          }
          subtitle={h.subtitle}
          actions={
            <>
              <Button size="lg" variant="ghost" href="/components">
                {t.nav.components}
              </Button>
              <Button size="lg" variant="ghost" href="/icons">
                {t.nav.icons}
              </Button>
              <Button
                size="lg"
                variant="ghost"
                href="https://github.com/thebinarygarden/flora"
                iconLeft={<IconGithub size={16} />}
              >
                {t.nav.contribute}
              </Button>
            </>
          }
          media={
            <div className="col">
              <CodeBlock
                title="terminal"
                language="sh"
                code={INSTALL}
                labels={t.flora.code}
              />
              <CodeBlock
                title="app/layout.tsx"
                language="tsx"
                lines
                code={USAGE}
                labels={t.flora.code}
              />
            </div>
          }
          background={
            <video src="/newhozions.mp4" autoPlay muted loop playsInline />
          }
        />

        <div className="page">
          <PageHead eyebrow={h.eyebrow} title={h.title}>
            {introBefore}
            <a href="https://binarygarden.com">{h.trunk}</a>
            {introAfter}
          </PageHead>

          {/* ---------------------------------------------------------- colors */}
          <Section title={h.color}>
            <Specimen label={h.neutralsLight} note={h.neutralsLightNote} block>
              <div className="swatches">
                {NEUTRALS.map((token) => (
                  <Swatch
                    key={token}
                    token={token}
                    note={h.neutrals[token]}
                    theme="light"
                  />
                ))}
              </div>
            </Specimen>

            <Specimen label={h.neutralsDark} note={h.neutralsDarkNote} block>
              <div className="swatches">
                {NEUTRALS.map((token) => (
                  <Swatch
                    key={token}
                    token={token}
                    note={h.neutrals[token]}
                    theme="dark"
                  />
                ))}
              </div>
            </Specimen>

            <Specimen label={h.accent} note={h.accentNote} block>
              <div className="row">
                <div className="col" style={{ gap: 'var(--space-2)' }}>
                  <span className="val">{h.noScope}</span>
                  <div className="row">
                    <Button>{h.primary}</Button>
                    <Badge tone="accent">{h.accentBadge}</Badge>
                  </div>
                </div>
                {[60, 150, 200, 330].map((hue) => (
                  <ProductScope key={hue} hue={hue}>
                    <div className="col" style={{ gap: 'var(--space-2)' }}>
                      <span className="val">{format(h.hue, { n: hue })}</span>
                      <div className="row">
                        <Button>{h.primary}</Button>
                        <Badge tone="accent">{h.accentBadge}</Badge>
                      </div>
                    </div>
                  </ProductScope>
                ))}
              </div>
            </Specimen>

            <Specimen label={h.semantic} note={h.semanticNote} block>
              <div className="swatches">
                {SEMANTIC.map(([t, v]) => (
                  <Swatch key={t} token={t} note={v} />
                ))}
              </div>
            </Specimen>
          </Section>

          {/* ------------------------------------------------------------ type */}
          <Section title={h.type}>
            <Specimen label={h.display} note={h.displayNote} block>
              <div
                style={{
                  font: 'var(--type-display)',
                  letterSpacing: 'var(--tracking-display)',
                  textWrap: 'balance',
                }}
              >
                {h.displaySample}
              </div>
            </Specimen>

            <Specimen label={h.headings} note={h.headingsNote} block>
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
                <div style={{ font: 'var(--type-body)' }}>{h.bodySample}</div>
                <div
                  style={{
                    font: 'var(--type-small)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {h.smallSample}
                </div>
              </div>
            </Specimen>

            <Specimen label={h.scale} note={h.typeScaleNote} block>
              <table className="specs">
                <thead>
                  <tr>
                    <th>{h.token}</th>
                    <th>px</th>
                    <th>{h.specimen}</th>
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

            <Specimen label={h.lineLength} note={h.lineLengthNote} block>
              <table className="specs">
                <thead>
                  <tr>
                    <th>{h.text}</th>
                    <th>max-width</th>
                  </tr>
                </thead>
                <tbody>
                  {MEASURE.map(([text, cap]) => (
                    <tr key={text}>
                      <td>{h.measure[text]}</td>
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
                {h.measureSample}
              </p>
            </Specimen>

            <Specimen label={h.labels} note={h.labelsNote} block>
              <div className="col">
                <span
                  style={{
                    font: 'var(--type-label)',
                    letterSpacing: 'var(--tracking-label)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {h.labelSample}
                </span>
                <CodeBlock
                  language="ts"
                  code={`const hue = 330; // the whole theme`}
                  labels={t.flora.code}
                />
              </div>
            </Specimen>
          </Section>

          {/* --------------------------------------------------------- spacing */}
          <Section title={h.spacing}>
            <Specimen label={h.scale} note={h.spaceNote} block>
              <div className="col" style={{ gap: 'var(--space-2)' }}>
                {SPACE.map((n) => (
                  <div
                    key={n}
                    className="row"
                    style={{ gap: 'var(--space-3)' }}
                  >
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

            <Specimen label={h.controls} note={h.controlsNote}>
              <Button size="sm">sm · 32</Button>
              <Button size="md">md · 40</Button>
              <Button size="lg">lg · 48</Button>
            </Specimen>

            <Specimen label={h.radius} note={h.radiusNote} block>
              <table className="specs">
                <thead>
                  <tr>
                    <th>{h.token}</th>
                    <th>px</th>
                    <th>{h.usedFor}</th>
                    <th>{h.specimen}</th>
                  </tr>
                </thead>
                <tbody>
                  {RADIUS.map(([token, px]) => (
                    <tr key={token}>
                      <td>
                        <code>{token}</code>
                      </td>
                      <td>{px}</td>
                      <td>{h.radii[token]}</td>
                      <td>
                        <div
                          style={{
                            width: 64,
                            height: 28,
                            borderRadius: `var(${token})`,
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
          <Section title={h.motion}>
            <Specimen label={h.easing} note={h.easingNote} block>
              <table className="specs">
                <thead>
                  <tr>
                    <th>{h.token}</th>
                    <th>{h.curve}</th>
                    <th>{h.usedFor}</th>
                  </tr>
                </thead>
                <tbody>
                  {EASING.map(([token, c]) => (
                    <tr key={token}>
                      <td>
                        <code>{token}</code>
                      </td>
                      <td>
                        <code>{c}</code>
                      </td>
                      <td>{h.easings[token]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Specimen>

            <Specimen label={h.hover} note={h.hoverNote} block>
              <div className="grid-auto rise">
                <Card
                  interactive
                  title={h.hoverMe}
                  description={h.hoverMeNote}
                />
                <Card
                  interactive
                  title={h.pressMe}
                  description={h.pressMeNote}
                />
                <Card
                  interactive
                  title={h.revealed}
                  description={h.revealedNote}
                />
              </div>
            </Specimen>

            <Specimen label={h.focus} note={h.focusNote}>
              <Button variant="secondary">{h.tabToMe}</Button>
              <Input placeholder={h.thenToMe} />
              <Switch label={h.andMe} />
            </Specimen>
          </Section>

          {/* ----------------------------------------------------------- brand */}
          <Section title={h.brand}>
            <Specimen label={h.mark} note={h.markNote}>
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

            <Specimen label={h.voice} note={h.voiceNote} block>
              <table className="specs">
                <thead>
                  <tr>
                    <th>{h.do}</th>
                    <th>{h.not}</th>
                  </tr>
                </thead>
                <tbody>
                  {h.voiceRows.map(([yes, no]) => (
                    <tr key={yes}>
                      <td>{yes}</td>
                      <td>{no}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Specimen>
          </Section>
        </div>
      </main>
    </>
  );
}
