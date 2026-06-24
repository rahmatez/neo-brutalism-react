import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'neobrutalism-ui-react';
import { Link } from 'react-router-dom';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/navigation-menu';

const installCode = `pnpm add neobrutalism-ui-react @radix-ui/react-navigation-menu`;

const importCode = `import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
} from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-96 gap-3 p-2 md:w-md md:grid-cols-2">
          <li>
            <NavigationMenuLink href="#">
              Analytics
              <p className="mt-1 text-xs font-medium text-gray-600">Track usage and growth.</p>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="#">
              Automation
              <p className="mt-1 text-xs font-medium text-gray-600">Workflows that run on schedule.</p>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-72 gap-2 p-2">
          <li>
            <NavigationMenuLink href="#" variant="compact">
              Documentation
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="#" variant="compact">
              Blog
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuViewport />
</NavigationMenu>`;

const partsRows = [
  { name: 'NavigationMenu', description: 'Root navigation container with relative positioning.' },
  { name: 'NavigationMenuList', description: 'Horizontal list of top-level items.' },
  { name: 'NavigationMenuItem', description: 'Single nav item wrapper.' },
  { name: 'NavigationMenuTrigger', description: 'Button that opens a dropdown panel.' },
  { name: 'NavigationMenuContent', description: 'Dropdown content rendered inside the viewport.' },
  { name: 'NavigationMenuLink', description: 'Styled link with default or compact variant and active state.' },
  { name: 'NavigationMenuViewport', description: 'Shared animated surface for open panels.' },
  { name: 'NavigationMenuIndicator', description: 'Optional arrow indicator below active item.' },
];

const rootApiRows = [
  {
    name: 'value',
    type: 'string',
    default: 'undefined',
    description: 'Controlled active item value.',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    default: 'undefined',
    description: 'Called when the active item changes.',
  },
  {
    name: 'delayDuration',
    type: 'number',
    default: '200',
    description: 'Milliseconds before opening on hover.',
  },
  {
    name: 'tone',
    type: 'NbToneToken',
    default: "'surface'",
    description: 'Tone token for navigation chrome.',
  },
  {
    name: 'border',
    type: 'NbBorderStrength',
    default: "'default'",
    description: 'Border width token.',
  },
];

const contentApiRows = [
  {
    name: 'tone',
    type: 'NbToneToken',
    default: "'surface'",
    description: 'Tone token for panel background, text, and border.',
  },
  {
    name: 'border',
    type: 'NbBorderStrength',
    default: "'default'",
    description: 'Border width token.',
  },
];

const linkApiRows = [
  {
    name: 'variant',
    type: "'default' | 'compact'",
    default: "'default'",
    description: 'Padding and hover tone — default for cards, compact for simple lists.',
  },
  {
    name: 'active',
    type: 'boolean',
    default: 'false',
    description: 'Radix active state for current route highlighting.',
  },
];

function NavigationMenuPreview() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-96 gap-3 p-2 md:w-md md:grid-cols-2">
              <li>
                <NavigationMenuLink href="#">
                  Analytics
                  <p className="mt-1 text-xs font-medium text-gray-600">Track usage and growth.</p>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  Automation
                  <p className="mt-1 text-xs font-medium text-gray-600">
                    Workflows that run on schedule.
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-72 gap-2 p-2">
              <li>
                <NavigationMenuLink href="#" variant="compact">
                  Documentation
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" variant="compact">
                  Blog
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  );
}

export function NavigationMenuPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Navigation Menu</p>
          <h1>Navigation Menu</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Site-wide navigation with animated dropdown panels. Built on{' '}
            <a
              href="https://www.radix-ui.com/primitives/docs/components/navigation-menu"
              className="font-bold underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              Radix Navigation Menu
            </a>{' '}
            with a shared viewport, keyboard support, and neo-brutalist panel styling.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">Nav</span>
            <span className="nb-stat-tile__label">Mega menu</span>
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
          Hover or click Products / Resources to open panels inside the shared viewport.
        </p>
        <DocsExample code={defaultExampleCode} layout="dropdown">
          <NavigationMenuPreview />
        </DocsExample>
      </section>

      <section id="when-to-use">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          When to Use
        </h2>
        <div className="max-w-3xl space-y-4 font-medium">
          <p>
            Use <strong>Navigation Menu</strong> for marketing or app headers that need multi-column
            dropdowns — product suites, resource hubs, or docs indexes with grouped links.
          </p>
          <p>
            For a compact list anchored to a single button, use{' '}
            <Link to="/components/dropdown-menu" className="font-bold underline underline-offset-2">
              Dropdown Menu
            </Link>
            . Navigation Menu coordinates multiple triggers through one animated viewport.
          </p>
        </div>
      </section>

      <section id="dependencies">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Dependencies
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Navigation Menu wraps <code className="font-mono">@radix-ui/react-navigation-menu</code>{' '}
          for viewport animation, focus management, and hover intent. Install it alongside the UI
          package.
        </p>
        <DocsCodeBlock title="Install" code={installCode} />
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Products / Resources" code={defaultExampleCode} />
      </section>

      <section id="viewport">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Viewport
        </h2>
        <p className="max-w-3xl font-medium">
          Place <code className="font-mono">NavigationMenuViewport</code> once as a sibling of{' '}
          <code className="font-mono">NavigationMenuList</code>. Radix measures open content and
          animates the viewport width and height so panels transition smoothly between triggers.
          Without the viewport, each <code className="font-mono">NavigationMenuContent</code> renders
          inline.
        </p>
      </section>

      <DocsCustomizationTokens component="navigation-menu" />

      <section id="accessibility">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Accessibility
        </h2>
        <ul className="list-disc space-y-2 pl-6 font-medium">
          <li>Triggers expose button semantics; links inside content remain focusable tab stops.</li>
          <li>Arrow keys move between items; Escape closes the active panel.</li>
          <li>Ensure each link has descriptive text — avoid icon-only entries in mega menus.</li>
        </ul>
      </section>

      <section id="api">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          API
        </h2>

        <h3 className="mt-6 mb-3 text-xl font-bold">Sub-parts</h3>
        <DocsApiTable rows={partsRows} variant="parts" minWidth="min-w-160" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">NavigationMenu</code>
        </h3>
        <DocsApiTable rows={rootApiRows} variant="props-desc" minWidth="min-w-140" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">NavigationMenuContent</code>
        </h3>
        <DocsApiTable rows={contentApiRows} variant="props-desc" minWidth="min-w-140" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">NavigationMenuLink</code>
        </h3>
        <DocsApiTable rows={linkApiRows} variant="props-desc" minWidth="min-w-140" />
      </section>
    </article>
  );
}
