import { Badge } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/badge';

const defaultExampleCode = `<Badge>Default</Badge>`;

const importCode = `import { Badge } from 'neobrutalism-ui-react';`;

const variantsExampleCode = `<div className="flex flex-wrap items-center gap-3">
  <Badge>Default</Badge>
  <Badge tone="accent">Accent</Badge>
  <Badge tone="success">Success</Badge>
  <Badge tone="warning">Warning</Badge>
  <Badge tone="danger">Danger</Badge>
</div>`;

const badgeApiRows = [{ name: 'tone', type: 'NbToneToken', default: "'white'" }];

export function BadgePage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Badge</p>
          <h1>Badge</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist React Badge component. A small status indicator with shared tone,
            radius, shadow, and border styling.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">5</span>
            <span className="nb-stat-tile__label">Tone-driven</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <Badge>Default</Badge>
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
        <DocsExample code={variantsExampleCode}>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Default</Badge>
            <Badge tone="accent">Accent</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="danger">Danger</Badge>
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="badge" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={badgeApiRows} />
      </section>
    </article>
  );
}
