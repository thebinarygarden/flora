import { Tabs, Carousel, CommandPalette } from '@binarygarden/flora/navigation';
import { Card } from '@binarygarden/flora/ui';
import {
  IconSearch,
  IconPlus,
  IconSave,
  IconGithub,
} from '@binarygarden/flora/icons';
import { PageHead, Section, Specimen } from '@/app/_components/Specimen';
import { SidebarDemo } from './_components/SidebarDemo';
import { LocaleDemo } from './_components/LocaleDemo';

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
        tabs · carousel · sidebar nav · command palette · language · site header
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
          label="grouped, nested, collapsible"
          note="the current item gets a 2px accent bar. picking an item opens its sub-items. drag the right edge to resize; drag past the minimum or use the chevron to fold it to a rail, and click the rail to open it again."
          block
        >
          <Card variant="sunken" padding="none">
            <SidebarDemo />
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

      <Section title="language">
        <Specimen
          label="locale toggle"
          note="moves like the theme toggle: click to open every language, pick one to close it. the app stores the choice and passes it back as value."
        >
          <LocaleDemo />
        </Specimen>
      </Section>

      <Section title="site header · footer">
        <Specimen label="the page chrome" block>
          <p className="note" style={{ margin: 0 }}>
            both are live on this page: the sticky header at the top and the
            footer at the bottom. on narrow screens the header&apos;s links fold
            into a menu button.
          </p>
        </Specimen>
      </Section>
    </div>
  );
}
