import { Surface } from 'neobrutalism-ui-react';
import type { ComponentPropsWithoutRef } from 'react';

type SurfaceTone = NonNullable<ComponentPropsWithoutRef<typeof Surface>['tone']>;
type SurfaceRadius = NonNullable<ComponentPropsWithoutRef<typeof Surface>['radius']>;
type SurfaceBorder = NonNullable<ComponentPropsWithoutRef<typeof Surface>['border']>;
type SurfaceShadow = NonNullable<ComponentPropsWithoutRef<typeof Surface>['shadow']>;
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/surface';

const importCode = `import { Surface } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<Surface
  tone="yellow"
  radius="xl"
  border="thick"
  shadow="heavy"
  clip
  className="max-w-md"
>
  <div className="border-b-2 border-(--nb-border) bg-nb-primary px-5 py-3">
    <p className="font-mono text-xs font-black uppercase">Launch deck</p>
  </div>
  <div className="p-5">
    <h3>Ship the loud version</h3>
    <p>Surface gives custom layouts the same brutalist frame.</p>
  </div>
</Surface>`;

const tonesExampleCode = `<Surface tone="default">Default theme surface</Surface>
<Surface tone="yellow">Yellow surface</Surface>
<Surface tone="black">Black surface</Surface>
<Surface tone="success">Success surface</Surface>`;

const shapeExampleCode = `<Surface radius="sm" border="thin" shadow="sm">Compact</Surface>
<Surface tone="pink" radius="lg" border="default" shadow="hard">Poster</Surface>
<Surface tone="mint" radius="xl" border="thick" shadow="heavy">Feature</Surface>`;

const clipExampleCode = `<Surface radius="xl" clip className="relative">
  <div className="relative h-44 bg-(--nb-blue)">
    <div className="absolute -right-10 -top-10 size-28 rounded-full bg-(--nb-yellow)" />
    <div className="absolute -left-12 bottom-8 h-10 w-44 rotate-[-14deg] bg-(--nb-primary)" />
  </div>
  <div className="p-5">Decorative children stay inside the surface radius.</div>
</Surface>`;

const tones: { value: SurfaceTone; label: string; description: string }[] = [
  { value: 'default', label: 'default', description: 'Uses --nb-surface tokens.' },
  { value: 'background', label: 'background', description: 'Uses the page background tokens.' },
  { value: 'surface', label: 'surface', description: 'Explicit component surface tone.' },
  { value: 'cream', label: 'cream', description: 'Warm editorial panel.' },
  { value: 'white', label: 'white', description: 'Crisp white panel.' },
  { value: 'black', label: 'black', description: 'High contrast black panel.' },
  { value: 'yellow', label: 'yellow', description: 'Main brutalist yellow.' },
  { value: 'pink', label: 'pink', description: 'Punchy pink accent.' },
  { value: 'mint', label: 'mint', description: 'Soft pastel mint.' },
  { value: 'lavender', label: 'lavender', description: 'Pale lavender surface.' },
  { value: 'blue', label: 'blue', description: 'Clear sky blue surface.' },
  { value: 'primary', label: 'primary', description: 'Theme primary color.' },
  { value: 'secondary', label: 'secondary', description: 'Theme secondary color.' },
  { value: 'accent', label: 'accent', description: 'Theme accent color.' },
  { value: 'success', label: 'success', description: 'Semantic success tone.' },
  { value: 'warning', label: 'warning', description: 'Semantic warning tone.' },
  { value: 'danger', label: 'danger', description: 'Semantic danger tone.' },
];

const shapes: {
  label: string;
  tone: SurfaceTone;
  radius: SurfaceRadius;
  border: SurfaceBorder;
  shadow: SurfaceShadow;
}[] = [
  { label: 'Compact', tone: 'white', radius: 'sm', border: 'thin', shadow: 'sm' },
  { label: 'Poster', tone: 'pink', radius: 'lg', border: 'default', shadow: 'hard' },
  { label: 'Feature', tone: 'mint', radius: 'xl', border: 'thick', shadow: 'heavy' },
];

const surfaceApiRows = [
  {
    name: 'tone',
    type: "'default' | 'background' | 'surface' | 'cream' | 'white' | 'black' | 'yellow' | 'pink' | 'mint' | 'lavender' | 'blue' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'",
    default: "'default'",
    description: 'Background and foreground color pair.',
  },
  {
    name: 'radius',
    type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
    default: "'md'",
    description: 'Corner radius preset.',
  },
  {
    name: 'border',
    type: "'none' | 'thin' | 'default' | 'strong' | 'thick'",
    default: "'default'",
    description: 'Border width preset.',
  },
  {
    name: 'shadow',
    type: "'none' | 'sm' | 'default' | 'hard' | 'heavy'",
    default: "'default'",
    description: 'Offset shadow preset.',
  },
  {
    name: 'padding',
    type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'none'",
    description: (
      <>
        Uniform inner padding. Prefer <code className="font-mono">Section</code> for region-specific
        padding inside a surface.
      </>
    ),
  },
  {
    name: 'size',
    type: "'auto' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'auto'",
    description: (
      <>
        Fixed square size. Use for avatar containers or icon-sized surfaces.{' '}
        <code className="font-mono">'auto'</code> lets content define the dimensions.
      </>
    ),
  },
  {
    name: 'layout',
    type: "'block' | 'center' | 'row' | 'stack'",
    default: "'block'",
    description: (
      <>
        Inner display mode. <code className="font-mono">center</code> centers content both axes,{' '}
        <code className="font-mono">row</code> aligns children in a row,{' '}
        <code className="font-mono">stack</code> stacks them vertically.
      </>
    ),
  },
  {
    name: 'edge',
    type: "'none' | 'top' | 'bottom'",
    default: "'none'",
    description:
      "Adds a 2 px accent border on the top or bottom edge using the tone's border color. Useful for callout or notification panels.",
  },
  {
    name: 'typography',
    type: "'inherit' | 'body' | 'display' | 'accent' | 'mono'",
    default: "'inherit'",
    description: (
      <>
        Sets a font-family role for the surface and all descendant primitives via the cascade.
        Composes the typography context primitive.
      </>
    ),
  },
  {
    name: 'clip',
    type: 'boolean',
    default: 'false',
    description:
      'Adds overflow hidden to the surface so child media and decorations respect the surface radius.',
  },
];

export function SurfacePage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Surface</p>
          <h1>Surface</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A primitive for turning any host element into a brutalist panel. Use{' '}
            <code className="font-mono">Surface</code> for layout shells, callouts, recipe containers,
            and custom compositions that need the same borders, tones, radius, and offset shadow
            system as the packaged components.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">div</span>
            <span className="nb-stat-tile__label">Any host</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">Tone</span>
            <span className="nb-stat-tile__label">Shared vocabulary</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">CSS</span>
            <span className="nb-stat-tile__label">Token driven</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <Surface
            tone="yellow"
            radius="xl"
            border="thick"
            shadow="heavy"
            clip
            className="w-full max-w-md"
          >
            <div className="border-b-2 border-(--nb-border) bg-nb-primary px-5 py-3 text-nb-primary-fg">
              <p className="font-mono text-xs font-black uppercase">Launch deck</p>
            </div>
            <div className="p-5">
              <h3 className="text-2xl font-black">Ship the loud version</h3>
              <p className="mt-2 text-sm font-medium">
                Surface gives custom layouts the same brutalist frame as the core components.
              </p>
            </div>
          </Surface>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <p className="mb-4 font-medium">
          Add <code className="font-mono">Surface</code> to the element that owns the outer panel.
          Use <code className="font-mono">Section</code> for internal regions,{' '}
          <code className="font-mono">Stack</code> for vertical rhythm,{' '}
          <code className="font-mono">Cluster</code> for inline groups, and{' '}
          <code className="font-mono">Split</code> for two-region layouts.
        </p>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={defaultExampleCode} />
      </section>

      <section id="tones">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Tones
        </h2>
        <DocsExample code={tonesExampleCode}>
          <div className="grid w-full max-w-none grid-cols-1 gap-3 p-4 sm:grid-cols-2">
            {tones.map((tone) => (
              <Surface key={tone.value} tone={tone.value} shadow="sm" className="w-full p-4">
                <p className="font-mono text-xs font-black uppercase opacity-75">{tone.label}</p>
                <p className="mt-1 text-sm font-bold">{tone.description}</p>
              </Surface>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="shape">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Shape
        </h2>
        <p className="mb-4 font-medium">
          Combine <code className="font-mono">radius</code>, <code className="font-mono">border</code>
          , and <code className="font-mono">shadow</code> presets for different surface weights.
        </p>
        <DocsExample code={shapeExampleCode}>
          <div className="grid w-full max-w-none grid-cols-1 gap-4 p-4 sm:grid-cols-3">
            {shapes.map((shape) => (
              <Surface
                key={shape.label}
                tone={shape.tone}
                radius={shape.radius}
                border={shape.border}
                shadow={shape.shadow}
                className="min-h-32 w-full p-4"
              >
                <p className="font-black">{shape.label}</p>
                <p className="mt-2 font-mono text-xs">
                  {shape.radius} / {shape.border} / {shape.shadow}
                </p>
              </Surface>
            ))}
          </div>
        </DocsExample>
      </section>

      <section id="clip">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Clip
        </h2>
        <p className="mb-4 font-medium">
          Use the boolean <code className="font-mono">clip</code> prop when a surface has colored
          bands, media, or decorative children that should respect the surface radius.
        </p>
        <DocsExample code={clipExampleCode}>
          <Surface
            tone="white"
            radius="xl"
            shadow="hard"
            clip
            className="relative w-full max-w-sm"
          >
            <div className="relative h-44 bg-(--nb-blue) text-white">
              <div
                className="absolute -right-10 -top-10 size-28 rounded-full border-2 border-(--nb-border) bg-(--nb-yellow)"
                aria-hidden
              />
              <div
                className="absolute -left-12 bottom-8 h-10 w-44 rotate-[-14deg] border-2 border-(--nb-border) bg-(--nb-primary)"
                aria-hidden
              />
            </div>
            <div className="p-5">
              <p className="text-sm font-black uppercase">Corners hold</p>
              <p className="mt-2 text-sm font-medium">
                Decorative children stay inside the surface radius.
              </p>
            </div>
          </Surface>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="surface" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={surfaceApiRows} variant="props-desc" minWidth="min-w-180" />
      </section>
    </article>
  );
}
