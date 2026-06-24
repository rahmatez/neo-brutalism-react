import { Progress } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/progress';

const importCode = `import { Progress } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<Progress value={68} label="Campaign progress" />`;

const tonesExampleCode = `<Progress value={60} />
<Progress value={80} tone="success" />
<Progress value={45} tone="warning" />
<Progress value={20} tone="danger" />
<Progress value={70} tone="accent" />`;

const progressApiRows = [
  {
    name: 'value',
    type: 'number',
    default: '0',
    description: 'Current progress value. Clamped between 0 and max.',
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    description: 'Maximum value (100% fill point).',
  },
  {
    name: 'tone',
    type: 'NbToneToken',
    default: "'primary'",
    description: 'Fill color tone.',
  },
  {
    name: 'label',
    type: 'string',
    default: "''",
    description: 'ARIA label for the progressbar role.',
  },
];

export function ProgressPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Progress</p>
          <h1>Progress</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A progress bar component with ARIA progressbar semantics. Supports{' '}
            <code className="font-mono">value</code>, <code className="font-mono">max</code>, and tone
            tokens for different semantic contexts — from fundraising goals to media playback.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">A11y</span>
            <span className="nb-stat-tile__label">ARIA progressbar</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">Tone</span>
            <span className="nb-stat-tile__label">Shared vocabulary</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <div className="flex w-full flex-col gap-4 p-4">
            <Progress value={68} label="Campaign progress" />
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

      <section id="tones">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Tones
        </h2>
        <DocsExample code={tonesExampleCode}>
          <div className="flex w-full flex-col gap-5 p-4">
            <div>
              <p className="mb-2 font-mono text-xs font-bold text-(--nb-border) uppercase">
                default
              </p>
              <Progress value={60} />
            </div>
            <div>
              <p className="mb-2 font-mono text-xs font-bold text-(--nb-border) uppercase">
                success
              </p>
              <Progress value={80} tone="success" />
            </div>
            <div>
              <p className="mb-2 font-mono text-xs font-bold text-(--nb-border) uppercase">
                warning
              </p>
              <Progress value={45} tone="warning" />
            </div>
            <div>
              <p className="mb-2 font-mono text-xs font-bold text-(--nb-border) uppercase">
                danger
              </p>
              <Progress value={20} tone="danger" />
            </div>
            <div>
              <p className="mb-2 font-mono text-xs font-bold text-(--nb-border) uppercase">
                accent
              </p>
              <Progress value={70} tone="accent" />
            </div>
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="progress" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={progressApiRows} variant="props-desc" minWidth="min-w-160" />
      </section>
    </article>
  );
}
