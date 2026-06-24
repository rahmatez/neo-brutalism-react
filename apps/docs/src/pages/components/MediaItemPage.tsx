import {
  MediaItem,
  Separator,
  Surface,
} from 'neobrutalism-ui-react';
import type { ComponentPropsWithoutRef, CSSProperties } from 'react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/media-item';

type MediaItemVariant = NonNullable<ComponentPropsWithoutRef<typeof MediaItem>['variant']>;
type MediaItemOrientation = NonNullable<ComponentPropsWithoutRef<typeof MediaItem>['orientation']>;
type MediaItemSize = NonNullable<ComponentPropsWithoutRef<typeof MediaItem>['size']>;
type MediaItemAlign = NonNullable<ComponentPropsWithoutRef<typeof MediaItem>['align']>;
type MediaItemTone = NonNullable<ComponentPropsWithoutRef<typeof MediaItem>['tone']>;

const importCode = `import { MediaItem, MediaItemTitle, Separator, Surface } from 'neobrutalism-ui-react';`;

const previewExampleCode = `<MediaItem
  variant="boxed"
  size="md"
  tone="lavender"
  icon="/tokyo-city-escape/nb-star-fill.svg"
  iconAlt="Star"
  title="Premium Access"
  description="Unlimited features"
/>`;

const defaultExampleCode = `<Surface border="strong" layout="stack" radius="sm" shadow="hard" clip>
  <div className="border-b-2 border-(--nb-border) bg-(--nb-accent) px-4 py-3 text-(--nb-accent-foreground)">
    <span className="font-heading text-2xl uppercase leading-none">Your Flight</span>
  </div>

  <div className="flex flex-col p-4">
    <MediaItem
      variant="plain"
      className="pb-3"
      style={{
        '--nb-media-item-icon-size': '2.5rem',
        '--nb-media-item-title-size': '2rem',
        '--nb-media-item-title-font-family': 'var(--font-heading)',
      }}
      icon="/tokyo-city-escape/nb-plane-fill.svg"
      iconAlt="Flight"
      title="NYC → CDG"
      description="Jun 14 · 22:15 → 12:45+1"
    />

    <div className="flex flex-col gap-2">
      <Separator variant="dashed" />

      <MediaItem
        variant="plain"
        icon="/podcast-card/bookmark.svg"
        iconAlt="Ticket"
        iconBackground="#ff6aa2"
        title="Seat 14A"
        description="Economy · Window"
      />

      <Separator />

      <MediaItem
        variant="plain"
        icon="/tokyo-city-escape/nb-hotel-fill.svg"
        iconAlt="Baggage"
        iconBackground="#dcc8ff"
        title="1 checked bag"
        description="23 kg max"
      />
    </div>
  </div>
</Surface>`;

const variantsExampleCode = `<!-- plain: no container, just layout -->
<MediaItem
  variant="plain"
  size="md"
  icon="/tokyo-city-escape/nb-star-fill.svg"
  iconAlt="Star"
  title="Premium Access"
  description="Unlimited features"
/>

<!-- boxed: border + offset shadow -->
<MediaItem
  variant="boxed"
  size="md"
  tone="yellow"
  icon="/tokyo-city-escape/nb-star-fill.svg"
  iconAlt="Star"
  title="Premium Access"
  description="Unlimited features"
/>

<!-- chip: fully-rounded pill -->
<MediaItem
  variant="chip"
  size="md"
  tone="yellow"
  icon="/tokyo-city-escape/nb-star-fill.svg"
  iconAlt="Star"
  title="Premium Access"
  description="Unlimited features"
/>`;

const orientationsExampleCode = `<MediaItem
  orientation="horizontal"
  variant="boxed"
  size="md"
  tone="lavender"
  icon="/podcast-card/microphone.svg"
  iconAlt="Camera"
  title="Travel Photos"
  description="128 shots"
/>

<MediaItem
  orientation="vertical"
  variant="boxed"
  size="md"
  tone="lavender"
  icon="/podcast-card/microphone.svg"
  iconAlt="Camera"
  title="Travel Photos"
  description="128 shots"
/>`;

const withDescriptionCode = `<!-- title only -->
<MediaItem
  variant="plain"
  size="md"
  icon="/podcast-card/bookmark.svg"
  iconAlt="Ticket"
  title="Boarding Pass"
/>

<!-- title + description -->
<MediaItem
  variant="plain"
  size="md"
  icon="/podcast-card/bookmark.svg"
  iconAlt="Ticket"
  title="Boarding Pass"
  description="Seat 14A · Economy"
/>`;

const sizesExampleCode = `<MediaItem
  variant="boxed"
  size="sm"
  tone="cream"
  icon="/tokyo-city-escape/nb-hotel-fill.svg"
  iconAlt="Baggage"
  title="SM — Checked Baggage"
  description="Up to 23kg included"
/>

<MediaItem
  variant="boxed"
  size="md"
  tone="cream"
  icon="/tokyo-city-escape/nb-hotel-fill.svg"
  iconAlt="Baggage"
  title="MD — Checked Baggage"
  description="Up to 23kg included"
/>

<MediaItem
  variant="boxed"
  size="lg"
  tone="cream"
  icon="/tokyo-city-escape/nb-hotel-fill.svg"
  iconAlt="Baggage"
  title="LG — Checked Baggage"
  description="Up to 23kg included"
/>`;

const alignmentExampleCode = `<!-- start (default) -->
<MediaItem
  variant="boxed"
  size="md"
  tone="yellow"
  align="start"
  icon="/podcast-card/user.svg"
  iconAlt="World"
  title="Global Network"
  description="140+ destinations"
/>

<!-- center -->
<MediaItem
  variant="boxed"
  size="md"
  tone="yellow"
  align="center"
  icon="/podcast-card/user.svg"
  iconAlt="World"
  title="Global Network"
  description="140+ destinations"
/>

<!-- between: stretches to full width -->
<MediaItem
  variant="boxed"
  size="md"
  tone="yellow"
  align="between"
  icon="/podcast-card/user.svg"
  iconAlt="World"
  title="Global Network"
  description="140+ destinations"
/>`;

const tonesExampleCode = `<MediaItem variant="boxed" size="md" tone="yellow" title="Yellow" icon="/tokyo-city-escape/nb-star-fill.svg" iconAlt="Star" />
<MediaItem variant="boxed" size="md" tone="mint" title="Mint" icon="/tokyo-city-escape/nb-star-fill.svg" iconAlt="Star" />
<MediaItem variant="boxed" size="md" tone="lavender" title="Lavender" icon="/tokyo-city-escape/nb-star-fill.svg" iconAlt="Star" />
<MediaItem variant="chip" size="md" tone="pink" title="Pink chip" icon="/podcast-card/bookmark.svg" iconAlt="Tag" />`;

const flightTitleStyle = {
  '--nb-media-item-icon-size': '2.5rem',
  '--nb-media-item-title-size': '2rem',
  '--nb-media-item-title-font-family': 'var(--font-heading)',
} as CSSProperties;

const variants: { value: MediaItemVariant; label: string; description: string }[] = [
  {
    value: 'plain',
    label: 'Plain',
    description: 'No container — just gap, icon size, and typography',
  },
  {
    value: 'boxed',
    label: 'Boxed',
    description: 'Hard border with offset shadow and tone fill',
  },
  {
    value: 'chip',
    label: 'Chip',
    description: 'Fully-rounded pill — great for status or tags',
  },
];

const orientations: { value: MediaItemOrientation; label: string }[] = [
  { value: 'horizontal', label: 'Horizontal' },
  { value: 'vertical', label: 'Vertical' },
];

const sizes: { value: MediaItemSize; label: string }[] = [
  { value: 'sm', label: 'SM' },
  { value: 'md', label: 'MD' },
  { value: 'lg', label: 'LG' },
];

const alignments: { value: MediaItemAlign; label: string; description: string }[] = [
  { value: 'start', label: 'Start', description: 'default, left-aligned content' },
  { value: 'center', label: 'Center', description: 'centered content' },
  { value: 'between', label: 'Between', description: 'stretches to full width' },
];

const toneDemos: MediaItemTone[] = ['yellow', 'mint', 'lavender', 'pink'];

const mediaItemApiRows = [
  {
    name: 'variant',
    type: "'plain' | 'boxed' | 'chip'",
    default: "'plain'",
    description: (
      <>
        Visual container style. <code className="font-mono">boxed</code> adds a border and shadow;{' '}
        <code className="font-mono">chip</code> uses a fully-rounded pill shape.
      </>
    ),
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Controls whether the media and text stack side-by-side or top-to-bottom.',
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'between'",
    default: "'start'",
    description: (
      <>
        Horizontal distribution of children. <code className="font-mono">between</code> stretches the
        item to full width.
      </>
    ),
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Sets gap, padding, icon size, and font size together.',
  },
  {
    name: 'tone',
    type: 'NbToneToken',
    default: "'default'",
    description: (
      <>
        Shared color tone — writes background, foreground, and border color. Background paint
        applies to <code className="font-mono">boxed</code> and <code className="font-mono">chip</code>{' '}
        variants.
      </>
    ),
  },
  {
    name: 'icon',
    type: 'string',
    default: 'undefined',
    description: 'Image source for the media icon.',
  },
  {
    name: 'iconAlt',
    type: 'string',
    default: "''",
    description: 'Accessible alternative text for the input icon.',
  },
  {
    name: 'iconBackground',
    type: 'string',
    default: 'undefined',
    description: 'Wraps the input icon in a framed surface with the provided fill.',
  },
  {
    name: 'title',
    type: 'string',
    default: 'undefined',
    description: (
      <>
        Primary label. Use <code className="font-mono">MediaItemTitle</code> for custom title
        markup.
      </>
    ),
  },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: (
      <>
        Secondary label. Use <code className="font-mono">MediaItemDescription</code> for custom
        description markup.
      </>
    ),
  },
];

const cssTokenRows = [
  {
    name: '--nb-media-item-icon-size',
    type: 'CSS variable',
    default: 'Depends on size',
    description: 'Controls projected and input icon dimensions.',
  },
  {
    name: '--nb-media-item-title-size',
    type: 'CSS variable',
    default: 'Depends on size',
    description: 'Controls title text size for input and projected titles.',
  },
  {
    name: '--nb-media-item-title-font-family',
    type: 'CSS variable',
    default: 'var(--font-sans)',
    description:
      'Controls title font family without adding utility classes to the title slot.',
  },
  {
    name: '--nb-media-item-description-size',
    type: 'CSS variable',
    default: 'Depends on size',
    description: 'Controls secondary label text size.',
  },
];

const subComponentRows = [
  {
    name: 'MediaItemIcon',
    description: (
      <>
        Media slot for an icon or image. Add <code className="font-mono">surface</code> to use the
        built-in icon frame and <code className="font-mono">background</code> to adjust its fill.
      </>
    ),
  },
  {
    name: 'MediaItemTitle',
    description: 'Primary label. Rendered in black font weight with tight leading.',
  },
  {
    name: 'MediaItemDescription',
    description: 'Secondary label below the title. Rendered at 75% size with reduced opacity.',
  },
];

function FlightCardExample() {
  return (
    <Surface border="strong" layout="stack" radius="sm" shadow="hard" clip>
      <div className="border-b-2 border-(--nb-border) bg-(--nb-accent) px-4 py-3 text-(--nb-accent-foreground)">
        <span className="font-heading text-2xl uppercase leading-none">Your Flight</span>
      </div>

      <div className="flex flex-col p-4">
        <MediaItem
          variant="plain"
          className="pb-3"
          style={flightTitleStyle}
          icon="/tokyo-city-escape/nb-plane-fill.svg"
          iconAlt="Flight"
          title="NYC → CDG"
          description="Jun 14 · 22:15 → 12:45+1"
        />

        <div className="flex flex-col gap-2">
          <Separator variant="dashed" />

          <MediaItem
            variant="plain"
            icon="/podcast-card/bookmark.svg"
            iconAlt="Ticket"
            iconBackground="#ff6aa2"
            title="Seat 14A"
            description="Economy · Window"
          />

          <Separator />

          <MediaItem
            variant="plain"
            icon="/tokyo-city-escape/nb-hotel-fill.svg"
            iconAlt="Baggage"
            iconBackground="#dcc8ff"
            title="1 checked bag"
            description="23 kg max"
          />
        </div>
      </div>
    </Surface>
  );
}

export function MediaItemPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Media Item</p>
          <h1>Media Item</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Use <code className="font-mono">MediaItem</code> to pair an icon or image with a title
            and optional description. Covers feature lists, event details, product specs, flight
            info, contact rows, status chips, and any layout that anchors text next to a visual.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">Tone</span>
            <span className="nb-stat-tile__label">Shared vocabulary</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">Style</span>
            <span className="nb-stat-tile__label">Variant API</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">Size</span>
            <span className="nb-stat-tile__label">Compact to roomy</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--lavender">
            <span className="nb-stat-tile__value">Flow</span>
            <span className="nb-stat-tile__label">Row or column</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={previewExampleCode}>
          <MediaItem
            variant="boxed"
            size="md"
            tone="lavender"
            icon="/tokyo-city-escape/nb-star-fill.svg"
            iconAlt="Star"
            title="Premium Access"
            description="Unlimited features"
          />
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <p className="mb-4 font-medium">
          Use props for icon, title, and description in the common case. Project custom content with{' '}
          <code className="font-mono">MediaItemIcon</code>,{' '}
          <code className="font-mono">MediaItemTitle</code>, and{' '}
          <code className="font-mono">MediaItemDescription</code> when you need custom markup.
        </p>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={defaultExampleCode} />
      </section>

      <section id="variants">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Variants
        </h2>
        <DocsExample code={variantsExampleCode}>
          <div className="flex flex-col divide-y-2 divide-(--nb-border) p-4">
            {variants.map((variant) => (
              <div key={variant.value} className="py-5 first:pt-0 last:pb-0">
                <div className="mb-3 flex items-baseline gap-3">
                  <span className="font-black uppercase">{variant.label}</span>
                  <span className="text-sm font-medium opacity-60">{variant.description}</span>
                </div>
                <MediaItem
                  variant={variant.value}
                  size="md"
                  tone="yellow"
                  icon="/tokyo-city-escape/nb-star-fill.svg"
                  iconAlt="Star"
                  title="Premium Access"
                  description="Unlimited features"
                />
              </div>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="orientations">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Orientations
        </h2>
        <DocsExample code={orientationsExampleCode}>
          <div className="flex flex-wrap gap-8 p-4">
            {orientations.map((orientation) => (
              <div key={orientation.value} className="flex flex-col gap-2">
                <span className="text-xs font-black uppercase opacity-60">{orientation.label}</span>
                <MediaItem
                  orientation={orientation.value}
                  variant="boxed"
                  size="md"
                  tone="lavender"
                  icon="/podcast-card/microphone.svg"
                  iconAlt="Camera"
                  title="Travel Photos"
                  description="128 shots"
                />
              </div>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="with-description">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          With description
        </h2>
        <p className="mb-4 font-medium">
          Add <code className="font-mono">description</code> for secondary context. It renders below
          the title with reduced opacity and follows the component size preset.
        </p>
        <DocsExample code={withDescriptionCode}>
          <div className="flex flex-wrap gap-4 p-4">
            <MediaItem
              variant="plain"
              size="md"
              icon="/podcast-card/bookmark.svg"
              iconAlt="Ticket"
              title="Boarding Pass"
            />
            <MediaItem
              variant="plain"
              size="md"
              icon="/podcast-card/bookmark.svg"
              iconAlt="Ticket"
              title="Boarding Pass"
              description="Seat 14A · Economy"
            />
            <MediaItem
              variant="boxed"
              size="md"
              tone="blue"
              icon="/podcast-card/user.svg"
              iconAlt="Support"
              title="24/7 Support"
              description="Response within 2h"
            />
          </div>
        </DocsExample>
      </section>

      <section id="sizes">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Sizes
        </h2>
        <DocsExample code={sizesExampleCode}>
          <div className="flex flex-col gap-4 p-4">
            {sizes.map((size) => (
              <MediaItem
                key={size.value}
                variant="boxed"
                size={size.value}
                tone="cream"
                icon="/tokyo-city-escape/nb-hotel-fill.svg"
                iconAlt="Baggage"
                title={`${size.label} — Checked Baggage`}
                description="Up to 23kg included"
              />
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="tones">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Tones
        </h2>
        <DocsExample code={tonesExampleCode}>
          <div className="flex flex-col gap-3 p-4">
            {toneDemos.map((tone) => (
              <MediaItem
                key={tone}
                variant={tone === 'pink' ? 'chip' : 'boxed'}
                size="md"
                tone={tone}
                icon="/tokyo-city-escape/nb-star-fill.svg"
                iconAlt="Star"
                title={tone === 'pink' ? 'Pink chip' : tone}
              />
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="alignment">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Alignment
        </h2>
        <DocsExample code={alignmentExampleCode}>
          <div className="flex flex-col gap-4 p-4">
            {alignments.map((align) => (
              <div key={align.value} className="flex flex-col gap-2">
                <span className="text-xs font-black uppercase opacity-60">
                  {align.label} — {align.description}
                </span>
                <MediaItem
                  variant="boxed"
                  size="md"
                  tone="yellow"
                  align={align.value}
                  icon="/podcast-card/user.svg"
                  iconAlt="World"
                  title="Global Network"
                  description="140+ destinations"
                />
              </div>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="real-world">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Real-world examples
        </h2>
        <DocsExample code={defaultExampleCode}>
          <div className="grid w-full max-w-100 grid-cols-1 gap-6 p-4">
            <FlightCardExample />
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="media-item" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>

        <h3 className="mt-6 mb-3 text-lg font-bold">MediaItem</h3>
        <DocsApiTable rows={mediaItemApiRows} variant="props-desc" minWidth="min-w-180" />

        <h3 className="mt-8 mb-3 text-lg font-bold">CSS Tokens</h3>
        <DocsApiTable rows={cssTokenRows} variant="props-desc" minWidth="min-w-140" />

        <h3 className="mt-8 mb-3 text-lg font-bold">Sub-components</h3>
        <DocsApiTable rows={subComponentRows} variant="parts" minWidth="min-w-120" />
      </section>
    </article>
  );
}
