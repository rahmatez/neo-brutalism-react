import { Avatar, AvatarGroup } from 'neobrutalism-ui-react';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/avatar-group';

const importCode = `import { Avatar, AvatarGroup } from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<AvatarGroup overflow={2}>
  <Avatar alt="Alice">A</Avatar>
  <Avatar alt="Bob">B</Avatar>
  <Avatar alt="Carol">C</Avatar>
  <Avatar alt="Dave">D</Avatar>
  <Avatar alt="Eve">E</Avatar>
</AvatarGroup>`;

const noOverflowCode = `<AvatarGroup>
  <Avatar alt="Alice">A</Avatar>
  <Avatar alt="Bob">B</Avatar>
  <Avatar alt="Carol">C</Avatar>
  <Avatar alt="Dave">D</Avatar>
</AvatarGroup>`;

const avatarGroupApiRows = [
  {
    name: 'overflow',
    type: 'number',
    default: '0',
    description: (
      <>
        Maximum avatars to show before rendering a <code className="font-mono">+N</code> badge for
        the remainder. When <code className="font-mono">0</code>, all children are shown.
      </>
    ),
  },
];

export function AvatarGroupPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React AvatarGroup</p>
          <h1>AvatarGroup</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A component that stacks <code className="font-mono">Avatar</code> elements with negative
            overlap and appends an overflow badge when the count exceeds what&apos;s shown. Common in
            charity, event, and social card designs.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">flex</span>
            <span className="nb-stat-tile__label">Overlap layout</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">+N</span>
            <span className="nb-stat-tile__label">Overflow badge</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode}>
          <div className="p-4">
            <AvatarGroup overflow={2}>
              <Avatar alt="Alice">A</Avatar>
              <Avatar alt="Bob">B</Avatar>
              <Avatar alt="Carol">C</Avatar>
              <Avatar alt="Dave">D</Avatar>
              <Avatar alt="Eve">E</Avatar>
            </AvatarGroup>
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

      <section id="no-overflow">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Without overflow
        </h2>
        <DocsExample code={noOverflowCode}>
          <div className="p-4">
            <AvatarGroup>
              <Avatar alt="Alice">A</Avatar>
              <Avatar alt="Bob">B</Avatar>
              <Avatar alt="Carol">C</Avatar>
              <Avatar alt="Dave">D</Avatar>
            </AvatarGroup>
          </div>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="avatar-group" />

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>
        <DocsApiTable rows={avatarGroupApiRows} variant="props-desc" />
      </section>
    </article>
  );
}
