import {
  Button,
  Callout,
  Chip,
  Cluster,
  Display,
  Section,
  Stack,
  Surface,
} from 'neobrutalism-ui-react';
import type { ComponentPropsWithoutRef } from 'react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/section';

type SectionPadding = NonNullable<ComponentPropsWithoutRef<typeof Section>['padding']>;
type SectionDivider = NonNullable<ComponentPropsWithoutRef<typeof Section>['divider']>;
type SectionDividerStyle = NonNullable<ComponentPropsWithoutRef<typeof Section>['dividerStyle']>;
type SectionLayout = NonNullable<ComponentPropsWithoutRef<typeof Section>['layout']>;
type SectionAlign = NonNullable<ComponentPropsWithoutRef<typeof Section>['align']>;

const importCode = `import { Section } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<Surface tone="cream" shadow="hard" radius="lg" clip>
  <Section divider="bottom" padding="lg" layout="between" align="center">
    <Display>Alpha Launch</Display>
    <Chip tone="mint">Active</Chip>
  </Section>

  <Section padding="lg">
    <p>Section owns the inner regions of a card.</p>
  </Section>

  <Section divider="top" padding="lg" layout="between" align="center">
    <span>12 collaborators</span>
    <Button>Open project</Button>
  </Section>
</Surface>`;

const paddingsExampleCode = `<Section padding="none">...</Section>
<Section padding="xs">...</Section>
<Section padding="sm">...</Section>
<Section padding="md">...</Section>
<Section padding="lg">...</Section>
<Section padding="xl">...</Section>`;

const bordersExampleCode = `<Section divider="top">...</Section>
<Section divider="right">...</Section>
<Section divider="bottom">...</Section>
<Section divider="left">...</Section>
<Section divider="block">...</Section>
<Section divider="inline">...</Section>
<Section divider="all">...</Section>`;

const borderStylesExampleCode = `<Section divider="all" dividerStyle="solid">...</Section>
<Section divider="all" dividerStyle="dashed">...</Section>
<Section divider="all" dividerStyle="dotted">...</Section>`;

const layoutsExampleCode = `<Section layout="default">...</Section>
<Section layout="center" align="center">...</Section>
<Section layout="between" align="center">...</Section>`;

const compositionExampleCode = `<Surface tone="white" shadow="hard" radius="lg" clip>
  <Section padding="lg" divider="bottom" layout="between" align="center">
    <Display>Design Sprint</Display>
    <Chip tone="lavender">Annual</Chip>
  </Section>

  <Section padding="lg">
    <p>Three weeks of guided sessions and a final brutalist showcase.</p>
  </Section>

  <Section divider="top" padding="lg" layout="between" align="center">
    <Callout tone="yellow" shadow="hard">$799</Callout>
    <Button>Enroll</Button>
  </Section>
</Surface>`;

const paddings: { value: SectionPadding; label: string }[] = [
  { value: 'none', label: 'none' },
  { value: 'xs', label: 'xs' },
  { value: 'sm', label: 'sm' },
  { value: 'md', label: 'md' },
  { value: 'lg', label: 'lg' },
  { value: 'xl', label: 'xl' },
];

const borders: { value: SectionDivider; label: string; hint: string }[] = [
  { value: 'top', label: 'top', hint: 'line above' },
  { value: 'right', label: 'right', hint: 'line on the right' },
  { value: 'bottom', label: 'bottom', hint: 'line below' },
  { value: 'left', label: 'left', hint: 'line on the left' },
  { value: 'block', label: 'block', hint: 'top + bottom' },
  { value: 'inline', label: 'inline', hint: 'left + right' },
  { value: 'all', label: 'all', hint: 'fully outlined' },
];

const borderStyles: { value: SectionDividerStyle; label: string }[] = [
  { value: 'solid', label: 'solid' },
  { value: 'dashed', label: 'dashed' },
  { value: 'dotted', label: 'dotted' },
];

const layouts: {
  value: SectionLayout;
  align: SectionAlign;
  label: string;
  hint: string;
}[] = [
  { value: 'default', align: 'stretch', label: 'default', hint: 'block flow' },
  { value: 'center', align: 'center', label: 'center', hint: 'flex, justify-content: center' },
  {
    value: 'between',
    align: 'center',
    label: 'between',
    hint: 'flex, justify-content: space-between',
  },
];

const sectionApiRows = [
  {
    name: 'padding',
    type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Inner padding for the section.',
  },
  {
    name: 'divider',
    type: "'none' | 'top' | 'right' | 'bottom' | 'left' | 'block' | 'inline' | 'all'",
    default: "'none'",
    description: (
      <>
        Which side(s) render a divider line. Uses <code className="font-mono">--nb-border</code> and{' '}
        <code className="font-mono">--nb-border-width</code>.
      </>
    ),
  },
  {
    name: 'dividerStyle',
    type: "'solid' | 'dashed' | 'dotted'",
    default: "'solid'",
    description: 'Stroke style applied to the active border side(s).',
  },
  {
    name: 'layout',
    type: "'default' | 'center' | 'between'",
    default: "'default'",
    description: (
      <>
        <code className="font-mono">default</code> keeps block flow,{' '}
        <code className="font-mono">center</code> and <code className="font-mono">between</code>{' '}
        switch to flex with the matching justify.
      </>
    ),
  },
  {
    name: 'align',
    type: "'stretch' | 'start' | 'center' | 'end'",
    default: "'stretch'",
    description: (
      <>
        Cross-axis alignment; only applies when <code className="font-mono">layout</code> is{' '}
        <code className="font-mono">center</code> or <code className="font-mono">between</code>.
      </>
    ),
  },
  {
    name: 'flush',
    type: 'boolean',
    default: 'false',
    description:
      "Pulls the section out to its parent's edges via negative inline margins. Escape hatch for advanced card layouts.",
  },
];

export function SectionPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Section</p>
          <h1>Section</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Use <code className="font-mono">Section</code> for the internal regions of a card —
            headers, body blocks, and footers. It replaces ad-hoc{' '}
            <code className="font-mono">border-t-2 px-6 py-6</code> wrappers with a small
            declarative primitive for padding, border side, and inline layout.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">Padding</span>
            <span className="nb-stat-tile__label">Region spacing</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">Divider</span>
            <span className="nb-stat-tile__label">Side placement</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">Layout</span>
            <span className="nb-stat-tile__label">Region flow</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <Surface tone="cream" shadow="hard" radius="lg" clip className="w-full max-w-xl">
            <Section divider="bottom" padding="lg" layout="between" align="center">
              <Stack gap="xs">
                <span className="font-mono text-xs font-black uppercase">Project</span>
                <Display className="[--nb-display-size:2rem]">Alpha Launch</Display>
              </Stack>
              <Chip tone="mint">Active</Chip>
            </Section>

            <Section padding="lg">
              <p className="font-medium">
                Section owns the inner regions of a card. Drop headers, body blocks, and footers
                without rewriting padding or border utility classes every time.
              </p>
            </Section>

            <Section divider="top" padding="lg" layout="between" align="center">
              <span className="font-mono text-xs font-black uppercase">12 collaborators</span>
              <Button>Open project</Button>
            </Section>
          </Surface>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <p className="mb-4 font-medium">
          Add <code className="font-mono">Section</code> to the wrapper around any region inside a
          surface or card. Pair it with <code className="font-mono">padding</code>,{' '}
          <code className="font-mono">divider</code>, and <code className="font-mono">layout</code>{' '}
          to compose headers, content, and footers without ad-hoc utility classes.
        </p>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={defaultExampleCode} />
      </section>

      <section id="paddings">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Paddings
        </h2>
        <p className="mb-4 font-medium">
          Padding is the most common knob. Inline layouts (headers, footers, toolbars) usually take{' '}
          <code className="font-mono">md</code> to <code className="font-mono">lg</code>; hero rows
          take <code className="font-mono">xl</code>.
        </p>
        <DocsExample code={paddingsExampleCode}>
          <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            {paddings.map((padding) => (
              <Surface key={padding.value} tone="white" shadow="sm">
                <div className="border-b-2 border-(--nb-border) bg-(--nb-background) px-4 py-2 font-mono text-xs font-black uppercase">
                  padding {padding.label}
                </div>
                <Section padding={padding.value}>
                  <div className="grid h-12 place-items-center border-2 border-(--nb-border) bg-(--nb-yellow) font-mono text-xs font-black uppercase">
                    content
                  </div>
                </Section>
              </Surface>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="borders">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Dividers
        </h2>
        <p className="mb-4 font-medium">
          Sections share <code className="font-mono">--nb-border</code> and{' '}
          <code className="font-mono">--nb-border-width</code> with the rest of the system, so a
          single side never goes out of sync. Use <code className="font-mono">block</code> for top +
          bottom or <code className="font-mono">inline</code> for left + right;{' '}
          <code className="font-mono">all</code> for a fully outlined region.
        </p>
        <DocsExample code={bordersExampleCode}>
          <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            {borders.map((border) => (
              <Surface key={border.value} tone="cream" shadow="sm">
                <div className="border-b-2 border-(--nb-border) bg-(--nb-background) px-4 py-2 font-mono text-xs font-black uppercase">
                  divider {border.label}
                </div>
                <div className="p-4">
                  <Section padding="md" divider={border.value}>
                    <div className="grid h-12 place-items-center border-2 border-(--nb-border) bg-(--nb-mint) px-3 font-mono text-xs font-black uppercase">
                      {border.hint}
                    </div>
                  </Section>
                </div>
              </Surface>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="border-styles">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Divider styles
        </h2>
        <DocsExample code={borderStylesExampleCode}>
          <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-3">
            {borderStyles.map((style) => (
              <Surface key={style.value} tone="white" shadow="sm">
                <div className="border-b-2 border-(--nb-border) bg-(--nb-background) px-4 py-2 font-mono text-xs font-black uppercase">
                  {style.label}
                </div>
                <div className="p-4">
                  <Section padding="md" divider="all" dividerStyle={style.value}>
                    <div className="grid h-12 place-items-center border-2 border-(--nb-border) bg-(--nb-lavender) px-3 font-mono text-xs font-black uppercase">
                      {style.label} edge
                    </div>
                  </Section>
                </div>
              </Surface>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="layouts">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Layouts
        </h2>
        <p className="mb-4 font-medium">
          <code className="font-mono">layout="default"</code> keeps block flow.{' '}
          <code className="font-mono">layout="center"</code> and{' '}
          <code className="font-mono">layout="between"</code> switch to flex with sensible justify
          defaults — pair with <code className="font-mono">align</code> for cross-axis control.
        </p>
        <DocsExample code={layoutsExampleCode}>
          <div className="grid w-full grid-cols-1 gap-4 p-4">
            {layouts.map((layout) => (
              <Surface key={layout.value} tone="white" shadow="sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-(--nb-border) bg-(--nb-background) px-4 py-2">
                  <span className="font-mono text-xs font-black uppercase">
                    layout {layout.label}
                  </span>
                  <span className="font-mono text-xs font-medium">{layout.hint}</span>
                </div>
                <Section
                  padding="md"
                  layout={layout.value}
                  align={layout.align}
                  className="bg-(--nb-cream)"
                >
                  <span className="border-2 border-(--nb-border) bg-(--nb-yellow) px-3 py-2 font-mono text-xs font-black uppercase">
                    Lead
                  </span>
                  <span className="border-2 border-(--nb-border) bg-(--nb-pink) px-3 py-2 font-mono text-xs font-black text-white uppercase">
                    Trail
                  </span>
                </Section>
              </Surface>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="composition">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Composition
        </h2>
        <p className="mb-4 font-medium">
          Section pairs naturally with Surface (the outer shell) and Stack / Cluster (the inner
          rhythm). The mental model is: <code className="font-mono">Surface</code> owns the card,{' '}
          <code className="font-mono">Section</code> owns each region inside it.
        </p>
        <DocsExample code={compositionExampleCode}>
          <Surface tone="white" shadow="hard" radius="lg" clip className="w-full max-w-2xl">
            <Section
              padding="lg"
              divider="bottom"
              layout="between"
              align="center"
              className="bg-(--nb-cream)"
            >
              <Stack gap="xs">
                <span className="font-mono text-xs font-black uppercase">Pro plan</span>
                <Display className="[--nb-display-size:2rem]">Design Sprint</Display>
              </Stack>
              <Chip tone="lavender">Annual</Chip>
            </Section>

            <Section padding="lg">
              <Stack gap="md">
                <p className="max-w-lg font-medium">
                  Three weeks of guided sessions, live critiques, and a final brutalist showcase.
                  Bring your most ambitious card layout — we&apos;ll ship it together.
                </p>
                <Cluster gap="sm">
                  <Chip tone="mint">12 seats</Chip>
                  <Chip tone="yellow">Cohort starts Jun 3</Chip>
                </Cluster>
              </Stack>
            </Section>

            <Section divider="top" padding="lg" layout="between" align="center">
              <Callout tone="yellow" shadow="hard">
                $799
              </Callout>
              <Button>Enroll</Button>
            </Section>
          </Surface>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="section" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={sectionApiRows} variant="props-desc" minWidth="min-w-180" />
      </section>
    </article>
  );
}
