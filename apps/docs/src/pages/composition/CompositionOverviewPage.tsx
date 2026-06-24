import { Link } from 'react-router-dom';
import {
  Button,
  Chip,
  Cluster,
  Section,
  Stack,
  Surface,
  Text,
  Title,
} from 'neobrutalism-ui-react';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { LIBRARY_VERSION_LABEL } from '@/docs/site';

const primitiveMap = [
  { name: 'Surface', role: 'The brutalist panel', color: 'var(--nb-yellow)', path: '/components/surface' },
  { name: 'Section', role: 'Regions inside a panel', color: 'var(--nb-mint)', path: '/components/section' },
  { name: 'Stack', role: 'Vertical composition', color: 'var(--nb-pink)', path: '/components/stack' },
  { name: 'Cluster', role: 'Horizontal / wrapping groups', color: 'var(--nb-lavender)', path: '/components/cluster' },
  { name: 'Split', role: 'Main + aside layout', color: 'var(--nb-cream)', path: '/components/split' },
  { name: 'Button', role: 'Action primitive', color: '#ffffff', path: '/components/button' },
  { name: 'Chip', role: 'Small metadata primitive', color: 'var(--nb-yellow)', path: '/components/chip' },
  { name: 'Text', role: 'Inline / block copy', color: 'var(--nb-mint)', path: '/components/text' },
  { name: 'Title', role: 'Section heading', color: 'var(--nb-pink)', path: '/components/title' },
  { name: 'Display', role: 'Big loud heading', color: 'var(--nb-lavender)', path: '/components/display' },
];

const decisionGuide = [
  { need: 'Need a panel?', primitive: 'Surface', color: 'var(--nb-yellow)' },
  { need: 'Need header / body / footer inside a panel?', primitive: 'Section', color: 'var(--nb-mint)' },
  { need: 'Need vertical spacing?', primitive: 'Stack', color: 'var(--nb-pink)' },
  { need: 'Need horizontal or wrapping items?', primitive: 'Cluster', color: 'var(--nb-lavender)' },
  { need: 'Need two columns or main/aside?', primitive: 'Split', color: 'var(--nb-cream)' },
  { need: 'Need an action?', primitive: 'Button or IconButton', color: '#ffffff' },
  { need: 'Need metadata?', primitive: 'Chip or Badge', color: 'var(--nb-yellow)' },
  { need: 'Need emphasis text?', primitive: 'Title, Display, or Text', color: 'var(--nb-mint)' },
  { need: 'Need status?', primitive: 'StatusDot, Badge, or Callout', color: 'var(--nb-pink)' },
];

const apiLanguage = [
  { name: 'tone', description: 'Visual intent / color theme' },
  { name: 'size', description: 'Component scale' },
  { name: 'radius', description: 'Corner shape' },
  { name: 'shadow', description: 'Brutalist offset depth' },
  { name: 'border', description: 'Outline strength' },
  { name: 'padding', description: 'Internal space' },
  { name: 'gap', description: 'Child spacing' },
  { name: 'align', description: 'Cross-axis alignment' },
  { name: 'justify', description: 'Main-axis alignment' },
  { name: 'collapse', description: 'Responsive layout behavior' },
  { name: 'clip', description: 'Keep inner regions inside the outer radius' },
  { name: 'divider', description: 'Border between regions — top, bottom, etc.' },
];

const launchPanelCode = `<Surface tone="cream" radius="xl" shadow="hard" border="strong" clip>
  <Section padding="lg" divider="bottom">
    <Cluster gap="sm" align="center" justify="between">
      <Title>Launch checklist</Title>
      <Chip tone="yellow">${LIBRARY_VERSION_LABEL}</Chip>
    </Cluster>
  </Section>

  <Section padding="lg">
    <Stack gap="md">
      <Text>
        Build a loud release panel using composition primitives
        instead of class-heavy wrappers.
      </Text>

      <Cluster gap="xs">
        <Chip tone="yellow">Surface</Chip>
        <Chip tone="pink">Section</Chip>
        <Chip tone="mint">Stack</Chip>
        <Chip tone="lavender">Cluster</Chip>
      </Cluster>
    </Stack>
  </Section>

  <Section padding="lg" divider="top" layout="between" align="center">
    <Text tone="muted">Ready for release</Text>
    <Button tone="black">Ship it</Button>
  </Section>
</Surface>`;

const beforeCode = `<div
  className="rounded-2xl border-4 border-black
         bg-yellow-300 p-6
         shadow-[8px_8px_0_#000]"
>
  <div
    className="flex items-center justify-between
           border-b-4 border-black pb-4"
  >
    <h2>Launch card</h2>
    <span>${LIBRARY_VERSION_LABEL}</span>
  </div>

  <div className="py-4">
    <p>Lots of repeated class decisions.</p>
  </div>
</div>`;

const afterCode = `<Surface tone="yellow" radius="xl" shadow="hard" clip>
  <Section padding="lg" divider="bottom" layout="between" align="center">
    <Title>Launch card</Title>
    <Chip tone="pink">${LIBRARY_VERSION_LABEL}</Chip>
  </Section>

  <Section padding="lg">
    <Text>Same structure, clearer composition.</Text>
  </Section>
</Surface>`;

const customizationCode = `{/* Step 1: use public props first */}
<Surface tone="cream" radius="xl" shadow="hard">
  Token-driven surface
</Surface>

{/* Step 2: CSS variables for fine-grained control */}
<Surface
  tone="cream"
  style={{ '--nb-surface-bg': '#faf6f0' } as React.CSSProperties}
>
  Custom surface background
</Surface>

{/* Overrides are local — only this element is affected */}
<Surface
  style={{
    '--nb-shadow-offset-x': '12px',
    '--nb-shadow-offset-y': '12px',
  } as React.CSSProperties}
>
  Custom shadow offset
</Surface>`;

export function CompositionOverviewPage() {
  return (
    <article>
    <Stack gap="2xl">
      <Stack gap="sm" align="start" id="overview" className="relative scroll-mt-32">
        <p className="eyebrow">Composition</p>
        <h1>Build loud. Compose smart.</h1>
        <p className="max-w-3xl text-base font-medium sm:text-lg">
          {LIBRARY_VERSION_LABEL} introduces a composition system for building loud,
          token-driven, React-first brutalist UIs. Small primitives that lock
          together like LEGO — each primitive owns one job, and they compose to
          build anything.
        </p>
      </Stack>

      <Stack gap="md" id="mental-model" className="scroll-mt-32">
        <h2 data-docs-heading className="text-2xl font-bold">
          The mental model
        </h2>
        <p className="text-base font-medium">
          Every neo-brutalism UI starts with a surface. Regions inside that
          surface are sections. Content flows vertically in stacks and
          horizontally in clusters. Two-column layouts use split. Actions and
          metadata complete the picture.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {primitiveMap.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block border-3 border-(--nb-border) p-4 shadow-[4px_4px_0_0_var(--nb-shadow)]"
              style={{ background: item.color }}
            >
              <code className="font-mono text-sm font-black">{item.name}</code>
              <p className="mt-1 text-sm font-medium">{item.role}</p>
            </Link>
          ))}
        </div>
      </Stack>

      <Stack gap="md" id="decision-guide" className="scroll-mt-32">
        <h2 data-docs-heading className="text-2xl font-bold">
          Decision guide
        </h2>
        <div className="border-4 border-(--nb-border) bg-black text-white shadow-[6px_6px_0_0_var(--nb-shadow)]">
          <div className="border-b border-white/20 px-5 py-3 font-mono text-xs font-bold tracking-widest text-white/70 uppercase">
            Which primitive do I need?
          </div>
          {decisionGuide.map((entry) => (
            <div
              key={entry.need}
              className="flex flex-wrap gap-x-6 gap-y-1 border-b border-white/10 px-5 py-3 last:border-none"
            >
              <span className="shrink-0 font-mono text-xs text-white/50">{entry.need}</span>
              <span className="font-mono text-sm font-bold" style={{ color: entry.color }}>
                → {entry.primitive}
              </span>
            </div>
          ))}
        </div>
      </Stack>

      <Stack gap="md" id="example" className="scroll-mt-32">
        <h2 data-docs-heading className="text-2xl font-bold">
          Rendered example
        </h2>
        <p className="text-base font-medium">
          A complete panel built with composition primitives only — no class
          soup required.
        </p>

        <DocsExample code={launchPanelCode}>
          <Surface
            tone="cream"
            radius="xl"
            shadow="hard"
            border="strong"
            clip
            className="w-full max-w-xl"
          >
            <Section padding="lg" divider="bottom">
              <Cluster gap="sm" align="center" justify="between">
                <Title>Launch checklist</Title>
                <Chip tone="yellow">{LIBRARY_VERSION_LABEL}</Chip>
              </Cluster>
            </Section>

            <Section padding="lg">
              <Stack gap="md">
                <Text>
                  Build a loud release panel using composition primitives
                  instead of class-heavy wrappers.
                </Text>
                <Cluster gap="xs">
                  <Chip tone="yellow">Surface</Chip>
                  <Chip tone="pink">Section</Chip>
                  <Chip tone="mint">Stack</Chip>
                  <Chip tone="lavender">Cluster</Chip>
                </Cluster>
              </Stack>
            </Section>

            <Section padding="lg" divider="top" layout="between" align="center">
              <Text tone="muted">Ready for release</Text>
              <Button type="button" tone="black">
                Ship it
              </Button>
            </Section>
          </Surface>
        </DocsExample>
      </Stack>

      <Stack gap="md" id="before-after" className="w-full scroll-mt-32">
        <h2 data-docs-heading className="text-2xl font-bold">
          Before / after
        </h2>
        <p className="text-base font-medium">
          The same brutalist card — one written with raw Tailwind classes, one
          with composition primitives.
        </p>
        <Stack className="w-full" gap="2xl" align="start">
          <Stack gap="xs" className="w-full">
            <p className="font-mono text-xs font-bold uppercase opacity-70">
              Before — class soup
            </p>
            <DocsCodeBlock title="HTML" code={beforeCode} />
          </Stack>
          <Stack className="w-full" gap="xs">
            <p className="font-mono text-xs font-bold uppercase opacity-70">
              After — composition
            </p>
            <DocsCodeBlock title="JSX" code={afterCode} />
          </Stack>
        </Stack>
        <p className="text-base font-bold">Less class soup. More composition.</p>
      </Stack>

      <Stack gap="md" id="api-language" className="scroll-mt-32">
        <h2 data-docs-heading className="text-2xl font-bold">
          API language
        </h2>
        <p className="text-base font-medium">
          Every primitive in neo-brutalism speaks the same token vocabulary.
          Learn it once, use it everywhere.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {apiLanguage.map((token) => (
            <div
              key={token.name}
              className="border-3 border-(--nb-border) bg-white p-4 shadow-[3px_3px_0_0_var(--nb-shadow)]"
            >
              <code className="font-mono text-sm font-black">{token.name}</code>
              <p className="mt-1 text-sm font-medium text-black/70">{token.description}</p>
            </div>
          ))}
        </div>
      </Stack>

      <Stack gap="md" id="customization" className="scroll-mt-32">
        <h2 data-docs-heading className="text-2xl font-bold">
          Customization
        </h2>
        <p className="text-base font-medium">
          Use public props first. Reach for CSS custom properties when presets
          are not enough. Keep overrides local so they only affect the element
          and its descendants.
        </p>
        <DocsCodeBlock title="CSS variable override" code={customizationCode} />
      </Stack>

      <Stack gap="md" id="explore" className="scroll-mt-32">
        <h2 data-docs-heading className="text-2xl font-bold">
          Explore the system
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          <Link
            className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--yellow"
            to="/composition/surface-and-section"
          >
            <span className="nb-stat-tile__value">Surface & Section</span>
            <span className="nb-stat-tile__label">Panels and regions</span>
          </Link>
          <Link
            className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--mint"
            to="/composition/stack-and-cluster"
          >
            <span className="nb-stat-tile__value">Stack & Cluster</span>
            <span className="nb-stat-tile__label">Vertical and horizontal flow</span>
          </Link>
          <Link
            className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--pink"
            to="/composition/split-layouts"
          >
            <span className="nb-stat-tile__value">Split Layouts</span>
            <span className="nb-stat-tile__label">Main / aside patterns</span>
          </Link>
          <Link
            className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--lavender"
            to="/composition/common-patterns"
          >
            <span className="nb-stat-tile__value">Common Patterns</span>
            <span className="nb-stat-tile__label">Copy-pasteable recipes</span>
          </Link>
        </div>
      </Stack>
    </Stack>
    </article>
  );
}
