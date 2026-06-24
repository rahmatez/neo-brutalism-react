import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContactUsDialog } from '@/pages/components/examples/ContactUsDialog';
import { NAV_LINKS } from '../portfolio.data';

interface PortfolioNavProps {
  menuOpen: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
}

export function PortfolioNav({ menuOpen, onMenuToggle, onMenuClose }: PortfolioNavProps) {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  const contactButton = (
    <ContactUsDialog
      triggerLabel="Get in Touch!"
      triggerClassName="h-10 font-heading text-sm text-black transition-all hover:scale-[1.02] active:scale-[0.98] md:text-base lg:h-14 lg:text-xl"
      triggerStyle={{ ['--nb-button-bg' as string]: '#76fbd9' }}
    />
  );

  return (
    <header className="sticky top-4 z-50 w-full px-4">
      <nav
        className={`mx-auto mt-2 flex h-[60px] w-full max-w-full items-center justify-between border-[3px] border-black bg-yellow-300 px-3 shadow-[8px_8px_0px_0px_#000] transition-transform duration-300 sm:mt-4 sm:h-[70px] sm:px-6 md:h-[80px] ${
          showNav ? 'translate-y-0' : '-translate-y-[calc(100%+40px)]'
        }`}
        aria-label="Rahmat Ashari portfolio"
      >
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="shrink-0 border-2 border-black bg-white px-2 py-1.5 font-heading text-xs font-bold text-black shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none sm:px-3 sm:py-2 sm:text-sm"
          >
            ← Neo Brutalism
          </Link>
          <a
            href="/showcase/portfolio#home"
            className="block min-w-[56px] -rotate-2 transition-transform duration-300 hover:rotate-0 sm:min-w-[80px]"
            aria-label="Rahmat Ashari home"
          >
            <img
              className="portfolio-nav-logo"
              src="https://github.com/rahmatez.png"
              alt="Rahmat Ashari portfolio logo"
            />
          </a>
        </div>

        <div className="hidden items-center space-x-6 text-base md:flex lg:text-lg">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              className="transform px-3 py-1 font-bold text-black transition-all duration-200 hover:-translate-y-1 hover:rotate-2"
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
            >
              {link.label}
              {link.external ? <span aria-hidden> ↗</span> : null}
            </a>
          ))}
          <div className="flex items-center gap-4">{contactButton}</div>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            className="border-2 border-black bg-[#76fbd9] p-2 shadow-[4px_4px_0px_0px_#000] transition-transform hover:-rotate-3"
            type="button"
            onClick={onMenuToggle}
            aria-expanded={menuOpen}
            aria-label="Open navigation"
          >
            <span className="mb-1 block h-0.5 w-6 bg-black" />
            <span className="mb-1 block h-0.5 w-6 bg-black" />
            <span className="block h-0.5 w-6 bg-black" />
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="fixed top-[90px] left-0 z-50 w-full px-2 sm:top-[110px] sm:px-4 md:hidden">
          <div className="w-full border-[3px] border-black bg-white p-4 shadow-[8px_8px_0px_0px_#000]">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="border-2 border-black bg-white p-2 text-center text-lg font-bold text-black shadow-[4px_4px_0px_0px_#000] transition-transform hover:rotate-2"
                onClick={onMenuClose}
              >
                ← Neo Brutalism
              </Link>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  className="border-2 border-black bg-yellow-300 p-2 text-center text-lg font-bold text-black shadow-[4px_4px_0px_0px_#000] transition-transform hover:rotate-2"
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  onClick={onMenuClose}
                >
                  {link.label}
                  {link.external ? <span aria-hidden> ↗</span> : null}
                </a>
              ))}
            </div>
            <div className="mt-4 p-2">
              <ContactUsDialog
                triggerLabel="Get in Touch!"
                triggerClassName="h-12 w-full font-heading text-base text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
                triggerStyle={{ ['--nb-button-bg' as string]: '#76fbd9' }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
