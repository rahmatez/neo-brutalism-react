import { ImageCard, ImageCardCaption, Title } from 'neobrutalism-ui-react';
import type { CSSProperties } from 'react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/image-card';

const PREVIEW_IMAGE = '/showcase/portfolio/landing-dark.svg';

const titleWaveStyle = {
  '--nb-title-wave-color': '#61dafb',
  '--nb-title-wave-width': '10rem',
  '--nb-title-wave-height': '0.5rem',
} as CSSProperties;

const importCode = `import { ImageCard, ImageCardCaption, Title } from 'neobrutalism-ui-react';`;

const templateCode = `<ImageCard image={imageUrl} alt="A descriptive alt text">
  <ImageCardCaption>
    Image caption
  </ImageCardCaption>
</ImageCard>`;

const defaultExampleCode = `<ImageCard
  className="w-full max-w-sm"
  image={imageUrl}
  alt="Neo-Brutalist React landing page preview"
>
  <ImageCardCaption>
    <Title
      className="inline-block font-mono text-2xl font-black leading-tight"
      style={{
        '--nb-title-wave-color': '#61dafb',
        '--nb-title-wave-width': '10rem',
        '--nb-title-wave-height': '0.5rem',
      }}
    >
      React landing
    </Title>
  </ImageCardCaption>
</ImageCard>`;

const imageOnlyExampleCode = `<ImageCard
  className="w-full max-w-sm"
  image={imageUrl}
  alt="Neo-Brutalist React landing page preview"
/>`;

const imageCardApiRows = [
  {
    name: 'image',
    type: 'string (required)',
    description: 'URL of the image to render.',
  },
  {
    name: 'alt',
    type: 'string (required)',
    description: 'Alternative text for the image.',
  },
];

const imageCardPartsRows = [
  {
    name: 'ImageCardCaption',
    description: 'Caption region rendered below the image.',
  },
];

export function ImageCardPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Image Card</p>
          <h1>Image Card</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist React Image Card component. A media card with thick borders and offset
            shadow, optimized for displaying images with captions.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">2</span>
            <span className="nb-stat-tile__label">Inputs</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">A11y</span>
            <span className="nb-stat-tile__label">Alt + caption</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">IMG</span>
            <span className="nb-stat-tile__label">Optimized</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <ImageCard
            className="w-full max-w-sm"
            image={PREVIEW_IMAGE}
            alt="Neo-Brutalist React landing page preview"
          >
            <ImageCardCaption>
              <Title
                className="inline-block font-mono text-2xl font-black leading-tight"
                style={titleWaveStyle}
              >
                React landing
              </Title>
            </ImageCardCaption>
          </ImageCard>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={templateCode} />
      </section>

      <section id="image-only">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Image only
        </h2>
        <p className="mb-4 text-sm font-medium">
          When <code className="font-mono">ImageCardCaption</code> is omitted, the caption strip is
          not rendered.
        </p>
        <DocsExample code={imageOnlyExampleCode}>
          <ImageCard
            className="w-full max-w-sm"
            image={PREVIEW_IMAGE}
            alt="Neo-Brutalist React landing page preview"
          />
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="image-card" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={imageCardApiRows} variant="props-desc" />
        <h3 className="mt-8 mb-4 text-xl font-black">Subcomponents</h3>
        <DocsApiTable rows={imageCardPartsRows} variant="parts" />
      </section>
    </article>
  );
}
