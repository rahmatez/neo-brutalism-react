import {
  Button,
  Cluster,
  Display,
  MediaItem,
  MediaItemTitle,
  Surface,
} from 'neobrutalism-ui-react';
import type { ComponentPropsWithoutRef } from 'react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/cluster';

type ClusterGap = NonNullable<ComponentPropsWithoutRef<typeof Cluster>['gap']>;
type ClusterAlign = NonNullable<ComponentPropsWithoutRef<typeof Cluster>['align']>;
type ClusterJustify = NonNullable<ComponentPropsWithoutRef<typeof Cluster>['justify']>;
type ClusterWrap = NonNullable<ComponentPropsWithoutRef<typeof Cluster>['wrap']>;
type ClusterSeparator = NonNullable<ComponentPropsWithoutRef<typeof Cluster>['separator']>;

const importCode = `import { Cluster } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<Cluster gap="2xl" align="center" justify="center" className="w-full max-w-4xl p-2 text-center">
  <div className="flex shrink-0 flex-col items-center gap-4">
    <div className="grid size-24 place-items-center border-3 border-(--nb-border) bg-(--nb-yellow) font-display text-3xl font-black shadow-[7px_7px_0_0_var(--nb-shadow)] sm:size-28 sm:text-4xl">
      NB
    </div>
    <Button size="lg" className="w-36">
      Ship it
    </Button>
  </div>

  <div className="min-w-0 flex-1 basis-80">
    <Cluster gap="sm" justify="center" className="mb-4">
      <span className="border-2 border-(--nb-border) bg-(--nb-mint) px-3 py-1 font-mono text-xs font-black uppercase shadow-[3px_3px_0_0_var(--nb-shadow)]">
        Logo
      </span>
      <span className="border-2 border-(--nb-border) bg-(--nb-lavender) px-3 py-1 font-mono text-xs font-black uppercase shadow-[3px_3px_0_0_var(--nb-shadow)]">
        Actions
      </span>
      <span className="border-2 border-(--nb-border) bg-(--nb-pink) px-3 py-1 font-mono text-xs font-black uppercase text-white shadow-[3px_3px_0_0_var(--nb-shadow)]">
        Badges
      </span>
    </Cluster>

    <Display className="mb-3! [--nb-display-size:2.75rem] sm:[--nb-display-size:3.75rem]">
      Cluster loud.
    </Display>
    <p className="mx-auto max-w-2xl text-lg font-bold leading-tight sm:text-xl">
      Inline rhythm for logos, actions, badges, and feature rows.
    </p>
  </div>
</Cluster>`;

const gapsExampleCode = `<Cluster gap="none">...</Cluster>
<Cluster gap="xs">...</Cluster>
<Cluster gap="sm">...</Cluster>
<Cluster gap="md">...</Cluster>
<Cluster gap="lg">...</Cluster>
<Cluster gap="xl">...</Cluster>
<Cluster gap="2xl">...</Cluster>`;

const alignmentExampleCode = `<Cluster align="start">...</Cluster>
<Cluster align="center">...</Cluster>
<Cluster align="end">...</Cluster>
<Cluster align="baseline">...</Cluster>
<Cluster align="stretch">...</Cluster>`;

const justificationExampleCode = `<Cluster justify="start">...</Cluster>
<Cluster justify="center">...</Cluster>
<Cluster justify="end">...</Cluster>
<Cluster justify="between">...</Cluster>`;

const wrappingExampleCode = `<Cluster gap="md">
  ...
</Cluster>

<Cluster gap="md" wrap="nowrap">
  ...
</Cluster>`;

const separatorsExampleCode = `<Cluster gap="lg" align="center" separator="dashed">
  <MediaItem icon="/tokyo-city-escape/nb-star-fill.svg">
    <MediaItemTitle>
      Central
      <br />
      Locations
    </MediaItemTitle>
  </MediaItem>
  <MediaItem icon="/tokyo-city-escape/nb-plane-fill.svg">
    <MediaItemTitle>
      Guided
      <br />
      Experiences
    </MediaItemTitle>
  </MediaItem>
  <MediaItem icon="/tokyo-city-escape/nb-hotel-fill.svg">
    <MediaItemTitle>
      24/7
      <br />
      Support
    </MediaItemTitle>
  </MediaItem>
</Cluster>`;

const compositionExampleCode = `<Cluster gap="lg" align="center" separator="dashed">
  <MediaItem icon="/tokyo-city-escape/nb-star-fill.svg">
    <MediaItemTitle>
      Central
      <br />
      Locations
    </MediaItemTitle>
  </MediaItem>
  <MediaItem icon="/tokyo-city-escape/nb-hotel-fill.svg">
    <MediaItemTitle>
      24/7
      <br />
      Support
    </MediaItemTitle>
  </MediaItem>
</Cluster>`;

const responsiveExampleCode = `<Cluster
  gap="md"
  className="md:[--nb-cluster-gap:1.5rem]"
>
  ...
</Cluster>`;

const gaps: { value: ClusterGap; label: string }[] = [
  { value: 'none', label: 'none' },
  { value: 'xs', label: 'xs' },
  { value: 'sm', label: 'sm' },
  { value: 'md', label: 'md' },
  { value: 'lg', label: 'lg' },
  { value: 'xl', label: 'xl' },
  { value: '2xl', label: '2xl' },
];

const alignments: { value: ClusterAlign; label: string }[] = [
  { value: 'start', label: 'start' },
  { value: 'center', label: 'center' },
  { value: 'end', label: 'end' },
  { value: 'baseline', label: 'baseline' },
  { value: 'stretch', label: 'stretch' },
];

const justifications: { value: ClusterJustify; label: string }[] = [
  { value: 'start', label: 'start' },
  { value: 'center', label: 'center' },
  { value: 'end', label: 'end' },
  { value: 'between', label: 'between' },
];

const wraps: { value: ClusterWrap; label: string }[] = [
  { value: 'wrap', label: 'wrap' },
  { value: 'nowrap', label: 'nowrap' },
];

const separators: { value: ClusterSeparator; label: string }[] = [
  { value: 'none', label: 'none' },
  { value: 'solid', label: 'solid' },
  { value: 'dashed', label: 'dashed' },
  { value: 'thick', label: 'thick' },
];

const clusterApiRows = [
  {
    name: 'gap',
    type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
    default: "'md'",
    description: 'Horizontal and wrapped-row spacing between cluster children.',
  },
  {
    name: 'padding',
    type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'none'",
    description: "Uniform inner padding around the cluster's children.",
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end' | 'baseline' | 'stretch'",
    default: "'center'",
    description: 'Cross-axis alignment for the inline group.',
  },
  {
    name: 'justify',
    type: "'start' | 'center' | 'end' | 'between'",
    default: "'start'",
    description: 'Main-axis distribution when the cluster has extra width.',
  },
  {
    name: 'wrap',
    type: "'wrap' | 'nowrap'",
    default: "'wrap'",
    description: 'Controls whether children can wrap onto additional rows.',
  },
  {
    name: 'separator',
    type: "'none' | 'solid' | 'dashed' | 'thick'",
    default: "'none'",
    description:
      'Inline-start border between each child. When active, gap-x is collapsed and spacing is split across separator margin and padding.',
  },
];

export function ClusterPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Cluster</p>
          <h1>Cluster</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Use <code className="font-mono">Cluster</code> whenever children should flow
            horizontally, align together, and wrap cleanly on smaller screens. It is the inline
            composition pair to <code className="font-mono">Stack</code>.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">7</span>
            <span className="nb-stat-tile__label">Gaps</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">5</span>
            <span className="nb-stat-tile__label">Alignments</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">Wrap</span>
            <span className="nb-stat-tile__label">Default</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--lavender">
            <span className="nb-stat-tile__value">4</span>
            <span className="nb-stat-tile__label">Separators</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <Cluster gap="2xl" align="center" justify="center" className="w-full max-w-4xl p-2 text-center">
            <div className="flex shrink-0 flex-col items-center gap-4">
              <div className="grid size-24 place-items-center border-3 border-(--nb-border) bg-(--nb-yellow) font-display text-3xl font-black shadow-[7px_7px_0_0_var(--nb-shadow)] sm:size-28 sm:text-4xl">
                NB
              </div>
              <Button size="lg" className="w-36">
                Ship it
              </Button>
            </div>

            <div className="min-w-0 flex-1 basis-80">
              <Cluster gap="sm" justify="center" className="mb-4">
                <span className="border-2 border-(--nb-border) bg-(--nb-mint) px-3 py-1 font-mono text-xs font-black uppercase shadow-[3px_3px_0_0_var(--nb-shadow)]">
                  Logo
                </span>
                <span className="border-2 border-(--nb-border) bg-(--nb-lavender) px-3 py-1 font-mono text-xs font-black uppercase shadow-[3px_3px_0_0_var(--nb-shadow)]">
                  Actions
                </span>
                <span className="border-2 border-(--nb-border) bg-(--nb-pink) px-3 py-1 font-mono text-xs font-black uppercase text-white shadow-[3px_3px_0_0_var(--nb-shadow)]">
                  Badges
                </span>
              </Cluster>

              <Display className="mb-3! [--nb-display-size:2.75rem] sm:[--nb-display-size:3.75rem]">
                Cluster loud.
              </Display>
              <p className="mx-auto max-w-2xl text-lg font-bold leading-tight sm:text-xl">
                Inline rhythm for logos, actions, badges, and feature rows.
              </p>
            </div>
          </Cluster>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <p className="mb-4 font-medium">
          Add <code className="font-mono">Cluster</code> to the parent that owns the inline group.
          Use <code className="font-mono">gap</code> for spacing,{' '}
          <code className="font-mono">align</code> for cross-axis alignment,{' '}
          <code className="font-mono">justify</code> for distribution, and{' '}
          <code className="font-mono">wrap</code> when a row should stay on one line.
        </p>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={defaultExampleCode} />
      </section>

      <section id="gaps">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Gaps
        </h2>
        <DocsExample code={gapsExampleCode}>
          <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            {gaps.map((gap) => (
              <Surface key={gap.value} shadow="sm" className="p-4">
                <span className="mb-2 font-mono text-xs font-bold uppercase">{gap.label}</span>
                <Cluster gap={gap.value}>
                  <span className="size-10 border-2 border-(--nb-border) bg-(--nb-yellow)" />
                  <span className="size-10 border-2 border-(--nb-border) bg-(--nb-mint)" />
                  <span className="size-10 border-2 border-(--nb-border) bg-(--nb-pink)" />
                </Cluster>
              </Surface>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="alignment">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Alignment
        </h2>
        <DocsExample code={alignmentExampleCode}>
          <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            {alignments.map((align) => (
              <Surface key={align.value} tone="cream" shadow="sm" className="p-4">
                <span className="mb-2 font-mono text-xs font-bold uppercase">{align.label}</span>
                <Cluster gap="sm" align={align.value}>
                  <span className="border-2 border-(--nb-border) bg-(--nb-yellow) px-3 py-2 font-black">
                    Small
                  </span>
                  <span className="border-2 border-(--nb-border) bg-(--nb-mint) px-4 py-5 font-black">
                    Tall
                  </span>
                </Cluster>
              </Surface>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="justification">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Justification
        </h2>
        <DocsExample code={justificationExampleCode}>
          <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            {justifications.map((justify) => (
              <Surface key={justify.value} tone="white" shadow="sm" className="p-4">
                <span className="mb-2 font-mono text-xs font-bold uppercase">{justify.label}</span>
                <Cluster gap="sm" justify={justify.value} className="min-h-24">
                  <span className="border-2 border-(--nb-border) bg-(--nb-lavender) px-3 py-2 font-black">
                    One
                  </span>
                  <span className="border-2 border-(--nb-border) bg-(--nb-blue) px-3 py-2 font-black">
                    Two
                  </span>
                </Cluster>
              </Surface>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="wrapping">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Wrapping
        </h2>
        <p className="mb-4 font-medium">
          Cluster wraps by default so chunky buttons, chips, badges, and media items can survive
          narrow layouts. Switch to <code className="font-mono">wrap="nowrap"</code> for compact
          controls that must stay in a single row.
        </p>
        <DocsExample code={wrappingExampleCode}>
          <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
            {wraps.map((wrap) => (
              <Surface key={wrap.value} tone="yellow" shadow="sm" className="max-w-88 p-4">
                <span className="mb-2 font-mono text-xs font-bold uppercase">{wrap.label}</span>
                <Cluster gap="md" wrap={wrap.value}>
                  <Button size="sm">Flight</Button>
                  <Button size="sm" tone="secondary">
                    Hotel
                  </Button>
                  <Button size="sm">Top pick</Button>
                </Cluster>
              </Surface>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="separators">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Separators
        </h2>
        <p className="mb-4 font-medium">
          Use <code className="font-mono">separator</code> to render inline separators between
          cluster children. When a separator is active, gap is collapsed to{' '}
          <code className="font-mono">gap-x-0</code> and children split{' '}
          <code className="font-mono">--nb-cluster-gap</code> across separator margin and padding.
        </p>
        <Surface tone="yellow" shadow="sm" className="mb-5 p-4 font-medium">
          <strong>Separator note:</strong> cluster separators are best for compact, single-row groups
          like actions, badges, or metadata. When content wraps across rows, CSS cannot reliably
          detect the first item of each visual row, so a separator may appear at the start of a
          wrapped line. For heavily wrapping content, prefer{' '}
          <code className="font-mono">separator="none"</code> or switch to{' '}
          <code className="font-mono">Stack</code>.
        </Surface>
        <DocsExample code={separatorsExampleCode}>
          <div className="grid w-full grid-cols-1 gap-4 p-4">
            {separators
              .filter((d) => d.value !== 'none')
              .map((d) => (
                <Surface key={d.value} tone="cream" shadow="sm" className="p-4">
                  <p className="mb-3 font-mono text-xs font-bold uppercase opacity-50">
                    separator="{d.label}"
                  </p>
                  <Cluster
                    gap="xl"
                    align="center"
                    separator={d.value}
                    className="[--nb-media-item-title-size:12px]"
                  >
                    <MediaItem icon="/tokyo-city-escape/nb-star-fill.svg">
                      <MediaItemTitle>
                        Central
                        <br />
                        Locations
                      </MediaItemTitle>
                    </MediaItem>
                    <MediaItem icon="/tokyo-city-escape/nb-plane-fill.svg">
                      <MediaItemTitle>
                        Guided
                        <br />
                        Experiences
                      </MediaItemTitle>
                    </MediaItem>
                    <MediaItem icon="/tokyo-city-escape/nb-hotel-fill.svg">
                      <MediaItemTitle>
                        24/7
                        <br />
                        Support
                      </MediaItemTitle>
                    </MediaItem>
                  </Cluster>
                </Surface>
              ))}
          </div>
        </DocsExample>
      </section>

      <section id="composition">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Composition
        </h2>
        <DocsExample code={compositionExampleCode}>
          <Cluster
            gap="xl"
            align="center"
            separator="dashed"
            className="p-4 [--nb-media-item-title-size:12px]"
          >
            <MediaItem icon="/tokyo-city-escape/nb-star-fill.svg">
              <MediaItemTitle>
                Central
                <br />
                Locations
              </MediaItemTitle>
            </MediaItem>
            <MediaItem icon="/tokyo-city-escape/nb-plane-fill.svg">
              <MediaItemTitle>
                Guided
                <br />
                Experiences
              </MediaItemTitle>
            </MediaItem>
            <MediaItem icon="/tokyo-city-escape/nb-hotel-fill.svg">
              <MediaItemTitle>
                24/7
                <br />
                Support
              </MediaItemTitle>
            </MediaItem>
          </Cluster>
        </DocsExample>
      </section>

      <section id="responsive">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Responsive Gap
        </h2>
        <p className="mb-4 font-medium">
          Cluster keeps the API focused. For breakpoint changes, override the CSS variable with
          Tailwind arbitrary properties.
        </p>
        <DocsCodeBlock code={responsiveExampleCode} />
      </section>

      <DocsCustomizationTokens component="cluster" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={clusterApiRows} variant="props-desc" minWidth="min-w-180" />
      </section>
    </article>
  );
}
