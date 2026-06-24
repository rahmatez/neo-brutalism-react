import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TOP_SECTIONS, type Section } from './sections';
import { LIBRARY_VERSION_LABEL, siteAsset } from '@/docs/site';
import { DocsMobileDrawer } from './DocsMobileDrawer';
import { DocsSearch } from './DocsSearch';

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function resolveSection(pathname: string): Section {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/components')) return 'components';
  if (pathname.startsWith('/recipes')) return 'recipes';
  if (pathname.startsWith('/showcase')) return 'showcase';
  return 'docs';
}

export function DocsNavbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = resolveSection(pathname);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`docs-navbar fixed top-3 right-3 left-3 z-50 border-4 border-(--nb-border) bg-(--nb-paper) shadow-[8px_8px_0_0_var(--nb-shadow)] ${scrolled ? 'docs-navbar--scrolled' : ''}`}
        aria-label="Main navigation"
      >
        <div className="flex min-h-20 items-center justify-between gap-3 px-3 py-3 sm:gap-5 sm:px-6">
          <Link to="/" className="brand group flex items-center gap-3 font-bold">
            <picture>
              <source
                srcSet="/logo-56.webp 56w, /logo-112.webp 112w"
                sizes="(min-width: 640px) 56px, 48px"
                type="image/webp"
              />
              <img
                className="h-12 w-12 border-4 border-(--nb-border) bg-(--nb-yellow) object-contain shadow-[4px_4px_0_0_var(--nb-shadow)] transition-transform group-hover:-rotate-6 sm:h-14 sm:w-14"
                src={siteAsset('/logo.svg')}
                alt=""
                width={56}
                height={56}
                aria-hidden
              />
            </picture>
            <span className="sr-only flex-col leading-none sm:not-sr-only sm:flex">
              <span className="brand-title">NEO·BRUTALISM</span>
              <span className="brand-sub">react ui kit</span>
            </span>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-3 text-base font-black tracking-normal uppercase lg:flex">
            {TOP_SECTIONS.map((link) => (
              <Link
                key={link.section}
                to={link.path}
                className={`nav-link ${activeSection === link.section ? 'nav-link-active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <DocsSearch />
            <span
              className="hidden h-11 items-center border-4 border-(--nb-border) bg-(--nb-mint) px-3 text-sm font-black tracking-wider uppercase shadow-[5px_5px_0_0_var(--nb-shadow)] sm:h-12 sm:text-base lg:inline-flex"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {LIBRARY_VERSION_LABEL}
            </span>
            <a
              className="cta inline-flex h-11 items-center gap-2 border-4 border-(--nb-border) bg-(--nb-hot) px-3 text-sm font-black tracking-normal text-black uppercase shadow-[5px_5px_0_0_var(--nb-shadow)] transition-transform hover:-translate-y-0.5 hover:-rotate-1 sm:h-12 sm:px-5 sm:text-base"
              href="https://github.com/rahmatez/neo-brutalism-react"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <ExternalLinkIcon />
            </a>
            <button
              type="button"
              className="menu-toggle inline-flex h-11 w-11 shrink-0 items-center justify-center border-4 border-(--nb-border) bg-(--nb-yellow) text-black shadow-[4px_4px_0_0_var(--nb-shadow)] transition-transform hover:-translate-y-0.5 sm:h-12 sm:w-12 lg:hidden"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="docs-mobile-drawer"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>
      <DocsMobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} activeSection={activeSection} />
    </>
  );
}
