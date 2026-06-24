import {
  Button,
  Combobox,
  ComboboxOption,
  InputGroup,
  InputPrefix,
  Label,
  type ComboboxValue,
} from 'neobrutalism-ui-react';
import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
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
  SelectTagIcon,
} from './examples/SelectIcons';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/combobox';

const importCode = `import { Combobox, ComboboxOption } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<div className="w-80">
  <Combobox placeholder="Select a framework" searchPlaceholder="Search frameworks…">
    <ComboboxOption value="react" label="React">React</ComboboxOption>
    <ComboboxOption value="vue" label="Vue">Vue</ComboboxOption>
    <ComboboxOption value="svelte" label="Svelte">Svelte</ComboboxOption>
    <ComboboxOption value="angular" label="Angular">Angular</ComboboxOption>
    <ComboboxOption value="solid" label="Solid">Solid</ComboboxOption>
  </Combobox>
</div>`;

const withIconsExampleCode = `<div className="w-80">
  <Combobox placeholder="Select a region" searchPlaceholder="Filter regions…">
    <ComboboxOption value="worldwide" label="Worldwide">
      <SelectGlobeIcon />
      Worldwide
    </ComboboxOption>
    <ComboboxOption value="remote" label="Remote">
      <SelectBuildingIcon />
      Remote
    </ComboboxOption>
    <ComboboxOption value="full-time" label="Full-time">
      <SelectBriefcaseIcon />
      Full-time
    </ComboboxOption>
    <ComboboxOption value="part-time" label="Part-time">
      <SelectClockIcon />
      Part-time
    </ComboboxOption>
  </Combobox>
</div>`;

const withLabelExampleCode = `<div className="grid w-80 gap-2">
  <Label htmlFor="framework-label">Framework</Label>
  <Combobox
    placeholder="Pick a framework"
    searchPlaceholder="Type to filter…"
    aria-labelledby="framework-label"
  >
    <ComboboxOption value="react" label="React">React</ComboboxOption>
    <ComboboxOption value="vue" label="Vue">Vue</ComboboxOption>
    <ComboboxOption value="svelte" label="Svelte">Svelte</ComboboxOption>
  </Combobox>
</div>`;

const controlledExampleCode = `const [value, setValue] = useState<ComboboxValue | null>('react');

<div className="flex w-80 flex-col gap-3">
  <p className="text-sm font-medium">
    Selected: <code>{value ?? 'none'}</code>
  </p>
  <div className="flex flex-wrap gap-2">
    <Button size="sm" type="button" onClick={() => setValue('react')}>
      React
    </Button>
    <Button size="sm" type="button" onClick={() => setValue('vue')}>
      Vue
    </Button>
    <Button size="sm" type="button" onClick={() => setValue(null)}>
      Clear
    </Button>
  </div>
  <Combobox
    value={value}
    onValueChange={setValue}
    placeholder="Select a framework"
    searchPlaceholder="Search…"
  >
    <ComboboxOption value="react" label="React">React</ComboboxOption>
    <ComboboxOption value="vue" label="Vue">Vue</ComboboxOption>
    <ComboboxOption value="svelte" label="Svelte">Svelte</ComboboxOption>
  </Combobox>
</div>`;

const emptyStateExampleCode = `<Combobox
  className="w-80"
  placeholder="Select a framework"
  searchPlaceholder="Try typing zzz…"
  emptyMessage="No frameworks match your search."
>
  <ComboboxOption value="react" label="React">React</ComboboxOption>
  <ComboboxOption value="vue" label="Vue">Vue</ComboboxOption>
  <ComboboxOption value="svelte" label="Svelte">Svelte</ComboboxOption>
</Combobox>`;

const clearableExampleCode = `<Combobox
  className="w-80"
  clearable
  defaultValue="react"
  placeholder="Select a framework"
  searchPlaceholder="Search…"
>
  <ComboboxOption value="react" label="React">React</ComboboxOption>
  <ComboboxOption value="vue" label="Vue">Vue</ComboboxOption>
  <ComboboxOption value="svelte" label="Svelte">Svelte</ComboboxOption>
</Combobox>`;

const withPrefixExampleCode = `<div className="w-90">
  <Label id="topic-label" className="mb-2 block">Topic</Label>
  <InputGroup>
    <InputPrefix>
      <SelectTagIcon className="size-5" />
    </InputPrefix>
    <Combobox
      placeholder="What is this regarding?"
      searchPlaceholder="Filter topics…"
      aria-labelledby="topic-label"
    >
      <ComboboxOption value="general" label="General Inquiry">General Inquiry</ComboboxOption>
      <ComboboxOption value="project" label="Project Proposal">Project Proposal</ComboboxOption>
      <ComboboxOption value="bug" label="Bug Report">Bug Report</ComboboxOption>
    </Combobox>
  </InputGroup>
</div>`;

const disabledExampleCode = `<div className="w-80">
  <Combobox placeholder="Select a framework" disabled>
    <ComboboxOption value="react" label="React">React</ComboboxOption>
  </Combobox>
</div>`;

const customBackgroundExampleCode = `<Combobox
  placeholder="Favorite accent"
  className="w-80"
  style={{ '--nb-combobox-bg': '#ffd24a' } as React.CSSProperties}
>
  <ComboboxOption value="mint" label="Mint">Mint</ComboboxOption>
  <ComboboxOption value="yellow" label="Yellow">Yellow</ComboboxOption>
  <ComboboxOption value="pink" label="Pink">Pink</ComboboxOption>
</Combobox>`;

const comboboxApiRows = [
  {
    name: 'placeholder',
    type: 'string',
    default: "'Select an option'",
    description: 'Text shown when closed and no value is selected.',
  },
  {
    name: 'searchPlaceholder',
    type: 'string',
    default: "'Search…'",
    description: 'Placeholder shown in the input while the listbox is open.',
  },
  {
    name: 'emptyMessage',
    type: 'string',
    default: "'No results found.'",
    description: 'Message when filtering yields no matching options.',
  },
  {
    name: 'value',
    type: 'ComboboxValue | null',
    default: 'null',
    description: 'Selected value for controlled usage.',
  },
  {
    name: 'defaultValue',
    type: 'ComboboxValue | null',
    default: 'null',
    description: 'Initial value for uncontrolled usage.',
  },
  {
    name: 'onValueChange',
    type: '(value: ComboboxValue | null) => void',
    default: 'undefined',
    description: 'Called when the selected value changes.',
  },
  {
    name: 'clearable',
    type: 'boolean',
    default: 'false',
    description: 'Shows a clear button when a value is selected.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the input and all options.',
  },
  {
    name: 'tone',
    type: 'NbToneToken',
    default: "'surface'",
    description: 'Tone token for background, text, and border colors.',
  },
  {
    name: 'border',
    type: 'NbBorderStrength',
    default: "'default'",
    description: 'Border width token.',
  },
  {
    name: 'aria-label',
    type: 'string | undefined',
    default: 'undefined',
    description: 'Accessible label for the combobox input.',
  },
  {
    name: 'aria-labelledby',
    type: 'string | undefined',
    default: 'undefined',
    description: 'ID reference for an external label.',
  },
];

const comboboxOptionApiRows = [
  {
    name: 'value',
    type: 'ComboboxValue | null',
    default: 'null',
    description: 'Option value. Omit for non-selectable placeholder rows.',
  },
  {
    name: 'label',
    type: 'string',
    default: "''",
    description: 'Text used for filtering and the closed-state display.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevents selection and keyboard focus.',
  },
];

const yellowComboboxStyle = { '--nb-combobox-bg': '#ffd24a' } as CSSProperties;

export function ComboboxPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Combobox</p>
          <h1>Combobox</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A searchable select built on the same brutalist field styling as Select. Type to filter
            options, navigate with arrow keys, and compose with InputGroup for prefix icons.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">⌨</span>
            <span className="nb-stat-tile__label">Keyboard</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">A11y</span>
            <span className="nb-stat-tile__label">WAI-ARIA</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">🔍</span>
            <span className="nb-stat-tile__label">Filter</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode} layout="dropdown">
          <div className="w-80">
            <Combobox placeholder="Select a framework" searchPlaceholder="Search frameworks…">
              <ComboboxOption value="react" label="React">
                React
              </ComboboxOption>
              <ComboboxOption value="vue" label="Vue">
                Vue
              </ComboboxOption>
              <ComboboxOption value="svelte" label="Svelte">
                Svelte
              </ComboboxOption>
              <ComboboxOption value="angular" label="Angular">
                Angular
              </ComboboxOption>
              <ComboboxOption value="solid" label="Solid">
                Solid
              </ComboboxOption>
            </Combobox>
          </div>
        </DocsExample>
      </section>

      <section id="when-to-use">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          When to Use
        </h2>
        <div className="max-w-3xl space-y-4 font-medium">
          <p>
            Reach for <strong>Combobox</strong> when the option list is long enough that typing to
            filter saves time — frameworks, countries, assignees, or any field with dozens of
            choices. Filtering matches the <code className="font-mono">label</code> prop on each{' '}
            <code className="font-mono">ComboboxOption</code>.
          </p>
          <p>
            Use{' '}
            <Link to="/components/select" className="font-bold underline underline-offset-2">
              Select
            </Link>{' '}
            instead when the list is short and search adds little value, or when you need a styled{' '}
            <code className="font-mono">NativeSelect</code> for simple HTML forms. Combobox does not
            support multi-select, async remote search, or option groups — keep those cases on a
            dedicated autocomplete or data table pattern.
          </p>
        </div>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock className="mb-5 block" title="Template" code={defaultExampleCode} />
        <DocsCodeBlock title="With icons" code={withIconsExampleCode} />
      </section>

      <section id="with-label">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          With Label
        </h2>
        <DocsExample code={withLabelExampleCode} layout="dropdown">
          <div className="grid w-80 gap-2">
            <Label id="framework-label">Framework</Label>
            <Combobox
              placeholder="Pick a framework"
              searchPlaceholder="Type to filter…"
              aria-labelledby="framework-label"
            >
              <ComboboxOption value="react" label="React">
                React
              </ComboboxOption>
              <ComboboxOption value="vue" label="Vue">
                Vue
              </ComboboxOption>
              <ComboboxOption value="svelte" label="Svelte">
                Svelte
              </ComboboxOption>
            </Combobox>
          </div>
        </DocsExample>
      </section>

      <section id="controlled">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Controlled
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Pass <code className="font-mono">value</code> and{' '}
          <code className="font-mono">onValueChange</code> to drive the selection from parent state
          — useful for forms, wizards, or syncing with other UI.
        </p>
        <DocsExample code={controlledExampleCode} layout="dropdown">
          <ControlledComboboxExample />
        </DocsExample>
      </section>

      <section id="clearable">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Clearable
        </h2>
        <p className="mb-4 font-medium">
          Set <code className="font-mono">clearable</code> to show a reset button when a value is
          selected.
        </p>
        <DocsExample code={clearableExampleCode} layout="dropdown">
          <Combobox
            className="w-80"
            clearable
            defaultValue="react"
            placeholder="Select a framework"
            searchPlaceholder="Search…"
          >
            <ComboboxOption value="react" label="React">
              React
            </ComboboxOption>
            <ComboboxOption value="vue" label="Vue">
              Vue
            </ComboboxOption>
            <ComboboxOption value="svelte" label="Svelte">
              Svelte
            </ComboboxOption>
          </Combobox>
        </DocsExample>
      </section>

      <section id="empty-state">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Empty State
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          When filtering yields no matches, the listbox shows{' '}
          <code className="font-mono">emptyMessage</code>. Open the field below and type a query
          that matches nothing (for example <code className="font-mono">zzz</code>) to preview it.
        </p>
        <DocsExample code={emptyStateExampleCode} layout="dropdown">
          <Combobox
            className="w-80"
            placeholder="Select a framework"
            searchPlaceholder="Try typing zzz…"
            emptyMessage="No frameworks match your search."
          >
            <ComboboxOption value="react" label="React">
              React
            </ComboboxOption>
            <ComboboxOption value="vue" label="Vue">
              Vue
            </ComboboxOption>
            <ComboboxOption value="svelte" label="Svelte">
              Svelte
            </ComboboxOption>
          </Combobox>
        </DocsExample>
      </section>

      <section id="input-group">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Input Group
        </h2>
        <DocsExample code={withPrefixExampleCode} layout="dropdown">
          <div className="w-90">
            <Label id="topic-label" className="mb-2 block">
              Topic
            </Label>
            <InputGroup>
              <InputPrefix>
                <SelectTagIcon className="size-5" />
              </InputPrefix>
              <Combobox
                placeholder="What is this regarding?"
                searchPlaceholder="Filter topics…"
                aria-labelledby="topic-label"
              >
                <ComboboxOption value="general" label="General Inquiry">
                  General Inquiry
                </ComboboxOption>
                <ComboboxOption value="project" label="Project Proposal">
                  Project Proposal
                </ComboboxOption>
                <ComboboxOption value="bug" label="Bug Report">
                  Bug Report
                </ComboboxOption>
              </Combobox>
            </InputGroup>
          </div>
        </DocsExample>
      </section>

      <section id="with-icons">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          With Icons
        </h2>
        <DocsExample code={withIconsExampleCode} layout="dropdown">
          <div className="w-80">
            <Combobox placeholder="Select a region" searchPlaceholder="Filter regions…">
              <ComboboxOption value="worldwide" label="Worldwide">
                <SelectGlobeIcon />
                Worldwide
              </ComboboxOption>
              <ComboboxOption value="remote" label="Remote">
                <SelectBuildingIcon />
                Remote
              </ComboboxOption>
              <ComboboxOption value="full-time" label="Full-time">
                <SelectBriefcaseIcon />
                Full-time
              </ComboboxOption>
              <ComboboxOption value="part-time" label="Part-time">
                <SelectClockIcon />
                Part-time
              </ComboboxOption>
            </Combobox>
          </div>
        </DocsExample>
      </section>

      <section id="disabled">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Disabled
        </h2>
        <DocsExample code={disabledExampleCode} layout="dropdown">
          <div className="w-80">
            <Combobox placeholder="Select a framework" disabled>
              <ComboboxOption value="react" label="React">
                React
              </ComboboxOption>
            </Combobox>
          </div>
        </DocsExample>
      </section>

      <section id="custom-background">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Custom Background
        </h2>
        <p className="mb-4 font-medium">
          Override <code className="font-mono">--nb-combobox-bg</code> inline to give the field a
          custom fill without touching the global theme.
        </p>
        <DocsExample code={customBackgroundExampleCode} layout="dropdown">
          <Combobox
            placeholder="Favorite accent"
            className="w-80"
            style={yellowComboboxStyle}
          >
            <ComboboxOption value="mint" label="Mint">
              Mint
            </ComboboxOption>
            <ComboboxOption value="yellow" label="Yellow">
              Yellow
            </ComboboxOption>
            <ComboboxOption value="pink" label="Pink">
              Pink
            </ComboboxOption>
          </Combobox>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="combobox" />

      <section id="accessibility">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Accessibility
        </h2>
        <ul className="list-disc space-y-2 pl-6 font-medium">
          <li>
            The input uses <code className="font-mono">role="combobox"</code> with{' '}
            <code className="font-mono">aria-expanded</code>,{' '}
            <code className="font-mono">aria-controls</code>, and{' '}
            <code className="font-mono">aria-activedescendant</code> for keyboard highlight.
          </li>
          <li>
            Arrow keys move highlight; Enter selects; Escape closes the listbox and keeps focus on
            the input.
          </li>
          <li>
            Pair with <code className="font-mono">Label</code> via{' '}
            <code className="font-mono">aria-labelledby</code> or pass{' '}
            <code className="font-mono">aria-label</code> when no visible label exists.
          </li>
          <li>
            Filtering matches the <code className="font-mono">label</code> prop on each{' '}
            <code className="font-mono">ComboboxOption</code> — set it even when using custom
            children with icons.
          </li>
        </ul>
      </section>

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>

        <h3 className="mt-6 mb-3 text-xl font-bold">
          <code className="font-mono text-base">Combobox</code>
        </h3>
        <DocsApiTable rows={comboboxApiRows} variant="props-desc" minWidth="min-w-160" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">ComboboxOption</code>
        </h3>
        <DocsApiTable rows={comboboxOptionApiRows} variant="props-desc" minWidth="min-w-120" />
      </section>
    </article>
  );
}

function ControlledComboboxExample() {
  const [value, setValue] = useState<ComboboxValue | null>('react');

  return (
    <div className="flex w-80 flex-col gap-3">
      <p className="text-sm font-medium">
        Selected: <code className="font-mono text-sm">{value ?? 'none'}</code>
      </p>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" type="button" onClick={() => setValue('react')}>
          React
        </Button>
        <Button size="sm" type="button" onClick={() => setValue('vue')}>
          Vue
        </Button>
        <Button size="sm" type="button" onClick={() => setValue(null)}>
          Clear
        </Button>
      </div>
      <Combobox
        value={value}
        onValueChange={setValue}
        placeholder="Select a framework"
        searchPlaceholder="Search…"
      >
        <ComboboxOption value="react" label="React">
          React
        </ComboboxOption>
        <ComboboxOption value="vue" label="Vue">
          Vue
        </ComboboxOption>
        <ComboboxOption value="svelte" label="Svelte">
          Svelte
        </ComboboxOption>
      </Combobox>
    </div>
  );
}
