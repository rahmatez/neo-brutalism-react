import { Display } from 'neobrutalism-ui-react';
import type { CSSProperties } from 'react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/display';

const importCode = `import { Display } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<Display className="uppercase">SENIOR REACT ENGINEER</Display>`;

const sizesExampleCode = `<Display size="sm" className="uppercase">PRO PLAN</Display>
<Display size="md" className="uppercase">INDIE CUP</Display>
<Display size="lg" className="uppercase">NORA CHEN</Display>
<Display size="xl" className="uppercase">GO</Display>`;

const colorExampleCode = `<Display
  size="lg"
  className="uppercase"
  style={{ '--nb-display-color': 'var(--nb-pink)' }}
>
  LOUD PINK
</Display>

<Display
  size="lg"
  className="uppercase"
  style={{ '--nb-display-color': 'var(--nb-mint)' }}
>
  MINT HERO
</Display>`;

const customSizeExampleCode = `<Display className="uppercase" style={{ '--nb-display-size': '2.25rem' }}>
  $29/mo
</Display>`;

const displayApiRows = [
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Controls font size via --nb-display-size.',
  },
  {
    name: 'weight',
    type: 'NbFontWeight',
    default: "'black'",
    description: 'Display weight mapped to the typography token scale.',
  },
  {
    name: 'fluid',
    type: 'boolean',
    default: 'false',
    description: 'Enables fluid clamp-based sizing for responsive hero type.',
  },
  {
    name: 'underline',
    type: "'none' | 'bar' | 'wave'",
    default: "'none'",
    description: 'Draws a built-in accent underline beneath the text.',
  },
];

export function DisplayPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Display</p>
          <h1>Display</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A component for mega-sized display text. Render it as any element — a heading, a{' '}
            <code className="font-mono">span</code>, a stat — to get ultra-bold, tight-leading
            display typography. It is purely presentational, so keep your semantics correct and let
            the component handle the look.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">any</span>
            <span className="nb-stat-tile__label">Host element</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">4</span>
            <span className="nb-stat-tile__label">Display scale</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">7</span>
            <span className="nb-stat-tile__label">CSS variables</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <Display className="uppercase">SENIOR REACT ENGINEER</Display>
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
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-1 font-mono text-xs font-bold uppercase text-(--nb-border)">
                size="sm" — 2rem
              </p>
              <Display size="sm" className="uppercase">
                PRO PLAN
              </Display>
            </div>
            <div>
              <p className="mb-1 font-mono text-xs font-bold uppercase text-(--nb-border)">
                size="md" — 3rem
              </p>
              <Display size="md" className="uppercase">
                INDIE CUP
              </Display>
            </div>
            <div>
              <p className="mb-1 font-mono text-xs font-bold uppercase text-(--nb-border)">
                size="lg" — 3.75rem
              </p>
              <Display size="lg" className="uppercase">
                NORA CHEN
              </Display>
            </div>
            <div>
              <p className="mb-1 font-mono text-xs font-bold uppercase text-(--nb-border)">
                size="xl" — 5rem
              </p>
              <Display size="xl" className="uppercase">
                GO
              </Display>
            </div>
          </div>
        </DocsExample>
      </section>

      <section id="color">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Color
        </h2>
        <p className="mb-4 font-medium">
          Override <code className="font-mono">--nb-display-color</code> inline or on a wrapper to
          tint display type with any theme token or custom value.
        </p>
        <DocsExample code={colorExampleCode}>
          <div className="flex flex-col gap-6">
            <Display
              size="lg"
              className="uppercase"
              style={{ '--nb-display-color': 'var(--nb-pink)' } as CSSProperties}
            >
              LOUD PINK
            </Display>
            <Display
              size="lg"
              className="uppercase"
              style={{ '--nb-display-color': 'var(--nb-mint)' } as CSSProperties}
            >
              MINT HERO
            </Display>
          </div>
        </DocsExample>
      </section>

      <section id="custom-size">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Custom Size
        </h2>
        <p className="mb-4 font-medium">
          Override <code className="font-mono">--nb-display-size</code> inline for any arbitrary
          value outside the 4 presets.
        </p>
        <DocsExample code={customSizeExampleCode}>
          <Display
            className="uppercase"
            style={{ '--nb-display-size': '2.25rem' } as CSSProperties}
          >
            $29/mo
          </Display>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="display" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={displayApiRows} variant="props-desc" />
      </section>
    </article>
  );
}
