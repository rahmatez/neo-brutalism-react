import { useEffect, useState, type CSSProperties } from 'react';
import { Marquee, MarqueeItem, Title } from 'neobrutalism-ui-react';
import { ContactUsDialog } from '@/pages/components/examples/ContactUsDialog';
import { SKILLS } from '../portfolio.data';
import { GithubIcon, LinkedinIcon } from '../portfolio.icons';

interface PortfolioHeroProps {
  greeting: string;
}

export function PortfolioHero({ greeting }: PortfolioHeroProps) {
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    setCharIndex(0);
    if (greeting.length === 0) return;
    const id = window.setInterval(() => {
      setCharIndex((index) => {
        if (index >= greeting.length) {
          window.clearInterval(id);
          return index;
        }
        return index + 1;
      });
    }, 100);
    return () => window.clearInterval(id);
  }, [greeting]);

  const displayedGreeting = greeting.slice(0, charIndex);

  return (
    <section
      id="home"
      className="portfolio-grid-section relative flex h-screen max-h-[900px] min-h-[500px] w-full scroll-mt-6 flex-col items-center justify-center overflow-hidden bg-white pb-14 sm:min-h-[600px] sm:pb-16 md:pb-20"
    >
      <div className="portfolio-grid-bg absolute inset-0" />
      <div className="portfolio-radial absolute inset-0" />

      <div className="relative z-10 mx-auto flex flex-1 flex-col items-center justify-between px-3 py-2 text-left sm:px-5 sm:py-4 md:py-8 lg:flex-row lg:py-4">
        <div className="order-2 flex w-full flex-col items-center lg:order-1 lg:w-1/2 lg:items-start lg:pl-8">
          <p
            className="relative z-10 text-xl font-bold text-[#2b55ff] sm:text-2xl md:text-3xl"
            aria-live="polite"
          >
            {displayedGreeting}
            <span className="animate-pulse">|</span>
          </p>

          <h1 className="mt-2 text-center font-heading text-xl leading-tight font-black sm:mt-3 sm:text-2xl md:mt-5 md:text-3xl lg:text-left lg:text-5xl">
            I&apos;m Rahmat Ashari. <span aria-hidden>👋</span>
          </h1>

          <p className="my-3 max-w-2xl text-center text-sm leading-relaxed font-normal sm:my-5 sm:text-base md:my-6 md:text-lg lg:my-8 lg:max-w-xl lg:text-left lg:text-xl">
            Full Stack Developer based in{' '}
            <Title
              className="inline-block font-bold"
              style={
                {
                  '--nb-title-wave-color': '#ff5d8f',
                  '--nb-title-wave-width': '100%',
                  '--nb-title-wave-height': '0.35rem',
                  '--nb-title-wave-gap': '-0.5rem',
                } as CSSProperties
              }
            >
              Jakarta Timur, Indonesia
            </Title>{' '}
            specializing in{' '}
            <Title
              className="inline-block font-bold"
              style={
                {
                  '--nb-title-wave-color': '#a78bfa',
                  '--nb-title-wave-width': '100%',
                  '--nb-title-wave-height': '0.35rem',
                  '--nb-title-wave-gap': '-0.5rem',
                } as CSSProperties
              }
            >
              Laravel, React.js, and Node.js
            </Title>
            . I build scalable web applications, explore open-source, and turn ideas into polished
            products.
          </p>

          <div className="mb-4 flex w-full flex-col items-center sm:mb-5 md:mb-6 lg:items-start">
            <div className="mb-4 flex sm:mb-5 md:mb-6">
              <a
                className="portfolio-social"
                href="https://github.com/rahmatez"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <GithubIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
              </a>
              <a
                className="portfolio-social"
                href="https://www.linkedin.com/in/rahmat-ashari/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedinIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
              </a>
            </div>
            <ContactUsDialog
              triggerLabel="Get in Touch!"
              triggerClassName="h-10 font-heading text-base text-black transition-all hover:scale-[1.02] active:scale-[0.98] md:h-12 md:text-lg lg:h-14 lg:text-xl"
              triggerStyle={{ ['--nb-button-bg' as string]: '#76fbd9' }}
            />
          </div>
        </div>

        <div className="order-1 mt-2 flex w-full justify-center lg:order-2 lg:mt-0 lg:w-1/2 lg:justify-end">
          <img
            className="portfolio-hero-portrait"
            src="https://github.com/rahmatez.png"
            alt="Rahmat Ashari"
            width={380}
            height={380}
            fetchPriority="high"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-0 w-full">
        <Marquee className="block bg-white py-2 sm:py-3 lg:py-5" duration="18s">
          {SKILLS.map((skill) => (
            <MarqueeItem key={skill.text}>
              <span className="mx-4 flex items-center sm:mx-6 lg:mx-8">
                <img
                  className="portfolio-skill-icon mr-2 sm:mr-3"
                  src={`https://cdn.simpleicons.org/${skill.iconSlug}/000000`}
                  alt={`${skill.iconLabel} logo`}
                  loading="lazy"
                />
                <span className="font-heading text-lg sm:text-xl lg:text-2xl">{skill.text}</span>
              </span>
            </MarqueeItem>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
