import { Typography } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/typography';

const importCode = `import { Typography } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<Typography font="display" className="text-4xl font-black uppercase">
  Loud display line
</Typography>`;

const fontsExampleCode = `<div className="flex flex-col gap-3">
  <Typography font="body">Body font token</Typography>
  <Typography font="display">Display font token</Typography>
  <Typography font="accent">Accent font token</Typography>
  <Typography font="mono">Mono font token</Typography>
</div>`;

const compositionExampleCode = `<Typography font="display" className="text-3xl font-black leading-none">
  Rahmat Ashari
</Typography>
<Typography font="body" className="mt-2 text-sm font-bold uppercase tracking-widest">
  Frontend engineer
</Typography>`;

const typographyApiRows = [
  {
    name: 'Typography',
    description:
      'Inline typography context span that sets font family tokens via data-nb-typography and CSS variables.',
  },
];

export function TypographyPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Typography</p>
          <h1>Typography</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist React Typography component. Applies shared font tokens (body,
            display, accent, mono) to inline text without replacing semantic heading elements.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">4</span>
            <span className="nb-stat-tile__label">Font tokens</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">span</span>
            <span className="nb-stat-tile__label">Inline primitive</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <Typography font="display" className="text-4xl font-black uppercase">
            Loud display line
          </Typography>
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={defaultExampleCode} />
      </section>

      <section id="fonts">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Font tokens
        </h2>
        <DocsExample code={fontsExampleCode}>
          <div className="flex flex-col gap-3">
            <Typography font="body">Body font token</Typography>
            <Typography font="display">Display font token</Typography>
            <Typography font="accent">Accent font token</Typography>
            <Typography font="mono">Mono font token</Typography>
          </div>
        </DocsExample>
      </section>

      <section id="composition">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Composition
        </h2>
        <DocsExample code={compositionExampleCode}>
          <div>
            <Typography font="display" className="text-3xl font-black leading-none">
              Rahmat Ashari
            </Typography>
            <Typography font="body" className="mt-2 text-sm font-bold uppercase tracking-widest">
              Frontend engineer
            </Typography>
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="typography" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={typographyApiRows} variant="parts" />
      </section>
    </article>
  );
}
