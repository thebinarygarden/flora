import { Button, IconButton } from '@binarygarden/flora/form';
import {
  Badge,
  Card,
  Tooltip,
  AvatarGroup,
  CopyableText,
} from '@binarygarden/flora/ui';
import {
  IconSearch,
  IconGithub,
  IconPlus,
  IconX,
  IconCopy,
} from '@binarygarden/flora/icons';
import { PageHead, Section, Specimen } from '@/app/_components/Specimen';
import { TagDemo } from './_components/TagDemo';

const PEOPLE = ['ana', 'kit', 'rae', 'tomas', 'ivy', 'oz', 'lu', 'mina'].map(
  (name) => ({ name })
);

export default function CorePage() {
  return (
    <div className="page">
      <PageHead eyebrow="components" title="core.">
        button · icon button · badge · tag · card · tooltip · avatar group
      </PageHead>

      <Section title="button">
        <Specimen
          label="variants"
          note="one primary per view, secondary for the rest, ghost inside dense ui, danger only for destructive confirms."
        >
          <Button>publish</Button>
          <Button variant="secondary">view source</Button>
          <Button variant="ghost">cancel</Button>
          <Button variant="danger">delete</Button>
        </Specimen>

        <Specimen
          label="sizes"
          note="32 / 40 / 48 tall, matching the control scale."
        >
          <Button size="sm">small</Button>
          <Button size="md">medium</Button>
          <Button size="lg">large</Button>
        </Specimen>

        <Specimen
          label="icons, loading, disabled, link"
          note="loading swaps the left icon for a spinner. href renders an anchor with identical styling."
        >
          <Button iconLeft={<IconGithub size={14} />}>github</Button>
          <Button iconRight={<IconPlus size={14} />} variant="secondary">
            new project
          </Button>
          <Button loading>publishing</Button>
          <Button disabled>disabled</Button>
          <Button href="#" variant="secondary">
            an anchor
          </Button>
        </Specimen>
      </Section>

      <Section title="icon button">
        <Specimen
          label="variants and sizes"
          note="always pass a label — it is the accessible name and the native tooltip. ghost by default, outline in empty areas, filled for the one accent action."
        >
          <IconButton label="search">
            <IconSearch size={18} />
          </IconButton>
          <IconButton label="close" variant="outline">
            <IconX size={18} />
          </IconButton>
          <IconButton label="new" variant="filled">
            <IconPlus size={18} />
          </IconButton>
          <IconButton label="small" size="sm">
            <IconSearch size={16} />
          </IconButton>
          <IconButton label="large" size="lg">
            <IconSearch size={20} />
          </IconButton>
          <IconButton label="disabled" disabled>
            <IconSearch size={18} />
          </IconButton>
        </Specimen>
      </Section>

      <Section title="badge">
        <Specimen
          label="tones"
          note="a version, a state, a count. not clickable — use a tag for that. semantic tones are for status only, never decoration."
        >
          <Badge>v0.1.0</Badge>
          <Badge tone="accent">new</Badge>
          <Badge tone="solid">12</Badge>
          <Badge tone="ok" dot>
            stable
          </Badge>
          <Badge tone="warn" dot>
            deprecated
          </Badge>
          <Badge tone="danger" dot>
            offline
          </Badge>
        </Specimen>
      </Section>

      <Section title="tag">
        <Specimen
          label="toggle and removable"
          note="a tag either toggles or removes, never both. try both rows."
        >
          <TagDemo />
        </Specimen>
      </Section>

      <Section title="card">
        <Specimen
          label="variants"
          note="cards have borders, not shadows. only interactive ones lift."
          block
        >
          <div className="grid-auto">
            <Card
              title="raised"
              description="a bordered surface on the page."
            />
            <Card
              variant="sunken"
              title="sunken"
              description="tinted, no border. for nested panels."
            />
            <Card
              variant="accent"
              title="accent"
              description="tinted with the product's colour. use it sparingly."
            />
            <Card
              interactive
              title="interactive"
              description="lifts 2px and gains a shadow on hover."
            />
          </div>
        </Specimen>
        <Specimen label="padding" block>
          <div className="grid-auto">
            <Card padding="sm" variant="sunken">
              sm · 16
            </Card>
            <Card padding="md" variant="sunken">
              md · 24
            </Card>
            <Card padding="lg" variant="sunken">
              lg · 32
            </Card>
          </div>
        </Specimen>
      </Section>

      <Section title="tooltip">
        <Specimen
          label="hover or focus"
          note="dark on light (and the reverse), one short line, with an optional shortcut. the third one stays open so you can see it."
        >
          <Tooltip content="search" shortcut="⌘K">
            <IconButton label="search">
              <IconSearch size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip content="below instead" side="bottom">
            <Button variant="secondary">hover me</Button>
          </Tooltip>
          <Tooltip content="always visible" open>
            <Button variant="ghost">forced open</Button>
          </Tooltip>
        </Specimen>
      </Section>

      <Section title="avatar group">
        <Specimen
          label="overflow and label"
          note="the stack fans out on hover."
        >
          <AvatarGroup people={PEOPLE} max={4} label="8 contributors" />
          <AvatarGroup people={PEOPLE} max={8} size={24} />
        </Specimen>
      </Section>

      <Section title="copyable text">
        <Specimen
          label="one inline value"
          note="an id, a token, a secret. for multi-line code use a code block instead."
          block
        >
          <CopyableText
            label="client id"
            value="bg_7f3a9c21e4b84d6fa0c5e81920734bde"
          />
          <span
            style={{
              font: 'var(--type-label)',
              color: 'var(--text-faint)',
              display: 'inline-flex',
              gap: 6,
              alignItems: 'center',
            }}
          >
            <IconCopy size={12} /> flashes the accent on copy
          </span>
        </Specimen>
      </Section>
    </div>
  );
}
