import { Avatar } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/avatar';

const defaultExampleCode = `<Avatar className="h-20 w-20" src="https://github.com/rahmatez.png" alt="rahmatez" />`;

const importCode = `import { Avatar } from 'neobrutalism-ui-react';`;

const fallbackExampleCode = `<Avatar alt="John Doe">JD</Avatar>`;

const avatarApiRows = [
  { name: 'src', type: 'string | undefined', default: 'undefined' },
  { name: 'alt', type: 'string', default: "''" },
];

export function AvatarPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Avatar</p>
          <h1>Avatar</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            The neo-brutalist React Avatar component. A circular image frame with a thick border and
            offset shadow. Falls back to projected initials when no image source is provided.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">IMG</span>
            <span className="nb-stat-tile__label">or Text</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <Avatar className="h-20 w-20" src="https://github.com/rahmatez.png" alt="rahmatez" />
        </DocsExample>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Template" code={defaultExampleCode} />
      </section>

      <section id="fallback">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Fallback (Initials)
        </h2>
        <DocsExample code={fallbackExampleCode}>
          <Avatar alt="John Doe">JD</Avatar>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="avatar" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={avatarApiRows} />
      </section>
    </article>
  );
}
