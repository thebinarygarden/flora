import {
  Input,
  Select,
  Checkbox,
  Radio,
  Switch,
} from '@binarygarden/flora/form';
import { Card } from '@binarygarden/flora/ui';
import { IconSearch } from '@binarygarden/flora/icons';
import { PageHead, Section, Specimen } from '@/components/specimen';
import { getI18n } from '@/lib/i18n';

export default async function FormsPage() {
  const { t } = await getI18n();
  const f = t.forms;
  return (
    <div className="page">
      <PageHead eyebrow={t.nav.components} title={`${t.gallery.groups.forms}.`}>
        {f.contents}
      </PageHead>

      <Section title={f.input}>
        <Specimen label={f.inputLabel} note={f.inputNote} block>
          <div className="grid-2">
            <Input
              label={f.email}
              placeholder="you@garden.dev"
              hint={f.emailHint}
            />
            <Input label={f.handle} defaultValue="oz" error={f.taken} />
            <Input
              label={f.search}
              placeholder={f.searchPlaceholder}
              icon={<IconSearch size={16} />}
            />
            <Input label={f.disabled} placeholder={f.notEditable} disabled />
          </div>
        </Specimen>
        <Specimen label={f.sizes} block>
          <div className="grid-2">
            <Input size="sm" placeholder={f.small} />
            <Input size="md" placeholder={f.medium} />
            <Input size="lg" placeholder={f.large} />
          </div>
        </Specimen>
      </Section>

      <Section title={f.select}>
        <Specimen label={f.selectLabel} note={f.selectNote} block>
          <div className="grid-2">
            <Select
              label={f.theme}
              options={[
                { value: 'system', label: f.themes.system },
                { value: 'light', label: f.themes.light },
                { value: 'dark', label: f.themes.dark },
              ]}
              defaultValue="system"
            />
            <Select
              label={f.framework}
              size="sm"
              options={[
                { value: 'next', label: 'next.js' },
                { value: 'astro', label: 'astro' },
                { value: 'remix', label: f.soon, disabled: true },
              ]}
            />
          </div>
        </Specimen>
      </Section>

      <Section title={f.checkbox}>
        <Specimen label={f.checkboxLabel} note={f.checkboxNote} block>
          <div className="col">
            <Checkbox label={f.allProjects} indeterminate />
            <Checkbox label={f.notify} defaultChecked />
            <Checkbox label={f.nightly} description={f.nightlyNote} />
            <Checkbox label={f.disabled} disabled />
          </div>
        </Specimen>
      </Section>

      <Section title={f.radio}>
        <Specimen label={f.radioLabel} note={f.radioNote} block>
          <div className="grid-2">
            <Radio
              name="license"
              options={['mit', 'apache-2.0', 'gpl-3.0']}
              defaultValue="mit"
            />
            <Radio
              name="appearance"
              row
              options={[
                { value: 'light', label: f.themes.light },
                { value: 'dark', label: f.themes.dark },
              ]}
              defaultValue="light"
            />
          </div>
        </Specimen>
      </Section>

      <Section title={f.switch}>
        <Specimen label={f.switchLabel} note={f.switchNote} block>
          <Card variant="sunken" padding="md">
            <div className="col">
              <Switch label={f.releaseNotes} defaultChecked />
              <Switch label={f.nightly} />
              <Switch label={f.smallSwitch} size="sm" defaultChecked />
              <Switch label={f.disabled} disabled />
            </div>
          </Card>
        </Specimen>
      </Section>
    </div>
  );
}
