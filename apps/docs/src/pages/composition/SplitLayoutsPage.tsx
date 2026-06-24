import { Link } from 'react-router-dom';
import {
  Button,
  Chip,
  Cluster,
  Display,
  Split,
  Stack,
  Surface,
  Text,
} from 'neobrutalism-ui-react';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';

const whenToUse = [
  'Hero layout with a wide main area and a narrower sidebar or aside',
  'Media/content pairs — image on one side, description on the other',
  'Pricing sections with features on the left and a highlighted card on the right',
  'Profile cards with an avatar panel and identity/details panel',
  'Any layout where two sibling regions need proportional width',
];

const keyInputs = [
  {
    name: 'ratio',
    description: 'Column proportions — 1:1, 2:1, 3:1, 1:2, 1:3, fill:auto, auto:fill',
  },
  {
    name: 'collapse',
    description: 'Breakpoint where columns stack — none, sm, md, lg',
  },
  {
    name: 'gap',
    description: 'Space between the two columns — xs, sm, md, lg, xl',
  },
  {
    name: 'align',
    description: 'Cross-axis alignment — start, center, end, stretch',
  },
  {
    name: 'separator',
    description: 'Vertical divider — none, solid, dashed, thick',
  },
  {
    name: 'padding',
    description: 'Inner padding on the split container — xs, sm, md, lg, xl',
  },
];

const ratiosCode = `{/* Equal columns */}
<Split ratio="1:1" gap="lg" collapse="md">...</Split>

{/* Wide main + narrow aside (2:1) */}
<Split ratio="2:1" gap="lg" collapse="md">...</Split>

{/* Very wide main + narrow panel (3:1) */}
<Split ratio="3:1" gap="xl" collapse="lg">...</Split>

{/* Fixed aside, flexible main */}
<Split ratio="fill:auto" gap="lg" collapse="md">...</Split>`;

const heroSplitCode = `<Split ratio="2:1" gap="lg" collapse="md" align="stretch">
  <Surface tone="yellow" padding="xl" radius="xl" shadow="hard" border="strong">
    <Stack gap="md">
      <Display size="lg">
        Build loud.
        <br />
        Stay sharp.
      </Display>
      <Text size="lg">
        Composition primitives for brutalist React UIs.
      </Text>
      <Cluster gap="sm">
        <Button tone="black">Get started</Button>
        <Button tone="white">Browse components</Button>
      </Cluster>
    </Stack>
  </Surface>

  <Stack gap="md">
    <Surface tone="pink" padding="lg" radius="lg" shadow="hard" border="strong">
      <Text weight="bold">Composition primitives</Text>
    </Surface>
    <Surface tone="mint" padding="lg" radius="lg" shadow="hard" border="strong">
      <Text weight="bold">Token-driven styling</Text>
    </Surface>
    <Surface tone="lavender" padding="lg" radius="lg" shadow="hard" border="strong">
      <Text weight="bold">React-first APIs</Text>
    </Surface>
  </Stack>
</Split>`;

const mediaContentCode = `<Split ratio="1:1" gap="lg" collapse="md">
  <Surface tone="cream" padding="lg" radius="xl" shadow="hard" border="strong">
    <div className="flex aspect-video items-center justify-center border-3 border-(--nb-border) bg-(--nb-mint) text-5xl font-black">
      01
    </div>
  </Surface>

  <Stack gap="md">
    <Display
      size="sm"
      underline="bar"
      underlineGap="xs"
      className="inline-flex flex-col items-start"
      style={{ '--nb-underline-width': '45%' } as React.CSSProperties}
    >
      Recipe card
    </Display>
    <Text tone="muted">
      Use split layouts for visual/content compositions.
    </Text>
    <Cluster gap="xs">
      <Chip tone="yellow">30 min</Chip>
      <Chip tone="mint">Easy</Chip>
      <Chip tone="pink">Vegan</Chip>
    </Cluster>
    <Button tone="black" size="sm">View recipe</Button>
  </Stack>
</Split>`;

export function SplitLayoutsPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <p className="eyebrow">Composition</p>
        <h1>Split Layouts</h1>
        <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          <code className="font-mono">Split</code> creates two-region layouts —
          hero sections, media/content pairs, sidebar layouts, pricing sections,
          and profile cards. It replaces repeated grid boilerplate with a
          single, responsive primitive.
        </p>
      </header>

      <section id="how-it-works" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          How it works
        </h2>
        <p className="mb-5 text-base font-medium">
          Split uses a CSS grid with two columns. The
          <code className="font-mono">ratio</code> prop controls the column
          proportion. The <code className="font-mono">collapse</code> prop sets the
          responsive breakpoint where the two columns stack vertically.
        </p>
        <DocsCodeBlock title="Ratios" code={ratiosCode} />
      </section>

      <section id="hero-split" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Hero split
        </h2>
        <p className="mb-6 text-base font-medium">
          A wide main area paired with a narrower aside — a typical hero
          layout. The aside stacks below on small screens when
          <code className="font-mono">collapse="md"</code>.
        </p>

        <DocsExample code={heroSplitCode}>
          <Split ratio="2:1" gap="lg" collapse="md" align="stretch" className="w-full">
            <Surface tone="yellow" padding="xl" radius="xl" shadow="hard" border="strong">
              <Stack gap="md">
                <Display size="lg">
                  Build loud.
                  <br />
                  Stay sharp.
                </Display>
                <Text size="lg">Composition primitives for brutalist React UIs.</Text>
                <Cluster gap="sm">
                  <Button type="button" tone="black">
                    Get started
                  </Button>
                  <Button type="button" tone="white">
                    Browse components
                  </Button>
                </Cluster>
              </Stack>
            </Surface>

            <Stack gap="md">
              <Surface tone="pink" padding="lg" radius="lg" shadow="hard" border="strong">
                <Text weight="bold">Composition primitives</Text>
              </Surface>
              <Surface tone="mint" padding="lg" radius="lg" shadow="hard" border="strong">
                <Text weight="bold">Token-driven styling</Text>
              </Surface>
              <Surface tone="lavender" padding="lg" radius="lg" shadow="hard" border="strong">
                <Text weight="bold">React-first APIs</Text>
              </Surface>
            </Stack>
          </Split>
        </DocsExample>
      </section>

      <section id="media-content" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Media / content split
        </h2>
        <p className="mb-6 text-base font-medium">
          Equal columns — a media placeholder on the left and rich content
          on the right. Classic recipe card or feature block pattern.
        </p>

        <DocsExample code={mediaContentCode}>
          <Split ratio="1:1" gap="lg" collapse="md" className="w-full">
            <Surface tone="cream" padding="lg" radius="xl" shadow="hard" border="strong">
              <div className="flex aspect-video items-center justify-center border-3 border-(--nb-border) bg-(--nb-mint) text-5xl font-black">
                01
              </div>
            </Surface>

            <Stack gap="md">
              <Display
                size="sm"
                underline="bar"
                underlineGap="xs"
                className="inline-flex flex-col items-start"
                style={{ '--nb-underline-width': '45%' } as React.CSSProperties}
              >
                Recipe card
              </Display>
              <Text tone="muted">
                Use split layouts for visual/content compositions. The left side holds
                an image or media frame; the right holds structured content.
              </Text>
              <Cluster gap="xs">
                <Chip tone="yellow">30 min</Chip>
                <Chip tone="mint">Easy</Chip>
                <Chip tone="pink">Vegan</Chip>
              </Cluster>
              <Button type="button" tone="black" size="sm">
                View recipe
              </Button>
            </Stack>
          </Split>
        </DocsExample>
      </section>

      <section id="api" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Key inputs
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {keyInputs.map((input) => (
            <div
              key={`${input.name}-${input.description}`}
              className="border-3 border-(--nb-border) bg-white p-4 shadow-[3px_3px_0_0_var(--nb-shadow)]"
            >
              <code className="font-mono text-sm font-black">{input.name}</code>
              <p className="mt-1.5 text-sm font-medium text-black/70">{input.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm font-medium">
          See the full API:{' '}
          <Link className="underline" to="/components/split">
            Split
          </Link>
          .
        </p>
      </section>

      <section id="when-to-use" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          When to use Split
        </h2>
        <div className="border-4 border-(--nb-border) bg-black text-white shadow-[6px_6px_0_0_var(--nb-shadow)]">
          {whenToUse.map((use) => (
            <div
              key={use}
              className="flex gap-3 border-b border-white/10 px-5 py-3 last:border-none"
            >
              <span
                className="mt-1.5 inline-block h-2 w-2 shrink-0 border-2 border-(--nb-yellow) bg-(--nb-yellow)"
                aria-hidden="true"
              />
              <span className="text-sm font-medium">{use}</span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
