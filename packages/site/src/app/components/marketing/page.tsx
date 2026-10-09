import { Hero, ProductTile } from '@binarygarden/flora/marketing';
import { CodeBlock } from '@binarygarden/flora/ui';
import { Button } from '@binarygarden/flora/form';
import { IconArrow } from '@binarygarden/flora/icons';
import { PageHead, Section, Specimen } from '@/app/_components/Specimen';

const PRODUCTS = [
  {
    name: 'pollen',
    tagline: 'a font manager for teams',
    hue: 60,
    meta: 'v0.9 · 6 contributors',
  },
  {
    name: 'mycel',
    tagline: 'local-first notes that link',
    hue: 330,
    meta: 'v1.2 · 14 contributors',
  },
  {
    name: 'canopy',
    tagline: 'timelines for motion designers',
    hue: 200,
    meta: 'alpha · 3 contributors',
  },
  {
    name: 'loam',
    tagline: 'a roadmap in a text file',
    hue: 150,
    meta: 'v0.3 · 5 contributors',
  },
];

const SAMPLE = `export function Button({ variant = 'primary' }) {
  // every colour comes from a token
  return <button className="fl-btn" data-variant={variant} />;
}`;

export default function MarketingPage() {
  return (
    <div className="page">
      <PageHead eyebrow="components" title="marketing.">
        hero · product tile · code block
      </PageHead>

      <Section title="hero">
        <Specimen
          label="eyebrow, display headline, subtitle, actions"
          note="headlines are at most 8 words, one idea, and end with a period. wrap a phrase in <em> to tint it with the accent. the parts stagger in by 60ms."
          block
        >
          <Hero
            eyebrow="binary garden"
            title={
              <>
                open source, <em>for humans.</em>
              </>
            }
            subtitle="a community of technical creatives building free software that shares one design language."
            actions={
              <>
                <Button
                  size="lg"
                  iconRight={<IconArrow orientation="right" size={16} />}
                >
                  explore
                </Button>
                <Button size="lg" variant="ghost">
                  contribute
                </Button>
              </>
            }
          />
        </Specimen>
      </Section>

      <Section title="product tile">
        <Specimen
          label="where colour shows up on BG sites"
          note="each tile carries its product's colour, and everything inside it uses that colour. with no image, the tile shows the product's initials."
          block
        >
          <div className="grid-auto rise">
            {PRODUCTS.map((p) => (
              <ProductTile
                key={p.name}
                {...p}
                glyph={p.name.slice(0, 2)}
                href="#"
              />
            ))}
          </div>
        </Specimen>
        <Specimen label="sizes" note="the splash grows: 72 / 120 / 200." block>
          <div className="grid-auto">
            <ProductTile name="small" hue={280} glyph="sm" size="sm" />
            <ProductTile name="medium" hue={280} glyph="md" size="md" />
            <ProductTile name="large" hue={280} glyph="lg" size="lg" />
          </div>
        </Specimen>
      </Section>

      <Section title="code block">
        <Specimen
          label="header, line numbers, copy"
          note="code uses the system mono stack — code is content, not brand. the copy button flashes the accent."
          block
        >
          <CodeBlock
            title="terminal"
            language="sh"
            code="npm i @binarygarden/flora"
          />
          <CodeBlock title="Button.tsx" language="tsx" lines code={SAMPLE} />
          <CodeBlock code="no header, just a floating copy button" />
        </Specimen>
      </Section>
    </div>
  );
}
