import { Button, IconButton } from '@binarygarden/flora/form';
import {
  Badge,
  Card,
  Tooltip,
  AvatarGroup,
  CopyableText,
  Stat,
  Table,
  EmptyState,
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
import { getI18n } from '@/lib/i18n';

const PEOPLE = ['ana', 'kit', 'rae', 'tomas', 'ivy', 'oz', 'lu', 'mina'].map(
  (name) => ({ name })
);

export default async function CorePage() {
  const { t } = await getI18n();
  const c = t.core;
  return (
    <div className="page">
      <PageHead eyebrow={t.nav.components} title={`${t.gallery.groups.core}.`}>
        {c.contents}
      </PageHead>

      <Section title={c.button}>
        <Specimen label={c.variants} note={c.buttonNote}>
          <Button>{c.publish}</Button>
          <Button variant="secondary">{c.viewSource}</Button>
          <Button variant="ghost">{c.cancel}</Button>
          <Button variant="danger">{c.delete}</Button>
        </Specimen>

        <Specimen label={c.sizes} note={c.sizesNote}>
          <Button size="sm">{c.small}</Button>
          <Button size="md">{c.medium}</Button>
          <Button size="lg">{c.large}</Button>
        </Specimen>

        <Specimen label={c.states} note={c.statesNote}>
          <Button iconLeft={<IconGithub size={14} />}>{t.nav.github}</Button>
          <Button iconRight={<IconPlus size={14} />} variant="secondary">
            {c.newProject}
          </Button>
          <Button loading>{c.publishing}</Button>
          <Button disabled>{c.disabled}</Button>
          <Button href="#" variant="secondary">
            {c.anchor}
          </Button>
          <Button variant="secondary" aria-pressed>
            {c.pressed}
          </Button>
        </Specimen>
      </Section>

      <Section title={c.iconButton}>
        <Specimen label={c.iconVariants} note={c.iconNote}>
          <IconButton label={c.search}>
            <IconSearch size={18} />
          </IconButton>
          <IconButton label={c.close} variant="outline">
            <IconX size={18} />
          </IconButton>
          <IconButton label={c.new} variant="filled">
            <IconPlus size={18} />
          </IconButton>
          <IconButton label={c.small} size="sm">
            <IconSearch size={16} />
          </IconButton>
          <IconButton label={c.large} size="lg">
            <IconSearch size={20} />
          </IconButton>
          <IconButton label={c.disabled} disabled>
            <IconSearch size={18} />
          </IconButton>
        </Specimen>
      </Section>

      <Section title={c.badge}>
        <Specimen label={c.tones} note={c.badgeNote}>
          <Badge>v0.1.0</Badge>
          <Badge tone="accent">{c.new}</Badge>
          <Badge tone="solid">12</Badge>
          <Badge tone="ok" dot>
            {c.stable}
          </Badge>
          <Badge tone="warn" dot>
            {c.deprecated}
          </Badge>
          <Badge tone="danger" dot>
            {c.offline}
          </Badge>
        </Specimen>
      </Section>

      <Section title={c.tag}>
        <Specimen label={c.tagLabel} note={c.tagNote}>
          <TagDemo topics={c.topics} reset={c.reset} labels={t.flora.tag} />
        </Specimen>
      </Section>

      <Section title={c.card}>
        <Specimen label={c.variants} note={c.cardNote} block>
          <div className="grid-auto">
            <Card title={c.raised} description={c.raisedNote} />
            <Card
              variant="sunken"
              title={c.sunken}
              description={c.sunkenNote}
            />
            <Card
              variant="accent"
              title={c.accent}
              description={c.accentNote}
            />
            <Card
              interactive
              title={c.interactive}
              description={c.interactiveNote}
            />
            <Card
              title={c.withAction}
              description={c.withActionNote}
              action={
                <Button size="sm" variant="secondary">
                  {c.edit}
                </Button>
              }
            />
          </div>
        </Specimen>
        <Specimen label={c.padding} block>
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

      <Section title={c.stat}>
        <Specimen label={c.statLabel} note={c.statNote} block>
          <div className="grid-auto">
            <Stat label={c.orders} value="128" hint={c.moreThanLastWeek} />
            <Stat label={c.revenue} value="$4,210.50" />
          </div>
        </Specimen>
      </Section>

      <Section title={c.table}>
        <Specimen label={c.tableLabel} note={c.tableNote} block>
          <Table>
            <thead>
              <tr>
                <th>{c.item}</th>
                <th data-num>{c.sold}</th>
                <th data-num>{c.total}</th>
                <th data-action aria-label={c.delete} />
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ['flora', 42, '$210.00'],
                  ['mycel', 17, '$85.00'],
                  ['pollen', 3, '$15.00'],
                ] as const
              ).map(([name, sold, total]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td data-num>{sold}</td>
                  <td data-num>{total}</td>
                  <td data-action>
                    <IconButton label={c.delete} size="sm">
                      <IconX size={16} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Specimen>
      </Section>

      <Section title={c.emptyState}>
        <Specimen label={c.emptyLabel} note={c.emptyNote} block>
          <Card padding="none">
            <EmptyState>{c.emptyText}</EmptyState>
          </Card>
        </Specimen>
      </Section>

      <Section title={c.tooltip}>
        <Specimen label={c.tooltipLabel} note={c.tooltipNote}>
          <Tooltip content={c.search} shortcut="⌘K">
            <IconButton label={c.search}>
              <IconSearch size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip content={c.below} side="bottom">
            <Button variant="secondary">{c.hoverMe}</Button>
          </Tooltip>
          <Tooltip content={c.alwaysVisible} open>
            <Button variant="ghost">{c.forcedOpen}</Button>
          </Tooltip>
        </Specimen>
      </Section>

      <Section title={c.avatars}>
        <Specimen label={c.avatarsLabel} note={c.avatarsNote}>
          <AvatarGroup people={PEOPLE} max={4} label={c.contributors} />
          <AvatarGroup people={PEOPLE} max={8} size={24} />
        </Specimen>
      </Section>

      <Section title={c.copyable}>
        <Specimen label={c.copyableLabel} note={c.copyableNote} block>
          <CopyableText
            label={c.clientId}
            value="bg_7f3a9c21e4b84d6fa0c5e81920734bde"
            labels={t.flora.copy}
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
            <IconCopy size={12} /> {c.flashes}
          </span>
        </Specimen>
      </Section>
    </div>
  );
}
