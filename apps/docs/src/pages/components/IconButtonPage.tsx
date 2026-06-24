import { IconButton } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/icon-button';

const importCode = `import { IconButton } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<IconButton aria-label="Like">
  <svg ...>...</svg>
</IconButton>
<IconButton shape="circle" aria-label="Like">
  <svg ...>...</svg>
</IconButton>
<IconButton tone="danger" aria-label="Delete">
  <svg ...>...</svg>
</IconButton>`;

const shapesExampleCode = `<IconButton aria-label="Square action">
  <svg ...>...</svg>
</IconButton>
<IconButton shape="circle" aria-label="Circle action">
  <svg ...>...</svg>
</IconButton>`;

const sizesExampleCode = `<IconButton size="sm" aria-label="Small">
  <svg ...>...</svg>
</IconButton>
<IconButton aria-label="Default">
  <svg ...>...</svg>
</IconButton>
<IconButton size="lg" aria-label="Large">
  <svg ...>...</svg>
</IconButton>`;

const tonesExampleCode = `<IconButton aria-label="Default"><svg ...>...</svg></IconButton>
<IconButton tone="primary" aria-label="Primary"><svg ...>...</svg></IconButton>
<IconButton tone="accent" aria-label="Accent"><svg ...>...</svg></IconButton>
<IconButton tone="danger" aria-label="Danger"><svg ...>...</svg></IconButton>
<IconButton tone="success" aria-label="Success"><svg ...>...</svg></IconButton>`;

const iconButtonApiRows = [
  {
    name: 'shape',
    type: "'square' | 'circle'",
    default: "'square'",
    description: 'Button border radius.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Touch target size (32/40/48/56px).',
  },
  {
    name: 'tone',
    type: 'NbToneToken',
    default: "'default'",
    description: 'Shared color tone — writes background, foreground, and border color.',
  },
  {
    name: 'radius',
    type: 'NbRadius',
    default: "'none'",
    description: "Corner radius for square buttons. Ignored when shape is 'circle'.",
  },
  {
    name: 'shadow',
    type: 'NbShadow',
    default: "'default'",
    description: 'Brutalist drop shadow depth.',
  },
  {
    name: 'border',
    type: 'NbBorderStrength',
    default: "'default'",
    description: 'Outline strength — writes the border width.',
  },
  {
    name: 'icon',
    type: 'string',
    default: '—',
    description:
      'SVG/image URL rendered internally via Icon (mask mode, sized to the button). Omit to project your own icon.',
  },
];

function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function IconButtonPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React IconButton</p>
          <h1>IconButton</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A <code className="font-mono">&lt;button&gt;</code> for icon-only actions. Supports
            square and circle shapes, 4 sizes, tunable corner radius, and the shared{' '}
            <code className="font-mono">tone</code> color palette. Pass an{' '}
            <code className="font-mono">icon</code> URL to render it internally, or project your own{' '}
            <code className="font-mono">&lt;svg&gt;</code> as children.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">button</span>
            <span className="nb-stat-tile__label">Host element</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">2</span>
            <span className="nb-stat-tile__label">Shapes</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">4</span>
            <span className="nb-stat-tile__label">Sizes</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <div className="flex items-center gap-4 p-4">
            <IconButton aria-label="Like">
              <HeartIcon />
            </IconButton>
            <IconButton shape="circle" aria-label="Like">
              <HeartIcon />
            </IconButton>
            <IconButton tone="danger" aria-label="Delete">
              <TrashIcon />
            </IconButton>
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
          <div className="flex items-center gap-6 p-4">
            <div className="flex flex-col items-center gap-2">
              <IconButton aria-label="Action">
                <HeartIcon />
              </IconButton>
              <span className="font-mono text-xs font-bold">square</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <IconButton shape="circle" aria-label="Action">
                <HeartIcon />
              </IconButton>
              <span className="font-mono text-xs font-bold">circle</span>
            </div>
          </div>
        </DocsExample>
      </section>

      <section id="sizes">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Sizes
        </h2>
        <DocsExample code={sizesExampleCode}>
          <div className="flex items-end gap-4 p-4">
            <IconButton size="sm" aria-label="Small">
              <HeartIcon />
            </IconButton>
            <IconButton aria-label="Default">
              <HeartIcon />
            </IconButton>
            <IconButton size="lg" aria-label="Large">
              <HeartIcon />
            </IconButton>
          </div>
        </DocsExample>
      </section>

      <section id="tones">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Tones
        </h2>
        <DocsExample code={tonesExampleCode}>
          <div className="flex flex-wrap items-center gap-3 p-4">
            <IconButton aria-label="Default">
              <InfoIcon />
            </IconButton>
            <IconButton tone="primary" aria-label="Primary">
              <InfoIcon />
            </IconButton>
            <IconButton tone="accent" aria-label="Accent">
              <InfoIcon />
            </IconButton>
            <IconButton tone="danger" aria-label="Danger">
              <InfoIcon />
            </IconButton>
            <IconButton tone="success" aria-label="Success">
              <InfoIcon />
            </IconButton>
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="icon-button" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={iconButtonApiRows} variant="props-desc" />
      </section>
    </article>
  );
}
