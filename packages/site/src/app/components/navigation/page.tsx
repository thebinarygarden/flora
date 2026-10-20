import { Tabs, Carousel, CommandPalette } from '@binarygarden/flora/navigation';
import { Card } from '@binarygarden/flora/ui';
import {
  IconSearch,
  IconPlus,
  IconSave,
  IconGithub,
} from '@binarygarden/flora/icons';
import { PageHead, Section, Specimen } from '@/components/specimen';
import { SidebarDemo } from './_components/sidebar-demo';
import { LocaleDemo } from './_components/locale-demo';
import { getI18n, type Dict } from '@/lib/i18n';

const commands = (c: Dict['navigation']['commands']) => [
  {
    id: 'new',
    label: c.new,
    group: c.actions,
    hint: '⌘N',
    icon: <IconPlus size={16} />,
  },
  {
    id: 'save',
    label: c.save,
    group: c.actions,
    hint: '⌘S',
    icon: <IconSave size={16} />,
  },
  {
    id: 'search',
    label: c.search,
    group: c.goTo,
    icon: <IconSearch size={16} />,
    keywords: 'find lookup',
  },
  {
    id: 'repo',
    label: c.repo,
    group: c.goTo,
    icon: <IconGithub size={16} />,
  },
];

export default async function NavigationPage() {
  const { t } = await getI18n();
  const n = t.navigation;
  const stages = (['seed', 'sprout', 'bloom', 'fruit'] as const).map((v) => ({
    value: v,
    title: n.stages[v],
  }));
  return (
    <div className="page">
      <PageHead
        eyebrow={t.nav.components}
        title={`${t.gallery.groups.navigation}.`}
      >
        {n.contents}
      </PageHead>

      <Section title={n.tabs}>
        <Specimen label={n.line} note={n.lineNote} block>
          <Tabs
            items={[
              {
                value: 'readme',
                label: n.readme,
                content: n.readmePanel,
              },
              {
                value: 'issues',
                label: n.issues,
                count: 12,
                content: n.issuesPanel,
              },
              {
                value: 'prs',
                label: n.prs,
                count: 3,
                content: n.prsPanel,
              },
            ]}
          />
        </Specimen>
        <Specimen label={n.pill} note={n.pillNote}>
          <Tabs
            variant="pill"
            items={[
              { value: 'grid', label: n.views.grid },
              { value: 'list', label: n.views.list },
              { value: 'table', label: n.views.table },
            ]}
          />
        </Specimen>
      </Section>

      <Section title={n.carousel}>
        <Specimen label={n.arrows} note={n.arrowsNote} block>
          <Carousel
            defaultValue="sprout"
            items={stages}
            labels={t.flora.carousel}
          />
        </Specimen>
        <Specimen label={n.pills} note={n.pillsNote} block>
          <Carousel arrows={false} defaultValue="sprout" items={stages} />
        </Specimen>
      </Section>

      <Section title={n.sidebar}>
        <Specimen label={n.sidebarLabel} note={n.sidebarNote} block>
          <Card variant="sunken" padding="none">
            <SidebarDemo t={n.sidebarItems} labels={t.flora.sidebar} />
          </Card>
        </Specimen>
      </Section>

      <Section title={n.palette}>
        <Specimen label={n.paletteLabel} note={n.paletteNote} block>
          <CommandPalette
            inline
            items={commands(n.commands)}
            placeholder={n.placeholder}
            labels={t.flora.palette}
          />
        </Specimen>
      </Section>

      <Section title={n.language}>
        <Specimen label={n.localeLabel} note={n.localeNote}>
          <LocaleDemo label={t.language} />
        </Specimen>
      </Section>

      <Section title={n.chrome}>
        <Specimen label={n.chromeLabel} block>
          <p className="note" style={{ margin: 0 }}>
            {n.chromeNote}
          </p>
        </Specimen>
      </Section>
    </div>
  );
}
