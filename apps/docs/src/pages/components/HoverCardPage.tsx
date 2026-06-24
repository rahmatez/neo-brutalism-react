import {
  Avatar,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from 'neobrutalism-ui-react';
import { Link } from 'react-router-dom';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/hover-card';

const installCode = `pnpm add neobrutalism-ui-react @radix-ui/react-hover-card`;

const importCode = `import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<HoverCard>
  <HoverCardTrigger asChild>
    <button type="button" className="inline-flex items-center gap-3 font-mono font-bold">
      <Avatar className="h-10 w-10" src="https://github.com/rahmatez.png" alt="rahmatez" />
      @rahmatez
    </button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex gap-4">
      <Avatar className="h-14 w-14" src="https://github.com/rahmatez.png" alt="rahmatez" />
      <div className="space-y-1">
        <p className="font-mono text-sm font-black">rahmatez</p>
        <p className="text-sm font-medium text-gray-600">
          Building neo-brutalist React components.
        </p>
        <p className="font-mono text-xs font-bold">
          <span className="text-(--nb-mint)">128</span> followers ·{' '}
          <span className="text-(--nb-mint)">42</span> following
        </p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`;

const partsRows = [
  { name: 'HoverCard', description: 'Root provider for open state and hover timing.' },
  { name: 'HoverCardTrigger', description: 'Element that opens the card on hover or focus.' },
  { name: 'HoverCardContent', description: 'Portaled preview surface positioned near the trigger.' },
  { name: 'HoverCardArrow', description: 'Optional arrow pointing at the trigger.' },
];

const rootApiRows = [
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    description: 'Controlled open state.',
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Initial open state when uncontrolled.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    description: 'Called when the card opens or closes.',
  },
  {
    name: 'openDelay',
    type: 'number',
    default: '700',
    description: 'Milliseconds before opening on hover.',
  },
  {
    name: 'closeDelay',
    type: 'number',
    default: '300',
    description: 'Milliseconds before closing after pointer leaves.',
  },
];

const triggerApiRows = [
  {
    name: 'asChild',
    type: 'boolean',
    default: 'false',
    description: 'Merge props onto the child element instead of rendering a button.',
  },
];

const contentApiRows = [
  {
    name: 'tone',
    type: 'NbToneToken',
    default: "'surface'",
    description: 'Tone token for card background, text, and border.',
  },
  {
    name: 'border',
    type: 'NbBorderStrength',
    default: "'default'",
    description: 'Border width token.',
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end'",
    default: "'center'",
    description: 'Alignment relative to the trigger.',
  },
  {
    name: 'side',
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'bottom'",
    description: 'Preferred placement side.',
  },
  {
    name: 'sideOffset',
    type: 'number',
    default: '8',
    description: 'Distance in pixels from the trigger.',
  },
];

function HoverCardPreview() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-3 rounded-(--nb-radius) border-2 border-transparent px-2 py-1 font-mono font-bold transition-colors hover:border-(--nb-border) hover:bg-(--nb-yellow) hover:shadow-[2px_2px_0_0_var(--nb-shadow)]"
        >
          <Avatar className="h-10 w-10" src="https://github.com/rahmatez.png" alt="rahmatez" />
          @rahmatez
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex gap-4">
          <Avatar className="h-14 w-14" src="https://github.com/rahmatez.png" alt="rahmatez" />
          <div className="space-y-1">
            <p className="font-mono text-sm font-black">rahmatez</p>
            <p className="text-sm font-medium text-gray-600">
              Building neo-brutalist React components.
            </p>
            <p className="font-mono text-xs font-bold">
              <span className="text-(--nb-mint)">128</span> followers ·{' '}
              <span className="text-(--nb-mint)">42</span> following
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export function HoverCardPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Hover Card</p>
          <h1>Hover Card</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Rich preview cards that open on hover or focus. Built on{' '}
            <a
              href="https://www.radix-ui.com/primitives/docs/components/hover-card"
              className="font-bold underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              Radix Hover Card
            </a>{' '}
            with neo-brutalist surfaces — ideal for profile previews, link summaries, and
            lightweight detail panels.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">Hover</span>
            <span className="nb-stat-tile__label">Trigger</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">Radix</span>
            <span className="nb-stat-tile__label">Powered</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Hover or focus the avatar trigger to reveal the profile card.
        </p>
        <DocsExample code={defaultExampleCode} layout="dropdown">
          <HoverCardPreview />
        </DocsExample>
      </section>

      <section id="when-to-use">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          When to Use
        </h2>
        <div className="max-w-3xl space-y-4 font-medium">
          <p>
            Use <strong>Hover Card</strong> for supplementary context that should appear on pointer
            hover — user profiles, @mentions, or link previews. The card stays open while the
            pointer moves into it, so users can interact with inner content.
          </p>
          <p>
            For click-to-open floating panels with form fields or actions, prefer{' '}
            <Link to="/components/popover" className="font-bold underline underline-offset-2">
              Popover
            </Link>
            . For single-line hints, use{' '}
            <Link to="/components/tooltip" className="font-bold underline underline-offset-2">
              Tooltip
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="dependencies">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Dependencies
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Hover Card wraps <code className="font-mono">@radix-ui/react-hover-card</code> for
          positioning, hover timing, and focus management. Install it alongside the UI package.
        </p>
        <DocsCodeBlock title="Install" code={installCode} />
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Avatar preview" code={defaultExampleCode} />
      </section>

      <DocsCustomizationTokens component="hover-card" />

      <section id="accessibility">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Accessibility
        </h2>
        <ul className="list-disc space-y-2 pl-6 font-medium">
          <li>Radix opens the card on keyboard focus as well as hover — test tab order into the trigger.</li>
          <li>
            Use <code className="font-mono">asChild</code> on the trigger so the focusable element is
            a real link or button with an accessible name.
          </li>
          <li>
            Keep preview content concise; long scrollable regions inside a hover card are hard to use
            on touch devices where hover is unavailable.
          </li>
        </ul>
      </section>

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>

        <h3 className="mt-6 mb-3 text-xl font-bold">Sub-parts</h3>
        <DocsApiTable rows={partsRows} variant="parts" minWidth="min-w-160" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">HoverCard</code>
        </h3>
        <DocsApiTable rows={rootApiRows} variant="props-desc" minWidth="min-w-140" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">HoverCardTrigger</code>
        </h3>
        <DocsApiTable rows={triggerApiRows} variant="props-desc" minWidth="min-w-120" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">HoverCardContent</code>
        </h3>
        <DocsApiTable rows={contentApiRows} variant="props-desc" minWidth="min-w-140" />
      </section>
    </article>
  );
}
