import {
  Button,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandSeparator,
  CommandShortcut,
} from 'neobrutalism-ui-react';
import { useEffect, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/command';

const installCode = `pnpm add neobrutalism-ui-react cmdk`;

const importCode = `import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<Command label="Suggestions" className="max-w-md">
  <CommandInput placeholder="Type a command or search…" />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem value="calendar">
        <CalendarIcon />
        Calendar
      </CommandItem>
      <CommandItem value="search">
        <SearchIcon />
        Search
      </CommandItem>
      <CommandItem value="settings">
        <SettingsIcon />
        Settings
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`;

const dialogExampleCode = `const [open, setOpen] = useState(false);

useEffect(() => {
  const onKeyDown = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      setOpen((current) => !current);
    }
  };
  window.addEventListener('keydown', onKeyDown);
  return () => window.removeEventListener('keydown', onKeyDown);
}, []);

<>
  <Button type="button" onClick={() => setOpen(true)}>
    Open command palette
  </Button>
  <CommandDialog open={open} onOpenChange={setOpen} label="Command palette">
    <CommandInput placeholder="Type a command or search…" />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Pages">
        <CommandItem value="home" onSelect={() => setOpen(false)}>Home</CommandItem>
        <CommandItem value="docs" onSelect={() => setOpen(false)}>Documentation</CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</>`;

const shortcutsExampleCode = `<Command label="Actions" className="max-w-md">
  <CommandInput placeholder="Search actions…" />
  <CommandList>
    <CommandGroup heading="Actions">
      <CommandItem value="new-file">
        New File
        <CommandShortcut>⌘N</CommandShortcut>
      </CommandItem>
      <CommandItem value="save">
        Save
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem value="profile">Profile</CommandItem>
      <CommandItem value="billing">Billing</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`;

const disabledItemExampleCode = `<Command label="Permissions" className="max-w-md">
  <CommandInput placeholder="Search actions…" />
  <CommandList>
    <CommandGroup heading="Actions">
      <CommandItem value="edit">Edit</CommandItem>
      <CommandItem value="share">Share</CommandItem>
      <CommandItem value="delete" disabled>
        Delete (admin only)
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`;

const asyncSearchExampleCode = `const [search, setSearch] = useState('');
const [loading, setLoading] = useState(false);
const [items, setItems] = useState(frameworks);

useEffect(() => {
  if (!search.trim()) {
    setItems(frameworks);
    setLoading(false);
    return;
  }
  setLoading(true);
  const timer = window.setTimeout(() => {
    setItems(frameworks.filter((name) =>
      name.toLowerCase().includes(search.toLowerCase()),
    ));
    setLoading(false);
  }, 400);
  return () => window.clearTimeout(timer);
}, [search]);

<Command shouldFilter={false} label="Async frameworks" className="max-w-md">
  <CommandInput
    placeholder="Server-side filter…"
    value={search}
    onValueChange={setSearch}
  />
  <CommandList>
    {loading ? (
      <CommandLoading progress={60} label="Loading results">
        Searching…
      </CommandLoading>
    ) : (
      <>
        <CommandEmpty>No frameworks found.</CommandEmpty>
        <CommandGroup heading="Frameworks">
          {items.map((name) => (
            <CommandItem key={name} value={name.toLowerCase()}>
              {name}
            </CommandItem>
          ))}
        </CommandGroup>
      </>
    )}
  </CommandList>
</Command>`;

const emptyStateExampleCode = `<Command label="Frameworks" className="max-w-md">
  <CommandInput placeholder="Try typing zzz…" />
  <CommandList>
    <CommandEmpty>No frameworks match your search.</CommandEmpty>
    <CommandGroup heading="Frameworks">
      <CommandItem value="react">React</CommandItem>
      <CommandItem value="vue">Vue</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`;

const commandPartsRows = [
  {
    name: 'Command',
    description: 'Root menu for inline palettes. Wraps cmdk with neo-brutalist field styling.',
  },
  {
    name: 'CommandDialog',
    description: 'Modal command palette with overlay. Uses cmdk Dialog (Radix) under the hood.',
  },
  {
    name: 'CommandInput',
    description: 'Search field with built-in magnifier icon.',
  },
  {
    name: 'CommandList',
    description: 'Scrollable list container for groups and items.',
  },
  {
    name: 'CommandEmpty',
    description: 'Shown automatically when filtering returns no items.',
  },
  {
    name: 'CommandGroup',
    description: 'Labeled section. Hidden when all child items are filtered out.',
  },
  {
    name: 'CommandItem',
    description: 'Selectable action row. Supports value, keywords, disabled, onSelect.',
  },
  {
    name: 'CommandSeparator',
    description: 'Visual divider between groups or items.',
  },
  {
    name: 'CommandShortcut',
    description: 'Keyboard hint chip aligned to the end of an item.',
  },
  {
    name: 'CommandLoading',
    description: 'Loading placeholder for async item lists.',
  },
];

const commandApiRows = [
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Accessible label for the command menu (not shown visually).',
  },
  {
    name: 'shouldFilter',
    type: 'boolean',
    default: 'true',
    description: 'Set false to disable built-in filtering for server-driven lists.',
  },
  {
    name: 'filter',
    type: 'CommandFilter',
    default: 'command-score',
    description: 'Custom filter function. Return 0 to hide, 1 for best match.',
  },
  {
    name: 'loop',
    type: 'boolean',
    default: 'false',
    description: 'Loop keyboard selection from last item back to first.',
  },
  {
    name: 'tone',
    type: 'NbToneToken',
    default: "'surface'",
    description: 'Tone token for background, text, and border colors.',
  },
  {
    name: 'border',
    type: 'NbBorderStrength',
    default: "'default'",
    description: 'Border width token.',
  },
];

const commandItemApiRows = [
  {
    name: 'value',
    type: 'string',
    default: 'inferred from children',
    description: 'Stable value used for filtering and onSelect callback.',
  },
  {
    name: 'keywords',
    type: 'string[]',
    default: 'undefined',
    description: 'Extra search aliases matched alongside value.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevents selection via pointer or keyboard.',
  },
  {
    name: 'onSelect',
    type: '(value: string) => void',
    default: 'undefined',
    description: 'Fired when the item is chosen via Enter or click.',
  },
  {
    name: 'forceMount',
    type: 'boolean',
    default: 'false',
    description: 'Keep the item visible regardless of the current filter.',
  },
];

const commandDialogApiRows = [
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    description: 'Controlled open state for the dialog palette.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    description: 'Called when the dialog opens or closes.',
  },
  {
    name: 'overlayClassName',
    type: 'string',
    default: 'undefined',
    description: 'Classes for the modal backdrop.',
  },
  {
    name: 'contentClassName',
    type: 'string',
    default: 'undefined',
    description: 'Classes for the positioned dialog shell.',
  },
];

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="2.3" />
      <path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.3" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2.3" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InlineCommandPreview() {
  return (
    <Command label="Suggestions" className="max-w-md">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">
            <CalendarIcon className="size-5" />
            Calendar
          </CommandItem>
          <CommandItem value="search">
            <SearchIcon className="size-5" />
            Search
          </CommandItem>
          <CommandItem value="settings">
            <SettingsIcon className="size-5" />
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function ShortcutsCommandPreview() {
  return (
    <Command label="Actions" className="max-w-md">
      <CommandInput placeholder="Search actions…" />
      <CommandList>
        <CommandGroup heading="Actions">
          <CommandItem value="new-file">
            New File
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem value="save">
            Save
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem value="profile">Profile</CommandItem>
          <CommandItem value="billing">Billing</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

const ASYNC_FRAMEWORKS = ['React', 'Vue', 'Svelte', 'Angular', 'Solid', 'Qwik'];

function DisabledCommandPreview() {
  return (
    <Command label="Permissions" className="max-w-md">
      <CommandInput placeholder="Search actions…" />
      <CommandList>
        <CommandGroup heading="Actions">
          <CommandItem value="edit">Edit</CommandItem>
          <CommandItem value="share">Share</CommandItem>
          <CommandItem value="delete" disabled>
            Delete (admin only)
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function AsyncCommandPreview() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(ASYNC_FRAMEWORKS);

  useEffect(() => {
    if (!search.trim()) {
      setItems(ASYNC_FRAMEWORKS);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = window.setTimeout(() => {
      const query = search.toLowerCase();
      setItems(ASYNC_FRAMEWORKS.filter((name) => name.toLowerCase().includes(query)));
      setLoading(false);
    }, 450);

    return () => window.clearTimeout(timer);
  }, [search]);

  return (
    <Command shouldFilter={false} label="Async frameworks" className="max-w-md">
      <CommandInput
        placeholder="Server-side filter…"
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        {loading ? (
          <CommandLoading progress={60} label="Loading results">
            Searching…
          </CommandLoading>
        ) : (
          <>
            <CommandEmpty>No frameworks found.</CommandEmpty>
            <CommandGroup heading="Frameworks">
              {items.map((name) => (
                <CommandItem key={name} value={name.toLowerCase()}>
                  {name}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );
}

function CommandDialogPreview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button type="button" onClick={() => setOpen(true)}>
        Open command palette
      </Button>
      <p className="max-w-sm text-center text-sm font-medium text-gray-600">
        This docs preview uses the button only so it does not clash with the navbar search shortcut (
        <CommandShortcut className="ms-0">⌘K</CommandShortcut>). See the code tab for wiring your
        own global listener.
      </p>
      <CommandDialog open={open} onOpenChange={setOpen} label="Command palette">
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem value="home" onSelect={() => setOpen(false)}>
              Home
            </CommandItem>
            <CommandItem value="button" onSelect={() => setOpen(false)}>
              Button docs
            </CommandItem>
            <CommandItem value="chart" onSelect={() => setOpen(false)}>
              Chart docs
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem value="theme" keywords={['dark', 'light']}>
              Toggle theme
              <CommandShortcut>⌘T</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

const yellowCommandStyle = { '--nb-command-bg': '#ffd24a' } as CSSProperties;

export function CommandPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Command</p>
          <h1>Command</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            A fast, keyboard-first command menu for search, navigation, and actions. Built on{' '}
            <a
              href="https://github.com/pacocoursey/cmdk"
              className="font-bold underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              cmdk
            </a>{' '}
            with neo-brutalist borders, shadows, and item highlights — inline or in a modal dialog.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">⌘K</span>
            <span className="nb-stat-tile__label">Palette</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">cmdk</span>
            <span className="nb-stat-tile__label">Powered</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">A11y</span>
            <span className="nb-stat-tile__label">Built-in</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <DocsExample code={defaultExampleCode} layout="dropdown">
          <InlineCommandPreview />
        </DocsExample>
      </section>

      <section id="when-to-use">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          When to Use
        </h2>
        <div className="max-w-3xl space-y-4 font-medium">
          <p>
            Use <strong>Command</strong> for action menus and app-wide palettes — jump to pages,
            run shortcuts, or pick from a flat/grouped list of commands. Items fire{' '}
            <code className="font-mono">onSelect</code> instead of storing a form value.
          </p>
          <p>
            Use{' '}
            <Link to="/components/combobox" className="font-bold underline underline-offset-2">
              Combobox
            </Link>{' '}
            when you need a single selected value in a form field. Command is optimized for
            navigation and actions; Combobox is optimized for data entry with a closed-state label.
          </p>
        </div>
      </section>

      <section id="dependencies">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Dependencies
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Command wraps <code className="font-mono">cmdk</code> — install it alongside the UI
          package. Filtering, keyboard navigation, and groups are handled by cmdk; this library
          applies neo-brutalist tokens and sub-part styling.
        </p>
        <DocsCodeBlock title="Install" code={installCode} />
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Inline palette" code={defaultExampleCode} />
      </section>

      <section id="dialog">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Command Dialog
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          <code className="font-mono">CommandDialog</code> renders a centered modal palette. In your
          app, pair it with a global <code className="font-mono">⌘K</code> /{' '}
          <code className="font-mono">Ctrl+K</code> listener — but avoid registering multiple
          listeners for the same shortcut on one page.
        </p>
        <DocsExample code={dialogExampleCode}>
          <CommandDialogPreview />
        </DocsExample>
      </section>

      <section id="groups-shortcuts">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Groups &amp; Shortcuts
        </h2>
        <DocsExample code={shortcutsExampleCode} layout="dropdown">
          <ShortcutsCommandPreview />
        </DocsExample>
      </section>

      <section id="empty-state">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Empty State
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          <code className="font-mono">CommandEmpty</code> renders when no items match the query.
          Type <code className="font-mono">zzz</code> below to preview a custom empty message.
        </p>
        <DocsExample code={emptyStateExampleCode} layout="dropdown">
          <Command label="Frameworks" className="max-w-md">
            <CommandInput placeholder="Try typing zzz…" />
            <CommandList>
              <CommandEmpty>No frameworks match your search.</CommandEmpty>
              <CommandGroup heading="Frameworks">
                <CommandItem value="react">React</CommandItem>
                <CommandItem value="vue">Vue</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DocsExample>
      </section>

      <section id="disabled-item">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Disabled Item
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Pass <code className="font-mono">disabled</code> on{' '}
          <code className="font-mono">CommandItem</code> to show an action that cannot be selected.
          Disabled rows stay visible but ignore pointer and keyboard selection.
        </p>
        <DocsExample code={disabledItemExampleCode} layout="dropdown">
          <DisabledCommandPreview />
        </DocsExample>
      </section>

      <section id="async-search">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Async Search
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Set <code className="font-mono">shouldFilter=&#123;false&#125;</code> on{' '}
          <code className="font-mono">Command</code> when filtering happens on the server or in
          parent state. Control the input with <code className="font-mono">value</code> /{' '}
          <code className="font-mono">onValueChange</code>, render matching items yourself, and show{' '}
          <code className="font-mono">CommandLoading</code> while a request is in flight.
        </p>
        <DocsExample code={asyncSearchExampleCode} layout="dropdown">
          <AsyncCommandPreview />
        </DocsExample>
      </section>

      <section id="custom-background">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Custom Background
        </h2>
        <DocsExample code={`<Command
  className="max-w-md"
  style={{ '--nb-command-bg': '#ffd24a' } as React.CSSProperties}
  label="Accent menu"
>
  <CommandInput placeholder="Search…" />
  <CommandList>
    <CommandItem value="one">One</CommandItem>
    <CommandItem value="two">Two</CommandItem>
  </CommandList>
</Command>`} layout="dropdown">
          <Command label="Accent menu" className="max-w-md" style={yellowCommandStyle}>
            <CommandInput placeholder="Search…" />
            <CommandList>
              <CommandItem value="one">One</CommandItem>
              <CommandItem value="two">Two</CommandItem>
            </CommandList>
          </Command>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="command" />

      <section id="accessibility">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Accessibility
        </h2>
        <ul className="list-disc space-y-2 pl-6 font-medium">
          <li>
            Always pass <code className="font-mono">label</code> on{' '}
            <code className="font-mono">Command</code> or{' '}
            <code className="font-mono">CommandDialog</code> for screen readers.
          </li>
          <li>
            cmdk manages listbox semantics, roving focus, and typeahead filtering out of the box.
          </li>
          <li>
            Use stable <code className="font-mono">value</code> props on items when children text
            may change between renders.
          </li>
          <li>
            Add <code className="font-mono">keywords</code> for aliases users might search (e.g.
            &quot;dark&quot; for a theme toggle).
          </li>
        </ul>
      </section>

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>

        <h3 className="mt-6 mb-3 text-xl font-bold">Sub-parts</h3>
        <DocsApiTable rows={commandPartsRows} variant="parts" minWidth="min-w-160" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">Command</code>
        </h3>
        <DocsApiTable rows={commandApiRows} variant="props-desc" minWidth="min-w-160" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">CommandDialog</code>
        </h3>
        <DocsApiTable rows={commandDialogApiRows} variant="props-desc" minWidth="min-w-140" />
        <p className="mt-3 text-sm font-medium">
          Also accepts all <code className="font-mono">Command</code> root props (filtering, loop,
          tone, border).
        </p>

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">CommandItem</code>
        </h3>
        <DocsApiTable rows={commandItemApiRows} variant="props-desc" minWidth="min-w-140" />
      </section>
    </article>
  );
}
