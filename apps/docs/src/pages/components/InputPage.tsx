import { Button, Input, Label } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/input';

const defaultExampleCode = `<Input placeholder="Email" className="w-75" />`;
const importCode = `import { Input } from 'neobrutalism-ui-react';`;

const sizesExampleCode = `<div className="flex flex-col items-center gap-4">
  <Input size="sm" placeholder="Small" className="w-75" />
  <Input placeholder="Default" className="w-75" />
  <Input size="lg" placeholder="Large" className="w-75" />
</div>`;

const disabledExampleCode = `<Input placeholder="Email" className="w-75" disabled />`;

const withLabelExampleCode = `<div className="flex flex-col gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="m@example.com" className="w-75" />
</div>`;

const withButtonExampleCode = `<div className="flex gap-2">
  <Input placeholder="Email" className="w-75" />
  <Button>Subscribe</Button>
</div>`;

const inputApiRows = [
  { name: 'size', type: "'md' | 'sm' | 'lg'", default: "'md'" },
  { name: 'tone', type: 'NbToneToken', default: "'surface'" },
  { name: 'border', type: 'NbBorderStrength', default: "'default'" },
];

const fileExampleCode = `<Input type="file" className="w-[250px]" />`;

export function InputPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Input</p>
          <h1>Input</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist React Input component. A form input field with hard borders, offset
            shadow, and strong focus states in the brutalist style.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">3</span>
            <span className="nb-stat-tile__label">Sizes</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">FORM</span>
            <span className="nb-stat-tile__label">Native</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">∞</span>
            <span className="nb-stat-tile__label">Types</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <Input placeholder="Email" className="w-75" />
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={defaultExampleCode} />
      </section>

      <section id="sizes">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Sizes
        </h2>
        <DocsExample code={sizesExampleCode}>
          <div className="flex flex-col items-center gap-4">
            <Input size="sm" placeholder="Small" className="w-75" />
            <Input placeholder="Default" className="w-75" />
            <Input size="lg" placeholder="Large" className="w-75" />
          </div>
        </DocsExample>
      </section>

      <section id="disabled">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Disabled
        </h2>
        <DocsExample code={disabledExampleCode}>
          <Input placeholder="Email" className="w-75" disabled />
        </DocsExample>
      </section>

      <section id="with-label">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          With Label
        </h2>
        <DocsExample code={withLabelExampleCode}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" className="w-75" />
          </div>
        </DocsExample>
      </section>

      <section id="with-button">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          With Button
        </h2>
        <DocsExample code={withButtonExampleCode}>
          <div className="flex gap-2">
            <Input placeholder="Email" className="w-75" />
            <Button tone="yellow">Subscribe</Button>
          </div>
        </DocsExample>
      </section>

      <section id="file">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          File
        </h2>
        <DocsExample code={fileExampleCode}>
          <Input type="file" className="w-[250px]" />
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="input" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={inputApiRows} />
      </section>
    </article>
  );
}
