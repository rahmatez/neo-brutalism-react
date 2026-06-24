import {
  Button,
  Cluster,
  Display,
  Split,
  Stack,
  Surface,
} from 'neobrutalism-ui-react';
import type { ComponentPropsWithoutRef } from 'react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

type SplitRatio = NonNullable<ComponentPropsWithoutRef<typeof Split>['ratio']>;
type SplitGap = NonNullable<ComponentPropsWithoutRef<typeof Split>['gap']>;
type SplitPadding = NonNullable<ComponentPropsWithoutRef<typeof Split>['padding']>;
type SplitCollapse = NonNullable<ComponentPropsWithoutRef<typeof Split>['collapse']>;
type SplitAlign = NonNullable<ComponentPropsWithoutRef<typeof Split>['align']>;
type SplitSeparator = NonNullable<ComponentPropsWithoutRef<typeof Split>['separator']>;

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/split';

const importCode = `import { Split } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<Split ratio="2:1" gap="xl" padding="lg">
  <Stack gap="md">
    <Display>Tokyo City Escape</Display>
    <p>Main content</p>
  </Stack>

  <Stack gap="md" align="start">
    <span>$799</span>
    <Button>Book Trip</Button>
  </Stack>
</Split>`;

const ratiosExampleCode = `<Split ratio="1:1">...</Split>
<Split ratio="2:1">...</Split>
<Split ratio="3:1">...</Split>
<Split ratio="1:2">...</Split>
<Split ratio="1:3">...</Split>
<!-- first column fills, second hugs its content -->
<Split ratio="fill:auto">...</Split>
<!-- first column hugs its content, second fills -->
<Split ratio="auto:fill">...</Split>`;

const spacingExampleCode = `<Split gap="xl" padding="lg">
  <div>Main</div>
  <div>Aside</div>
</Split>`;

const collapseExampleCode = `<Split collapse="none">...</Split>
<Split collapse="sm">...</Split>
<Split collapse="md">...</Split>
<Split collapse="lg">...</Split>`;

const alignmentExampleCode = `<Split align="start">...</Split>
<Split align="center">...</Split>
<Split align="end">...</Split>
<Split align="stretch">...</Split>`;

const separatorExampleCode = `<Split ratio="2:1" gap="lg" separator="solid">
  <div>Main</div>
  <div>Aside</div>
</Split>

<Split ratio="2:1" gap="lg" separator="dashed">
  <div>Main</div>
  <div>Aside</div>
</Split>

<Split ratio="2:1" gap="lg" separator="thick">
  <div>Main</div>
  <div>Aside</div>
</Split>`;

const compositionExampleCode = `<Split ratio="2:1" gap="xl" padding="lg" collapse="md">
  <Stack gap="lg">
    ...
  </Stack>

  <Stack gap="md" align="start">
    ...
  </Stack>
</Split>`;

const ratios: { value: SplitRatio; label: string }[] = [
  { value: '1:1', label: '1:1' },
  { value: '2:1', label: '2:1' },
  { value: '3:1', label: '3:1' },
  { value: '1:2', label: '1:2' },
  { value: '1:3', label: '1:3' },
  { value: 'fill:auto', label: 'fill:auto' },
  { value: 'auto:fill', label: 'auto:fill' },
];

const gaps: { value: SplitGap; label: string }[] = [
  { value: 'none', label: 'none' },
  { value: 'xs', label: 'xs' },
  { value: 'sm', label: 'sm' },
  { value: 'md', label: 'md' },
  { value: 'lg', label: 'lg' },
  { value: 'xl', label: 'xl' },
  { value: '2xl', label: '2xl' },
];

const paddings: { value: SplitPadding; label: string }[] = [
  { value: 'none', label: 'none' },
  { value: 'sm', label: 'sm' },
  { value: 'md', label: 'md' },
  { value: 'lg', label: 'lg' },
  { value: 'xl', label: 'xl' },
];

const collapses: { value: SplitCollapse; label: string }[] = [
  { value: 'none', label: 'none' },
  { value: 'sm', label: 'sm' },
  { value: 'md', label: 'md' },
  { value: 'lg', label: 'lg' },
];

const alignments: { value: SplitAlign; label: string }[] = [
  { value: 'start', label: 'start' },
  { value: 'center', label: 'center' },
  { value: 'end', label: 'end' },
  { value: 'stretch', label: 'stretch' },
];

const separators: { value: SplitSeparator; label: string }[] = [
  { value: 'none', label: 'none' },
  { value: 'solid', label: 'solid' },
  { value: 'dashed', label: 'dashed' },
  { value: 'thick', label: 'thick' },
];

const splitApiRows = [
  {
    name: 'ratio',
    type: "'1:1' | '2:1' | '3:1' | '1:2' | '1:3' | 'fill:auto' | 'auto:fill'",
    default: "'1:1'",
    description: 'Column relationship between main and aside content.',
  },
  {
    name: 'gap',
    type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
    default: "'lg'",
    description: 'Spacing between the two split regions.',
  },
  {
    name: 'padding',
    type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'none'",
    description: 'Inner padding for the split container.',
  },
  {
    name: 'collapse',
    type: "'none' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Breakpoint where the layout switches from stacked to two columns.',
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end' | 'stretch'",
    default: "'stretch'",
    description: 'Cross-axis alignment for the two regions.',
  },
  {
    name: 'separator',
    type: "'none' | 'solid' | 'dashed' | 'thick'",
    default: "'none'",
    description: 'Inline separator between the two regions. Use with a non-zero gap.',
  },
];

export function SplitPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Split</p>
          <h1>Split</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Use <code className="font-mono">Split</code> for two-column main-and-aside compositions.
            It replaces custom grid column strings with ratio, gap, padding, alignment, and
            responsive collapse props.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">7</span>
            <span className="nb-stat-tile__label">Ratios</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">4</span>
            <span className="nb-stat-tile__label">Collapse</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">2</span>
            <span className="nb-stat-tile__label">Children</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <Surface tone="cream" shadow="hard" radius="lg" className="w-full max-w-4xl">
            <Split ratio="2:1" gap="xl" padding="lg">
              <Stack gap="md">
                <span className="w-max border-2 border-(--nb-border) bg-(--nb-mint) px-3 py-1 font-mono text-xs font-black uppercase shadow-[3px_3px_0_0_var(--nb-shadow)]">
                  Main
                </span>
                <Display>Tokyo City Escape</Display>
                <p className="max-w-xl text-base font-medium">
                  A flexible content block for descriptions, product stories, profile bios, course
                  details, and event summaries.
                </p>
              </Stack>

              <Stack gap="md" align="start">
                <span className="border-2 border-(--nb-border) bg-(--nb-yellow) px-4 py-2 font-black shadow-[4px_4px_0_0_var(--nb-shadow)]">
                  $799
                </span>
                <Button>Book Trip</Button>
              </Stack>
            </Split>
          </Surface>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <p className="mb-4 font-medium">
          Wrap two regions in <code className="font-mono">Split</code>. Use{' '}
          <code className="font-mono">ratio</code> to size the columns and{' '}
          <code className="font-mono">collapse</code> to choose when they stack. Separators are
          centered in the split gap, so avoid pairing <code className="font-mono">separator</code>{' '}
          with <code className="font-mono">gap="none"</code>.
        </p>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={defaultExampleCode} />
      </section>

      <section id="ratios">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Ratios
        </h2>
        <DocsExample code={ratiosExampleCode}>
          <div className="grid w-full grid-cols-1 gap-4 p-4">
            {ratios.map((ratio) => (
              <Surface key={ratio.value} shadow="sm" className="p-3">
                <Split ratio={ratio.value} gap="sm" collapse="none">
                  <span className="border-2 border-(--nb-border) bg-(--nb-yellow) px-3 py-4 text-center font-mono text-xs font-black uppercase">
                    {ratio.label} main
                  </span>
                  <span className="border-2 border-(--nb-border) bg-(--nb-mint) px-3 py-4 text-center font-mono text-xs font-black uppercase">
                    Aside
                  </span>
                </Split>
              </Surface>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="gaps-padding">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Gaps and Padding
        </h2>
        <DocsExample code={spacingExampleCode}>
          <div className="grid w-full max-w-3xl shrink-0 gap-6">
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
              {gaps.map((gap) => (
                <Surface key={gap.value} tone="white" shadow="sm">
                  <Split gap="sm" padding="sm" collapse="none">
                    <span className="font-mono text-xs font-black uppercase">gap {gap.label}</span>
                    <Split gap={gap.value} collapse="none">
                      <span className="h-9 border-2 border-(--nb-border) bg-(--nb-pink)" />
                      <span className="h-9 border-2 border-(--nb-border) bg-(--nb-blue)" />
                    </Split>
                  </Split>
                </Surface>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
              {paddings.map((padding) => (
                <Surface key={padding.value} tone="cream" shadow="sm" className="h-28">
                  <Split padding={padding.value} gap="sm" collapse="none" className="h-full bg-(--nb-cream)">
                    <span className="border-2 border-(--nb-border) bg-(--nb-background) p-2 font-mono text-xs font-black uppercase">
                      {padding.label}
                    </span>
                    <span className="border-2 border-(--nb-border) bg-(--nb-mint) p-2 font-black">
                      Pad
                    </span>
                  </Split>
                </Surface>
              ))}
            </div>
          </div>
        </DocsExample>
      </section>

      <section id="collapse">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Collapse
        </h2>
        <p className="mb-4 font-medium">
          Split stacks by default until the <code className="font-mono">md</code> breakpoint. Use{' '}
          <code className="font-mono">collapse="none"</code> for a permanent two-column split.
        </p>
        <DocsExample code={collapseExampleCode}>
          <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
            {collapses.map((collapse) => (
              <Surface key={collapse.value} tone="yellow" shadow="sm" className="p-4">
                <Stack gap="sm">
                  <span className="font-mono text-xs font-black uppercase">{collapse.label}</span>
                  <Split gap="sm" collapse={collapse.value}>
                    <span className="border-2 border-(--nb-border) bg-(--nb-mint) p-3 font-black">
                      Main
                    </span>
                    <span className="border-2 border-(--nb-border) bg-(--nb-lavender) p-3 font-black">
                      Aside
                    </span>
                  </Split>
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
              <Surface key={align.value} tone="white" shadow="sm" className="p-4">
                <Split gap="sm" align={align.value} collapse="none">
                  <span className="min-h-24 border-2 border-(--nb-border) bg-(--nb-yellow) p-3 font-mono text-xs font-black uppercase">
                    {align.label}
                  </span>
                  <span className="border-2 border-(--nb-border) bg-(--nb-mint) p-3 font-black">
                    Aside
                  </span>
                </Split>
              </Surface>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="separators">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Separators
        </h2>
        <DocsExample code={separatorExampleCode}>
          <div className="grid w-full grid-cols-1 gap-4 p-4">
            {separators
              .filter((separator) => separator.value !== 'none')
              .map((separator) => (
                <Surface key={separator.value} tone="cream" shadow="sm">
                  <Split
                    ratio="2:1"
                    gap="lg"
                    padding="md"
                    collapse="none"
                    separator={separator.value}
                  >
                    <span className="font-black">{separator.label} main</span>
                    <span className="font-medium">Aside</span>
                  </Split>
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
          <Surface tone="cream" shadow="hard" radius="lg" className="w-full max-w-3xl">
            <Split ratio="2:1" gap="xl" padding="lg" collapse="md">
              <Stack gap="lg">
                <Cluster gap="sm">
                  <span className="border-2 border-(--nb-border) bg-(--nb-mint) px-3 py-1 font-mono text-xs font-black uppercase">
                    Course
                  </span>
                  <span className="border-2 border-(--nb-border) bg-(--nb-lavender) px-3 py-1 font-mono text-xs font-black uppercase">
                    Intermediate
                  </span>
                </Cluster>

                <Stack gap="sm">
                  <h3 className="mb-0 text-3xl font-black">Design Systems Sprint</h3>
                  <p className="max-w-lg font-medium">
                    Stack and Cluster handle local rhythm. Split handles the larger main-and-aside
                    card structure.
                  </p>
                </Stack>
              </Stack>

              <Stack gap="md" align="start">
                <span className="border-2 border-(--nb-border) bg-(--nb-yellow) px-4 py-2 font-black shadow-[4px_4px_0_0_var(--nb-shadow)]">
                  12 seats
                </span>
                <Button>Enroll</Button>
              </Stack>
            </Split>
          </Surface>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="split" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={splitApiRows} variant="props-desc" minWidth="min-w-180" />
      </section>
    </article>
  );
}
