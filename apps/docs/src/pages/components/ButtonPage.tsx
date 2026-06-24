import {
  Button,
  ButtonTrailingIcon,
  Icon,
  Text,
} from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/button';

const defaultExampleCode = `<Button>Button</Button>`;

const importCode = `import {
  Button,
  ButtonTrailingIcon,
  Icon,
} from 'neobrutalism-ui-react';`;

const tonesExampleCode = `<div className="flex flex-wrap items-center justify-center gap-3">
  <Button>Default</Button>
  <Button tone="background">Background</Button>
  <Button tone="primary">Primary</Button>
  <Button tone="secondary">Secondary</Button>
  <Button tone="accent">Accent</Button>
  <Button tone="danger">Danger</Button>
  <Button tone="success">Success</Button>
  <Button tone="warning">Warning</Button>
</div>`;

const sizesExampleCode = `<div className="flex flex-wrap items-center justify-center gap-3">
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
  <Button size="xl">Extra Large</Button>
</div>`;

const ctaExampleCode = `<Button tone="lavender" size="xl" radius="md">
  <Text size="xl" weight="black" transform="uppercase" tracking="wide">
    Apply Now
  </Text>
  <ButtonTrailingIcon shape="circle" tone="inverse" size="md">
    <Icon src="/tokyo-city-escape/nb-arrow-right.svg" size="sm" decorative />
  </ButtonTrailingIcon>
</Button>`;

const trailingIconExampleCode = `<Button tone="secondary">
  Keep Together
  <ButtonTrailingIcon>
    <Icon src="/tokyo-city-escape/nb-arrow-right.svg" size="sm" decorative />
  </ButtonTrailingIcon>
</Button>

<Button tone="primary" fullWidth>
  Push To End
  <ButtonTrailingIcon push="end" shape="square" size="md">
    <Icon src="/tokyo-city-escape/nb-arrow-right.svg" size="sm" decorative />
  </ButtonTrailingIcon>
</Button>`;

const fullWidthExampleCode = `<div className="w-full max-w-md">
  <Button fullWidth>Full width button</Button>
</div>`;

const disabledExampleCode = `<div className="flex flex-wrap items-center justify-center gap-4">
  <Button disabled>Disabled button</Button>
  <Button href="#" aria-disabled="true">Disabled link style</Button>
</div>`;

const anchorExampleCode = `<div className="flex flex-wrap items-center justify-center gap-4">
  <Button href="https://react.dev" target="_blank" rel="noreferrer">
    React Docs
  </Button>

  <Button
    href="https://github.com/rahmatez/neo-brutalism-react"
    target="_blank"
    rel="noreferrer"
  >
    GitHub Repo
  </Button>
</div>`;

const buttonApiRows = [
  { name: 'tone', type: 'NbToneToken', default: "'primary'" },
  { name: 'shadow', type: "'none' | 'sm' | 'default' | 'hard' | 'heavy'", default: "'default'" },
  { name: 'press', type: "'push' | 'reverse' | 'none'", default: "'push'" },
  { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'" },
  { name: 'border', type: "'none' | 'thin' | 'default' | 'strong' | 'thick'", default: "'default'" },
  { name: 'radius', type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'" },
  { name: 'fullWidth', type: 'boolean', default: 'false' },
];

const trailingIconApiRows = [
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: 'undefined' },
  { name: 'shape', type: "'none' | 'square' | 'circle'", default: 'undefined' },
  { name: 'tone', type: "'default' | 'inverse' | 'current'", default: 'undefined' },
  { name: 'push', type: "'none' | 'end'", default: "'none'" },
  { name: 'icon', type: 'string', default: 'undefined' },
];

export function ButtonPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Button</p>
          <h1>Button</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist React Button component. Displays a button or link that looks like a
            button, with hard borders, shared tone and shadow tokens, keyboard focus states, and
            native disabled behavior.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">Tone</span>
            <span className="nb-stat-tile__label">Shared vocabulary</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">Size</span>
            <span className="nb-stat-tile__label">Action scale</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">Press</span>
            <span className="nb-stat-tile__label">Button motion</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <Button>Button</Button>
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
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button>Default</Button>
            <Button tone="background">Background</Button>
            <Button tone="primary">Primary</Button>
            <Button tone="secondary">Secondary</Button>
            <Button tone="accent">Accent</Button>
            <Button tone="danger">Danger</Button>
            <Button tone="success">Success</Button>
            <Button tone="warning">Warning</Button>
          </div>
        </DocsExample>
      </section>

      <section id="sizes">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Sizes
        </h2>
        <DocsExample code={sizesExampleCode}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </DocsExample>
      </section>

      <section id="cta">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          CTA
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Button provides default typography for normal actions. For expressive button labels,
          compose <code className="font-mono">Text</code> inside <code className="font-mono">Button</code>.
        </p>
        <DocsExample code={ctaExampleCode}>
          <Button tone="lavender" size="xl" radius="md">
            <Text size="xl" weight="black" transform="uppercase" tracking="wide">
              Apply Now
            </Text>
            <ButtonTrailingIcon shape="circle" tone="inverse" size="md">
              <Icon src="/tokyo-city-escape/nb-arrow-right.svg" size="sm" decorative />
            </ButtonTrailingIcon>
          </Button>
        </DocsExample>
      </section>

      <section id="trailing-icon">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Trailing Icon
        </h2>
        <DocsExample code={trailingIconExampleCode}>
          <div className="grid w-full max-w-md gap-3">
            <Button tone="secondary">
              Keep Together
              <ButtonTrailingIcon>
                <Icon src="/tokyo-city-escape/nb-arrow-right.svg" size="sm" decorative />
              </ButtonTrailingIcon>
            </Button>
            <Button tone="primary" fullWidth>
              Push To End
              <ButtonTrailingIcon push="end" shape="square" size="md">
                <Icon src="/tokyo-city-escape/nb-arrow-right.svg" size="sm" decorative />
              </ButtonTrailingIcon>
            </Button>
          </div>
        </DocsExample>
      </section>

      <section id="full-width">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Full width
        </h2>
        <DocsExample code={fullWidthExampleCode}>
          <div className="w-full max-w-md">
            <Button fullWidth>Full width button</Button>
          </div>
        </DocsExample>
      </section>

      <section id="disabled">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Disabled
        </h2>
        <DocsExample code={disabledExampleCode}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button disabled>Disabled button</Button>
            <Button href="#" aria-disabled="true">
              Disabled link style
            </Button>
          </div>
        </DocsExample>
      </section>

      <section id="anchor-usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Anchor usage
        </h2>
        <DocsExample code={anchorExampleCode}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="https://react.dev" target="_blank" rel="noreferrer">
              React Docs
            </Button>
            <Button
              href="https://github.com/rahmatez/neo-brutalism-react"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Repo
            </Button>
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="button" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={buttonApiRows} />
        <h3 className="mt-8 mb-4 text-xl font-black">Trailing icon API</h3>
        <DocsApiTable rows={trailingIconApiRows} />
      </section>
    </article>
  );
}
