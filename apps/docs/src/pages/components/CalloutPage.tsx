import { Callout, Separator } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/callout';

const importCode = `import { Callout, Separator } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<Callout tone="yellow" size="xl">
  $799
</Callout>`;

const examplesCode = `<Callout tone="yellow" size="xl">$799</Callout>

<Callout tone="mint" size="md">
  <span>4.9</span>
  <Separator orientation="vertical" />
  <span className="text-sm">842 REVIEWS</span>
</Callout>

<Callout tone="lavender" size="lg" layout="between">
  <span>TODAY</span>
  <span>3:30 PM</span>
</Callout>`;

const tonesExampleCode = `<Callout tone="yellow">Yellow</Callout>
<Callout tone="pink">Pink</Callout>
<Callout tone="mint">Mint</Callout>
<Callout tone="black">Black</Callout>`;

const sizesExampleCode = `<Callout size="sm">SM</Callout>
<Callout size="md">MD</Callout>
<Callout size="lg">LG</Callout>
<Callout size="xl">XL</Callout>`;

const layoutsExampleCode = `<Callout layout="inline">
  <span>Inline</span>
  <span>EP 42</span>
</Callout>

<Callout layout="between">
  <span>Between</span>
  <span>EP 42</span>
</Callout>

<Callout layout="center">
  <span>Center</span>
  <span>EP 42</span>
</Callout>`;

const shadowsExampleCode = `<Callout shadow="none">None</Callout>
<Callout shadow="default">Default</Callout>
<Callout shadow="hard">Hard</Callout>`;

const tones = [
  { value: 'yellow' as const, label: 'yellow', sample: '$799' },
  { value: 'pink' as const, label: 'pink', sample: '$420K' },
  { value: 'mint' as const, label: 'mint', sample: '4.9' },
  { value: 'lavender' as const, label: 'lavender', sample: 'EP 42' },
  { value: 'blue' as const, label: 'blue', sample: '3:30' },
  { value: 'cream' as const, label: 'cream', sample: '$129' },
  { value: 'white' as const, label: 'white', sample: '$8.2K' },
  { value: 'black' as const, label: 'black', sample: '$5K' },
  { value: 'primary' as const, label: 'primary', sample: 'NEW' },
  { value: 'secondary' as const, label: 'secondary', sample: 'SAVE' },
  { value: 'accent' as const, label: 'accent', sample: 'HOT' },
  { value: 'success' as const, label: 'success', sample: 'DONE' },
  { value: 'warning' as const, label: 'warning', sample: 'TODAY' },
  { value: 'danger' as const, label: 'danger', sample: 'LIVE' },
];

const sizes = [
  { value: 'sm' as const, sample: 'SM $129' },
  { value: 'md' as const, sample: 'MD 4.9' },
  { value: 'lg' as const, sample: 'LG $420K' },
  { value: 'xl' as const, sample: 'XL $799' },
];

const layouts = [
  { value: 'inline' as const, label: 'Inline' },
  { value: 'between' as const, label: 'Between' },
  { value: 'center' as const, label: 'Center' },
];

const shadows = [
  { value: 'none' as const, label: 'None' },
  { value: 'default' as const, label: 'Default' },
  { value: 'hard' as const, label: 'Hard' },
];

const calloutApiRows = [
  {
    name: 'tone',
    type: "'yellow' | 'pink' | 'mint' | 'lavender' | 'blue' | 'cream' | 'white' | 'black' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'",
    default: "'yellow'",
    description: 'Background and foreground color pair.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | 'xl'",
    default: "'lg'",
    description: 'Height, padding, type size, radius, and border weight preset.',
  },
  {
    name: 'layout',
    type: "'inline' | 'between' | 'center'",
    default: "'inline'",
    description: 'Horizontal alignment for the callout content.',
  },
  {
    name: 'shadow',
    type: "'none' | 'default' | 'hard'",
    default: "'hard'",
    description: 'Offset shadow preset.',
  },
  {
    name: 'radius',
    type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
    default: '—',
    description: (
      <>
        Corner radius override. Defaults to the <code className="font-mono">size</code>-derived
        radius when unset.
      </>
    ),
  },
];

export function CalloutPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Callout</p>
          <h1>Callout</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A high-emphasis component for important values. Use <code className="font-mono">Callout</code>{' '}
            for prices, stats, dates, awards, ratings, totals, and other compact pieces of
            information that need the loud brutalist treatment without domain-specific API.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">14</span>
            <span className="nb-stat-tile__label">Tones</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">4</span>
            <span className="nb-stat-tile__label">Sizes</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">3</span>
            <span className="nb-stat-tile__label">Layouts</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <Callout tone="yellow" size="xl">
            $799
          </Callout>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <p className="mb-4 font-medium">
          Render <code className="font-mono">Callout</code> around the element that owns the
          emphasized value. Compose icons, labels, dividers, and secondary text inside with normal
          JSX markup.
        </p>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={defaultExampleCode} />
      </section>

      <section id="examples">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Examples
        </h2>
        <DocsExample code={examplesCode}>
          <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            <Callout tone="yellow" size="xl">
              $799
            </Callout>

            <Callout tone="pink" size="lg">
              <span>$420K</span>
            </Callout>

            <Callout tone="mint" size="md">
              <span>4.9</span>
              <Separator orientation="vertical" />
              <span className="text-sm">842 REVIEWS</span>
            </Callout>

            <Callout tone="lavender" size="lg" layout="between">
              <span>TODAY</span>
              <span>3:30 PM</span>
            </Callout>
          </div>
        </DocsExample>
      </section>

      <section id="tones">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Tones
        </h2>
        <DocsExample code={tonesExampleCode}>
          <div className="grid w-full grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
            {tones.map((tone) => (
              <Callout key={tone.value} tone={tone.value} size="md" layout="between">
                <span>{tone.label}</span>
                <span>{tone.sample}</span>
              </Callout>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="sizes">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Sizes
        </h2>
        <DocsExample code={sizesExampleCode}>
          <div className="flex w-full flex-col items-start gap-4 p-4">
            {sizes.map((size) => (
              <Callout key={size.value} tone="yellow" size={size.value}>
                {size.sample}
              </Callout>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="layouts">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Layouts
        </h2>
        <DocsExample code={layoutsExampleCode}>
          <div className="grid w-full grid-cols-1 gap-4 p-4">
            {layouts.map((layout) => (
              <Callout key={layout.value} tone="cream" size="md" layout={layout.value}>
                <span>{layout.label}</span>
                <span>EP 42</span>
              </Callout>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="shadows">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Shadows
        </h2>
        <DocsExample code={shadowsExampleCode}>
          <div className="grid w-full grid-cols-1 gap-5 p-4 sm:grid-cols-3">
            {shadows.map((shadow) => (
              <Callout
                key={shadow.value}
                tone="blue"
                size="md"
                layout="center"
                shadow={shadow.value}
              >
                {shadow.label}
              </Callout>
            ))}
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="callout" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={calloutApiRows} variant="props-desc" minWidth="min-w-180" />
      </section>
    </article>
  );
}
