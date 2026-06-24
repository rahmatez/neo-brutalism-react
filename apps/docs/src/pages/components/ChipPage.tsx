import { Chip, ChipGroup } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/chip';

const importCode = `import { Chip, ChipGroup } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<ChipGroup>
  <Chip>React</Chip>
  <Chip tone="mint">TypeScript</Chip>
  <Chip tone="pink">Tailwind</Chip>
  <Chip tone="lavender">Vite</Chip>
</ChipGroup>`;

const tonesExampleCode = `<ChipGroup>
  <Chip>default</Chip>
  <Chip tone="ink">ink</Chip>
  <Chip tone="yellow">yellow</Chip>
  <Chip tone="pink">pink</Chip>
  <Chip tone="mint">mint</Chip>
  <Chip tone="lavender">lavender</Chip>
  <Chip tone="accent">accent</Chip>
  <Chip tone="success">success</Chip>
  <Chip tone="warning">warning</Chip>
  <Chip tone="danger">danger</Chip>
</ChipGroup>`;

const tokensExampleCode = `<Chip
  tone="yellow"
  className="gap-[14px] px-[18px] py-[10px] text-[22px] leading-none font-black"
  style={{
    '--nb-chip-radius': '8px',
    '--nb-chip-shadow': '6px 6px 0 0 var(--nb-shadow)',
    '--nb-chip-icon-size': '36px',
  }}
>
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">...</svg>
  $95K - $130K
</Chip>`;

const withIconExampleCode = `<ChipGroup>
  <Chip tone="mint" icon="/podcast-card/clock.svg">45 MIN</Chip>
  <Chip tone="lavender" icon="/podcast-card/sparkle.svg">NEW</Chip>
</ChipGroup>`;

const chipApiRows = [
  {
    name: 'tone',
    type: "'default' | 'ink' | 'yellow' | 'pink' | 'mint' | 'lavender' | 'accent' | 'success' | 'warning' | 'danger'",
    default: "'default'",
    description: 'Background color tone.',
  },
  {
    name: 'padding',
    type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Inner padding scale.',
  },
  {
    name: 'radius',
    type: "'none' | 'sm' | 'md' | 'lg' | 'full'",
    default: "'none'",
    description: 'Corner radius scale.',
  },
  {
    name: 'shadow',
    type: "'none' | 'sm' | 'default' | 'hard'",
    default: "'sm'",
    description: 'Drop shadow scale.',
  },
  {
    name: 'icon',
    type: 'string',
    default: '—',
    description: (
      <>
        URL of a leading SVG icon, tinted to the chip&apos;s foreground via <code className="font-mono">Icon</code>{' '}
        mask mode.
      </>
    ),
  },
  {
    name: 'iconSize',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'sm'",
    description: (
      <>
        Size of the <code className="font-mono">icon</code> prop&apos;s icon.
      </>
    ),
  },
];

const chipCssTokenRows = [
  { name: '--nb-chip-bg', default: 'var(--nb-surface)', description: 'Background color.' },
  { name: '--nb-chip-fg', default: 'var(--nb-foreground)', description: 'Text and icon color.' },
  { name: '--nb-chip-radius', default: '0px', description: 'Corner radius.' },
  { name: '--nb-chip-shadow', default: '2px 2px 0 0 var(--nb-shadow)', description: 'Box shadow.' },
  { name: '--nb-chip-icon-size', default: '0.75rem', description: 'Projected SVG size.' },
];

export function ChipPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Chip</p>
          <h1>Chip</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A compact label for tags and categories. Pairs with <code className="font-mono">ChipGroup</code>{' '}
            for horizontal chip rows. Supports 10 tones and an optional leading icon via the{' '}
            <code className="font-mono">icon</code> prop or projected children.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">span</span>
            <span className="nb-stat-tile__label">Host element</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">10</span>
            <span className="nb-stat-tile__label">Tones</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <ChipGroup className="p-4">
            <Chip>React</Chip>
            <Chip tone="mint">TypeScript</Chip>
            <Chip tone="pink">Tailwind</Chip>
            <Chip tone="lavender">Vite</Chip>
          </ChipGroup>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={defaultExampleCode} />
      </section>

      <section id="tones">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Tones
        </h2>
        <DocsExample code={tonesExampleCode}>
          <ChipGroup className="p-4">
            <Chip>default</Chip>
            <Chip tone="ink">ink</Chip>
            <Chip tone="yellow">yellow</Chip>
            <Chip tone="pink">pink</Chip>
            <Chip tone="mint">mint</Chip>
            <Chip tone="lavender">lavender</Chip>
            <Chip tone="accent">accent</Chip>
            <Chip tone="success">success</Chip>
            <Chip tone="warning">warning</Chip>
            <Chip tone="danger">danger</Chip>
          </ChipGroup>
        </DocsExample>
      </section>

      <section id="tokens">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Tokens
        </h2>
        <DocsExample code={tokensExampleCode}>
          <ChipGroup className="p-4">
            <Chip
              tone="yellow"
              className="gap-[14px] px-[18px] py-[10px] text-[22px] leading-none font-black"
              style={{
                ['--nb-chip-radius' as string]: '8px',
                ['--nb-chip-shadow' as string]: '6px 6px 0 0 var(--nb-shadow)',
                ['--nb-chip-icon-size' as string]: '36px',
              }}
            >
              <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <circle cx="20" cy="20" r="18" fill="currentColor" />
                <text
                  x="20"
                  y="27"
                  textAnchor="middle"
                  fontSize="24"
                  fontWeight="1000"
                  fill="#fff"
                  fontFamily="Arial Black, Arial, sans-serif"
                >
                  $
                </text>
              </svg>
              $95K - $130K
            </Chip>
          </ChipGroup>
        </DocsExample>
      </section>

      <section id="with-icon">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          With Icon
        </h2>
        <p className="mb-4 font-medium">
          Pass an SVG URL to the <code className="font-mono">icon</code> prop for a leading icon. It
          renders through <code className="font-mono">Icon</code> in mask mode, so it tints to the
          chip&apos;s foreground color. Use <code className="font-mono">iconSize</code> to scale it.
        </p>
        <DocsExample code={withIconExampleCode}>
          <ChipGroup className="p-4">
            <Chip tone="mint" icon="/podcast-card/clock.svg">
              45 MIN
            </Chip>
            <Chip tone="lavender" icon="/podcast-card/sparkle.svg">
              NEW
            </Chip>
          </ChipGroup>
        </DocsExample>
        <p className="mt-4 font-medium">
          For full-color or labeled icons, project any element as content instead — the leading slot
          is only used when <code className="font-mono">icon</code> is set.
        </p>
      </section>

      <DocsCustomizationTokens component="chip" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <p className="mb-4 font-bold">Chip</p>
        <DocsApiTable rows={chipApiRows} variant="props-desc" />

        <p className="mt-6 mb-4 font-bold">ChipGroup</p>
        <p className="font-medium">
          Wrapper with <code className="font-mono">flex flex-wrap gap-2</code>. Use{' '}
          <code className="font-mono">gap</code>, <code className="font-mono">direction</code>, and
          other layout props to override spacing.
        </p>

        <p className="mt-6 mb-4 font-bold">CSS tokens</p>
        <DocsApiTable rows={chipCssTokenRows} variant="props-desc" />
      </section>
    </article>
  );
}
