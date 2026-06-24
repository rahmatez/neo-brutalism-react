import { Link } from 'react-router-dom';

import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

import { TravelCard } from './components/TravelCard';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/apps/docs/src/pages/recipes/components/TravelCard.tsx';

const primitives = [
  { name: 'Surface', path: '/components/surface', role: 'bordered card shell' },
  { name: 'MediaFrame', path: '/components/media-frame', role: 'hero banner image' },
  { name: 'Sticker', path: '/components/sticker', role: '4D/3N highlight burst' },
  { name: 'Display', path: '/components/display', role: 'destination mega title' },
  { name: 'Stack', path: '/components/stack', role: 'vertical rhythm for card regions' },
  { name: 'Split', path: '/components/split', role: 'responsive main-and-aside layout' },
  { name: 'Section', path: '/components/section', role: 'section border and padding' },
  { name: 'Text', path: '/components/text', role: 'body copy and brand text' },
  { name: 'Chip', path: '/components/chip', role: 'flight / hotel / top-pick tags' },
  { name: 'Icon', path: '/components/icon', role: 'decorative chip and button icons' },
  { name: 'Callout', path: '/components/callout', role: 'price callout' },
  { name: 'Cluster', path: '/components/cluster', role: 'logo row and wrapping feature group' },
  { name: 'MediaItem', path: '/components/media-item', role: 'icon + label trip features' },
  { name: 'Button', path: '/components/button', role: 'book trip call to action' },
  {
    name: 'ButtonTrailingIcon',
    path: '/components/button',
    role: 'button icon treatment',
  },
] as const;

const layoutBreakdown = [
  {
    primitive: 'Surface',
    description:
      'Outer card shell — owns tone, radius, shadow, border, and clip.',
  },
  {
    primitive: 'MediaFrame',
    description: 'Hero banner image filling the full card width at the top.',
  },
  {
    primitive: 'Sticker',
    description: '4D / 3N highlight burst floating over the hero image.',
  },
  {
    primitive: 'Split',
    description:
      'Two-column responsive layout separating headline/description from tags/price.',
  },
  {
    primitive: 'Stack',
    description:
      'Vertical rhythm within the headline column and the tag/price column.',
  },
  {
    primitive: 'Cluster',
    description: 'Logo row and wrapping chip group for trip features.',
  },
  {
    primitive: 'Section',
    description: 'Feature strip at the bottom — padded with a top divider.',
  },
  {
    primitive: 'Callout',
    description: 'Price highlight — large, loud, and offset-shadowed.',
  },
  {
    primitive: 'Chip',
    description: 'Flight, hotel, and top-pick metadata tags.',
  },
  {
    primitive: 'Button',
    description: 'Book Trip call-to-action at the bottom.',
  },
] as const;

const importCode = `import {
  Button,
  ButtonTrailingIcon,
  Callout,
  Chip,
  ChipGroup,
  Cluster,
  Display,
  Icon,
  MediaFrame,
  MediaItem,
  MediaItemTitle,
  Section,
  Split,
  Stack,
  Sticker,
  Surface,
  Text,
} from 'neobrutalism-ui-react';`;

const skeletonCode = `<Surface clip tone="cream" border="strong" shadow="hard" radius="xl">
  <MediaFrame ratio="21/9">
    ...
  </MediaFrame>

  <Split ratio="2:1" gap="xl" padding="lg" collapse="md" separator="solid">
    <Stack>
      ...
    </Stack>

    <Stack>
      ...
    </Stack>
  </Split>

  <Section divider="top" padding="lg">
    <Split ratio="2:1" gap="lg" collapse="md">
      ...
    </Split>
  </Section>
</Surface>`;

const templateCode = `<Cluster justify="center" padding="xl" style={stageStyle}>
  <Surface clip tone="cream" border="strong" shadow="hard" radius="xl">
    {/* Hero banner with floating sticker */}
    <div className="relative">
      <Sticker
        shape="burst"
        tone="mint"
        rotate={-12}
        aria-label="4 days, 3 nights"
        className="absolute top-2 left-2 z-20"
      >
        4D<br />/ 3N
      </Sticker>

      <MediaFrame ratio="21/9" radius="none" shadow="none" border="none">
        <img src="/tokyo-city-escape/hero-illustration.png" alt="Illustrated Tokyo" />
      </MediaFrame>
    </div>

    {/* Headline + trip meta */}
    <Split ratio="2:1" gap="xl" padding="lg" collapse="md" separator="solid">
      <Stack gap="lg">
        <Cluster gap="md" align="center">
          <img src="/tokyo-city-escape/roam-go-logo.svg" alt="Roam & Go logo" className="w-16" />
          <Text size="xl" weight="extrabold">Roam &amp; Go</Text>
        </Cluster>
        <Display className="uppercase">Tokyo<br />City Escape</Display>
        <Text size="md" weight="medium" tone="muted" measure="md">
          Explore iconic neighborhoods, savor local flavors…
        </Text>
      </Stack>

      <Stack gap="lg" align="start">
        <ChipGroup direction="vertical" gap="sm" align="start"
                   radius="sm" shadow="none" transform="uppercase" tracking="wide">
          <Chip tone="mint">
            <Icon src="/tokyo-city-escape/nb-plane-fill.svg" size="sm" decorative />
            Flight included
          </Chip>
          <Chip tone="lavender">Hotel</Chip>
          <Chip tone="pink">Top pick</Chip>
        </ChipGroup>
        <Callout tone="yellow" size="xl" shadow="hard">$799</Callout>
      </Stack>
    </Split>

    {/* Features + CTA */}
    <Section divider="top" padding="lg">
      <Split ratio="2:1" gap="lg" collapse="md">
        <Cluster gap="lg" align="center" separator="dashed">
          <MediaItem size="xs" icon="/tokyo-city-escape/central-locations.png">
            <MediaItemTitle>Central<br />Locations</MediaItemTitle>
          </MediaItem>
          <MediaItem size="xs" icon="/tokyo-city-escape/guided-experiences.png">
            <MediaItemTitle>Guided<br />Experiences</MediaItemTitle>
          </MediaItem>
          <MediaItem size="xs" icon="/tokyo-city-escape/24-7-support.png">
            <MediaItemTitle>24/7<br />Support</MediaItemTitle>
          </MediaItem>
        </Cluster>

        <Button tone="lavender" size="xl" radius="md">
          <Text size="xl" weight="black" transform="uppercase" tracking="wide">
            Book Trip
          </Text>
          <ButtonTrailingIcon shape="circle" tone="inverse" size="md">
            <Icon src="/tokyo-city-escape/nb-arrow-right.svg" size="sm" decorative />
          </ButtonTrailingIcon>
        </Button>
      </Split>
    </Section>
  </Surface>
</Cluster>`;

export function TravelCardRecipePage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Recipe</p>
          <h1>Travel Card</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A bold travel-package card composing the library&apos;s media, sticker,
            chip, and display primitives into a single brutalist promo. Hero
            banner, trip highlights, price, and a call to action — responsive
            down to mobile.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">{primitives.length}</span>
            <span className="nb-stat-tile__label">primitives</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">100%</span>
            <span className="nb-stat-tile__label">Composed</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview" className="overflow-visible">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <TravelCard />
      </section>

      <section id="code">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Code
        </h2>
        <p className="mb-4 text-sm font-medium">
          Structural template. See the{' '}
          <a className="underline" href={SOURCE} target="_blank" rel="noreferrer">
            example source
          </a>{' '}
          for the full implementation.
        </p>
        <DocsCodeBlock className="mb-5 block" title="Imports" code={importCode} />
        <DocsCodeBlock
          className="mb-5 block"
          title="Composition skeleton"
          code={skeletonCode}
        />
        <DocsCodeBlock title="Template" code={templateCode} />
      </section>

      <section id="primitives">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Primitives used
        </h2>
        <ul className="space-y-2 text-base font-medium">
          {primitives.map((item) => (
            <li key={`${item.path}-${item.name}`} className="flex items-center gap-2">
              <span
                className="inline-block size-2 border-2 border-(--nb-border) bg-(--nb-yellow)"
                aria-hidden="true"
              />
              <Link className="underline" to={item.path}>
                {item.name}
              </Link>
              <span className="text-sm font-normal opacity-80">— {item.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="layout-breakdown">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Layout breakdown
        </h2>
        <div className="border-4 border-(--nb-border) bg-black text-white shadow-[6px_6px_0_0_var(--nb-shadow)]">
          <div className="border-b border-white/20 px-5 py-3 font-mono text-xs font-bold tracking-widest text-white/60 uppercase">
            How it is composed
          </div>
          {layoutBreakdown.map((step) => (
            <div
              key={step.primitive}
              className="flex flex-wrap gap-x-6 gap-y-1 border-b border-white/10 px-5 py-3 last:border-none"
            >
              <code
                className="shrink-0 font-mono text-sm font-black"
                style={{ color: 'var(--nb-yellow)' }}
              >
                {step.primitive}
              </code>
              <span className="text-sm font-medium">{step.description}</span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
