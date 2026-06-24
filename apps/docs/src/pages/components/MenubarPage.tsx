import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from 'neobrutalism-ui-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/menubar';

const installCode = `pnpm add neobrutalism-ui-react @radix-ui/react-menubar`;

const importCode = `import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarSeparator,
  MenubarShortcut,
} from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab
        <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        New Window
        <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        Undo
        <MenubarShortcut>⌘Z</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        Redo
        <MenubarShortcut>⇧⌘Z</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Cut</MenubarItem>
      <MenubarItem>Copy</MenubarItem>
      <MenubarItem>Paste</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`;

const checkboxRadioExampleCode = `const [showToolbar, setShowToolbar] = useState(true);
const [theme, setTheme] = useState('neo');

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>View</MenubarTrigger>
    <MenubarContent>
      <MenubarCheckboxItem checked={showToolbar} onCheckedChange={setShowToolbar}>
        Show toolbar
      </MenubarCheckboxItem>
      <MenubarSeparator />
      <MenubarLabel>Theme</MenubarLabel>
      <MenubarRadioGroup value={theme} onValueChange={setTheme}>
        <MenubarRadioItem value="neo">Neo</MenubarRadioItem>
        <MenubarRadioItem value="paper">Paper</MenubarRadioItem>
        <MenubarRadioItem value="mint">Mint</MenubarRadioItem>
      </MenubarRadioGroup>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`;

const submenuExampleCode = `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New Tab</MenubarItem>
      <MenubarSub>
        <MenubarSubTrigger>Share</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>Email link</MenubarItem>
          <MenubarItem>Copy link</MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
      <MenubarSeparator />
      <MenubarItem className="text-(--nb-danger)">Delete</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Undo</MenubarItem>
      <MenubarItem>Redo</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`;

const partsRows = [
  { name: 'Menubar', description: 'Horizontal menu bar root with brutalist chrome.' },
  { name: 'MenubarMenu', description: 'Single top-level menu region.' },
  { name: 'MenubarTrigger', description: 'Top-level label that opens a dropdown.' },
  { name: 'MenubarContent', description: 'Portaled dropdown panel for a menu.' },
  { name: 'MenubarItem', description: 'Action row with optional shortcut text.' },
  { name: 'MenubarSub', description: 'Nested submenu root.' },
  { name: 'MenubarSubTrigger', description: 'Row that opens a nested submenu.' },
  { name: 'MenubarSubContent', description: 'Portaled submenu panel.' },
  { name: 'MenubarSeparator', description: 'Divider between groups of actions.' },
  { name: 'MenubarShortcut', description: 'Muted shortcut hint aligned to the end of a row.' },
  { name: 'MenubarCheckboxItem', description: 'Toggle row with a check indicator.' },
  { name: 'MenubarRadioGroup', description: 'Exclusive selection group for radio items.' },
  { name: 'MenubarRadioItem', description: 'Single choice row with a dot indicator.' },
];

const rootApiRows = [
  {
    name: 'tone',
    type: 'NbToneToken',
    default: "'surface'",
    description: 'Tone token for the menubar surface.',
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
    description: 'Loop keyboard focus between menus (Radix Root prop).',
  },
];

const contentApiRows = [
  {
    name: 'tone',
    type: 'NbToneToken',
    default: "'surface'",
    description: 'Tone token for dropdown background, text, and border.',
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
    default: "'start'",
    description: 'Alignment relative to the trigger.',
  },
  {
    name: 'sideOffset',
    type: 'number',
    default: '8',
    description: 'Distance in pixels from the menubar.',
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
    description: 'Adds left padding to align with checkbox rows.',
  },
];

function MenubarPreview() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab
            <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

function MenubarCheckboxRadioPreview() {
  const [showToolbar, setShowToolbar] = useState(true);
  const [theme, setTheme] = useState('neo');

  return (
    <div className="space-y-3">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={showToolbar} onCheckedChange={setShowToolbar}>
              Show toolbar
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarLabel>Theme</MenubarLabel>
            <MenubarRadioGroup value={theme} onValueChange={setTheme}>
              <MenubarRadioItem value="neo">Neo</MenubarRadioItem>
              <MenubarRadioItem value="paper">Paper</MenubarRadioItem>
              <MenubarRadioItem value="mint">Mint</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <p className="font-mono text-xs font-bold text-gray-600">
        Toolbar: {showToolbar ? 'visible' : 'hidden'} · Theme: {theme}
      </p>
    </div>
  );
}

function MenubarSubmenuPreview() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New Tab</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Copy link</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem className="text-(--nb-danger)">Delete</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export function MenubarPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Menubar</p>
          <h1>Menubar</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Persistent horizontal menu bars for desktop-style apps. Built on{' '}
            <a
              href="https://www.radix-ui.com/primitives/docs/components/menubar"
              className="font-bold underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              Radix Menubar
            </a>{' '}
            with neo-brutalist surfaces, keyboard navigation, shortcuts, and nested submenus.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">File</span>
            <span className="nb-stat-tile__label">Edit</span>
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
          Click a top-level label or use arrow keys to open menus.
        </p>
        <DocsExample code={defaultExampleCode} layout="dropdown">
          <MenubarPreview />
        </DocsExample>
      </section>

      <section id="when-to-use">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          When to Use
        </h2>
        <div className="max-w-3xl space-y-4 font-medium">
          <p>
            Use <strong>Menubar</strong> when your app mimics desktop software — editors, creative
            tools, or admin shells that expose File / Edit / View style commands across the top of
            the window.
          </p>
          <p>
            For a single action button that opens a list, use{' '}
            <Link to="/components/dropdown-menu" className="font-bold underline underline-offset-2">
              Dropdown Menu
            </Link>
            . Menubar keeps multiple menus visible and supports roving focus between them.
          </p>
        </div>
      </section>

      <section id="dependencies">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Dependencies
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Menubar wraps <code className="font-mono">@radix-ui/react-menubar</code> for focus
          management, typeahead, and submenu behavior. Install it alongside the UI package.
        </p>
        <DocsCodeBlock title="Install" code={installCode} />
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="File / Edit menus" code={defaultExampleCode} />
      </section>

      <section id="submenu">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Submenu
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Nest related actions with <code className="font-mono">MenubarSub</code>,{' '}
          <code className="font-mono">MenubarSubTrigger</code>, and{' '}
          <code className="font-mono">MenubarSubContent</code>.
        </p>
        <DocsExample code={submenuExampleCode} layout="dropdown">
          <MenubarSubmenuPreview />
        </DocsExample>
      </section>

      <section id="checkbox-radio">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Checkbox &amp; radio items
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Use <code className="font-mono">MenubarCheckboxItem</code> for toggles and{' '}
          <code className="font-mono">MenubarRadioGroup</code> with{' '}
          <code className="font-mono">MenubarRadioItem</code> for exclusive choices — view options,
          theme pickers, or feature flags in desktop-style apps.
        </p>
        <DocsExample code={checkboxRadioExampleCode} layout="dropdown">
          <MenubarCheckboxRadioPreview />
        </DocsExample>
      </section>

      <DocsCustomizationTokens component="menubar" />

      <section id="accessibility">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Accessibility
        </h2>
        <ul className="list-disc space-y-2 pl-6 font-medium">
          <li>Radix provides menubar semantics, arrow-key navigation, and typeahead selection.</li>
          <li>
            Pair destructive items with clear labels — the demo uses{' '}
            <code className="font-mono">text-(--nb-danger)</code> plus the word Delete.
          </li>
          <li>
            Shortcut hints are visual only; wire matching keyboard handlers in your app for real
            shortcuts.
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
          <code className="font-mono text-base">Menubar</code>
        </h3>
        <DocsApiTable rows={rootApiRows} variant="props-desc" minWidth="min-w-140" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">MenubarContent</code>
        </h3>
        <DocsApiTable rows={contentApiRows} variant="props-desc" minWidth="min-w-140" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">MenubarItem</code>
        </h3>
        <DocsApiTable rows={itemApiRows} variant="props-desc" minWidth="min-w-140" />
        <p className="mt-3 text-sm font-medium">
          <code className="font-mono">MenubarSubTrigger</code> and{' '}
          <code className="font-mono">MenubarSubContent</code> accept the same styling props as Item
          and Content respectively.
        </p>
      </section>
    </article>
  );
}
