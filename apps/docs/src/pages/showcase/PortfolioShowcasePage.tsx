import { useEffect, useState } from 'react';
import { ASSET_PATH, GREETINGS, TIMELINE } from './portfolio/portfolio.data';
import { PortfolioFooter } from './portfolio/components/PortfolioFooter';
import { PortfolioHero } from './portfolio/components/PortfolioHero';
import { PortfolioJourney } from './portfolio/components/PortfolioJourney';
import { PortfolioNav } from './portfolio/components/PortfolioNav';
import { PortfolioProjects } from './portfolio/components/PortfolioProjects';
import { PageTransition } from '@/docs/layout/PageTransition';
import './portfolio/portfolio.css';

export function PortfolioShowcasePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeJourney, setActiveJourney] = useState(-1);
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setGreetingIndex((index) => (index + 1) % GREETINGS.length);
    }, 1500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="portfolio-shell relative min-h-screen bg-white p-2 text-black sm:p-4 md:p-6 lg:p-8">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-100"
        style={{ backgroundImage: `url(${ASSET_PATH}/landing-dark.svg)` }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto min-h-[calc(100vh-1rem)] w-[1400px] max-w-full border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000] transition-colors duration-300 sm:min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-3rem)] md:border-4 md:shadow-[12px_12px_0px_0px_#000] lg:min-h-[calc(100vh-4rem)]">
        <PortfolioNav
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen((open) => !open)}
          onMenuClose={() => setMenuOpen(false)}
        />

        <PageTransition>
          <main className="flex min-h-full flex-col">
            <PortfolioHero greeting={GREETINGS[greetingIndex]} />

            <PortfolioJourney
              timeline={TIMELINE}
              activeJourney={activeJourney}
              onActiveJourneyChange={setActiveJourney}
            />

            <PortfolioProjects />
            <PortfolioFooter />
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
