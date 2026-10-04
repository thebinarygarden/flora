import {
  Input,
  Select,
  Checkbox,
  Radio,
  Switch,
} from '@binarygarden/flora/form';
import { Card } from '@binarygarden/flora/ui';
import { IconSearch } from '@binarygarden/flora/icons';
import { PageHead, Section, Specimen } from '@/app/_components/Specimen';

export default function FormsPage() {
  return (
    <div className="page">
      <PageHead eyebrow="components" title="forms.">
        input · select · checkbox · radio · switch
      </PageHead>

      <Section title="input">
        <Specimen
          label="label, hint, error"
          note="the label sits above in lowercase, the hint or error below. focus draws a 3px soft-accent halo."
          block
        >
          <div className="grid-2">
            <Input
              label="email"
              placeholder="you@garden.dev"
              hint="we never share it"
            />
            <Input label="handle" defaultValue="oz" error="already taken" />
            <Input
              label="search"
              placeholder="search components"
              icon={<IconSearch size={16} />}
            />
            <Input label="disabled" placeholder="not editable" disabled />
          </div>
        </Specimen>
        <Specimen label="sizes" block>
          <div className="grid-2">
            <Input size="sm" placeholder="small · 32" />
            <Input size="md" placeholder="medium · 40" />
            <Input size="lg" placeholder="large · 48" />
          </div>
        </Specimen>
      </Section>

      <Section title="select">
        <Specimen
          label="native select, flora chrome"
          note="use it for 4+ options; tabs or tags read better for fewer."
          block
        >
          <div className="grid-2">
            <Select
              label="theme"
              options={['system', 'light', 'dark']}
              defaultValue="system"
            />
            <Select
              label="framework"
              size="sm"
              options={[
                { value: 'next', label: 'next.js' },
                { value: 'astro', label: 'astro' },
                { value: 'remix', label: 'remix (soon)', disabled: true },
              ]}
            />
          </div>
        </Specimen>
      </Section>

      <Section title="checkbox">
        <Specimen
          label="checked, indeterminate, description"
          note="the check springs in. indeterminate is for a parent row whose children are partly selected."
          block
        >
          <div className="col">
            <Checkbox label="all projects" indeterminate />
            <Checkbox label="notify on release" defaultChecked />
            <Checkbox
              label="nightly builds"
              description="unstable, rebuilt every night at 03:00 utc"
            />
            <Checkbox label="disabled" disabled />
          </div>
        </Specimen>
      </Section>

      <Section title="radio">
        <Specimen
          label="column and row"
          note="2–5 mutually exclusive options. more than that wants a select."
          block
        >
          <div className="grid-2">
            <Radio
              name="license"
              options={['mit', 'apache-2.0', 'gpl-3.0']}
              defaultValue="mit"
            />
            <Radio
              name="appearance"
              row
              options={['light', 'dark']}
              defaultValue="light"
            />
          </div>
        </Specimen>
      </Section>

      <Section title="switch">
        <Specimen
          label="immediate settings"
          note="for settings that apply at once — no save button. the thumb springs and widens on press."
          block
        >
          <Card variant="sunken" padding="md">
            <div className="col">
              <Switch label="release notes" defaultChecked />
              <Switch label="nightly builds" />
              <Switch label="small" size="sm" defaultChecked />
              <Switch label="disabled" disabled />
            </div>
          </Card>
        </Specimen>
      </Section>
    </div>
  );
}
