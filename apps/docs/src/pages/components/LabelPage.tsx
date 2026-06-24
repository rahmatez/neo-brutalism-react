import { Checkbox, Input, Label } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/label';

const importCode = `import { Checkbox, Label } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<div className="flex items-center gap-2">
  <Checkbox id="accept-terms" />
  <Label htmlFor="accept-terms">Accept terms and conditions</Label>
</div>`;

const withInputExampleCode = `<div className="flex flex-col gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="m@example.com" className="w-75" />
</div>`;

const disabledControlExampleCode = `<div className="flex items-center gap-2">
  <Checkbox id="disabled-terms" className="peer" disabled />
  <Label htmlFor="disabled-terms">Accept terms and conditions</Label>
</div>`;

const labelApiRows = [
  {
    name: 'Label',
    description:
      'Accessible form label with bold typography and disabled peer styling when associated controls are disabled.',
  },
];

export function LabelPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Label</p>
          <h1>Label</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist React Label component. Renders an accessible form label with bold
            typography and brutalist styling, associated with form controls.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">FOR</span>
            <span className="nb-stat-tile__label">htmlFor sync</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">A11y</span>
            <span className="nb-stat-tile__label">ARIA-ready</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">∞</span>
            <span className="nb-stat-tile__label">Pairs with</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <div className="flex items-center gap-2">
            <Checkbox id="accept-terms" />
            <Label htmlFor="accept-terms">Accept terms and conditions</Label>
          </div>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={defaultExampleCode} />
      </section>

      <section id="with-input">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          With Input
        </h2>
        <DocsExample code={withInputExampleCode}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" className="w-75" />
          </div>
        </DocsExample>
      </section>

      <section id="disabled-control">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Disabled Control
        </h2>
        <DocsExample code={disabledControlExampleCode}>
          <div className="flex items-center gap-2">
            <Checkbox id="disabled-terms" className="peer" disabled />
            <Label htmlFor="disabled-terms">Accept terms and conditions</Label>
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="label" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={labelApiRows} variant="parts" />
      </section>
    </article>
  );
}
