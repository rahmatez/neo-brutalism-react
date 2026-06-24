import {
  Button,
  ButtonTrailingIcon,
  Callout,
  Chip,
  ChipGroup,
  Icon,
  Stack,
} from 'neobrutalism-ui-react';
import type { ComponentPropsWithoutRef } from 'react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/icon';

type IconSize = NonNullable<ComponentPropsWithoutRef<typeof Icon>['size']>;
type IconTone = NonNullable<ComponentPropsWithoutRef<typeof Icon>['tone']>;

const importCode = `import { Icon } from 'neobrutalism-ui-react';`;

const usageCode = `{/* Decorative icon (no meaning beyond adjacent text) */}
<Icon src="/icons/plane.svg" size="sm" decorative />

{/* Meaningful standalone icon */}
<Icon src="/icons/warning.svg" size="md" tone="danger" label="Warning" />

{/* Larger, colored icon */}
<Icon src="/icons/star.svg" size="xl" tone="warning" decorative />

{/* Image mode for colorful/illustrated assets */}
<Icon src="/icons/avatar-badge.png" mode="image" size="xl" label="Verified" />`;

const previewCode = `<Icon src="/icons/plane.svg" size="xl" tone="primary" decorative />
<Icon src="/icons/star.svg" size="lg" tone="warning" decorative />
<Icon src="/icons/hotel.svg" size="md" tone="default" decorative />
<Icon src="/icons/arrow-right.svg" size="sm" tone="muted" decorative />
<Icon src="/icons/plane.svg" size="xs" tone="danger" decorative />`;

const sizesCode = `<Icon src="/icons/plane.svg" size="xs" decorative />
<Icon src="/icons/plane.svg" size="sm" decorative />
<Icon src="/icons/plane.svg" size="md" decorative />
<Icon src="/icons/plane.svg" size="lg" decorative />
<Icon src="/icons/plane.svg" size="xl" decorative />`;

const tonesCode = `<Icon src="/icons/star.svg" size="md" tone="current" decorative />
<Icon src="/icons/star.svg" size="md" tone="default" decorative />
<Icon src="/icons/star.svg" size="md" tone="muted" decorative />
<Icon src="/icons/star.svg" size="md" tone="inverse" decorative />
<Icon src="/icons/star.svg" size="md" tone="primary" decorative />
<Icon src="/icons/star.svg" size="md" tone="secondary" decorative />
<Icon src="/icons/star.svg" size="md" tone="accent" decorative />
<Icon src="/icons/star.svg" size="md" tone="danger" decorative />
<Icon src="/icons/star.svg" size="md" tone="success" decorative />
<Icon src="/icons/star.svg" size="md" tone="warning" decorative />`;

const modesCode = `{/* mask: paints the SVG with the tone color */}
<Icon src="/icons/plane.svg" size="xl" mode="mask" tone="primary" decorative />

{/* image: preserves original asset colors */}
<Icon src="/icons/illustrated-plane.png" size="xl" mode="image" decorative />`;

const a11yCode = `{/* Decorative — icon is supplementary to adjacent text */}
<Icon src="/icons/star.svg" size="lg" tone="warning" decorative />

{/* Meaningful — icon stands alone and must be labelled */}
<Icon src="/icons/star.svg" size="lg" tone="warning" label="Top rated" />

{/* Avoid — ambiguous accessibility state */}
<Icon src="/icons/star.svg" size="lg" tone="warning" />`;

const compositionCode = `{/* Icons inside chips */}
<ChipGroup>
  <Chip tone="mint">
    <Icon src="/icons/plane.svg" size="sm" decorative />
    Flight included
  </Chip>
  <Chip tone="lavender">
    <Icon src="/icons/hotel.svg" size="sm" decorative />
    Hotel
  </Chip>
  <Chip tone="pink">
    <Icon src="/icons/star.svg" size="sm" decorative />
    Top pick
  </Chip>
</ChipGroup>

{/* Icon inside button trailing slot */}
<Button>
  Book Trip
  <ButtonTrailingIcon>
    <Icon src="/icons/arrow-right.svg" size="sm" tone="current" decorative />
  </ButtonTrailingIcon>
</Button>`;

const sizes: { value: IconSize; px: string }[] = [
  { value: 'xs', px: '0.75rem' },
  { value: 'sm', px: '1rem' },
  { value: 'md', px: '1.25rem' },
  { value: 'lg', px: '1.5rem' },
  { value: 'xl', px: '2rem' },
];

const tones: { value: IconTone }[] = [
  { value: 'current' },
  { value: 'default' },
  { value: 'muted' },
  { value: 'inverse' },
  { value: 'primary' },
  { value: 'secondary' },
  { value: 'accent' },
  { value: 'danger' },
  { value: 'success' },
  { value: 'warning' },
];

const iconApiRows = [
  {
    name: 'src',
    type: 'string',
    default: 'required',
    description:
      'Path to a trusted local SVG or image asset. Do not pass unsanitized user-generated URLs.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Icon size (0.75 rem – 2 rem).',
  },
  {
    name: 'tone',
    type: "'current' | 'default' | 'muted' | 'inverse' | 'primary' | 'secondary' | 'accent' | 'danger' | 'success' | 'warning'",
    default: "'current'",
    description:
      'Color tone. current inherits the parent CSS color. Only applies in mask mode.',
  },
  {
    name: 'mode',
    type: "'mask' | 'image'",
    default: "'mask'",
    description:
      'Rendering mode. mask paints the SVG with the tone color. image preserves original asset colors.',
  },
  {
    name: 'decorative',
    type: 'boolean',
    default: 'false',
    description:
      'Marks the icon as purely decorative (aria-hidden="true"). Use when the icon adds no information beyond adjacent text.',
  },
  {
    name: 'label',
    type: 'string | null',
    default: 'null',
    description:
      'Accessible label for meaningful icons. Sets role="img" and aria-label. Ignored when decorative is true.',
  },
];

export function IconPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Icon</p>
          <h1>Icon</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            <code className="font-mono">Icon</code> renders any SVG asset as a sized, colored,
            accessible icon. Mask mode (default) paints monochrome SVGs with the current color.
            Image mode preserves original colors for illustrated assets. Composable with chips,
            buttons, and any other primitive.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">5</span>
            <span className="nb-stat-tile__label">Sizes</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">10</span>
            <span className="nb-stat-tile__label">Tones</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">2</span>
            <span className="nb-stat-tile__label">Modes</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--lavender">
            <span className="nb-stat-tile__value">6</span>
            <span className="nb-stat-tile__label">Props</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={previewCode}>
          <div className="flex flex-wrap items-center gap-6 p-6">
            <Icon src="/tokyo-city-escape/nb-plane-fill.svg" size="xl" tone="primary" decorative />
            <Icon src="/tokyo-city-escape/nb-star-fill.svg" size="lg" tone="warning" decorative />
            <Icon src="/tokyo-city-escape/nb-hotel-fill.svg" size="md" tone="default" decorative />
            <Icon src="/tokyo-city-escape/nb-arrow-right.svg" size="sm" tone="muted" decorative />
            <Icon src="/tokyo-city-escape/nb-plane-fill.svg" size="xs" tone="danger" decorative />
          </div>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <p className="mb-4 font-medium">
          Import <code className="font-mono">Icon</code> and provide a{' '}
          <code className="font-mono">src</code> path. Mark the icon as{' '}
          <code className="font-mono">decorative</code> or give it a{' '}
          <code className="font-mono">label</code>. The <code className="font-mono">src</code> prop
          is intended for trusted local icon/image assets; do not pass unsanitized user-generated
          URLs.
        </p>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={usageCode} />
      </section>

      <section id="sizes">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Sizes
        </h2>
        <DocsExample code={sizesCode}>
          <div className="flex flex-wrap items-end gap-6 p-6">
            {sizes.map((s) => (
              <div key={s.value} className="flex flex-col items-center gap-2">
                <Icon src="/tokyo-city-escape/nb-plane-fill.svg" size={s.value} decorative />
                <span className="font-mono text-xs font-bold opacity-50">{s.value}</span>
                <span className="font-mono text-xs opacity-40">{s.px}</span>
              </div>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="tones">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Tones
        </h2>
        <p className="mb-4 font-medium">
          Tones map to design tokens and adapt automatically when the theme changes.{' '}
          <code className="font-mono">current</code> (default) inherits the CSS{' '}
          <code className="font-mono">color</code> of the parent element.
        </p>
        <DocsExample code={tonesCode}>
          <Stack gap="sm" className="w-full p-6">
            {tones.map((t) => (
              <div key={t.value} className="flex items-center gap-4">
                <span className="w-20 shrink-0 text-right font-mono text-xs font-bold opacity-50">
                  {t.value}
                </span>
                <Icon
                  src="/tokyo-city-escape/nb-star-fill.svg"
                  size="md"
                  tone={t.value}
                  decorative
                />
              </div>
            ))}
          </Stack>
        </DocsExample>
      </section>

      <section id="modes">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Modes
        </h2>
        <p className="mb-4 font-medium">
          <code className="font-mono">mode="mask"</code> (default) applies the SVG as a CSS mask and
          paints it with the active tone color — ideal for monochrome SVG icons that should follow
          the theme. <code className="font-mono">mode="image"</code> renders the asset as a
          background image and preserves its original colors — use this for colorful illustrations
          or PNGs.
        </p>
        <DocsExample code={modesCode}>
          <div className="flex flex-wrap items-center gap-8 p-6">
            <div className="flex flex-col items-center gap-2">
              <Icon
                src="/tokyo-city-escape/nb-plane-fill.svg"
                size="xl"
                mode="mask"
                tone="primary"
                decorative
              />
              <span className="font-mono text-xs font-bold opacity-50">mask (default)</span>
              <span className="font-mono text-xs opacity-40">painted by tone</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Icon
                src="/tokyo-city-escape/nb-plane-fill.svg"
                size="xl"
                mode="image"
                decorative
              />
              <span className="font-mono text-xs font-bold opacity-50">image</span>
              <span className="font-mono text-xs opacity-40">original colors</span>
            </div>
          </div>
        </DocsExample>
      </section>

      <section id="accessibility">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Accessibility
        </h2>
        <p className="mb-4 font-medium">
          Icons must be explicitly marked as decorative or meaningful. There is no silent default —
          always provide either <code className="font-mono">decorative</code> or{' '}
          <code className="font-mono">label</code>. Avoid rendering a bare visual icon with neither.
        </p>
        <Stack gap="md" className="mb-6">
          <Callout tone="mint" size="sm">
            <strong>Decorative icon</strong> — adds no meaning; hidden from screen readers. Use{' '}
            <code className="font-mono">decorative</code>.
          </Callout>
          <Callout tone="yellow" size="sm">
            <strong>Meaningful icon</strong> — communicates information; needs a label. Use{' '}
            <code className="font-mono">label="..."</code>.
          </Callout>
        </Stack>
        <DocsExample code={a11yCode}>
          <div className="flex flex-wrap items-center gap-8 p-6">
            <div className="flex flex-col items-center gap-2">
              <Icon
                src="/tokyo-city-escape/nb-star-fill.svg"
                size="lg"
                tone="warning"
                decorative
              />
              <span className="font-mono text-xs font-bold opacity-50">decorative</span>
              <span className="font-mono text-xs opacity-40">aria-hidden="true"</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Icon
                src="/tokyo-city-escape/nb-star-fill.svg"
                size="lg"
                tone="warning"
                label="Top rated"
              />
              <span className="font-mono text-xs font-bold opacity-50">label="Top rated"</span>
              <span className="font-mono text-xs opacity-40">role="img"</span>
            </div>
          </div>
        </DocsExample>
      </section>

      <section id="composition">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Composition
        </h2>
        <p className="mb-4 font-medium">
          Because <code className="font-mono">Icon</code> is a leaf component it drops into any
          container without adding extra wrapper markup.
        </p>
        <DocsExample code={compositionCode}>
          <Stack gap="lg" className="w-full p-6">
            <ChipGroup>
              <Chip tone="mint">
                <Icon src="/tokyo-city-escape/nb-plane-fill.svg" size="sm" decorative />
                Flight included
              </Chip>
              <Chip tone="lavender">
                <Icon src="/tokyo-city-escape/nb-hotel-fill.svg" size="sm" decorative />
                Hotel
              </Chip>
              <Chip tone="pink">
                <Icon src="/tokyo-city-escape/nb-star-fill.svg" size="sm" decorative />
                Top pick
              </Chip>
            </ChipGroup>

            <Button
              tone="lavender"
              size="lg"
              radius="md"
              className="h-12 px-4 font-black tracking-wide uppercase"
            >
              Book Trip
              <ButtonTrailingIcon shape="circle" tone="inverse" size="md">
                <Icon
                  src="/tokyo-city-escape/nb-arrow-right.svg"
                  size="sm"
                  tone="current"
                  decorative
                />
              </ButtonTrailingIcon>
            </Button>
          </Stack>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="icon" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={iconApiRows} variant="props-desc" minWidth="min-w-200" />
      </section>
    </article>
  );
}
