import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarHeaderLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuButtonLabel,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from 'neobrutalism-ui-react';
import { Link } from 'react-router-dom';
import { DocsApiTable } from '@/docs/components/DocsApiTable';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';
import { DocsExample } from '@/docs/components/DocsExample';
import { DocsSourceTile } from '@/docs/components/DocsSourceTile';

const SOURCE =
  'https://github.com/rahmatez/neo-brutalism-react/tree/main/packages/ui/src/components/sidebar';

const importCode = `import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarHeaderLabel,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuButtonLabel,
  SidebarInset,
  SidebarTrigger,
} from 'neobrutalism-ui-react';`;

const defaultExampleCode = `<SidebarProvider defaultOpen className="min-h-64 border-2 border-(--nb-border)">
  <Sidebar className="h-full min-h-64">
    <SidebarHeader>
      <SidebarHeaderLabel className="font-mono text-sm font-black uppercase">
        Neo App
      </SidebarHeaderLabel>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Home">
                <HomeIcon />
                <SidebarMenuButtonLabel>Home</SidebarMenuButtonLabel>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Inbox">
                <InboxIcon />
                <SidebarMenuButtonLabel>Inbox</SidebarMenuButtonLabel>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <a href="#settings">
                  <SettingsIcon />
                  <SidebarMenuButtonLabel>Settings</SidebarMenuButtonLabel>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset className="min-h-64">
    <header className="flex items-center gap-3 border-b-2 border-(--nb-border) p-4">
      <SidebarTrigger />
      <p className="font-mono text-sm font-bold">Dashboard</p>
    </header>
    <div className="p-4 font-medium">Main content area.</div>
  </SidebarInset>
</SidebarProvider>`;

const partsRows = [
  { name: 'SidebarProvider', description: 'Context provider for open state and collapse mode.' },
  { name: 'Sidebar', description: 'Collapsible aside shell with width transitions.' },
  { name: 'SidebarHeader', description: 'Top region for branding or workspace switcher.' },
  { name: 'SidebarHeaderLabel', description: 'Branding text hidden when collapsed to icons.' },
  { name: 'SidebarFooter', description: 'Bottom region for account or settings links.' },
  { name: 'SidebarContent', description: 'Scrollable middle section for navigation groups.' },
  { name: 'SidebarGroup', description: 'Grouped block of related menu items.' },
  { name: 'SidebarGroupLabel', description: 'Section heading hidden when collapsed to icons.' },
  { name: 'SidebarMenu', description: 'List wrapper for menu items.' },
  { name: 'SidebarMenuItem', description: 'Single list item row.' },
  { name: 'SidebarMenuButton', description: 'Interactive nav button with active styling, asChild, and tooltip support.' },
  { name: 'SidebarMenuButtonLabel', description: 'Menu label hidden in icon-only collapsed mode.' },
  { name: 'SidebarTrigger', description: 'Button that toggles expanded / collapsed state.' },
  { name: 'SidebarInset', description: 'Main content column beside the sidebar.' },
  { name: 'SidebarRail', description: 'Invisible edge control for toggling on hover.' },
  { name: 'useSidebar', description: 'Hook for open state and toggleSidebar().' },
];

const providerApiRows = [
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'true',
    description: 'Initial expanded state when uncontrolled.',
  },
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    description: 'Controlled open state.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    description: 'Called when the sidebar opens or collapses.',
  },
  {
    name: 'collapsible',
    type: "boolean | 'icon'",
    default: "'icon'",
    description: "When 'icon', collapsed mode shows icon-only buttons.",
  },
];

const sidebarApiRows = [
  {
    name: 'side',
    type: "'left' | 'right'",
    default: "'left'",
    description: 'Which edge the sidebar attaches to.',
  },
  {
    name: 'variant',
    type: "'sidebar' | 'floating' | 'inset'",
    default: "'sidebar'",
    description: 'Layout variant — flush, floating, or inset with margin.',
  },
];

const menuButtonApiRows = [
  {
    name: 'isActive',
    type: 'boolean',
    default: 'false',
    description: 'Applies active border and mint background.',
  },
  {
    name: 'asChild',
    type: 'boolean',
    default: 'false',
    description: 'Merge props onto a single child element (e.g. router Link or anchor).',
  },
  {
    name: 'tooltip',
    type: 'string',
    default: 'undefined',
    description: 'Native title tooltip shown when the sidebar is collapsed to icons.',
  },
];

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InboxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h16v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6Z"
        stroke="currentColor"
        strokeWidth="2.3"
      />
      <path d="M4 10h5l2 3h2l2-3h5" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2.3" />
      <path
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SidebarPreview() {
  return (
    <SidebarProvider defaultOpen className="min-h-64 border-2 border-(--nb-border)">
      <Sidebar className="h-full min-h-64">
        <SidebarHeader>
          <SidebarHeaderLabel className="font-mono text-sm font-black uppercase">
            Neo App
          </SidebarHeaderLabel>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip="Home">
                    <HomeIcon />
                    <SidebarMenuButtonLabel>Home</SidebarMenuButtonLabel>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Inbox">
                    <InboxIcon />
                    <SidebarMenuButtonLabel>Inbox</SidebarMenuButtonLabel>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Settings">
                    <a href="#settings">
                      <SettingsIcon />
                      <SidebarMenuButtonLabel>Settings</SidebarMenuButtonLabel>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="min-h-64">
        <header className="flex items-center gap-3 border-b-2 border-(--nb-border) p-4">
          <SidebarTrigger />
          <p className="font-mono text-sm font-bold">Dashboard</p>
        </header>
        <div className="p-4 font-medium">Main content area.</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function SidebarPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Neo-Brutalist React Sidebar</p>
          <h1>Sidebar</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Application shell with a collapsible navigation column, grouped menu items, and a main
            content inset. No external primitive dependency — compose{' '}
            <code className="font-mono">SidebarProvider</code> with{' '}
            <code className="font-mono">SidebarTrigger</code> for dashboard and docs layouts.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">Nav</span>
            <span className="nb-stat-tile__label">Shell</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">Icon</span>
            <span className="nb-stat-tile__label">Collapse</span>
          </div>
          <DocsSourceTile href={SOURCE} />
        </div>
      </header>

      <section id="preview">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Preview
        </h2>
        <p className="mb-4 max-w-3xl font-medium">
          Use the trigger in the header to collapse the sidebar to icon-only mode.
        </p>
        <DocsExample code={defaultExampleCode} layout="spacious">
          <SidebarPreview />
        </DocsExample>
      </section>

      <section id="when-to-use">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          When to Use
        </h2>
        <div className="max-w-3xl space-y-4 font-medium">
          <p>
            Use <strong>Sidebar</strong> for app shells where primary navigation lives in a persistent
            column — dashboards, admin tools, and multi-section products with grouped links.
          </p>
          <p>
            For slide-over panels on smaller viewports, combine with{' '}
            <Link to="/components/drawer" className="font-bold underline underline-offset-2">
              Drawer
            </Link>{' '}
            or{' '}
            <Link to="/components/sheet" className="font-bold underline underline-offset-2">
              Sheet
            </Link>{' '}
            in your responsive layout. Sidebar targets desktop-first persistent nav.
          </p>
        </div>
      </section>

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock className="mb-5 block" title="Import" code={importCode} />
        <DocsCodeBlock title="Provider layout" code={defaultExampleCode} />
      </section>

      <section id="collapse">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Collapse
        </h2>
        <p className="max-w-3xl font-medium">
          <code className="font-mono">SidebarProvider</code> defaults to{' '}
          <code className="font-mono">collapsible="icon"</code>. When collapsed, wrap labels in{' '}
          <code className="font-mono">SidebarMenuButtonLabel</code> and{' '}
          <code className="font-mono">SidebarHeaderLabel</code> so text hides while icons stay
          centered. Pass <code className="font-mono">tooltip</code> on menu buttons for native
          tooltips in icon mode. Set{' '}
          <code className="font-mono">collapsible={'{false}'}</code> to keep
          the sidebar permanently expanded. Read state with{' '}
          <code className="font-mono">useSidebar()</code> or drive it with controlled{' '}
          <code className="font-mono">open</code> / <code className="font-mono">onOpenChange</code>.
          On narrow viewports, hide the fixed sidebar and mount the same nav tree inside a{' '}
          <Link to="/components/sheet" className="font-bold underline underline-offset-2">
            Sheet
          </Link>{' '}
          opened by the same trigger — keep one source of truth for menu items.
        </p>
      </section>

      <DocsCustomizationTokens component="sidebar" />

      <section id="accessibility">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Accessibility
        </h2>
        <ul className="list-disc space-y-2 pl-6 font-medium">
          <li>
            <code className="font-mono">SidebarMenuButton</code> supports{' '}
            <code className="font-mono">asChild</code> for router links — pair icons with{' '}
            <code className="font-mono">SidebarMenuButtonLabel</code> and a{' '}
            <code className="font-mono">tooltip</code> when collapsed.
          </li>
          <li>
            <code className="font-mono">SidebarTrigger</code> sets{' '}
            <code className="font-mono">aria-expanded</code> and{' '}
            <code className="font-mono">aria-controls</code> pointing at the sidebar{' '}
            <code className="font-mono">id</code> — expose the trigger in a landmark header so
            keyboard users can reach it early.
          </li>
          <li>
            Group labels use uppercase mono styling; they remain available to screen readers when
            visually hidden in icon mode.
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
          <code className="font-mono text-base">SidebarProvider</code>
        </h3>
        <DocsApiTable rows={providerApiRows} variant="props-desc" minWidth="min-w-140" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">Sidebar</code>
        </h3>
        <DocsApiTable rows={sidebarApiRows} variant="props-desc" minWidth="min-w-140" />

        <h3 className="mt-8 mb-3 text-xl font-bold">
          <code className="font-mono text-base">SidebarMenuButton</code>
        </h3>
        <DocsApiTable rows={menuButtonApiRows} variant="props-desc" minWidth="min-w-120" />
      </section>
    </article>
  );
}
