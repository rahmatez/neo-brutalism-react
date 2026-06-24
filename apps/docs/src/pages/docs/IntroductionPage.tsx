import { Link } from 'react-router-dom';
import { DocsCodeBlock } from '@/docs/components/DocsCodeBlock';
import { DocsRouterButton } from '@/docs/components/DocsRouterButton';
import { LIBRARY_VERSION_LABEL, siteAsset } from '@/docs/site';

const quickStartCode = `import { Button } from 'neobrutalism-ui-react';

export function ShipButton() {
  return <Button type="button">Ship the thing</Button>;
}`;

const compositionCode = `// Surface wraps. Section divides. Stack and Cluster compose.
<article className="nb-surface" data-tone="cream">
  <header className="nb-section" data-padding="lg" data-divider="bottom">
    <div className="nb-cluster" data-gap="sm" data-align="center" data-justify="between">
      <h2 className="nb-title">Launch checklist</h2>
      <span className="nb-chip" data-tone="yellow">${LIBRARY_VERSION_LABEL}</span>
    </div>
  </header>

  <div className="nb-section" data-padding="lg">
    <div className="nb-stack" data-gap="md">
      <p className="nb-text">Build loud UIs with composable primitives.</p>
      <div className="nb-cluster" data-gap="xs">
        <span className="nb-chip" data-tone="mint">Surface</span>
        <span className="nb-chip" data-tone="pink">Section</span>
        <span className="nb-chip" data-tone="lavender">Stack</span>
      </div>
    </div>
  </div>

  <footer className="nb-section" data-padding="lg" data-divider="top">
    <span className="nb-text" data-tone="muted">Ready for release</span>
    <Button tone="primary">Ship it</Button>
  </footer>
</article>`;

export function IntroductionPage() {
  return (
    <article>
      <header id="overview" className="relative mb-10 scroll-mt-32">
        <div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_minmax(180px,240px)] md:items-center xl:grid-cols-[minmax(0,1fr)_minmax(220px,300px)]">
          <div className="min-w-0">
            <p className="eyebrow">Getting Started</p>
            <h1 className="max-w-3xl text-[clamp(2.35rem,7vw,4.5rem)] md:text-[clamp(2.6rem,5.2vw,4.5rem)] xl:text-[clamp(3.5rem,5vw,4.5rem)]">
              <span className="block">Build loud.</span>
              <span className="block">Stay sharp.</span>
            </h1>
          </div>

          <div
            className="relative isolate mx-auto flex aspect-square w-full max-w-55 items-center justify-center border-4 border-(--nb-border) bg-(--nb-yellow) p-4 shadow-[8px_8px_0_0_var(--nb-shadow)] sm:max-w-[260px] sm:p-5 md:mx-0 md:max-w-[240px] md:justify-self-end xl:max-w-75 xl:p-6"
            aria-label="React library preview"
          >
            <div
              className="absolute -top-4 right-2 z-30 border-3 border-(--nb-border) px-3 py-1 font-mono text-xs font-black text-white uppercase shadow-[4px_4px_0_0_var(--nb-shadow)] sm:right-3"
              style={{
                background: 'linear-gradient(135deg, #61dafb 0%, #087ea4 48%, #20232a 100%)',
              }}
            >
              React
            </div>
            <div
              className="absolute bottom-4 left-4 z-20 h-7 w-7 rotate-[-10deg] border-3 border-(--nb-border) bg-(--nb-pink) shadow-[4px_4px_0_0_var(--nb-shadow)] sm:bottom-6 sm:left-5 sm:h-8 sm:w-8"
              aria-hidden="true"
            />
            <div
              className="absolute -top-4 left-7 z-20 h-6 w-16 rotate-[8deg] border-3 border-(--nb-border) bg-white shadow-[3px_3px_0_0_var(--nb-shadow)] sm:left-9"
              aria-hidden="true"
            />
            <div className="relative z-10 flex aspect-square w-full items-center justify-center border-0 bg-white shadow-[12px_12px_0_0_rgba(0,0,0,0.18)]">
              <picture>
                <source
                  srcSet="/logo-56.webp 56w, /logo-112.webp 112w"
                  sizes="(min-width: 1280px) 220px, 170px"
                  type="image/webp"
                />
                <img
                  className="block w-full max-w-[155px] sm:max-w-[190px] md:max-w-[170px] xl:max-w-[220px]"
                  src={siteAsset('/logo.svg')}
                  alt="Neo Brutalism React UI library logo"
                  width={488}
                  height={488}
                />
              </picture>
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-4xl text-base font-medium sm:text-lg">
          neobrutalism-ui-react gives modern React apps a token-driven primitive composition
          system with component-first APIs, keyboard-ready interactions, hard-edged visuals, and
          Tailwind v4 ergonomics from the first import.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <DocsRouterButton to="/docs/installation" className="w-full sm:w-auto">
            Start building
          </DocsRouterButton>
          <DocsRouterButton
            to="/components/accordion"
            tone="background"
            className="w-full justify-center sm:w-auto"
          >
            See components
          </DocsRouterButton>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="nb-stat-tile nb-stat-tile--yellow">
            <span className="nb-stat-tile__value">R19</span>
            <span className="nb-stat-tile__label">React native</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--mint">
            <span className="nb-stat-tile__value">A11Y</span>
            <span className="nb-stat-tile__label">Keyboard ready</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--pink">
            <span className="nb-stat-tile__value">CSS</span>
            <span className="nb-stat-tile__label">Token powered</span>
          </div>
          <div className="nb-stat-tile nb-stat-tile--lavender">
            <span className="nb-stat-tile__value">TW4</span>
            <span className="nb-stat-tile__label">Tailwind v4</span>
          </div>
        </div>
      </header>

      <section id="why">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Why it stands out
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="border-3 border-(--nb-border) bg-(--nb-yellow) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <h3 className="font-heading text-xl font-black uppercase">React first</h3>
            <p className="mt-2 text-sm font-medium">
              Built as React components with composable props, hooks-friendly patterns, and native
              interaction behavior that fits modern React apps.
            </p>
          </div>
          <div className="border-3 border-(--nb-border) bg-(--nb-mint) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <h3 className="font-heading text-xl font-black uppercase">Loud by default</h3>
            <p className="mt-2 text-sm font-medium">
              Chunky borders, offset shadows, punchy color, and compact motion make interfaces feel
              instantly brutalist.
            </p>
          </div>
          <div className="border-3 border-(--nb-border) bg-(--nb-pink) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
            <h3 className="font-heading text-xl font-black uppercase">Easy to bend</h3>
            <p className="mt-2 text-sm font-medium">
              CSS custom properties and Tailwind utilities keep theme overrides local, visible, and
              predictable.
            </p>
          </div>
        </div>
      </section>

      <section id="quick-start">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Quick start
        </h2>
        <p className="mb-5 text-base font-medium">
          Install the package, import the stylesheet once, then pull each primitive into the React
          component that actually uses it.
        </p>
        <DocsCodeBlock title="Component" code={quickStartCode} />
      </section>

      <section id="components">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Start exploring
        </h2>
        <p className="mb-5 text-base font-medium">
          Start with the composition grammar, then move into setup and individual primitives.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/composition/overview"
            className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--yellow"
          >
            <span className="nb-stat-tile__value">Composition Overview</span>
            <span className="nb-stat-tile__label">Mental model & decision guide</span>
          </Link>
          <Link
            to="/composition/surface-and-section"
            className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--mint"
          >
            <span className="nb-stat-tile__value">Surface & Section</span>
            <span className="nb-stat-tile__label">Panels and regions</span>
          </Link>
          <Link
            to="/composition/stack-and-cluster"
            className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--pink"
          >
            <span className="nb-stat-tile__value">Stack & Cluster</span>
            <span className="nb-stat-tile__label">Vertical and horizontal flow</span>
          </Link>
          <Link
            to="/composition/split-layouts"
            className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--lavender"
          >
            <span className="nb-stat-tile__value">Split Layouts</span>
            <span className="nb-stat-tile__label">Main / aside patterns</span>
          </Link>
          <Link
            to="/composition/common-patterns"
            className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--peach"
          >
            <span className="nb-stat-tile__value">Common Patterns</span>
            <span className="nb-stat-tile__label">Copy-pasteable compositions</span>
          </Link>
          <Link to="/docs/installation" className="nb-stat-tile nb-stat-tile--interactive">
            <span className="nb-stat-tile__value">Installation</span>
            <span className="nb-stat-tile__label">Package, styles, tokens</span>
          </Link>
          <Link
            to="/components/button"
            className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--yellow"
          >
            <span className="nb-stat-tile__value">Button</span>
            <span className="nb-stat-tile__label">High-impact actions</span>
          </Link>
          <Link
            to="/components/input"
            className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--mint"
          >
            <span className="nb-stat-tile__value">Input</span>
            <span className="nb-stat-tile__label">Sharp form fields</span>
          </Link>
          <Link
            to="/components/dialog"
            className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--pink"
          >
            <span className="nb-stat-tile__value">Dialog</span>
            <span className="nb-stat-tile__label">Native modal flow</span>
          </Link>
        </div>
      </section>

      <section id="composition">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Composition system
        </h2>
        <p className="mb-5 text-base font-medium">
          {LIBRARY_VERSION_LABEL} introduces a composition system for building loud, token-driven, React-first
          brutalist UIs. Small primitives that lock together like LEGO — each primitive owns one
          job.
        </p>
        <p className="mb-5 text-base font-medium">
          <code className="font-mono">Surface</code> creates the panel.{' '}
          <code className="font-mono">Section</code> creates regions inside the panel.{' '}
          <code className="font-mono">Stack</code> controls vertical rhythm.{' '}
          <code className="font-mono">Cluster</code> controls horizontal wrapping groups.{' '}
          <code className="font-mono">Split</code> creates main/aside layouts. Layer in{' '}
          <code className="font-mono">Button</code>, <code className="font-mono">Chip</code>,{' '}
          <code className="font-mono">Text</code>, and <code className="font-mono">Display</code> to
          build complete product UIs.
        </p>
        <DocsCodeBlock title="Composition example" code={compositionCode} />

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            to="/composition/overview"
            className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--yellow"
          >
            <span className="nb-stat-tile__value">Overview</span>
            <span className="nb-stat-tile__label">Mental model & decision guide</span>
          </Link>
          <Link
            to="/composition/common-patterns"
            className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--mint"
          >
            <span className="nb-stat-tile__value">Patterns</span>
            <span className="nb-stat-tile__label">Copy-pasteable compositions</span>
          </Link>
        </div>
      </section>

      <section id="utilities">
        <h2 data-docs-heading className="mt-10 mb-4 text-2xl font-bold">
          Utility included
        </h2>
        <p className="mb-5 text-base font-medium">
          <code className="font-mono text-sm">cn</code> is exported from{' '}
          <code className="font-mono text-sm">neobrutalism-ui-react</code> and merges conditional
          class arrays with <code className="font-mono text-sm">clsx</code> plus{' '}
          <code className="font-mono text-sm">tailwind-merge</code>. Use it in your own components
          when you want the same conditional styling ergonomics the library uses internally.
        </p>
      </section>
    </article>
  );
}
