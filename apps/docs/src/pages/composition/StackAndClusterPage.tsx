import { Link } from 'react-router-dom';
import type { ComponentPropsWithoutRef } from 'react';
import {
  Button,
  Chip,
  Cluster,
  Display,
  Stack,
  Surface,
  Text,
} from 'neobrutalism-ui-react';
import { DocsExample } from '@/docs/components/DocsExample';

type StackGap = NonNullable<ComponentPropsWithoutRef<typeof Stack>['gap']>;

const gapValues: { value: StackGap; color: string; use: string }[] = [
  { value: 'xs', color: 'var(--nb-yellow)', use: 'Related items' },
  { value: 'sm', color: 'var(--nb-mint)', use: 'Tight groups' },
  { value: 'md', color: 'var(--nb-pink)', use: 'Card sections' },
  { value: 'lg', color: 'var(--nb-lavender)', use: 'Distinct regions' },
  { value: 'xl', color: 'var(--nb-cream)', use: 'Page sections' },
];

const keyInputs = [
  {
    name: 'gap',
    primitive: 'Stack',
    description: 'Vertical spacing — xs, sm, md, lg, xl',
  },
  {
    name: 'align',
    primitive: 'Stack',
    description: 'Cross-axis — stretch, start, center, end',
  },
  {
    name: 'justify',
    primitive: 'Stack',
    description: 'Main-axis — start, center, end, between',
  },
  {
    name: 'separator',
    primitive: 'Stack',
    description: 'Divider between children — none, solid, dashed, thick',
  },
  {
    name: 'gap',
    primitive: 'Cluster',
    description: 'Horizontal spacing — xs, sm, md, lg, xl',
  },
  {
    name: 'align',
    primitive: 'Cluster',
    description: 'Cross-axis — start, center, end, baseline, stretch',
  },
  {
    name: 'justify',
    primitive: 'Cluster',
    description: 'Main-axis — start, center, end, between',
  },
  {
    name: 'wrap',
    primitive: 'Cluster',
    description: 'Wrapping — wrap (default), nowrap',
  },
];

const stackExampleCode = `<Stack gap="md">
  <Chip tone="mint" className="self-start">Hiring now</Chip>
  <Display
    size="sm"
    underline="bar"
    underlineGap="xs"
    className="inline-flex flex-col items-start"
    style={{ '--nb-underline-width': '80%' } as React.CSSProperties}
  >
    Open role
  </Display>
  <Text>Compose content vertically with predictable spacing.</Text>
  <Button tone="yellow" size="lg">Apply now</Button>
</Stack>`;

const clusterExampleCode = `<Cluster gap="xs">
  <Chip tone="yellow">React</Chip>
  <Chip tone="mint">TypeScript</Chip>
  <Chip tone="pink">Hooks</Chip>
  <Chip tone="lavender">Vite</Chip>
</Cluster>`;

const combinedCode = `<Surface tone="cream" padding="lg" radius="xl" shadow="hard" border="strong">
  <Stack gap="lg">
    <Stack gap="xs">
      <Display
        size="sm"
        underline="bar"
        underlineGap="xs"
        className="inline-flex flex-col items-start"
        style={{ '--nb-underline-width': '45%' } as React.CSSProperties}
      >
        Senior React Engineer
      </Display>
      <Text tone="muted">Build loud UI primitives.</Text>
    </Stack>

    <Cluster gap="xs">
      <Chip tone="yellow">Remote</Chip>
      <Chip tone="mint">Full-time</Chip>
      <Chip tone="pink">Urgent</Chip>
    </Cluster>

    <Cluster gap="sm">
      <Button tone="black">Apply</Button>
      <Button tone="white">Save</Button>
    </Cluster>
  </Stack>
</Surface>`;

export function StackAndClusterPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <p className="eyebrow">Composition</p>
        <h1>Stack & Cluster</h1>
        <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          <code className="font-mono">Stack</code> is the default primitive for
          vertical rhythm. <code className="font-mono">Cluster</code> is the
          default primitive for inline groups that may wrap. Use them
          everywhere instead of manually wiring up flex utilities.
        </p>
      </header>

      <section id="when-each" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          When to use each
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border-3 border-(--nb-border) bg-(--nb-mint) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <h3 className="font-heading text-xl font-black uppercase">Stack</h3>
            <p className="mt-2 text-sm font-medium">
              Vertical flow with consistent gap. Use for page sections, form
              groups, card content, lists, and anywhere content stacks top-to-bottom.
            </p>
          </div>
          <div className="border-3 border-(--nb-border) bg-(--nb-pink) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <h3 className="font-heading text-xl font-black uppercase">Cluster</h3>
            <p className="mt-2 text-sm font-medium">
              Horizontal flow that wraps to multiple lines. Use for actions,
              chips, toolbar rows, tags, badges, and any group of inline items.
            </p>
          </div>
        </div>
      </section>

      <section id="stack-example" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Stack — vertical card content
        </h2>
        <p className="mb-6 text-base font-medium">
          A job card using Stack to control vertical rhythm between title,
          description, and action.
        </p>

        <DocsExample code={stackExampleCode}>
          <Stack gap="md" className="w-full max-w-sm">
            <Chip tone="mint" className="self-start">
              Hiring now
            </Chip>
            <Display
              size="sm"
              underline="bar"
              underlineGap="xs"
              className="inline-flex flex-col items-start"
              style={{ '--nb-underline-width': '80%' } as React.CSSProperties}
            >
              Open role
            </Display>
            <Text>Compose content vertically with predictable spacing.</Text>
            <Button type="button" tone="yellow" size="lg">
              Apply now
            </Button>
          </Stack>
        </DocsExample>
      </section>

      <section id="cluster-example" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Cluster — chip group
        </h2>
        <p className="mb-6 text-base font-medium">
          A Cluster wraps chips inline, letting them reflow naturally without
          fixed-width constraints.
        </p>

        <DocsExample code={clusterExampleCode}>
          <Cluster gap="xs" justify="center" className="max-w-md">
            <Chip tone="yellow">React</Chip>
            <Chip tone="mint">TypeScript</Chip>
            <Chip tone="pink">Hooks</Chip>
            <Chip tone="lavender">Vite</Chip>
          </Cluster>
        </DocsExample>
      </section>

      <section id="combined-example" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Combined inside a Surface
        </h2>
        <p className="mb-6 text-base font-medium">
          Stack and Cluster working together inside a Surface. The outer Stack
          controls top-level spacing; the inner Clusters handle inline groups.
        </p>

        <DocsExample code={combinedCode}>
          <Surface
            tone="cream"
            padding="lg"
            radius="xl"
            shadow="hard"
            border="strong"
            className="w-full max-w-md"
          >
            <Stack gap="lg">
              <Stack gap="xs">
                <Display
                  size="sm"
                  underline="bar"
                  underlineGap="xs"
                  className="inline-flex flex-col items-start"
                  style={{ '--nb-underline-width': '45%' } as React.CSSProperties}
                >
                  Senior React Engineer
                </Display>
                <Text tone="muted">Build loud UI primitives.</Text>
              </Stack>

              <Cluster gap="xs">
                <Chip tone="yellow">Remote</Chip>
                <Chip tone="mint">Full-time</Chip>
                <Chip tone="pink">Urgent</Chip>
              </Cluster>

              <Cluster gap="sm">
                <Button type="button" tone="black">
                  Apply
                </Button>
                <Button type="button" tone="white">
                  Save
                </Button>
              </Cluster>
            </Stack>
          </Surface>
        </DocsExample>
      </section>

      <section id="gap-values" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Gap values
        </h2>
        <p className="mb-5 text-base font-medium">
          Both Stack and Cluster use the same gap scale. Pick the right gap
          for the relationship between items — tight for related items, wider
          for distinct groups.
        </p>
        <div className="grid gap-4 border-3 border-(--nb-border) bg-white p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
          {gapValues.map((gap) => (
            <div key={gap.value} className="flex items-center gap-6">
              <code className="w-16 shrink-0 font-mono text-sm font-bold">{gap.value}</code>
              <Stack gap={gap.value} className="flex-1">
                <div
                  className="h-3 border-3 border-(--nb-border)"
                  style={{ background: gap.color }}
                />
                <div
                  className="h-3 border-3 border-(--nb-border)"
                  style={{ background: gap.color }}
                />
              </Stack>
              <span className="w-32 shrink-0 text-sm font-medium opacity-70">{gap.use}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="api" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Key inputs
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {keyInputs.map((input, index) => (
            <div
              key={`${input.name}-${input.primitive}-${index}`}
              className="border-3 border-(--nb-border) bg-white p-4 shadow-[3px_3px_0_0_var(--nb-shadow)]"
            >
              <div className="flex items-center gap-2">
                <code className="font-mono text-sm font-black">{input.name}</code>
                <span
                  className="border border-(--nb-border) px-1.5 py-0.5 font-mono text-xs font-bold uppercase"
                  style={{
                    background:
                      input.primitive === 'Stack' ? 'var(--nb-mint)' : 'var(--nb-pink)',
                  }}
                >
                  {input.primitive}
                </span>
              </div>
              <p className="mt-1.5 text-sm font-medium text-black/70">{input.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm font-medium">
          See the full APIs:{' '}
          <Link className="underline" to="/components/stack">
            Stack
          </Link>{' '}
          and{' '}
          <Link className="underline" to="/components/cluster">
            Cluster
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
