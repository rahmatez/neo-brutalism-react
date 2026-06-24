import { Link } from 'react-router-dom';

import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

import { OpenToWorkCard } from './components/OpenToWorkCard';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/apps/docs/src/pages/recipes/components/OpenToWorkCard.tsx';

const primitives = [
  { name: 'Surface', path: '/components/surface', role: 'bordered card shell' },
  {
    name: 'Split',
    path: '/components/split',
    role: 'portrait/identity and socials/CTA two-column layouts',
  },
  {
    name: 'Stack',
    path: '/components/stack',
    role: 'vertical rhythm for identity and skills/bio',
  },
  {
    name: 'Cluster',
    path: '/components/cluster',
    role: 'wrapping social icon button row',
  },
  {
    name: 'Section',
    path: '/components/section',
    role: 'padded skills/bio and divided footer regions',
  },
  {
    name: 'MediaFrame',
    path: '/components/media-frame',
    role: 'pink portrait frame with object-fit cover',
  },
  {
    name: 'Display',
    path: '/components/display',
    role: 'huge uppercase name heading',
  },
  {
    name: 'Text',
    path: '/components/text',
    role: 'role label, bio, and CTA label',
  },
  {
    name: 'Chip',
    path: '/components/chip',
    role: 'open-to-work status and skill tags',
  },
  {
    name: 'IconButton',
    path: '/components/icon-button',
    role: 'circular social action buttons',
  },
  {
    name: 'Button',
    path: '/components/button',
    role: 'view profile call to action',
  },
  {
    name: 'ButtonTrailingIcon',
    path: '/components/button',
    role: 'circular arrow affordance inside the CTA',
  },
  {
    name: 'Sticker',
    path: '/components/sticker',
    role: 'overflowing star decoration with a smiling face',
  },
] as const;

const layoutBreakdown = [
  {
    primitive: 'Surface',
    description:
      'Outer card shell — cream tone, xl radius, hard shadow, and clip.',
  },
  {
    primitive: 'Split',
    description:
      'Two-column layout: portrait frame on the left, identity stack on the right. Also used in the footer for socials vs CTA.',
  },
  {
    primitive: 'Stack',
    description:
      'Vertical rhythm for name, role label, and skill/bio content.',
  },
  {
    primitive: 'Cluster',
    description: 'Wrapping row for social icon buttons.',
  },
  {
    primitive: 'Section',
    description: 'Padded skill/bio region and divided footer region.',
  },
  {
    primitive: 'MediaFrame',
    description: 'Pink portrait frame with object-fit cover ratio.',
  },
  { primitive: 'Display', description: 'Large uppercase name heading.' },
  {
    primitive: 'Chip',
    description: 'Open-to-work status badge and skill tags.',
  },
  {
    primitive: 'Button',
    description: 'View Profile primary call to action.',
  },
  {
    primitive: 'Sticker',
    description: 'Overflowing star decoration with a smiling face.',
  },
] as const;

const importCode = `import {
  Button,
  ButtonTrailingIcon,
  Chip,
  ChipGroup,
  Cluster,
  Display,
  IconButton,
  MediaFrame,
  Section,
  Split,
  Stack,
  StatusDot,
  Sticker,
  StickerFace,
  Surface,
  Text,
  Typography,
} from 'neobrutalism-ui-react';`;

const skeletonCode = `<Surface tone="cream" border="strong" shadow="hard" radius="xl">
  <Split ratio="1:1" gap="xl" padding="lg" collapse="sm" align="start">
    <MediaFrame ratio="3/4">
      ...
    </MediaFrame>

    <Stack>
      ...
    </Stack>
  </Split>

  <Section padding="lg">
    <Stack>
      ...
    </Stack>
  </Section>

  <Section divider="top" padding="lg">
    <Split ratio="1:1" gap="lg" collapse="sm" align="center">
      ...
    </Split>
  </Section>
</Surface>`;

const templateCode = `<Cluster justify="center" padding="xl" style={stageStyle}>
  <Surface tone="cream" border="strong" shadow="hard" radius="xl"
           className="relative max-w-[860px]">
    {/* Decorative star sticker overflowing the corner */}
    <Sticker shape="star" tone="pink" decorative rotate={10}
             className="absolute -top-7 -right-4 z-20">
      <StickerFace />
    </Sticker>

    {/* Top: portrait + identity */}
    <Split ratio="1:1" gap="xl" padding="lg" collapse="sm" align="start">
      <MediaFrame ratio="3/4" tone="pink" border="strong" radius="lg" shadow="none">
        <img src="https://github.com/rahmatez.png" alt="Portrait of Rahmat Ashari" />
      </MediaFrame>

      <Stack gap="none" align="start">
        <Chip tone="mint" radius="md" className="font-bold uppercase">
          <StatusDot state="online" />
          Open to work
        </Chip>

        <Display size="lg" fluid className="mt-8 mb-0 uppercase whitespace-nowrap">
          Rahmat<br />Ashari
        </Display>

        <Stack gap="xs" align="start">
          <Text size="2xl" weight="bold" underline="bar"
                underlineGap="xs" underlineWidth="md"
                style={{ '--nb-underline-color': 'var(--otw-pink)' }}>
            Software Engineer
          </Text>
        </Stack>

        {/* Decorative dotted grid (docs-local CSS, radial-gradient dots) */}
        <span className="otw-dots block" aria-hidden="true" />
      </Stack>
    </Split>

    {/* Skills + bio */}
    <Section padding="lg">
      <Stack gap="lg" align="start">
        <ChipGroup gap="sm" radius="sm" shadow="hard"
                   transform="uppercase" tracking="wide">
          <Typography font="display">
            <Chip tone="pink">React</Chip>
          </Typography>
          <Typography font="display">
            <Chip tone="blue">TypeScript</Chip>
          </Typography>
          <Typography font="display">
            <Chip tone="lavender">Node.js</Chip>
          </Typography>
        </ChipGroup>

        <Text size="lg" weight="medium" measure="md">
          Building loud, accessible, and expressive React interfaces with sharp developer experience.
        </Text>
      </Stack>
    </Section>

    {/* Footer: socials + CTA */}
    <Section divider="top" padding="lg">
      <Split ratio="1:1" gap="lg" collapse="sm" align="center">
        <Cluster gap="sm" align="center">
          <IconButton shape="circle" size="lg" shadow="none" tone="mint"
                      icon="/open-to-work/linkedin-icon.png"
                      aria-label="Rahmat Ashari on GitHub" />
          <IconButton shape="circle" size="lg" shadow="none" tone="lavender"
                      icon="/open-to-work/twitter-icon.png"
                      aria-label="Neo Brutalism React repository" />
          <IconButton shape="circle" size="lg" shadow="none" tone="pink"
                      icon="/open-to-work/globe-icon.png"
                      aria-label="Rahmat Ashari documentation site" />
          <IconButton shape="circle" size="lg" shadow="none" tone="yellow"
                      icon="/open-to-work/email-icon.png"
                      aria-label="Email Rahmat Ashari" />
        </Cluster>

        <Button tone="yellow" size="xl" radius="md" fullWidth className="sm:w-auto">
          <Text size="xl" weight="black" transform="uppercase" tracking="wide">
            View Profile
          </Text>
          <ButtonTrailingIcon shape="circle" tone="inverse" size="md"
                              icon="/open-to-work/arrow-icon.svg" />
        </Button>
      </Split>
    </Section>
  </Surface>
</Cluster>`;

export function OpenToWorkCardRecipePage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Recipe</p>
          <h1>Open to Work Card</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A loud profile card composition for portfolios, hiring pages, and
            creator profiles. Composes surface, media frame, chips, icon
            actions, button, and decorative sticker primitives into a real
            personal profile card — proof that neo-brutalism builds product UI,
            not just isolated demos.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">{primitives.length}</span>
            <span className="nb-stat-tile__label">primitives</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">100%</span>
            <span className="nb-stat-tile__label">Composed</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview" className="overflow-visible pt-10">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <OpenToWorkCard />
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
                className="inline-block size-2 border-2 border-(--nb-border) bg-(--nb-mint)"
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
                style={{ color: 'var(--nb-mint)' }}
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
