import { Link } from 'react-router-dom';

import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

import { PodcastCard } from './components/PodcastCard';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/apps/docs/src/pages/recipes/components/PodcastCard.tsx';

const primitives = [
  {
    name: 'Surface',
    path: '/components/surface',
    role: 'bordered card shell and audio player panels',
  },
  {
    name: 'Stack',
    path: '/components/stack',
    role: 'vertical rhythm for metadata and host sections',
  },
  {
    name: 'Cluster',
    path: '/components/cluster',
    role: 'inline metadata chips and host identity row',
  },
  {
    name: 'Section',
    path: '/components/section',
    role: 'padded content regions with borders',
  },
  {
    name: 'Display',
    path: '/components/display',
    role: 'episode title mega heading',
  },
  {
    name: 'Text',
    path: '/components/text',
    role: 'description, host name, role, and status copy',
  },
  {
    name: 'Chip',
    path: '/components/chip',
    role: 'podcast badge, episode number, and metadata tags',
  },
  {
    name: 'StatusDot',
    path: '/components/status-dot',
    role: 'live "on air" indicator next to the host',
  },
  {
    name: 'Icon',
    path: '/components/icon',
    role: 'microphone, clock, sparkle, user, bookmark, and arrow icons',
  },
  {
    name: 'Button',
    path: '/components/button',
    role: 'listen now call to action',
  },
  {
    name: 'ButtonTrailingIcon',
    path: '/components/button',
    role: 'CTA arrow affordance inside the button',
  },
  {
    name: 'IconButton',
    path: '/components/icon-button',
    role: 'bookmark / save episode action',
  },
  {
    name: 'Sticker',
    path: '/components/sticker',
    role: 'overflowing star and splat decorations',
  },
  {
    name: 'StickerFace',
    path: '/components/sticker',
    role: 'smiling face inside the star sticker',
  },
  {
    name: 'Halftone',
    path: '/components/halftone',
    role: 'dotted halftone flourish in the host row',
  },
] as const;

const layoutBreakdown = [
  {
    primitive: 'Surface',
    description:
      'Outer card shell and inner audio player panel — cream tone, hard shadow, clip.',
  },
  {
    primitive: 'Section',
    description:
      'Each distinct content band (header, brand, episode badge, title, meta, host, player, footer) is a padded section. The host and footer sections use top dividers.',
  },
  {
    primitive: 'Stack',
    description:
      'Vertical rhythm for host identity (name, role, on-air status).',
  },
  {
    primitive: 'Cluster',
    description:
      'Inline metadata chips, host identity row, and footer action row.',
  },
  { primitive: 'Display', description: 'Episode title mega heading.' },
  {
    primitive: 'Chip',
    description:
      'Podcast badge, episode number, and metadata tags (duration, new, category).',
  },
  {
    primitive: 'Button',
    description: 'Listen Now primary call to action.',
  },
  {
    primitive: 'Sticker',
    description: 'Overflowing star and splat decorative elements.',
  },
  {
    primitive: 'Halftone',
    description: 'Dotted halftone flourish behind the host row.',
  },
] as const;

const importCode = `import {
  Button,
  ButtonTrailingIcon,
  Chip,
  ChipGroup,
  Cluster,
  Display,
  Halftone,
  Icon,
  IconButton,
  Section,
  Stack,
  StatusDot,
  Sticker,
  StickerFace,
  Surface,
  Text,
} from 'neobrutalism-ui-react';`;

const skeletonCode = `<Surface clip tone="cream" border="strong" shadow="hard" radius="xl">
  <Section padding="lg">
    <Cluster>
      ...
    </Cluster>
  </Section>

  <Section padding="lg">
    <Stack>
      ...
    </Stack>
  </Section>

  <Section divider="top" padding="lg">
    <Cluster>
      ...
    </Cluster>
  </Section>

  <Section padding="lg">
    <Cluster>
      ...
    </Cluster>
  </Section>
</Surface>`;

const templateCode = `<Cluster justify="center" padding="lg" style={stageStyle}>
  <Surface clip tone="cream" border="strong" shadow="hard" radius="xl">
    {/* Header: podcast chip + menu */}
    <Section padding="lg">
      <Cluster gap="md" align="center" justify="between">
        <Chip tone="pink" radius="md" className="uppercase font-bold"
              icon="/podcast-card/microphone.svg">
          Podcast
        </Chip>
        <button aria-label="Episode menu">•••</button>
      </Cluster>
    </Section>

    {/* Brand row */}
    <Section padding="lg">
      <Cluster gap="md" align="center">
        <img src="/podcast-card/bfm-logo.svg" alt="Build Loud FM logo" />
        <Text weight="extrabold">Build Loud FM</Text>
      </Cluster>
    </Section>

    {/* Episode badge */}
    <Section padding="lg">
      <Chip tone="yellow" radius="md" className="uppercase font-bold">
        EP 42
      </Chip>
    </Section>

    {/* Hero title */}
    <Section padding="lg">
      <Display className="uppercase">
        Design<br />Systems<br />That Scale
      </Display>
    </Section>

    {/* Metadata chips */}
    <Section padding="lg">
      <ChipGroup gap="sm" radius="sm" shadow="none" transform="uppercase">
        <Chip tone="mint" className="text-xs" icon="/podcast-card/clock.svg">
          45 MIN
        </Chip>
        <Chip tone="lavender" className="text-xs" icon="/podcast-card/sparkle.svg">
          NEW
        </Chip>
        <Chip tone="pink" className="text-xs" icon="/podcast-card/user.svg">
          UX
        </Chip>
      </ChipGroup>
    </Section>

    {/* Description */}
    <Section padding="lg">
      <Text size="md" weight="medium" tone="muted">
        Practical strategies for building design systems that grow with your product.
      </Text>
    </Section>

    {/* Host section */}
    <Section divider="top" padding="lg">
      <Cluster gap="lg" align="center">
        <img src="/podcast-card/avatar.png" alt="Rahmat Ashari"
             className="h-16 w-16 rounded-full" />
        <Stack gap="xs">
          <Text size="lg" weight="bold">Rahmat Ashari</Text>
          <Text size="sm" tone="muted">Host</Text>
          <span className="flex items-center gap-1.5">
            <StatusDot state="online" />
            <Text size="xs" weight="bold" className="uppercase">On Air</Text>
          </span>
        </Stack>
      </Cluster>
      <Halftone shape="rectangle" rows={3} columns={13}
                size={8} gapX={28} gapY={27}
                className="absolute top-6 left-6 -z-10" />
    </Section>

    {/* Audio player (waveform asset) */}
    <Section padding="lg">
      <img src="/podcast-card/timeline.png" alt="Episode player" className="w-full" />
    </Section>

    {/* Footer actions */}
    <Section padding="lg">
      <Cluster gap="md" justify="between">
        <Button tone="lavender" size="xl" radius="md" className="flex-1">
          <Text size="3xl" weight="black" transform="uppercase" tracking="wide">
            Listen Now
          </Text>
          <ButtonTrailingIcon shape="circle" tone="inverse" size="md"
                              icon="/podcast-card/arrow.svg" />
        </Button>
        <IconButton shape="square" size="xl" radius="md" tone="background"
                    icon="/podcast-card/bookmark.svg" aria-label="Save episode" />
      </Cluster>
    </Section>

    {/* Overflowing decorations */}
    <Sticker shape="star" tone="lavender" rotate={10}>
      <StickerFace />
    </Sticker>
    <Sticker shape="splat" tone="pink" decorative rotate={-12} />
  </Surface>
</Cluster>`;

export function PodcastCardRecipePage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Recipe</p>
          <h1>Podcast Card</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A loud podcast episode card composing surface, display, chip, media
            item, icon, and button primitives into a reusable audio-content
            layout. Demonstrates that the same primitive building blocks compose
            across media types — travel, jobs, and now audio.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--pink">
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
        <PodcastCard />
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
                className="inline-block size-2 border-2 border-(--nb-border) bg-(--nb-pink)"
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
                style={{ color: 'var(--nb-pink)' }}
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
