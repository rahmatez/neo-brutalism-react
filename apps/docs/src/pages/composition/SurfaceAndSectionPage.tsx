import { Link } from 'react-router-dom';
import {
  Button,
  Chip,
  Cluster,
  Display,
  Section,
  Stack,
  Surface,
  Text,
} from 'neobrutalism-ui-react';
import { DocsExample } from '@/docs/components/DocsExample';

const whenToUse = [
  'You need a card, panel, docs example, callout shell, dashboard widget, or recipe card',
  'The UI has distinct header, body, and footer zones',
  'You want dividers to feel intentional rather than manually applied',
  'You want the outer shape (radius, shadow, border) defined in one place',
];

const keyInputs: { name: string; primitive: string; description: string }[] = [
  {
    name: 'tone',
    primitive: 'Surface',
    description: 'Color theme — cream, yellow, pink, mint, lavender, black, white, etc.',
  },
  {
    name: 'radius',
    primitive: 'Surface',
    description: 'Corner shape — none, xs, sm, md, lg, xl, full',
  },
  {
    name: 'shadow',
    primitive: 'Surface',
    description: 'Brutalist offset depth — none, sm, default, hard, heavy',
  },
  {
    name: 'border',
    primitive: 'Surface',
    description: 'Outline strength — none, thin, default, strong, thick',
  },
  {
    name: 'clip',
    primitive: 'Surface',
    description: 'Boolean. Clips inner content to the surface radius.',
  },
  {
    name: 'padding',
    primitive: 'Section',
    description: 'Internal space — none, xs, sm, md, lg, xl',
  },
  {
    name: 'divider',
    primitive: 'Section',
    description:
      'Divider position — top, bottom, left, right, block (top + bottom), inline (left + right), all, none',
  },
  {
    name: 'layout',
    primitive: 'Section',
    description: 'Flex layout — default, center, between',
  },
];

const basicPanelCode = `<Surface tone="cream" radius="xl" shadow="hard" border="strong" clip>
  <Section padding="lg" divider="bottom">
    <Display
      size="sm"
      underline="bar"
      underlineGap="xs"
      className="inline-flex flex-col items-start"
      style={{ '--nb-underline-width': '45%' } as React.CSSProperties}
    >
      Profile
    </Display>
  </Section>

  <Section padding="lg">
    <Text>Chunky card shell with clear regions.</Text>
  </Section>
</Surface>`;

const headerBodyFooterCode = `<Surface tone="yellow" radius="xl" border="thick" shadow="hard" clip>
  <Section padding="lg" divider="bottom">
    <Cluster gap="sm" align="center" justify="between">
      <Display
        size="sm"
        underline="bar"
        underlineGap="xs"
        className="inline-flex flex-col items-start"
        style={{ '--nb-underline-width': '45%' } as React.CSSProperties}
      >
        Campaign draft
      </Display>
      <Chip tone="pink">Draft</Chip>
    </Cluster>
  </Section>

  <Section padding="lg">
    <Stack gap="md">
      <Text>
        Body content lives here. Stack controls the vertical
        rhythm inside the section.
      </Text>
      <Cluster gap="xs">
        <Chip tone="mint">React</Chip>
        <Chip tone="lavender">Hooks</Chip>
      </Cluster>
    </Stack>
  </Section>

  <Section padding="lg" divider="top" layout="between" align="center">
    <Text tone="muted">Last saved 2m ago</Text>
    <Button tone="black" size="sm">Publish</Button>
  </Section>
</Surface>`;

const clipCode = `{/* clip keeps inner content within the radius */}
<Surface tone="cream" radius="xl" shadow="hard" clip className="relative">
  <Section padding="md" divider="bottom" className="relative bg-(--nb-blue)">
    <div className="absolute -right-5 -top-5 size-16 rounded-full bg-(--nb-yellow)" />
    <div className="absolute -left-8 bottom-5 h-5 w-36 -rotate-12 bg-(--nb-primary)" />
  </Section>
  <Section padding="md">Decorative children are clipped by the surface.</Section>
</Surface>

{/* without clip, the same children can bleed through rounded corners */}
<Surface tone="cream" radius="xl" shadow="hard" className="relative">
  <Section padding="md" divider="bottom" className="relative bg-(--nb-blue)">
    <div className="absolute -right-5 -top-5 size-16 rounded-full bg-(--nb-yellow)" />
    <div className="absolute -left-8 bottom-5 h-5 w-36 -rotate-12 bg-(--nb-primary)" />
  </Section>
  <Section padding="md">Decorative children can spill outside the surface.</Section>
</Surface>`;

const displayHeadingProps = {
  size: 'sm' as const,
  underline: 'bar' as const,
  underlineGap: 'xs' as const,
  className: 'inline-flex flex-col items-start',
  style: { '--nb-underline-width': '75%' } as React.CSSProperties,
};

function ClipDemoHeader({ label }: { label: string }) {
  return (
    <Section
      padding="md"
      divider="bottom"
      className="relative min-h-32 bg-(--nb-blue) text-white"
    >
      <div
        className="absolute -right-5 -top-5 size-16 rounded-full border-2 border-(--nb-border) bg-(--nb-yellow)"
        aria-hidden="true"
      />
      <div
        className="absolute -left-8 bottom-5 h-5 w-36 -rotate-12 border-2 border-(--nb-border) bg-(--nb-primary)"
        aria-hidden="true"
      />
      <Text size="2xl" weight="black" leading="tight" className="relative z-10">
        {label}
      </Text>
    </Section>
  );
}

export function SurfaceAndSectionPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <p className="eyebrow">Composition</p>
        <h1>Surface & Section</h1>
        <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
          <code className="font-mono">Surface</code> creates the outer brutalist
          container. <code className="font-mono">Section</code> creates internal
          regions. Together they replace repeated card shell markup with a
          clear, intentional structure.
        </p>
      </header>

      <section id="relationship" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          How they relate
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border-3 border-(--nb-border) bg-(--nb-yellow) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <h3 className="font-heading text-xl font-black uppercase">Surface</h3>
            <p className="mt-2 text-sm font-medium">
              The outer container. Owns the tone, radius, shadow, and border of
              the whole card shell. Use <code className="font-mono">clip</code> to
              keep inner regions within the surface radius.
            </p>
          </div>
          <div className="border-3 border-(--nb-border) bg-(--nb-mint) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <h3 className="font-heading text-xl font-black uppercase">Section</h3>
            <p className="mt-2 text-sm font-medium">
              An inner region. Owns its own padding and optional divider
              borders. Use <code className="font-mono">divider="top"</code> or
              <code className="font-mono">divider="bottom"</code> to structure the
              panel into clear zones. Use
              <code className="font-mono">divider="block"</code> for top + bottom
              and <code className="font-mono">divider="inline"</code> for left +
              right.
            </p>
          </div>
        </div>
      </section>

      <section id="basic-panel" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Basic panel
        </h2>
        <p className="mb-6 text-base font-medium">
          A surface with a header region and a body region — the minimal card
          shell.
        </p>

        <DocsExample code={basicPanelCode}>
          <Surface
            tone="cream"
            radius="xl"
            shadow="hard"
            border="strong"
            clip
            className="w-full max-w-lg"
          >
            <Section padding="lg" divider="bottom">
              <Display {...displayHeadingProps}>Profile</Display>
            </Section>
            <Section padding="lg">
              <Text>Chunky card shell with clear regions.</Text>
            </Section>
          </Surface>
        </DocsExample>
      </section>

      <section id="header-body-footer" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Header / body / footer
        </h2>
        <p className="mb-6 text-base font-medium">
          Three sections with a top and bottom divider create a structured panel
          layout. The footer uses
          <code className="font-mono">layout="between"</code>
          to push its two children to opposite ends.
        </p>

        <DocsExample code={headerBodyFooterCode}>
          <Surface
            tone="yellow"
            radius="xl"
            border="thick"
            shadow="hard"
            clip
            className="w-full max-w-lg"
          >
            <Section padding="lg" divider="bottom">
              <Cluster gap="sm" align="center" justify="between">
                <Display
                  size="sm"
                  underline="bar"
                  underlineGap="xs"
                  className="inline-flex flex-col items-start"
                  style={{ '--nb-underline-width': '45%' } as React.CSSProperties}
                >
                  Campaign draft
                </Display>
                <Chip tone="pink">Draft</Chip>
              </Cluster>
            </Section>

            <Section padding="lg">
              <Stack gap="md">
                <Text>
                  Body content lives here. Stack controls the vertical rhythm
                  inside the section.
                </Text>
                <Cluster gap="xs">
                  <Chip tone="mint">React</Chip>
                  <Chip tone="lavender">Hooks</Chip>
                </Cluster>
              </Stack>
            </Section>

            <Section padding="lg" divider="top" layout="between" align="center">
              <Text tone="muted">Last saved 2m ago</Text>
              <Button type="button" tone="black" size="sm">
                Publish
              </Button>
            </Section>
          </Surface>
        </DocsExample>
      </section>

      <section id="clip" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          The clip input
        </h2>
        <p className="mb-5 text-base font-medium">
          When a surface has a non-zero radius, add
          <code className="font-mono">clip</code> so that section backgrounds,
          dividers, and other inner content respect the outer rounded corners.
          Without <code className="font-mono">clip</code>, inner backgrounds bleed
          through the corners.
        </p>
        <DocsExample code={clipCode}>
          <div className="grid w-full gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-2 font-mono text-xs font-bold uppercase opacity-70">
                With clip
              </p>
              <Surface
                tone="pink"
                radius="xl"
                shadow="hard"
                border="strong"
                clip
                className="relative w-full"
              >
                <ClipDemoHeader label="With clip" />
                <Section padding="md">
                  <Text size="sm">
                    The pushed-out dot and stripe are cut at the rounded edge.
                  </Text>
                </Section>
              </Surface>
            </div>
            <div>
              <p className="mb-2 font-mono text-xs font-bold uppercase opacity-70">
                Without clip
              </p>
              <Surface
                tone="lavender"
                radius="xl"
                shadow="hard"
                border="strong"
                className="relative w-full"
              >
                <ClipDemoHeader label="Without clip" />
                <Section padding="md">
                  <Text size="sm">
                    The same inner children spill past the surface radius.
                  </Text>
                </Section>
              </Surface>
            </div>
          </div>
        </DocsExample>
      </section>

      <section id="when-to-use" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          When to use Surface & Section
        </h2>
        <div className="border-4 border-(--nb-border) bg-black text-white shadow-[6px_6px_0_0_var(--nb-shadow)]">
          <div className="border-b border-white/20 px-5 py-3 font-mono text-xs font-bold tracking-widest text-white/60 uppercase">
            Reach for this pattern when…
          </div>
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

      <section id="api" className="scroll-mt-32">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Key inputs
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {keyInputs.map((input) => (
            <div
              key={`${input.name}-${input.primitive}`}
              className="border-3 border-(--nb-border) bg-white p-4 shadow-[3px_3px_0_0_var(--nb-shadow)]"
            >
              <div className="flex items-center gap-2">
                <code className="font-mono text-sm font-black">{input.name}</code>
                <span
                  className="border border-(--nb-border) px-1.5 py-0.5 font-mono text-xs font-bold uppercase"
                  style={{
                    background:
                      input.primitive === 'Surface' ? 'var(--nb-yellow)' : 'var(--nb-mint)',
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
          <Link className="underline" to="/components/surface">
            Surface
          </Link>{' '}
          and{' '}
          <Link className="underline" to="/components/section">
            Section
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
