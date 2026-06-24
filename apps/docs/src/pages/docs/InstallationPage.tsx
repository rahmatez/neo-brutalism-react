import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsCustomizationTokens } from '@/docs/components/DocsCustomizationTokens';

const schematicInstallCode = `pnpm add neobrutalism-ui-react`;

const manualInstallCode = `npm install neobrutalism-ui-react
# or
pnpm add neobrutalism-ui-react`;

const stylesCode = `@import "tailwindcss";
@import "neobrutalism-ui-react/styles.css";

/* Adjust the path to match your CSS file location */
@source "../node_modules/neobrutalism-ui-react/dist";`;

const providerCode = `import { NeoBrutalismProvider } from 'neobrutalism-ui-react';

<NeoBrutalismProvider
  theme={{
    radius: '0px',
    borderWidth: '3px',
  }}
>
  <App />
</NeoBrutalismProvider>`;

const optionalPeersCode = `# Only install packages for the components you use.

# Radix-powered overlays & menus
pnpm add @radix-ui/react-context-menu @radix-ui/react-hover-card \\
  @radix-ui/react-menubar @radix-ui/react-navigation-menu

# Command palette
pnpm add cmdk

# Forms with react-hook-form integration
pnpm add react-hook-form

# Resizable panel layouts
pnpm add react-resizable-panels

# Charts
pnpm add recharts`;

const usageCode = `import { Button } from 'neobrutalism-ui-react';

export function Example() {
  return (
    <Button tone="background" style={{ '--nb-button-bg': '#fff' } as React.CSSProperties}>
      Ship it
    </Button>
  );
}`;

export function InstallationPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Getting Started</p>
          <h1>Installation</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Add the UI package to a React app with your package manager, or install it manually when
            you want full control over each setup step.
          </p>
        </div>
      </header>

      <section id="prerequisites">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Prerequisites
        </h2>
        <p className="mb-2 text-base font-medium">
          Components are composed from Tailwind utilities applied through{' '}
          <code className="font-mono text-sm">cn</code>. The library expects your app to have{' '}
          <strong>Tailwind CSS v4</strong> configured and scanning your project source.
        </p>
      </section>

      <section id="package">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Automatic setup
        </h2>
        <p className="mb-5 text-base font-medium">
          Use your package manager when you want the library added in one step. Configure Tailwind CSS
          v4 and global style imports right after.
        </p>
        <DocsCodeBlock title="Install" code={schematicInstallCode} />
      </section>

      <section id="manual">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Manual setup
        </h2>
        <p className="mb-5 text-base font-medium">
          Use manual setup when Tailwind is already managed by your app or when you want to review
          each change yourself.
        </p>
        <DocsCodeBlock title="Install" code={manualInstallCode} />
      </section>

      <section id="styles">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Styles
        </h2>
        <p className="mb-5 text-base font-medium">
          For manual setup, import Tailwind and the bundled stylesheet once at your app&apos;s entry
          (e.g. <code className="font-mono text-sm">src/styles.css</code>). It includes the default
          theme tokens; import{' '}
          <code className="font-mono text-sm">neobrutalism-ui-react/theme.css</code> directly only
          when you need the token sheet by itself.
        </p>
        <DocsCodeBlock title="src/styles.css" code={stylesCode} />
      </section>

      <section id="optional-peers">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Optional peer dependencies
        </h2>
        <p className="mb-2 text-base font-medium">
          Core components work with <strong>React</strong>, <strong>React DOM</strong>, and{' '}
          <strong>Tailwind CSS v4</strong> only. Several primitives wrap optional libraries — install
          them when you import those components. npm and pnpm will not install optional peers
          automatically; add only what your app needs.
        </p>
        <ul className="mb-5 list-disc space-y-2 pl-6 text-base font-medium">
          <li>
            <code className="font-mono text-sm">@radix-ui/react-context-menu</code>,{' '}
            <code className="font-mono text-sm">@radix-ui/react-hover-card</code>,{' '}
            <code className="font-mono text-sm">@radix-ui/react-menubar</code>,{' '}
            <code className="font-mono text-sm">@radix-ui/react-navigation-menu</code> — Context Menu,
            Hover Card, Menubar, Navigation Menu
          </li>
          <li>
            <code className="font-mono text-sm">cmdk</code> — Command palette
          </li>
          <li>
            <code className="font-mono text-sm">react-hook-form</code> — Form helpers
          </li>
          <li>
            <code className="font-mono text-sm">react-resizable-panels</code> — Resizable layouts
          </li>
          <li>
            <code className="font-mono text-sm">recharts</code> — Chart
          </li>
        </ul>
        <DocsCodeBlock title="Optional peers" code={optionalPeersCode} />
      </section>

      <section id="provider">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Provider (optional)
        </h2>
        <p className="mb-5 text-base font-medium">
          The provider is only needed if you want to override theme tokens from React config. The
          simpler alternative is to redefine the CSS custom properties in your own stylesheet.
        </p>
        <DocsCodeBlock title="app.tsx" code={providerCode} />
      </section>

      <DocsCustomizationTokens component="theme" />

      <section id="usage">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Usage
        </h2>
        <DocsCodeBlock title="Component" code={usageCode} />
      </section>
    </article>
  );
}
