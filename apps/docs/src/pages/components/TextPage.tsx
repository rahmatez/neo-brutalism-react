import {
  Callout,
  Chip,
  Display,
  Stack,
  Text,
} from 'neobrutalism-ui-react';
import type { ComponentPropsWithoutRef, CSSProperties } from 'react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

type TextSize = NonNullable<ComponentPropsWithoutRef<typeof Text>['size']>;
type TextWeight = NonNullable<ComponentPropsWithoutRef<typeof Text>['weight']>;
type TextTone = NonNullable<ComponentPropsWithoutRef<typeof Text>['tone']>;
type TextTransform = NonNullable<ComponentPropsWithoutRef<typeof Text>['transform']>;
type TextTracking = NonNullable<ComponentPropsWithoutRef<typeof Text>['tracking']>;
type TextMeasure = NonNullable<ComponentPropsWithoutRef<typeof Text>['measure']>;
type TextLeading = NonNullable<ComponentPropsWithoutRef<typeof Text>['leading']>;

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/text';

const importCode = `import { Text } from 'neobrutalism-ui-react';`;

const usageCode = `{/* Body text */}
<Text>
  Build loud interfaces with sharp React primitives.
</Text>

{/* Muted description with line-length cap */}
<Text tone="muted" measure="md">
  A token-driven neo-brutalist React UI library for expressive product interfaces.
</Text>

{/* Brand / name text */}
<Text size="xl" weight="extrabold">
  Roam & Go
</Text>

{/* Metadata label */}
<Text size="sm" weight="bold" transform="uppercase" tracking="wide">
  New release
</Text>

{/* Long-form article text */}
<Text size="lg" leading="relaxed" measure="lg">
  Brutalist interfaces work best when layout, typography, and contrast are intentional.
</Text>`;

const previewCode = `<Text size="xl" weight="extrabold">Roam & Go</Text>

<Text size="md" weight="medium" tone="muted" measure="md">
  Explore iconic neighborhoods, savor local flavors, and make
  unforgettable memories on every trip.
</Text>

<Text size="sm" weight="bold" transform="uppercase" tracking="wide">
  New release
</Text>`;

const sizesCode = `<Text size="xs">The quick brown fox — 0.75rem</Text>
<Text size="sm">The quick brown fox — 0.875rem</Text>
<Text size="md">The quick brown fox — 1rem</Text>
<Text size="lg">The quick brown fox — 1.125rem</Text>
<Text size="xl">The quick brown fox — 1.25rem</Text>`;

const weightsCode = `<Text size="lg" weight="normal">Build loud. Stay sharp.</Text>
<Text size="lg" weight="medium">Build loud. Stay sharp.</Text>
<Text size="lg" weight="semibold">Build loud. Stay sharp.</Text>
<Text size="lg" weight="bold">Build loud. Stay sharp.</Text>
<Text size="lg" weight="extrabold">Build loud. Stay sharp.</Text>
<Text size="lg" weight="black">Build loud. Stay sharp.</Text>`;

const tonesCode = `<Text tone="default">Neo-Brutalism is intentional.</Text>
<Text tone="muted">Neo-Brutalism is intentional.</Text>
<Text tone="subtle">Neo-Brutalism is intentional.</Text>
<Text tone="inverse">Neo-Brutalism is intentional.</Text>
<Text tone="primary">Neo-Brutalism is intentional.</Text>
<Text tone="secondary">Neo-Brutalism is intentional.</Text>
<Text tone="accent">Neo-Brutalism is intentional.</Text>
<Text tone="danger">Neo-Brutalism is intentional.</Text>
<Text tone="success">Neo-Brutalism is intentional.</Text>
<Text tone="warning">Neo-Brutalism is intentional.</Text>`;

const transformCode = `<Text weight="bold" transform="none">Flight Included — Tokyo City Escape</Text>
<Text weight="bold" transform="uppercase">Flight Included — Tokyo City Escape</Text>
<Text weight="bold" transform="lowercase">Flight Included — Tokyo City Escape</Text>
<Text weight="bold" transform="capitalize">Flight Included — Tokyo City Escape</Text>`;

const trackingCode = `<Text weight="black" transform="uppercase" tracking="tight">New release</Text>
<Text weight="black" transform="uppercase" tracking="normal">New release</Text>
<Text weight="black" transform="uppercase" tracking="wide">New release</Text>
<Text weight="black" transform="uppercase" tracking="wider">New release</Text>`;

const measureCode = `{/* no cap */}
<Text measure="none">A token-driven neo-brutalist React UI library...</Text>

{/* 20rem */}
<Text tone="muted" measure="xs">A token-driven neo-brutalist React UI library...</Text>

{/* 28rem */}
<Text tone="muted" measure="sm">A token-driven neo-brutalist React UI library...</Text>

{/* 36rem */}
<Text tone="muted" measure="md">A token-driven neo-brutalist React UI library...</Text>

{/* 44rem */}
<Text tone="muted" measure="lg">A token-driven neo-brutalist React UI library...</Text>`;

const leadingCode = `<Text size="md" measure="sm" leading="none">...</Text>
<Text size="md" measure="sm" leading="tight">...</Text>
<Text size="md" measure="sm" leading="normal">...</Text>
<Text size="md" measure="sm" leading="relaxed">...</Text>`;

const underlineCode = `<Text size="3xl" weight="extrabold" underline="bar">
  Build Loud FM
</Text>

<Text size="2xl" weight="extrabold" underline="wave">
  Stay Sharp
</Text>

{/* Recolor with a token */}
<Text
  size="2xl"
  weight="extrabold"
  underline="bar"
  style={{ '--nb-underline-color': 'var(--nb-mint)' } as CSSProperties}
>
  Mint Accent
</Text>`;

const compositionCode = `<Stack gap="lg">
  <Stack gap="xs">
    <Text size="xs" weight="bold" transform="uppercase" tracking="wider" tone="muted">
      Featured deal
    </Text>
    <Display>Build loud.</Display>
  </Stack>

  <Text size="lg" tone="muted" measure="md" leading="relaxed">
    A token-driven neo-brutalist React UI library for expressive
    product interfaces.
  </Text>

  <div className="flex flex-wrap gap-2">
    <Chip tone="mint">
      <Text size="sm" weight="black" transform="uppercase" tracking="wide">
        Flight included
      </Text>
    </Chip>
    <Chip tone="lavender">
      <Text size="sm" weight="black" transform="uppercase" tracking="wide">
        Hotel
      </Text>
    </Chip>
  </div>

  <Callout tone="yellow" size="lg" layout="between" shadow="hard">
    <Stack gap="none">
      <Text size="xs" weight="bold" transform="uppercase" tracking="wider" tone="muted">
        From
      </Text>
      <Text size="xl" weight="black">$799</Text>
    </Stack>
    <Text size="sm" weight="medium">per person</Text>
  </Callout>
</Stack>`;

const sizes: { value: TextSize; px: string }[] = [
  { value: 'xs', px: '0.75rem / 12px' },
  { value: 'sm', px: '0.875rem / 14px' },
  { value: 'md', px: '1rem / 16px' },
  { value: 'lg', px: '1.125rem / 18px' },
  { value: 'xl', px: '1.25rem / 20px' },
];

const weights: { value: TextWeight; numeric: string }[] = [
  { value: 'normal', numeric: '400' },
  { value: 'medium', numeric: '500' },
  { value: 'semibold', numeric: '600' },
  { value: 'bold', numeric: '700' },
  { value: 'extrabold', numeric: '800' },
  { value: 'black', numeric: '900' },
];

const tones: { value: TextTone }[] = [
  { value: 'default' },
  { value: 'muted' },
  { value: 'subtle' },
  { value: 'inverse' },
  { value: 'primary' },
  { value: 'secondary' },
  { value: 'accent' },
  { value: 'danger' },
  { value: 'success' },
  { value: 'warning' },
];

const transforms: { value: TextTransform }[] = [
  { value: 'none' },
  { value: 'uppercase' },
  { value: 'lowercase' },
  { value: 'capitalize' },
];

const trackings: { value: TextTracking; em: string }[] = [
  { value: 'tight', em: '−0.025em' },
  { value: 'normal', em: 'normal' },
  { value: 'wide', em: '0.025em' },
  { value: 'wider', em: '0.05em' },
];

const measures: { value: TextMeasure; rem: string }[] = [
  { value: 'none', rem: 'no cap' },
  { value: 'xs', rem: '20rem' },
  { value: 'sm', rem: '28rem' },
  { value: 'md', rem: '36rem' },
  { value: 'lg', rem: '44rem' },
];

const leadings: { value: TextLeading; numeric: string }[] = [
  { value: 'none', numeric: '1' },
  { value: 'tight', numeric: '1.15' },
  { value: 'normal', numeric: 'size-matched' },
  { value: 'relaxed', numeric: '1.65' },
];

const textApiRows = [
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Font size (0.75 rem – 1.25 rem).',
  },
  {
    name: 'weight',
    type: "'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'",
    default: "'normal'",
    description: 'Font weight (400 – 900).',
  },
  {
    name: 'tone',
    type:
      "'default' | 'muted' | 'subtle' | 'inverse' | 'primary' | 'secondary' | 'accent' | 'danger' | 'success' | 'warning'",
    default: "'default'",
    description: 'Text color mapped to a design token.',
  },
  {
    name: 'transform',
    type: "'none' | 'uppercase' | 'lowercase' | 'capitalize'",
    default: "'none'",
    description: 'CSS text-transform.',
  },
  {
    name: 'tracking',
    type: "'tight' | 'normal' | 'wide' | 'wider'",
    default: "'normal'",
    description: 'Letter-spacing (−0.025 em – 0.05 em).',
  },
  {
    name: 'measure',
    type: "'none' | 'xs' | 'sm' | 'md' | 'lg'",
    default: "'none'",
    description: 'max-width cap for readable line lengths (20 rem – 44 rem).',
  },
  {
    name: 'leading',
    type: "'none' | 'tight' | 'normal' | 'relaxed'",
    default: "'normal'",
    description: 'Line-height override. Defaults to a size-matched value.',
  },
  {
    name: 'underline',
    type: "'none' | 'bar' | 'wave'",
    default: "'none'",
    description: (
      <>
        Built-in accent underline beneath the text. Style it with the{' '}
        <code className="font-mono">--nb-underline-*</code> tokens.
      </>
    ),
  },
  {
    name: 'reset',
    type: 'boolean',
    default: 'true',
    description:
      'Sets margin to 0, removing browser paragraph/heading margins so layout primitives own all spacing.',
  },
];

export function TextPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Text</p>
          <h1>Text</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            <code className="font-mono">Text</code> is the general-purpose typography primitive for
            body copy, labels, brand names, metadata, and captions. It composes cleanly with
            semantic HTML elements and other primitives.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">5</span>
            <span className="nb-stat-tile__label">Sizes</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">6</span>
            <span className="nb-stat-tile__label">Weights</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">10</span>
            <span className="nb-stat-tile__label">Tones</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--lavender">
            <span className="nb-stat-tile__value">9</span>
            <span className="nb-stat-tile__label">Inputs</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={previewCode}>
          <Stack gap="md" className="max-w-xl p-6">
            <Text size="xl" weight="extrabold">
              Roam & Go
            </Text>
            <Text size="md" weight="medium" tone="muted" measure="md">
              Explore iconic neighborhoods, savor local flavors, and make unforgettable memories on
              every trip.
            </Text>
            <Text size="sm" weight="bold" transform="uppercase" tracking="wide">
              New release
            </Text>
          </Stack>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <p className="mb-4 font-medium">
          Use <code className="font-mono">Text</code> for inline or block typography. It applies
          token-driven styles directly so it composes with other primitives without extra wrappers.
        </p>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={usageCode} />
      </section>

      <section id="sizes">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Sizes
        </h2>
        <DocsExample code={sizesCode}>
          <Stack gap="md" className="w-full p-6">
            {sizes.map((size) => (
              <div key={size.value} className="flex items-baseline gap-4">
                <span className="w-10 shrink-0 text-right font-mono text-xs font-bold opacity-50">
                  {size.value}
                </span>
                <Text size={size.value} weight="medium">
                  The quick brown fox — {size.px}
                </Text>
              </div>
            ))}
          </Stack>
        </DocsExample>
      </section>

      <section id="weights">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Weights
        </h2>
        <DocsExample code={weightsCode}>
          <Stack gap="md" className="w-full p-6">
            {weights.map((weight) => (
              <div key={weight.value} className="flex items-baseline gap-4">
                <span className="w-20 shrink-0 text-right font-mono text-xs font-bold opacity-50">
                  {weight.value}
                </span>
                <Text size="lg" weight={weight.value}>
                  Build loud. Stay sharp.
                </Text>
              </div>
            ))}
          </Stack>
        </DocsExample>
      </section>

      <section id="tones">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Tones
        </h2>
        <p className="mb-4 font-medium">
          Tones map to design tokens so they automatically adapt when the theme changes.
        </p>
        <DocsExample code={tonesCode}>
          <Stack gap="sm" className="w-full p-6">
            {tones.map((tone) => (
              <div key={tone.value} className="flex items-center gap-4">
                <span className="w-20 shrink-0 text-right font-mono text-xs font-bold opacity-50">
                  {tone.value}
                </span>
                <Text size="md" weight="semibold" tone={tone.value}>
                  Neo-Brutalism is intentional.
                </Text>
              </div>
            ))}
          </Stack>
        </DocsExample>
      </section>

      <section id="transform">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Transform
        </h2>
        <DocsExample code={transformCode}>
          <Stack gap="md" className="w-full p-6">
            {transforms.map((transform) => (
              <div key={transform.value} className="flex items-baseline gap-4">
                <span className="w-24 shrink-0 text-right font-mono text-xs font-bold opacity-50">
                  {transform.value}
                </span>
                <Text size="md" weight="bold" transform={transform.value}>
                  Flight Included — Tokyo City Escape
                </Text>
              </div>
            ))}
          </Stack>
        </DocsExample>
      </section>

      <section id="tracking">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Tracking
        </h2>
        <p className="mb-4 font-medium">
          Letter-spacing. Combine <code className="font-mono">tracking="wide"</code> with{' '}
          <code className="font-mono">transform="uppercase"</code> for classic brutalist labels.
        </p>
        <DocsExample code={trackingCode}>
          <Stack gap="md" className="w-full p-6">
            {trackings.map((tracking) => (
              <div key={tracking.value} className="flex items-baseline gap-4">
                <span className="w-16 shrink-0 text-right font-mono text-xs font-bold opacity-50">
                  {tracking.value}
                </span>
                <Text
                  size="md"
                  weight="black"
                  transform="uppercase"
                  tracking={tracking.value}
                >
                  New release
                </Text>
              </div>
            ))}
          </Stack>
        </DocsExample>
      </section>

      <section id="measure">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Measure
        </h2>
        <p className="mb-4 font-medium">
          <code className="font-mono">measure</code> caps <code className="font-mono">max-width</code>{' '}
          for readable line lengths. Use it on paragraph text so lines don&apos;t stretch too wide
          on large screens.
        </p>
        <DocsExample code={measureCode}>
          <Stack gap="lg" className="w-full p-6">
            {measures.map((measure) => (
              <Stack key={measure.value} gap="xs">
                <span className="font-mono text-xs font-bold opacity-50">
                  measure=&quot;{measure.value}&quot; — {measure.rem}
                </span>
                <Text tone="muted" measure={measure.value}>
                  A token-driven neo-brutalist React UI library for expressive product interfaces.
                  Build loud. Stay sharp.
                </Text>
              </Stack>
            ))}
          </Stack>
        </DocsExample>
      </section>

      <section id="leading">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Leading
        </h2>
        <p className="mb-4 font-medium">
          Controls line-height. By default, <code className="font-mono">Text</code> picks a sensible
          line-height for the active <code className="font-mono">size</code>. Use{' '}
          <code className="font-mono">leading="relaxed"</code> for long-form reading.
        </p>
        <DocsExample code={leadingCode}>
          <div className="grid w-full grid-cols-1 gap-6 p-6 sm:grid-cols-2">
            {leadings.map((leading) => (
              <Stack key={leading.value} gap="xs">
                <span className="font-mono text-xs font-bold opacity-50">
                  leading=&quot;{leading.value}&quot; — {leading.numeric}
                </span>
                <Text size="md" measure="sm" leading={leading.value}>
                  Brutalist interfaces work best when layout, typography, and contrast are
                  intentional.
                </Text>
              </Stack>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="underline">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Underline
        </h2>
        <p className="mb-4 font-medium">
          <code className="font-mono">underline="bar"</code> adds a built-in accent bar beneath the
          text — handy for brand names and section labels with no extra markup. Use{' '}
          <code className="font-mono">&quot;wave&quot;</code> for the squiggly variant. Recolor and
          resize it with the <code className="font-mono">--nb-underline-color</code>,{' '}
          <code className="font-mono">--nb-underline-width</code>,{' '}
          <code className="font-mono">--nb-underline-height</code>,{' '}
          <code className="font-mono">--nb-underline-gap</code> and{' '}
          <code className="font-mono">--nb-underline-radius</code> tokens.
        </p>
        <DocsExample code={underlineCode}>
          <Stack gap="lg" className="w-full p-6">
            <Text size="3xl" weight="extrabold" underline="bar">
              Build Loud FM
            </Text>
            <Text size="2xl" weight="extrabold" underline="wave">
              Stay Sharp
            </Text>
            <Text
              size="2xl"
              weight="extrabold"
              underline="bar"
              style={{ '--nb-underline-color': 'var(--nb-mint)' } as CSSProperties}
            >
              Mint Accent
            </Text>
          </Stack>
        </DocsExample>
      </section>

      <section id="composition">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Composition
        </h2>
        <p className="mb-4 font-medium">
          <code className="font-mono">Text</code> composes with other primitives and works naturally
          inside any layout primitive.
        </p>
        <DocsExample code={compositionCode}>
          <Stack gap="lg" className="w-full p-6">
            <Stack gap="xs">
              <Text size="xs" weight="bold" transform="uppercase" tracking="wider" tone="muted">
                Featured deal
              </Text>
              <Display>Build loud.</Display>
            </Stack>

            <Text size="lg" tone="muted" measure="md" leading="relaxed">
              A token-driven neo-brutalist React UI library for expressive product interfaces.
            </Text>

            <div className="flex flex-wrap gap-2">
              <Chip tone="mint">
                <Text size="sm" weight="black" transform="uppercase" tracking="wide">
                  Flight included
                </Text>
              </Chip>
              <Chip tone="lavender">
                <Text size="sm" weight="black" transform="uppercase" tracking="wide">
                  Hotel
                </Text>
              </Chip>
            </div>

            <Callout tone="yellow" size="lg" layout="between" shadow="hard">
              <Stack gap="none">
                <Text size="xs" weight="bold" transform="uppercase" tracking="wider" tone="muted">
                  From
                </Text>
                <Text size="xl" weight="black">
                  $799
                </Text>
              </Stack>
              <Text size="sm" weight="medium">
                per person
              </Text>
            </Callout>
          </Stack>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="text" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={textApiRows} variant="props-desc" minWidth="min-w-200" />
      </section>
    </article>
  );
}
