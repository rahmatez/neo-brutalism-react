import { Halftone } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/halftone';

const importCode = `import { Halftone } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<div
  className="relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]"
  style={{ minHeight: 140 }}
>
  <Halftone className="absolute bottom-0 right-0" />
  <p className="text-lg font-bold">Card with halftone</p>
  <p className="mt-1 text-sm font-medium">
    Dot grid anchors to the bottom-right corner.
  </p>
</div>`;

const positionsExampleCode = `<Halftone className="absolute top-0 right-0" />
<Halftone className="absolute bottom-0 right-0" />
<Halftone className="absolute bottom-0 left-0" />
<Halftone className="absolute top-0 left-0" />`;

const customColorCode = `<Halftone color="#ff90e8" className="absolute top-0 right-0" />
<Halftone color="#8ae9ff" className="absolute bottom-0 left-0" />`;

const halftoneApiRows = [
  {
    name: 'shape',
    type: "'square' | 'circle' | 'rectangle'",
    default: "'square'",
    description: 'Visual shape. Rectangle renders a CSS background strip.',
  },
  {
    name: 'color',
    type: 'string',
    default: 'var(--nb-border)',
    description: 'Dot fill color (any CSS color value).',
  },
  {
    name: 'rows',
    type: 'number',
    default: '7 / 3 rectangle',
    description: 'Number of dot rows.',
  },
  {
    name: 'columns',
    type: 'number',
    default: '7 / 13 rectangle',
    description: 'Number of dot columns.',
  },
  {
    name: 'size',
    type: 'number',
    default: '6 / 8 rectangle',
    description: 'Dot diameter in px.',
  },
  {
    name: 'gap',
    type: 'number',
    default: '5 / rectangle rhythm',
    description:
      'Gap between dots in px. Rectangle strips use this as both axes unless gapX or gapY is set.',
  },
  {
    name: 'gapX',
    type: 'number',
    default: '28 rectangle',
    description: 'Horizontal rectangle dot rhythm in px.',
  },
  {
    name: 'gapY',
    type: 'number',
    default: '27 rectangle',
    description: 'Vertical rectangle dot rhythm in px.',
  },
];

const cardShell =
  'relative overflow-hidden border-2 border-(--nb-border) bg-nb-paper p-8 shadow-[5px_5px_0_0_var(--nb-shadow)]';

export function HalftonePage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Halftone</p>
          <h1>Halftone</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A decorative dot-grid component that anchors to card corners via absolute positioning or
            renders as a clean rectangular strip. The classic halftone pattern borrowed from print
            design adds depth and texture to brutalist cards without cluttering the layout.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">CSS</span>
            <span className="nb-stat-tile__label">Rectangle strip</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <div className={cardShell} style={{ minHeight: 140 }}>
            <Halftone className="absolute bottom-0 right-0" />
            <p className="text-lg font-bold">Card with halftone</p>
            <p className="mt-1 text-sm font-medium">
              Dot grid anchors to the bottom-right corner.
            </p>
          </div>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <p className="mb-4 font-medium">
          Place <code className="font-mono">&lt;Halftone&gt;</code> inside a{' '}
          <code className="font-mono">relative overflow-hidden</code> container. Position it with
          Tailwind classes (<code className="font-mono">absolute</code>,{' '}
          <code className="font-mono">top-*</code>, <code className="font-mono">right-*</code>,
          etc). The component is decorative (<code className="font-mono">aria-hidden="true"</code>
          ).
        </p>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={defaultExampleCode} />
      </section>

      <section id="positions">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Positions
        </h2>
        <p className="mb-4 font-medium">
          Anchor halftone accents to any corner with absolute positioning inside a clipped
          container.
        </p>
        <DocsExample code={positionsExampleCode}>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: 'top-right', className: 'absolute top-0 right-0' },
              { label: 'bottom-right', className: 'absolute bottom-0 right-0' },
              { label: 'bottom-left', className: 'absolute bottom-0 left-0' },
              { label: 'top-left', className: 'absolute top-0 left-0' },
            ].map((position) => (
              <div key={position.label} className={cardShell} style={{ minHeight: 120 }}>
                <Halftone className={position.className} />
                <p className="font-bold">{position.label}</p>
              </div>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="custom-color">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Custom Color
        </h2>
        <DocsExample code={customColorCode}>
          <div className={cardShell} style={{ minHeight: 140 }}>
            <Halftone color="#ff90e8" className="absolute top-0 right-0" />
            <Halftone color="#8ae9ff" className="absolute bottom-0 left-0" />
            <p className="font-bold">Custom dot colors</p>
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="halftone" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={halftoneApiRows} variant="props-desc" />
      </section>
    </article>
  );
}
