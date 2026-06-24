import { Title } from 'neobrutalism-ui-react';
import type { CSSProperties } from 'react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/title';

const importCode = `import { Title } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<Title className="font-mono text-4xl font-black leading-tight uppercase">
  Brutal section title
</Title>`;

const customWaveExampleCode = `<Title
  className="font-mono text-3xl font-black leading-tight"
  style={{
    '--nb-title-wave-color': '#ff5d8f',
    '--nb-title-wave-width': '12rem',
    '--nb-title-wave-height': '0.75rem',
  } as CSSProperties}
>
  Sharp editorial heading
</Title>`;

const mixedContentExampleCode = `<div className="max-w-xl border-2 border-(--nb-border) bg-nb-surface p-6 shadow-[5px_5px_0_0_var(--nb-shadow)]">
  <p className="mb-3 inline-block border-2 border-(--nb-border) bg-nb-secondary px-3 py-1 font-mono text-xs font-black uppercase">
    Release notes
  </p>
  <Title className="font-mono text-4xl font-black leading-tight">
    Fast primitives, loud defaults
  </Title>
  <p className="mt-5 font-medium">
    Use it with your own typography classes, then tune the underline with CSS variables when a title needs more attitude.
  </p>
</div>`;

export function TitlePage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Title</p>
          <h1>Title</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist React Title component. Adds a brutalist wave underline to headings
            without changing the heading level or document structure.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">CSS</span>
            <span className="nb-stat-tile__label">Pseudo element</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">Any</span>
            <span className="nb-stat-tile__label">Heading level</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">4</span>
            <span className="nb-stat-tile__label">Wave tokens</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <Title className="font-mono text-4xl font-black leading-tight uppercase">
            Brutal section title
          </Title>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={defaultExampleCode} />
      </section>

      <section id="custom-wave">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Custom Wave
        </h2>
        <DocsExample code={customWaveExampleCode}>
          <Title
            className="font-mono text-3xl font-black leading-tight"
            style={
              {
                '--nb-title-wave-color': '#ff5d8f',
                '--nb-title-wave-width': '12rem',
                '--nb-title-wave-height': '0.75rem',
              } as CSSProperties
            }
          >
            Sharp editorial heading
          </Title>
        </DocsExample>
      </section>

      <section id="mixed-content">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Mixed Content
        </h2>
        <DocsExample code={mixedContentExampleCode}>
          <div className="max-w-xl border-2 border-(--nb-border) bg-nb-surface p-6 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <p className="mb-3 inline-block border-2 border-(--nb-border) bg-nb-secondary px-3 py-1 font-mono text-xs font-black uppercase">
              Release notes
            </p>
            <Title className="font-mono text-4xl font-black leading-tight">
              Fast primitives, loud defaults
            </Title>
            <p className="mt-5 font-medium">
              Use it with your own typography classes, then tune the underline with CSS variables
              when a title needs more attitude.
            </p>
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="title" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable
          variant="parts"
          rows={[
            {
              name: 'Title',
              description: (
                <>
                  Applies <code className="font-mono">data-nb-title</code> and draws a configurable
                  wave underline with a CSS pseudo element.
                </>
              ),
            },
          ]}
        />
      </section>
    </article>
  );
}
