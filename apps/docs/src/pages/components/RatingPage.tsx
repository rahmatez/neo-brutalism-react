import { Rating } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/rating';

const importCode = `import { Rating } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<Rating value={4.8} count={312} />`;

const valuesCode = `<Rating value={5} />
<Rating value={4.7} />
<Rating value={3} />
<Rating value={1.2} />
<Rating value={0} />`;

const withCountCode = `<Rating value={4.5} count={1204} />
<Rating value={3.8} count={87} />`;

const customMaxCode = `<Rating value={7} max={10} />`;

const ratingApiRows = [
  {
    name: 'value',
    type: 'number',
    default: '0',
    description: 'Rating value. Decimal — rounds to nearest whole star.',
  },
  {
    name: 'max',
    type: 'number',
    default: '5',
    description: 'Total number of stars to render.',
  },
  {
    name: 'count',
    type: 'number | undefined',
    default: 'undefined',
    description: 'Optional review count shown in parentheses.',
  },
  {
    name: 'tone',
    type: 'NbToneToken',
    default: "'warning'",
    description: 'Fill color for active stars.',
  },
];

export function RatingPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Rating</p>
          <h1>Rating</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A read-only star rating display. Accepts a decimal value and rounds to the nearest whole
            star. Optionally shows a review count. Fully accessible via{' '}
            <code className="font-mono">role="img"</code> with an auto-generated{' '}
            <code className="font-mono">aria-label</code>.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">A11y</span>
            <span className="nb-stat-tile__label">role="img"</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">★</span>
            <span className="nb-stat-tile__label">Unicode stars</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <div className="flex flex-col gap-3 p-4">
            <Rating value={4.8} count={312} />
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

      <section id="values">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Values
        </h2>
        <DocsExample code={valuesCode}>
          <div className="flex flex-col gap-4 p-4">
            <Rating value={5} />
            <Rating value={4.7} />
            <Rating value={3} />
            <Rating value={1.2} />
            <Rating value={0} />
          </div>
        </DocsExample>
      </section>

      <section id="with-count">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          With review count
        </h2>
        <DocsExample code={withCountCode}>
          <div className="flex flex-col gap-3 p-4">
            <Rating value={4.5} count={1204} />
            <Rating value={3.8} count={87} />
          </div>
        </DocsExample>
      </section>

      <section id="custom-max">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Custom max
        </h2>
        <DocsExample code={customMaxCode}>
          <div className="p-4">
            <Rating value={7} max={10} />
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="rating" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={ratingApiRows} variant="props-desc" minWidth="min-w-160" />
      </section>
    </article>
  );
}
