import {
  Tabs,
  Carousel,
  SidebarNav,
  CommandPalette,
} from '@binarygarden/flora/navigation';
import { Card } from '@binarygarden/flora/ui';
import {
  IconSearch,
  IconPlus,
  IconSave,
  IconGithub,
  IconInfo,
} from '@binarygarden/flora/icons';
import { PageHead, Section, Specimen } from '@/app/_components/Specimen';

const SIDEBAR = [
  {
    title: 'foundations',
    items: [
      { id: 'color', label: 'color' },
      { id: 'type', label: 'type' },
      { id: 'spacing', label: 'spacing', badge: 3 },
    ],
  },
  {
    title: 'components',
    items: [
      { id: 'core', label: 'core', icon: <IconInfo size={16} /> },
      { id: 'forms', label: 'forms', icon: <IconSave size={16} /> },
    ],
  },
];

const COMMANDS = [
  {
    id: 'new',
    label: 'new project',
    group: 'actions',
    hint: '⌘N',
    icon: <IconPlus size={16} />,
  },
  {
    id: 'save',
    label: 'save changes',
    group: 'actions',
    hint: '⌘S',
    icon: <IconSave size={16} />,
  },
  {
    id: 'search',
    label: 'search the docs',
    group: 'go to',
    icon: <IconSearch size={16} />,
    keywords: 'find lookup',
  },
  {
    id: 'repo',
    label: 'open the repo',
    group: 'go to',
    icon: <IconGithub size={16} />,
  },
];

export default function NavigationPage() {
  return (
    <div className="page">
      <PageHead eyebrow="components" title="navigation.">
        tabs · carousel · sidebar nav · command palette · site header
      </PageHead>

      <Section title="tabs">
        <Specimen
          label="line — page sections"
          note="the active indicator is a 2px accent underline that scales in."
          block
        >
          <Tabs
            items={[
              {
                value: 'readme',
                label: 'readme',
                content: 'the readme panel.',
              },
              {
                value: 'issues',
                label: 'issues',
                count: 12,
                content: '12 open issues.',
              },
              {
                value: 'prs',
                label: 'pull requests',
                count: 3,
                content: '3 open prs.',
              },
            ]}
          />
        </Specimen>
        <Specimen
          label="pill — a view switch"
          note="segmented, on a sunken track, with the active thumb raised on a shadow."
        >
          <Tabs
            variant="pill"
            items={[
              { value: 'grid', label: 'grid' },
              { value: 'list', label: 'list' },
              { value: 'table', label: 'table' },
            ]}
          />
        </Specimen>
      </Section>

      <Section title="carousel">
        <Specimen
          label="arrows"
          note="one item at a time, its neighbours small and faded either side. the arrows wrap at the ends."
          block
        >
          <Carousel
            defaultValue="sprout"
            items={[
              { value: 'seed', title: 'seed' },
              { value: 'sprout', title: 'sprout' },
              { value: 'bloom', title: 'bloom' },
              { value: 'fruit', title: 'fruit' },
            ]}
          />
        </Specimen>
        <Specimen
          label="arrows off — pills"
          note="every item at once, the current one filled. use it when the items fit on one line."
          block
        >
          <Carousel
            arrows={false}
            defaultValue="sprout"
            items={[
              { value: 'seed', title: 'seed' },
              { value: 'sprout', title: 'sprout' },
              { value: 'bloom', title: 'bloom' },
              { value: 'fruit', title: 'fruit' },
            ]}
          />
        </Specimen>
      </Section>

      <Section title="sidebar nav">
        <Specimen
          label="grouped, with a current marker"
          note="the current item gets a 2px accent bar on its left edge."
          block
        >
          <Card variant="sunken" padding="none">
            <SidebarNav groups={SIDEBAR} current="type" />
          </Card>
        </Specimen>
      </Section>

      <Section title="command palette">
        <Specimen
          label="inline, for docs"
          note="opens with ⌘K over a blurred page. use the arrow keys and enter; typing filters the list."
          block
        >
          <CommandPalette inline items={COMMANDS} />
        </Specimen>
      </Section>

      <Section title="site header · footer">
        <Specimen label="the page chrome" block>
          <p className="note" style={{ margin: 0 }}>
            both are live on this page: the sticky header at the top and the
            footer at the bottom. on narrow screens the header&apos;s links
            fold into a menu button.
          </p>
        </Specimen>
      </Section>
    </div>
  );
}
