import { Stat } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/stat';

const importCode = `import { Stat } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<Stat value="$29" label="per month" />
<Stat value="4.8★" label="rating" />
<Stat value="142" label="backed" />`;

const withIconCode = `<Stat
  value="4.9"
  label="rating"
  icon={<span aria-hidden="true">★</span>}
/>`;

const rowDirectionCode = `<Stat value="98%" label="satisfaction" direction="row" />
<Stat value="12K" label="downloads" direction="row" />`;

const statApiRows = [
  {
    name: 'value',
    type: 'string',
    default: 'required',
    description: 'The primary metric value displayed prominently.',
  },
  {
    name: 'label',
    type: 'string',
    default: 'required',
    description: 'Descriptive label rendered below (or beside) the value.',
  },
  {
    name: 'direction',
    type: "'column' | 'row'",
    default: "'column'",
    description: 'Stacks value + label vertically or horizontally.',
  },
  {
    name: 'icon',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Optional icon rendered before the value.',
  },
];

export function StatPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Stat</p>
          <h1>Stat</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A compact value + label display for surfacing metrics, prices, counts, and scores. Used
            throughout brutalist card designs to anchor key numbers with maximum visual weight.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">2</span>
            <span className="nb-stat-tile__label">Inputs</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">2</span>
            <span className="nb-stat-tile__label">Directions</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <div className="flex flex-wrap items-end gap-8 p-4">
            <Stat value="$29" label="per month" />
            <Stat value="4.8★" label="rating" />
            <Stat value="142" label="backed" />
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

      <section id="with-icon">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          With icon
        </h2>
        <p className="mb-4 font-medium">
          Pass any element to the <code className="font-mono">icon</code> prop to prepend it to the
          stat.
        </p>
        <DocsExample code={withIconCode}>
          <div className="flex items-center gap-8 p-4">
            <Stat
              value="4.9"
              label="rating"
              icon={
                <span className="text-xl" aria-hidden="true">
                  ★
                </span>
              }
            />
          </div>
        </DocsExample>
      </section>

      <section id="row-direction">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Row direction
        </h2>
        <DocsExample code={rowDirectionCode}>
          <div className="flex flex-col gap-3 p-4">
            <Stat value="98%" label="satisfaction" direction="row" />
            <Stat value="12K" label="downloads" direction="row" />
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="stat" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={statApiRows} variant="props-desc" />
      </section>
    </article>
  );
}
