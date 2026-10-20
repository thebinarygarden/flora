import { Hero, ProductTile } from '@binarygarden/flora/marketing';
import { CodeBlock } from '@binarygarden/flora/ui';
import { Button } from '@binarygarden/flora/form';
import { IconArrow } from '@binarygarden/flora/icons';
import { PageHead, Section, Specimen } from '@/components/specimen';
import { getI18n } from '@/lib/i18n';

// taglines and meta come from the dictionary, keyed by name
const PRODUCTS = [
  { name: 'pollen', hue: 60 },
  { name: 'mycel', hue: 330 },
  { name: 'canopy', hue: 200 },
  { name: 'loam', hue: 150 },
] as const;

const SAMPLE = `export function Button({ variant = 'primary' }) {
  // every colour comes from a token
  return <button className="fl-btn" data-variant={variant} />;
}`;

export default async function MarketingPage() {
  const { t } = await getI18n();
  const m = t.marketing;
  return (
    <div className="page">
      <PageHead
        eyebrow={t.nav.components}
        title={`${t.gallery.groups.marketing}.`}
      >
        {m.contents}
      </PageHead>

      <Section title={m.hero}>
        <Specimen label={m.heroLabel} note={m.heroNote} block>
          <Hero
            eyebrow="binary garden"
            title={
              <>
                {m.heroTitleStart} <em>{m.heroTitleEm}</em>
              </>
            }
            subtitle={m.heroSubtitle}
            actions={
              <>
                <Button
                  size="lg"
                  iconRight={<IconArrow orientation="right" size={16} />}
                >
                  {m.explore}
                </Button>
                <Button size="lg" variant="ghost">
                  {m.contribute}
                </Button>
              </>
            }
          />
        </Specimen>
      </Section>

      <Section title={m.tile}>
        <Specimen label={m.tileLabel} note={m.tileNote} block>
          <div className="grid-auto rise">
            {PRODUCTS.map((p) => (
              <ProductTile
                key={p.name}
                {...p}
                {...m.products[p.name]}
                glyph={p.name.slice(0, 2)}
                href="#"
              />
            ))}
          </div>
        </Specimen>
        <Specimen label={m.sizes} note={m.sizesNote} block>
          <div className="grid-auto">
            <ProductTile name={m.small} hue={280} glyph="sm" size="sm" />
            <ProductTile name={m.medium} hue={280} glyph="md" size="md" />
            <ProductTile name={m.large} hue={280} glyph="lg" size="lg" />
          </div>
        </Specimen>
      </Section>

      <Section title={m.code}>
        <Specimen label={m.codeLabel} note={m.codeNote} block>
          <CodeBlock
            title="terminal"
            language="sh"
            code="npm i @binarygarden/flora"
            labels={t.flora.code}
          />
          <CodeBlock
            title="Button.tsx"
            language="tsx"
            lines
            code={SAMPLE}
            labels={t.flora.code}
          />
          <CodeBlock code={m.noHeader} labels={t.flora.code} />
        </Specimen>
      </Section>
    </div>
  );
}
