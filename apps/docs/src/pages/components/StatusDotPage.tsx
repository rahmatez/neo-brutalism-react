import { StatusDot } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/status-dot';

const importCode = `import { StatusDot } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<StatusDot state="online" />
<StatusDot state="offline" />
<StatusDot state="live" />`;

const statesExampleCode = `<StatusDot state="online" />
<StatusDot state="offline" />
<StatusDot state="live" />`;

const statusDotApiRows = [
  {
    name: 'state',
    type: "'online' | 'offline' | 'live'",
    default: "'online'",
    description: 'The visual state of the indicator.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'The size of the indicator dot.',
  },
  {
    name: 'radius',
    type: 'NbRadius',
    default: "'md'",
    description: 'The border radius of the indicator.',
  },
];

export function StatusDotPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React StatusDot</p>
          <h1>StatusDot</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A status indicator dot for presence, availability, and real-time streaming. Three
            states — online, offline, and live — cover the most common use cases.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">span</span>
            <span className="nb-stat-tile__label">Host element</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">3</span>
            <span className="nb-stat-tile__label">States</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <div className="flex items-center gap-6 p-4">
            <span className="flex items-center gap-2 font-bold">
              <StatusDot state="online" /> Online
            </span>
            <span className="flex items-center gap-2 font-bold">
              <StatusDot state="offline" /> Offline
            </span>
            <span className="flex items-center gap-2 font-bold">
              <StatusDot state="live" /> Live
            </span>
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

      <section id="states">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          States
        </h2>
        <DocsExample code={statesExampleCode}>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center gap-3">
              <StatusDot state="online" />
              <span className="font-bold">online</span>
              <span className="text-sm font-medium">— green fill, indicates active presence</span>
            </div>
            <div className="flex items-center gap-3">
              <StatusDot state="offline" />
              <span className="font-bold">offline</span>
              <span className="text-sm font-medium">— muted fill, indicates unavailability</span>
            </div>
            <div className="flex items-center gap-3">
              <StatusDot state="live" />
              <span className="font-bold">live</span>
              <span className="text-sm font-medium">
                — red pulsing dot, indicates real-time broadcast
              </span>
            </div>
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="status-dot" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={statusDotApiRows} variant="props-desc" />
      </section>
    </article>
  );
}
