import { Link } from 'react-router-dom';
import { Stack } from 'neobrutalism-ui-react';
import { DocsRouterButton } from '@/docs/components/DocsRouterButton';
import { DocsNavbar } from '@/docs/layout/DocsNavbar';
import { PageTransition } from '@/docs/layout/PageTransition';
import { LIBRARY_VERSION_LABEL, siteAsset } from '@/docs/site';

function HomePageDecorator() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none fixed top-40 left-2 hidden h-14 w-14 rotate-12 border-4 border-(--nb-border) bg-(--nb-pink) shadow-[5px_5px_0_0_var(--nb-shadow)] xl:block"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none fixed bottom-12 right-4 hidden h-10 w-10 -rotate-12 rounded-full border-4 border-(--nb-border) bg-(--nb-lavender) shadow-[4px_4px_0_0_var(--nb-shadow)] xl:block"
      />
    </>
  );
}

export function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <HomePageDecorator />
      <DocsNavbar />

      <PageTransition>
        <main className="docs-grid-bg pt-32 pb-16">
          <Stack gap="2xl" className="mx-auto w-full max-w-6xl px-5 lg:px-8">
          <article>
            <Stack gap="xl">
              <header id="hero" className="mb-4 scroll-mt-32">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] lg:items-center lg:gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(360px,440px)] xl:gap-24">
                  <div className="min-w-0">
                    <p className="mb-3 inline-block border-3 border-(--nb-border) bg-(--nb-lavender) px-3 py-1 font-mono text-xs font-bold tracking-[0.08em] uppercase shadow-[3px_3px_0_0_var(--nb-shadow)]">
                      Neo Brutalism
                    </p>
                    <h1
                      className="max-w-4xl font-heading text-[3.25rem] leading-[0.94] font-black tracking-normal text-balance uppercase sm:text-6xl md:text-7xl xl:text-[5.75rem]"
                      aria-label="The neo-brutalist React UI library"
                    >
                      <span className="block">The neo-brutalist</span>
                      <span className="mt-3 flex flex-wrap items-center gap-3 sm:mt-4 sm:gap-4">
                        <span className="inline-block -rotate-1 border-4 border-(--nb-border) bg-(--nb-yellow) px-3 py-1 text-[0.72em] leading-none shadow-[7px_7px_0_0_var(--nb-shadow)] sm:px-4 sm:py-2">
                          React
                        </span>
                      </span>
                      <span className="mt-3 block sm:mt-4 sm:whitespace-nowrap">UI library</span>
                    </h1>

                    <p className="mt-5 font-mono text-xs font-bold tracking-[0.08em] uppercase">
                      Created by{' '}
                      <a
                        className="underline decoration-(--nb-border) decoration-2 underline-offset-4 hover:bg-(--nb-yellow)"
                        href="https://github.com/rahmatez"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Rahmat Ashari
                      </a>
                    </p>

                    <p className="mt-5 max-w-3xl text-lg font-bold leading-snug">
                      Neo Brutalism is a token-driven primitive composition system for building
                      loud React interfaces with component APIs, hooks-friendly patterns, and
                      Tailwind v4 ergonomics.
                    </p>

                    <div className="home-hero-cta-row">
                      <DocsRouterButton to="/docs/introduction" className="home-hero-cta sm:w-auto">
                        Get started
                      </DocsRouterButton>
                      <DocsRouterButton
                        to="/composition/overview"
                        tone="background"
                        className="home-hero-cta sm:w-auto"
                      >
                        Composition system
                      </DocsRouterButton>
                      <DocsRouterButton
                        to="/components/button"
                        tone="background"
                        className="home-hero-cta sm:w-auto"
                      >
                        Browse primitives
                      </DocsRouterButton>
                    </div>

                    <div className="home-hero-stat-grid">
                      <div className="nb-stat-tile nb-stat-tile--yellow">
                        <span className="nb-stat-tile__value">{LIBRARY_VERSION_LABEL}</span>
                        <span className="nb-stat-tile__label">Composition system</span>
                      </div>
                      <div className="nb-stat-tile nb-stat-tile--mint">
                        <span className="nb-stat-tile__value">R19</span>
                        <span className="nb-stat-tile__label">Modern React</span>
                      </div>
                      <div className="nb-stat-tile nb-stat-tile--pink">
                        <span className="nb-stat-tile__value">TW4</span>
                        <span className="nb-stat-tile__label">Tailwind v4 tokens</span>
                      </div>
                      <div className="nb-stat-tile nb-stat-tile--lavender">
                        <span className="nb-stat-tile__value">MIT</span>
                        <span className="nb-stat-tile__label">Open source</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="relative isolate mx-auto flex aspect-[1.05] w-full max-w-[340px] items-center justify-center border-4 border-(--nb-border) bg-(--nb-yellow) p-5 shadow-[10px_10px_0_0_var(--nb-shadow)] sm:max-w-[390px] sm:p-7 lg:mx-0 lg:max-w-[380px] lg:justify-self-end xl:max-w-[440px]"
                    aria-label="React library preview"
                  >
                    <div
                      className="absolute -top-5 right-5 z-30 border-4 border-(--nb-border) px-5 py-2 font-heading text-lg font-black text-white uppercase shadow-[6px_6px_0_0_var(--nb-shadow)] sm:right-7 sm:text-xl"
                      style={{
                        background:
                          'linear-gradient(135deg, #61dafb 0%, #087ea4 48%, #20232a 100%)',
                      }}
                    >
                      React
                    </div>
                    <div
                      className="absolute -top-4 left-10 z-20 h-9 w-24 rotate-[7deg] border-4 border-(--nb-border) bg-white shadow-[4px_4px_0_0_var(--nb-shadow)]"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute -bottom-4 left-7 z-20 h-12 w-12 rotate-[-11deg] border-4 border-(--nb-border) bg-(--nb-pink) shadow-[5px_5px_0_0_var(--nb-shadow)] sm:h-14 sm:w-14"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute -right-5 bottom-8 z-20 h-10 w-10 rounded-full border-4 border-(--nb-border) bg-(--nb-lavender) shadow-[5px_5px_0_0_var(--nb-shadow)]"
                      aria-hidden="true"
                    />
                    <div className="relative z-10 flex aspect-square w-full items-center justify-center border-0 bg-white shadow-[12px_12px_0_0_rgba(0,0,0,0.18)]">
                      <picture>
                        <source
                          srcSet="/logo-56.webp 56w, /logo-112.webp 112w"
                          sizes="(min-width: 640px) 280px, 230px"
                          type="image/webp"
                        />
                        <img
                          className="block w-full max-w-[230px] sm:max-w-[280px] xl:max-w-[330px]"
                          src={siteAsset('/logo.svg')}
                          alt="Neo Brutalism React UI library logo"
                          width={488}
                          height={488}
                        />
                      </picture>
                    </div>
                  </div>
                </div>
              </header>

              <section id="why" className="scroll-mt-32">
                <h2 data-docs-heading className="mb-5">
                  Why neo-brutalism for React?
                </h2>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="border-3 border-(--nb-border) bg-(--nb-yellow) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
                    <h3 className="font-heading text-xl font-black uppercase">React native</h3>
                    <p className="mt-2 text-sm font-medium">
                      Built as React components with composable props, ref forwarding, and
                      interaction patterns that fit modern React apps.
                    </p>
                  </div>
                  <div className="border-3 border-(--nb-border) bg-(--nb-mint) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
                    <h3 className="font-heading text-xl font-black uppercase">Loud by default</h3>
                    <p className="mt-2 text-sm font-medium">
                      Thick borders, offset shadows, punchy color, and compact motion. Brutalist
                      React primitives that look like they mean it.
                    </p>
                  </div>
                  <div className="border-3 border-(--nb-border) bg-(--nb-pink) p-5 shadow-[5px_5px_0_0_var(--nb-shadow)]">
                    <h3 className="font-heading text-xl font-black uppercase">Tokens, not magic</h3>
                    <p className="mt-2 text-sm font-medium">
                      CSS custom properties and Tailwind v4 utilities keep theme overrides local,
                      visible, and predictable.
                    </p>
                  </div>
                </div>
              </section>

              <section id="install" className="scroll-mt-32">
                <h2 data-docs-heading className="mb-5">
                  Install
                </h2>
                <p className="mb-5 text-base font-medium">
                  Add the package with your preferred package manager, then configure Tailwind CSS v4
                  and import the global stylesheet.
                </p>
                <div className="border-4 border-(--nb-border) bg-black text-white shadow-[8px_8px_0_0_var(--nb-shadow)]">
                  <div className="flex h-11 items-center gap-2 border-b-2 border-white/20 bg-black px-4 font-mono text-xs font-black tracking-[0.12em] text-white/80 uppercase">
                    <span className="inline-block size-2.5 rounded-full border border-white/40 bg-(--nb-pink)" />
                    <span className="inline-block size-2.5 rounded-full border border-white/40 bg-(--nb-yellow)" />
                    <span className="inline-block size-2.5 rounded-full border border-white/40 bg-(--nb-mint)" />
                    <span className="ml-2">Install</span>
                  </div>
                  <pre className="m-0 overflow-x-auto px-5 py-5 font-mono text-sm leading-6 text-white">
                    <code>pnpm add neobrutalism-ui-react</code>
                  </pre>
                </div>
                <p className="mt-4 text-sm font-medium">
                  Need manual setup or want to review each step?{' '}
                  <Link
                    className="underline decoration-(--nb-border) decoration-2 underline-offset-4 hover:bg-(--nb-yellow)"
                    to="/docs/installation"
                  >
                    See the installation guide
                  </Link>{' '}
                  for full details.
                </p>
              </section>

              <section id="explore" className="scroll-mt-32">
                <h2 data-docs-heading className="mb-5">
                  Explore
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Link
                    className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--yellow"
                    to="/docs/installation"
                  >
                    <span className="nb-stat-tile__value">Install</span>
                    <span className="nb-stat-tile__label">Package, styles, tokens</span>
                  </Link>
                  <Link
                    className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--mint"
                    to="/composition/overview"
                  >
                    <span className="nb-stat-tile__value">Composition</span>
                    <span className="nb-stat-tile__label">Surface, Stack, Cluster, Split</span>
                  </Link>
                  <Link
                    className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--pink"
                    to="/components/button"
                  >
                    <span className="nb-stat-tile__value">Primitives</span>
                    <span className="nb-stat-tile__label">Composition + UI controls</span>
                  </Link>
                  <Link
                    className="nb-stat-tile nb-stat-tile--interactive nb-stat-tile--lavender"
                    to="/showcase/portfolio"
                  >
                    <span className="nb-stat-tile__value">Showcase</span>
                    <span className="nb-stat-tile__label">A full portfolio site</span>
                  </Link>
                </div>
              </section>
            </Stack>
          </article>
          </Stack>
        </main>
      </PageTransition>
    </div>
  );
}
