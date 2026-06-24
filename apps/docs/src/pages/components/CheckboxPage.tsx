import { Checkbox, Label } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/checkbox';

const defaultExampleCode = `<Checkbox aria-label="Checkbox" />`;

const importCode = `import { Checkbox } from 'neobrutalism-ui-react';`;

const sizesExampleCode = `<div className="flex items-center gap-4">
  <Checkbox size="sm" aria-label="Small" />
  <Checkbox aria-label="Medium" />
  <Checkbox size="lg" aria-label="Large" />
</div>`;

const disabledExampleCode = `<div className="flex items-center gap-4">
  <Checkbox disabled aria-label="Disabled" />
  <Checkbox disabled defaultChecked aria-label="Disabled checked" />
</div>`;

const withLabelExampleCode = `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`;

const checkboxApiRows = [{ name: 'size', type: "'md' | 'sm' | 'lg'", default: "'md'" }];

export function CheckboxPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Checkbox</p>
          <h1>Checkbox</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist React Checkbox component. A control that allows the user to toggle
            between checked and not checked in the brutalist style with strong focus states.
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
            <span className="nb-stat-tile__value">A11y</span>
            <span className="nb-stat-tile__label">Label sync</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <Checkbox aria-label="Checkbox" />
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
          <div className="flex items-center gap-4">
            <Checkbox size="sm" aria-label="Small" />
            <Checkbox aria-label="Medium" />
            <Checkbox size="lg" aria-label="Large" />
          </div>
        </DocsExample>
      </section>

      <section id="disabled">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Disabled
        </h2>
        <DocsExample code={disabledExampleCode}>
          <div className="flex items-center gap-4">
            <Checkbox disabled aria-label="Disabled" />
            <Checkbox disabled defaultChecked aria-label="Disabled checked" />
          </div>
        </DocsExample>
      </section>

      <section id="with-label">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          With Label
        </h2>
        <DocsExample code={withLabelExampleCode}>
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="checkbox" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={checkboxApiRows} />
      </section>
    </article>
  );
}
