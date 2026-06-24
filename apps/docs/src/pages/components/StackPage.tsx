import {
  Button,
  Display,
  MediaItem,
  Stack,
  Surface,
} from 'neobrutalism-ui-react';
import type { ComponentPropsWithoutRef } from 'react';

type StackGap = NonNullable<ComponentPropsWithoutRef<typeof Stack>['gap']>;
type StackAlign = NonNullable<ComponentPropsWithoutRef<typeof Stack>['align']>;
type StackJustify = NonNullable<ComponentPropsWithoutRef<typeof Stack>['justify']>;
type StackSeparator = NonNullable<ComponentPropsWithoutRef<typeof Stack>['separator']>;
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/stack';

const importCode = `import { Stack } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<Stack gap="lg">
  <Display>Build loud.</Display>

  <p>
    Stack gives you brutalist vertical rhythm without repeating flex and gap
    classes everywhere.
  </p>

  <Button>Stay sharp</Button>
</Stack>`;

const gapsExampleCode = `<Stack gap="none">...</Stack>
<Stack gap="xs">...</Stack>
<Stack gap="sm">...</Stack>
<Stack gap="md">...</Stack>
<Stack gap="lg">...</Stack>
<Stack gap="xl">...</Stack>
<Stack gap="2xl">...</Stack>`;

const alignmentExampleCode = `<Stack gap="sm" align="stretch">...</Stack>
<Stack gap="sm" align="start">...</Stack>
<Stack gap="sm" align="center">...</Stack>
<Stack gap="sm" align="end">...</Stack>`;

const justificationExampleCode = `<Stack justify="start" className="h-56">...</Stack>
<Stack justify="center" className="h-56">...</Stack>
<Stack justify="end" className="h-56">...</Stack>
<Stack justify="between" className="h-56">...</Stack>`;

const separatorExampleCode = `<Stack gap="md" separator="dashed">
  <MediaItem icon="/tokyo-city-escape/nb-star-fill.svg" title="Central Locations" />
  <MediaItem icon="/tokyo-city-escape/nb-plane-fill.svg" title="Guided Experiences" />
  <MediaItem icon="/tokyo-city-escape/nb-hotel-fill.svg" title="24/7 Support" />
</Stack>`;

const responsiveExampleCode = `<Stack
  gap="md"
  className="md:[--nb-stack-gap:1.5rem]"
>
  ...
</Stack>`;

const gaps: { value: StackGap; label: string }[] = [
  { value: 'none', label: 'none' },
  { value: 'xs', label: 'xs' },
  { value: 'sm', label: 'sm' },
  { value: 'md', label: 'md' },
  { value: 'lg', label: 'lg' },
  { value: 'xl', label: 'xl' },
  { value: '2xl', label: '2xl' },
];

const alignments: { value: StackAlign; label: string }[] = [
  { value: 'stretch', label: 'stretch' },
  { value: 'start', label: 'start' },
  { value: 'center', label: 'center' },
  { value: 'end', label: 'end' },
];

const justifications: { value: StackJustify; label: string }[] = [
  { value: 'start', label: 'start' },
  { value: 'center', label: 'center' },
  { value: 'end', label: 'end' },
  { value: 'between', label: 'between' },
];

const separators: { value: StackSeparator; label: string }[] = [
  { value: 'solid', label: 'solid' },
  { value: 'dashed', label: 'dashed' },
];

const stackApiRows = [
  {
    name: 'gap',
    type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
    default: "'md'",
    description: 'Vertical spacing between stack children.',
  },
  {
    name: 'align',
    type: "'stretch' | 'start' | 'center' | 'end'",
    default: "'stretch'",
    description: 'Cross-axis alignment for the stack children.',
  },
  {
    name: 'justify',
    type: "'start' | 'center' | 'end' | 'between'",
    default: "'start'",
    description: 'Main-axis distribution when the stack has extra height.',
  },
  {
    name: 'separator',
    type: "'none' | 'solid' | 'dashed' | 'thick'",
    default: "'none'",
    description: 'Optional border between adjacent children.',
  },
];

export function StackPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Stack</p>
          <h1>Stack</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Use <code className="font-mono">Stack</code> whenever children should flow vertically
            with consistent spacing. It turns raw{' '}
            <code className="font-mono">flex flex-col gap-*</code> layout boilerplate into a small
            declarative primitive for vertical rhythm.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">7</span>
            <span className="nb-stat-tile__label">Gaps</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">4</span>
            <span className="nb-stat-tile__label">Alignments</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">3</span>
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
          <Stack gap="lg" className="max-w-md p-4">
            <Display>Build loud.</Display>
            <p className="text-base font-medium">
              Stack gives you brutalist vertical rhythm without repeating flex and gap classes
              everywhere.
            </p>
            <Button>Stay sharp</Button>
          </Stack>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <p className="mb-4 font-medium">
          Add <code className="font-mono">Stack</code> to the parent that owns the vertical flow.
          Use <code className="font-mono">gap</code> for rhythm, <code className="font-mono">align</code>{' '}
          for cross-axis alignment, and <code className="font-mono">justify</code> when the stack has
          a fixed height.
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
                <Stack gap={gap.value}>
                  <span className="font-mono text-xs font-black uppercase">{gap.label}</span>
                  <span className="h-8 border-2 border-(--nb-border) bg-(--nb-yellow)" />
                  <span className="h-8 border-2 border-(--nb-border) bg-(--nb-mint)" />
                  <span className="h-8 border-2 border-(--nb-border) bg-(--nb-pink)" />
                </Stack>
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
                <Stack gap="sm" align={align.value}>
                  <span className="font-mono text-xs font-black uppercase">{align.label}</span>
                  <span className="w-18 border-2 border-(--nb-border) bg-(--nb-yellow) px-3 py-2 text-center font-black">
                    A
                  </span>
                  <span className="w-28 border-2 border-(--nb-border) bg-(--nb-mint) px-3 py-2 text-center font-black">
                    B
                  </span>
                </Stack>
              </Surface>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="justification">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold text-black!">
          Justification
        </h2>
        <DocsExample code={justificationExampleCode}>
          <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            {justifications.map((justify) => (
              <Surface key={justify.value} tone="white" shadow="sm" className="h-56 p-4">
                <Stack gap="sm" align="start" justify={justify.value} className="h-full">
                  <span className="font-mono text-xs font-black uppercase">{justify.label}</span>
                  <span className="border-2 border-(--nb-border) bg-(--nb-lavender) px-3 py-2 font-black">
                    One
                  </span>
                  <span className="border-2 border-(--nb-border) bg-(--nb-blue) px-3 py-2 font-black">
                    Two
                  </span>
                </Stack>
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
          Use <code className="font-mono">separator</code> for simple separated lists. The separator
          padding follows the stack gap.
        </p>
        <DocsExample code={separatorExampleCode}>
          <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
            {separators.map((separator) => (
              <Surface key={separator.value} tone="yellow" radius="lg" shadow="hard" className="p-4">
                <Stack gap="md" separator={separator.value}>
                  <MediaItem
                    icon="/tokyo-city-escape/nb-star-fill.svg"
                    title="Central Locations"
                  />
                  <MediaItem
                    icon="/tokyo-city-escape/nb-plane-fill.svg"
                    title="Guided Experiences"
                  />
                  <MediaItem icon="/tokyo-city-escape/nb-hotel-fill.svg" title="24/7 Support" />
                </Stack>
              </Surface>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="responsive">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Responsive Gap
        </h2>
        <p className="mb-4 font-medium">
          Stack keeps the API focused. For breakpoint changes, override the CSS variable with
          Tailwind arbitrary properties.
        </p>
        <DocsCodeBlock code={responsiveExampleCode} />
      </section>

      <DocsCustomizationTokens component="stack" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={stackApiRows} variant="props-desc" minWidth="min-w-180" />
      </section>
    </article>
  );
}
