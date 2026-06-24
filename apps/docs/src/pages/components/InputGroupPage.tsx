import {
  Input,
  InputGroup,
  InputPrefix,
  InputSuffix,
  Label,
  Textarea,
} from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/input-group';

const importCode = `import {
  Input,
  InputGroup,
  InputPrefix,
  InputSuffix,
} from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<InputGroup className="max-w-80">
  <InputPrefix>@</InputPrefix>
  <Input placeholder="username" />
</InputGroup>`;

const prefixSuffixExampleCode = `<InputGroup className="max-w-96">
  <InputPrefix>$</InputPrefix>
  <Input type="number" placeholder="Amount" />
  <InputSuffix>USD</InputSuffix>
</InputGroup>`;

const withLabelExampleCode = `<div className="grid w-full max-w-96 gap-2">
  <Label htmlFor="profile-url">Profile URL</Label>
  <InputGroup>
    <InputPrefix className="text-[0.8rem]">https</InputPrefix>
    <Input id="profile-url" placeholder="example.com" />
  </InputGroup>
</div>`;

const textareaExampleCode = `<InputGroup className="max-w-96">
  <InputPrefix align="stretch">TXT</InputPrefix>
  <Textarea placeholder="Write a note..." rows={4} />
</InputGroup>`;

const disabledExampleCode = `<InputGroup className="max-w-80">
  <InputPrefix>@</InputPrefix>
  <Input placeholder="username" disabled />
</InputGroup>`;

const inputGroupApiRows = [
  {
    name: 'InputGroup',
    type: '—',
    default: '—',
    description: 'Root wrapper that unifies prefix, control, and suffix into one brutalist field.',
  },
  {
    name: 'InputPrefix align',
    type: "'center' | 'stretch'",
    default: "'center'",
    description: 'Vertical alignment for prefix addon content.',
  },
  {
    name: 'InputSuffix align',
    type: "'center' | 'stretch'",
    default: "'center'",
    description: 'Vertical alignment for suffix addon content.',
  },
];

export function InputGroupPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Input Group</p>
          <h1>Input Group</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist React Input Group component. Combines inputs or textareas with bordered
            prefix and suffix addons, creating one continuous brutalist control.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">3</span>
            <span className="nb-stat-tile__label">Parts</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">FORM</span>
            <span className="nb-stat-tile__label">Native</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">2</span>
            <span className="nb-stat-tile__label">Slots</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <InputGroup className="max-w-80">
            <InputPrefix>@</InputPrefix>
            <Input placeholder="username" />
          </InputGroup>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={defaultExampleCode} />
      </section>

      <section id="prefix-suffix">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Prefix and Suffix
        </h2>
        <DocsExample code={prefixSuffixExampleCode}>
          <InputGroup className="max-w-96">
            <InputPrefix>$</InputPrefix>
            <Input type="number" placeholder="Amount" />
            <InputSuffix>USD</InputSuffix>
          </InputGroup>
        </DocsExample>
      </section>

      <section id="with-label">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          With Label
        </h2>
        <DocsExample code={withLabelExampleCode}>
          <div className="grid w-full max-w-96 gap-2">
            <Label htmlFor="profile-url">Profile URL</Label>
            <InputGroup>
              <InputPrefix className="text-[0.8rem]">https</InputPrefix>
              <Input id="profile-url" placeholder="example.com" />
            </InputGroup>
          </div>
        </DocsExample>
      </section>

      <section id="textarea">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Textarea
        </h2>
        <DocsExample code={textareaExampleCode}>
          <InputGroup className="max-w-96">
            <InputPrefix align="stretch">TXT</InputPrefix>
            <Textarea placeholder="Write a note..." rows={4} />
          </InputGroup>
        </DocsExample>
      </section>

      <section id="disabled">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Disabled
        </h2>
        <DocsExample code={disabledExampleCode}>
          <InputGroup className="max-w-80">
            <InputPrefix>@</InputPrefix>
            <Input placeholder="username" disabled />
          </InputGroup>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="input-group" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={inputGroupApiRows} variant="props-desc" />
      </section>
    </article>
  );
}
