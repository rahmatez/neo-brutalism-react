import { Separator } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { LIBRARY_VERSION_LABEL } from '@/docs/site';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/separator';

const importCode = `import { Separator } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<Separator />`;

const variantsExampleCode = `<Separator />
<Separator variant="dashed" />
<Separator variant="thick" />`;

const verticalExampleCode = `<div className="flex h-16 items-center gap-4">
  <span>React</span>
  <Separator orientation="vertical" />
  <span>Brutalism</span>
  <Separator orientation="vertical" variant="dashed" />
  <span>${LIBRARY_VERSION_LABEL}</span>
</div>`;

const customColorExampleCode = `<Separator style={{ borderTopColor: '#ff90e8' }} />
<Separator variant="thick" style={{ borderTopColor: '#8ae9ff' }} />
<Separator variant="dashed" style={{ borderTopColor: '#c8a2ff' }} />`;

const separatorApiRows = [
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Direction of the divider line.',
  },
  {
    name: 'variant',
    type: "'solid' | 'dashed' | 'thick'",
    default: "'solid'",
    description: (
      <>
        Line style. <code className="font-mono">thick</code> renders a 4 px border.
      </>
    ),
  },
];

export function SeparatorPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Separator</p>
          <h1>Separator</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A horizontal rule for visual section dividers. Supports horizontal and vertical
            orientations with solid, dashed, and thick variants — a structural staple in every
            brutalist card layout.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">hr</span>
            <span className="nb-stat-tile__label">Native element</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">3</span>
            <span className="nb-stat-tile__label">Variants</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">2</span>
            <span className="nb-stat-tile__label">Orientations</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <div className="flex w-full flex-col gap-4 p-4">
            <p className="font-bold">Section A</p>
            <Separator />
            <p className="font-bold">Section B</p>
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

      <section id="variants">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Variants
        </h2>
        <DocsExample code={variantsExampleCode}>
          <div className="flex w-full flex-col gap-6 p-4">
            <div className="w-full">
              <p className="mb-3 font-mono text-xs font-bold text-(--nb-border) uppercase">
                variant="solid" (default)
              </p>
              <Separator />
            </div>
            <div className="w-full">
              <p className="mb-3 font-mono text-xs font-bold text-(--nb-border) uppercase">
                variant="dashed"
              </p>
              <Separator variant="dashed" />
            </div>
            <div className="w-full">
              <p className="mb-3 font-mono text-xs font-bold text-(--nb-border) uppercase">
                variant="thick"
              </p>
              <Separator variant="thick" />
            </div>
          </div>
        </DocsExample>
      </section>

      <section id="orientation">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Vertical
        </h2>
        <p className="mb-4 font-medium">
          Set <code className="font-mono">orientation="vertical"</code> to render a column divider.
          The separator stretches to fill the height of its flex container.
        </p>
        <DocsExample code={verticalExampleCode}>
          <div className="flex h-16 items-center gap-4 px-4">
            <span className="font-bold">React</span>
            <Separator orientation="vertical" />
            <span className="font-bold">Brutalism</span>
            <Separator orientation="vertical" variant="dashed" />
            <span className="font-bold">{LIBRARY_VERSION_LABEL}</span>
          </div>
        </DocsExample>
      </section>

      <section id="custom-color">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Custom Color
        </h2>
        <p className="mb-4 font-medium">
          Override the border color inline to use any color without touching the global theme.
        </p>
        <DocsExample code={customColorExampleCode}>
          <div className="flex w-full flex-col gap-4 p-4">
            <Separator style={{ borderTopColor: '#ff90e8' }} />
            <Separator variant="thick" style={{ borderTopColor: '#8ae9ff' }} />
            <Separator variant="dashed" style={{ borderTopColor: '#c8a2ff' }} />
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="separator" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={separatorApiRows} variant="props-desc" minWidth="min-w-160" />
      </section>
    </article>
  );
}
