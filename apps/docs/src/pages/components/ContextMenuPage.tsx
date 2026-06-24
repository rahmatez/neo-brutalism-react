import {
  Button,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from 'neobrutalism-ui-react';
import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/context-menu';

const installCode = `pnpm add neobrutalism-ui-react @radix-ui/react-context-menu`;

const importCode = `import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<ContextMenu>
  <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center border-2 border-(--nb-border) bg-(--nb-paper) font-mono font-bold shadow-nb">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>
      Back
      <ContextMenuShortcut>⌘[</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem disabled>
      Forward
      <ContextMenuShortcut>⌘]</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>Reload</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`;

const submenuExampleCode = `<ContextMenu>
  <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center border-2 border-(--nb-border) bg-(--nb-yellow) font-mono font-bold shadow-nb">
    Right click for more
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>New Tab</ContextMenuItem>
    <ContextMenuSub>
      <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Email link</ContextMenuItem>
        <ContextMenuItem>Copy link</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
    <ContextMenuSeparator />
    <ContextMenuItem className="text-(--nb-danger)">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`;

const withIconsExampleCode = `<ContextMenu>
  <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center border-2 border-(--nb-border) bg-(--nb-paper) font-mono font-bold shadow-nb">
    Right click — file actions
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>
      <CopyIcon />
      Copy
      <ContextMenuShortcut>⌘C</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      <ScissorsIcon />
      Cut
      <ContextMenuShortcut>⌘X</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      <ClipboardIcon />
      Paste
      <ContextMenuShortcut>⌘V</ContextMenuShortcut>
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`;

const groupExampleCode = `<ContextMenu>
  <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center border-2 border-(--nb-border) bg-(--nb-paper) font-mono font-bold shadow-nb">
    Right click — grouped actions
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuGroup>
      <ContextMenuLabel>Edit</ContextMenuLabel>
      <ContextMenuItem>Undo</ContextMenuItem>
      <ContextMenuItem>Redo</ContextMenuItem>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuGroup>
      <ContextMenuLabel>Share</ContextMenuLabel>
      <ContextMenuItem>Email link</ContextMenuItem>
      <ContextMenuItem>Copy link</ContextMenuItem>
    </ContextMenuGroup>
  </ContextMenuContent>
</ContextMenu>`;

const checkboxExampleCode = `const [showBookmarks, setShowBookmarks] = useState(true);

<ContextMenu>
  <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center border-2 border-(--nb-border) bg-(--nb-paper) font-mono font-bold shadow-nb">
    Right click — view options
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>View</ContextMenuLabel>
    <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
      Show bookmarks bar
    </ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem checked={false} disabled>
      Show full URLs
    </ContextMenuCheckboxItem>
  </ContextMenuContent>
</ContextMenu>`;

const radioExampleCode = `const [theme, setTheme] = useState('system');

<ContextMenu>
  <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center border-2 border-(--nb-border) bg-(--nb-paper) font-mono font-bold shadow-nb">
    Right click — theme
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>Theme</ContextMenuLabel>
    <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
      <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
      <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
      <ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>`;

const controlledExampleCode = `const [open, setOpen] = useState(false);

<div className="flex flex-col items-center gap-4">
  <Button type="button" onClick={() => setOpen(true)}>
    Open context menu
  </Button>
  <ContextMenu open={open} onOpenChange={setOpen}>
    <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center border-2 border-(--nb-border) bg-(--nb-paper) font-mono font-bold shadow-nb">
      Or right click here
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem onSelect={() => setOpen(false)}>Profile</ContextMenuItem>
      <ContextMenuItem onSelect={() => setOpen(false)}>Settings</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem onSelect={() => setOpen(false)}>Sign out</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</div>`;

const partsRows = [
  { name: 'ContextMenu', description: 'Root provider for open state and modality.' },
  { name: 'ContextMenuTrigger', description: 'Area that opens the menu on right-click / long-press.' },
  { name: 'ContextMenuContent', description: 'Portaled menu surface positioned at the pointer.' },
  { name: 'ContextMenuGroup', description: 'Semantic grouping wrapper for labels and related items.' },
  { name: 'ContextMenuItem', description: 'Action row with optional shortcut text.' },
  { name: 'ContextMenuCheckboxItem', description: 'Toggle row with check indicator.' },
  { name: 'ContextMenuRadioGroup', description: 'Grouped single-select radio options.' },
  { name: 'ContextMenuRadioItem', description: 'Radio option with dot indicator.' },
  { name: 'ContextMenuLabel', description: 'Non-interactive section heading.' },
  { name: 'ContextMenuSeparator', description: 'Divider between groups of actions.' },
  { name: 'ContextMenuShortcut', description: 'Muted shortcut hint aligned to the end of a row.' },
  { name: 'ContextMenuSub', description: 'Nested submenu root.' },
  { name: 'ContextMenuSubTrigger', description: 'Row that opens a nested submenu.' },
  { name: 'ContextMenuSubContent', description: 'Portaled submenu panel.' },
];

const rootApiRows = [
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    description: 'Controlled open state for the menu.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    description: 'Called when the menu opens or closes.',
  },
  {
    name: 'modal',
    type: 'boolean',
    default: 'true',
    description: 'When true, interaction outside the menu is blocked while open.',
  },
  {
    name: 'dir',
    type: "'ltr' | 'rtl'",
    default: 'undefined',
    description: 'Reading direction for submenu placement.',
  },
];

const triggerApiRows = [
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevents opening the menu from this trigger.',
  },
  {
    name: 'asChild',
    type: 'boolean',
    default: 'false',
    description: 'Merge props onto the child element instead of rendering a span.',
  },
];

const contentApiRows = [
  {
    name: 'tone',
    type: 'NbToneToken',
    default: "'surface'",
    description: 'Tone token for menu background, text, and border.',
  },
  {
    name: 'border',
    type: 'NbBorderStrength',
    default: "'default'",
    description: 'Border width token.',
  },
  {
    name: 'loop',
    type: 'boolean',
    default: 'false',
    description: 'Loop keyboard focus within the menu (Radix Content prop).',
  },
];

const itemApiRows = [
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevents selection and dims the row.',
  },
  {
    name: 'onSelect',
    type: '(event: Event) => void',
    default: 'undefined',
    description: 'Fired when the item is chosen.',
  },
  {
    name: 'inset',
    type: 'boolean',
    default: 'false',
    description: 'On Label / SubTrigger — adds left padding to align with checkbox rows.',
  },
];

const checkboxItemApiRows = [
  {
    name: 'checked',
    type: 'boolean | "indeterminate"',
    default: 'undefined',
    description: 'Controlled checked state.',
  },
  {
    name: 'onCheckedChange',
    type: '(checked: boolean) => void',
    default: 'undefined',
    description: 'Called when the toggle changes.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevents toggling the item.',
  },
];

const subApiRows = [
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    description: 'Controlled open state for the submenu.',
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Initial open state for uncontrolled submenus.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    description: 'Called when the submenu opens or closes.',
  },
];

const triggerSurfaceClass =
  'flex h-32 w-72 items-center justify-center border-2 border-(--nb-border) bg-(--nb-paper) font-mono text-sm font-bold shadow-nb';

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="12" height="14" rx="1" stroke="currentColor" strokeWidth="2.3" />
      <path d="M6 16V6a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

function ScissorsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="7" r="2.5" stroke="currentColor" strokeWidth="2.3" />
      <circle cx="6" cy="17" r="2.5" stroke="currentColor" strokeWidth="2.3" />
      <path d="M20 4 8.5 15M8.5 9 14 13.5 20 20" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="4" width="12" height="16" rx="1" stroke="currentColor" strokeWidth="2.3" />
      <path d="M9 4V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="2.3" />
    </svg>
  );
}

function DefaultContextMenuPreview() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={triggerSurfaceClass}>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Reload</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function WithIconsContextMenuPreview() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={triggerSurfaceClass}>Right click — file actions</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <CopyIcon className="size-4" />
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <ScissorsIcon className="size-4" />
          Cut
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <ClipboardIcon className="size-4" />
          Paste
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function GroupContextMenuPreview() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={triggerSurfaceClass}>Right click — grouped actions</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>Edit</ContextMenuLabel>
          <ContextMenuItem>Undo</ContextMenuItem>
          <ContextMenuItem>Redo</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Share</ContextMenuLabel>
          <ContextMenuItem>Email link</ContextMenuItem>
          <ContextMenuItem>Copy link</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function ControlledContextMenuPreview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button type="button" onClick={() => setOpen(true)}>
        Open context menu
      </Button>
      <p className="text-sm font-medium text-gray-600">
        Menu open: <code className="font-mono">{open ? 'true' : 'false'}</code>
      </p>
      <ContextMenu open={open} onOpenChange={setOpen}>
        <ContextMenuTrigger className={triggerSurfaceClass}>Or right click here</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => setOpen(false)}>Profile</ContextMenuItem>
          <ContextMenuItem onSelect={() => setOpen(false)}>Settings</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onSelect={() => setOpen(false)}>Sign out</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}

function SubmenuContextMenuPreview() {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        className={`${triggerSurfaceClass} bg-(--nb-yellow)`}
      >
        Right click for more
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>New Tab</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Email link</ContextMenuItem>
            <ContextMenuItem>Copy link</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-(--nb-danger)">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function CheckboxContextMenuPreview() {
  const [showBookmarks, setShowBookmarks] = useState(true);

  return (
    <ContextMenu>
      <ContextMenuTrigger className={triggerSurfaceClass}>Right click — view options</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>View</ContextMenuLabel>
        <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
          Show bookmarks bar
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={false} disabled>
          Show full URLs
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function RadioContextMenuPreview() {
  const [theme, setTheme] = useState('system');

  return (
    <ContextMenu>
      <ContextMenuTrigger className={triggerSurfaceClass}>Right click — theme</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Theme</ContextMenuLabel>
        <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
          <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
          <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
          <ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

const mintMenuStyle = { '--nb-context-menu-bg': '#bdf7c8' } as CSSProperties;

export function ContextMenuPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Context Menu</p>
          <h1>Context Menu</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Right-click menus for contextual actions. Built on{' '}
            <a
              href="https://www.radix-ui.com/primitives/docs/components/context-menu"
              className="font-bold underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              Radix Context Menu
            </a>{' '}
            with neo-brutalist surfaces, keyboard navigation, submenus, and checkbox/radio items.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">RMB</span>
            <span className="nb-stat-tile__label">Trigger</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">Radix</span>
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
        <p className="mb-4 max-w-3xl font-medium">
          Right-click (or long-press on touch) the target area to open the menu.
        </p>
        <DocsExample code={defaultExampleCode}>
          <DefaultContextMenuPreview />
        </DocsExample>
      </section>

      <section id="when-to-use">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          When to Use
        </h2>
        <div className="max-w-3xl space-y-4 font-medium">
          <p>
            Use <strong>Context Menu</strong> when actions depend on what the user right-clicked —
            canvas items, table rows, cards, or file lists. The menu opens at the pointer without a
            visible trigger button.
          </p>
          <p>
            Use{' '}
            <Link to="/components/dropdown-menu" className="font-bold underline underline-offset-2">
              Dropdown Menu
            </Link>{' '}
            when the user should explicitly click a button or icon to open actions. Context menus
            are pointer-positioned; dropdowns are trigger-anchored.
          </p>
        </div>
      </section>

      <section id="dependencies">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Dependencies
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Context Menu wraps <code className="font-mono">@radix-ui/react-context-menu</code> for
          positioning, focus management, and submenu behavior. Install it alongside the UI package.
        </p>
        <DocsCodeBlock title="Install" code={installCode} />
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Basic menu" code={defaultExampleCode} />
      </section>

      <section id="with-icons">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          With Icons
        </h2>
        <DocsExample code={withIconsExampleCode}>
          <WithIconsContextMenuPreview />
        </DocsExample>
      </section>

      <section id="groups">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Groups
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Wrap related items in <code className="font-mono">ContextMenuGroup</code> with a{' '}
          <code className="font-mono">ContextMenuLabel</code> for clearer structure and screen
          reader semantics.
        </p>
        <DocsExample code={groupExampleCode}>
          <GroupContextMenuPreview />
        </DocsExample>
      </section>

      <section id="submenu">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Submenu
        </h2>
        <DocsExample code={submenuExampleCode}>
          <SubmenuContextMenuPreview />
        </DocsExample>
      </section>

      <section id="controlled">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Controlled
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Pass <code className="font-mono">open</code> and{' '}
          <code className="font-mono">onOpenChange</code> on the root to drive the menu from parent
          state — useful for programmatic open or syncing with other UI.
        </p>
        <DocsExample code={controlledExampleCode}>
          <ControlledContextMenuPreview />
        </DocsExample>
      </section>

      <section id="checkbox">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Checkbox Items
        </h2>
        <DocsExample code={checkboxExampleCode}>
          <CheckboxContextMenuPreview />
        </DocsExample>
      </section>

      <section id="radio">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Radio Group
        </h2>
        <DocsExample code={radioExampleCode}>
          <RadioContextMenuPreview />
        </DocsExample>
      </section>

      <section id="custom-background">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Custom Background
        </h2>
        <DocsExample
          code={`<ContextMenu>
  <ContextMenuTrigger className="...">Right click</ContextMenuTrigger>
  <ContextMenuContent style={{ '--nb-context-menu-bg': '#bdf7c8' } as React.CSSProperties}>
    <ContextMenuItem>Action</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
        >
          <ContextMenu>
            <ContextMenuTrigger className={triggerSurfaceClass}>Right click — custom fill</ContextMenuTrigger>
            <ContextMenuContent style={mintMenuStyle}>
              <ContextMenuItem>Action one</ContextMenuItem>
              <ContextMenuItem>Action two</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="context-menu" />

      <section id="accessibility">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Accessibility
        </h2>
        <ul className="list-disc space-y-2 pl-6 font-medium">
          <li>Radix provides menu semantics, typeahead, arrow-key navigation, and focus trapping.</li>
          <li>
            Disabled items remain focusable for screen readers but cannot be activated — use{' '}
            <code className="font-mono">disabled</code> on items that are unavailable.
          </li>
          <li>
            Pair destructive actions with clear labels; avoid relying on color alone (the docs demo
            uses <code className="font-mono">text-(--nb-danger)</code> plus the word Delete).
          </li>
          <li>On touch devices, long-press opens the menu — test on real hardware when possible.</li>
        </ul>
      </section>

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>

        <h3 className="mt-6 mb-3 text-xl font-bold">Sub-parts</h3>
        <DocsApiTable rows={partsRows} variant="parts" minWidth="min-w-160" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">ContextMenu</code>
        </h3>
        <DocsApiTable rows={rootApiRows} variant="props-desc" minWidth="min-w-140" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">ContextMenuTrigger</code>
        </h3>
        <DocsApiTable rows={triggerApiRows} variant="props-desc" minWidth="min-w-120" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">ContextMenuContent</code>
        </h3>
        <DocsApiTable rows={contentApiRows} variant="props-desc" minWidth="min-w-140" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">ContextMenuItem</code>
        </h3>
        <DocsApiTable rows={itemApiRows} variant="props-desc" minWidth="min-w-140" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">ContextMenuCheckboxItem</code>
        </h3>
        <DocsApiTable rows={checkboxItemApiRows} variant="props-desc" minWidth="min-w-140" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">ContextMenuSub</code>
        </h3>
        <DocsApiTable rows={subApiRows} variant="props-desc" minWidth="min-w-140" />
        <p className="mt-3 text-sm font-medium">
          <code className="font-mono">ContextMenuSubTrigger</code> and{' '}
          <code className="font-mono">ContextMenuSubContent</code> accept the same styling props as
          Item and Content respectively.
        </p>
      </section>
    </article>
  );
}
