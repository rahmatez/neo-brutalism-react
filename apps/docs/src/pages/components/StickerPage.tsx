import { Sticker, StickerFace } from 'neobrutalism-ui-react';
import type { ComponentPropsWithoutRef } from 'react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

type StickerTone = NonNullable<ComponentPropsWithoutRef<typeof Sticker>['tone']>;

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/sticker';

const importCode = `import { Sticker, StickerFace } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<Sticker shape="burst" tone="mint" rotate={-8}>
  GROW
  <br />
  YOUR
  <br />
  SELF
</Sticker>
<Sticker shape="burst-wide" tone="yellow" rotate={5}>
  LIMITED
  <br />
  DROP
</Sticker>
<Sticker shape="star" tone="pink" aria-label="Happy sticker">
  <StickerFace />
</Sticker>
<Sticker shape="splat" tone="blue" decorative />`;

const shapesExampleCode = `<Sticker shape="burst" tone="mint">BURST</Sticker>
<Sticker shape="burst-wide" tone="yellow">WIDE</Sticker>
<Sticker shape="star" tone="pink" aria-label="Face sticker">
  <StickerFace />
</Sticker>
<Sticker shape="splat" tone="blue" decorative />`;

const tonesExampleCode = `<Sticker className="sticker-tone-face" shape="star" aria-label="Default tone smiling sticker">
  <StickerFace />
</Sticker>
<Sticker className="sticker-tone-face" shape="star" tone="yellow" aria-label="Yellow smiling sticker">
  <StickerFace />
</Sticker>
<Sticker className="sticker-tone-face" shape="star" tone="pink" aria-label="Pink smiling sticker">
  <StickerFace />
</Sticker>
<Sticker className="sticker-tone-face" shape="star" tone="mint" aria-label="Mint smiling sticker">
  <StickerFace />
</Sticker>
<Sticker className="sticker-tone-face" shape="star" tone="lavender" aria-label="Lavender smiling sticker">
  <StickerFace />
</Sticker>
<Sticker className="sticker-tone-face" shape="star" tone="blue" aria-label="Blue smiling sticker">
  <StickerFace />
</Sticker>
<Sticker className="sticker-tone-face" shape="star" tone="accent" aria-label="Accent smiling sticker">
  <StickerFace />
</Sticker>
<Sticker className="sticker-tone-face" shape="star" tone="success" aria-label="Success smiling sticker">
  <StickerFace />
</Sticker>
<Sticker className="sticker-tone-face" shape="star" tone="warning" aria-label="Warning smiling sticker">
  <StickerFace />
</Sticker>
<Sticker className="sticker-tone-face" shape="star" tone="danger" aria-label="Danger smiling sticker">
  <StickerFace />
</Sticker>`;

const rotateExampleCode = `<Sticker tone="yellow" rotate={-12}>-12</Sticker>
<Sticker tone="pink" rotate={0}>0</Sticker>
<Sticker tone="mint" rotate={12}>+12</Sticker>`;

const toneDemos: { tone?: StickerTone; label: string; ariaLabel: string }[] = [
  { label: 'default', ariaLabel: 'Default tone smiling sticker' },
  { tone: 'yellow', label: 'yellow', ariaLabel: 'Yellow smiling sticker' },
  { tone: 'pink', label: 'pink', ariaLabel: 'Pink smiling sticker' },
  { tone: 'mint', label: 'mint', ariaLabel: 'Mint smiling sticker' },
  { tone: 'lavender', label: 'lavender', ariaLabel: 'Lavender smiling sticker' },
  { tone: 'blue', label: 'blue', ariaLabel: 'Blue smiling sticker' },
  { tone: 'accent', label: 'accent', ariaLabel: 'Accent smiling sticker' },
  { tone: 'success', label: 'success', ariaLabel: 'Success smiling sticker' },
  { tone: 'warning', label: 'warning', ariaLabel: 'Warning smiling sticker' },
  { tone: 'danger', label: 'danger', ariaLabel: 'Danger smiling sticker' },
];

const stickerApiRows = [
  {
    name: 'shape',
    type: "'burst' | 'burst-wide' | 'star' | 'splat'",
    default: "'burst'",
    description: 'Outer SVG shape.',
  },
  {
    name: 'tone',
    type:
      "'default' | 'cream' | 'white' | 'black' | 'yellow' | 'pink' | 'mint' | 'lavender' | 'blue' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'",
    default: "'mint'",
    description: 'Background fill token.',
  },
  {
    name: 'decorative',
    type: 'boolean',
    default: 'false',
    description: 'Marks purely visual stickers as hidden from assistive tech.',
  },
  {
    name: 'rotate',
    type: 'number | undefined',
    default: 'shape default',
    description: 'Optional CSS rotation in degrees.',
  },
];

export function StickerPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Sticker</p>
          <h1>Sticker</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            SVG-backed callout stickers for launches, cards, badges, and decorative bursts. The
            component auto-scales text inside jagged sticker shapes and includes a small face
            primitive for the star sticker.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">4</span>
            <span className="nb-stat-tile__label">Shapes</span>
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
          <div className="flex flex-wrap items-center justify-center gap-9 p-8">
            <Sticker shape="burst" tone="mint" rotate={-8}>
              GROW
              <br />
              YOUR
              <br />
              SELF
            </Sticker>
            <Sticker shape="burst-wide" tone="yellow" rotate={5}>
              LIMITED
              <br />
              DROP
            </Sticker>
            <Sticker shape="star" tone="pink" aria-label="Happy sticker">
              <StickerFace />
            </Sticker>
            <Sticker shape="splat" tone="blue" decorative />
          </div>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={defaultExampleCode} />
      </section>

      <section id="shapes">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Shapes
        </h2>
        <DocsExample code={shapesExampleCode}>
          <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8 p-8">
            <div className="flex flex-col items-center gap-4">
              <Sticker shape="burst" tone="mint">
                BURST
              </Sticker>
              <span className="font-mono text-xs font-bold">burst</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Sticker shape="burst-wide" tone="yellow">
                WIDE
              </Sticker>
              <span className="font-mono text-xs font-bold">burst-wide</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Sticker shape="star" tone="pink" aria-label="Face sticker">
                <StickerFace />
              </Sticker>
              <span className="font-mono text-xs font-bold">star</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Sticker shape="splat" tone="blue" decorative />
              <span className="font-mono text-xs font-bold">splat</span>
            </div>
          </div>
        </DocsExample>
      </section>

      <section id="tones">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Tones
        </h2>
        <DocsExample code={tonesExampleCode}>
          <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-5">
            {toneDemos.map((demo) => (
              <div key={demo.label} className="flex flex-col items-center gap-2">
                <Sticker
                  className="sticker-tone-face"
                  shape="star"
                  tone={demo.tone}
                  aria-label={demo.ariaLabel}
                >
                  <StickerFace />
                </Sticker>
                <span className="font-mono text-xs font-bold">{demo.label}</span>
              </div>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="rotate">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Rotation
        </h2>
        <DocsExample code={rotateExampleCode}>
          <div className="flex flex-wrap items-center gap-8 p-6">
            <Sticker tone="yellow" rotate={-12}>
              -12
            </Sticker>
            <Sticker tone="pink" rotate={0}>
              0
            </Sticker>
            <Sticker tone="mint" rotate={12}>
              +12
            </Sticker>
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="sticker" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={stickerApiRows} variant="props-desc" />
      </section>

      <style>{`
        [data-nb-sticker].sticker-tone-face {
          --nb-sticker-min-inline-size: 7.25rem;
          --nb-sticker-min-block-size: 6.25rem;
          --nb-sticker-max-inline-size: 7.75rem;
          --nb-sticker-max-block-size: 6.75rem;
          --nb-sticker-padding-inline: 2.35rem;
          --nb-sticker-padding-block: 2.15rem;
          --nb-sticker-content-max-inline-size: 58%;
          --nb-sticker-face-size: 2.8rem;
        }
      `}</style>
    </article>
  );
}
