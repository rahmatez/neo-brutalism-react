import { Cluster, MediaFrame } from 'neobrutalism-ui-react';
import type { ComponentPropsWithoutRef } from 'react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/media-frame';

const DEMO_IMAGE = '/showcase/portfolio/landing-dark.svg';

type MediaFrameRatio = NonNullable<ComponentPropsWithoutRef<typeof MediaFrame>['ratio']>;
type MediaFrameFit = NonNullable<ComponentPropsWithoutRef<typeof MediaFrame>['fit']>;
type MediaFrameRadius = NonNullable<ComponentPropsWithoutRef<typeof MediaFrame>['radius']>;
type MediaFrameShadow = NonNullable<ComponentPropsWithoutRef<typeof MediaFrame>['shadow']>;
type MediaFrameTone = NonNullable<ComponentPropsWithoutRef<typeof MediaFrame>['tone']>;

const importCode = `import { MediaFrame } from 'neobrutalism-ui-react';`;

const previewExampleCode = `<MediaFrame ratio="16/9" tone="lavender" shadow="hard">
  <img src="/image.jpg" alt="Landscape frame" />
</MediaFrame>`;

const examplesExampleCode = `<MediaFrame ratio="16/9" tone="lavender" shadow="hard">
  <img src="/image.jpg" alt="Landscape frame" />
</MediaFrame>

<MediaFrame ratio="1/1" tone="pink" radius="full" className="w-48">
  <img src="/image.jpg" alt="Circular frame" />
</MediaFrame>

<MediaFrame ratio="1/1" tone="mint" shadow="hard" className="w-48">
  <img src="/image.jpg" alt="Square frame" />
</MediaFrame>`;

const usageCode = `<MediaFrame>
  <img src="/..." alt="" />
</MediaFrame>

<MediaFrame ratio="16/9" tone="lavender">
  <video src="/..." />
</MediaFrame>

<MediaFrame ratio="1/1" fit="cover">
  <img src="/profile.png" alt="Profile" />
</MediaFrame>`;

const ratiosExampleCode = `<MediaFrame ratio="1/1" tone="lavender" shadow="hard">
  <img src="/..." alt="Square" />
</MediaFrame>

<MediaFrame ratio="3/4" tone="lavender" shadow="hard">
  <img src="/..." alt="Portrait" />
</MediaFrame>

<MediaFrame ratio="16/9" tone="lavender" shadow="hard">
  <img src="/..." alt="Video" />
</MediaFrame>

<MediaFrame ratio="21/9" tone="lavender" shadow="hard">
  <img src="/..." alt="Cinematic" />
</MediaFrame>`;

const fitExampleCode = `<MediaFrame ratio="16/9" tone="mint" fit="cover">
  <img src="/..." alt="" />
</MediaFrame>

<MediaFrame ratio="16/9" tone="mint" fit="contain">
  <img src="/..." alt="" />
</MediaFrame>

<MediaFrame ratio="16/9" tone="mint" fit="fill">
  <img src="/..." alt="" />
</MediaFrame>`;

const shapeExampleCode = `<MediaFrame ratio="1/1" tone="yellow" radius="none" shadow="none" className="w-48">
  <img src="/..." alt="Sharp" />
</MediaFrame>

<MediaFrame ratio="1/1" tone="lavender" radius="lg" shadow="default" className="w-48">
  <img src="/..." alt="Poster" />
</MediaFrame>

<MediaFrame ratio="1/1" tone="pink" radius="full" shadow="hard" className="w-48">
  <img src="/..." alt="Portrait" />
</MediaFrame>`;

const tonesExampleCode = `<MediaFrame ratio="16/9" tone="yellow" shadow="hard">
  <img src="/..." alt="" />
</MediaFrame>

<MediaFrame ratio="16/9" tone="mint" shadow="hard">
  <img src="/..." alt="" />
</MediaFrame>

<MediaFrame ratio="16/9" tone="pink" shadow="hard">
  <img src="/..." alt="" />
</MediaFrame>`;

const ratios: { value: MediaFrameRatio; label: string; description: string }[] = [
  { value: 'auto', label: 'Auto', description: 'No ratio enforced — content defines the height' },
  { value: '1/1', label: '1 / 1', description: 'Square — profiles, avatars, album art' },
  { value: '3/4', label: '3 / 4', description: 'Portrait — headshots, covers, vertical art' },
  { value: '4/3', label: '4 / 3', description: 'Classic photo — product cards, listings' },
  { value: '3/2', label: '3 / 2', description: 'Editorial — standard photography ratio' },
  { value: '16/9', label: '16 / 9', description: 'Video — presentations, hero images' },
  { value: '21/9', label: '21 / 9', description: 'Cinematic — immersive panoramic banners' },
];

const fits: { value: MediaFrameFit; label: string; description: string }[] = [
  { value: 'cover', label: 'Cover', description: 'Fills the frame and crops to fit — best for hero images' },
  { value: 'contain', label: 'Contain', description: 'Shows the full image, may reveal the background tone' },
  { value: 'fill', label: 'Fill', description: 'Stretches to fill the exact frame dimensions' },
];

const shapes: {
  label: string;
  description: string;
  radius: MediaFrameRadius;
  shadow: MediaFrameShadow;
  tone: MediaFrameTone;
}[] = [
  {
    label: 'Sharp',
    description: 'Hard edges, no shadow — raw brutalist style',
    radius: 'none',
    shadow: 'none',
    tone: 'yellow',
  },
  {
    label: 'Poster',
    description: 'Rounded corners with a soft offset shadow',
    radius: 'lg',
    shadow: 'default',
    tone: 'lavender',
  },
  {
    label: 'Portrait',
    description: 'Fully circular with a bold brutalist drop shadow',
    radius: 'full',
    shadow: 'hard',
    tone: 'pink',
  },
];

const toneDemos: MediaFrameTone[] = ['yellow', 'mint', 'pink', 'lavender'];

const mediaFrameApiRows = [
  {
    name: 'tone',
    type: 'NbToneToken',
    default: "'default'",
    description: "Background color shown when content doesn't fill the frame.",
  },
  {
    name: 'ratio',
    type: "'auto' | '1/1' | '3/4' | '4/3' | '3/2' | '16/9' | '21/9'",
    default: "'auto'",
    description: (
      <>
        Locks the frame to the given aspect ratio. <code className="font-mono">'auto'</code> lets
        content define the height.
      </>
    ),
  },
  {
    name: 'fit',
    type: "'cover' | 'contain' | 'fill'",
    default: "'cover'",
    description: (
      <>
        Object-fit applied to direct <code className="font-mono">img</code>,{' '}
        <code className="font-mono">video</code>, and <code className="font-mono">picture</code>{' '}
        children.
      </>
    ),
  },
  {
    name: 'radius',
    type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
    default: "'lg'",
    description: (
      <>
        Corner radius preset. Use <code className="font-mono">'full'</code> for circular portrait
        frames.
      </>
    ),
  },
  {
    name: 'shadow',
    type: "'none' | 'default' | 'hard'",
    default: "'none'",
    description: (
      <>
        Offset shadow preset. <code className="font-mono">'hard'</code> adds a bold 6 px brutalist
        drop shadow.
      </>
    ),
  },
];

export function MediaFramePage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Media Frame</p>
          <h1>Media Frame</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Use <code className="font-mono">MediaFrame</code> for framed visual content: images, video,
            illustrations, portraits, waveforms, maps, product previews, or any media-like block.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">Tone</span>
            <span className="nb-stat-tile__label">Shared vocabulary</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">7</span>
            <span className="nb-stat-tile__label">Ratios</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">6</span>
            <span className="nb-stat-tile__label">Shapes</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={previewExampleCode}>
          <MediaFrame ratio="16/9" tone="lavender" shadow="hard" className="max-w-md">
            <img src={DEMO_IMAGE} alt="Neo-brutalist media frame landscape" />
          </MediaFrame>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <p className="mb-5 max-w-3xl font-medium">
          Wrap the element that owns the frame. Captions, labels, badges, and actions belong outside
          the primitive.
        </p>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={usageCode} />
      </section>

      <section id="examples">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Examples
        </h2>
        <DocsExample code={examplesExampleCode}>
          <div className="flex flex-col gap-6 p-4">
            <MediaFrame ratio="16/9" tone="lavender" shadow="hard">
              <img src={DEMO_IMAGE} alt="Neo-brutalist media frame landscape" />
            </MediaFrame>
            <Cluster justify="center">
              <MediaFrame ratio="1/1" tone="pink" radius="full" className="w-48">
                <img src={DEMO_IMAGE} alt="Neo-brutalist media frame circle" />
              </MediaFrame>
              <MediaFrame ratio="1/1" tone="mint" shadow="hard" className="w-48">
                <img src={DEMO_IMAGE} alt="Neo-brutalist media frame square" />
              </MediaFrame>
            </Cluster>
          </div>
        </DocsExample>
      </section>

      <section id="tones">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Tones
        </h2>
        <DocsExample code={tonesExampleCode}>
          <div className="flex flex-col gap-4 p-4">
            {toneDemos.map((tone) => (
              <div key={tone}>
                <p className="mb-2 font-mono text-xs font-bold text-(--nb-border) uppercase">
                  {tone}
                </p>
                <MediaFrame ratio="16/9" tone={tone} shadow="hard">
                  <img src={DEMO_IMAGE} alt={`${tone} tone demo`} />
                </MediaFrame>
              </div>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="ratios">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Ratios
        </h2>
        <DocsExample code={ratiosExampleCode}>
          <div className="flex flex-col divide-y-2 divide-(--nb-border) p-4">
            {ratios.map((ratio) => (
              <div key={ratio.value} className="py-5 first:pt-0 last:pb-0">
                <div className="mb-3 flex items-baseline gap-3">
                  <span className="font-black uppercase">{ratio.label}</span>
                  <span className="text-sm font-medium opacity-60">{ratio.description}</span>
                </div>
                <MediaFrame
                  ratio={ratio.value}
                  tone="lavender"
                  shadow="hard"
                  className={ratio.value === 'auto' ? 'min-h-48' : undefined}
                >
                  <img src={DEMO_IMAGE} alt={`${ratio.label} ratio demo`} />
                </MediaFrame>
              </div>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="fit">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Fit
        </h2>
        <DocsExample code={fitExampleCode}>
          <div className="flex flex-col divide-y-2 divide-(--nb-border) p-4">
            {fits.map((fit) => (
              <div key={fit.value} className="py-5 first:pt-0 last:pb-0">
                <div className="mb-3 flex items-baseline gap-3">
                  <span className="font-black uppercase">{fit.label}</span>
                  <span className="text-sm font-medium opacity-60">{fit.description}</span>
                </div>
                <MediaFrame ratio="16/9" tone="mint" fit={fit.value}>
                  <img src={DEMO_IMAGE} alt={`${fit.label} fit demo`} />
                </MediaFrame>
              </div>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="shape">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Shape
        </h2>
        <DocsExample code={shapeExampleCode}>
          <div className="flex flex-col divide-y-2 divide-(--nb-border) p-4">
            {shapes.map((shape) => (
              <div key={shape.label} className="py-5 first:pt-0 last:pb-0">
                <div className="mb-3 flex items-baseline gap-3">
                  <span className="font-black uppercase">{shape.label}</span>
                  <span className="text-sm font-medium opacity-60">{shape.description}</span>
                </div>
                <MediaFrame
                  ratio="1/1"
                  tone={shape.tone}
                  radius={shape.radius}
                  shadow={shape.shadow}
                  className="w-48"
                >
                  <img src={DEMO_IMAGE} alt={`${shape.label} shape demo`} />
                </MediaFrame>
              </div>
            ))}
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="media-frame" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={mediaFrameApiRows} variant="props-desc" minWidth="min-w-180" />
      </section>
    </article>
  );
}
