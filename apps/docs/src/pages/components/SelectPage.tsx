import {
  InputGroup,
  InputPrefix,
  Label,
  Select,
  SelectOption,
} from 'neobrutalism-ui-react';
import type { CSSProperties } from 'react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import {
  SelectBriefcaseIcon,
  SelectBuildingIcon,
  SelectClockIcon,
  SelectGlobeIcon,
  SelectLocationIcon,
  SelectTagIcon,
} from './examples/SelectIcons';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/select';

const importCode = `import { NativeSelect, Select, SelectOption } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<div className="w-80">
  <Select placeholder="Select an option">
    <SelectOption value="worldwide" label="Worldwide">
      <SelectGlobeIcon />
      Worldwide
    </SelectOption>
    <SelectOption value="full-time" label="Full-time">
      <SelectBriefcaseIcon />
      Full-time
    </SelectOption>
    <SelectOption value="part-time" label="Part-time">
      <SelectClockIcon />
      Part-time
    </SelectOption>
    <SelectOption value="remote" label="Remote">
      <SelectBuildingIcon />
      Remote
    </SelectOption>
  </Select>
</div>`;

const withLabelExampleCode = `<div className="grid w-80 gap-2">
  <Label htmlFor="plan-label">Plan</Label>
  <Select id="plan-select" placeholder="Select a plan" aria-labelledby="plan-label">
    <SelectOption value="starter" label="Starter">Starter</SelectOption>
    <SelectOption value="team" label="Team">Team</SelectOption>
    <SelectOption value="enterprise" label="Enterprise">Enterprise</SelectOption>
  </Select>
</div>`;

const withPrefixExampleCode = `<div className="w-90">
  <Label htmlFor="subject-label" className="mb-2 block">Subject</Label>
  <InputGroup>
    <InputPrefix>
      <SelectTagIcon className="size-5" />
    </InputPrefix>
    <Select placeholder="What is this regarding?" aria-labelledby="subject-label">
      <SelectOption value="general" label="General Inquiry">General Inquiry</SelectOption>
      <SelectOption value="project" label="Project Proposal">Project Proposal</SelectOption>
      <SelectOption value="bug" label="Bug Report">Bug Report</SelectOption>
      <SelectOption value="other" label="Other">Other</SelectOption>
    </Select>
  </InputGroup>
</div>`;

const customBackgroundExampleCode = `<Select
  placeholder="Favorite accent"
  className="w-80"
  style={{ '--nb-select-bg': '#ffd24a' } as React.CSSProperties}
>
  <SelectOption value="mint" label="Mint">Mint</SelectOption>
  <SelectOption value="yellow" label="Yellow">Yellow</SelectOption>
  <SelectOption value="pink" label="Pink">Pink</SelectOption>
</Select>`;

const disabledExampleCode = `<div className="w-80">
  <Select placeholder="Select an option" disabled>
    <SelectOption value="one" label="One">One</SelectOption>
  </Select>
</div>`;

const nativeExampleCode = `<NativeSelect className="w-80" aria-label="Favorite accent">
  <option value="" disabled>
    Favorite accent
  </option>
  <option value="mint">Mint</option>
  <option value="yellow">Yellow</option>
  <option value="pink">Pink</option>
</NativeSelect>`;

const selectApiRows = [
  {
    name: 'placeholder',
    type: 'string',
    default: "'Select an option'",
    description: 'Text shown when no option is selected.',
  },
  {
    name: 'value',
    type: 'SelectValue | null',
    default: 'null',
    description: 'Selected value for controlled usage.',
  },
  {
    name: 'defaultValue',
    type: 'SelectValue | null',
    default: 'null',
    description: 'Initial value for uncontrolled usage.',
  },
  {
    name: 'onValueChange',
    type: '(value: SelectValue | null) => void',
    default: 'undefined',
    description: 'Called when the selected value changes.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the trigger and all options.',
  },
  {
    name: 'aria-label',
    type: 'string | undefined',
    default: 'undefined',
    description: 'Accessible label for the trigger.',
  },
  {
    name: 'aria-labelledby',
    type: 'string | undefined',
    default: 'undefined',
    description: 'ID reference for an external label.',
  },
];

const yellowSelectStyle = { '--nb-select-bg': '#ffd24a' } as CSSProperties;

export function SelectPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Select</p>
          <h1>Select</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist React Select component. A brutalist custom dropdown with projected
            option content, active states, selected checks, and a native select component for simple
            forms.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">1</span>
            <span className="nb-stat-tile__label">Size</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">FORM</span>
            <span className="nb-stat-tile__label">Native</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">A11y</span>
            <span className="nb-stat-tile__label">Built-in</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <div className="w-80">
            <Select placeholder="Select an option">
              <SelectOption value="worldwide" label="Worldwide">
                <SelectGlobeIcon />
                Worldwide
              </SelectOption>
              <SelectOption value="full-time" label="Full-time">
                <SelectBriefcaseIcon />
                Full-time
              </SelectOption>
              <SelectOption value="part-time" label="Part-time">
                <SelectClockIcon />
                Part-time
              </SelectOption>
              <SelectOption value="remote" label="Remote">
                <SelectBuildingIcon />
                Remote
              </SelectOption>
            </Select>
          </div>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock className="mb-5 block" title="Template" code={defaultExampleCode} />
        <DocsCodeBlock title="Native select" code={nativeExampleCode} />
      </section>

      <section id="with-label">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          With Label
        </h2>
        <DocsExample code={withLabelExampleCode}>
          <div className="grid w-80 gap-2">
            <Label id="plan-label">Plan</Label>
            <Select placeholder="Select a plan" aria-labelledby="plan-label">
              <SelectOption value="starter" label="Starter">
                Starter
              </SelectOption>
              <SelectOption value="team" label="Team">
                Team
              </SelectOption>
              <SelectOption value="enterprise" label="Enterprise">
                Enterprise
              </SelectOption>
            </Select>
          </div>
        </DocsExample>
      </section>

      <section id="input-group">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Input Group
        </h2>
        <DocsExample code={withPrefixExampleCode}>
          <div className="w-90">
            <Label id="subject-label" className="mb-2 block">
              Subject
            </Label>
            <InputGroup>
              <InputPrefix>
                <SelectTagIcon className="size-5" />
              </InputPrefix>
              <Select placeholder="What is this regarding?" aria-labelledby="subject-label">
                <SelectOption value="general" label="General Inquiry">
                  General Inquiry
                </SelectOption>
                <SelectOption value="project" label="Project Proposal">
                  Project Proposal
                </SelectOption>
                <SelectOption value="bug" label="Bug Report">
                  Bug Report
                </SelectOption>
                <SelectOption value="other" label="Other">
                  Other
                </SelectOption>
              </Select>
            </InputGroup>
          </div>
        </DocsExample>
      </section>

      <section id="disabled">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Disabled
        </h2>
        <DocsExample code={disabledExampleCode}>
          <div className="w-80">
            <Select placeholder="Select an option" disabled>
              <SelectOption value="one" label="One">
                One
              </SelectOption>
            </Select>
          </div>
        </DocsExample>
      </section>

      <section id="custom-background">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Custom Background
        </h2>
        <p className="mb-4 font-medium">
          Override <code className="font-mono">--nb-select-bg</code> inline to give the trigger a
          custom fill without touching the global theme.
        </p>
        <DocsExample code={customBackgroundExampleCode}>
          <div className="flex flex-col gap-4">
            <Select
              placeholder="Favorite accent"
              className="w-80"
              style={yellowSelectStyle}
            >
              <SelectOption value="mint" label="Mint">
                Mint
              </SelectOption>
              <SelectOption value="yellow" label="Yellow">
                Yellow
              </SelectOption>
              <SelectOption value="pink" label="Pink">
                Pink
              </SelectOption>
            </Select>

            <div className="w-80">
              <Select placeholder="Select location" defaultValue="worldwide">
                <SelectOption label="Select location">
                  <SelectLocationIcon />
                  Select location
                </SelectOption>
                <SelectOption value="worldwide" label="Worldwide">
                  <SelectGlobeIcon />
                  Worldwide
                </SelectOption>
                <SelectOption value="north-america" label="North America">
                  <SelectGlobeIcon />
                  North America
                </SelectOption>
                <SelectOption value="europe" label="Europe">
                  <SelectGlobeIcon />
                  Europe
                </SelectOption>
              </Select>
            </div>
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="select" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>

        <h3 className="mt-6 mb-3 text-xl font-bold">
          <code className="font-mono text-base">Select</code>
        </h3>
        <DocsApiTable rows={selectApiRows} variant="props-desc" minWidth="min-w-160" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">NativeSelect</code>
        </h3>
        <p className="text-sm font-medium">
          Native <code className="font-mono text-sm">&lt;select&gt;</code> element with brutalist
          styling. Detects when nested inside <code className="font-mono text-sm">InputGroup</code>{' '}
          and adjusts its border and shadow accordingly.
        </p>
      </section>
    </article>
  );
}
