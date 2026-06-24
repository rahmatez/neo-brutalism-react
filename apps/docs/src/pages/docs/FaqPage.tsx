import { Link } from 'react-router-dom';
import { DocsRouterButton } from '@/docs/components/DocsRouterButton';
import { LIBRARY_VERSION_LABEL } from '@/docs/site';

const COMPONENT_GROUPS = [
  {
    label: 'Composition',
    items: [
      { label: 'Surface', path: '/components/surface', summary: 'Brutalist panel' },
      { label: 'Section', path: '/components/section', summary: 'Panel regions' },
      { label: 'Stack', path: '/components/stack', summary: 'Vertical rhythm' },
      { label: 'Cluster', path: '/components/cluster', summary: 'Horizontal groups' },
      { label: 'Split', path: '/components/split', summary: 'Main + aside' },
    ],
  },
  {
    label: 'Actions',
    items: [
      { label: 'Button', path: '/components/button', summary: 'Actions and links' },
      { label: 'Icon Button', path: '/components/icon-button', summary: 'Icon-only actions' },
    ],
  },
  {
    label: 'Typography',
    items: [
      { label: 'Text', path: '/components/text', summary: 'Body copy' },
      { label: 'Title', path: '/components/title', summary: 'Section headings' },
      { label: 'Display', path: '/components/display', summary: 'Hero text' },
      { label: 'Typography', path: '/components/typography', summary: 'Font token wrapper' },
    ],
  },
  {
    label: 'Forms',
    items: [
      { label: 'Input', path: '/components/input', summary: 'Form fields' },
      { label: 'Input OTP', path: '/components/input-otp', summary: 'Passcode digits' },
      { label: 'Textarea', path: '/components/textarea', summary: 'Multi-line input' },
      { label: 'Calendar', path: '/components/calendar', summary: 'Date grid picker' },
      { label: 'Checkbox', path: '/components/checkbox', summary: 'Toggles' },
      { label: 'Switch', path: '/components/switch', summary: 'Boolean toggle' },
      { label: 'Radio Group', path: '/components/radio-group', summary: 'Single choice' },
      { label: 'Slider', path: '/components/slider', summary: 'Range input' },
      { label: 'Select', path: '/components/select', summary: 'Dropdown choices' },
      { label: 'Label', path: '/components/label', summary: 'Form labels' },
      { label: 'Input Group', path: '/components/input-group', summary: 'Prefix and suffix' },
    ],
  },
  {
    label: 'Media',
    items: [
      { label: 'Carousel', path: '/components/carousel', summary: 'Scroll-snap slides' },
      { label: 'Avatar', path: '/components/avatar', summary: 'Profile images' },
      { label: 'Avatar Group', path: '/components/avatar-group', summary: 'Team stacks' },
      { label: 'Icon', path: '/components/icon', summary: 'SVG icons' },
      { label: 'Media Frame', path: '/components/media-frame', summary: 'Framed images' },
      { label: 'Media Item', path: '/components/media-item', summary: 'Icon + label rows' },
    ],
  },
  {
    label: 'Emphasis',
    items: [
      { label: 'Badge', path: '/components/badge', summary: 'Status labels' },
      { label: 'Chip', path: '/components/chip', summary: 'Metadata tags' },
      { label: 'Callout', path: '/components/callout', summary: 'Highlight panels' },
      { label: 'Sticker', path: '/components/sticker', summary: 'Decorative bursts' },
      { label: 'Status Dot', path: '/components/status-dot', summary: 'State indicators' },
      { label: 'Rating', path: '/components/rating', summary: 'Star scores' },
      { label: 'Progress', path: '/components/progress', summary: 'Completion bars' },
    ],
  },
  {
    label: 'Interaction',
    items: [
      { label: 'Accordion', path: '/components/accordion', summary: 'Disclosure panels' },
      { label: 'Collapsible', path: '/components/collapsible', summary: 'Single disclosure' },
      { label: 'Dialog', path: '/components/dialog', summary: 'Modal flows' },
      { label: 'Drawer', path: '/components/drawer', summary: 'Side panels' },
      { label: 'Dropdown Menu', path: '/components/dropdown-menu', summary: 'Action menus' },
      { label: 'Popover', path: '/components/popover', summary: 'Floating panels' },
      { label: 'Tabs', path: '/components/tabs', summary: 'Tabbed views' },
      { label: 'Toast', path: '/components/toast', summary: 'Notifications' },
      { label: 'Tooltip', path: '/components/tooltip', summary: 'Hover hints' },
      { label: 'Marquee', path: '/components/marquee', summary: 'Scrolling ticker' },
    ],
  },
  {
    label: 'Recipes',
    items: [
      { label: 'Travel Card', path: '/recipes/travel-card', summary: 'Media composition' },
      { label: 'Podcast Card', path: '/recipes/podcast-card', summary: 'Audio episode card' },
      { label: 'Open to Work', path: '/recipes/open-to-work-card', summary: 'Profile card' },
    ],
  },
] as const;

export function FaqPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="mb-5">
          <p>Getting Started</p>
          <h1>FAQ</h1>
          <p className="mt-3 max-w-3xl text-base font-medium sm:text-lg">
            Straight answers about Neo Brutalism React, the React version it targets, why it
            exists, and where it fits compared with other React UI libraries.
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <DocsRouterButton to="/docs/installation" className="w-full sm:w-auto">
            Install the library
          </DocsRouterButton>
          <DocsRouterButton
            to="/components/button"
            tone="background"
            className="w-full justify-center sm:w-auto"
          >
            Browse components
          </DocsRouterButton>
        </div>
      </header>

      <section id="what-is-neo-brutalism">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          What is Neo Brutalism React?
        </h2>
        <p className="mb-4 text-base font-medium">
          Neo Brutalism React is a neo-brutalist React UI primitive library and composition system
          published as <code className="font-mono text-sm">neobrutalism-ui-react</code>. It gives
          modern React apps component-first primitives — Surface, Section, Stack, Cluster, Split,
          Button, Chip, and more — with hard borders, offset shadows, punchy colors, and Tailwind
          CSS v4 styling ergonomics.
        </p>
        <p className="text-base font-medium">
          Primitives compose together like LEGO. Each owns one job:{' '}
          <code className="font-mono text-sm">Surface</code> creates the panel,{' '}
          <code className="font-mono text-sm">Section</code> divides it into regions,{' '}
          <code className="font-mono text-sm">Stack</code> and{' '}
          <code className="font-mono text-sm">Cluster</code> handle vertical and horizontal rhythm,
          and <code className="font-mono text-sm">Split</code> builds main-and-aside layouts. Layer
          in actions, forms, media, and emphasis to build any product UI.
        </p>
      </section>

      <section id="why-react">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Why build it for React?
        </h2>
        <p className="mb-4 text-base font-medium">
          React has a huge ecosystem and strong patterns for building modern UIs — hooks,
          composition, and frameworks like Vite and Next.js. Neo Brutalism React is built to fit
          that world directly, with APIs and interaction patterns that feel natural in React
          applications.
        </p>
        <p className="text-base font-medium">
          Each component can be imported directly into the React component that uses it, which keeps
          examples small and makes the API easy to scan.
        </p>
      </section>

      <section id="modern-react">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Does it support modern React?
        </h2>
        <p className="text-base font-medium">
          Yes. The library is designed for modern React: named exports, hooks-friendly internals,
          and patterns that work with React 18 and React 19. You can use Neo Brutalism React in Vite
          SPAs, Next.js apps, and other React setups that support Tailwind CSS v4.
        </p>
      </section>

      <section id="tailwind-v4">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Does it require Tailwind CSS v4?
        </h2>
        <p className="text-base font-medium">
          Yes. Neo Brutalism React is built around Tailwind CSS v4 and CSS custom properties. Import
          the package stylesheet once, configure Tailwind to scan your project source, and the
          token-driven styling setup is ready to use.
        </p>
      </section>

      <section id="library-comparison">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          How is it different from shadcn/ui, Material UI, Chakra, or Radix?
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-3 border-(--nb-border) bg-(--nb-yellow) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <h3 className="font-heading text-xl font-black uppercase">Different visual job</h3>
            <p className="mt-2 text-sm font-medium">
              Many React UI libraries are designed to support a wide range of product styles. Neo
              Brutalism React starts from a narrower design promise: neo-brutalist components that
              look opinionated on day one.
            </p>
          </div>
          <div className="border-3 border-(--nb-border) bg-(--nb-mint) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <h3 className="font-heading text-xl font-black uppercase">
              Different customization model
            </h3>
            <p className="mt-2 text-sm font-medium">
              The library leans on CSS tokens and Tailwind utilities rather than a large theme
              abstraction. You tune borders, shadows, colors, and local component accents close to
              the markup.
            </p>
          </div>
        </div>
        <p className="mt-5 text-base font-medium">
          Some React libraries focus on unstyled or lightly styled primitives. Neo Brutalism React
          takes a more visual-first approach: the brutalist look ships with the primitives, then CSS
          tokens and Tailwind utilities let you tune it from there.
        </p>
      </section>

      <section id="production-readiness">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Is it production ready?
        </h2>
        <p className="text-base font-medium">
          Neo Brutalism React is pre-1.0. The components are usable today, but minor API changes can
          happen while the library hardens. It is a good fit for prototypes, portfolios, launch
          pages, side projects, and teams willing to track early releases. For conservative
          enterprise systems, wait for a later stable release.
        </p>
      </section>

      <section id="components-included">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          What components are included?
        </h2>
        <p className="mb-5 text-base font-medium">
          {LIBRARY_VERSION_LABEL} ships a full primitive composition system grouped by role.
        </p>
        <div className="space-y-5">
          {COMPONENT_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="mb-3 font-mono text-xs font-bold tracking-widest uppercase opacity-60">
                {group.label}
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((component) => (
                  <Link
                    key={component.path}
                    to={component.path}
                    className="nb-stat-tile nb-stat-tile--interactive"
                  >
                    <span className="nb-stat-tile__value">{component.label}</span>
                    <span className="nb-stat-tile__label">{component.summary}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="ssr">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Does it work with SSR?
        </h2>
        <p className="text-base font-medium">
          The docs site is built with Vite and React Router. The UI package avoids browser-only
          assumptions in core primitives where possible, and browser-dependent behavior is kept
          behind runtime checks when needed. For Next.js or other SSR frameworks, import styles on
          the server and render primitives in client components where interaction is required.
        </p>
      </section>

      <section id="who-made-it">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Who made Neo Brutalism React?
        </h2>
        <p className="text-base font-medium">
          Neo Brutalism React is a port of{' '}
          <a
            className="underline decoration-(--nb-border) decoration-2 underline-offset-4 hover:bg-(--nb-yellow)"
            href="https://github.com/khangtrannn/ng-brutalism"
            target="_blank"
            rel="noreferrer"
          >
            Ng Brutalism
          </a>
          , created by Rahmat Ashari. It is MIT licensed and published as{' '}
          <code className="font-mono text-sm">neobrutalism-ui-react</code>. The source code is
          available on{' '}
          <a
            className="underline decoration-(--nb-border) decoration-2 underline-offset-4 hover:bg-(--nb-yellow)"
            href="https://github.com/rahmatez/neo-brutalism-react"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </section>
    </article>
  );
}
