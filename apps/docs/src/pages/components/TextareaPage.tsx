import { Label, Textarea } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/textarea';

const importCode = `import { Textarea } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<Textarea placeholder="Write something..." className="w-75" />`;

const sizesExampleCode = `<div className="flex flex-col items-center gap-4">
  <Textarea size="sm" placeholder="Small" className="w-75" />
  <Textarea placeholder="Default" className="w-75" />
  <Textarea size="lg" placeholder="Large" className="w-75" />
</div>`;

const disabledExampleCode = `<Textarea placeholder="Disabled" className="w-75" disabled />`;

const withLabelExampleCode = `<div className="flex flex-col gap-2">
  <Label htmlFor="message">Message</Label>
  <Textarea id="message" placeholder="Enter your message..." className="w-75" />
</div>`;

export function TextareaPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Textarea</p>
          <h1>Textarea</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist React Textarea component. A multi-line text input with hard borders,
            offset shadow, and strong focus states matching the brutalist style.
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
          <Textarea placeholder="Write something..." className="w-75" />
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
            <Textarea size="sm" placeholder="Small" className="w-75" />
            <Textarea placeholder="Default" className="w-75" />
            <Textarea size="lg" placeholder="Large" className="w-75" />
          </div>
        </DocsExample>
      </section>

      <section id="disabled">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Disabled
        </h2>
        <DocsExample code={disabledExampleCode}>
          <Textarea placeholder="Disabled" className="w-75" disabled />
        </DocsExample>
      </section>

      <section id="with-label">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          With Label
        </h2>
        <DocsExample code={withLabelExampleCode}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Enter your message..." className="w-75" />
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="textarea" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={[{ name: 'size', type: "'md' | 'sm' | 'lg'", default: "'md'" }]} />
      </section>
    </article>
  );
}
